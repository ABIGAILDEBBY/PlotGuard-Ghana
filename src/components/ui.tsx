import { useEffect, useId, useRef } from "react"
import type { ReactNode } from "react"

export const inputClass =
  "w-full rounded-md border border-parchment bg-cream px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest-600 focus:outline-none focus:ring-1 focus:ring-forest-600"

export const labelClass = "mb-1 block text-xs font-medium text-ink-soft"

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const firstField = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    ;(firstField ?? panel)?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key === "Tab" && panel) {
        const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      previouslyFocused?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-parchment bg-cream p-6 shadow-xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id={titleId} className="font-display text-lg font-semibold text-forest-800">
            {title}
          </h2>
          <button onClick={onClose} className="text-ink-soft hover:text-ink" aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

type Tone = "default" | "forest" | "clay" | "gold" | "brick"

const TONE_CLASSES: Record<Tone, string> = {
  default: "bg-parchment text-ink-soft",
  forest: "bg-forest-100 text-forest-800",
  clay: "bg-clay-100 text-clay-700",
  gold: "bg-gold-100 text-gold-700",
  brick: "bg-brick-100 text-brick-700",
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}>{children}</span>
}

export function SectionCard({ title, eyebrow, children }: { title?: string; eyebrow?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-parchment bg-white/60 p-5 shadow-sm">
      {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-clay-600">{eyebrow}</p>}
      {title && <h2 className="mb-4 font-display text-lg font-semibold text-forest-800">{title}</h2>}
      {children}
    </div>
  )
}
