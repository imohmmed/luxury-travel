import { useCallback, useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const revealRef = useRef(null);
  
  const revealElements = useCallback(() => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
      element.classList.add('active');
    });
  }, []);

  useEffect(() => {
    // Add active class to all elements immediately
    setTimeout(() => {
      revealElements();
    }, 100);
  }, [revealElements]);

  return { revealElements, revealRef };
};
