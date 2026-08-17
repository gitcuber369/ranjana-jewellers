export const SECTION_KEYS = [
  { value: "hero", label: "Hero Banner" },
  { value: "promo_banner", label: "Promo Banner" },
  { value: "collections", label: "Collections" },
  { value: "occasion_grid", label: "Occasion Grid" },
  { value: "curated_for_you", label: "Curated For You" },
  { value: "mosaic_gallery", label: "Mosaic Gallery" },
  { value: "dark_promo", label: "Dark Promo Banner" },
] as const;

export function sectionLabel(key: string) {
  return SECTION_KEYS.find((s) => s.value === key)?.label ?? key;
}
