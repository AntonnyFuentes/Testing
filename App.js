/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const [itWorks, setItWorks] = useState(false);

  const data = {
    email: 'cecy+60@kokonutstudio.com',
    username: 'cecy+60@kokonutstudio.com',
    password: 'Kokonut1',
  };

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  function login() {
    fetch('https://API.drminded.com/Token/', config)
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then((response) => {
        let responseJson = {status: response[0], data: response[1]};
        console.log('Response: ', responseJson.status);
        console.log('Data: ', responseJson.data);
        if (responseJson.status == 200) {
          console.log('funciona 200');

          setItWorks(!itWorks);
        } else if (responseJson.status == 202) {
          console.log('funciona 202');
          setItWorks(!itWorks);
        } else {
          console.log('no funciona, error');
        }
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
        errorCallback(500, error);
      });
  }

  return (
    <>
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={styles.sectionTitle} onPress={() => login()}>
            Presiona aqui
          </Text>
          {itWorks && <Text style={styles.sectionTitle}>Step Two</Text>}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: '20%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});
