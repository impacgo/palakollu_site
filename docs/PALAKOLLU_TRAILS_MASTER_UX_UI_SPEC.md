# PALAKOLLU TRAILS — MASTER WEBSITE REDESIGN & UX/UI IMPLEMENTATION SPEC
## React + Tailwind CSS + Vite + Three.js

> **Purpose:** This document is the single source of truth for the remaining redesign and implementation work on Palakollu Trails.
>
> **Primary goal:** Keep the current hero section as the visual benchmark, then rebuild the rest of the website so the entire experience feels like one premium, cinematic, authentic Godavari Delta destination brand.
>
> **Important:** Do not replace the current hero concept unless there is a clear technical or UX reason. The current hero is already the strongest part of the site and establishes the correct visual language.

---

## IMPLEMENTATION STATUS TRACKER

_Added after the working session on 2026-08-21. This tracks progress against every numbered section below so a future session (with no memory of this one) can see exactly what's built and what's left, without re-deriving it from scratch._

**Totals:** ✅ 24 done · 🟡 30 partial · ❌ 20 not started · 📘 2 guideline/philosophy sections (not discrete deliverables)

### The single biggest gaps (read this first)

1. **§33 Image Strategy** — every non-hero photo is AI-generated, not real photography. The spec explicitly wants authentic, licensed photos.
2. **§9 Route Structure** — only 3 of 13 planned routes exist. No /about, /contact, /places index, /packages index, or any /admin/* route.
3. **§21-22, §43 Route Experience** — the illustrated/animated bullock-cart route section (a preserved feature from the original prototype) was never rebuilt in React.
4. **§48-49 Admin** — no admin UI at all. Needs a real backend before it can be built safely per the spec's own security rule.
5. **§72 Fact-check** — no content (river facts, distances, temple details, accommodation, contact info) has been verified against real sources.
6. **§45 Performance** — images are uncompressed PNGs, not optimized/responsive.
7. **§26, §42 Enquiry flow** — form works but isn't the progressive multi-step flow specified, and there's no mobile sticky CTA.
8. **§28, §30, §31, §32 About / Food / People / Contact** — none of these standalone pages/sections exist (Food & People are deliberately skipped to avoid fabricating content).

### What's solid

The full homepage sequence (Hero → Arrival → Three Movements → Godavari Story → Follow the Water → Places → Experiences → Packages → Slow Travel → Contact), Place Detail and Package Detail pages, the color/typography/animation system, reduced-motion support, and the footer are built and match this spec closely — see the ✅/🟡 marks inline below for specifics.

---

# 1. PROJECT VISION

> **STATUS: 📘 GUIDELINE** — Vision statement — adopted as the working creative direction, not a discrete deliverable.

## Brand

**PALAKOLLU TRAILS**  
**TRAILS · WEST GODAVARI**

## Core idea

> **Experience the Godavari slowly.**

This is not supposed to feel like a normal tourism website.

It should feel like a visitor is entering the Godavari Delta and gradually discovering:

- water
- paddy fields
- coconut groves
- village roads
- temples
- traditional homes
- farms
- local food
- crafts
- people
- backwaters
- river sunsets
- the coast

The site should communicate **place, atmosphere and emotion before information**.

The desired emotional journey is:

```text
SEE
↓
FEEL
↓
BECOME CURIOUS
↓
EXPLORE
↓
DISCOVER
↓
CHOOSE A TRAIL
↓
UNDERSTAND THE JOURNEY
↓
PLAN THE TRIP
```

---

# 2. CURRENT IMPLEMENTATION — WHAT MUST BE PRESERVED

> **STATUS: 🟡 PARTIAL** — Places/packages data preserved & rebuilt. Admin and the bullock-cart route map were never ported into the React app (not just a regression from this session — they never existed in React).

The existing screenshots show a strong visual system:

- dark forest-green environment
- cream editorial serif typography
- muted gold accent
- thin line details
- cinematic hero imagery
- centered brand navigation
- subtle patterned backgrounds
- premium minimal controls
- destination/package storytelling
- animated route concept
- dark photographic enquiry section

The current HTML foundation also contains the core information architecture:

- nearby places
- three packages
- package detail
- route map
- animated bullock-cart route
- itinerary
- accommodation
- pricing
- enquiry form
- admin package editor
- admin nearby-place editor

The existing content foundation includes 8 nearby places and 3 packages with itinerary, accommodation, pricing and route waypoint data.

**Do not remove this functionality. Rebuild it into the new UX rather than discarding it.**

---

# 3. CURRENT HERO — LOCK AS DESIGN BENCHMARK

> **STATUS: ✅ DONE** — Hero kept as-is through every redesign pass; only polish (parallax, reduced motion) added.

## Status

**KEEP THE CURRENT HERO DIRECTION.**

The current hero shown in the provided screenshot is the strongest visual section of the website.

### Hero characteristics to preserve

- full-screen cinematic background
- coconut / water / boat atmosphere
- dark photographic treatment
- centered editorial typography
- small gold eyebrow
- large elegant serif headline
- small supporting description
- minimal navigation
- centered bottom action
- premium gold/cream palette
- subtle decorative monogram/mark

### Current hero messaging

Eyebrow:

**WEST GODAVARI · ANDHRA PRADESH**

Headline:

**GODAVARI  
DELTA ESCAPES**

Supporting content:

**Curated tours through Palakollu's temple towns and canal-side villages — coconut groves, backwaters and the Godavari at dusk, mapped stop by stop.**

Primary action:

**BOOK NOW**

### Hero improvement

Do not redesign the visual concept.

Improve only:

- image quality
- responsive crop
- typography spacing
- accessibility
- animation smoothness
- loading performance
- CTA interaction
- navigation behavior
- mobile composition

The hero should remain the reference point for every other section.

---

# 4. VISUAL DESIGN LANGUAGE

> **STATUS: ✅ DONE** — Dark forest + cream + gold + terracotta restraint applied across every section.

## Primary mood

**Quiet luxury + rural authenticity + cinematic travel editorial.**

The website should look like:

```text
Luxury countryside retreat
+
Indian village travel journal
+
Premium editorial magazine
+
Godavari landscape documentary
```

Avoid:

- generic tourism templates
- corporate website layouts
- SaaS cards
- excessive rounded UI
- bright gradients
- excessive shadows
- excessive icons
- excessive glassmorphism
- overly decorative Indian motifs
- childish illustrations
- excessive animation

---

# 5. COLOR SYSTEM

> **STATUS: ✅ DONE** — Exact hex tokens from this spec are live in src/index.css (@theme block).

Preserve the existing visual family.

Recommended tokens:

```css
--forest-950: #07120D;
--forest-900: #0C1B13;
--forest-850: #102419;
--forest-800: #152C20;

--paddy: #4E6B3D;
--paddy-light: #718B55;

--river: #315E63;
--river-light: #5E8585;

--cream: #F2E9D5;
--cream-soft: #DDD2B9;

--gold: #D4A13D;
--gold-soft: #B88B37;

--terracotta: #B84D36;
--soil: #241B14;

--white: #FFFDF7;
```

## Color rule

Use:

- 70% dark natural environment
- 20% cream/editorial surface
- 7% gold
- 3% terracotta

Gold should be a **detail**, not the dominant color.

Terracotta should be reserved for meaningful conversion actions and selected states.

---

# 6. TYPOGRAPHY

> **STATUS: 🟡 PARTIAL** — Serif/sans/mono roles applied correctly. Never audited against the exact px scale (Display 72–120, H1 56–88, etc.) — current clamp() sizes are close but unverified.

Use an elegant high-contrast editorial serif for:

- H1
- H2
- major statements
- destination names
- package titles
- large prices

Use a clean modern sans-serif for:

- navigation
- body copy
- forms
- metadata
- buttons
- utility content

Use a monospace/small uppercase treatment only for:

- coordinates
- category labels
- route numbers
- dates
- small metadata

Typography hierarchy:

```text
DISPLAY
  72–120px desktop
  48–64px mobile

H1
  56–88px

H2
  44–68px

H3
  28–40px

BODY
  16–19px

SMALL
  12–14px

META
  10–12px
  uppercase
  letter-spacing
```

Do not make every heading huge.

Large typography should be used strategically for emotional moments.

---

# 7. GLOBAL NAVIGATION

> **STATUS: 🟡 PARTIAL** — Desktop centered nav + scroll behavior done. Missing: optional JOURNEYS item, full-screen dark mobile overlay, low-opacity GODAVARI watermark behind mobile menu.

## Desktop

Keep the current centered-brand navigation style.

Structure:

```text
PLACES        PACKAGES

              PALAKOLLU
           TRAILS · WEST GODAVARI

                         ABOUT    CONTACT    ↗
```

Optional additional item:

**JOURNEYS**

Primary conversion should not compete with the logo.

## Navigation behavior

At top:

- transparent
- over hero
- white/cream typography

After scrolling:

- dark forest background
- subtle blur
- thin gold/cream border
- slightly reduced height

Use smooth transition.

## Mobile

Use:

```text
PALAKOLLU TRAILS                      MENU
```

Opening menu:

Full-screen dark overlay.

Items:

- Places
- Packages
- About
- Contact
- Plan Your Trail

Add a subtle large background word:

**GODAVARI**

behind the menu at low opacity.

---

# 8. GLOBAL SCROLL EXPERIENCE

> **STATUS: 🟡 PARTIAL** — Parallax + fade/scale reveals exist between most sections, but not literally engineered as a single continuous transition system end-to-end.

The entire site must feel connected.

Avoid:

```text
section → hard cut → section → hard cut
```

Instead use:

```text
hero image
↓
image fades / scales
↓
background transitions
↓
editorial content enters
↓
next landscape appears
```

## Animation principles

Animation should feel:

- slow
- natural
- cinematic
- deliberate

Never:

- bouncy
- flashy
- excessive
- distracting

---

# 9. PAGE / ROUTE STRUCTURE

> **STATUS: ❌ NOT STARTED** — Only 3 of 13 routes exist: /, /places/:id, /packages/:id (+ a 404 catch-all). Missing: /places, /packages, /about, /contact, and all 6 /admin/* routes.

Recommended React route structure:

```text
/
  Home

/places
  Places Index

/places/:slug
  Place Detail

/packages
  Packages Index

/packages/:slug
  Package Detail

/about
  About / The Delta Story

/contact
  Contact + Plan Your Trail

/admin
  Admin Login

/admin/dashboard
  Admin Dashboard

/admin/packages
  Package Management

/admin/packages/:id
  Package Editor

/admin/places
  Place Management

/admin/enquiries
  Enquiry Management
```

If the current implementation uses another routing method, preserve existing working behavior unless migration materially improves maintainability.

---

# 10. HOME PAGE — COMPLETE UX FLOW

> **STATUS: 🟡 PARTIAL** — 11 of 13 home sections built in order. Missing: 09 STAYS and 10 FOOD/PEOPLE (see §24, §30, §31).

The homepage should not simply be a collection of cards.

It should feel like a journey.

## Sequence

```text
01 HERO
02 ARRIVAL / INTRODUCTION
03 THE DELTA
04 GODAVARI STORY
05 PLACES
06 EXPERIENCES
07 TRAILS
08 ROUTE EXPERIENCE
09 STAYS
10 FOOD / PEOPLE
11 SLOW TRAVEL
12 PLAN YOUR TRAIL
13 FOOTER
```

---

# 11. HOME — SECTION 01 HERO

> **STATUS: ✅ DONE** — Hero copy, motion sequence (eyebrow → headline → body → CTA → bottom mark) all match.

## Visual

Full viewport.

Use the existing hero as the benchmark.

## Content

Eyebrow:

**WEST GODAVARI · ANDHRA PRADESH**

Headline:

**GODAVARI  
DELTA ESCAPES**

Body:

**Curated journeys through Palakollu's temple towns, canal-side villages, coconut groves, backwaters and river country.**

CTA:

**EXPLORE THE DELTA**

Secondary:

**VIEW JOURNEYS**

## Motion

On load:

1. background image gently fades from dark
2. eyebrow reveals
3. headline reveals line by line
4. description fades upward
5. CTA appears
6. bottom mark fades in

Do not delay the page excessively.

---

# 12. HOME — SECTION 02: ARRIVE IN THE DELTA

> **STATUS: ✅ DONE** — Arrival section built: cream bg, clip-path image reveal, overlapping circular image, coordinates metadata.

Purpose:

Move the visitor from spectacle to story.

Background:

Warm cream.

Headline:

**A different way to see Andhra.**

Body:

**Palakollu sits within a landscape shaped by water, agriculture, temples and village life. Here, the journey is not only about reaching a destination. It is about the roads, people, meals and quiet moments between them.**

Visual:

- one large vertical village image
- one smaller overlapping circular/organic image
- small location metadata

Metadata:

**PALAKOLLU · WEST GODAVARI**

Optional:

**16°32′ N · 81°43′ E**

Animation:

- image clip-path reveal
- text fade-up
- small metadata delayed

---

# 13. HOME — SECTION 03: THREE WAYS TO EXPERIENCE PALAKOLLU

> **STATUS: ✅ DONE** — Rebuilt as asymmetric one-large + two-small compositions (Sacred/Rural/Coastal), not equal cards.

This replaces the current simple three-card introduction with a stronger visual section.

Eyebrow:

**THE DELTA IN THREE MOVEMENTS**

Headline:

**Begin with the place. Stay for the feeling.**

Three experiences:

### 01 — SACRED

**Pancharama temple town**

Palakollu begins with Ksheera Ramalingeswara Swamy Temple and a town shaped by faith, markets and everyday life.

### 02 — RURAL

**Canals & coconut country**

Paddy fields, coconut groves, narrow roads and branching waterways define the countryside around Palakollu.

### 03 — COASTAL

**Where the river meets the sea**

Antarvedi and the coast at Perupalem reveal the delta's meeting point with the Bay of Bengal.

Design:

Do not use three generic equal cards.

Use:

- one large image
- two smaller image/text compositions
- alternating layout

---

# 14. HOME — SECTION 04: THE GODAVARI STORY

> **STATUS: 🟡 PARTIAL** — Section built with 4 fact blocks matching the spec's exact structure. Content NOT fact-checked against authoritative sources — see §72.

This should be one of the signature sections.

Current screenshot already has a strong green patterned section.

Keep the concept but improve hierarchy.

Eyebrow:

**THE GODAVARI RIVER**

Headline:

**The lifeline the whole delta is built on.**

Body:

**The river is the thread connecting temple towns, canals, paddy fields, villages and the coast. To understand Palakollu, start by following the water.**

Use four fact/story blocks.

## Content blocks

### 1,465 km

**THE GODAVARI**

Use only if verified for final production copy.

### DAKSHINA GANGA

**THE GANGES OF THE SOUTH**

Explain the cultural significance only using verified final copy.

### RICE BOWL

Explain the agricultural character of the delta.

### PANCHARAMA

Explain Palakollu's temple connection.

## Important

Do not invent historical statistics or cultural claims.

The current HTML contains these statements, but they should be fact-checked before production.

---

# 15. HOME — SECTION 05: FOLLOW THE WATER

> **STATUS: ✅ DONE** — Pinned scroll sequence built: drawing river line (SVG pathLength) + sequential label reveal (PALAKOLLU→COAST).

Create a cinematic full-width visual transition.

Headline:

**Follow the water.**

Background:

Godavari/canal image.

Overlay a thin animated river line.

Small labels:

```text
PALAKOLLU
CANALS
PADDY FIELDS
BACKWATERS
RIVER
COAST
```

As the user scrolls:

- river line draws
- landscape shifts
- labels appear sequentially

This is a major award-style transition.

---

# 16. HOME — SECTION 06: PLACES

> **STATUS: ✅ DONE** — Rebuilt as numbered editorial list (01, 02...) with hover-reveal image/description; stacked-card fallback on mobile.

Eyebrow:

**AROUND PALAKOLLU**

Headline:

**Nearby places worth the detour**

Body:

**Temples, backwaters, beaches, villages and craft traditions within reach of Palakollu.**

The current implementation has 8 places:

1. Ksheera Ramalingeswara Temple
2. Bhimavaram
3. Antarvedi Sangamam
4. Perupalem Beach
5. Dindi Backwaters
6. Kolleru Lake
7. Undi
8. Narasapuram

Keep all 8.

## New interaction

Do not use the current static 4-column card grid as the final design.

Use an editorial destination list.

Example:

```text
01   KSHEERA RAMALINGESWARA TEMPLE       IN TOWN
02   BHIMAVARAM                           ~18 KM
03   ANTARVEDI SANGAMAM                  ~35 KM
04   PERUPALEM BEACH                     ~40 KM
...
```

When hovering:

- large destination image appears
- image moves slightly
- row expands
- description fades in
- arrow appears

On mobile:

Use large stacked destination cards with image.

---

# 17. PLACE DETAIL PAGE

> **STATUS: 🟡 PARTIAL** — Hero, story, highlights, related packages, more-places, ADD TO YOUR TRAIL / EXPLORE PACKAGES CTAs all built. Missing a distinct short "subtitle" field separate from the long-form story.

Route:

`/places/:slug`

## Hero

Large image.

Metadata:

**AROUND PALAKOLLU**

Title:

**Antarvedi Sangamam**

Subtitle:

**Where the Godavari meets the sea.**

Distance:

**~35 KM FROM PALAKOLLU**

## Content

### Why it matters

Short editorial story.

### What to experience

- river
- temple
- coastline
- photography
- sunset/morning depending on verified local guidance

### Best moment

Use flexible wording rather than unsupported claims.

### Nearby

Related places.

### Included in journeys

Show packages containing this place.

CTA:

**ADD TO YOUR TRAIL**

Secondary:

**EXPLORE PACKAGES**

---

# 18. HOME — SECTION 07: EXPERIENCES

> **STATUS: 🟡 PARTIAL** — Built as a full-bleed photo grid, but only 8 of the ~12 listed experiences — the rest (bullock-cart rides, village cycling, local Andhra meals) have no real photography behind them, so they were deliberately left out rather than faked with placeholder art.

Introduce the activities before asking users to buy a package.

Headline:

**Come for the places. Stay for the moments.**

Experiences:

- Temple mornings
- Canal-side walks
- Coconut grove walks
- Village cycling
- Bullock-cart rides
- Local Andhra meals
- Paddy-field experiences
- Backwater canoe rides
- River sunsets
- Village crafts
- Birdwatching
- Farm experiences

Use full-bleed photography and short captions.

Avoid icon grids.

---

# 19. HOME — SECTION 08: JOURNEYS / PACKAGES

> **STATUS: ✅ DONE** — 3 packages, signature badge on Godavari Delta Explorer, large-image editorial cards, comparison table added.

This is the commercial conversion section.

Eyebrow:

**CURATED JOURNEYS**

Headline:

**Pick your pace through the delta.**

Keep the current three packages:

### TEMPLE & RIVER TRAIL

**1 NIGHT / 2 DAYS**

**₹3,499 / PERSON**

Highlights:

- Temples
- Canal drive
- Local food

Tagline:

**A short, easy loop through Palakollu's temple towns and canal roads.**

### GODAVARI DELTA EXPLORER

**2 NIGHTS / 3 DAYS**

**₹6,999 / PERSON**

Highlights:

- Backwaters
- Beach
- River confluence
- Coconut groves

Tagline:

**From temple town to the river mouth and the coast — the full delta arc.**

Make this:

**SIGNATURE JOURNEY**

### KONASEEMA BACKWATERS & VILLAGE LIFE

**3 NIGHTS / 4 DAYS**

**₹10,499 / PERSON**

Highlights:

- Houseboat
- Birdwatching
- Farm stay
- Handloom village

Tagline:

**The long, unhurried route — houseboats, lakes and craft villages.**

## Package UI

Do not use generic SaaS cards.

Use:

- large image
- dark overlay
- editorial title
- price
- duration
- short highlights
- thin CTA

One package can be visually larger than the others.

---

# 20. PACKAGE DETAIL PAGE

> **STATUS: ✅ DONE** — Full /packages/:id page: cinematic hero, metadata bar, START PLANNING / EXPLORE ROUTE CTAs.

Route:

`/packages/:slug`

This page must feel like opening a luxury travel itinerary.

## Hero

Large cinematic image.

Eyebrow:

**SIGNATURE JOURNEY · 03 DAYS**

Title:

**Godavari Delta Explorer**

Subtitle:

**From temple town to the river mouth and the coast.**

Metadata:

```text
2 NIGHTS
3 DAYS
5 STOPS
FROM ₹6,999
```

CTA:

**START PLANNING**

Secondary:

**EXPLORE ROUTE**

---

# 21. PACKAGE DETAIL — ROUTE EXPERIENCE

> **STATUS: ❌ NOT STARTED** — No illustrated delta landscape or animated cart. Package Detail shows a plain text day-by-day list instead of the cinematic route section this spec calls for.

The existing bullock-cart route concept is valuable and should remain.

But elevate it significantly.

## Current functionality to preserve

- route waypoints
- animated route line
- animated bullock cart
- stop information
- replay
- pause

## New UX

Make the route a full-width cinematic section.

Use:

- illustrated delta landscape
- river
- canals
- paddy fields
- coconut trees
- village houses
- route line
- numbered stops
- cart animation

Stop cards should appear as the route progresses.

Example:

```text
01
PALAKOLLU TEMPLE

Departure from the temple town.

↓

02
DELTA VIEW RESORT

Check-in among coconut groves.

↓

03
ANTARVEDI SANGAMAM

Where the river meets the sea.
```

---

# 22. ROUTE ANIMATION RULES

> **STATUS: ❌ NOT STARTED** — N/A until §21 exists — no route animation to apply pause/replay/reduced-motion rules to.

The cart must not constantly animate while the user is reading.

Behavior:

### When route enters viewport

Start slowly.

### At each stop

Pause.

Show stop information.

### User clicks stop

Move/focus to selected stop.

### Replay

Restart route.

### Pause

Freeze.

### Reduced motion

Disable continuous animation and show static route.

This preserves accessibility.

---

# 23. PACKAGE DETAIL — DAY-BY-DAY

> **STATUS: ✅ DONE** — Original itinerary day-by-day content preserved verbatim, shown on Package Detail. Not admin-editable (see §48).

Current itinerary data should remain.

## Temple & River Trail

Day 1:

**Arrival & Temple Trail**

Check in, visit Ksheera Ramalingeswara Swamy Temple, evening walk along the canal bund.

Day 2:

**Bhimavaram & Undi**

Morning drive to Bhimavaram temple, stop at Undi, return via village roads before checkout.

## Godavari Delta Explorer

Day 1:

**Arrival & Village Walk**

Check-in, coconut grove walk, evening canal-side dinner.

Day 2:

**Antarvedi & Perupalem**

Morning trip to the Antarvedi river-sea confluence, afternoon at Perupalem Beach.

Day 3:

**Backwater Morning**

Short canoe ride through nearby canals before checkout.

## Konaseema Backwaters & Village Life

Day 1:

**Arrival & Temple Trail**

Day 2:

**Narasapuram & Kolleru**

Day 3:

**Dindi Backwaters**

Day 4:

**Village Farm Morning**

Keep the source content structure, but allow content to be edited from admin.

---

# 24. PACKAGE DETAIL — STAY

> **STATUS: 🟡 PARTIAL** — Accommodation shown on Package Detail with a "subject to confirmation" disclaimer per the production rule, but it's a compact card, not the dedicated "beautiful hospitality section" §10/§68 imply, and the data is still unverified demo content.

Current accommodation information should become a beautiful hospitality section.

### Godavari Heritage Homestay

Heritage Homestay

Current content:

A restored Godavari-style house with a courtyard, run by a local family, five minutes from the Palakollu temple.

Amenities:

- AC rooms
- Home-cooked meals
- Courtyard sit-out
- Free parking

### Delta View Resort

Riverside Resort

Amenities:

- River-view cottages
- Boat dock
- Multi-cuisine meals
- Bonfire evenings

### Backwater Bamboo Cottages

Eco Cottages / Houseboat

Amenities:

- Houseboat night
- Farm-to-table meals
- Kayaks
- Birdwatching deck

## Production rule

Current names/details are placeholder/demo content in the source and must be verified before public launch.

Do not present unverified hotel details as confirmed commercial inventory.

---

# 25. PACKAGE DETAIL — PRICE BREAKDOWN

> **STATUS: ✅ DONE** — Transparent line-item breakdown + total shown, not hidden behind the CTA.

Keep transparent pricing.

Example:

```text
Stay & meals
Local transport
Guide
Activities / boat rides
Entry / setup fees
--------------------
TOTAL / PERSON
```

Avoid hiding all information behind the CTA.

The purpose is trust.

Use:

**From ₹X / person**

when price is variable.

---

# 26. ENQUIRY / PLAN YOUR TRAIL

> **STATUS: 🟡 PARTIAL** — All listed fields present (name, phone, email, dates, travellers, package, notes) but as one compact form, not the 4-step progressive-disclosure flow (one question per mobile screen) this section specifies.

This is the main conversion experience.

Do not make it feel like a generic contact form.

Headline:

**Let's plan your Godavari escape.**

Body:

**Tell us when you would like to come and how many people are travelling. We'll help shape a route and a place to stay around Palakollu.**

Fields:

- Name
- Phone
- Email
- Preferred dates
- Number of travellers
- Preferred package
- Notes / special requests

CTA:

**SEND ENQUIRY**

Secondary:

**TALK TO A LOCAL GUIDE**

## Form UX

Use progressive disclosure.

Step 1:

**When are you coming?**

Step 2:

**Who are you travelling with?**

Step 3:

**What do you want to experience?**

Step 4:

**How can we reach you?**

On desktop, it can remain a compact multi-field composition.

On mobile, use one focused question per screen.

---

# 27. ENQUIRY SUCCESS

> **STATUS: ✅ DONE** — Success state shows selected package/dates/travellers + a generated reference, explicitly framed as a request not a booking, with RETURN TO THE DELTA CTA.

After submit:

Headline:

**Your Godavari story has begun.**

Message:

**We've received your request. We'll be in touch to shape the details of your journey.**

Show:

- selected package
- travel dates
- traveller count
- enquiry reference

CTA:

**RETURN TO THE DELTA**

Do not fake a confirmed booking.

The form should clearly communicate that this is an enquiry/request unless real-time booking is implemented.

---

# 28. ABOUT PAGE

> **STATUS: ❌ NOT STARTED** — No standalone /about route or its 5 sub-sections (Palakollu, water, land, people, journey).

Route:

`/about`

Hero:

**The delta is not a backdrop. It is the story.**

Sections:

### Palakollu

Introduce the town.

### The water

Explain how canals and river landscapes shape the region.

### The land

Paddy fields, coconut groves and village roads.

### The people

Hosts, farmers, guides, artisans and local communities.

### The journey

Explain the slow-travel philosophy.

Use documentary photography.

---

# 29. RESPONSIBLE / SLOW TRAVEL SECTION

> **STATUS: ✅ DONE** — Built as a homepage section with the exact headline and 4 principles.

Headline:

**Walk slowly.  
Eat locally.  
Listen longer.  
Leave lighter.**

Four principles:

### LOCAL FIRST

Support local hosts, guides and food providers.

### SMALLER EXPERIENCES

Keep experiences personal and respectful.

### RESPECT THE LAND

Protect waterways, farms and village spaces.

### LEAVE LIGHTLY

Avoid waste and unnecessary environmental impact.

Do not make unsupported sustainability claims.

---

# 30. FOOD STORY

> **STATUS: ❌ NOT STARTED** — Deliberately skipped — no verified dish names/food content supplied, and the spec forbids fabricating them.

Add a section or page:

**Taste the delta.**

Use:

- Andhra village meals
- coconut-based food
- local produce
- breakfast
- snacks
- seasonal food

Important:

Do not fabricate dish names or cultural stories unless supplied/verified.

Use broad descriptions until exact food content is confirmed.

---

# 31. PEOPLE / LOCAL STORIES

> **STATUS: ❌ NOT STARTED** — Deliberately skipped — spec forbids fabricated people/testimonials and no real names/photos were supplied.

Show:

- local guide
- farmer
- boat operator
- host
- artisan
- cook

Each should have:

- name
- role
- short story
- image

Use real photography and real people where possible.

Do not use fabricated testimonials.

---

# 32. CONTACT PAGE

> **STATUS: ❌ NOT STARTED** — No standalone /contact route with map/location — contact only exists as a homepage section + reused on detail pages.

Route:

`/contact`

Headline:

**Come find us.**

Show:

**Palakollu  
West Godavari  
Andhra Pradesh, India**

Contact:

- phone
- WhatsApp
- email
- social
- map/location

Use a sunset river/canal image.

---

# 33. IMAGE STRATEGY — IMPORTANT

> **STATUS: ❌ NOT STARTED** — This is the biggest content gap: every non-hero image is AI-generated, not real/licensed photography. The spec explicitly asks to replace "generated-looking" imagery with authentic photos — currently the opposite is true.

The current hero image is visually strong and should be **KEEP / RETAIN** if the image is licensed and technically suitable.

The remaining screenshots show a mixture of:

- generated-looking destination photography
- generic temple images
- generic beach images
- generic boat images
- generic village scenes

These are the biggest opportunity for improvement.

## Priority 1 — Hero

**KEEP**

The hero should remain the visual identity anchor.

## Priority 2 — Replace destination images

Use authentic, consistent photography for:

1. Palakollu temple
2. Bhimavaram
3. Antarvedi
4. Perupalem
5. Dindi
6. Kolleru
7. Undi
8. Narasapuram

## Priority 3 — Replace package images

Each package needs a unique visual identity.

### Temple & River Trail

Use:

Temple + canal road + village.

### Godavari Delta Explorer

Use:

Godavari water + coconut groves + boat.

### Konaseema Backwaters

Use:

Backwaters + houseboat + village greenery.

## Priority 4 — Supporting imagery

Need:

- paddy field
- canal
- traditional home
- village road
- local food
- people
- craft
- sunset
- river
- backwaters

---

# 34. IMAGE CONSISTENCY RULE

> **STATUS: 🟡 PARTIAL** — One consistent color-grade treatment applied across all images (so they don't visually clash), but the underlying source is AI generation, not the "warm cinematic documentary photography" the spec calls for.

Do not mix:

```text
photorealistic image
+
AI illustration
+
generic stock photo
+
different color treatment
```

within one section.

Choose one photographic direction:

**warm cinematic documentary photography.**

Recommended treatment:

- natural greens
- warm highlights
- slightly muted saturation
- deep shadows
- subtle film grain
- natural skin tones
- no excessive teal/orange grading

---

# 35. THREE.JS USAGE

> **STATUS: 🟡 PARTIAL** — Used once, appropriately subtly (hero firefly/dust particles). No delta-section water layer or route-section 3D — acceptable per "use selectively," but those two suggested candidates are unbuilt.

Three.js should be used selectively.

Do not add 3D simply because the project already contains Three.js.

Use it only where it improves the story.

Good candidates:

## Hero atmosphere

Very subtle floating dust/light particles.

## Delta section

Subtle animated water/landscape layer if performance allows.

## Route section

Possible 3D terrain/water treatment only if it remains elegant.

## Avoid

- 3D spinning globe
- unnecessary 3D objects
- flashy particles
- heavy WebGL backgrounds
- anything that competes with photography

The website is a travel experience, not a Three.js showcase.

---

# 36. SCROLL ANIMATION SYSTEM

> **STATUS: ✅ DONE** — Framer Motion used consistently everywhere; no second animation library introduced.

Use a single consistent animation language.

Preferred tools:

- CSS transforms
- IntersectionObserver
- requestAnimationFrame where needed
- GSAP if already installed / approved
- existing animation infrastructure where reliable

Do not introduce multiple animation libraries without reason.

## Core effects

### Fade up

```text
opacity 0 → 1
translateY 30px → 0
```

### Image reveal

Use clip-path or scale.

### Parallax

Image:

`translateY` approximately ±5–10%.

Keep subtle.

### Horizontal travel

Use only for selected editorial sections.

### Pinning

Use for:

- river story
- route journey
- package storytelling

Avoid excessive sticky sections.

---

# 37. SIGNATURE AWARD-STYLE SCROLL SEQUENCE

> **STATUS: ✅ DONE** — "Follow the Water" is live and matches this section's structure closely.

The homepage should have at least one memorable scroll sequence.

Recommended:

## “FOLLOW THE WATER”

Structure:

```text
Viewport pinned
        ↓
Large Godavari landscape
        ↓
River line begins drawing
        ↓
PALAKOLLU appears
        ↓
CANALS appear
        ↓
PADDY FIELDS appear
        ↓
BACKWATERS appear
        ↓
RIVER appears
        ↓
COAST appears
        ↓
Section releases
```

This becomes the visual transition between storytelling and destinations.

---

# 38. PARALLAX RULES

> **STATUS: ✅ DONE** — Parallax limited to hero/backdrops/photos, not applied to every card/icon.

Use parallax only on large images.

Good:

```text
background image
slow movement
foreground text
```

Bad:

```text
every card moves
every icon moves
every text block floats
```

Parallax should be felt, not noticed.

---

# 39. CURSOR INTERACTION

> **STATUS: ❌ NOT STARTED** — No custom cursor (ring / EXPLORE / VIEW / GO states) implemented.

Desktop only.

Optional custom cursor:

Small circular ring.

When hovering destination:

```text
EXPLORE
```

When hovering image:

```text
VIEW
```

When hovering CTA:

```text
GO
```

Keep it subtle.

Disable on:

- touch devices
- reduced-motion preference

---

# 40. BACK-TO-TOP

> **STATUS: 🟡 PARTIAL** — Back-to-top button exists with gold border, appears after scroll threshold. No scroll-progress ring.

Keep the existing bottom-right circular control.

Improve:

- smooth progress indicator
- subtle gold border
- arrow animation

It should appear after the user has scrolled.

---

# 41. MOBILE UX

> **STATUS: 🟡 PARTIAL** — Mobile flow matches the spec's order except for the missing Stays/Food-People sections (same gap as §10).

Mobile must not be an afterthought.

Target:

**390 × 844**

## Mobile home flow

```text
Hero
↓
Intro
↓
Three ways
↓
Godavari story
↓
Follow the water
↓
Places
↓
Experiences
↓
Packages
↓
Route
↓
Stay
↓
Plan
↓
Footer
```

## Mobile hero

Use a different crop if needed.

Keep:

- large image
- large serif heading
- minimal navigation
- one primary CTA

Do not put too much text above the fold.

---

# 42. MOBILE PACKAGE UX

> **STATUS: ❌ NOT STARTED** — No sticky bottom "PLAN THIS TRAIL" CTA on package pages.

Use:

```text
Hero
↓
Price / duration
↓
Highlights
↓
Route
↓
Day-by-day
↓
Stay
↓
Pricing
↓
Enquiry
```

Add sticky bottom CTA:

**PLAN THIS TRAIL**

Do not make the sticky CTA cover content.

---

# 43. MOBILE ROUTE UX

> **STATUS: ❌ NOT STARTED** — N/A — no route feature exists yet to give a mobile-specific vertical treatment.

The desktop map cannot simply be scaled down.

Create a vertical route:

```text
01 PALAKOLLU
       ↓
02 DELTA VIEW
       ↓
03 ANTARVEDI
       ↓
04 PERUPALEM
       ↓
05 BACKWATERS
```

Each stop expands.

Allow:

- tap stop
- see image
- read story
- view progress

Use reduced-motion fallback.

---

# 44. ACCESSIBILITY

> **STATUS: 🟡 PARTIAL** — Reduced-motion (CSS + Lenis + Framer MotionConfig) and focus-visible states are done. No full accessibility audit (contrast ratios, complete keyboard walk-through, ARIA review) has been performed.

Required:

- semantic HTML
- keyboard navigation
- visible focus states
- alt text
- sufficient contrast
- accessible form labels
- button semantics
- no hover-only critical content
- reduced-motion support
- keyboard-accessible destination interaction

Implement:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable non-essential motion */
}
```

---

# 45. PERFORMANCE

> **STATUS: ❌ NOT STARTED** — Images are uncompressed PNGs (1.5–2.2MB each), not WebP/AVIF, no responsive srcset/sizes. Flagged earlier, never actioned.

Because this is an image-heavy premium site, performance is critical.

## Images

Use:

- WebP/AVIF where possible
- responsive sizes
- lazy loading below the fold
- eager loading only for hero
- correct aspect ratios
- compressed assets

## Hero

Preload only the hero image.

Do not load all destination/package images immediately.

## Three.js

Lazy initialize expensive WebGL effects.

Destroy/unmount when not required.

## Animation

Avoid animating:

- width
- height
- top
- left

Prefer:

- transform
- opacity

---

# 46. COMPONENT ARCHITECTURE

> **STATUS: 🟡 PARTIAL** — Content is data-driven and componentized, but the folder layout is flatter than the recommended nested structure (no separate admin/, animations/, styles/ trees).

Recommended structure:

```text
src/
├── components/
│   ├── navigation/
│   │   ├── Navbar
│   │   ├── MobileMenu
│   │   └── ScrollHeader
│   │
│   ├── hero/
│   │   ├── Hero
│   │   └── HeroOverlay
│   │
│   ├── storytelling/
│   │   ├── IntroStory
│   │   ├── DeltaStory
│   │   ├── FollowTheWater
│   │   └── SlowTravel
│   │
│   ├── places/
│   │   ├── PlacesList
│   │   ├── PlaceRow
│   │   └── PlaceDetail
│   │
│   ├── packages/
│   │   ├── PackageGrid
│   │   ├── PackageCard
│   │   ├── PackageHero
│   │   ├── PackageRoute
│   │   ├── RouteStop
│   │   ├── Itinerary
│   │   ├── Accommodation
│   │   └── Pricing
│   │
│   ├── enquiry/
│   │   ├── EnquiryForm
│   │   └── EnquirySuccess
│   │
│   ├── footer/
│   │   └── Footer
│   │
│   └── ui/
│       ├── Button
│       ├── Eyebrow
│       ├── SectionLabel
│       ├── ImageReveal
│       └── ScrollProgress
│
├── pages/
│   ├── Home
│   ├── Places
│   ├── PlaceDetail
│   ├── Packages
│   ├── PackageDetail
│   ├── About
│   └── Contact
│
├── admin/
│   ├── AdminLogin
│   ├── Dashboard
│   ├── PackageManagement
│   ├── PackageEditor
│   ├── PlaceManagement
│   └── Enquiries
│
├── data/
│   ├── places
│   ├── packages
│   └── siteContent
│
├── hooks/
│   ├── useScrollReveal
│   ├── useParallax
│   ├── useReducedMotion
│   └── useRouteAnimation
│
├── animations/
│   ├── transitions
│   ├── scroll
│   └── route
│
└── styles/
    ├── tokens
    └── globals
