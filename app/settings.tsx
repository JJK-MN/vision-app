import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export default function SettingsScreen() {
  const router = useRouter();

  const navigateHome = React.useCallback(() => {
    router.push('/');
  }, [router]);

  const swipeLeft = Gesture.Pan()
    .minDistance(30)
    .activeOffsetX([-20, 20])
    .onEnd((e) => {
      // Swiping right or left to go to index
      if (Math.abs(e.translationX) > 50 && Math.abs(e.translationY) < 80) {
        // runOnJS will safely call the JS navigation function from the gesture worklet
        runOnJS(navigateHome)();
      }
    });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={swipeLeft}>
        <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});