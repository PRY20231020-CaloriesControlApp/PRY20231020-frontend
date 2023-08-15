import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const ChoiceScreen = ({ navigation }) => {
    const blobStorageBaseUrl = 'https://pry20231020fnb6cf.blob.core.windows.net/';
    const containerName = 'pry20231020-dataset-ml';
    const blobName = 'logoAppB';
    const blobtype = '.png';
    const imageUrl = `${blobStorageBaseUrl}${containerName}/${blobName}${blobtype}`;
    return (
        <View style={styles.selectionContainer}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>NutriSage</Text>
                <Image source={{ uri: imageUrl }} style={styles.logo} />
            </View>
            <Text style={styles.subText}>Bienvenido</Text>
            <TouchableOpacity
                style={styles.selectionButton}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.selectionButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.selectionButton}
                onPress={() => navigation.navigate('Registro')}
            >
                <Text style={styles.selectionButtonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    selectionContainer: {
        flex: 1,
        //backgroundColor: 'white', // Fondo blanco
        backgroundColor: '#F2F2F2',

        justifyContent: 'center',
        alignItems: 'center',
    },
    selectionButton: {
        backgroundColor: '#FDA615', // Botones naranjas
        width: '70%', // Mismo ancho para ambos botones
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center', // Centrar el contenido horizontalmente
    },
    selectionButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white', // Letras blancas
    },
    welcomeContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 220,
        height: 220,
        marginBottom: 30,
        resizeMode: 'contain',

    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FDA615',
        marginBottom: 30,
    },
    subText: {
        fontSize: 18,
        color: '#FDA615',
        marginBottom: 30,
        //fontWeight: 'bold',

    },
});

export default ChoiceScreen;
