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

const services: Service[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'رحلات طيران فاخرة',
    description: 'احجز رحلات الطيران على الدرجة الأولى ودرجة رجال الأعمال مع أفضل شركات الطيران العالمية'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'فنادق ومنتجعات فاخرة',
    description: 'تمتع بإقامة لا تُنسى في أفخم الفنادق والمنتجعات حول العالم مع خدمات حصرية'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/843633/pexels-photo-843633.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    title: 'رحلات بحرية فاخرة',
    description: 'استمتع برحلات بحرية على متن أفخم اليخوت والسفن السياحية مع خدمة شخصية متميزة'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'رحلات سفاري فاخرة',
    description: 'عش تجربة سفاري فريدة في أفضل المحميات الطبيعية بإفريقيا مع إقامة في أفخم المخيمات'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'جولات سياحية خاصة',
    description: 'استمتع بجولات سياحية خاصة مع مرشدين متخصصين يتحدثون لغتك ويعرفون أفضل الأماكن'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    title: 'خدمات سفر الأعمال',
    description: 'خدمات متكاملة لرجال الأعمال تشمل حجز الرحلات والفنادق وتنظيم المؤتمرات والفعاليات'
  }
];

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
    <section id="services" className="py-20 bg-neutral" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <AnimatedText 
            text="خدماتنا" 
            className="text-4xl font-bold text-secondary mb-4"
            once 
          />
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
            نقدم باقة متنوعة من الخدمات السياحية الفاخرة لتلبية احتياجاتك
          </p>
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
                <h3 className="text-2xl font-bold text-secondary mb-3">{service.title}</h3>
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
