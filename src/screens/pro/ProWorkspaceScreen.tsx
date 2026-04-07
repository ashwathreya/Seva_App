import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Section } from '../../components/ui';
import { theme } from '../../theme/theme';
import { useAppStore } from '../../store/useAppStore';

export default function ProWorkspaceScreen() {
  const insets = useSafeAreaInsets();
  const users = useAppStore((s) => s.users);
  const bookings = useAppStore((s) => s.bookings);
  const jobs = useAppStore((s) => s.jobs);
  const assignBookingProvider = useAppStore((s) => s.assignBookingProvider);
  const rejectAvailableBooking = useAppStore((s) => s.rejectAvailableBooking);
  const setJobInProgress = useAppStore((s) => s.setJobInProgress);
  const setJobCompleted = useAppStore((s) => s.setJobCompleted);

  const currentPro = useMemo(
    () =>
      users.find(
        (u) =>
          u.role === 'pro' &&
          u.vettingStatus === 'approved' &&
          u.accountStatus === 'active',
      ),
    [users],
  );
  const proId = currentPro?.id ?? 'u_p1';

  const availableBookings = bookings.filter(
    (b) => b.status === 'requested' && !b.proId,
  );
  const myJobs = jobs.filter((j) => j.proId === proId);

  const active = myJobs.filter(
    (j) => j.status === 'assigned' || j.status === 'in_progress',
  );
  const completed = myJobs.filter(
    (j) => j.status === 'completed' || j.status === 'approved',
  );

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 24 }}>
      <View style={styles.wrap}>
        <Text style={styles.title}>Pro workspace</Text>
        <Text style={styles.sub}>Single place for jobs and earnings.</Text>
        <Text style={styles.subtle}>
          Logged in as: {currentPro?.displayName ?? 'Provider'}
        </Text>

        <Section title="Available today">
          <Card>
            <Text style={styles.metric}>{active.length} active jobs</Text>
            <Text style={styles.muted}>Assigned / in-progress jobs for this provider.</Text>
          </Card>
          <Card>
            <Text style={styles.metric}>{completed.length} completed jobs</Text>
            <Text style={styles.muted}>Ready for quality checks and payout approval.</Text>
          </Card>
        </Section>

        <Section
          title="Available jobs"
          subtitle="Accept or reject incoming requested bookings.">
          {availableBookings.length === 0 ? (
            <Card>
              <Text style={styles.muted}>No open requests right now.</Text>
            </Card>
          ) : (
            availableBookings.map((b) => (
              <Card key={`avail-${b.id}`}>
                <Text style={styles.jobTitle}>{b.title}</Text>
                <Text style={styles.muted}>{b.description}</Text>
                <Text style={styles.muted}>
                  Estimate: ${(b.estimateCents / 100).toFixed(2)}
                </Text>
                <View style={styles.row}>
                  <ActionButton
                    label="Accept"
                    tone="ok"
                    onPress={() => assignBookingProvider(b.id, proId)}
                  />
                  <ActionButton
                    label="Reject"
                    tone="danger"
                    onPress={() => rejectAvailableBooking(b.id)}
                  />
                </View>
              </Card>
            ))
          )}
        </Section>

        <Section
          title="My jobs"
          subtitle="Move jobs through assigned -> in_progress -> completed.">
          {myJobs.length === 0 ? (
            <Card>
              <Text style={styles.muted}>
                No jobs assigned yet. Accept from available jobs above.
              </Text>
            </Card>
          ) : (
            myJobs.map((j) => (
              <Card key={j.id}>
                <Text style={styles.jobTitle}>{j.title}</Text>
                <Text style={styles.muted}>Status: {j.status}</Text>
                <Text style={styles.muted}>
                  Payout: ${(j.payoutCents / 100).toFixed(2)}
                </Text>
                <View style={styles.row}>
                  {j.status === 'assigned' ? (
                    <ActionButton
                      label="Start job"
                      tone="ok"
                      onPress={() => setJobInProgress(j.id)}
                    />
                  ) : null}
                  {j.status === 'in_progress' ? (
                    <ActionButton
                      label="Mark completed"
                      tone="ok"
                      onPress={() => setJobCompleted(j.id)}
                    />
                  ) : null}
                </View>
              </Card>
            ))
          )}
        </Section>
      </View>
    </ScrollView>
  );
}

function ActionButton({
  label,
  tone,
  onPress,
}: {
  label: string;
  tone: 'ok' | 'danger';
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, tone === 'ok' ? styles.btnOk : styles.btnDanger]}>
      <Text style={[styles.btnText, tone === 'ok' ? styles.textOk : styles.textDanger]}>
        {label}
      </Text>
    </Pressable>
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
    marginBottom: theme.spacing.xs,
  },
  subtle: {
    ...theme.typography.small,
    color: theme.colors.muted,
    marginBottom: theme.spacing.lg,
  },
  metric: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.brandTeal,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  muted: { ...theme.typography.caption, color: theme.colors.muted, lineHeight: 18 },
  jobTitle: { ...theme.typography.bodyStrong, color: theme.colors.ink, marginBottom: 4 },
  btn: {
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: theme.colors.surface,
  },
  btnOk: {
    borderColor: theme.colors.success,
    backgroundColor: 'rgba(13,110,78,0.08)',
  },
  btnDanger: {
    borderColor: theme.colors.danger,
    backgroundColor: 'rgba(180,35,24,0.08)',
  },
  btnText: { fontSize: 12, fontWeight: '700' },
  textOk: { color: theme.colors.success },
  textDanger: { color: theme.colors.danger },
});