```

Adapt this to the current project instead of blindly restructuring working code.

---

# 47. CONTENT DATA MODEL

> **STATUS: 🟡 PARTIAL** — Places/packages live in src/data/content.js as structured objects, but the exact field names (slug, gallery, category, featured flags etc.) don't fully match the spec's example schema.

Do not hardcode content directly inside visual components.

Use data structures.

Example:

```js
const place = {
  id,
  slug,
  name,
  distance,
  category,
  shortDescription,
  longDescription,
  heroImage,
  gallery,
  experiences,
  bestMoment,
  relatedPackages
}
```

Package:

```js
const package = {
  id,
  slug,
  title,
  duration,
  price,
  tagline,
  heroImage,
  highlights,
  accommodation,
  pricing,
  itinerary,
  waypoints,
  featured
}
```

This allows the admin system to control content later.

---

# 48. ADMIN EXPERIENCE

> **STATUS: ❌ NOT STARTED** — No admin UI at all.

The current source has:

- Admin login
- Packages
- Nearby Places
- Package editor
- Route waypoint editor
- pricing
- itinerary
- accommodation

Preserve all these capabilities.

Improve the UI substantially.

## Admin dashboard

Add:

```text
ACTIVE PACKAGES
8 PLACES
PENDING ENQUIRIES
POPULAR TRAIL
```

Then:

- recent enquiries
- package performance
- content status

## Package editor

Use sections:

```text
Basic Information
Hero Media
Highlights
Accommodation
Pricing
Itinerary
Route
SEO
Publish
```

## Route builder

Keep mini-map editing.

Allow:

- add waypoint
- delete
- reorder
- rename
- description
- coordinates
- preview

---

# 49. ADMIN SECURITY

> **STATUS: ❌ NOT STARTED** — N/A — no admin exists to secure. (This is intentional: building a real admin needs a backend, which doesn't exist here.)

The current HTML contains a demo passcode.

Do NOT keep a real admin password in frontend source code.

For production:

- authenticate server-side
- protect admin routes
- store credentials securely
- never expose secrets in Vite environment variables prefixed for client exposure
- validate all admin mutations server-side

The current admin should be treated as a prototype until real authentication exists.

---

# 50. SEO

> **STATUS: 🟡 PARTIAL** — Home title/description match the spec exactly. No canonical URLs, no structured data, no per-page unique descriptions beyond the dynamic <title>.

Each page needs:

### Home

Title:

**Palakollu Trails | Godavari Delta Village Experiences**

Description:

A curated travel experience through Palakollu and the West Godavari Delta — temples, villages, canals, backwaters and slow journeys.

### Places

Dynamic title:

**Places Around Palakollu | Palakollu Trails**

### Package

Dynamic:

**Godavari Delta Explorer | Palakollu Trails**

Use:

- canonical URLs
- Open Graph
- Twitter/X card metadata
- structured headings
- image alt text
- descriptive URLs

Do not keyword-stuff.

---

# 51. OPEN GRAPH / SOCIAL SHARING

> **STATUS: 🟡 PARTIAL** — Static OG/Twitter tags on index.html use the spec's exact suggested copy + hero image. Not dynamic per route (would need SSR/prerendering to do properly).

When someone shares:

`/`

the preview should use the strongest hero image.

Suggested share title:

**Godavari Delta Escapes — Palakollu Trails**

Suggested description:

**Slow roads, green fields and the river at dusk. Discover Palakollu and the Godavari Delta one trail at a time.**

Use a dedicated 1200×630 social image if available.

---

# 52. MICROCOPY SYSTEM

> **STATUS: 🟡 PARTIAL** — Several CTAs updated to the calmer preferred phrasing; not a full site-wide microcopy audit.

Use short, calm language.

Preferred:

**Explore the Delta**

**Follow the water**

**View the journey**

**Begin your trail**

**Plan your escape**

**See the route**

**Stay a little longer**

Avoid:

**CLICK HERE**

**LEARN MORE**

**SUBMIT FORM**

**GET STARTED NOW!!!**

---

# 53. BUTTON SYSTEM

> **STATUS: 🟡 PARTIAL** — Most primary/secondary buttons match (PLAN YOUR TRAIL-equivalent, EXPLORE ROUTE, SEND ENQUIRY, etc.); not every button in the system has been checked against this exact list.

Primary:

**PLAN YOUR TRAIL**

Secondary:

**EXPLORE THE DELTA**

Tertiary:

**VIEW JOURNEY →**

Back:

**← BACK TO PACKAGES**

Route:

**EXPLORE ROUTE**

Enquiry:

**SEND ENQUIRY**

Success:

**RETURN TO THE DELTA**

---

# 54. LOADING STATES

> **STATUS: ❌ NOT STARTED** — No branded loading state (drawing river line / PALAKOLLU wordmark) — not urgently needed yet since there's no code-splitting/async loading in the current build, but the spec asks for one to exist regardless.

Create branded loading states.

Instead of a spinner:

Display:

```text
PALAKOLLU

