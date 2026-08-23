import aboutBackdrop from "../assets/photos/about-backdrop.webp";
import contactBackdrop from "../assets/photos/contact-backdrop.webp";
import ksheeraTempleImg from "../assets/photos/place-ksheera-temple.webp";
import bhimavaramImg from "../assets/photos/place-bhimavaram.webp";
import antarvediImg from "../assets/photos/place-antarvedi.webp";
import perupalemImg from "../assets/photos/place-perupalem.webp";
import dindiImg from "../assets/photos/place-dindi.webp";
import kolleruImg from "../assets/photos/place-kolleru.webp";
import undiImg from "../assets/photos/place-undi.webp";
import narasapuramImg from "../assets/photos/place-narasapuram.webp";
import packageTempleRiverImg from "../assets/photos/package-temple-river.webp";
import packageDeltaExplorerImg from "../assets/photos/package-delta-explorer.webp";
import packageKonaseemaImg from "../assets/photos/package-konaseema.webp";

export const ABOUT_BACKDROP = aboutBackdrop;
export const CONTACT_BACKDROP = contactBackdrop;

export const ABOUT_PILLARS = [
  {
    num: "01",
    title: "Pancharama temple town",
    body: "Palakollu is home to the Ksheera Ramalingeswara Swamy temple, one of the five sacred Pancharama Kshetras on the Godavari delta.",
  },
  {
    num: "02",
    title: "Canals & coconut country",
    body: "The surrounding villages sit between paddy fields, coconut groves and the branching canals of the Godavari — best seen slowly, by road and by boat.",
  },
  {
    num: "03",
    title: "Where the river meets the sea",
    body: "Nearby Antarvedi and the coast at Perupalem mark the delta's edge — a short, scenic run from town.",
  },
];

export const GODAVARI_FACTS = [
  {
    stat: "1,465 km",
    label: "Second-longest river in India",
    body: "The Godavari rises at Brahmagiri Hill near Trimbakeshwar in Maharashtra and travels the length of the subcontinent — a catchment larger than England and Ireland combined — before reaching the Bay of Bengal here in West Godavari.",
  },
  {
    stat: "Dakshina Ganga",
    label: "\"The Ganges of the South\"",
    body: "Revered across South India, the river is honoured every twelve years during the Godavari Pushkaram — timed to Jupiter's transit into a new zodiac sign — when pilgrims gather along its banks.",
  },
  {
    stat: "Rice Bowl of AP",
    label: "A delta built on irrigation",
    body: "Sir Arthur Cotton's Dowleswaram Barrage, built 1847–1852, still feeds the canal network that irrigates over two million acres of delta paddy fields.",
  },
  {
    stat: "5 Kshetras",
    label: "Pancharama Kshetras on the delta",
    body: "Palakollu's Ksheerarama joins four sister shrines — Amararama, Draksharama, Kumararama and Somarama at Bhimavaram — said to have formed from a single Shivling split five ways.",
  },
];

