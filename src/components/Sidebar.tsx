import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import type { View } from '../App'
import { useStore } from '../lib/store'

const NAV: { group: string; items: { key: View; label: string }[] }[] = [
  { group: '', items: [{ key: 'dashboard', label: 'Dashboard' }] },
  {
    group: 'Create',
    items: [
      { key: 'ideas', label: 'Ideas' },
      { key: 'pipeline', label: 'Pipeline' },
      { key: 'calendar', label: 'Calendar' },
    ],
  },
  {
    group: 'Business',
    items: [
      { key: 'sponsorships', label: 'Sponsorships' },
      { key: 'gear', label: 'Gear & Assets' },
    ],
  },
]

export function Sidebar({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  const { state, replaceState } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleExport() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `techartgenius-studio-hub-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (parsed && parsed.videos && parsed.ideas && parsed.sponsorships && parsed.gear) {
          replaceState(parsed)
        } else {
          window.alert('That file does not look like a Studio Hub export.')
        }
      } catch {
        window.alert('Could not read that file as JSON.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-slate-900/60 px-4 py-6">
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-slate-950">
            TG
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight text-white">TechArtGenius</div>
            <div className="text-xs leading-tight text-slate-400">Studio Hub</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-6">
        {NAV.map((section) => (
          <div key={section.group || 'root'}>
            {section.group && (
              <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {section.group}
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = view === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => onNavigate(item.key)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                      active ? 'bg-violet-500/15 text-violet-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 pt-4">
        <button
          onClick={handleExport}
          className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white"
        >
          Export data (.json)
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white"
        >
          Import data (.json)
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImportFile}
        />
        <p className="px-3 pt-2 text-[11px] leading-snug text-slate-600">
          Everything is stored locally in this browser. Export regularly as a backup.
        </p>
      </div>
    </aside>
  )
}
