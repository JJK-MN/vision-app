import { CameraView, useCameraPermissions } from "expo-camera";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import CameraButton from "../components/CameraButton";


export default function Index() {

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
  
        if (photo) {
          setPhotoUri(photo.uri);
          console.log('Captured:', photo.uri);
        }
      } catch (e) {
        console.error('Capture failed', e);
      }
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CameraView
              ref={cameraRef}
              style={styles.hiddenCamera}
              facing="back"
              onCameraReady={() => setCameraReady(true)}
      />
      
      <CameraButton onPressedCallback={handleCapture} />
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenCamera: {
      ...StyleSheet.absoluteFillObject,
  },
});
