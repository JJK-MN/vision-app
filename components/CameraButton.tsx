import { CameraView, useCameraPermissions } from 'expo-camera';
import * as React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function AutoCaptureButton() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraReady, setCameraReady] = React.useState(false);
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);

  async function handleCapture() {
    if (!cameraPermission?.granted) {
      const res = await requestCameraPermission();
      if (!res.granted) return;
    }

    if (!cameraReady || !cameraRef.current) {
      Alert.alert('Camera not ready yet, try again.');
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.85,
        skipProcessing: true,
      });

      setPhotoUri(photo.uri);
      console.log('Captured:', photo.uri);
    } catch (e) {
      console.error('Capture failed', e);
    }
  }

  return (
    <>
      {/* Hidden background camera */}
      <CameraView
        ref={cameraRef}
        style={styles.hiddenCamera}
        facing="back"
        onCameraReady={() => setCameraReady(true)}
      />

      {/* Thumbnail preview of last captured photo */}
      {photoUri && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <Text style={styles.previewLabel}>Last photo</Text>
        </View>
      )}

      {/* Capture button */}
      <Pressable style={styles.button} onPress={handleCapture}>
        <Text style={styles.label}>📷</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  hiddenCamera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,  // behind everything
  },
  previewContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'center',
  },
  preview: {
    width: 120,
    height: 160,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  previewLabel: {
    color: 'white',
    fontSize: 11,
    marginTop: 4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 72,
    height: 72,
    backgroundColor: 'blue',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  label: {
    fontSize: 28,
  },
});