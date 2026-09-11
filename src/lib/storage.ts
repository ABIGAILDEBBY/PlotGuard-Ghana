import type { AppState } from "../types"
import { seedState } from "../data/seed"

const STORAGE_KEY = "plotguard-gh:v1"

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedState()
    const parsed = JSON.parse(raw) as Partial<AppState>
    if (!Array.isArray(parsed.properties) || !Array.isArray(parsed.alerts)) return seedState()
    return { properties: parsed.properties, alerts: parsed.alerts, corroboratedIds: Array.isArray(parsed.corroboratedIds) ? parsed.corroboratedIds : [] }
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
