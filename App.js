import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import React, { useEffect, useState } from 'react';
import { Alert, AsyncStorage, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {

  const [anotation, setAnotation] = useState('');
  const [state, setState] = useState('read');

  useEffect(() => {
    (async () => {
      try {
        const savedAnnotation = await AsyncStorage.getItem('key');
        setAnotation(savedAnnotation);
        console.log(savedAnnotation);
      } catch {

      }
    })();


  }, []);

   async function saveData() {
    try {
      await AsyncStorage.setItem('key', anotation);
    } catch (error) {
      
    }

    Alert.alert('Anotação salva com sucesso!');
  }

  function updateText() {
    setState('read');
    saveData();
  }


  if (state == 'read') {
    return (
      <View style={{flex: 1, marginTop: Constants.statusBarHeight}}> 
        <StatusBar style="dark" />
        <View style={styles.barTitle}>
          <Text style={styles.barTitleText}>App Anotações</Text>
        </View>
        <View style={styles.body}>
          {
            (anotation != '') ?
              <Text style={styles.bodyText}>{anotation}</Text>
            :
              <Text style={styles.bodyTextNoText}>Não há anotações no momento :(</Text>            
          }
        </View>         
          <TouchableOpacity
            onPress={() => setState('write')}
            style={styles.button}>
              {
                (anotation == '') ?
                <Text style={styles.buttonText}>
                  +
                </Text>
                :
                <Text style={styles.buttonTextEdit}>
                  Editar
                </Text>
              }
          </TouchableOpacity>
      </View>
    );
  } else if (state == 'write') {
    return (
      <View style={{flex: 1, marginTop: Constants.statusBarHeight}}> 
        <StatusBar style="dark" />
        <View style={styles.barTitle}>
          <Text style={styles.barTitleText}>App Anotações</Text>
        </View>
        <View style={styles.body}>
          
          <TextInput 
            style={styles.bodyText}
            autoFocus={true}
            value={anotation}  
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => setAnotation(text)}
          />
        </View>
        <TouchableOpacity 
          onPress={updateText} 
          style={styles.buttonSave}>
            <Text style={styles.buttonSaveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

  
}

const styles = StyleSheet.create({
  barTitle: {
    backgroundColor: 'blue',
    padding: 20,
  },

  barTitleText: {
    color: 'white',
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold"
  },

  body: {
    padding:20
  },

  bodyText: {
    textAlign: 'justify',
    fontSize: 20,
    fontStyle: "normal",
    textAlignVertical: "top"
  },

  bodyTextNoText: {
    textAlign: 'justify',
    fontSize: 20,
    fontStyle: "normal",
    textAlignVertical: "top",
    opacity: 0.3
  },

  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    height: 50,
    width: 50,
    borderRadius: 25
  },

  buttonText: {
    color: 'white',
    fontSize: 25
  },

  buttonTextEdit: {
    color: 'white',
    fontSize: 15
  },

  buttonSave: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: 'blue',
    height: 50,
    width: '100%'
  },

  buttonSaveText: {
    color: 'white',
    fontSize: 25,
    fontWeight: "normal"
  }
})
