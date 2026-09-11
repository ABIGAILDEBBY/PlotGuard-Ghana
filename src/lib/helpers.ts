import type { ChecklistItem, GlossaryTerm, LandType } from "../types"

export function makeId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

const COMMON_CHECKLIST_STEPS: string[] = [
  "Get the seller's full name and Ghana Card ID, and confirm it matches their documents",
  "Request ORIGINAL documents — site plan and indenture, plus land title certificate if one exists (not photocopies)",
  "Search the title at the Lands Commission (Land Registration Division) covering the region",
  "Confirm the GhanaPostGPS digital address matches the boundaries you were shown on site",
  "Visit the site in person and ask at least two neighbours who they know as the owner",
  "Hire a licensed surveyor to confirm the boundary pillars match the site plan",
  "Have a lawyer review every document before any money changes hands",
]

const LAND_TYPE_STEPS: Record<LandType, string[]> = {
  "State": [
    "Confirm with the Lands Commission whether the land is still under compulsory acquisition or has been officially released",
  ],
  "Stool/Skin": [
    "Confirm the allocation is recognised by the Office of the Administrator of Stool Lands (OASL)",
    "Get concurrence from the stool/skin itself — not just one person claiming to act for the chief",
  ],
  "Family": [
    "Get written consent from the family head AND the principal elders — not one relative alone",
    "Ask to see the family's own resolution or minutes approving the sale",
  ],
  "Private/Freehold": [
    "Check the registered title number directly at the Land Title Registry for existing caveats or encumbrances",
  ],
}

export function buildChecklist(landType: LandType): ChecklistItem[] {
  const steps = [...COMMON_CHECKLIST_STEPS, ...LAND_TYPE_STEPS[landType]]
  return steps.map((label) => ({ id: makeId("chk"), label, done: false }))
}

export const RED_FLAGS: string[] = [
  "Seller pressures you for a quick decision or a discount for immediate cash",
  "Only photocopies of documents are available — no originals",
  "Asking price is far below the going rate for the area",
  "Seller avoids meeting you at the actual site",
  "More than one person claims to be the rightful contact or caretaker",
  "There are existing structures, farms, or a rival “sold” sign already on the land",
]

export const GLOSSARY: GlossaryTerm[] = [
  { term: "Indenture", definition: "The legal document recording the sale or transfer of land from seller to buyer." },
  { term: "Site plan", definition: "A drawn plan showing the exact location, shape, and boundaries of a parcel, prepared by a licensed surveyor." },
  { term: "Land Title Certificate", definition: "Official proof of registered title issued by the Lands Commission's Land Title Registry — the strongest evidence of ownership." },
  { term: "Stool / Skin land", definition: "Land held in trust by a chief (stool in the south, skin in the north) on behalf of a community." },
  { term: "Family land", definition: "Land owned collectively by a family, requiring consent from the family head and principal elders to sell." },
  { term: "OASL", definition: "Office of the Administrator of Stool Lands — oversees revenue and allocation for stool and skin lands." },
  { term: "GhanaPostGPS", definition: "Ghana's national digital addressing system; every location has a unique GPS-based address code." },
  { term: "Caveat", definition: "A formal notice lodged at the Lands Commission warning that a title is disputed or has a competing claim." },
  { term: "Land guard", definition: "An informal, often armed group enforcing a claim to land outside the formal legal system — criminalised under the Land Act, 2020 (Act 1036)." },
]