TRAILS · WEST GODAVARI
```

with a slowly drawing river line.

For route loading:

Show a small animated cart/route line.

---

# 55. ERROR STATES

> **STATUS: 🟡 PARTIAL** — 404 page built with the spec's exact copy. No generic/runtime error boundary state.

404:

**The trail bends somewhere else.**

CTA:

**RETURN TO PALAKOLLU**

Generic error:

**Something interrupted the journey.**

CTA:

**TRY AGAIN**

Do not use generic browser-style error screens.

---

# 56. IMAGE REPLACEMENT PLAN

> **STATUS: ❌ NOT STARTED** — Still using AI-generated images, not the real 20-shot photography list this section specifies.

## KEEP

Current hero if:

- licensed
- sufficiently high resolution
- available in production
- crop works on mobile

## STRONGLY CONSIDER REPLACING

Current destination images if they are generated, generic, inconsistent, or not representative of the exact location.

## Required photography set

Minimum:

```text
01 Hero — Godavari backwater / coconut landscape
02 Palakollu temple
03 Bhimavaram
04 Antarvedi
05 Perupalem
06 Dindi
07 Kolleru
08 Undi
09 Narasapuram craft
10 Paddy fields
11 Canal
12 Traditional house
13 Local food
14 Boat
15 Village road
16 River sunset
17 Local people
18 Farm
19 Backwater
20 Coastal landscape
```

Use real local photography whenever possible.

If real photography is unavailable, use carefully selected high-quality imagery temporarily, but make the architecture ready for replacement.

---

# 57. IMAGE NAMING

> **STATUS: 🟡 PARTIAL** — Assets are organized and named by place/package, but filenames don't match the spec's exact suggested list (hero-godavari.webp etc.).

Use predictable asset names:

```text
hero-godavari.webp
palakollu-temple.webp
bhimavaram.webp
antarvedi-sangamam.webp
perupalem-beach.webp
dindi-backwaters.webp
kolleru-lake.webp
undi-village.webp
narasapuram-crafts.webp

