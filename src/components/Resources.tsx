import { GLOSSARY, RED_FLAGS } from "../lib/helpers"
import { SectionCard } from "./ui"

const KEY_STEPS = [
  {
    title: "Search the title",
    body:
      "Visit or contact the Lands Commission's Land Registration Division for the region the land is in and request an official search on the parcel before you pay anything.",
  },
  {
    title: "Check for stool or family involvement",
    body:
      "If the land is stool/skin land, start with the traditional authority (the chief's palace or local Customary Land Secretariat) and confirm recognition with OASL or the regional Lands Commission. If it's family land, get consent in writing from the family head and the principal elders — not one relative alone.",
  },
  {
    title: "Verify on the ground",
    body:
      "Engage a licensed surveyor to confirm boundary pillars match the site plan, and speak to neighbours near the plot about who they know as the owner.",
  },
  {
    title: "Get legal review",
    body: "Have a lawyer review the indenture and all documents before any money changes hands — not after.",
  },
]

export function Resources() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-clay-600">Resources</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-forest-800">Key steps, in plain language.</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          This is general guidance to orient you, not an exhaustive or authoritative legal process — requirements can
          vary by case. PlotGuard is not a law firm or a licensed surveyor; for anything serious, use it alongside the
          professionals below, not instead of them.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {KEY_STEPS.map((step) => (
          <SectionCard key={step.title} title={step.title}>
            <p className="text-sm text-ink-soft">{step.body}</p>
          </SectionCard>
        ))}
      </div>

      <SectionCard eyebrow="Before you pay a cedi" title="Red flags worth stopping for">
        <ul className="grid gap-2 sm:grid-cols-2">
          {RED_FLAGS.map((flag) => (
            <li key={flag} className="flex gap-2 text-sm text-ink-soft">
              <span className="text-clay-600">⚑</span>
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Glossary">
        <dl className="grid gap-4 sm:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div key={g.term}>
              <dt className="font-display font-semibold text-forest-800">{g.term}</dt>
              <dd className="text-sm text-ink-soft">{g.definition}</dd>
            </div>
          ))}
        </dl>
      </SectionCard>
    </div>
  )
}
