import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { services, bookingConfig, Service } from '../data/config';

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  duration: number;
  notes: string;
  designNotes: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  bookingRef: string;
}

export interface CustomerAccount {
  email: string;
  name: string;
  phone: string;
  password?: string;
}

interface AppState {
  appointments: Appointment[];
  isAdminAuthenticated: boolean;
  customerAccount: CustomerAccount | null;
  services: Service[];
  blockedDates: string[];
  blockedTimes: { date: string; time: string }[];
}

type Action =
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'CANCEL_APPOINTMENT'; payload: string }
  | { type: 'COMPLETE_APPOINTMENT'; payload: string }
  | { type: 'ADMIN_LOGIN' }
  | { type: 'ADMIN_LOGOUT' }
  | { type: 'SET_CUSTOMER'; payload: CustomerAccount }
  | { type: 'UPDATE_SERVICE'; payload: Service }
  | { type: 'BLOCK_DATE'; payload: string }
  | { type: 'UNBLOCK_DATE'; payload: string }
  | { type: 'BLOCK_TIME'; payload: { date: string; time: string } }
  | { type: 'UNBLOCK_TIME'; payload: { date: string; time: string } }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  appointments: [],
  isAdminAuthenticated: false,
  customerAccount: null,
  services: services,
  blockedDates: [],
  blockedTimes: [],
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'CANCEL_APPOINTMENT':
      return { ...state, appointments: state.appointments.map(a => a.id === action.payload ? { ...a, status: 'cancelled' as const } : a) };
    case 'COMPLETE_APPOINTMENT':
      return { ...state, appointments: state.appointments.map(a => a.id === action.payload ? { ...a, status: 'completed' as const } : a) };
    case 'ADMIN_LOGIN':
      return { ...state, isAdminAuthenticated: true };
    case 'ADMIN_LOGOUT':
      return { ...state, isAdminAuthenticated: false };
    case 'SET_CUSTOMER':
      return { ...state, customerAccount: action.payload };
    case 'UPDATE_SERVICE':
      return { ...state, services: state.services.map(s => s.id === action.payload.id ? action.payload : s) };
    case 'BLOCK_DATE':
      return { ...state, blockedDates: [...state.blockedDates, action.payload] };
    case 'UNBLOCK_DATE':
      return { ...state, blockedDates: state.blockedDates.filter(d => d !== action.payload) };
    case 'BLOCK_TIME':
      return { ...state, blockedTimes: [...state.blockedTimes, action.payload] };
    case 'UNBLOCK_TIME':
      return { ...state, blockedTimes: state.blockedTimes.filter(t => !(t.date === action.payload.date && t.time === action.payload.time)) };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  getAvailableSlots: (date: string, serviceId: string) => string[];
  generateBookingRef: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('treasured-tips-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try {
      const toSave = { appointments: state.appointments, customerAccount: state.customerAccount, blockedDates: state.blockedDates, blockedTimes: state.blockedTimes };
      localStorage.setItem('treasured-tips-state', JSON.stringify(toSave));
    } catch (e) { console.error(e); }
  }, [state.appointments, state.customerAccount, state.blockedDates, state.blockedTimes]);

  const getAvailableSlots = (date: string, serviceId: string): string[] => {
    const service = state.services.find(s => s.id === serviceId);
    if (!service) return [];
    if (state.blockedDates.includes(date)) return [];
    const dayOfWeek = new Date(date).getDay();
    if (bookingConfig.daysOff.includes(dayOfWeek)) return [];
    const [startHour, startMin] = bookingConfig.workingHours.start.split(':').map(Number);
    const [endHour, endMin] = bookingConfig.workingHours.end.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const slots: string[] = [];
    for (let mins = startMinutes; mins + service.duration <= endMinutes; mins += 30) {
      const hour = Math.floor(mins / 60);
      const minute = mins % 60;
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const requestedStart = mins;
      const requestedEnd = mins + service.duration + bookingConfig.appointmentBuffer;
      const dayAppts = state.appointments.filter(a => a.date === date && a.status !== 'cancelled');
      let conflict = false;
      for (const appt of dayAppts) {
        const [apptHour, apptMin] = appt.time.split(':').map(Number);
        const apptStart = apptHour * 60 + apptMin;
        const apptEnd = apptStart + appt.duration + bookingConfig.appointmentBuffer;
        if (requestedStart < apptEnd && requestedEnd > apptStart) { conflict = true; break; }
      }
      const isBlocked = state.blockedTimes.some(t => t.date === date && t.time === timeStr);
      if (!conflict && !isBlocked) slots.push(timeStr);
    }
    return slots;
  };

  const generateBookingRef = (): string => {
    return 'TT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
    <AppContext.Provider value={{ state, dispatch, getAvailableSlots, generateBookingRef }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
