import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Button } from 'react-native'; // Asegúrate de agregar 'Button' aquí

import { Picker } from '@react-native-picker/picker';

import DateTimePicker from '@react-native-community/datetimepicker';
import { showDatepicker } from '@react-native-community/datetimepicker';

import { SelectList } from 'react-native-dropdown-select-list'


const RegisterStepTwo = ({ onNext, onPrevious, formData, setFormData }) => {
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleNext = () => {
    if (!birthdate || !gender || !height || !weight) {
      Alert.alert('¡Atención!', 'Por favor, completa todos los campos obligatorios');
      return;
    }

    onNext();
  };



  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Esto se configura en 'false' si es Android
    setDate(currentDate);

    if (currentDate) {
      const formattedDate = formatDate(currentDate);
      setFormData({ ...formData, birth_date: formattedDate });
    }
  };



  const formatDate2 = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  /*
    const formatDate = (date) => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC', // Establece la zona horaria en UTC
      };
      return new Date(date).toLocaleDateString('es', options);
    };*/
  const genderOptions = [
    { key: 'F', value: 'Femenino' },
    { key: 'M', value: 'Masculino' },
  ];

  const activityFactorOptions = [
    { key: 1.5, value: 'Sedentaria o ligero' },
    { key: 1.8, value: 'Moderado' },
    { key: 2.2, value: 'Activo' },

 
  ];
  return (
    <View style={styles.container}>
     {/* <View style={styles.header}>
        <Text style={styles.headerText}>Registro - Paso 2</Text>
  </View>*/}
      <View style={styles.formContainer}>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha de Nacimiento (aaaa/mm/dd)</Text>
          <TouchableOpacity style={styles.inputDate} onPress={showDatepicker}>
            <Text>{formData.birth_date ? (
              <Text>{formatDate(new Date(formData.birth_date))}</Text>
            ) : (
              <Text style={styles.placeholderText}>Seleccionar fecha</Text>
            )}</Text>
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
          <Text style={styles.label}>Sexo</Text>
          <SelectList
            boxStyles={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#FDA615',
              borderRadius: 8,
            }}
            setSelected={(key) => {
              const selectedValue = genderOptions.find((option) => option.key === key)?.value || '';
              setFormData({ ...formData, gender: key });
            }}
            data={genderOptions}
            save="key"
            selected={formData.gender} // Valor seleccionado
            placeholder="Seleccione"

          />
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
          <Text style={styles.label}>Peso actual (kg)</Text>
          <TextInput
            //placeholder="Peso actual"
            style={styles.input}
            value={formData.weight.toString()} // Mantén el número tal como está
            onChangeText={(value) => setFormData({ ...formData, weight: value })}

          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nivel de Actividad Física</Text>
          <SelectList
            boxStyles={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#FDA615',
              borderRadius: 8,
            }}
            setSelected={(key) => {
              const selectedValue = activityFactorOptions.find((option) => option.key === key)?.value || '';
              setFormData({ ...formData, activity_factor: key });
            }}
            data={activityFactorOptions}
            save="key"
            selected={formData.activity_factor} // Valor seleccionado
            placeholder="Seleccione"

          />
        </View>


      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onPrevious}>
          <Text style={styles.backButtonText}>Atrás</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Registrar</Text>
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
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#FDA615',
    paddingHorizontal: 20,
    borderRadius: 8,
   // alignItems: 'center', // Centrar verticalmente el contenido
  //  justifyContent: 'center', // Centrar horizontalmente el contenido

  },
  inputDate: {
    height: 45,
    borderWidth: 1,
    borderColor: '#FDA615',
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row', // Para alinear verticalmente el contenido
    alignItems: 'center', // Centrar verticalmente el contenido
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom:40,
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
    backgroundColor: '#FDA615',
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
    borderColor: '#FDA615',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
  },
  pickerItem: {
    height: 40,
    textAlignVertical: 'center',
  },
 
});

export default RegisterStepTwo;
