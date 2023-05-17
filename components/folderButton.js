import { StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export function FolderButton({triggerFolder}) {
    const test = () => {
        console.log("test folder");
    }

    return (
        <Pressable style={styles.button} onPress={triggerFolder}>
            <Icon 
                name="md-folder-open-outline"
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