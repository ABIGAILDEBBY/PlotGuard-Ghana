import { useState } from 'react'
import { useStore } from '../lib/store'
import { STAGES } from '../types'
import type { Video, Stage } from '../types'
import { Badge } from './ui'
import { VideoModal } from './VideoModal'

export function Pipeline() {
  const { state, updateVideo, deleteVideo } = useStore()
  const [editing, setEditing] = useState<Video | null>(null)
  const [creatingStage, setCreatingStage] = useState<Stage | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Pipeline</h1>
          <p className="mt-1 text-sm text-slate-400">Every video, from idea to published.</p>
        </div>
        <button
          onClick={() => setCreatingStage('idea')}
          className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400"
        >
          + New video
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {STAGES.map((stage) => {
          const items = state.videos.filter((v) => v.stage === stage.key)
          return (
            <div key={stage.key} className="min-w-[220px] rounded-xl border border-white/10 bg-slate-900/40 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stage.label}</h3>
                <span className="text-xs text-slate-500">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((video) => {
                  const done = video.checklist.filter((c) => c.done).length
                  return (
                    <div
                      key={video.id}
                      className="cursor-pointer rounded-lg border border-white/10 bg-slate-900 p-3 transition hover:border-violet-500/40"
                      onClick={() => setEditing(video)}
                    >
                      <p className="text-sm font-medium text-slate-100">{video.title}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <Badge tone="violet">{video.format}</Badge>
                        <Badge>
                          {done}/{video.checklist.length}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <select
                          value={video.stage}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateVideo(video.id, { stage: e.target.value as Stage })}
                          className="rounded border border-white/10 bg-slate-950 px-1.5 py-1 text-[11px] text-slate-300"
                        >
                          {STAGES.map((s) => (
                            <option key={s.key} value={s.key}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (window.confirm('Delete this video?')) deleteVideo(video.id)
                          }}
                          className="text-[11px] text-slate-500 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                })}
                {items.length === 0 && (
                  <button
                    onClick={() => setCreatingStage(stage.key)}
                    className="w-full rounded-lg border border-dashed border-white/10 py-4 text-xs text-slate-600 hover:border-violet-500/40 hover:text-slate-400"
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {(editing || creatingStage) && (
        <VideoModal
          video={editing ?? undefined}
          defaultStage={creatingStage ?? undefined}
          onClose={() => {
            setEditing(null)
            setCreatingStage(null)
          }}
        />
      )}
    </div>
  )
}
