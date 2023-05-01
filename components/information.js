import { StyleSheet, View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";

export function Information({closeModal, modalOpened, windowSize}) {

    return (
        <View style={styles.container(windowSize, modalOpened)}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
                <Icon 
                    name="close"
                    size={15}
                    color={'#FFF'}
                />
            </Pressable>
            <View style={styles.header}>
                <Octicons 
                    name="info"
                    size={22}
                    color={'#FFF'}
                />
                <Text style={styles.headerTitle}>Information</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>The Image-to-Speech app was developed specifically to aid individuals with visual impairments. The application was created as part of a thesis project and designed by Abraham Mahanaim CSE19.</Text>
                <Text style={styles.appVersion}>Ver 1.0</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: (window, isDisplayed) => ({
        display: isDisplayed ? 'flex' : 'none',
        position: 'relative',
        width: (window * .8) >= 200 ? 200 : (window * .8),
        height: (window * .8) >= 200 ? 200 : (window * .8),
        padding: ((window * .8) >= 200 ? 200 : (window * .8)) * .08,
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
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    headerTitle: {
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