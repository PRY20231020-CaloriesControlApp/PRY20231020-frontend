import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, Dimensions, ScrollView, FlatList, Switch, Image, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { FontAwesome } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {
  API_RECOMMENDATION_URL,
  API_PROGRESS_URL,
  BLOB_STORAGE_BASE_URL,
  CONTAINER_NAME,
  API_FEEDBACK_URL
} from '../../../constants/apiConstants';
const blobStorageBaseUrl = BLOB_STORAGE_BASE_URL;
const containerName = CONTAINER_NAME;
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

  const [breakfastLiked, setBreakfastLiked] = useState(false);
  const [breakfastDisliked, setBreakfastDisliked] = useState(false);

  const [lunchLiked, setLunchLiked] = useState(false);
  const [lunchDisliked, setLunchDisliked] = useState(false);

  const [dinnerLiked, setDinnerLiked] = useState(false);
  const [dinnerDisliked, setDinnerDisliked] = useState(false);

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

  const [showHelpModal, setShowHelpModal] = useState(false);

  const abrirModalDeAyuda = () => {
    setShowHelpModal(true);
  };

  const cerrarModalDeAyuda = () => {
    setShowHelpModal(false);
  };

  const HelpModal = ({ isVisible, onClose }) => {
    return (
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainerHelp}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.modalTitleHelp}>Guía de Uso de NutriSage</Text>
            <Text style={styles.stepSubtitle}>
              <Ionicons name="home" size={24} color="#FDA615" />
              {' '}Inicio
            </Text>

            <Text style={styles.stepExplanation}>
              En esta sección, busca recomendaciones según tus preferencias de alimentos.

            </Text>
            <View style={styles.stepContainer}>

              <Text style={styles.stepNumber}>1. Seleccionar Preferencia de Alimento</Text>

            </View>

            <Text style={styles.stepExplanation}>
              Haz clic en el icono de <Ionicons name="md-refresh" size={24} color="#FDA615" />
              y luego selecciona el tipo de alimento que prefieres para cada comida del día (por ejemplo, "Carnes", "Arroces","Pollo", entre otros).
            </Text>

            <View style={styles.stepContainer}>
              <Text style={styles.stepNumber}>2. Ver Ingredientes</Text>
            </View>

            <Text style={styles.stepExplanation}>
              Toca el icono de <Ionicons
                name="add-circle-outline" // Cambio de "md-more" a "add-circle-outline"
                size={24}
                color="#FDA615"
              /> para ver la lista de ingredientes con sus cantidades recomendadas y calorías.
            </Text>

            <View style={styles.stepContainer}>
              <Text style={styles.stepNumber}>3. Completar el Progreso del Día</Text>

            </View>

            <Text style={styles.stepExplanation}>
              Activa el switch <Ionicons
                name="toggle-outline"
                size={24}
                color="#FDA615"
              /> cuando hayas completado la comida del día.
            </Text>



            {/* Gif al final */}
            {/*  <View style={styles.gifContainer}>
              <Image
                source={{ uri: 'URL_DE_TU_GIF_FINAL' }}
                style={styles.stepGif}
              />
    </View>*/}

            <Text style={styles.stepSubtitle}>
              <Ionicons name="bar-chart" size={24} color="#FDA615" />
              {' '}Progreso
            </Text>



            <Text style={styles.stepExplanation}>
              La Pantalla de Progreso te brinda una visión completa de tu viaje hacia tus objetivos de salud y bienestar. Aquí encontrarás información sobre las calorías perdidas, los días en los que has progresado, el seguimiento calórico y los detalles diarios de tu progreso.

            </Text>
            {/* Gif al final */}
            {/*  <View style={styles.gifContainer}>
              <Image
                source={{ uri: 'URL_DE_TU_GIF_FINAL' }}
                style={styles.stepGif}
              />
          </View>*/}
            <Text style={styles.stepSubtitle}>
              <Ionicons name="heart" size={24} color="#FDA615" />
              {' '}Notificaciones
            </Text>



            <Text style={styles.stepExplanation}>
              Mantente siempre alerta con consejos y notificaciones útiles para tu bienestar.

            </Text>
            {/* Gif al final */}
            {/*  <View style={styles.gifContainer}>
              <Image
                source={{ uri: 'URL_DE_TU_GIF_FINAL' }}
                style={styles.stepGif}
              />
          </View>*/}
            <Text style={styles.stepSubtitle}>
              <Ionicons name="person" size={24} color="#FDA615" />
              {' '}Perfil
            </Text>



            <Text style={styles.stepExplanation}>
              Gestiona tu información personal y realiza un seguimiento de tus datos físicos. Personaliza tu perfil para obtener un control más preciso de tu progreso.</Text>
            {/* Progreso */}
            <View style={styles.stepContainer}>
              <Text style={styles.stepNumber}>1. Editar Perfil</Text>

            </View>

            <Text style={styles.stepExplanation}>
              Toque el icono de lápiz <FontAwesome name="edit" size={24} color="#FDA615" />
              en la esquina superior derecha para comenzar a editar su perfil.
            </Text>
            <View style={styles.stepContainer}>
              <Text style={styles.stepNumber}>2. Cerrar Sesión </Text>

            </View>

            <Text style={styles.stepExplanation}>
              Para cerrar sesión en el perfil, toca el botón <FontAwesome name="sign-out" size={24} color="#FDA615" /> Cerrar Sesión
              en la parte inferior de la pantalla de perfil y confirma la acción.
            </Text>
            {/* Gif al final */}
            {/*  <View style={styles.gifContainer}>
              <Image
                source={{ uri: 'URL_DE_TU_GIF_FINAL' }}
                style={styles.stepGif}
              />
          </View>*/}

          </ScrollView>

          {/* Botón Cerrar */}
          <TouchableOpacity style={styles.closeButtonHelp} onPress={onClose}>
            <Text style={styles.closeButtonTextHelp}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };


  const calculateNet = (gender, weight, height, age, activity_factor) => {
    const PER_ETA = 0.1;

    try {
      weight = parseFloat(weight);
      height = parseFloat(height);
      age = parseInt(age);
    } catch (error) {
      throw new Error('El peso, estatura y edad deben ser números válidos.');
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

  const handleLike = (mealType, mealId, liked) => {

    const data = {
      person_id: personId,
      meal_id: mealId,
      liked: liked,
      //feedback_date: getCurrentDateTime(),
    };

    // Envía la solicitud POST a la API para registrar el like/dislike
    fetch(API_FEEDBACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }
      })
      .then(function (data) {
        console.log("Feedback registrado*** " + JSON.stringify(data));


        if (mealType === 'Desayuno') {
          setBreakfastLiked(liked);
          setBreakfastDisliked(!liked);
        } else if (mealType === 'Almuerzo') {
          setLunchLiked(liked);
          setLunchDisliked(!liked);
        } else {
          setDinnerLiked(liked);
          setDinnerDisliked(!liked);
        }


      })
      .catch((error) => {
        console.error('Error al registrar el like/dislike:', error);
      });
  };





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
    { id: 7, name: 'Pollos' },
  ];

  const dinnerOptions = [
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
          <Text style={[styles.modalTitle, { color: '#FDA615', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }]}>
            {selectedMeal.name}
          </Text>
          {/* Agregar aquí la imagen de la comida */}
          <Image
            source={{ uri: `${blobStorageBaseUrl}${containerName}/1ingredients.jpg` }} // Reemplazar 'URL_DE_LA_IMAGEN' con la URL de la imagen de la comida
            style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 16 }}
          />
          <Text style={[styles.subHeading, { color: '#FDA615', fontSize: 18 }]}>Ingredientes</Text>

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
            <Text style={{ color: '#FDA615' }}>No hay ingredientes disponibles.</Text>
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
        mealId: dataBreakfast.id_meal,
        name: dataBreakfast.healthy_equivalent_name,
        calories: dataBreakfast.calories_meal_type,
        ingredients: dataBreakfast.ingredients,
        selected: false,
        liked: breakfastLiked,   // Agregar estas propiedades liked y disliked
        disliked: breakfastDisliked,
      },
    ]
    : [];

  const lunchData = dataLunch
    ? [
      {
        id: 2,
        //id: dataLunch.id_meal,
        mealType: "Almuerzo",
        mealId: dataLunch.id_meal,
        name: dataLunch.healthy_equivalent_name,
        calories: dataLunch.calories_meal_type,
        ingredients: dataLunch.ingredients,
        selected: false,
        liked: lunchLiked,   // Agregar estas propiedades liked y disliked
        disliked: lunchDisliked,
      },
    ]
    : [];

  const dinnerData = dataDinner
    ? [
      {
        id: 3,
        //id: dataDinner.id_meal,
        mealType: "Cena",
        mealId: dataDinner.id_meal,
        name: dataDinner.healthy_equivalent_name,
        calories: dataDinner.calories_meal_type,
        ingredients: dataDinner.ingredients,
        selected: false,
        liked: dinnerLiked,   // Agregar estas propiedades liked y disliked
        disliked: dinnerDisliked,
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
      dia: currentDay,// currentDay
      comida_del_dia: mealType,//"Desayuno",//--
      grupo_comida: group_id,
      user_name: userName,
      person_id: personId,
      token: userToken
    };

    fetch(API_RECOMMENDATION_URL, {
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
            setBreakfastLiked(false);
            setBreakfastDisliked(false);
            //setDataBreakfastIngredients(data.ingredients);
            break;
          case 'Almuerzo':
            setDataLunch(data || []);
            setLunchLiked(false);
            setLunchDisliked(false);
            
            //setDataLunchIngredients(data.ingredients);
            break;
          case 'Cena':
            setDataDinner(data || []);
            setDinnerLiked(false);
            setDinnerDisliked(false);
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
    console.log("*** recordProgress ")
    console.log("personId ", personId)
    console.log("consumed_date ", consumed_date)
    console.log("consumed_calories ", consumed_calories)



    const datos = {
      person_id: personId,// currentDay
      consumed_date: consumed_date,//"Desayuno",//--
      consumed_calories: consumed_calories,
      weight: dataPerson.weight
    };

    fetch(API_PROGRESS_URL, {
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


  const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minutes}`;
  };

  // Ahora puedes obtener la fecha y hora actual combinadas
  const currentDateTime = getCurrentDateTime();
  console.log(currentDateTime);



  const renderMealItem = ({ item }, mealType) => {
    const isSelected = isMealSelected(mealType, item);

    return (
      <View style={styles.mealItem}>
        <View style={styles.mealItemContent}>
          <View style={[styles.circleImage, { marginRight: 10 }]}>
            <Image
              source={{ uri: `${blobStorageBaseUrl}${containerName}/${item.id}Meal.png` }}
              style={{ width: 42, height: 42, borderRadius: 10 }}
            />
          </View>
          <View style={styles.leftColumn}>
            <Text style={styles.mealName}>{item.name}</Text>
            <Text style={styles.mealInfo}>{item.calories} kcal</Text>

            <View style={styles.likeDislikeContainer}>
              <TouchableOpacity
                style={[
                  styles.likeButton,
                  item.liked && { backgroundColor: '#93E86C' }, // Cambia el estilo si está marcado como "me gusta"
                ]}
                onPress={() => handleLike(item.mealType, item.mealId, true)}
              >
                <FontAwesome name="thumbs-up" size={14} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dislikeButton,
                  item.disliked && { backgroundColor: '#f06565' }, // Cambia el estilo si está marcado como "no me gusta"
                ]}
                onPress={() => handleLike(item.mealType, item.mealId, false)}
              >
                <FontAwesome name="thumbs-down" size={14} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>




            <View style={styles.switchContainer}>
              <Switch
                value={selectedMeals.some((meal) => meal.id === item.id)}
                onValueChange={() => handleCheckboxToggle(item)} style={styles.buttonMeal}
              />
              <Ionicons
                name="add-circle-outline"
                size={24}
                color="#FDA615"
                onPress={() => mostrarModalIngredientes(item)}
                style={styles.buttonMeal}
              />
            </View>
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
          <Ionicons name="md-refresh" size={24} color="#FDA615" onPress={() => handleReload(mealType)} />
        </View>
        <ScrollView horizontal>

          <FlatList data={data} renderItem={renderMealItem} keyExtractor={(item) => item.id} />

        </ScrollView>

        {/* Modal */}
        <Modal visible={modalVisible[mealType] || false} animationType="slide">
          <View style={styles.modalContainerGroup}>
            <Text style={styles.modalTitleGroup}>Seleccione la opción de su preferencia: </Text>
            <View style={styles.buttonContainerGroup}>
              {options.map((option) => (
                <TouchableOpacity key={option.id} style={styles.buttonGroup} onPress={() => handleOptionSelect(mealType, option.id)}>
                  {/* <Image source={{ uri: imageUrl }} style={styles.optionImageGroup} />*/}
                  <Text style={styles.buttonTextGroup}>{option.name}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[styles.buttonGroup, { backgroundColor: 'transparent' }]} // Remove or set backgroundColor to 'transparent'
                onPress={() => setModalVisible((prevState) => ({ ...prevState, [mealType]: false }))}
              >
                <Text style={[styles.buttonTextGroup, { color: '#FDA615' }]}>Cancelar</Text>
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
  console.log('*****###imcScale*** : ', imcScale, "  ", imc);
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
      {/* Botón de Ayuda */}


      <ScrollView>
        {/* Botón de Ayuda */}
        <TouchableOpacity
          style={styles.questionButtonContainer}
          onPress={() => abrirModalDeAyuda()}
        >
          <Ionicons name="help-circle" size={24} color="#FDA615" />
        </TouchableOpacity>

        {/* Resto del contenido de HomeScreen */}

        {/* Modal de Ayuda */}
        <HelpModal isVisible={showHelpModal} onClose={cerrarModalDeAyuda} />

        <View style={styles.progressContainer}>
          <CircularProgress
            value={selectedMeals.reduce((total, meal) => total + meal.calories, 0)}
            maxValue={totalCalories}
            radius={80}
            duration={2000}
            progressValueColor={'#FDA615'}
            title={'kcal'}
            titleColor={'#FDA615'}
            titleStyle={{ fontWeight: 'bold' }}
            textStyle={{ fontWeight: 'bold' }}
            activeStrokeColor={'#FDA615'}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Espacio entre el botón "add" y los botones de "like/dislike"
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#23191A',

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
    color: '#FDA615',
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
    marginBottom: 1,

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
    backgroundColor: '#FDA615',
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
    backgroundColor: '#FDA615', // Color naranja
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '60%', // Ancho de los botones
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
  questionButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Agrega zIndex
  },
  modalContainerHelp: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Cambiado a gris claro
  },
  scrollContainer: {
    paddingHorizontal: 24, // Mayor padding horizontal
    paddingTop: 32,
    paddingBottom: 16,
  },
  modalTitleHelp: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  stepContainer: {
    flexDirection: 'row', // Mostrar número de paso junto con el texto
    alignItems: 'center', // Centrar elementos verticalmente
    marginBottom: 2,
    marginLeft: 5,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FDA615',
    marginRight: 8, // Espacio entre número y texto
  },
  stepDescription: {
    fontSize: 16,
    color: '#333',
  },
  stepIcon: {
    width: 24,
    height: 24,
    marginRight: 16, // Espacio entre ícono y texto
  },
  stepExplanation: {
    fontSize: 14,
    color: '#757575', // Color de texto más claro para explicaciones
    marginBottom: 22,
    marginLeft: 7,
    textAlign: 'justify', // Añade esta propiedad para justificar el texto


  },
  gifContainer: {
    alignItems: 'center',
  },
  stepGif: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  closeButtonHelp: {
    backgroundColor: '#FDA615',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonTextHelp: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6F6F6F',
    marginBottom: 8,
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  likeDislikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginLeft: 8, // Espacio entre el botón "add" y los botones de "like/dislike"
    marginTop: 15, // Espacio entre el botón "add" y los botones de "like/dislike"

  },
  likeButton: {
    backgroundColor: 'rgba(210, 247, 193, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  dislikeButton: {
    backgroundColor: 'rgba(245, 213, 213, 1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  likeButtonText: {
    color: '#FFF', // Color del texto en los botones
  },

  buttonMeal: {
    //paddingVertical: 5,
    // borderRadius: 5,
    //marginRight: 10,
    marginLeft: 2,


  }

});

export default HomeScreen;



