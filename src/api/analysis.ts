import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiFetch } from './client'
import type { AnalysisAPI } from './connections'

export function useAnalysis(connectionId: number | string) {
  return useQuery<AnalysisAPI | null>({
    queryKey: ['analysis', connectionId],
    queryFn: () => apiFetch(`/analysis/connection/${connectionId}`),
    enabled: !!connectionId,
  })
}

export function useTriggerAnalysis() {
  const qc = useQueryClient()
  return useMutation<AnalysisAPI, Error, number>({
    mutationFn: (connectionId) =>
      apiFetch(`/analysis/connection/${connectionId}`, { method: 'POST' }),
    onSuccess: (_data, connectionId) => {
      qc.invalidateQueries({ queryKey: ['analysis', connectionId] })
      qc.invalidateQueries({ queryKey: ['connection', connectionId] })
    },
  })
}
