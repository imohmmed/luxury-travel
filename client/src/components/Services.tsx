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
        
        <div className="space-y-6 mb-8" ref={cardsRef}>
          {/* قسم الفيز */}
          <div className="h-64 rounded-lg overflow-hidden shadow-lg reveal relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300" 
                alt="قسم الفيز" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50"></div>
            </div>
            <div className="absolute inset-0 z-10 p-6 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">قسم الفيز</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>نوفر خدمات استخراج تأشيرات السفر (Visa) لجميع الدول.</li>
                <li>متابعة كاملة من التقديم إلى الاستلام.</li>
                <li>يشمل تأشيرات سياحية، علاجية، تجارية، وزيارات خاصة.</li>
              </ul>
            </div>
          </div>
          
          {/* قسم الكروبات السياحية وتنظيم المؤتمرات */}
          <div className="h-64 rounded-lg overflow-hidden shadow-lg reveal relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300" 
                alt="قسم الكروبات السياحية وتنظيم المؤتمرات" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50"></div>
            </div>
            <div className="absolute inset-0 z-10 p-6 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">قسم الكروبات السياحية وتنظيم المؤتمرات</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>تنظيم رحلات سياحية جماعية (Group Tours) داخل وخارج العراق.</li>
                <li>تنسيق حجوزات الفنادق، التنقل، والبرامج اليومية.</li>
                <li>تنظيم مؤتمرات ومعارض وسفرات عمل متكاملة.</li>
              </ul>
            </div>
          </div>
          
          {/* قسم التذاكر */}
          <div className="h-64 rounded-lg overflow-hidden shadow-lg reveal relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300" 
                alt="قسم التذاكر" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50"></div>
            </div>
            <div className="absolute inset-0 z-10 p-6 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">قسم التذاكر</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>حجز تذاكر الطيران لجميع الخطوط الجوية.</li>
                <li>إمكانية اختيار الدرجة (سياحية، رجال أعمال، أولى).</li>
                <li>دعم متكامل قبل وأثناء وبعد الحجز.</li>
              </ul>
            </div>
          </div>
          
          {/* قسم إجازات السوق الدولية */}
          <div className="h-64 rounded-lg overflow-hidden shadow-lg reveal relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300" 
                alt="قسم إجازات السوق الدولية" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50"></div>
            </div>
            <div className="absolute inset-0 z-10 p-6 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">قسم إجازات السوق الدولية</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>إصدار إجازات سوق دولية (رخص القيادة الدولية).</li>
                <li>خدمة سريعة ومعتمدة دوليًا.</li>
                <li>متوفرة لجميع الجنسيات.</li>
              </ul>
            </div>
          </div>
          
          {/* قسم التأمين الصحي */}
          <div className="h-64 rounded-lg overflow-hidden shadow-lg reveal relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300" 
                alt="قسم التأمين الصحي" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50"></div>
            </div>
            <div className="absolute inset-0 z-10 p-6 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">قسم التأمين الصحي</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>تأمين صحي للسفر يشمل الطوارئ، العلاج، الحوادث.</li>
                <li>معتمد من السفارات وشركات الطيران.</li>
                <li>خطط مرنة حسب مدة السفر والدولة.</li>
              </ul>
            </div>
          </div>
          
          {/* قسم الاستقبال والتوديع (ترانسفير) */}
          <div className="h-64 rounded-lg overflow-hidden shadow-lg reveal relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300" 
                alt="قسم الاستقبال والتوديع (ترانسفير)" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50"></div>
            </div>
            <div className="absolute inset-0 z-10 p-6 text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">قسم الاستقبال والتوديع (ترانسفير)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>خدمات استقبال من المطارات وتوديع عند السفر.</li>
                <li>توفير سيارات فخمة وسواقين محترفين.</li>
                <li>متاحة لجميع الرحلات في دول متعددة.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
