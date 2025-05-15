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
    // Show all elements immediately
    revealElements();
  }, [revealElements]);

  return { revealElements, revealRef };
};
