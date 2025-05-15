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
    <section id="services" className="py-10 text-secondary relative" ref={sectionRef}
      style={{
        backgroundImage: "linear-gradient(rgba(245, 250, 255, 0.95), rgba(245, 250, 255, 0.95)), url('https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 reveal">
          <AnimatedText 
            text="خدماتنا" 
            className="text-4xl font-bold text-primary mb-4"
            once 
          />
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            نقدم باقة متنوعة من الخدمات السياحية الفاخرة من خلال أقسامنا المتخصصة
          </p>
        </div>
        
        <div className="space-y-4 mb-8" ref={cardsRef}>
          <div className="p-4 bg-white rounded-lg shadow-md reveal border-r-4 border-primary">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1591261730899-5a78d7cddcee?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="قسم الفيز" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">قسم الفيز</h3>
                <p className="text-gray-600 text-sm md:text-base">نقدم خدمات متكاملة لاستخراج التأشيرات السياحية والتجارية لكافة دول العالم بإجراءات سريعة وموثوقة.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-md reveal border-r-4 border-primary">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1532635224-cf024e9d1904?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="قسم الكروبات السياحية وتنظيم المؤتمرات" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">قسم الكروبات السياحية وتنظيم المؤتمرات</h3>
                <p className="text-gray-600 text-sm md:text-base">خدمات احترافية لتنظيم رحلات المجموعات والمؤتمرات العالمية بأعلى مستويات الجودة والاهتمام بالتفاصيل.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-md reveal border-r-4 border-primary">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="قسم التذاكر" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">قسم التذاكر</h3>
                <p className="text-gray-600 text-sm md:text-base">احجز تذاكر الطيران على الدرجة الأولى ودرجة رجال الأعمال مع أفضل شركات الطيران العالمية بأسعار تنافسية.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-md reveal border-r-4 border-primary">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="قسم إجازات السوق الدولية" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">قسم إجازات السوق الدولية</h3>
                <p className="text-gray-600 text-sm md:text-base">خدمات استخراج وتجديد رخص القيادة الدولية لتمكينك من قيادة السيارات أثناء سفرك في مختلف دول العالم بسهولة وأمان.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-md reveal border-r-4 border-primary">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="قسم التأمين الصحي" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">قسم التأمين الصحي</h3>
                <p className="text-gray-600 text-sm md:text-base">نوفر خدمات التأمين الصحي للمسافرين بتغطية شاملة في جميع أنحاء العالم لضمان رحلة آمنة ومطمئنة.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-md reveal border-r-4 border-primary">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1523475743164-9191dafcb0d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" alt="قسم الاستقبال والتوديع (ترانسفير)" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">قسم الاستقبال والتوديع (ترانسفير)</h3>
                <p className="text-gray-600 text-sm md:text-base">خدمات VIP للاستقبال والتوديع في المطارات العالمية مع سيارات فاخرة وسائقين محترفين لراحة تامة خلال تنقلاتك.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
