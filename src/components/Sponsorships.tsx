import { useState } from 'react'
import type { FormEvent } from 'react'
import { useStore } from '../lib/store'
import type { PaymentStatus } from '../types'
import { Badge, Modal, inputClass, labelClass } from './ui'

const STATUS_TONE: Record<PaymentStatus, 'amber' | 'violet' | 'green'> = {
  pending: 'amber',
  invoiced: 'violet',
  paid: 'green',
}

export function Sponsorships() {
  const { state, updateSponsorship, deleteSponsorship } = useStore()
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Sponsorships</h1>
          <p className="mt-1 text-sm text-slate-400">Deals, deliverables, and who still owes you money.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
        >
          + New deal
        </button>
      </div>

      <div className="space-y-3">
        {state.sponsorships.length === 0 && <p className="text-sm text-slate-500">No sponsorships tracked yet.</p>}
        {state.sponsorships.map((s) => {
          const video = state.videos.find((v) => v.id === s.videoId)
          return (
            <div key={s.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-slate-100">{s.sponsor}</p>
                    <Badge tone={STATUS_TONE[s.paymentStatus]}>{s.paymentStatus}</Badge>
                    {s.disclosureRequired && <Badge tone="red">#ad required</Badge>}
                  </div>
                  {video && <p className="mt-1 text-xs text-slate-500">Linked to: {video.title}</p>}
                  {s.deliverables.length > 0 && (
                    <ul className="mt-2 list-inside list-disc text-xs text-slate-400">
                      {s.deliverables.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  )}
                  {s.notes && <p className="mt-2 text-xs text-slate-500">{s.notes}</p>}
                </div>
                <div className="text-right text-xs text-slate-500">
                  {s.amount != null && <div className="text-sm font-semibold text-slate-200">${s.amount.toLocaleString()}</div>}
                  {s.deadline && <div>Due {s.deadline}</div>}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                <select
                  value={s.paymentStatus}
                  onChange={(e) => updateSponsorship(s.id, { paymentStatus: e.target.value as PaymentStatus })}
                  className="rounded border border-white/10 bg-slate-950 px-2 py-1 text-xs text-slate-300"
                >
                  <option value="pending">Pending</option>
                  <option value="invoiced">Invoiced</option>
                  <option value="paid">Paid</option>
                </select>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this sponsorship?')) deleteSponsorship(s.id)
                  }}
                  className="text-xs text-slate-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {open && <NewSponsorshipModal onClose={() => setOpen(false)} />}
    </div>
  )
}

function NewSponsorshipModal({ onClose }: { onClose: () => void }) {
  const { state, addSponsorship } = useStore()
  const [sponsor, setSponsor] = useState('')
  const [videoId, setVideoId] = useState('')
  const [deliverables, setDeliverables] = useState('')
  const [deadline, setDeadline] = useState('')
  const [amount, setAmount] = useState('')
  const [disclosureRequired, setDisclosureRequired] = useState(true)
  const [notes, setNotes] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!sponsor.trim()) return
    addSponsorship({
      sponsor: sponsor.trim(),
      videoId: videoId || null,
      deliverables: deliverables
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean),
      deadline: deadline || null,
      amount: amount ? Number(amount) : null,
      paymentStatus: 'pending',
      disclosureRequired,
      notes,
    })
    onClose()
  }

  return (
    <Modal title="New sponsorship" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="sponsor-name">Sponsor name</label>
          <input id="sponsor-name" className={inputClass} value={sponsor} onChange={(e) => setSponsor(e.target.value)} autoFocus required />
        </div>
        <div>
          <label className={labelClass} htmlFor="sponsor-video">Linked video (optional)</label>
          <select id="sponsor-video" className={inputClass} value={videoId} onChange={(e) => setVideoId(e.target.value)}>
            <option value="">None yet</option>
            {state.videos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="sponsor-deliverables">Deliverables (comma separated)</label>
          <input
            id="sponsor-deliverables"
            className={inputClass}
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            placeholder="60s segment, pinned comment"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="sponsor-deadline">Deadline</label>
            <input id="sponsor-deadline" type="date" className={inputClass} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="sponsor-amount">Amount ($)</label>
            <input id="sponsor-amount" type="number" min="0" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={disclosureRequired} onChange={(e) => setDisclosureRequired(e.target.checked)} />
          Requires #ad disclosure
        </label>
        <div>
          <label className={labelClass} htmlFor="sponsor-notes">Notes</label>
          <textarea id="sponsor-notes" className={inputClass} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-2 text-sm text-slate-400 hover:text-white">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400">
            Add sponsorship
          </button>
        </div>
      </form>
    </Modal>
  )
}
