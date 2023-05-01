import { StyleSheet, View, Dimensions } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';

import * as FileSystem from 'expo-file-system';

import { ButtonNav } from './components/bottomNav';
import { Monitor } from './components/monitor';

import { StartRecording, StopRecording, SynthesisSpeech, ExtractText } from './functions/function';

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
  const [intent, setIntent] = useState("Welcome to \nThe Application");
  const [text, setText] = useState('');
  const [insertTextState, setInsertTextState] = useState(false);
  const [informationState, setInformationState] = useState(false);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync()
      .then(({status}) => {
        setHasCameraPermission(status === "granted");
      });
    let curSize = Dimensions.get('window').width;
    if (curSize != windowSize){
      setWindowSize(curSize);
    }
  }, [])

  const triggerMenuButton = () => {
    // console.log(FileSystem.documentDirectory, "menu function");
    setMenuTrigger(!menuTrigger);
  }

  const trigerAudioButton = () => {
    if (!audioTrigger) {
      StartRecording(setRecording);
    } else {
      StopRecording(recording, setRecording);
    }
    setAudioTrigger(!audioTrigger);
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
    setInformationState(!informationState);
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
  }

  const triggerExtract = () => {
    ExtractText(capturedImage);
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
        textValue={text}
        updateText={setText}
        triggerExtract={triggerExtract}
        cancelCapturedPict={cancelCapturedPict}
        transformText={transformText} />
      <ButtonNav 
        trigger={triggerMenuButton} 
        triggerStats={menuTrigger}
        AuioState={audioTrigger}
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
