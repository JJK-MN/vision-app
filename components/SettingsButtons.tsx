import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const premiumIcon = require('../assets/images/premiumIcon.png');
const userIcon = require('../assets/images/userIcon.png');

type Props = {
  label: string;
  description?: string;
  descriptionElement?: React.ReactNode;
  variant?: 'button' | 'premium' | 'user';
  onPress: () => void;
};

export default function MyButton({ label, description, descriptionElement, variant = 'button', onPress }: Props) {

  if (variant === 'premium') {
    return (
      <Pressable style={styles.premiumButton} onPress={onPress}>
        <View style={styles.premiumIconContainer}>
            <Image source={premiumIcon} style={styles.premiumIcon} />
        </View>
        <View style={styles.premiumTextContainer}>
          <Text style={styles.premiumButtonMainText}>{label}</Text>
          {descriptionElement && (
            <Text style={styles.premiumButtonDescriptionText}>
              {descriptionElement}
            </Text>
          )}
          {!descriptionElement && description && (
            <Text style={styles.premiumButtonDescriptionText}>{description}</Text>
          )}
        </View>
      </Pressable>
    );
  }

  if (variant === 'user') {
    return (
      <Pressable style={styles.userButton} onPress={onPress}>
        <View style={styles.userIconContainer}>
          <Image source={userIcon} style={styles.userIcon} />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userButtonMainText}>{label}</Text>
          {description && (
            <Text style={styles.userButtonDescriptionText}>{description}</Text>
          )}
        </View>
      </Pressable>
    );
  }

  // ✅ default: 'button'
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Normal button
  button: {
    backgroundColor: '#D9D9D9',
    outlineColor: '#B1B1B1',
    outlineWidth: 2,
    padding: 14,
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
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },

  // Premium button
  premiumButton: {
    backgroundColor: '#272222ff',
    outlineColor: '#000',
    outlineWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
    marginTop: 9,
    width: '95%',
    alignSelf: 'center',
    minHeight: 65,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  premiumIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 20,
    transform: [{ translateX: 10 }],
  },
  premiumIconContainer: {
    backgroundColor: '#000',
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    transform: [{ translateX: 10 }],
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumButtonMainText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    transform: [{ translateX: 10 }],
  },
  premiumButtonDescriptionText: {
    color: '#9e9a9aff',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 4,
    transform: [{ translateX: 10 }],
  },

  // User button
  userButton: {
    backgroundColor: '#FFF',
    outlineColor: '#B1B1B1',
    outlineWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginTop: 9,
    width: '95%',
    alignSelf: 'center',
    minHeight: 65,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    transform: [{ translateX: 7 }],
  },
  userIconContainer: {
    backgroundColor: '#D9D9D9',
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: 5 }],
  },
  userTextContainer: {
    flex: 1,
  },
  userButtonMainText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    transform: [{ translateX: 5 }],
  },
  userButtonDescriptionText: {
    color: '#3d3a3aff',
    fontWeight: '400',
    fontSize: 14,
    transform: [{ translateX: 5 }],
  },
});