import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', once = false }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Instead of animating character by character, we'll animate the whole text
    textRef.current.innerHTML = text;
    textRef.current.style.opacity = '0';
    textRef.current.style.transform = 'translateY(20px)';
    
    const animateIn = () => {
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      });
    };

    if (once) {
      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 80%",
        onEnter: animateIn,
        once: true
      });
    } else {
      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 80%",
        onEnter: animateIn,
        onLeaveBack: () => {
          gsap.to(textRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.5,
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, once]);

  return <h2 ref={textRef} className={className}>{text}</h2>;
};

export default AnimatedText;
