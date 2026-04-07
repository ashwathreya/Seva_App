import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Pressable,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  launchCamera,
  type Asset,
} from 'react-native-image-picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AiBookingStackParamList } from '../../navigation/aiBookingTypes';
import { theme } from '../../theme/theme';
import { Button } from '../../components/ui';

type Props = NativeStackScreenProps<AiBookingStackParamList, 'AiCamera'>;

export default function AiCameraScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [assets, setAssets] = useState<Asset[]>([]);

  const openCamera = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera access',
          message: 'SEVA needs camera access so you can scan your task.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Camera permission needed',
          'Please allow camera access to take task photos.',
        );
        return;
      }
    }

    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8 as const,
        saveToPhotos: false,
        cameraType: 'back',
      },
      (res) => {
        if (res.didCancel) return;
        if (res.errorCode) {
          Alert.alert('Camera', res.errorMessage ?? 'Could not open camera.');
          return;
        }
        const a = res.assets?.[0];
        if (a?.uri) {
          setAssets((prev) => [...prev, a]);
        }
      },
    );
  }, []);

  const removeAt = (idx: number) => {
    setAssets((prev) => prev.filter((_, i) => i !== idx));
  };

  const continueWithPhotos = () => {
    const uris = assets.map((a) => a.uri!).filter(Boolean);
    if (uris.length === 0) return;
    navigation.navigate('AiProcessing', { imageUris: uris });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>← Close</Text>
        </Pressable>
        <Text style={styles.title}>Scan your task</Text>
        <Text style={styles.sub}>
          Snap what you need done. We’ll draft a request — you stay in control.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        {assets.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📷</Text>
            <Text style={styles.emptyTitle}>Show us the space or problem</Text>
            <Text style={styles.emptySub}>
              One or two photos help us suggest the right category and scope.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {assets.map((a, idx) => (
              <View key={`${a.uri}-${idx}`} style={styles.thumbWrap}>
                <Image source={{ uri: a.uri! }} style={styles.thumb} />
                <Pressable
                  style={styles.retakeBadge}
                  onPress={() => removeAt(idx)}>
                  <Text style={styles.retakeText}>Remove</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}

        <Button title="Open camera" onPress={openCamera} variant="primary" />
        {assets.length > 0 ? (
          <View style={{ marginTop: theme.spacing.md }}>
            <Button
              variant="secondary"
              title="Add another photo"
              onPress={openCamera}
            />
          </View>
        ) : null}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title="Analyze with AI"
          onPress={continueWithPhotos}
          disabled={assets.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.surface },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  back: { ...theme.typography.bodyStrong, color: theme.colors.brandTeal, marginBottom: theme.spacing.sm },
  title: {
    ...theme.typography.title,
    color: theme.colors.ink,
    marginBottom: theme.spacing.sm,
  },
  sub: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    lineHeight: 20,
  },
  scroll: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  emptyCard: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  emptyEmoji: { fontSize: 40, marginBottom: theme.spacing.sm },
  emptyTitle: {
    ...theme.typography.heading,
    color: theme.colors.ink,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  emptySub: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginBottom: theme.spacing.lg },
  thumbWrap: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceSubtle,
  },
  thumb: { width: '100%', height: '100%' },
  retakeBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
  },
  retakeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
});
