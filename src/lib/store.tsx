import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import type { AppState, PropertyCase, CommunityAlert } from "../types"
import { loadState, saveState } from "./storage"
import { makeId, buildChecklist } from "./helpers"

interface StoreValue {
  state: AppState
  addProperty: (p: Omit<PropertyCase, "id" | "checklist" | "createdAt" | "updatedAt">) => PropertyCase
  updateProperty: (id: string, patch: Partial<PropertyCase>) => void
  deleteProperty: (id: string) => void
  toggleChecklistItem: (propertyId: string, itemId: string) => void
  addAlert: (a: Omit<CommunityAlert, "id" | "corroborations" | "reportedAt">) => CommunityAlert
  corroborateAlert: (id: string) => void
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
      addProperty: (p) => {
        const property: PropertyCase = {
          ...p,
          id: makeId("prop"),
          checklist: buildChecklist(p.landType),
          createdAt: now(),
          updatedAt: now(),
        }
        setState((s) => ({ ...s, properties: [property, ...s.properties] }))
        return property
      },
      updateProperty: (id, patch) => {
        setState((s) => ({
          ...s,
          properties: s.properties.map((p) => {
            if (p.id !== id) return p
            const next = { ...p, ...patch, updatedAt: now() }
            if (patch.landType && patch.landType !== p.landType) {
              next.checklist = buildChecklist(patch.landType)
            }
            return next
          }),
        }))
      },
      deleteProperty: (id) => {
        setState((s) => ({ ...s, properties: s.properties.filter((p) => p.id !== id) }))
      },
      toggleChecklistItem: (propertyId, itemId) => {
        setState((s) => ({
          ...s,
          properties: s.properties.map((p) =>
            p.id !== propertyId
              ? p
              : {
                  ...p,
                  updatedAt: now(),
                  checklist: p.checklist.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c)),
                },
          ),
        }))
      },
      addAlert: (a) => {
        const alert: CommunityAlert = { ...a, id: makeId("alert"), corroborations: 0, reportedAt: now().slice(0, 10) }
        setState((s) => ({ ...s, alerts: [alert, ...s.alerts] }))
        return alert
      },
      corroborateAlert: (id) => {
        setState((s) => ({
          ...s,
          alerts: s.alerts.map((a) => (a.id === id ? { ...a, corroborations: a.corroborations + 1 } : a)),
        }))
      },
      replaceState: (s) => setState(s),
    }
  }, [state])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
