import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

  // متغيرات حركة الشبكة
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // متغيرات حركة بطاقات التعليقات
  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        duration: 0.5
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={gridVariants}
        >
          {testimonials.map((testimonial) => (
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
      </div>
    </section>
  );
};

export default Testimonials;