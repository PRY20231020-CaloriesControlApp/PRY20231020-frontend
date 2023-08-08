import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RegisterStepTwo = ({ onNext, onPrevious, formData, setFormData }) => {
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleNext = () => {
    /*if (!birthdate || !gender || !height || !weight) {
      Alert.alert('¡Atención!', 'Por favor, completa todos los campos obligatorios');
      return;
    }*/

    onNext();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setBirthdate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Registro - Paso 2</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha de Nacimiento (dd/mm/aaaa)</Text>
          <TextInput
            //placeholder="Fecha de Nacimiento"
            style={styles.input}
            //value={birthdate}
            //onChangeText={setBirthdate}
            value={formData.birth_date}
            onChangeText={(value) => setFormData({ ...formData, birth_date: value })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sexo</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setFormData({ ...formData, gender: itemValue })}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Femenino" value="F" />
              <Picker.Item label="Masculino" value="M" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Estatura (cm)</Text>
          <TextInput
            //placeholder="Estatura (cm)"
            style={styles.input}
            //value={height}
            //onChangeText={setHeight}
            keyboardType="numeric"
            value={formData.height.toString()} // Mantén el número tal como está
            onChangeText={(value) => setFormData({ ...formData, height: parseInt(value) })} // Convierte el valor a entero antes de almacenarlo en el estado
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Peso actual</Text>
          <TextInput
            //placeholder="Peso actual"
            style={styles.input}
            value={formData.weight.toString()} // Mantén el número tal como está
            onChangeText={(value) => setFormData({ ...formData, weight: value})} 

            

                    
          />
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
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#FFA500',
    paddingHorizontal: 10,
    borderRadius: 8,
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
  pickerContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    height: 40,
    textAlignVertical: 'center',
  }
});

export default RegisterStepTwo;
