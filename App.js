import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

import LoginScreen from './components/screens/login/LoginScreen';
import RegisterScreen from './components/screens/register/RegisterScreen';

import HomeScreen from './components/screens/home/HomeScreen';
import ProgressScreen from './components/screens/progress/ProgressScreen';
import NotificationsScreen from './components/screens/notifications/NotificationsScreen';
import ProfileScreen from './components/screens/profile/ProfileScreen';
import ChoiceScreen from './components/screens/intro/ChoiceScreen';
//import WelcomeScreen from './components/screens/intro/WelcomeScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);




  const [dataPerson, setDataPerson] = useState({});

  const handleLoginSuccess = (data) => {
    setIsAuthenticated(true);
    setDataPerson(data);

  };

  const handleLoginSuccess2 = (data) => {
    setIsAuthenticated(true);
    setDataPerson(data);

  };

  const updateProfile = (data) => {
    setDataPerson(data);

  };

  const logOutSuccess = () => {
    console.log("logOutSuccess")
    setIsAuthenticated(false);
    setDataPerson({});

  };


  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Tab.Navigator name='MainTab'
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: '#FDA615',
              tabBarStyle: {
                display: 'flex',
              },
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Inicio') {
                  iconName = 'home';
                } else if (route.name === 'Progreso') {
                  iconName = 'bar-chart';
                } else if (route.name === 'Notificaciones') {
                  iconName = 'heart';
                } else if (route.name === 'Perfil') {
                  iconName = 'user';
                }

                return (
                  <FontAwesome name={iconName} size={size} color={color} />
                );
              },
            })}


          >
            <Tab.Screen name="Inicio" component={HomeScreen} initialParams={{ dataPerson }} />
            {/* <Tab.Screen name="Home" component={HomeScreen} />*/}

            <Tab.Screen name="Progreso" component={ProgressScreen} initialParams={{ dataPerson }} />
            <Tab.Screen name="Notificaciones" component={NotificationsScreen} />
            {/* <Tab.Screen name="Perfil" component={ProfileScreen} initialParams={{ dataPerson }} />*/}

            <Tab.Screen
              name="Perfil"
              component={ProfileScreen}
              initialParams={{
                dataPerson: dataPerson,
                logOutSuccess: logOutSuccess, // Aquí pasas la función logOutSuccess
              }}
            />
          </Tab.Navigator>
        ) : (

          <Stack.Navigator>
            {/*<Stack.Screen name="Bienvenida" component={WelcomeScreen} options={{ headerShown: false }} />*/}
            <Stack.Screen name="ChoiceScreen" component={ChoiceScreen} options={{ headerShown: false }} />

            {/*  <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />
              )}
              </Stack.Screen>*/}
            <Stack.Screen
              name="Login"
              options={{
                title: 'Inicio de Sesión',
                headerStyle: {
                  backgroundColor: '#FDA615', // Fondo naranja para el encabezado

                },
                headerTintColor: 'white', // Color de las letras en el encabezado
                headerTitleStyle: {
                  fontSize: 22, // Ajustar el tamaño de la fuente aquí
                },
              }}
            >
              {(props) => (
                <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />
              )}
            </Stack.Screen>


            <Stack.Screen name="Registro"
            options={{
              title: 'Registrarse',
              headerStyle: {
                backgroundColor: '#FDA615', // Fondo naranja para el encabezado

              },
              headerTintColor: 'white', // Color de las letras en el encabezado
              headerTitleStyle: {
                fontSize: 22, // Ajustar el tamaño de la fuente aquí
              },
            }}
            >
              {(props) => {
                return (
                  <RegisterScreen
                    {...props}
                    onRegistrationComplete={handleLoginSuccess}
                    handleLoginSuccess2={handleLoginSuccess2}
                  />
                );
              }}
            </Stack.Screen>
            <Stack.Screen name="Inicio" component={HomeScreen} initialParams={{ dataPerson: '', }} />
            {/*  <Stack.Screen
              name="Perfil"
              component={ProfileScreen}
              initialParams={{ dataPerson: '' }}
              updateDataPerson={updateProfile}

            />*/}
            <Stack.Screen name="Perfil">
              {(props) => (
                <ProfileScreen {...props} initialParams={{ dataPerson: '' }} updateDataPerson={updateProfile} logOutSuccess={logOutSuccess} />
              )}
            </Stack.Screen>


            <Stack.Screen name="Progreso" component={ProgressScreen} initialParams={{ dataPerson: '', }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDA615',
    justifyContent: 'center',
  },
});

export default App;
