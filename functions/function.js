import { Audio } from "expo-av";
import * as Speech from 'expo-speech';
import { Platform, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
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
// 'https://172.16.1.80:3000/'
// 'http://192.168.162.221:3000/'
//'http://192.168.0.184:3000/' 
const headers = {'Content-Type': 'multipart/form-data'};
let KEY = 3;

const UpdateHost = (newHost) => {
    BACKEND_ENDPOINT = newHost;
    return;
}

const PingHost = () => {
    try {
        console.log(`Ping @ ${BACKEND_ENDPOINT}`);
        axios.get(
            BACKEND_ENDPOINT + 'key/'
        ).then(result => {
            KEY = result.data.result;
            return;
        }).catch(err => {
            console.log('Error :', err.message);
            return;
        })
    } catch(err) {
        console.log('Error :', err);
        return;
    }
}

const ExtractText = async (imageInput, updateState, setText, speech_support) => {
    const formData = new FormData();
    formData.append('file', {
        uri: imageInput,
        name: 'image',
        type: 'image/jpeg'
    })

    try {
        axios.post(
            BACKEND_ENDPOINT + 'extract/'+ KEY,
            formData,
            {headers}
        ).then(response => {
            updateState(true);
            setText(response.data.result);
            if (speech_support) {
                SynthesisSpeech("Text Extraction Finished");
            }
            return;
        }).catch(e => {
            SynthesisSpeech("Text Extraction Error");
            console.log(e);
            return;
        })
    } catch(err) {
        console.log(err);
        return;
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
    return;
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
            if (response.data.result !== undefined) {
                setCommand(response.data.result.name);
            } else {
                setCommand("other");
            }
            return;
        }).catch(e => {
            console.log(e);
            setCommand("error");
            return;
        })
    } catch(err) {
        console.log(err);
        setCommand("error");
        return;
    }
}

const ReconIntentWeb = async (uri, setCommand) => {
    const response = await fetch(uri);
    const formData = new FormData();
    const blob = await response.blob();
    formData.append('file', blob, 'audio.webm');

    try {
        axios.post(
            BACKEND_ENDPOINT + 'recon/'+ KEY,
            formData,
            {headers}
        ).then(response => {
            setCommand(response.data.result.name);
            return;
        }).catch(e => {
            console.log(e);
            return;
        })
    } catch(err) {
        console.log(err);
        return;
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
            console.log("Recording Started");
            return;
        } else {
            console.log('Permission to record audio denied');
            return;
        }
    } catch(err) {
        console.error('Failed to start recording', err);
        return;
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
    return;
}

const PickImage = async (setImage, setvisible) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
        setvisible(true);
    }
    
    return;
}

export { StartRecording, StopRecording, SynthesisSpeech, ExtractText, UpdateHost, PingHost, PickImage };