import { motion } from 'framer-motion'
import { Users, Building2, Briefcase, Crown, TrendingUp, ExternalLink } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts'
import TopBar from '../components/TopBar'
import StatCard from '../components/StatCard'
import { Avatar } from '../components/ConnectionCard'
import {
  ALL_CONNECTIONS, getSegmentStats, getGrowthByYear,
  getTopTargets, SEGMENT_COLORS, SEGMENT_BG, SEGMENT_LABELS,
} from '../data/connections'
import type { Segment } from '../data/connections'

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-ink-100 rounded-lg px-3.5 py-2.5 shadow-card-md">
      <p className="text-[11px] font-semibold text-ink-300 mb-1.5 uppercase tracking-wide">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-[12px] font-mono" style={{ color: p.color }}>
          {p.name}: <strong>{p.value.toLocaleString()}</strong>
        </p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const segStats = getSegmentStats()
  const growth   = getGrowthByYear()
  const targets  = getTopTargets('Consultant/Advisor', 10)
  const total    = ALL_CONNECTIONS.length
  const gmCount  = ALL_CONNECTIONS.filter(c => c.segment === 'Hotel GM').length
  const cCount   = ALL_CONNECTIONS.filter(c => c.segment === 'Consultant/Advisor').length
  const csCount  = ALL_CONNECTIONS.filter(c => c.segment === 'Hospitality C-Suite').length

  const statCards = [
    { label: 'Total Connections', value: total,   accent: '#0D9488', accentBg: '#F0FDFA', icon: Users,     description: 'LinkedIn network' },
    { label: 'Hotel GMs',         value: gmCount, accent: '#D97706', accentBg: '#FFFBEB', icon: Building2, description: 'Primary buyers'  },
    { label: 'Consultants',       value: cCount,  accent: '#2563EB', accentBg: '#EFF6FF', icon: Briefcase, description: 'Target partners'  },
    { label: 'C-Suite',           value: csCount, accent: '#7C3AED', accentBg: '#F5F3FF', icon: Crown,     description: 'Decision makers'  },
  ]

  return (
    <div className="min-h-screen">
      <TopBar title="Dashboard" subtitle="Network Overview" />

      <div className="px-7 py-6 space-y-6">

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>

        {/* ── Charts ── */}
        <div className="grid grid-cols-5 gap-4">

          {/* Growth area chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="col-span-3 bg-white rounded-xl p-5"
            style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-ink-DEFAULT">Network Growth</h3>
                <p className="text-[12px] text-ink-300 mt-0.5">Cumulative connections by year</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-brand font-medium">
                <TrendingUp size={13} />
                <span>2018–2026</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growth} margin={{ top: 4, right: 2, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#0D9488" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 0" stroke="#F1F5F9" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="cumulative" name="Total" stroke="#0D9488" strokeWidth={2} fill="url(#tealGrad)" dot={false} activeDot={{ r: 4, fill: '#0D9488', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Segment breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46 }}
            className="col-span-2 bg-white rounded-xl p-5"
            style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
          >
            <h3 className="text-sm font-semibold text-ink-DEFAULT mb-1">By Segment</h3>
            <p className="text-[12px] text-ink-300 mb-4">Role distribution</p>
            <div className="space-y-3">
              {segStats.slice(0, 8).map((s, i) => {
                const pct = Math.round((s.count / total) * 100)
                return (
                  <motion.div
                    key={s.segment}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-medium text-ink-DEFAULT">{s.segment}</span>
                      <span className="font-mono text-[11px] text-ink-400">{s.count.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink-50 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: s.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, delay: 0.55 + i * 0.05, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Top Targets Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white rounded-xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
            <div>
              <h3 className="text-sm font-semibold text-ink-DEFAULT">Top Commission Targets</h3>
              <p className="text-[12px] text-ink-300 mt-0.5">Consultants & Advisors · Priority outreach list</p>
            </div>
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: '#EFF6FF', color: '#2563EB' }}
            >
              Priority
            </span>
          </div>

          {/* Table */}
          <table>
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                {['#', 'Name', 'Role / Headline', 'Region', 'Connected', ''].map(h => (
                  <th
                    key={h}
                    className="text-left px-6 py-2.5 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: '#94A3B8', letterSpacing: '0.07em', borderBottom: '1px solid #E2E8F0' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {targets.map((c, i) => {
                const color = SEGMENT_COLORS[c.segment as Segment]
                const bg    = SEGMENT_BG[c.segment as Segment]
                return (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-6 py-3 font-mono text-[11px] text-ink-300 w-10">
                      {String(i + 1).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-3 w-52">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={c.name} color={color} bg={bg} size={30} />
                        <span className="text-[13px] font-semibold text-ink-DEFAULT whitespace-nowrap">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 max-w-xs">
                      <p className="text-[12px] text-ink-400 truncate">{c.headline}</p>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-mono text-[11px] text-ink-400">{c.region}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-mono text-[11px] text-ink-300">{c.connectedDate}</span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <a
                        href={c.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[12px] font-medium text-brand hover:text-brand-dk transition-colors"
                      >
                        View <ExternalLink size={11} />
                      </a>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}
