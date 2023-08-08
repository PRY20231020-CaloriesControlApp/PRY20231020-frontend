import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../home/HomeScreen';
import RegisterStepOne from './RegisterStepOne';
import RegisterStepTwo from './RegisterStepTwo';
import RegisterStepThree from './RegisterStepThree';
import RegisterStepFour from './RegisterStepFour';

const Stack = createStackNavigator();

const RegisterScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
    password: '',
    birth_date: '',
    gender: '',
    height: 0,
    weight: 0,
    activity_factor: 2,
    caloric_reduction: 15,
    action: 'insert',
    id_person: 0
  });

  const handleNextStep = () => {
    if (currentStep === totalSteps) {
      console.log('Registro completado');
      //setFormData (parseFloat(formData.weight))
      console.log('Datos del formulario:', formData); // Muestra los datos del formulario en la consola

      fetch('https://pry20231020-fn.azurewebsites.net/api/registro?', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Error en la solicitud. Código de estado: ' + response.status);
          }
          return response.json(); // Parseamos la respuesta como JSON
        })
        .then(function (data) {
          console.log("+++++data" + JSON.stringify(data));
          //navigation.navigate('HomeScreen');
          navigation.replace('Home', { dataPerson: data });
          navigation.replace('Perfil', { dataPerson: data }); // Pasar el objeto 'data' como parámetro
          navigation.replace('Progreso', { dataPerson: data }); // Pasar el objeto 'data' como parámetro

        })
        .catch(function (error) {
          console.error('Error al obtener la respuesta:', error);
        });
        console.log('Registro completado******');

      return;

    }

    switch (currentStep) {
      case 2:
        // Ejemplo: Convertir 'weight' a float
        setFormData({
          ...formData,
          weight: parseFloat(formData.weight),
        });
        break;
      case 3:
        // Ejemplo: Cambiar 'activity_factor' por 1.5 en float
        if (formData.activity_factor === 'Sedentaria o ligero') {
          setFormData({
            ...formData,
            activity_factor: 1.5,
          });
        } else if (formData.activity_factor === 'Moderado') {

          setFormData({
            ...formData,
            activity_factor: 1.8,
          });
        } else {

          setFormData({
            ...formData,
            activity_factor: 2.2,
          });
        }
        break;
      default:
        break;
    }
    console.log('Datos del formulario:', formData); // Muestra los datos del formulario en la consola


    setCurrentStep(currentStep + 1);
  };



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RegisterStepOne onNext={handleNextStep} formData={formData} setFormData={setFormData} />;
      case 2:
        return <RegisterStepTwo onNext={handleNextStep} onPrevious={() => setCurrentStep(currentStep - 1)} formData={formData} setFormData={setFormData} />;
      case 3:
        return <RegisterStepThree onNext={handleNextStep} onPrevious={() => setCurrentStep(currentStep - 1)} formData={formData} setFormData={setFormData} />;
      case 4:
        return <RegisterStepFour onNext={handleNextStep} onPrevious={() => setCurrentStep(currentStep - 1)} formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStep()}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default App;


