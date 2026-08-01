// Apartment research snapshot — compiled 2026-07-31.
// Sources: property sites where reachable, otherwise RentCafe / Rentable / ApartmentList /
// AvalonCommunities / Prometheus feeds. Many property sites (Essex, Equity, Apartments.com,
// Zillow, ForRent) block automated fetching, so several rows are aggregator-sourced.
// `conf` = confidence in the rent figure: 'site' | 'feed' | 'ask' (not published).
// EVERY number needs reconfirming on the phone. Rents move daily.

const DATA = [
  // ---------------------------------------------------------------- Emeryville
  { id: 'bakery-lofts', name: 'Bakery Lofts', area: 'Emeryville',
    addr: '4700 Adeline St, Emeryville', rent: 2020, rentHi: 2090, sqft: 514, conf: 'feed',
    drive: 13, bike: 22, phone: '(510) 715-2599', sat: '9–5',
    tour: 'walkin', avail: 'Now · Aug 22 · Sep 6', availGood: true,
    url: 'https://www.rentcafe.com/apartments/ca/emeryville/bakery-lofts/default.aspx',
    note: 'Best price-per-sqft found. Deposit $1,960. Parking price not published.' },

  { id: '3900-adeline', name: '3900 Adeline', area: 'Emeryville',
    addr: '3900 Adeline St, Emeryville', rent: 2280, rentHi: 2380, sqft: 326, conf: 'feed',
    drive: 12, bike: 20, phone: '(510) 653-3900', sat: 'Appt only',
    tour: 'appt', avail: '2 units now (#213, #206)', availGood: true,
    url: 'https://www.3900adeline.com/floorplans/studio',
    note: 'Office M–F 8–5, "weekends by appointment only" — you MUST book ahead. Free internet, EV garage. Units are small.' },

  { mine: true, id: 'hollis-oak', name: 'Hollis Oak', area: 'Emeryville',
    addr: '3250 Hollis St, Oakland 94608', rent: 2314, rentHi: 2680, sqft: 445, conf: 'feed',
    drive: 12, bike: 20, phone: '(510) 350-8224', sat: '9–5 open house',
    tour: 'walkin', tourTime: 'walk in ~3:50', avail: '#234 now · only ~2 units left', availGood: true,
    book: 'https://www.rentcafe.com/apartments/ca/oakland/hollis-oak/default.aspx', bookLabel: 'RentCafe (unverified)',
    url: 'https://www.hollisoak.com/',
    note: 'NO BOOKING NEEDED — their own site says "Open House Saturday 9am to 5pm," corroborated by three sources, so 3:50 PM is inside the window and you can just walk in. Sunday is appointment-only. Best phone is (510) 350-8224 (from the property site; the (510) 584-5994 I had earlier was aggregator-listed). No leasing email is published anywhere — their contact widget hides the address server-side. If you want a booking anyway, the RentCafe listing has a "Request a tour" widget with 10-minute slots (so a literal 3:50 exists) — ⚠ but I could NOT reproduce that myself, RentCafe began returning 403 to me, so treat it as reported-not-verified. Madison Park Financial; their corporate site is currently down (502). Bigger 826–921 sqft studios exist at $2,450–$2,680 but all leased.' },

  { id: 'artistry', name: 'Artistry Emeryville', area: 'Emeryville',
    addr: '6401 Shellmound St, Emeryville', rent: 2363, rentHi: 2620, sqft: 575, conf: 'feed',
    drive: 15, bike: 24, phone: null, sat: '9–5',
    tour: 'walkin', avail: '#8223 Aug 29 · #8209 Sep 26', availGood: true,
    url: 'https://www.equityapartments.com/san-francisco-bay/emeryville/artistry-emeryville-apartments',
    note: 'Equity Residential. 575 sqft is generous for the price. No direct phone published — go through the Equity site.' },

  { id: 'arthaus-yb', name: 'ArtHaus Yerba Buena', area: 'Emeryville',
    addr: '1035 Yerba Buena Ave, Emeryville', rent: 1850, rentHi: 1975, sqft: 280, conf: 'feed',
    drive: 13, bike: 21, phone: '(877) 451-8554', sat: '9–6 (conflicting)',
    tour: null, avail: 'Aug 2 · Sep 7', availGood: true,
    url: 'https://www.rentable.co/oakland-ca/1035-yerba-buena-ave',
    note: 'Cheap but VERY small (250–280 sqft). Promo: up to 1 mo free + $1,500 look-and-lease. Hours source contradicts itself.' },

  { mine: true, id: 'emme', name: 'Emme', area: 'Emeryville',
    addr: '6350 Christie Ave, Emeryville', rent: 1859, rentHi: 2487, sqft: 423, conf: 'feed',
    drive: 14, bike: 23, phone: '(510) 757-1506', sat: '9–6',
    tour: 'booked', tourTime: '3:00 PM', avail: '⚠ feeds show all 25 studios rented', availGood: false,
    url: 'https://www.essexapartmenthomes.com/apartments/emeryville/emme/floor-plans-and-pricing?floorplanid=2230685',
    note: '⚠ CONFLICT: you were told "one studio available," but every aggregator shows all 25 studio units leased. Reconfirm on the phone before you drive out. Essex, appointment-only.' },

  { id: 'the-emery', name: 'The Emery', area: 'Emeryville',
    addr: '4510 Hubbard St, Emeryville', rent: 3166, rentHi: 3166, sqft: 504, conf: 'feed',
    drive: 14, bike: 22, phone: '(510) 902-4266', sat: '10–6',
    tour: null, avail: '#227 Sep 10 — over budget', availGood: false,
    url: 'https://www.rentable.co/emeryville-ca/the-emery',
    note: 'Above your $3k ceiling. But rented studios here were $2,560–$2,635, so a re-list could land in budget. $0-deposit promo.' },

  { id: 'avenue-64', name: 'Avenue 64', area: 'Emeryville',
    addr: '6399 Christie Ave, Emeryville', rent: 1969, rentHi: 2389, sqft: 549, conf: 'feed',
    drive: 14, bike: 23, phone: '(510) 480-3489', sat: '9–6',
    tour: null, avail: '0 studios — waitlist', availGood: false,
    url: 'https://www.rentable.co/emeryville-ca/avenue-64',
    note: 'Essex. 545–553 sqft at ~$2.0–2.4k is great value when it opens. 12 studio units → real churn. Get on the list.' },

  { id: 'parc-powell', name: 'Parc on Powell', area: 'Emeryville',
    addr: '1333 Powell St, Emeryville', rent: 2110, rentHi: 2685, sqft: 458, conf: 'feed',
    drive: 14, bike: 22, phone: null, sat: '9–5',
    tour: null, avail: '0 studios — waitlist', availGood: false,
    url: 'https://www.rentable.co/emeryville-ca/parc-on-powell',
    note: 'Equity, built 2015, 178 units. Seven studio plans 458–651 sqft, all inside budget. Strongest waitlist target in Emeryville.' },

  { id: 'arthaus-hannah', name: 'ArtHaus Hannah', area: 'Emeryville',
    addr: '2850 Hannah St, Oakland 94608', rent: 1728, rentHi: 2348, sqft: 492, conf: 'feed',
    drive: 12, bike: 19, phone: '(888) 446-2652', sat: '9–6 (conflicting)',
    tour: null, avail: '0 studios', availGood: false,
    url: 'https://www.rentable.co/oakland-ca/arthaus-hannah',
    note: '93 units, 492–612 sqft. Good value when open. Hours data unreliable.' },

  { id: 'avalon-pm', name: 'Avalon Public Market', area: 'Emeryville',
    addr: '6301 Shellmound St, Emeryville', rent: null, sqft: null, conf: 'ask',
    drive: 15, bike: 24, phone: '(510) 901-3374', sat: '8:30–5:30',
    tour: null, avail: '0 studios · 1BR from $3,285', availGood: false,
    url: 'https://new.avaloncommunities.com/california/emeryville-apartments/avalon-public-market/',
    note: 'CLOSED Mon/Wed/Sun — Saturday is one of only four open days. Studios never priced publicly; 1BRs at $3,285 suggest studios sit near your ceiling.' },

  { mine: true, id: 'bayview', name: 'Bayview', area: 'Emeryville',
    addr: '6701 Shellmound St, Emeryville', rent: null, sqft: null, conf: 'ask',
    drive: 15, bike: 25, phone: null, sat: 'Unknown — call',
    tour: null, avail: '0 studios · alerts only', availGood: false,
    url: 'https://www.bayviewemeryville.com/floorplans',
    note: 'From your list. ApartmentList: "There aren\'t any studio apartments available." ForRent teaser "from $3,162" suggests current stock is over budget. The $2,894 you had is not confirmable anywhere.' },

  { id: 'icon-park', name: 'Icon at Park', area: 'Emeryville',
    addr: '1401 Park Ave, Emeryville', rent: null, sqft: null, conf: 'ask',
    drive: 13, bike: 21, phone: '(866) 437-1258', sat: 'Unknown — call',
    tour: null, avail: 'Unknown (JS-only site)', availGood: false,
    url: 'https://prometheusapartments.com/ca/emeryville-apartments/icon-at-park',
    note: 'Prometheus. Floor-plan module is JS-rendered so nothing could be read. Phone IS verified from the official site — just call.' },

  { id: 'atlas', name: 'Atlas', area: 'North Oakland',
    addr: '385 14th St, Oakland 94612', rent: 3416, rentHi: 3532, sqft: 460, conf: 'feed',
    drive: 19, bike: 26, phone: '(341) 201-5804', sat: '10–6',
    tour: 'booked', tourTime: '12:00 PM', avail: '3 studios now — ALL over $3,400', availGood: false,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/atlas-1/default.aspx',
    note: '⚠ I originally left this off the list: every actually-available studio is $3,416–$4,084, i.e. 14–36% over your ceiling, and at ~19 min it is outside your commute window. The Rockridge plan advertises "from $2,462" but no unit at that price exists right now. Greystar. Tour is 30 min and they REQUIRE a government photo ID for everyone 18+. Deposit $600, app $55, $250 look-and-lease.' },

  // ---------------------------------------------------------------- Berkeley
  { id: '1817-oxford', name: '1817 Oxford St', area: 'Berkeley',
    addr: '1817 Oxford St, Berkeley 94709', rent: 1895, rentHi: 2095, sqft: 407, conf: 'feed',
    drive: 4, bike: 4, phone: '(510) 841-3531', sat: 'No office',
    tour: 'appt', avail: '#8 and #2 available now', availGood: true,
    url: 'https://www.rentable.co/berkeley-ca/1817-oxford-st',
    note: 'CLOSEST to Soda Hall — walkable, no car needed. Small private landlord (Landis Family), so no leasing office and no posted hours. Cheapest thing on this whole list that is actually available.' },

  { id: 'the-shattuck', name: 'The Shattuck', area: 'Berkeley',
    addr: '2701 Shattuck Ave, Berkeley', rent: 2395, rentHi: 2595, sqft: 330, conf: 'feed',
    drive: 10, bike: 12, phone: '(510) 692-4214', sat: 'Calendly 9–5',
    tour: 'online', tourTime: 'book 5:00 PM', avail: '7 studios: 4 now, Aug 3, Aug 24, Aug 25', availGood: true,
    book: 'https://calendly.com/nadiams/30min', bookLabel: 'Calendly ✓verified',
    url: 'https://www.rentable.co/berkeley-ca/the-shattuck',
    note: 'BOOK ONLINE TONIGHT — no phone needed. SG\'s weekend tour scheduler is <a href="https://calendly.com/nadiams/30min" target="_blank" rel="noopener">calendly.com/nadiams/30min</a> (Nadia Morales-Saleh, 510-692-4214, nadiam@sgrealestateco.com). I queried the live Calendly API myself: Sat Aug 1 has 13 open slots, 9:00–5:00 PT. ⚠ Slots are :00/:30 only, so 4:45 is NOT bookable — take 5:00 PM. ⚠ The account timezone is America/New_York, so check the picker says Pacific. ⚠ The event is generically named "30 Minute Meeting" — type "The Shattuck, 2701 Shattuck, unit 211/311/312/505" in the notes so she brings the right keys. ⚠ 10+ min late = automatic cancellation. Units confirmed live: #211 $2,395/310sf now · #311 $2,495/310sf now · #312 $2,495/319sf now · #505 $2,550/311sf now · #212 Aug 3 · #314 Aug 24 · #509 $2,595/347sf Aug 25. Extra costs: water/garbage $75/mo, parking $200/mo, internet included. FICO ≥650 each applicant, 3x income, $40/adult, $1,000 deposit. Weekday-only alternative with a Shattuck-specific calendar: calendly.com/jonathan-sgrealestateco/30min (first slot Mon Aug 3).' },

  { id: 'aquatic-ashby', name: 'Aquatic Ashby', area: 'Berkeley',
    addr: '3006 San Pablo Ave, Berkeley 94710', rent: 2495, rentHi: 2495, sqft: 434, conf: 'feed',
    drive: 12, bike: 16, phone: '(510) 704-1240', sat: 'Appt only (SG)',
    tour: 'appt', avail: '#406 available now', availGood: true,
    url: 'https://www.rentable.co/berkeley-ca/aquatic-ashby',
    note: 'Also SG Real Estate — same phone call books this AND The Shattuck. Sits right on the Berkeley/Emeryville line, so it pairs well with an Emeryville morning. Very sparse listing data.' },

  { id: 'aquatic-shattuck', name: 'Aquatic Shattuck', area: 'Berkeley',
    addr: '2640 Shattuck Ave, Berkeley', rent: 2658, rentHi: 2695, sqft: 443, conf: 'feed',
    drive: 9, bike: 11, phone: '(510) 479-0187', sat: 'Appt only (SG)',
    tour: 'appt', avail: '#509 Aug 18 · premium Sep 15', availGood: true,
    url: 'https://www.aquaticshattuck.com/availability',
    note: 'SG again. Calendly booking on the site. Plans S1–S4, 431–473 sqft. On-site parking leasable separately, price not published.' },

  { id: 'aquatic-u', name: 'Aquatic @ U', area: 'Berkeley',
    addr: '2001 Milvia St, Berkeley', rent: 2795, rentHi: 2800, sqft: 375, conf: 'feed',
    drive: 6, bike: 7, phone: '(510) 925-4595', sat: 'Appt only (SG)',
    tour: 'appt', avail: '#611 now · #406 Sep 1 · #509 Oct 14', availGood: true,
    url: 'https://www.aquaticatu.com/availabilities',
    note: 'Top of budget for 375 sqft, but great location. Bike storage only, no car parking. Deposit only $250.' },

  { id: 'rise-berkeley', name: 'Rise at Berkeley', area: 'Berkeley',
    addr: '2025 Kala Bagai Way, Berkeley', rent: 2750, rentHi: 2895, sqft: 388, conf: 'feed',
    drive: 6, bike: 6, phone: '(510) 340-9051', sat: 'Appt only (SG)',
    tour: 'appt', avail: '#301 & #504 now · Aug 18 · Aug 29', availGood: true,
    url: 'https://www.riseatberkeley.com/availabilities',
    note: 'Furnished. NO PARKING AT ALL (their words). Fine if you bike/BART, disqualifying if you drive to campus. Utilities billed back on top.' },

  { id: 'varsity', name: 'Varsity Berkeley', area: 'Berkeley',
    addr: '2024 Durant Ave, Berkeley', rent: 2300, rentHi: 2300, sqft: 495, conf: 'feed',
    drive: 8, bike: 8, phone: '(510) 509-1668', sat: '10–5',
    tour: null, avail: '2 private studios now (stale data)', availGood: true,
    url: 'https://www.rentable.co/berkeley-ca/varsity-berkeley',
    note: 'LOW CONFIDENCE — the listing feed was "updated over 1 month ago." $2,300 for ~495 sqft would be the best value in Southside if it is real. Call first, do not just show up.' },

  { id: 'parker', name: 'Parker', area: 'Berkeley',
    addr: '2038 Parker St, Berkeley', rent: 2647, rentHi: 3205, sqft: 534, conf: 'feed',
    drive: 8, bike: 8, phone: '(341) 217-7732', sat: '9–6',
    tour: 'walkin', avail: '$3,205 Aug 29 · $2,647 Sep 26', availGood: true,
    url: 'https://www.rentcafe.com/apartments/ca/berkeley/parker-0/default.aspx',
    note: 'Prices shown are TOTAL monthly cost including fixed fees, so they are more comparable than base rents elsewhere. Stacker parking 3 mo free then $100/mo. Big studios (534–683 sqft).' },

  { id: 'u-at-cal', name: 'The U at California', area: 'Berkeley',
    addr: '1598 University Ave, Berkeley', rent: 2157, rentHi: null, sqft: null, conf: 'site',
    drive: 9, bike: 11, phone: '(510) 380-5811', sat: '10–4 (confirm)',
    tour: 'appt', avail: 'New building, lease-up', availGood: true,
    url: 'https://uatcal.com/#floorplans',
    note: 'Brand-new, "from $2,157" is a pre-opening rate straight from their site. PET-FREE building. Parking $200/mo, limited. Add ~$100 utilities + $16.50 insurance.' },

  { id: 'blake', name: 'Blake at Berkeley', area: 'Berkeley',
    addr: '2033 Blake St, Berkeley', rent: 2217, rentHi: 2778, sqft: 455, conf: 'feed',
    drive: 8, bike: 9, phone: '(650) 844-2468', sat: '8–5',
    tour: null, avail: 'Waitlist only', availGood: false,
    url: 'https://www.rentable.co/berkeley-ca/blake-at-berkeley',
    note: 'Six studio plans 430–584 sqft, all in budget at base rent. Nothing open but one waitlist slot. Worth a call.' },

  { id: '26fifty', name: '26Fifty', area: 'Berkeley',
    addr: '2650 Telegraph Ave, Berkeley', rent: 2195, rentHi: 3045, sqft: 382, conf: 'feed',
    drive: 10, bike: 12, phone: '(628) 233-5026', sat: '11–3',
    tour: 'booked', tourTime: '1:30 PM', avail: '⚠ feeds showed 0 studios — you booked anyway', availGood: false,
    url: 'https://www.rentable.co/berkeley-ca/26fifty',
    note: '⚠ As of July 31 every studio here showed RENTED (only vacancy was a 1BR on Nov 30). Your 1:30 booking suggests something opened — confirm on the phone which unit you are seeing. Also note their Saturday window is only 11–3, so 1:30 is close to closing. Six studio plans, 382–566 sqft, $2,195–$3,045. Deposit $1,000.' },

  { id: 'panoramic-northside', name: 'Panoramic Northside', area: 'Berkeley',
    addr: '1752 Shattuck Ave, Berkeley', rent: 2521, rentHi: 2888, sqft: null, conf: 'feed',
    drive: 6, bike: 7, phone: '(510) 306-7408', sat: 'Unknown — call',
    tour: null, avail: '0 studios — waitlist', availGood: false,
    url: 'https://www.rentable.co/berkeley-ca/panoramic-northside',
    note: 'Brand new (ready May 2026), 72 units, 10 studios all leased. Excellent location for Soda Hall. Bike/scooter parking only.' },

  { mine: true, id: 'jones-berkeley', name: 'Jones Berkeley', area: 'Berkeley',
    addr: '1080 Jones St, Berkeley 94710', rent: 2396, rentHi: 3319, sqft: 488, conf: 'feed',
    drive: 12, bike: 15, phone: '(877) 384-9981', sat: '9–6',
    tour: 'walkin', avail: '0 of 16 studios — ask turnover', availGood: false,
    url: 'https://jonesberkeley.com/floor-plans/?availability-tabs=apartments-tab',
    note: '📍 ADDRESS FIX: this is 1080 Jones St in West Berkeley, not 2201 Dwight Way (that address is FOUND Study Southside, a different operator). 170 units total → regular churn. Studios 488 and 610 sqft.' },

  { id: 'kittredge', name: 'The Kittredge', area: 'Berkeley',
    addr: '2150 Kittredge St, Berkeley', rent: 2895, rentHi: null, sqft: null, conf: 'site',
    drive: 6, bike: 7, phone: '(510) 704-1240', sat: 'Appt only (SG)',
    tour: 'appt', avail: 'Prelease 2026–27 academic year', availGood: true,
    url: 'http://sgreresidential.com/',
    note: 'SG. Furnished + in-unit W/D, 50 parking spots + 11 EV chargers. But utilities are a flat ~$150/mo on top, so real cost is ~$3,045.' },

  { id: 'aquatic-4th', name: 'Aquatic Fourth Street', area: 'Berkeley',
    addr: '2010 5th St, Berkeley 94710', rent: null, sqft: 526, conf: 'ask',
    drive: 12, bike: 16, phone: '(341) 218-4791', sat: '9–6',
    tour: 'walkin', avail: '0 studios · 1BR from $3,359', availGood: false,
    url: 'https://www.rentcafe.com/apartments/ca/berkeley/aquatic-0/default.aspx',
    note: 'Greystar, open 7 days — best Saturday coverage in Berkeley. Studios 526 and 557 sqft but unpriced. ForRent teaser "from $2,582".' },

  { id: 'berkeley-central', name: 'Berkeley Central', area: 'Berkeley',
    addr: '2055 Center St, Berkeley', rent: null, sqft: null, conf: 'ask',
    drive: 6, bike: 7, phone: '(510) 880-1713', sat: '9–5',
    tour: 'walkin', avail: '0 studios · 2BR from $4,660', availGood: false,
    url: 'https://www.berkeleycentral.com/floor-plans',
    note: 'Site literally says "Please Call For Pricing" for studios. Marketing "Your Fall 2026 Housing Starts Here" — so ask what drops in August. Up to 4 weeks free.' },

  { id: 'modera-berkeley', name: 'Modera Berkeley', area: 'Berkeley',
    addr: '2119 University Ave, Berkeley', rent: 3361, rentHi: 3462, sqft: 371, conf: 'feed',
    drive: 7, bike: 8, phone: '(844) 311-2074', sat: '10–5',
    tour: null, avail: '5 studio units — over budget', availGood: false,
    url: 'https://millcreekplaces.com/community/modera-berkeley/',
    note: 'Well over your ceiling at $3,361+ for 360–448 sqft. Listed for completeness only.' },

  // ---------------------------------------------------------------- North Oakland
  { id: '722-alcatraz', name: '722 Alcatraz Ave', area: 'North Oakland',
    addr: '722 Alcatraz Ave, Oakland 94609', rent: 2195, rentHi: 2195, sqft: null, conf: 'feed',
    drive: 9, bike: 12, phone: null, sat: 'No office',
    tour: null, avail: 'Unknown', availGood: false,
    url: 'https://www.rentcafe.com/apartments-for-rent/us/ca/oakland/bushrod/',
    note: 'Best price-to-distance ratio found in Bushrod, but it is a small building with no leasing office and almost no published data. Found only via a neighborhood feed.' },

  { id: '344-monte-vista', name: '344 Monte Vista', area: 'North Oakland',
    addr: '344 Monte Vista Ave, Oakland 94611', rent: 1895, rentHi: 1895, sqft: 525, conf: 'feed',
    drive: 14, bike: 20, phone: '(341) 444-3405', sat: '10–5',
    tour: null, avail: '#1B now · only 2 units left', availGood: true,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/344-monte-vista/default.aspx',
    note: 'CHEAPEST verified studio with a real leasing office — $1,895 for 525 sqft. Also the only property in North Oakland that publishes its parking rate ($200/mo). Mosser Companies. Piedmont Ave.' },

  { id: '4801-shattuck', name: '4801 Shattuck', area: 'North Oakland',
    addr: '4801 Shattuck Ave, Oakland 94609', rent: null, sqft: 404, conf: 'ask',
    drive: 10, bike: 14, phone: '(866) 259-8688', sat: 'Not listed — call',
    tour: null, avail: '"Check for available units"', availGood: false,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/4801-shattuck2/default.aspx',
    note: 'Legacy Partners, Temescal. Plans 404 and 472 sqft, no prices posted. Office M–F 10–5; Saturday hours are not published anywhere.' },

  { id: 'the-logan', name: 'The Logan', area: 'North Oakland',
    addr: '5110 Telegraph Ave, Oakland 94609', rent: 2642, rentHi: 2682, sqft: 474, conf: 'feed',
    drive: 10, bike: 14, phone: '(833) 281-1238', sat: '10–5 (conflicting)',
    tour: 'walkin', avail: '#321 available now', availGood: true,
    url: 'https://rent.brookfieldproperties.com/property/the-logan/',
    note: '⚠ WATCH THE PARKING: unreserved $275/mo, reserved $350, EV $450. That pushes the real cost to ~$2,950+. The only property that publishes a full itemized fee schedule — pet $75/mo, insurance $16.75, porter $5, packages $25.' },

  { id: '47hundred', name: '47Hundred', area: 'North Oakland',
    addr: '4700 Telegraph Ave, Oakland 94609', rent: 2708, rentHi: 2708, sqft: 477, conf: 'feed',
    drive: 11, bike: 15, phone: '(510) 944-0258', sat: '9–5',
    tour: 'walkin', avail: '#204 Aug 5 · only 2 units in building', availGood: true,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/47hundred1/default.aspx',
    note: 'CLOSED Sunday AND Monday — Saturday is your only weekend shot. Promo: up to 6 weeks free on base rent, which materially changes the effective rent. App $35.' },

  { id: 'baxter', name: 'Baxter On Broadway', area: 'North Oakland',
    addr: '4901 Broadway, Oakland 94611', rent: null, sqft: 415, conf: 'ask',
    drive: 11, bike: 15, phone: '(341) 209-5437', sat: '9–6',
    tour: 'walkin', avail: '0 studios priced', availGood: false,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/baxter-on-broadway-0/default.aspx',
    note: 'Greystar. Three studio plans (415/440/478 sqft), all "ask for pricing," none available. Up to 3 weeks free. Long restricted-breed list.' },

  { id: 'macarthur-commons', name: 'MacArthur Commons', area: 'North Oakland',
    addr: '540 39th St, Oakland 94609', rent: 2732, rentHi: 3143, sqft: 563, conf: 'feed',
    drive: 14, bike: 19, phone: '(341) 218-2084', sat: 'Not published — call',
    tour: 'booked', tourTime: '11:00 AM', avail: '3 studios: Aug 23 · Sep 15 · Sep 21', availGood: true,
    url: 'https://www.apartmentlist.com/ca/oakland/macarthur-commons--2',
    note: 'BEST August-timing match — three studios landing in your window at 563 sqft. Right at MacArthur BART. Plan is confusingly labelled "Jr. 1 Bedroom B" but listed as a studio. $1,000 look-and-lease. Hours unpublished everywhere.' },

  { id: 'monogram', name: 'Monogram Apartments', area: 'North Oakland',
    addr: '421 25th St, Oakland 94612', rent: 2350, rentHi: 2519, sqft: 520, conf: 'feed',
    drive: 16, bike: 21, phone: '(510) 925-4441', sat: '9–6',
    tour: 'walkin', avail: '2 units building-wide', availGood: true,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/monogram-apartments/default.aspx',
    note: 'Open 9–6 SEVEN DAYS — the easiest walk-in odds anywhere on this list. $2,350–$2,519 for 520 sqft is good value. Up to 4 weeks free. Base rent excludes recurring fees.' },

  { id: 'assembly', name: 'Assembly', area: 'North Oakland',
    addr: '260 30th St, Oakland 94611', rent: 2313, rentHi: 2871, sqft: 548, conf: 'feed',
    drive: 16, bike: 21, phone: '(844) 276-4305', sat: '10–6',
    tour: 'walkin', avail: '#515 Aug 1 · 3 units left', availGood: true,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/assembly/default.aspx',
    note: 'Prices are total monthly cost. At the outer edge of your 15-min window. Up to 3 weeks free, app $35.' },

  { id: 'alexan-webster', name: 'Alexan Webster', area: 'North Oakland',
    addr: '2330 Webster St, Oakland 94612', rent: 2501, rentHi: null, sqft: 599, conf: 'feed',
    drive: 17, bike: 22, phone: '(341) 212-7873', sat: '9–6',
    tour: 'walkin', avail: '#347 Aug 20', availGood: true,
    url: 'https://alexanwebster.com/',
    note: 'LARGEST studios found — 599 and 676 sqft. Promo up to 3 months free. But a resident review reports a long parking waitlist, and it is ~17 min out.' },

  { id: 'bell-uptown', name: 'Bell Uptown District', area: 'North Oakland',
    addr: '1801 Jefferson St, Oakland 94612', rent: 2460, rentHi: 2535, sqft: 512, conf: 'feed',
    drive: 18, bike: 23, phone: '(341) 217-9924', sat: '10–5',
    tour: 'walkin', avail: '#308 Aug 5', availGood: true,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/bell-uptown-district/default.aspx',
    note: 'Closed Sun and Mon. $1,000 concession. Outside your 15-min target.' },

  { id: 'alta-waverly', name: 'Alta Waverly', area: 'North Oakland',
    addr: '2302 Valdez St, Oakland 94612', rent: 2738, rentHi: 2839, sqft: 507, conf: 'feed',
    drive: 17, bike: 22, phone: '(833) 576-8279', sat: '10–6',
    tour: 'walkin', avail: '#614 now · #227 Aug 25', availGood: true,
    url: 'https://www.altawaverly.com/floor-plans/',
    note: '🚨 SECURITY: altawaverly.com is currently serving injected foreign-language casino spam on its floor-plan and home pages — the site appears compromised. Do NOT submit an application or payment info there. Call instead.' },

  { id: '19th-harrison', name: '19th & Harrison', area: 'North Oakland',
    addr: '1889 Harrison St, Oakland 94612', rent: 2501, rentHi: 2834, sqft: 481, conf: 'feed',
    drive: 18, bike: 23, phone: '(510) 892-5681', sat: 'Not published — call',
    tour: null, avail: '4 studios: 3 now, 1 Sep 23', availGood: true,
    url: 'https://www.apartmentlist.com/ca/oakland/19th-harrison',
    note: '⚠ NO PARKING OFFERED AT ALL (their own FAQ). Deepest studio inventory in the price band, but that likely disqualifies it if you drive to campus. $500 look-and-lease if you apply within 48h of touring.' },

  { id: 'forma', name: 'Forma', area: 'North Oakland',
    addr: '2016 Telegraph Ave, Oakland 94612', rent: 2821, rentHi: 3129, sqft: 524, conf: 'feed',
    drive: 18, bike: 23, phone: '(855) 348-7961', sat: '10–6',
    tour: 'walkin', avail: '#1409 Sep 8 only', availGood: false,
    url: 'https://www.rentcafe.com/apartments/ca/oakland/forma/default.aspx',
    note: 'Top of budget, one unit, Sep 8, and ~18 min out. Site contradicts itself on pets ("Pets allowed. No pets allowed."). A review claims no parking available.' },
];

