export interface HostPackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  pax: number;
  highlights: string[];
}

export interface Host {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  captain: string;
  captainBio: string;
  capacity: number;
  image: string;
  gallery: string[];
  packages: HostPackage[];
  amenities: string[];
  rating: number;
  reviews: number;
  verified: boolean;
  location: string;
  category: "Houseboat" | "Adventure" | "Eco" | "Family" | "Fishing";
  joinedYear: number;
  responseTime: string;
  responseRate: number;
}

export const hosts: Host[] = [
  {
    id: "h1",
    slug: "the-temenggor",
    name: "The Temenggor",
    tagline: "Back to Nature",
    description:
      "The original Temenggor houseboat — a floating basecamp for rainforest cruises, bamboo rafting, kayaking, and guided visits into Royal Belum. Departs from Jeti Awam Pulau Banding.",
    longDescription:
      "The Temenggor is the flagship houseboat operated by The Temenggor Ventures, moored at Jeti Awam Pulau Banding, Gerik, Perak. With a capacity of 25 persons, every trip includes a houseboat cruise across Tasik Temenggor, speedboat transfers to activity sites, kayaking, bamboo rafting, and guided visits to locations like Waterfall Sg Kooi, Orang Asli Kg Klewang, Batu Putih Cave, and the Rafflesia sites at Teluk Major. Add-on options include fishing passes, special occasion arrangements, and full F&B packages covering breakfast, lunch, tea break, dinner, and BBQ. This is not a resort — it is a working houseboat where you eat, sleep, and explore the 130-million-year-old rainforest directly from the water.",
    captain: "Captain Azman",
    captainBio:
      "A veteran of Temenggor Lake with over 12 years navigating these waters. Captain Azman knows every tributary, fishing spot, and waterfall access point on the lake. He grew up in the Gerik community and works closely with local Orang Asli guides.",
    capacity: 25,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Royal_Belum_State_Park_by_boat.jpg/1920px-Royal_Belum_State_Park_by_boat.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Royal_Belum_State_Park_on_a_sunny_day.jpg/1280px-Royal_Belum_State_Park_on_a_sunny_day.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg/1280px-The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg/720px-Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg",
    ],
    packages: [
      {
        id: "h1-p1",
        name: "2D1N Houseboat Cruise",
        duration: "2 Days 1 Night",
        price: 3500,
        pax: 25,
        highlights: [
          "Houseboat cruise on Tasik Temenggor",
          "Speedboat transfer to activity sites",
          "Kayaking & bamboo rafting",
          "2 visit activities (waterfall / village / cave)",
          "Royal Belum Pass included",
          "BBQ dinner on the houseboat",
        ],
      },
      {
        id: "h1-p2",
        name: "3D2N Houseboat Cruise",
        duration: "3 Days 2 Nights",
        price: 5500,
        pax: 25,
        highlights: [
          "Extended houseboat cruise",
          "Speedboat transfer to activity sites",
          "Kayaking & bamboo rafting",
          "3 visit activities (waterfall / village / salt lick / cave)",
          "Royal Belum Pass included",
          "All meals included (breakfast, lunch, dinner, BBQ)",
        ],
      },
      {
        id: "h1-p3",
        name: "Houseboat Rental / Event",
        duration: "Custom",
        price: 0,
        pax: 25,
        highlights: [
          "Team building & corporate retreats",
          "Family gatherings & reunions",
          "Fishing tournaments",
          "Weddings & special occasions",
          "CSR programs",
          "Custom itinerary & event coordination",
        ],
      },
    ],
    amenities: [
      "Sleeping quarters for 25 pax",
      "Full kitchen & communal dining",
      "Covered observation deck",
      "Fishing platforms",
      "Life jackets & safety gear",
      "Toilet & shower facilities",
      "BBQ station",
      "Speedboat for transfers",
    ],
    rating: 4.9,
    reviews: 127,
    verified: true,
    location: "Jeti Awam Pulau Banding, Gerik",
    category: "Houseboat",
    joinedYear: 2022,
    responseTime: "within 1 hour",
    responseRate: 99,
  },
  {
    id: "h2",
    slug: "blue-fern-houseboat",
    name: "Blue Fern Houseboat",
    tagline: "Comfort on the Lake",
    description:
      "A well-maintained houseboat with air-conditioned sleeping areas and a dedicated cook. Blue Fern offers houseboat cruises with kayaking, bamboo rafting, and guided waterfall visits on Temenggor Lake.",
    longDescription:
      "Blue Fern Houseboat operates from Pulau Banding and caters to smaller groups who want a comfortable houseboat experience without the crowds. The vessel features air-conditioned sleeping quarters, a proper galley kitchen with a dedicated cook who prepares local Malay cuisine, and a spacious upper deck for sunset viewing and stargazing. Every trip includes speedboat transfers to activities — kayaking on the calm lake waters, bamboo rafting through shaded tributaries, and guided visits to Royal Belum's waterfalls and Orang Asli villages. The crew is from the local Gerik community and brings genuine knowledge of the area's wildlife, plants, and cultural heritage.",
    captain: "Captain Haris",
    captainBio:
      "Captain Haris has been operating houseboats on Temenggor Lake for 8 years. He is known for his calm, safety-first approach and his skill at finding the best sunset spots and fishing grounds along the lake.",
    capacity: 16,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Lake_Kenyir%2C_on_the_Houseboat.jpg/1280px-Lake_Kenyir%2C_on_the_Houseboat.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Lake_Kenyir%2C_on_the_Houseboat.jpg/1280px-Lake_Kenyir%2C_on_the_Houseboat.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Land_and_Sea_Royal_Belum_State_Park.jpg/960px-Land_and_Sea_Royal_Belum_State_Park.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg/1280px-The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Belum_Rainforest_Resort_-_panoramio.jpg",
    ],
    packages: [
      {
        id: "h2-p1",
        name: "2D1N Lake Cruise",
        duration: "2 Days 1 Night",
        price: 3200,
        pax: 16,
        highlights: [
          "Houseboat cruise with air-conditioned quarters",
          "Speedboat transfer to waterfall & village",
          "Kayaking session",
          "Sunset viewing from upper deck",
          "Meals by onboard cook",
        ],
      },
      {
        id: "h2-p2",
        name: "3D2N Full Experience",
        duration: "3 Days 2 Nights",
        price: 5000,
        pax: 16,
        highlights: [
          "Extended cruise across Tasik Temenggor",
          "Bamboo rafting & kayaking",
          "Waterfall visit (Sg Kooi / Sg Papan)",
          "Orang Asli village cultural visit",
          "Morning safari & bird watching",
          "All meals included",
        ],
      },
    ],
    amenities: [
      "Air-conditioned sleeping quarters",
      "Upper deck lounge",
      "Onboard cook & kitchen",
      "Fishing rods available",
      "Kayaks & life jackets",
      "Hot shower facilities",
      "BBQ equipment",
      "Speedboat for transfers",
    ],
    rating: 4.87,
    reviews: 89,
    verified: true,
    location: "Pulau Banding, Temenggor Lake",
    category: "Houseboat",
    joinedYear: 2021,
    responseTime: "within 2 hours",
    responseRate: 97,
  },
  {
    id: "h3",
    slug: "casuarina-eco-boat",
    name: "Casuarina Eco Boat",
    tagline: "Community & Conservation",
    description:
      "An eco-conscious houseboat focused on community engagement. Casuarina works directly with Orang Asli communities for village visits, Sewang cultural experiences, and guided jungle treks.",
    longDescription:
      "Casuarina Eco Boat is operated in close partnership with the Jahai Orang Asli community along the waterways of Royal Belum. Solar panels supplement power, and the houseboat uses locally sourced bamboo furnishings. What makes Casuarina different is its community-first approach — every trip includes an extended Orang Asli village visit at Kg Klewang, a traditional Sewang cultural experience, and guided jungle trekking led by Orang Asli trackers who know the rainforest intimately. Captain Zainab, one of the few female houseboat operators on the lake, ensures that a portion of every booking goes directly back to the communities that make these experiences possible. Activities include bamboo rafting, kayaking, waterfall visits, and conservation talks.",
    captain: "Captain Zainab",
    captainBio:
      "One of the few female houseboat operators on Temenggor Lake. Captain Zainab is a passionate conservationist who has built lasting relationships with Orang Asli communities and runs community-benefit tourism programs.",
    capacity: 20,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Royal_Belum_State_Park.jpg/1280px-Royal_Belum_State_Park.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Royal_Belum_State_Park.jpg/1280px-Royal_Belum_State_Park.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg/720px-Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kampung_Orang_Asli_Sungai_Chendon_1.jpg/1280px-Kampung_Orang_Asli_Sungai_Chendon_1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kampung_Orang_Asli_Sungai_Chendon_2.jpg/1280px-Kampung_Orang_Asli_Sungai_Chendon_2.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Royal_Belum_State_Park_on_a_sunny_day.jpg/1280px-Royal_Belum_State_Park_on_a_sunny_day.jpg",
    ],
    packages: [
      {
        id: "h3-p1",
        name: "2D1N Community & Nature",
        duration: "2 Days 1 Night",
        price: 2800,
        pax: 20,
        highlights: [
          "Houseboat cruise on Tasik Temenggor",
          "Orang Asli village visit (Kg Klewang)",
          "Sewang cultural experience",
          "Bamboo rafting & kayaking",
          "Traditional cooking with local ingredients",
        ],
      },
      {
        id: "h3-p2",
        name: "3D2N Deep Community",
        duration: "3 Days 2 Nights",
        price: 4200,
        pax: 20,
        highlights: [
          "Extended houseboat cruise",
          "Orang Asli village stay & cultural exchange",
          "Jungle trekking with Orang Asli guides",
          "Waterfall visit (Sg Kooi)",
          "Bamboo raft building workshop",
          "Organic meals from local produce",
        ],
      },
    ],
    amenities: [
      "Solar-powered lighting",
      "Bamboo & reclaimed wood interiors",
      "Community engagement program",
      "Kayaks & bamboo rafts",
      "Life jackets & safety gear",
      "Basic shower & toilet facilities",
      "Speedboat for transfers",
      "Orang Asli guide included",
    ],
    rating: 4.85,
    reviews: 64,
    verified: true,
    location: "Sg Chendon, Temenggor Lake",
    category: "Eco",
    joinedYear: 2022,
    responseTime: "within 3 hours",
    responseRate: 95,
  },
  {
    id: "h4",
    slug: "rainforest-explorer",
    name: "Rainforest Explorer",
    tagline: "Into the Deep Jungle",
    description:
      "A rugged houseboat built for adventure — jungle trekking, hiking, night safari, camping, and deep exploration of Royal Belum's remote tributaries and hidden waterfalls.",
    longDescription:
      "Rainforest Explorer is the adventure-seeker's houseboat. Originally built for research expeditions into the deeper reaches of Royal Belum, this vessel has reinforced hulls and expanded gear storage for accessing narrower waterways that larger houseboats cannot reach. Captain Rashid, a former Perak State Park ranger with 15 years of deep-jungle expertise, leads every expedition. Activities go beyond the usual — multi-day jungle trekking to Sg Kejar, hiking to the Towerview Tali Kail ridge, night safari along the lakeshore, campsite setup at remote sites, and water confidence activities. Every trip includes the standard houseboat cruise, speedboat transfers, kayaking, and bamboo rafting, but the focus here is going deeper into the rainforest than any other operator.",
    captain: "Captain Rashid",
    captainBio:
      "Former Perak State Park ranger with 15 years of deep-jungle expertise. If there's a hidden waterfall or unmarked trail in Royal Belum, Captain Rashid has mapped it. He also runs the water confidence and survival skills programs.",
    capacity: 18,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Royal_Belum_State_Park_by_boat.jpg/1920px-Royal_Belum_State_Park_by_boat.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Royal_Belum_State_Park_by_boat.jpg/1920px-Royal_Belum_State_Park_by_boat.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Temenggor_Lake_West_Bridge_3.jpg/1280px-Temenggor_Lake_West_Bridge_3.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg/720px-Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Royal_Belum_State_Park.jpg/1280px-Royal_Belum_State_Park.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Land_and_Sea_Royal_Belum_State_Park.jpg/960px-Land_and_Sea_Royal_Belum_State_Park.jpg",
    ],
    packages: [
      {
        id: "h4-p1",
        name: "2D1N Adventure Cruise",
        duration: "2 Days 1 Night",
        price: 3200,
        pax: 18,
        highlights: [
          "Houseboat cruise & speedboat transfers",
          "Guided jungle trekking (Sg Kejar)",
          "Kayaking & bamboo rafting",
          "Water confidence activities",
          "Campfire & stargazing session",
        ],
      },
      {
        id: "h4-p2",
        name: "4D3N Deep Expedition",
        duration: "4 Days 3 Nights",
        price: 7800,
        pax: 18,
        highlights: [
          "Multi-day houseboat expedition",
          "Deep jungle trek & hiking (Towerview Tali Kail)",
          "Remote waterfall discovery (Sg Nam / Sg Papan)",
          "Night safari along lakeshore",
          "Camping & campsite setup at remote sites",
          "Water tubing & water confidence activities",
          "All meals & expedition gear provided",
        ],
      },
    ],
    amenities: [
      "Reinforced aluminium hull",
      "Expedition gear storage",
      "Speedboat & river boats",
      "First aid station",
      "Drying room for wet gear",
      "Camping equipment provided",
      "Satellite communication",
      "Life jackets & safety gear",
    ],
    rating: 4.95,
    reviews: 52,
    verified: true,
    location: "Royal Belum State Park",
    category: "Adventure",
    joinedYear: 2021,
    responseTime: "within 4 hours",
    responseRate: 92,
  },
  {
    id: "h5",
    slug: "belum-star",
    name: "Belum Star",
    tagline: "Family-Friendly Houseboat",
    description:
      "Designed for families with children. Safety-first houseboat with kid-friendly activities, educational nature programs, and gentle water activities on Temenggor Lake.",
    longDescription:
      "Belum Star was built with families in mind — every child deserves to experience the magic of Temenggor Lake safely. The houseboat has child-safe railings, shallow-water activity zones, and an educational naturalist program for young explorers aged 5-15. Captain Mei Ling, a mother of three and certified nature educator, has crafted a unique houseboat experience where learning and adventure go hand in hand. Trips include the standard houseboat cruise, speedboat transfers, gentle kayaking, bamboo rafting, and visits to waterfalls and Orang Asli villages — all at a pace suitable for families. Add-ons include fishing passes and special celebration arrangements for birthdays and anniversaries.",
    captain: "Captain Mei Ling",
    captainBio:
      "Mother of three and certified nature educator. Her Junior Ranger program on the houseboat has taught over 500 children to appreciate the rainforest. She ensures every activity is safe and engaging for all ages.",
    capacity: 22,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Royal_Belum_State_Park_on_a_sunny_day.jpg/1280px-Royal_Belum_State_Park_on_a_sunny_day.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Royal_Belum_State_Park_on_a_sunny_day.jpg/1280px-Royal_Belum_State_Park_on_a_sunny_day.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kampung_Orang_Asli_Sungai_Chendon_2.jpg/1280px-Kampung_Orang_Asli_Sungai_Chendon_2.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Belum_Rainforest_Resort_-_panoramio.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kampung_Orang_Asli_Sungai_Chendon_1.jpg/1280px-Kampung_Orang_Asli_Sungai_Chendon_1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
    ],
    packages: [
      {
        id: "h5-p1",
        name: "2D1N Family Cruise",
        duration: "2 Days 1 Night",
        price: 3000,
        pax: 22,
        highlights: [
          "Houseboat cruise with child-safe setup",
          "Gentle kayaking & bamboo rafting",
          "Waterfall visit (shallow pool area)",
          "Junior Ranger nature program",
          "Kid-friendly meals & snacks",
        ],
      },
      {
        id: "h5-p2",
        name: "3D2N Family Explorer",
        duration: "3 Days 2 Nights",
        price: 4800,
        pax: 22,
        highlights: [
          "Extended family houseboat cruise",
          "Orang Asli village cultural workshop",
          "Waterfall picnic & nature walk",
          "Star gazing session from the deck",
          "Bird watching morning safari",
          "All meals included",
        ],
      },
    ],
    amenities: [
      "Child-safe railings & nets",
      "Shallow-water activity zone",
      "Board games & books library",
      "Family sleeping quarters",
      "Speedboat for transfers",
      "Sun-shaded play deck",
      "Life jackets (all sizes incl. children)",
      "BBQ station",
    ],
    rating: 4.88,
    reviews: 78,
    verified: true,
    location: "Pulau Banding, Temenggor Lake",
    category: "Family",
    joinedYear: 2023,
    responseTime: "within 2 hours",
    responseRate: 98,
  },
  {
    id: "h6",
    slug: "the-angler",
    name: "The Angler",
    tagline: "Sport Fishing Houseboat",
    description:
      "Purpose-built for sport fishing on Temenggor Lake. Pro-grade equipment, fish finder, and a captain who knows every honey hole — targeting Kelah, Toman, Sebarau, and Baung.",
    longDescription:
      "Temenggor Lake is Malaysia's premier freshwater fishing destination, home to Kelah (Malaysian Mahseer), Toman (Giant Snakehead), Baung, Sebarau, and dozens more species. The Angler is a houseboat purpose-built for serious sport fishing. Professional-grade fishing platforms extend from both sides, Lowrance fish finders guide you to the best spots, and rod storage holds 40+ rods. Captain Daud, a legendary local fisherman with 25+ years on Temenggor Lake, shares his deep knowledge of seasonal patterns, feeding grounds at Sg Tiang and Sg Gadung, and the art of landing a monster Kelah. Fishing passes are included in every package. Between fishing sessions, enjoy the standard houseboat cruise and fresh-catch BBQ dinners prepared on board.",
    captain: "Captain Daud",
    captainBio:
      "A legendary local fisherman with 25+ years on Temenggor Lake. He knows every honey hole, feeding pattern, and seasonal migration route at Sg Tiang, Sg Gadung, and Sg Ruok. If the fish are biting, Captain Daud will find them.",
    capacity: 14,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Land_and_Sea_Royal_Belum_State_Park.jpg/960px-Land_and_Sea_Royal_Belum_State_Park.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Land_and_Sea_Royal_Belum_State_Park.jpg/960px-Land_and_Sea_Royal_Belum_State_Park.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Temenggor_Lake_West_Bridge_3.jpg/1280px-Temenggor_Lake_West_Bridge_3.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Royal_Belum_State_Park_by_boat.jpg/1920px-Royal_Belum_State_Park_by_boat.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Belum_Rainforest_Resort_-_panoramio.jpg",
    ],
    packages: [
      {
        id: "h6-p1",
        name: "2D1N Angler's Trip",
        duration: "2 Days 1 Night",
        price: 3800,
        pax: 14,
        highlights: [
          "Houseboat cruise to prime fishing spots",
          "Fishing pass included",
          "Pro fishing equipment & fish finder",
          "Dawn & dusk fishing runs by speedboat",
          "Fresh-catch BBQ dinner",
        ],
      },
      {
        id: "h6-p2",
        name: "4D3N Trophy Hunt",
        duration: "4 Days 3 Nights",
        price: 8200,
        pax: 14,
        highlights: [
          "Extended houseboat fishing expedition",
          "Deep-lake fishing at Sg Tiang & Sg Gadung",
          "Remote river mouth exploration",
          "Kelah & Toman targeting sessions",
          "Catch & release certification",
          "All meals & fishing gear included",
        ],
      },
    ],
    amenities: [
      "Pro-grade fishing platforms",
      "Lowrance fish finder",
      "Rod storage (40+ rods)",
      "Live bait well",
      "Tackle & lures provided",
      "Fish cleaning station",
      "Speedboat for fishing runs",
      "BBQ station for fresh catch",
    ],
    rating: 4.93,
    reviews: 95,
    verified: true,
    location: "Sg Tiang, Temenggor Lake",
    category: "Fishing",
    joinedYear: 2020,
    responseTime: "within 1 hour",
    responseRate: 96,
  },
];

