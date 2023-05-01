import { Audio } from "expo-av";
import * as Speech from 'expo-speech';
import { Platform } from "react-native";
import * as FileSystem from 'expo-file-system';
import axios from "axios";
import { AndroidAudioEncoder, AndroidOutputFormat, IOSAudioQuality, IOSOutputFormat } from "expo-av/build/Audio";

const recordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: AndroidOutputFormat.MPEG_4,
        audioEncoder: AndroidAudioEncoder.AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
      extension: '.m4a',
      outputFormat: IOSOutputFormat.MPEG4AAC,
      audioQuality: IOSAudioQuality.MAX,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
        mimeType: 'audio/webm',
        bitsPerSecond: 128000,
    },    
};

const BACKEND_ENDPOINT = 'http://192.168.0.184:3000/'
const API_ENDPOINT = "https://api.wit.ai/speech";
const WIT_ACCESS_TOKEN = "ANE6FUPJ7BIJSRKF3GRTWBPLM3W7IR5V";
const OPTIC_API_KEY = "CTxtWQHXnLXYCk4BnweFxgwoqzuitx4F9dKLAg4axvzq"
// , 'Authorization': `Bearer ${WIT_ACCESS_TOKEN}`
const headers = {'Content-Type': 'multipart/form-data'};

const ExtractText = async (imageInput) => {
    console.log(imageInput);
    // await Tesseract.recognize(
    //   imageInput, 
    //   'eng', 
    //   { logger: m => console.log(m) }
    //   ).then(({ data: { text, confidence } }) => {
    //     console.log(text);
    //     console.log(confidence);
    //     // SynthesisSpeech("Extraction Finished");
    //   });
};

const SynthesisSpeech = (text) => {
    Speech.speak(text, {
        voice: 'urn:moz-tts:speechd:English%20(America)?en',
        voiceIOS: 'com.apple.ttsbundle.Samantha-compact',
        voiceAndroid: 'en-us-x-tpa-local',
        language: 'en',
        rate: .8,
    });
}

const RecontIntentAndroid = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
        uri,
        name: 'audio.m4a',
        type: 'audio/mp4'
    })

    try {
        axios.post(
            BACKEND_ENDPOINT + 'recon/3',
            formData,
            {headers}
        ).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        })
    } catch(err) {
        console.log(err);
    }
}

const ReconIntentWeb = async (uri) => {
    const response = await fetch(uri);
    const formData = new FormData();
    const blob = await response.blob();
    formData.append('file', blob, 'audio.webm');

    console.log(formData);
    try {
        axios.post(
            BACKEND_ENDPOINT + 'recon/3',
            formData,
            {headers}
        ).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        })
    } catch(err) {
        console.log(err);
    }
}

const StartRecording = async (setRecording) => {
    try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status === 'granted') {
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync( recordingOptions );
            await recording.startAsync();
            setRecording(recording);
            // await Audio.setAudioModeAsync({
            //     allowsRecordingIOS: true,
            //     playsInSilentModeIOS: true
            // });
        
            console.log("Start Recording ...");
            // const { recording } = await Audio.Recording.createAsync( recordingOptions );
            // setRecording(recording);
            console.log("Recording Started")
        } else {
            console.log('Permission to record audio denied');
        }
    } catch(err) {
        console.error('Failed to start recording', err);
    }
}

const StopRecording = async (recording, reset) => {
    console.log("Stop Recording...");
    reset(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
    });

    const uri = recording.getURI();

    if (Platform.OS === "android") {
        // const fileInfo = await FileSystem.getInfoAsync(uri);
        // const convertedUri = `${FileSystem.documentDirectory}audio.wav`;
        // await FileSystem.copyAsync({
        //   from: fileInfo.uri,
        //   to: convertedUri,
        // });
        // console.log('Converted URI:', convertedUri);
        RecontIntentAndroid(uri);
    } else if (Platform.OS === "web") {
        ReconIntentWeb(uri);
    }
    // const wavFileUri = `${FileSystem.cacheDirectory}recording.wav`;
    // await sound.exportAsync({ uri: wavFileUri, format: Audio.AndroidOutputFormat. })

    console.log('Recording stopped and stored at', uri);
}

export { StartRecording, StopRecording, SynthesisSpeech, ExtractText };