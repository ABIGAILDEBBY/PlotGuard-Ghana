import { useState } from 'react'
import type { FormEvent } from 'react'
import { useStore } from '../lib/store'
import type { GearCategory } from '../types'
import { GEAR_CATEGORIES } from '../types'
import { Badge, Modal, inputClass, labelClass } from './ui'

export function Gear() {
  const { state, addGear, deleteGear } = useStore()
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gear & Assets</h1>
          <p className="mt-1 text-sm text-slate-400">What you use, and what you've already covered on camera.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
        >
          + Add item
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {state.gear.map((g) => (
          <div key={g.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-slate-100">{g.name}</p>
              {g.featured && <Badge tone="violet">Featured</Badge>}
            </div>
            <p className="mt-1 text-xs text-slate-500">{g.category}</p>
            {g.notes && <p className="mt-2 text-xs text-slate-400">{g.notes}</p>}
            <p className="mt-2 text-xs text-slate-500">
              Used in {g.usedInVideoIds.length} video{g.usedInVideoIds.length === 1 ? '' : 's'}
            </p>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  if (window.confirm('Remove this item?')) deleteGear(g.id)
                }}
                className="text-xs text-slate-500 hover:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && <NewGearModal onClose={() => setOpen(false)} onSubmit={addGear} />}
    </div>
  )
}

function NewGearModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (g: {
    name: string
    category: GearCategory
    usedInVideoIds: string[]
    affiliateLink: string
    notes: string
    featured: boolean
  }) => void
}) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<GearCategory>('Hardware')
  const [affiliateLink, setAffiliateLink] = useState('')
  const [notes, setNotes] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({ name: name.trim(), category, usedInVideoIds: [], affiliateLink, notes, featured: false })
    onClose()
  }

  return (
    <Modal title="Add gear or asset" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="gear-name">Name</label>
          <input id="gear-name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
        </div>
        <div>
          <label className={labelClass} htmlFor="gear-category">Category</label>
          <select id="gear-category" className={inputClass} value={category} onChange={(e) => setCategory(e.target.value as GearCategory)}>
            {GEAR_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="gear-affiliate-link">Affiliate link (optional)</label>
          <input id="gear-affiliate-link" className={inputClass} value={affiliateLink} onChange={(e) => setAffiliateLink(e.target.value)} />
        </div>
        <div>
          <label className={labelClass} htmlFor="gear-notes">Notes</label>
          <textarea id="gear-notes" className={inputClass} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-2 text-sm text-slate-400 hover:text-white">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400">
            Add item
          </button>
        </div>
      </form>
    </Modal>
  )
}
