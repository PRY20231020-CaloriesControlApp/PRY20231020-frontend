import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const datos = {
      user_name: email,
      password: password
    };

    // Realizar la solicitud POST a la API
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
      return response.text(); // Usamos response.text() para obtener la respuesta como un string
    })
    .then(function (data) {
      console.log('data =', data); // 'data' será el string de la respuesta
      const jsonData = JSON.stringify(data); // Convertir el texto a objeto JSON
      const id_person = jsonData.idPerson;
      const user_name = jsonData.user_name;
      const token = jsonData.token;
      console.log('jsonData =', jsonData + token + user_name + id_person ); // 'data' será el string de la respuesta
      if (token && user_name && id_person) {
        navigation.navigate('Inicio', {
          token,
          userData: { user_name, id_person },
        });
      } else {
        // Aquí puedes mostrar un mensaje de error si la solicitud no fue exitosa
        console.log('Error en la solicitud de inicio de sesión');
      }
    })
    .catch(function (error) {
      console.error('Error al obtener la respuesta:', error);
    });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Correo"
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
});

export default LoginScreen;
