import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  wordSpacing?: number;
  delay?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  text, 
  className = "", 
  wordSpacing = 1,
  delay = 0
}) => {
  // Split text into words
  const words = text.split(" ");
  
  // Animation variants for single words
  const wordVariants = {
    hidden: {},
    visible: {}
  };

  // Animation variants for single letters
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 10
      } 
    }
  };

  // Container variant with stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`word-${wordIndex}`}
          className={`inline-block ${wordIndex > 0 ? `mr-${wordSpacing}` : ''}`}
          variants={wordVariants}
        >
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={`letter-${letterIndex}`}
              className="inline-block"
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTitle;