import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary to-secondary-dark p-10 md:p-16 text-center">
          {/* Décoration */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              Inscriptions ouvertes
            </span>
            <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4 leading-tight">
              Offrez le meilleur à votre enfant
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Rejoignez la famille EPV MAREL. Contactez-nous dès aujourd'hui pour inscrire votre enfant.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-secondary
                           font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300
                           hover:-translate-y-0.5">
                Demander une inscription
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="tel:+22527225035 81"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/40
                           text-white font-medium text-base hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Nous appeler
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}