import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    // تغيير حالة القائمة
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // إضافة أو إزالة overflow-hidden فقط عند فتح أو إغلاق القائمة
    if (newMenuState) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
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

  // Allows scrolling to continue even when touch starts on header
  const headerStyle = {
    touchAction: 'pan-y' // Allow vertical scrolling
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary shadow-lg py-2' : 'py-6'}`} 
      style={headerStyle}
    >
      <div className="container mx-auto px-4 flex justify-between items-center transition-all">
        {/* Logo */}
        <div className={`logo text-center mx-auto transition-all duration-300 ${scrolled ? 'w-36 md:w-44' : 'w-44 md:w-52'}`}>
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
