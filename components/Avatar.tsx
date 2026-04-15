import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  name: string;
  imageUri?: string | null;
  size?: number;
  onImageChange?: (uri: string) => void;  // optional - only if you want it pressable
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (name: string) => {
  const colors = ['#E87A7D', '#7DB8E8', '#7DE8A0', '#E8C47D', '#C47DE8'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function Avatar({ name, imageUri, size = 50, onImageChange }: Props) {

  const handlePress = async () => {
    if (!onImageChange) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],      // ✅ forces square crop
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <Pressable onPress={handlePress} style={[styles.container, avatarStyle]}>
      {imageUri ? (
        // ✅ show image if available
        <Image source={{ uri: imageUri }} style={[styles.image, avatarStyle]} />
        ) : name && name.trim().length > 0 ? (
        // ✅ show initials if name exists
        <View style={[styles.initialsContainer, avatarStyle, { backgroundColor: getAvatarColor(name) }]}>
            <Text style={[styles.initialsText, { fontSize: size * 0.35 }]}>
            {getInitials(name)}
            </Text>
        </View>
        ) : (
        // ✅ default fallback when no name or image
        <View style={[styles.initialsContainer, avatarStyle, { backgroundColor: '#ccc' }]}>
            <Ionicons name="person" size={size * 0.55} color="#fff" />
        </View>
        )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#000',
    fontWeight: '600',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#333',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});