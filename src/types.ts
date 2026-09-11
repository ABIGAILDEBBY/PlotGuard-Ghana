export type LandType = "State" | "Stool/Skin" | "Family" | "Private/Freehold"

export const LAND_TYPES: LandType[] = ["State", "Stool/Skin", "Family", "Private/Freehold"]

export type CaseStatus = "researching" | "verifying" | "in-progress" | "purchased" | "abandoned"

export const CASE_STATUSES: { key: CaseStatus; label: string }[] = [
  { key: "researching", label: "Researching" },
  { key: "verifying", label: "Verifying" },
  { key: "in-progress", label: "In progress" },
  { key: "purchased", label: "Purchased" },
  { key: "abandoned", label: "Walked away" },
]

export const GHANA_REGIONS: string[] = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Western North",
  "Central",
  "Eastern",
  "Volta",
  "Oti",
  "Northern",
  "Savannah",
  "North East",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
]

export interface ChecklistItem {
  id: string
  label: string
  done: boolean
}

export interface PropertyCase {
  id: string
  nickname: string
  region: string
  town: string
  landType: LandType
  sellerName: string
  sellerContact: string
  askingPriceGHS: number | null
  sizePlots: string
  ghanaPostGPS: string
  status: CaseStatus
  notes: string
  checklist: ChecklistItem[]
  createdAt: string
  updatedAt: string
}

export type ConcernType =
  | "multiple-sale"
  | "no-original-documents"
  | "disputed-family-claim"
  | "land-guard-activity"
  | "price-too-good"
  | "other"

export const CONCERN_TYPES: { key: ConcernType; label: string }[] = [
  { key: "multiple-sale", label: "Sold to more than one buyer" },
  { key: "no-original-documents", label: "No original documents" },
  { key: "disputed-family-claim", label: "Disputed family/stool claim" },
  { key: "land-guard-activity", label: "Land guard activity" },
  { key: "price-too-good", label: "Price far below market" },
  { key: "other", label: "Other concern" },
]

export interface CommunityAlert {
  id: string
  region: string
  town: string
  sellerDescription: string
  concernType: ConcernType
  description: string
  corroborations: number
  reportedAt: string
}

export interface GlossaryTerm {
  term: string
  definition: string
}

export interface AppState {
  properties: PropertyCase[]
  alerts: CommunityAlert[]
}
