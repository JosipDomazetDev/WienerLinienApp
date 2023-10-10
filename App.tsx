import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import AboutScreen from './screens/AboutScreen';
import {Ionicons} from '@expo/vector-icons'; // Import the icons

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'} // Use the icon name
                                size={size}
                                color={color}
                            />
                        ),
                        tabBarShowLabel: false
                    }}
                />
                <Tab.Screen
                    name="Map"
                    component={MapScreen}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Ionicons
                                name={focused ? 'map' : 'map-outline'} // Use the icon name
                                size={size}
                                color={color}
                            />
                        ),
                        tabBarShowLabel: false
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Ionicons
                                name={focused ? 'person' : 'person-outline'} // Use the icon name
                                size={size}
                                color={color}
                            />
                        ),
                        tabBarShowLabel: false
                    }}
                />
                <Tab.Screen
                    name="About2"
                    component={AboutScreen}
                    options={{
                        tabBarIcon: ({focused, color, size}) => (
                            <Ionicons
                                name={focused ? 'information-circle' : 'information-circle-outline'} // Use the icon name
                                size={size}
                                color={color}
                            />
                        ),
                        tabBarShowLabel: false
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
