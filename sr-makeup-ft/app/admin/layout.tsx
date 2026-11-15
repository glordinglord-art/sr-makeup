import React from "react";
import { AdminShell } from "./admin-shell";

export const metadata = {
  title: "Super Admin | Sr.Makeup · Shirley Ram",
  description: "Panel privado de gestión de citas y portafolio para Shirley Ram.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
