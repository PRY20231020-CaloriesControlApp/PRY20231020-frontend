import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, Dimensions, ScrollView, FlatList, Switch, Image, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const blobStorageBaseUrl = 'https://pry20231020fnb6cf.blob.core.windows.net/';
const containerName = 'pry20231020-dataset-ml';
const blobName = '1';
const blobtype = '.jpg';

const imageUrl = `${blobStorageBaseUrl}${containerName}/${blobName}${blobtype}`;


console.log('*****imageUrl  hHOLAAAAAA  ', imageUrl)

const { width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;


const HomeScreen = ({ route }) => {
  // const { userToken, userName, personId } = route.params;
  const { dataPerson } = route.params; // Obtener el objeto 'data' de los parámetros

  // Acceder a las propiedades del objeto 'data'
  const personId = dataPerson.id_person;
  const userName = dataPerson.user_name;
  const userToken = dataPerson.token;



  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalIngredientesVisible, setModalIngredientesVisible] = useState(false);
  const [currentDay, setCurrentDay] = useState('');
  const [data, setData] = useState([]);


  const [dataBreakfast, setDataBreakfast] = useState([]);
  const [dataLunch, setDataLunch] = useState([]);
  const [dataDinner, setDataDinner] = useState([]);

  const [breakfastSelected, setBreakfastSelected] = useState(false);
  const [lunchSelected, setLunchSelected] = useState(false);
  const [dinnerSelected, setDinnerSelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedBreakfast, setSelectedBreakfast] = useState([]);
  const [selectedLunch, setSelectedLunch] = useState([]);
  const [selectedDinner, setSelectedDinner] = useState([]);


  const calculateNet = (gender, weight, height, age, activity_factor) => {
    const PER_ETA = 0.1;

    try {
      weight = parseFloat(weight);
      height = parseFloat(height);
      age = parseInt(age);
    } catch (error) {
      throw new Error('El peso, altura y edad deben ser números válidos.');
    }

    let tmb;
    if (gender === 'M') {
      console.log("SOY HOMBRE ")
      tmb = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      console.log("SOY MUJER ")

      tmb = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const eta = tmb * PER_ETA;
    const net = (tmb + eta) * parseFloat(activity_factor);

    console.log('weight ' + weight);
    console.log('height ' + height);
    console.log('age ' + age);

    console.log('tmb ' + tmb);
    console.log('PER_ETA ' + PER_ETA);
    console.log('eta ' + eta);
    console.log('activity_factor ' + activity_factor);
    console.log('net ' + net);

    return net;
  };


  const calculateIMC = (height, weight) => {
    const heightMeters = height / 100;
    const imc = parseFloat(weight) / (heightMeters ** 2);

    if (imc < 18.5) {
      return [imc, 'Bajo', 1];
    } else if (imc <= 24.9) {
      return [imc, 'Normal', 2];
    } else if (imc <= 29.9) {
      console.log('sobrepesoss');
      return [imc, 'Sobrepeso', 3];
    } else if (imc <= 34.9) {
      return [imc, 'Obesidad I', 4];
    } else if (imc <= 39.9) {
      return [imc, 'Obesidad II', 5];
    } else {
      console.log('return', imc);
      return [imc, 'Obesidad III', 6];
    }
  };

  const obtainPercentageCaloricReduction = (imc_scale, caloric_reduction) => {
    let speed = 'Normal';
    if (caloric_reduction === 10) {
      speed = 'Lento';
    } else if (caloric_reduction === 15) {
      console.log('Normal ******');
      speed = 'Normal';
    } else if (caloric_reduction === 25) {
      speed = 'Rapido';
    }

    let percentageCaloricReduction = 0;

    if (imc_scale === 1) {
      if (speed === 'Lento' || speed === 'Normal' || speed === 'Rapido') {
        percentageCaloricReduction = 0;
      }
    } else if (imc_scale === 2) {
      if (speed === 'Lento') {
        percentageCaloricReduction = 5;
      } else if (speed === 'Normal') {
        percentageCaloricReduction = 10;
      } else if (speed === 'Rapido') {
        percentageCaloricReduction = 15;
      }
    } else if (imc_scale >= 3 && imc_scale <= 6) {
      if (speed === 'Lento') {
        percentageCaloricReduction = 10;
      } else if (speed === 'Normal') {
        percentageCaloricReduction = 15;
      } else if (speed === 'Rapido') {
        percentageCaloricReduction = 25;
      }
    }

    return percentageCaloricReduction;
  };

  const calculateTotalCalories = (net, percentageCaloricReduction) => {
    if (percentageCaloricReduction !== 0) {
      const calorieReduction = net * (percentageCaloricReduction / 100);
      const totalCalories = Math.round(net - calorieReduction);
      return totalCalories;
    } else {
      return Math.round(net);
    }
  };




  const isMealSelected = (mealType, item) => {
    return selectedMeals.some(
      (meal) => meal.id === item.id && meal.mealType === mealType
    );
  };




  //const connString = "dbname='postgres' user='pry20231020admin' host='pry20231020-db.postgres.database.azure.com' port='5432' password='P123456789**' sslmode='require'";


  const breakfastOptions = [
    { id: 1, name: 'Jugos' },
    { id: 2, name: 'Lácteos' },
    { id: 3, name: 'Harinas' },
    { id: 4, name: 'Bebidas Calientes' },
  ];

  const lunchOptions = [
    { id: 1, name: 'Pescados y Mariscos' },
    { id: 2, name: 'Carnes' },
    { id: 3, name: 'Menestras' },
    { id: 4, name: 'Pastas' },
    { id: 5, name: 'Arroces' },
    { id: 6, name: 'Sopas y Caldos' },
    { id: 7, name: 'Pollos' },
  ];

  const dinnerOptions = [
    { id: 1, name: 'Sopas y Caldos' },
    { id: 2, name: 'Pollo' },
    { id: 3, name: 'Carnes' },
    { id: 4, name: 'Pastas' },
    { id: 5, name: 'Arroces' },
    { id: 6, name: 'Lácteos' },
    { id: 7, name: 'Harinas' },
    { id: 8, name: 'Bebidas Calientes' },
  ];

  const mostrarModalIngredientes = (meal) => {
    setSelectedMeal(meal);
    setModalIngredientesVisible(true);
  };

  const ocultarModalIngredientes = () => {
    setSelectedMeal(null);
    setModalIngredientesVisible(false);
  };

  const renderIngredientes = () => {
    if (!selectedMeal) return null;

    return (
      <Modal visible={modalIngredientesVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, { color: '#FFA500', fontSize: 20, fontWeight: 'bold' }]}>
            {selectedMeal.name}
          </Text>
          {/* Agregar aquí la imagen de la comida */}
          <Image
            source={{ uri: imageUrl }} // Reemplazar 'URL_DE_LA_IMAGEN' con la URL de la imagen de la comida
            style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 16 }}
          />
          <Text style={[styles.subHeading, { color: '#FFA500', fontSize: 18 }]}>Ingredientes</Text>

          {selectedMeal.ingredients && selectedMeal.ingredients.length > 0 ? (

            <FlatList
              data={selectedMeal.ingredients}
              renderItem={({ item }) => (
                <View style={styles.ingredientContainer}>
                  <Text style={styles.ingredientName}>{item.ingredient_name}</Text>
                  <Text style={styles.ingredientDetail}>
                    Cantidad: {item.ingredient_weight} g     |     Calorías: {item.ingredient_calories} kcal
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.ingredient_name}
              contentContainerStyle={styles.flatlistContentContainer}
            />
          ) : (
            <Text style={{ color: '#FFA500' }}>No hay ingredientes disponibles.</Text>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={ocultarModalIngredientes}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };





  const breakfastDataFromAPI2 = [
    {
      ingredient_name: 'Arroz blanco corriente',
      ingredient_weight: 53.0,
      ingredient_calories: 188.6,
    },
    {
      ingredient_name: 'Pollo, carne pulpa',
      ingredient_weight: 105.0,
      ingredient_calories: 125.4,
    },
    // Agrega más ingredientes según sea necesario
  ];

  const lunchDataFromAPI = [
    {
      ingredient_name: 'Arroz blanco corriente',
      ingredient_weight: 53.0,
      ingredient_calories: 188.6,
    },
    {
      ingredient_name: 'Pollo, carne pulpa',
      ingredient_weight: 105.0,
      ingredient_calories: 125.4,
    },
    // Agrega más ingredientes según sea necesario
  ];

  const breakfastData = dataBreakfast
    ? [
      {
        //id: dataBreakfast.id_meal,
        id: 1,
        mealType: "Desayuno",
        name: dataBreakfast.healthy_equivalent_name,
        calories: dataBreakfast.calories_meal_type,
        ingredients: dataBreakfast.ingredients,
        selected: false,
      },
    ]
    : [];

  const lunchData = dataLunch
    ? [
      {
        id: 2,
        //id: dataLunch.id_meal,
        mealType: "Almuerzo",

        name: dataLunch.healthy_equivalent_name,
        calories: dataLunch.calories_meal_type,
        ingredients: dataLunch.ingredients,
        selected: false,
      },
    ]
    : [];

  const dinnerData = dataDinner
    ? [
      {
        id: 3,
        //id: dataDinner.id_meal,
        mealType: "Cena",

        name: dataDinner.healthy_equivalent_name,
        calories: dataDinner.calories_meal_type,
        ingredients: dataDinner.ingredients,
        selected: false,
      },
    ]
    : [];



  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Roboto: require('../../../assets/fonts/Roboto/Roboto-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const currentDayName = days[dayOfWeek];

    setCurrentDay(currentDayName);
    //handleOptionSelect('Desayuno', 1)

  }, []);

  const handleReload = (mealType) => {
    setSelectedOption('');
    setSelectedMealType(mealType);
    setModalVisible((prevState) => ({ ...prevState, [mealType]: true }));
  };



  const handleOptionSelect = (mealType, group_id) => {

    console.log(`mealType: ${mealType}`);
    console.log(`group_id: ${group_id}`);
    console.log("Dia de la semana " + currentDay)
    setSelectedOption(group_id);
    setModalVisible((prevState) => ({ ...prevState, [mealType]: false }));

    //console.log ("id_person+++++" + id_person)

    const datos = {
      dia: "Lunes",// currentDay
      comida_del_dia: mealType,//"Desayuno",//--
      grupo_comida: group_id,
      user_name: userName,
      person_id: personId,
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJzb25pZCI6OCwidXN1YXJpbyI6InRpdCIsInJvbCI6ImFkbWluaXN0cmFkb3IifQ.CEZwB8CYTiQs4gb3DSWyZjmahYkt0hZOvNROw5tVGRqWKuzTMq9HWZbNG1ipnGZD1ESCHlcv1gtOT_bDvpPR77BvrAa5nyPx6zwSmTPcf708YusnGQdX_q6mJgFSmwjyElL8kMioIqvRGv9Sg1b6igZlahCkZ3p7oRtq5Oj5AwgfVwpRvHhbkD9LjWGbMmevQ3E-04IQEqMgbc_OrTj86flB1zuIIuGMwJ8ZpdQA6sl5SoDBOkiS7S8OfFyk1caWyPCE5a7bkNNHKmnr7mExPE4nu1VLftyQsmAmKj9GwnifO_lmYS81tN4jwyqIBL3RJn0Di-ZX5_a7bGt6QXx3BQ"
    };

    fetch('https://pry20231020-fn.azurewebsites.net/api/recommendation?', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }
        return response.json(); // Parseamos la respuesta como JSON
      })
      .then(function (data) {

        // Utilizamos los datos recibidos de la API aquí
        const ingredientNames = data.ingredients.map((ingredient) => ingredient.ingredient_name);
        console.log("+++++data" + JSON.stringify(data));
        console.log("data" + ingredientNames)
        switch (mealType) {
          case 'Desayuno':
            setDataBreakfast(data || []);
            //setDataBreakfastIngredients(data.ingredients);
            break;
          case 'Almuerzo':
            setDataLunch(data || []);
            //setDataLunchIngredients(data.ingredients);
            break;
          case 'Cena':
            setDataDinner(data || []);
            //setDataDinnerIngredients(data.ingredients);
            break;
          default:
            break;
        }

        setData(data);

        const selectedMealData = {
          name: data.healthy_equivalent_name,
          ingredients: data.ingredients,
        };

        setSelectedMeal(selectedMealData);
      })
      .catch(function (error) {
        console.error('Error al obtener la respuesta:', error);
      });

  };


  const recordProgress = (consumed_date, consumed_calories) => {
    console.log ("*** recordProgress ")
    console.log ("personId ",personId)
    console.log ("consumed_date ",consumed_date)
    console.log ("consumed_calories ",consumed_calories)



    const datos = {
      person_id: personId,// currentDay
      consumed_date: consumed_date,//"Desayuno",//--
      consumed_calories: consumed_calories,
      weight: dataPerson.weight
    };

    fetch('https://pry20231020-fn.azurewebsites.net/api/progress?', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }
        return response.json(); // Parseamos la respuesta como JSON
      })
      .then(function (data) {

        console.log("Progreso registrado*** " + JSON.stringify(data));

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

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hour}:${minutes}`;
  };




  const renderMealItem = ({ item }, mealType) => {
    const isSelected = isMealSelected(mealType, item);

    return (
      <View style={styles.mealItem}>
        <View style={styles.mealItemContent}>
          <View style={[styles.circleImage, { marginRight: 10 }]}>
            <Image
              source={{ uri: `${blobStorageBaseUrl}${containerName}/${item.id}M${blobtype}` }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </View>
          <View style={styles.leftColumn}>

            <Text style={styles.mealName}>{item.name}</Text>
            <Text style={styles.mealInfo}>{item.calories} kcal</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              value={selectedMeals.some((meal) => meal.id === item.id)}
              onValueChange={() => handleCheckboxToggle(item)}
            />
            <Ionicons
              name="add-circle-outline" // Cambio de "md-more" a "add-circle-outline"
              size={24}
              color="#FFA500"
              onPress={() => mostrarModalIngredientes(item)}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderCategory = (mealType, data, options) => {


    return (
      <View style={styles.categoryContainer}>

        <View style={styles.categoryHeader}>
          <Text style={styles.subHeading}>{mealType}</Text>
          <Ionicons name="md-refresh" size={24} color="#FFA500" onPress={() => handleReload(mealType)} />
        </View>
        <ScrollView horizontal>

          <FlatList data={data} renderItem={renderMealItem} keyExtractor={(item) => item.id} />

        </ScrollView>

        {/* Modal */}
        <Modal visible={modalVisible[mealType] || false} animationType="slide">
          <View style={styles.modalContainerGroup}>
            <Text style={styles.modalTitleGroup}>Seleccione la opción de su preferencia</Text>
            <View style={styles.buttonContainerGroup}>
              {options.map((option) => (
                <TouchableOpacity key={option.id} style={styles.buttonGroup} onPress={() => handleOptionSelect(mealType, option.id)}>
                  {/* <Image source={{ uri: imageUrl }} style={styles.optionImageGroup} />*/}
                  <Text style={styles.buttonTextGroup}>{option.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.buttonGroup} onPress={() => setModalVisible((prevState) => ({ ...prevState, [mealType]: false }))}>
                <Text style={styles.buttonTextGroup}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


      </View>
    );
  };


  if (!fontsLoaded) {
    // Muestra un indicador de carga o una pantalla de carga mientras se cargan las fuentes
    return null;
  };

  
  const netCalories = calculateNet(dataPerson.gender, dataPerson.weight, dataPerson.height, dataPerson.age, dataPerson.activity_factor);

  // Calculate IMC
  const [imc, imcCategory, imcScale] = calculateIMC(dataPerson.height, dataPerson.weight);

  // Calculate Percentage Caloric Reduction
  const percentageCaloricReduction = obtainPercentageCaloricReduction(imcScale, dataPerson.caloric_reduction);

  // Calculate Total Calories
  const totalCalories = calculateTotalCalories(netCalories, percentageCaloricReduction);
  const totalConsumedCalories = selectedMeals.reduce((total, meal) => total + meal.calories, 0);
  const caloricReduction = Math.round(netCalories - totalConsumedCalories)

  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();

  console.log('*****###netCalories*** : ', netCalories);
  console.log('*****###imcScale*** : ', imcScale, "  " ,imc);
  console.log('*****###percentageCaloricReduction*** : ', percentageCaloricReduction);

  console.log('*****###totalConsumedCalories*** : ', totalConsumedCalories);
  console.log('*****## totalCalories*** : ', totalCalories);

  //if (currentTime === '18:53') {
  if (totalConsumedCalories == totalCalories) {
    console.log('HOLIIIIIII entre a funcion if current')
    recordProgress(currentDate, caloricReduction);
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        {/*<Text style={styles.heading}></Text>*/}

        <View style={styles.progressContainer}>
          <CircularProgress
            value={selectedMeals.reduce((total, meal) => total + meal.calories, 0)}
            maxValue={totalCalories}
            radius={80}
            duration={2000}
            progressValueColor={'#FFA500'}
            title={'kcal'}
            titleColor={'#FFA500'}
            titleStyle={{ fontWeight: 'bold' }}
            textStyle={{ fontWeight: 'bold' }}
            activeStrokeColor={'#FFA500'}
            inActiveStrokeColor={'#FFFFFF'}
          />

          <Text style={styles.progressText}>
            {selectedMeals.reduce((total, meal) => total + meal.calories, 0)}/{totalCalories} kcal
          </Text>
        </View>





        {renderIngredientes()}

        {renderCategory('Desayuno', breakfastData, breakfastOptions)}
        {renderCategory('Almuerzo', lunchData, lunchOptions)}
        {renderCategory('Cena', dinnerData, dinnerOptions)}




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
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,

  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,

  },
  ingredientContainer: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,

    paddingBottom: 10,

    backgroundColor: 'white',



  },
  ingredientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,

  },
  ingredientDetail: {
    color: 'black',
    textAlign: 'center',

  },
  flatlistContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,


  },
  closeButton: {
    backgroundColor: '#FFA500',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circleImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightgray', // Color de fondo del círculo
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainerGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  modalTitleGroup: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Color del título
  },
  buttonContainerGroup: {
    width: '100%',
    alignItems: 'center', // Centrar los botones horizontalmente
    marginTop: 20, // Espacio entre el título y los botones
  },
  buttonGroup: {
    backgroundColor: '#FFA500', // Color naranja
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '80%', // Ancho de los botones
    marginBottom: 10, // Espacio entre los botones
  },
  buttonTextGroup: {
    color: 'white', // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionRowGroup: {
    flexDirection: 'row', // Alinea la imagen y el texto en fila
    alignItems: 'center', // Centra verticalmente
  },
  optionImageGroup: {
    width: 50, // Ajusta el tamaño de la imagen según tu diseño
    height: 50,
    borderRadius: 10, // La mitad del tamaño
    marginRight: 10, // Espacio entre la imagen y el texto
  },

});

export default HomeScreen;



