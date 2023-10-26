import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert, Modal, Button } from 'react-native'; // Asegúrate de importar 'Modal' y 'Button'
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  API_LOGIN_URL,
  BLOB_STORAGE_BASE_URL,
  CONTAINER_NAME,
  API_REGISTER_URL
} from '../../../constants/apiConstants';


const LoginScreen = ({ navigation, onLoginSuccess }) => {


  const blobStorageBaseUrl = BLOB_STORAGE_BASE_URL;
  const containerName = CONTAINER_NAME;
  const blobName = 'logoApp';
  const blobtype = '.png';

  const imageUrl = `${blobStorageBaseUrl}${containerName}/${blobName}${blobtype}`;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');

  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [birthDateAnswer, setBirthDateAnswer] = useState('');
  const [grandfatherNameAnswer, setGrandfatherNameAnswer] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleForgotPassword = () => {
    setIsForgotPasswordModalVisible(true);
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Esto se configura en 'false' si es Android
    setDate(currentDate);

    if (currentDate) {
      const formattedDate = formatDate(currentDate);
      setBirthDateAnswer(formattedDate );
    }
  };

  const handlePasswordRecovery = () => {
    console.log("ingrese a handlePasswordRecovery", username)


    const recoveryData = {
      user_name: username, // Debes usar el correo del usuario
      password: newpassword,
      birth_date: birthDateAnswer,
      security_question_answer: grandfatherNameAnswer,
      action: 'update_password',
    };

    fetch(API_REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recoveryData),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        // Manejar la respuesta exitosa de la API aquí
        console.log('Respuesta exitosa de la API:', data);

        if (data.action_result === "OK") {
          // Si la recuperación de contraseña fue exitosa, muestra un mensaje de éxito
          Alert.alert('Éxito', 'La contraseña se ha restablecido con éxito.');
          setIsForgotPasswordModalVisible(false);
        } else {
          console.log(" ERROR ERROR ERROR ")
          // Si la recuperación de contraseña no fue exitosa, muestra un mensaje de error
          Alert.alert('Error', 'No se pudo restablecer la contraseña. Verifique los datos e inténtelo nuevamente.');
        }


        // Si la recuperación de contraseña fue exitosa, puedes mostrar un mensaje o realizar alguna acción adicional.
      })
      .catch(function (error) {
        // Manejar errores de la API aquí
        console.error('Error al obtener la respuesta de la API:', error);

        // Aquí puedes mostrar un mensaje de error al usuario si la recuperación de contraseña falló.
      });

    // Cerrar el modal después de enviar la solicitud a la API

  };

  const handleLogin = () => {
    const datos = {
      user_name: email,
      password: password

    };

    fetch(API_LOGIN_URL, {
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
          Alert.alert('Error', 'Los datos de inicio de sesión son incorrectos.');

        }
      })
      .catch(function (error) {
        console.error('Error al obtener la respuesta:', error);
        Alert.alert('Error', 'Los datos de inicio de sesión son incorrectos.');

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

      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordButtonText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Modal para recuperación de contraseña */}
      <Modal
        visible={isForgotPasswordModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Restablecer Contraseña</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                style={styles.answerInput}
                value={username}
                onChangeText={setUsername}
              />
            </View>
           
           


            <View style={styles.inputContainer}>
              <Text style={styles.label}>¿Cuál es tu fecha de nacimiento?</Text>
              <TouchableOpacity style={styles.inputDate} onPress={showDatepicker}>
                <Text>
                  {birthDateAnswer ? (
                    <Text>{birthDateAnswer}</Text>
                  ) : (
                    <Text style={styles.placeholderText}>Seleccionar fecha</Text>
                  )}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>¿Cuál es el nombre de tu abuelo?</Text>
              <TextInput
                style={styles.answerInput}
                value={grandfatherNameAnswer}
                onChangeText={setGrandfatherNameAnswer}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nueva contraseña</Text>
              <TextInput
                style={styles.answerInput}
                value={newpassword}
                secureTextEntry
                onChangeText={setNewPassword}
              />
            </View>
            <TouchableOpacity style={styles.recoveryButton} onPress={handlePasswordRecovery}>
              <Text style={styles.recoveryButtonText}>Restablecer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => setIsForgotPasswordModalVisible(false)}>
              <Text style={styles.forgotPasswordButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  inputDate: {
    height: 40,
    borderWidth: 1,
    borderColor: '#FDA615',
    paddingLeft: 8,
    borderRadius: 8,
    flexDirection: 'row', 
    alignItems: 'center',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',



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

  },
  forgotPasswordButton: {
    marginTop: 15,
  },
  forgotPasswordButtonText: {
    color: '#FDA615',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    height: 'auto',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 8,
    justifyContent: 'center', // Centrar verticalmente
    alignItems: 'center', // Centrar horizontalmente
    paddingVertical: 30,
  },
  label: {
    marginBottom: 10, // Margen inferior para separar los labels de los inputs
    marginLeft: 32,
    //marginRight: 'auto',
  },
  inputContainer: {
    marginBottom: 20, // Margen inferior para separar los pares de label e input
    width: '100%'
  },
  answerInput: {
    width: '80%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDA615',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recoveryButton: {
    backgroundColor: '#FDA615',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  recoveryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'orange', // Fondo naranja
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
