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
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // متغير لتتبع التعليق الحالي
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  
  // تغيير التعليق تلقائيًا كل 3 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // وظائف التنقل
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
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

  // متغيرات حركة التعليقات
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
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
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sliderVariants}
        >
          <div className="testimonial-slider min-h-[350px] max-w-xl mx-auto relative bg-neutral rounded-xl shadow-lg">
            <AnimatePresence custom={direction} mode="popLayout" initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-6 absolute w-full left-0 right-0"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-20 h-20 rounded-full object-cover shadow-md mb-3"
                  />
                  <div className="text-right">
                    {testimonials[currentIndex].name.split(' ').map((namePart, i) => (
                      <div key={i} className="text-xl font-bold text-secondary leading-tight">
                        {namePart}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-md text-right overflow-y-auto max-h-60">
                  {testimonials[currentIndex].comment}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-5">
            {testimonials.map((_, index) => (
              <motion.button 
                key={index} 
                className={`w-4 h-4 rounded-full mx-2 transition-colors duration-300 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                aria-label={`تعليق ${index + 1}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <div className="block">
            <motion.button 
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hidden md:block"
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </motion.button>
            
            <motion.button 
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hidden md:block"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;