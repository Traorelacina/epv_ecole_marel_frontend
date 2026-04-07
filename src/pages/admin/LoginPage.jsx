import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { loginAsync, clearError } from '@store/slices/authSlice'
import LoadingSpinner from '@components/common/LoadingSpinner'
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error, token } = useSelector((s) => s.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const from = location.state?.from?.pathname || '/admin'

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (token) navigate(from, { replace: true })
    return () => dispatch(clearError())
  }, [token, navigate, from, dispatch])

  const handle = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginAsync(form))
    if (loginAsync.fulfilled.match(result)) navigate(from, { replace: true })
  }

  const fadeUp = (delay) => ({
    opacity: loaded ? 1 : 0,
    animation: loaded ? `heroFadeUp .7s cubic-bezier(.22,.68,0,1.2) ${delay}ms both` : 'none',
  })

  return (
    <>
      <Helmet>
        <title>Connexion — Back-office EPV MAREL</title>
        <meta name="description" content="Espace d'administration EPV MAREL - Accès sécurisé pour les administrateurs." />
      </Helmet>

      <style>{`
        @keyframes heroFadeUp { 
          from { opacity: 0; transform: translateY(28px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes spinSlow { 
          to { transform: rotate(360deg); } 
        }
        @keyframes pulseGreen { 
          0%,100% { opacity: 1; transform: scale(1); } 
          50% { opacity: .5; transform: scale(1.35); } 
        }
        @keyframes floatY { 
          0%,100% { transform: translateY(0px); } 
          50% { transform: translateY(-10px); } 
        }
        
        .ring-spin-cw { 
          animation: spinSlow 20s linear infinite; 
          transform-origin: center; 
        }
        .badge-float { 
          animation: floatY 3.8s ease-in-out infinite; 
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f2a07] via-[#1a4010] to-[#2D6A1F] flex items-center justify-center p-4">
        
        {/* Pattern dots */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, #8DC31E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Cercles décoratifs animés */}
        <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full border border-white/10 ring-spin-cw" />
        <div className="absolute bottom-[-60px] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#8DC31E]/5 to-transparent" />
        <div className="absolute top-[20%] left-[-50px] w-[200px] h-[200px] rounded-full bg-[#8DC31E]/5 blur-3xl" />
        <div className="absolute bottom-[20%] right-[-50px] w-[250px] h-[250px] rounded-full bg-[#D4191A]/5 blur-3xl" />

        {/* Badge flottant décoratif */}
        <div className="absolute top-20 right-10 badge-float hidden lg:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="text-white/80 text-xs font-medium flex items-center gap-2">
              <Sparkles size={12} className="text-[#8DC31E]" />
              Accès restreint
            </span>
          </div>
        </div>

        <div className="relative w-full max-w-md" style={fadeUp(0)}>
          {/* Logo et titre */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8DC31E] to-[#2D6A1F] flex items-center justify-center mx-auto mb-5 shadow-xl">
              <span className="text-white font-display font-bold text-3xl">M</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight">EPV MAREL</h1>
            <p className="text-white/60 text-sm mt-1">Espace d'administration</p>
          </div>

          {/* Card de connexion */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#F2F9E5] flex items-center justify-center mx-auto mb-3">
                <Lock size={20} className="text-[#2D6A1F]" />
              </div>
              <h2 className="font-display font-bold text-xl text-gray-900">Connexion</h2>
              <p className="text-gray-500 text-sm mt-1">Accédez à votre espace administrateur</p>
            </div>

            {error && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 animate-shake">
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handle} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="admin@epvmarel.ci"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#8DC31E] focus:ring-2 focus:ring-[#8DC31E]/20 transition-all duration-200 outline-none"
                    required 
                    autoFocus 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPwd ? 'text' : 'password'} 
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#8DC31E] focus:ring-2 focus:ring-[#8DC31E]/20 transition-all duration-200 outline-none"
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-[#2D6A1F] to-[#8DC31E] text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#8DC31E]/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoadingSpinner size="sm" color="white" />
                    <span>Connexion en cours...</span>
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <a 
                href="/" 
                className="text-sm text-gray-400 hover:text-[#2D6A1F] transition-colors flex items-center justify-center gap-1.5 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Retour au site public
              </a>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-white/40 text-xs mt-6">
            © 2025 EPV MAREL — Tous droits réservés
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </>
  )
}