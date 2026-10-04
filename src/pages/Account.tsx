import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Mail, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { ConfirmDialog } from '../components/Animations';

export default function Account() {
  const { state, dispatch } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming');
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const handleLogin = () => {
    setAuthError('');
    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter both email and password');
      return;
    }
    // Check if customer account exists with matching credentials
    const account = state.customerAccount;
    if (account && account.email.toLowerCase() === email.toLowerCase() && account.password === password) {
      setIsAuthenticated(true);
    } else if (account && account.email.toLowerCase() === email.toLowerCase()) {
      setAuthError('Incorrect password. Please try again.');
    } else {
      setAuthError('No account found with these details. Please use the same email and password you set when booking.');
    }
  };

  const customerAppointments = state.appointments.filter(a => a.customerEmail.toLowerCase() === email.toLowerCase());
  const upcoming = customerAppointments.filter(a => a.date >= todayStr && a.status === 'confirmed').sort((a, b) => a.date.localeCompare(b.date));
  const previous = customerAppointments.filter(a => a.date < todayStr || a.status === 'completed' || a.status === 'cancelled').sort((a, b) => b.date.localeCompare(a.date));

  const handleCancelConfirm = () => {
    if (cancelTarget) {
      dispatch({ type: 'CANCEL_APPOINTMENT', payload: cancelTarget });
      setCancelTarget(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-[#2D2926] mb-2">My Appointments</h1>
            <p className="text-sm text-[#2D2926]/50">Sign in to view your bookings</p>
          </div>
          <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#2D2926] mb-2"><Mail size={14} /> Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none" placeholder="your@email.com" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-[#2D2926] mb-2"><Lock size={14} /> Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none" placeholder="Your account password" />
              </div>
              {authError && <p className="text-xs text-red-500">{authError}</p>}
              <button onClick={handleLogin} className="w-full bg-[#2D2926] text-[#FDFBF7] py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors">Sign In</button>
            </div>
            <div className="mt-4 p-3 bg-[#F5F0E8]/50 rounded-sm">
              <p className="text-xs text-[#2D2926]/50 leading-relaxed">
                <strong className="text-[#2D2926]">First time?</strong> Set a password when you book your appointment to create your account. You'll use this email and password to view your appointments anytime.
              </p>
            </div>
          </div>
          <div className="text-center mt-6"><Link to="/book" className="text-sm text-[#6B5B4E] hover:underline">Book a new appointment →</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-16">
      <section className="py-12 md:py-16 bg-[#F5F0E8]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl text-[#2D2926]">My Appointments</h1>
              <p className="text-sm text-[#2D2926]/50 mt-1">{email}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-[#2D2926]/50 hover:text-[#2D2926] transition-colors"
              >
                Sign Out
              </button>
              <Link to="/book" className="bg-[#2D2926] text-[#FDFBF7] px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors">Book New</Link>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('upcoming')} className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'upcoming' ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-white border border-[#E8DDD3]/50 text-[#2D2926]/60'}`}>Upcoming ({upcoming.length})</button>
          <button onClick={() => setActiveTab('previous')} className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'previous' ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-white border border-[#E8DDD3]/50 text-[#2D2926]/60'}`}>Previous ({previous.length})</button>
        </div>
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcoming.length > 0 ? upcoming.map(appt => (
              <div key={appt.id} className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 text-center flex-shrink-0">
                      <p className="text-xs text-[#2D2926]/50">{format(new Date(appt.date + 'T00:00:00'), 'MMM')}</p>
                      <p className="text-2xl font-serif text-[#2D2926]">{format(new Date(appt.date + 'T00:00:00'), 'd')}</p>
                      <p className="text-xs text-[#2D2926]/40">{format(new Date(appt.date + 'T00:00:00'), 'EEE')}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2D2926]">{appt.serviceName}</h3>
                      <p className="text-sm text-[#2D2926]/50 mt-1 flex items-center gap-1"><Clock size={12} /> {appt.time}</p>
                      {appt.designNotes && <p className="text-xs text-[#2D2926]/40 mt-2"><span className="font-medium">Notes:</span> {appt.designNotes}</p>}
                      <p className="text-xs text-[#2D2926]/30 mt-2">Ref: {appt.bookingRef}</p>
                    </div>
                  </div>
                  <button onClick={() => setCancelTarget(appt.id)} className="px-3 py-1.5 text-xs font-medium border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors">Cancel Appointment</button>
                </div>
              </div>
            )) : (
              <div className="text-center py-12 bg-white border border-[#E8DDD3]/50 rounded-sm">
                <Calendar size={32} className="text-[#2D2926]/20 mx-auto mb-3" />
                <p className="text-[#2D2926]/50">No upcoming appointments</p>
                <Link to="/book" className="text-sm text-[#6B5B4E] mt-2 inline-block hover:underline">Book an appointment →</Link>
              </div>
            )}
          </div>
        )}
        {activeTab === 'previous' && (
          <div className="space-y-4">
            {previous.length > 0 ? previous.map(appt => (
              <div key={appt.id} className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6 opacity-70">
                <div className="flex items-start gap-4">
                  <div className="w-14 text-center flex-shrink-0">
                    <p className="text-xs text-[#2D2926]/50">{format(new Date(appt.date + 'T00:00:00'), 'MMM')}</p>
                    <p className="text-2xl font-serif text-[#2D2926]">{format(new Date(appt.date + 'T00:00:00'), 'd')}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2D2926]">{appt.serviceName}</h3>
                    <p className="text-sm text-[#2D2926]/50 mt-1">{appt.time}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${appt.status === 'completed' ? 'bg-blue-50 text-blue-700' : appt.status === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{appt.status}</span>
                  </div>
                </div>
              </div>
            )) : <div className="text-center py-12 bg-white border border-[#E8DDD3]/50 rounded-sm"><p className="text-[#2D2926]/50">No previous appointments</p></div>}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={cancelTarget !== null}
        title="Cancel appointment?"
        message="Are you sure you want to cancel this appointment? This action cannot be undone. If you need to reschedule instead, please get in touch with Amber directly."
        confirmLabel="Yes, cancel appointment"
        cancelLabel="Keep appointment"
        onConfirm={handleCancelConfirm}
        onCancel={() => setCancelTarget(null)}
        variant="danger"
      />
    </div>
  );
}
