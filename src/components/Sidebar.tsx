import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { BarChart3, Users, FolderOpen, Zap } from 'lucide-react'

const NAV = [
  { to: '/',            label: 'Dashboard',   icon: BarChart3,  end: true  },
  { to: '/connections', label: 'Connections', icon: Users,      end: false },
  { to: '/groups',      label: 'Groups',      icon: FolderOpen, end: false },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 h-screen w-60 flex flex-col z-40"
      style={{ background: '#0F172A', borderRight: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Brand */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#0D9488' }}
          >
            <Zap size={15} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight" style={{ letterSpacing: '-0.01em' }}>
              ConciergeAI
            </p>
            <p className="text-[10px] text-white/35 mt-0.5">Connections Intel</p>
          </div>
        </div>
      </div>

      <div className="mx-5 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest px-2 mb-2" style={{ letterSpacing: '0.1em' }}>
          Menu
        </p>
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.12 }}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-md mb-0.5 cursor-pointer"
                style={{
                  background: isActive ? 'rgba(13,148,136,0.14)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(13,148,136,0.28)' : 'transparent'}`,
                  transition: 'background 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  color={isActive ? '#0D9488' : 'rgba(255,255,255,0.4)'}
                />
                <span
                  className="text-[13px]"
                  style={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#F8FAFC' : 'rgba(255,255,255,0.5)',
                    transition: 'color 0.15s',
                  }}
                >
                  {label}
                </span>
                {isActive && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: '#0D9488' }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="font-mono text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
          2,043
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.16)' }}>
          connections tracked
        </p>
      </div>
    </motion.aside>
  )
}
