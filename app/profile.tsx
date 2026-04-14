import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function profileScreen() {
  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const [username, setUsername] = React.useState('');

  const swipeRight = Gesture.Pan()
    .runOnJS(true)
    .minDistance(30)
    .activeOffsetX([-20, 20])
    .onEnd((e) => {
      if (e.translationX > 50 && Math.abs(e.translationY) < 80) {
        console.log('Swiped right, going back');
        router.push('/');
      }
    });

    React.useEffect(() => {
    const loadUsername = async () => {
      const stored = await SecureStore.getItemAsync('username');
      if (stored) setUsername(stored);
    };
    loadUsername();
  }, []);

  return (
    <GestureDetector gesture={swipeRight}>
      <View style={styles.screen}>

        {/* Header */}
        <View style={styles.header}>
        </View>

        <ScrollView style={styles.body}>

          <Text style={styles.profileSettingsText}>John Doe</Text>
          <Text style={styles.editProfileText}>Edit profile photo</Text>

          <View style={styles.footer} />
        </ScrollView>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 105,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  body: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  profileSettingsText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    alignSelf: 'center',
  },
  editProfileText: {
    fontSize: 16,
    color: '#666',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textTransform: 'uppercase',
    marginTop: 8,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    transform: [{ translateY: 5 }],
  },
  footer: {
    height: 60,
  },
});