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

let BACKEND_ENDPOINT = 'http://192.168.0.184:3000/';
const headers = {'Content-Type': 'multipart/form-data'};
let KEY = 3;

const UpdateHost = (newHost) => {
    BACKEND_ENDPOINT = newHost;
}

const PingHost = () => {
    try {
        console.log(`Ping @ ${BACKEND_ENDPOINT}`);
        axios.get(
            BACKEND_ENDPOINT + 'key/'
        ).then(result => {
            KEY = result.data.result;
            console.log(KEY);
        }).catch(err => {
            console.log('Error :', err);
        })
    } catch(err) {
        console.log('Error :', err);
    }
}

const ExtractText = async (imageInput, updateState, setText) => {
    // const response = await fetch(imageInput);
    // const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', {
        uri: imageInput,
        name: 'image',
        type: 'image/jpeg'
    })
    // formData.append('file', blob, 'image')
    try {
        axios.post(
            BACKEND_ENDPOINT + 'extract/'+ KEY,
            formData,
            {headers}
        ).then(response => {
            updateState(true);
            setText(response.data.result);
            // console.log("r", response.data.result);
        }).catch(e => {
            console.log(e);
        })
    } catch(err) {
        console.log(err);
    }
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

const RecontIntentAndroid = async (uri, setCommand) => {
    const formData = new FormData();
    formData.append('file', {
        uri,
        name: 'audio.m4a',
        type: 'audio/mp4'
    })

    try {
        axios.post(
            BACKEND_ENDPOINT + 'recon/' + KEY,
            formData,
            {headers}
        ).then(response => {
            console.log(response.data.result);
            setCommand(response.data.result.name);
        }).catch(e => {
            console.log(e);
        })
    } catch(err) {
        console.log(err);
    }
}

const ReconIntentWeb = async (uri, setCommand) => {
    const response = await fetch(uri);
    const formData = new FormData();
    const blob = await response.blob();
    formData.append('file', blob, 'audio.webm');

    // console.log(formData);
    try {
        axios.post(
            BACKEND_ENDPOINT + 'recon/'+ KEY,
            formData,
            {headers}
        ).then(response => {
            console.log(response.data.result.name);
            setCommand(response.data.result.name);
        }).catch(e => {
            console.log(e);
        })
    } catch(err) {
        console.log(err);
    }
}

const StartRecording = async (setRecording, triggerAudio) => {
    try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status === 'granted') {
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync( recordingOptions );
            await recording.startAsync();
            setRecording(recording);
        
            console.log("Start Recording ...");
            triggerAudio(true);
            console.log("Recording Started")
        } else {
            console.log('Permission to record audio denied');
        }
    } catch(err) {
        console.error('Failed to start recording', err);
    }
}

const StopRecording = async (recording, reset, triggerAudio, setSpeechCommand) => {
    console.log("Stop Recording...");
    await recording.stopAndUnloadAsync();
    triggerAudio(false);
    await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    
    reset(undefined);

    if (Platform.OS === "android") {
        RecontIntentAndroid(uri, setSpeechCommand);
    } else if (Platform.OS === "web") {
        ReconIntentWeb(uri, setSpeechCommand);
    }
    // console.log('Recording stopped and stored at', uri);
}

export { StartRecording, StopRecording, SynthesisSpeech, ExtractText, UpdateHost, PingHost };