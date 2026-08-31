// Canonical sector slugs. These MUST match the Single-Option field values in
// Storyblok (Block Library -> ausbildung_offer -> sector). Never localize or
// rename a slug once offers use it — filters and URLs depend on them being
// stable. Display labels live in i18n under `ausbildung.sectors.<slug>`.
export const AUSBILDUNG_SECTORS = [
  "pflege",
  "it",
  "handwerk",
  "gastronomie",
  "kaufmaennisch",
  "industrie",
  "logistik",
  "sonstige",
] as const

export type AusbildungSector = (typeof AUSBILDUNG_SECTORS)[number]

export const useAusbildungSectors = () => {
  const { t, te } = useI18n()

  const label = (value?: string) => {
    if (!value) return ""
    const key = `ausbildung.sectors.${value}`
    return te(key) ? t(key) : value
  }

  const options = computed(() =>
    AUSBILDUNG_SECTORS.map((value) => ({ value, label: label(value) }))
  )

  return { sectors: AUSBILDUNG_SECTORS, label, options }
}
