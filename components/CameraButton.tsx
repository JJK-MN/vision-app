import { BlurView } from 'expo-blur';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Pressable, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AutoCaptureButton({ onPressedCallback }: { onPressedCallback: () => void }) {
  const barCount = 16;
  
  // Create animated values (0 to 1)
  const barAnimations = useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = barAnimations.map((anim, i) => {
      const isEven = i % 2 === 0;
      const duration = isEven ? 800 : 600; // Different speeds for even/odd bars
      // Staggered start delay
      const delay = 0;
      
      return Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ),
      ]);
    });

    Animated.parallel(animations).start();
  }, []);

  const renderBars = () => {
    const centerRingSize = SCREEN_WIDTH * 0.12;
    const innerGap = SCREEN_WIDTH * 0.035;
    const innerRadius = centerRingSize / 2 + innerGap;
    const barWidth = SCREEN_WIDTH * 0.018;

    return barAnimations.map((anim, i) => {
      const isEven = i % 2 === 0;
      const angle = (i * 360) / barCount;
      
      // Base heights
      const baseHeight = isEven ? SCREEN_WIDTH * 0.08 : SCREEN_WIDTH * 0.05;
      const growthAmount = baseHeight * 0.6; // How much it grows

      // Interpolate scale and translation
      // By moving the anchor point via translateY, we simulate growth from center
      const scaleY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
      });

      const translateY = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [innerRadius + baseHeight / 2, innerRadius + (baseHeight * 1.5) / 2],
      });

      return (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              width: barWidth,
              height: baseHeight,
              borderRadius: barWidth / 2,
              transform: [
                { rotate: `${angle}deg` },
                { translateY: translateY },
                { scaleY: scaleY },
              ],
            },
          ]}
        />
      );
    });
  };


  const dotAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = 1000;

    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnimation, {
          toValue: 1,
          duration: duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(dotAnimation, {
          toValue: 0,
          duration: duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const renderCenterDot = () => {

    const scale = dotAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.85, 1],
    });

    return (
      <Animated.View style={[
        styles.centerDot,
        {transform: [{ scale: scale }]},
      ]}>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <BlurView style={StyleSheet.absoluteFill} intensity={80} tint="light" />
        <Pressable style={styles.button} onPress={onPressedCallback}>
          <View style={styles.visualizerRing}>
            {renderBars()}
          </View>
          {renderCenterDot()}
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
    width: SCREEN_WIDTH * 0.55,
    height: SCREEN_WIDTH * 0.55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: SCREEN_WIDTH * 0.55,
    height: SCREEN_WIDTH * 0.55,
    borderRadius: SCREEN_WIDTH * 0.275,
    overflow: 'hidden',
  },
  centerDot: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    borderRadius: SCREEN_WIDTH * 0.06,
    borderWidth: SCREEN_WIDTH * 0.018,
    borderColor: '#E87A7D',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  bar: {
    position: 'absolute',
    backgroundColor: '#E87A7D',
  },
});