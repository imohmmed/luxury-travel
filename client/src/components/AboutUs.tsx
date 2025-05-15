import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'wouter';
import AnimatedText from '@/lib/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current && contentRef.current) {
      // تكوين ScrollTrigger للأداء الأفضل
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize" // تحسين أحداث التحديث التلقائي
      });

      // تطبيق تأثير متحرك محسن على المحتوى
      const childElements = contentRef.current ? Array.from(contentRef.current.children) : [];
      
      const ctx = gsap.context(() => {
        gsap.from(childElements, {
          y: 30, // تقليل المسافة للحركة الأكثر سلاسة
          opacity: 0,
          stagger: 0.12, // تقليل التباعد بين العناصر
          duration: 0.7, // مدة قصيرة قليلاً للحركة الأكثر سرعة
          ease: "power2.out", // منحنى تسارع أكثر طبيعية
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", // بدء التأثير قبل وصول القسم بقليل
            end: "top 30%",
            scrub: 0.8, // قيمة أقل للتحكم الأكثر دقة
            invalidateOnRefresh: true, // إعادة الحساب عند التحديث
            fastScrollEnd: true, // تحسين نهاية التمرير السريع
          }
        });
      });

      // تنظيف السياق عند إزالة المكون
      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="about" className="py-10 bg-white text-secondary" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl font-bold text-primary mb-4 inline-flex justify-center w-full">
            <span>من</span>
            <span className="mx-1">نحن؟</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="flex flex-col items-center">
          {/* About Content */}
          <div className="w-full reveal" ref={contentRef}>
            <h3 className="text-3xl font-bold text-secondary mb-6 whitespace-nowrap text-center">شركة التَرَف - الرائدة في مجال السياحة والسفر الفاخر</h3>
            <p className="text-lg text-gray-600 mb-6">
              نحن شركة التَرَف المتخصصة في تقديم خدمات السفر والسياحة الفاخرة، ونقدم مجموعة متكاملة من الخدمات بدءاً من الفيز والتذاكر وصولاً إلى التأمين الصحي وإجازات السوق الدولية. نسعى جاهدين لتوفير تجارب سفر استثنائية تلبي أعلى توقعات عملائنا بعناية فائقة للتفاصيل.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              يتكون فريقنا من خبراء متخصصين في مختلف أقسام الشركة، بدءاً من قسم الفيز إلى قسم الكروبات السياحية وتنظيم المؤتمرات، وقسم الاستقبال والتوديع (ترانسفير) وغيرها من الخدمات المتميزة.
            </p>
            <div className="text-center w-full">
              <Link to="/about-us" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all">
                اقرأ المزيد
                <i className="fas fa-arrow-left mr-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
