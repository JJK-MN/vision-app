import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function SettingsScreen() {
  const router = useRouter();

  const swipeLeft = Gesture.Pan()
    .runOnJS(true)
    .minDistance(30)
    .activeOffsetX([-20, 20])
    .onEnd((e) => {
      // Swiping right or left to go to index
      if (Math.abs(e.translationX) > 50 && Math.abs(e.translationY) < 80) {
        router.push({ pathname: "/" });
      }
    });

  return (
    <GestureDetector gesture={swipeLeft}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
      </View>
    </GestureDetector>
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