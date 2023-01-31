import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForecastScreen } from './screens/Forecast'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={ForecastScreen} options={{title: `London's forecast`}} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const Stack = createNativeStackNavigator();
