import * as SecureStore from 'expo-secure-store';
import React from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { requestUserAuthentication } from '../utils/API'; // Assume this is a helper function to send login requests

export default function login() {

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async () => {
        try {
            const token = await requestUserAuthentication(userName, password);
            await SecureStore.setItemAsync('username', userName);
            await SecureStore.setItemAsync('password', password);
            await SecureStore.setItemAsync('userToken', token);
            // TODO: handle token (store, navigate, etc.)
        } catch (err: any) {
            console.error('Login error', err);
            Alert.alert('Login failed', err?.message || 'Network request failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.loadingText}>
                Login
            </Text>

            <TextInput placeholder="Username" value={userName} onChangeText={setUserName}></TextInput>
            <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword}></TextInput>

            <Button title="Login" onPress={login}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loadingText: {
        fontSize: 32,
    }
})