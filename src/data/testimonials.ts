export type Lang = 'hu' | 'en' | 'de'

export interface VideoTestimonial {
  videoId: string
  orientation: 'portrait' | 'landscape'
  name: string
  role: Record<Lang, string>
  quote: Record<Lang, string>
}

export interface TextTestimonial {
  logo: string
  logoScale?: number
  accent: 'purple' | 'blue' | 'orange'
  name: string
  role: Record<Lang, string>
  industry: Record<Lang, string>
  text: Record<Lang, string>
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    videoId: 'rr5Nldl6VGA',
    orientation: 'portrait',
    name: 'Szabó László',
    role: {
      hu: 'Ügyvezető • LDSZ & SECCAM',
      en: 'Managing Director • LDSZ & SECCAM',
      de: 'Geschäftsführer • LDSZ & SECCAM'
    },
    quote: {
      hu: 'Az AdyFlow csapata azt hozta, amit ígért. Végre nem nekem kell az érdeklődők után futnom.',
      en: 'The AdyFlow team delivered exactly what they promised. I no longer have to chase potential customers.',
      de: 'Das AdyFlow-Team hat genau das geliefert, was es versprochen hat. Endlich muss ich potenziellen Kunden nicht mehr hinterherlaufen.'
    }
  },
  {
    videoId: 'oP2xr-ivdwQ',
    orientation: 'landscape',
    name: 'Kocsis Ferenc',
    role: {
      hu: 'Ügyvezető • Piccolo Italiano',
      en: 'Managing Director • Piccolo Italiano',
      de: 'Geschäftsführer • Piccolo Italiano'
    },
    quote: {
      hu: 'Professzionális csapat, kimagasló eredmények. Mindenkinek ajánlom, aki komolyan gondolja a növekedést.',
      en: 'A professional team with outstanding results. I recommend them to anyone serious about growth.',
      de: 'Ein professionelles Team mit herausragenden Ergebnissen. Ich empfehle sie jedem, der Wachstum ernst nimmt.'
    }
  }
]

