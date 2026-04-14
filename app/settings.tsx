import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import MyButton from '../components/SettingsButtons';

export default function SettingsScreen() {
  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

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

  function handleMicPress() {
    setIsListening(prev => !prev);
    console.log('Mic pressed');
  }

  return (
    <GestureDetector gesture={swipeRight}>
      <View style={styles.screen}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchRow}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            <Pressable onPress={handleMicPress}>
              <Ionicons
                name={isListening ? "mic" : "mic-outline"}
                size={22}
                color={isListening ? "#E87A7D" : "#999"}
              />
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.body}>

          <Text style={styles.titleLabel}>Settings</Text>
          <Text style={styles.descriptionLabel}>Manage your app preferences and settings</Text>

          {/* Account Section */}
          <MyButton
            variant="premium"
            label="Upgrade to Pro"
            descriptionElement={
              <Text>
                <Text>Unlock limited meal plans and advanced nutrition tracking{'\n'}</Text>
                <Text style={{ color: '#ffffffff', fontWeight: '600' }}>Try 7 days free</Text>
                <Text> then $cost/month</Text>
              </Text>
            }
            onPress={() => console.log('pressed')}
          />
          <MyButton
            variant="user"
            label="John Doe"
            description="Profile Settings"
            onPress={() => router.push('/profile')}
          />

          {/* Camera Sensor Section */}
          <Text style={styles.sectionLabel}>Camera Sensor</Text>
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />

          {/* App Preferences Section */}
          <Text style={styles.sectionLabel}>App Preferences</Text>
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />
          <MyButton label="Lorem Ipsum" onPress={() => console.log('pressed')} />

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
    paddingTop: 55,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e2dedeff',
    borderRadius: 50,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  body: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  titleLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  descriptionLabel: {
    fontSize: 16,
    color: '#666',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
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