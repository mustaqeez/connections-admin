import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number
  suffix?: string
  accent?: string
  accentBg?: string
  delay?: number
  description?: string
  icon?: LucideIcon
}

function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const t0 = performance.now()
    const frame = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [started, target, duration])

  return { count, ref }
}

export default function StatCard({
  label,
  value,
  suffix = '',
  accent = '#0D9488',
  accentBg = '#F0FDFA',
  delay = 0,
  description,
  icon: Icon,
}: StatCardProps) {
  const { count, ref } = useCounter(value)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-xl p-5 relative"
      style={{
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(15,23,42,0.06)',
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#94A3B8', letterSpacing: '0.08em' }}>
          {label}
        </p>
        {Icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: accentBg }}
          >
            <Icon size={15} style={{ color: accent }} strokeWidth={2} />
          </div>
        )}
      </div>

      <p
        className="font-mono font-semibold leading-none"
        style={{ fontSize: 36, color: '#0F172A', letterSpacing: '-0.03em' }}
      >
        {count.toLocaleString()}{suffix}
      </p>

      {description && (
        <p className="text-[12px] mt-2" style={{ color: '#94A3B8' }}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
