
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CameraButton from "../components/CameraButton";

export default function loading() {

    const text = React.useRef<Text>(null);
    const router = useRouter();

    const processLoading = React.useCallback(() => {
        console.log("First communicating with server...");

        const userName = SecureStore.getItemAsync('username').then((name) => {
            if (name) {
                console.log("User name found:", name);
            } else {
                console.log("No user name found, routing to login.");
                router.push('/login');
            }
        });

        /*
        const password = SecureStore.getItemAsync('password').then((pass) => {
            if (pass) {
                console.log("Password found.");
            } else {
                console.log("No password found, routing to login.");
                router.push('/login');
            }
        });
            */

        /*
        // Wait until root layout is ready and text ref is set before routing to main
        if (text.current) {
            Promise.all([userName, password]).then(() => {
                console.log("Routing to main screen.");
                router.push('/login');
            });
        } else {
            console.warn("Text ref not set yet, cannot route to main screen.");
        }
        */


    }, []);

    useEffect(() => {
        processLoading();
    }, [])

    return (
        <View style={styles.container}>
            <CameraButton onPressedCallback={() => {}}></CameraButton>
            <Text style={styles.loadingText} ref={text}>
                Loading
            </Text>
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
        marginTop: 300
    }
})