import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import type { SocialProviderConfig } from './socialProviders';

type Props = {
  config: SocialProviderConfig;
  onPress: () => void;
};

export function SocialProviderButton({ config, onPress }: Props) {
  const isOutline = config.id === 'phone';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: config.bg,
          borderWidth: config.borderColor || isOutline ? 1 : 0,
          borderColor: config.borderColor ?? 'transparent',
        },
        pressed ? { opacity: 0.88 } : null,
      ]}>
      <View style={styles.glyphShell}>
        {config.id === 'apple' ? (
          <Text style={styles.appleGlyph}></Text>
        ) : (
          <Text
            style={[
              styles.glyph,
              {
                color:
                  config.id === 'google'
                    ? '#4285F4'
                    : config.text,
              },
            ]}>
            {config.glyph}
          </Text>
        )}
      </View>
      <Text
        style={[
          styles.label,
          { color: config.text },
          config.id === 'google' && styles.googleLabel,
        ]}
        numberOfLines={1}>
        {config.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    minHeight: 52,
    marginBottom: 10,
  },
  glyphShell: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  glyph: {
    fontSize: 16,
    fontWeight: '800',
  },
  appleGlyph: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  googleLabel: {
    fontWeight: '600',
  },
});
