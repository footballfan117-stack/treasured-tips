import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages, galleryCategories } from '../data/config';
import { FadeIn } from '../components/Animations';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filteredImages = activeFilter === 'All' ? galleryImages : galleryImages.filter(img => img.category === activeFilter);

  return (
    <div>
      <section className="py-16 md:py-24 bg-[#F5F0E8]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B5B4E] mb-3 font-medium">Gallery</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#2D2926] mb-4">Recent work</h1>
            <p className="text-[#2D2926]/60 max-w-2xl mx-auto leading-relaxed">A selection of recent designs by Amber. Every set is tailored to the individual client.</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-6 bg-white border-b border-[#E8DDD3]/30 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {galleryCategories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all ${activeFilter === cat ? 'bg-[#2D2926] text-[#FDFBF7]' : 'bg-[#F5F0E8] text-[#2D2926]/70 hover:bg-[#E8DDD3]'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filteredImages.map((image, index) => (
              <div key={image.id} className="mb-4 break-inside-avoid cursor-pointer group img-zoom" onClick={() => setLightboxIndex(index)}>
                <div className={`relative overflow-hidden rounded-sm ${index % 4 === 0 ? 'aspect-[3/4]' : index % 4 === 1 ? 'aspect-square' : index % 4 === 2 ? 'aspect-[4/5]' : 'aspect-[3/4]'} bg-[#F5F0E8]`}>
                  {image.src ? (
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[#6B5B4E]/30 text-sm text-center px-4">{image.alt}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#2D2926]/0 group-hover:bg-[#2D2926]/20 transition-all duration-300 flex items-end">
                    <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {image.caption && <p className="text-white text-sm font-medium">{image.caption}</p>}
                      <p className="text-white/70 text-xs mt-1">{image.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredImages.length === 0 && <div className="text-center py-16"><p className="text-[#2D2926]/50">No images in this category yet.</p></div>}
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 text-white/80 hover:text-white z-10"><X size={28} /></button>
          <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length); }} className="absolute left-4 text-white/80 hover:text-white z-10"><ChevronLeft size={36} /></button>
          <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % filteredImages.length); }} className="absolute right-4 text-white/80 hover:text-white z-10"><ChevronRight size={36} /></button>
          <div className="max-w-3xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            {filteredImages[lightboxIndex].src ? (
              <img src={filteredImages[lightboxIndex].src} alt={filteredImages[lightboxIndex].alt} className="max-h-[80vh] w-auto object-contain" />
            ) : (
              <div className="aspect-square bg-[#F5F0E8] flex items-center justify-center w-96">
                <p className="text-[#6B5B4E]/60 text-lg">{filteredImages[lightboxIndex].alt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
