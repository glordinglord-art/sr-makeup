import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Card } from "@/shared/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Valentina Montoya",
    role: "Novia · Boda en Rionegro",
    comment:
      "¡Shirley es una artista mágica! Lloré durante toda la ceremonia, bailé toda la noche y a las 4:00 AM mi piel seguía perfecta y radiante. Todas mis invitadas me preguntaron quién me había maquillado. Infinitas gracias por tu paciencia y dulzura.",
    rating: 5,
    date: "Hace 2 semanas",
  },
  {
    name: "Camila Echeverri",
    role: "Graduada · Maquillaje Social Glam",
    comment:
      "Tengo piel grasa y siempre me daba miedo que la base se me derritiera. La técnica de piel blindada de Shirley es de otro nivel, cero brillos molestos y un acabado súper natural en fotos. ¡Ya tengo fecha para mi próximo evento!",
    rating: 5,
    date: "Hace 1 mes",
  },
  {
    name: "Dra. Natalia Gómez",
    role: "Alumna · Taller de Automaquillaje",
    comment:
      "Tomé la clase personalizada individual y aprendí más en 3 horas con Shirley que en años viendo tutoriales. Me enseñó a usar lo que ya tenía y me dio tips increíbles para mi tipo de ojos.",
    rating: 5,
    date: "Hace 3 semanas",
  },
];

export function TestimonialsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t, idx) => (
        <Card
          key={idx}
          className="flex flex-col justify-between p-7 rounded-3xl border border-rose-100 bg-white shadow-sm hover:shadow-lg hover:border-rose-300 transition-all duration-300"
        >
          <div className="space-y-3">
            {/* 5 Estrellitas doradas */}
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400" />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
              "{t.comment}"
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-rose-50 flex items-center justify-between">
            <div>
              <h5 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <span>{t.name}</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              </h5>
              <span className="text-[11px] text-rose-500 font-medium">{t.role}</span>
            </div>
            <span className="text-[10px] text-stone-400">{t.date}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

