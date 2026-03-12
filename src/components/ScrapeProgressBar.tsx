import { motion } from 'framer-motion'
import { useScrapeProgress } from '../hooks/useScrapeProgress'

interface ScrapeProgressBarProps {
  jobId: string | null
  onComplete?: () => void
}

export default function ScrapeProgressBar({ jobId, onComplete }: ScrapeProgressBarProps) {
  const { latest, done } = useScrapeProgress(jobId)

  if (!jobId || !latest) return null

  const total = latest.total || 1
  const profilesDone = latest.profiles_done || 0
  const pct = Math.min((profilesDone / total) * 100, 100)
  const isError = latest.type === 'error'
  const isComplete = latest.type === 'completed'

  if (isComplete && onComplete) {
    setTimeout(onComplete, 1500)
  }

  return (
    <div
      className="rounded-lg px-4 py-3"
      style={{
        background: isError ? '#FEF2F2' : isComplete ? '#F0FDF4' : '#F0FDFA',
        border: `1px solid ${isError ? '#FCA5A5' : isComplete ? '#86EFAC' : '#0D948830'}`,
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] font-medium" style={{ color: isError ? '#DC2626' : '#0D9488' }}>
          {latest.message}
        </span>
        {!isError && (
          <span className="text-[11px] font-mono text-ink-300">
            {profilesDone}/{total} profiles
            {latest.posts_scraped ? ` · ${latest.posts_scraped} posts` : ''}
          </span>
        )}
      </div>
      {!isError && (
        <div className="w-full h-1.5 rounded-full bg-white overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: isComplete ? '#22C55E' : '#0D9488' }}
            initial={{ width: 0 }}
            animate={{ width: `${isComplete ? 100 : pct}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      )}
    </div>
  )
}