/** Flatten all packages from all hosts into bookable listings */
export interface Listing {
  id: string;
  hostId: string;
  hostSlug: string;
  hostName: string;
  captain: string;
  packageName: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  pax: number;
  highlights: string[];
  image: string;
  rating: number;
  reviews: number;
  verified: boolean;
  category: Host["category"];
  tags: string[];
}

export function getAllListings(): Listing[] {
  const listings: Listing[] = [];
  for (const host of hosts) {
    for (const pkg of host.packages) {
      if (pkg.price === 0) continue; // skip custom / rental packages
      listings.push({
        id: pkg.id,
        hostId: host.id,
        hostSlug: host.slug,
        hostName: host.name,
        captain: host.captain,
        packageName: pkg.name,
        title: `${host.name} — ${pkg.name}`,
        description: host.description,
        location: host.location,
        duration: pkg.duration,
        price: pkg.price,
        pax: pkg.pax,
        highlights: pkg.highlights,
        image: host.image,
        rating: host.rating,
        reviews: host.reviews,
        verified: host.verified,
        category: host.category,
        tags: [host.category, pkg.duration, `Up to ${pkg.pax} pax`],
      });
    }
  }
  return listings;
}

export function getHostBySlug(slug: string): Host | undefined {
  return hosts.find((h) => h.slug === slug);
}

export function getHostById(id: string): Host | undefined {
  return hosts.find((h) => h.id === id);
}

export function getListingById(id: string): Listing | undefined {
  return getAllListings().find((l) => l.id === id);
}

export function getListingsByHost(hostId: string): Listing[] {
  return getAllListings().filter((l) => l.hostId === hostId);
}
