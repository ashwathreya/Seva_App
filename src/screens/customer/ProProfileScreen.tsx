import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/homeStackTypes';
import { theme } from '../../theme/theme';
import { Button, Card } from '../../components/ui';
import { useAppStore } from '../../store/useAppStore';
import type { SevaUser } from '../../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProProfile'>;

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  const a = p[0]?.[0] ?? '?';
  const b = p[1]?.[0] ?? '';
  return (a + b).toUpperCase();
}

export default function ProProfileScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { userId } = route.params;
  const users = useAppStore((s) => s.users);

  const pro = useMemo(
    () => users.find((u) => u.id === userId && u.role === 'pro'),
    [users, userId],
  );

  if (!pro) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 12 }]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <Text style={styles.missTitle}>Pro not found</Text>
        <Text style={styles.missSub}>This profile may have been removed.</Text>
      </View>
    );
  }

  return (
    <ProProfileBody
      pro={pro}
      topInset={insets.top}
      bottomInset={insets.bottom}
      onBack={() => navigation.goBack()}
    />
  );
}

function ProProfileBody({
  pro,
  topInset,
  bottomInset,
  onBack,
}: {
  pro: SevaUser;
  topInset: number;
  bottomInset: number;
  onBack: () => void;
}) {
  const p = pro.proProfile;
  const pending = pro.accountStatus === 'pending_review';

  return (
    <View style={[styles.root, { paddingTop: topInset }]}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack} hitSlop={12}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomInset + 100 }}>
        <View style={styles.hero}>
          <View style={styles.heroPhoto}>
            {pro.photoUrl ? (
              <Image source={{ uri: pro.photoUrl }} style={styles.heroImg} />
            ) : (
              <Text style={styles.heroInitials}>{initials(pro.displayName)}</Text>
            )}
          </View>
          <View style={styles.heroBody}>
            <Text style={styles.name}>{pro.displayName}</Text>
            {p?.tagline ? (
              <Text style={styles.tagline}>{p.tagline}</Text>
            ) : null}
            <Text style={styles.loc}>{pro.locationLabel ?? 'Your area'}</Text>
            {pending ? (
              <View style={styles.pendingPill}>
                <Text style={styles.pendingText}>Verification in progress</Text>
              </View>
            ) : null}
          </View>
        </View>

        {p ? (
          <>
            <View style={styles.statRow}>
              <View style={styles.stat}>
                <Text style={styles.statVal}>{p.rating.toFixed(1)}</Text>
                <Text style={styles.statLab}>Rating</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statVal}>{p.reviewsCount}</Text>
                <Text style={styles.statLab}>Reviews</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statVal}>{p.jobsCompleted}</Text>
                <Text style={styles.statLab}>Jobs done</Text>
              </View>
            </View>

            <Card>
              <Text style={styles.cardHead}>About</Text>
              <Text style={styles.bio}>{p.bio}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaLab}>Typical rates</Text>
                <Text style={styles.metaVal}>{p.rateHint}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLab}>Response</Text>
                <Text style={styles.metaVal}>{p.responseTimeLabel}</Text>
              </View>
              {p.languages?.length ? (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLab}>Languages</Text>
                  <Text style={styles.metaVal}>{p.languages.join(' · ')}</Text>
                </View>
              ) : null}
            </Card>

            <Text style={styles.sectionTitle}>Specialties</Text>
            <View style={styles.chips}>
              {p.specialties.map((s) => (
                <View key={s} style={styles.chip}>
                  <Text style={styles.chipText}>{s}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Past jobs</Text>
            <Text style={styles.sectionSub}>
              Photos customers agreed to share from completed work.
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.portfolioRow}>
              {p.portfolioImageUris.map((uri, i) => (
                <Image
                  key={`${uri}-${i}`}
                  source={{ uri }}
                  style={styles.portfolioImg}
                />
              ))}
            </ScrollView>
          </>
        ) : (
          <Card>
            <Text style={styles.bio}>
              This professional hasn’t published a full profile yet.
            </Text>
          </Card>
        )}

        <View style={{ marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.lg }}>
          <Button
            title={pending ? 'Notify me when available' : `Request ${pro.displayName.split(' ')[0]}`}
            onPress={() => {}}
            variant={pending ? 'secondary' : 'primary'}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.surface },
  topBar: { paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.sm },
  back: { ...theme.typography.bodyStrong, color: theme.colors.brandTeal },
  missTitle: {
    ...theme.typography.title,
    color: theme.colors.ink,
    marginTop: 24,
    textAlign: 'center',
  },
  missSub: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    textAlign: 'center',
    marginTop: 8,
  },
  hero: {
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceSubtle,
    marginBottom: theme.spacing.md,
  },
  heroPhoto: {
    height: 140,
    backgroundColor: theme.colors.brandTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImg: { width: '100%', height: '100%' },
  heroInitials: {
    fontSize: 44,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.35)',
  },
  heroBody: { padding: theme.spacing.md },
  name: { fontSize: 20, fontWeight: '800', color: theme.colors.ink },
  tagline: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    marginTop: 4,
    lineHeight: 20,
  },
  loc: {
    ...theme.typography.small,
    color: theme.colors.brandGold,
    marginTop: 8,
    fontWeight: '700',
  },
  pendingPill: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.full,
    backgroundColor: 'rgba(240,165,0,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(240,165,0,0.35)',
  },
  pendingText: { fontSize: 11, fontWeight: '700', color: theme.colors.brandGold },
  statRow: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  stat: {
    flex: 1,
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statVal: { fontSize: 18, fontWeight: '800', color: theme.colors.ink },
  statLab: { fontSize: 11, color: theme.colors.muted, marginTop: 2 },
  cardHead: { fontSize: 13, fontWeight: '800', color: theme.colors.ink, marginBottom: 8 },
  bio: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    lineHeight: 21,
    marginBottom: theme.spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 8,
    gap: 12,
  },
  metaLab: { fontSize: 12, color: theme.colors.muted, fontWeight: '600' },
  metaVal: { flex: 1, fontSize: 12, color: theme.colors.ink, fontWeight: '700', textAlign: 'right' },
  sectionTitle: {
    ...theme.typography.heading,
    color: theme.colors.ink,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  sectionSub: {
    ...theme.typography.small,
    color: theme.colors.muted,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    lineHeight: 17,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceSubtle,
  },
  chipText: { fontSize: 12, fontWeight: '700', color: theme.colors.ink },
  portfolioRow: {
    paddingHorizontal: theme.spacing.lg,
    gap: 10,
    paddingBottom: 4,
  },
  portfolioImg: {
    width: 168,
    height: 120,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceSubtle,
  },
});
