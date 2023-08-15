import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


const LoginScreen = ({ navigation, onLoginSuccess }) => {


  const blobStorageBaseUrl = 'https://pry20231020fnb6cf.blob.core.windows.net/';
  const containerName = 'pry20231020-dataset-ml';
  const blobName = 'logoApp';
  const blobtype = '.png';

  const imageUrl = `${blobStorageBaseUrl}${containerName}/${blobName}${blobtype}`;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const datos = {
      user_name: email,
      password: password

    };

    fetch('https://pry20231020-fn.azurewebsites.net/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Cambio 'application/x-www-form-urlencoded' a 'application/json'
      },
      body: JSON.stringify(datos),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }
        return response.json(); // Usamos response.json() para obtener la respuesta como un objeto JavaScript
      })
      .then(function (data) {
        console.log('data =', data);

        const id_person = data.id_person;
        const user_name = data.user_name;
        const user_token = data.token;
        console.log("Login screen", user_token + "  - " + user_name + " -  " + id_person); // 'data' será el string de la respuesta
        if (user_token && user_name && id_person) {
          //setIsAuthenticated(true); // Utiliza directamente setIsAuthenticated
         onLoginSuccess(data);


          navigation.replace('Inicio', { dataPerson: data }); // Pasar el objeto 'data' como parámetro
          navigation.replace('Perfil', { dataPerson: data }); // Pasar el objeto 'data' como parámetro
          navigation.replace('Progreso', { dataPerson: data }); // Pasar el objeto 'data' como parámetro
        } else {
          console.log('Error en la solicitud de inicio de sesión');
        }
      })
      .catch(function (error) {
        console.error('Error al obtener la respuesta:', error);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  return (
    <View style={styles.container}>
     

      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
     {/* <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
  </TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  input: {
    width: '70%',
    height: 40,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDA615',
  },
  loginButton: {
    backgroundColor: '#FDA615',
    
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 30,

  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#FDA615',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appTitleContainer: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain', // Ajusta el modo de escalado de la imagen
    backgroundColor: 'white',

  }
});

export default LoginScreen;
