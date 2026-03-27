// DOT Traffic Camera data - Western, Southern, and Midwestern states
// Pre-fetched from state DOT APIs (CORS prevents runtime browser fetching).

const FL_DOT = {
  label: 'Florida',
  state: 'FL',
  cameras: [
    { imgId: 1, label: 'I-75 Alligator Alley MM 52', road: 'I-75' },
    { imgId: 540, label: 'Card Sound Road Camera 2', road: 'Card Sound Rd' },
    { imgId: 885, label: 'I-4 @ MM 96.3 EB', road: 'I-4' },
    { imgId: 1260, label: 'I-95 @ MM 300.3', road: 'I-95' },
    { imgId: 1615, label: 'I-10 @ US-221', road: 'I-10' },
    { imgId: 1925, label: 'I-95 MP 152.0 NB', road: 'I-95' },
    { imgId: 2234, label: 'Pines Blvd at W 68th Ave', road: 'Pines Blvd' },
    { imgId: 2583, label: 'Fletcher WB at I-75 NB Ramp', road: 'CR-582a' },
    { imgId: 2905, label: 'Turnpike MM 114.6', road: 'FL Turnpike' },
    { imgId: 3219, label: 'Turnpike MM 000.1 at US-1', road: 'FL Turnpike' },
    { imgId: 3527, label: 'SR-528 MM 1.0', road: 'SR-528' },
    { imgId: 3837, label: 'US-231 MM 33.0 SB', road: 'US-231' },
    { imgId: 4179, label: 'SR-836 at NW 107th Ave', road: 'SR-836' },
    { imgId: 4507, label: 'I-10 North & Monroe St', road: 'I-10' },
    { imgId: 5007, label: 'I-75 SB N of HEFT', road: 'I-75' },
    { imgId: 3, label: 'I-75 Alligator Alley MM 56', road: 'I-75' },
    { imgId: 548, label: 'I-75 NB S of HEFT', road: 'I-75' },
    { imgId: 898, label: 'SR-50 at Maguire (Orlando)', road: 'SR-50' },
    { imgId: 1279, label: 'I-10 W of SR-121', road: 'I-10' },
    { imgId: 1640, label: 'I-10 E of US-441', road: 'I-10' },
    { imgId: 1957, label: 'I-95 N of 10th Ave', road: 'I-95' },
    { imgId: 2274, label: 'I-275 at Lois Ave (Tampa)', road: 'I-275' },
    { imgId: 2628, label: 'US-19/US-98 @ W Yulee Dr', road: 'US-19' },
    { imgId: 2955, label: 'SR-528 MM 1.8', road: 'SR-528' },
    { imgId: 3274, label: 'FL Turnpike MM 308.5 SB', road: 'FL Turnpike' },
    { imgId: 3588, label: 'I-10 @ Centerville Rd (Tallahassee)', road: 'I-10' },
    { imgId: 3908, label: 'SR-429 at S Ocoee-Apopka Rd', road: 'SR-429' },
    { imgId: 4253, label: 'SR-836 MM 066', road: 'SR-836' },
    { imgId: 5097, label: 'FL Turnpike MM 86.5', road: 'FL Turnpike' },
  ].map(c => ({
    id: `fl-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://fl511.com/map/Cctv/${c.imgId}`,
  })),
};

