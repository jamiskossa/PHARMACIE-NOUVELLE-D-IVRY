'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ImageItem {
  alt: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

const VisualPresentationSection: React.FC = () => {
  const portraitImage: ImageItem = {
    alt: 'Soins visage et dermo-cosmétique - Pharmacie Nouvelle d\'Ivry',
    title: 'Soins visage & dermo-cosmétique',
    description: 'Les plus grandes marques au meilleur prix',
    href: '/produits?cat=beaute',
    badge: 'Premium',
  };

  const landscapeImages: ImageItem[] = [
    {
      alt: 'Compléments alimentaires et vitalité',
      title: 'Compléments & Vitalité',
      description: 'Boostez votre santé naturellement',
      href: '/produits?cat=nutrition',
    },
    {
      alt: 'Soins bébé et maternité',
      title: 'Univers Bébé & Maman',
      description: 'Tout pour le bien-être de votre famille',
      href: '/produits?cat=bebe',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 auto-rows-fr">
          {/* Colonne gauche : grande image verticale (portrait) */}
          <div className="lg:row-span-2">
            <Link href={portraitImage.href} className="relative block group h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative w-full h-96 sm:h-full aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=800"
                  alt={portraitImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

              {/* Badge */}
              {portraitImage.badge && (
                <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {portraitImage.badge}
                </div>
              )}

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">
                  {portraitImage.title}
                </h3>
                <p className="text-sm sm:text-base opacity-95 drop-shadow-md">
                  {portraitImage.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300"></div>
            </Link>
          </div>

          {/* Colonne droite : 2 images horizontales empilées */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {landscapeImages.map((image, index) => (
              <Link
                key={index}
                href={image.href}
                className="relative block group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative w-full aspect-video">
                  <Image
                    src={
                      index === 0
                        ? 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200'
                        : 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=1200'
                    }
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 drop-shadow-lg">
                    {image.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-95 drop-shadow-md">
                    {image.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualPresentationSection;
