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
    <section id="services" className="py-16 text-secondary relative" ref={sectionRef}
      style={{
        backgroundImage: "linear-gradient(rgba(245, 250, 255, 0.95), rgba(245, 250, 255, 0.95)), url('https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
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
        
        <div className="space-y-8 mb-10" ref={cardsRef}>
          <div className="p-6 bg-white rounded-xl shadow-lg reveal flex flex-col md:flex-row items-center gap-6">
            <img src="https://images.unsplash.com/photo-1591261730899-5a78d7cddcee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" alt="قسم الفيز" className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">قسم الفيز</h3>
              <p className="text-gray-600">نقدم خدمات متكاملة لاستخراج التأشيرات السياحية والتجارية لكافة دول العالم بإجراءات سريعة وموثوقة. فريقنا من الخبراء يعمل على تسهيل الإجراءات وتوفير الوقت والجهد لعملائنا.</p>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-lg reveal flex flex-col md:flex-row items-center gap-6">
            <img src="https://images.unsplash.com/photo-1532635224-cf024e9d1904?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" alt="قسم الكروبات السياحية وتنظيم المؤتمرات" className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">قسم الكروبات السياحية وتنظيم المؤتمرات</h3>
              <p className="text-gray-600">خدمات احترافية لتنظيم رحلات المجموعات والمؤتمرات العالمية بأعلى مستويات الجودة والاهتمام بالتفاصيل. نضمن تجربة ناجحة ومميزة لجميع المشاركين.</p>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-lg reveal flex flex-col md:flex-row items-center gap-6">
            <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" alt="قسم التذاكر" className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">قسم التذاكر</h3>
              <p className="text-gray-600">احجز تذاكر الطيران على الدرجة الأولى ودرجة رجال الأعمال مع أفضل شركات الطيران العالمية بأسعار تنافسية. نوفر خيارات متعددة تناسب جميع المتطلبات.</p>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-lg reveal flex flex-col md:flex-row items-center gap-6">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" alt="قسم إجازات السوق الدولية" className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">قسم إجازات السوق الدولية</h3>
              <p className="text-gray-600">خدمات استخراج وتجديد رخص القيادة الدولية لتمكينك من قيادة السيارات أثناء سفرك في مختلف دول العالم بسهولة وأمان.</p>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-lg reveal flex flex-col md:flex-row items-center gap-6">
            <img src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" alt="قسم التأمين الصحي" className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">قسم التأمين الصحي</h3>
              <p className="text-gray-600">نوفر خدمات التأمين الصحي للمسافرين بتغطية شاملة في جميع أنحاء العالم لضمان رحلة آمنة ومطمئنة. خطط تأمين متنوعة تناسب جميع الميزانيات والاحتياجات.</p>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-lg reveal flex flex-col md:flex-row items-center gap-6">
            <img src="https://images.unsplash.com/photo-1523475743164-9191dafcb0d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" alt="قسم الاستقبال والتوديع (ترانسفير)" className="w-full md:w-1/3 h-64 object-cover rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-primary mb-3">قسم الاستقبال والتوديع (ترانسفير)</h3>
              <p className="text-gray-600">خدمات VIP للاستقبال والتوديع في المطارات العالمية مع سيارات فاخرة وسائقين محترفين لراحة تامة خلال تنقلاتك.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
