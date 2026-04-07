import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Section } from '../../components/ui';
import { theme } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';
import type { BookingStatus } from '../../types';

export default function AdminWorkspaceScreen() {
  const insets = useSafeAreaInsets();
  const users = useAppStore((s) => s.users);
  const bookings = useAppStore((s) => s.bookings);
  const jobs = useAppStore((s) => s.jobs);
  const disputes = useAppStore((s) => s.disputes);
  const approveProvider = useAppStore((s) => s.approveProvider);
  const rejectProvider = useAppStore((s) => s.rejectProvider);
  const suspendUser = useAppStore((s) => s.suspendUser);
  const activateUser = useAppStore((s) => s.activateUser);
  const assignBookingProvider = useAppStore((s) => s.assignBookingProvider);
  const approveBookingCompletion = useAppStore((s) => s.approveBookingCompletion);
  const cancelBooking = useAppStore((s) => s.cancelBooking);
  const setDisputeNotes = useAppStore((s) => s.setDisputeNotes);
  const resolveDisputeRefund = useAppStore((s) => s.resolveDisputeRefund);
  const resolveDisputePartial = useAppStore((s) => s.resolveDisputePartial);

  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>(
    'all',
  );
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | '7d'>('all');
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const activeJobs = jobs.filter(
    (j) => j.status === 'assigned' || j.status === 'in_progress',
  ).length;
  const completed = bookings.filter(
    (b) => b.status === 'completed' || b.status === 'approved',
  ).length;
  const open = bookings.filter((b) =>
    ['requested', 'assigned', 'in_progress'].includes(b.status),
  ).length;
  const revenue = bookings
    .filter((b) => b.status === 'approved')
    .reduce((sum, b) => sum + b.estimateCents, 0);
  const pendingProviders = users.filter(
    (u) => u.role === 'pro' && u.vettingStatus === 'pending',
  );
  const approvedProviders = users.filter(
    (u) =>
      u.role === 'pro' &&
      u.vettingStatus === 'approved' &&
      u.accountStatus === 'active',
  );
  const flaggedBookings = bookings.filter((b) =>
    disputes.some((d) => d.bookingId === b.id && d.status === 'open'),
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (dateFilter === 'all') return true;
      const t = new Date(b.createdAt).getTime();
      const now = Date.now();
      if (dateFilter === 'today') {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        return t >= start.getTime();
      }
      return t >= now - 7 * 24 * 60 * 60 * 1000;
    });
  }, [bookings, dateFilter, statusFilter]);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 24 }}>
      <View style={styles.wrap}>
        <Text style={styles.title}>Admin workspace</Text>
        <Text style={styles.sub}>Internal operations panel inside the app.</Text>

        <Section title="Core metrics">
          <View style={styles.grid}>
            <MetricCard label="Total bookings" value={String(bookings.length)} />
            <MetricCard label="Open bookings" value={String(open)} />
            <MetricCard label="Active jobs" value={String(activeJobs)} />
            <MetricCard label="Completed" value={String(completed)} />
            <MetricCard label="Revenue" value={`$${(revenue / 100).toFixed(2)}`} />
          </View>
        </Section>

        <Section title="User management">
          {users.map((u) => (
            <Card key={u.id}>
              <Text style={styles.jobTitle}>
                {u.displayName} · {u.role}
              </Text>
              <Text style={styles.muted}>
                {u.phone} · status: {u.accountStatus ?? 'active'} · vetting:{' '}
                {u.vettingStatus ?? 'n/a'}
              </Text>
              <View style={styles.row}>
                {u.role === 'pro' && u.vettingStatus === 'pending' ? (
                  <>
                    <ActionButton
                      label="Approve"
                      tone="ok"
                      onPress={() => approveProvider(u.id)}
                    />
                    <ActionButton
                      label="Reject"
                      tone="danger"
                      onPress={() => rejectProvider(u.id)}
                    />
                  </>
                ) : null}
                {(u.accountStatus ?? 'active') === 'active' ? (
                  <ActionButton
                    label="Suspend"
                    tone="muted"
                    onPress={() => suspendUser(u.id)}
                  />
                ) : (
                  <ActionButton
                    label="Activate"
                    tone="ok"
                    onPress={() => activateUser(u.id)}
                  />
                )}
              </View>
            </Card>
          ))}
        </Section>

        <Section title="Provider vetting panel">
          {pendingProviders.length === 0 ? (
            <Card>
              <Text style={styles.muted}>No pending providers.</Text>
            </Card>
          ) : (
            pendingProviders.map((p) => (
              <Card key={p.id}>
                <Text style={styles.jobTitle}>{p.displayName}</Text>
                <Text style={styles.muted}>{p.locationLabel ?? 'Unknown location'}</Text>
                <Text style={styles.muted}>
                  Docs: {(p.mockDocuments ?? []).join(', ') || 'No docs'}
                </Text>
                <View style={styles.row}>
                  <ActionButton
                    label="Approve provider"
                    tone="ok"
                    onPress={() => approveProvider(p.id)}
                  />
                  <ActionButton
                    label="Reject"
                    tone="danger"
                    onPress={() => rejectProvider(p.id)}
                  />
                </View>
              </Card>
            ))
          )}
        </Section>

        <Section title="Bookings management">
          <View style={styles.row}>
            <FilterChip
              label="All"
              active={statusFilter === 'all'}
              onPress={() => setStatusFilter('all')}
            />
            {(['requested', 'assigned', 'in_progress', 'completed', 'cancelled'] as const).map(
              (s) => (
                <FilterChip
                  key={s}
                  label={s}
                  active={statusFilter === s}
                  onPress={() => setStatusFilter(s)}
                />
              ),
            )}
          </View>
          <View style={styles.row}>
            {(['all', 'today', '7d'] as const).map((d) => (
              <FilterChip
                key={d}
                label={d}
                active={dateFilter === d}
                onPress={() => setDateFilter(d)}
              />
            ))}
          </View>
          {filteredBookings.map((b) => (
            <Card key={b.id}>
              <Text style={styles.jobTitle}>{b.title}</Text>
              <Text style={styles.muted}>
                #{b.id} · status: {b.status} · estimate: $
                {(b.estimateCents / 100).toFixed(2)}
              </Text>
              <Text style={styles.muted}>{b.description}</Text>
              <View style={styles.row}>
                {approvedProviders.map((p) => (
                  <ActionButton
                    key={`${b.id}-${p.id}`}
                    label={`Assign ${p.displayName.split(' ')[0]}`}
                    tone="muted"
                    onPress={() => assignBookingProvider(b.id, p.id)}
                  />
                ))}
                {b.status !== 'cancelled' ? (
                  <ActionButton
                    label="Cancel booking"
                    tone="danger"
                    onPress={() => cancelBooking(b.id)}
                  />
                ) : null}
                {b.status === 'completed' ? (
                  <ActionButton
                    label="Approve completion"
                    tone="ok"
                    onPress={() => approveBookingCompletion(b.id)}
                  />
                ) : null}
              </View>
            </Card>
          ))}
        </Section>

        <Section title="Dispute management">
          {disputes.map((d) => (
            <Card key={d.id}>
              <Text style={styles.jobTitle}>
                {d.id} · booking {d.bookingId}
              </Text>
              <Text style={styles.muted}>
                Reason: {d.reason} · status: {d.status}
              </Text>
              <TextInput
                value={notesDraft[d.id] ?? d.notes}
                onChangeText={(txt) =>
                  setNotesDraft((s) => ({ ...s, [d.id]: txt }))
                }
                placeholder="Add internal note..."
                placeholderTextColor={theme.colors.muted}
                style={styles.noteInput}
              />
              <View style={styles.row}>
                <ActionButton
                  label="Save notes"
                  tone="muted"
                  onPress={() =>
                    setDisputeNotes(d.id, notesDraft[d.id] ?? d.notes)
                  }
                />
                <ActionButton
                  label="Resolve: refund"
                  tone="danger"
                  onPress={() => resolveDisputeRefund(d.id)}
                />
                <ActionButton
                  label="Resolve: partial payout"
                  tone="ok"
                  onPress={() => resolveDisputePartial(d.id)}
                />
              </View>
            </Card>
          ))}
        </Section>

        <Section title="Flagged bookings">
          {flaggedBookings.length === 0 ? (
            <Card>
              <Text style={styles.muted}>No flagged bookings.</Text>
            </Card>
          ) : (
            flaggedBookings.map((b) => (
              <Card key={`flag-${b.id}`}>
                <Text style={styles.jobTitle}>{b.title}</Text>
                <Text style={styles.muted}>
                  #{b.id} · customer {b.customerId} · pro {b.proId ?? 'unassigned'}
                </Text>
              </Card>
            ))
          )}
        </Section>
      </View>
    </ScrollView>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active ? styles.chipActive : null,
      ]}>
      <Text style={[styles.chipText, active ? styles.chipTextActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ActionButton({
  label,
  tone,
  onPress,
}: {
  label: string;
  tone: 'ok' | 'danger' | 'muted';
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btn,
        tone === 'ok' && styles.btnOk,
        tone === 'danger' && styles.btnDanger,
      ]}>
      <Text
        style={[
          styles.btnText,
          tone === 'ok' && styles.btnTextOk,
          tone === 'danger' && styles.btnTextDanger,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card style={{ flex: 1, minWidth: '47%' }}>
      <Text style={{ fontSize: 12, color: theme.colors.muted, marginBottom: 6 }}>{label}</Text>
      <Text style={{ fontSize: 22, fontWeight: '800', color: theme.colors.brandTeal }}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.surface },
  wrap: { paddingHorizontal: theme.spacing.lg },
  title: { ...theme.typography.title, color: theme.colors.ink },
  sub: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    marginTop: 6,
    marginBottom: theme.spacing.lg,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginTop: 10 },
  chip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: theme.colors.surface,
  },
  chipActive: {
    borderColor: theme.colors.brandTeal,
    backgroundColor: 'rgba(15,61,62,0.08)',
  },
  chipText: { fontSize: 12, color: theme.colors.muted, fontWeight: '600' },
  chipTextActive: { color: theme.colors.brandTeal },
  btn: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: theme.colors.surface,
  },
  btnOk: { borderColor: theme.colors.success, backgroundColor: 'rgba(13,110,78,0.08)' },
  btnDanger: { borderColor: theme.colors.danger, backgroundColor: 'rgba(180,35,24,0.08)' },
  btnText: { fontSize: 12, fontWeight: '700', color: theme.colors.ink },
  btnTextOk: { color: theme.colors.success },
  btnTextDanger: { color: theme.colors.danger },
  muted: { ...theme.typography.caption, color: theme.colors.muted, lineHeight: 18 },
  jobTitle: { ...theme.typography.bodyStrong, color: theme.colors.ink, marginBottom: 4 },
  noteInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: theme.colors.ink,
    backgroundColor: theme.colors.surfaceSubtle,
    marginTop: 10,
  },
});
