
import React, { useState } from 'react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    { src: "/photos/IMG_0055.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0103.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0277.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0339.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0341.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0344.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0355.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0399.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0400.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0422.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0557.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0558.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0854.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0862.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_0866.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_1554.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_1621.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_1635.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_1837.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_1838.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_1909.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_1916.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_2227.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_2625.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_2645.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_2678.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_2682.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_2687.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_4945.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_4957.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_5029.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_5291.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_5316.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_5381.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_5384.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_7434.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_7435.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_7837.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_7908.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_8121.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/IMG_8122.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/b711786f-ecd2-4b8c-bfc5-669b779934ab.jpg", alt: "Charmant Nyungu K." },
    { src: "/photos/03282e52-c887-4914-8c56-14c9fae9bb0f.jpg.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/e1146415-6052-4822-a598-a175ad185db1.jpg.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/ed02d5c3-272b-437e-bfda-08374c980daf.jpg.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/f1374e3a-3aaf-466b-87eb-6bc2f713d5e3.jpg.JPG", alt: "Charmant Nyungu K." },
    { src: "/photos/1a8de437-9f7d-45b2-906e-e3bb4ba82044.PNG", alt: "Charmant Nyungu K." },
    { src: "/photos/614938ff-3e2e-428e-83e3-3dd2aa4f882c.PNG", alt: "Charmant Nyungu K." },
    { src: "/photos/6c89b3c1-ca64-4010-bb52-d0b99e8719f9.PNG", alt: "Charmant Nyungu K." },
  ];

  return (
    <div className="pt-24 bg-white min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl font-black mb-8">Galerie</h1>
          <p className="text-xl text-amber-500 font-bold uppercase tracking-widest mb-4">Moments & Parcours</p>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Découvrez en images le parcours, les rencontres et les moments qui façonnent la vision panafricaine de Charmant Nyungu K.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedImage(photo.src)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-md hover:shadow-2xl transition-all duration-300">
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-sm font-medium">Charmant Nyungu K.</div>
                    <div className="text-amber-400 text-xs">Cliquez pour agrandir</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImage} 
            alt="Charmant Nyungu K." 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Quote Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-slate-700 italic leading-relaxed">
            "Chaque image raconte une histoire, chaque rencontre forge une vision. L'Afrique de demain se construit aujourd'hui, un pas à la fois."
          </blockquote>
          <div className="mt-8 text-amber-600 font-bold uppercase tracking-widest text-sm">— Charmant Nyungu K.</div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;

