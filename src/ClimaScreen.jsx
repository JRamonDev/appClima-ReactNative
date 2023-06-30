import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

function ClimaScreen() {
    const [climaData, setClimaData] = useState(null);
    const countries = [
        'Nicaragua',
        'Costa Rica',
        'El Salvador',
        'Guatemala',
        'Honduras',
        'Panama',
        'Belize'
    ];

    useEffect(() => {
        const fetchClimaData = async () => {
            try {
                const responsePromise = countries.map(country =>
                    axios.get(
                        `http://api.weatherapi.com/v1/current.json?key=f41e361dff1e4b12a4a235847232906&q=${country}&lang=es`,
                    ),
                );
                const responses = await Promise.all(responsePromise);
                const climaDataArray = responses.map(response => response.data);
                setClimaData(climaDataArray);
            } catch (error) {
                console.error(error);
            }
        };
        fetchClimaData();
    }, []);

    if (!climaData) {
        return (
            <View>
                <Text>
                    Cargando...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
                <View
                    style={styles.containertitle}
                >
                    <Text
                        style={styles.title}
                    >
                        Clima de Países de Centroamérica
                    </Text>
                </View>

                {climaData.map((clima, index) => (
                    <View
                        style={styles.container}
                        key={index}
                    >
                        <Text
                            style={styles.descriptionextra}
                        >
                            -----------------------------------------------------------------------
                        </Text>
                        <Text
                            style={styles.descriptionlocation}
                        >
                            {clima.location.name}
                            {', '}
                            {clima.location.country}
                        </Text>

                        <Text
                            style={styles.descriptiontemp}
                        >
                            {clima.current.temp_c} °C
                            {'     |     '}
                            {clima.current.temp_f} °F
                        </Text>

                        <Text
                            style={styles.descriptioncondition}
                        >
                            {clima.current.condition.text}
                        </Text>

                        <Text
                            style={styles.descriptionextra}
                        >
                            Viento:
                            {' '}
                            {clima.current.wind_mph}
                            {'    '}
                            Presión:
                            {' '}
                            {clima.current.pressure_in}
                            {'    '}
                            Humedad:
                            {' '}
                            {clima.current.humidity}


                        </Text>
                        <Text
                            style={styles.descriptionextra}
                        >
                            -----------------------------------------------
                        </Text>

                    </View>
                ))}
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    containertitle: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#332F2C',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#332F2C',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15
    },
    descriptionlocation: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    descriptiontemp: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#61DBFB',
    },
    descriptioncondition: {
        fontSize: 15,
        fontStyle: 'italic',
        color: 'skyblue',
    },
    descriptionextra: {
        fontSize: 16,
        color: 'gray',
    },
});

export default ClimaScreen;


