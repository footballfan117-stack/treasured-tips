import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Palette, Shield, Clock, User } from 'lucide-react';
import { reviews, services, businessInfo } from '../data/config';
import { FadeIn, FadeInStagger } from '../components/Animations';

export default function Home() {
  const featuredReviews = reviews.slice(0, 6);
  const featuredServices = services.filter(s => s.available).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8] via-[#FDFBF7] to-[#F2E8E2]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <FadeIn><p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-4 font-medium">{businessInfo.name}</p></FadeIn>
              <FadeIn delay={0.1}><h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#2D2926] leading-[1.1] mb-6">Beautiful nails, <span className="italic text-[#6B5B4E]">thoughtfully</span> done.</h1></FadeIn>
              <FadeIn delay={0.2}><p className="text-base md:text-lg text-[#2D2926]/70 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">Personalised nail care and beautiful designs by Amber. Every appointment is tailored to you — with meticulous preparation, attention to detail, and a genuine focus on nail health.</p></FadeIn>
              <FadeIn delay={0.3}><div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/book" className="bg-[#2D2926] text-[#FDFBF7] px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-[#6B5B4E] transition-colors text-center">Book an Appointment</Link>
                <Link to="/services" className="border border-[#2D2926] text-[#2D2926] px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-[#2D2926] hover:text-[#FDFBF7] transition-colors text-center">View Services</Link>
              </div></FadeIn>
            </div>
            <FadeIn delay={0.2} className="relative hidden lg:block">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl shadow-[#2D2926]/5">
                <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=1000&fit=crop" alt="Beautiful manicured nails" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#D4C8BC]/50 rounded-sm" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Amber Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn className="order-2 lg:order-1">
              <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=800&fit=crop" alt="Amber - nail technician" className="w-full h-full object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Meet Amber</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2D2926] mb-6 leading-tight">The person behind your next set</h2>
              <p className="text-[#2D2926]/70 leading-relaxed mb-4">Amber is the nail technician behind Treasured Tips. She's a perfectionist with a genuine passion for what she does — and it shows in every appointment.</p>
              <p className="text-[#2D2926]/70 leading-relaxed mb-4">She takes the time to understand what you want, assess what your nails need, and make sure you leave genuinely happy with the result. Her clients come back because they trust her — and because their nails last.</p>
              <p className="text-[#2D2926]/70 leading-relaxed mb-8">Whether you're after strong, healthy nails with BIAB, a specific design, or simply a relaxing appointment where you're properly listened to — that's what Amber offers.</p>
              <Link to="/about" className="text-sm font-medium text-[#6B5B4E] border-b border-[#6B5B4E]/30 hover:border-[#6B5B4E] transition-colors pb-0.5">Read more about Amber →</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Treasured Tips */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Why Treasured Tips</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2926]">What makes each appointment different</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Shield size={24} />, title: "Meticulous Preparation", desc: "Every appointment starts with careful prep — because beautiful results begin with a solid foundation." },
              { icon: <Heart size={24} />, title: "Personalised Advice", desc: "Amber listens to what you want and makes recommendations based on your nails, lifestyle, and preferences." },
              { icon: <Palette size={24} />, title: "Beautiful Nail Art", desc: "From minimal designs to detailed work — custom nail art created with precision and care." },
              { icon: <Clock size={24} />, title: "Long-Lasting Results", desc: "Clients consistently report their nails last. That comes down to technique, preparation, and quality products." },
              { icon: <Sparkles size={24} />, title: "Nail Health First", desc: "Healthy nails are the priority. Every decision is made with the long-term condition of your nails in mind." },
              { icon: <User size={24} />, title: "One-to-One Experience", desc: "Your full attention, your full appointment. No rushing, no compromises — just you and Amber." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-sm border border-[#E8DDD3]/50 hover:border-[#D4C8BC]/50 transition-all hover:shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#6B5B4E] mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl text-[#2D2926] mb-2">{item.title}</h3>
                <p className="text-sm text-[#2D2926]/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Client Words</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2926]">What clients say about Amber</h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <div key={review.id} className="bg-[#FDFBF7] p-6 md:p-8 rounded-sm border border-[#E8DDD3]/30">
                <div className="flex gap-0.5 mb-4">{[...Array(review.rating)].map((_, i) => (<span key={i} className="text-[#C4A87C] text-sm">★</span>))}</div>
                <p className="text-[#2D2926]/80 leading-relaxed mb-4 italic font-serif text-base">"{review.text}"</p>
                <p className="text-xs text-[#2D2926]/50 uppercase tracking-wider">{review.author}</p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 md:py-28 bg-[#F5F0E8]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Featured Work</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2926]">Recent designs</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop",
            ].map((src, i) => (
              <div key={i} className="aspect-square rounded-sm overflow-hidden hover:opacity-90 transition-opacity">
                <img src={src} alt={`Nail design ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="border border-[#2D2926] text-[#2D2926] px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-[#2D2926] hover:text-[#FDFBF7] transition-colors inline-block">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Services</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2926]">What Amber offers</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div key={service.id} className="border border-[#E8DDD3]/50 p-8 rounded-sm hover:border-[#D4C8BC]/50 transition-all">
                <span className="text-xs uppercase tracking-wider text-[#6B5B4E]/70 font-medium">{service.category}</span>
                <h3 className="font-serif text-xl text-[#2D2926] mt-2 mb-3">{service.name}</h3>
                <p className="text-sm text-[#2D2926]/60 leading-relaxed mb-4 line-clamp-3">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#2D2926]/50">{service.duration} min</span>
                  <span className="text-sm font-medium text-[#2D2926]">{service.price ? `£${service.price}` : 'Price on request'}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="text-sm font-medium text-[#6B5B4E] border-b border-[#6B5B4E]/30 hover:border-[#6B5B4E] transition-colors pb-0.5">View all services →</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-[#2D2926] text-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl text-[#FDFBF7] mb-6 leading-tight">Ready for your next set?</h2>
            <p className="text-[#FDFBF7]/60 mb-8 text-base md:text-lg leading-relaxed">Book your appointment with Amber and experience nail care that's personal, precise, and built around you.</p>
            <Link to="/book" className="inline-block bg-[#FDFBF7] text-[#2D2926] px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-[#F5F0E8] transition-colors">Book an Appointment</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
