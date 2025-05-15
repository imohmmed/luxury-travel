import React, { useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';

const countries = [
  {
    id: 1,
    name: 'دبي',
    image: 'https://images.unsplash.com/photo-1582672752497-53b42e5924e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    description: 'استمتع بأجمل المعالم السياحية في دبي، من برج خليفة إلى نخلة جميرا والتسوق في دبي مول.'
  },
  {
    id: 2,
    name: 'مصر',
    image: 'https://images.unsplash.com/photo-1568322445229-de498f0b3ee4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    description: 'استكشف الحضارة الفرعونية القديمة من الأهرامات إلى المتحف المصري وتمتع بجمال البحر الأحمر.'
  },
  {
    id: 3,
    name: 'تركيا',
    image: 'https://images.unsplash.com/photo-1589561454226-796a8aa89b05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    description: 'من اسطنبول إلى أنطاليا، تركيا وجهة سياحية رائعة تجمع بين الثقافة التاريخية والمناظر الطبيعية الخلابة.'
  },
  {
    id: 4,
    name: 'جزر المالديف',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    description: 'استمتع بالشواطئ البيضاء والمياه الفيروزية الصافية في جزر المالديف، وجهة شهر العسل المثالية.'
  },
  {
    id: 5,
    name: 'المملكة المتحدة',
    image: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    description: 'اكتشف جمال لندن ومناطق الريف البريطاني مع تاريخ وثقافة غنية تمتد لقرون من الزمان.'
  },
  {
    id: 6,
    name: 'فرنسا',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    description: 'باريس مدينة النور وأوروبا الساحرة، استمتع بالثقافة الفرنسية، المأكولات الفاخرة والمتاحف العالمية.'
  },
  {
    id: 7,
    name: 'سويسرا',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    description: 'جبال الألب الساحرة، البحيرات الصافية والهواء النقي، سويسرا هي وجهة المغامرات والاسترخاء في آن واحد.'
  },
  {
    id: 8,
    name: 'ماليزيا',
    image: 'https://images.unsplash.com/photo-1619870974564-67d1b58e963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    description: 'من كوالالمبور إلى جزيرة لنكاوي، استمتع بالثقافة الآسيوية المتنوعة والطبيعة الاستوائية الخلابة.'
  },
]

const DiscoverWorldPage: React.FC = () => {
  // Initialize scroll reveal animation
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="py-20 relative bg-cover bg-center text-white"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">اكتشف العالم</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto mb-10">
              استكشف أجمل الوجهات السياحية حول العالم مع باقات سفر مخصصة لتناسب تطلعاتك، واستمتع بتجارب سفر فريدة واستثنائية
            </p>
            <a 
              href="#destinations" 
              className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all"
            >
              استكشف الوجهات
              <i className="fas fa-chevron-down mr-2"></i>
            </a>
          </div>
        </section>
        
        {/* Destinations Section */}
        <section id="destinations" className="py-16 bg-white" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">وجهات سياحية مميزة</h2>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                اكتشف معنا أفضل الوجهات السياحية حول العالم ودع خبراءنا يصممون لك رحلة تناسب اهتماماتك
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {countries.map((country) => (
                <div key={country.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all reveal">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={country.image} 
                      alt={country.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-3">{country.name}</h3>
                    <p className="text-gray-600 mb-4">{country.description}</p>
                    <a href="#" className="text-accent font-bold hover:text-primary transition-colors">
                      اكتشف المزيد <i className="fas fa-chevron-left mr-1"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/">
                <button className="bg-secondary text-white font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all">
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

export default DiscoverWorldPage;