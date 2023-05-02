import { StyleSheet, View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";

export function Setting({closeModal, modalOpened}) {

    return (
        <View style={styles.container(modalOpened)}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
                <Icon 
                    name="close"
                    size={15}
                    color={'#FFF'}
                />
            </Pressable>
            <View style={styles.header}>
                <Icon 
                    name="setting"
                    size={22}
                    color={'#FFF'}
                />
                <Text style={styles.headerTitle}>Setting</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>The Image-to-Speech app was developed specifically to aid individuals with visual impairments. The application was created as part of a thesis project and designed by Abraham Mahanaim CSE19.</Text>
                <Text style={styles.appVersion}>Ver 1.0</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: (isDisplayed) => ({
        display: isDisplayed ? 'flex' : 'none',
        position: 'relative',
        width: '80%',
        maxWidth: 240,
        height: '80%',
        maxHeight: 300,
        padding: 16,
        marginTop: '10%',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
    },
    header: {
        flex: .25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        marginLeft: '10%',
        color: '#FFF',
        fontSize: 20,
    },
    content: {
        flex: .75,
        flexDirection: 'column',
        padding: '5%',
    },
    contentText: {
        flex: .85,
        color: '#FFF',
        textAlign: 'justify',
        overflow: 'scroll',
    },
    appVersion: {
        display: 'flex',
        flex: .15,
        color: '#FFF',
        fontSize: 10,
        textAlign: 'center',
        justifyContent: "center",
        alignItems: 'flex-end',
    },
});