import { FlatList, Text, View } from "react-native";
import { useState } from "react";
import { useQuery } from 'react-query';
import { Root } from "../types";
import { StyleSheet } from 'react-native';

const getForecast = async () => {
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=24345e2c6b5f49268fc84651233101&q=London&days=7&aqi=no&alerts=no');
    return response.json();
}

export function ForecastScreen() {
    const { data, status } = useQuery<Root>('forecast', getForecast);

    if (status === 'loading') {
        return (
            <Text>Loading...</Text>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList 
                data={data?.forecast.forecastday}
                renderItem={({ item }) => (
                    <Text>{item.date} - {item.day.condition.text}</Text>
                )}
                keyExtractor={item => item.date}
            />
        </View>
    );
}

StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
