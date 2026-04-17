import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from 'expo-router';
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from "react-native-worklets";
import CameraButton from "../components/CameraButton";

export default function main() {

  const router = useRouter();

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraReady, setCameraReady] = React.useState(false);
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (cameraPermission && !cameraPermission.granted && cameraPermission.canAskAgain) {
      requestCameraPermission();
    }
  }, [cameraPermission]);

  const navigateSettings = React.useCallback(() => {
      router.push('/settings');
    }, [router]);

  // Use the new Gesture API: create a pan gesture and handle `onEnd` to detect left swipe
  const panGesture = Gesture.Pan().onEnd((event: any) => {
    const { translationX, translationY } = event;
    const HORIZONTAL_SWIPE_THRESHOLD = -120; // px to the left
    const MAX_VERTICAL_DRIFT = 80; // allow some vertical movement

    if (translationX < HORIZONTAL_SWIPE_THRESHOLD && Math.abs(translationY) < MAX_VERTICAL_DRIFT) {
      console.log('Swiped left, navigating to settings');
      runOnJS(navigateSettings)();
    }
  });

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
    <GestureHandlerRootView style={{ flex : 1 }}>
      <GestureDetector gesture={panGesture}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {cameraPermission?.granted ? (
            <CameraView
              ref={cameraRef}
              style={styles.hiddenCamera}
              facing="back"
              onCameraReady={() => setCameraReady(true)}
            />
          ) : null}
          
          <CameraButton onPressedCallback={handleCapture} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  hiddenCamera: {
      ...StyleSheet.absoluteFillObject,
  },
});
