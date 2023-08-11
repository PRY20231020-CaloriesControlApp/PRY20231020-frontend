import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';


const LoginScreen = ({ navigation, isAuthenticated, setIsAuthenticated, route, onLoginSuccess }) => {


  const blobStorageBaseUrl = 'https://pry20231020fnb6cf.blob.core.windows.net/';
  const containerName = 'pry20231020-dataset-ml';
  const blobName = '1';
  const blobtype = '.jpg';

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


          //navigation.replace('Home', { user_token: user_token, user_name: user_name, id_person: id_person });
          navigation.replace('Home', { dataPerson: data }); // Pasar el objeto 'data' como parámetro
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
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>Mi Aplicación</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={{ uri: imageUrl }} // URL de la imagen
          style={styles.logo}
        />
      </View>

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
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFA500',
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
    color: '#FFA500',
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
    width: 200,
    height: 200,
    resizeMode: 'contain', // Ajusta el modo de escalado de la imagen
    borderRadius: 100, // Mitad del ancho y altura para hacerlo circular

  }
});

export default LoginScreen;
