import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import {
  products,
  carts,
  cartItems,
  testimonials,
  users,
  type Product,
  type Cart,
  type CartItem,
  type Testimonial,
  type User,
  type InsertProduct,
  type InsertCart,
  type InsertCartItem,
  type InsertTestimonial,
  type InsertUser,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductsByType(type: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart operations
  getCart(sessionId: string): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  
  // Cart items operations
  getCartItems(cartId: number): Promise<CartItem[]>;
  getCartItemsWithProducts(cartId: number): Promise<(CartItem & { product: Product })[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  
  // Testimonial operations
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private carts: Map<number, Cart>;
  private cartItems: Map<number, CartItem>;
  private testimonials: Map<number, Testimonial>;
  private userId: number;
  private productId: number;
  private cartId: number;
  private cartItemId: number;
  private testimonialId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.carts = new Map();
    this.cartItems = new Map();
    this.testimonials = new Map();
    this.userId = 1;
    this.productId = 1;
    this.cartId = 1;
    this.cartItemId = 1;
    this.testimonialId = 1;
    
    this.seedProducts();
    this.seedTestimonials();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByType(type: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.type === type);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = {
      ...insertProduct,
      id
    };
    this.products.set(id, product);
    return product;
  }

  async getCart(sessionId: string): Promise<Cart | undefined> {
    for (const cart of this.carts.values()) {
      if (cart.sessionId === sessionId) {
        return cart;
      }
    }
    return undefined;
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const id = this.cartId++;
    const now = new Date();
    const cart: Cart = {
      ...insertCart,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.carts.set(id, cart);
    return cart;
  }

  async getCartItems(cartId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.cartId === cartId);
  }

  async getCartItemsWithProducts(cartId: number): Promise<(CartItem & { product: Product })[]> {
    const items = await this.getCartItems(cartId);
    return items.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      return { ...item, product };
    });
  }

  async addCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    const id = this.cartItemId++;
    const cartItem: CartItem = { 
      ...insertItem, 
      id 
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    
    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  private seedProducts() {
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
        title: "Script: Cómo Superar el Miedo al Fracaso",
        description: "El texto completo y las técnicas detalladas del famoso video motivacional.",
        type: "pdf" as const,
        category: "Scripts",
        price: 999,
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
        previewUrl: null,
        duration: null
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

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  private seedTestimonials() {
    const sampleTestimonials = [
      {
        name: "Laura Martínez",
        comment: "Los audiolibros de Audio Motívate han transformado completamente mi perspectiva sobre el crecimiento personal. ¡Increíble calidad!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b008"
      },
      {
        name: "Carlos Rodríguez",
        comment: "Contenido de primera calidad. Me ayudó a desarrollar nuevos hábitos que han mejorado mi productividad enormemente.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

class PostgresStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required");
    }
    
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.db.select().from(products);
  }

  async getProductsByType(type: string): Promise<Product[]> {
    return await this.db.select().from(products).where(eq(products.type, type));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await this.db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await this.db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async getCart(sessionId: string): Promise<Cart | undefined> {
    const result = await this.db.select().from(carts).where(eq(carts.sessionId, sessionId));
    return result[0];
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const result = await this.db.insert(carts).values(insertCart).returning();
    return result[0];
  }

  async getCartItems(cartId: number): Promise<CartItem[]> {
    return await this.db.select().from(cartItems).where(eq(cartItems.cartId, cartId));
  }

  async getCartItemsWithProducts(cartId: number): Promise<(CartItem & { product: Product })[]> {
    const result = await this.db
      .select()
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cartId));

    return result.map(row => ({
      ...row.cart_items,
      product: row.products
    }));
  }

  async addCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    const result = await this.db.insert(cartItems).values(insertItem).returning();
    return result[0];
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const result = await this.db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return result[0];
  }

  async removeCartItem(id: number): Promise<boolean> {
    const result = await this.db.delete(cartItems).where(eq(cartItems.id, id)).returning();
    return result.length > 0;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await this.db.select().from(testimonials);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await this.db.insert(testimonials).values(insertTestimonial).returning();
    return result[0];
  }
}

export const storage = process.env.NODE_ENV === 'production' 
  ? new PostgresStorage() 
  : new MemStorage();
