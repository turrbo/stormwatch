// DOT Traffic Camera data
// Pre-fetched from state DOT APIs (CORS prevents runtime browser fetching).
// Images load fine via <img> tags -- only the JSON discovery APIs are blocked.

const NYC_DOT = {
  label: 'New York City',
  state: 'NY',
  cameras: [
    { id: '9565e94d', label: 'Broadway @ 42 St', area: 'Midtown', imageUrl: 'https://webcams.nyctmc.org/api/cameras/9565e94d-66f2-4965-9c13-82d5500d6cfd/image' },
    { id: 'bc2fd2da', label: '7 Ave @ 43 St (PTZ)', area: 'Midtown', imageUrl: 'https://webcams.nyctmc.org/api/cameras/bc2fd2da-1d56-46fa-a1ab-8674fac93877/image' },
    { id: '053e8995', label: 'Broadway @ 45 St', area: 'Midtown', imageUrl: 'https://webcams.nyctmc.org/api/cameras/053e8995-f8cb-4d02-a659-70ac7c7da5db/image' },
    { id: 'c880d0c4', label: 'Broadway @ Columbus Circle', area: 'Midtown', imageUrl: 'https://webcams.nyctmc.org/api/cameras/c880d0c4-db84-44c2-9f00-62f21a83b5d0/image' },
    { id: '8f692f55', label: '2 Ave @ 42 St', area: 'Midtown', imageUrl: 'https://webcams.nyctmc.org/api/cameras/8f692f55-8118-423b-8bcb-1ea49eaf442b/image' },
    { id: '9bd74b87', label: '12 Ave @ 42 St', area: 'Midtown', imageUrl: 'https://webcams.nyctmc.org/api/cameras/9bd74b87-32d1-4767-8081-86a2e83f28f2/image' },
    { id: '25ad72fe', label: 'Holland Tunnel', area: 'Tunnel', imageUrl: 'https://webcams.nyctmc.org/api/cameras/25ad72fe-e74c-49af-b4c0-34c9eac14655/image' },
    { id: 'bb9ce48d', label: 'Lincoln Tunnel @ W 33 St', area: 'Tunnel', imageUrl: 'https://webcams.nyctmc.org/api/cameras/bb9ce48d-0458-4493-89ad-ae51065b5796/image' },
    { id: '86d418ab', label: 'West St @ Battery Tunnel', area: 'Tunnel', imageUrl: 'https://webcams.nyctmc.org/api/cameras/86d418ab-10bc-4b73-a283-153abffabb0f/image' },
    { id: 'ecba28cb', label: 'FDR Dr @ Brooklyn Bridge', area: 'Highway', imageUrl: 'https://webcams.nyctmc.org/api/cameras/ecba28cb-ac70-4d25-abcb-6506111ea120/image' },
    { id: 'c5040f93', label: 'FDR Dr @ 64 St', area: 'Highway', imageUrl: 'https://webcams.nyctmc.org/api/cameras/c5040f93-f4ec-4803-8370-8b931b0443e2/image' },
    { id: '155b2bff', label: 'FDR Dr @ 96 St', area: 'Highway', imageUrl: 'https://webcams.nyctmc.org/api/cameras/155b2bff-5dd2-4109-bd10-e098376c8476/image' },
    { id: '0267c1e2', label: 'FDR Dr @ 79 St', area: 'Highway', imageUrl: 'https://webcams.nyctmc.org/api/cameras/0267c1e2-6eaf-49d4-a063-df89e9242993/image' },
    { id: '936d479d', label: 'Harlem River Dr @ GWB Ramp', area: 'Highway', imageUrl: 'https://webcams.nyctmc.org/api/cameras/936d479d-402f-468a-b1c6-b2c2a68a0b4c/image' },
    { id: '8ea73365', label: 'BQE @ Sands St', area: 'Highway', imageUrl: 'https://webcams.nyctmc.org/api/cameras/8ea73365-6c7b-423a-87fc-4b6fc279dafa/image' },
    { id: '3576217a', label: 'BQE @ Pearl St', area: 'Highway', imageUrl: 'https://webcams.nyctmc.org/api/cameras/3576217a-82e8-4f2a-854f-3de97ef37362/image' },
    { id: '60fbce69', label: 'Brooklyn Bridge Entrance', area: 'Bridge', imageUrl: 'https://webcams.nyctmc.org/api/cameras/60fbce69-38fa-42b2-9ae8-41aea66abddf/image' },
    { id: '4f8c2e84', label: 'Central Park West @ 65 St', area: 'Park', imageUrl: 'https://webcams.nyctmc.org/api/cameras/4f8c2e84-c15a-4474-91fb-7e14554d4c4e/image' },
    { id: '8cc75cbc', label: 'Canal St @ Chrystie St', area: 'Downtown', imageUrl: 'https://webcams.nyctmc.org/api/cameras/8cc75cbc-e050-4947-aee8-639f63fe4ca7/image' },
    { id: '7cfc551d', label: 'Broadway @ Battery Pl', area: 'Downtown', imageUrl: 'https://webcams.nyctmc.org/api/cameras/7cfc551d-403d-46a8-aa74-89f472b7136b/image' },
  ],
};

