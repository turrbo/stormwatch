// DOT Traffic Camera data - Oregon (TripCheck) + Washington (WSDOT)
// Oregon: images from tripcheck.com (no auth required)
// Washington: images from images.wsdot.wa.gov (no auth required)

const OR_DOT = {
  label: 'Oregon',
  state: 'OR',
  cameras: [
    { id: 'or-101-astoria', label: 'US101 at Astoria - Megler Bridge', area: 'US-101', imageUrl: 'https://tripcheck.com/RoadCams/cams/AstoriaUS101MeglerBrNB_pid392.jpg' },
    { id: 'or-217-allen', label: 'OR217 at Allen', area: 'OR-217', imageUrl: 'https://tripcheck.com/RoadCams/cams/217allen_pid404.jpg' },
    { id: 'or-205-powell', label: 'I-205 at Powell', area: 'I-205', imageUrl: 'https://tripcheck.com/RoadCams/cams/i205powl_pid497.jpg' },
    { id: 'or-26-zoo', label: 'US26 at Zoo Bridge', area: 'US-26', imageUrl: 'https://tripcheck.com/RoadCams/cams/26Zoo_pid498.jpg' },
    { id: 'or-217-denney', label: 'OR217 at Denney', area: 'OR-217', imageUrl: 'https://tripcheck.com/RoadCams/cams/217denney_pid516.jpg' },
    { id: 'or-26-217', label: 'US26 at OR217', area: 'US-26', imageUrl: 'https://tripcheck.com/RoadCams/cams/26_217_pid523.jpg' },
    { id: 'or-99w-bertha', label: 'OR99W at Bertha', area: 'OR-99W', imageUrl: 'https://tripcheck.com/RoadCams/cams/99wbertha_pid530.jpg' },
    { id: 'or-205-92nd', label: 'I-205 at 92nd', area: 'I-205', imageUrl: 'https://tripcheck.com/RoadCams/cams/i20592nd_pid532.jpg' },
    { id: 'or-405-everett', label: 'I-405 at Everett', area: 'I-405', imageUrl: 'https://tripcheck.com/RoadCams/cams/i405everett_pid545.jpg' },
    { id: 'or-405-fourth', label: 'I-405 at Fourth', area: 'I-405', imageUrl: 'https://tripcheck.com/RoadCams/cams/i405fourth_pid546.jpg' },
    { id: 'or-5-217', label: 'I-5 at OR217', area: 'I-5', imageUrl: 'https://tripcheck.com/RoadCams/cams/i5217_pid548.jpg' },
    { id: 'or-5-405', label: 'I-5 at I-405 - Naito Pkwy', area: 'I-5', imageUrl: 'https://tripcheck.com/RoadCams/cams/i5at405_pid549.jpg' },
    { id: 'or-84-102nd', label: 'I-84 at 102nd', area: 'I-84', imageUrl: 'https://tripcheck.com/RoadCams/cams/i84102nd_pid576.jpg' },
    { id: 'or-84-105th', label: 'I-84 at 105th', area: 'I-84', imageUrl: 'https://tripcheck.com/RoadCams/cams/i84105th_pid577.jpg' },
    { id: 'or-140-bly', label: 'OR140 at Bly Mountain', area: 'OR-140', imageUrl: 'https://tripcheck.com/RoadCams/cams/BlyMtn_pid606.jpg' },
    { id: 'or-101-cape', label: 'US101 at Cape Cove', area: 'US-101', imageUrl: 'https://tripcheck.com/RoadCams/cams/CapeCove_pid618.jpg' },
    { id: 'or-22-detroit', label: 'OR22 at Detroit', area: 'OR-22', imageUrl: 'https://tripcheck.com/RoadCams/cams/Detroit1_pid622.jpg' },
    { id: 'or-18-murphy', label: 'OR18 at Murphy Hill', area: 'OR-18', imageUrl: 'https://tripcheck.com/RoadCams/cams/MurphyHill_pid643.jpg' },
    { id: 'or-20-sisters', label: 'US20 at Sisters', area: 'US-20', imageUrl: 'https://tripcheck.com/RoadCams/cams/Sisters_pid653.jpg' },
    { id: 'or-18-valley', label: 'OR18 at Valley Junction', area: 'OR-18', imageUrl: 'https://tripcheck.com/RoadCams/cams/ValleyJunction_pid656.jpg' },
    { id: 'or-58-willamette', label: 'OR58 at Willamette Pass', area: 'OR-58', imageUrl: 'https://tripcheck.com/RoadCams/cams/WillamettePass_pid658.jpg' },
    { id: 'or-140-lake', label: 'OR140 at Lake of the Woods', area: 'OR-140', imageUrl: 'https://tripcheck.com/RoadCams/cams/LakeoftheWoods_pid743.jpg' },
  ],
};

