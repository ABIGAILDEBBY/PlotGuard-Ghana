import { useState } from "react"
import type { FormEvent } from "react"
import type { PropertyCase, LandType, CaseStatus } from "../types"
import { GHANA_REGIONS, LAND_TYPES, CASE_STATUSES } from "../types"
import { useStore } from "../lib/store"
import { Modal, inputClass, labelClass } from "./ui"

export function PropertyModal({ property, onClose }: { property?: PropertyCase; onClose: () => void }) {
  const { addProperty, updateProperty } = useStore()
  const [nickname, setNickname] = useState(property?.nickname ?? "")
  const [region, setRegion] = useState(property?.region ?? GHANA_REGIONS[0])
  const [town, setTown] = useState(property?.town ?? "")
  const [landType, setLandType] = useState<LandType>(property?.landType ?? "Family")
  const [sellerName, setSellerName] = useState(property?.sellerName ?? "")
  const [sellerContact, setSellerContact] = useState(property?.sellerContact ?? "")
  const [askingPriceGHS, setAskingPriceGHS] = useState(property?.askingPriceGHS?.toString() ?? "")
  const [sizePlots, setSizePlots] = useState(property?.sizePlots ?? "")
  const [ghanaPostGPS, setGhanaPostGPS] = useState(property?.ghanaPostGPS ?? "")
  const [status, setStatus] = useState<CaseStatus>(property?.status ?? "researching")
  const [notes, setNotes] = useState(property?.notes ?? "")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!nickname.trim() || !town.trim()) return
    const payload = {
      nickname: nickname.trim(),
      region,
      town: town.trim(),
      landType,
      sellerName: sellerName.trim(),
      sellerContact: sellerContact.trim(),
      askingPriceGHS: askingPriceGHS ? Number(askingPriceGHS) : null,
      sizePlots: sizePlots.trim(),
      ghanaPostGPS: ghanaPostGPS.trim(),
      status,
      notes,
    }
    if (property) {
      updateProperty(property.id, payload)
    } else {
      addProperty(payload)
    }
    onClose()
  }

  return (
    <Modal title={property ? "Edit property" : "Add a property"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass} htmlFor="prop-nickname">
            Nickname (so you can find it later)
          </label>
          <input
            id="prop-nickname"
            className={inputClass}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="e.g. Kasoa Roadside Plot"
            autoFocus
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="prop-region">
              Region
            </label>
            <select id="prop-region" className={inputClass} value={region} onChange={(e) => setRegion(e.target.value)}>
              {GHANA_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="prop-town">
              Town / area
            </label>
            <input id="prop-town" className={inputClass} value={town} onChange={(e) => setTown(e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="prop-land-type">
              Land type
            </label>
            <select
              id="prop-land-type"
              className={inputClass}
              value={landType}
              onChange={(e) => setLandType(e.target.value as LandType)}
            >
              {LAND_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {property && property.landType !== landType && (
              <p className="mt-1 text-[11px] text-clay-700">Changing land type resets the checklist for this property.</p>
            )}
          </div>
          <div>
            <label className={labelClass} htmlFor="prop-status">
              Status
            </label>
            <select id="prop-status" className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as CaseStatus)}>
              {CASE_STATUSES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="prop-seller-name">
              Seller name
            </label>
            <input id="prop-seller-name" className={inputClass} value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="prop-seller-contact">
              Seller contact
            </label>
            <input
              id="prop-seller-contact"
              className={inputClass}
              value={sellerContact}
              onChange={(e) => setSellerContact(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass} htmlFor="prop-price">
              Asking price (GHS)
            </label>
            <input
              id="prop-price"
              type="number"
              min="0"
              className={inputClass}
              value={askingPriceGHS}
              onChange={(e) => setAskingPriceGHS(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="prop-size">
              Size
            </label>
            <input
              id="prop-size"
              className={inputClass}
              value={sizePlots}
              onChange={(e) => setSizePlots(e.target.value)}
              placeholder="e.g. 1 plot (100x100 ft)"
            />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="prop-gps">
            GhanaPostGPS address (if known)
          </label>
          <input id="prop-gps" className={inputClass} value={ghanaPostGPS} onChange={(e) => setGhanaPostGPS(e.target.value)} />
        </div>
        <div>
          <label className={labelClass} htmlFor="prop-notes">
            Notes
          </label>
          <textarea id="prop-notes" className={inputClass} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-2 text-sm text-ink-soft hover:text-ink">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-forest-700 px-4 py-2 text-sm font-medium text-cream hover:bg-forest-600">
            {property ? "Save changes" : "Add property"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
