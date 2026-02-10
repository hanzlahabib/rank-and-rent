export type { BlogPost } from "./types";

export { evChargerCostPost } from "./ev-charger-cost";
export { teslaVsNemaPost } from "./tesla-vs-nema";
export { permitRequirementsPost } from "./permit-requirements";
export { level1VsLevel2Post } from "./level-1-vs-level-2";
export { bestEvChargers2026Post } from "./best-ev-chargers-2026";
export { nvEnergyRebatesPost } from "./nv-energy-rebates";
export { panelUpgradeCostPost } from "./panel-upgrade-cost";
export { apartmentEvChargingPost } from "./apartment-ev-charging";

import type { BlogPost } from "./types";
import { evChargerCostPost } from "./ev-charger-cost";
import { teslaVsNemaPost } from "./tesla-vs-nema";
import { permitRequirementsPost } from "./permit-requirements";
import { level1VsLevel2Post } from "./level-1-vs-level-2";
import { bestEvChargers2026Post } from "./best-ev-chargers-2026";
import { nvEnergyRebatesPost } from "./nv-energy-rebates";
import { panelUpgradeCostPost } from "./panel-upgrade-cost";
import { apartmentEvChargingPost } from "./apartment-ev-charging";

export const blogPosts: BlogPost[] = [
  evChargerCostPost,
  teslaVsNemaPost,
  permitRequirementsPost,
  level1VsLevel2Post,
  bestEvChargers2026Post,
  nvEnergyRebatesPost,
  panelUpgradeCostPost,
  apartmentEvChargingPost,
];
