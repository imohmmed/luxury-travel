import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AnimatedText from '@/lib/AnimatedText';

// Import testimonials from constants
import { testimonials } from '@/lib/constants';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  comment: string;
}

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // تقسيم التعليقات إلى مجموعات من 3
  const testimonialsGroups = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    testimonialsGroups.push(testimonials.slice(i, i + 3));
  }
  
  // متغير لتتبع المجموعة الحالية
  const [currentGroup, setCurrentGroup] = useState(0);
  
  // تبديل الشرائح تلقائيًا
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % testimonialsGroups.length);
    }, 6000); // تغيير كل 6 ثوانٍ

    return () => clearInterval(interval);
  }, [testimonialsGroups.length]);

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

  // متغيرات حركة العنوان
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // متغيرات حركة السلايدر
  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // متغيرات حركة مجموعة التعليقات
  const groupVariants = {
    hidden: { 
      opacity: 0,
      x: 100
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  // متغيرات حركة بطاقات التعليقات الفردية
  const cardVariants = {
    hidden: { 
      y: 30, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10
      }
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-white text-secondary" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
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
          <div className="testimonial-slider min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGroup}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={groupVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {testimonialsGroups[currentGroup].map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    variants={cardVariants}
                    className="h-full"
                  >
                    <motion.div 
                      className="bg-neutral rounded-xl shadow-lg p-6 h-full flex flex-col"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <div className="flex items-center mb-4">
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
                      <p className="text-gray-600 flex-grow">
                        {testimonial.comment}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-8">
            {testimonialsGroups.map((_, index) => (
              <motion.button 
                key={index} 
                className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${
                  index === currentGroup ? 'bg-primary scale-125' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentGroup(index)}
                aria-label={`مجموعة التعليقات ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:block">
            <motion.button 
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md"
              onClick={() => setCurrentGroup((prev) => (prev - 1 + testimonialsGroups.length) % testimonialsGroups.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </motion.button>
            
            <motion.button 
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md"
              onClick={() => setCurrentGroup((prev) => (prev + 1) % testimonialsGroups.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;