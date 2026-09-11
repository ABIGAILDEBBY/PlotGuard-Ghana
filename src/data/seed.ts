import type { AppState, PropertyCase, CommunityAlert } from "../types"
import { makeId, buildChecklist } from "../lib/helpers"

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function daysAgo(days: number): string {
  return daysFromNow(-days)
}

function checklistThrough(landType: PropertyCase["landType"], count: number) {
  return buildChecklist(landType).map((item, i) => ({ ...item, done: i < count }))
}

export function seedState(): AppState {
  const properties: PropertyCase[] = [
    {
      id: makeId("prop"),
      nickname: "Ejisu Family Plot",
      region: "Ashanti",
      town: "Ejisu",
      landType: "Family",
      sellerName: "Auntie Adjoa (family representative)",
      sellerContact: "024•••••12",
      askingPriceGHS: 60000,
      sizePlots: "1 plot (100 x 100 ft)",
      ghanaPostGPS: "AK-0332-••••",
      status: "purchased",
      notes: "Family provided a written resolution signed by five elders. Surveyor confirmed pillars on 12/08.",
      checklist: checklistThrough("Family", 9),
      createdAt: daysAgo(90),
      updatedAt: daysAgo(20),
    },
    {
      id: makeId("prop"),
      nickname: "Kasoa Roadside Plot",
      region: "Central",
      town: "Kasoa",
      landType: "Family",
      sellerName: "Mr. Owusu (says he represents the family)",
      sellerContact: "055•••••41",
      askingPriceGHS: 45000,
      sizePlots: "2 plots (200 x 100 ft)",
      ghanaPostGPS: "CE-1187-••••",
      status: "verifying",
      notes: "Only met one relative so far. Still waiting on the rest of the family to confirm in writing.",
      checklist: checklistThrough("Family", 4),
      createdAt: daysAgo(18),
      updatedAt: daysAgo(2),
    },
    {
      id: makeId("prop"),
      nickname: "Prampram Beach Plot",
      region: "Greater Accra",
      town: "Prampram",
      landType: "Private/Freehold",
      sellerName: "Golden Coast Estates Ltd.",
      sellerContact: "info@example-estates.gh",
      askingPriceGHS: 120000,
      sizePlots: "1 plot (100 x 100 ft), sea view",
      ghanaPostGPS: "GT-0456-••••",
      status: "researching",
      notes: "Marketed heavily on social media. Have not yet requested the registered title number.",
      checklist: checklistThrough("Private/Freehold", 2),
      createdAt: daysAgo(6),
      updatedAt: daysAgo(1),
    },
    {
      id: makeId("prop"),
      nickname: "Aburi Hills Farmland",
      region: "Eastern",
      town: "Aburi",
      landType: "Stool/Skin",
      sellerName: "Introduced as the chief's linguist",
      sellerContact: "020•••••77",
      askingPriceGHS: 30000,
      sizePlots: "3 acres",
      ghanaPostGPS: "",
      status: "researching",
      notes: "Have not yet confirmed this allocation with OASL. Proceed carefully.",
      checklist: checklistThrough("Stool/Skin", 0),
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
    },
  ]

  const alerts: CommunityAlert[] = [
    {
      id: makeId("alert"),
      region: "Central",
      town: "Kasoa",
      sellerDescription: "Land near the Kasoa toll booth, two separate sellers",
      concernType: "multiple-sale",
      description:
        "A parcel near the Kasoa toll booth was reportedly sold to two different buyers within the same month — both hold what look like valid indentures.",
      corroborations: 4,
      reportedAt: daysAgo(14),
    },
    {
      id: makeId("alert"),
      region: "Central",
      town: "Kasoa",
      sellerDescription: "Agent going by “Kofi”, plots along the Winneba road",
      concernType: "no-original-documents",
      description:
        "Only photocopied site plans are ever shown for plots along the Winneba road. Requests to see the originals have been declined more than once.",
      corroborations: 2,
      reportedAt: daysAgo(9),
    },
    {
      id: makeId("alert"),
      region: "Eastern",
      town: "Aburi",
      sellerDescription: "Land near the Botanical Gardens, sold via a self-described “family head”",
      concernType: "disputed-family-claim",
      description:
        "Other members of the family say they never gave consent to this sale and were not part of any resolution.",
      corroborations: 6,
      reportedAt: daysAgo(25),
    },
    {
      id: makeId("alert"),
      region: "Ashanti",
      town: "Ejisu",
      sellerDescription: "Plots off the Ejisu–Kumasi road",
      concernType: "land-guard-activity",
      description:
        "Prospective buyers report men blocking site visits and demanding a “protection fee” before allowing anyone to inspect the plots.",
      corroborations: 3,
      reportedAt: daysAgo(5),
    },
    {
      id: makeId("alert"),
      region: "Volta",
      town: "Ho",
      sellerDescription: "Plots advertised online, seller insists on full upfront cash",
      concernType: "price-too-good",
      description:
        "Plots listed at roughly half the going rate for the area. Seller insists on full cash payment before agreeing to any site visit.",
      corroborations: 5,
      reportedAt: daysAgo(2),
    },
  ]

  return { properties, alerts }
}
