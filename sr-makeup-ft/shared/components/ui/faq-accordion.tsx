"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "¿Con cuánta anticipación debo reservar mi cita?",
    answer:
      "Para novias, grados y quinceañeras, recomendamos reservar con 1 a 3 meses de anticipación, especialmente si tu evento es en fin de semana. Para maquillaje social de fin de semana, te sugerimos asegurar tu espacio de 2 a 3 semanas antes.",
  },
  {
    question: "¿El servicio es en estudio privado o a domicilio?",
    answer:
      "¡Manejamos ambas modalidades! Atendemos en nuestro estudio privado con todas las comodidades y también brindamos servicio VIP a domicilio en Medellín, Oriente Antioqueño y alrededores para novias, producciones o grupos de invitadas.",
  },
  {
    question: "¿Qué es la técnica de 'Piel Blindada' y cuánto dura?",
    answer:
      "Es una técnica avanzada de preparación y sellado de la piel con productos hidrófugos de alta fijación. Garantiza que tu maquillaje permanezca 100% intacto, sin cuartearse y resistente a lágrimas, calor, humedad y sudor por más de 16 horas.",
  },
  {
    question: "¿Qué marcas y productos utiliza Shirley Ram?",
    answer:
      "Trabajamos exclusivamente con cosmética internacional de alta gama y dermatológicamente testeada: Charlotte Tilbury, NARS, Dior Backstage, Huda Beauty, MAC, Rare Beauty y fijadores de grado editorial profesional.",
  },
  {
    question: "¿Qué debo tener en cuenta antes de mi cita?",
    answer:
      "Venir con el rostro completamente limpio, libre de maquillaje y máscara de pestañas. Te recomendamos una rutina de hidratación los días previos y traer puesto una blusa de botones o cremallera para no estropear el peinado y maquillaje al cambiarte.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl border border-rose-100 bg-white/90 backdrop-blur-xs overflow-hidden transition-all shadow-xs"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-stone-900 hover:text-rose-600 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-stone-400 shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180 text-rose-500"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-rose-50/80 mt-1 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

