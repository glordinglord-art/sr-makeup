import React from "react";
import Link from "next/link";
import { Check, Clock, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { formatCurrency } from "@/shared/lib/utils";
import { Service } from "../types/service.types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col justify-between h-full border border-rose-100/80 bg-white p-7 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-rose-900/5 hover:border-rose-300 transition-all duration-300 hover:-translate-y-1.5 group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="capitalize text-[11px] bg-rose-50/70 border-rose-200 text-rose-700 font-semibold px-3 py-1">
            {service.category}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <Clock className="h-3.5 w-3.5 text-rose-400" />
            <span>{service.durationMinutes} min</span>
          </div>
        </div>

        <CardHeader className="p-0 mb-3 space-y-2">
          <CardTitle className="font-serif text-2xl text-stone-900 group-hover:text-rose-600 transition-colors">
            {service.title}
          </CardTitle>
          <CardDescription className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {service.description}
          </CardDescription>
        </CardHeader>

        <div className="my-5 pb-5 border-b border-rose-50 flex items-baseline gap-2">
          <span className="font-serif text-3xl font-bold text-stone-900">
            {formatCurrency(service.price)}
          </span>
          <span className="text-xs text-stone-400 font-medium">/ sesión</span>
        </div>

        {service.features && service.features.length > 0 && (
          <ul className="space-y-2.5 mb-8">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                <Check className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link href={`/agendar?service=${service.id}`} className="w-full">
        <Button variant="outline" size="md" className="w-full border-rose-200 text-rose-700 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all font-semibold">
          Reservar este servicio
        </Button>
      </Link>
    </Card>
  );
}