const CT_DOT = {
  label: 'Connecticut',
  state: 'CT',
  cameras: [
    { imgId: 308, label: 'I-84 WB Vernon Exit 64', road: 'I-84' },
    { imgId: 325, label: 'I-84 WB W Hartford Exit 42', road: 'I-84' },
    { imgId: 342, label: 'I-91 SB Windsor Exit 38', road: 'I-91' },
    { imgId: 359, label: 'I-91 NB Rocky Hill Exit 23', road: 'I-91' },
    { imgId: 376, label: 'I-84 WB Waterbury Exit 19', road: 'I-84' },
    { imgId: 393, label: 'I-84 WB Manchester Exit 63', road: 'I-84' },
    { imgId: 427, label: 'I-91 SB Windsor Exit 37', road: 'I-91' },
    { imgId: 461, label: 'I-84 WB Newtown Exit 9', road: 'I-84' },
    { imgId: 546, label: 'I-95 NB Darien Exit 12', road: 'I-95' },
    { imgId: 563, label: 'I-95 NB Fairfield Exit 22', road: 'I-95' },
    { imgId: 580, label: 'I-95 SB Milford Exit 38', road: 'I-95' },
    { imgId: 597, label: 'I-95 SB Branford Exit 54', road: 'I-95' },
    { imgId: 614, label: 'I-91 NB New Haven Exit 8', road: 'I-91' },
    { imgId: 631, label: 'I-95 NB Clinton Exit 63', road: 'I-95' },
    { imgId: 309, label: 'I-84 EB Manchester Exit 63 (Tolland Tpke)', road: 'I-84' },
    { imgId: 352, label: 'I-91 SB Hartford Exit 27 (Airport Rd)', road: 'I-91' },
    { imgId: 396, label: 'I-84 WB W/O Exit 59 (Middle Tpke)', road: 'I-84' },
    { imgId: 438, label: 'I-91 SB Wethersfield Exit 25 (RT 3)', road: 'I-91' },
    { imgId: 480, label: 'I-91 SB Middletown S/O Exit 21', road: 'I-91' },
    { imgId: 521, label: 'RT 9 SB New Britain S/O Exit 35', road: 'RT-9' },
    { imgId: 564, label: 'I-95 SB Fairfield N/O Exit 24', road: 'I-95' },
    { imgId: 607, label: 'I-796 SB Milford Pkwy (East Rutland)', road: 'I-796' },
  ].map(c => ({
    id: `ct-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://ctroads.org/map/Cctv/${c.imgId}`,
  })),
};

const PA_DOT = {
  label: 'Pennsylvania',
  state: 'PA',
  cameras: [
    { imgId: 4691, label: 'I-176 EB @ SR 422 (Berks Co)', road: 'I-176' },
    { imgId: 4764, label: 'US 220 SB @ Loyalsock Creek', road: 'US-220' },
    { imgId: 4838, label: 'I-76 Turnpike @ Exit 286 Reading', road: 'I-76' },
    { imgId: 4910, label: 'I-83 @ Exit 21 (US 30 Arsenal Rd)', road: 'I-83' },
    { imgId: 5053, label: 'I-376 @ Technology Dr (Pittsburgh)', road: 'I-376' },
    { imgId: 5413, label: 'I-81 @ Exit 14 (Wayne Ave)', road: 'I-81' },
    { imgId: 5486, label: 'I-78 @ Exit 75 (Morgan Hill Rd)', road: 'I-78' },
    { imgId: 5558, label: 'I-376 WB @ Edgewood/Swissvale', road: 'I-376' },
    { imgId: 5704, label: 'I-81 @ Exit 57 Mechanicsburg', road: 'I-81' },
    { imgId: 5847, label: 'PA 283 @ Spooky Nook Rd', road: 'PA-283' },
    { imgId: 5993, label: 'I-83 @ Exit 8 (Glen Rock)', road: 'I-83' },
    { imgId: 6068, label: 'I-81 @ Exit 170', road: 'I-81' },
  ].map(c => ({
    id: `pa-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://511pa.com/map/Cctv/${c.imgId}`,
  })),
};

