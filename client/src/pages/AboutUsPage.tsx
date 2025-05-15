import React from 'react';
import { Link } from 'wouter';
import { FaArrowLeft } from 'react-icons/fa';

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-white text-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* العودة للرئيسية */}
        <div className="mb-8">
          <Link to="/" className="flex items-center text-primary hover:text-accent transition-colors">
            <FaArrowLeft className="ml-2" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">من نحن</h1>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* المحتوى */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">شركة التَرَف للسفر والسياحة</h2>
            
            <div className="space-y-6 text-right">
              <p className="text-lg">
                نحن شركة متخصصة في مجال السفر والسياحة، تأسست بهدف تقديم خدمات سياحية فاخرة ومتكاملة تلبي احتياجات العملاء وتفوق توقعاتهم.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">رؤيتنا</h3>
                <p>
                  أن نكون الاختيار الأول والأمثل في مجال السياحة والسفر من خلال تقديم خدمات استثنائية تتسم بالرقي والتميز، والمساهمة في ترسيخ مفهوم السياحة الفاخرة.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">رسالتنا</h3>
                <p>
                  نسعى لتوفير تجارب سفر لا تُنسى من خلال خدمات متكاملة مصممة بعناية، وموظفين محترفين يضعون رضا العميل على رأس أولوياتهم، مع الالتزام بأعلى معايير الجودة والمصداقية.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">قيمنا</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>الالتزام بالجودة في كل الخدمات المقدمة</li>
                  <li>الاحترافية في التعامل مع العملاء</li>
                  <li>الابتكار المستمر في تطوير خدماتنا</li>
                  <li>المصداقية والشفافية في جميع تعاملاتنا</li>
                  <li>الاهتمام بأدق التفاصيل لضمان تجربة سفر مثالية</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">ما يميزنا</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>خبرة واسعة في مجال السياحة والسفر</li>
                  <li>فريق عمل متخصص ومؤهل</li>
                  <li>شراكات استراتيجية مع كبرى الشركات السياحية العالمية</li>
                  <li>حلول سفر مخصصة تناسب احتياجات كل عميل</li>
                  <li>دعم فني وخدمة عملاء متاحة على مدار الساعة</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;