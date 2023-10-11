import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import Papa from 'papaparse';
import Modal from 'react-native-modal';


const HomeScreen: React.FC = () => {
    let stations: Station[], setStations: (value: (((prevState: Station[]) => Station[]) | Station[])) => void;
    [stations, setStations] = useState<Station[]>([]);
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
        // Papa.parse(require('../assets/wienerlinien.csv'), {
        //     delimiter: ';',
        //     header: true,
        //     newline: "\r\n",
        //     complete: (result) => {
        //         console.log(result);
        //         // this just prints {data: Array(0), errors: Array(0), meta: {…}}
        //         const parsedStations: Station[] = result.data.map((item: any) => ({
        //             id: item.HALTESTELLEN_ID,
        //             type: item.TYP,
        //             diva: item.DIVA,
        //             name: item.NAME,
        //             gemeinde: item.GEMEINDE,
        //             gemeindeId: item.GEMEINDE_ID,
        //             latitude: item.WGS84_LAT,
        //             longitude: item.WGS84_LON,
        //             stand: item.STAND,
        //         }));
        //         console.log(parsedStations);
        //
        //         setStations(parsedStations);
        //     },
        // });
    }, []);

    const addStation = () => {
        setModalVisible(true);
    };

    const saveNewStation = () => {
        setStations([...stations, newStation]);

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

    return (
        <View>
            <Text>Home Screen</Text>
            <FlatList
                data={stations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>Name: {item.name}</Text>
                        <Text>Type: {item.type}</Text>
                        {/* Add more fields as needed */}
                    </View>
                )}
            />
            <Button title="Add Station" onPress={addStation} />

            <Modal isVisible={isModalVisible}>
                <View>
                    <Text>Add New Station</Text>
                    <TextInput
                        placeholder="Station Name"
                        value={newStation.name}
                        onChangeText={(text) => setNewStation({ ...newStation, name: text })}
                    />
                    {/* Add inputs for other fields as needed */}
                    <Button title="Save" onPress={saveNewStation} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

export default HomeScreen;
