import { useState } from 'react'
import { Search } from 'lucide-react'

interface TopBarProps {
  title: string
  subtitle?: string
  onSearch?: (q: string) => void
  searchValue?: string
  actions?: React.ReactNode
}

export default function TopBar({ title, subtitle, onSearch, searchValue, actions }: TopBarProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className="flex items-center gap-4 px-7 sticky top-0 z-30"
      style={{
        height: 56,
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-[13px] text-ink-300">ConciergeAI</span>
        <span className="text-ink-200 text-sm">/</span>
        <span className="text-[13px] font-semibold text-ink-DEFAULT truncate">{title}</span>
        {subtitle && (
          <span className="text-[12px] text-ink-300 ml-1 hidden sm:inline">· {subtitle}</span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 ml-auto">
        {actions}

        {onSearch !== undefined && (
          <div className="relative" style={{ width: focused ? 240 : 210, transition: 'width 0.2s ease' }}>
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: focused ? '#0D9488' : '#94A3B8' }}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={e => onSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{ paddingLeft: 32, paddingRight: 12, paddingTop: 6, paddingBottom: 6 }}
            />
          </div>
        )}

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold flex-shrink-0"
          style={{
            background: '#F0FDFA',
            border: '1.5px solid #0D9488',
            color: '#0D9488',
          }}
        >
          CA
        </div>
      </div>
    </div>
  )
}
