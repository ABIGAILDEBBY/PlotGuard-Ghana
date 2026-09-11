import type { ReactNode } from 'react'
import type { View } from '../App'
import { useStore } from '../lib/store'
import { STAGES } from '../types'

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function Dashboard({ onNavigate }: { onNavigate: (v: View) => void }) {
  const { state } = useStore()
  const { videos, ideas, sponsorships } = state

  const inProgress = videos.filter((v) => v.stage !== 'published')
  const published = videos.filter((v) => v.stage === 'published')
  const totalViews = published.reduce((sum, v) => sum + (v.stats?.views ?? 0), 0)

  const upcoming = [...videos]
    .filter((v) => v.publishDate && v.stage !== 'published')
    .sort((a, b) => (a.publishDate! < b.publishDate! ? -1 : 1))
    .slice(0, 5)

  const openDeliverables = sponsorships.filter((s) => s.paymentStatus !== 'paid')

  const stageCounts = STAGES.filter((s) => s.key !== 'published').map((s) => ({
    ...s,
    count: videos.filter((v) => v.stage === s.key).length,
  }))

  const topPerformers = [...published].sort((a, b) => (b.stats?.views ?? 0) - (a.stats?.views ?? 0)).slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Everything going on with the channel, at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="In progress" value={inProgress.length} onClick={() => onNavigate('pipeline')} />
        <StatCard label="Ideas waiting" value={ideas.length} onClick={() => onNavigate('ideas')} />
        <StatCard label="Published" value={published.length} onClick={() => onNavigate('calendar')} />
        <StatCard label="Total views" value={totalViews.toLocaleString()} onClick={() => onNavigate('calendar')} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Pipeline by stage" onSeeAll={() => onNavigate('pipeline')}>
          <div className="space-y-2">
            {stageCounts.map((s) => (
              <div key={s.key} className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{s.label}</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-300">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Coming up" onSeeAll={() => onNavigate('calendar')}>
          {upcoming.length === 0 ? (
            <EmptyNote text="Nothing scheduled yet." />
          ) : (
            <div className="space-y-3">
              {upcoming.map((v) => (
                <div key={v.id} className="flex items-center justify-between text-sm">
                  <span className="truncate pr-3 text-slate-200">{v.title}</span>
                  <span className="shrink-0 text-xs text-slate-500">{formatDate(v.publishDate)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Sponsorship deliverables" onSeeAll={() => onNavigate('sponsorships')}>
          {openDeliverables.length === 0 ? (
            <EmptyNote text="No open sponsorships." />
          ) : (
            <div className="space-y-3">
              {openDeliverables.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <div className="pr-3">
                    <div className="text-slate-200">{s.sponsor}</div>
                    <div className="text-xs text-slate-500">{s.paymentStatus}</div>
                  </div>
                  <span className="shrink-0 text-xs text-slate-500">{formatDate(s.deadline)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card title="Top performers" onSeeAll={() => onNavigate('calendar')}>
          {topPerformers.length === 0 ? (
            <EmptyNote text="Nothing published yet." />
          ) : (
            <div className="space-y-3">
              {topPerformers.map((v) => (
                <div key={v.id} className="flex items-center justify-between text-sm">
                  <span className="truncate pr-3 text-slate-200">{v.title}</span>
                  <span className="shrink-0 text-xs text-slate-500">
                    {(v.stats?.views ?? 0).toLocaleString()} views
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

function StatCard({ label, value, onClick }: { label: string; value: string | number; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border border-white/10 bg-slate-900/60 p-4 text-left transition hover:border-violet-500/40"
    >
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-400">{label}</div>
    </button>
  )
}

function Card({ title, onSeeAll, children }: { title: string; onSeeAll?: () => void; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {onSeeAll && (
          <button onClick={onSeeAll} className="text-xs font-medium text-violet-400 hover:text-violet-300">
            View all
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function EmptyNote({ text }: { text: string }) {
  return <p className="text-sm text-slate-500">{text}</p>
}
