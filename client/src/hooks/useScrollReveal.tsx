import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollReveal = () => {
  const revealRef = useRef(null);
  
  // تسريع السكرول وتحسين الأداء
  const revealElements = useCallback(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // الحصول على جميع العناصر المراد تأثيرها
    const reveals = document.querySelectorAll('.reveal');
    
    // تعيين الحالة الأولية للعناصر - تقليل المسافة
    gsap.set(reveals, { autoAlpha: 0, y: 30 });
    
    // إنشاء مجموعة للتحسين
    reveals.forEach((element) => {
      // تسريع الانيميشن لتجنب تأخير السكرول
      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3, // تقليل مدة الانيميشن
        ease: "power1.out", // استخدام تأثير أسرع
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=50", // تحسين نقطة البداية
          toggleActions: "play none none none",
          once: true, // عرض مرة واحدة فقط
          markers: false
        }
      });
      
      // إضافة فئة نشطة للتأثيرات CSS
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
