import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location])

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
    }
  }

  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    if (isHome) {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      navigate(`/#${hash}`)
    }
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { href: '/', label: t('nav.home'), isRoute: true },
    { href: '/weboldal', label: t('nav.website'), isRoute: true },
    { href: '/#rolunk', label: t('nav.about'), isRoute: false, hash: 'rolunk' },
    { href: '/eredmenyek', label: t('nav.results'), isRoute: true },
    { href: '/partnereink', label: t('nav.partners'), isRoute: true },
    { href: '/#kapcsolat', label: t('nav.contact'), isRoute: false, hash: 'kapcsolat' },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4">
      <nav className={`max-w-7xl mx-auto rounded-2xl sm:rounded-[22px] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_2px_8px_-2px_rgba(0,0,0,0.04)] border border-slate-200/70'
          : 'bg-white/80 backdrop-blur-md shadow-[0_2px_12px_-2px_rgba(0,0,0,0.05)] border border-slate-200/50'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px]">
            <div className="flex items-center">
              <Link
                to="/"
                onClick={handleLogoClick}
                className="text-xl sm:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity cursor-pointer"
              >
                AdyFlow
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) =>
                link.isRoute ? (
                  link.href === '/' ? (
                    <a
                      key={link.href}
                      href="/"
                      onClick={handleHomeClick}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isHome ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        location.pathname === link.href ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleHashNavigation(e, link.hash!)}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                )
              )}
              <LanguageSwitcher />
              <a
                href="/#kapcsolat"
                onClick={(e) => handleHashNavigation(e, 'kapcsolat')}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t('nav.free_consultation')}
              </a>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <LanguageSwitcher />
              <button
                className="text-slate-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/60">
            <div className="px-5 py-5 space-y-3">
              {navLinks.map((link) =>
                link.isRoute ? (
                  link.href === '/' ? (
                    <a
                      key={link.href}
                      href="/"
                      onClick={handleHomeClick}
                      className="block text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium py-2"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium py-2"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleHashNavigation(e, link.hash!)}
                    className="block text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium py-2"
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="/#kapcsolat"
                onClick={(e) => handleHashNavigation(e, 'kapcsolat')}
                className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white text-center hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 mt-4"
              >
                {t('nav.free_consultation')}
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
