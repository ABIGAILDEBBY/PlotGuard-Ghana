import type { ChecklistItem } from '../types'

export function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export function defaultChecklist(): ChecklistItem[] {
  return [
    { id: makeId('chk'), label: 'Script finalized', done: false },
    { id: makeId('chk'), label: 'Filmed', done: false },
    { id: makeId('chk'), label: 'Edited', done: false },
    { id: makeId('chk'), label: 'Thumbnail made', done: false },
    { id: makeId('chk'), label: 'Title finalized', done: false },
    { id: makeId('chk'), label: 'Description & tags written', done: false },
  ]
}
