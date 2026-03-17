

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function CameraButton(): React.ReactElement {
    
    const [size, setSize] = React.useState({ width: '20vw', height: '20vw' });

    function onPressCameraButton() {
        console.log("Camera button pressed");

        setSize({ width: '25vw', height: '25vw' });
    }

    return (
        <View style={[styles.button, { width: size.width, height: size.height }]} onTouchEnd={onPressCameraButton} className='camera-button'>
            <Text style={styles.label}>Camera Button</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '20vw',
        height: '20vw',
        backgroundColor: 'blue',
        borderRadius: '50vw',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
})