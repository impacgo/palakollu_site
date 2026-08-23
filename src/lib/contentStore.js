import {
  PLACES as BASE_PLACES,
  PACKAGES as BASE_PACKAGES,
  GODAVARI_FACTS as BASE_FACTS,
} from "../data/content";

// The site's live, editable content layer. Every public page and every
// admin screen reads through these functions rather than the static
// src/data/content.js arrays directly, so a save in the admin panel is
// immediately visible on the public site — no backend, but a real,
// working single-browser CMS rather than a demo that only edits itself.
const KEYS = {
  places: "pt_cms_places_v1",
  packages: "pt_cms_packages_v1",
  facts: "pt_cms_facts_v1",
  settings: "pt_cms_settings_v1",
  food: "pt_cms_food_v1",
};

// Named dishes below are real, well-documented Andhra/Godavari-belt food
// (checked against public sources) — not invented. What we deliberately
// don't claim is that a specific homestay serves a specific dish on a
// specific day; that level of detail stays generic until confirmed.
const DEFAULT_FOOD = [
  {
    title: "Pesarattu mornings",
    body: "A green-gram pancake that's a staple Andhra breakfast, usually served with ginger chutney and upma — the kind of start to the day you'll find at homestays across the delta.",
  },
  {
    title: "Gongura and coconut cooking",
    body: "Gongura pachadi — a sharp, tangy chutney made from sorrel leaves — is one of Andhra's most-loved dishes, and coconut turns up everywhere in delta cooking, in curries, chutneys and sweets.",
  },
  {
    title: "Local produce & markets",
    body: "Vegetables, fish and rice sourced from the same market streets you'll walk through in Bhimavaram and Palakollu — food tied directly to the land you're travelling across.",
  },
  {
    title: "Bobbatlu and festival sweets",
    body: "A sweet flatbread filled with jaggery, chana dal and cardamom, traditionally made for festivals and family celebrations — the kind of dish that turns up when there's something to mark.",
  },
  {
    title: "Seasonal specialties",
    body: "What's served shifts with the season and the harvest, the same way it would in any home kitchen here.",
  },
];

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return fallback;
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage disabled / full — edits stay in memory for this render only */
  }
}

function slugify(name, prefix) {
  const base = (name || prefix)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${prefix}-${base || Math.random().toString(36).slice(2, 7)}-${Math.random()
    .toString(36)
    .slice(2, 5)}`;
}

// ---- Places ----------------------------------------------------------

export function getPlaces() {
  return read(KEYS.places, BASE_PLACES);
}

export function setPlaces(list) {
  write(KEYS.places, list);
}

export function savePlace(place) {
  const list = getPlaces();
  const idx = list.findIndex((p) => p.id === place.id);
  const next = idx === -1 ? [...list, place] : list.map((p, i) => (i === idx ? place : p));
  setPlaces(next);
  return place;
}

export function createPlace() {
  const place = {
    id: slugify("new-place", "p"),
    name: "New Place",
    dist: "~0 km from Palakollu",
    desc: "Short description for listings.",
    story: "Longer story shown on the place detail page.",
    highlights: [],
    bestTime: "Anytime",
    icon: "temple",
    tone: "soil",
    photo: null,
  };
  savePlace(place);
  return place;
}

export function deletePlace(id) {
  setPlaces(getPlaces().filter((p) => p.id !== id));
}

export function resetPlaces() {
  try {
    localStorage.removeItem(KEYS.places);
  } catch {
    /* ignore */
  }
}

// ---- Packages ----------------------------------------------------------

export function getPackages() {
  return read(KEYS.packages, BASE_PACKAGES);
}

export function setPackages(list) {
  write(KEYS.packages, list);
}

export function savePackage(pkg) {
  const list = getPackages();
  const idx = list.findIndex((p) => p.id === pkg.id);
  const next = idx === -1 ? [...list, pkg] : list.map((p, i) => (i === idx ? pkg : p));
  setPackages(next);
  return pkg;
}

export function createPackage() {
  const pkg = {
    id: slugify("new-journey", "pkg"),
    title: "New Journey",
    duration: "1 Night / 2 Days",
    price: 0,
    tagline: "A short description of this journey.",
    chips: [],
    tone: "soil",
    featured: false,
    photo: null,
    placeIds: [],
    hotel: { name: "", type: "", desc: "", amenities: [] },
    priceLines: [],
    itinerary: [],
    waypoints: [],
  };
  savePackage(pkg);
  return pkg;
}

export function deletePackage(id) {
  setPackages(getPackages().filter((p) => p.id !== id));
}

export function resetPackages() {
  try {
    localStorage.removeItem(KEYS.packages);
  } catch {
    /* ignore */
  }
}

// ---- Godavari facts ----------------------------------------------------

export function getGodavariFacts() {
  return read(KEYS.facts, BASE_FACTS);
}

export function setGodavariFacts(list) {
  write(KEYS.facts, list);
}

export function resetGodavariFacts() {
  try {
    localStorage.removeItem(KEYS.facts);
  } catch {
    /* ignore */
  }
}

// ---- Food & dining -------------------------------------------------------

export function getFoodItems() {
  return read(KEYS.food, DEFAULT_FOOD);
}

export function setFoodItems(list) {
  write(KEYS.food, list);
}

export function resetFoodItems() {
  try {
    localStorage.removeItem(KEYS.food);
  } catch {
    /* ignore */
  }
}

// ---- Site-wide settings (contact details) ------------------------------

const DEFAULT_SETTINGS = {
  phone: "+91 00000 00000",
  whatsapp: "+91 00000 00000",
  email: "hello@palakollutrails.example",
  address: "Palakollu, West Godavari, Andhra Pradesh",
  coordinates: "16°31′ N · 81°44′ E",
};

export function getSiteSettings() {
  return { ...DEFAULT_SETTINGS, ...read(KEYS.settings, {}) };
}

export function saveSiteSettings(patch) {
  const next = { ...getSiteSettings(), ...patch };
  write(KEYS.settings, next);
  return next;
}

export function resetSiteSettings() {
  try {
    localStorage.removeItem(KEYS.settings);
  } catch {
    /* ignore */
  }
}

export function resetAllContent() {
  resetPlaces();
  resetPackages();
  resetGodavariFacts();
  resetFoodItems();
  resetSiteSettings();
}
