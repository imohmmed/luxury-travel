import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // تهيئة GSAP ScrollTrigger للهيدر
    if (headerRef.current) {
      // إخفاء الهيدر أثناء السكرول للأسفل وإظهاره عند السكرول للأعلى
      const showAnim = gsap.from(headerRef.current, { 
        yPercent: -100,
        paused: true,
        duration: 0.2,
        ease: "power2.out"
      }).progress(1); // بدء الهيدر مرئي

      ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
          // التحكم في ظهور الهيدر اعتمادًا على اتجاه السكرول
          if (self.direction === -1) {
            // عند السكرول للأعلى
            showAnim.reverse(); // إظهار الهيدر
          } else if (self.direction === 1 && self.progress > 0.1) {
            // عند السكرول للأسفل بعد تجاوز 10%
            showAnim.play(); // إخفاء الهيدر
          }
          
          // تغيير خلفية الهيدر حسب الموضع
          if (self.progress > 0.05) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        }
      });
    }

    return () => {
      // تنظيف ScrollTrigger عند إزالة المكون
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('overflow-hidden');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  const menuItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/' },
    { name: 'تعليقات العملاء', href: '/' },
    { name: 'خدماتنا', href: '/' },
    { name: 'اكتشف العالم', href: '/' },
    { name: 'اتصل بنا', href: '/' },
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'header-fixed bg-secondary bg-opacity-85 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-6'
      }`}>
      <div className="container mx-auto px-4 flex justify-between items-center transition-all duration-500 ease-in-out">
        {/* Logo */}
        <div className={`logo text-center mx-auto transition-all duration-500 ${
            scrolled ? 'w-36 md:w-40' : 'w-40 md:w-48'
          }`}>
          <Link href="/" className={`text-white font-bold whitespace-nowrap transition-all duration-500 ${
            scrolled ? 'text-xl' : 'text-2xl'
          }`}>
            <span className="text-accent">التَرَف</span>
          </Link>
        </div>
        
        {/* Hamburger Menu */}
        <div 
          className={`hamburger z-50 cursor-pointer ${isMenuOpen ? 'menu-active' : ''}`} 
          onClick={toggleMenu}
        >
          <div className={`w-[30px] h-[3px] my-[6px] transition-all duration-400 ${
            isMenuOpen 
              ? 'rotate-[-45deg] translate-y-[6px] bg-white' 
              : scrolled ? 'bg-white' : 'bg-white'
            }`}></div>
          <div className={`w-[30px] h-[3px] my-[6px] transition-all duration-400 ${
            isMenuOpen 
              ? 'opacity-0' 
              : scrolled ? 'bg-white' : 'bg-white'
            }`}></div>
          <div className={`w-[30px] h-[3px] my-[6px] transition-all duration-400 ${
            isMenuOpen 
              ? 'rotate-[45deg] -translate-y-[6px] bg-white' 
              : scrolled ? 'bg-white' : 'bg-white'
            }`}></div>
        </div>
        
        {/* Menu Overlay */}
        <div className={`overlay fixed inset-0 bg-secondary bg-opacity-95 z-40 flex flex-col justify-center items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="text-center">
            <ul className="text-white text-xl">
              {menuItems.map((item, index) => (
                <li key={index} className="my-4">
                  <a 
                    href={item.href} 
                    className="hover:text-accent transition-all duration-300 px-3 py-1 rounded-md hover:bg-white/10"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10">
            <div className="flex space-x-6 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <i className="fab fa-whatsapp text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
