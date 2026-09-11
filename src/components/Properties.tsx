import { useEffect, useState } from "react"
import { useStore } from "../lib/store"
import type { CaseStatus, PropertyCase } from "../types"
import { Badge, SectionCard } from "./ui"
import { PropertyModal } from "./PropertyModal"
import { RED_FLAGS } from "../lib/helpers"

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

export function Properties({
  initialSelectedId,
  onSelect,
}: {
  initialSelectedId: string | null
  onSelect: (id: string | null) => void
}) {
  const { state, deleteProperty, toggleChecklistItem } = useStore()
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId)
  const [editing, setEditing] = useState<PropertyCase | null>(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (initialSelectedId) setSelectedId(initialSelectedId)
  }, [initialSelectedId])

  useEffect(() => {
    if (!selectedId && state.properties.length > 0) setSelectedId(state.properties[0].id)
  }, [selectedId, state.properties])

  function select(id: string) {
    setSelectedId(id)
    onSelect(id)
  }

  const selected = state.properties.find((p) => p.id === selectedId) ?? null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-clay-600">My Properties</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-forest-800">Every plot, in one place.</h1>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="rounded-md bg-forest-700 px-4 py-2 text-sm font-medium text-cream hover:bg-forest-600"
        >
          + Add property
        </button>
      </div>

      {state.properties.length === 0 ? (
        <SectionCard>
          <p className="text-sm text-ink-soft">No properties yet. Add the first plot you're considering.</p>
        </SectionCard>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="space-y-2">
            {state.properties.map((p) => {
              const done = p.checklist.filter((c) => c.done).length
              const active = p.id === selectedId
              return (
                <button
                  key={p.id}
                  onClick={() => select(p.id)}
                  className={`w-full rounded-lg border p-3 text-left transition ${
                    active ? "border-forest-600 bg-forest-100/60" : "border-parchment bg-white/60 hover:border-forest-600"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-sm font-semibold text-forest-800">{p.nickname}</p>
                    <Badge tone={STATUS_TONE[p.status]}>{STATUS_LABEL[p.status]}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">
                    {p.town}, {p.region}
                  </p>
                  <p className="mt-1 text-[11px] text-ink-soft">
                    {done}/{p.checklist.length} checks done
                  </p>
                </button>
              )
            })}
          </div>

          <div>
            {selected && (
              <PropertyDetail
                property={selected}
                onEdit={() => setEditing(selected)}
                onDelete={() => {
                  if (window.confirm("Delete this property?")) {
                    deleteProperty(selected.id)
                    setSelectedId(null)
                  }
                }}
                onToggleChecklist={(itemId) => toggleChecklistItem(selected.id, itemId)}
              />
            )}
          </div>
        </div>
      )}

      {creating && <PropertyModal onClose={() => setCreating(false)} />}
      {editing && <PropertyModal property={editing} onClose={() => setEditing(null)} />}
    </div>
  )
}

function PropertyDetail({
  property,
  onEdit,
  onDelete,
  onToggleChecklist,
}: {
  property: PropertyCase
  onEdit: () => void
  onDelete: () => void
  onToggleChecklist: (itemId: string) => void
}) {
  const done = property.checklist.filter((c) => c.done).length
  const pct = property.checklist.length ? Math.round((done / property.checklist.length) * 100) : 0

  return (
    <div className="space-y-5">
      <SectionCard>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold text-forest-800">{property.nickname}</h2>
            <p className="mt-1 text-sm text-ink-soft">
              {property.town}, {property.region} · {property.landType}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={onEdit} className="rounded-md border border-parchment px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-parchment">
              Edit
            </button>
            <button onClick={onDelete} className="rounded-md border border-brick-100 px-3 py-1.5 text-xs font-medium text-brick-700 hover:bg-brick-100">
              Delete
            </button>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
          <Fact label="Seller" value={property.sellerName || "—"} />
          <Fact label="Contact" value={property.sellerContact || "—"} />
          <Fact label="Asking price" value={property.askingPriceGHS != null ? `GHS ${property.askingPriceGHS.toLocaleString()}` : "—"} />
          <Fact label="Size" value={property.sizePlots || "—"} />
          <Fact label="GhanaPostGPS" value={property.ghanaPostGPS || "Not recorded"} />
        </dl>
        {property.notes && <p className="mt-4 border-t border-parchment pt-3 text-sm text-ink-soft">{property.notes}</p>}
      </SectionCard>

      <SectionCard eyebrow={`${pct}% complete`} title="Due diligence checklist">
        <ul className="space-y-2">
          {property.checklist.map((item) => (
            <li key={item.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-md p-1.5 text-sm hover:bg-forest-100/50">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => onToggleChecklist(item.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-forest-700"
                />
                <span className={item.done ? "text-ink-soft line-through" : "text-ink"}>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard eyebrow="Watch for" title="Red flags">
        <ul className="space-y-2 text-sm text-ink-soft">
          {RED_FLAGS.map((flag) => (
            <li key={flag} className="flex gap-2">
              <span className="text-clay-600">⚑</span>
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-ink-soft/70">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  )
}