const GA_DOT = {
  label: 'Georgia',
  state: 'GA',
  cameras: [
    { imgId: 18549, label: 'SR 211 at Horton St (Barrow)', road: 'SR-211' },
    { imgId: 18806, label: 'SR 8 / Lawrenceville Hwy at Montreal Rd', road: 'SR-8' },
    { imgId: 19066, label: 'Chatham Pkwy at Chatham Center (Savannah)', road: 'Chatham Pkwy' },
    { imgId: 19323, label: 'SR 146 at Scruggs Rd (Catoosa)', road: 'SR-146' },
    { imgId: 19580, label: 'SR 20 at Willow Ln (Henry)', road: 'SR-20' },
    { imgId: 19840, label: 'Hank Aaron Dr at Georgia Ave (Atlanta)', road: 'Hank Aaron Dr' },
    { imgId: 20097, label: 'SR 20 at Pine Lake Dr (Forsyth)', road: 'SR-20' },
    { imgId: 20357, label: 'I-85 S past Pleasantdale Rd MM 97 (Gwinnett)', road: 'I-85' },
    { imgId: 20615, label: 'I-475 N at I-75 MM 15.7 (Monroe)', road: 'I-475' },
    { imgId: 20872, label: 'I-75 S before Barrett Pkwy MM 270 (Cobb)', road: 'I-75' },
    { imgId: 21129, label: 'I-16 E at US 441 MM 50.9 (Laurens)', road: 'I-16' },
    { imgId: 21386, label: 'Sandy Plains Rd at Canton Rd (Cobb)', road: 'Sandy Plains Rd' },
    { imgId: 21643, label: 'SR 141 S before Technology Pkwy (Gwinnett)', road: 'SR-141' },
    { imgId: 21900, label: 'US 78 at High Point Rd (Gwinnett)', road: 'US-78' },
    { imgId: 22157, label: 'SR 20 at Sudderth Rd (Gwinnett)', road: 'SR-20' },
    { imgId: 11139, label: 'SR 211 at Horton St (Barrow)', road: 'SR-211' },
    { imgId: 11525, label: 'SR 6 at Welcome All Connector (Fulton)', road: 'SR-6' },
    { imgId: 11914, label: 'SR 2 at Old Mill Rd (Catoosa)', road: 'SR-2' },
    { imgId: 12303, label: 'SR 38/Plant Ave @ Ossie Davis Pkwy (Ware)', road: 'SR-38' },
    { imgId: 12689, label: 'SR 106 at I-85 NB Ramp (Franklin)', road: 'SR-106' },
    { imgId: 13078, label: 'I-85 S past Steve Reynolds Blvd (Gwinnett)', road: 'I-85' },
    { imgId: 13465, label: 'I-75 N past Wade Green Rd (Cobb)', road: 'I-75' },
    { imgId: 13851, label: 'Cobb Pkwy at McCollum Pkwy', road: 'Cobb Pkwy' },
    { imgId: 14237, label: 'I-675 N before US 23 (Clayton)', road: 'I-675' },
    { imgId: 14623, label: 'Pleasant Hill Rd at Old Norcross Rd', road: 'Pleasant Hill' },
  ].map(c => ({
    id: `ga-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://511ga.org/map/Cctv/${c.imgId}`,
  })),
};

const AZ_DOT = {
  label: 'Arizona',
  state: 'AZ',
  cameras: [
    { imgId: 682, label: 'SR-95 @ SR-68 Laughlin Rd', road: 'SR-95' },
    { imgId: 740, label: 'SR-88 @ Canyon Lakes', road: 'SR-88' },
    { imgId: 797, label: 'SR-264 @ IR112', road: 'SR-264' },
    { imgId: 848, label: 'I-10 @ Mini Stack South', road: 'I-10' },
    { imgId: 908, label: 'I-17 @ S of Glendale Ave', road: 'I-17' },
    { imgId: 958, label: 'SR-51 @ N of Bell Rd', road: 'SR-51' },
    { imgId: 1008, label: 'SR-101 @ 75th Ave', road: 'SR-101' },
    { imgId: 1058, label: 'SR-101 @ L-202 Red Mountain', road: 'SR-101' },
    { imgId: 1108, label: 'SR-202 @ Apache Trail', road: 'SR-202' },
    { imgId: 1158, label: 'SR-202 @ S of Broadway Rd', road: 'SR-202' },
    { imgId: 1208, label: 'SR-24 @ Williams Field Rd', road: 'SR-24' },
    { imgId: 1259, label: 'US-60 @ 51st / Bethany Home', road: 'US-60' },
  ].map(c => ({
    id: `az-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://az511.gov/map/Cctv/${c.imgId}`,
  })),
};

