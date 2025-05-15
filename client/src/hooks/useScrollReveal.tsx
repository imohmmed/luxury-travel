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
      } else {
        // Allow elements to hide again when scrolling back up
        element.classList.remove('active');
      }
    });
  }, []);

  useEffect(() => {
    // Run once when the hook is first used
    revealElements();
  }, [revealElements]);

  return { revealElements };
};
