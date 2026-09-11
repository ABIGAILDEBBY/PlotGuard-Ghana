import { useState } from 'react'
import type { FormEvent } from 'react'
import { useStore } from '../lib/store'
import type { Priority } from '../types'
import { Badge, Modal, inputClass, labelClass } from './ui'

const PRIORITY_TONE: Record<Priority, 'default' | 'amber' | 'red'> = {
  low: 'default',
  medium: 'amber',
  high: 'red',
}

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 }

export function Ideas() {
  const { state, addIdea, deleteIdea, promoteIdea } = useStore()
  const [open, setOpen] = useState(false)

  const sorted = [...state.ideas].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Ideas</h1>
          <p className="mt-1 text-sm text-slate-400">Capture it now, script it later.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
        >
          + New idea
        </button>
      </div>

      {sorted.length === 0 ? (
        <p className="text-sm text-slate-500">No ideas yet — add the next video you're thinking about.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((idea) => (
            <div key={idea.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">{idea.title}</p>
                <Badge tone={PRIORITY_TONE[idea.priority]}>{idea.priority}</Badge>
              </div>
              {idea.notes && <p className="mt-2 text-xs text-slate-400">{idea.notes}</p>}
              {idea.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {idea.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => promoteIdea(idea.id)} className="text-xs font-medium text-violet-400 hover:text-violet-300">
                  Move to pipeline →
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this idea?')) deleteIdea(idea.id)
                  }}
                  className="text-xs text-slate-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && <NewIdeaModal onClose={() => setOpen(false)} onSubmit={addIdea} />}
    </div>
  )
}

function NewIdeaModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (i: { title: string; notes: string; tags: string[]; priority: Priority }) => void
}) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [tags, setTags] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      title: title.trim(),
      notes,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      priority,
    })
    onClose()
  }

  return (
    <Modal title="New idea" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="idea-title">Title</label>
          <input id="idea-title" className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus required />
        </div>
        <div>
          <label className={labelClass} htmlFor="idea-notes">Notes</label>
          <textarea id="idea-notes" className={inputClass} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="idea-tags">Tags (comma separated)</label>
            <input id="idea-tags" className={inputClass} value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="idea-priority">Priority</label>
            <select id="idea-priority" className={inputClass} value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-2 text-sm text-slate-400 hover:text-white">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400">
            Add idea
          </button>
        </div>
      </form>
    </Modal>
  )
}
