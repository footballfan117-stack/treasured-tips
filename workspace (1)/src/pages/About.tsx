import React from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, Sparkles, Shield } from 'lucide-react';
import { FadeIn, FadeInStagger } from '../components/Animations';

export default function About() {
  return (
    <div>
      <section className="py-20 md:py-28 bg-[#F5F0E8]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&h=800&fit=crop" alt="Amber" className="w-full h-full object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">About Amber</p>
              <h1 className="font-serif text-4xl md:text-5xl text-[#2D2926] mb-8 leading-tight">The care behind every set</h1>
              <div className="space-y-5 text-[#2D2926]/70 leading-relaxed">
                <p>Every appointment at Treasured Tips is about more than the finished set. Amber takes the time to understand what you want, assess what your nails need, and make sure you leave genuinely happy with the result.</p>
                <p>She's a perfectionist — and her clients will tell you that themselves. But it's not about being fussy for the sake of it. It's about caring enough to get the details right. The preparation, the application, the shape, the finish. Every step matters.</p>
                <p>Amber listens carefully. If you have a specific idea, she'll bring it to life. If you're not sure what you want, she'll help you figure it out — making recommendations based on your nails, your lifestyle, and what will genuinely suit you.</p>
                <p>Her clients come back because they trust her. Because their nails last. Because they feel looked after. That's what Treasured Tips is about.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Amber's Approach</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2926]">How each appointment works</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeInStagger>
              {[
                { icon: <Heart size={24} />, title: "Listening First", text: "Before anything else, Amber takes time to understand what you're looking for. She asks questions, looks at your nails, and makes sure you're both on the same page." },
                { icon: <Shield size={24} />, title: "Careful Preparation", text: "Preparation is where longevity begins. Amber's meticulous approach to nail prep means your manicure lasts longer, looks better, and protects your natural nails." },
                { icon: <Sparkles size={24} />, title: "Precision Application", text: "Every layer is applied with care. Amber takes her time to ensure clean, even application — whether that's BIAB, gel colour, or intricate nail art." },
                { icon: <User size={24} />, title: "Your Comfort", text: "Amber wants you to feel relaxed and at ease. Her clients consistently mention how comfortable and welcome they feel — from the very first appointment." },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-[#FDFBF7] rounded-sm border border-[#E8DDD3]/30">
                  <div className="w-12 h-12 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#6B5B4E] mb-4">{item.icon}</div>
                  <h3 className="font-serif text-xl text-[#2D2926] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#2D2926]/60 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F5F0E8]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2926] mb-6">Built on trust</h2>
            <p className="text-[#2D2926]/70 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">Amber's clients don't just come back because their nails look good. They come back because they trust her.</p>
            <blockquote className="font-serif text-xl md:text-2xl italic text-[#6B5B4E] mb-4">"I genuinely can't imagine trusting anyone else with my nails."</blockquote>
            <p className="text-sm text-[#2D2926]/50">— Verified client</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#2D2926] text-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl text-[#FDFBF7] mb-4">Book with Amber</h2>
            <p className="text-[#FDFBF7]/60 mb-8">Experience the care and attention that keeps clients coming back.</p>
            <Link to="/book" className="inline-block bg-[#FDFBF7] text-[#2D2926] px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-[#F5F0E8] transition-colors">Book an Appointment</Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
