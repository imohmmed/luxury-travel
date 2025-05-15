import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedText from '@/lib/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Import services from lib/constants.ts
import { services } from '@/lib/constants';

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current && cardsRef.current) {
      const cards = cardsRef.current.children;
      
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        }
      });
    }
  }, []);

  return (
    <section id="services" className="py-20 bg-neutral text-secondary" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <AnimatedText 
            text="خدماتنا" 
            className="text-4xl font-bold text-primary mb-4"
            once 
          />
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            نقدم باقة متنوعة من الخدمات السياحية الفاخرة من خلال أقسامنا المتخصصة
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-bold text-primary">قسم الفيز</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-bold text-primary">قسم الكروبات السياحية وتنظيم المؤتمرات</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-bold text-primary">قسم التذاكر</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-bold text-primary">قسم إجازات السوق الدولية</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-bold text-primary">قسم التأمين الصحي</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-bold text-primary">قسم الاستقبال والتوديع</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={cardsRef}>
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover-scale reveal"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href="#" className="text-primary font-bold hover:text-accent transition-colors">
                  اكتشف المزيد <i className="fas fa-chevron-left mr-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
