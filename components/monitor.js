import { View, StyleSheet, Modal, Image, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { MenuBar } from "./menuBar";
import { InsertText } from "./insertText";
import { Information } from "./information";
import { CameraMod } from "./cameraMod";
import { Setting } from "./setting";

export function Monitor({windowSize, menuState, menuTrigger, cameraOption, cameraActiveState, insertTextOption, inserTextOptionState, textValue, updateText, transformText, informationOption, informationOptionState, cameraRef, cameraPermission, previewVisible, capturedImage, triggerExtract, cancelCapturedPict, settingOption, settingOptionState}) {    
    const CameraPreview = ({photo, cancelPict, extract}) => {
        return (
            <View style={styles.capturedContainer}>
                <Image 
                    source={{uri: photo}} 
                    style={styles.capturedImage}
                />
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={cancelPict}>
                        <Icon 
                            name="close"
                            size={30}
                            color={'#FFF'}
                        />
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={extract}>
                        <MaterialCommunityIcons 
                            name="card-text-outline"
                            size={30}
                            color={'#FFF'}
                        />
                        <Text style={styles.buttonText}>Extract</Text>
                    </Pressable>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={menuState}
                transparent={true}
                onRequestClose={menuTrigger}
                >
                    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <MenuBar 
                            closeModal={menuTrigger} 
                            windowSize={windowSize} 
                            cameraOption={cameraOption} 
                            cameraActiveState={cameraActiveState}
                            insertTextOption={insertTextOption} 
                            insertTextOptionState={inserTextOptionState}
                            informationOption={informationOption}
                            informationOptionState={informationOptionState}
                            settingOption={settingOption}
                            settingOptionState={settingOptionState}
                        />
                    </View>
            </Modal>
            <InsertText 
                closeModal={insertTextOption}
                modalOpened={inserTextOptionState} 
                updateText={updateText}
                textValue={textValue}
                transformText={transformText}
            />
            <Information 
                closeModal={informationOption}
                modalOpened={informationOptionState} 
            />
            <Setting 
                closeModal={settingOption}
                modalOpened={settingOptionState}
            />
            {previewVisible ?
            <CameraPreview 
                photo={capturedImage}
                cancelPict={cancelCapturedPict}
                extract={triggerExtract}
            /> 
            :
            <CameraMod 
                cameraPermission={cameraPermission}
                cameraActiveState={cameraActiveState}
                updateCameraRef={cameraRef}
            />}
        </View>
    );
}
// {/* {trigger ? <MenuBar /> : <Text style={styles.textContainer}>{test}</Text>} */}

const styles = StyleSheet.create({
    container: {
        height: '85%',
        width: '100%',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    textContainer: {
        maxWidth: '80%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginTop: '20%',
        borderColor: '#545454',
        borderWidth: 3,
        borderRadius: 12,
        borderStyle: 'dashed',
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#FFF',
        fontSize: 32,
    },
    capturedContainer: {
        flex: 1,
        // paddingTop: '15%',
        // paddingHorizontal: '5%',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    capturedImage: {
        flex: .70,
        width: 300,
        height: 500,
        maxWidth: '75%',
        maxHeight: '80%',
        resizeMode: 'cover',
        borderRadius: 12,
    },
    buttonContainer: {
        flex: .15,
        width: 300,
        maxWidth: '75%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        position: 'relative',
        width: 60,
        height: 60,
        backgroundColor: '#3E3E3E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    buttonText: {
        position: 'absolute',
        bottom: -25,
        color: '#FFF',
    }
});