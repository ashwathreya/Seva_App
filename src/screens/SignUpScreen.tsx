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
import type { SevaUser } from '../types';
import { theme } from '../theme/theme';
import { Input, Button } from '../components/ui';
import { SocialProviderButton } from '../components/auth/SocialProviderButton';
import {
  providersForPlatform,
  type SocialProviderId,
} from '../components/auth/socialProviders';
import { showSocialSignInStub } from '../auth/socialSignInStub';
import { useAppStore } from '../store/useAppStore';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function SignUpScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const setUser = useAppStore((s) => s.setUser);
  const users = useAppStore((s) => s.users);
  const setUsers = useAppStore((s) => s.setUsers);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onSocial = (id: SocialProviderId) => {
    if (id === 'phone') {
      navigation.navigate('PhoneAuth', { mode: 'signup' });
      return;
    }
    const row = providersForPlatform().find((p) => p.id === id);
    showSocialSignInStub(row?.label ?? id);
  };

  const submitEmail = () => {
    if (!name.trim()) {
      Alert.alert('Name', 'Enter your name.');
      return;
    }
    if (!validEmail(email)) {
      Alert.alert('Email', 'Enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Password', 'Use at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Password', 'Passwords do not match.');
      return;
    }

    const newUser: SevaUser = {
      id: `u_${Date.now()}`,
      phone: '+10000000000',
      role: 'customer',
      displayName: name.trim(),
      locationLabel: undefined,
      createdAt: new Date().toISOString(),
      accountStatus: 'active',
      vettingStatus: 'n/a',
    };
    setUsers([newUser, ...users]);
    setUser(newUser);
    navigation.replace('Home');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 4 }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [styles.back, pressed && { opacity: 0.75 }]}>
        <Text style={styles.backText}>‹ Back</Text>
      </Pressable>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 28 },
        ]}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.sub}>
          Sign up with a major provider or use your email.
        </Text>

        {providersForPlatform().map((p) => (
          <SocialProviderButton
            key={p.id}
            config={p}
            onPress={() => onSocial(p.id)}
          />
        ))}

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Input
          label="Full name"
          placeholder="Alex Rivera"
          autoComplete="name"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeholder="At least 8 characters"
          secureTextEntry
          autoComplete="password-new"
          value={password}
          onChangeText={setPassword}
        />
        <Input
          label="Confirm password"
          placeholder="Repeat password"
          secureTextEntry
          autoComplete="password-new"
          value={confirm}
          onChangeText={setConfirm}
        />

        <Button title="Create account" onPress={submitEmail} />

        <Text style={styles.legal}>
          By continuing you agree to our Terms of Service and Privacy Policy.
        </Text>

        <Pressable
          onPress={() => navigation.navigate('SignIn')}
          style={styles.footerPress}>
          <Text style={styles.footer}>
            Already have an account?{' '}
            <Text style={styles.footerStrong}>Sign in</Text>
          </Text>
        </Pressable>
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
    fontSize: 17,
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    ...theme.typography.small,
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  legal: {
    ...theme.typography.small,
    color: theme.colors.muted,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    lineHeight: 18,
  },
  footerPress: {
    marginTop: theme.spacing.lg,
    alignSelf: 'center',
    padding: theme.spacing.sm,
  },
  footer: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    textAlign: 'center',
  },
  footerStrong: {
    color: theme.colors.brandGold,
    fontWeight: '800',
  },
});
