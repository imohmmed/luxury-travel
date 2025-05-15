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

    const splitText = text.split('');
    textRef.current.innerHTML = ''; // Clear any existing content

    // Wrap each character in a span
    splitText.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(20px)';
      textRef.current?.appendChild(span);
    });

    // Animate each character
    const chars = textRef.current.querySelectorAll('span');
    
    const animateIn = () => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
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
          gsap.to(chars, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.02,
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
