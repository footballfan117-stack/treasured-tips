import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import { businessInfo } from '../data/config';
import { FadeIn } from '../components/Animations';

export default function Contact() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-[#F5F0E8]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Contact</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#2D2926] mb-4">Get in touch</h1>
            <p className="text-[#2D2926]/60 max-w-2xl mx-auto leading-relaxed">Have a question about a service, need advice, or ready to book? Here's how to reach Amber.</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn>
              <h2 className="font-serif text-2xl text-[#2D2926] mb-6">Contact Amber</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center flex-shrink-0"><Phone size={18} className="text-[#6B5B4E]" /></div>
                  <div><h4 className="text-sm font-medium text-[#2D2926]">Phone</h4>{businessInfo.phone ? <a href={`tel:${businessInfo.phone}`} className="text-sm text-[#2D2926]/60 hover:text-[#6B5B4E]">{businessInfo.phone}</a> : <p className="text-sm text-[#2D2926]/40 italic">To be configured</p>}</div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center flex-shrink-0"><Mail size={18} className="text-[#6B5B4E]" /></div>
                  <div><h4 className="text-sm font-medium text-[#2D2926]">Email</h4>{businessInfo.email ? <a href={`mailto:${businessInfo.email}`} className="text-sm text-[#2D2926]/60 hover:text-[#6B5B4E]">{businessInfo.email}</a> : <p className="text-sm text-[#2D2926]/40 italic">To be configured</p>}</div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-[#6B5B4E]" /></div>
                  <div><h4 className="text-sm font-medium text-[#2D2926]">Location</h4>{businessInfo.address ? <p className="text-sm text-[#2D2926]/60">{businessInfo.address}</p> : <p className="text-sm text-[#2D2926]/40 italic">To be configured</p>}</div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center flex-shrink-0"><Clock size={18} className="text-[#6B5B4E]" /></div>
                  <div>
                    <h4 className="text-sm font-medium text-[#2D2926]">Opening Hours</h4>
                    <div className="mt-1 space-y-1">{businessInfo.openingHours.map(oh => (<p key={oh.day} className="text-sm text-[#2D2926]/60"><span className="inline-block w-24">{oh.day}</span><span>{oh.hours}</span></p>))}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center flex-shrink-0"><Instagram size={18} className="text-[#6B5B4E]" /></div>
                  <div><h4 className="text-sm font-medium text-[#2D2926]">Social</h4><a href="#" className="text-sm text-[#2D2926]/60 hover:text-[#6B5B4E]">Follow on Instagram</a></div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-serif text-2xl text-[#2D2926] mb-6">What would you like to do?</h2>
              <div className="space-y-4">
                <Link to="/book" className="block p-6 border border-[#E8DDD3]/50 rounded-sm hover:border-[#D4C8BC]/50 transition-all group">
                  <h3 className="font-serif text-lg text-[#2D2926] mb-2">Book an Appointment</h3>
                  <p className="text-sm text-[#2D2926]/60 leading-relaxed">Ready to book? Choose your service, pick a date and time, and secure your appointment with Amber.</p>
                  <span className="text-sm text-[#6B5B4E] font-medium mt-3 inline-block group-hover:underline">Book Now →</span>
                </Link>
                <Link to="/services" className="block p-6 border border-[#E8DDD3]/50 rounded-sm hover:border-[#D4C8BC]/50 transition-all group">
                  <h3 className="font-serif text-lg text-[#2D2926] mb-2">View Services</h3>
                  <p className="text-sm text-[#2D2926]/60 leading-relaxed">Browse the full range of services available. Not sure which is right for you? Amber will advise.</p>
                  <span className="text-sm text-[#6B5B4E] font-medium mt-3 inline-block group-hover:underline">View Services →</span>
                </Link>
                <Link to="/nail-care" className="block p-6 border border-[#E8DDD3]/50 rounded-sm hover:border-[#D4C8BC]/50 transition-all group">
                  <h3 className="font-serif text-lg text-[#2D2926] mb-2">Nail Care Advice</h3>
                  <p className="text-sm text-[#2D2926]/60 leading-relaxed">Learn about nail health, preparation, and how to care for your nails between appointments.</p>
                  <span className="text-sm text-[#6B5B4E] font-medium mt-3 inline-block group-hover:underline">Read More →</span>
                </Link>
              </div>
              <div className="mt-8 p-6 bg-[#F5F0E8]/50 rounded-sm border border-[#E8DDD3]/30">
                <h4 className="font-medium text-[#2D2926] mb-3">Common Questions</h4>
                <div className="space-y-3 text-sm text-[#2D2926]/60">
                  <p><strong className="text-[#2D2926]">How do I book?</strong> Use the online booking system or get in touch directly.</p>
                  <p><strong className="text-[#2D2926]">How long does BIAB last?</strong> Typically 2–3 weeks before an infill is needed.</p>
                  <p><strong className="text-[#2D2926]">What if I'm not sure what I want?</strong> No problem — Amber will help you decide at your appointment.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
