import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import MotionText from '@/lib/MotionText';

interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Custom services data
const services = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350',
    title: 'خدمات الفيزا',
    description: 'نقدم خدمات شاملة للحصول على تأشيرات السفر لجميع دول العالم بأسرع وقت وأعلى نسب نجاح.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350',
    title: 'حجز الطيران',
    description: 'خدمات حجز تذاكر الطيران على جميع شركات الطيران العالمية بأفضل الأسعار المتاحة.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350',
    title: 'حجز الفنادق',
    description: 'حجز فندقي بأسعار منافسة في أفضل الفنادق العالمية من فئة 4 و 5 نجوم حول العالم.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350',
    title: 'قسم الاستقبال والتوديع (ترانسفير)',
    description: 'خدمات نقل متميزة من وإلى المطارات مع سائقين محترفين يتحدثون لغات متعددة.'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350',
    title: 'إجازات السوق الدولية',
    description: 'خدمات استخراج إجازات السوق الدولية المعتمدة في معظم دول العالم بإجراءات سريعة.'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1577365037741-647eb99f1d4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350',
    title: 'التأمين الصحي',
    description: 'خدمات التأمين الصحي للمسافرين بتغطية شاملة وبأسعار تنافسية من أفضل شركات التأمين.'
  }
];

const Services: React.FC = () => {
  // تأثير الظهور عند التمرير
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  // تأثير عند حركة المؤشر (hover)
  const hoverEffect = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)", 
      transition: { duration: 0.3, type: "tween", ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* العنوان الرئيسي */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            <MotionText text="خدماتنا المميزة" className="text-primary" type="bounce" />
          </h2>
          <motion.div 
            className="w-20 h-1 bg-accent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>
          <div className="mt-6 max-w-3xl mx-auto">
            <MotionText
              text="نقدم لكم باقة متكاملة من خدمات السياحة والسفر العالمية بأعلى معايير الجودة والاحترافية"
              className="text-gray-600 text-lg"
              type="slide"
              delay={0.2}
            />
          </div>
        </motion.div>
        
        {/* بطاقات الخدمات */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div
                className="relative h-48 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </motion.div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-3 whitespace-normal">
                  <MotionText text={service.title} className="text-secondary" type="fade" />
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
                <motion.div 
                  className="mt-4"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={`/services/${service.id}`} 
                    className="text-primary font-medium inline-flex items-center"
                  >
                    اكتشف المزيد
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1 rtl:rotate-180" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;