import { useCallback, useEffect } from 'react';

export const useScrollReveal = () => {
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

  return { revealElements };
};
