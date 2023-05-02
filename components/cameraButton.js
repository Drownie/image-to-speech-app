import { StyleSheet, Dimensions, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export function CameraButton({openMenu}) {
    const getCenter = (diameter) => {
        const dimen = Dimensions.get('window').width;
        return (dimen * .5) - (diameter * .5);
    }

    return (
        <Pressable style={styles.button(getCenter(85))} onPress={openMenu}>
            <Icon 
                name="camera"
                size={40}
                color={'#FFF'}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: (getCenter) => ({
        position: 'absolute',
        top: -21.25,
        left: getCenter,
        width: 85,
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3E3E3E',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#D1D1D1',
        borderRadius: 50,
    }),
});