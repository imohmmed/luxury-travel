import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import DiscoverWorld from '@/components/DiscoverWorld';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Home: React.FC = () => {
  const { revealElements } = useScrollReveal();

  useEffect(() => {
    // Set document title
    document.title = 'التَرَف | Luxury Travel & Tourism';
    
    // Add meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'التَرَف - شركة متخصصة في تقديم خدمات السفر والسياحة الفاخرة. نقدم خدمات متكاملة من الفيز والتذاكر إلى التأمين الصحي وإجازات السوق الدولية، مع خدمات الاستقبال والتوديع المميزة.';
    document.head.appendChild(metaDescription);
    
    // Initialize scroll reveal
    revealElements();
  }, [revealElements]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <HeroSlider />
      <AboutUs />
      <Services />
      <DiscoverWorld />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
