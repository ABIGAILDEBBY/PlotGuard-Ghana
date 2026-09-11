import type { AppState } from '../types'
import { seedState } from '../data/seed'

const STORAGE_KEY = 'tag-studio-hub:v1'

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedState()
    const parsed = JSON.parse(raw) as Partial<AppState>
    if (!parsed.videos || !parsed.ideas || !parsed.sponsorships || !parsed.gear) {
      return seedState()
    }
    return parsed as AppState
  } catch {
    return seedState()
  }
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // storage unavailable (private browsing, quota) — app still works for the session
  }
}
