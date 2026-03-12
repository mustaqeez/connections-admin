import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, MapPin, Calendar, Briefcase, Loader2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import TopBar from '../components/TopBar'
import { Avatar } from '../components/ConnectionCard'
import ScrapeButton from '../components/ScrapeButton'
import ScrapeProgressBar from '../components/ScrapeProgressBar'
import PostCard from '../components/PostCard'
import AnalysisPanel from '../components/AnalysisPanel'
import EngagementChart from '../components/EngagementChart'
import { useConnection } from '../api/connections'
import { useAnalysis, useTriggerAnalysis } from '../api/analysis'
import { SEGMENT_COLORS, SEGMENT_BG, type Segment } from '../data/connections'

export default function ConnectionDetail() {
  const { id } = useParams<{ id: string }>()
  const qc = useQueryClient()
  const { data: conn, isLoading } = useConnection(id!)
  const { data: analysis, isLoading: analysisLoading } = useAnalysis(id!)
  const triggerAnalysis = useTriggerAnalysis()
  const [scrapeJobId, setScrapeJobId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-brand" />
      </div>
    )
  }

  if (!conn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <p className="text-[14px] text-ink-400">Connection not found</p>
        <Link to="/connections" className="text-[13px] text-brand hover:text-brand-dk font-medium">
          Back to Connections
        </Link>
      </div>
    )
  }

  const color = SEGMENT_COLORS[conn.segment as Segment] || '#64748B'
  const bg = SEGMENT_BG[conn.segment as Segment] || '#F8FAFC'
  const posts = conn.posts || []
  const hasPosts = posts.length > 0

  const handleScrapeComplete = () => {
    setScrapeJobId(null)
    qc.invalidateQueries({ queryKey: ['connection', id] })
    qc.invalidateQueries({ queryKey: ['connection-posts', id] })
  }

  return (
    <div className="min-h-screen">
      <TopBar
        title={conn.name}
        subtitle={conn.segment}
        actions={
          <Link
            to="/connections"
            className="inline-flex items-center gap-1.5 text-[12px] text-ink-400 hover:text-ink-DEFAULT transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </Link>
        }
      />

      <div className="px-7 py-6 space-y-5">

        {/* Top section: Profile + Analysis side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Profile Card - 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 bg-white rounded-xl overflow-hidden"
            style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
          >
            {/* Color bar */}
            <div className="h-1.5" style={{ background: color }} />

            <div className="p-5 space-y-4">
              {/* Avatar + name */}
              <div className="flex items-start gap-3.5">
                <Avatar name={conn.name} color={color} bg={bg} size={56} />
                <div className="min-w-0 flex-1">
                  <h2 className="text-[16px] font-semibold text-ink-DEFAULT leading-tight">{conn.name}</h2>
                  <p className="text-[12px] text-ink-400 mt-0.5 line-clamp-2">{conn.headline}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className="badge"
                  style={{ background: bg, color, fontSize: 11 }}
                >
                  {conn.segment}
                </span>
                <span
                  className="badge"
                  style={{ background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0', fontSize: 11 }}
                >
                  {conn.seniority}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[12px] text-ink-400">
                  <MapPin size={13} className="text-ink-300" />
                  {conn.region}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-ink-400">
                  <Calendar size={13} className="text-ink-300" />
                  Connected {conn.connected_date}
                </div>
                {conn.last_scraped_at && (
                  <div className="flex items-center gap-2 text-[12px] text-ink-400">
                    <Briefcase size={13} className="text-ink-300" />
                    Last scraped {new Date(conn.last_scraped_at).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
                <ScrapeButton
                  connectionId={conn.id}
                  connectionName={conn.name}
                  onJobStarted={setScrapeJobId}
                />
                <a
                  href={conn.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-md transition-all"
                  style={{
                    background: '#F8FAFC',
                    color: '#475569',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <ExternalLink size={13} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Analysis Panel - 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="lg:col-span-3 bg-white rounded-xl overflow-hidden"
            style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
          >
            <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <h3 className="text-[13px] font-semibold text-ink-DEFAULT">AI Analysis</h3>
              {analysis && (
                <span className="text-[10px] font-mono text-ink-300 ml-auto">
                  {analysis.posts_analyzed} posts analyzed
                </span>
              )}
            </div>
            <div className="p-5">
              <AnalysisPanel
                analysis={analysis}
                isLoading={analysisLoading}
                onAnalyze={() => triggerAnalysis.mutate(conn.id)}
                onReanalyze={() => triggerAnalysis.mutate(conn.id)}
                hasPosts={hasPosts}
                isAnalyzing={triggerAnalysis.isPending}
              />
            </div>
          </motion.div>
        </div>

        {/* Scrape Progress */}
        {scrapeJobId && (
          <ScrapeProgressBar jobId={scrapeJobId} onComplete={handleScrapeComplete} />
        )}

        {/* Posts section */}
        {hasPosts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="text-[14px] font-semibold text-ink-DEFAULT mb-3">
              Posts <span className="text-ink-300 font-normal">({posts.length})</span>
            </h3>
            <div className="space-y-3">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Engagement Chart */}
        {hasPosts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <EngagementChart posts={posts} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
