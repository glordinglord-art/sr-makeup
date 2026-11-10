import Link from "next/link";
import {
  Sparkles,
  Calendar,
  ArrowRight,
  Star,
  Heart,
  CheckCircle2,
  ShieldCheck,
  Palette,
  Camera,
  Award,
  Clock,
  Sparkle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { BrandLogo } from "@/shared/components/ui/brand-logo";
import { PortfolioGrid, BeforeAfterSlider } from "@/features/portfolio";
import { ServiceCard } from "@/features/services";
import { TestimonialsSection } from "@/features/reviews";
import { FaqAccordion } from "@/shared/components/ui/faq-accordion";
import { BUSINESS_CONFIG } from "@/shared/constants/business";
import { Service } from "@/features/services/types/service.types";

const FEATURED_SERVICES: Service[] = [
  {
    id: "novias",
    title: "Maquillaje de Novias (Bridal Glam)",
    slug: "maquillaje-novias",
    description: "Look atemporal y sofisticado diseñado para lucir radiante en vivo y en fotografía HD con piel blindada a prueba de lágrimas.",
    price: 320000,
    durationMinutes: 90,
    category: "novias",
    features: [
      "Skincare intensivo preparatorio con sueros de lujo",
      "Piel blindada 100% resistente a lágrimas y emociones",
      "Pestañas personalizadas según tu mirada",
      "Mini kit de retoque para el día de la boda",
    ],
    isActive: true,
  },
  {
    id: "social",
    title: "Maquillaje Social & Fiesta",
    slug: "maquillaje-social",
    description: "El balance perfecto entre sofisticación y luminosidad para tus eventos, grados, galas o invitadas a bodas.",
    price: 180000,
    durationMinutes: 60,
    category: "social",
    features: [
      "Piel luminosa o mate con fijación de 16 horas",
      "Pestañas postizas incluidas",
      "Diseño de ojos ahumados o corte suave a tu elección",
    ],
    isActive: true,
  },
  {
    id: "artistico",
    title: "Maquillaje Artístico & Editorial",
    slug: "maquillaje-artistico",
    description: "Creaciones de fantasía, pasarela, sesiones de fotos y conceptos creativos llenos de color, pedrería y detalle.",
    price: 220000,
    durationMinutes: 90,
    category: "artistico",
    features: [
      "Técnicas avanzadas de color y grafismo",
      "Aplicación de pedrería, perlas o glitter fino",
      "Alta definición para cámaras y luces profesionales",
    ],
    isActive: true,
  },
];

export default function HomePage() {
  const whatsappBookingUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hola%20Shirley!%20Vengo%20de%20tu%20p%C3%A1gina%20web%20y%20quisiera%20consultar%20disponibilidad%20para%20un%20maquillaje%20✨`;

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION DE LUJO */}
      <section className="relative pt-12 md:pt-20 pb-16 px-6 overflow-hidden">
        {/* Resplandores suaves de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-amber-100/35 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Columna Texto */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              {/* Badge oficial */}
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/90 bg-rose-50/80 px-4 py-1.5 text-xs font-semibold text-rose-700 backdrop-blur-sm shadow-xs">
                <Award className="h-3.5 w-3.5 text-rose-500" />
                <span>Shirley Ram · Técnica Profesional con +5 Años de Experiencia</span>
              </div>

              {/* Título Principal */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight text-stone-900 leading-[1.12]">
                Resalta tu belleza con <span className="italic font-normal text-rose-600 font-serif">estilo</span> y elegancia
              </h1>

              {/* Bio en viñetas elegantes */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 pt-1">
                {BUSINESS_CONFIG.bioItems.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-medium text-stone-700 bg-white/90 border border-rose-100/80 px-3.5 py-1.5 rounded-full shadow-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Especialista en novias, eventos sociales, quinceañeras y producciones artísticas en Medellín. Más de 5 años diseñando la piel perfecta con cosmética internacional y técnicas de piel blindada.
              </p>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link href="/agendar" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-rose-300/40 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 gap-2 font-semibold">
                    <Calendar className="h-4 w-4" />
                    <span>Agendar Cita Online</span>
                  </Button>
                </Link>

                <a
                  href={whatsappBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-rose-200 hover:bg-rose-50/70 text-rose-800 font-semibold">
                    Escribir al WhatsApp (+57 317 611 2095)
                  </Button>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-rose-100/80 flex items-center justify-center lg:justify-start gap-8 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-rose-500" />
                  <span>Piel Blindada 16h+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Productos de Alta Gama</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                  <span>Atención VIP</span>
                </div>
              </div>
            </div>

            {/* Columna Imagen / Badge de Marca */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Marco con foto editorial */}
                <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl shadow-rose-900/10 border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop"
                    alt="Maquillaje profesional por Shirley Ram"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-rose-300 block mb-1">
                      Look Destacado
                    </span>
                    <h3 className="font-serif text-2xl font-bold">
                      Glam de Noche & Piel Glow
                    </h3>
                    <p className="text-xs text-stone-200 mt-1">
                      Por Shirley Ram · Sr.Makeup
                    </p>
                  </div>
                </div>

                {/* Insignia Flotante con el logo idéntico a su perfil de Instagram */}
                <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-3">
                  <BrandLogo size="md" showText={false} />
                  <div>
                    <span className="font-serif text-sm font-bold text-stone-900 block leading-tight">
                      Sr.Makeup
                    </span>
                    <span className="text-[10px] text-rose-500 font-semibold uppercase tracking-wider">
                      Shirley Ram
                    </span>
                  </div>
                </div>

                {/* Badge de Instagram Flotante */}
                <a
                  href={BUSINESS_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -bottom-5 -right-5 bg-stone-900 text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 hover:bg-stone-800 transition-colors group cursor-pointer"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                    <Camera className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-stone-400 block leading-none">Sígueme en IG</span>
                    <span className="text-xs font-semibold text-white group-hover:text-rose-300 transition-colors">
                      @{BUSINESS_CONFIG.instagram}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER (+5 AÑOS DE EXPERIENCIA) */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="rounded-3xl bg-white border border-rose-100/80 p-8 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {BUSINESS_CONFIG.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-rose-600 block">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-stone-600">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SECCIÓN SOBRE SHIRLEY RAM */}
      <section id="sobre-mi" className="px-6 max-w-6xl mx-auto w-full">
        <div className="rounded-3xl bg-gradient-to-br from-[#fff7f8] via-[#fdf2f4] to-[#faebee] border border-rose-100/90 p-8 sm:p-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop"
                  alt="Shirley Ram Maquilladora Profesional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white px-4 py-2 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-2 text-xs font-bold text-rose-600">
                <Award className="h-4 w-4" />
                <span>5 Años de Experiencia</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Conoce a tu Maquilladora</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-snug">
              Shirley Ram · Técnica Profesional en Maquillaje
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Con más de <strong>5 años de trayectoria profesional</strong> en la industria de la belleza, Shirley Ram ha perfeccionado el arte de realzar la armonía facial de cada mujer respetando su esencia y estilo propio.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Certificada como <strong>Técnica Profesional</strong>, su trabajo combina la ciencia del cuidado de la piel con técnicas internacionales de <strong>Piel Blindada</strong> (resistente a lágrimas, calor y más de 16 horas de evento), garantizando que tu maquillaje luzca impecable tanto en persona como en cámara 4K.
            </p>

            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-stone-700 text-left">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Novias & Bodas de Destino
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Maquillaje Social & Gala
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Editorial & Fantasía Artística
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Clases de Automaquillaje VIP
              </span>
            </div>

            <div className="pt-4 flex justify-center md:justify-start">
              <a
                href={whatsappBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="md" className="gap-2 bg-stone-900 hover:bg-stone-800 text-white">
                  <span>Hablar directamente con Shirley</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN SLIDER INTERACTIVO ANTES Y DESPUÉS */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
            Transformaciones Reales
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-2">
            El Poder de la Piel Blindada
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm">
            Compara la naturalidad, unificación de tono y luminosidad lograda con técnicas profesionales.
          </p>
        </div>

        <BeforeAfterSlider />
      </section>

      {/* 5. SECCIÓN DE SERVICIOS Y TARIFAS */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
              Experiencias & Precios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Servicios Destacados
            </h2>
          </div>
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700 mt-3 sm:mt-0"
          >
            Ver todos los servicios y tarifas
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 6. SECCIÓN DE PORTAFOLIO */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
            Galería de Arte
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-3">
            Creaciones Recientes
          </h2>
          <p className="text-stone-500 text-sm">
            Explora algunos de nuestros looks de novias, social, quinceañeras y artístico.
          </p>
        </div>

        <PortfolioGrid />

        <div className="text-center mt-12">
          <Link href="/portafolio">
            <Button variant="outline" size="lg" className="border-rose-200 hover:bg-rose-50 text-rose-700 font-semibold">
              Explorar Portafolio Completo
            </Button>
          </Link>
        </div>
      </section>

      {/* 7. RESEÑAS Y TESTIMONIOS */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
            Opiniones de Clientas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-2">
            Experiencias Inolvidables
          </h2>
          <p className="text-stone-500 text-sm">
            Lo que dicen novias, graduadas y clientas que han confiado su día especial en Shirley Ram.
          </p>
        </div>

        <TestimonialsSection />
      </section>

      {/* 8. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
            Dudas Comunes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-2">
            Preguntas Frecuentes
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm">
            Todo lo que necesitas saber antes de tu cita o evento especial.
          </p>
        </div>

        <FaqAccordion />
      </section>

      {/* 9. BANNER FINAL DE AGENDAMIENTO */}
      <section className="px-6 max-w-6xl mx-auto w-full">
        <div className="rounded-3xl bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 p-8 sm:p-14 text-white text-center shadow-xl shadow-rose-500/20 relative overflow-hidden">
          <div className="relative z-10 space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold bg-white/20 px-3.5 py-1 rounded-full inline-block backdrop-blur-xs">
              Agenda Abierta · Medellín & Alrededores
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">
              ¿Lista para lucir inolvidable en tu evento?
            </h2>
            <p className="text-rose-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Las fechas para novias y fines de semana se llenan con anticipación. Asegura tu cita con Shirley Ram hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/agendar" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-rose-700 hover:bg-rose-50 shadow-none font-semibold">
                  Reservar Mi Cita Ahora
                </Button>
              </Link>
              <a
                href={whatsappBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 font-semibold">
                  Escribir a Shirley (+57 317 611 2095)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
