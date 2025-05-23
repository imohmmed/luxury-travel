import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import AnimatedText from '@/lib/AnimatedText';
import backgroundImage from '@assets/IMG_5882.jpeg';

interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
}

// بيانات الخدمات
const services = [
  {
    id: 1,
    title: "قسم الفيز",
    image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "نوفر خدمات استخراج تأشيرات السفر (Visa) لجميع الدول."
  },
  {
    id: 2,
    title: "قسم الكروبات السياحية وتنظيم المؤتمرات",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "تنظيم رحلات سياحية جماعية (Group Tours) داخل وخارج العراق."
  },
  {
    id: 3,
    title: "قسم التذاكر",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "حجز تذاكر الطيران لجميع الخطوط الجوية."
  },
  {
    id: 4,
    title: "قسم إجازات السوق الدولية",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "إصدار إجازات سوق دولية (رخص القيادة الدولية)."
  },
  {
    id: 5,
    title: "قسم التأمين الصحي",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "تأمين صحي للسفر يشمل الطوارئ، العلاج، الحوادث."
  },
  {
    id: 6,
    title: "قسم الاستقبال والتوديع (ترانسفير)",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "خدمات استقبال من المطارات وتوديع عند السفر."
  }
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // متغيرات الحركة للعناوين
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // متغيرات الحركة للبطاقات
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // متغيرات الحركة للبطاقات الفردية
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
        stiffness: 60,
        damping: 12,
        duration: 0.6
      }
    }
  };

  // متغيرات الحركة للخلفية (Parallax effect مُحسّن)
  const backgroundVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.1,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };
  
  // تأثير Parallax عند التمرير
  const [scrollY, setScrollY] = React.useState(0);
  const [scrollDirection, setScrollDirection] = React.useState(1); // 1 لليمين، -1 لليسار
  const [lastScrollY, setLastScrollY] = React.useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      // تحديد اتجاه التمرير
      if (window.scrollY > lastScrollY) {
        setScrollDirection(-1); // للأسفل = حركة لليسار
      } else {
        setScrollDirection(1); // للأعلى = حركة لليمين
      }
      
      setLastScrollY(window.scrollY);
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <section id="services" className="py-16 md:py-24 text-secondary relative overflow-hidden bg-[#3d7cbf]" 
      ref={sectionRef}>
      
      {/* خلفية متحركة مع تأثير Parallax محسّن */}
      {/* إضافة الخلفية كعنصر صورة للتأكد من ظهورها */}
      <motion.div 
        className="absolute inset-0 -z-10 w-full h-full overflow-hidden"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={backgroundVariants}
      >
        <motion.img 
          src={backgroundImage}
          alt="خلفية قسم الخدمات"
          className="absolute w-full h-full object-cover"
          style={{
            filter: 'brightness(0.7) contrast(1.1)',
            transform: `translateX(${scrollDirection * scrollY * 0.2}px) scale(${1 + scrollY * 0.0002})` // تكبير الصورة مع حركة أفقية تتغير حسب اتجاه التمرير
          }}
        />
        
        {/* طبقة لون فوق الصورة */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#3d7cbf]/50 to-[#3d7cbf]/70 z-10"
        />
      </motion.div>
      
      {/* طبقة خلفية إضافية للعمق - تتحرك بالاتجاه المعاكس بشكل خفيف */}
      <div className="absolute inset-0 opacity-15" 
        style={{
          backgroundImage: "url('https://assets.website-files.com/5b60dd35a56ec7bab0703d2d/5c80c61c11bce453d640a613_pattern-1.svg')",
          backgroundSize: '400px',
          backgroundAttachment: 'fixed',
          mixBlendMode: 'overlay',
          transform: `translateX(${-scrollDirection * scrollY * 0.1}px)` // حركة خفيفة باتجاه معاكس للطبقة الأولى
        }} 
      />
      
      {/* تم إزالة الطبقة الثالثة للتأثير ثلاثي الأبعاد لتحقيق تناسق أفضل */}
      
      {/* طبقة خلفية لتضاد النص وتعزيز ظهور البطاقات */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3d7cbf]/10 to-[#3d7cbf]/30 -z-5"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <AnimatedText 
            text="خدماتنا" 
            className="text-4xl font-bold text-white mb-4"
            once 
          />
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-xl text-white text-opacity-90 mt-4 max-w-3xl mx-auto">
            نقدم باقة متنوعة من الخدمات السياحية الفاخرة من خلال أقسامنا المتخصصة
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-6 mb-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{
            willChange: 'transform'
            // تم إزالة تأثير الحركة العمودية للمحتوى
          }}
        >
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
            {/* رموز الفيز والجوازات المتحركة في الخلفية */}
            <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              {/* رمز الجواز */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-6 right-8 text-white w-16 h-16"
                animate={{
                  rotate: [0, 8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut"
                }}
              >
                <rect x="2" y="3" width="20" height="18" rx="2"></rect>
                <path d="M8 10h8"></path>
                <path d="M8 14h8"></path>
                <path d="M8 18h8"></path>
              </motion.svg>
              
              {/* رمز ختم تأشيرة */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute bottom-4 right-24 text-white w-12 h-12"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m7 12 3 3 7-7"></path>
              </motion.svg>
              
              {/* رمز طائرة فاخرة */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute left-6 top-10 text-white w-14 h-14"
                animate={{
                  x: [0, 40, 0],
                  y: [0, -10, 0],
                  rotate: [0, -15, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear"
                }}
              >
                <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
              </motion.svg>
              
              {/* رمز بطاقة الهوية أو الفيزا */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute bottom-8 left-10 text-white w-12 h-12"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                  delay: 3
                }}
              >
                <rect width="18" height="14" x="3" y="5" rx="2"></rect>
                <path d="M21 10H3"></path>
                <path d="M7 15H7.01"></path>
                <path d="M11 15h2"></path>
              </motion.svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-white inline-flex group-hover:text-accent transition-colors relative z-10">
              <span>قسم</span>
              <span className="mr-1">الفيز</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-white mb-4">
              <li>نوفر خدمات استخراج تأشيرات السفر (Visa) لجميع الدول.</li>
              <li>متابعة كاملة من التقديم إلى الاستلام.</li>
              <li>يشمل تأشيرات سياحية، علاجية، تجارية، وزيارات خاصة.</li>
            </ul>
            <div className="mt-3 text-center">
              <Link 
                to="/visa-booking" 
                className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                احجز فيزا الآن
                <i className="fas fa-arrow-left mr-2"></i>
              </Link>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
            {/* رموز الباصات والمكاتب المتحركة خلف قسم الكروبات */}
            <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              {/* رمز الباص */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-6 right-12 text-white w-14 h-14"
                animate={{
                  x: [0, 80, 0],
                  y: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear"
                }}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M3 8h18" />
                <path d="M8 3v18" />
                <path d="M12 3v18" />
                <path d="M16 3v18" />
                <path d="M3 12h18" />
                <path d="M3 16h18" />
              </motion.svg>
              
              {/* رمز مكتب/مبنى */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute bottom-10 left-8 text-white w-12 h-12"
                animate={{
                  scale: [1, 1.05, 1],
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "easeInOut"
                }}
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </motion.svg>
              
              {/* رمز شخص/زبون */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-12 left-10 text-white w-8 h-8"
                animate={{
                  x: [0, 30, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                  delay: 3
                }}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </motion.svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors relative z-10">
              <div className="inline-flex">
                <span>قسم</span>
                <span className="mr-1">الكروبات</span>
                <span className="mr-1">السياحية</span>
              </div>
              <div className="inline-flex mt-1">
                <span>وتنظيم</span>
                <span className="mr-1">المؤتمرات</span>
              </div>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-white mb-4">
              <li>تنظيم رحلات سياحية جماعية (Group Tours) داخل وخارج العراق.</li>
              <li>تنسيق حجوزات الفنادق، التنقل، والبرامج اليومية.</li>
              <li>تنظيم مؤتمرات ومعارض وسفرات عمل متكاملة.</li>
            </ul>
            <div className="mt-3 text-center">
              <Link 
                to="/groups-booking" 
                className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                احجز رحلة جماعية
                <i className="fas fa-arrow-left mr-2"></i>
              </Link>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
            {/* رموز التذاكر المتحركة في الخلفية */}
            <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              {/* رمز تذكرة طيران */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-6 right-6 text-white w-10 h-10"
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }}
              >
                <path d="M2 6l5.5 4.5L12 7l4.5 3.5L22 6"></path>
                <path d="M2 12l5.5 4.5L12 13l4.5 3.5L22 12"></path>
                <path d="M2 18l5.5 4.5L12 19l4.5 3.5L22 18"></path>
              </motion.svg>
              
              {/* رمز تذكرة */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute bottom-8 left-8 text-white w-12 h-12"
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "easeInOut"
                }}
              >
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                <path d="M13 4v16" />
                <path d="M7 8h.01" />
                <path d="M7 12h.01" />
                <path d="M7 16h.01" />
                <path d="M17 8h.01" />
                <path d="M17 12h.01" />
                <path d="M17 16h.01" />
              </motion.svg>
              
              {/* رمز طائرة صغيرة */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-20 left-4 text-white w-8 h-8"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear"
                }}
              >
                <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
              </motion.svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors relative z-10">
              <span>قسم</span>
              <span className="mr-1">التذاكر</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-white mb-4">
              <li>حجز تذاكر الطيران لجميع الخطوط الجوية.</li>
              <li>إمكانية اختيار الدرجة (سياحية، رجال أعمال، أولى).</li>
              <li>دعم متكامل قبل وأثناء وبعد الحجز.</li>
            </ul>
            <div className="mt-3 text-center">
              <Link 
                to="/tickets-booking" 
                className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                احجز تذكرة طيران
                <i className="fas fa-arrow-left mr-2"></i>
              </Link>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
            {/* رموز إجازات السوق الدولية المتحركة في الخلفية */}
            <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              {/* رمز سيارة متحركة */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-8 right-8 text-white w-12 h-12"
                animate={{
                  x: [0, 60, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear"
                }}
              >
                <path d="M20 8l-2-4H6L4 8m16 0H4m16 0l1 3h1m-18 0H3m1-3l1 3m0 0l.3.6c.5 1 1.5 1.4 2.5 1.4h9.4c1 0 2-.5 2.5-1.4l.3-.6m0 0h-15"></path>
                <circle cx="7" cy="14" r="1"></circle>
                <circle cx="17" cy="14" r="1"></circle>
              </motion.svg>
              
              {/* رمز وثيقة رخصة قيادة */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute bottom-6 left-6 text-white w-10 h-10"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }}
              >
                <rect width="18" height="14" x="3" y="5" rx="2"></rect>
                <path d="M21 8H3"></path>
                <path d="M10 12l-1-2h6l-1 2"></path>
                <path d="M10 12v4h4v-4"></path>
              </motion.svg>
              
              {/* رمز إشارة مرور */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-16 left-12 text-white w-8 h-8"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="M4.93 4.93l2.83 2.83"></path>
                <path d="M16.24 16.24l2.83 2.83"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
                <path d="M4.93 19.07l2.83-2.83"></path>
                <path d="M16.24 7.76l2.83-2.83"></path>
              </motion.svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors relative z-10">
              <span>قسم</span>
              <span className="mr-1">إجازات</span>
              <span className="mr-1">السوق</span>
              <span className="mr-1">الدولية</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-white mb-4">
              <li>إصدار إجازات سوق دولية (رخص القيادة الدولية).</li>
              <li>خدمة سريعة ومعتمدة دوليًا.</li>
              <li>متوفرة لجميع الجنسيات.</li>
            </ul>
            <div className="mt-3 text-center">
              <Link 
                to="/driving-license" 
                className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                احصل على رخصة دولية
                <i className="fas fa-arrow-left mr-2"></i>
              </Link>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
            {/* رموز التأمين الصحي المتحركة في الخلفية */}
            <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              {/* رمز القلب/النبض */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-6 right-10 text-white w-12 h-12"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </motion.svg>
              
              {/* رمز وثيقة تأمين */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute bottom-8 left-10 text-white w-10 h-10"
                animate={{
                  rotate: [0, 5, 0],
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut"
                }}
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                <path d="M9 17h6"></path>
                <path d="M9 13h6"></path>
              </motion.svg>
              
              {/* رمز الإسعاف/الصليب */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-16 left-4 text-white w-8 h-8"
                animate={{
                  x: [0, 30, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear"
                }}
              >
                <rect width="16" height="16" x="4" y="4" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="M8 12h8"></path>
              </motion.svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors relative z-10">
              <span>قسم</span>
              <span className="mr-1">التأمين</span>
              <span className="mr-1">الصحي</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-white mb-4">
              <li>تأمين صحي للسفر يشمل الطوارئ، العلاج، الحوادث.</li>
              <li>معتمد من السفارات وشركات الطيران.</li>
              <li>خطط مرنة حسب مدة السفر والدولة.</li>
            </ul>
            <div className="mt-3 text-center">
              <Link 
                to="/health-insurance" 
                className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                احجز تأمين صحي
                <i className="fas fa-arrow-left mr-2"></i>
              </Link>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group relative overflow-hidden">
            {/* رموز الاستقبال والتوديع (ترانسفير) المتحركة في الخلفية */}
            <div className="absolute inset-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              {/* رمز سيارة فاخرة */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-8 right-8 text-white w-14 h-14"
                animate={{
                  x: [0, 80, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear"
                }}
              >
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6"></path>
                <path d="M15 7l-3 5"></path>
                <path d="M10 7v5"></path>
                <path d="M7 7l3 5"></path>
              </motion.svg>
              
              {/* رمز مطار */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute bottom-6 left-10 text-white w-12 h-12"
                animate={{
                  scale: [1, 1.1, 1],
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }}
              >
                <path d="M22 16h-20l8-10 2 1 3-4 1.5 2 3.5-2 2 2-6 6 6 3z"></path>
              </motion.svg>
              
              {/* رمز متاع */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="absolute top-20 left-6 text-white w-8 h-8"
                animate={{
                  rotate: [0, 10, 0],
                  x: [0, 20, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "easeInOut"
                }}
              >
                <path d="M6 8h12a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2"></path>
                <path d="M6 8v-2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v2"></path>
                <path d="M9 12v4"></path>
                <path d="M15 12v4"></path>
              </motion.svg>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors relative z-10">
              <div className="inline-flex">
                <span>قسم</span>
                <span className="mr-1">الاستقبال</span>
                <span className="mr-1">والتوديع</span>
              </div>
              <div className="text-center text-xl mt-1">(ترانسفير)</div>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-white mb-4">
              <li>خدمات استقبال من المطارات وتوديع عند السفر.</li>
              <li>توفير سيارات فخمة وسواقين محترفين.</li>
              <li>متاحة لجميع الرحلات في دول متعددة.</li>
            </ul>
            <div className="mt-3 text-center">
              <Link 
                to="/transfer-services" 
                className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                احجز خدمة استقبال
                <i className="fas fa-arrow-left mr-2"></i>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;