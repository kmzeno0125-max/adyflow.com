import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61583989380809&locale=hu_HU', label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/z%C3%A9n%C3%B3-kocsis-mehlmann-5872693b0/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/adyflow_?igsh=NWl6MHhib2RvZHVx', label: 'Instagram' }
  ]

  return (
    <footer className="relative bg-slate-900 py-12 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/adyflow.jpg" alt="AdyFlow" className="h-10 w-auto" />
              <span className="text-2xl font-bold gradient-text">AdyFlow</span>
            </div>
            <p className="text-slate-400 text-sm text-center md:text-left mb-6">
              {t('footer.tagline')}
            </p>

            <div className="flex flex-col items-center md:items-start w-full">
              <div className="flex gap-4 mb-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <social.icon className="relative z-10 w-5 h-5" />
                  </a>
                ))}
              </div>
              <p className="text-slate-500 text-xs text-center md:text-left">
                {t('footer.follow_us')}
              </p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">{t('footer.contact_title')}</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a href="mailto:info@adyflow.com" className="text-slate-400 hover:text-purple-400 transition-colors">
                  info@adyflow.com
                </a>
              </p>
              <p>
                <span className="text-slate-400">Janz Larry: </span>
                <a href="tel:+36702410378" className="text-slate-400 hover:text-purple-400 transition-colors">
                  +36 70 241 0378
                </a>
              </p>
              <p>
                <span className="text-slate-400">Kocsis-Mehlmann Zénó: </span>
                <a href="tel:+36204378880" className="text-slate-400 hover:text-purple-400 transition-colors">
                  +36 20 437 8880
                </a>
              </p>
              <p className="text-slate-400 pt-2">
                {t('footer.location')}
              </p>
              <p className="text-slate-400 text-xs">
                {t('footer.service_area')}
              </p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">{t('footer.legal_title')}</h4>
            <div className="space-y-2 text-sm">
              <div>
                <Link to="/aszf" className="text-slate-400 hover:text-purple-400 transition-colors">
                  {t('footer.aszf')}
                </Link>
              </div>
              <div>
                <Link to="/adatvedelem" className="text-slate-400 hover:text-purple-400 transition-colors">
                  {t('footer.privacy')}
                </Link>
              </div>
              <div>
                <Link to="/disclaimer" className="text-slate-400 hover:text-purple-400 transition-colors">
                  {t('footer.disclaimer')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
