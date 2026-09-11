import { useMemo, useState } from "react"
import type { FormEvent } from "react"
import { useStore } from "../lib/store"
import { CONCERN_TYPES, GHANA_REGIONS } from "../types"
import type { ConcernType } from "../types"
import { Badge, Modal, SectionCard, inputClass, labelClass } from "./ui"

function concernLabel(key: ConcernType) {
  return CONCERN_TYPES.find((c) => c.key === key)?.label ?? key
}

export function CommunityAlerts() {
  const { state, corroborateAlert } = useStore()
  const [regionFilter, setRegionFilter] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const list = regionFilter ? state.alerts.filter((a) => a.region === regionFilter) : state.alerts
    return [...list].sort((a, b) => (a.reportedAt < b.reportedAt ? 1 : -1))
  }, [state.alerts, regionFilter])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-clay-600">Community Alerts</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-forest-800">See what other buyers found.</h1>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-forest-700 px-4 py-2 text-sm font-medium text-cream hover:bg-forest-600"
        >
          + Report a concern
        </button>
      </div>

      <div className="rounded-lg border border-gold-600/40 bg-gold-100/60 p-4 text-sm text-ink">
        <strong className="font-display font-semibold text-forest-800">These are unverified reports, not legal findings.</strong>{" "}
        Anyone can submit one. Use them as a reason to dig deeper, not as proof of fraud — always complete your own
        checklist and independent verification before deciding.
      </div>

      <div className="flex items-center gap-2">
        <label className={labelClass} htmlFor="alert-region-filter">
          Filter by region
        </label>
        <select
          id="alert-region-filter"
          className={`${inputClass} max-w-xs`}
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="">All regions</option>
          {GHANA_REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <SectionCard>
          <p className="text-sm text-ink-soft">No alerts for this region yet.</p>
        </SectionCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <SectionCard key={a.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display font-semibold text-forest-800">{a.sellerDescription}</p>
                    <Badge tone="clay">{concernLabel(a.concernType)}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    {a.town}, {a.region} · reported {a.reportedAt}
                  </p>
                  <p className="mt-2 text-sm text-ink">{a.description}</p>
                </div>
                <button
                  onClick={() => corroborateAlert(a.id)}
                  className="shrink-0 rounded-md border border-parchment px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-forest-600 hover:text-forest-700"
                >
                  I've seen this too ({a.corroborations})
                </button>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {open && <ReportModal onClose={() => setOpen(false)} />}
    </div>
  )
}

function ReportModal({ onClose }: { onClose: () => void }) {
  const { addAlert } = useStore()
  const [region, setRegion] = useState(GHANA_REGIONS[0])
  const [town, setTown] = useState("")
  const [sellerDescription, setSellerDescription] = useState("")
  const [concernType, setConcernType] = useState<ConcernType>("multiple-sale")
  const [description, setDescription] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!town.trim() || !sellerDescription.trim() || !description.trim()) return
    addAlert({ region, town: town.trim(), sellerDescription: sellerDescription.trim(), concernType, description: description.trim() })
    onClose()
  }

  return (
    <Modal title="Report a concern" onClose={onClose}>
      <p className="mb-4 text-xs text-ink-soft">
        Describe what you observed factually. Avoid naming private individuals directly — describe the seller by
        role or nickname (e.g. "agent going by Kofi") so this stays a useful, fair warning rather than an accusation.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="alert-region">
              Region
            </label>
            <select id="alert-region" className={inputClass} value={region} onChange={(e) => setRegion(e.target.value)}>
              {GHANA_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="alert-town">
              Town / area
            </label>
            <input id="alert-town" className={inputClass} value={town} onChange={(e) => setTown(e.target.value)} required />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="alert-seller-desc">
            Seller description (role or nickname, not private details)
          </label>
          <input
            id="alert-seller-desc"
            className={inputClass}
            value={sellerDescription}
            onChange={(e) => setSellerDescription(e.target.value)}
            placeholder='e.g. "Agent going by Kofi, plots near the junction"'
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="alert-concern-type">
            Type of concern
          </label>
          <select
            id="alert-concern-type"
            className={inputClass}
            value={concernType}
            onChange={(e) => setConcernType(e.target.value as ConcernType)}
          >
            {CONCERN_TYPES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="alert-description">
            What happened
          </label>
          <textarea
            id="alert-description"
            className={inputClass}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-2 text-sm text-ink-soft hover:text-ink">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-forest-700 px-4 py-2 text-sm font-medium text-cream hover:bg-forest-600">
            Submit report
          </button>
        </div>
      </form>
    </Modal>
  )
}
