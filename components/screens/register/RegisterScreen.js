import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../home/HomeScreen';
import RegisterStepOne from './RegisterStepOne';
import RegisterStepTwo from './RegisterStepTwo';
import RegisterStepThree from './RegisterStepThree';
import RegisterStepFour from './RegisterStepFour';

const Stack = createStackNavigator();

const RegisterScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNextStep = () => {
    if (currentStep === totalSteps) {
      console.log('Registro completado');
      navigation.navigate('HomeScreen');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RegisterStepOne onNext={handleNextStep} />;
      case 2:
        return <RegisterStepTwo onNext={handleNextStep} onPrevious={() => setCurrentStep(currentStep - 1)} />;
      case 3:
        return <RegisterStepThree onNext={handleNextStep} onPrevious={() => setCurrentStep(currentStep - 1)} />;
      case 4:
        return <RegisterStepFour onNext={handleNextStep} onPrevious={() => setCurrentStep(currentStep - 1)} />;
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
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default App;