const UT_DOT = {
  label: 'Utah',
  state: 'UT',
  cameras: [
    { imgId: 112731, label: 'Freedom Blvd / 200 W @ 1100 N, Provo', road: 'SR-189' },
    { imgId: 114657, label: '5300 S / SR-173 @ Commerce Dr, Murray', road: 'SR-173' },
    { imgId: 115506, label: 'Big Cottonwood Canyon @ Silver Fork', road: 'SR-190' },
    { imgId: 116096, label: '100 S / SR-113 @ 300 W, Heber', road: 'SR-113' },
    { imgId: 117555, label: 'West Davis Hwy SB @ 1050 S, Farmington', road: 'SR-177' },
    { imgId: 117903, label: 'I-15 SB @ 2300 S, S Salt Lake', road: 'I-15' },
    { imgId: 118103, label: 'George Washington Blvd @ 240 W, Washington', road: 'Local' },
    { imgId: 120334, label: 'Antelope Dr / SR-108 @ Sand Ridge Pkwy', road: 'SR-108' },
    { imgId: 120502, label: 'SR-142 @ 9650 N, Cedar Hills', road: 'SR-142' },
    { imgId: 120991, label: 'I-15 NB @ North POE, St George', road: 'I-15' },
    { imgId: 121561, label: '1200 W @ 400 S, Orem', road: '1200 W' },
    { imgId: 121729, label: 'Center St @ Orem Blvd, Orem', road: 'Center St' },
  ].map(c => ({
    id: `ut-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://udottraffic.utah.gov/map/Cctv/${c.imgId}`,
  })),
};

const NV_DOT = {
  label: 'Nevada',
  state: 'NV',
  cameras: [
    { imgId: 2, label: 'McCarran & Caughlin/Cashill', road: 'McCarran' },
    { imgId: 4748, label: 'US 93 & Buchanan - Nevada Hwy', road: 'US-93' },
    { imgId: 4801, label: 'I-515 SB Boulder Highway', road: 'I-515' },
    { imgId: 4855, label: 'Rancho Dr & Bonanza Rd', road: 'Rancho Dr' },
    { imgId: 4908, label: 'Las Vegas Blvd & Charleston', road: 'Las Vegas Blvd' },
    { imgId: 4961, label: 'US-50 Bean Flat EU MM 05', road: 'US-50' },
    { imgId: 5016, label: 'I-80 @ Boomtown Garson Rd', road: 'I-80' },
    { imgId: 5070, label: 'US-395 @ Oddie', road: 'US-395' },
    { imgId: 5123, label: 'US-50 @ Glenbrook', road: 'US-50' },
    { imgId: 5176, label: 'Boulder Hwy & Tropicana Ave', road: 'Boulder Hwy' },
    { imgId: 5229, label: 'Casino Center Blvd & Bonneville Ave', road: 'Casino Center' },
    { imgId: 5283, label: 'Eastern Ave & CC 215 EB Ramp', road: 'Eastern Ave' },
  ].map(c => ({
    id: `nv-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://www.nvroads.com/map/Cctv/${c.imgId}`,
  })),
};

const WI_DOT = {
  label: 'Wisconsin',
  state: 'WI',
  cameras: [
    { imgId: 937, label: 'I-39/US 51 at County B', road: 'I-39' },
    { imgId: 977, label: 'US 53 at River Prairie Dr', road: 'US-53' },
    { imgId: 1017, label: 'Watertown Plank Rd at 92nd St', road: 'Local' },
    { imgId: 1057, label: 'US 12/18 at Rimrock Rd', road: 'US-12' },
    { imgId: 1097, label: 'I-41/94 at County C', road: 'I-41' },
    { imgId: 1137, label: 'I-794 at James Lovell St', road: 'I-794' },
    { imgId: 1177, label: 'I-41 at County K', road: 'I-41' },
    { imgId: 1217, label: 'WIS 29 at Packerland Dr', road: 'WIS-29' },
    { imgId: 1257, label: 'US 12/18 EB at W Broadway', road: 'US-12' },
    { imgId: 1297, label: 'I-41 at WIS 47', road: 'I-41' },
    { imgId: 1337, label: 'I-43 at Hampton Ave', road: 'I-43' },
    { imgId: 1377, label: 'I-41 at WIS 67', road: 'I-41' },
  ].map(c => ({
    id: `wi-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://511wi.gov/map/Cctv/${c.imgId}`,
  })),
};

