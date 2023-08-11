import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const RegisterStepThree  = ({ onNext, onPrevious,formData, setFormData }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleNext = () => {
    onNext();
  };

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Registro Exitoso</Text>
        <Text style={styles.subtitle}>Usted se ha registrado correctamente.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onPrevious}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    marginBottom: 20,
  },
  checkImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterStepThree ;