export const PLACES = [
  {
    id: "p1",
    name: "Ksheera Ramalingeswara Temple",
    dist: "In town, Palakollu",
    desc: "One of the five Pancharama Kshetras on the Godavari — an ancient Shiva temple right in Palakollu.",
    story:
      "Palakollu's temple is one of five Pancharama Kshetras said to have formed from a single Shivling — a legend shared across the Godavari delta's temple towns. Inscriptions date the main shrine to 918 CE under the Chalukya king Bheemeswara, with the present structure rebuilt in the 14th century by the Alludu family; its nine-tiered gopuram rises roughly 120 feet over a stepped courtyard that fills with devotees at dawn and dusk.",
    highlights: ["One of five Pancharama Kshetras", "9-tier gopuram, ~120 ft", "Best visited at sunrise or dusk"],
    bestTime: "Early morning",
    icon: "temple",
    tone: "terracotta",
    photo: ksheeraTempleImg,
  },
  {
    id: "p2",
    name: "Bhimavaram",
    dist: "~23 km from Palakollu",
    desc: "Temple town on the delta, home to the Somarama Someswara Swamy temple and lively local markets.",
    story:
      "A short drive from Palakollu, Bhimavaram is a working delta town built around the Somarama Someswara Swamy temple — Palakollu's sibling shrine among the five Pancharama Kshetras. Its market streets stay busy through the day with produce carts, flower sellers and the everyday rhythm of small-town Andhra life.",
    highlights: ["Somarama — a Pancharama Kshetra", "Lively local markets", "Easy half-day detour"],
    bestTime: "Morning to midday",
    icon: "temple",
    tone: "soil",
    photo: bhimavaramImg,
  },
  {
    id: "p3",
    name: "Antarvedi Sangamam",
    dist: "~33 km from Palakollu",
    desc: "The point where the Godavari meets the Bay of Bengal — river, temple and coastline together.",
    story:
      "Antarvedi marks the point where the Vasishta Godavari, a distributary of the main river, gives way to the open sea — a temple built in the 15th–16th century and rebuilt in 1823 sits on a spit surrounded by river on three sides and the bay on the fourth, earning it the name Dakshina Kashi, the Kashi of the South. It's one of the most photographed spots on the delta coast, especially at sunset.",
    highlights: ["River meets the sea", "Lakshmi Narasimha Swamy temple", "Known as Dakshina Kashi"],
    bestTime: "Late afternoon",
    icon: "beach",
    tone: "canal",
    photo: antarvediImg,
  },
  {
    id: "p4",
    name: "Perupalem Beach",
    dist: "~32 km from Palakollu",
    desc: "A quiet casuarina-lined beach along the delta coast, good for a sunset stop.",
    story:
      "Perupalem is the delta coast at its most unhurried — a long stretch of sand backed by casuarina groves, with a handful of fishing boats and almost no crowds. It pairs naturally with Antarvedi as a coastal afternoon on any of our packages.",
    highlights: ["Casuarina-lined coastline", "Quiet, uncrowded sands", "Pairs well with Antarvedi"],
    bestTime: "Sunset",
    icon: "beach",
    tone: "canal",
    photo: perupalemImg,
  },
  {
    id: "p5",
    name: "Dindi Backwaters",
    dist: "~18 km from Palakollu",
    desc: "Konaseema-style backwater canals, coconut groves and houseboat routes.",
    story:
      "Dindi sits deep in Konaseema, where the Godavari splits into a maze of narrower canals threading through coconut groves. Traditional houseboats drift these backwaters overnight — the same slow, green scenery that gives this stretch of the delta its reputation.",
    highlights: ["Konaseema backwater canals", "Overnight houseboat routes", "Dense coconut groves"],
    bestTime: "Full day, overnight ideal",
    icon: "boat",
    tone: "paddy",
    photo: dindiImg,
  },
  {
    id: "p6",
    name: "Kolleru Lake",
    dist: "~45 km from Palakollu",
    desc: "Asia's largest shallow freshwater lake and a Ramsar-listed bird sanctuary between the Godavari and Krishna deltas.",
    story:
      "Kolleru has been a Ramsar wetland of international importance since 2002 — the largest shallow freshwater lake in Asia, fed by both the Godavari and Krishna river systems. Over 200 resident and migratory species pass through on the Central Asian Flyway, with painted storks, glossy ibis and purple moorhens arriving from as far as Siberia through the cooler months, making it a favourite morning stop for birdwatchers on our longer routes.",
    highlights: ["Ramsar wetland since 2002", "200+ bird species, Nov–Feb peak", "Boat rides across the lake"],
    bestTime: "November – February",
    icon: "lake",
    tone: "canal",
    photo: kolleruImg,
  },
  {
    id: "p7",
    name: "Undi",
    dist: "~10 km from Palakollu",
    desc: "Village known for its Prasanna Anjaneya Swamy temple, tucked among the paddy fields.",
    story:
      "Undi is a working paddy village a short ride from Palakollu, its Prasanna Anjaneya Swamy temple sitting quietly among the fields. It's the kind of stop that shows the delta as it actually is — green, unhurried and lived-in — rather than a set-piece attraction.",
    highlights: ["Prasanna Anjaneya Swamy temple", "Surrounded by paddy fields", "A genuine working village"],
    bestTime: "Morning",
    icon: "temple",
    tone: "soil",
    photo: undiImg,
  },
  {
    id: "p8",
    name: "Narasapuram",
    dist: "~9 km from Palakollu",
    desc: "Riverside town known for GI-tagged crochet lace-work and colonial-era buildings.",
    story:
      "Narasapuram sits directly on the Godavari, its riverside streets lined with colonial-era buildings from its days as a trading port. The town is best known today for its crochet lace craft — introduced by European missionaries in 1844 and now GI-tagged — still worked by hand, mostly by women artisans, in home workshops much as it has been for generations.",
    highlights: ["GI-tagged crochet lace craft", "Colonial-era riverside buildings", "Working craft village visits"],
    bestTime: "Morning to afternoon",
    icon: "craft",
    tone: "paddy",
    photo: narasapuramImg,
  },
];