const WA_DOT = {
  label: 'Washington',
  state: 'WA',
  cameras: [
    { id: 'wa-5-interstate', label: 'I-5 at Interstate Bridge', area: 'I-5', imageUrl: 'https://images.wsdot.wa.gov/sw/005vc00032.jpg' },
    { id: 'wa-5-sr14', label: 'I-5 at SR 14 / Washington Way', area: 'I-5', imageUrl: 'https://images.wsdot.wa.gov/sw/005vc00044.jpg' },
    { id: 'wa-5-sr502n', label: 'I-5 NB at SR 502 On Ramp', area: 'I-5', imageUrl: 'https://images.wsdot.wa.gov/sw/005vc01165.jpg' },
    { id: 'wa-5-sr16', label: 'I-5 SB at SR 16 Interchange', area: 'I-5', imageUrl: 'https://images.wsdot.wa.gov/orflow/005vc13240.jpg' },
    { id: 'wa-5-klickitat', label: 'I-5 NB at Klickitat Dr', area: 'I-5', imageUrl: 'https://images.wsdot.wa.gov/nw/005vc15413.jpg' },
    { id: 'wa-405-southcenter', label: 'I-405 at Southcenter', area: 'I-405', imageUrl: 'https://images.wsdot.wa.gov/nw/405vc00034.jpg' },
    { id: 'wa-405-andover', label: 'I-405 at Andover Park W', area: 'I-405', imageUrl: 'https://images.wsdot.wa.gov/nw/405vc00052.jpg' },
    { id: 'wa-405-se1st', label: 'I-405 at SE 1st St (Bellevue)', area: 'I-405', imageUrl: 'https://images.wsdot.wa.gov/nw/405vc01321.jpg' },
    { id: 'wa-405-ne2nd', label: 'I-405 at NE 2nd Pl (Bellevue)', area: 'I-405', imageUrl: 'https://images.wsdot.wa.gov/nw/405vc01345.jpg' },
    { id: 'wa-182-queensgate', label: 'I-182 at Queensgate Ave', area: 'I-182', imageUrl: 'https://images.wsdot.wa.gov/SC/182vc00238.jpg' },
    { id: 'wa-182-jadwin', label: 'I-182 at Jadwin Ave', area: 'I-182', imageUrl: 'https://images.wsdot.wa.gov/sc/182VC00435.jpg' },
    { id: 'wa-205-st-johns', label: 'SR 205 at St Johns Rd', area: 'SR-205', imageUrl: 'https://images.wsdot.wa.gov/sw/205vc03434.jpg' },
    { id: 'wa-82-manastash', label: 'I-82 at Manastash Ridge Summit', area: 'I-82', imageUrl: 'https://images.wsdot.wa.gov/rweather/UMRidge_medium.jpg' },
    { id: 'wa-305-winslow-n', label: 'SR 305 at Winslow Way North', area: 'SR-305', imageUrl: 'https://images.wsdot.wa.gov/orflow/305vc00023.jpg' },
    { id: 'wa-525-mukilteo', label: 'SR 525 at Mukilteo Ferry', area: 'SR-525', imageUrl: 'https://images.wsdot.wa.gov/nw/525vc00694.jpg' },
  ],
};

export const DOT_SOURCES_NW = {
  OR: OR_DOT,
  WA: WA_DOT,
};
