import { Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function PartnerBadges() {
  const { t } = useTranslation()

  const partners = [
    { name: t('partner_badges.meta'), icon: Award },
    { name: t('partner_badges.google'), icon: Award }
  ]

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 sm:pt-4">
      {partners.map((partner, idx) => (
        <div
          key={idx}
          className="flex items-center space-x-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white/90 shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <partner.icon size={16} className="text-blue-300" />
          <span>{partner.name}</span>
        </div>
      ))}
    </div>
  )
}
