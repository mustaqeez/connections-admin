import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, Heart, Star, Lightbulb, Laugh, MessageCircle, Repeat2, ChevronDown, ChevronUp, Award } from 'lucide-react'
import type { PostAPI } from '../api/connections'

interface PostCardProps {
  post: PostAPI
  index: number
}

function ReactionBadge({ icon: Icon, count, color, label }: { icon: React.ElementType; count: number; color: string; label: string }) {
  if (!count) return null
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono"
      style={{ background: `${color}15`, color }}
      title={label}
    >
      <Icon size={10} />
      {count}
    </span>
  )
}

export default function PostCard({ post, index }: PostCardProps) {
  const [expanded, setExpanded] = useState(false)
  const text = post.post_text || ''
  const isLong = text.length > 300
  const displayText = isLong && !expanded ? text.slice(0, 300) + '...' : text

  const postedDate = post.posted_at
    ? new Date(post.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Unknown date'

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="bg-white rounded-lg overflow-hidden"
      style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}
    >
      <div className="px-4 py-3">
        {/* Date & reshare */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-ink-300">{postedDate}</span>
          {post.is_reshare && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">
              Reshared {post.reshared_author ? `from ${post.reshared_author}` : ''}
            </span>
          )}
        </div>

        {/* Post text */}
        {text && (
          <div className="mb-3">
            <p className="text-[13px] text-ink-DEFAULT leading-relaxed whitespace-pre-line">{displayText}</p>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1 text-[11px] text-brand font-medium mt-1 hover:text-brand-dk transition-colors"
              >
                {expanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Read more</>}
              </button>
            )}
          </div>
        )}

        {/* Media preview */}
        {post.media_url && (
          <div className="mb-3 rounded-md overflow-hidden" style={{ maxHeight: 200 }}>
            <img src={post.media_url} alt="" className="w-full object-cover" style={{ maxHeight: 200 }} />
          </div>
        )}

        {/* Engagement row */}
        <div className="flex items-center gap-2 flex-wrap">
          <ReactionBadge icon={ThumbsUp} count={post.reactions_like} color="#2563EB" label="Likes" />
          <ReactionBadge icon={Award} count={post.reactions_celebrate} color="#7C3AED" label="Celebrate" />
          <ReactionBadge icon={Heart} count={post.reactions_support} color="#EC4899" label="Support" />
          <ReactionBadge icon={Heart} count={post.reactions_love} color="#DC2626" label="Love" />
          <ReactionBadge icon={Lightbulb} count={post.reactions_insightful} color="#F59E0B" label="Insightful" />
          <ReactionBadge icon={Laugh} count={post.reactions_funny} color="#10B981" label="Funny" />

          <div className="flex-1" />

          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-ink-300">
            <MessageCircle size={11} /> {post.comments_count}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-ink-300">
            <Repeat2 size={11} /> {post.reposts_count}
          </span>

          {post.reactions_total > 0 && (
            <span className="text-[11px] font-mono font-semibold text-ink-400">
              {post.reactions_total} reactions
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
