import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { MenuBarButton } from "./menuBarButton";
import Icon from "react-native-vector-icons/AntDesign";

export function MenuBar({closeModal, windowSize, cameraOption, cameraActiveState, insertTextOption, insertTextOptionState, informationOption, informationOptionState, settingOption, settingOptionState}) {

    return (
        <View style={styles.container(windowSize)}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
                <Icon 
                    name="close"
                    size={15}
                    color={'#FFF'}
                />
            </Pressable>
            <MenuBarButton dimension={(windowSize * .8) > 200 ? 200 : (windowSize * .8)} iconName={"camera"} onButtonPress={cameraOption} onButtonPressOut={closeModal} buttonPressed={cameraActiveState} />
            <MenuBarButton dimension={(windowSize * .8) > 200 ? 200 : (windowSize * .8)} iconName={"pencil-square-o"} onButtonPress={insertTextOption} onButtonPressOut={closeModal} buttonPressed={insertTextOptionState} />
            <MenuBarButton dimension={(windowSize * .8) > 200 ? 200 : (windowSize * .8)} iconName={"gear"} onButtonPress={settingOption} onButtonPressOut={closeModal} buttonPressed={settingOptionState} />
            <MenuBarButton dimension={(windowSize * .8) > 200 ? 200 : (windowSize * .8)} iconName={"info"} onButtonPress={informationOption} onButtonPressOut={closeModal} buttonPressed={informationOptionState} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: (window) => ({
        position: 'relative',
        width: (window * .8) >= 200 ? 200 : (window * .8),
        height: (window * .8) >= 200 ? 200 : (window * .8),
        padding: ((window * .8) >= 200 ? 200 : (window * .8)) * .08,
        marginTop: '15%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        backgroundColor: '#3E3E3E',
        opacity: .7,
        borderRadius: 12,
    }),
    closeButton: {
        position: 'absolute',
        top: -12,
        right: -12,
        zIndex: 2,
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: '#3E3E3E',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
    }
});