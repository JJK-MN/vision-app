import { CameraView, useCameraPermissions } from 'expo-camera';
import * as React from 'react';
import { Alert, Animated, Dimensions, Easing, Pressable, StyleSheet, View } from 'react-native';

export default function AutoCaptureButton() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraReady, setCameraReady] = React.useState(false);
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);

  // 12 bars: 6 big, 6 small alternating
  const animations = React.useRef(Array.from({ length: 12 }).map(() => new Animated.Value(0))).current;
  const rotationAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const anims = animations.map((anim, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            delay: index * 100, // sine wave staggered effect
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
    });
    anims.forEach((a) => a.start());

    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 12000, // Smooth 4-second full rotation
        easing: Easing.linear, // Ensure it's a constant speed, not speeding up and slowing down
        useNativeDriver: true,
      })
    ).start();
  }, [animations, rotationAnim]);

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

  const renderBars = () => {
    return animations.map((anim, index) => {
      const isBig = index % 2 === 0;
      const angle = index * 30; // 360 / 12 = 30 degrees each
      
      const scaleY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: isBig ? [2, 2.5] : [2, 2.75],
      });

      const barHeight = isBig ? 24 : 16;
      const halfHeight = barHeight / 2 + Dimensions.get('window').width * 0.05;

      return (
        <View
          key={index}
          style={[
            styles.barContainer,
            { transform: [{ rotate: `${angle}deg` }] },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              isBig ? styles.barBig : styles.barSmall,
              {
                // This anchoring technique makes it scale from the bottom outwards
                transform: [
                  { translateY: halfHeight },
                  { scaleY },
                  { translateY: -halfHeight }
                ],
              },
            ]}
          />
        </View>
      );
    });
  };

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      {/* Hidden background camera */}
      <CameraView
        ref={cameraRef}
        style={styles.hiddenCamera}
        facing="back"
        onCameraReady={() => setCameraReady(true)}
      />

      {/* Capture button with visualizer */}
      <Pressable style={styles.button} onPress={handleCapture}>
        <Animated.View style={[styles.visualizerRing, { transform: [{ rotate: spin }] }]}>
          {renderBars()}
        </Animated.View>
        <View style={styles.centerDot} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  hiddenCamera: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualizerRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerDot: {
    width: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').width * 0.05,
    borderRadius: Dimensions.get('window').width * 0.025,
    backgroundColor: 'white',
    zIndex: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  barContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.05,
    // total height controls how far from the center the bars start
    height: Dimensions.get('window').width * 0.3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bar: {
    width: Dimensions.get('window').width * 0.015,
    backgroundColor: 'white',
    borderRadius: Dimensions.get('window').width * 0.025,
    opacity: 0.8,
  },
  barBig: {
    height: Dimensions.get('window').width * 0.08,
  },
  barSmall: {
    height: Dimensions.get('window').width * 0.05,
  },
});