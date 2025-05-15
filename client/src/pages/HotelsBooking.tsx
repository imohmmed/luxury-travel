import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import AnimatedText from '@/lib/AnimatedText';

const HotelsBooking: React.FC = () => {
  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 relative bg-cover bg-center text-white"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          }}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">احجز الفنادق</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              نوفر أفضل عروض الفنادق حول العالم بأرخص الأسعار وأفضل المرافق
            </p>
          </div>
        </section>
        
        {/* Search Hotels Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 border-t-4 border-primary -mt-24 relative z-10">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">بحث عن فنادق</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">الوجهة</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="المدينة أو الدولة"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">تصنيف الفندق</label>
                    <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">اختر تصنيف</option>
                      <option value="5">5 نجوم</option>
                      <option value="4">4 نجوم</option>
                      <option value="3">3 نجوم</option>
                      <option value="2">2 نجوم</option>
                      <option value="1">1 نجمة</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">تاريخ الوصول</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">تاريخ المغادرة</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">عدد الغرف</label>
                    <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">عدد الأشخاص</label>
                    <select className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6+</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
                  >
                    بحث عن الفنادق
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* Featured Hotels Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">أفضل الفنادق المختارة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hotel Card 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="فندق فخم في دبي" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary">برج العرب - دبي</h3>
                    <div className="flex text-accent">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">فندق 7 نجوم فاخر يوفر إطلالة خلابة على الخليج العربي مع خدمات استثنائية.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">$500 / ليلة</span>
                    <a href="#" className="text-accent font-bold hover:text-primary transition-colors">
                      احجز الآن <i className="fas fa-chevron-left mr-1"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Hotel Card 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="فندق فخم في إسطنبول" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary">فندق سيركجي - إسطنبول</h3>
                    <div className="flex text-accent">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">فندق فاخر في قلب إسطنبول التاريخية مع إطلالة على مضيق البوسفور.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">$300 / ليلة</span>
                    <a href="#" className="text-accent font-bold hover:text-primary transition-colors">
                      احجز الآن <i className="fas fa-chevron-left mr-1"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Hotel Card 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="فندق فخم في لندن" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary">ريتز لندن</h3>
                    <div className="flex text-accent">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">فندق تاريخي فاخر في قلب العاصمة البريطانية مع خدمات راقية وتصميم كلاسيكي.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">$450 / ليلة</span>
                    <a href="#" className="text-accent font-bold hover:text-primary transition-colors">
                      احجز الآن <i className="fas fa-chevron-left mr-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
                عرض المزيد من الفنادق
              </button>
            </div>
          </div>
        </section>
        
        {/* Special Offers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">عروض خاصة</h2>
            
            <div className="bg-primary/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/20 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-primary mb-4">خصم 20% على حجوزات الفنادق الفاخرة</h3>
                  <p className="text-gray-700 mb-6">احصل على خصم خاص بقيمة 20% عند حجز أي من الفنادق ذات التصنيف 5 نجوم في وجهات مختارة. العرض ساري لفترة محدودة!</p>
                  <ul className="list-disc list-inside mb-6 text-gray-700">
                    <li>يشمل العرض الإقامة، وجبة إفطار مجانية، واستخدام المرافق</li>
                    <li>خدمة استقبال وتوصيل مجانية من وإلى المطار</li>
                    <li>خصم 15% إضافي على مرافق السبا والمطاعم</li>
                  </ul>
                  <button className="bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
                    استفد من العرض الآن
                  </button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="عرض خاص للفنادق" 
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="text-center mt-8 mb-16">
          <Link to="/">
            <button className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors">
              <i className="fas fa-chevron-right ml-2"></i>
              العودة للصفحة الرئيسية
            </button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default HotelsBooking;