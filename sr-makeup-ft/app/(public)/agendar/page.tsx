import { Suspense } from "react";
import { BookingFlow } from "@/features/appointments";
import { BrandLogo } from "@/shared/components/ui/brand-logo";

export const metadata = {
  title: "Agendar Cita VIP | Sr.Makeup · Shirley Ram",
  description: "Reserva tu cita de maquillaje y peinado para novias, eventos sociales, quinceañeras o clases.",
};

export default function AgendarPage() {
  return (
    <div className="py-12 sm:py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center">
          <BrandLogo size="md" showText={false} />
        </div>
        <Suspense fallback={<div className="text-center py-12 text-sm text-stone-500">Cargando agenda...</div>}>
          <BookingFlow />
        </Suspense>
      </div>
    </div>
  );
}
