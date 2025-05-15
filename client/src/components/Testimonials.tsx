import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/lib/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    comment: '"تجربة رائعة مع سفر الفخامة! كانت رحلتنا إلى جزر المالديف مثالية بكل المقاييس. الفندق كان فاخرًا والخدمة متميزة والتنظيم احترافي. سأعتمد عليهم حتمًا في رحلاتي القادمة."'
  },
  {
    id: 2,
    name: 'سارة عبدالله',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 4.5,
    comment: '"استمتعت كثيرًا برحلتي إلى سويسرا التي نظمتها سفر الفخامة. كانت الترتيبات دقيقة والفنادق فاخرة والبرنامج متنوع ومناسب لاهتماماتي. أنصح بشدة بالتعامل معهم."'
  },
  {
    id: 3,
    name: 'خالد العمري',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    comment: '"كرجل أعمال، أقدر كثيرًا الاحترافية العالية التي يتمتع بها فريق سفر الفخامة. نظموا لي رحلات عمل متعددة إلى دبي ونيويورك ولندن بدقة متناهية. خدمة ممتازة تستحق كل تقدير."'
  }
];

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (sectionRef.current && sliderRef.current) {
      gsap.from(sliderRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        }
      });
    }
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-star-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  return (
    <section id="testimonials" className="py-20 bg-white text-secondary" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <AnimatedText 
            text="تعليقات العملاء" 
            className="text-4xl font-bold text-primary mb-4"
            once 
          />
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            استمع لآراء عملائنا المميزين عن تجاربهم معنا
          </p>
        </div>
        
        <div className="relative overflow-hidden reveal" ref={sliderRef}>
          <div className="testimonial-slider" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentTestimonial ? 1 : 0,
                    transition: { duration: 0.5 }
                  }}
                  exit={{ opacity: 0 }}
                  className="testimonial-slide px-4"
                >
                  <div className="bg-neutral rounded-xl shadow-lg p-8">
                    <div className="flex items-center mb-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="text-xl font-bold text-secondary">{testimonial.name}</h4>
                        <div className="flex text-accent mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {testimonial.comment}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`w-3 h-3 rounded-full mx-1 transition-all ${
                  index === currentTestimonial ? 'bg-primary scale-125' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
