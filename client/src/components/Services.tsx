import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'wouter';
import AnimatedText from '@/lib/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Custom services data
const services = [
  {
    id: 1,
    title: "قسم الفيز",
    image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "نوفر خدمات استخراج تأشيرات السفر (Visa) لجميع الدول."
  },
  {
    id: 2,
    title: "قسم الكروبات السياحية وتنظيم المؤتمرات",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "تنظيم رحلات سياحية جماعية (Group Tours) داخل وخارج العراق."
  },
  {
    id: 3,
    title: "قسم التذاكر",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "حجز تذاكر الطيران لجميع الخطوط الجوية."
  },
  {
    id: 4,
    title: "قسم إجازات السوق الدولية",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "إصدار إجازات سوق دولية (رخص القيادة الدولية)."
  },
  {
    id: 5,
    title: "قسم التأمين الصحي",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "تأمين صحي للسفر يشمل الطوارئ، العلاج، الحوادث."
  },
  {
    id: 6,
    title: "قسم الاستقبال والتوديع (ترانسفير)",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300",
    description: "خدمات استقبال من المطارات وتوديع عند السفر."
  }
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current && cardsRef.current) {
      const cards = cardsRef.current.children;
      
      // Subtle parallax effect for background
      gsap.to(sectionRef.current, {
        backgroundPosition: `50% ${window.innerHeight / 4}px`,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          fastScrollEnd: true,
          preventOverlaps: true
        }
      });
      
      // Card animations
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
    <section id="services" className="py-10 text-secondary relative bg-fixed bg-cover" 
      ref={sectionRef}
      style={{
        backgroundImage: "linear-gradient(rgba(245, 250, 255, 0.94), rgba(245, 250, 255, 0.94)), url('/img/airlines-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
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
        
        <div className="grid grid-cols-1 gap-6 mb-8" ref={cardsRef}>
          <div className="rounded-lg shadow-lg bg-primary p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">قسم الفيز</h3>
              <ul className="list-disc list-inside space-y-1 text-white mb-4">
                <li>نوفر خدمات استخراج تأشيرات السفر (Visa) لجميع الدول.</li>
                <li>متابعة كاملة من التقديم إلى الاستلام.</li>
                <li>يشمل تأشيرات سياحية، علاجية، تجارية، وزيارات خاصة.</li>
              </ul>
              <div className="mt-3 text-center">
                <Link 
                  to="/visa-booking" 
                  className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
                >
                  احجز فيزا الآن
                  <i className="fas fa-arrow-left mr-2"></i>
                </Link>
              </div>
          </div>
          
          <div className="rounded-lg shadow-lg bg-primary p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">قسم الكروبات السياحية وتنظيم المؤتمرات</h3>
              <ul className="list-disc list-inside space-y-1 text-white mb-4">
                <li>تنظيم رحلات سياحية جماعية (Group Tours) داخل وخارج العراق.</li>
                <li>تنسيق حجوزات الفنادق، التنقل، والبرامج اليومية.</li>
                <li>تنظيم مؤتمرات ومعارض وسفرات عمل متكاملة.</li>
              </ul>
              <div className="mt-3 text-center">
                <Link 
                  to="/groups-booking" 
                  className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
                >
                  احجز رحلة جماعية
                  <i className="fas fa-arrow-left mr-2"></i>
                </Link>
              </div>
          </div>
          
          <div className="rounded-lg shadow-lg bg-primary p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">قسم التذاكر</h3>
              <ul className="list-disc list-inside space-y-1 text-white mb-4">
                <li>حجز تذاكر الطيران لجميع الخطوط الجوية.</li>
                <li>إمكانية اختيار الدرجة (سياحية، رجال أعمال، أولى).</li>
                <li>دعم متكامل قبل وأثناء وبعد الحجز.</li>
              </ul>
              <div className="mt-3 text-center">
                <Link 
                  to="/tickets-booking" 
                  className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
                >
                  احجز تذكرة طيران
                  <i className="fas fa-arrow-left mr-2"></i>
                </Link>
              </div>
          </div>
          
          <div className="rounded-lg shadow-lg bg-primary p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">قسم إجازات السوق الدولية</h3>
              <ul className="list-disc list-inside space-y-1 text-white mb-4">
                <li>إصدار إجازات سوق دولية (رخص القيادة الدولية).</li>
                <li>خدمة سريعة ومعتمدة دوليًا.</li>
                <li>متوفرة لجميع الجنسيات.</li>
              </ul>
              <div className="mt-3 text-center">
                <Link 
                  to="/driving-license" 
                  className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
                >
                  احصل على رخصة دولية
                  <i className="fas fa-arrow-left mr-2"></i>
                </Link>
              </div>
          </div>
          
          <div className="rounded-lg shadow-lg bg-primary p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">قسم التأمين الصحي</h3>
              <ul className="list-disc list-inside space-y-1 text-white mb-4">
                <li>تأمين صحي للسفر يشمل الطوارئ، العلاج، الحوادث.</li>
                <li>معتمد من السفارات وشركات الطيران.</li>
                <li>خطط مرنة حسب مدة السفر والدولة.</li>
              </ul>
              <div className="mt-3 text-center">
                <Link 
                  to="/health-insurance" 
                  className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
                >
                  احجز تأمين صحي
                  <i className="fas fa-arrow-left mr-2"></i>
                </Link>
              </div>
          </div>
          
          <div className="rounded-lg shadow-lg bg-primary p-6">
              <h3 className="text-2xl font-bold mb-2 text-white">قسم الاستقبال والتوديع (ترانسفير)</h3>
              <ul className="list-disc list-inside space-y-1 text-white mb-4">
                <li>خدمات استقبال من المطارات وتوديع عند السفر.</li>
                <li>توفير سيارات فخمة وسواقين محترفين.</li>
                <li>متاحة لجميع الرحلات في دول متعددة.</li>
              </ul>
              <div className="mt-3 text-center">
                <Link 
                  to="/transfer-services" 
                  className="inline-block bg-accent text-dark font-bold px-6 py-2 rounded-full hover:bg-white transition-colors"
                >
                  احجز خدمة استقبال
                  <i className="fas fa-arrow-left mr-2"></i>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
