import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function login() {

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async () => {
        const user = userName;
        const pass = password;

        // Send credentials to server and await response
        const token = await sendLoginRequest();
    };

    const sendLoginRequest = async () => {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                password: password
            }),
        });

        const data = await response.json();
        console.log(data);
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