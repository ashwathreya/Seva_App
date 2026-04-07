import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';

/**
 * After splash video: logo + Get Started / Sign in.
 */
export default function WelcomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const logoSize = Math.min(200, Math.max(120, width * 0.42));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/seva_logo_new.png')}
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        resizeMode="contain"
      />
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.btnPrimary, pressed && { opacity: 0.92 }]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.btnPrimaryText}>Get Started</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.btnGhost, pressed && { opacity: 0.88 }]}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.btnGhostText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const GOLD = '#F0A500';
const TEAL = '#0F3D3E';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TEAL,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 8,
  },
  actions: {
    marginTop: 14,
    width: '100%',
    maxWidth: 310,
    gap: 10,
  },
  btnPrimary: {
    backgroundColor: GOLD,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnPrimaryText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#09090E',
  },
  btnGhost: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  btnGhostText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#E4E8EF',
  },
});