paddy-fields.webp
canal-coconut.webp
traditional-home.webp
village-road.webp
andhra-food.webp
river-sunset.webp
local-host.webp
farm-life.webp
```

---

# 58. DESIGN DETAILS THAT MAKE IT FEEL PREMIUM

> **STATUS: ✅ DONE** — Thin borders, gold labels, negative space, numbered sections, stitched-seam dividers — applied with restraint, not everywhere at once.

Use small details consistently:

- thin 1px borders
- tiny gold labels
- large negative space
- subtle paper/line texture
- elegant separators
- tiny location coordinates
- numbered sections
- image captions
- understated hover states
- editorial page numbers
- subtle vertical rules
- small monogram
- natural image transitions

Do not add all of these everywhere.

Premium design comes from restraint.

---

# 59. PATTERN / TEXTURE

> **STATUS: ✅ DONE** — Woven texture reduced to a low-opacity background detail, not repeated identically behind every section.

The current diagonal grid pattern is attractive but currently used too frequently.

Reduce its usage.

Use it only:

- as a background texture
- in selected dark sections
- at very low opacity

Do not put the same pattern behind every section.

Introduce visual rhythm:

```text
IMAGE
↓
CREAM
↓
DARK
↓
IMAGE
↓
GREEN
↓
CREAM
↓
IMAGE
```

This prevents visual fatigue.

---

# 60. SECTION RHYTHM

> **STATUS: ✅ DONE** — Homepage alternates cream/dark/green/image sections deliberately (Arrival + Slow Travel are the cream breaks).

The homepage should alternate between:

### Cinematic

Full-width image.

### Editorial

Cream background with typography.

### Immersive

Dark landscape section.

### Interactive

Map/route.

### Commercial

Packages.

### Human

People/food.

### Conversion

Plan your trail.

This rhythm is critical.

---

# 61. DESKTOP BREAKPOINTS

> **STATUS: ❌ NOT STARTED** — Using Tailwind's default breakpoints, not the custom 1440/1200/1024/768/480 scale this section recommends.

Recommended:

```text
1440+
Large desktop
1200–1439
Desktop
1024–1199
Small desktop/tablet
768–1023
Tablet
480–767
Mobile
<480
Small mobile
```

Do not simply rely on Tailwind defaults if the composition needs additional breakpoints.

---

# 62. RESPONSIVE IMAGE RULE

> **STATUS: ❌ NOT STARTED** — No per-image deliberate object-position/focal-point decisions — all images use default center-center cover.

Use `object-fit: cover`.

For each hero image define responsive focal points.

Example:

```css
object-position: center center;
```

Mobile may require:

```css
object-position: 62% center;
```

Do this deliberately per image.

Do not allow important subjects to be cropped accidentally.

---

# 63. FORM UX DETAILS

> **STATUS: 🟡 PARTIAL** — Labels/placeholders/focus states exist. No inline error-state messages (e.g. "Please add your travel dates").

Inputs should have:

- clear label
- placeholder
- focus state
- error state
- success state
- keyboard-friendly input

Error example:

**Please add your travel dates.**

Do not only show red borders.

---

# 64. TRUST / CONVERSION

> **STATUS: ✅ DONE** — Route, accommodation, and pricing are all visible before the enquiry form — nothing gated behind submission.

Before enquiry, users should understand:

- where the experience happens
- what is included
- approximate duration
- approximate price
- route
- accommodation
- what happens after enquiry

Never force the user to submit a form just to understand the package.

Transparency improves trust.

---

# 65. PACKAGE COMPARISON

> **STATUS: ✅ DONE** — Comparison table added below the Packages grid on the homepage.

On packages page, allow users to quickly compare:

```text
                 TRAIL 01     TRAIL 02     TRAIL 03

