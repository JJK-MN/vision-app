import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { requestUserRegistration } from '../utils/API';

export default function signUpScreen() {

    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const logo = require('../assets/images/logo.png');
    const [isChecked, setIsChecked] = React.useState(false);
    const router = useRouter();

    const signUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const firstName = fullName.split(' ')[0] || '';
            const lastName = fullName.split(' ')[1] || '';

            if (firstName.length === 0 || lastName.length === 0) {
                Alert.alert('Error', 'Please enter both first and last name');
                return;
            }

            const success = await requestUserRegistration(userName, password, email, firstName, lastName);
            
            if (!success) {
                Alert.alert('Error', 'Sign up failed');
                return;
            } else {
                console.log('Sign up successful, navigating to login');
                await SecureStore.setItemAsync('username', userName);
                await SecureStore.setItemAsync('password', password);
                router.push('/login');
            }
        } catch (err: any) {
            console.error('Sign up error', err);
            Alert.alert('Sign up failed', err?.message || 'Network request failed');
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
            </View>
            <View style={styles.body}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.welcomeText}>
                    Create an account!
                </Text>
                <Text style={styles.descriptionText}>
                    Fill in your details to get started
                </Text>
                <Text style={styles.inputTitle}>
                    Full Name
                </Text>
                <View style={styles.userInputBar}>
                    <TextInput
                        style={styles.userInput}
                        placeholder="Enter your full name"
                        placeholderTextColor="#999"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                <Text style={styles.inputTitle}>
                    Username
                </Text>
                <View style={styles.userInputBar}>
                    <TextInput
                        style={styles.userInput}
                        placeholder="Enter your username"
                        placeholderTextColor="#999"
                        value={userName}
                        onChangeText={setUserName}
                    />
                </View>

                <Text style={styles.inputTitle}>
                    Email
                </Text>
                <View style={styles.userInputBar}>
                    <TextInput
                        style={styles.userInput}
                        placeholder="you@example.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <Text style={styles.inputTitle}>
                    Password
                </Text>
                <View style={styles.userInputBar}>
                    <TextInput
                        style={styles.userInput}
                        placeholder="Create a password"
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
                <Text style={styles.inputTitle}>
                    Confirm Password
                </Text>
                <View style={styles.userInputBar}>
                    <TextInput
                        style={styles.userInput}
                        placeholder="Confirm your password"
                        placeholderTextColor="#999"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <Pressable onPress={() => setShowConfirmPassword(prev => !prev)}>
                        <Ionicons
                            name={showConfirmPassword ? "eye" : "eye-off"}
                            size={20}
                            color="#999"
                        />
                    </Pressable>
                </View>
                <Pressable 
                    style={styles.checkboxContainer} 
                    onPress={() => setIsChecked(prev => !prev)}
                    >
                    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                        {isChecked && (
                        <Ionicons name="checkmark" size={14} color="#fff" />
                        )}
                    </View>
                    <Text style={styles.checkboxText}>I agree to the Terms of Service and Privacy Policy.</Text>
                </Pressable>
                <Pressable style={styles.createAccountButton} onPress={signUp}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </Pressable>
                <View style={styles.footer}>
                    <Text style={styles.alreadyHaveAccountText}>
                    Don't have an account? 
                    <Text style={styles.logInText} onPress={() => { router.push('/login') }} > Log In</Text>
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
    createAccountButton: {
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
    createAccountText: {   
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#999',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    checkboxChecked: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    checkboxText: {
        fontSize: 14,
        color: '#000',
        flex: 1,
    },
    alreadyHaveAccountText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    logInText: {
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