import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for the application
  app.get('/api/destinations', (req, res) => {
    res.json(storage.getDestinations());
  });

  app.get('/api/services', (req, res) => {
    res.json(storage.getServices());
  });

  app.get('/api/testimonials', (req, res) => {
    res.json(storage.getTestimonials());
  });

  app.get('/api/country/:id', (req, res) => {
    const country = storage.getCountryById(parseInt(req.params.id));
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
