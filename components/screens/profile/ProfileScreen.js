import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'



  const ProfileScreen = ({ route, navigation ,onLoginSuccess}) => {

  const { dataPerson } = route.params;



  const personId = dataPerson.id_person;
  const blobStorageBaseUrl = 'https://pry20231020fnb6cf.blob.core.windows.net/';
  const containerName = 'pry20231020-dataset-ml';
  const blobName = '1Perfil.jpg';
  const imageUrl = `${blobStorageBaseUrl}${containerName}/${blobName}`;

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newDataPerson, setNewDataPerson] = useState(dataPerson, { activity_factor: '', });

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
    { key: '1', value: 'Sedentaria o ligero' },
    { key: '2', value: 'Moderado' },
    { key: '3', value: 'Activo' },
  ];


  const genderOptions = [
    { key: 'F', value: 'Femenino' },
    { key: 'M', value: 'Masculino' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Image
        source={{ uri: imageUrl }} // Replace with the actual user image URL
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{dataPerson.user_name}</Text>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.info}>{dataPerson.name}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Fecha de Nacimiento:</Text>
          <Text style={styles.info}>{dataPerson.birth_date}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.info}>{dataPerson.age}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Sexo:</Text>
          <Text style={styles.info}>{dataPerson.gender}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Altura:</Text>
          <Text style={styles.info}>{dataPerson.height} cm</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Peso:</Text>
          <Text style={styles.info}>{dataPerson.weight} kg</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Actividad Física:</Text>
          <Text style={styles.info}>{getActivityLabel(dataPerson.activity_factor)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editIconContainer}
        onPress={toggleEditModal}
      >
        <FontAwesome name="edit" size={24} color="#FFA500" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Progreso')}
      >
        <Text style={styles.buttonText}>Ver Progreso</Text>
      </TouchableOpacity>
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

            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Fecha de Nacimiento:</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.birth_date}
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, birth_date: text })
                }
                placeholder="Ingrese su fecha de nacimiento"
              />
            </View>
            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Edad:</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.age.toString()} // Convertir a texto para mostrarlo en el input
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, age: text })
                }
                placeholder="Ingrese su edad"
              />
            </View>
            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Sexo:</Text>
              <SelectList
                setSelected={(key) => {
                  const selectedValue = genderOptions.find((option) => option.key === key)?.value || '';
                  setNewDataPerson({ ...newDataPerson, gender: key });
                }}
                data={genderOptions}
                save="key"
                selected={newDataPerson.gender} // Valor seleccionado
                placeholder="Seleccione"

              />
            </View>
            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Altura:</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.height.toString()}
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, height: text })
                }
                placeholder="Ingrese su altura"
              />
            </View>
            <View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Peso:</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.weight.toString()}
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, weight: text })
                }
                placeholder="Ingrese su peso"
              />
            </View>
            {/*<View style={styles.editInputContainer}>
              <Text style={styles.editInputLabel}>Factor de Actividad:</Text>
              <TextInput
                style={styles.editInput}
                value={newDataPerson.activity_factor.toString()}
                onChangeText={(text) =>
                  setNewDataPerson({ ...newDataPerson, activity_factor: text })
                }
                placeholder="Ingrese su factor de actividad"
              />
              </View>*/}
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
                placeholder="Seleccione"

              />
            </View>



            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                console.log("**** newDataPerson ", newDataPerson)


                if (newDataPerson.activity_factor == 'Sedentaria o ligero') {
                  new_activity_factor = 1.5
                } else if (newDataPerson.activity_factor == 'Sedentaria o ligero') {
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
                  action: "update",
                  id_person: newDataPerson.id_person

                };
                console.log("**** ****datos***** ", datos)



                fetch('https://pry20231020-fn.azurewebsites.net/api/registro?', {
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
                    console.log('data =', data);
                    //setDataPerson(data); 
                    //dataPerson=newDataPerson
                    //onLoginSuccess(data);

                    console.log('Actualizacion con exito ');



                    //navigation.replace('Home', { dataPerson: data }); // Pasar el objeto 'data' como parámetro
                    //navigation.replace('Perfil', { dataPerson: data }); // Pasar el objeto 'data' como parámetro


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
    borderColor: '#FFA500',
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFA500',
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
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'left', // Alinear a la izquierda
  },
  saveButton: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
