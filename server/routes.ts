import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCartItemSchema } from "@shared/schema";
import crypto from "crypto";
import Stripe from "stripe";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Stripe
  let stripe: Stripe | null = null;
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-05-28.basil",
    });
  }

  // Create router for API routes
  const router = express.Router();
  app.use("/api", router);
  
  // Get all products
  router.get("/products", async (req: Request, res: Response) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  // Get products by type
  router.get("/products/type/:type", async (req: Request, res: Response) => {
    const type = req.params.type;
    const products = await storage.getProductsByType(type);
    res.json(products);
  });

  // Get single product
  router.get("/products/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  });

  // Get testimonials
  router.get("/testimonials", async (req: Request, res: Response) => {
    const testimonials = await storage.getAllTestimonials();
    res.json(testimonials);
  });

  // Cart management
  router.get("/cart", async (req: Request, res: Response) => {
    let sessionId = req.cookies.cartSession;
    
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      res.cookie("cartSession", sessionId, { 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true 
      });
    }
    
    let cart = await storage.getCart(sessionId);
    
    if (!cart) {
      cart = await storage.createCart({ sessionId });
    }
    
    const cartItems = await storage.getCartItemsWithProducts(cart.id);
    
    res.json({
      cart,
      items: cartItems
    });
  });

  // Add item to cart
  router.post("/cart/items", async (req: Request, res: Response) => {
    let sessionId = req.cookies.cartSession;
    
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      res.cookie("cartSession", sessionId, { 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true 
      });
    }
    
    let cart = await storage.getCart(sessionId);
    
    if (!cart) {
      cart = await storage.createCart({ sessionId });
    }
    
    const validatedData = insertCartItemSchema.parse({
      ...req.body,
      cartId: cart.id
    });
    
    const cartItem = await storage.addCartItem(validatedData);
    const cartItems = await storage.getCartItemsWithProducts(cart.id);
    
    res.json({
      cart,
      items: cartItems
    });
  });

  // Update cart item quantity
  router.patch("/cart/items/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    
    if (isNaN(id) || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid parameters" });
    }
    
    const updatedItem = await storage.updateCartItemQuantity(id, quantity);
    
    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    
    res.json(updatedItem);
  });

  // Remove cart item
  router.delete("/cart/items/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }
    
    const success = await storage.removeCartItem(id);
    
    if (!success) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    
    res.json({ message: "Item removed successfully" });
  });

  // Clear cart
  router.delete("/cart/clear", async (req: Request, res: Response) => {
    const sessionId = req.cookies.cartSession;
    
    if (!sessionId) {
      return res.status(400).json({ message: "No cart session found" });
    }
    
    const cart = await storage.getCart(sessionId);
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    
    const cartItems = await storage.getCartItems(cart.id);
    
    for (const item of cartItems) {
      await storage.removeCartItem(item.id);
    }
    
    const updatedCartItems = await storage.getCartItemsWithProducts(cart.id);
    
    res.json({
      cart,
      items: updatedCartItems
    });
  });

  // Stripe payment intent
  router.post("/create-payment-intent", async (req: Request, res: Response) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe not configured" });
    }

    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Stripe webhook
  router.post("/webhook/stripe", express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe not configured" });
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      console.log('Payment succeeded:', event.data.object);
    }

    res.json({ received: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
