import { useEffect, useState } from 'react'
import { CheckCircle2, Mail, Phone, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function CTA() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: ''
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = params.get('service')
    const allowed = ['hirdeteskezeles', 'weboldal', 'crm-rendszer', 'kreativ-tartalomgyartas', 'teljesköru-marketing', 'egyeb']
    if (service && allowed.includes(service)) {
      setFormData((prev) => ({ ...prev, interest: service }))
      const el = document.getElementById('kapcsolat')
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  }, [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/p9HVIy80i8mv3sNYEsxL/webhook-trigger/4d4e9001-a35d-46be-a094-918b123147dd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        const submittedInterest = formData.interest
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          interest: ''
        })
        if (submittedInterest) {
          const params = new URLSearchParams(window.location.search)
          params.set('koszonjuk', submittedInterest)
          const newUrl = `${window.location.pathname}?${params.toString()}#kapcsolat`
          window.history.replaceState(null, '', newUrl)
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const whatYouGet = t('cta.what_you_get', { returnObjects: true }) as string[]

  return (
    <section id="kapcsolat" className="relative py-20 lg:py-32 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t('cta.title_part1')} <span className="gradient-text">{t('cta.title_highlight')}</span>{t('cta.title_part2')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-pink-200/30 blur-xl rounded-3xl"></div>
            <div className="relative bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('cta.form_title')}</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                    {t('cta.label_name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('cta.placeholder_name')}
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                    {t('cta.label_email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('cta.placeholder_email')}
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                    {t('cta.label_phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('cta.placeholder_phone')}
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-900 mb-2">
                    {t('cta.label_company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('cta.placeholder_company')}
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-slate-900 mb-2">
                    {t('cta.label_interest')}
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all appearance-none cursor-pointer hover:border-slate-300"
                  >
                    <option value="" className="text-slate-500">{t('cta.interest_default')}</option>
                    <option value="hirdeteskezeles" className="bg-white text-slate-900">{t('cta.interest_ads')}</option>
                    <option value="weboldal" className="bg-white text-slate-900">{t('cta.interest_website')}</option>
                    <option value="crm-rendszer" className="bg-white text-slate-900">{t('cta.interest_crm')}</option>
                    <option value="kreativ-tartalomgyartas" className="bg-white text-slate-900">{t('cta.interest_creative')}</option>
                    <option value="teljesköru-marketing" className="bg-white text-slate-900">{t('cta.interest_full')}</option>
                    <option value="egyeb" className="bg-white text-slate-900">{t('cta.interest_other')}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? t('cta.submitting') : t('cta.submit')}</span>
                  <Send size={20} />
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-center">{t('cta.success')}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-center">{t('cta.error')}</p>
                  </div>
                )}

                <p className="text-xs text-slate-500 text-center">
                  {t('cta.consent')}
                </p>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t('cta.other_contact_title')}</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                      <Mail className="text-purple-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{t('cta.email_label')}</p>
                    <a href="mailto:info@adyflow.com" className="text-lg text-slate-900 hover:text-purple-600 transition-colors font-medium">
                      info@adyflow.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                      <Phone className="text-purple-600" size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-3">{t('cta.phone_label')}</p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-slate-900 font-medium">Janz Larry</p>
                        <a href="tel:+36702410378" className="text-lg text-purple-600 hover:text-purple-700 transition-colors">
                          +36 70 241 0378
                        </a>
                      </div>
                      <div>
                        <p className="text-slate-900 font-medium">Kocsis-Mehlmann Zénó</p>
                        <a href="tel:+36204378880" className="text-lg text-purple-600 hover:text-purple-700 transition-colors">
                          +36 20 437 8880
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4">{t('cta.what_you_get_title')}</h4>
              <ul className="space-y-3">
                {whatYouGet.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-purple-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
