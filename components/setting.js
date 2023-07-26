import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

export function Setting({closeModal, modalOpened, hostAddr, updateHost, triggerPing, appKey}) {

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
                <View style={styles.contentRow}>
                    <Pressable style={styles.pingButton} onPress={triggerPing}>
                        <Feather 
                            name="bell"
                            size={25}
                            color={'#000'}
                        />
                    </Pressable>
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.textLabel}>Host</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Insert Host..."
                        onChangeText={updateHost}
                        value={hostAddr}
                    />
                </View>
                <View style={styles.contentRow}>
                    <Text style={styles.textLabel}>Key</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="application key here"
                        editable={false}
                        value={appKey}
                    />
                </View>
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
    pingButton: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 25,
    },
    contentRow: {
        flex: .2,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textLabel: {
        flex: .20,
        color: '#FFF',
        fontSize: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: .65,
        width: '65%',
        height: '100%',
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingLeft: 20,
        fontSize: 15,
    }
});