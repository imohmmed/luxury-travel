import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

// مكون لعرض النص بتأثير متحرك
const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, once = false }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // إعادة تعيين مراجع الكلمات عندما يتغير النص
  useEffect(() => {
    wordRefs.current = wordRefs.current.slice(0, text.split(' ').length);
  }, [text]);

  useGSAP(() => {
    if (!textRef.current) return;

    // تكوين مرجع للتأثير
    const words = wordRefs.current.filter(Boolean);
    
    if (words.length) {
      // تعيين الإعدادات الأولية
      gsap.set(words, { 
        y: 30, 
        opacity: 0 
      });

      // إنشاء تأثير متحرك
      const animation = gsap.to(words, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
        paused: true
      });

      // إنشاء تأثير عند التمرير أو تشغيله مباشرة
      if (once) {
        // إذا كان التأثير يعمل مرة واحدة فقط
        animation.play();
      } else {
        // إذا كان التأثير يعمل عند التمرير
        ScrollTrigger.create({
          trigger: textRef.current,
          start: "top 90%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
          onEnter: () => animation.play(),
          onLeaveBack: () => animation.reverse(),
        });
      }
    }
  }, [text, once]);

  return (
    <div ref={textRef} className={cn("overflow-hidden", className)}>
      {text.split(' ').map((word, index) => (
        <span
          key={index}
          className="inline-block mx-1"
          ref={el => wordRefs.current[index] = el}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;