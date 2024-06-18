import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Fredoka_300Light,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';

export default function Pun({ setup, punchline }) {

  let [fontsLoaded] = useFonts({
    Fredoka_300Light,
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  console.log(setup & ' + ' & punchline);

  const image = { uri : "https://picsum.photos/400/500"}

  return (
    <View style={styles.card}>
      
      <ImageBackground source={image} resizeMode="cover" style={styles.image}> 
        <View style={styles.topBox}>
          <Text style={styles.topText}>{setup}</Text>
        </View>
        <View style={styles.middleBox}>
           <Text style={styles.middleText}>To-do: use a generated image</Text>
        </View>
        <View style={styles.bottomBox}>
          <Text style={styles.bottomText}>{punchline}</Text>
        </View>
      </ImageBackground>
      
    </View>
  )

}

const styles = StyleSheet.create({
  card: {
    // marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 5,
    backgroundColor: '#fff',
    borderColor: '#666',
    // width: 320,
    height: '95%',
    borderRadius: 18,
    flexDirection: 'column',
  },
  image: {
    // justifyContent: 'center',
    // alignContent: 'space-evenly',
    width: '100%',
    height: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    // flexDirection: 'column',
  },
  topBox: {
    flex: 1,
  },
  middleBox: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBox: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  topText: {
    color:'#333',
    fontSize: 24,
    fontFamily: 'Fredoka_300Light',
    textAlign: 'center',
    padding: 5,
    maxWidth: '95%',
    alignSelf: 'center',
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    marginTop: 18,
  },
  middleText: {
    color:'#333',
    fontSize: 8,
    fontFamily: 'Fredoka_300Light',
    textAlign: 'center',
    padding: 5,
    maxWidth: '95%',
    alignSelf: 'center',
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    marginTop: 18,
  },
  bottomText: {
    color:'#333',
    fontSize: 24,
    fontFamily: 'Fredoka_300Light',
    textAlign: 'center',
    padding: 5,
    maxWidth: '95%',
    alignSelf: 'center',
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    marginBottom: 18,
  },
});