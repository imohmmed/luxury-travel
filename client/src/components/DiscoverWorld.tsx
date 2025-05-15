import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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

  useGSAP(() => {
    if (sectionRef.current && titleRef.current && globeRef.current && buttonRef.current) {
      // Simple fade-in for elements instead of heavy scroll animations
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%", 
          toggleActions: "play none none none",
          once: true,
          fastScrollEnd: true,
          preventOverlaps: true
        }
      });
      
      // Add animations to timeline for better performance
      timeline
        .fromTo(titleRef.current.children, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power1.out" }
        )
        .fromTo(globeRef.current, 
          { scale: 0.9, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.4, ease: "power1.out" }, 
          "-=0.2"
        )
        .fromTo(buttonRef.current, 
          { y: 10, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }, 
          "-=0.1"
        );
    }
  }, []);

  return (
    <section 
      id="discover" 
      className="py-20 relative overflow-hidden bg-dark min-h-[800px] flex items-center"
      ref={sectionRef}
    >
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-aerial-shot-of-a-beach-5166/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark bg-opacity-80 backdrop-blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Text Content */}
          <div className="text-center max-w-3xl mb-12" ref={titleRef}>
            <h2 className="text-5xl font-bold text-white mb-6 inline-flex justify-center w-full">
              <span>اكتشف</span>
              <span className="mx-1">العالم</span>
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-2xl text-white leading-relaxed">
              استكشف أجمل الوجهات السياحية حول العالم مع باقات سفر مخصصة لتناسب تطلعاتك
            </p>
          </div>
          
          {/* Globe Animation */}
          <div 
            className="globe-container relative flex items-center justify-center mb-12"
            ref={globeRef}
          >
            <div className="relative w-[500px] h-[500px]">
              <Globe />
              
              {/* Decorative orbit rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[105%] h-[105%] border-2 border-white/20 rounded-full absolute animate-spin" style={{ animationDuration: '30s' }}></div>
                <div className="w-[115%] h-[115%] border border-white/10 rounded-full absolute animate-spin" style={{ animationDuration: '50s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div ref={buttonRef} className="text-center">
            <a 
              href="/discover-world" 
              className="inline-block bg-accent text-dark font-bold px-10 py-4 rounded-full hover:bg-opacity-90 transition-all text-xl shadow-lg transform hover:scale-105 duration-300"
            >
              اكتشف العالم الآن
              <i className="fas fa-globe-americas mr-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverWorld;
