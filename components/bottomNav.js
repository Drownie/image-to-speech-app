import { View, StyleSheet } from "react-native";
import { AudioButton } from "./audioButton";
import { CameraButton } from "./cameraButton";
import { MenuButton } from "./menuButton";
import { FolderButton } from "./folderButton";

export function ButtonNav({trigger, triggerStats, AuioState, triggerAudio, cameraActiveState, triggerCamera}) {
    return (
        <View style={styles.container}>
            <MenuButton openMenu={trigger} triggerStats={triggerStats} />
            {!cameraActiveState && <AudioButton topPos={-21.25} openMenu={triggerAudio} triggerStats={AuioState} />}
            {cameraActiveState && <CameraButton topPos={-21.25} openMenu={triggerCamera} />}
            <FolderButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: 0,
        height: '15%',
        width: '100%',
        backgroundColor: '#545454',
        borderColor: '#D1D1D1',
        borderStyle: 'solid',
        borderTopWidth: 2,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    },
});