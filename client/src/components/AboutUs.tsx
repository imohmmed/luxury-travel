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
    if (sectionRef.current && imageRef.current && contentRef.current) {
      gsap.from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        }
      });

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
    <section id="about" className="py-20 bg-white text-secondary" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <AnimatedText 
            text="من نحن؟" 
            className="text-4xl font-bold text-primary mb-4"
            once 
          />
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          {/* About Image */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 reveal" ref={imageRef}>
            <div className="relative overflow-hidden rounded-lg shadow-xl hover-scale">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="فريق سفر الفخامة" 
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          
          {/* About Content */}
          <div className="w-full md:w-1/2 md:pr-10 reveal" ref={contentRef}>
            <h3 className="text-3xl font-bold text-secondary mb-6">شركة رائدة في مجال السياحة والسفر الفاخر</h3>
            <p className="text-lg text-gray-600 mb-6">
              نحن شركة متخصصة في تقديم خدمات السفر والسياحة الفاخرة، نسعى جاهدين لتوفير تجارب سفر استثنائية تلبي أعلى توقعات عملائنا. منذ تأسيسنا، نجحنا في بناء سمعة متميزة في مجال السياحة الفاخرة من خلال التزامنا بتقديم خدمات شخصية مخصصة وعناية فائقة بالتفاصيل.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              يتكون فريقنا من خبراء السفر المحترفين الذين يمتلكون معرفة واسعة بأفضل الوجهات السياحية والفنادق الفاخرة حول العالم.
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
