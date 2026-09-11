import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Video, Stage, Format, VideoStats } from '../types'
import { STAGES, FORMATS } from '../types'
import { useStore } from '../lib/store'
import { Modal, inputClass, labelClass } from './ui'
import { defaultChecklist } from '../lib/helpers'

export function VideoModal({
  video,
  defaultStage,
  onClose,
}: {
  video?: Video
  defaultStage?: Stage
  onClose: () => void
}) {
  const { addVideo, updateVideo } = useStore()
  const [title, setTitle] = useState(video?.title ?? '')
  const [format, setFormat] = useState<Format>(video?.format ?? 'Tutorial')
  const [stage, setStage] = useState<Stage>(video?.stage ?? defaultStage ?? 'idea')
  const [publishDate, setPublishDate] = useState(video?.publishDate ?? '')
  const [tags, setTags] = useState(video?.tags.join(', ') ?? '')
  const [notes, setNotes] = useState(video?.notes ?? '')
  const [views, setViews] = useState(video?.stats?.views.toString() ?? '')
  const [likes, setLikes] = useState(video?.stats?.likes.toString() ?? '')
  const [comments, setComments] = useState(video?.stats?.comments.toString() ?? '')
  const [watchTimeMinutes, setWatchTimeMinutes] = useState(video?.stats?.watchTimeMinutes.toString() ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const stats: VideoStats | null =
      stage === 'published'
        ? {
            views: Number(views) || 0,
            likes: Number(likes) || 0,
            comments: Number(comments) || 0,
            watchTimeMinutes: Number(watchTimeMinutes) || 0,
            updatedAt: new Date().toISOString(),
          }
        : null

    if (video) {
      updateVideo(video.id, { title: title.trim(), format, stage, publishDate: publishDate || null, tags: tagList, notes, stats })
    } else {
      addVideo({
        title: title.trim(),
        format,
        stage,
        publishDate: publishDate || null,
        tags: tagList,
        notes,
        scriptUrl: '',
        checklist: defaultChecklist(),
        stats,
      })
    }
    onClose()
  }

  return (
    <Modal title={video ? 'Edit video' : 'New video'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="video-title">Title</label>
          <input id="video-title" className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="video-format">Format</label>
            <select id="video-format" className={inputClass} value={format} onChange={(e) => setFormat(e.target.value as Format)}>
              {FORMATS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="video-stage">Stage</label>
            <select id="video-stage" className={inputClass} value={stage} onChange={(e) => setStage(e.target.value as Stage)}>
              {STAGES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="video-publish-date">Target publish date</label>
          <input
            id="video-publish-date"
            type="date"
            className={inputClass}
            value={publishDate ?? ''}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="video-tags">Tags (comma separated)</label>
          <input id="video-tags" className={inputClass} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tutorial, ai art" />
        </div>
        <div>
          <label className={labelClass} htmlFor="video-notes">Notes</label>
          <textarea id="video-notes" className={inputClass} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        {stage === 'published' && (
          <div className="space-y-3 rounded-lg border border-white/10 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Performance</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass} htmlFor="video-views">Views</label>
                <input id="video-views" type="number" min="0" className={inputClass} value={views} onChange={(e) => setViews(e.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="video-likes">Likes</label>
                <input id="video-likes" type="number" min="0" className={inputClass} value={likes} onChange={(e) => setLikes(e.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="video-comments">Comments</label>
                <input
                  id="video-comments"
                  type="number"
                  min="0"
                  className={inputClass}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="video-watch-time">Watch time (min)</label>
                <input
                  id="video-watch-time"
                  type="number"
                  min="0"
                  className={inputClass}
                  value={watchTimeMinutes}
                  onChange={(e) => setWatchTimeMinutes(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-2 text-sm text-slate-400 hover:text-white">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400">
            {video ? 'Save changes' : 'Add video'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
