import { useState } from 'react'
import { StoreProvider } from './lib/store'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/Dashboard'
import { Pipeline } from './components/Pipeline'
import { Ideas } from './components/Ideas'
import { Calendar } from './components/Calendar'
import { Sponsorships } from './components/Sponsorships'
import { Gear } from './components/Gear'

export type View = 'dashboard' | 'pipeline' | 'ideas' | 'calendar' | 'sponsorships' | 'gear'

function AppShell() {
  const [view, setView] = useState<View>('dashboard')

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar view={view} onNavigate={setView} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
          {view === 'dashboard' && <Dashboard onNavigate={setView} />}
          {view === 'pipeline' && <Pipeline />}
          {view === 'ideas' && <Ideas />}
          {view === 'calendar' && <Calendar />}
          {view === 'sponsorships' && <Sponsorships />}
          {view === 'gear' && <Gear />}
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
