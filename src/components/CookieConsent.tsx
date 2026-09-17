import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Cookie, Check, X, ChevronDown, ChevronUp, Shield } from 'lucide-react'
import './CookieConsent.css'

const STORAGE_KEY = 'adyflow-cookie-consent'

type Consent = {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
  decided: boolean
}

const DEFAULT_CONSENT: Consent = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  decided: false,
}

function loadConsent(): Consent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT_CONSENT, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return { ...DEFAULT_CONSENT }
}

function saveConsent(c: Consent) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)) } catch { /* ignore */ }
}

export default function CookieConsent() {
  const { t } = useTranslation()
  const [consent, setConsent] = useState<Consent>(loadConsent)
  const [showSettings, setShowSettings] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reopenSettings, setReopenSettings] = useState(false)

  useEffect(() => {
    const c = loadConsent()
    if (!c.decided) {
      const timer = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const c: Consent = { necessary: true, functional: true, analytics: true, marketing: true, decided: true }
    saveConsent(c)
    setConsent(c)
    setVisible(false)
    setReopenSettings(false)
    setShowSettings(false)
  }

  const handleRejectOptional = () => {
    const c: Consent = { ...DEFAULT_CONSENT, decided: true }
    saveConsent(c)
    setConsent(c)
    setVisible(false)
    setReopenSettings(false)
    setShowSettings(false)
  }

  const handleSaveSettings = () => {
    const c: Consent = { ...consent, necessary: true, decided: true }
    saveConsent(c)
    setConsent(c)
    setVisible(false)
    setReopenSettings(false)
    setShowSettings(false)
  }

  const toggleCategory = (key: keyof Consent) => {
    if (key === 'necessary' || key === 'decided') return
    setConsent(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const openSettings = () => {
    setReopenSettings(true)
    setShowSettings(true)
  }

  if (!visible && !reopenSettings) return null

  const categories: { key: keyof Consent; label: string; desc: string; required?: boolean }[] = [
    { key: 'necessary', label: t('cookie.necessary_label'), desc: t('cookie.necessary_desc'), required: true },
    { key: 'functional', label: t('cookie.functional_label'), desc: t('cookie.functional_desc') },
    { key: 'analytics', label: t('cookie.analytics_label'), desc: t('cookie.analytics_desc') },
    { key: 'marketing', label: t('cookie.marketing_label'), desc: t('cookie.marketing_desc') },
  ]

  return (
    <>
      {reopenSettings && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setReopenSettings(false); setShowSettings(false) }}>
          <div
            className="cc-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="cc-modal-head">
              <Shield size={22} />
              <h3>{t('cookie.settings_title')}</h3>
              <button className="cc-modal-close" onClick={() => { setReopenSettings(false); setShowSettings(false) }}>
                <X size={18} />
              </button>
            </div>
            <div className="cc-cats">
              {categories.map(cat => (
                <div key={cat.key} className="cc-cat">
                  <div className="cc-cat-info">
                    <div className="cc-cat-row">
                      <span className="cc-cat-label">{cat.label}</span>
                      {cat.required ? (
                        <span className="cc-cat-badge">{t('cookie.always_on')}</span>
                      ) : (
                        <button
                          className={`cc-toggle ${consent[cat.key] ? 'on' : ''}`}
                          onClick={() => toggleCategory(cat.key)}
                          aria-label={cat.label}
                        >
                          <span className="cc-toggle-knob" />
                        </button>
                      )}
                    </div>
                    <p className="cc-cat-desc">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cc-modal-actions">
              <button className="cc-btn-secondary" onClick={handleRejectOptional}>{t('cookie.reject_optional')}</button>
              <button className="cc-btn-primary" onClick={handleSaveSettings}>{t('cookie.save_settings')}</button>
              <button className="cc-btn-accept-all" onClick={handleAcceptAll}>{t('cookie.accept_all')}</button>
            </div>
          </div>
        </div>
      )}

      {visible && !reopenSettings && (
        <div className="cc-banner">
          <div className="cc-banner-inner">
            <div className="cc-banner-top">
              <div className="cc-banner-icon">
                <Cookie size={22} />
              </div>
              <div className="cc-banner-text">
                <h3>{t('cookie.banner_title')}</h3>
                <p>
                  {t('cookie.banner_text')}{' '}
                  <Link to="/suti-tajekoztato" className="cc-link">{t('cookie.cookie_policy_link')}</Link>
                </p>
              </div>
            </div>
            {showSettings && (
              <div className="cc-cats cc-cats-inline">
                {categories.map(cat => (
                  <div key={cat.key} className="cc-cat">
                    <div className="cc-cat-info">
                      <div className="cc-cat-row">
                        <span className="cc-cat-label">{cat.label}</span>
                        {cat.required ? (
                          <span className="cc-cat-badge">{t('cookie.always_on')}</span>
                        ) : (
                          <button
                            className={`cc-toggle ${consent[cat.key] ? 'on' : ''}`}
                            onClick={() => toggleCategory(cat.key)}
                            aria-label={cat.label}
                          >
                            <span className="cc-toggle-knob" />
                          </button>
                        )}
                      </div>
                      <p className="cc-cat-desc">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="cc-banner-actions">
              <button className="cc-btn-text" onClick={() => setShowSettings(s => !s)}>
                {showSettings ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                {t('cookie.settings')}
              </button>
              <div className="cc-banner-btns">
                <button className="cc-btn-secondary" onClick={handleRejectOptional}>{t('cookie.reject_optional')}</button>
                {showSettings && (
                  <button className="cc-btn-primary" onClick={handleSaveSettings}>{t('cookie.save_settings')}</button>
                )}
                <button className="cc-btn-accept-all" onClick={handleAcceptAll}>
                  <Check size={15} />
                  {t('cookie.accept_all')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
