import React from 'react';
import { motion } from 'framer-motion';

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
  { name: 'خدماتنا', href: '#services' },
  { name: 'اكتشف العالم', href: '#discover' },
  { name: 'تعليقات العملاء', href: '#testimonials' },
  { name: 'اتصل بنا', href: '#contact' },
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
  { id: 'mastercard', image: '/img/payment-methods/mastercard.png' },
  { id: 'zain-cash', image: '/img/payment-methods/zain-cash.png' },
];

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-secondary text-white pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Logo and About */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <div className="mb-6">
              <a href="#" className="text-white font-bold text-3xl">
                <span className="text-accent">التَرَف</span>
              </a>
            </div>
            <p className="text-gray-400 mb-6">
              نقدم خدمات سياحية متكاملة من الفيز والتذاكر إلى التأمين الصحي وإجازات السوق الدولية، مع الاهتمام بجميع التفاصيل لضمان تجربة سفر استثنائية.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0 md:px-8">
            <h3 className="text-xl font-bold mb-6">
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
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-6">
              <span>اتصل</span>
              <span className="mx-1">بنا</span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt text-accent w-6"></i>
                <a 
                  href="https://maps.google.com/?q=Baghdad+Zayouna+Dream+City+Street" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  بغداد - زيونة - شارع دريم سيتي
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-accent w-6"></i>
                <div className="flex items-center">
                  <a 
                    href="tel:+9647724166086" 
                    className="text-gray-400 hover:text-accent transition-colors dir-ltr"
                  >
                    +964 772 416 6086
                  </a>
                  <a 
                    href="https://wa.me/9647724166086" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent mx-2"
                    aria-label="واتساب"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </li>
              <li className="flex flex-nowrap items-center">
                <i className="fas fa-envelope text-accent w-6 flex-shrink-0"></i>
                <a 
                  href="mailto:info@altaraf.net" 
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  info@altaraf.net
                </a>
              </li>
            </ul>
            
            <h3 className="text-xl font-bold mt-8 mb-4">
              <span>وسائل</span>
              <span className="mx-1">الدفع</span>
            </h3>
            <div className="flex justify-start">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    className="flex items-center justify-center"
                  >
                    <img 
                      src={method.image} 
                      alt={method.id} 
                      className={`object-contain ${method.id === 'mastercard' ? 'h-10' : 'h-8'}`}
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