import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterStepThree = ({ onNext, onPrevious }) => {
  const [activityLevel, setActivityLevel] = useState('');

  const handleNext = () => {
   /* if (!activityLevel) {
      Alert.alert('¡Atención!', 'Por favor, selecciona un nivel de actividad física');
      return;
    }*/

    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Registro - Paso 3</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nivel de Actividad Física</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioButton, activityLevel === 'Poco o ningún ejercicio' && styles.radioButtonSelected]}
            onPress={() => setActivityLevel('Poco o ningún ejercicio')}
          >
            <Text>Poco o ningún ejercicio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, activityLevel === 'Ejercicio ligero (1 - 3 días por semana)' && styles.radioButtonSelected]}
            onPress={() => setActivityLevel('Ejercicio ligero (1 - 3 días por semana)')}
          >
            <Text>Ejercicio ligero (1 - 3 días por semana)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, activityLevel === 'Ejercicio moderado (3 - 5 días por semana)' && styles.radioButtonSelected]}
            onPress={() => setActivityLevel('Ejercicio moderado (3 - 5 días por semana)')}
          >
            <Text>Ejercicio moderado (3 - 5 días por semana)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, activityLevel === 'Ejercicio fuerte (6 - 7 días por semana)' && styles.radioButtonSelected]}
            onPress={() => setActivityLevel('Ejercicio fuerte (6 - 7 días por semana)')}
          >
            <Text>Ejercicio fuerte (6 - 7 días por semana)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, activityLevel === 'Ejercicio muy fuerte' && styles.radioButtonSelected]}
            onPress={() => setActivityLevel('Ejercicio muy fuerte')}
          >
            <Text>Ejercicio muy fuerte</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onPrevious}>
          <Text style={styles.backButtonText}>Atrás</Text>
        </TouchableOpacity>
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
    backgroundColor: '#FFA500',
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
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioContainer: {
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonSelected: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterStepThree;
