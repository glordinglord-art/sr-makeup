import { PortfolioGrid } from "@/features/portfolio";
import { BrandLogo } from "@/shared/components/ui/brand-logo";

export const metadata = {
  title: "Portafolio de Creaciones | Sr.Makeup · Shirley Ram",
  description: "Galería de looks creados por Shirley Ram: novias, eventos sociales, quinceañeras y maquillaje artístico.",
};

export default function PortafolioPage() {
  return (
    <div className="py-16 px-6 max-w-6xl mx-auto space-y-14">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex justify-center mb-3">
          <BrandLogo size="md" showText={false} />
        </div>
        <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
          Galería de Arte
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900">
          Portafolio de Trabajos
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Cada maquillaje es una obra personalizada que resalta la belleza y personalidad de cada clienta. Inspírate para tu próximo evento.
        </p>
      </div>

      <PortfolioGrid />
    </div>
  );
}
