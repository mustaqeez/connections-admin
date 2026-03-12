import { useQuery } from '@tanstack/react-query'
import { apiFetch } from './client'

export interface ConnectionAPI {
  id: number
  name: string
  headline: string
  connected_date: string
  linkedin_url: string
  segment: string
  seniority: string
  region: string
  last_scraped_at: string | null
}

export interface PostAPI {
  id: number
  connection_id: number
  post_url: string
  post_text: string | null
  posted_at: string | null
  reactions_total: number
  reactions_like: number
  reactions_celebrate: number
  reactions_support: number
  reactions_love: number
  reactions_insightful: number
  reactions_funny: number
  comments_count: number
  reposts_count: number
  media_type: string | null
  media_url: string | null
  is_reshare: boolean
  reshared_author: string | null
  reshared_text: string | null
}

export interface AnalysisAPI {
  id: number
  connection_id: number
  interests: string[] | null
  pain_points: string[] | null
  frustrations: string[] | null
  topics: string[] | null
  tone: string | null
  posting_frequency: string | null
  engagement_level: string | null
  summary: string | null
  conversation_starters: string[] | null
  model_used: string | null
  posts_analyzed: number
  analyzed_at: string | null
}

interface ConnectionList {
  items: ConnectionAPI[]
  total: number
  page: number
  page_size: number
}

interface ConnectionDetail extends ConnectionAPI {
  posts: PostAPI[]
  analyses: AnalysisAPI[]
}

interface PostList {
  items: PostAPI[]
  total: number
  page: number
  page_size: number
}

interface SegmentCount {
  segment: string
  count: number
}

export function useConnections(params: {
  search?: string
  segment?: string
  seniority?: string
  sort?: string
  order?: string
  page?: number
  page_size?: number
}) {
  const qs = new URLSearchParams()
  if (params.search) qs.set('search', params.search)
  if (params.segment) qs.set('segment', params.segment)
  if (params.seniority) qs.set('seniority', params.seniority)
  if (params.sort) qs.set('sort', params.sort)
  if (params.order) qs.set('order', params.order)
  if (params.page) qs.set('page', String(params.page))
  if (params.page_size) qs.set('page_size', String(params.page_size))

  return useQuery<ConnectionList>({
    queryKey: ['connections', params],
    queryFn: () => apiFetch(`/connections?${qs}`),
  })
}

export function useConnection(id: number | string) {
  return useQuery<ConnectionDetail>({
    queryKey: ['connection', id],
    queryFn: () => apiFetch(`/connections/${id}`),
    enabled: !!id,
  })
}

export function useConnectionPosts(id: number | string, page = 1) {
  return useQuery<PostList>({
    queryKey: ['connection-posts', id, page],
    queryFn: () => apiFetch(`/connections/${id}/posts?page=${page}`),
    enabled: !!id,
  })
}

export function useSegments() {
  return useQuery<SegmentCount[]>({
    queryKey: ['segments'],
    queryFn: () => apiFetch('/connections/segments'),
  })
}
