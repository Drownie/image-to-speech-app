import { StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export function MenuButton({openMenu, triggerStats}) {
    return (
        <Pressable style={styles.button} onPress={openMenu}>
            <Icon 
                name={triggerStats ? "dots-three-horizontal" : "dots-three-vertical"}
                size={22}
                color='#FFF'
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3E3E3E',
        borderRadius: 50,
    },
});