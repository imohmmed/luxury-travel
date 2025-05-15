import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedText from '@/lib/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current && contentRef.current) {
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
        }
      });
    }
  }, []);

  return (
    <section id="about" className="py-10 bg-white text-secondary" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <AnimatedText 
            text="من نحن؟" 
            className="text-4xl font-bold text-primary mb-4"
            once 
          />
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="flex flex-col items-center">
          {/* About Content */}
          <div className="w-full reveal" ref={contentRef}>
            <h3 className="text-3xl font-bold text-secondary mb-6">شركة التَرَف - الرائدة في مجال السياحة والسفر الفاخر</h3>
            <p className="text-lg text-gray-600 mb-6">
              نحن شركة التَرَف المتخصصة في تقديم خدمات السفر والسياحة الفاخرة، ونقدم مجموعة متكاملة من الخدمات بدءاً من الفيز والتذاكر وصولاً إلى التأمين الصحي وإجازات السوق الدولية. نسعى جاهدين لتوفير تجارب سفر استثنائية تلبي أعلى توقعات عملائنا بعناية فائقة للتفاصيل.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              يتكون فريقنا من خبراء متخصصين في مختلف أقسام الشركة، بدءاً من قسم الفيز إلى قسم الكروبات السياحية وتنظيم المؤتمرات، وقسم الاستقبال والتوديع (ترانسفير) وغيرها من الخدمات المتميزة.
            </p>
            <a href="#" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all">
              اقرأ المزيد
              <i className="fas fa-arrow-left mr-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
