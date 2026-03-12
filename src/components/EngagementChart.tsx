import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { PostAPI } from '../api/connections'

interface EngagementChartProps {
  posts: PostAPI[]
}

export default function EngagementChart({ posts }: EngagementChartProps) {
  if (!posts.length) return null

  const data = posts
    .filter(p => p.posted_at)
    .sort((a, b) => new Date(a.posted_at!).getTime() - new Date(b.posted_at!).getTime())
    .map(p => ({
      date: new Date(p.posted_at!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      reactions: p.reactions_total,
      comments: p.comments_count,
      reposts: p.reposts_count,
    }))

  if (!data.length) return null

  return (
    <div
      className="bg-white rounded-xl p-5"
      style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
    >
      <h3 className="text-[13px] font-semibold text-ink-DEFAULT mb-4">Post Engagement Over Time</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={{ stroke: '#E2E8F0' }} />
          <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={{ stroke: '#E2E8F0' }} />
          <Tooltip
            contentStyle={{
              fontSize: 11,
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(15,23,42,0.08)',
            }}
          />
          <Bar dataKey="reactions" fill="#0D9488" radius={[3, 3, 0, 0]} name="Reactions" />
          <Bar dataKey="comments" fill="#2563EB" radius={[3, 3, 0, 0]} name="Comments" />
          <Bar dataKey="reposts" fill="#7C3AED" radius={[3, 3, 0, 0]} name="Reposts" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
