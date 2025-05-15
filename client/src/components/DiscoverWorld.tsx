import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Globe from '@/components/Globe';
import AnimatedText from '@/lib/AnimatedText';
import { destinations } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const DiscoverWorld: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current && titleRef.current && globeRef.current) {
      // Animate the title and description
      gsap.from(titleRef.current.children, {
        y: 30,
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

      // Make globe appear and scale up
      gsap.from(globeRef.current, {
        scale: 0.7,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-right" ref={titleRef}>
            <AnimatedText 
              text="اكتشف العالم" 
              className="text-5xl font-bold text-white mb-6"
              once 
            />
            <div className="w-20 h-1 bg-accent mx-auto lg:mr-0 lg:ml-auto mb-6"></div>
            <p className="text-2xl text-white mb-10 leading-relaxed">
              استكشف أجمل الوجهات السياحية حول العالم مع باقات سفر مخصصة لتناسب تطلعاتك
            </p>
            
            {/* Destination List */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {destinations.slice(0, 6).map((destination) => (
                <div 
                  key={destination.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:bg-accent hover:text-dark transition-all duration-300"
                >
                  <i className={`${destination.icon} text-2xl mb-2`}></i>
                  <p className="font-medium">{destination.name}</p>
                </div>
              ))}
            </div>
            
            {/* Action Button */}
            <div className="mt-8">
              <a 
                href="/discover-world" 
                className="inline-block bg-accent text-dark font-bold px-10 py-4 rounded-full hover:bg-opacity-90 transition-all text-xl shadow-lg"
              >
                اكتشف العالم الآن
                <i className="fas fa-globe-americas mr-2"></i>
              </a>
            </div>
          </div>
          
          {/* Right Side - Globe Animation */}
          <div 
            className="globe-container relative flex items-center justify-center"
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
        </div>
      </div>
    </section>
  );
};

export default DiscoverWorld;
