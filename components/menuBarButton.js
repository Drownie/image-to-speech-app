import { StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign"

export function MenuBarButton({dimension, iconName, onButtonPress, onButtonPressOut, buttonPressed}) {
    return (
        <Pressable style={styles.button(dimension)} onPress={onButtonPress} onPressOut={onButtonPressOut}>
            {!buttonPressed ? 
                <Icon 
                    name={iconName}
                    size={dimension * .38 * .40}
                    color='#FFF'
                /> :
                <AntDesign 
                    name={"back"}
                    size={dimension * .38 * .40}
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
    }),
});