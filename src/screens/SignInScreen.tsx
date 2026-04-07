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

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function SignInScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const setUser = useAppStore((s) => s.setUser);
  const users = useAppStore((s) => s.users);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSocial = (id: SocialProviderId) => {
    if (id === 'phone') {
      navigation.navigate('PhoneAuth', { mode: 'signin' });
      return;
    }
    const row = providersForPlatform().find((p) => p.id === id);
    showSocialSignInStub(row?.label ?? id);
  };

  const forgot = () => {
    Alert.alert(
      'Reset password',
      'Add a “forgot password” API call here (email link or OTP).',
      [{ text: 'OK' }],
    );
  };

  const submitEmail = () => {
    if (!validEmail(email)) {
      Alert.alert('Email', 'Enter a valid email address.');
      return;
    }
    if (password.length < 1) {
      Alert.alert('Password', 'Enter your password.');
      return;
    }
    if (!users.length) {
      Alert.alert('Sign in', 'No demo users in store.');
      return;
    }

    const demoCustomer =
      users.find(
        (u) => u.role === 'customer' && u.accountStatus === 'active',
      ) ?? users[0];
    const signedIn: SevaUser = {
      ...demoCustomer,
      displayName: demoCustomer.displayName || email.trim().split('@')[0],
    };
    setUser(signedIn);
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
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.sub}>
          Sign in with Google, Apple, Facebook, Microsoft, X, or phone — or use
          email.
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
          placeholder="Your password"
          secureTextEntry
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
        />

        <Pressable onPress={forgot} style={styles.forgotWrap}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </Pressable>

        <Button title="Sign in" onPress={submitEmail} />

        <Pressable
          onPress={() => navigation.navigate('SignUp')}
          style={styles.footerPress}>
          <Text style={styles.footer}>
            New to SEVA?{' '}
            <Text style={styles.footerStrong}>Create an account</Text>
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
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  forgot: {
    ...theme.typography.caption,
    color: theme.colors.brandGold,
    fontWeight: '700',
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
