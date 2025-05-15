import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  name: string;
  href: string;
}

interface SocialLink {
  id: string;
  icon?: string;
  href: string;
  image?: string;
}

interface PaymentMethod {
  id: string;
  icon?: string;
  text?: string;
  image?: string;
}

const menuItems: MenuItem[] = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'من نحن', href: '#about' },
  { name: 'تعليقات العملاء', href: '#testimonials' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'اكتشف العالم', href: '#discover' },
  { name: 'سياسة الخصوصية', href: '#' },
  { name: 'الشروط والأحكام', href: '#' },
];

const socialLinks: SocialLink[] = [
  { id: 'facebook', image: '/img/social-new/facebook.png', href: '#' },
  { id: 'instagram', image: '/img/social-new/instagram.png', href: '#' },
  { id: 'whatsapp', image: '/img/social-new/whatsapp.png', href: '#' },
  { id: 'telegram', image: '/img/social-new/telegram.png', href: 'https://t.me/mohmmed' },
];

const paymentMethods: PaymentMethod[] = [
  { id: 'mastercard', image: mastercardImg },
  { id: 'zain-cash', image: zaincashImg },
];

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (footerRef.current && contentRef.current) {
      gsap.from(contentRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true
        }
      });
    }
  }, []);

  return (
    <footer id="contact" className="bg-secondary text-white pt-16 pb-8 relative z-10" ref={footerRef}>
      <div className="container mx-auto px-4" ref={contentRef}>
        <div className="flex flex-wrap">
          {/* Logo and About */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0 reveal">
            <div className="mb-6">
              <a href="#" className="text-white font-bold text-3xl">
                <span className="text-accent">ال</span>تَرَف
              </a>
            </div>
            <p className="text-gray-400 mb-6">
              نقدم خدمات سياحية متكاملة من الفيز والتذاكر إلى التأمين الصحي وإجازات السوق الدولية، مع الاهتمام بجميع التفاصيل لضمان تجربة سفر استثنائية.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0 md:px-8 reveal">
            <h3 className="text-xl font-bold mb-6 inline-flex">
              <span>روابط</span>
              <span className="mx-1">سريعة</span>
            </h3>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="w-full md:w-1/3 reveal">
            <h3 className="text-xl font-bold mb-6 inline-flex">
              <span>اتصل</span>
              <span className="mx-1">بنا</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt text-accent w-6"></i>
                <span className="text-gray-400">شارع الملك فهد، الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-accent w-6"></i>
                <span className="text-gray-400">+966 123 456 789</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-accent w-6"></i>
                <span className="text-gray-400">info@luxurytravel.com</span>
              </li>
            </ul>
            
            <div className="mt-8 mb-4 flex flex-col items-end">
              <h3 className="text-xl font-bold mb-2 inline-flex">
                <span>وسائل</span>
                <span className="mx-1">الدفع</span>
              </h3>
              <div className="flex justify-end gap-4">
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    className="flex items-center justify-center"
                  >
                    <img 
                      src={method.image} 
                      alt={method.id} 
                      className={`object-contain ${method.id === 'mastercard' ? 'h-8 w-auto' : 'h-8 w-auto'}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Social media links in center */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            {socialLinks.map((social) => (
              <motion.a 
                key={social.id}
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:opacity-90 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={social.image} 
                  alt={social.id} 
                  className="h-7 w-7"
                />
              </motion.a>
            ))}
          </div>
          
          <p className="text-white/80 text-sm">© 2019 التَرَف. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;