const VT_DOT = {
  label: 'Vermont',
  state: 'VT',
  cameras: [
    { imgId: 950, label: 'Waterbury I-89 North', road: 'I-89' },
    { imgId: 969, label: 'Shaftsbury US-7', road: 'US-7' },
    { imgId: 1008, label: 'Waterford I-93 South', road: 'I-93' },
    { imgId: 1025, label: 'Milton US-2 West', road: 'US-2' },
    { imgId: 1423, label: 'Berlin I-89 South', road: 'I-89' },
  ].map(c => ({
    id: `vt-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://www.newengland511.org/map/Cctv/${c.imgId}`,
  })),
};

const NH_DOT = {
  label: 'New Hampshire',
  state: 'NH',
  cameras: [
    { imgId: 875, label: 'NH-101 WB MM 85.6', road: 'NH-101' },
    { imgId: 1243, label: 'I-89 N MM 21.6', road: 'I-89' },
    { imgId: 1259, label: 'NH-101 W MM 61.2', road: 'NH-101' },
    { imgId: 1276, label: 'NH-16 / NH-302 Eastman', road: 'NH-16' },
    { imgId: 1292, label: 'I-293 N MM 7.5', road: 'I-293' },
    { imgId: 1308, label: 'I-93 N MM 16.2', road: 'I-93' },
    { imgId: 1325, label: 'I-93 N MM 33.4', road: 'I-93' },
    { imgId: 1341, label: 'NH-101 E MM 53.8', road: 'NH-101' },
    { imgId: 1357, label: 'I-95 SS MM 15.4', road: 'I-95' },
    { imgId: 1373, label: 'I-95 SS MM 5.6', road: 'I-95' },
    { imgId: 1389, label: 'I-93 S MM 95.9', road: 'I-93' },
    { imgId: 1405, label: 'I-93 N MM 50.8', road: 'I-93' },
  ].map(c => ({
    id: `nh-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://www.newengland511.org/map/Cctv/${c.imgId}`,
  })),
};

const ME_DOT = {
  label: 'Maine',
  state: 'ME',
  cameras: [
    { imgId: 2076, label: 'I-95 Mile 161 SB (Plymouth)', road: 'I-95' },
    { imgId: 2095, label: 'I-295 Mile 43 SB (Bowdoinham)', road: 'I-295' },
    { imgId: 2119, label: 'I-95 Mile 109 NB (Augusta)', road: 'I-95' },
    { imgId: 2144, label: 'I-295 Mile 10 SB (Falmouth)', road: 'I-295' },
    { imgId: 2177, label: 'I-295 Mile 07 SB (Portland)', road: 'I-295' },
    { imgId: 2220, label: 'I-95 (Hampden)', road: 'I-95' },
    { imgId: 2240, label: 'I-395 Mile 4 WB (Brewer)', road: 'I-395' },
    { imgId: 2264, label: 'US-1A Mile 63 NB (Ellsworth)', road: 'US-1A' },
  ].map(c => ({
    id: `me-${c.imgId}`,
    label: c.label,
    area: c.road,
    imageUrl: `https://www.newengland511.org/map/Cctv/${c.imgId}`,
  })),
};

import { DOT_SOURCES_EXTRA } from './dotCamerasWest';
import { DOT_SOURCES_NW } from './dotCamerasNorthwest';
import { DOT_SOURCES_MORE } from './dotCamerasMore';

export const DOT_SOURCES = {
  // Northeast
  NYC: NYC_DOT,
  CT: CT_DOT,
  PA: PA_DOT,
  NH: NH_DOT,
  VT: VT_DOT,
  ME: ME_DOT,
  // Southeast, Midwest, West (from dotCamerasWest.js)
  ...DOT_SOURCES_EXTRA,
  // Northwest - Oregon TripCheck + Washington WSDOT
  ...DOT_SOURCES_NW,
  // Additional states - CO, IN, MN, KS, NE, SC, AL, NY State
  ...DOT_SOURCES_MORE,
};

// Note: NJ, MA, RI, DE DOT APIs are either blocked by firewalls (NJ),
// behind SPAs requiring authentication (MA), or have no public camera API (RI, DE).
// TN, NC, TX, MD, MI, MO, IL DOT APIs require auth, use incompatible platforms, or are behind SPAs.
