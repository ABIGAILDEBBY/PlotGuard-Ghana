import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AppState, Video, Idea, Sponsorship, GearItem } from '../types'
import { loadState, saveState } from './storage'
import { makeId, defaultChecklist } from './helpers'

interface StoreValue {
  state: AppState
  addVideo: (v: Omit<Video, 'id' | 'createdAt' | 'updatedAt'>) => Video
  updateVideo: (id: string, patch: Partial<Video>) => void
  deleteVideo: (id: string) => void
  addIdea: (i: Omit<Idea, 'id' | 'createdAt'>) => Idea
  deleteIdea: (id: string) => void
  promoteIdea: (ideaId: string) => Video | null
  addSponsorship: (s: Omit<Sponsorship, 'id'>) => Sponsorship
  updateSponsorship: (id: string, patch: Partial<Sponsorship>) => void
  deleteSponsorship: (id: string) => void
  addGear: (g: Omit<GearItem, 'id'>) => GearItem
  deleteGear: (id: string) => void
  replaceState: (s: AppState) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const value = useMemo<StoreValue>(() => {
    const now = () => new Date().toISOString()

    return {
      state,
      addVideo: (v) => {
        const video: Video = { ...v, id: makeId('vid'), createdAt: now(), updatedAt: now() }
        setState((s) => ({ ...s, videos: [video, ...s.videos] }))
        return video
      },
      updateVideo: (id, patch) => {
        setState((s) => ({
          ...s,
          videos: s.videos.map((v) => (v.id === id ? { ...v, ...patch, updatedAt: now() } : v)),
        }))
      },
      deleteVideo: (id) => {
        setState((s) => ({ ...s, videos: s.videos.filter((v) => v.id !== id) }))
      },
      addIdea: (i) => {
        const idea: Idea = { ...i, id: makeId('idea'), createdAt: now() }
        setState((s) => ({ ...s, ideas: [idea, ...s.ideas] }))
        return idea
      },
      deleteIdea: (id) => {
        setState((s) => ({ ...s, ideas: s.ideas.filter((i) => i.id !== id) }))
      },
      promoteIdea: (ideaId) => {
        let created: Video | null = null
        setState((s) => {
          const idea = s.ideas.find((i) => i.id === ideaId)
          if (!idea) return s
          const video: Video = {
            id: makeId('vid'),
            title: idea.title,
            format: 'Tutorial',
            stage: 'scripting',
            publishDate: null,
            tags: idea.tags,
            notes: idea.notes,
            scriptUrl: '',
            checklist: defaultChecklist(),
            stats: null,
            createdAt: now(),
            updatedAt: now(),
          }
          created = video
          return {
            ...s,
            videos: [video, ...s.videos],
            ideas: s.ideas.filter((i) => i.id !== ideaId),
          }
        })
        return created
      },
      addSponsorship: (sp) => {
        const sponsorship: Sponsorship = { ...sp, id: makeId('spon') }
        setState((s) => ({ ...s, sponsorships: [sponsorship, ...s.sponsorships] }))
        return sponsorship
      },
      updateSponsorship: (id, patch) => {
        setState((s) => ({
          ...s,
          sponsorships: s.sponsorships.map((sp) => (sp.id === id ? { ...sp, ...patch } : sp)),
        }))
      },
      deleteSponsorship: (id) => {
        setState((s) => ({ ...s, sponsorships: s.sponsorships.filter((sp) => sp.id !== id) }))
      },
      addGear: (g) => {
        const gear: GearItem = { ...g, id: makeId('gear') }
        setState((s) => ({ ...s, gear: [gear, ...s.gear] }))
        return gear
      },
      deleteGear: (id) => {
        setState((s) => ({ ...s, gear: s.gear.filter((g) => g.id !== id) }))
      },
      replaceState: (s) => setState(s),
    }
  }, [state])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
