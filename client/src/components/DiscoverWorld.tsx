import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation, useMotionValue } from 'framer-motion';
import Globe from '@/components/Globe';
import AnimatedText from '@/lib/AnimatedText';

const DiscoverWorld: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const contentControls = useAnimation();
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Parallax effect values - أسرع وأكثر تفاعلية
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -70]); // أسرع للفيديو
  const y2 = useTransform(scrollY, [0, 500], [0, -30]); // أسرع للكرة الأرضية
  const opacityValue = useTransform(scrollY, [50, 300], [1, 0.7]); // أسرع للتلاشي
  
  // تأثير عائم للكرة الأرضية - أسرع
  const floatY = useMotionValue(0);
  const floatRotate = useMotionValue(0);
  
  // تأثيرات السكرول - استجابة أسرع
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // تحديث ارتفاع المشاهدة
    setViewportHeight(window.innerHeight);
    
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // تحريك الكرة بشكل أسرع
    const floatAnimation = () => {
      const floatKeyframes = [
        { y: -7, rotate: -0.8 },
        { y: 0, rotate: 0 },
        { y: 7, rotate: 0.8 },
        { y: 0, rotate: 0 }
      ];
      
      let currentKeyframe = 0;
      
      const animate = () => {
        const target = floatKeyframes[currentKeyframe];
        floatY.set(target.y);
        floatRotate.set(target.rotate);
        
        currentKeyframe = (currentKeyframe + 1) % floatKeyframes.length;
        setTimeout(animate, 800); // أسرع بكثير (800ms بدلاً من 1500ms)
      };
      
      animate();
    };
    
    // تحسين مراقبة السكرول للاستجابة الأسرع والظهور المبكر
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      
      // حساب موقع العنصر نسبة إلى نافذة العرض
      // سنبدأ التأثير قبل وصول القسم إلى منطقة العرض
      if (rect.top < viewportHeight + 300) { // ظهور عندما يكون القسم خارج منطقة العرض ب 300 بكسل
        contentControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.2, ease: "easeOut" } // أسرع للظهور الفوري
        });
      } else {
        contentControls.start({
          opacity: 0,
          y: 10, // مسافة قصيرة جدًا للحركة الأسرع 
          transition: { duration: 0.1 } // أسرع جدًا
        });
      }
    };
    
    // بدء التحريك
    floatAnimation();
    
    // إضافة المراقبة
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // التحقق المبدئي
    handleScroll();
    
    // التنظيف
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [contentControls, floatY, floatRotate]);

  return (
    <motion.section 
      id="discover" 
      className="py-10 relative overflow-hidden bg-dark min-h-[700px] flex items-center -mt-10"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }} // أسرع
    >
      {/* Video Background with Overlay - Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y1 }}
      >
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="https://cdn.coverr.co/videos/coverr-aerial-shot-of-a-beach-5166/1080p.mp4" type="video/mp4" />
        </video>
        <motion.div 
          className="absolute inset-0 bg-dark backdrop-blur-sm"
          style={{ 
            opacity: useTransform(scrollY, [0, 150], [0.8, 0.92]), // أسرع
            backdropFilter: useTransform(scrollY, [0, 200], ['blur(2px)', 'blur(5px)']) // أسرع
          }}
        ></motion.div>
      </motion.div>
      
      {/* Floating Particles with Parallax Effect - أسرع */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => ( // تقليل العدد للأداء
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/20"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 8}px`,
              height: `${3 + Math.random() * 8}px`,
              opacity: 0.1 + Math.random() * 0.3
            }}
            animate={{
              y: [0, -50, -25, -100, 0], // مسافات أقصر للحركة الأسرع
              x: [0, 25, -15, 10, 0], // مسافات أقصر للحركة الأسرع
              scale: [1, 1.1, 0.95, 1.05, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 10, // أسرع (5-15 ثانية بدلاً من 10-30)
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              y: useTransform(scrollY, [0, 300], [0, -Math.random() * 50]) // أسرع
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center"
          animate={contentControls}
          initial={{ opacity: 0, y: 20 }} // أقل حركة (20 بدلاً من 30)
        >
          {/* Text Content with Reveal Effect - أسرع */}
          <motion.div 
            className="text-center max-w-3xl mb-12" 
            ref={titleRef}
            initial={{ opacity: 0, y: 15 }} // أقل حركة (15 بدلاً من 30)
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }} // ظهور أسرع (0.1 بدلاً من 0.3)
            transition={{ 
              duration: 0.4, // أسرع (0.4 بدلاً من 0.8)
              ease: "easeOut"
            }}
          >
            <h2 className="text-5xl font-bold text-white mb-6 inline-flex justify-center w-full relative">
              <motion.span
                initial={{ opacity: 0, y: 10 }} // أقل حركة (10 بدلاً من 20)
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.3 }} // أسرع (0.3 بدلاً من 0.5) وبدون تأخير
              >اكتشف</motion.span>
              <motion.span 
                className="mx-1"
                initial={{ opacity: 0, y: 10 }} // أقل حركة (10 بدلاً من 20)
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.3 }} // أسرع (تأخير 0.05 بدلاً من 0.2)
              >العالم</motion.span>
            </h2>
            
            <motion.div 
              className="w-20 h-1 bg-accent mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ delay: 0.1, duration: 0.3 }} // أسرع (0.3 بدلاً من 0.6 وتأخير أقل)
              viewport={{ once: true }}
            ></motion.div>
            
            <motion.p 
              className="text-2xl text-white leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }} // أسرع (0.3 بدلاً من 0.7 وتأخير أقل)
              viewport={{ once: true }}
            >
              استكشف أجمل الوجهات السياحية حول العالم مع باقات سفر مخصصة لتناسب تطلعاتك
            </motion.p>
          </motion.div>
          
          {/* Globe Animation with Floating Effect - أسرع */}
          <motion.div 
            className="globe-container relative flex items-center justify-center mb-12"
            ref={globeRef}
            style={{ 
              y: y2,
              translateY: floatY,
              rotate: floatRotate
            }}
            initial={{ scale: 0.95, opacity: 0 }} // تقليل مسافة الظهور (0.95 بدلاً من 0.9)
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }} // ظهور أسرع (0.1 بدلاً من 0.3)
            transition={{ duration: 0.4, delay: 0.1 }} // أسرع (0.4 بدلاً من 0.8 وتأخير أقل)
          >
            <motion.div 
              className="relative w-[500px] h-[500px]"
              whileInView={{
                boxShadow: [
                  "0 0 0 0px rgba(61, 124, 191, 0)",
                  "0 0 0 8px rgba(61, 124, 191, 0.1)",
                  "0 0 0 16px rgba(61, 124, 191, 0)"
                ]
              }}
              transition={{
                duration: 1.5, // أسرع (1.5 بدلاً من 3)
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <Globe />
              
              {/* Decorative orbit rings with improved animations - أسرع */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  className="w-[105%] h-[105%] border-2 border-white/20 rounded-full absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }} // أسرع (20 بدلاً من 30)
                  style={{ opacity: useTransform(scrollY, [0, 200], [0.2, 0.1]) }} // أسرع
                ></motion.div>
                <motion.div 
                  className="w-[115%] h-[115%] border border-white/10 rounded-full absolute"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }} // أسرع (30 بدلاً من 50)
                  style={{ opacity: useTransform(scrollY, [0, 200], [0.1, 0.05]) }} // أسرع
                ></motion.div>
                <motion.div 
                  className="w-[125%] h-[125%] border-dashed border border-accent/10 rounded-full absolute"
                  animate={{ rotate: 180 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }} // أسرع (25 بدلاً من 40)
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Action Button with Pulse Effect - أسرع */}
          <motion.div 
            ref={buttonRef} 
            className="text-center"
            initial={{ opacity: 0, y: 10 }} // أقل حركة (10 بدلاً من 20)
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.3 }} // أسرع (0.3 بدلاً من 0.5 وتأخير أقل)
          >
            <motion.a 
              href="#discover" 
              className="inline-block bg-accent text-dark font-bold px-10 py-4 rounded-full hover:bg-opacity-90 transition-all text-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              whileInView={{
                boxShadow: [
                  "0 5px 15px rgba(61, 124, 191, 0.4)",
                  "0 5px 25px rgba(61, 124, 191, 0.7)",
                  "0 5px 15px rgba(61, 124, 191, 0.4)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 1, // أسرع (1 بدلاً من 2)
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }}
            >
              <span className="inline-flex items-center">
                اكتشف العالم الآن
                <motion.i 
                  className="fas fa-globe-americas mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }} // أسرع (10 بدلاً من 20)
                ></motion.i>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DiscoverWorld;
