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
      "/images/houseboat-01.png",
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
      "/images/houseboat-07.png",
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
      "/images/houseboat-02.png",
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
      "/images/houseboat-03.png",
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
      "/images/houseboat-04.png",
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
      "/images/houseboat-12.png",
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
      "/images/houseboat-07.png",
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
      "/images/houseboat-09.png",
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
      "/images/houseboat-04.png",
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
      "/images/houseboat-05.png",
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
      "/images/houseboat-02.png",
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
      "/images/houseboat-10.png",
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
      "/images/houseboat-11.png",
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
      "/images/houseboat-03.png",
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
      "/images/houseboat-01.png",
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
      "/images/houseboat-02.png",
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
      "/images/houseboat-04.png",
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
      "/images/houseboat-01.png",
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
      "/images/houseboat-03.png",
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