const ID_DOT = {
  label: 'Idaho',
  state: 'ID',
  cameras: [
    { imgId: 1, label: 'I-15 UT/ID State Line', road: 'I-15' },
    { imgId: 1233, label: 'I-84 MM 33.6 SH-55 Midland', road: 'I-84' },
    { imgId: 368, label: 'US-93 Willow Creek Summit', road: 'US-93' },
    { imgId: 463, label: 'US-12 Cottonwood Creek', road: 'US-12' },
    { imgId: 590, label: 'SH-75 Stanley Hatchery', road: 'SH-75' },
    { imgId: 651, label: 'State St & Collister (Boise)', road: 'Local' },
    { imgId: 688, label: 'I-184 Franklin St', road: 'I-184' },
    { imgId: 725, label: 'US-20 Chinden & Locust Grove Rd', road: 'US-20' },
    { imgId: 764, label: 'Lincoln & Beacon (Boise)', road: 'Local' },
    { imgId: 801, label: 'Eagle & Victory (Boise)', road: 'Local' },
    { imgId: 839, label: 'Fairview & 23rd (Boise)', road: 'Local' },
    { imgId: 1263, label: 'US-95 Hanley', road: 'US-95' },
  ].map(c => ({
    id: `id-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://511.idaho.gov/map/Cctv/${c.imgId}`,
  })),
};

const LA_DOT = {
  label: 'Louisiana',
  state: 'LA',
  cameras: [
    { imgId: 1, label: 'I-20 at I-220 Off Ramp', road: 'I-20' },
    { imgId: 33, label: 'US 61 at Florida Blvd', road: 'US-61' },
    { imgId: 64, label: 'US 190 at Stevendale', road: 'US-190' },
    { imgId: 168, label: 'I-20 at Jewella Avenue', road: 'I-20' },
    { imgId: 205, label: 'LA 70 N of LA 3125', road: 'LA-70' },
    { imgId: 256, label: 'I-10 at Enterprise Blvd', road: 'I-10' },
    { imgId: 308, label: 'US 165 at Renwick', road: 'US-165' },
    { imgId: 361, label: 'US 71 at LA 3250 (Sugarhouse Rd)', road: 'US-71' },
    { imgId: 405, label: 'I-20 at Pines Rd', road: 'I-20' },
    { imgId: 447, label: 'US-190 at LA-411 (Livonia)', road: 'US-190' },
    { imgId: 499, label: 'I-210 at Nelson Road', road: 'I-210' },
    { imgId: 553, label: 'I-110 at Governors Mansion', road: 'I-110' },
  ].map(c => ({
    id: `la-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://511la.org/map/Cctv/${c.imgId}`,
  })),
};

