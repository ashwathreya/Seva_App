import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/homeStackTypes';
import type { RootStackParamList } from '../../navigation/types';
import { POPULAR_SERVICE_TILES } from '../../data/serviceMarketRates';
import { theme } from '../../theme/theme';
import { Button, Card, Section } from '../../components/ui';
import { useAppStore } from '../../store/useAppStore';
import type { SevaUser } from '../../types';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>>();

  const openAiBooking = () => {
    const root = navigation
      .getParent()
      ?.getParent() as NativeStackNavigationProp<RootStackParamList> | undefined;
    root?.navigate('AiBooking');
  };
  const user = useAppStore((s) => s.user) ?? useAppStore((s) => s.users[0]);
  const bookings = useAppStore((s) => s.bookings);
  const pros = useAppStore((s) => s.users.filter((u) => u.role === 'pro'));

  const activeBooking = useMemo(
    () =>
      bookings.find((b) =>
        ['requested', 'assigned', 'in_progress', 'completed'].includes(b.status),
      ),
    [bookings],
  );

  const recentBookings = useMemo(
    () => bookings.slice(0, 3),
    [bookings],
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.heroShell}>
        <View style={styles.header}>
          <Text style={styles.logo}>SEVA</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Trust-first</Text>
          </View>
        </View>
        <Text style={styles.heroTitle}>Book home help with confidence</Text>
        <Text style={styles.heroSub}>
          Vetted providers, clear pricing, and payout only after your approval.
        </Text>
        <Text style={styles.heroMeta}>
          Hi {user?.displayName?.split(' ')[0] ?? 'there'} | {user?.locationLabel ?? 'Your city'}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}>
        <Pressable
          style={({ pressed }) => [styles.scanCard, pressed && { opacity: 0.96 }]}
          onPress={openAiBooking}>
          <View style={styles.scanIcon}>
            <Text style={styles.scanIconText}>AI</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.scanTitle}>Scan your task</Text>
            <Text style={styles.scanSub}>
              Use camera to draft category, scope, and price range in seconds.
            </Text>
          </View>
          <Text style={styles.chew}>{'>'}</Text>
        </Pressable>

        <View style={styles.badgeRow}>
          <Tag text="Background-verified pros" />
          <Tag text="Escrow protected" />
          <Tag text="Fixed quote before start" />
        </View>

        <Section title="Your current booking">
          {activeBooking ? (
            <Card>
              <Text style={styles.cardTitle}>{activeBooking.title}</Text>
              <Text style={styles.cardSub}>{activeBooking.description}</Text>
              <View style={styles.inlineRow}>
                <Text style={styles.statusPill}>
                  {activeBooking.status.replace('_', ' ')}
                </Text>
                <Text style={styles.cardPrice}>
                  ${(activeBooking.estimateCents / 100).toFixed(2)}
                </Text>
              </View>
            </Card>
          ) : (
            <Card>
              <Text style={styles.cardSub}>No active booking. Start with AI scan.</Text>
            </Card>
          )}
        </Section>

        <Section title="Popular services near you">
          <Text style={styles.rateNote}>
            Starting prices reflect typical NJ/NYC-adjacent labor (TaskRabbit-style
            bands); final quotes depend on scope.
          </Text>
          <View style={styles.grid}>
            {POPULAR_SERVICE_TILES.map((s) => (
              <MiniService key={s.title} title={s.title} subtitle={s.fromLabel} />
            ))}
          </View>
        </Section>

        <Section title="Recommended pros">
          {pros.map((pro) => (
            <Pressable
              key={pro.id}
              onPress={() => navigation.navigate('ProProfile', { userId: pro.id })}
              style={({ pressed }) => [pressed && { opacity: 0.92 }]}>
              <Card>
                <ProSummaryRow pro={pro} />
              </Card>
            </Pressable>
          ))}
        </Section>

        <View style={styles.quickRow}>
          <View style={styles.quickCard}>
            <Text style={styles.quickTitle}>Vetted pros</Text>
            <Text style={styles.quickSub}>Background and quality checks</Text>
          </View>
          <View style={styles.quickCard}>
            <Text style={styles.quickTitle}>Escrow flow</Text>
            <Text style={styles.quickSub}>Approve completion before payout</Text>
          </View>
        </View>

        <View style={{ marginTop: theme.spacing.lg }}>
          <Button
            variant="secondary"
            title="Browse services"
            onPress={() => {}}
          />
        </View>

        <Section title="Recent activity">
          {recentBookings.map((b) => (
            <Card key={b.id}>
              <Text style={styles.cardTitle}>{b.title}</Text>
              <Text style={styles.cardSub}>
                {b.status.replace('_', ' ')} | ${(b.estimateCents / 100).toFixed(2)}
              </Text>
            </Card>
          ))}
        </Section>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.bottomNote}>
          Trust-first marketplace | upfront pricing | approval before payout
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.surface },
  heroShell: {
    backgroundColor: theme.colors.brandTeal,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  logo: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2.2,
    color: '#F7FAFC',
  },
  badge: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F7FAFC',
    letterSpacing: 0.3,
  },
  content: { flex: 1, paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xl },
  heroTitle: { ...theme.typography.title, color: '#FFFFFF', marginBottom: theme.spacing.sm },
  heroSub: {
    ...theme.typography.caption,
    color: 'rgba(255,255,255,0.84)',
    lineHeight: 20,
  },
  heroMeta: {
    ...theme.typography.small,
    color: 'rgba(255,255,255,0.72)',
    marginTop: 10,
  },
  scanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E3442',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  scanIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIconText: { color: theme.colors.brandGold, fontSize: 14, fontWeight: '800' },
  scanTitle: { fontSize: 17, fontWeight: '800', color: '#fff' },
  scanSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4, lineHeight: 18 },
  chew: { fontSize: 28, color: 'rgba(255,255,255,0.5)', fontWeight: '300' },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  tag: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: theme.colors.ink,
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: { color: theme.colors.ink, fontSize: 15, fontWeight: '800' },
  cardSub: { color: theme.colors.muted, fontSize: 12, marginTop: 4, lineHeight: 18 },
  cardPrice: { color: theme.colors.brandGold, fontSize: 12, fontWeight: '800' },
  inlineRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusPill: {
    color: theme.colors.ink,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'rgba(255,255,255,0.06)',
    textTransform: 'capitalize',
  },
  rateNote: {
    ...theme.typography.small,
    color: theme.colors.muted,
    marginBottom: theme.spacing.md,
    lineHeight: 17,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm },
  miniService: {
    width: '48%',
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  miniTitle: { color: theme.colors.ink, fontSize: 13, fontWeight: '800' },
  miniSub: { color: theme.colors.muted, fontSize: 12, marginTop: 4 },
  proRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(240,165,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: theme.colors.brandGold, fontSize: 12, fontWeight: '800' },
  quickRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  quickCard: {
    flex: 1,
    backgroundColor: theme.colors.surfaceSubtle,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
  },
  quickTitle: { fontSize: 13, fontWeight: '800', color: theme.colors.ink, marginBottom: 4 },
  quickSub: { fontSize: 12, color: theme.colors.muted, lineHeight: 17 },
  bottom: { paddingHorizontal: theme.spacing.lg },
  bottomNote: {
    textAlign: 'center',
    fontSize: 11,
    color: theme.colors.muted,
    lineHeight: 16,
  },
});

function Tag({ text }: { text: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
}

function MiniService({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.miniService}>
      <Text style={styles.miniTitle}>{title}</Text>
      <Text style={styles.miniSub}>{subtitle}</Text>
    </View>
  );
}

function proInitials(name: string) {
  const p = name.trim().split(/\s+/);
  return `${p[0]?.[0] ?? ''}${p[1]?.[0] ?? ''}`.toUpperCase() || '?';
}

function ProSummaryRow({ pro }: { pro: SevaUser }) {
  const p = pro.proProfile;
  const badge =
    pro.accountStatus === 'pending_review'
      ? 'Pending verify'
      : p && p.rating >= 4.85
        ? 'Top pick'
        : 'Available';
  const stats = p
    ? `${p.rating.toFixed(1)} stars · ${p.jobsCompleted} jobs · ${pro.locationLabel ?? ''}`
    : (pro.locationLabel ?? 'Your area');
  return (
    <View style={styles.proRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{proInitials(pro.displayName)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{pro.displayName}</Text>
        <Text style={styles.cardSub} numberOfLines={3}>
          {p?.tagline ? `${p.tagline}\n` : ''}
          {stats}
        </Text>
      </View>
      <Text style={styles.cardPrice}>{badge}</Text>
    </View>
  );
}