export const textTestimonials: TextTestimonial[] = [
  {
    logo: '/assets/partners/jaka-projekt-logo.png',
    logoScale: 1.85,
    accent: 'purple',
    name: 'Jakab Elias',
    role: {
      hu: 'Ügyvezető • Jaka Projekt GmbH',
      en: 'Managing Director • Jaka Projekt GmbH',
      de: 'Geschäftsführer • Jaka Projekt GmbH'
    },
    industry: {
      hu: 'Vakolás és festés, Svájc',
      en: 'Plastering and painting, Switzerland',
      de: 'Gipser- & Malerarbeiten, Schweiz'
    },
    text: {
      hu: 'Az AdyFlow-val való együttműködés az egyik legjobb döntés volt a vállalkozásunk számára. A csapat rendkívül profi, gyorsan reagál, és megbízhatóan szállítja az eredményeket. Amióta együtt dolgozunk, jóval több minőségi érdeklődést kapunk, és a hónap végére érezhetően több projektet sikerül lezárnunk. Jó szívvel ajánljuk az AdyFlow-t minden kivitelező vállalkozásnak.',
      en: 'Working with AdyFlow was one of the best decisions we made for our company. The team is highly professional, responds quickly and delivers reliable results. Since working with them, we have received significantly more qualified enquiries and have been able to close noticeably more projects by the end of each month. We warmly recommend AdyFlow to every trades and construction business.',
      de: 'Die Zusammenarbeit mit AdyFlow war eine der besten Entscheidungen für unser Unternehmen. Das Team ist unglaublich professionell, reagiert schnell und liefert zuverlässig Ergebnisse. Seit wir mit ihnen arbeiten, erhalten wir deutlich mehr qualifizierte Anfragen – und zum Monatsende konnten wir spürbar mehr Projekte erfolgreich abschließen. Wir können AdyFlow jedem Handwerksbetrieb wärmstens empfehlen.'
    }
  },
  {
    logo: '/assets/partners/upgrade-zeitarbeit-logo.png',
    accent: 'blue',
    name: 'Hermann Andreas',
    role: {
      hu: 'Ügyvezető • UPGRADE Zeitarbeit GmbH',
      en: 'Managing Director • UPGRADE Zeitarbeit GmbH',
      de: 'Geschäftsführer • UPGRADE Zeitarbeit GmbH'
    },
    industry: {
      hu: 'Munkaerő-kölcsönzés és szakember-közvetítés, Ausztria',
      en: 'Temporary staffing and skilled-worker recruitment, Austria',
      de: 'Zeitarbeit & Fachkräftevermittlung, Österreich'
    },
    text: {
      hu: 'Az AdyFlow-val való együttműködés végig professzionális és jól strukturált volt. Különösen a szakemberek, kivitelező cégek és projektalapú megkeresések területén váltunk sokkal láthatóbbá a célzott kampányoknak köszönhetően. A csapat gyors, megbízható, és pontosan érti, mi számít a mi iparágunkban. Határozottan ajánljuk az AdyFlow-t.',
      en: 'Our collaboration with AdyFlow was highly professional and clearly structured from start to finish. Their targeted campaigns made us significantly more visible, especially for skilled workers, trades businesses and project-based enquiries. The team works quickly and reliably, and understands exactly what matters in our industry. We definitely recommend AdyFlow.',
      de: 'Die Zusammenarbeit mit AdyFlow war für uns sehr professionell und klar strukturiert. Besonders im Bereich der Fachkräfte, Handwerksbetriebe und projektbezogenen Anfragen konnten wir durch die Kampagnen deutlich gezielter sichtbar werden. Das Team arbeitet schnell, zuverlässig und versteht, worauf es in unserer Branche ankommt. Wir können AdyFlow definitiv weiterempfehlen.'
    }
  },
  {
    logo: '/assets/partners/pliszepro-logo.png',
    logoScale: 1.85,
    accent: 'orange',
    name: 'Kari Zoltán',
    role: {
      hu: 'Ügyvezető • PliszéPro',
      en: 'Managing Director • PliszéPro',
      de: 'Geschäftsführer • PliszéPro'
    },
    industry: {
      hu: 'Pliszé és szúnyogháló, Magyarország',
      en: 'Pleated blinds and insect screens, Hungary',
      de: 'Plissees und Insektenschutz, Ungarn'
    },
    text: {
      hu: 'Az AdyFlow-val való együttműködés sokkal többet adott, mint egy egyszerű hirdetéskezelés. A kampányoknak köszönhetően több érdeklődő és több megrendelés érkezett, főleg a pliszé és szúnyogháló termékeinkre. Emellett olyan üzleti és kommunikációs ötleteket is kaptunk, amelyek segítettek átláthatóbban működni és tovább bővíteni a céget. Profi, gyors és megbízható csapat – jó szívvel ajánlom őket.',
      en: 'Working with AdyFlow gave us far more than standard ad management. The campaigns brought us more enquiries and more orders, especially for our pleated blinds and insect-screen products. We also received valuable business and communication ideas that helped us operate more clearly and continue growing the company. A professional, fast and reliable team – I wholeheartedly recommend them.',
      de: 'Die Zusammenarbeit mit AdyFlow hat uns weit mehr gebracht als eine gewöhnliche Anzeigenbetreuung. Dank der Kampagnen erhielten wir mehr Anfragen und mehr Aufträge, insbesondere für unsere Plissee- und Insektenschutzprodukte. Zusätzlich bekamen wir wertvolle Geschäfts- und Kommunikationsideen, die uns geholfen haben, strukturierter zu arbeiten und das Unternehmen weiter auszubauen. Ein professionelles, schnelles und zuverlässiges Team – ich empfehle sie von Herzen.'
    }
  }
]
