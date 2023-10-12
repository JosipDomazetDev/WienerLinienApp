import React, {memo, useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {ListItem} from 'react-native-elements'
import { observer } from 'mobx-react-lite';
import Modal from 'react-native-modal';
import {stationsStore} from "../stores/StationsStore";

const HomeScreen: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [newStation, setNewStation] = useState<Station>({
        id: '',
        type: '',
        diva: '',
        name: '',
        gemeinde: '',
        gemeindeId: '',
        latitude: '',
        longitude: '',
        stand: '',
    });

    useEffect(() => {
        stationsStore.fetchStations();
    }, []);

    const addStation = () => {
        setModalVisible(true);
    };

    const saveNewStation = () => {
        stationsStore.addStation(newStation);

        setModalVisible(false);
        setNewStation({
            id: '',
            type: '',
            diva: '',
            name: '',
            gemeinde: '',
            gemeindeId: '',
            latitude: '',
            longitude: '',
            stand: '',
        });
    };

    const ListItemMemo = memo((item: any) => {
        item = item.item;
        return (
            <ListItem bottomDivider key={item.id}>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitle}>Latitude: {item.latitude}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitle}>Longitude: {item.longitude}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        );
    });

    return (
        <View>
            <Button title="Add Station" onPress={addStation}/>

            <FlatList
                data={stationsStore.getStations()}
                renderItem={({item}) => <ListItemMemo item={item}/>}
                keyExtractor={(item) => item.id}
            />

            <Modal isVisible={isModalVisible} style={{backgroundColor: 'white'}}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add New Station</Text>
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Station Name"
                        value={newStation.name}
                        onChangeText={(text) => setNewStation({...newStation, name: text})}
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Latitude"
                        value={newStation.latitude}
                        onChangeText={(text) => setNewStation({...newStation, latitude: text})}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Longitude"
                        value={newStation.longitude}
                        onChangeText={(text) => setNewStation({...newStation, longitude: text})}
                        keyboardType="numeric"
                    />
                    <View style={{margin: 4}}/>
                    <Button title="Save" onPress={saveNewStation}/>
                    <View style={{margin: 4}}/>
                    <Button title="Cancel" onPress={() => setModalVisible(false)}/>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    subtitle: {
        color: '#818181',
        fontSize: 11
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 2,
    },
    modalContent: {
        backgroundColor: 'white',
        padding:
            20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight:
            'bold',
    },
    modalInput: {
        height: 40,
        borderColor:
            '#ccc',
        borderWidth:
            1,
        padding:
            10,
        marginTop:
            10,
    },
    modalButton: {
        marginTop: 10,
    },
});

export default observer(HomeScreen);
