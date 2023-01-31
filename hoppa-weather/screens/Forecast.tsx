import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from 'react-query';
import { Root } from "../types";
import { StyleSheet } from 'react-native';

const getForecast = async () => {
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=24345e2c6b5f49268fc84651233101&q=London&days=7&aqi=no&alerts=no');
    return response.json();
}

export function ForecastScreen({ navigation }: { navigation: any }) {
    const { data, status } = useQuery<Root>('forecast', getForecast);

    if (status === 'loading') {
        return (
            <Text>Loading...</Text>
        );
    }

    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <FlatList 
                data={data?.forecast.forecastday}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Details', {forecast: item})
                        }}
                    >
                        <View style={styles.imgInfoContainer}>
                            <Image
                                style={{ width: 64, height: 64 }}
                                source={{uri: `http:${item.day.condition.icon}`}}
                            />
                            <View style={styles.mainInfo}>
                                <Text style={{fontSize: 20}}>
                                    {item.day.condition.text}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text>min {item.day.mintemp_c}°C</Text>
                                    <Text style={{paddingLeft: '3%'}}>max {item.day.maxtemp_c}°C</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 16}}>{item.day.daily_chance_of_rain}%</Text>
                                <Text style={{fontSize: 12}}>Chance of rain</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.date}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainInfo: {
        flexDirection: 'column'
    }
});
