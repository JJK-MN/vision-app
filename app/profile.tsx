import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function profileScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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
          <Text style={styles.nameText}>John Doe</Text>
          <Text style={styles.editProfileText}>Edit profile photo</Text>
          <Text style={styles.profileSettingsText}>Profile Settings</Text>
          <Text style={styles.sectionLabel}>Personal Info</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Username</Text>
            <Text style={styles.infoInput}>{username}</Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Email Address</Text>
            <Text style={styles.infoInput}>john.doe@example.com</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Phone Number</Text>
            <Text style={styles.infoInput}>(123) 456-7890</Text>
        </View>
        <Text style={styles.sectionLabel}>Account Settings</Text>
        <Pressable onPress={() => console.log('Change password pressed')}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Change Password</Text>
            </View>
        </Pressable>
        <Pressable onPress={() => router.push('/login')}>
            <View style={styles.logOutButtonContainer}>
                <Text style={styles.logOutButtonText}>Log Out</Text>
            </View>
        </Pressable>
      </ScrollView>
      <View style={styles.footer} />
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
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    alignSelf: 'center',
  },
  editProfileText: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
  },
  profileSettingsText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    paddingLeft: 10,
    marginTop: 20,
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
  infoContainer: {
    backgroundColor: '#D9D9D9',
    outlineColor: '#B1B1B1',
    outlineWidth: 2,
    borderRadius: 10,
    marginTop: 9,
    width: '95%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {  
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    paddingLeft: 12,
  },
  infoInput: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 12,
  },
  logOutButtonContainer: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    marginTop: 9,
    width: '95%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 12,
  },
  logOutButtonText: {
    color: '#fff',
    fontSize: 16,
    alignContent: 'center',
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    height: 60,
  },
});