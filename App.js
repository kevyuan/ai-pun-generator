import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Platform, StatusBar} from 'react-native';
import PunContainer from './components/PunContainer';

import { getPun, getGeneratedPun } from './constants/Database';

export default function App() {

  const [pun, setPun] = useState("");

  useEffect(() => {
    fetchPun();
  }, []);

  const fetchPun = async () => {
    try {
      const pun = getPun();
      setPun(pun);
    } catch (error) {
      console.log("Error while fetching pun:", error);
    }
  };

  const fetchGeneratedPun = async () => {
    try {
      const pun = await getGeneratedPun();
      setPun(pun);
    } catch (error) {
      console.log("Error while fetching pun:", error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="auto" />

      <View style={styles.headerContainer}>
        <Image source={require("./assets/icon.png")} style={styles.icon} /> 
        {/* <Text>AI Pun Generator</Text> */}
      </View>

      <View style={styles.bodyContainer}>
        <PunContainer setup={pun.setup} punchline={pun.punchline} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#fff" }]}
          // onPress={() => {fetchPun()}}
          onPress={() => {fetchGeneratedPun()}}
        >
          <Text style={styles.buttonLabel}>Refresh</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'aliceblue',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  headerContainer: {
    flex: 1,
    top: 20,
    width: '90%',
    // backgroundColor: '#999',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 6,
    justifyContent: 'center',
    width: '90%',
    // backgroundColor: '#666',
  },
  buttonContainer: {
    flex: 1,
    // backgroundColor: '#333',
    width: '90%',
    // bottom: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  buttonLabel: {
    fontSize: 18,
    color: 'red',
  },
});