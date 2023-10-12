import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {observer} from "mobx-react-lite";
import {stationsStore} from "../stores/StationsStore";


const MapScreen = () => {
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 48.210651,
        longitude: 16.363451,
    });

    async function fetchCurrentLocation() {
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
    }

    useEffect(() => {
        (async () => {
            await stationsStore.fetchStations();
            await fetchCurrentLocation();
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
            {stationsStore.getStations().map((station) => (
                <Marker
                    key={station.id}
                    coordinate={{
                        latitude: parseFloat(station.latitude ? station.latitude : '-1'),
                        longitude: parseFloat(station.longitude ? station.longitude : '-1'),
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

export default observer(MapScreen);
