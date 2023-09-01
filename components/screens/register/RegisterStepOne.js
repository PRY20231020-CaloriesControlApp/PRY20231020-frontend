import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

const RegisterStepOne = ({ onNext, formData, setFormData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');




  const handleNext = () => {
     if (formData.name === '' || formData.user_name === '' || formData.password === '' || confirmPassword === '') {
      Alert.alert('¡Atención!', 'Por favor, completa todos los campos.');
      return;
    }
    if (formData.password !== confirmPassword) {
      Alert.alert('¡Atención!', 'Las contraseñas no coinciden');
      return;
    }

    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            //placeholder="Ingrese su Nombre"
            style={styles.input}
            //value={name}
            // onChangeText={setName}
            value={formData.name}
            onChangeText={(value) => setFormData({ ...formData, name: value })}

          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            //placeholder="Ingrese su Correo electrónico"
            style={styles.input}
            //value={email}
            //onChangeText={setEmail}
            value={formData.user_name}
            onChangeText={(value) => setFormData({ ...formData, user_name: value })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pregunta de seguridad: ¿Cuál es el nombre de tu abuelo?</Text>
          <TextInput
            style={styles.input}
            value={formData.security_question_answer}
            onChangeText={(value) => setFormData({ ...formData, security_question_answer: value })}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FDA615',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',

  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#FDA615',
    paddingHorizontal: 10,
    borderRadius: 8,
    //alignItems: 'center', // Centrar verticalmente el contenido
    //justifyContent: 'center', // Centrar horizontalmente el contenido

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'center',
  },
  nextButton: {
    width: '50%',
    backgroundColor: '#FDA615',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterStepOne;
