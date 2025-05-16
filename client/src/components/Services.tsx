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
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 text-secondary relative overflow-hidden" 
      ref={sectionRef}>
      
      {/* خلفية متحركة مع تأثير Parallax محسّن */}
      <motion.div 
        className="absolute inset-0 -z-10 w-full h-full"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={backgroundVariants}
        style={{
          x: 0, // إلغاء حركة الكونتينر نفسه
        }}
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed', // ثبات الخلفية أثناء السكرول
            filter: 'brightness(1) contrast(1.05)',
            transform: `translateX(${scrollY * -0.1}px) scale(${1 + scrollY * 0.0002})` // تكبير الصورة مع حركة أفقية إلى اليسار
          }}
        />
      </motion.div>
      
      {/* طبقة خلفية إضافية للعمق - تتحرك بالاتجاه المعاكس بشكل خفيف */}
      <div className="absolute inset-0 opacity-15" 
        style={{
          backgroundImage: "url('https://assets.website-files.com/5b60dd35a56ec7bab0703d2d/5c80c61c11bce453d640a613_pattern-1.svg')",
          backgroundSize: '400px',
          backgroundAttachment: 'fixed',
          mixBlendMode: 'overlay',
          transform: `translateX(${scrollY * 0.05}px)` // حركة خفيفة باتجاه معاكس (لليمين)
        }} 
      />
      
      {/* تم إزالة الطبقة الثالثة للتأثير ثلاثي الأبعاد لتحقيق تناسق أفضل */}
      
      {/* طبقة خلفية لتضاد النص وتعزيز ظهور البطاقات */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 -z-5"></div>
      
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
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-2 text-white inline-flex group-hover:text-accent transition-colors">
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
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
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
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
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
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
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
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
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
          
          <motion.div variants={cardVariants} className="rounded-lg shadow-xl bg-white/10 backdrop-blur-sm p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 group">
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
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