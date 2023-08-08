import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { format, getDay, isWithinInterval } from 'date-fns';

const NotificationsScreen = () => {
    const [notificationData, setNotificationData] = useState(null);

    useEffect(() => {
        if (notificationData === null) {
            showNotifications();
        }
    }, [notificationData]);

    const showNotifications = () => {
        const datos = {
            person_id: 0,
        };

        fetch('https://pry20231020-fn.azurewebsites.net/api/notification?', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud. Código de estado: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                setNotificationData(data);
            })
            .catch(error => {
                console.error('Error al obtener la respuesta:', error);
            });
    };

    const getCurrentTime = () => {
        return format(new Date(), 'HH:mm:ss');
    };

    const renderNotifications = () => {
        if (!notificationData || !notificationData.notifications) {
            return null;
        }

        const currentDayOfWeek = getDay(new Date());

        return notificationData.notifications.map(notification => {
            const startDate = new Date(notification.start_date);
            const endDate = new Date(notification.end_date);
            const notificationDayOfWeek = notification.day_of_week;

            const currentDate = new Date();
            const startTime = notification.start_time;
            const endTime = notification.end_time;
            const notificationStartTime = startTime.slice(0, 5);
            const notificationEndTime = endTime.slice(0, 5);

            const date = new Date();
            const hour = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const actualTime = `${hour}:${minutes}`;

            if (actualTime >= notificationStartTime && actualTime <= notificationEndTime) {
                return (
                    <View key={notification.notifications_id} style={styles.notificationContainer}>
                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                        <Text style={styles.notificationMessage}>{notification.message}</Text>
                    </View>
                );
            }

            return null;
        });
    };

    return (
        <View style={styles.container}>
            {renderNotifications()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2', // Orange background
        padding: 20,
    },
    notificationContainer: {
        backgroundColor: 'white', // White notification background
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666',
    },
});

export default NotificationsScreen;
