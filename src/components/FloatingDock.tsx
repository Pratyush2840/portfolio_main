import { useState } from 'react';

export interface DockItem {
  title: string;
  icon: string; // SVG path data
  href: string;
  viewBox?: string;
}

const BASE_SIZE = 40;
const HOVER_SIZE = 52;
const NEIGHBOR_SIZE = 46;

export default function FloatingDock({ items }: { items: DockItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const getSize = (index: number) => {
    if (hoveredIndex === -1) return BASE_SIZE;
    const diff = Math.abs(index - hoveredIndex);
    if (diff === 0) return HOVER_SIZE;
    if (diff === 1) return NEIGHBOR_SIZE;
    return BASE_SIZE;
  };

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[16px] border border-white/8"
      style={{
        background: 'rgba(34, 34, 34, 0.85)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
      }}
      onMouseLeave={() => setHoveredIndex(-1)}
    >
      {items.map((item, i) => {
        const size = getSize(i);
        return (
          <a
            key={item.title}
            href={item.href}
            title={item.title}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(i)}
            className="dock-item"
            style={{ width: size, height: size }}
          >
            <svg viewBox={item.viewBox ?? '0 0 24 24'} fill="currentColor" className="dock-icon">
              <path d={item.icon} />
            </svg>
            <span className="dock-tooltip">{item.title}</span>
          </a>
        );
      })}
    </div>
  );
}
