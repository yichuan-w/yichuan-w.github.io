---
hide:
  - navigation
  - toc
---

<link rel="stylesheet" href="style.css">

<div class="apt-wrap" markdown>

# Apartment Search — Berkeley · Emeryville · North Oakland

**Target:** studio · $2,000–$3,000/mo · ≤15 min drive to Soda Hall  
**Tour day:** Saturday, August 1, 2026 · **Researched:** July 31, 2026

<div class="apt-stats" id="stats"></div>

<div class="apt-toolbar">
  <input type="text" id="q" placeholder="Search name, address, neighborhood…">
  <select id="area">
    <option value="">All areas</option>
    <option>Emeryville</option>
    <option>Berkeley</option>
    <option>North Oakland</option>
  </select>
  <select id="sort">
    <option value="rent">Sort: rent ↑</option>
    <option value="commute">Sort: commute ↑</option>
    <option value="name">Sort: name</option>
    <option value="area">Sort: area</option>
  </select>
  <button id="mineonly">★ Your list</button>
  <button id="availonly">Available only</button>
  <button id="budgetonly">Under $3,000</button>
  <button id="hidedone">Hide ruled-out</button>
  <button id="export">Export CSV</button>
  <button id="reset">Reset</button>
</div>

<div class="tablewrap">
<table class="apt">
  <thead><tr>
    <th>Apartment</th>
    <th>Address</th>
    <th>Studio rent</th>
    <th>Size</th>
    <th>→ Soda Hall</th>
    <th>Availability</th>
    <th>Phone</th>
    <th>Sat hours</th>
    <th>Tour</th>
    <th>Status</th>
    <th>My notes</th>
  </tr></thead>
  <tbody id="tb"></tbody>
</table>
</div>

<p class="fine">
Click <b>i</b> next to a name for the research note on that building. Your status picks and notes are
saved in this browser only (localStorage) — nothing is uploaded anywhere.
</p>

## Saturday plan

<div id="plan"></div>

## Call list — lock these in tonight

<div id="calls"></div>

## How to read this table

<div class="caveats" markdown>

- **A `*` after a rent means the figure came from a listing feed (RentCafe / Rentable / ApartmentList), not the property's own site.** Essex, Equity, Apartments.com, Zillow and ForRent all block automated fetching, so a lot of this is second-hand. Reconfirm every price on the phone.
- **"Available" is a snapshot from July 31, 2026.** Studio inventory here turns over in days. A building showing zero studios today is still worth a waitlist call — the three Essex/Equity buildings alone hold ~44 studio units.
- **Drive and bike times are geometric estimates**, not Google-verified. Soda Hall sits at the top of the hill on Hearst, so return bike trips from downtown or West Berkeley are meaningfully harder than the ride out.
- **Base rent is not the number that matters.** The Logan looks like $2,642 until you add $275/mo parking. 19th & Harrison and Rise at Berkeley offer no parking at all. The Kittredge adds ~$150/mo flat utilities. Parker and Assembly quote *total* monthly cost, so they look worse than they are.
- **Two corrections to your original list:** Jones Berkeley is at **1080 Jones St, 94710** (West Berkeley), not 2201 Dwight Way — that address is FOUND Study Southside, a different operator. And Bayview's $2,894 could not be confirmed anywhere; their studios currently show zero availability.
- **One security note:** `altawaverly.com` is serving injected casino spam on its floor-plan pages and appears compromised. Do not submit an application or payment details there — call them instead.

</div>

</div>

<script src="data.js"></script>
<script src="app.js"></script>
