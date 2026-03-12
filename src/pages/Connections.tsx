import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronsUpDown, ExternalLink, X, Download } from 'lucide-react'
import TopBar from '../components/TopBar'
import { Avatar } from '../components/ConnectionCard'
import ScrapeButton from '../components/ScrapeButton'
import {
  ALL_CONNECTIONS, SEGMENT_COLORS, SEGMENT_BG,
  type Segment, type Seniority, SEGMENT_LABELS,
} from '../data/connections'

type SortCol = 'name' | 'segment' | 'seniority' | 'region' | 'date'
type SegFilter = Segment | 'all'
type SenFilter = Seniority | 'all'

const PAGE_SIZE = 50

const SEG_OPTIONS: Array<{ value: SegFilter; label: string }> = [
  { value: 'all', label: 'All Segments' },
  { value: 'Hotel GM', label: 'Hotel GMs' },
  { value: 'Hospitality C-Suite', label: 'C-Suite' },
  { value: 'Consultant/Advisor', label: 'Consultants' },
  { value: 'Revenue/Sales', label: 'Revenue/Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'F&B', label: 'F&B' },
  { value: 'Tech/IT', label: 'Tech/IT' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Other', label: 'Other' },
]

const SEN_OPTIONS: Array<{ value: SenFilter; label: string }> = [
  { value: 'all', label: 'All Levels' },
  { value: 'C-Suite', label: 'C-Suite' },
  { value: 'VP/Director', label: 'VP / Director' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Other', label: 'Other' },
]

function SortIcon({ col, active, dir }: { col: SortCol; active: SortCol; dir: 'asc' | 'desc' }) {
  if (col !== active) return <ChevronsUpDown size={12} className="text-ink-200" />
  return dir === 'asc'
    ? <ChevronUp size={12} className="text-brand" />
    : <ChevronDown size={12} className="text-brand" />
}

function TH({
  children, col, sortCol, sortDir, onSort, width,
}: {
  children: React.ReactNode
  col: SortCol
  sortCol: SortCol
  sortDir: 'asc' | 'desc'
  onSort: (c: SortCol) => void
  width?: number | string
}) {
  const active = col === sortCol
  return (
    <th
      onClick={() => onSort(col)}
      className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider cursor-pointer select-none"
      style={{
        color: active ? '#0D9488' : '#94A3B8',
        letterSpacing: '0.07em',
        borderBottom: '1px solid #E2E8F0',
        background: '#F8FAFC',
        width,
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIcon col={col} active={sortCol} dir={sortDir} />
      </div>
    </th>
  )
}

const selStyle: React.CSSProperties = {
  padding: '6px 10px',
  fontSize: 12,
  minWidth: 130,
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: 28,
}

export default function Connections() {
  const [search, setSearch] = useState('')
  const [seg, setSeg]       = useState<SegFilter>('all')
  const [sen, setSen]       = useState<SenFilter>('all')
  const [sortCol, setSortCol] = useState<SortCol>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage]     = useState(1)

  const handleSearch = useCallback((q: string) => { setSearch(q); setPage(1) }, [])

  function toggleSort(col: SortCol) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
    setPage(1)
  }

  const filtered = useMemo(() => {
    let r = ALL_CONNECTIONS
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(c => c.name.toLowerCase().includes(q) || c.headline.toLowerCase().includes(q))
    }
    if (seg !== 'all') r = r.filter(c => c.segment === seg)
    if (sen !== 'all') r = r.filter(c => c.seniority === sen)
    return [...r].sort((a, b) => {
      let v = 0
      if (sortCol === 'name')     v = a.name.localeCompare(b.name)
      if (sortCol === 'segment')  v = a.segment.localeCompare(b.segment)
      if (sortCol === 'seniority')v = a.seniority.localeCompare(b.seniority)
      if (sortCol === 'region')   v = a.region.localeCompare(b.region)
      if (sortCol === 'date')     v = a.id - b.id
      return sortDir === 'asc' ? v : -v
    })
  }, [search, seg, sen, sortCol, sortDir])

  const totalPages  = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const hasFilters  = seg !== 'all' || sen !== 'all' || search.trim()

  function clearFilters() { setSearch(''); setSeg('all'); setSen('all'); setPage(1) }

  return (
    <div className="min-h-screen">
      <TopBar
        title="Connections"
        subtitle={`${filtered.length.toLocaleString()} of ${ALL_CONNECTIONS.length.toLocaleString()}`}
        onSearch={handleSearch}
        searchValue={search}
      />

      <div className="px-7 py-6">

        {/* ── Filter bar ── */}
        <div
          className="flex items-center gap-2 mb-5 flex-wrap"
        >
          <select value={seg} onChange={e => { setSeg(e.target.value as SegFilter); setPage(1) }} style={selStyle}>
            {SEG_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={sen} onChange={e => { setSen(e.target.value as SenFilter); setPage(1) }} style={selStyle}>
            {SEN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-[12px] text-ink-400 hover:text-ink-DEFAULT transition-colors px-3 py-1.5 rounded-md hover:bg-ink-50"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <X size={12} /> Clear filters
            </button>
          )}

          <span className="ml-auto font-mono text-[11px] text-ink-300">
            {filtered.length.toLocaleString()} results
          </span>
        </div>

        {/* ── Table ── */}
        <div
          className="bg-white rounded-xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: 900 }}>
              <thead>
                <tr>
                  <th
                    className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider w-12"
                    style={{ color: '#94A3B8', letterSpacing: '0.07em', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}
                  >
                    #
                  </th>
                  <TH col="name"     sortCol={sortCol} sortDir={sortDir} onSort={toggleSort} width={220}>Name</TH>
                  <th
                    className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: '#94A3B8', letterSpacing: '0.07em', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}
                  >
                    Headline
                  </th>
                  <TH col="segment"  sortCol={sortCol} sortDir={sortDir} onSort={toggleSort} width={150}>Segment</TH>
                  <TH col="seniority"sortCol={sortCol} sortDir={sortDir} onSort={toggleSort} width={130}>Seniority</TH>
                  <TH col="region"   sortCol={sortCol} sortDir={sortDir} onSort={toggleSort} width={120}>Region</TH>
                  <TH col="date"     sortCol={sortCol} sortDir={sortDir} onSort={toggleSort} width={140}>Connected</TH>
                  <th
                    className="px-4 py-2.5 w-14"
                    style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}
                  />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {paginated.length === 0 ? (
                    <tr key="empty">
                      <td colSpan={8} className="text-center py-16 text-ink-300 text-[13px]">
                        No connections match your filters
                      </td>
                    </tr>
                  ) : (
                    paginated.map((c, i) => {
                      const color = SEGMENT_COLORS[c.segment as Segment]
                      const bg    = SEGMENT_BG[c.segment as Segment]
                      const row   = (page - 1) * PAGE_SIZE + i + 1
                      return (
                        <motion.tr
                          key={c.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.18, delay: Math.min(i * 0.015, 0.3) }}
                          style={{
                            borderBottom: '1px solid #F1F5F9',
                            transition: 'background 0.12s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td className="px-4 py-3 font-mono text-[11px] text-ink-300">{row}</td>

                          <td className="px-4 py-3">
                            <Link to={`/connections/${c.id}`} className="flex items-center gap-2.5 group">
                              <Avatar name={c.name} color={color} bg={bg} size={28} />
                              <span className="text-[13px] font-semibold text-ink-DEFAULT whitespace-nowrap group-hover:text-brand transition-colors">{c.name}</span>
                            </Link>
                          </td>

                          <td className="px-4 py-3" style={{ maxWidth: 280 }}>
                            <p className="text-[12px] text-ink-400 truncate">{c.headline}</p>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className="badge"
                              style={{ background: bg, color, fontSize: 10 }}
                            >
                              {c.segment}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className="badge"
                              style={{
                                background: '#F8FAFC',
                                color: '#475569',
                                border: '1px solid #E2E8F0',
                                fontSize: 10,
                              }}
                            >
                              {c.seniority}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span className="font-mono text-[11px] text-ink-400">{c.region}</span>
                          </td>

                          <td className="px-4 py-3">
                            <span className="font-mono text-[11px] text-ink-300">{c.connectedDate}</span>
                          </td>

                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <ScrapeButton connectionId={c.id} connectionName={c.name} size="sm" />
                              <a
                                href={c.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-ink-200 hover:text-brand transition-colors inline-flex"
                              >
                                <ExternalLink size={13} />
                              </a>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div
              className="flex items-center justify-between px-6 py-3"
              style={{ borderTop: '1px solid #E2E8F0', background: '#FAFAFA' }}
            >
              <span className="font-mono text-[11px] text-ink-300">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()}
              </span>

              <div className="flex items-center gap-1.5">
                {/* Page numbers */}
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let p: number
                  if (totalPages <= 7) {
                    p = i + 1
                  } else if (page <= 4) {
                    p = i < 6 ? i + 1 : totalPages
                  } else if (page >= totalPages - 3) {
                    p = i === 0 ? 1 : totalPages - 6 + i
                  } else {
                    const mid = [1, page - 1, page, page + 1, totalPages]
                    p = mid[Math.min(i, mid.length - 1)]
                  }
                  const active = p === page
                  return (
                    <button
                      key={`${i}-${p}`}
                      onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className="w-7 h-7 rounded-md font-mono text-[11px] transition-all"
                      style={{
                        background: active ? '#0D9488' : 'transparent',
                        color: active ? '#fff' : '#64748B',
                        border: active ? '1px solid #0D9488' : '1px solid transparent',
                        fontWeight: active ? 600 : 400,
                        cursor: active ? 'default' : 'pointer',
                      }}
                    >
                      {p}
                    </button>
                  )
                })}

                <div className="w-px h-4 bg-ink-100 mx-1" />

                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  disabled={page === 1}
                  className="px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors"
                  style={{
                    color: page === 1 ? '#CBD5E1' : '#475569',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    border: '1px solid #E2E8F0',
                    background: 'white',
                  }}
                >
                  ← Prev
                </button>
                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  disabled={page === totalPages}
                  className="px-2.5 py-1 rounded-md text-[12px] font-medium transition-colors"
                  style={{
                    color: page === totalPages ? '#CBD5E1' : '#475569',
                    cursor: page === totalPages ? 'not-allowed' : 'pointer',
                    border: '1px solid #E2E8F0',
                    background: 'white',
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
