import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ExternalLink, Star } from 'lucide-react'
import TopBar from '../components/TopBar'
import { Avatar } from '../components/ConnectionCard'
import ScrapeGroupButton from '../components/ScrapeGroupButton'
import ScrapeProgressBar from '../components/ScrapeProgressBar'
import {
  getConnectionsByGroup, SEGMENT_LABELS, PRIORITY_SEGMENTS,
  SEGMENT_COLORS, SEGMENT_BG,
  type Segment, type Connection,
} from '../data/connections'

const SEGMENT_ORDER: Segment[] = [
  'Hotel GM',
  'Hospitality C-Suite',
  'Consultant/Advisor',
  'Revenue/Sales',
  'Marketing',
  'F&B',
  'Tech/IT',
  'Finance',
  'Real Estate',
  'Other',
]

interface GroupSectionProps {
  segment: Segment
  connections: Connection[]
  index: number
  defaultOpen?: boolean
}

function GroupSection({ segment, connections, index, defaultOpen = false }: GroupSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [page, setPage] = useState(1)
  const [scrapeJobId, setScrapeJobId] = useState<string | null>(null)
  const PAGE = 50

  const color      = SEGMENT_COLORS[segment]
  const bg         = SEGMENT_BG[segment]
  const isPriority = PRIORITY_SEGMENTS.includes(segment)
  const paginated  = connections.slice(0, page * PAGE)
  const hasMore    = paginated.length < connections.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
    >
      {/* Section header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        style={{
          background: open ? bg : 'white',
          borderBottom: open ? `1px solid ${color}25` : 'none',
          transition: 'background 0.18s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLElement).style.background = '#F8FAFC' }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLElement).style.background = 'white' }}
      >
        {/* Color dot */}
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: color, boxShadow: `0 0 0 3px ${color}25` }}
        />

        {/* Title */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="text-[14px] font-semibold text-ink-DEFAULT">
            {SEGMENT_LABELS[segment]}
          </span>
          {isPriority && (
            <span
              className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}
            >
              <Star size={9} strokeWidth={2.5} />
              Priority
            </span>
          )}
        </div>

        {/* Scrape button */}
        <ScrapeGroupButton
          segment={segment}
          profileCount={connections.length}
          onJobStarted={setScrapeJobId}
        />

        {/* Count badge */}
        <span
          className="font-mono text-[12px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: open ? `${color}20` : '#F1F5F9', color: open ? color : '#64748B' }}
        >
          {connections.length.toLocaleString()}
        </span>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} className="text-ink-300" />
        </motion.div>
      </button>

      {/* Scrape progress */}
      {scrapeJobId && (
        <div className="px-5 py-2">
          <ScrapeProgressBar jobId={scrapeJobId} onComplete={() => setScrapeJobId(null)} />
        </div>
      )}

      {/* Expandable table */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ minWidth: 700 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th className="text-left px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-300 w-10">#</th>
                    <th className="text-left px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-300 w-56">Name</th>
                    <th className="text-left px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-300">Headline</th>
                    <th className="text-left px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-300 w-28">Region</th>
                    <th className="text-left px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-ink-300 w-36">Connected</th>
                    <th className="w-12" />
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: Math.min(i * 0.012, 0.25), duration: 0.18 }}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background 0.12s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td className="px-5 py-2.5 font-mono text-[10px] text-ink-200">{i + 1}</td>
                      <td className="px-5 py-2.5">
                        <Link to={`/connections/${c.id}`} className="flex items-center gap-2 group">
                          <Avatar name={c.name} color={color} bg={bg} size={26} />
                          <span className="text-[12px] font-semibold text-ink-DEFAULT whitespace-nowrap group-hover:text-brand transition-colors">{c.name}</span>
                        </Link>
                      </td>
                      <td className="px-5 py-2.5" style={{ maxWidth: 320 }}>
                        <p className="text-[11px] text-ink-400 truncate">{c.headline}</p>
                      </td>
                      <td className="px-5 py-2.5">
                        <span className="font-mono text-[10px] text-ink-300">{c.region}</span>
                      </td>
                      <td className="px-5 py-2.5">
                        <span className="font-mono text-[10px] text-ink-300">{c.connectedDate}</span>
                      </td>
                      <td className="px-5 py-2.5 text-right">
                        <a
                          href={c.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-200 hover:text-brand transition-colors inline-flex"
                          onClick={e => e.stopPropagation()}
                        >
                          <ExternalLink size={12} />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div className="px-5 py-3" style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA' }}>
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="text-[12px] font-medium text-brand hover:text-brand-dk transition-colors"
                >
                  Show more · {(connections.length - paginated.length).toLocaleString()} remaining →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Groups() {
  const groups = getConnectionsByGroup()
  const total  = Object.values(groups).reduce((s, g) => s + g.length, 0)

  return (
    <div className="min-h-screen">
      <TopBar
        title="Groups"
        subtitle={`${SEGMENT_ORDER.length} segments · ${total.toLocaleString()} total`}
      />

      <div className="px-7 py-6">

        {/* ── Summary row ── */}
        <div
          className="flex flex-wrap gap-0 mb-6 bg-white rounded-xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
        >
          {SEGMENT_ORDER.map((seg, i) => {
            const count      = groups[seg].length
            const color      = SEGMENT_COLORS[seg]
            const bg         = SEGMENT_BG[seg]
            const isPriority = PRIORITY_SEGMENTS.includes(seg)
            return (
              <div
                key={seg}
                className="flex-1 px-4 py-3 min-w-[100px]"
                style={{
                  borderRight: i < SEGMENT_ORDER.length - 1 ? '1px solid #E2E8F0' : 'none',
                }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider truncate"
                  style={{ color: isPriority ? color : '#94A3B8', letterSpacing: '0.07em' }}
                >
                  {seg === 'Hospitality C-Suite' ? 'C-Suite' :
                   seg === 'Consultant/Advisor' ? 'Consultants' :
                   seg === 'Revenue/Sales' ? 'Rev/Sales' : seg}
                </p>
                <p
                  className="font-mono font-semibold mt-0.5"
                  style={{ fontSize: 20, color: isPriority ? color : '#0F172A', letterSpacing: '-0.03em' }}
                >
                  {count}
                </p>
              </div>
            )
          })}
        </div>

        {/* ── Accordion sections ── */}
        <div className="space-y-2">
          {SEGMENT_ORDER.map((seg, i) => (
            <GroupSection
              key={seg}
              segment={seg}
              connections={groups[seg]}
              index={i}
              defaultOpen={i < 2}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
