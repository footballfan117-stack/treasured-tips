import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Settings, Plus, X, Check, ChevronLeft, ChevronRight, Lock, BarChart3 } from 'lucide-react';
import { useAppContext, Appointment } from '../context/AppContext';
import { ADMIN_PASSWORD } from '../data/config';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isToday, getDay, addMonths, subMonths } from 'date-fns';

type AdminView = 'login' | 'dashboard' | 'calendar' | 'appointments' | 'services' | 'availability';
type CalendarView = 'day' | 'week' | 'month';

export default function Admin() {
  const { state, dispatch } = useAppContext();
  const [view, setView] = useState<AdminView>('login');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) { dispatch({ type: 'ADMIN_LOGIN' }); setView('dashboard'); setLoginError(''); }
    else { setLoginError('Incorrect password'); }
  };

  if (!state.isAdminAuthenticated && view !== 'login') setView('login');

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayAppointments = state.appointments.filter(a => a.date === todayStr && a.status !== 'cancelled');
  const upcomingAppointments = state.appointments.filter(a => a.date >= todayStr && a.status === 'confirmed').sort((a, b) => a.date.localeCompare(b.date));

  const calendarDays = useMemo(() => {
    if (calendarView === 'month') {
      const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
      const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end });
    } else if (calendarView === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end });
    }
    return [currentDate];
  }, [currentDate, calendarView]);

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return state.appointments.filter(a => a.date === dateStr && a.status !== 'cancelled').sort((a, b) => a.time.localeCompare(b.time));
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8"><h1 className="font-serif text-2xl text-[#2D2926] mb-2">Admin Access</h1><p className="text-sm text-[#2D2926]/50">Treasured Tips Dashboard</p></div>
          <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
            <div className="flex items-center gap-2 mb-4"><Lock size={16} className="text-[#6B5B4E]" /><label className="text-sm font-medium text-[#2D2926]">Password</label></div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none mb-3" placeholder="Enter admin password" />
            {loginError && <p className="text-xs text-red-500 mb-3">{loginError}</p>}
            <button onClick={handleLogin} className="w-full bg-[#2D2926] text-[#FDFBF7] py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors">Sign In</button>
            <p className="text-xs text-[#2D2926]/40 mt-4 text-center">Demo password: treasured2024</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]/30">
      <header className="bg-white border-b border-[#E8DDD3]/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <h1 className="font-serif text-lg text-[#2D2926]">TT Admin</h1>
              <nav className="hidden md:flex items-center gap-1">
                {(['dashboard', 'calendar', 'appointments', 'services', 'availability'] as AdminView[]).filter(v => v !== 'login').map(item => (
                  <button key={item} onClick={() => setView(item)} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all ${view === item ? 'bg-[#2D2926] text-[#FDFBF7]' : 'text-[#2D2926]/60 hover:bg-[#F5F0E8]'}`}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="text-xs text-[#2D2926]/50 hover:text-[#2D2926]">View Site</Link>
              <button onClick={() => { dispatch({ type: 'ADMIN_LOGOUT' }); setView('login'); }} className="text-xs text-[#2D2926]/50 hover:text-red-500">Sign Out</button>
            </div>
          </div>
        </div>
        <div className="md:hidden border-t border-[#E8DDD3]/20 px-4 py-2 flex gap-1 overflow-x-auto">
          {(['dashboard', 'calendar', 'appointments', 'services', 'availability'] as AdminView[]).map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${view === v ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-[#F5F0E8] text-[#2D2926]/60'}`}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {view === 'dashboard' && (
          <div>
            <h2 className="font-serif text-2xl text-[#2D2926] mb-6">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Today's Appointments", value: todayAppointments.length },
                { label: 'Upcoming', value: upcomingAppointments.length },
                { label: 'Total Bookings', value: state.appointments.filter(a => a.status !== 'cancelled').length },
                { label: 'Services', value: state.services.length },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-[#E8DDD3]/50 rounded-sm p-4">
                  <p className="text-xs text-[#2D2926]/50 mb-2">{stat.label}</p>
                  <p className="font-serif text-3xl text-[#2D2926]">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
                <h3 className="font-medium text-[#2D2926] mb-4">Today — {format(new Date(), 'EEEE, d MMMM')}</h3>
                {todayAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {todayAppointments.map(appt => (
                      <div key={appt.id} className="flex items-center gap-3 p-3 bg-[#F5F0E8]/50 rounded-sm">
                        <span className="text-sm font-medium text-[#2D2926] w-12">{appt.time}</span>
                        <div className="flex-1"><p className="text-sm font-medium text-[#2D2926]">{appt.customerName}</p><p className="text-xs text-[#2D2926]/50">{appt.serviceName}</p></div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${appt.status === 'confirmed' ? 'bg-green-50 text-green-700' : appt.status === 'completed' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>{appt.status}</span>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-[#2D2926]/40 py-4 text-center">No appointments today</p>}
              </div>
              <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
                <h3 className="font-medium text-[#2D2926] mb-4">Upcoming Appointments</h3>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingAppointments.slice(0, 5).map(appt => (
                      <div key={appt.id} className="flex items-center gap-3 p-3 bg-[#F5F0E8]/50 rounded-sm">
                        <div className="text-center w-12">
                          <p className="text-xs text-[#2D2926]/50">{format(new Date(appt.date + 'T00:00:00'), 'MMM')}</p>
                          <p className="text-lg font-medium text-[#2D2926]">{format(new Date(appt.date + 'T00:00:00'), 'd')}</p>
                        </div>
                        <div className="flex-1"><p className="text-sm font-medium text-[#2D2926]">{appt.customerName}</p><p className="text-xs text-[#2D2926]/50">{appt.time} — {appt.serviceName}</p></div>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-[#2D2926]/40 py-4 text-center">No upcoming appointments</p>}
              </div>
            </div>
          </div>
        )}

        {view === 'calendar' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-[#2D2926]">Calendar</h2>
              <div className="flex items-center gap-2">
                {(['day', 'week', 'month'] as CalendarView[]).map(v => (
                  <button key={v} onClick={() => setCalendarView(v)} className={`px-3 py-1.5 text-xs font-medium rounded-full ${calendarView === v ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-white border border-[#E8DDD3]/50 text-[#2D2926]/60'}`}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentDate(calendarView === 'month' ? subMonths(currentDate, 1) : addDays(currentDate, -7))} className="p-2 hover:bg-[#F5F0E8] rounded-full"><ChevronLeft size={18} /></button>
              <h3 className="font-serif text-lg text-[#2D2926]">{calendarView === 'month' ? format(currentDate, 'MMMM yyyy') : calendarView === 'week' ? `Week of ${format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'd MMM')}` : format(currentDate, 'EEEE, d MMMM yyyy')}</h3>
              <button onClick={() => setCurrentDate(calendarView === 'month' ? addMonths(currentDate, 1) : addDays(currentDate, 7))} className="p-2 hover:bg-[#F5F0E8] rounded-full"><ChevronRight size={18} /></button>
            </div>
            <div className="bg-white border border-[#E8DDD3]/50 rounded-sm overflow-hidden">
              {calendarView === 'month' ? (
                <div>
                  <div className="grid grid-cols-7 border-b border-[#E8DDD3]/30">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (<div key={d} className="p-2 text-xs font-medium text-[#2D2926]/50 text-center">{d}</div>))}
                  </div>
                  <div className="grid grid-cols-7">
                    {calendarDays.map((day, i) => {
                      const dayAppts = getAppointmentsForDate(day);
                      const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                      return (
                        <div key={i} className={`min-h-[80px] p-1.5 border-b border-r border-[#E8DDD3]/20 ${!isCurrentMonth ? 'opacity-30' : ''} ${isToday(day) ? 'bg-[#F2E8E2]/30' : ''}`}>
                          <span className={`text-xs ${isToday(day) ? 'font-bold text-[#6B5B4E]' : 'text-[#2D2926]/60'}`}>{format(day, 'd')}</span>
                          {dayAppts.slice(0, 2).map(a => (<div key={a.id} className="text-[10px] bg-[#2D2926]/5 rounded px-1 py-0.5 mt-0.5 truncate text-[#2D2926]/60">{a.time} {a.customerName}</div>))}
                          {dayAppts.length > 2 && <span className="text-[10px] text-[#2D2926]/40">+{dayAppts.length - 2}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-[#E8DDD3]/20">
                  {calendarDays.map((day, i) => {
                    const dayAppts = getAppointmentsForDate(day);
                    return (
                      <div key={i} className={`p-4 ${isToday(day) ? 'bg-[#F2E8E2]/20' : ''}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-16 text-center"><p className="text-xs text-[#2D2926]/50">{format(day, 'EEE')}</p><p className="text-lg font-medium text-[#2D2926]">{format(day, 'd')}</p></div>
                          <div className="flex-1">
                            {dayAppts.length > 0 ? (
                              <div className="space-y-2">
                                {dayAppts.map(appt => (
                                  <div key={appt.id} className="flex items-center gap-3 p-2 bg-[#F5F0E8]/50 rounded-sm">
                                    <span className="text-sm font-medium text-[#2D2926] w-12">{appt.time}</span>
                                    <span className="text-sm text-[#2D2926]/70 flex-1">{appt.customerName} — {appt.serviceName}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${appt.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>{appt.status}</span>
                                  </div>
                                ))}
                              </div>
                            ) : <p className="text-sm text-[#2D2926]/30">No appointments</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'appointments' && (
          <div>
            <h2 className="font-serif text-2xl text-[#2D2926] mb-6">All Appointments</h2>
            <div className="bg-white border border-[#E8DDD3]/50 rounded-sm overflow-hidden">
              {state.appointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-[#E8DDD3]/30 bg-[#F5F0E8]/30">
                      <th className="text-left p-3 text-xs font-medium text-[#2D2926]/50">Date</th>
                      <th className="text-left p-3 text-xs font-medium text-[#2D2926]/50">Time</th>
                      <th className="text-left p-3 text-xs font-medium text-[#2D2926]/50">Client</th>
                      <th className="text-left p-3 text-xs font-medium text-[#2D2926]/50">Service</th>
                      <th className="text-left p-3 text-xs font-medium text-[#2D2926]/50">Status</th>
                      <th className="text-left p-3 text-xs font-medium text-[#2D2926]/50">Actions</th>
                    </tr></thead>
                    <tbody>
                      {state.appointments.sort((a, b) => b.date.localeCompare(a.date)).map(appt => (
                        <tr key={appt.id} className="border-b border-[#E8DDD3]/20 hover:bg-[#F5F0E8]/20">
                          <td className="p-3 text-sm text-[#2D2926]">{format(new Date(appt.date + 'T00:00:00'), 'd MMM yyyy')}</td>
                          <td className="p-3 text-sm text-[#2D2926]">{appt.time}</td>
                          <td className="p-3"><p className="text-sm font-medium text-[#2D2926]">{appt.customerName}</p><p className="text-xs text-[#2D2926]/40">{appt.customerEmail}</p></td>
                          <td className="p-3 text-sm text-[#2D2926]">{appt.serviceName}</td>
                          <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${appt.status === 'confirmed' ? 'bg-green-50 text-green-700' : appt.status === 'completed' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>{appt.status}</span></td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              {appt.status === 'confirmed' && (<>
                                <button onClick={() => dispatch({ type: 'COMPLETE_APPOINTMENT', payload: appt.id })} className="p-1 hover:bg-green-50 rounded"><Check size={14} className="text-green-600" /></button>
                                <button onClick={() => dispatch({ type: 'CANCEL_APPOINTMENT', payload: appt.id })} className="p-1 hover:bg-red-50 rounded"><X size={14} className="text-red-500" /></button>
                              </>)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <div className="p-8 text-center"><p className="text-[#2D2926]/40">No appointments yet</p></div>}
            </div>
          </div>
        )}

        {view === 'services' && (
          <div>
            <h2 className="font-serif text-2xl text-[#2D2926] mb-6">Manage Services</h2>
            <div className="space-y-4">
              {state.services.map(service => (
                <div key={service.id} className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#6B5B4E]/70 font-medium">{service.category}</span>
                      <h3 className="font-serif text-lg text-[#2D2926] mt-1">{service.name}</h3>
                      <p className="text-sm text-[#2D2926]/50 mt-1">{service.duration} min • {service.depositRequired ? 'Deposit required' : 'No deposit'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <label className="text-xs text-[#2D2926]/40 block">Price (£)</label>
                        <input type="number" value={service.price || ''} onChange={(e) => dispatch({ type: 'UPDATE_SERVICE', payload: { ...service, price: e.target.value ? Number(e.target.value) : null } })} className="w-24 px-3 py-2 border border-[#D4C8BC] bg-white text-[#2D2926] text-sm text-right focus:border-[#6B5B4E] focus:outline-none" placeholder="—" />
                      </div>
                      <div className="text-right">
                        <label className="text-xs text-[#2D2926]/40 block">Duration</label>
                        <input type="number" value={service.duration} onChange={(e) => dispatch({ type: 'UPDATE_SERVICE', payload: { ...service, duration: Number(e.target.value) } })} className="w-20 px-3 py-2 border border-[#D4C8BC] bg-white text-[#2D2926] text-sm text-right focus:border-[#6B5B4E] focus:outline-none" />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={service.available} onChange={(e) => dispatch({ type: 'UPDATE_SERVICE', payload: { ...service, available: e.target.checked } })} className="w-4 h-4" />
                        <span className="text-xs text-[#2D2926]/60">Available</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'availability' && (
          <div>
            <h2 className="font-serif text-2xl text-[#2D2926] mb-6">Manage Availability</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
                <h3 className="font-medium text-[#2D2926] mb-4">Blocked Dates</h3>
                <p className="text-sm text-[#2D2926]/50 mb-4">Block specific dates when you're unavailable.</p>
                <div className="flex gap-2 mb-4">
                  <input type="date" id="block-date-input" className="flex-1 px-4 py-2 border border-[#D4C8BC] bg-white text-[#2D2926] text-sm focus:border-[#6B5B4E] focus:outline-none" />
                  <button onClick={() => { const input = document.getElementById('block-date-input') as HTMLInputElement; if (input.value && !state.blockedDates.includes(input.value)) { dispatch({ type: 'BLOCK_DATE', payload: input.value }); input.value = ''; } }} className="px-4 py-2 bg-[#2D2926] text-[#FDFBF7] text-xs font-medium rounded-sm hover:bg-[#6B5B4E]">Block</button>
                </div>
                {state.blockedDates.length > 0 && (
                  <div className="space-y-2">
                    {state.blockedDates.map(date => (
                      <div key={date} className="flex items-center justify-between p-2 bg-[#F5F0E8]/50 rounded-sm">
                        <span className="text-sm text-[#2D2926]">{format(new Date(date + 'T00:00:00'), 'EEEE, d MMMM yyyy')}</span>
                        <button onClick={() => dispatch({ type: 'UNBLOCK_DATE', payload: date })} className="text-red-500 hover:text-red-700"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
                <h3 className="font-medium text-[#2D2926] mb-4">Blocked Time Slots</h3>
                <p className="text-sm text-[#2D2926]/50 mb-4">Block specific times on specific dates.</p>
                <div className="flex gap-2 mb-4">
                  <input type="date" id="block-time-date" className="flex-1 px-4 py-2 border border-[#D4C8BC] bg-white text-[#2D2926] text-sm focus:border-[#6B5B4E] focus:outline-none" />
                  <input type="time" id="block-time-time" className="w-28 px-4 py-2 border border-[#D4C8BC] bg-white text-[#2D2926] text-sm focus:border-[#6B5B4E] focus:outline-none" />
                  <button onClick={() => { const d = document.getElementById('block-time-date') as HTMLInputElement; const t = document.getElementById('block-time-time') as HTMLInputElement; if (d.value && t.value) { dispatch({ type: 'BLOCK_TIME', payload: { date: d.value, time: t.value } }); d.value = ''; t.value = ''; } }} className="px-4 py-2 bg-[#2D2926] text-[#FDFBF7] text-xs font-medium rounded-sm hover:bg-[#6B5B4E]">Block</button>
                </div>
                {state.blockedTimes.length > 0 && (
                  <div className="space-y-2">
                    {state.blockedTimes.map((bt, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-[#F5F0E8]/50 rounded-sm">
                        <span className="text-sm text-[#2D2926]">{format(new Date(bt.date + 'T00:00:00'), 'd MMM')} at {bt.time}</span>
                        <button onClick={() => dispatch({ type: 'UNBLOCK_TIME', payload: bt })} className="text-red-500 hover:text-red-700"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