const CA_DOT = {
  label: 'California',
  state: 'CA',
  cameras: [
    // D3 - Sacramento
    { id: 'ca-d3-1', label: 'Hwy 5 at Pocket (Sacramento)', area: 'I-5', imageUrl: 'https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5atpocket/hwy5atpocket.jpg' },
    { id: 'ca-d3-2', label: 'Hwy 5 at Airport (Sacramento)', area: 'I-5', imageUrl: 'https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy5atairport/hwy5atairport.jpg' },
    { id: 'ca-d3-3', label: 'Hwy 50 at Mather Field EB (Sacramento)', area: 'US-50', imageUrl: 'https://cwwp2.dot.ca.gov/data/d3/cctv/image/hwy50atmatherfieldeb3/hwy50atmatherfieldeb3.jpg' },
    // D4 - Bay Area
    { id: 'ca-d4-1', label: 'I-580 West of SR-24 (Oakland)', area: 'I-580', imageUrl: 'https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv102i580westofsr24/tv102i580westofsr24.jpg' },
    { id: 'ca-d4-2', label: 'SR-242 at Concord Ave (Concord)', area: 'SR-242', imageUrl: 'https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv826sr242atconcordav/tv826sr242atconcordav.jpg' },
    { id: 'ca-d4-3', label: 'US-101 S of Bayshore Blvd (Brisbane)', area: 'US-101', imageUrl: 'https://cwwp2.dot.ca.gov/data/d4/cctv/image/tv405us101southofbayshoreboulevard/tv405us101southofbayshoreboulevard.jpg' },
    // D7 - Los Angeles
    { id: 'ca-d7-1', label: 'I-110 Avenue 26 Off Ramp (Cypress Park)', area: 'I-110', imageUrl: 'https://cwwp2.dot.ca.gov/data/d7/cctv/image/i110196avenue26offramp/i110196avenue26offramp.jpg' },
    { id: 'ca-d7-2', label: 'SR-57 Arrow Hwy (San Dimas)', area: 'SR-57', imageUrl: 'https://cwwp2.dot.ca.gov/data/d7/cctv/image/sr57490arrowhwy/sr57490arrowhwy.jpg' },
    { id: 'ca-d7-3', label: 'I-10 Overland Ave On-Ramp (Culver City)', area: 'I-10', imageUrl: 'https://cwwp2.dot.ca.gov/data/d7/cctv/image/i1080overlandaveonramp/i1080overlandaveonramp.jpg' },
    // D8 - San Bernardino / Riverside
    { id: 'ca-d8-1', label: 'I-10 LA County Line (Montclair)', area: 'I-10', imageUrl: 'https://cwwp2.dot.ca.gov/data/d8/cctv/image/i1001lacountyline/i1001lacountyline.jpg' },
    { id: 'ca-d8-2', label: 'I-210 W of Linden (Rialto)', area: 'I-210', imageUrl: 'https://cwwp2.dot.ca.gov/data/d8/cctv/image/i210173025mileswestoflinden/i210173025mileswestoflinden.jpg' },
    { id: 'ca-d8-3', label: 'I-10 Monterrey Ave (Thousand Palms)', area: 'I-10', imageUrl: 'https://cwwp2.dot.ca.gov/data/d8/cctv/image/i10520monterreyavenue/i10520monterreyavenue.jpg' },
    // D11 - San Diego
    { id: 'ca-d11-1', label: 'SR-163 Friars (San Diego)', area: 'SR-163', imageUrl: 'https://cwwp2.dot.ca.gov/data/d11/cctv/image/c348sr163friarsneb/c348sr163friarsneb.jpg' },
    { id: 'ca-d11-2', label: 'SR-52 E of SR-125 (Santee)', area: 'SR-52', imageUrl: 'https://cwwp2.dot.ca.gov/data/d11/cctv/image/c116sr52justeastofsr125/c116sr52justeastofsr125.jpg' },
    { id: 'ca-d11-3', label: 'WB 8 Imperial (El Centro)', area: 'I-8', imageUrl: 'https://cwwp2.dot.ca.gov/data/d11/cctv/image/c318wb8imperialb/c318wb8imperialb.jpg' },
    // D12 - Orange County
    { id: 'ca-d12-1', label: 'I-5 N of Magnolia Ave (Anaheim)', area: 'I-5', imageUrl: 'https://cwwp2.dot.ca.gov/data/d12/cctv/image/i51northofmagnoliaavenuesouthofsr91/i51northofmagnoliaavenuesouthofsr91.jpg' },
    { id: 'ca-d12-2', label: 'SR-55 S of Meats Ave (Orange)', area: 'SR-55', imageUrl: 'https://cwwp2.dot.ca.gov/data/d12/cctv/image/sr55204southofmeatsavenue/sr55204southofmeatsavenue.jpg' },
    { id: 'ca-d12-3', label: 'SR-90 Shopping Ctr (Brea)', area: 'SR-90', imageUrl: 'https://cwwp2.dot.ca.gov/data/d12/cctv/image/sr90517shoppingctrsecorner/sr90517shoppingctrsecorner.jpg' },
  ],
};

export const DOT_SOURCES_EXTRA = {
  FL: FL_DOT,
  GA: GA_DOT,
  AZ: AZ_DOT,
  UT: UT_DOT,
  NV: NV_DOT,
  WI: WI_DOT,
  ID: ID_DOT,
  LA: LA_DOT,
  CA: CA_DOT,
};
