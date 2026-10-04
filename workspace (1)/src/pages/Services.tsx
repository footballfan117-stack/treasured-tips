import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Check } from 'lucide-react';
import { services, serviceCategories } from '../data/config';
import { FadeIn } from '../components/Animations';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredServices = activeCategory === 'All' ? services : services.filter(s => s.category === activeCategory);

  return (
    <div>
      <section className="py-16 md:py-24 bg-[#F5F0E8]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Services</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#2D2926] mb-4">What Amber offers</h1>
            <p className="text-[#2D2926]/60 max-w-2xl mx-auto leading-relaxed">Every service is delivered with the same meticulous care and attention to detail.</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-[#E8DDD3]/30 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {serviceCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all ${activeCategory === cat ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-[#F5F0E8] text-[#2D2926]/70 hover:bg-[#E8DDD3]'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredServices.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.05}>
                <div className="border border-[#E8DDD3]/50 rounded-sm p-6 md:p-8 hover:border-[#D4C8BC]/50 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs uppercase tracking-wider text-[#6B5B4E]/70 font-medium bg-[#F5F0E8] px-2 py-0.5 rounded">{service.category}</span>
                        {service.depositRequired && <span className="text-xs text-[#2D2926]/50 flex items-center gap-1"><Check size={12} /> Deposit required</span>}
                      </div>
                      <h3 className="font-serif text-2xl text-[#2D2926] mb-2">{service.name}</h3>
                      <p className="text-sm text-[#2D2926]/60 leading-relaxed max-w-2xl">{service.description}</p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-[#2D2926]/50">
                        <span className="flex items-center gap-1"><Clock size={14} /> {service.duration} min</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-3">
                      <div className="text-right">
                        {service.price ? <span className="font-serif text-2xl text-[#2D2926]">£{service.price}</span> : <span className="text-sm text-[#2D2926]/50 italic">Price to be confirmed</span>}
                      </div>
                      {service.available && (
                        <Link to={`/book?service=${service.id}`} className="bg-[#2D2926] text-[#FDFBF7] px-5 py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors">Book This Service</Link>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 p-6 bg-[#F5F0E8]/50 rounded-sm border border-[#E8DDD3]/30">
            <p className="text-sm text-[#2D2926]/60 leading-relaxed"><strong className="text-[#2D2926]">Not sure which service you need?</strong> That's completely fine. Book a consultation or mention your requirements when booking, and Amber will advise on the best option for your nails.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl text-[#2D2926] mb-4">Ready to book?</h2>
            <p className="text-[#2D2926]/60 mb-8">Choose a service above or browse all available appointments.</p>
            <Link to="/book" className="bg-[#2D2926] text-[#FDFBF7] px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors inline-block">Book an Appointment</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
