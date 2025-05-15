import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // تغيير مظهر الهيدر عند السكرول - تبسيط الكود
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // إضافة مستمع حدث السكرول
    window.addEventListener('scroll', handleScroll);
    
    // التحقق من وضع السكرول الأولي
    handleScroll();

    return () => {
      // إزالة مستمع الحدث عند إزالة المكون
      window.removeEventListener('scroll', handleScroll);
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
      className={`sticky top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-secondary bg-opacity-90 backdrop-blur-sm shadow-md py-3' 
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
