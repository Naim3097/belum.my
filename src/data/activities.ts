export interface Activity {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  category: "Water" | "Jungle" | "Culture" | "Wildlife";
  price: number;
  included: boolean; // true = part of standard houseboat packages
}

export const activities: Activity[] = [
  // ── WATER ACTIVITIES ──────────────────────────────────
  {
    id: "a1",
    slug: "houseboat-cruise",
    title: "Houseboat Cruise",
    description:
      "The core of every Temenggor trip. Cruise across Tasik Temenggor on a fully-equipped houseboat — eat, sleep, and explore the 130-million-year-old rainforest directly from the water. The houseboat serves as your floating basecamp for all other activities.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
    duration: "Full trip",
    difficulty: "Easy",
    category: "Water",
    price: 0,
    included: true,
  },
  {
    id: "a2",
    slug: "kayaking",
    title: "Kayaking",
    description:
      "Paddle through the calm emerald waters of Temenggor Lake, weaving between submerged tree trunks and limestone coves. Morning sessions offer mirror-perfect reflections of the surrounding rainforest canopy. Kayaks and life jackets provided by the houseboat operator.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Land_and_Sea_Royal_Belum_State_Park.jpg/960px-Land_and_Sea_Royal_Belum_State_Park.jpg",
    duration: "2-3 hours",
    difficulty: "Easy",
    category: "Water",
    price: 0,
    included: true,
  },
  {
    id: "a3",
    slug: "bamboo-rafting",
    title: "Bamboo Rafting",
    description:
      "Drift down shaded tributaries on traditional bamboo rafts built the way the Orang Asli have done for generations. A slow, peaceful experience through the heart of the rainforest — perfect for photography and simply being present in nature.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Royal_Belum_State_Park_by_boat.jpg/1920px-Royal_Belum_State_Park_by_boat.jpg",
    duration: "2-3 hours",
    difficulty: "Easy",
    category: "Water",
    price: 0,
    included: true,
  },
  {
    id: "a4",
    slug: "water-tubing",
    title: "Water Tubing",
    description:
      "Hold on tight as you ride inflatable tubes towed by speedboat across the open waters of Tasik Temenggor. A high-energy activity popular with groups, team-building events, and anyone looking for a thrill between the quieter jungle activities.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Royal_Belum_State_Park_on_a_sunny_day.jpg/1280px-Royal_Belum_State_Park_on_a_sunny_day.jpg",
    duration: "1-2 hours",
    difficulty: "Moderate",
    category: "Water",
    price: 80,
    included: false,
  },
  {
    id: "a5",
    slug: "water-confidence",
    title: "Water Confidence Activities",
    description:
      "Guided confidence-building exercises in the calm, controlled waters near the houseboat. Learn basic swimming techniques, floating, and water safety in a supportive environment. Suitable for non-swimmers and beginners of all ages.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg/1280px-The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg",
    duration: "1-2 hours",
    difficulty: "Easy",
    category: "Water",
    price: 0,
    included: true,
  },
  {
    id: "a6",
    slug: "sport-fishing",
    title: "Sport Fishing",
    description:
      "Temenggor Lake is Malaysia's premier freshwater fishing destination. Target Kelah (Malaysian Mahseer), Toman (Giant Snakehead), Sebarau, and Baung with equipment provided. Captain guides you to the best spots at Sg Tiang, Sg Gadung, and Sg Ruok. Requires a fishing pass (add-on).",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Temenggor_Lake_West_Bridge_3.jpg/1280px-Temenggor_Lake_West_Bridge_3.jpg",
    duration: "Full day",
    difficulty: "Easy",
    category: "Water",
    price: 250,
    included: false,
  },
  {
    id: "a7",
    slug: "speedboat-transfer",
    title: "Speedboat Transfer",
    description:
      "All houseboat packages include speedboat transfers to and from activity sites — waterfalls, Orang Asli villages, salt licks, and fishing grounds. The speedboat is your connection between the houseboat and the rainforest interior.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Land_and_Sea_Royal_Belum_State_Park.jpg/960px-Land_and_Sea_Royal_Belum_State_Park.jpg",
    duration: "Varies",
    difficulty: "Easy",
    category: "Water",
    price: 0,
    included: true,
  },

  // ── JUNGLE ACTIVITIES ─────────────────────────────────
  {
    id: "a8",
    slug: "jungle-trekking",
    title: "Jungle Trekking",
    description:
      "Trek through one of the oldest tropical rainforests on Earth — 130 million years old. Guided trails range from gentle canopy walks to challenging ridge lines through Sg Kejar. Spot Rafflesia at Teluk Major and Sg Gadung, wild orchids, and ancient dipterocarp trees towering 60 metres above the forest floor.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Royal_Belum_State_Park.jpg/1280px-Royal_Belum_State_Park.jpg",
    duration: "4-6 hours",
    difficulty: "Moderate",
    category: "Jungle",
    price: 0,
    included: true,
  },
  {
    id: "a9",
    slug: "hiking",
    title: "Hiking",
    description:
      "For those wanting more elevation, guided hikes take you to ridge viewpoints like Towerview Tali Kail, offering panoramic views across the vast lake and unbroken rainforest canopy. Longer expeditions available on 3D2N and 4D3N packages.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg/1280px-The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg",
    duration: "4-8 hours",
    difficulty: "Challenging",
    category: "Jungle",
    price: 0,
    included: true,
  },
  {
    id: "a10",
    slug: "waterfall-expedition",
    title: "Waterfall Expedition",
    description:
      "Journey into Royal Belum to discover waterfalls accessible only by boat and foot. Visit Waterfall Sg Kooi (the twin-flow crown jewel), Sg Papan, and Sg Nam. Cool off in natural plunge pools surrounded by pristine jungle. Included as a visit activity in houseboat packages.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg/720px-Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg",
    duration: "Half day",
    difficulty: "Moderate",
    category: "Jungle",
    price: 0,
    included: true,
  },
  {
    id: "a11",
    slug: "camping",
    title: "Camping & Campsite Setup",
    description:
      "Set up camp at remote sites deep within Royal Belum — away from civilisation, under the canopy, by the water's edge. Available on extended expedition packages. Camping equipment, fire setup, and guided overnight jungle experiences provided by the operator.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Royal_Belum_State_Park_by_boat.jpg/1920px-Royal_Belum_State_Park_by_boat.jpg",
    duration: "Overnight",
    difficulty: "Moderate",
    category: "Jungle",
    price: 150,
    included: false,
  },

  // ── CULTURE ACTIVITIES ────────────────────────────────
  {
    id: "a12",
    slug: "orang-asli-village",
    title: "Orang Asli Village Visit",
    description:
      "Visit the Jahai Orang Asli community at Kg Klewang along the waterways of Royal Belum. Learn about traditional blowpipe crafting, medicinal plants, and a way of life that has endured for thousands of years in harmony with the rainforest. A visit activity included in most houseboat packages.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kampung_Orang_Asli_Sungai_Chendon_1.jpg/1280px-Kampung_Orang_Asli_Sungai_Chendon_1.jpg",
    duration: "3-4 hours",
    difficulty: "Easy",
    category: "Culture",
    price: 0,
    included: true,
  },
  {
    id: "a13",
    slug: "sewang-experience",
    title: "Sewang Cultural Experience",
    description:
      "Witness the Sewang — a traditional Orang Asli ceremony of music, dance, and spiritual expression. This is not a performance for tourists; it is a living cultural tradition shared by the community. Available through operators who work directly with Orang Asli communities.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kampung_Orang_Asli_Sungai_Chendon_2.jpg/1280px-Kampung_Orang_Asli_Sungai_Chendon_2.jpg",
    duration: "2-3 hours",
    difficulty: "Easy",
    category: "Culture",
    price: 100,
    included: false,
  },

  // ── WILDLIFE ACTIVITIES ───────────────────────────────
  {
    id: "a14",
    slug: "salt-lick-observation",
    title: "Salt Lick Wildlife Observation",
    description:
      "Wait in camouflaged hides at natural salt licks deep within Royal Belum, including the Sanctuary at Sg Ruok. Observe elephants, tapirs, sun bears, and various deer species as they emerge to feed. Dawn sessions offer the best sightings. Included as a visit activity on most packages.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Royal_Belum_State_Park_on_a_sunny_day.jpg/1280px-Royal_Belum_State_Park_on_a_sunny_day.jpg",
    duration: "4-5 hours",
    difficulty: "Moderate",
    category: "Wildlife",
    price: 0,
    included: true,
  },
  {
    id: "a15",
    slug: "morning-safari",
    title: "Morning Safari",
    description:
      "An early-morning speedboat cruise along the lake's tributaries to observe wildlife waking up. Spot proboscis monkeys, macaques, hornbills, kingfishers, and eagles along the water's edge as the mist lifts off the lake.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
    duration: "2-3 hours",
    difficulty: "Easy",
    category: "Wildlife",
    price: 0,
    included: true,
  },
  {
    id: "a16",
    slug: "bird-watching",
    title: "Bird Watching",
    description:
      "Royal Belum is home to all 10 species of hornbill found in Malaysia. Cruise the quiet tributaries at dawn to spot hornbills, kingfishers, eagles, and over 300 recorded bird species. Expert guides available on request.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Royal_Belum_State_Park_by_boat.jpg/1920px-Royal_Belum_State_Park_by_boat.jpg",
    duration: "3-4 hours",
    difficulty: "Easy",
    category: "Wildlife",
    price: 0,
    included: true,
  },
  {
    id: "a17",
    slug: "night-safari",
    title: "Night Safari",
    description:
      "Experience the rainforest after dark with a guided night cruise along the lake's shoreline. Spotlight nocturnal wildlife — slow lorises, civets, the elusive flat-headed cat, and fishing owls. Listen to the chorus of frogs and insects that transforms the jungle at night.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg/1280px-The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg",
    duration: "2-3 hours",
    difficulty: "Easy",
    category: "Wildlife",
    price: 0,
    included: true,
  },
  {
    id: "a18",
    slug: "sunset-viewing",
    title: "Sunset Viewing",
    description:
      "Watch the sun set over the unbroken rainforest canopy from the observation deck of your houseboat. On clear evenings, the sky turns gold and pink over Tasik Temenggor — a daily ritual that never gets old.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
    duration: "1 hour",
    difficulty: "Easy",
    category: "Wildlife",
    price: 0,
    included: true,
  },
  {
    id: "a19",
    slug: "star-gazing",
    title: "Star Gazing",
    description:
      "Far from city light pollution, Temenggor Lake offers some of the darkest skies in Peninsular Malaysia. Lie on the houseboat deck and map constellations, spot satellites, and enjoy the Milky Way stretching overhead. Best during new moon phases.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Royal_Belum_State_Park_on_a_sunny_day.jpg/1280px-Royal_Belum_State_Park_on_a_sunny_day.jpg",
    duration: "1-2 hours",
    difficulty: "Easy",
    category: "Wildlife",
    price: 0,
    included: true,
  },
];

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}
