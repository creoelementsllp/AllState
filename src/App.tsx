import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Stats from './components/Stats';
import Companies from './components/Companies';
import Sectors from './components/Sectors';
import Partners from './components/Partners';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/effects/CustomCursor';
import { useLenisScroll } from './hooks/useLenisScroll';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  useLenisScroll();

  useEffect(() => {
    const sections = ['home', 'about', 'companies', 'sectors', 'services', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-secondary antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10003] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      {/* <ScrollProgress /> */}
      <CustomCursor />
      <div className="grain-overlay" aria-hidden="true" />
      <Header activeSection={activeSection} />

      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <Timeline />
        <Companies />
        <Sectors />
        <Partners />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
