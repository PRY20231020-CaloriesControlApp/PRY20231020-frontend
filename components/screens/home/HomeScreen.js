import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, Dimensions, ScrollView, FlatList, Switch } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const breakfastData = [
    { id: '1', name: 'Leche', calories: 100, grams: 200, selected: false },
    { id: '2', name: 'Fruit Salad', calories: 20, grams: 200, selected: false },
    { id: '3', name: 'Eggs and Toast', calories: 50, grams: 200, selected: false },
    { id: '4', name: 'Eggs and Toast', calories: 180, grams: 200, selected: false },
  ];

  const lunchData = [
    { id: '8', name: 'Lentejas', calories: 100, grams: 200, selected: false },
    { id: '9', name: 'Vegetable Stir-Fry', calories: 100, grams: 200, selected: false },
    { id: '10', name: 'Quinoa Bowl', calories: 100, grams: 200, selected: false },
    { id: '11', name: 'Quinoa Bowl', calories: 100, grams: 200, selected: false },
  ];

  const dinnerData = [
    { id: '11', name: 'Salmon with Roasted Vegetables', calories: 100, grams: 200, selected: false },
    { id: '12', name: 'Pasta Primavera', calories: 100, grams: 200, selected: false },
    { id: '13', name: 'Steak and Sweet Potato Mash', calories: 100, grams: 200, selected: false },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Roboto: require('../../../assets/fonts/Roboto/Roboto-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleReload = (mealType) => {
    setSelectedOption('');
    setSelectedMealType(mealType);
    setModalVisible(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
  
    const datos = {
      name: "Teresa",
      user_name: "Teresa123",
      password: "qwe",
      birth_date: "1997-02-15",
      gender: "F",
      height: 168,
      weight: 85.3,
      activity_level: 1
    };
  
    fetch('https://pry20231020-fn.azurewebsites.net/api/registro?sKB1vrW_2Zx4HC0xuAeLZI-mTpe4LAX4c_DtfhoPBwP7AzFuyH2P_g==', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Cambio 'application/x-www-form-urlencoded' a 'application/json'
      },
      body: JSON.stringify(datos),
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Error en la solicitud. Código de estado: ' + response.status);
      }
      return response.text(); // Usamos response.text() para obtener la respuesta como un string
    })
    .then(function (data) {
      console.log('data =', data); // 'data' será el string de la respuesta
      // Aquí puedes procesar los datos de la respuesta si es necesario
    })
    .catch(function (error) {
      console.error('Error al obtener la respuesta:', error);
    });
  };
  

  const handleCheckboxToggle = (meal) => {
    const updatedMeals = [...selectedMeals];
    const index = updatedMeals.findIndex((item) => item.id === meal.id);

    if (index === -1) {
      updatedMeals.push(meal);
    } else {
      updatedMeals.splice(index, 1);
    }

    setSelectedMeals(updatedMeals);
  };

  const renderMealItem = ({ item }) => {
    return (
      <View style={styles.mealItem}>
        <View style={styles.mealItemContent}>
          <View style={styles.leftColumn}>
            <Text style={styles.mealName}>{item.name}</Text>
            <Text style={styles.mealInfo}>{item.calories} kcal</Text>
            <Text style={styles.mealInfo}>{item.grams} g</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={selectedMeals.some((meal) => meal.id === item.id)}
              onValueChange={() => handleCheckboxToggle(item)}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderCategory = (mealType, data) => {
    return (
      <View style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <Text style={styles.subHeading}>{mealType}</Text>
          <Ionicons name="md-refresh" size={24} color="#FFA500" onPress={() => handleReload(mealType)} />

        </View>
        <ScrollView horizontal>
          <FlatList data={data} renderItem={renderMealItem} keyExtractor={(item) => item.id} />
        </ScrollView>
      </View>
    );
  };

  if (!fontsLoaded) {
    // Muestra un indicador de carga o una pantalla de carga mientras se cargan las fuentes
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/*<Text style={styles.heading}></Text>*/}

        <View style={styles.progressContainer}>
          <CircularProgress
            value={selectedMeals.reduce((total, meal) => total + meal.calories, 0)}
            maxValue={1800}
            radius={80}
            duration={2000}
            progressValueColor={'#FFA500'}
            title={'Kcal'}
            titleColor={'#FFA500'}
            titleStyle={{ fontWeight: 'bold' }}
            textStyle={{ fontWeight: 'bold' }}
            activeStrokeColor={'#FFA500'}
            inActiveStrokeColor={'#FFFFFF'}
          />

          <Text style={styles.progressText}>
            {selectedMeals.reduce((total, meal) => total + meal.calories, 0)}/1800 kcal
          </Text>
        </View>

        {renderCategory('Desayuno', breakfastData)}
        {renderCategory('Almuerzo', lunchData)}
        {renderCategory('Cena', dinnerData)}

        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccione una opción</Text>
            <Button title="Menetras" onPress={() => handleOptionSelect('Menetras')} />
            <Button title="Mariscos" onPress={() => handleOptionSelect('Mariscos')} />
            <Button title="Pescado" onPress={() => handleOptionSelect('Pescado')} />
            <Button title="Pastas" onPress={() => handleOptionSelect('Pastas')} />
            {/* Agrega más opciones según sea necesario */}
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    fontFamily: 'Roboto', // Establece la fuente de texto como Roboto
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  mealItem: {
    marginVertical: 8,
    width: windowWidth * 0.9,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 10,
    marginLeft: 16,
  },
  mealItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
  },
  switchContainer: {
    alignSelf: 'flex-end',
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mealInfo: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'left',
    marginLeft: 6,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    color: '#FFFFFF',
  },
  progressText: {
    fontSize: 16,
    marginTop: 8,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HomeScreen;
