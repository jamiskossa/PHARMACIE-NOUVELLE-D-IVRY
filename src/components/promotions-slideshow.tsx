'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PromoSlide {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  code?: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

const promoSlides: PromoSlide[] = [
  {
    id: 1,
    title: 'Promotions Flash',
    subtitle: 'Retrouvez le meilleur des promotions de parapharmacie',
    discount: '-20%',
    code: 'HAPPY20',
    imageUrl: 'https://images.unsplash.com/photo-1580281780460-82d277b0e3f8?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Voir les offres',
    ctaLink: '/produits?promo=true',
  },
  {
    id: 2,
    title: 'Soins du Visage Premium',
    subtitle: 'La Roche-Posay, Vichy, Avène… jusqu\'à',
    discount: '-15%',
    imageUrl: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Découvrir',
    ctaLink: '/produits?cat=beaute',
  },
  {
    id: 3,
    title: 'Compléments & Vitalité',
    subtitle: 'Boostez votre forme avec -25% sur',
    discount: 'sélection',
    imageUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Profiter maintenant',
    ctaLink: '/produits?cat=nutrition',
  },
  {
    id: 4,
    title: 'Univers Bébé & Maman',
    subtitle: 'Tout pour votre famille à prix doux',
    discount: '-30%',
    code: 'BEBE30',
    imageUrl: 'https://images.unsplash.com/photo-1602829961351-1eb698e5d983?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'Voir les promos bébé',
    ctaLink: '/produits?cat=bebe',
  },
];

export function PromotionsSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promoSlides.length);
  };

  return (
    <section
      className="relative w-full h-[60vh] min-h-[400px] max-h-[700px] overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {promoSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15"></div>

            {/* Content */}
            <div className="relative h-full flex items-center pl-5 sm:pl-10 lg:pl-20">
              <div className="max-w-2xl">
                {/* Discount Badge */}
                {slide.discount && (
                  <div className="inline-block bg-red-500 text-white text-2xl sm:text-3xl font-black px-6 sm:px-8 py-2 rounded-full mb-4 shadow-lg">
                    {slide.discount}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-white opacity-95 mb-6 drop-shadow-md">
                  {slide.subtitle}
                </p>

                {/* Promo Code */}
                {slide.code && (
                  <div className="text-base sm:text-lg text-white mb-8 font-semibold">
                    Code : <span className="font-black text-yellow-300">{slide.code}</span>
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-full hover:bg-slate-100 transition-all hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                  {slide.ctaText}
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2 z-20 bg-white/25 hover:bg-white/50 text-white rounded-full p-3 sm:p-4 transition-all w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 z-20 bg-white/25 hover:bg-white/50 text-white rounded-full p-3 sm:p-4 transition-all w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {promoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full border-2 border-white ${
              index === currentIndex
                ? 'bg-white w-4 h-4 scale-125'
                : 'bg-transparent w-3 h-3 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
