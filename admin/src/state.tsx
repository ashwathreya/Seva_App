import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from 'react';
import type { Booking, BookingStatus, Dispute, Job, SevaUser } from './types';
import {
  getSeedData,
  type SeedScenario,
} from './seed';

type State = {
  users: SevaUser[];
  bookings: Booking[];
  jobs: Job[];
  disputes: Dispute[];
};

type Action =
  | { type: 'APPROVE_PRO'; userId: string }
  | { type: 'REJECT_PRO'; userId: string }
  | { type: 'SUSPEND_USER'; userId: string }
  | { type: 'ACTIVATE_USER'; userId: string }
  | {
      type: 'ASSIGN_BOOKING';
      bookingId: string;
      proId: string;
    }
  | { type: 'CANCEL_BOOKING'; bookingId: string }
  | { type: 'SET_DISPUTE_NOTES'; disputeId: string; notes: string }
  | { type: 'RESOLVE_REFUND'; disputeId: string }
  | { type: 'RESOLVE_PARTIAL'; disputeId: string }
  | { type: 'APPROVE_COMPLETION'; bookingId: string }
  | { type: 'RESET_DEMO' }
  | { type: 'LOAD_SCENARIO'; scenario: SeedScenario }
  | {
      type: 'CREATE_BOOKING';
      payload: Omit<
        Booking,
        'id' | 'status' | 'createdAt' | 'updatedAt'
      >;
    };

function reducer(state: State, action: Action): State {
  const now = new Date().toISOString();
  switch (action.type) {
    case 'APPROVE_PRO':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId && u.role === 'pro'
            ? {
                ...u,
                vettingStatus: 'approved',
                accountStatus: 'active',
              }
            : u,
        ),
      };
    case 'REJECT_PRO':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId && u.role === 'pro'
            ? { ...u, vettingStatus: 'rejected', accountStatus: 'suspended' }
            : u,
        ),
      };
    case 'SUSPEND_USER':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, accountStatus: 'suspended' } : u,
        ),
      };
    case 'ACTIVATE_USER':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, accountStatus: 'active' } : u,
        ),
      };
    case 'ASSIGN_BOOKING': {
      const { bookingId, proId } = action;
      const booking = state.bookings.find((b) => b.id === bookingId);
      if (!booking) return state;
      const bookings = state.bookings.map((b) =>
        b.id === bookingId
          ? { ...b, proId, status: 'assigned' as BookingStatus, updatedAt: now }
          : b,
      );
      const hasJob = state.jobs.some((j) => j.bookingId === bookingId);
      const jobs = hasJob
        ? state.jobs.map((j) =>
            j.bookingId === bookingId
              ? { ...j, proId, status: 'assigned' as BookingStatus }
              : j,
          )
        : [
            ...state.jobs,
            {
              id: `job_${Date.now()}`,
              bookingId,
              proId,
              title: booking.title,
              payoutCents: Math.floor(booking.estimateCents * 0.85),
              status: 'assigned' as BookingStatus,
              createdAt: now,
            },
          ];
      return { ...state, bookings, jobs };
    }
    case 'CANCEL_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.bookingId
            ? { ...b, status: 'cancelled' as BookingStatus, updatedAt: now }
            : b,
        ),
        jobs: state.jobs.map((j) =>
          j.bookingId === action.bookingId
            ? { ...j, status: 'cancelled' as BookingStatus }
            : j,
        ),
      };
    case 'SET_DISPUTE_NOTES':
      return {
        ...state,
        disputes: state.disputes.map((d) =>
          d.id === action.disputeId ? { ...d, notes: action.notes } : d,
        ),
      };
    case 'RESOLVE_REFUND':
      return {
        ...state,
        disputes: state.disputes.map((d) =>
          d.id === action.disputeId ? { ...d, status: 'resolved_refund' } : d,
        ),
      };
    case 'RESOLVE_PARTIAL':
      return {
        ...state,
        disputes: state.disputes.map((d) =>
          d.id === action.disputeId ? { ...d, status: 'resolved_partial' } : d,
        ),
      };
    case 'APPROVE_COMPLETION':
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.bookingId && b.status === 'completed'
            ? { ...b, status: 'approved', updatedAt: now }
            : b,
        ),
        jobs: state.jobs.map((j) =>
          j.bookingId === action.bookingId && j.status === 'completed'
            ? { ...j, status: 'approved' as BookingStatus }
            : j,
        ),
      };
    case 'RESET_DEMO':
      return initialState;
    case 'LOAD_SCENARIO':
      return getSeedData(action.scenario);
    case 'CREATE_BOOKING': {
      const providerId = action.payload.proId;
      const base = action.payload;
      const booking: Booking = {
        ...base,
        id: `bk_${Date.now()}`,
        status: providerId ? 'assigned' : 'requested',
        proId: providerId,
        createdAt: now,
        updatedAt: now,
      };
      const jobs = providerId
        ? [
            ...state.jobs,
            {
              id: `job_${Date.now()}`,
              bookingId: booking.id,
              proId: providerId,
              title: booking.title,
              payoutCents: Math.floor(booking.estimateCents * 0.85),
              status: 'assigned' as BookingStatus,
              createdAt: now,
            },
          ]
        : state.jobs;
      return {
        ...state,
        bookings: [booking, ...state.bookings],
        jobs,
      };
    }
    default:
      return state;
  }
}

const initialState: State = getSeedData('light');

const STORAGE_KEY = 'seva_admin_state_v1';

function loadInitialState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as State;
    if (!parsed?.users || !parsed?.bookings || !parsed?.jobs || !parsed?.disputes) {
      return initialState;
    }
    return parsed;
  } catch {
    return initialState;
  }
}

const Ctx = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage quota / private mode errors
    }
  }, [state]);

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useAdmin() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAdmin outside AdminProvider');
  return v;
}

export type { Action };
