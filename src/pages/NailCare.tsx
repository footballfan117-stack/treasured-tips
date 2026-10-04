import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { nailCareArticles } from '../data/config';

export default function NailCare() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  return (
    <div>
      <section className="py-16 md:py-24 bg-[#F5F0E8]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Nail Care</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#2D2926] mb-4">Beautiful results start with healthy nails</h1>
            <p className="text-[#2D2926]/60 max-w-2xl mx-auto leading-relaxed">At Treasured Tips, nail health is at the heart of everything. Here's what you need to know about caring for your nails.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#E8DDD3]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-serif text-xl md:text-2xl text-[#2D2926] italic leading-relaxed">"The difference between nails that last and nails that don't almost always comes down to preparation and care."</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-4">
            {nailCareArticles.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border border-[#E8DDD3]/50 rounded-sm overflow-hidden">
                <button onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)} className="w-full text-left p-6 flex items-start gap-4 hover:bg-[#F5F0E8]/30 transition-colors">
                  <span className="text-2xl mt-0.5">{article.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-[#2D2926] mb-1">{article.title}</h3>
                    <p className="text-sm text-[#2D2926]/60 leading-relaxed">{article.excerpt}</p>
                  </div>
                  <ChevronDown size={20} className={`text-[#2D2926]/40 transition-transform mt-1 ${expandedArticle === article.id ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedArticle === article.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-6 pb-6 pl-16 space-y-4">
                        {article.content.map((paragraph, pi) => (<p key={pi} className="text-sm text-[#2D2926]/70 leading-relaxed">{paragraph}</p>))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#F5F0E8]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-serif text-3xl text-[#2D2926] mb-3">Quick care tips</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '🧴', title: 'Cuticle Oil Daily', text: 'Apply cuticle oil every day — even a quick brush before bed makes a real difference.' },
              { emoji: '🧤', title: 'Wear Gloves', text: 'Protect your nails from water and cleaning products by wearing gloves for chores.' },
              { emoji: '💧', title: 'Moisturise', text: 'Keep hands and nails moisturised. Well-hydrated nails look and feel better.' },
              { emoji: '🚫', title: "Don't Pick", text: "If you notice a lift or chip, don't pick at it. Get in touch so it can be fixed properly." },
              { emoji: '📸', title: 'Bring Inspiration', text: 'Save photos of designs you like. Visual references help Amber understand what you want.' },
              { emoji: '⏰', title: 'Book Maintenance', text: 'Come back for infills every 2–3 weeks to keep your nails looking fresh and protected.' },
            ].map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white p-6 rounded-sm border border-[#E8DDD3]/30">
                <span className="text-2xl mb-3 block">{tip.emoji}</span>
                <h4 className="font-medium text-[#2D2926] mb-2">{tip.title}</h4>
                <p className="text-sm text-[#2D2926]/60 leading-relaxed">{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-t border-[#E8DDD3]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-[#2D2926]/40 text-center leading-relaxed">The information on this page is general nail care guidance and is not intended as medical advice.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#2D2926] text-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl text-[#FDFBF7] mb-4">Ready for healthy, beautiful nails?</h2>
          <p className="text-[#FDFBF7]/60 mb-8">Book your appointment with Amber and experience the difference that proper care makes.</p>
          <Link to="/book" className="inline-block bg-[#FDFBF7] text-[#2D2926] px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-[#F5F0E8] transition-colors">Book an Appointment</Link>
        </div>
      </section>
    </div>
  );
}
