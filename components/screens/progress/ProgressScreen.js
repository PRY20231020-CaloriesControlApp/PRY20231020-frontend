import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



import { MaterialCommunityIcons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProgressScreen = ({ route, navigation }) => {
  const { dataPerson } = route.params;
  const progressData = dataPerson.progress;
  const totalConsumedCalories = progressData.reduce((total, progress) => total + progress.consumed_calories, 0);
  const registrationDate = new Date(dataPerson.registration_date);
  const currentDate = new Date();
  const daysSinceRegistration = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24));
  const goalCalories = 10000;
  const progressPercent = goalCalories !== 0 ? (totalConsumedCalories / goalCalories) * 100 : 0;

  // Encuentra el peso más antiguo y el peso más actual
  const weights = progressData.map((progress) => progress.progress_weight);
  console.log("progress_weight ",weights)
  const validWeights = weights.filter((progress_weight) => !isNaN(progress_weight) && progress_weight !== null && progress_weight !== undefined);
  console.log("validWeights ",validWeights)
  console.log ("*****Peso: "+ dataPerson.weight)
  
  let weightLostText = 0;
  if (validWeights.length > 0) {
    console.log("eNTRE" )

    const sortedWeights = validWeights.sort((a, b) => {
      return new Date(a.consumed_date) - new Date(b.consumed_date);
    });
    const oldestWeight = sortedWeights[sortedWeights.length - 1]; // El primer peso es el más antiguo
    const latestWeight = sortedWeights[0]; // El último peso es el más actual
    console.log("oldestWeight",oldestWeight )
  
    console.log("latestWeight",latestWeight )
    console.log ("Resta: ", oldestWeight - dataPerson.weight)

    let weightLost;
    if (oldestWeight - dataPerson.weight < 1) {
      weightLost = (oldestWeight - dataPerson.weight) * 1000; // Convierte a gramos
    } else {
      weightLost = oldestWeight - dataPerson.weight; // En kilogramos
    }
    if (oldestWeight - dataPerson.weight < 1) {
      // Mostrar en gramos
      weightLostText = weightLost.toFixed(0) + ' g';
    } else {
      // Mostrar en kilogramos
      weightLostText = weightLost.toFixed(1) + ' kg';
    }

  } else {
    console.log('No hay pesos válidos en el arreglo de progreso.');
  }


  const dailyProgressDetails = progressData.map((progress) => {
    const utcDate = new Date(progress.consumed_date);
    const localDate = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
    const formattedDate = localDate.toLocaleDateString('es-ES', { weekday: 'long' });

    return {
      day: formattedDate,
      consumedCalories: progress.consumed_calories,
    };
  });



  // Mensaje de Objetivo Mensual
  const monthlyGoalMessage = 'Tu objetivo: Perder de 1 a 2 kilos este mes';

  // Mensaje de Recordatorio
  const reminderMessage = 'Actualiza tu peso cada semana para alcanzar tu objetivo.';

  // Mensajes de Motivación
  const motivationalMessages = [
    '¡Sigue adelante! Estás haciendo un gran trabajo.',
    'Cada pequeño paso te acerca a tu objetivo. ¡No te rindas!',
    'Recuerda que la constancia es clave. ¡Tú puedes lograrlo!',
  ];

  const motivationalMessage = motivationalMessages[0]; // Puedes cambiar el índice para seleccionar el mensaje que desees mostrar

  return (
    <View style={styles.container}>

      {/* <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Mi Progreso</Text>
  </View>*/}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Peso Perdido</Text>
          <Text style={styles.statValue}>{weightLostText}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Días con progreso</Text>
          <Text style={styles.statValue}>{daysSinceRegistration}</Text>
        </View>
      </View>

      <View style={styles.circularProgressContainer}>


        <CircularProgress
          percent={progressPercent}
          color="transparent"
          value={totalConsumedCalories}
          maxValue={10000}
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
        <Text style={styles.circularProgressText}>Progreso calórico</Text>
      </View>
      <View style={styles.goalContainer}>
        <Text style={styles.goalText}>{monthlyGoalMessage}</Text>
        <Text style={styles.reminderText}>{reminderMessage}</Text>
      </View>
      <View style={styles.dailyProgressContainer}>
        <Text style={styles.dailyProgressHeaderText}>Detalles Diarios</Text>
        <View>
          <FlatList
            data={dailyProgressDetails}
            keyExtractor={(detail, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.dailyProgressItem}>
                <Text style={styles.dayText}>{item.day.charAt(0).toUpperCase() + item.day.slice(1)}</Text>
                <Text style={styles.caloriesText}>{item.consumedCalories} kcal</Text>
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.goalContainer}>
        <Text style={styles.motivationalText}>{motivationalMessage}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FDA615', // Color naranja
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  statBox: {
    alignItems: 'center',
    padding: 20,

  },
  statLabel: {
    fontSize: 16,
    color: '#555',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  circularProgressContainer: {
    alignItems: 'center',
  },
  progressArrowContainer: {
    position: 'absolute',
    top: 15,
    alignItems: 'center',
  },
  circularProgressGradient: {
    borderRadius: 100,
    padding: 5,
  },
  circularProgressText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FDA615', // Color naranja
  },
  dailyProgressContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    marginTop: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  dailyProgressHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  dailyProgressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  dayText: {
    fontSize: 16,
    color: '#555',
  },
  caloriesText: {
    fontSize: 16,
    color: '#FDA615', // Color naranja
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#777',
  },
  goalContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
  },
  goalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FDA615',
    textAlign: 'center',
  },
  reminderText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  motivationalText: {
    fontSize: 14,
    color: '#FDA615',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },

});

export default ProgressScreen;
