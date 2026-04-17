import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { requestUserAuthentication } from '../utils/API';

export default function login() {

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const logo = require('../assets/images/logo.png');
    const router = useRouter();


    const sendLoginRequest = async () => {

        if (userName.trim() === "" || password.trim() === "") {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        const token = await requestUserAuthentication(userName, password);
        if (token == null) {
            Alert.alert('Login failed', 'Invalid username or password');
            return;
        }

        SecureStore.setItemAsync('username', userName);
        SecureStore.setItemAsync('password', password);
        SecureStore.setItemAsync('token', token);
        console.log('Login successful, navigating to main screen');

        router.push('/main');
    }

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
            </View>
            <View style={styles.body}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.welcomeText}>
                    Welcome back!
                </Text>
                <Text style={styles.descriptionText}>
                    Sign in to continue
                </Text>
                <Text style={styles.inputTitle}>
                    Username or Email
                </Text>
                <View style={styles.userInputBar}>
                    <TextInput
                        style={styles.userInput}
                        placeholder="Username or Email"
                        placeholderTextColor="#999"
                        value={userName}
                        onChangeText={setUserName}
                    />
                </View>
                <Text style={styles.inputTitle}>
                    Password
                </Text>
                <View style={styles.userInputBar}>
                    <TextInput
                        style={styles.userInput}
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <Pressable onPress={() => setShowPassword(prev => !prev)}>
                        <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#999"
                        />
                    </Pressable>
                </View>
                <Text style={styles.forgotPasswordText} onPress={() => { console.log('Forgot Password Pressed'); }} >
                    Forgot password?
                </Text>
                <Pressable style={styles.signInButton} onPress={sendLoginRequest}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </Pressable>
                <View style={styles.footer}>
                    <Text style={styles.noAccountText}>
                    Don't have an account? 
                    <Text style={styles.signUpText} onPress={() => { router.push("/signup") }} > Sign Up</Text>
                </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        paddingVertical: 40,
        backgroundColor: "#fff",
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
    descriptionText: {
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
    userInput: {
        fontSize: 16,
        color: '#333',
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
    },
    userInputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 50,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#000',
        textAlign: 'right',
        marginVertical: 15,
        fontWeight: '600',
    },
    signInButton: {
        backgroundColor: '#000',
        padding: 14,
        borderRadius: 15,
        marginTop: 20,
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
    signUpText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '600',
    },
    logo: {
        width: 40 * 2,
        height: 40 * 2,
        marginRight: 12,
        marginBottom: 20,
    },
    footer: {
        height: 60,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 60,
        flex : 1,
    },
});