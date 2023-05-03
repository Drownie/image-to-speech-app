import { StyleSheet, View, Dimensions } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';

import * as FileSystem from 'expo-file-system';

import { ButtonNav } from './components/bottomNav';
import { Monitor } from './components/monitor';

import { StartRecording, StopRecording, SynthesisSpeech, ExtractText, UpdateHost, PingHost } from './functions/function';

export default function App() {
  const [menuTrigger, setMenuTrigger] = useState(false);
  const [audioTrigger, setAudioTrigger] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [recording, setRecording] = useState(null);
  const [text, setText] = useState('');
  const [extractedTextState, setExtractedTextState] = useState(false);
  const [insertTextState, setInsertTextState] = useState(false);
  const [informationState, setInformationState] = useState(false);
  const [settingState, setSettingState] = useState(false);
  const [speechCommand, setSpeechCommand] = useState(null);
  const [hostAddr, setHostAddr] = useState('http://192.168.0.184:3000/');

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(({status}) => {
        setHasCameraPermission(status === "granted");
      });
    let curSize = Dimensions.get('window').width;
    if (curSize != windowSize){
      setWindowSize(curSize);
    }
    UpdateHost(hostAddr);
    PingHost();
  }, [])

  useEffect(() => {
    if (speechCommand !== null) {
      if (speechCommand === "snap_picture") {
        triggerCameraActive();

        setTimeout(() => {
          console.log("good");
          takePicture();
          // setCameraActive(false);
        }, 3000);
      } else if (speechCommand === "cancel") {
        cancelCapturedPict();
      } else if (speechCommand === "convert_to_speech") {
        console.log("Transoforming text");
        transformText();
      } else {
        console.log("Extracting text");
        // triggerExtract();
      }
      console.log(speechCommand);
      setSpeechCommand(null);
    }
  }, [speechCommand])

  useEffect(() => {
    UpdateHost(hostAddr);
  }, [hostAddr])

  const triggerMenuButton = () => {
    // console.log(FileSystem.documentDirectory, "menu function");
    setMenuTrigger(!menuTrigger);
  }

  const trigerAudioButton = () => {
    if (!audioTrigger) {
      StartRecording(setRecording, setAudioTrigger);
    } else {
      StopRecording(recording, setRecording, setAudioTrigger, setSpeechCommand);
    }
    // console.log("audio triggered");
    // setAudioTrigger(!audioTrigger);
  }

  const triggerInsertText = () => {
    if (audioTrigger) {
      // Recording is on so turn off
      trigerAudioButton()
    }
    if (cameraActive) {
      triggerCameraActive();
    }
    if (informationState) {
      setInformationState(false);
    }
    if (previewVisible) {
      cancelCapturedPict();
    }
    if (settingState) {
      setSettingState(false);
    }
    setInsertTextState(!insertTextState);
  }

  const takePicture =  async () => {
    if (!cameraRef) {
      console.log('Unknown Camera Ref', cameraRef);
      return;
    }
    try {
      const photo = await cameraRef.current.takePictureAsync()
      // console.log("Take Picture", photo);
      triggerCameraActive();
      await setCapturedImage(photo.uri);
      await setPreviewVisible(true);
    } catch(err) {
      console.log("Error When Capturing Photo", err)
    }
  }

  const triggerCameraActive = () => {
    if (audioTrigger) {
      // Recording is on so turn off
      trigerAudioButton()
    }
    if (informationState) {
      setInformationState(false);
    }
    if (insertTextState) {
      setInsertTextState(false);
    }
    if (previewVisible) {
      cancelCapturedPict();
    }
    if (settingState) {
      setSettingState(false);
    }
    setCameraActive(!cameraActive);
  }

  const triggerInformation = () => {
    if (audioTrigger) {
      // Recording is on so turn off
      trigerAudioButton()
    }
    if (cameraActive) {
      triggerCameraActive();
    }
    if (insertTextState) {
      setInsertTextState(false);
    }
    if (previewVisible) {
      cancelCapturedPict();
    }
    if (settingState) {
      setSettingState(false);
    }

    setInformationState(!informationState);
  }

  const triggerSetting = () => {
    if (audioTrigger) {
      // Recording is on so turn off
      trigerAudioButton()
    }
    if (cameraActive) {
      triggerCameraActive();
    }
    if (insertTextState) {
      setInsertTextState(false);
    }
    if (previewVisible) {
      cancelCapturedPict();
    }
    if (informationState) {
      setInformationState(false);
    }
    
    setSettingState(!settingState);
  }

  const transformText = () => {
    if (audioTrigger) {
      trigerAudioButton()
    }
    if (text) {
      SynthesisSpeech(text);
    } else {
      SynthesisSpeech("Text is Empty");
    }
  }

  const cancelCapturedPict = () => {
    setPreviewVisible(false);
    setCapturedImage(null);
    setExtractedTextState(false);
    setText('');
  }

  const triggerExtract = () => {
    if (capturedImage) {
      ExtractText(capturedImage, setExtractedTextState, setText);
      console.log("Extract Text");
    } else {
      console.log("Image is empty");
      SynthesisSpeech("Image is empty");
    }
  }

  const triggerPing = () => {
    PingHost();
  }

  return (
    <View style={styles.container}>
      <Monitor 
        menuState={menuTrigger} 
        menuTrigger={triggerMenuButton}
        windowSize={windowSize}
        cameraOption={triggerCameraActive}
        cameraActiveState={cameraActive}
        cameraRef={cameraRef}
        cameraPermission={hasCameraPermission}
        previewVisible = {previewVisible}
        capturedImage = {capturedImage}
        insertTextOption={triggerInsertText}
        inserTextOptionState={insertTextState}
        informationOption={triggerInformation}
        informationOptionState={informationState}
        settingOption={triggerSetting}
        settingOptionState={settingState}
        textValue={text}
        extractedTextState={extractedTextState}
        updateText={setText}
        triggerExtract={triggerExtract}
        cancelCapturedPict={cancelCapturedPict}
        transformText={transformText}
        hostAddr={hostAddr}
        updateHost={setHostAddr}
        triggerPing={triggerPing} />
      <ButtonNav 
        trigger={triggerMenuButton} 
        triggerStats={menuTrigger}
        AudioState={audioTrigger}
        triggerAudio={trigerAudioButton}
        cameraActiveState={cameraActive}
        triggerCamera={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#828181',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
