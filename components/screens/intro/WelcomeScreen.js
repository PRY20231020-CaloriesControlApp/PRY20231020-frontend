import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

    const blobStorageBaseUrl = 'https://pry20231020fnb6cf.blob.core.windows.net/';
    const containerName = 'pry20231020-dataset-ml';
    const blobName = 'logoAppB';
    const blobtype = '.png';
    const imageUrl = `${blobStorageBaseUrl}${containerName}/${blobName}${blobtype}`;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('ChoiceScreen');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.welcomeContainer}>
            <View style={styles.logoContainer}>
                <Text style={styles.welcomeText}>NutriSage</Text>

                <Image source={{ uri: imageUrl }} style={styles.logo} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    welcomeContainer: {
        flex: 1,
        backgroundColor: '#FDA615',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        marginBottom:20,
    },
});

export default WelcomeScreen;
