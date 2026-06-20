import { useTranslation } from 'react-i18next'

type Lng = 'hu' | 'en' | 'de'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const raw = (i18n.language || 'hu').toLowerCase()
  const currentLng: Lng = raw.startsWith('en') ? 'en' : raw.startsWith('de') ? 'de' : 'hu'

  const baseClass = 'text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300'
  const activeClass = 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
  const inactiveClass = 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'

  const handleClick = (lng: Lng) => {
    if (currentLng !== lng) {
      i18n.changeLanguage(lng)
    }
  }

  const langs: Array<{ code: Lng; labelKey: string; ariaKey: string }> = [
    { code: 'hu', labelKey: 'language_switcher.hu', ariaKey: 'language_switcher.switch_to_hu' },
    { code: 'en', labelKey: 'language_switcher.en', ariaKey: 'language_switcher.switch_to_en' },
    { code: 'de', labelKey: 'language_switcher.de', ariaKey: 'language_switcher.switch_to_de' },
  ]

  return (
    <div className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-full p-1">
      {langs.map(({ code, labelKey, ariaKey }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleClick(code)}
          aria-label={t(ariaKey, code.toUpperCase())}
          aria-pressed={currentLng === code}
          className={`${baseClass} ${currentLng === code ? activeClass : inactiveClass}`}
        >
          {t(labelKey, code.toUpperCase())}
        </button>
      ))}
    </div>
  )
}
