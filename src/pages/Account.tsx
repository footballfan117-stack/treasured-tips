import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Mail } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';

export default function Account() {
  const { state, dispatch } = useAppContext();
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming');
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const handleLogin = () => { if (email.trim()) setIsAuthenticated(true); };

  const customerAppointments = state.appointments.filter(a => a.customerEmail.toLowerCase() === email.toLowerCase());
  const upcoming = customerAppointments.filter(a => a.date >= todayStr && a.status === 'confirmed').sort((a, b) => a.date.localeCompare(b.date));
  const previous = customerAppointments.filter(a => a.date < todayStr || a.status === 'completed' || a.status === 'cancelled').sort((a, b) => b.date.localeCompare(a.date));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-[#2D2926] mb-2">My Appointments</h1>
            <p className="text-sm text-[#2D2926]/50">Enter your email to view your bookings</p>
          </div>
          <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
            <div className="flex items-center gap-2 mb-4"><Mail size={16} className="text-[#6B5B4E]" /><label className="text-sm font-medium text-[#2D2926]">Email Address</label></div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none mb-4" placeholder="your@email.com" />
            <button onClick={handleLogin} className="w-full bg-[#2D2926] text-[#FDFBF7] py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors">View My Appointments</button>
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
            <div><h1 className="font-serif text-3xl text-[#2D2926]">My Appointments</h1><p className="text-sm text-[#2D2926]/50 mt-1">{email}</p></div>
            <Link to="/book" className="bg-[#2D2926] text-[#FDFBF7] px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors">Book New</Link>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('upcoming')} className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === 'upcoming' ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-white border border-[#E8DDD3]/50 text-[#2D2926]/60'}`}>Upcoming ({upcoming.length})</button>
          <button onClick={() => setActiveTab('previous')} className={`px-4 py-2 text-sm font-medium rounded-full ${activeTab === 'previous' ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-white border border-[#E8DDD3]/50 text-[#2D2926]/60'}`}>Previous ({previous.length})</button>
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
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2D2926]">{appt.serviceName}</h3>
                      <p className="text-sm text-[#2D2926]/50 mt-1 flex items-center gap-1"><Clock size={12} /> {appt.time}</p>
                      {appt.designNotes && <p className="text-xs text-[#2D2926]/40 mt-2"><span className="font-medium">Notes:</span> {appt.designNotes}</p>}
                      <p className="text-xs text-[#2D2926]/30 mt-2">Ref: {appt.bookingRef}</p>
                    </div>
                  </div>
                  <button onClick={() => dispatch({ type: 'CANCEL_APPOINTMENT', payload: appt.id })} className="px-3 py-1.5 text-xs font-medium border border-red-200 text-red-500 rounded-full hover:bg-red-50">Cancel</button>
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
    </div>
  );
}
