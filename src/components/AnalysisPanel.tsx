import { motion } from 'framer-motion'
import { Brain, Loader2, RefreshCw, Target, AlertTriangle, Frown, Hash, MessageSquare, BarChart3, Sparkles } from 'lucide-react'
import type { AnalysisAPI } from '../api/connections'

interface AnalysisPanelProps {
  analysis: AnalysisAPI | null | undefined
  isLoading: boolean
  onAnalyze: () => void
  onReanalyze: () => void
  hasPosts: boolean
  isAnalyzing: boolean
}

function TagList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span
          key={i}
          className="px-2 py-1 rounded-md text-[11px] font-medium"
          style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function BulletList({ items, icon: Icon, color }: { items: string[]; icon: React.ElementType; color: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-[12px] text-ink-DEFAULT leading-relaxed">
          <Icon size={12} className="mt-0.5 flex-shrink-0" style={{ color }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-ink-300 flex items-center gap-1.5">
        <Icon size={12} />
        {title}
      </h4>
      {children}
    </div>
  )
}

export default function AnalysisPanel({ analysis, isLoading, onAnalyze, onReanalyze, hasPosts, isAnalyzing }: AnalysisPanelProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-ink-300">
        <Loader2 size={20} className="animate-spin" />
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="text-center py-8">
        <Brain size={32} className="mx-auto mb-3 text-ink-200" />
        <p className="text-[13px] text-ink-400 mb-3">
          {hasPosts ? 'No analysis yet. Run AI analysis on scraped posts.' : 'Scrape posts first to enable AI analysis.'}
        </p>
        {hasPosts && (
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-medium rounded-md transition-all"
            style={{
              background: isAnalyzing ? '#F1F5F9' : '#0D9488',
              color: isAnalyzing ? '#94A3B8' : '#fff',
              cursor: isAnalyzing ? 'not-allowed' : 'pointer',
            }}
          >
            {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {isAnalyzing ? 'Analyzing...' : 'Analyze Posts'}
          </button>
        )}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      {/* Summary */}
      {analysis.summary && (
        <div className="rounded-lg px-4 py-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <p className="text-[13px] text-ink-DEFAULT leading-relaxed">{analysis.summary}</p>
        </div>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap gap-3">
        {analysis.tone && (
          <span className="text-[11px] px-2 py-1 rounded-md bg-purple-50 text-purple-700 font-medium">
            {analysis.tone}
          </span>
        )}
        {analysis.posting_frequency && (
          <span className="text-[11px] px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-medium">
            Posts {analysis.posting_frequency}
          </span>
        )}
        {analysis.engagement_level && (
          <span className="text-[11px] px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium">
            {analysis.engagement_level} Engagement
          </span>
        )}
      </div>

      {/* Interests */}
      {analysis.interests && analysis.interests.length > 0 && (
        <Section title="Interests" icon={Target}>
          <TagList items={analysis.interests} color="#0D9488" />
        </Section>
      )}

      {/* Topics */}
      {analysis.topics && analysis.topics.length > 0 && (
        <Section title="Topics" icon={Hash}>
          <TagList items={analysis.topics} color="#2563EB" />
        </Section>
      )}

      {/* Pain Points */}
      {analysis.pain_points && analysis.pain_points.length > 0 && (
        <Section title="Pain Points" icon={AlertTriangle}>
          <BulletList items={analysis.pain_points} icon={AlertTriangle} color="#F59E0B" />
        </Section>
      )}

      {/* Frustrations */}
      {analysis.frustrations && analysis.frustrations.length > 0 && (
        <Section title="Frustrations" icon={Frown}>
          <BulletList items={analysis.frustrations} icon={Frown} color="#DC2626" />
        </Section>
      )}

      {/* Conversation Starters */}
      {analysis.conversation_starters && analysis.conversation_starters.length > 0 && (
        <Section title="Conversation Starters" icon={MessageSquare}>
          <BulletList items={analysis.conversation_starters} icon={MessageSquare} color="#7C3AED" />
        </Section>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #E2E8F0' }}>
        <span className="text-[10px] text-ink-300 font-mono">
          {analysis.model_used} · {analysis.posts_analyzed} posts · {analysis.analyzed_at ? new Date(analysis.analyzed_at).toLocaleDateString() : ''}
        </span>
        <button
          onClick={onReanalyze}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-brand hover:text-brand-dk transition-colors"
        >
          {isAnalyzing ? <Loader2 size={11} className="animate-spin" /> : <RefreshCw size={11} />}
          Re-analyze
        </button>
      </div>
    </motion.div>
  )
}
