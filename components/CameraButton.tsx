import { BlurView } from 'expo-blur';
import * as React from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View } from 'react-native';

export default function AutoCaptureButton({ 
  onPressedCallback,
}: { 
  onPressedCallback: () => void,
}) {

  
  const renderBars = () => {
    const bars = [];
    const barCount = 16; // Match the 16 bars in the image
    const screenWidth = Dimensions.get('window').width;
    
    // Dynamic sizing based on screen width
    const centerRingSize = screenWidth * 0.12; 
    const innerGap = screenWidth * 0.035; 
    const innerRadius = (centerRingSize / 2) + innerGap;
    const barWidth = screenWidth * 0.018;

    for (let i = 0; i < barCount; i++) {
      const angle = (Math.PI * 2 * i) / barCount;
      const angleDeg = (angle * 180) / Math.PI;

      const isBig = i % 2 === 0;
      const height = isBig ? screenWidth * 0.1 : screenWidth * 0.05;

      // Add half height to innerRadius so the inside edges form a perfect circle 
      const distance = innerRadius + (height / 2);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      bars.push(
        <View
          key={i}
          style={[
            styles.bar,
            { 
              width: barWidth,
              height: height,
              borderRadius: barWidth / 2,
              transform: [
                { translateX: x },
                { translateY: y },
                // rotate an extra 90deg to keep length pointing radially outward
                { rotate: `${angleDeg + 90}deg` }, 
              ] 
            },
          ]}
        />
      );
    }

    return bars;
  }

  return (
    <View style={styles.container}>

      {/* Capture button with visualizer */}
      <View style={styles.buttonWrapper}>
        {/* Blur layer behind button content */}
        <BlurView
          style={StyleSheet.absoluteFill}
          intensity={80}
          tint="light"
        />

        {/* Button content on top */}
        <Pressable style={styles.button} onPress={onPressedCallback}>
          <Animated.View style={styles.visualizerRing}>
            {renderBars()}
          </Animated.View>
          <View style={styles.centerDot} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualizerRing: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').width * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  buttonWrapper: {
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').width * 0.55,
    borderRadius: Dimensions.get('window').width * 0.275, // makes it circular
    overflow: 'hidden', // ← clips BlurView to the circle shape
  },
  centerDot: {
    position: 'absolute',

    width: Dimensions.get('window').width * 0.12,
    height: Dimensions.get('window').width * 0.12,

    borderRadius: Dimensions.get('window').width * 0.06,
    borderWidth: Dimensions.get('window').width * 0.018,
    borderColor: '#E87A7D',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  backgroundBlur: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').width * 0.55,
  },
  bar: {
    position: 'absolute',
    backgroundColor: '#E87A7D',
    width: Dimensions.get('window').width * 0.015,
    borderRadius: Dimensions.get('window').width * 0.025,
    opacity: 1,
  },
  barBig: {
    height: Dimensions.get('window').width * 0.08,
  },
  barSmall: {
    height: Dimensions.get('window').width * 0.05,
  },
});