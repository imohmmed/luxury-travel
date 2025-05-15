import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MotionTextProps {
  text: string;
  className?: string;
  type?: 'slide' | 'fade' | 'bounce';
  delay?: number;
  staggerChildren?: number;
}

// مكون نص متحرك باستخدام Framer Motion بدلاً من GSAP
const MotionText: React.FC<MotionTextProps> = ({ 
  text, 
  className, 
  type = 'slide', 
  delay = 0,
  staggerChildren = 0.08
}) => {
  
  // تعريف التأثيرات المختلفة
  const animations = {
    slide: {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    bounce: {
      hidden: { y: -20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 15 
        }
      },
    },
  };

  // اختيار التأثير المناسب
  const selectedAnimation = animations[type];

  // تكوين التأثير الكلي
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren
      }
    }
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mx-1"
          variants={selectedAnimation}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default MotionText;