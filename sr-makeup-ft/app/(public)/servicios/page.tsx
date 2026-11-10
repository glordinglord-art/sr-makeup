import { ServiceCard } from "@/features/services";
import { Service } from "@/features/services/types/service.types";
import { BrandLogo } from "@/shared/components/ui/brand-logo";

export const metadata = {
  title: "Servicios & Precios | Sr.Makeup · Shirley Ram",
  description: "Catálogo completo de servicios de maquillaje profesional y artístico por Shirley Ram.",
};

const SERVICES_DATA: Service[] = [
  {
    id: "social",
    title: "Maquillaje Social & Fiesta",
    slug: "maquillaje-social",
    description: "Look deslumbrante ideal para eventos, grados, galas o invitadas a bodas. Acabado de larga duración con piel blindada.",
    price: 180000,
    durationMinutes: 60,
    category: "social",
    features: [
      "Preparación intensiva de piel según tu biotipo",
      "Piel luminosa o mate con fijación de 16 horas",
      "Pestañas postizas incluidas en tira o punto a punto",
      "Diseño de cejas y labios satinados o mate",
    ],
    isActive: true,
  },
  {
    id: "novias",
    title: "Maquillaje para Novias (Bridal Glam)",
    slug: "maquillaje-novias",
    description: "La experiencia nupcial más completa: piel blindada resistente a emociones, diseño atemporal y kit de retoque.",
    price: 320000,
    durationMinutes: 90,
    category: "novias",
    features: [
      "Skincare previo con sueros hidratantes de lujo",
      "Piel blindada 100% a prueba de agua y lágrimas",
      "Pestañas de efecto natural o visón según tu mirada",
      "Mini kit de retoque con polvo, labial y aplicador",
      "Acompañamiento fotográfico durante el arreglo",
    ],
    isActive: true,
  },
  {
    id: "artistico",
    title: "Maquillaje Artístico & Editorial",
    slug: "maquillaje-artistico",
    description: "Creaciones de fantasía, producciones de moda, sesiones de fotografía, disfraces de alta costura o conceptos creativos.",
    price: 220000,
    durationMinutes: 90,
    category: "artistico",
    features: [
      "Diseño conceptual personalizado previo al evento",
      "Pigmentos neón, acuacolores y fijadores especiales",
      "Incrustación de pedrería, perlas, láminas de oro o glitter",
      "Resistente a luces de estudio y cámaras 4K",
    ],
    isActive: true,
  },
  {
    id: "quinceaneras",
    title: "Quinceañeras Soñadas",
    slug: "quinceaneras",
    description: "Un estilo dulce, fresco y sofisticado que resalta la juventud y brillo en su noche inolvidable.",
    price: 240000,
    durationMinutes: 75,
    category: "quinceaneras",
    features: [
      "Maquillaje de alta definición para sesión de fotos y vals",
      "Iluminación suave y toques de glitter delicado",
      "Pestañas de apertura natural",
      "Fijación ultra duradera para toda la fiesta",
    ],
    isActive: true,
  },
  {
    id: "automaquillaje",
    title: "Taller Personalizado de Automaquillaje",
    slug: "taller-automaquillaje",
    description: "Clase personalizada e individual donde aprenderás a sacarte el máximo provecho con tus propios cosméticos.",
    price: 250000,
    durationMinutes: 180,
    category: "automaquillaje",
    features: [
      "Diagnóstico de tu tipo de piel, subtono y forma de ojos",
      "Depuración y asesoría de tu cosmetiquera personal",
      "Práctica paso a paso de look de día y transformación a noche",
      "Guía digital en PDF con productos recomendados según tu presupuesto",
    ],
    isActive: true,
  },
];

export default function ServiciosPage() {
  return (
    <div className="py-16 px-6 max-w-6xl mx-auto space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex justify-center mb-3">
          <BrandLogo size="md" showText={false} />
        </div>
        <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
          Catálogo & Tarifas
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900">
          Servicios de Maquillaje
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Cada servicio incluye productos internacionales de alta gama (Charlotte Tilbury, Huda Beauty, Nars, Dior) y técnicas avanzadas de preparación de piel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
