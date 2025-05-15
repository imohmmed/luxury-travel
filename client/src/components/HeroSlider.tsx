import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant: 'accent' | 'primary' | 'white';
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    title: 'اكتشف عالم الفخامة',
    subtitle: 'تجارب سفر استثنائية تفوق توقعاتك',
    buttonText: 'احجز رحلتك الآن',
    buttonLink: '#services',
    buttonVariant: 'accent',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    title: 'إقامة فاخرة لا مثيل لها',
    subtitle: 'استمتع بأفضل الفنادق والمنتجعات حول العالم',
    buttonText: 'استكشف الفنادق',
    buttonLink: '#services',
    buttonVariant: 'primary',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1540339832862-474599807836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    title: 'سافر على درجة الأعمال',
    subtitle: 'رحلات جوية مريحة بأعلى مستويات الخدمة',
    buttonText: 'احجز تذكرتك',
    buttonLink: '#services',
    buttonVariant: 'white',
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const buttonClasses = {
    accent: 'bg-accent text-dark hover:bg-opacity-90',
    primary: 'bg-primary text-white hover:bg-opacity-90',
    white: 'bg-white text-dark hover:bg-opacity-90'
  };

  return (
    <section id="home" className="relative h-[100vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center z-10 pt-20"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl text-white font-bold mb-6 reveal"
            >
              {slides[currentSlide].title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl text-white mb-8 reveal"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                asChild
                variant="default"
                className={`rounded-full font-bold px-8 py-6 text-lg ${buttonClasses[slides[currentSlide].buttonVariant]}`}
              >
                <a href={slides[currentSlide].buttonLink}>
                  {slides[currentSlide].buttonText}
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
