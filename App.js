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

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated, e.g., through authentication token
    const checkAuthentication = () => {
      // Simulating authentication check
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 30000);
    };

    checkAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#FFA500',
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
            <Tab.Screen name="Inicio" component={HomeScreen} />
            <Tab.Screen name="Progreso" component={ProgressScreen} />
            <Tab.Screen name="Notificaciones" component={NotificationsScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
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
