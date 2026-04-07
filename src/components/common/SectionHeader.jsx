export default function SectionHeader({ badge, title, subtitle, center = false, light = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {badge && (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3
          ${light ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-white' : 'bg-secondary'}`} />
          {badge}
        </span>
      )}
      <h2 className={`section-title ${light ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle mt-3 ${light ? 'text-white/70' : ''} ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}