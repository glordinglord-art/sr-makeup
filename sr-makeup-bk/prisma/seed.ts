import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('✨ Iniciando seed en Supabase para Sr.Makeup...');

  // 1. Super Admin Shirley Ram
  const adminEmail = 'contacto@srmakeup.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Shirley Ram',
        passwordHash: 'shirley_admin_hash_2026', // Reemplazar con hash bcrypt si se usa auth con contraseña
        role: 'ADMIN',
      },
    });
    console.log('✅ Super Admin Shirley Ram creado en Supabase');
  }

  // 2. Servicios Oficiales
  const services = [
    {
      id: 'novias',
      title: 'Maquillaje para Novias (Bridal Glam)',
      slug: 'maquillaje-novias',
      description: 'La experiencia nupcial más completa: piel blindada resistente a emociones, diseño atemporal y kit de retoque.',
      price: 320000,
      durationMinutes: 90,
      category: 'novias',
      features: [
        'Skincare previo con sueros hidratantes de lujo',
        'Piel blindada 100% a prueba de agua y lágrimas',
        'Pestañas de efecto natural o visón según tu mirada',
        'Mini kit de retoque con polvo, labial y aplicador',
        'Acompañamiento fotográfico durante el arreglo',
      ],
      isActive: true,
    },
    {
      id: 'social',
      title: 'Maquillaje Social & Fiesta',
      slug: 'maquillaje-social',
      description: 'Look deslumbrante ideal para eventos, grados, galas o invitadas a bodas. Acabado de larga duración con piel blindada.',
      price: 180000,
      durationMinutes: 60,
      category: 'social',
      features: [
        'Preparación intensiva de piel según tu biotipo',
        'Piel luminosa o mate con fijación de 16 horas',
        'Pestañas postizas incluidas en tira o punto a punto',
        'Diseño de cejas y labios satinados o mate',
      ],
      isActive: true,
    },
    {
      id: 'artistico',
      title: 'Maquillaje Artístico & Editorial',
      slug: 'maquillaje-artistico',
      description: 'Creaciones de fantasía, producciones de moda, sesiones de fotografía, disfraces de alta costura o conceptos creativos.',
      price: 220000,
      durationMinutes: 90,
      category: 'artistico',
      features: [
        'Diseño conceptual personalizado previo al evento',
        'Pigmentos neón, acuacolores y fijadores especiales',
        'Incrustación de pedrería, perlas, láminas de oro o glitter',
        'Resistente a luces de estudio y cámaras 4K',
      ],
      isActive: true,
    },
    {
      id: 'quinceaneras',
      title: 'Quinceañeras Soñadas',
      slug: 'quinceaneras',
      description: 'Un estilo dulce, fresco y sofisticado que resalta la juventud y brillo en su noche inolvidable.',
      price: 240000,
      durationMinutes: 75,
      category: 'quinceaneras',
      features: [
        'Maquillaje de alta definición para sesión de fotos y vals',
        'Iluminación suave y toques de glitter delicado',
        'Pestañas de apertura natural',
        'Fijación ultra duradera para toda la fiesta',
      ],
      isActive: true,
    },
    {
      id: 'automaquillaje',
      title: 'Taller Personalizado de Automaquillaje',
      slug: 'taller-automaquillaje',
      description: 'Clase personalizada e individual donde aprenderás a sacarte el máximo provecho con tus propios cosméticos.',
      price: 200000,
      durationMinutes: 120,
      category: 'automaquillaje',
      features: [
        'Diagnóstico de tu tipo de rostro y tono de piel',
        'Técnica correcta para preparación y aplicación de base',
        'Delineado y difuminado fácil para el día y la noche',
        'Guía digital paso a paso con recomendaciones de productos',
      ],
      isActive: true,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: s,
      create: s,
    });
  }
  console.log(`✅ ${services.length} servicios oficiales sincronizados con Supabase`);

  // 3. Portafolio inicial
  const portfolioItems = [
    {
      id: 'port-1',
      title: 'Novia Radiante - Piel Blindada',
      category: 'novias',
      imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
      beforeImageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
      description: 'Acabado satinado a prueba de lágrimas con pestañas personalizadas punto a punto.',
      productsUsed: ['Dior Backstage Foundation', 'Huda Beauty Concealer', 'Urban Decay All Nighter'],
      isFeatured: true,
    },
    {
      id: 'port-2',
      title: 'Glam Gala Nocturna',
      category: 'social',
      imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
      beforeImageUrl: null,
      description: 'Smokey eyes con destellos dorados y labios nude aterciopelados.',
      productsUsed: ['Natasha Denona Glam Palette', 'Fenty Beauty Gloss Bomb'],
      isFeatured: true,
    },
    {
      id: 'port-3',
      title: 'Editorial Neón & Cristales',
      category: 'artistico',
      imageUrl: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&q=80&w=800',
      beforeImageUrl: null,
      description: 'Grafismo editorial con cristales Swarovski para sesión de moda.',
      productsUsed: ['Suva Beauty Hydraliners', 'Swarovski Crystals', 'Danessa Myricks Colorfix'],
      isFeatured: true,
    },
  ];

  for (const p of portfolioItems) {
    await prisma.portfolioItem.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }
  console.log(`✅ ${portfolioItems.length} ítems de portafolio sincronizados`);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
