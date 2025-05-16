import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import Globe from '@/components/Globe';
import AnimatedText from '@/lib/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const DiscoverWorld: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const orbitRingsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // تتبع موقع المؤشر لتحريك الكرة الأرضية
  const handleMouseMove = (e: MouseEvent) => {
    // حساب نسبة موقع المؤشر بالنسبة لعرض وارتفاع الشاشة
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // تحويل القيم إلى نسب بين -10 و 10 للحركة
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    
    setMousePosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useGSAP(() => {
    if (sectionRef.current && titleRef.current && globeRef.current && buttonRef.current && orbitRingsRef.current) {
      // تأثير التحريك عند الظهور في الشاشة
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%", 
          toggleActions: "play none none none",
          once: false,
          scrub: 0.5,
          fastScrollEnd: true,
          preventOverlaps: true
        }
      });
      
      // استخدام طريقة gsap للعناصر الفردية بدلاً من NodeList
      const titleElement = titleRef.current.querySelector('div'); // استهداف div الداخلي
      
      if (titleElement) {
        timeline
          .fromTo(titleElement, 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
          )
          .fromTo(globeRef.current, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, 
            "-=0.4"
          )
          .fromTo(orbitRingsRef.current, 
            { scale: 0.6, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }, 
            "-=0.6"
          )
          .fromTo(buttonRef.current, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, 
            "-=0.3"
          );
      }
        
      // تأثير الحركة عند التمرير للكرة الأرضية
      gsap.to(globeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        scale: 1.1,
        rotation: 0.2, // تغيير من rotationZ إلى rotation
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <section 
      id="discover" 
      className="relative overflow-hidden bg-dark min-h-screen flex items-center justify-center"
      ref={sectionRef}
    >
      {/* خلفية مع تأثير النجوم المتلألئة */}
      <div className="absolute inset-0 z-0 bg-[#041527]">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"></div>
        
        {/* نجوم متحركة */}
        {Array.from({ length: 80 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* الكرة الأرضية تأخذ عرض كامل بالشاشة (كخلفية) */}
      <div 
        className="globe-container absolute inset-0 w-full h-full"
        ref={globeRef}
        style={{
          transform: `perspective(1200px) rotateY(${mousePosition.x * 0.03}deg) rotateX(${-mousePosition.y * 0.03}deg)`,
          transition: 'transform 0.2s ease-out',
          zIndex: 5
        }}
      >
        <div className="w-full h-full">
          <Globe />
          
          {/* حلقات مدارية مزخرفة */}
          <div 
            ref={orbitRingsRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div 
              className="w-[105%] h-[105%] border-2 border-accent/20 rounded-full absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="w-[120%] h-[120%] border border-white/10 rounded-full absolute"
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="w-[135%] h-[135%] border border-white/5 rounded-full absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            />
            
            {/* النقاط المتحركة على المدارات */}
            <motion.div 
              className="absolute w-3 h-3 bg-accent rounded-full shadow-glow"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                top: '50%',
                left: '50%',
                marginLeft: 'calc(-50% + 52.5%)',
                marginTop: '-1.5px',
                boxShadow: '0 0 10px 2px rgba(29, 161, 242, 0.5)'
              }}
            />
            
            <motion.div 
              className="absolute w-2 h-2 bg-white rounded-full shadow-glow"
              animate={{
                rotate: -360
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                top: '50%',
                left: '50%',
                marginLeft: 'calc(-50% + 60%)',
                marginTop: '-1px',
                boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.3)'
              }}
            />
            
            <motion.div 
              className="absolute w-4 h-4 bg-accent/80 rounded-full shadow-glow"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 70,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                top: '50%',
                left: '50%',
                marginLeft: 'calc(-50% + 67.5%)',
                marginTop: '-2px',
                boxShadow: '0 0 15px 3px rgba(29, 161, 242, 0.4)'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* محتوى القسم كامل العرض */}
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* عنوان اكتشف العالم مع الحلقات المدارية بعرض كامل */}
        <div 
          className="w-full mb-8 pt-12 relative z-30"
          ref={titleRef}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute inset-x-0 top-0 z-20 flex flex-col items-center"
          >
            {/* الحلقات المدارية المزخرفة حول العنوان */}
            <div 
              ref={orbitRingsRef}
              className="absolute top-1/2 transform -translate-y-1/2 w-full h-40 flex items-center justify-center"
            >
              <motion.div 
                className="w-[80%] h-12 border-t-2 border-b-2 border-accent/30 rounded-full absolute"
                style={{ height: '200px' }}
                animate={{ scaleX: [1, 1.05, 1], scaleY: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="w-[90%] h-12 border-t border-b border-white/10 rounded-full absolute"
                style={{ height: '280px' }}
                animate={{ scaleX: [1, 1.03, 1], scaleY: [1, 1.05, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* نقاط متحركة على المسارات */}
              <motion.div 
                className="absolute w-3 h-3 bg-accent rounded-full shadow-glow"
                animate={{
                  x: ['-40vw', '40vw', '-40vw'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  top: '80px',
                  boxShadow: '0 0 10px 2px rgba(29, 161, 242, 0.5)'
                }}
              />
              
              <motion.div 
                className="absolute w-2 h-2 bg-white rounded-full shadow-glow"
                animate={{
                  x: ['45vw', '-45vw', '45vw'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  top: '120px',
                  boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.3)'
                }}
              />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-3 inline-flex justify-center text-shadow-xl z-30">
              <span>اكتشف</span>
              <span className="mx-2">العالم</span>
            </h2>
            <div className="w-48 h-1 bg-accent mb-6 z-30"></div>
          </motion.div>
        </div>
        
        {/* النص والزر تحت الكرة الأرضية */}
        <div className="w-full mt-[55vh] z-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-white leading-relaxed text-shadow-md mb-10">
                استكشف أجمل الوجهات السياحية حول العالم مع باقات سفر مخصصة لتناسب تطلعاتك واكتشف ثقافات وأماكن جديدة تنتظرك
              </p>
              
              {/* زر العمل */}
              <div ref={buttonRef}>
                <motion.a 
                  href="/discover-world" 
                  className="inline-block bg-accent text-dark font-bold px-12 py-5 rounded-full hover:bg-white transition-all text-xl shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(29, 161, 242, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  اكتشف العالم الآن
                  <i className="fas fa-globe-americas mr-2"></i>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* مؤشرات الاتجاه المتحركة */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60 text-2xl"
        >
          <i className="fas fa-chevron-down"></i>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoverWorld;
