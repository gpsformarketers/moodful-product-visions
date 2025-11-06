import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Lisa M.",
    company: "Veganz",
    role: "Marketing Lead",
    text: "Die Bilder von Moodfotografie haben unsere Amazon-Verkäufe um 35% gesteigert. Efi und Moritz verstehen es perfekt, Emotionen einzufangen.",
    rating: 5,
  },
  {
    name: "Thomas K.",
    company: "Amira Homes",
    role: "Gründer",
    text: "Endlich Produktbilder, die unsere Geschichte erzählen! Der Versandservice war super unkompliziert und die Qualität übertrifft alles, was wir bisher hatten.",
    rating: 5,
  },
  {
    name: "Sarah W.",
    company: "Einfach Weniger",
    role: "E-Commerce Manager",
    text: "Professionell, kreativ und verlässlich. Die emotionalen Bilder haben unsere Conversion Rate deutlich verbessert. Absolute Empfehlung!",
    rating: 5,
  },
];

const clientLogos = [
  { name: "Veganz", width: "120px" },
  { name: "Amira Homes", width: "140px" },
  { name: "Einfach Weniger", width: "130px" },
];

const SocialProof = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Client Logos */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-8">
            Vertrauen von großartigen Marken
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {clientLogos.map((logo, index) => (
              <div 
                key={index} 
                className="font-display text-2xl font-bold"
                style={{ width: logo.width }}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center text-foreground">
            Was unsere Kunden sagen
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Echte Ergebnisse, echte Begeisterung
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-border hover:shadow-lg transition-all duration-300 bg-card"
              >
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-accent mb-4" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>

                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} bei {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
