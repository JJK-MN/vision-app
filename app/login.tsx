import * as SecureStore from 'expo-secure-store';
import React from "react";
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function login() {

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [search, setSearch] = React.useState("");

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
        <View style={styles.screen}>
            <View style={styles.header}>
            </View>
            <View style={styles.body}>
                <Text style={styles.welcomeText}>
                    Welcome back!
                </Text>
                <Text style={styles.signInText}>
                    Sign in to continue
                </Text>
                <Text style={styles.inputTitle}>
                    Email
                </Text>
                <View style={styles.searchInputBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="you@example.com"
                        placeholderTextColor="#999"
                        value={userName}
                        onChangeText={setUserName}
                    />
                </View>
                <Text style={styles.inputTitle}>
                    Password
                </Text>
                <View style={styles.searchInputBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <Pressable style={styles.signInButton} onPress={login}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </Pressable>
                <Text style={styles.noAccountText}>
                    Don't have an account? Sign up
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        padding: 20,
    },
    body: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    welcomeText: {
        fontSize: 35,
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    signInText: {
        fontSize: 18,
        marginBottom: 20,
        color: "#666",
        paddingTop: 5,
        paddingBottom: 20,
    },
    inputTitle: {
        fontSize: 14,
        color: "#333",
        marginTop: 10,
        marginBottom: 10,
    },
    searchInput: {
        fontSize: 16,
        color: '#333',
        paddingTop: 10,
        paddingBottom: 10,
    },
    searchInputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e2dedeff',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 50,
    },
    signInButton: {
        backgroundColor: '#000',
        padding: 14,
        borderRadius: 15,
        marginTop: 60,
        marginBottom: 20,
        width: '100%',
        height: 55,
        alignSelf: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    signInButtonText: {   
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    noAccountText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});