// ---------------------------------------------------------------- Saturday plan
// 4 confirmed appointments: MacArthur Commons 11:00, Atlas 12:00, 26Fifty 1:30, Emme 3:00.
// Those are fixed, so the day is built around them. Everything else is optional filler.
const PLAN = [
  { time: '8:45 AM', kind: 'drive', html: 'Leave. <b>Bring a government photo ID</b> — Atlas requires it for everyone 18+ and will turn you away without it. Also bring pay stubs / offer letter, bank statement, and a card for app fees ($35–$59 each).' },

  { time: '9:15 AM', kind: 'tentative', html: '<b>Bakery Lofts</b> — 4700 Adeline St, Emeryville · <span class="w">$2,020–$2,090 · 514 sqft · walk-in, opens 9:00</span><br><span class="w">Optional but I would protect this one — cheapest large studio in the whole search, and cheaper than all four of your booked tours.</span>' },

  { time: '10:15 AM', kind: 'drive', html: 'Drive Emeryville → MacArthur BART, ~8 min. <span class="w">Slack built in on purpose; the next three stops are back-to-back.</span>' },

  { time: '11:00 AM', html: '<b>MacArthur Commons</b> ✅ — 540 39th St, Oakland · <span class="w">$2,732–$3,143 · 563 sqft · <a href="https://schedule.tours/m/nElopr" target="_blank" rel="noopener">directions</a></span><br><span class="w">Best August-timing match you have: three studios landing Aug 23 / Sep 15 / Sep 21. Ask which one you are seeing, and about the $1,000 look-and-lease.</span>' },

  { time: '11:45 AM', kind: 'drive', html: '⚠ <b>TIGHTEST LINK OF THE DAY.</b> MacArthur → Atlas is ~10–12 min and Atlas starts at 12:00 sharp with only a 30-min slot. <span class="w">If the MacArthur tour runs long, text Atlas rather than just arriving late.</span>' },

  { time: '12:00 PM', html: '<b>Atlas</b> ✅ — 385 14th St, Oakland · <span class="w">30 min · available studios $3,416–$4,084</span><br><span class="w">⚠ Every available studio here is over your ceiling and it is ~19 min to Soda Hall. Call first and ask if anything is under $3,000 — if not, cancel and take a real lunch, or walk into Monogram instead (421 25th St, $2,350–$2,519, 520 sqft, open 9–6, 1.5 mi away).</span>' },

  { time: '12:35 PM', kind: 'drive', html: 'Lunch in Downtown/Uptown Oakland, then drive to Berkeley (~18 min). <span class="w">Log your notes in the table above while the first three are still fresh.</span>' },

  { time: '1:30 PM', html: '<b>26Fifty</b> ✅ — 2650 Telegraph Ave, Berkeley · <span class="w">$2,195–$3,045 · 382–566 sqft · 10 min to Soda Hall</span><br><span class="w">⚠ Their Saturday hours are only 11–3, so you are near closing — do not run late from Atlas. Also: as of yesterday every studio showed rented, so confirm which unit exists.</span>' },

  { time: '2:20 PM', kind: 'drive', html: 'Berkeley → Emeryville, ~14 min.' },

  { time: '3:00 PM', html: '<b>Emme</b> ✅ — 6350 Christie Ave, Emeryville · <span class="w">$1,859–$2,487 · 423–573 sqft</span><br><span class="w">⚠ Still unresolved: every aggregator shows all 25 studios leased. Call before you drive out — this is your most likely wasted slot.</span>' },

  { time: '3:50 PM', html: '<b>Hollis Oak</b> — 3250 Hollis St · <span class="w">$2,314 · 445 sqft · ~7 min from Emme</span><br><span class="w">✅ NO BOOKING NEEDED — their site says "Open House Saturday 9am to 5pm," so just walk in. Cheaper AND bigger than all four of your booked tours. Only ~2 units left. Best phone if you want to call from the car: (510) 350-8224.</span>' },

  { time: '4:40 PM', kind: 'drive', html: 'Hollis Oak → 2701 Shattuck, ~10–12 min. <span class="w">⚠ SG automatically cancels any appointment 10+ min late, so leave Hollis Oak by 4:30.</span>' },

  { time: '5:00 PM', html: '<b>The Shattuck</b> — 2701 Shattuck Ave, Berkeley · <span class="w">$2,395–$2,595 · 310–347 sqft</span><br><span class="w">✅ BOOK THIS TONIGHT, no phone needed: <a href="https://calendly.com/nadiams/30min" target="_blank" rel="noopener">calendly.com/nadiams/30min</a>. I checked the live calendar — Sat Aug 1 has 13 open slots and 5:00 PM is free. Slots are :00/:30 only so 4:45 does not exist. Set the timezone picker to <b>Pacific</b> (her account is Eastern) and put "The Shattuck, 2701 Shattuck, unit 211/311/312/505" in the notes. Seven studios available — your best odds of actually signing something.</span>' },

  { time: '5:30 PM', kind: 'drive', html: 'Done. <span class="w">If anything clicked, apply that evening — MacArthur Commons has a $1,000 look-and-lease, Atlas $250. Ask every building; most will match if you apply within 48h of touring.</span>' },
];

