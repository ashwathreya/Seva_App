import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AiBookingStackParamList } from '../../navigation/aiBookingTypes';
import { analyzeImage } from '../../services/aiService';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<AiBookingStackParamList, 'AiProcessing'>;

export default function AiProcessingScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { imageUris } = route.params;
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.4,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulse]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const analysis = await analyzeImage(imageUris);
        if (cancelled) return;
        navigation.replace('AiReview', { imageUris, analysis });
      } catch {
        if (cancelled) return;
        navigation.goBack();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [imageUris, navigation]);

  return (
    <View style={[styles.root, { paddingTop: insets.top + 24 }]}>
      <View style={styles.center}>
        <Animated.View style={[styles.ring, { opacity: pulse }]} />
        <Text style={styles.title}>Analyzing your task…</Text>
        <Text style={styles.sub}>
          Matching to the right service, effort, and a fair price range.
        </Text>
        <Animated.View style={[styles.dots, { opacity: pulse }]}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ring: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: theme.colors.brandGold,
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.ink,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  sub: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
  },
  dots: { flexDirection: 'row', gap: 8, marginTop: theme.spacing.xl },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.brandTeal,
  },
});
