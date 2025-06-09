#!/usr/bin/env tsx
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { products, testimonials } from "../shared/schema";

async function seedProduction() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is required");
    process.exit(1);
  }

  console.log("Seeding production database...");
  
  const sql = neon(databaseUrl);
  const db = drizzle(sql);

  try {
    // Seed products
    const sampleProducts = [
      {
        title: "Mindset: La Nueva Psicología del Éxito",
        description: "Descubre cómo una mentalidad adecuada puede transformar tu vida y llevarte al éxito que siempre has deseado.",
        type: "audiobook" as const,
        category: "Crecimiento Personal",
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: "3:14"
      },
      {
        title: "Los 7 Hábitos de la Gente Altamente Efectiva",
        description: "Aprende los principios fundamentales que te ayudarán a ser más efectivo en todas las áreas de tu vida.",
        type: "audiobook" as const,
        category: "Productividad",
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1513171920216-2640b288471b",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: "2:56"
      },
      {
        title: "Cómo Superar el Miedo al Fracaso",
        description: "Aprende técnicas prácticas para transformar el miedo en motivación y alcanzar tus objetivos.",
        type: "video" as const,
        category: "Superación",
        price: 1499,
        imageUrl: "https://images.unsplash.com/photo-1557425955-df376b5903c8",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "15:24"
      },
      {
        title: "Guía Completa de Desarrollo Personal",
        description: "Una guía exhaustiva con estrategias, ejercicios y herramientas para transformar tu vida personal y profesional.",
        type: "guide" as const,
        category: "Desarrollo",
        price: 1999,
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
        previewUrl: null,
        duration: null
      }
    ];

    await db.insert(products).values(sampleProducts);
    console.log("✓ Products seeded successfully");

    // Seed testimonials
    const sampleTestimonials = [
      {
        name: "Laura Martínez",
        comment: "Los audiolibros de Audio Motívate han transformado completamente mi perspectiva sobre el crecimiento personal. ¡Increíble calidad!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b008",
        location: "México, DF"
      },
      {
        name: "Carlos Rodríguez", 
        comment: "Contenido de primera calidad. Me ayudó a desarrollar nuevos hábitos que han mejorado mi productividad enormemente.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        location: "Guadalajara, JAL"
      }
    ];

    await db.insert(testimonials).values(sampleTestimonials);
    console.log("✓ Testimonials seeded successfully");
    
    console.log("Production database seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedProduction();
