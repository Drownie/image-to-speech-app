import { StyleSheet, Pressable, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign"

export function MenuBarButton({dimension, iconName, onButtonPress, onButtonPressOut, buttonPressed, buttonText}) {
    return (
        <Pressable style={styles.button(dimension)} onPress={onButtonPress} onPressOut={onButtonPressOut}>
            {!buttonPressed ? 
                <Icon 
                    name={iconName}
                    size={28}
                    color='#FFF'
                /> 
                :
                <AntDesign 
                    name={"back"}
                    size={28}
                    color='#FFF'
                />
            }
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: (dimension) => ({
        width: dimension * .38,
        height: dimension * .38,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        opacity: .7,
        borderRadius: 12,
    })
});