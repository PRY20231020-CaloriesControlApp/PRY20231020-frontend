import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';

const ProgressScreen = ({ route, navigation }) => {
  const { dataPerson } = route.params;

  // Obtén el arreglo de progreso del objeto dataPerson
  const progressData = dataPerson.progress;

  // Calcula la cantidad total de calorías consumidas
  const totalConsumedCalories = progressData.reduce((total, progress) => total + progress.consumed_calories, 0);

  // Calcula la cantidad de días desde el registro
  const registrationDate = new Date(dataPerson.registration_date);
  const currentDate = new Date();
  const daysSinceRegistration = Math.floor((currentDate - registrationDate) / (1000 * 60 * 60 * 24));

  // Calcula el progreso circular (porcentaje de calorías consumidas respecto a la meta)
  const goalCalories = 2000; // Supongamos una meta de 2000 calorías diarias
  const progressPercent = goalCalories !== 0 ? (totalConsumedCalories / goalCalories) * 100 : 0;

  // Obtén detalles diarios de progreso
  const dailyProgressDetails = progressData.map((progress) => ({
    day: new Date(progress.consumed_date).toLocaleDateString('es-ES', { weekday: 'long' }),

    consumedCalories: progress.consumed_calories,
  }));
  const obtenerDiaEnEspanol = (day) => {
    console.log("Ingreseeeee  ")
    const daysInSpanish = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
      Saturday: 'Sábado',
      Sunday: 'Domingo',
    };

    return daysInSpanish[day] || day;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Mi Progreso</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Calorías perdidas</Text>
          <Text style={styles.statValue}>{totalConsumedCalories}</Text>
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
          maxValue={2500}
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
        <Text style={styles.circularProgressText}>Progreso calórico</Text>
      </View>

      <View style={styles.dailyProgressContainer}>
        <Text style={styles.dailyProgressHeaderText}>Detalles Diarios</Text>
        {dailyProgressDetails.map((detail, index) => (
          <View key={index} style={styles.dailyProgressItem}>
            <Text style={styles.dayText}>{detail.day.charAt(0).toUpperCase() + detail.day.slice(1)}</Text>
            <Text style={styles.caloriesText}>{detail.consumedCalories} kcal</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500', // Color naranja
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
    color: '#FFA500', // Color naranja
  },
  dailyProgressContainer: {
    width: '90%',
    backgroundColor: 'white', // Fondo blanco
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: 20,
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
    color: '#FFA500', // Color naranja
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#777',
  },
  
});

export default ProgressScreen;
