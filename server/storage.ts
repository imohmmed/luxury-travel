import { 
  destinations, 
  services, 
  testimonials, 
  countries, 
  type Destination, 
  type Service, 
  type Testimonial, 
  type Country 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getDestinations(): Destination[];
  getServices(): Service[];
  getTestimonials(): Testimonial[];
  getCountryById(id: number): Country | undefined;
}

export class MemStorage implements IStorage {
  private _destinations: Destination[];
  private _services: Service[];
  private _testimonials: Testimonial[];
  private _countries: Country[];

  constructor() {
    this._destinations = destinations;
    this._services = services;
    this._testimonials = testimonials;
    this._countries = countries;
  }

  getDestinations(): Destination[] {
    return this._destinations;
  }

  getServices(): Service[] {
    return this._services;
  }

  getTestimonials(): Testimonial[] {
    return this._testimonials;
  }

  getCountryById(id: number): Country | undefined {
    return this._countries.find(country => country.id === id);
  }
}

export const storage = new MemStorage();
