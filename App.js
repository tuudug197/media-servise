import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native"
import Home from "./pages/Home"
import Camera from './pages/Camera';
import Media from "./pages/Media"

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Camera" component={Camera}/>
          <Tab.Screen name='Photos' component={Media}/>
      </Tab.Navigator>
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
