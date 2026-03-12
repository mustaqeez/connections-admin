import { useState, useEffect, useCallback, useRef } from 'react'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

export interface ScrapeEvent {
  type: 'started' | 'progress' | 'polling' | 'completed' | 'error'
  message: string
  profiles_done?: number
  total?: number
  posts_scraped?: number
}

export function useScrapeProgress(jobId: string | null) {
  const [events, setEvents] = useState<ScrapeEvent[]>([])
  const [latest, setLatest] = useState<ScrapeEvent | null>(null)
  const [done, setDone] = useState(false)
  const esRef = useRef<EventSource | null>(null)

  const reset = useCallback(() => {
    setEvents([])
    setLatest(null)
    setDone(false)
  }, [])

  useEffect(() => {
    if (!jobId) return

    reset()
    const url = `${BASE_URL}/scraping/jobs/${jobId}/stream`
    const es = new EventSource(url)
    esRef.current = es

    const handleEvent = (e: MessageEvent) => {
      try {
        const data: ScrapeEvent = JSON.parse(e.data)
        setEvents(prev => [...prev, data])
        setLatest(data)
        if (data.type === 'completed' || data.type === 'error') {
          setDone(true)
          es.close()
        }
      } catch {
        // ignore parse errors
      }
    }

    es.addEventListener('started', handleEvent)
    es.addEventListener('progress', handleEvent)
    es.addEventListener('polling', handleEvent)
    es.addEventListener('completed', handleEvent)
    es.addEventListener('error', handleEvent)
    es.addEventListener('message', handleEvent)

    es.onerror = () => {
      setDone(true)
      es.close()
    }

    return () => {
      es.close()
      esRef.current = null
    }
  }, [jobId, reset])

  return { events, latest, done, reset }
}
