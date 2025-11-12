import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Camera, ShoppingCart, Package } from "lucide-react";
import { useState } from "react";
import serviceAmazon from "@/assets/service-amazon.jpg";
import serviceEcommerce from "@/assets/service-ecommerce.jpg";
import serviceVersand from "@/assets/service-versand.jpg";

const services = [
  {
    icon: ShoppingCart,
    title: "Amazon FBA Optimierung",
    description: "Perfekte Bildsets für Amazon: Hauptbild, Infografiken und Lifestyle-Shots, die deine Produkte hervorheben und die Conversion steigern.",
    image: serviceAmazon,
  },
  {
    icon: Camera,
    title: "E-Commerce Fotografie",
    description: "Emotionale Produktbilder mit Storytelling für Online Shops. Wir schaffen Bildwelten, die deine Marke einzigartig machen und Käufer begeistern.",
    image: serviceEcommerce,
  },
  {
    icon: Package,
    title: "Versandservice",
    description: "Schick uns dein Produkt – wir liefern fertige Bildwelten. Kein Aufwand für dich, professionelle Ergebnisse für deinen Shop. Einfach und unkompliziert.",
    image: serviceVersand,
  },
];

const Services = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-background" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Maßgeschneiderte Produktfotografie für deinen Erfolg im E-Commerce
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 group"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-64 overflow-hidden cursor-pointer">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <service.icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl w-full p-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-auto object-contain max-h-[90vh]"
                  />
                </DialogContent>
              </Dialog>
              
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-accent/10 border border-accent/20 rounded-2xl px-8 py-6">
            <p className="text-lg font-semibold text-foreground mb-2">
              Kein Agenturaufschlag • Keine Lizenzgebühren • Faire Preise
            </p>
            <p className="text-muted-foreground">
              Du bekommst professionelle Ergebnisse ohne versteckte Kosten
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
