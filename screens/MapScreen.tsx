import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

const dummyStations: Station[] = [
    {
        id: '1',
        type: 'U-Bahn',
        diva: 'U1',
        name: 'Stephansplatz',
        gemeinde: 'Wien',
        gemeindeId: '1',
        latitude: '48.210651',
        longitude: '16.363451',
        stand: 'B',
    },
    {
        id: '2',
        type: 'U-Bahn',
        diva: 'U2',
        name: 'Schottentor',
        gemeinde: 'Wien',
        gemeindeId: '1',
        latitude: '48.209668',
        longitude: '16.358454',
        stand: 'A',
    },
    {
        id: '3',
        type: 'U-Bahn',
        diva: 'U3',
        name: 'Herrengasse',
        gemeinde: 'Wien',
        gemeindeId: '1',
        latitude: '48.208787',
        longitude: '16.357348',
        stand: 'B',
    },
];

const MapScreen = () => {
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 48.210651,
        longitude: 16.363451,
    });

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            console.log(location.coords.latitude, location.coords.longitude)
        })();
    }, []);

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {dummyStations.map((station) => (
                <Marker
                    key={station.id}
                    coordinate={{
                        latitude: parseFloat(station.latitude),
                        longitude: parseFloat(station.longitude),
                    }}
                    title={station.name}
                />
            ))}

            <Marker
                coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                }}
                pinColor={'lightblue'}
                title="You are here"/>
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapScreen;