Duration         2 days       3 days       4 days
Price            ₹3,499       ₹6,999       ₹10,499
Temples          ✓             ✓             ✓
Backwaters       —             ✓             ✓
Beach            —             ✓             —
Houseboat        —             —             ✓
Farm stay        —             —             ✓
```

Do not make this the main visual design.

Use it as a secondary comparison tool.

---

# 66. SEARCH / FILTER

> **STATUS: ❌ NOT STARTED** — Intentionally not built — spec itself says skip until there's enough content to justify it, which is still true at 8 places.

If the number of places grows, add:

Filters:

- Temple
- River
- Beach
- Backwaters
- Village
- Craft
- Food
- Nature

Keep it minimal.

Do not add search functionality until there is enough content to justify it.

---

# 67. FOOTER

> **STATUS: ✅ DONE** — Rebuilt to this section's exact layout (brand+blurb / Explore links / Get in Touch, incl. WhatsApp).

Current footer is functional but visually weak compared with the hero.

Rebuild it.

Use deep forest.

Layout:

```text
PALAKOLLU TRAILS

Village journeys through
West Godavari and the
Godavari Delta.

        EXPLORE
        Places
        Packages
        About
        Contact

        GET IN TOUCH
        Phone
        Email
        WhatsApp

--------------------------------

