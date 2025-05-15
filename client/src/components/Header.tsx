import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // نستخدم debounce لتحسين الأداء ومنع التنفيذ المتكرر للدالة أثناء السكرول
    let scrollTimer: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        if (window.scrollY > 30) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }, 50); // تأخير بسيط للاستجابة المتوازنة
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // التحقق من موضع السكرول الأولي

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
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
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary shadow-lg' : 'bg-secondary/80 backdrop-blur-md'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo w-40 md:w-48 text-center mx-auto">
          <Link href="/" className="text-white font-bold text-2xl">
            <span className="text-accent whitespace-nowrap">التَرَف</span>
          </Link>
        </div>
        
        {/* Hamburger Menu */}
        <div 
          className={`hamburger z-50 cursor-pointer ${isMenuOpen ? 'menu-active' : ''}`} 
          onClick={toggleMenu}
        >
          <div className={`w-[30px] h-[3px] my-[6px] transition-all duration-400 bg-white ${isMenuOpen ? 'rotate-[-45deg] translate-y-[6px]' : ''}`}></div>
          <div className={`w-[30px] h-[3px] my-[6px] transition-all duration-400 bg-white ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-[30px] h-[3px] my-[6px] transition-all duration-400 bg-white ${isMenuOpen ? 'rotate-[45deg] -translate-y-[6px]' : ''}`}></div>
        </div>
        
        {/* Menu Overlay */}
        <div className={`overlay fixed inset-0 bg-secondary bg-opacity-95 z-40 flex flex-col justify-center items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="text-center">
            <ul className="text-white text-xl">
              {menuItems.map((item, index) => (
                <li key={index} className="my-4">
                  <a 
                    href={item.href} 
                    className="hover:text-accent transition-colors"
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
