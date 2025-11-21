import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Nachricht ist erforderlich").max(1000)
});
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      contactSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      const {
        supabase
      } = await import("@/integrations/supabase/client");
      const {
        error
      } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });
      if (error) {
        throw error;
      }
      toast({
        title: "Nachricht gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden bei dir."
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "Fehler",
          description: "Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="py-20 bg-gradient-to-br from-muted/30 to-background" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-accent px-6 py-2 rounded-full text-primary font-semibold mb-6">
              🎉 10% Rabatt für Neukunden
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Projekt starten
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Lass uns gemeinsam deine Produkte in Szene setzen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardContent className="p-6">
                  <Mail className="h-6 w-6 text-accent mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">E-Mail</h3>
                  <a href="mailto:hello@moodfotografie.de" className="text-muted-foreground hover:text-accent transition-colors">
                    business@moodfotografie.de
                  </a>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <Phone className="h-6 w-6 text-accent mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">Telefon</h3>
                  <a href="tel:+4930123456789" className="text-muted-foreground hover:text-accent transition-colors">
                    +49 151 23 00 86 36        
                  </a>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <MapPin className="h-6 w-6 text-accent mb-3" />
                  <h3 className="font-semibold mb-2 text-foreground">Standort</h3>
                  <p className="text-muted-foreground">
                    Kaiser-Friedrich-Straße 94
10585 Berlin, Deutschland
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="md:col-span-2 border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" value={formData.name} onChange={e => setFormData({
                      ...formData,
                      name: e.target.value
                    })} className={errors.name ? "border-destructive" : ""} />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} className={errors.email ? "border-destructive" : ""} />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Unternehmen (optional)</Label>
                    <Input id="company" value={formData.company} onChange={e => setFormData({
                    ...formData,
                    company: e.target.value
                  })} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht *</Label>
                    <Textarea id="message" rows={6} value={formData.message} onChange={e => setFormData({
                    ...formData,
                    message: e.target.value
                  })} placeholder="Erzähl uns von deinem Projekt..." className={errors.message ? "border-destructive" : ""} />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? "Wird gesendet..." : "Angebot anfordern"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;