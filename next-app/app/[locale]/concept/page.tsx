import { useTranslations } from 'next-intl'
import { Locale } from '@/lib/types'

const filmTextFr = [
  "Vingt ans se sont écoulés depuis que je me suis installé à Okinawa. Pendant cette période, j’ai été témoin de la richesse culturelle unique de cette île issue d’anciennes traditions profondément enracinées dans la vie quotidienne des habitants de l’archipel.",
  "La volonté de faire un film sur ces “gardiens des traditions” est née pendant la pandémie de COVID-19. Avec Tomoya Ogoshi, le producteur du film, nous sommes allés à la rencontre de personnes dans le village de Ginoza qui s’efforcent de maintenir la culture vivante en créant des liens entre les générations.",
  "J’ai été touché par la volonté des anciens de transmettre l’héritage culturel de l’île à la jeune génération. Chacun a sa propre façon d’entretenir sa culture. Certains s’en tiennent strictement aux traditions, tandis que d’autres essaient de créer de nouvelles bases en brisant les moules et en mélangeant l’ancien et le nouveau.",
  "C’est pourquoi j’ai décidé d’intituler le film “UMUI”, un mot de la langue d’Okinawa qui selon le contexte peut signifier : sentiment, émotion, pensée, esprit, amour...",
]

const filmTextEn = [
  "Twenty years have passed since I settled in Okinawa. During that time, I witnessed the unique cultural richness of this island, born from ancient traditions deeply rooted in the daily lives of the archipelago’s inhabitants.",
  "The desire to make a film about these “guardians of traditions” was born during the COVID-19 pandemic. With Tomoya Ogoshi, the film’s producer, we went to meet people in the village of Ginoza who strive to keep culture alive by building bridges between generations.",
  "I was moved by the elders’ desire to pass on the island’s cultural heritage to the younger generation. Each person has their own way of nurturing their culture — some strictly follow traditions, while others try to create new foundations by mixing old and new.",
  "That is why I chose to title the film “UMUI”, a word from the Okinawan language that can mean, depending on context: feeling, emotion, thought, spirit, love...",
]

const showTextFr = [
  "Si le théâtre nô et le kabuki ont acquis une belle notoriété à l’étranger, Okinawa possède ses propres traditions et danses moins connues issues de l’assimilation des cultures chinoises, japonaises et d’Asie du Sud-Est datant du royaume des Ryūkyū.",
  "Le spectacle “UMUI - Gardiens des traditions” met en scène une sélection de danses d’Okinawa, classiques et traditionnelles ainsi que le Shishi (chien-lion), fil rouge du film et qui dans le spectacle devient le narrateur de l’histoire d’Okinawa.",
  "La transition entre le film et le spectacle se fait par le biais du Shishi permettant de créer un sentiment de proximité avec le public et lui donner l’opportunité d’apprécier instantanément les arts traditionnels d’Okinawa.",
]

const showTextEn = [
  "While Noh theatre and Kabuki have gained international recognition, Okinawa has its own lesser-known traditions and dances born from the assimilation of Chinese, Japanese and Southeast Asian cultures dating back to the Ryūkyū Kingdom.",
  "The show “UMUI — Guardians of Traditions” stages a selection of classical and traditional Okinawan dances as well as the Shishi (lion-dog), the thread running through the film, which becomes the narrator of Okinawa’s story in the show.",
  "The transition between the film and the show is made through the Shishi, creating a sense of closeness with the audience and giving them the opportunity to immediately appreciate the traditional arts of Okinawa.",
]

const directorNoteFr = "“Je ne sais pas si malgré les efforts déployés, la culture d’Okinawa survivra et si c’est le cas, comment elle évoluera. Avec UMUI, je souhaite rendre hommage à ces ‘Gardiens des traditions’ qui, à leur manière, s’efforcent de préserver et de maintenir vivante une culture menacée.”"
const directorNoteEn = "“I do not know whether, despite all the efforts made, Okinawan culture will survive and if so, how it will evolve. With UMUI, I wish to pay tribute to these ‘Guardians of Traditions’ who, in their own way, strive to preserve and keep alive a threatened culture.”"

export default function ConceptPage({ params: { locale } }: { params: { locale: Locale } }) {
  const t = useTranslations('concept')

  const filmText = locale === 'fr' ? filmTextFr : filmTextEn
  const showText = locale === 'fr' ? showTextFr : showTextEn
  const directorNote = locale === 'fr' ? directorNoteFr : directorNoteEn
  const showItalicFr = "L’ensemble du programme dure 135 minutes et se déroule sans interruption."
  const showItalicEn = "The entire programme lasts 135 minutes and runs without interruption."

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4">Concept</h1>
      <p className="text-[#6B6B6B] text-lg mb-20">UMUI — Gardiens des Traditions · Tournée Suisse 2026</p>

      {/* Film section */}
      <section className="mb-20">
        <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-6">{t('filmLabel')}</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 space-y-4 text-[#6B6B6B] leading-relaxed">
            {filmText.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="md:col-span-2 aspect-[3/4] bg-[#F5F3F0] flex items-center justify-center">
            <p className="text-sm text-[#6B6B6B]">Photo du film</p>
          </div>
        </div>
      </section>

      {/* Show section */}
      <section className="mb-20 pt-16 border-t border-[#E8E4DE]">
        <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-6">{t('showLabel')}</p>
        <div className="space-y-4 text-[#6B6B6B] leading-relaxed max-w-2xl">
          {showText.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p className="italic">{locale === 'fr' ? showItalicFr : showItalicEn}</p>
        </div>
      </section>

      {/* Director's note */}
      <section className="pt-16 border-t border-[#E8E4DE]">
        <p className="text-xs font-medium tracking-widest text-[#C8702A] mb-6">{t('directorLabel')}</p>
        <blockquote className="text-[#1A1A1A] font-serif text-xl leading-relaxed max-w-2xl mb-6">
          {directorNote}
        </blockquote>
        <p className="text-sm text-[#6B6B6B]">Daniel López, {locale === 'fr' ? 'février' : 'February'} 2026</p>
      </section>
    </div>
  )
}
