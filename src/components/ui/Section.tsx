import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Section({ title, subtitle, children }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: theme.spacing.xl },
  title: {
    ...theme.typography.heading,
    color: theme.colors.ink,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  body: { gap: theme.spacing.sm },
});
