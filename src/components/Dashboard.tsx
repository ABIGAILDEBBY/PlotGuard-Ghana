import type { View } from "../App"
import { useStore } from "../lib/store"
import { Badge, SectionCard } from "./ui"
import { CONCERN_TYPES } from "../types"
import type { CaseStatus } from "../types"

const STATUS_TONE: Record<CaseStatus, "forest" | "gold" | "clay" | "brick" | "default"> = {
  researching: "clay",
  verifying: "gold",
  "in-progress": "gold",
  purchased: "forest",
  abandoned: "brick",
}

const STATUS_LABEL: Record<CaseStatus, string> = {
  researching: "Researching",
  verifying: "Verifying",
  "in-progress": "In progress",
  purchased: "Purchased",
  abandoned: "Walked away",
}

function concernLabel(key: string) {
  return CONCERN_TYPES.find((c) => c.key === key)?.label ?? key
}

export function Dashboard({ onNavigate }: { onNavigate: (v: View, propertyId?: string) => void }) {
  const { state } = useStore()
  const active = state.properties.filter((p) => p.status !== "purchased" && p.status !== "abandoned")
  const myRegions = new Set(state.properties.map((p) => p.region))
  const relevantAlerts = myRegions.size > 0 ? state.alerts.filter((a) => myRegions.has(a.region)) : state.alerts
  const alertPool = relevantAlerts.length > 0 ? relevantAlerts : state.alerts
  const recentAlerts = [...alertPool]
    .sort((a, b) => (a.reportedAt < b.reportedAt ? 1 : a.reportedAt > b.reportedAt ? -1 : 0))
    .slice(0, 4)

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-clay-600">Dashboard</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-forest-800">Know before you pay.</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Track every plot you're considering, work through a Ghana-specific due-diligence checklist, and see what
          other buyers have flagged nearby — before any money changes hands.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:max-w-md">
        <MiniStat label="Active cases" value={active.length} />
        <MiniStat label="Purchased" value={state.properties.filter((p) => p.status === "purchased").length} />
        <MiniStat label="Community alerts" value={state.alerts.length} />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-forest-800">Your properties</h2>
          <button onClick={() => onNavigate("properties")} className="text-sm font-medium text-clay-700 hover:text-clay-600">
            View all →
          </button>
        </div>
        {state.properties.length === 0 ? (
          <SectionCard>
            <p className="text-sm text-ink-soft">No properties yet. Add the first plot you're considering.</p>
          </SectionCard>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.properties.slice(0, 6).map((p) => {
              const done = p.checklist.filter((c) => c.done).length
              const pct = p.checklist.length ? Math.round((done / p.checklist.length) * 100) : 0
              return (
                <button
                  key={p.id}
                  onClick={() => onNavigate("properties", p.id)}
                  className="rounded-xl border border-parchment bg-white/60 p-4 text-left shadow-sm transition hover:border-forest-600"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display font-semibold text-forest-800">{p.nickname}</p>
                    <Badge tone={STATUS_TONE[p.status]}>{STATUS_LABEL[p.status]}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    {p.town}, {p.region} · {p.landType}
                  </p>
                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-ink-soft">
                      <span>Due diligence</span>
                      <span className="tabular-nums">
                        {done}/{p.checklist.length}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-parchment">
                      <div className="h-full rounded-full bg-forest-600" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-forest-800">Recent community alerts</h2>
          <button onClick={() => onNavigate("alerts")} className="text-sm font-medium text-clay-700 hover:text-clay-600">
            View all →
          </button>
        </div>
        <SectionCard>
          <div className="space-y-3">
            {recentAlerts.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-3 border-b border-parchment pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-ink">{a.sellerDescription}</p>
                  <p className="text-xs text-ink-soft">
                    {a.town}, {a.region} · {concernLabel(a.concernType)}
                  </p>
                </div>
                <Badge tone="brick">{a.corroborations} confirms</Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-parchment bg-white/60 px-3 py-2">
      <div className="font-display text-xl font-semibold text-forest-800 tabular-nums">{value}</div>
      <div className="text-[11px] text-ink-soft">{label}</div>
    </div>
  )
}