© Palakollu Trails

GODAVARI DELTA · ANDHRA PRADESH
```

Add a subtle horizon/palm illustration.

---

# 68. FINAL HOMEPAGE FLOW

> **STATUS: 🟡 PARTIAL** — Matches this flow except the missing STAYS and FOOD/PEOPLE steps.

The finished homepage should read like this:

```text
[ HERO ]
Godavari Delta Escapes
        ↓
[ ARRIVAL ]
A different way to see Andhra
        ↓
[ THREE MOVEMENTS ]
Sacred / Rural / Coastal
        ↓
[ GODAVARI ]
The lifeline the delta is built on
        ↓
[ FOLLOW THE WATER ]
Interactive cinematic transition
        ↓
[ PLACES ]
Nearby places worth the detour
        ↓
[ EXPERIENCES ]
Come for the places. Stay for the moments.
        ↓
[ JOURNEYS ]
Pick your pace through the delta
        ↓
[ ROUTE ]
Watch the journey unfold
        ↓
[ STAYS ]
Stay where the village slows down
        ↓
[ FOOD / PEOPLE ]
Taste the delta / Meet the people
        ↓
[ SLOW TRAVEL ]
Walk slowly. Eat locally. Listen longer.
        ↓
[ PLAN ]
Your Godavari story starts here.
        ↓
