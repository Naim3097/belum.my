-- ============================================================
-- Belum Platform — Phase 1 seed
-- Migrates the previously hardcoded operators, packages, and
-- activities (src/data/*.ts) into the database.
--
-- Idempotent: safe to re-run. Operators/activities upsert on their
-- unique slug; packages are rebuilt from scratch each run.
--
-- Seeded operators have owner_id = NULL (no auth account yet); a real
-- operator account can be linked later by setting owner_id.
-- Dollar-quoting ($t$...$t$) avoids escaping apostrophes in prose.
-- ============================================================

-- ── Operators ───────────────────────────────────────────
insert into public.operators
  (slug, name, tagline, description, long_description, captain, captain_bio,
   capacity, image, gallery, amenities, rating, reviews_count, verified,
   location, category, joined_year, response_time, response_rate, is_published)
values
(
  $t$the-temenggor$t$, $t$The Temenggor$t$, $t$Back to Nature$t$,
  $t$The original Temenggor houseboat — a floating basecamp for rainforest cruises, bamboo rafting, kayaking, and guided visits into Royal Belum. Departs from Jeti Awam Pulau Banding.$t$,
  $t$The Temenggor is the flagship houseboat operated by The Temenggor Ventures, moored at Jeti Awam Pulau Banding, Gerik, Perak. With a capacity of 25 persons, every trip includes a houseboat cruise across Tasik Temenggor, speedboat transfers to activity sites, kayaking, bamboo rafting, and guided visits to locations like Waterfall Sg Kooi, Orang Asli Kg Klewang, Batu Putih Cave, and the Rafflesia sites at Teluk Major. Add-on options include fishing passes, special occasion arrangements, and full F&B packages covering breakfast, lunch, tea break, dinner, and BBQ. This is not a resort — it is a working houseboat where you eat, sleep, and explore the 130-million-year-old rainforest directly from the water.$t$,
  $t$Captain Azman$t$,
  $t$A veteran of Temenggor Lake with over 12 years navigating these waters. Captain Azman knows every tributary, fishing spot, and waterfall access point on the lake. He grew up in the Gerik community and works closely with local Orang Asli guides.$t$,
  25, $t$/images/houseboat-01.png$t$,
  array[$t$/images/houseboat-01.png$t$,$t$/images/houseboat-02.png$t$,$t$/images/houseboat-03.png$t$,$t$/images/houseboat-04.png$t$,$t$/images/houseboat-05.png$t$]::text[],
  array[$t$Sleeping quarters for 25 pax$t$,$t$Full kitchen & communal dining$t$,$t$Covered observation deck$t$,$t$Fishing platforms$t$,$t$Life jackets & safety gear$t$,$t$Toilet & shower facilities$t$,$t$BBQ station$t$,$t$Speedboat for transfers$t$]::text[],
  4.9, 127, true, $t$Jeti Awam Pulau Banding, Gerik$t$, $t$Houseboat$t$, 2022, $t$within 1 hour$t$, 99, true
),
(
  $t$blue-fern-houseboat$t$, $t$Blue Fern Houseboat$t$, $t$Comfort on the Lake$t$,
  $t$A well-maintained houseboat with air-conditioned sleeping areas and a dedicated cook. Blue Fern offers houseboat cruises with kayaking, bamboo rafting, and guided waterfall visits on Temenggor Lake.$t$,
  $t$Blue Fern Houseboat operates from Pulau Banding and caters to smaller groups who want a comfortable houseboat experience without the crowds. The vessel features air-conditioned sleeping quarters, a proper galley kitchen with a dedicated cook who prepares local Malay cuisine, and a spacious upper deck for sunset viewing and stargazing. Every trip includes speedboat transfers to activities — kayaking on the calm lake waters, bamboo rafting through shaded tributaries, and guided visits to Royal Belum's waterfalls and Orang Asli villages. The crew is from the local Gerik community and brings genuine knowledge of the area's wildlife, plants, and cultural heritage.$t$,
  $t$Captain Haris$t$,
  $t$Captain Haris has been operating houseboats on Temenggor Lake for 8 years. He is known for his calm, safety-first approach and his skill at finding the best sunset spots and fishing grounds along the lake.$t$,
  16, $t$/images/houseboat-06.png$t$,
  array[$t$/images/houseboat-06.png$t$,$t$/images/houseboat-07.png$t$,$t$/images/houseboat-04.png$t$,$t$/images/houseboat-01.png$t$,$t$/images/houseboat-08.png$t$]::text[],
  array[$t$Air-conditioned sleeping quarters$t$,$t$Upper deck lounge$t$,$t$Onboard cook & kitchen$t$,$t$Fishing rods available$t$,$t$Kayaks & life jackets$t$,$t$Hot shower facilities$t$,$t$BBQ equipment$t$,$t$Speedboat for transfers$t$]::text[],
  4.87, 89, true, $t$Pulau Banding, Temenggor Lake$t$, $t$Houseboat$t$, 2021, $t$within 2 hours$t$, 97, true
),
(
  $t$casuarina-eco-boat$t$, $t$Casuarina Eco Boat$t$, $t$Community & Conservation$t$,
  $t$An eco-conscious houseboat focused on community engagement. Casuarina works directly with Orang Asli communities for village visits, Sewang cultural experiences, and guided jungle treks.$t$,
  $t$Casuarina Eco Boat is operated in close partnership with the Jahai Orang Asli community along the waterways of Royal Belum. Solar panels supplement power, and the houseboat uses locally sourced bamboo furnishings. What makes Casuarina different is its community-first approach — every trip includes an extended Orang Asli village visit at Kg Klewang, a traditional Sewang cultural experience, and guided jungle trekking led by Orang Asli trackers who know the rainforest intimately. Captain Zainab, one of the few female houseboat operators on the lake, ensures that a portion of every booking goes directly back to the communities that make these experiences possible. Activities include bamboo rafting, kayaking, waterfall visits, and conservation talks.$t$,
  $t$Captain Zainab$t$,
  $t$One of the few female houseboat operators on Temenggor Lake. Captain Zainab is a passionate conservationist who has built lasting relationships with Orang Asli communities and runs community-benefit tourism programs.$t$,
  20, $t$/images/houseboat-09.png$t$,
  array[$t$/images/houseboat-09.png$t$,$t$/images/houseboat-05.png$t$,$t$/images/houseboat-10.png$t$,$t$/images/houseboat-11.png$t$,$t$/images/houseboat-03.png$t$]::text[],
  array[$t$Solar-powered lighting$t$,$t$Bamboo & reclaimed wood interiors$t$,$t$Community engagement program$t$,$t$Kayaks & bamboo rafts$t$,$t$Life jackets & safety gear$t$,$t$Basic shower & toilet facilities$t$,$t$Speedboat for transfers$t$,$t$Orang Asli guide included$t$]::text[],
  4.85, 64, true, $t$Sg Chendon, Temenggor Lake$t$, $t$Eco$t$, 2022, $t$within 3 hours$t$, 95, true
),
(
  $t$rainforest-explorer$t$, $t$Rainforest Explorer$t$, $t$Into the Deep Jungle$t$,
  $t$A rugged houseboat built for adventure — jungle trekking, hiking, night safari, camping, and deep exploration of Royal Belum's remote tributaries and hidden waterfalls.$t$,
  $t$Rainforest Explorer is the adventure-seeker's houseboat. Originally built for research expeditions into the deeper reaches of Royal Belum, this vessel has reinforced hulls and expanded gear storage for accessing narrower waterways that larger houseboats cannot reach. Captain Rashid, a former Perak State Park ranger with 15 years of deep-jungle expertise, leads every expedition. Activities go beyond the usual — multi-day jungle trekking to Sg Kejar, hiking to the Towerview Tali Kail ridge, night safari along the lakeshore, campsite setup at remote sites, and water confidence activities. Every trip includes the standard houseboat cruise, speedboat transfers, kayaking, and bamboo rafting, but the focus here is going deeper into the rainforest than any other operator.$t$,
  $t$Captain Rashid$t$,
  $t$Former Perak State Park ranger with 15 years of deep-jungle expertise. If there's a hidden waterfall or unmarked trail in Royal Belum, Captain Rashid has mapped it. He also runs the water confidence and survival skills programs.$t$,
  18, $t$/images/houseboat-02.png$t$,
  array[$t$/images/houseboat-02.png$t$,$t$/images/houseboat-12.png$t$,$t$/images/houseboat-05.png$t$,$t$/images/houseboat-09.png$t$,$t$/images/houseboat-07.png$t$]::text[],
  array[$t$Reinforced aluminium hull$t$,$t$Expedition gear storage$t$,$t$Speedboat & river boats$t$,$t$First aid station$t$,$t$Drying room for wet gear$t$,$t$Camping equipment provided$t$,$t$Satellite communication$t$,$t$Life jackets & safety gear$t$]::text[],
  4.95, 52, true, $t$Royal Belum State Park$t$, $t$Adventure$t$, 2021, $t$within 4 hours$t$, 92, true
),
(
  $t$belum-star$t$, $t$Belum Star$t$, $t$Family-Friendly Houseboat$t$,
  $t$Designed for families with children. Safety-first houseboat with kid-friendly activities, educational nature programs, and gentle water activities on Temenggor Lake.$t$,
  $t$Belum Star was built with families in mind — every child deserves to experience the magic of Temenggor Lake safely. The houseboat has child-safe railings, shallow-water activity zones, and an educational naturalist program for young explorers aged 5-15. Captain Mei Ling, a mother of three and certified nature educator, has crafted a unique houseboat experience where learning and adventure go hand in hand. Trips include the standard houseboat cruise, speedboat transfers, gentle kayaking, bamboo rafting, and visits to waterfalls and Orang Asli villages — all at a pace suitable for families. Add-ons include fishing passes and special celebration arrangements for birthdays and anniversaries.$t$,
  $t$Captain Mei Ling$t$,
  $t$Mother of three and certified nature educator. Her Junior Ranger program on the houseboat has taught over 500 children to appreciate the rainforest. She ensures every activity is safe and engaging for all ages.$t$,
  22, $t$/images/houseboat-03.png$t$,
  array[$t$/images/houseboat-03.png$t$,$t$/images/houseboat-11.png$t$,$t$/images/houseboat-08.png$t$,$t$/images/houseboat-10.png$t$,$t$/images/houseboat-01.png$t$]::text[],
  array[$t$Child-safe railings & nets$t$,$t$Shallow-water activity zone$t$,$t$Board games & books library$t$,$t$Family sleeping quarters$t$,$t$Speedboat for transfers$t$,$t$Sun-shaded play deck$t$,$t$Life jackets (all sizes incl. children)$t$,$t$BBQ station$t$]::text[],
  4.88, 78, true, $t$Pulau Banding, Temenggor Lake$t$, $t$Family$t$, 2023, $t$within 2 hours$t$, 98, true
),
(
  $t$the-angler$t$, $t$The Angler$t$, $t$Sport Fishing Houseboat$t$,
  $t$Purpose-built for sport fishing on Temenggor Lake. Pro-grade equipment, fish finder, and a captain who knows every honey hole — targeting Kelah, Toman, Sebarau, and Baung.$t$,
  $t$Temenggor Lake is Malaysia's premier freshwater fishing destination, home to Kelah (Malaysian Mahseer), Toman (Giant Snakehead), Baung, Sebarau, and dozens more species. The Angler is a houseboat purpose-built for serious sport fishing. Professional-grade fishing platforms extend from both sides, Lowrance fish finders guide you to the best spots, and rod storage holds 40+ rods. Captain Daud, a legendary local fisherman with 25+ years on Temenggor Lake, shares his deep knowledge of seasonal patterns, feeding grounds at Sg Tiang and Sg Gadung, and the art of landing a monster Kelah. Fishing passes are included in every package. Between fishing sessions, enjoy the standard houseboat cruise and fresh-catch BBQ dinners prepared on board.$t$,
  $t$Captain Daud$t$,
  $t$A legendary local fisherman with 25+ years on Temenggor Lake. He knows every honey hole, feeding pattern, and seasonal migration route at Sg Tiang, Sg Gadung, and Sg Ruok. If the fish are biting, Captain Daud will find them.$t$,
  14, $t$/images/houseboat-07.png$t$,
  array[$t$/images/houseboat-07.png$t$,$t$/images/houseboat-01.png$t$,$t$/images/houseboat-12.png$t$,$t$/images/houseboat-02.png$t$,$t$/images/houseboat-08.png$t$]::text[],
  array[$t$Pro-grade fishing platforms$t$,$t$Lowrance fish finder$t$,$t$Rod storage (40+ rods)$t$,$t$Live bait well$t$,$t$Tackle & lures provided$t$,$t$Fish cleaning station$t$,$t$Speedboat for fishing runs$t$,$t$BBQ station for fresh catch$t$]::text[],
  4.93, 95, true, $t$Sg Tiang, Temenggor Lake$t$, $t$Fishing$t$, 2020, $t$within 1 hour$t$, 96, true
)
on conflict (slug) do nothing;

-- ── Packages ────────────────────────────────────────────
-- Rebuild cleanly so re-running the seed doesn't duplicate rows.
delete from public.packages
where operator_id in (select id from public.operators);

insert into public.packages (operator_id, name, duration, price, pax, highlights, is_active)
select o.id, v.name, v.duration, v.price, v.pax, v.highlights, true
from (values
  ($t$the-temenggor$t$, $t$2D1N Houseboat Cruise$t$, $t$2 Days 1 Night$t$, 3500::numeric, 25,
    array[$t$Houseboat cruise on Tasik Temenggor$t$,$t$Speedboat transfer to activity sites$t$,$t$Kayaking & bamboo rafting$t$,$t$2 visit activities (waterfall / village / cave)$t$,$t$Royal Belum Pass included$t$,$t$BBQ dinner on the houseboat$t$]::text[]),
  ($t$the-temenggor$t$, $t$3D2N Houseboat Cruise$t$, $t$3 Days 2 Nights$t$, 5500, 25,
    array[$t$Extended houseboat cruise$t$,$t$Speedboat transfer to activity sites$t$,$t$Kayaking & bamboo rafting$t$,$t$3 visit activities (waterfall / village / salt lick / cave)$t$,$t$Royal Belum Pass included$t$,$t$All meals included (breakfast, lunch, dinner, BBQ)$t$]::text[]),
  ($t$the-temenggor$t$, $t$Houseboat Rental / Event$t$, $t$Custom$t$, 0, 25,
    array[$t$Team building & corporate retreats$t$,$t$Family gatherings & reunions$t$,$t$Fishing tournaments$t$,$t$Weddings & special occasions$t$,$t$CSR programs$t$,$t$Custom itinerary & event coordination$t$]::text[]),

  ($t$blue-fern-houseboat$t$, $t$2D1N Lake Cruise$t$, $t$2 Days 1 Night$t$, 3200, 16,
    array[$t$Houseboat cruise with air-conditioned quarters$t$,$t$Speedboat transfer to waterfall & village$t$,$t$Kayaking session$t$,$t$Sunset viewing from upper deck$t$,$t$Meals by onboard cook$t$]::text[]),
  ($t$blue-fern-houseboat$t$, $t$3D2N Full Experience$t$, $t$3 Days 2 Nights$t$, 5000, 16,
    array[$t$Extended cruise across Tasik Temenggor$t$,$t$Bamboo rafting & kayaking$t$,$t$Waterfall visit (Sg Kooi / Sg Papan)$t$,$t$Orang Asli village cultural visit$t$,$t$Morning safari & bird watching$t$,$t$All meals included$t$]::text[]),

  ($t$casuarina-eco-boat$t$, $t$2D1N Community & Nature$t$, $t$2 Days 1 Night$t$, 2800, 20,
    array[$t$Houseboat cruise on Tasik Temenggor$t$,$t$Orang Asli village visit (Kg Klewang)$t$,$t$Sewang cultural experience$t$,$t$Bamboo rafting & kayaking$t$,$t$Traditional cooking with local ingredients$t$]::text[]),
  ($t$casuarina-eco-boat$t$, $t$3D2N Deep Community$t$, $t$3 Days 2 Nights$t$, 4200, 20,
    array[$t$Extended houseboat cruise$t$,$t$Orang Asli village stay & cultural exchange$t$,$t$Jungle trekking with Orang Asli guides$t$,$t$Waterfall visit (Sg Kooi)$t$,$t$Bamboo raft building workshop$t$,$t$Organic meals from local produce$t$]::text[]),

  ($t$rainforest-explorer$t$, $t$2D1N Adventure Cruise$t$, $t$2 Days 1 Night$t$, 3200, 18,
    array[$t$Houseboat cruise & speedboat transfers$t$,$t$Guided jungle trekking (Sg Kejar)$t$,$t$Kayaking & bamboo rafting$t$,$t$Water confidence activities$t$,$t$Campfire & stargazing session$t$]::text[]),
  ($t$rainforest-explorer$t$, $t$4D3N Deep Expedition$t$, $t$4 Days 3 Nights$t$, 7800, 18,
    array[$t$Multi-day houseboat expedition$t$,$t$Deep jungle trek & hiking (Towerview Tali Kail)$t$,$t$Remote waterfall discovery (Sg Nam / Sg Papan)$t$,$t$Night safari along lakeshore$t$,$t$Camping & campsite setup at remote sites$t$,$t$Water tubing & water confidence activities$t$,$t$All meals & expedition gear provided$t$]::text[]),

  ($t$belum-star$t$, $t$2D1N Family Cruise$t$, $t$2 Days 1 Night$t$, 3000, 22,
    array[$t$Houseboat cruise with child-safe setup$t$,$t$Gentle kayaking & bamboo rafting$t$,$t$Waterfall visit (shallow pool area)$t$,$t$Junior Ranger nature program$t$,$t$Kid-friendly meals & snacks$t$]::text[]),
  ($t$belum-star$t$, $t$3D2N Family Explorer$t$, $t$3 Days 2 Nights$t$, 4800, 22,
    array[$t$Extended family houseboat cruise$t$,$t$Orang Asli village cultural workshop$t$,$t$Waterfall picnic & nature walk$t$,$t$Star gazing session from the deck$t$,$t$Bird watching morning safari$t$,$t$All meals included$t$]::text[]),

  ($t$the-angler$t$, $t$2D1N Angler's Trip$t$, $t$2 Days 1 Night$t$, 3800, 14,
    array[$t$Houseboat cruise to prime fishing spots$t$,$t$Fishing pass included$t$,$t$Pro fishing equipment & fish finder$t$,$t$Dawn & dusk fishing runs by speedboat$t$,$t$Fresh-catch BBQ dinner$t$]::text[]),
  ($t$the-angler$t$, $t$4D3N Trophy Hunt$t$, $t$4 Days 3 Nights$t$, 8200, 14,
    array[$t$Extended houseboat fishing expedition$t$,$t$Deep-lake fishing at Sg Tiang & Sg Gadung$t$,$t$Remote river mouth exploration$t$,$t$Kelah & Toman targeting sessions$t$,$t$Catch & release certification$t$,$t$All meals & fishing gear included$t$]::text[])
) as v(slug, name, duration, price, pax, highlights)
join public.operators o on o.slug = v.slug;

-- ── Activities (global catalog) ─────────────────────────
insert into public.activities (slug, title, description, image, duration, difficulty, category, price, included)
values
($t$houseboat-cruise$t$, $t$Houseboat Cruise$t$, $t$The core of every Temenggor trip. Cruise across Tasik Temenggor on a fully-equipped houseboat — eat, sleep, and explore the 130-million-year-old rainforest directly from the water. The houseboat serves as your floating basecamp for all other activities.$t$, $t$/images/houseboat-01.png$t$, $t$Full trip$t$, $t$Easy$t$, $t$Water$t$, 0, true),
($t$kayaking$t$, $t$Kayaking$t$, $t$Paddle through the calm emerald waters of Temenggor Lake, weaving between submerged tree trunks and limestone coves. Morning sessions offer mirror-perfect reflections of the surrounding rainforest canopy. Kayaks and life jackets provided by the houseboat operator.$t$, $t$/images/houseboat-07.png$t$, $t$2-3 hours$t$, $t$Easy$t$, $t$Water$t$, 0, true),
($t$bamboo-rafting$t$, $t$Bamboo Rafting$t$, $t$Drift down shaded tributaries on traditional bamboo rafts built the way the Orang Asli have done for generations. A slow, peaceful experience through the heart of the rainforest — perfect for photography and simply being present in nature.$t$, $t$/images/houseboat-02.png$t$, $t$2-3 hours$t$, $t$Easy$t$, $t$Water$t$, 0, true),
($t$water-tubing$t$, $t$Water Tubing$t$, $t$Hold on tight as you ride inflatable tubes towed by speedboat across the open waters of Tasik Temenggor. A high-energy activity popular with groups, team-building events, and anyone looking for a thrill between the quieter jungle activities.$t$, $t$/images/houseboat-03.png$t$, $t$1-2 hours$t$, $t$Moderate$t$, $t$Water$t$, 80, false),
($t$water-confidence$t$, $t$Water Confidence Activities$t$, $t$Guided confidence-building exercises in the calm, controlled waters near the houseboat. Learn basic swimming techniques, floating, and water safety in a supportive environment. Suitable for non-swimmers and beginners of all ages.$t$, $t$/images/houseboat-04.png$t$, $t$1-2 hours$t$, $t$Easy$t$, $t$Water$t$, 0, true),
($t$sport-fishing$t$, $t$Sport Fishing$t$, $t$Temenggor Lake is Malaysia's premier freshwater fishing destination. Target Kelah (Malaysian Mahseer), Toman (Giant Snakehead), Sebarau, and Baung with equipment provided. Captain guides you to the best spots at Sg Tiang, Sg Gadung, and Sg Ruok. Requires a fishing pass (add-on).$t$, $t$/images/houseboat-12.png$t$, $t$Full day$t$, $t$Easy$t$, $t$Water$t$, 250, false),
($t$speedboat-transfer$t$, $t$Speedboat Transfer$t$, $t$All houseboat packages include speedboat transfers to and from activity sites — waterfalls, Orang Asli villages, salt licks, and fishing grounds. The speedboat is your connection between the houseboat and the rainforest interior.$t$, $t$/images/houseboat-07.png$t$, $t$Varies$t$, $t$Easy$t$, $t$Water$t$, 0, true),
($t$jungle-trekking$t$, $t$Jungle Trekking$t$, $t$Trek through one of the oldest tropical rainforests on Earth — 130 million years old. Guided trails range from gentle canopy walks to challenging ridge lines through Sg Kejar. Spot Rafflesia at Teluk Major and Sg Gadung, wild orchids, and ancient dipterocarp trees towering 60 metres above the forest floor.$t$, $t$/images/houseboat-09.png$t$, $t$4-6 hours$t$, $t$Moderate$t$, $t$Jungle$t$, 0, true),
($t$hiking$t$, $t$Hiking$t$, $t$For those wanting more elevation, guided hikes take you to ridge viewpoints like Towerview Tali Kail, offering panoramic views across the vast lake and unbroken rainforest canopy. Longer expeditions available on 3D2N and 4D3N packages.$t$, $t$/images/houseboat-04.png$t$, $t$4-8 hours$t$, $t$Challenging$t$, $t$Jungle$t$, 0, true),
($t$waterfall-expedition$t$, $t$Waterfall Expedition$t$, $t$Journey into Royal Belum to discover waterfalls accessible only by boat and foot. Visit Waterfall Sg Kooi (the twin-flow crown jewel), Sg Papan, and Sg Nam. Cool off in natural plunge pools surrounded by pristine jungle. Included as a visit activity in houseboat packages.$t$, $t$/images/houseboat-05.png$t$, $t$Half day$t$, $t$Moderate$t$, $t$Jungle$t$, 0, true),
($t$camping$t$, $t$Camping & Campsite Setup$t$, $t$Set up camp at remote sites deep within Royal Belum — away from civilisation, under the canopy, by the water's edge. Available on extended expedition packages. Camping equipment, fire setup, and guided overnight jungle experiences provided by the operator.$t$, $t$/images/houseboat-02.png$t$, $t$Overnight$t$, $t$Moderate$t$, $t$Jungle$t$, 150, false),
($t$orang-asli-village$t$, $t$Orang Asli Village Visit$t$, $t$Visit the Jahai Orang Asli community at Kg Klewang along the waterways of Royal Belum. Learn about traditional blowpipe crafting, medicinal plants, and a way of life that has endured for thousands of years in harmony with the rainforest. A visit activity included in most houseboat packages.$t$, $t$/images/houseboat-10.png$t$, $t$3-4 hours$t$, $t$Easy$t$, $t$Culture$t$, 0, true),
($t$sewang-experience$t$, $t$Sewang Cultural Experience$t$, $t$Witness the Sewang — a traditional Orang Asli ceremony of music, dance, and spiritual expression. This is not a performance for tourists; it is a living cultural tradition shared by the community. Available through operators who work directly with Orang Asli communities.$t$, $t$/images/houseboat-11.png$t$, $t$2-3 hours$t$, $t$Easy$t$, $t$Culture$t$, 100, false),
($t$salt-lick-observation$t$, $t$Salt Lick Wildlife Observation$t$, $t$Wait in camouflaged hides at natural salt licks deep within Royal Belum, including the Sanctuary at Sg Ruok. Observe elephants, tapirs, sun bears, and various deer species as they emerge to feed. Dawn sessions offer the best sightings. Included as a visit activity on most packages.$t$, $t$/images/houseboat-03.png$t$, $t$4-5 hours$t$, $t$Moderate$t$, $t$Wildlife$t$, 0, true),
($t$morning-safari$t$, $t$Morning Safari$t$, $t$An early-morning speedboat cruise along the lake's tributaries to observe wildlife waking up. Spot proboscis monkeys, macaques, hornbills, kingfishers, and eagles along the water's edge as the mist lifts off the lake.$t$, $t$/images/houseboat-01.png$t$, $t$2-3 hours$t$, $t$Easy$t$, $t$Wildlife$t$, 0, true),
($t$bird-watching$t$, $t$Bird Watching$t$, $t$Royal Belum is home to all 10 species of hornbill found in Malaysia. Cruise the quiet tributaries at dawn to spot hornbills, kingfishers, eagles, and over 300 recorded bird species. Expert guides available on request.$t$, $t$/images/houseboat-02.png$t$, $t$3-4 hours$t$, $t$Easy$t$, $t$Wildlife$t$, 0, true),
($t$night-safari$t$, $t$Night Safari$t$, $t$Experience the rainforest after dark with a guided night cruise along the lake's shoreline. Spotlight nocturnal wildlife — slow lorises, civets, the elusive flat-headed cat, and fishing owls. Listen to the chorus of frogs and insects that transforms the jungle at night.$t$, $t$/images/houseboat-04.png$t$, $t$2-3 hours$t$, $t$Easy$t$, $t$Wildlife$t$, 0, true),
($t$sunset-viewing$t$, $t$Sunset Viewing$t$, $t$Watch the sun set over the unbroken rainforest canopy from the observation deck of your houseboat. On clear evenings, the sky turns gold and pink over Tasik Temenggor — a daily ritual that never gets old.$t$, $t$/images/houseboat-01.png$t$, $t$1 hour$t$, $t$Easy$t$, $t$Wildlife$t$, 0, true),
($t$star-gazing$t$, $t$Star Gazing$t$, $t$Far from city light pollution, Temenggor Lake offers some of the darkest skies in Peninsular Malaysia. Lie on the houseboat deck and map constellations, spot satellites, and enjoy the Milky Way stretching overhead. Best during new moon phases.$t$, $t$/images/houseboat-03.png$t$, $t$1-2 hours$t$, $t$Easy$t$, $t$Wildlife$t$, 0, true)
on conflict (slug) do nothing;
