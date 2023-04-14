import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.blueBox} />
      <View style={styles.redBox} />
      <View style={styles.greenBox} />
      <View style={styles.yellowBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueBox: {
    height: '33.3%',
    width: '50%',
    backgroundColor: 'royalblue'
  },
  redBox: {
    height: '33.3%',
    width: '50%',
    backgroundColor: 'darkred'
  },
  greenBox: {
    height: '33.3%',
    width: '100%',
    backgroundColor: 'limegreen'
  },
  yellowBox: {
    height: '33.3%',
    width: '100%',
    backgroundColor: 'gold'
  },
});
