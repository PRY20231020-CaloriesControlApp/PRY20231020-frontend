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


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user_token = 'valor_del_token'; // Reemplaza 'valor_del_token' con el token real
  const user_name = 'valor_del_user_name'; // Reemplaza 'valor_del_user_name' con el nombre de usuario real
  const id_person = '10'; // Reemplaza 'valor_del_id_person' con el id de la persona real

  const [userToken, setUserToken] = useState('');
  const [userName, setUserName] = useState('');
  const [personId, setPersonId] = useState('');

  const handleLoginSuccess2 = (token, name, id) => {
    setIsAuthenticated(true);
    setUserToken(token);
    setUserName(name);
    setPersonId(id);
  };

  const [dataPerson, setDataPerson] = useState({});

  const handleLoginSuccess = (data) => {
    setIsAuthenticated(true);
    setDataPerson(data);
    
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Tab.Navigator name='MainTab'
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: '#FFA500',
              tabBarStyle: {
                display: 'flex',
              },
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
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
            <Tab.Screen name="Home" component={HomeScreen} initialParams={{ dataPerson }} />
            {/* <Tab.Screen name="Home" component={HomeScreen} />*/}

            <Tab.Screen name="Progreso" component={ProgressScreen} />
            <Tab.Screen name="Notificaciones" component={NotificationsScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} initialParams={{ dataPerson }}/>
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} {...props} onLoginSuccess={handleLoginSuccess} />
                
              )}
            </Stack.Screen>
            <Stack.Screen name="Registro" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{dataPerson:'',}}/>
            <Stack.Screen name="Perfil" component={ProfileScreen} initialParams={{dataPerson:'',}}/>

          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
  },
});

export default App;
