import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionHeader from '@components/common/SectionHeader'

function StarRating({ note = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < note ? 'text-secondary' : 'text-gray-200'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const DEFAULT_TEMOIGNAGES = [
  { nom_parent: 'Marie K.', nom_enfant: 'Lucas', classe_enfant: 'CM1', note: 5,
    contenu: "L'EPV MAREL a transformé mon fils. Il est épanoui, curieux et ses résultats sont excellents. Je recommande vivement cette école à tous les parents." },
  { nom_parent: 'Jean-Baptiste A.', nom_enfant: 'Amina', classe_enfant: 'CE2', note: 5,
    contenu: "Le suivi personnalisé de chaque enfant est remarquable. Les enseignants sont dévoués et l'environnement est très stimulant pour les petits." },
  { nom_parent: 'Fatou D.', nom_enfant: 'Koffi', classe_enfant: 'CP2', note: 5,
    contenu: "Mon enfant adore aller à l'école depuis qu'il est à l'EPV MAREL. Le cours d'anglais et d'informatique sont un vrai plus pour son avenir." },
  { nom_parent: 'Serge N.', nom_enfant: 'Emma', classe_enfant: 'Grande Section', note: 5,
    contenu: "Excellente école avec une équipe pédagogique exceptionnelle. La transition vers le primaire s'est faite en toute sérénité grâce à la préparation reçue." },
]

export default function TemoignagesSection({ temoignages = [] }) {
  const data = temoignages.length > 0 ? temoignages : DEFAULT_TEMOIGNAGES

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      {/* Décoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          badge="Témoignages"
          title="Ce que disent nos parents"
          subtitle="La confiance de nos familles est notre plus grande fierté."
          center
          light
        />

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="pb-10"
          >
            {data.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full flex flex-col">
                  {/* Guillemets décoratifs */}
                  <svg className="w-8 h-8 text-secondary/60 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="text-white/85 text-sm leading-relaxed flex-1 mb-5 italic">
                    "{t.contenu}"
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white font-medium text-sm">{t.nom_parent}</p>
                      {t.nom_enfant && (
                        <p className="text-white/50 text-xs mt-0.5">
                          Parent de {t.nom_enfant}
                          {t.classe_enfant && ` — ${t.classe_enfant}`}
                        </p>
                      )}
                    </div>
                    <StarRating note={t.note} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}