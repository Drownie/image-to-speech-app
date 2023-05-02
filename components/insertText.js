import { StyleSheet, View, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

export function InsertText({closeModal, modalOpened, updateText, textValue, transformText}) {

    return (
        <View style={styles.container(modalOpened)}>
            <TextInput 
                style={styles.textContainer}
                placeholder="Insert text here ..."
                autoFocus={false}
                onChangeText={updateText}
                value={textValue}
                multiline={true}
            />
            <View style={styles.bottomButtonContainer}>
                <Pressable style={styles.closeButton} onPress={closeModal}>
                    <Icon 
                        name="close"
                        size={30}
                        color={'#FFF'}
                    />
                </Pressable>
                <Pressable style={styles.closeButton} onPress={transformText}>
                    <Entypo 
                        name="megaphone"
                        size={30}
                        color={'#FFF'}
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: (isDisplayed) => ({
        display: isDisplayed ? 'flex' : 'none',
        position: 'relative',
        width: '80%',
        maxWidth: 250,
        height: '80%',
        maxHeight: 350,
        padding: 20,
        // width: (window * .8) >= 250 ? 250 : (window * .8),
        // height: (window * .8) >= 300 ? 300 : (window * .8),
        // padding: ((window * .8) >= 250 ? 250 : (window * .8)) * .08,
        marginTop: '10%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        opacity: .7,
        borderRadius: 12,
    }),
    textContainer: {
        paddingTop: 3,
        paddingHorizontal: 5,
        width: '100%',
        maxWidth: '100%',
        height: '90%',
        borderRadius: 12,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: -25,
        zIndex: 4,
        width: '110%',
        height: 60,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    closeButton: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#3E3E3E',
        justifyContent: 'center',
        alignItems: 'center',
    }
});