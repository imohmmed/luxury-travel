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
    document.title = 'سفر الفخامة | Luxury Travel';
    
    // Add meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'سفر الفخامة - شركة متخصصة في تقديم خدمات السفر والسياحة الفاخرة. استمتع بتجارب سفر استثنائية إلى أجمل وجهات العالم مع خدمات متكاملة.';
    document.head.appendChild(metaDescription);
    
    // Initialize scroll reveal
    revealElements();
    window.addEventListener('scroll', revealElements);
    
    return () => {
      window.removeEventListener('scroll', revealElements);
    };
  }, [revealElements]);

  return (
    <div className="min-h-screen overflow-x-hidden scroll-smooth">
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
