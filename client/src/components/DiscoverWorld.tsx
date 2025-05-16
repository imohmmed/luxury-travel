import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import Globe from '@/components/Globe';

gsap.registerPlugin(ScrollTrigger);

const DiscoverWorld: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const orbitRingsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
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
    if (sectionRef.current && titleRef.current && globeRef.current && orbitRingsRef.current) {
      // تأثير التحريك عند الظهور في الشاشة
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: false,
          scrub: 0.5
        }
      });
      
      // استخدام طريقة gsap للعناصر
      timeline
        .fromTo(titleRef.current, 
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
        );
        
      if (buttonRef.current) {
        timeline.fromTo(buttonRef.current, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, 
          "-=0.3"
        );
      }
    }
  }, []);

  return (
    <section 
      id="discover" 
      className="py-20 relative overflow-hidden bg-dark min-h-screen flex items-center"
      ref={sectionRef}
    >
      {/* خلفية مع تأثير النجوم المتلألئة */}
      <div className="absolute inset-0 z-0 bg-[#041527]">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent"></div>
        
        {/* نجوم متحركة */}
        {Array.from({ length: 50 }).map((_, index) => (
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
      
      {/* محتوى القسم */}
      <div className="w-full relative z-10">
        {/* عنوان اكتشف العالم فوق الكرة الأرضية */}
        <div 
          className="text-center max-w-4xl mx-auto mb-8 relative z-20"
          ref={titleRef}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 inline-flex justify-center w-full text-shadow-lg">
            <span>اكتشف</span>
            <span className="mx-2">العالم</span>
          </h2>
          <div className="w-32 h-1 bg-accent mx-auto mb-6"></div>
        </div>
        
        {/* الكرة الأرضية تأخذ الصفحة بالكامل (تحت العنوان) */}
        <div 
          className="globe-container relative flex items-center justify-center w-full h-[70vh] md:h-[80vh] mx-auto"
          ref={globeRef}
          style={{
            transform: `perspective(1200px) rotateY(${mousePosition.x * 0.03}deg) rotateX(${-mousePosition.y * 0.03}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="relative w-full h-full">
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
                className="w-[110%] h-[110%] border border-white/10 rounded-full absolute"
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="w-[120%] h-[120%] border border-white/5 rounded-full absolute"
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
                  marginLeft: 'calc(-50% + 55%)',
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
                  marginLeft: 'calc(-50% + 60%)',
                  marginTop: '-2px',
                  boxShadow: '0 0 15px 3px rgba(29, 161, 242, 0.4)'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* زر العمل في الأسفل */}
        <div ref={buttonRef} className="text-center mt-6">
          <motion.a 
            href="/discover-world" 
            className="inline-block bg-accent text-dark font-bold px-10 py-4 rounded-full hover:bg-white transition-all text-xl shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(29, 161, 242, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            اكتشف العالم الآن
            <i className="fas fa-globe-americas mr-2"></i>
          </motion.a>
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