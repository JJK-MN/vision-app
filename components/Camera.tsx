import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { Alert, Button } from 'react-native';

export default function Camera() {
    const takePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Camera permission is required to take photos.');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                console.log(uri);
                Alert.alert('Photo taken', uri);
            }
        } catch (e) {
            console.error('takePhoto error', e);
            Alert.alert('Error taking photo', String(e));
        }
    };

    return <Button title="Take Photo" onPress={takePhoto} />;
}