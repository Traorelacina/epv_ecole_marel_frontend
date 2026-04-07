export default function LoadingSpinner({ size = 'md', color = 'primary', fullPage = false }) {
  const sizes  = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  const colors = { primary: 'border-primary', white: 'border-white', gray: 'border-gray-400' }

  const spinner = (
    <div className={`${sizes[size]} rounded-full border-2 ${colors[color]} border-t-transparent animate-spin`} />
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-3 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500 font-body">Chargement…</p>
        </div>
      </div>
    )
  }
  return spinner
}