import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetch } from './client'

export interface ScrapeJobAPI {
  id: string
  scope: string
  segment: string | null
  connection_id: number | null
  status: string
  total_profiles: number
  profiles_done: number
  posts_scraped: number
  error_message: string | null
  started_at: string | null
  completed_at: string | null
}

interface ScrapeStart {
  job_id: string
  status: string
  message: string
}

export function useScrapeConnection() {
  const qc = useQueryClient()
  return useMutation<ScrapeStart, Error, number>({
    mutationFn: (connectionId) =>
      apiFetch(`/scraping/connection/${connectionId}`, { method: 'POST' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['scrape-jobs'] })
    },
  })
}

export function useScrapeSegment() {
  const qc = useQueryClient()
  return useMutation<ScrapeStart, Error, string>({
    mutationFn: (segment) =>
      apiFetch(`/scraping/segment/${encodeURIComponent(segment)}`, { method: 'POST' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['scrape-jobs'] })
    },
  })
}

export function useScrapeJob(jobId: string | null) {
  return useQuery<ScrapeJobAPI>({
    queryKey: ['scrape-job', jobId],
    queryFn: () => apiFetch(`/scraping/jobs/${jobId}`),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      if (status === 'succeeded' || status === 'failed') return false
      return 2000
    },
  })
}

export function useScrapeJobs() {
  return useQuery<ScrapeJobAPI[]>({
    queryKey: ['scrape-jobs'],
    queryFn: () => apiFetch('/scraping/jobs'),
  })
}
