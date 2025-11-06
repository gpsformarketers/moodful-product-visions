import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const portfolioImages = [
  { src: portfolio1, alt: "Emotionale Kaffee Produktfotografie" },
  { src: portfolio2, alt: "Lifestyle Keramik Fotografie" },
  { src: portfolio3, alt: "Premium Skincare Produktbilder" },
  { src: portfolio4, alt: "Moderne Tech Accessoire Fotografie" },
  { src: portfolio5, alt: "Food Produktfotografie" },
  { src: portfolio6, alt: "Fashion Accessoire Fotografie" },
];

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-background" id="portfolio">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Unsere Arbeit
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecke, wie wir Produkten Leben einhauchen
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Portfolio Detail"
                className="w-full h-auto rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Portfolio;
