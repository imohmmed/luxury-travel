import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SlideInTextProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  className?: string;
}

const SlideInText: React.FC<SlideInTextProps> = ({ 
  children, 
  direction = 'right', 
  delay = 0,
  className = ''
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    const xValue = direction === 'right' ? 50 : -50;
    
    gsap.fromTo(
      textRef.current,
      { 
        x: xValue, 
        opacity: 0 
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  }, [direction, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default SlideInText;