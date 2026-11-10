# 💄 Sr.Makeup Studio · Monorepo

Sistema integral de gestión de citas, portafolio y presencia digital para **Shirley Ram (Sr.Makeup)** — *Técnica Profesional en Maquillaje*.

---

## 📁 Estructura del Proyecto

```text
sr-makeup/
├── sr-makeup-ft/    # Frontend: Next.js (App Router, Tailwind CSS, Screaming Architecture)
└── sr-makeup-bk/    # Backend: NestJS (Hexagonal Architecture / Ports & Adapters, Prisma ORM)
```

---

## 🚀 Tecnologías

### Frontend (`sr-makeup-ft`)
- **Framework:** Next.js (App Router con Turbopack) & React 19
- **Estilos:** Tailwind CSS 4, Google Fonts (Playfair Display, Great Vibes, Montserrat)
- **Iconografía:** Lucide React
- **Arquitectura:** Screaming Architecture (orientada al dominio del negocio de belleza)
- **Funcionalidades:**
  - Flujo de Agendamiento VIP paso a paso con opciones de Estudio o Domicilio.
  - Panel Super Admin exclusivo para Shirley con métricas, confirmación de citas y botón de WhatsApp directo a clientas.
  - Slider interactivo de Antes & Después (Piel Blindada).
  - Catálogo de servicios y tarifas en COP.
  - Portafolio de creaciones filtrable.
  - Widget flotante de WhatsApp y página dedicada de Contacto.

### Backend (`sr-makeup-bk`)
- **Framework:** NestJS
- **Arquitectura:** Arquitectura Hexagonal (Puertos y Adaptadores)
- **ORM / Base de Datos:** Prisma ORM con PostgreSQL (compatible con Supabase)
- **Validaciones:** `class-validator` y `class-transformer`
- **Módulos Hexagonales:**
  - `appointments` (Dominio, Casos de Uso, Adaptadores Prisma y REST)
  - `services` (Catálogo de servicios)
  - `portfolio` (Gestión de looks y galería)

---

## 🛠️ Instalación y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd sr-makeup
```

### 2. Iniciar el Frontend
```bash
cd sr-makeup-ft
npm install
npm run dev
```
Disponible en: `http://localhost:3000`

### 3. Iniciar el Backend
```bash
cd sr-makeup-bk
npm install
npx prisma generate
npm run start:dev
```
Disponible en: `http://localhost:3001/api`