export const PACKAGES = [
  {
    id: "pkg1",
    title: "Temple & River Trail",
    duration: "1 Night / 2 Days",
    price: 3499,
    tagline: "A short, easy loop through Palakollu's temple towns and canal roads.",
    chips: ["Temples", "Canal drive", "Local food"],
    tone: "terracotta",
    photo: packageTempleRiverImg,
    placeIds: ["p1", "p2", "p7"],
    hotel: {
      name: "Godavari Heritage Homestay",
      type: "Heritage Homestay",
      desc: "A restored Godavari-style house with a courtyard, run by a local family, five minutes from the Palakollu temple.",
      amenities: ["AC rooms", "Home-cooked meals", "Courtyard sit-out", "Free parking"],
    },
    priceLines: [
      ["Stay & meals", "₹1,800"],
      ["Local transport", "₹900"],
      ["Guide", "₹500"],
      ["Temple offerings kit", "₹299"],
    ],
    itinerary: [
      ["Arrival & Temple Trail", "Check in, visit Ksheera Ramalingeswara Swamy Temple, evening walk along the canal bund."],
      ["Bhimavaram & Undi", "Morning drive to Bhimavaram temple, stop at Undi, return via village roads before check-out."],
    ],
    waypoints: [
      { title: "Palakollu Temple", desc: "Depart from Ksheera Ramalingeswara Swamy Temple, the trail's starting point.", placeId: "p1" },
      { title: "Bhimavaram", desc: "A stop at the Somarama Someswara Swamy temple and the town's market streets.", placeId: "p2" },
      { title: "Undi", desc: "A quiet paddy-village detour before the loop closes.", placeId: "p7" },
    ],
  },
  {
    id: "pkg2",
    title: "Godavari Delta Explorer",
    duration: "2 Nights / 3 Days",
    price: 6999,
    tagline: "From temple town to the river mouth and the coast — the full delta arc.",
    chips: ["Backwaters", "Beach", "River confluence", "Coconut groves"],
    tone: "canal",
    featured: true,
    photo: packageDeltaExplorerImg,
    placeIds: ["p1", "p3", "p4"],
    hotel: {
      name: "Delta View Resort",
      type: "Riverside Resort",
      desc: "Cottages set among coconut groves on the canal bank, with a boat dock and open-air dining facing the water.",
      amenities: ["River-view cottages", "Boat dock", "Multi-cuisine meals", "Bonfire evenings"],
    },
    priceLines: [
      ["Stay & meals", "₹4,200"],
      ["Local transport", "₹1,400"],
      ["Guide & boat rides", "₹900"],
      ["Beach picnic setup", "₹499"],
    ],
    itinerary: [
      ["Arrival & Village Walk", "Check-in, coconut grove walk, evening canal-side dinner."],
      ["Antarvedi & Perupalem", "Morning trip to the Antarvedi river-sea confluence, afternoon at Perupalem Beach."],
      ["Backwater Morning", "Short canoe ride through nearby canals before checkout."],
    ],
    waypoints: [
      { title: "Palakollu", desc: "Check-in and an evening coconut-grove walk.", placeId: "p1" },
      { title: "Antarvedi Sangamam", desc: "Where the Godavari meets the Bay of Bengal.", placeId: "p3" },
      { title: "Perupalem Beach", desc: "A quiet, casuarina-lined stretch of coast.", placeId: "p4" },
    ],
  },
  {
    id: "pkg3",
    title: "Konaseema Backwaters & Village Life",
    duration: "3 Nights / 4 Days",
    price: 10499,
    tagline: "The long, unhurried route — houseboats, lakes and craft villages.",
    chips: ["Houseboat", "Birdwatching", "Farm stay", "Handloom village"],
    tone: "paddy",
    photo: packageKonaseemaImg,
    placeIds: ["p8", "p6", "p5"],
    hotel: {
      name: "Backwater Bamboo Cottages",
      type: "Eco Cottages / Houseboat",
      desc: "Bamboo-and-thatch cottages on the Dindi backwaters, with one night aboard a traditional houseboat.",
      amenities: ["Houseboat night", "Farm-to-table meals", "Kayaks", "Birdwatching deck"],
    },
    priceLines: [
      ["Stay & meals", "₹6,400"],
      ["Houseboat night", "₹2,200"],
      ["Local transport", "₹1,100"],
      ["Guide & entry fees", "₹799"],
    ],
    itinerary: [
      ["Arrival & Temple Trail", "Check-in at Palakollu, temple visit, evening canal walk."],
      ["Narasapuram & Kolleru", "Lace-making village visit, afternoon birdwatching at Kolleru Lake."],
      ["Dindi Backwaters", "Transfer to Dindi, houseboat night through the canals."],
      ["Village Farm Morning", "Morning at a working paddy farm, lunch, departure."],
    ],
    waypoints: [
      { title: "Palakollu", desc: "Arrival and a visit to the Ksheera Ramalingeswara temple.", placeId: "p1" },
      { title: "Narasapuram", desc: "A morning among the town's GI-tagged lace-making workshops.", placeId: "p8" },
      { title: "Kolleru Lake", desc: "Birdwatching across Asia's largest shallow freshwater lake.", placeId: "p6" },
      { title: "Dindi Backwaters", desc: "A houseboat night through the Konaseema canals.", placeId: "p5" },
    ],
  },
];
