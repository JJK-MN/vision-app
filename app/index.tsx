
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CameraButton from "../components/CameraButton";

export default function loading() {

    const text = React.useRef<Text>(null);
    const router = useRouter();

    const processLoading = React.useCallback(() => {
        console.log("Verifying credentials...");

        const userName = SecureStore.getItemAsync('username');
        const password = SecureStore.getItemAsync('password');

        // Wait until root layout is ready and text ref is set before routing to main
        if (text.current) {
            Promise.all([userName, password]).then(async ([resolvedUserName, resolvedPassword]) => {
                if (resolvedUserName == null || resolvedPassword == null) {
                    console.log("No credentials found, routing to login screen.");
                    await router.push('/login');
                    return;
                }
                    
                console.log("Routing to main screen.");
                await router.push('/main');
            });
        } else {
            console.warn("Text ref not set yet, cannot route to main screen.");
        }

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