[ FOOTER ]
```

---

# 69. AWARD-WINNING DESIGN CHECKLIST

> **STATUS: 🟡 PARTIAL** — See the detailed per-item breakdown across this file — most Visual/Motion boxes are checked, several UX and Technical ones (mobile package CTA, full a11y pass, image optimization) are not.

Before considering the redesign complete:

## Visual

- [ ] Hero remains exceptional
- [ ] Every section feels related to hero
- [ ] Typography is consistent
- [ ] Images are consistent
- [ ] Color system is restrained
- [ ] No generic SaaS cards
- [ ] No unnecessary visual clutter
- [ ] White/cream space is used intentionally
- [ ] Dark sections have enough contrast

## UX

- [ ] User understands the destination within 5 seconds
- [ ] User can find places easily
- [ ] User can compare packages
- [ ] User can open package details
- [ ] User can understand route
- [ ] User can understand itinerary
- [ ] User can understand accommodation
- [ ] User can understand price
- [ ] User can enquire easily
- [ ] Mobile flow is excellent

## Motion

- [ ] Hero reveal is smooth
- [ ] Scroll reveals are consistent
- [ ] Parallax is subtle
- [ ] Route animation is meaningful
- [ ] No animation causes nausea
- [ ] Reduced motion works
- [ ] No janky scroll performance

## Technical

- [ ] React components are reusable
- [ ] Content is data-driven
- [ ] Images are optimized
- [ ] Hero loads quickly
- [ ] Three.js does not block rendering
- [ ] No console errors
- [ ] No broken routes
- [ ] No layout shift
- [ ] Keyboard navigation works
- [ ] Mobile touch interactions work

---

# 70. IMPLEMENTATION ORDER

> **STATUS: 🟡 PARTIAL** — Phase 01–02 (foundation, homepage) are essentially done. Phase 03 partial (detail pages yes, route animation no). Phase 04 (About/Contact standalone) and Phase 05 (Admin) not started. Phase 06 (polish) partial.

Do not attempt to redesign everything randomly.

Follow this order.

## PHASE 01 — FOUNDATION

1. Audit current React/Tailwind/Vite structure.
2. Preserve working functionality.
3. Establish design tokens.
4. Establish typography.
5. Establish global navigation.
6. Establish reusable buttons and labels.
7. Establish image treatment.
8. Establish animation primitives.

## PHASE 02 — HOMEPAGE

1. Lock hero.
2. Rebuild intro.
3. Rebuild three-movement section.
4. Rebuild Godavari story.
5. Build Follow the Water.
6. Rebuild Places.
7. Build Experiences.
8. Rebuild Packages.
9. Add Stays.
10. Add Food/People.
11. Add Slow Travel.
12. Rebuild enquiry.
13. Rebuild footer.

## PHASE 03 — DETAIL PAGES

1. Places index.
2. Place detail.
3. Packages index.
4. Package detail.
5. Route animation.
6. Itinerary.
7. Accommodation.
8. Pricing.
9. Enquiry.

## PHASE 04 — ABOUT / CONTACT

1. About.
2. Delta story.
3. Responsible travel.
4. Contact.

## PHASE 05 — ADMIN

1. Admin login.
2. Dashboard.
3. Package management.
4. Package editor.
5. Route builder.
6. Place management.
7. Enquiry management.

## PHASE 06 — POLISH

1. Desktop.
2. Tablet.
3. Mobile.
4. Reduced motion.
5. Performance.
6. SEO.
7. Accessibility.
8. Loading/error states.
9. Final visual QA.

---

# 71. IMPORTANT DEVELOPMENT RULES FOR CLAUDE

> **STATUS: 📘 GUIDELINE** — Followed throughout: hero preserved, no new animation library introduced, no admin credentials hardcoded, no fabricated people/reviews.

When modifying the existing project:

### DO

- inspect existing components before rewriting
- reuse working data models
- preserve existing route animation logic where useful
- preserve package/places data
- preserve the current hero
- improve progressively
- make content data-driven
- keep responsive behavior intentional
- test every interaction after changes

### DO NOT

- rewrite the entire application unnecessarily
- remove working functionality
- replace the hero just for the sake of change
- introduce a new animation library without checking existing dependencies
- add Three.js effects everywhere
- hardcode package content inside components
- remove the admin capability
- expose production credentials
- use placeholder contact information in production
- claim demo accommodation/pricing as confirmed inventory
- create fake testimonials
- create fake reviews
- create fake user counts

---

# 72. IMPORTANT CONTENT / FACT-CHECK RULE

> **STATUS: ❌ NOT STARTED** — Nothing has been fact-checked yet — Godavari statistics, place distances, temple descriptions, accommodation details, and contact info are all still unverified placeholder/demo content.

The original HTML contains useful content, but some statements and distances are currently presented as demo/sample content.

Before production:

- verify historical facts
- verify distances
- verify temple descriptions
- verify Kolleru description
- verify accommodation information
- verify pricing
- verify route stops
- verify contact details
- verify image rights

Where information is not verified, keep the UI ready for editable content rather than inventing facts.

---

# 73. THE MOST IMPORTANT VISUAL RULE

> **STATUS: ✅ DONE** — Every new section was built by asking this exact question — dark palette, gold accents, and the split-reveal/parallax language carry through the whole site.

The current hero is the benchmark.

Every new section should pass this question:

> **“Does this section feel like it belongs to the same world as the hero?”**

If the answer is no, redesign it.

The website should feel like one continuous journey.

Not:

```text
Hero = luxury
Places = generic cards
Packages = SaaS cards
Contact = normal form
Footer = generic footer
```

Instead:

```text
Hero = cinematic
Places = cinematic editorial
Packages = cinematic editorial
Route = cinematic interactive
Contact = cinematic hospitality
Footer = cinematic brand
```

---

# 74. FINAL CREATIVE DIRECTION

> **STATUS: 🟡 PARTIAL** — True for the homepage narrative; not yet true site-wide since About/Contact/Food/People/Admin don't exist to carry the story further.

The final website should make the visitor feel:

> **“I have never seen the Godavari presented like this.”**

The website is not trying to prove that Palakollu has the biggest attraction.

It is showing that the beauty is in the combination:

```text
river
+
paddy
+
coconut
+
temple
+
village
+
food
+
people
+
backwaters
+
coast
+
slow travel
```

The site should turn those ordinary elements into a premium visual story.

---

# 75. FINAL QUALITY BAR

> **STATUS: 🟡 PARTIAL** — Visual quality and motion are close to the bar on the homepage and detail pages; performance, accessibility audit, and content trustworthiness (unverified facts, AI imagery) are not yet at the bar this section sets.

Do not consider the project finished merely because:

- all routes work
- all cards render
- all forms submit
- all pages exist

The project is finished only when:

**Visual quality**
= premium

**UX**
= effortless

**Storytelling**
= emotional

**Authenticity**
= believable

**Motion**
= cinematic

**Performance**
= fast

**Mobile**
= excellent

**Accessibility**
= responsible

**Content**
= clear and trustworthy

**Brand**
= memorable

---

# 76. FINAL SUCCESS STATEMENT

> **STATUS: 🟡 PARTIAL** — The homepage delivers this feeling. The unfinished pieces above (real photography, verified content, route experience, admin, standalone pages) are what stand between here and the full statement.

The final Palakollu Trails website should feel like:

> **A cinematic journey through the Godavari Delta, presented with the restraint of a luxury countryside retreat and the authenticity of a local travel journal.**

The visitor should not feel like they are browsing a tourism directory.

They should feel like they are already travelling.

**SEE THE WATER.  
FOLLOW THE ROAD.  
MEET THE DELTA.  
FIND PALAKOLLU.**
