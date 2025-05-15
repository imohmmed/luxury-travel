import { useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollReveal = () => {
  const revealRef = useRef(null);
  
  // تحسين نسخة لا تعيق التمرير
  const revealElements = useCallback(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // الحصول على جميع عناصر الكشف
    const reveals = document.querySelectorAll('.reveal');
    
    // تعيين الحالة الأولية لعناصر الكشف
    gsap.set(reveals, { autoAlpha: 0, y: 30 });
    
    // إنشاء دفعة لأداء أفضل
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    
    // إنشاء دفعة واحدة لتحسين الأداء
    let ctx = gsap.context(() => {
      reveals.forEach((element) => {
        // استخدام تلاشي سريع لتجنب تعطيل التمرير
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power1.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=10%",
            end: "bottom top+=90%",
            toggleActions: "play none none none",
            once: true, // تشغيل مرة واحدة فقط
            markers: false,
            fastScrollEnd: true
          }
        });
        
        // إضافة فئة نشطة لانتقالات CSS
        element.classList.add('active');
      });
    });
  }, []);

  useEffect(() => {
    // تطبيق التأثيرات بعد تأخير قصير لضمان تحميل المكونات
    const timer = setTimeout(() => {
      revealElements();
    }, 50);
    
    return () => {
      // تنظيف عند إلغاء تركيب المكون
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
      ScrollTrigger.clearMatchMedia();
    };
  }, [revealElements]);

  return { revealElements, revealRef };
};
