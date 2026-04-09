import * as SecureStore from 'expo-secure-store';
import React from "react";
import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from "react-native";

export default function login() {

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async () => {
        try {
            const token = await sendLoginRequest();
            await SecureStore.setItemAsync('username', userName);
            await SecureStore.setItemAsync('password', password);
            await SecureStore.setItemAsync('token', token['token']);
            // TODO: handle token (store, navigate, etc.)
        } catch (err: any) {
            console.error('Login error', err);
            Alert.alert('Login failed', err?.message || 'Network request failed');
        }
    };

    const sendLoginRequest = async () => {
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://127.0.0.1:5000';
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                password: password
            }),
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`Server error: ${response.status} ${text}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
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