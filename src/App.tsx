import { useState } from "react"
import { StoreProvider } from "./lib/store"
import { Sidebar } from "./components/Sidebar"
import { Dashboard } from "./components/Dashboard"
import { Properties } from "./components/Properties"
import { CommunityAlerts } from "./components/CommunityAlerts"
import { Resources } from "./components/Resources"

export type View = "dashboard" | "properties" | "alerts" | "resources"

function AppShell() {
  const [view, setView] = useState<View>("dashboard")
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)

  function navigate(next: View, propertyId?: string) {
    setView(next)
    setSelectedPropertyId(propertyId ?? null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink lg:flex-row">
      <Sidebar view={view} onNavigate={(v) => navigate(v)} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
          {view === "dashboard" && <Dashboard onNavigate={navigate} />}
          {view === "properties" && (
            <Properties initialSelectedId={selectedPropertyId} onSelect={setSelectedPropertyId} />
          )}
          {view === "alerts" && <CommunityAlerts />}
          {view === "resources" && <Resources />}
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  )
}
