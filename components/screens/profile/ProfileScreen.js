import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { FontAwesome } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import {
  API_REGISTER_URL,
  BLOB_STORAGE_BASE_URL,
  CONTAINER_NAME
} from '../../../constants/apiConstants';
const ProfileScreen = ({ navigation, route, updateDataPerson }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { dataPerson } = route.params;

  const personId = dataPerson.id_person;
  const blobStorageBaseUrl = BLOB_STORAGE_BASE_URL;
  const containerName = CONTAINER_NAME;
  const blobName = '1Perfil.jpg';
  const imageUrl = `${blobStorageBaseUrl}${containerName}/${blobName}`;

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newDataPerson, setNewDataPerson] = useState(dataPerson, { activity_factor: '', });
  const peso = dataPerson.weight; // Peso en kilogramos
  const altura = dataPerson.height / 100; // Altura en metros (se divide por 100 para convertir de cm a metros)
  const imc = peso / (altura * altura);

  let condition = "";

  if (imc < 18.5) {
    condition = "Bajo peso";
  } else if (imc >= 18.5 && imc < 25.0) {
    condition = "Normal";
  } else if (imc >= 25.0 && imc < 30.0) {
    condition = "Sobrepeso";
  } else if (imc >= 30.0 && imc < 35.0) {
    condition = "Obesidad I";
  } else if (imc >= 35.0 && imc < 40.0) {
    condition = "Obesidad II";
  } else {
    condition = "Obesidad III";
  }

  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };
  const getActivityLabel = (activityFactor) => {
    if (activityFactor === 1.5) {
      return 'Sedentaria o ligero';
    } else if (activityFactor === 1.8) {
      return 'Moderado';
    } else if (activityFactor === 2.2) {
      return 'Activo';
    } else {
      return 'Otro'; // Cambia este mensaje según tus necesidades
    }
  };
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: 1.5, value: 'Sedentaria o ligero' },
    { key: 1.8, value: 'Moderado' },
    { key: 2.2, value: 'Activo' },
  ];


  const genderOptions = [
    { key: 'F', value: 'Femenino' },
    { key: 'M', value: 'Masculino' },
  ];


  const confirmLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            route.params.logOutSuccess();
            navigation.navigate('Inicio');
          },
        },
      ],
      { cancelable: false }
    );
  };
  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  /*const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Esto se configura en 'false' si es Android
    setDate(currentDate);

    if (currentDate) {
      const formattedDate = formatDate(currentDate);
      setFormData({ ...formData, birth_date: formattedDate });
    }
  };*/
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Asegúrate de establecer esto en 'false' si es Android
    setDate(currentDate);

    if (currentDate) {
      const formattedDate = formatDate(currentDate);
      setNewDataPerson({ ...newDataPerson, birth_date: formattedDate });
    }
  };


  return (
    <View style={styles.container}>

      <Image
        source={{ uri: imageUrl }} // Replace with the actual user image URL
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{dataPerson.user_name}</Text>

      <View style={styles.userInfoContainer}>


        <View style={styles.userInfo}>
          <View style={styles.userLabel}>
            <FontAwesome name="user" size={20} color="black" />
            <Text style={styles.labelWithIcon}>Nombre:</Text>
          </View>
          <Text style={styles.info}>{dataPerson.name}</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userLabel}>
            <FontAwesome name="birthday-cake" size={20} color="black" />
            <Text style={styles.labelWithIcon}>Fecha de Nacimiento:</Text>
          </View>
          <Text style={styles.info}>{dataPerson.birth_date}</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userLabel}>
            <FontAwesome name="user" size={20} color="black" />
            <Text style={styles.labelWithIcon}>Edad:</Text>
          </View>
          <Text style={styles.info}>{dataPerson.age}</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userLabel}>
            <FontAwesome name="venus-mars" size={20} color="black" />
            <Text style={styles.labelWithIcon}>Sexo:</Text>
          </View>
          <Text style={styles.info}>{dataPerson.gender}</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userLabel}>
            <FontAwesome name="arrows-v" size={20} color="black" />
            <Text style={styles.labelWithIcon}>Estatura:</Text>
          </View>
          <Text style={styles.info}>{dataPerson.height} cm</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userLabel}>
            <FontAwesome name="balance-scale" size={20} color="black" />
            <Text style={styles.labelWithIcon}>Peso:</Text>
          </View>
          <Text style={styles.info}>{dataPerson.weight} kg</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userLabel}>
            <FontAwesome name="heartbeat" size={20} color="black" />
            <Text style={styles.labelWithIcon}>Actividad Física:</Text>
          </View>
          <Text style={styles.info}>{getActivityLabel(dataPerson.activity_factor)}</Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userLabel}>
            <FontAwesome name="calculator" size={20} color="black" />
            <Text style={styles.labelWithIcon}>Condición IMC:</Text>
          </View>
          <Text style={styles.info}>{condition}</Text>
        </View>

        <TouchableOpacity
          style={styles.logOut}
          onPress={confirmLogout}
        >
          <View style={styles.userLabel}>
            <FontAwesome name="sign-out" size={20} color="red" />
            <Text style={[styles.labelWithIcon, { color: 'red' }]}>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>

      </View>


      <TouchableOpacity
        style={styles.editIconContainer}
        onPress={toggleEditModal}
      >
        <FontAwesome name="edit" size={24} color="#FDA615" />
      </TouchableOpacity>

      {/* Botón para ver progreso */}

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.editModalContainer}>
          <View style={styles.editFormContainer}>
            <Text style={styles.editTitle}>Editar Perfil</Text>

            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Nombre:</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.name}
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, name: text })
                }
                placeholder="Ingrese su nombre"
              />
            </View>

            {/*  <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Fecha de Nacimiento:</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.birth_date}
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, birth_date: text })
                }
                placeholder="Ingrese su fecha de nacimiento"
              />
              </View>*/}

            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Fecha de Nacimiento (aaaa/mm/dd)</Text>
              <TouchableOpacity style={styles.inputDate} onPress={showDatepicker}>
                <Text>{newDataPerson.birth_date ? formatDate(new Date(newDataPerson.birth_date)) : 'Seleccionar fecha'}</Text>

              </TouchableOpacity>
            </View>


            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}


            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Sexo:</Text>

              <SelectList
                boxStyles={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#FDA615',
                  borderRadius: 8,
                }}
                setSelected={(key) => {
                  const selectedValue = genderOptions.find((option) => option.key === key)?.value || '';
                  setNewDataPerson({ ...newDataPerson, gender: key });

                }}
                data={genderOptions}
                save="key"
                selected={newDataPerson.gender} // Valor seleccionado
                placeholder={newDataPerson.gender === 'F' ? 'Femenino' : 'Masculino'}

              />

            </View>
            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Estatura (cm):</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.height.toString()}
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, height: text })
                }
                placeholder="Ingrese su estatura:"
              />
            </View>
            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Peso (kg):</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.weight.toString()}
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, weight: text })
                }
                placeholder="Ingrese su peso"
              />
            </View>

            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Factor de Actividad:</Text>
              <SelectList
                setSelected={(key) => {
                  const selectedValue = data.find((option) => option.key === key)?.value || '';
                  setNewDataPerson({ ...newDataPerson, activity_factor: selectedValue });
                }}
                data={data}
                save="key"
                selected={newDataPerson.activity_factor} // Valor seleccionado
                placeholder={getActivityLabel(newDataPerson.activity_factor)}
                boxStyles={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#FDA615',
                  borderRadius: 8,
                }}
              />
            </View>



            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                console.log("**** newDataPerson ", newDataPerson)


                if (newDataPerson.activity_factor == 'Sedentaria o ligero') {
                  new_activity_factor = 1.5
                } else if (newDataPerson.activity_factor == 'Moderado') {
                  new_activity_factor = 1.8

                } else {
                  new_activity_factor = 2.2

                }


                const datos = {
                  name: newDataPerson.name,
                  user_name: newDataPerson.user_name,
                  password: '123',
                  birth_date: newDataPerson.birth_date,
                  gender: newDataPerson.gender,
                  height: parseInt(newDataPerson.height),
                  weight: parseFloat(newDataPerson.weight),
                  activity_factor: new_activity_factor,
                  caloric_reduction: parseInt(newDataPerson.caloric_reduction),
                  action: "update_profile",
                  id_person: newDataPerson.id_person

                };
                console.log("**** ****datos updateeeeeeeeee ***** ", datos)



                fetch(API_REGISTER_URL, {
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
                    return response.json(); // Usamos response.json() para obtener la respuesta como un objeto JavaScript
                  })
                  .then(function (data) {
                    console.log('UPDATE data =', data);
                    navigation.navigate('Perfil', { dataPerson: data });
                    navigation.navigate('Inicio', { dataPerson: data });
                    navigation.navigate('Progreso', { dataPerson: data });
                    navigation.navigate('Perfil', { dataPerson: data });

                    // navigation.navigate('Notificaciones', {dataPerson: data});


                    console.log('Actualizacion con exito ');


                  })
                  .catch(function (error) {
                    console.error('Error al obtener la respuesta:', error);
                  });

                toggleEditModal();
              }}
            >
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={toggleEditModal}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>


          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#FDA615',
    borderWidth: 4,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  userInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    width: '90%',
    marginBottom: 20,

  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logOut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FDA615',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1, // Asegura que el botón esté por encima de otros elementos
  },
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editFormContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editInputContainer: {
    marginBottom: 10,
    width: '100%',

  },
  editInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left', // Alinear a la izquierda
  },
  editInput: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    textAlign: 'left', // Alinear a la izquierda
    borderColor: '#FDA615',
    paddingHorizontal: 20,
    borderRadius: 8,

  },
  saveButton: {
    backgroundColor: '#FDA615',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputDate: {
    height: 45,
    borderWidth: 1,
    borderColor: '#FDA615',
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row', // Para alinear verticalmente el contenido
    alignItems: 'center', // Centrar verticalmente el contenido
  },


  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  logoutButtonText: {
    color: '#FDA615',
    fontSize: 16,
    fontWeight: 'bold',
  },

  userLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  labelWithIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  cancelButtonText: {
    marginTop: 10,
  }

});

export default ProfileScreen;
