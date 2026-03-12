import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { useScrapeSegment } from '../api/scraping'

interface ScrapeGroupButtonProps {
  segment: string
  profileCount: number
  onJobStarted?: (jobId: string) => void
}

export default function ScrapeGroupButton({ segment, profileCount, onJobStarted }: ScrapeGroupButtonProps) {
  const scrape = useScrapeSegment()
  const [showConfirm, setShowConfirm] = useState(false)

  const estimatedCost = (profileCount * 0.05).toFixed(2)

  const handleScrape = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }
    try {
      const result = await scrape.mutateAsync(segment)
      onJobStarted?.(result.job_id)
      setShowConfirm(false)
    } catch {
      setShowConfirm(false)
    }
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setShowConfirm(false)
  }

  if (showConfirm) {
    return (
      <div className="inline-flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
        <span className="text-[10px] text-ink-400">
          ~${estimatedCost} for {profileCount} profiles
        </span>
        <button
          onClick={handleScrape}
          disabled={scrape.isPending}
          className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-md transition-all"
          style={{
            background: '#0D9488',
            color: '#fff',
            border: '1px solid #0D9488',
            cursor: scrape.isPending ? 'not-allowed' : 'pointer',
          }}
        >
          {scrape.isPending ? <Loader2 size={10} className="animate-spin" /> : null}
          Confirm
        </button>
        <button
          onClick={handleCancel}
          className="px-2 py-1 text-[10px] font-medium rounded-md text-ink-400 hover:text-ink-DEFAULT transition-colors"
          style={{ border: '1px solid #E2E8F0' }}
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleScrape}
      disabled={scrape.isPending}
      className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-md transition-all"
      style={{
        background: '#F0FDFA',
        color: '#0D9488',
        border: '1px solid #0D948840',
        cursor: 'pointer',
      }}
      title={`Scrape all ${profileCount} profiles in ${segment}`}
    >
      <Download size={10} />
      Scrape All
    </button>
  )
}
