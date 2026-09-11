export type Stage = 'idea' | 'scripting' | 'filming' | 'editing' | 'scheduled' | 'published'

export const STAGES: { key: Stage; label: string }[] = [
  { key: 'idea', label: 'Idea' },
  { key: 'scripting', label: 'Scripting' },
  { key: 'filming', label: 'Filming' },
  { key: 'editing', label: 'Editing' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'published', label: 'Published' },
]

export type Format = 'Tutorial' | 'Review' | 'Short' | 'Deep Dive' | 'Opinion'

export const FORMATS: Format[] = ['Tutorial', 'Review', 'Short', 'Deep Dive', 'Opinion']

export interface ChecklistItem {
  id: string
  label: string
  done: boolean
}

export interface VideoStats {
  views: number
  likes: number
  comments: number
  watchTimeMinutes: number
  updatedAt: string
}

export interface Video {
  id: string
  title: string
  format: Format
  stage: Stage
  publishDate: string | null
  tags: string[]
  notes: string
  scriptUrl: string
  checklist: ChecklistItem[]
  stats: VideoStats | null
  createdAt: string
  updatedAt: string
}

export type Priority = 'low' | 'medium' | 'high'

export interface Idea {
  id: string
  title: string
  notes: string
  tags: string[]
  priority: Priority
  createdAt: string
}

export type PaymentStatus = 'pending' | 'invoiced' | 'paid'

export interface Sponsorship {
  id: string
  sponsor: string
  videoId: string | null
  deliverables: string[]
  deadline: string | null
  amount: number | null
  paymentStatus: PaymentStatus
  disclosureRequired: boolean
  notes: string
}

export type GearCategory = 'Hardware' | 'Software' | 'App/Tool' | 'Accessory'

export const GEAR_CATEGORIES: GearCategory[] = ['Hardware', 'Software', 'App/Tool', 'Accessory']

export interface GearItem {
  id: string
  name: string
  category: GearCategory
  usedInVideoIds: string[]
  affiliateLink: string
  notes: string
  featured: boolean
}

export interface AppState {
  videos: Video[]
  ideas: Idea[]
  sponsorships: Sponsorship[]
  gear: GearItem[]
}
