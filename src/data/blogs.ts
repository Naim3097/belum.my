export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: "Guide" | "Nature" | "Culture" | "Adventure" | "News";
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-visit-royal-belum",
    title: "The Best Time to Visit Royal Belum Rainforest",
    excerpt:
      "Planning a trip to Temenggor Lake? Here's everything you need to know about seasons, weather patterns, and the best months for different activities.",
    content: `
## When to Go

Royal Belum State Park and Temenggor Lake are accessible year-round, but certain seasons offer distinct advantages depending on what you want to experience.

### Dry Season (February – September)

The dry months are generally the most popular time to visit. The waters of Temenggor Lake are calmer, visibility is better for wildlife spotting, and the waterfall trails are more accessible. **March to May** is considered the sweet spot — warm days, cool nights, and the rainforest is lush from recent rains.

### Wet Season (October – January)

Don't write off the wet season entirely. While afternoon showers are more frequent, the mornings are often clear and the rainforest comes alive with activity. Water levels rise, making previously inaccessible river channels navigable. This is also the best time for:

- **Waterfall enthusiasts** — the cascades are at their most powerful
- **Birdwatchers** — migratory species arrive from October
- **Budget travellers** — fewer crowds mean better availability

### Best Months by Activity

| Activity | Best Months |
|----------|------------|
| Fishing | March – June |
| Bird Watching | October – February |
| Jungle Trekking | February – May |
| Photography | March – April |
| Family Trips | School Holidays |

### What to Pack

Regardless of when you visit, pack light, quick-dry clothing, insect repellent, sunscreen, and a good pair of water-friendly shoes. The lake temperature stays warm (26-30°C) year-round, so you won't need cold-weather gear.

### Getting There

The standard access point is **Jeti Awam Pulau Banding** in Gerik, Perak — approximately 4 hours from Kuala Lumpur via the East-West Highway (Route 4). All houseboat operators on our platform provide detailed directions and can arrange transfers from Gerik town.
    `,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Temenggor_Lake.jpg/1280px-Temenggor_Lake.jpg",
    date: "2025-01-15",
    author: "Editorial Team",
    category: "Guide",
    readTime: "5 min read",
  },
  {
    slug: "guide-to-temenggor-lake-fishing",
    title: "A Complete Guide to Fishing on Temenggor Lake",
    excerpt:
      "From Kelah to Toman, Temenggor Lake is a freshwater angler's paradise. Learn about the species, techniques, and best spots for your fishing trip.",
    content: `
## The Angler's Guide to Temenggor Lake

Temenggor Lake has earned its reputation as one of Southeast Asia's finest freshwater fishing destinations. Formed by the Temenggor Dam on the Perak River, this vast reservoir spans over 15,000 hectares of flooded rainforest, creating an extraordinarily rich aquatic ecosystem.

### Target Species

**Kelah (Malaysian Mahseer)** — The crown jewel of Temenggor fishing. These powerful fish can grow up to 25kg and are found in the deeper, cooler waters near river inflows. Catch-and-release is mandatory for Kelah.

**Toman (Giant Snakehead)** — Aggressive predators that put up an incredible fight. Best targeted around submerged timber and lily pad areas.

**Sebarau (Hampala Barb)** — Fast and acrobatic, these fish are found in schools around rocky points and current lines.

**Baung (Mystus nemurus)** — A prized catfish species that feeds at dawn and dusk. Best caught on live bait near the lake bottom.

### Techniques

- **Casting** — The most popular method, especially for Toman and Sebarau. Use surface lures in the early morning.
- **Trolling** — Effective for covering large areas of open water. Use deep-diving lures for Kelah.
- **Bottom fishing** — Traditional method for Baung, using live bait or cut fish.
- **Fly fishing** — Growing in popularity for Sebarau, especially in river inflows.

### Regulations

- A valid fishing permit from Perak State Parks is required
- Kelah MUST be catch-and-release
- No dynamite, poison, or net fishing
- Respect daily bag limits (check current regulations)

### Our Recommendation

Book with **The Angler** houseboat, captained by the legendary Captain Daud. With 25+ years on these waters, he knows every honey hole, feeding pattern, and seasonal migration route.
    `,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Land_and_Sea_Royal_Belum_State_Park.jpg/960px-Land_and_Sea_Royal_Belum_State_Park.jpg",
    date: "2025-02-08",
    author: "Captain Daud",
    category: "Adventure",
    readTime: "7 min read",
  },
  {
    slug: "orang-asli-cultural-heritage",
    title: "The Orang Asli of Royal Belum: Guardians of the Ancient Forest",
    excerpt:
      "Meet the Jahai and Temiar communities who have called the Royal Belum rainforest home for thousands of years. Their knowledge of this ecosystem is unparalleled.",
    content: `
## Guardians of the Forest

Long before Royal Belum became a state park, long before Temenggor Dam created the lake, the Orang Asli — Malaysia's indigenous peoples — were thriving in this ancient rainforest. The Jahai and Temiar communities of Royal Belum are among the oldest continuous inhabitants of the Malay Peninsula.

### The Jahai People

The Jahai are semi-nomadic hunter-gatherers who have traditionally moved through the forest following seasonal patterns of flowering, fruiting, and animal migration. Their intimate knowledge of the rainforest ecosystem is extraordinary — they can identify hundreds of plant species by sight, sound, and smell, and their medicinal plant knowledge represents an irreplaceable pharmacological library.

### The Temiar People

The Temiar are known for their rich musical traditions and their practice of dream interpretation (known as *senoi*). Their settlements tend to be more permanent than the Jahai, often located along river banks where they practice swidden agriculture alongside hunting and gathering.

### Cultural Experiences

When you visit an Orang Asli village as part of your houseboat trip, you're not just a tourist — you're a guest. Our partner communities welcome visitors who come with respect and genuine curiosity. You may experience:

- **Blowpipe demonstrations** — the traditional hunting tool, crafted from a single piece of bamboo
- **Fire-making** — using traditional friction methods with specific forest materials
- **Traditional weaving** — creating baskets (known as *balai*) from rattan and pandanus leaves
- **Medicinal plants walk** — a guided stroll where elders share knowledge of healing plants
- **Traditional music** — bamboo instruments and rhythmic chanting

### Responsible Tourism

Our operators ensure that all cultural visits are:
- Pre-arranged and welcome by the community
- Compensated fairly — a portion of your trip fee goes directly to the village
- Respectful — no intrusive photography, no touching sacred sites
- Educational — providing genuine cultural exchange, not performance

### Supporting Communities

Several of our houseboat operators, particularly **Casuarina** captained by Captain Zainab, have built long-term relationships with Orang Asli communities. A percentage of booking fees is directed to community-identified needs including clean water systems, educational materials, and healthcare access.
    `,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kampung_Orang_Asli_Sungai_Chendon_1.jpg/1280px-Kampung_Orang_Asli_Sungai_Chendon_1.jpg",
    date: "2025-03-01",
    author: "Captain Zainab",
    category: "Culture",
    readTime: "8 min read",
  },
  {
    slug: "wildlife-spotting-guide-royal-belum",
    title: "Wildlife Spotting in Royal Belum: What You Might See",
    excerpt:
      "Royal Belum is one of the most biodiverse places on Earth. From all 10 Malaysian hornbill species to elusive tigers, here's your wildlife guide.",
    content: `
## A Wildlife Spotter's Paradise

Royal Belum State Park is one of the last great wilderness areas in Peninsular Malaysia. At 130 million years old, it predates both the Amazon and Congo rainforests, and this extraordinary age has produced remarkable biodiversity.

### Mammals

**Asian Elephant** — Herds roam the deeper valleys and salt licks. Best spotted at dawn or dusk near natural mineral deposits.

**Malayan Tiger** — One of the most endangered big cats in the world. Sightings are rare and treasured. Evidence — tracks, scrapes, and camera trap photos — is more commonly found.

**Malayan Tapir** — The largest of the tapir species, recognizable by its distinctive black-and-white colouring. Frequents salt licks.

**Sun Bear** — The world's smallest bear, often seen climbing trees in search of honey. Look for claw marks on Tualang trees.

**White-Handed Gibbon** — Their haunting calls echo through the canopy each morning. Look for them in the upper canopy near fruiting trees.

### Birds

Royal Belum is the only place in Malaysia where all **10 species of hornbill** can be found:

1. Rhinoceros Hornbill
2. Great Hornbill
3. Helmeted Hornbill
4. White-Crowned Hornbill
5. Bushy-Crested Hornbill
6. Wreathed Hornbill
7. Plain-Pouched Hornbill
8. Black Hornbill
9. Oriental Pied Hornbill
10. Wrinkled Hornbill

Over **300 bird species** have been recorded in the park.

### Reptiles & Amphibians

- King Cobra
- Reticulated Python
- Water Monitor Lizard
- Various tree frogs and flying lizards

### Flora

- **Rafflesia** — the world's largest flower (seasonal, January-March)
- **Tualang trees** — up to 80 metres tall, the tallest trees in Southeast Asia
- **Pitcher plants** — carnivorous plants found on highland ridges

### Tips for Wildlife Spotting

1. **Go early** — Dawn is the most active time
2. **Be quiet** — Sound carries far in the forest
3. **Bring binoculars** — Essential for canopy-level wildlife
4. **Trust your guide** — Local knowledge is invaluable
5. **Be patient** — The best sightings come to those who wait
    `,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg/1280px-The_Royal_Belum_State_Park%2C_Perak%2C_Malaysia.jpg",
    date: "2025-03-20",
    author: "Editorial Team",
    category: "Nature",
    readTime: "6 min read",
  },
  {
    slug: "waterfall-trails-royal-belum",
    title: "5 Breathtaking Waterfall Trails in Royal Belum",
    excerpt:
      "From gentle cascades to thundering falls, Royal Belum's waterfall trails offer some of the most rewarding hikes in Peninsular Malaysia.",
    content: `
## Chasing Waterfalls in Royal Belum

The waterfall trails of Royal Belum State Park are among the most spectacular and least-visited in Malaysia. Fed by pristine mountain streams flowing through untouched primary rainforest, each waterfall offers a unique experience.

### 1. Sungai Ruok Falls

The most accessible and popular waterfall destination from Temenggor Lake. A moderate 45-minute trail from the boat landing leads through towering dipterocarp forest to a stunning multi-tiered cascade. The natural pool at the base is perfect for swimming.

**Difficulty:** Moderate | **Time:** 2 hours round trip | **Best season:** Year-round

### 2. Kooi Waterfall (Twin Falls)

Perhaps the most photogenic waterfall in Royal Belum, Kooi features twin streams cascading side by side down a moss-covered rock face. The approach involves a boat ride up a narrow river inlet followed by a short trek.

**Difficulty:** Moderate | **Time:** 3 hours round trip | **Best season:** March - September

### 3. Sungai Kejar Falls

A series of five cascades connected by natural rock slides. Adventurous visitors can slide between pools — a natural water park in the heart of the jungle. Less visited due to its remote location.

**Difficulty:** Challenging | **Time:** 5 hours round trip | **Best season:** February - June

### 4. Sungai Gadong Falls

A hidden gem known only to local guides. The trail passes through some of the oldest and tallest trees in the park, including several massive Tualang trees. The waterfall itself drops 30 metres into a crystal-clear pool.

**Difficulty:** Challenging | **Time:** 6 hours round trip | **Best season:** March - May

### 5. Sungai Papan Falls

The most remote and rewarding waterfall in the list. Accessible only by deep-river boat and a 2-hour jungle trek, this thundering 50-metre cascade is surrounded by pristine primary forest with virtually no human impact.

**Difficulty:** Challenging | **Time:** Full day | **Best season:** March - June

### Essential Tips

- **Always go with a guide** — trails are unmarked and the jungle is dense
- **Wear proper footwear** — the trails are muddy and rocky
- **Bring water and snacks** — there are no facilities
- **Pack a dry bag** — for your phone and camera at swimming spots
- **Leave no trace** — carry all rubbish out with you
    `,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg/720px-Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg",
    date: "2025-04-10",
    author: "Captain Rashid",
    category: "Adventure",
    readTime: "6 min read",
  },
  {
    slug: "conservation-efforts-royal-belum",
    title: "Protecting Paradise: Conservation in Royal Belum",
    excerpt:
      "How local operators, state agencies, and indigenous communities are working together to preserve one of the world's oldest rainforests.",
    content: `
## A Forest Worth Protecting

Royal Belum State Park covers 117,500 hectares of primary rainforest — making it the largest contiguous virgin forest in Peninsular Malaysia. Gazetted as a state park in 2007, it is managed by the Perak State Parks Corporation.

### Why Conservation Matters Here

At 130 million years old, Royal Belum's ecosystem has been evolving since the Cretaceous period. This makes it:

- **Older than the Amazon** (10 million years) and **Congo** (25 million years)
- Home to species found nowhere else on Earth
- A critical water catchment for northern Peninsular Malaysia
- An irreplaceable genetic library of tropical biodiversity

### Current Threats

- Illegal logging at park boundaries
- Poaching of endangered species (tigers, elephants, pangolins)
- Climate change altering rainfall and temperature patterns
- Over-tourism in easily accessible areas

### What's Being Done

**Perak State Parks Corporation** manages enforcement and monitoring, with ranger stations positioned at key access points around the park.

**Wildlife Conservation Society (WCS)** operates camera trap networks monitoring tiger populations and movement corridors.

**Local houseboat operators** serve as additional eyes and ears on the water. Several operators, including Casuarina and Rainforest Explorer, have formal agreements with state agencies to report illegal activities.

**Orang Asli communities** are the original conservationists. Their sustainable land management practices — honed over millennia — are increasingly recognized as vital to the park's long-term health.

### How Tourists Can Help

1. **Choose responsible operators** — Use houseboats committed to conservation
2. **Respect wildlife** — Maintain viewing distances, don't feed animals
3. **Stay on trails** — Reduce habitat disturbance
4. **Support local communities** — Buy handicrafts, engage respectfully
5. **Reduce waste** — Bring reusable items, carry out all rubbish
6. **Spread the word** — Share your experience responsibly on social media

### Our Commitment

Every houseboat operator listed on our platform has signed a conservation charter committing to:
- Zero single-use plastics on board
- Proper waste disposal protocols
- Wildlife disturbance minimisation
- Community benefit sharing
- Annual conservation contribution
    `,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Royal_Belum_State_Park.jpg/1280px-Royal_Belum_State_Park.jpg",
    date: "2025-04-25",
    author: "Editorial Team",
    category: "Nature",
    readTime: "7 min read",
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogsByCategory(category: BlogPost["category"]): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}
