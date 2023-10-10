import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import packageInfo from '../package.json';

const AboutScreen = () => {
    const appVersion = packageInfo.version;

    const developerInfo = {
        name: 'Josip Domazet',
        bio: 'Full Stack Developer',
        email: 'josip.domazet.corp@gmail.com',
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/profile.jpg')} style={styles.profileImage}/>
            <Text style={styles.name}>{developerInfo.name}</Text>
            <Text style={styles.bio}>{developerInfo.bio}</Text>
            <Text style={styles.email}>{developerInfo.email}</Text>
            <Text style={styles.version}>App Version: {appVersion}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 18,
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
    version: {
        fontSize: 14,
    },
});

export default AboutScreen;
