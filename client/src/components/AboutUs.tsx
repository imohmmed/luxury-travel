import React from 'react';
import { Link } from 'wouter';
import AnimatedText from '@/lib/AnimatedText';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-10 bg-white text-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4 justify-center w-full">
            <AnimatedText text="من نحن؟" className="text-primary" />
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="flex flex-col items-center">
          {/* About Content */}
          <div className="w-full">
            <h3 className="text-3xl font-bold text-secondary mb-6 text-center">
              <AnimatedText text="شركة التَرَف - الرائدة في مجال السياحة والسفر الفاخر" className="text-secondary" />
            </h3>
            <div className="text-lg text-gray-600 mb-6">
              <AnimatedText 
                text="نحن شركة التَرَف المتخصصة في تقديم خدمات السفر والسياحة الفاخرة، ونقدم مجموعة متكاملة من الخدمات بدءاً من الفيز والتذاكر وصولاً إلى التأمين الصحي وإجازات السوق الدولية. نسعى جاهدين لتوفير تجارب سفر استثنائية تلبي أعلى توقعات عملائنا بعناية فائقة للتفاصيل."
                className="text-gray-600"
              />
            </div>
            <div className="text-lg text-gray-600 mb-8">
              <AnimatedText 
                text="يتكون فريقنا من خبراء متخصصين في مختلف أقسام الشركة، بدءاً من قسم الفيز إلى قسم الكروبات السياحية وتنظيم المؤتمرات، وقسم الاستقبال والتوديع (ترانسفير) وغيرها من الخدمات المتميزة."
                className="text-gray-600"
              />
            </div>
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