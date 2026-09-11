import { useMemo, useState } from 'react'
import { useStore } from '../lib/store'
import type { Video } from '../types'

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}
function toKey(d: Date) {
  return d.toISOString().slice(0, 10)
}
function daysBetween(a: Date, b: Date): number {
  return Math.abs((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

function buildMonthGrid(monthStart: Date): (Date | null)[][] {
  const year = monthStart.getFullYear()
  const month = monthStart.getMonth()
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startWeekday = firstDay.getDay()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (Date | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

export function Calendar() {
  const { state } = useStore()
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()))

  const videosByDate = useMemo(() => {
    const map = new Map<string, Video[]>()
    for (const v of state.videos) {
      if (!v.publishDate) continue
      const list = map.get(v.publishDate) ?? []
      list.push(v)
      map.set(v.publishDate, list)
    }
    return map
  }, [state.videos])

  const weeks = useMemo(() => buildMonthGrid(cursor), [cursor])

  const last30 = state.videos.filter(
    (v) => v.stage === 'published' && v.publishDate && daysBetween(new Date(v.publishDate), new Date()) <= 30,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Calendar</h1>
          <p className="mt-1 text-sm text-slate-400">Keep the upload schedule honest.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCursor(addMonths(cursor, -1))}
            className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5"
          >
            ←
          </button>
          <span className="min-w-[140px] text-center text-sm font-medium text-white">
            {cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => setCursor(addMonths(cursor, 1))}
            className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5"
          >
            →
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weeks.flat().map((day, i) => {
            const key = day ? toKey(day) : `blank-${i}`
            const items = day ? (videosByDate.get(toKey(day)) ?? []) : []
            const isToday = day !== null && toKey(day) === toKey(new Date())
            return (
              <div
                key={key}
                className={`min-h-[84px] rounded-lg border p-1.5 text-left ${
                  day ? 'border-white/5 bg-slate-950/40' : 'border-transparent'
                } ${isToday ? 'ring-1 ring-violet-500/60' : ''}`}
              >
                {day && <div className="text-[11px] text-slate-500">{day.getDate()}</div>}
                <div className="mt-1 space-y-1">
                  {items.slice(0, 2).map((v) => (
                    <div
                      key={v.id}
                      className={`truncate rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        v.stage === 'published' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-violet-500/15 text-violet-300'
                      }`}
                      title={v.title}
                    >
                      {v.title}
                    </div>
                  ))}
                  {items.length > 2 && <div className="text-[10px] text-slate-500">+{items.length - 2} more</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
        <h2 className="mb-1 text-sm font-semibold text-white">Cadence</h2>
        <p className="text-sm text-slate-400">
          {last30.length} video{last30.length === 1 ? '' : 's'} published in the last 30 days.
        </p>
      </div>
    </div>
  )
}
