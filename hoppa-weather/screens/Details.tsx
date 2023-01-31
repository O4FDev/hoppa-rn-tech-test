import { Image, StyleSheet, Text, View } from "react-native";
import { Forecastday } from "../types";

export function DetailsScreen({ route }: { route: any}) {
    const forecast = route.params.forecast as Forecastday;
    return (
        <View style={styles.container}>
            <Image 
                style={styles.Image}
                source={{uri: `http:${forecast.day.condition.icon}`}}
            />
            <Text style={styles.Title}>{forecast.day.condition.text}</Text>
            <View style={styles.InfoContainer}>
                <Text>min {forecast.day.mintemp_c}°C</Text>
                <Text style={styles.InfoPadding}>max {forecast.day.maxtemp_c}°C</Text>
            </View>
            <View style={styles.InfoContainer}>
                <Text>{forecast.day.daily_chance_of_rain}% chance of rain</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '10%',
    },
    Image: {
        width: 200,
        height: 200,
    },
    Title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    InfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '2%',
    },
    InfoPadding: {
        paddingLeft: '3%',
    },
});