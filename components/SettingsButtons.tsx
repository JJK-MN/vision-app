import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

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
        <Text style={styles.premiumButtonMainText}>{label}</Text>
        {descriptionElement && (
          <Text style={styles.premiumButtonDescriptionText}>
            {descriptionElement}
          </Text>
        )}
        {!descriptionElement && description && (
          <Text style={styles.premiumButtonDescriptionText}>{description}</Text>
        )}
      </Pressable>
    );
  }

  if (variant === 'user') {
    return (
      <Pressable style={styles.userButton} onPress={onPress}>
        <Text style={styles.userButtonMainText}>{label}</Text>
        {description && (
          <Text style={styles.userButtonDescriptionText}>{description}</Text>
        )}
      </Pressable>
    );
  }

  // default: 'button'
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
    padding: 7,
    borderRadius: 10,
    marginTop: 9,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: 65,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  premiumButtonMainText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    transform: [{ translateX: 60 }],
  },
  premiumButtonDescriptionText: {
    color: '#9e9a9aff',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'left',
    width: '80%',
    transform: [{ translateX: 60 }],
  },

  // User button
  userButton: {
    backgroundColor: '#FFF',
    outlineColor: '#B1B1B1',
    outlineWidth: 2,
    padding: 14,
    borderRadius: 10,
    marginTop: 9,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: 65,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userButtonMainText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    transform: [{ translateX: 60 }],
  },
  userButtonDescriptionText: {
    color: '#3d3a3aff',
    fontWeight: '400',
    fontSize: 14,
    transform: [{ translateX: 60 }],
  },
});