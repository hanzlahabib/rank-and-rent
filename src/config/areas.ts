export interface AreaConfig {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  highlights: string[];
  zipCodes: string[];
  nearbyAreas: string[];
}

export const hendersonAreas: AreaConfig[] = [
  {
    slug: "green-valley",
    name: "Green Valley",
    fullName: "Green Valley, Henderson, NV",
    description:
      "Green Valley is one of Henderson's most established master-planned communities, known for its tree-lined streets, top-rated schools, and family-friendly atmosphere. With thousands of single-family homes built from the late 1980s through the 2000s, many homeowners are upgrading their garages with Level 2 EV chargers to keep pace with Nevada's growing electric vehicle adoption. The neighborhood's spacious two- and three-car garages make Green Valley an ideal candidate for hassle-free home charger installations.",
    highlights: [
      "Established master-planned community with over 60,000 residents",
      "Spacious garages in single-family homes ideal for charger mounting",
      "Proximity to Green Valley Parkway shopping and dining corridors",
      "Strong homeowner association communities invested in property upgrades",
    ],
    zipCodes: ["89014", "89052", "89074"],
    nearbyAreas: ["seven-hills", "anthem", "macdonald-ranch"],
  },
  {
    slug: "anthem",
    name: "Anthem",
    fullName: "Anthem, Henderson, NV",
    description:
      "Anthem is a prestigious gated hilltop community in the foothills of the McCullough Range, featuring newer construction homes with modern electrical systems ready for EV charger integration. Many Anthem residents commute to the Las Vegas Strip or downtown, making overnight home charging a practical daily necessity. The community's environmentally conscious demographic and high household incomes make it one of Henderson's top markets for residential EV charger installation.",
    highlights: [
      "Guard-gated community with newer homes built from 1998 onward",
      "Modern electrical panels that simplify charger installation",
      "Anthem Hills and Anthem Country Club luxury enclaves",
      "High EV ownership rates among affluent, commuting residents",
    ],
    zipCodes: ["89052", "89044"],
    nearbyAreas: ["inspirada", "seven-hills", "green-valley"],
  },
  {
    slug: "lake-las-vegas",
    name: "Lake Las Vegas",
    fullName: "Lake Las Vegas, Henderson, NV",
    description:
      "Lake Las Vegas is Henderson's premier luxury resort community, built around a stunning 320-acre man-made lake with Mediterranean-inspired architecture and waterfront estates. Many homeowners here own multiple vehicles, including high-end electric models from Tesla, Rivian, and Porsche, driving strong demand for professional Level 2 and multi-charger garage installations. The community's custom-built homes and oversized garages provide ample space and electrical capacity for even the most advanced charging setups.",
    highlights: [
      "Luxury waterfront resort community with custom estates",
      "High concentration of premium EV ownership (Tesla, Porsche Taycan)",
      "Oversized garages accommodating multi-vehicle charging stations",
      "MonteLago Village and resort amenities attract tech-forward residents",
    ],
    zipCodes: ["89011"],
    nearbyAreas: ["macdonald-ranch", "anthem", "seven-hills"],
  },
  {
    slug: "seven-hills",
    name: "Seven Hills",
    fullName: "Seven Hills, Henderson, NV",
    description:
      "Seven Hills is an upscale guard-gated community perched on elevated terrain offering panoramic views of the Las Vegas valley and surrounding mountains. The neighborhood features executive-level homes with three-car garages, dedicated utility rooms, and robust electrical infrastructure that make EV charger installation straightforward and efficient. Seven Hills homeowners value property improvements that enhance both convenience and resale value, and a professionally installed home charging station delivers on both fronts.",
    highlights: [
      "Guard-gated community with panoramic Las Vegas valley views",
      "Executive homes with three-car garages and modern electrical systems",
      "Rio Secco Golf Club and Dragonridge Country Club nearby",
      "Property-value-conscious homeowners who invest in smart upgrades",
    ],
    zipCodes: ["89052"],
    nearbyAreas: ["green-valley", "anthem", "macdonald-ranch"],
  },
  {
    slug: "inspirada",
    name: "Inspirada",
    fullName: "Inspirada, Henderson, NV",
    description:
      "Inspirada is Henderson's newest master-planned community, featuring modern architecture, energy-efficient construction, and homes designed with sustainability in mind. Many residences here were built with 200-amp electrical panels, pre-wired garage circuits, and solar panel integration, making EV charger installation faster and more affordable than in older neighborhoods. The community attracts young professionals and growing families who prioritize green technology and are among the earliest adopters of electric vehicles in the Henderson area.",
    highlights: [
      "Newest master-planned community with homes built 2010 onward",
      "Energy-efficient construction with solar-ready electrical systems",
      "Pre-wired garages that reduce EV charger installation costs",
      "Young, eco-conscious demographic with high EV adoption rates",
    ],
    zipCodes: ["89044"],
    nearbyAreas: ["anthem", "seven-hills", "green-valley"],
  },
  {
    slug: "macdonald-ranch",
    name: "MacDonald Ranch",
    fullName: "MacDonald Ranch, Henderson, NV",
    description:
      "MacDonald Ranch is an exclusive Henderson enclave known for its custom estates, sprawling lot sizes, and equestrian properties set against the backdrop of the McCullough Range. These luxury properties often feature detached garages, workshops, and barn structures that require specialized electrical routing for EV charger installation. MacDonald Ranch homeowners appreciate white-glove service and expert craftsmanship, making professional installation with clean conduit runs and permit-compliant wiring essential for this discerning community.",
    highlights: [
      "Custom estates on large lots with equestrian and horse properties",
      "Detached garages and workshops requiring specialized wiring solutions",
      "High-net-worth homeowners who expect premium installation quality",
      "Dragon Ridge master-planned area within MacDonald Ranch",
    ],
    zipCodes: ["89012"],
    nearbyAreas: ["seven-hills", "lake-las-vegas", "green-valley"],
  },
];

export function getAreaBySlug(slug: string): AreaConfig | undefined {
  return hendersonAreas.find((area) => area.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return hendersonAreas.map((area) => area.slug);
}

export function getNearbyAreas(slug: string): AreaConfig[] {
  const area = getAreaBySlug(slug);
  if (!area) return [];
  return area.nearbyAreas
    .map((nearbySlug) => getAreaBySlug(nearbySlug))
    .filter((a): a is AreaConfig => a !== undefined);
}
