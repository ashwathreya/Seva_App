import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import { Input, Button } from '../components/ui';

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneAuth'>;

export default function PhoneAuthScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const mode = route.params?.mode ?? 'signin';
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const title = mode === 'signup' ? 'Sign up with phone' : 'Sign in with phone';

  const sendCode = () => {
    if (phone.replace(/\D/g, '').length < 10) {
      Alert.alert('Phone number', 'Enter a valid mobile number.');
      return;
    }
    Alert.alert(
      'Verification',
      'SMS OTP would be sent here (Twilio, Firebase Phone Auth, etc.).',
      [{ text: 'OK' }],
    );
  };

  const verify = () => {
    if (code.trim().length < 4) {
      Alert.alert('Code', 'Enter the code from SMS.');
      return;
    }
    Alert.alert(
      'Signed in',
      'Phone auth completes here against your backend.',
      [
        {
          text: 'Continue',
          onPress: () => navigation.replace('Home'),
        },
      ],
    );
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [styles.back, pressed && { opacity: 0.75 }]}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 24 },
        ]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>
          We’ll text you a one-time code. Message and data rates may apply.
        </Text>
        <Input
          label="Mobile number"
          placeholder="+1 555 000 0000"
          keyboardType="phone-pad"
          autoComplete="tel"
          value={phone}
          onChangeText={setPhone}
        />
        <Button title="Send code" onPress={sendCode} variant="secondary" />
        <Input
          label="One-time code"
          placeholder="6-digit code"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />
        <Button title="Verify & continue" onPress={verify} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.brandTeal,
  },
  back: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  backText: {
    ...theme.typography.bodyStrong,
    color: theme.colors.ink,
  },
  scroll: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.ink,
    marginBottom: theme.spacing.sm,
  },
  sub: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
});
