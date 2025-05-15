import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollReveal = () => {
  const revealRef = useRef(null);
  
  // Improved version that doesn't block scrolling
  const revealElements = useCallback(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Get all reveal elements
    const reveals = document.querySelectorAll('.reveal');
    
    // Set initial state for reveal elements
    gsap.set(reveals, { autoAlpha: 0, y: 50 });
    
    // Create a batch for better performance
    reveals.forEach((element) => {
      // Use quick fade to avoid scroll blocking
      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          toggleActions: "play none none none",
          once: true,
          fastScrollEnd: true,
          preventOverlaps: true
        }
      });
      
      // Add active class for CSS transitions
      element.classList.add('active');
    });
  }, []);

  useEffect(() => {
    // Add active class to all elements immediately
    setTimeout(() => {
      revealElements();
    }, 100);
    
    return () => {
      // Cleanup when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
    };
  }, [revealElements]);

  return { revealElements, revealRef };
};
