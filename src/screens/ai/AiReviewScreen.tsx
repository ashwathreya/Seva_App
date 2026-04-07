import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import type { AiBookingStackParamList } from '../../navigation/aiBookingTypes';
import type { EffortLevel } from '../../types';
import { theme } from '../../theme/theme';
import { Button, Input } from '../../components/ui';
import { SERVICE_CATEGORIES } from '../../constants/serviceCategories';
import { estimateForCategoryAndEffort } from '../../data/serviceMarketRates';
import { createBookingDraft, patchBookingStatus } from '../../services/bookingService';
import { useAppStore } from '../../store/useAppStore';

type Props = NativeStackScreenProps<AiBookingStackParamList, 'AiReview'>;

const EFFORTS: EffortLevel[] = ['Light', 'Medium', 'Heavy'];

export default function AiReviewScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { imageUris, analysis } = route.params;
  const user = useAppStore((s) => s.user);
  const upsertBooking = useAppStore((s) => s.upsertBooking);

  const [categoryId, setCategoryId] = useState(analysis.categoryId);
  const [categoryLabel, setCategoryLabel] = useState(analysis.categoryLabel);
  const [description, setDescription] = useState(analysis.description);
  const [effort, setEffort] = useState<EffortLevel>(analysis.effort);
  const [busy, setBusy] = useState(false);

  const pricing = useMemo(
    () => estimateForCategoryAndEffort(categoryId, effort),
    [categoryId, effort],
  );

  const midCents = useMemo(
    () => Math.round((pricing.minCents + pricing.maxCents) / 2),
    [pricing.minCents, pricing.maxCents],
  );

  const selectCategory = (id: string, label: string) => {
    setCategoryId(id);
    setCategoryLabel(label);
  };

  const submit = async () => {
    if (!description.trim()) {
      Alert.alert('Description', 'Add a short description of the task.');
      return;
    }
    setBusy(true);
    try {
      const customerId = user?.id ?? 'guest_demo';
      const booking = await createBookingDraft({
        customerId,
        serviceCategoryId: categoryId,
        title: `${categoryLabel} request`,
        description: `[${effort}] ${description.trim()}`,
        imageUris,
        estimateCents: midCents,
      });
      const submitted = await patchBookingStatus(booking.id, 'requested');
      if (submitted) upsertBooking(submitted);
      const parent = navigation.getParent();
      parent?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.head}>Here’s what we understood</Text>
        <Text style={styles.lead}>
          Edit anything — then confirm to send your request to vetted pros.
        </Text>

        {imageUris.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoRow}>
            {imageUris.map((uri) => (
              <Image key={uri} source={{ uri }} style={styles.photo} />
            ))}
          </ScrollView>
        ) : null}

        <Text style={styles.label}>Service category</Text>
        <View style={styles.chips}>
          {SERVICE_CATEGORIES.map((c) => {
            const on = c.id === categoryId;
            return (
              <Pressable
                key={c.id}
                onPress={() => selectCategory(c.id, c.label)}
                style={[styles.chip, on && styles.chipOn]}>
                <Text style={[styles.chipText, on && styles.chipTextOn]}>{c.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Input
          label="Task description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={styles.textArea}
        />

        <Text style={styles.label}>Effort level</Text>
        <View style={styles.effortRow}>
          {EFFORTS.map((e) => (
            <Pressable
              key={e}
              onPress={() => setEffort(e)}
              style={[styles.effortBtn, effort === e && styles.effortBtnOn]}>
              <Text style={[styles.effortText, effort === e && styles.effortTextOn]}>
                {e}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Suggested range</Text>
          <Text style={styles.priceValue}>{pricing.priceRangeLabel}</Text>
          <Text style={styles.priceHint}>
            Based on typical TaskRabbit-style labor bands for this category and
            effort. Final price is agreed with your pro before work starts.
          </Text>
        </View>

        <Button title="Confirm request" onPress={submit} disabled={busy} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.surface },
  topBar: { paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.sm },
  back: { ...theme.typography.bodyStrong, color: theme.colors.brandTeal },
  scroll: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl + 24,
  },
  head: {
    ...theme.typography.title,
    color: theme.colors.ink,
    marginBottom: theme.spacing.xs,
  },
  lead: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  photoRow: { marginBottom: theme.spacing.lg },
  photo: {
    width: 96,
    height: 96,
    borderRadius: theme.radius.md,
    marginRight: theme.spacing.sm,
  },
  label: {
    ...theme.typography.caption,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: theme.spacing.sm,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginBottom: theme.spacing.lg },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  chipOn: {
    borderColor: theme.colors.brandTeal,
    backgroundColor: 'rgba(15,61,62,0.08)',
  },
  chipText: { fontSize: 12, fontWeight: '600', color: theme.colors.ink },
  chipTextOn: { color: theme.colors.brandTeal },
  textArea: { minHeight: 100, paddingTop: 12 },
  effortRow: { flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.lg },
  effortBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  effortBtnOn: {
    borderColor: theme.colors.brandGold,
    backgroundColor: 'rgba(240,165,0,0.12)',
  },
  effortText: { fontWeight: '700', color: theme.colors.muted, fontSize: 13 },
  effortTextOn: { color: theme.colors.ink },
  priceCard: {
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  priceLabel: { fontSize: 12, fontWeight: '700', color: theme.colors.muted },
  priceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.brandTeal,
    marginTop: 4,
  },
  priceHint: { fontSize: 12, color: theme.colors.muted, marginTop: 8, lineHeight: 18 },
});
