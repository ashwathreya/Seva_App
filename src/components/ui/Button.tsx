import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { theme } from '../../theme/theme';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primaryBtn,
        variant === 'secondary' && styles.secondaryBtn,
        variant === 'ghost' && styles.ghostBtn,
        pressed && !disabled ? { opacity: 0.92 } : null,
        disabled ? { opacity: 0.45 } : null,
        style,
      ]}>
      <Text
        style={[
          styles.label,
          variant === 'primary' && styles.primaryText,
          variant === 'secondary' && styles.secondaryText,
          variant === 'ghost' && styles.ghostText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.md,
    minHeight: 50,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: theme.colors.brandGold,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  ghostBtn: {
    backgroundColor: theme.colors.ghostBg,
    borderWidth: 1,
    borderColor: theme.colors.ghostBorder,
  },
  label: { fontSize: 15, fontWeight: '800', letterSpacing: 0.2 },
  primaryText: { color: '#09090E' },
  secondaryText: { color: '#EAF3F3', fontWeight: '700' },
  ghostText: { color: '#E4E8EF' },
});
