import { View, Text, StyleSheet } from "react-native";
import { Camera, CameraType } from 'expo-camera';

export function CameraMod ({cameraPermission, cameraActiveState, updateCameraRef}) {
    if (!cameraPermission) {
        return <Text style={styles.alertContainer}>No Access To Camera</Text>;
    }
    if (cameraActiveState & cameraPermission) {
        return (
            <Camera 
                style={styles.camera}
                type={CameraType.back} 
                ratio={"16:9"}
                ref={updateCameraRef} />
        );
    } else {
        return <View />;
    }
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        width: '100%',
    },
    alertContainer: {
        marginTop: '15%',
        display: 'flex',
        width: '80%',
        maxWidth: 200,
        height: '80%',
        maxHeight: 100,
        color: '#FFF',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        backgroundColor: '#3E3E3E',
        opacity: .7,
    }
});