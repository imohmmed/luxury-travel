import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Globe from '@/components/Globe';
import AnimatedText from '@/lib/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

interface Destination {
  id: number;
  name: string;
  icon: string;
}

const destinations: Destination[] = [
  { id: 1, name: 'جزر المالديف', icon: 'fas fa-umbrella-beach' },
  { id: 2, name: 'باريس', icon: 'fas fa-landmark' },
  { id: 3, name: 'سويسرا', icon: 'fas fa-mountain' },
  { id: 4, name: 'دبي', icon: 'fas fa-mosque' },
  { id: 5, name: 'اليابان', icon: 'fas fa-torii-gate' },
  { id: 6, name: 'نيويورك', icon: 'fas fa-city' },
];

const DiscoverWorld: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current && contentRef.current && globeRef.current) {
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        }
      });

      gsap.from(globeRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        }
      });
    }
  }, []);

  return (
    <section id="discover" className="py-20 relative overflow-hidden bg-secondary" ref={sectionRef}>
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
        <div className="absolute inset-0 bg-dark bg-opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 reveal">
          <AnimatedText 
            text="اكتشف العالم" 
            className="text-4xl font-bold text-white mb-4"
            once 
          />
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-xl text-white mt-4 max-w-3xl mx-auto">
            استكشف أجمل الوجهات السياحية حول العالم مع باقات سفر مخصصة لتناسب تطلعاتك
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          {/* Globe Animation Container */}
          <div 
            className="mb-8 globe-container reveal relative"
            ref={globeRef}
            style={{ height: "400px", width: "400px" }}
          >
            <Globe />
          </div>
          
          {/* Action Button */}
          <div className="text-center mb-8">
            <a 
              href="/discover-world" 
              className="inline-block bg-accent text-dark font-bold px-10 py-4 rounded-full hover:bg-opacity-90 transition-all text-xl shadow-lg"
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