// ---------------------------------------------------------------- Call list
const CALLS = [
  { name: '1. Atlas — decide whether this slot is worth keeping', phone: '(341) 201-5804',
    lines: [
      '⚠ All three available studios are <b>$3,416–$4,084</b>. The "from $2,462" figure on their Rockridge plan does not match any real unit right now.',
      'At ~19 min it is also outside your 10–15 min target. This is your weakest booking.',
      'If they have nothing under $3,000, cancel via <a href="http://nest.io/sched/1gty4f-kfqb/" target="_blank" rel="noopener">their reschedule link</a> and either take a real lunch or walk into <b>Monogram</b> (421 25th St, $2,350–$2,519 for 520 sqft, open 9–6 seven days, no appointment needed).',
      'If you do go: government photo ID is mandatory for everyone 18+.',
    ],
    script: '"I have a noon tour tomorrow. Do you have any studio available under $3,000? The listings I see are all $3,400+."' },

  { name: '2. Emme — reconfirm before you drive out', phone: '(510) 757-1506',
    lines: [
      '⚠ You have 3:00 PM booked, but <b>every aggregator shows all 25 studio units leased.</b>',
      'Get the specific unit number and price confirmed, or you will burn the slot.',
      'If they have nothing: ask to be waitlisted here <i>and</i> at <b>Avenue 64</b> (same Essex management, 6399 Christie, $1,969–$2,389 for 545–553 sqft — better value than Emme).',
    ],
    script: '"I have a 3 PM tour tomorrow. Can you confirm which studio unit I\'ll be seeing and the current price? I want to be sure it\'s still available."' },

  { name: '3. 26Fifty — confirm the unit exists, and watch the clock', phone: '(628) 233-5026',
    lines: [
      'As of July 31 <b>all six studio plans showed rented</b> — the only vacancy was a 1BR on Nov 30. Your booking suggests something turned over, so ask which unit and what price.',
      '⚠ Their Saturday hours are <b>11:00–3:00 only</b>. A 1:30 tour is close to closing, so do not run late from Atlas.',
      'Prices range $2,195 (382 sqft) to $3,045 (566 sqft) — ask where your unit sits in that band.',
    ],
    script: '"I have a 1:30 tour tomorrow — which studio unit will I be seeing, and what\'s the rent? I saw everything listed as rented."' },

  { name: '4. The Shattuck — book it online right now, no call needed', phone: '(510) 692-4214',
    lines: [
      '✅ <b><a href="https://calendly.com/nadiams/30min" target="_blank" rel="noopener">calendly.com/nadiams/30min</a></b> — SG\'s weekend tour scheduler (Nadia Morales-Saleh). I queried the live calendar myself: <b>Sat Aug 1 has 13 open slots</b> from 9:00 to 5:00 PT, and <b>5:00 PM is free</b>.',
      '⚠ Slots are on :00/:30 only — <b>4:45 does not exist</b>. Book <b>5:00 PM</b> so you have buffer after Hollis Oak.',
      '⚠ Her Calendly account is set to <b>Eastern</b> time. Check the timezone picker says Pacific or you will book the wrong hour.',
      '⚠ The event is generically named "30 Minute Meeting" — type <b>"The Shattuck, 2701 Shattuck Ave, unit 211/311/312/505"</b> in the notes so she brings the right keys.',
      '⚠ <b>10+ minutes late = automatic cancellation.</b>',
      'Four units are available right now: #211 $2,395/310sf · #311 $2,495/310sf · #312 $2,495/319sf · #505 $2,550/311sf. Real cost adds water/garbage $75 and parking $200.',
      'Belt-and-suspenders: also submit the guest card at <a href="https://sgrealestate.appfolio.com/listings/detail/7c941a1c-6432-4c44-9280-36d386c53292/contact_us_form" target="_blank" rel="noopener">unit 211\'s contact form</a>, or email leasing@sgrealestateco.com / nadiam@sgrealestateco.com.',
    ],
    script: 'Nothing to say — just book the 5:00 PM slot and note the building and unit numbers.' },

  { name: '5. Bakery Lofts — confirm Saturday hours and hold 9:15', phone: '(510) 715-2599',
    lines: [
      '<b>$2,020–$2,090 for 514 sqft</b> — best price-per-sqft in the entire search, and cheaper than all four of your booked tours.',
      'Saturday 9–5 is aggregator-sourced, not from their own site, so confirm before you build the morning around it.',
      'Three studios: 514 sqft now, 518 sqft Aug 22, 791 sqft Sep 6.',
    ],
    script: '"Are you open tomorrow morning? I\'d like to see the 514 sqft studio around 9:15."' },

  { name: '6. Hollis Oak — nothing to do, it is an open house', phone: '(510) 350-8224',
    done: true,
    lines: [
      '✅ Their own site says <b>"Open House Saturday 9am to 5pm"</b> (three sources agree), so 3:50 PM is inside the window — <b>just walk in</b>. Sunday is appointment-only.',
      '$2,314 for 445 sqft, unit #234, available now, down to ~2 units. Cheaper and bigger than MacArthur, Atlas, or 26Fifty.',
      'This number is from the property site and supersedes the (510) 584-5994 I gave you earlier, which was aggregator-listed. No leasing email is published anywhere.',
      'If you want a booking anyway, the <a href="https://www.rentcafe.com/apartments/ca/oakland/hollis-oak/default.aspx" target="_blank" rel="noopener">RentCafe listing</a> has a "Request a tour" widget with 10-minute slots — ⚠ but I could not load that page myself to confirm, so it is reported-not-verified.',
    ],
    script: '"Hi, I saw your Saturday open house — I\'m interested in unit 234. Is it still available?"' },

  { name: '7. 3900 Adeline — no longer fits Saturday, book another day', phone: '(510) 653-3900',
    done: true,
    lines: [
      'Your four appointments squeezed this out. It is <b>weekends by appointment only</b> (office M–F 8–5), so it cannot be a drop-in.',
      'Still worth seeing: #213 ($2,280) and #206 ($2,380) available now, 326 sqft, free high-speed internet, EV garage.',
      'Ask for Sunday or a weekday evening. Also ask what the garage costs — 326 sqft is tight enough that fees matter.',
    ],
    script: '"I can\'t make Saturday — could I see units 213 or 206 on Sunday or one evening this week? And what does parking run per month?"' },

  { name: 'Optional — waitlist calls, no tour needed', phone: '(510) 480-3489',
    done: true,
    lines: [
      'Best studio <i>pricing</i> in the area but zero current inventory — ~44 studio units between them, so turnover is regular. Two minutes each.',
      '<b>Avenue 64</b> (510) 480-3489 · <b>Parc on Powell</b> via the Equity site · <b>Panoramic Northside</b> (510) 306-7408, only a 6-min drive to Soda Hall.',
      'Also <b>Jones Berkeley</b> (877) 384-9981 — 170 units with all 16 studios leased, so something will open.',
    ],
    script: '"I don\'t need a tour today — I just want to be notified the moment a studio opens. Can you add me to the waitlist?"' },
];
