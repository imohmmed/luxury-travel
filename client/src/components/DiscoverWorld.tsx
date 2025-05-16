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
  
  // Parallax effect values
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]); // Slower parallax for video
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]); // Medium parallax for globe
  const opacity = useTransform(scrollY, [100, 500], [1, 0.7]); // Fade effect on scroll
  
  // Globe floating animation
  const floatY = useMotionValue(0);
  const floatRotate = useMotionValue(0);
  
  // Scroll-triggered animations for elements
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Update viewport height for responsive calculations
    setViewportHeight(window.innerHeight);
    
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Animation for floating effect on globe
    const floatAnimation = () => {
      const floatKeyframes = [
        { y: -10, rotate: -1 },
        { y: 0, rotate: 0 },
        { y: 10, rotate: 1 },
        { y: 0, rotate: 0 }
      ];
      
      let currentKeyframe = 0;
      
      const animate = () => {
        const target = floatKeyframes[currentKeyframe];
        floatY.set(target.y);
        floatRotate.set(target.rotate);
        
        currentKeyframe = (currentKeyframe + 1) % floatKeyframes.length;
        setTimeout(animate, 1500);
      };
      
      animate();
    };
    
    // Initialize scroll observation
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      
      if (scrollProgress > 0.1) {
        contentControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }
        });
      } else {
        contentControls.start({
          opacity: 0,
          y: 30,
          transition: { duration: 0.4 }
        });
      }
    };
    
    // Start floating animation
    floatAnimation();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [contentControls, floatY, floatRotate]);

  return (
    <motion.section 
      id="discover" 
      className="py-20 relative overflow-hidden bg-dark min-h-[800px] flex items-center"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
            opacity: useTransform(scrollY, [0, 200], [0.8, 0.92]),
            backdropFilter: useTransform(scrollY, [0, 300], ['blur(2px)', 'blur(5px)'])
          }}
        ></motion.div>
      </motion.div>
      
      {/* Floating Particles with Parallax Effect */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/20"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 10}px`,
              height: `${3 + Math.random() * 10}px`,
              opacity: 0.1 + Math.random() * 0.3
            }}
            animate={{
              y: [0, -100, -50, -200, 0],
              x: [0, 50, -30, 20, 0],
              scale: [1, 1.2, 0.9, 1.1, 1]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              y: useTransform(scrollY, [0, 500], [0, -Math.random() * 100])
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center"
          animate={contentControls}
          initial={{ opacity: 0, y: 30 }}
        >
          {/* Text Content with Reveal Effect */}
          <motion.div 
            className="text-center max-w-3xl mb-12" 
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.165, 0.84, 0.44, 1]
            }}
          >
            <h2 className="text-5xl font-bold text-white mb-6 inline-flex justify-center w-full relative">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >اكتشف</motion.span>
              <motion.span 
                className="mx-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >العالم</motion.span>
            </h2>
            
            <motion.div 
              className="w-20 h-1 bg-accent mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            ></motion.div>
            
            <motion.p 
              className="text-2xl text-white leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
            >
              استكشف أجمل الوجهات السياحية حول العالم مع باقات سفر مخصصة لتناسب تطلعاتك
            </motion.p>
          </motion.div>
          
          {/* Globe Animation with Floating Effect */}
          <motion.div 
            className="globe-container relative flex items-center justify-center mb-12"
            ref={globeRef}
            style={{ 
              y: y2,
              translateY: floatY,
              rotate: floatRotate
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <Globe />
              
              {/* Decorative orbit rings with improved animations */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                  className="w-[105%] h-[105%] border-2 border-white/20 rounded-full absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: useTransform(scrollY, [0, 300], [0.2, 0.1]) }}
                ></motion.div>
                <motion.div 
                  className="w-[115%] h-[115%] border border-white/10 rounded-full absolute"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: useTransform(scrollY, [0, 300], [0.1, 0.05]) }}
                ></motion.div>
                <motion.div 
                  className="w-[125%] h-[125%] border-dashed border border-accent/10 rounded-full absolute"
                  animate={{ rotate: 180 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.2 }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Action Button with Pulse Effect */}
          <motion.div 
            ref={buttonRef} 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
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
                  duration: 2,
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
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
