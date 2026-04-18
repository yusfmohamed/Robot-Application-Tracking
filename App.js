import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import OrderBrowsingScreen from './src/screens/OrderBrowsingScreen';
import PayloadDetailsScreen from './src/screens/PayloadDetailsScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';
import TrackScreen from './src/screens/TrackScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LocationScreen from './src/screens/LocationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OrderBrowsing" component={OrderBrowsingScreen} />
        <Stack.Screen name="PayloadDetails" component={PayloadDetailsScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
        <Stack.Screen name="Track" component={TrackScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}