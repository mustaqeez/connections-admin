// Shared helpers used across table-based pages
export { SEGMENT_COLORS, SEGMENT_BG } from '../data/connections'

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase() ?? '')
    .join('')
}

interface AvatarProps {
  name: string
  color: string
  bg: string
  size?: number
}

export function Avatar({ name, color, bg, size = 30 }: AvatarProps) {
  const init = getInitials(name)
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        border: `1.5px solid ${color}40`,
        color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: size * 0.32,
        fontWeight: 600,
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
    >
      {init}
    </div>
  )
}
