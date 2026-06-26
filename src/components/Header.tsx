import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data';
import { scrollToSection } from '../hooks/useLenisScroll';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastScrollY.current;
        if (diff > 8 && currentY > 80) {
          setVisible(false);
          setMobileOpen(false);
        } else if (diff < -8) {
          setVisible(true);
        }
        setScrolled(currentY > 40);
        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    scrollToSection(href);
    setMobileOpen(false);
  };

  return (
    <motion.header
      animate={{ y: visible ? 0 : '-120%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[10000] transition-[padding] duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      {/* Top gradient accent bar — matches Hero */}
      {!scrolled && (
        <div
          className="absolute top-0 left-0 hidden right-0 h-[3px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg,rgb(255, 255, 255),rgb(255, 255, 255),rgb(255, 255, 255))' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav
          aria-label="Main navigation"
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm shadow-slate-200/60'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <a href="/home" className="flex items-center shrink-0">
            <img
              className="w-25 object-contain"
              src="https://allstate.in/assets/images/logo-allstate.jpg"
              alt="Allstate"
            />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                      isActive
                        ? 'text-indigo-600'
                        : scrolled
                        ? 'text-slate-500 hover:text-slate-900'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {link.label}

                    {/* Active pill indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{ background: 'rgba(99,102,241,0.08)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Active dot under label */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right side — eyebrow label (matches Hero "Since 1985" style) */}
          {/* <div className="hidden md:flex items-center gap-2">
            <span className="block w-6 h-px bg-indigo-400" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-500 font-semibold">
              Est. 1985
            </span>
          </div> */}

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mx-4 mt-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-xl shadow-slate-200/60"
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleNav(link.href)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  )}
                  <span className={isActive ? '' : 'ml-[18px]'}>{link.label}</span>
                </motion.button>
              );
            })}

            {/* Divider matching Hero eyebrow style */}
            <div className="flex items-center gap-2 px-4 pt-3 mt-1 border-t border-slate-100">
              <span className="block w-4 h-px bg-indigo-400" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-indigo-400 font-semibold">
                Est. 1985
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}