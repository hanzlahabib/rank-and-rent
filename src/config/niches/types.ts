import type { NicheConfig, NicheSlug } from "@/types";

export const NICHE_REGISTRY: Record<NicheSlug, () => Promise<NicheConfig>> = {
  "ev-charger-installation": () =>
    import("./ev-charger").then((m) => m.evChargerConfig),
  "smart-home-installation": () =>
    import("./smart-home").then((m) => m.smartHomeConfig),
  "water-damage-restoration": () =>
    import("./water-damage").then((m) => m.waterDamageConfig),
  "pressure-washing": () =>
    import("./pressure-washing").then((m) => m.pressureWashingConfig),
  "junk-removal": () =>
    import("./junk-removal").then((m) => m.junkRemovalConfig),
};

export async function getNicheConfig(
  slug: NicheSlug
): Promise<NicheConfig | null> {
  const loader = NICHE_REGISTRY[slug];
  if (!loader) return null;
  return loader();
}

export function getAllNicheSlugs(): NicheSlug[] {
  return Object.keys(NICHE_REGISTRY) as NicheSlug[];
}
