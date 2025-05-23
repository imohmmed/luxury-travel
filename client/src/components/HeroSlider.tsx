import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useDragControls } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AnimatedText from '@/lib/AnimatedText';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant: 'accent' | 'primary' | 'white';
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    title: 'اكتشف عالم الفخامة',
    subtitle: 'تجارب سفر استثنائية تفوق توقعاتك',
    buttonText: 'احجز رحلتك الآن',
    buttonLink: '#services',
    buttonVariant: 'accent',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    title: 'إقامة فاخرة لا مثيل لها',
    subtitle: 'استمتع بأفضل الفنادق والمنتجعات حول العالم',
    buttonText: 'استكشف الفنادق',
    buttonLink: '#services',
    buttonVariant: 'primary',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1540339832862-474599807836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    title: 'سافر على درجة الأعمال',
    subtitle: 'رحلات جوية مريحة بأعلى مستويات الخدمة',
    buttonText: 'احجز تذكرتك',
    buttonLink: '#services',
    buttonVariant: 'white',
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragControls = useDragControls();
  
  // مؤقت التبديل التلقائي
  useEffect(() => {
    if (dragging) return; // إيقاف التبديل التلقائي أثناء السحب
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // زيادة المدة لإتاحة مزيد من الوقت للتفاعل

    return () => clearInterval(interval);
  }, [dragging]);
  
  // معالجة حدث السحب - تعديل ليتناسب مع تجربة اللمس
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    const threshold = 50; // تقليل الحد الأدنى للمسافة للتبديل لتسهيل التفاعل
    
    // التحقق من أن السحب كان أفقياً بشكل كافٍ لتغيير الشريحة
    const isHorizontalDrag = Math.abs(info.offset.x) > 20;
    
    if (isHorizontalDrag) {
      if (info.offset.x > threshold) {
        // سحب لليمين (الشريحة السابقة)
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (info.offset.x < -threshold) {
        // سحب لليسار (الشريحة التالية)
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }
    
    setDragging(false);
  };

  const buttonClasses = {
    accent: 'bg-accent text-dark hover:bg-opacity-90',
    primary: 'bg-primary text-white hover:bg-opacity-90',
    white: 'bg-white text-dark hover:bg-opacity-90'
  };

  return (
    <section id="home" className="relative h-[90vh] overflow-hidden" style={{ touchAction: 'pan-y' }}>
      {/* منطقة السحب - تغطي الشاشة بالكامل */}
      {/* تقليل مساحة منطقة السحب للسماح بالتمرير الطبيعي في أغلب المساحة */}
      <motion.div 
        ref={sliderRef}
        className="absolute inset-0 z-20 cursor-default md:cursor-grab md:active:cursor-grabbing"
        drag="x"
        dragDirectionLock={true}
        dragElastic={0.2}
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x: dragX, touchAction: 'pan-y' }}
      />
      
      {/* خلفيات الشرائح */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 slide transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            initial={false}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center' 
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </motion.div>
        ))}
      </div>

      {/* محتوى الشرائح */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="container mx-auto px-4 text-center">
            {/* استخدام مكون النص المتحرك للعنوان */}
            <div className="text-4xl md:text-6xl text-white font-bold mb-6">
              <AnimatedText 
                text={slides[currentSlide].title}
                className="text-white font-bold"
                once={true}
              />
            </div>
            
            {/* استخدام مكون النص المتحرك للوصف */}
            <div className="text-xl md:text-2xl text-white mb-8">
              <AnimatedText 
                text={slides[currentSlide].subtitle}
                className="text-white"
                once={true}
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                asChild
                variant="default"
                className={`rounded-full font-bold px-8 py-6 text-lg ${buttonClasses[slides[currentSlide].buttonVariant]}`}
              >
                <a href={slides[currentSlide].buttonLink}>
                  {slides[currentSlide].buttonText}
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* مؤشرات التنقل بين الشرائح */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 mx-1 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`الانتقال إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>
      

    </section>
  );
};

export default HeroSlider;
