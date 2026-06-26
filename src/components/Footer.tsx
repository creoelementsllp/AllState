import { ArrowUp, ExternalLink } from 'lucide-react';
import { GROUP_COMPANIES, CONTACT_INFO, NAV_LINKS, SITE_META } from '../data';
import { scrollToSection } from '../hooks/useLenisScroll';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg text-white/60 border-t border-white/5" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              
              <div>
              <a
            href='/home'
            className="flex flex-col leading-none text-left"
            data-cursor="pointer"
          >
           <img className='w-20' src="https://allstate.in/assets/images/logo-allstate.jpg" alt="" />
          </a>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{SITE_META.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm hover:text-accent transition-colors"
                    data-cursor="pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white   text-sm uppercase tracking-wider">Group Companies</h3>
            <ul className="space-y-2">
              {GROUP_COMPANIES.map((company) => (
                <li key={company.id}>
                  {company.websiteUrl ? (
                    <a
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-accent transition-colors inline-flex items-center gap-1"
                      data-cursor="pointer"
                    >
                      {company.name.split(' ').slice(0, 2).join(' ')}
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="text-sm">{company.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2 text-sm uppercase tracking-wider">Contact</h3>
            <address className="not-italic space-y-2 text-sm">
              <p>{CONTACT_INFO.address}</p>
              <p>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-accent transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {currentYear} Allstate Group. All rights reserved.
          </p>
          <p className="text-xs">
          Designed by {' '}
            <a href="https://creo-elements.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
             Creo Elements LLP
            </a>
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs hover:text-accent transition-colors"
            aria-label="Back to top"
            data-cursor="pointer"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
