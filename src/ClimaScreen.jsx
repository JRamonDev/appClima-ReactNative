import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
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
        'Belice'
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
                <Text>Cargando...</Text>
            </View>
        );
    }
}

export default ClimaScreen;


