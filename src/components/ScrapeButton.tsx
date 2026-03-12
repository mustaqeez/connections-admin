import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { useScrapeConnection } from '../api/scraping'

interface ScrapeButtonProps {
  connectionId: number
  connectionName: string
  onJobStarted?: (jobId: string) => void
  size?: 'sm' | 'md'
}

export default function ScrapeButton({ connectionId, connectionName, onJobStarted, size = 'md' }: ScrapeButtonProps) {
  const scrape = useScrapeConnection()
  const [jobId, setJobId] = useState<string | null>(null)

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      const result = await scrape.mutateAsync(connectionId)
      setJobId(result.job_id)
      onJobStarted?.(result.job_id)
    } catch {
      // error handled by react-query
    }
  }

  const isLoading = scrape.isPending
  const iconSize = size === 'sm' ? 12 : 14
  const padding = size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5'
  const fontSize = size === 'sm' ? 'text-[10px]' : 'text-[12px]'

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`inline-flex items-center gap-1.5 ${padding} ${fontSize} font-medium rounded-md transition-all`}
      style={{
        background: isLoading ? '#F1F5F9' : '#F0FDFA',
        color: isLoading ? '#94A3B8' : '#0D9488',
        border: `1px solid ${isLoading ? '#E2E8F0' : '#0D948840'}`,
        cursor: isLoading ? 'not-allowed' : 'pointer',
      }}
      title={`Scrape posts for ${connectionName}`}
    >
      {isLoading ? <Loader2 size={iconSize} className="animate-spin" /> : <Download size={iconSize} />}
      {size === 'md' && (isLoading ? 'Scraping...' : 'Scrape')}
    </button>
  )
}
