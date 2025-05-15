import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import AnimatedText from '@/lib/AnimatedText';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  comment: string;
}

// Import testimonials from constants
import { testimonials } from '@/lib/constants';

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

  // استخدام Framer Motion لتحريك العناصر عند ظهورها في منطقة العرض
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // متغيرات حركة سلايدر التعليقات
  const sliderVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

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
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5 }
            }
          }}
        >
          <h2 className="text-4xl font-bold text-primary mb-4 inline-flex justify-center w-full">
            <span>تعليقات</span>
            <span className="mx-1">العملاء</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            استمع لآراء عملائنا المميزين عن تجاربهم معنا
          </p>
        </motion.div>
        
        <motion.div 
          className="relative overflow-hidden" 
          ref={sliderRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sliderVariants}
        >
          <div className="testimonial-slider" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
            <AnimatePresence mode="sync">
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
                  <motion.div 
                    className="bg-neutral rounded-xl shadow-lg p-8"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
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
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <motion.button 
                key={index} 
                className={`w-3 h-3 rounded-full mx-1 transition-all ${
                  index === currentTestimonial ? 'bg-primary scale-125' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
