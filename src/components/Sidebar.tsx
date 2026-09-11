import { useRef, useState } from "react"
import type { ChangeEvent } from "react"
import type { View } from "../App"
import { useStore } from "../lib/store"

const NAV: { key: View; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "properties", label: "My Properties" },
  { key: "alerts", label: "Community Alerts" },
  { key: "resources", label: "Resources & Glossary" },
]

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0">
        <rect width="32" height="32" rx="7" fill="var(--color-forest-700)" />
        <path d="M16 6l8 3v6c0 6-3.6 10-8 11-4.4-1-8-5-8-11V9l8-3z" fill="var(--color-cream)" />
        <path
          d="M12.4 16.3l2.5 2.5 4.7-5.3"
          stroke="var(--color-clay-600)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div>
        <div className="font-display text-base font-semibold leading-tight text-forest-800">PlotGuard</div>
        <div className="text-xs leading-tight text-ink-soft">Ghana land due diligence</div>
      </div>
    </div>
  )
}

export function Sidebar({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  const { state, replaceState } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  function navigate(v: View) {
    onNavigate(v)
    setMobileOpen(false)
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `plotguard-ghana-${new Date().toISOString().slice(0, 10)}.json`
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
        if (parsed && Array.isArray(parsed.properties) && Array.isArray(parsed.alerts)) {
          replaceState({ corroboratedIds: [], ...parsed })
        } else {
          window.alert("That file does not look like a PlotGuard export.")
        }
      } catch {
        window.alert("Could not read that file as JSON.")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-parchment bg-cream-dim px-4 py-3 lg:hidden">
        <BrandMark />
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-2 text-forest-800 hover:bg-forest-100"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 -translate-x-full flex-col border-r border-parchment bg-cream-dim px-4 py-6 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <BrandMark />
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="rounded-md p-1 text-ink-soft hover:text-ink lg:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map((item) => {
            const active = view === item.key
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                  active ? "bg-forest-700 text-cream" : "text-ink-soft hover:bg-forest-100 hover:text-forest-800"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="space-y-1 border-t border-parchment pt-4">
          <button
            onClick={handleExport}
            className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-ink-soft hover:bg-forest-100 hover:text-forest-800"
          >
            Export data (.json)
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-ink-soft hover:bg-forest-100 hover:text-forest-800"
          >
            Import data (.json)
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
          <p className="px-3 pt-2 text-[11px] leading-snug text-ink-soft/70">
            Stored only in this browser. This tool helps you self-check — it does not replace a lawyer or licensed surveyor.
          </p>
        </div>
      </aside>
    </>
  )
}
