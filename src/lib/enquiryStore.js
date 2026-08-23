const KEY = "pt_enquiries";

// A handful of realistic-looking demo enquiries so the admin panel isn't
// empty on first load. Clearly fabricated sample data, not real guests.
const SEED = [
  {
    id: "PT-DEMO01",
    reference: "PT-DEMO01",
    name: "Sirisha Reddy",
    phone: "+91 90000 11111",
    email: "sirisha.demo@example.com",
    dates: "12–14 Sep 2026",
    travellers: "2",
    pkg: "Godavari Delta Explorer",
    notes: "Would like a river-view room if possible.",
    status: "new",
    createdAt: "2026-08-18T10:15:00.000Z",
  },
  {
    id: "PT-DEMO02",
    reference: "PT-DEMO02",
    name: "Arjun Varma",
    phone: "+91 90000 22222",
    email: "arjun.demo@example.com",
    dates: "Flexible, late September",
    travellers: "4",
    pkg: "Temple & River Trail",
    notes: "Travelling with parents, easy pace preferred.",
    status: "contacted",
    createdAt: "2026-08-15T14:40:00.000Z",
  },
  {
    id: "PT-DEMO03",
    reference: "PT-DEMO03",
    name: "Lakshmi Priya",
    phone: "+91 90000 33333",
    email: "",
    dates: "5–9 Oct 2026",
    travellers: "6",
    pkg: "Konaseema Backwaters & Village Life",
    notes: "Interested in the houseboat night, any birdwatching tips welcome.",
    status: "new",
    createdAt: "2026-08-12T09:05:00.000Z",
  },
];

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function getEnquiries() {
  const existing = readAll();
  if (existing) return existing;
  writeAll(SEED);
  return SEED;
}

export function addEnquiry(entry) {
  const list = getEnquiries();
  const record = {
    id: entry.reference,
    status: "new",
    createdAt: new Date().toISOString(),
    ...entry,
  };
  const next = [record, ...list];
  writeAll(next);
  return record;
}

export function updateEnquiryStatus(id, status) {
  const next = getEnquiries().map((e) => (e.id === id ? { ...e, status } : e));
  writeAll(next);
  return next;
}

export function removeEnquiry(id) {
  const next = getEnquiries().filter((e) => e.id !== id);
  writeAll(next);
  return next;
}
