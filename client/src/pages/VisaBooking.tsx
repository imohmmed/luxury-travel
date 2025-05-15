import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import AnimatedText from '@/lib/AnimatedText';

const VisaBooking: React.FC = () => {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 relative bg-cover bg-center text-white"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1526495124232-a04e1849168c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          }}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">احجز فيزا سفر</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              نقدم خدمات استخراج التأشيرات السياحية والتجارية لكافة دول العالم بإجراءات سريعة وموثوقة
            </p>
          </div>
        </section>
        
        {/* Booking Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 border-t-4 border-primary">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">نموذج حجز تأشيرة سفر</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="أدخل الاسم الكامل كما في جواز السفر"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="رقم الهاتف للتواصل"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="البريد الإلكتروني"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">الجنسية</label>
                    <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">اختر الجنسية</option>
                      <option value="عراقي">عراقي</option>
                      <option value="سعودي">سعودي</option>
                      <option value="مصري">مصري</option>
                      <option value="سوري">سوري</option>
                      <option value="أردني">أردني</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">نوع التأشيرة</label>
                    <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">اختر نوع التأشيرة</option>
                      <option value="سياحية">تأشيرة سياحية</option>
                      <option value="عمل">تأشيرة عمل</option>
                      <option value="دراسة">تأشيرة دراسة</option>
                      <option value="علاج">تأشيرة علاج</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">بلد الوجهة</label>
                    <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">اختر بلد الوجهة</option>
                      <option value="تركيا">تركيا</option>
                      <option value="الإمارات العربية المتحدة">الإمارات العربية المتحدة</option>
                      <option value="المملكة المتحدة">المملكة المتحدة</option>
                      <option value="الولايات المتحدة">الولايات المتحدة</option>
                      <option value="دول شنغن">دول شنغن</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">تاريخ السفر المتوقع</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">ملاحظات إضافية</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="أي معلومات إضافية ترغب بإضافتها"
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
                  >
                    إرسال طلب الحجز
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">الأسئلة الشائعة حول التأشيرات</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2">ما هي المستندات المطلوبة للحصول على تأشيرة؟</h3>
                <p className="text-gray-700">تختلف المستندات المطلوبة حسب نوع التأشيرة والدولة المقصودة، لكن عموماً تتضمن: جواز سفر ساري المفعول، صور شخصية، إثبات الإقامة، إثبات القدرة المالية، وتذاكر السفر والإقامة. سيقوم فريقنا بتزويدك بقائمة متكاملة بعد تقديم الطلب.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2">كم من الوقت يستغرق استخراج التأشيرة؟</h3>
                <p className="text-gray-700">تختلف مدة استخراج التأشيرة حسب نوعها والدولة، وتتراوح عادة بين 5 أيام إلى 3 أسابيع. توجد خدمات تأشيرات مستعجلة لبعض الدول مقابل رسوم إضافية.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2">هل يمكنني استرداد رسوم التأشيرة في حال الرفض؟</h3>
                <p className="text-gray-700">رسوم السفارة غير قابلة للاسترداد في حالة رفض الطلب، لكن رسوم خدماتنا الإدارية يمكن استردادها جزئياً حسب سياستنا. نحرص على تقديم المشورة المناسبة لتجنب حالات الرفض قدر الإمكان.</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link to="/">
                <button className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
                  <i className="fas fa-chevron-right ml-2"></i>
                  العودة للصفحة الرئيسية
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default VisaBooking;