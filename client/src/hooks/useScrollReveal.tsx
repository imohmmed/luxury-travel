import { useCallback, useEffect } from 'react';

export const useScrollReveal = () => {
  const revealElements = useCallback(() => {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }, []);

  useEffect(() => {
    // Run once when the hook is first used
    revealElements();
  }, [revealElements]);

  return { revealElements };
};
