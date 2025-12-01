import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";

const images = [
  { src: gallery1, alt: "Tagliatelles sauce crémeuse et filet mignon" },
  { src: gallery2, alt: "Filet de bœuf sauce moutarde et légumes" },
  { src: gallery3, alt: "Linguine bolognaise maison" },
  { src: gallery4, alt: "Rigatoni au bœuf et burrata" },
  { src: gallery5, alt: "Millefeuille aux fruits rouges" },
  { src: gallery6, alt: "Tiramisu maison aux fraises" },
  { src: gallery7, alt: "Sélection de plats italiens" },
  { src: gallery8, alt: "Vue d'ensemble des spécialités" },
  { src: gallery9, alt: "Assortiment de plats signature" },
  { src: gallery10, alt: "Pizza bresaola et arugula" },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-wine/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-medium">
            Galerie
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold">
            Nos <span className="italic text-accent">Créations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'art culinaire de Morello à travers nos plats préparés avec passion
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm text-foreground font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Image agrandie"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
