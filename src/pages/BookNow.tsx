import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, Check, User, Mail, Phone, FileText, Palette } from 'lucide-react';
import { useAppContext, Appointment } from '../context/AppContext';
import { services } from '../data/config';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isToday, getDay, startOfWeek, endOfWeek } from 'date-fns';

type BookingStep = 'service' | 'date' | 'time' | 'details' | 'review' | 'confirmation';

export default function BookNow() {
  const [searchParams] = useSearchParams();
  const { state, dispatch, getAvailableSlots, generateBookingRef } = useAppContext();
  const [step, setStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [designNotes, setDesignNotes] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const service = services.find(s => s.id === selectedService);

  useEffect(() => {
    if (state.customerAccount) {
      setCustomerName(state.customerAccount.name || '');
      setCustomerEmail(state.customerAccount.email || '');
      setCustomerPhone(state.customerAccount.phone || '');
    }
  }, []);

  const availableSlots = useMemo(() => {
    if (!selectedDate || !selectedService) return [];
    return getAvailableSlots(selectedDate, selectedService);
  }, [selectedDate, selectedService, state.appointments, state.blockedDates, state.blockedTimes]);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const isDateAvailable = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const day = getDay(date);
    const maxDate = addDays(new Date(), 60);
    if (state.blockedDates.includes(dateStr)) return false;
    if (isBefore(date, new Date()) && !isToday(date)) return false;
    if (isBefore(maxDate, date)) return false;
    if (state.services.find(s => s.id === selectedService)) {
      const slots = getAvailableSlots(dateStr, selectedService);
      if (slots.length === 0) return false;
    }
    return true;
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.name = 'Please enter your name';
    if (!customerEmail.trim()) newErrors.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) newErrors.email = 'Please enter a valid email';
    if (!customerPhone.trim()) newErrors.phone = 'Please enter your phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!service) return;
    const ref = generateBookingRef();
    setBookingRef(ref);
    const appointment: Appointment = {
      id: ref, serviceId: service.id, serviceName: service.name,
      customerName: customerName.trim(), customerEmail: customerEmail.trim(), customerPhone: customerPhone.trim(),
      date: selectedDate, time: selectedTime, duration: service.duration,
      notes: appointmentNotes.trim(), designNotes: designNotes.trim(),
      status: 'confirmed', createdAt: new Date().toISOString(), bookingRef: ref,
    };
    dispatch({ type: 'ADD_APPOINTMENT', payload: appointment });
    dispatch({ type: 'SET_CUSTOMER', payload: { email: customerEmail, name: customerName, phone: customerPhone } });
    setStep('confirmation');
  };

  const stepIndex = { service: 0, date: 1, time: 2, details: 3, review: 4, confirmation: 5 };
  const steps = ['Service', 'Date', 'Time', 'Details', 'Review'];

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 md:pb-16">
      <section className="py-12 md:py-16 bg-[#F5F0E8]/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2926] mb-2">Book an Appointment</h1>
          <p className="text-[#2D2926]/60 text-sm">{step !== 'confirmation' ? 'Complete the steps below to secure your appointment with Amber.' : ''}</p>
        </div>
      </section>

      {step !== 'confirmation' && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${i <= stepIndex[step] ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-[#E8DDD3] text-[#2D2926]/40'}`}>
                  {i < stepIndex[step] ? <Check size={14} /> : i + 1}
                </div>
                {i < 4 && <div className={`w-8 md:w-16 h-0.5 mx-1 ${i < stepIndex[step] ? 'bg-[#2D2926]' : 'bg-[#E8DDD3]'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {step === 'service' && (
            <motion.div key="service" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="font-serif text-2xl text-[#2D2926] mb-6">Choose a service</h2>
              <div className="space-y-3">
                {services.filter(s => s.available).map(s => (
                  <button key={s.id} onClick={() => setSelectedService(s.id)} className={`w-full text-left p-5 border rounded-sm transition-all ${selectedService === s.id ? 'border-[#2D2926] bg-white shadow-sm' : 'border-[#E8DDD3]/50 bg-white hover:border-[#D4C8BC]/50'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#6B5B4E]/70 font-medium">{s.category}</span>
                        <h3 className="font-serif text-lg text-[#2D2926] mt-1">{s.name}</h3>
                        <p className="text-sm text-[#2D2926]/50 mt-1 line-clamp-2">{s.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-[#2D2926]/40">
                          <span className="flex items-center gap-1"><Clock size={12} /> {s.duration} min</span>
                          {s.depositRequired && <span>Deposit required</span>}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        {s.price ? <span className="font-serif text-lg text-[#2D2926]">£{s.price}</span> : <span className="text-xs text-[#2D2926]/40 italic">TBC</span>}
                        {selectedService === s.id && <div className="mt-2 w-6 h-6 rounded-full bg-[#2D2926] flex items-center justify-center ml-auto"><Check size={14} className="text-[#FDFBF7]" /></div>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={() => selectedService && setStep('date')} disabled={!selectedService} className="bg-[#2D2926] text-[#FDFBF7] px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Continue</button>
              </div>
            </motion.div>
          )}

          {step === 'date' && (
            <motion.div key="date" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="font-serif text-2xl text-[#2D2926] mb-6">Choose a date</h2>
              <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-[#F5F0E8] rounded-full"><ChevronLeft size={20} /></button>
                  <h3 className="font-serif text-lg text-[#2D2926]">{format(currentMonth, 'MMMM yyyy')}</h3>
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-[#F5F0E8] rounded-full"><ChevronRight size={20} /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (<div key={d} className="text-center text-xs text-[#2D2926]/40 font-medium py-2">{d}</div>))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, i) => {
                    const available = isDateAvailable(day);
                    const isSelected = selectedDate === format(day, 'yyyy-MM-dd');
                    const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                    const today = isToday(day);
                    return (
                      <button key={i} onClick={() => available && setSelectedDate(format(day, 'yyyy-MM-dd'))} disabled={!available || !isCurrentMonth}
                        className={`aspect-square flex items-center justify-center text-sm rounded-full transition-all ${isSelected ? 'bg-[#2D2926] text-[#FDFBF7]' : available && isCurrentMonth ? 'hover:bg-[#E8DDD3] text-[#2D2926]' : 'text-[#2D2926]/20 cursor-not-allowed'} ${today && !isSelected ? 'ring-1 ring-[#D4C8BC]' : ''}`}>
                        {format(day, 'd')}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep('service')} className="border border-[#2D2926] text-[#2D2926] px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#2D2926] hover:text-[#FDFBF7] transition-colors">Back</button>
                <button onClick={() => selectedDate && setStep('time')} disabled={!selectedDate} className="bg-[#2D2926] text-[#FDFBF7] px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Continue</button>
              </div>
            </motion.div>
          )}

          {step === 'time' && (
            <motion.div key="time" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="font-serif text-2xl text-[#2D2926] mb-2">Choose a time</h2>
              <p className="text-sm text-[#2D2926]/50 mb-6">{selectedDate && format(new Date(selectedDate + 'T00:00:00'), 'EEEE, d MMMM yyyy')}</p>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)} className={`p-3 text-sm font-medium rounded-sm border transition-all ${selectedTime === time ? 'border-[#2D2926] bg-[#2D2926] text-[#FDFBF7]' : 'border-[#E8DDD3]/50 bg-white hover:border-[#D4C8BC] text-[#2D2926]'}`}>{time}</button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-[#E8DDD3]/50 rounded-sm">
                  <p className="text-[#2D2926]/50">No available times on this date.</p>
                  <button onClick={() => setStep('date')} className="text-sm text-[#6B5B4E] mt-2 underline">Choose a different date</button>
                </div>
              )}
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep('date')} className="border border-[#2D2926] text-[#2D2926] px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#2D2926] hover:text-[#FDFBF7] transition-colors">Back</button>
                <button onClick={() => selectedTime && setStep('details')} disabled={!selectedTime} className="bg-[#2D2926] text-[#FDFBF7] px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Continue</button>
              </div>
            </motion.div>
          )}

          {step === 'details' && (
            <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="font-serif text-2xl text-[#2D2926] mb-6">Your details</h2>
              <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6 space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#2D2926] mb-2"><User size={14} /> Full Name</label>
                  <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none focus:ring-2 focus:ring-[#6B5B4E]/10" placeholder="Your full name" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#2D2926] mb-2"><Mail size={14} /> Email</label>
                  <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none focus:ring-2 focus:ring-[#6B5B4E]/10" placeholder="your@email.com" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#2D2926] mb-2"><Phone size={14} /> Phone Number</label>
                  <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none focus:ring-2 focus:ring-[#6B5B4E]/10" placeholder="Your phone number" />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#2D2926] mb-2"><Palette size={14} /> Design Ideas <span className="text-[#2D2926]/40 font-normal">(optional)</span></label>
                  <textarea value={designNotes} onChange={(e) => setDesignNotes(e.target.value)} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none focus:ring-2 focus:ring-[#6B5B4E]/10 min-h-[100px] resize-y" placeholder="Describe what you'd like — colours, designs, inspiration." />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#2D2926] mb-2"><FileText size={14} /> Appointment Notes <span className="text-[#2D2926]/40 font-normal">(optional)</span></label>
                  <textarea value={appointmentNotes} onChange={(e) => setAppointmentNotes(e.target.value)} className="w-full px-4 py-3 border border-[#D4C8BC] bg-white text-[#2D2926] focus:border-[#6B5B4E] focus:outline-none focus:ring-2 focus:ring-[#6B5B4E]/10 min-h-[80px] resize-y" placeholder="Anything else Amber should know." />
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep('time')} className="border border-[#2D2926] text-[#2D2926] px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#2D2926] hover:text-[#FDFBF7] transition-colors">Back</button>
                <button onClick={() => { if (validateDetails()) setStep('review'); }} className="bg-[#2D2926] text-[#FDFBF7] px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors">Review Booking</button>
              </div>
            </motion.div>
          )}

          {step === 'review' && service && (
            <motion.div key="review" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="font-serif text-2xl text-[#2D2926] mb-6">Review your booking</h2>
              <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6 space-y-4">
                {[
                  ['Service', service.name],
                  ['Date', format(new Date(selectedDate + 'T00:00:00'), 'EEEE, d MMMM yyyy')],
                  ['Time', selectedTime],
                  ['Duration', `${service.duration} minutes`],
                  ['Name', customerName],
                  ['Email', customerEmail],
                  ['Phone', customerPhone],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-[#E8DDD3]/30">
                    <span className="text-sm text-[#2D2926]/60">{label}</span>
                    <span className="text-sm font-medium text-[#2D2926]">{value}</span>
                  </div>
                ))}
                {designNotes && (
                  <div className="py-3 border-b border-[#E8DDD3]/30">
                    <span className="text-sm text-[#2D2926]/60 block mb-1">Design Notes</span>
                    <span className="text-sm text-[#2D2926]">{designNotes}</span>
                  </div>
                )}
                {service.price && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-[#2D2926]">Price</span>
                    <span className="font-serif text-xl text-[#2D2926]">£{service.price}</span>
                  </div>
                )}
              </div>
              <div className="mt-6 p-4 bg-[#F5F0E8]/50 rounded-sm border border-[#E8DDD3]/30">
                <p className="text-xs text-[#2D2926]/50 leading-relaxed">By confirming this booking, you agree to our terms and conditions. Please arrive on time. Cancellations should be made with at least 24 hours' notice.</p>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep('details')} className="border border-[#2D2926] text-[#2D2926] px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#2D2926] hover:text-[#FDFBF7] transition-colors">Back</button>
                <button onClick={handleConfirm} className="bg-[#2D2926] text-[#FDFBF7] px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors">Confirm Booking</button>
              </div>
            </motion.div>
          )}

          {step === 'confirmation' && service && (
            <motion.div key="confirmation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center"><Check size={32} className="text-green-600" /></div>
                <h2 className="font-serif text-3xl text-[#2D2926] mb-2">Booking Confirmed</h2>
                <p className="text-[#2D2926]/60">Your appointment with Amber is booked.</p>
              </div>
              <div className="bg-white border border-[#E8DDD3]/50 rounded-sm p-6 md:p-8 space-y-4">
                <div className="text-center pb-4 border-b border-[#E8DDD3]/30">
                  <p className="font-serif text-2xl text-[#2D2926]">Treasured Tips</p>
                  <p className="text-xs text-[#2D2926]/40 mt-1">Booking Reference: <strong>{bookingRef}</strong></p>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#E8DDD3]/30">
                  <div><p className="text-xs text-[#2D2926]/50 uppercase tracking-wider">Service</p><p className="text-sm font-medium text-[#2D2926] mt-1">{service.name}</p></div>
                  <div><p className="text-xs text-[#2D2926]/50 uppercase tracking-wider">Duration</p><p className="text-sm font-medium text-[#2D2926] mt-1">{service.duration} min</p></div>
                  <div><p className="text-xs text-[#2D2926]/50 uppercase tracking-wider">Date</p><p className="text-sm font-medium text-[#2D2926] mt-1">{format(new Date(selectedDate + 'T00:00:00'), 'EEEE, d MMMM yyyy')}</p></div>
                  <div><p className="text-xs text-[#2D2926]/50 uppercase tracking-wider">Time</p><p className="text-sm font-medium text-[#2D2926] mt-1">{selectedTime}</p></div>
                </div>
                <div className="py-4 border-b border-[#E8DDD3]/30">
                  <p className="text-xs text-[#2D2926]/50 uppercase tracking-wider">Booked for</p>
                  <p className="text-sm font-medium text-[#2D2926] mt-1">{customerName}</p>
                  <p className="text-sm text-[#2D2926]/60">{customerEmail}</p>
                  <p className="text-sm text-[#2D2926]/60">{customerPhone}</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#F5F0E8]/50 rounded-sm border border-[#E8DDD3]/30">
                <h4 className="text-sm font-medium text-[#2D2926] mb-2">Next Steps</h4>
                <ul className="text-sm text-[#2D2926]/60 space-y-1">
                  <li>• Please arrive on time for your appointment</li>
                  <li>• If you need to cancel or reschedule, please give at least 24 hours' notice</li>
                  <li>• Bring any inspiration photos for your design</li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="border border-[#2D2926] text-[#2D2926] px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#2D2926] hover:text-[#FDFBF7] transition-colors text-center">Back to Home</Link>
                <Link to="/account" className="bg-[#2D2926] text-[#FDFBF7] px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors text-center">View My Appointments</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
