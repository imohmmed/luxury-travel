import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import MotionText from '@/lib/MotionText';

const AboutUs: React.FC = () => {
  // تأثيرات ظهور العناصر عند التمرير
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-10 bg-white text-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInVariants}
        >
          <h2 className="text-4xl font-bold text-primary mb-4 justify-center w-full">
            <MotionText text="من نحن؟" className="text-primary" type="slide" />
          </h2>
          <motion.div 
            className="w-20 h-1 bg-accent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>
        </motion.div>
        
        <div className="flex flex-col items-center">
          {/* About Content */}
          <motion.div 
            className="w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.h3 
              className="text-3xl font-bold text-secondary mb-6 text-center"
              variants={fadeInVariants}
            >
              <MotionText 
                text="شركة التَرَف - الرائدة في مجال السياحة والسفر الفاخر" 
                className="text-secondary"
                type="bounce"
              />
            </motion.h3>
            
            <motion.div 
              className="text-lg text-gray-600 mb-6"
              variants={fadeInVariants}
            >
              <MotionText 
                text="نحن شركة التَرَف المتخصصة في تقديم خدمات السفر والسياحة الفاخرة، ونقدم مجموعة متكاملة من الخدمات بدءاً من الفيز والتذاكر وصولاً إلى التأمين الصحي وإجازات السوق الدولية. نسعى جاهدين لتوفير تجارب سفر استثنائية تلبي أعلى توقعات عملائنا بعناية فائقة للتفاصيل."
                className="text-gray-600"
                type="fade"
                delay={0.2}
              />
            </motion.div>
            
            <motion.div 
              className="text-lg text-gray-600 mb-8"
              variants={fadeInVariants}
            >
              <MotionText 
                text="يتكون فريقنا من خبراء متخصصين في مختلف أقسام الشركة، بدءاً من قسم الفيز إلى قسم الكروبات السياحية وتنظيم المؤتمرات، وقسم الاستقبال والتوديع (ترانسفير) وغيرها من الخدمات المتميزة."
                className="text-gray-600"
                type="slide"
                delay={0.4}
              />
            </motion.div>
            
            <motion.div 
              className="text-center w-full"
              variants={fadeInVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/about-us" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all">
                اقرأ المزيد
                <i className="fas fa-arrow-left mr-2"></i>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;