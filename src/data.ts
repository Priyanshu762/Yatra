import type { Destination, TourPackage, Vehicle, Driver, Booking, PaymentRecord } from './types';


export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The Eternal Ghats & Sacred Dawn Riverfronts',
    description: 'Mark Twain famously observed that Varanasi is older than history, older than tradition, older even than legend. Experience private dawn wooden boat rides on the Ganges, exclusive access to evening Ganga Aarti terraces, and secret lanes of classical silk master weavers.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to March',
    idealDuration: '3 - 4 Days',
    culturalHighlights: ['Dashashwamedh Ganga Aarti VIP terrace', 'Subah-e-Banaras classical music dawn', 'Centuries-old Kashi Vishwanath corridor', 'Sarnath Buddhist Deer Park'],
    signatureExperiences: ['Private Bajra boat with live Shehnai recitals at sunrise', 'Banarasi Brocade atelier walk with master weavers', 'Awadhi-Bihari royal thali at BrijRama Palace'],
    weather: '18°C – 26°C (Pleasant winters, crisp river mornings)'
  },
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    state: 'Uttar Pradesh',
    tagline: 'Sovereign City of the Epics on Sacred Sarayu',
    description: 'Revered as the divine birthplace of Lord Rama, modern Ayodhya blends grand timeless devotion with tranquil riverside heritage. Stroll the illuminated Ram ki Paidi, attend the Sarayu Maha Aarti by luxury solar barge, and marvel at the intricate pink sandstone architecture of the Ram Mandir.',
    heroImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    idealDuration: '2 - 3 Days',
    culturalHighlights: ['Shri Ram Janmabhoomi Temple Complex', 'Sarayu River Solar Cruise & Evening Aarti', 'Kanak Bhawan gold palace sanctum', 'Hanuman Garhi fortress shrine'],
    signatureExperiences: ['Curated scholar-led Ramayana circuit walk', 'Private riverfront lantern release at Guptar Ghat', 'Satvik Awadhi temple culinary degustation'],
    weather: '16°C – 25°C (Sunny days, serene breezy evenings)'
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    tagline: 'The Awadhi Renaissance of Gastronomy & Grace',
    description: 'The golden capital of the Nawabs is celebrated worldwide for its unmatched Tehzeeb (refined court etiquette), exquisite Chikankari embroidery, and legendary royal Dastarkhwan cuisines that evolved over centuries in royal palace kitchens.',
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to March',
    idealDuration: '3 - 4 Days',
    culturalHighlights: ['Bara Imambara & Acoustical Bhool Bhulaiya', 'Rumi Darwaza Turkish Gateway', 'The British Residency garden ruins', 'Chowk artisan perfume & zardozi alleys'],
    signatureExperiences: ['Private Nawabi Dastarkhwan feast with Royal descendants', 'Master artisan Chikan embroidery studio residency', 'Heritage evening Ghazal session in a private colonial Kothi'],
    weather: '17°C – 27°C (Mild winter sun, cool nights)'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of Royal Bastions & Sovereign Ateliers',
    description: 'Encircled by rugged Aravalli crests and majestic pink sandstone ramparts, Jaipur remains India’s living royal theatre. Relish private tours of City Palace inner residential chambers, dawn hot-air balloon flights above Amer Fort, and gemstone ateliers.',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602339752474-f77aa7bc3efb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to March',
    idealDuration: '4 - 5 Days',
    culturalHighlights: ['Amer Fort & Sheesh Mahal mirror palace', 'City Palace private Chandra Mahal access', 'Hawa Mahal honeycomb facade at dawn', 'Jantar Mantar astronomical observatory'],
    signatureExperiences: ['Royal High Tea inside the Maharaja’s private courtyard', 'Hand-block printing masterclass at Bagru village', 'Vintage luxury car drive through the walled gates of the old city'],
    weather: '15°C – 28°C (Pleasantly warm days, crisp desert nights)'
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'Mughal Splendour, Ivory Marble & Dynastic Legacies',
    description: 'Home to the monument that defines eternal love, Agra is a treasure trove of Persian garden pavilions, red sandstone fortresses, and delicate pietra dura marble craftsmanship commissioned by Mughal emperors.',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to March',
    idealDuration: '2 - 3 Days',
    culturalHighlights: ['Taj Mahal private sunrise entry', 'Agra Fort royal palatial quarters', 'Mehtab Bagh moonlit sunset vantage', 'Fatehpur Sikri ghost city red pavilions'],
    signatureExperiences: ['Secret dawn photography session with national heritage scholar', 'Private garden sunset high tea overlooking the Yamuna river', 'Pietra Dura master craftsman stone inlay demonstration'],
    weather: '16°C – 26°C (Sunny mornings, golden sunsets)'
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'National Capital Territory',
    tagline: 'The Seven Citadels & Imperial Boulevards',
    description: 'A grand metropolis where eight centuries of dynasties interlace with leafy Lutyens avenues, world-class art galleries, and vibrant culinary corridors. Delhi is the historic prologue and culmination of sovereign Indian travel.',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    idealDuration: '3 - 4 Days',
    culturalHighlights: ['Humayun’s Tomb UNESCO Persian gardens', 'Qutub Minar 12th-century minaret', 'Chandni Chowk Old Delhi spice alleys', 'Rashtrapati Bhavan ceremonial avenues'],
    signatureExperiences: ['Private curated rickshaw gastronomy trail through Shahjahanabad', 'Private after-hours tour of National Craft Museum', 'Lutyens architectural salon dinner with historic biographers'],
    weather: '16°C – 27°C (Crisp autumn & winter season)'
  }
];

export const INITIAL_VEHICLES: Vehicle[] = [
  // --- BUDGET SEDANS ---
  {
    id: 'V-B1',
    name: 'Maruti Suzuki Dzire (AC)',
    category: 'Budget Sedan',
    capacitySeats: 4,
    luggageCapacity: 2,
    dailySurcharge: 1200,
    ratePerKm: 12,
    baseFare: 300,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    amenities: ['Clean AC', 'Mobile Charging', 'Mineral Water', 'First Aid Kit'],
    registrationNumber: 'UP 65 BJ 1122',
    status: 'Available',
    fuelType: 'CNG / Petrol',
    year: 2023
  },
  {
    id: 'V-B2',
    name: 'Toyota Etios / Honda Amaze (AC)',
    category: 'Budget Sedan',
    capacitySeats: 4,
    luggageCapacity: 2,
    dailySurcharge: 1400,
    ratePerKm: 13,
    baseFare: 350,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    amenities: ['Clean AC Cabin', 'USB Charger', 'Neat Interior', 'Water Bottle'],
    registrationNumber: 'UP 70 AA 5501',
    status: 'Available',
    fuelType: 'Petrol / CNG',
    year: 2023
  },
  // --- COMFORT MPVs ---
  {
    id: 'V-C1',
    name: 'Maruti Suzuki Ertiga 7-Seater (AC)',
    category: 'Comfort Sedan',
    capacitySeats: 6,
    luggageCapacity: 3,
    dailySurcharge: 1800,
    ratePerKm: 15,
    baseFare: 450,
    image: 'https://images.unsplash.com/photo-1571987502227-9231b837d92a?auto=format&fit=crop&w=800&q=80',
    amenities: ['7-Seat AC Cabin', 'Fold-Flat Luggage Row', 'Charging Ports', 'Fresh Water'],
    registrationNumber: 'UP 65 ER 4433',
    status: 'Available',
    fuelType: 'CNG / Petrol',
    year: 2024
  },
  {
    id: 'V-C2',
    name: 'Kia Carens / Maruti XL6 (AC)',
    category: 'Comfort Sedan',
    capacitySeats: 6,
    luggageCapacity: 3,
    dailySurcharge: 2000,
    ratePerKm: 16,
    baseFare: 500,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    amenities: ['Spacious 6-Seat AC Cabin', 'Panoramic Sunroof', 'USB-C Chargers', 'Water & Snacks'],
    registrationNumber: 'UP 32 KC 7788',
    status: 'Available',
    fuelType: 'Diesel',
    year: 2024
  },
  // --- EXECUTIVE MPVs ---
  {
    id: 'V-01',
    name: 'Toyota Innova Crysta ZX (AC)',
    category: 'Executive MPV',
    capacitySeats: 6,
    luggageCapacity: 4,
    dailySurcharge: 3500,
    ratePerKm: 18,
    baseFare: 700,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    amenities: ['Captain Reclining Seats', 'Dual Zone Climate AC', 'Mineral Water & Mints', 'Wi-Fi Hotspot', 'USB-C Chargers'],
    registrationNumber: 'UP 65 AT 9021',
    status: 'Available',
    fuelType: 'Diesel',
    year: 2024
  },
  {
    id: 'V-E2',
    name: 'Toyota Innova HyCross (Hybrid)',
    category: 'Executive MPV',
    capacitySeats: 6,
    luggageCapacity: 4,
    dailySurcharge: 4500,
    ratePerKm: 20,
    baseFare: 800,
    image: 'https://images.unsplash.com/photo-1576120184793-8b30f66b46c3?auto=format&fit=crop&w=800&q=80',
    amenities: ['Electric-Hybrid Smooth Ride', 'Ottoman Rear Seats', 'Wireless Charging', 'Cool Box', 'Ambient Lighting'],
    registrationNumber: 'RJ 14 HC 2024',
    status: 'Available',
    fuelType: 'Hybrid',
    year: 2025
  },
  // --- LUXURY SEDANS ---
  {
    id: 'V-02',
    name: 'Mercedes-Benz E-Class Exclusive',
    category: 'Luxury Chauffeur Sedan',
    capacitySeats: 3,
    luggageCapacity: 3,
    dailySurcharge: 8500,
    ratePerKm: 28,
    baseFare: 1500,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    amenities: ['Burmester 3D Surround Audio', 'Panoramic Sunroof', 'Rear Executive Console', 'Lavender Hand Towels', 'Daily Newspaper'],
    registrationNumber: 'DL 01 CA 4488',
    status: 'Available',
    fuelType: 'Petrol',
    year: 2024
  },
  {
    id: 'V-05',
    name: 'BMW 5 Series M-Sport',
    category: 'Luxury Chauffeur Sedan',
    capacitySeats: 3,
    luggageCapacity: 3,
    dailySurcharge: 9000,
    ratePerKm: 30,
    baseFare: 1800,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    amenities: ['Harman Kardon Sound', 'Perforated Leather', 'Rear Privacy Blinds', 'Executive Tray Table', 'Amenity Kit'],
    registrationNumber: 'DL 03 Z 3110',
    status: 'Available',
    fuelType: 'Petrol',
    year: 2024
  },
  // --- LUXURY SUVs ---
  {
    id: 'V-L1',
    name: 'Toyota Fortuner Sigma 4 (Premium)',
    category: 'Luxury SUV',
    capacitySeats: 6,
    luggageCapacity: 5,
    dailySurcharge: 6500,
    ratePerKm: 24,
    baseFare: 1200,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    amenities: ['High Ground Clearance', '6-Seat Leather Interior', 'Sunroof', 'Premium Music System', 'Chilled Water & Towels'],
    registrationNumber: 'UP 78 FT 3344',
    status: 'Available',
    fuelType: 'Diesel',
    year: 2024
  },
  // --- ROYAL LOUNGE ---
  {
    id: 'V-03',
    name: 'Toyota Vellfire Royal Executive Lounge',
    category: 'Royal Lounge Cruiser',
    capacitySeats: 4,
    luggageCapacity: 5,
    dailySurcharge: 14500,
    ratePerKm: 38,
    baseFare: 2500,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    amenities: ['Airline Ottoman Recliners', 'Heated & Massage Seats', 'Star-Light Ceiling', 'Champagne Chiller', 'Noise-Cancelling Cabin'],
    registrationNumber: 'RJ 14 YA 7777',
    status: 'Available',
    fuelType: 'Hybrid',
    year: 2025
  },
  // --- TEMPO TRAVELLERS ---
  {
    id: 'V-04',
    name: 'Force Urbania 9-Seater (AC)',
    category: 'Maharaja Tempo Lounge',
    capacitySeats: 9,
    luggageCapacity: 8,
    dailySurcharge: 8000,
    ratePerKm: 22,
    baseFare: 1000,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    amenities: ['9 Recliner Seats', 'Full Standing Cabin', 'Individual AC Vents', '43-inch Screen', 'Luggage Compartment'],
    registrationNumber: 'UP 32 BK 5520',
    status: 'Available',
    fuelType: 'Diesel',
    year: 2024
  },
  {
    id: 'V-T2',
    name: 'Tempo Traveller 12-Seater (AC)',
    category: 'Traveller Van',
    capacitySeats: 12,
    luggageCapacity: 10,
    dailySurcharge: 6000,
    ratePerKm: 20,
    baseFare: 900,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    amenities: ['12 Pushback AC Seats', 'Overhead Luggage Rack', 'USB Charging', 'Cool Curtains', 'First Aid & Safety Kit'],
    registrationNumber: 'UP 65 TT 8801',
    status: 'Available',
    fuelType: 'Diesel',
    year: 2023
  },
  {
    id: 'V-06',
    name: 'Mercedes Sprinter Luxury 12-Seater',
    category: 'Maharaja Tempo Lounge',
    capacitySeats: 12,
    luggageCapacity: 12,
    dailySurcharge: 16000,
    ratePerKm: 40,
    baseFare: 3000,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    amenities: ['Business Class Seating', 'Onboard Tea & Espresso Bar', 'Satellite Wi-Fi', 'Audio Jacks', 'Panoramic Tinted Windows'],
    registrationNumber: 'RJ 14 ZZ 1990',
    status: 'Available',
    fuelType: 'Diesel',
    year: 2024
  }
];


export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'D-01',
    name: 'Raghvendra Pratap Singh',
    experienceYears: 15,
    languages: ['Hindi', 'English', 'Bhojpuri'],
    rating: 4.98,
    phone: '+91 98391 44520',
    licenseNumber: 'UP65-2009-0044912',
    specialtyRegions: ['Varanasi', 'Ayodhya', 'Lucknow'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    status: 'Active',
    completedTrips: 342
  },
  {
    id: 'D-02',
    name: 'Vikramaditya Singh Rathore',
    experienceYears: 13,
    languages: ['Hindi', 'English', 'Marwari'],
    rating: 4.96,
    phone: '+91 94140 88219',
    licenseNumber: 'RJ14-2011-0089123',
    specialtyRegions: ['Jaipur', 'Agra', 'Delhi'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    status: 'Active',
    completedTrips: 288
  },
  {
    id: 'D-03',
    name: 'Mohammad Tariq Alvi',
    experienceYears: 18,
    languages: ['Hindi', 'Urdu', 'English'],
    rating: 4.99,
    phone: '+91 99192 11094',
    licenseNumber: 'UP32-2006-0012093',
    specialtyRegions: ['Lucknow', 'Agra', 'Delhi'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    status: 'Active',
    completedTrips: 410
  },
  {
    id: 'D-04',
    name: 'Harpreet Singh Sethi',
    experienceYears: 11,
    languages: ['Hindi', 'Punjabi', 'English'],
    rating: 4.95,
    phone: '+91 98111 63012',
    licenseNumber: 'DL01-2013-0056122',
    specialtyRegions: ['Delhi', 'Agra', 'Jaipur'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    status: 'Active',
    completedTrips: 215
  },
  {
    id: 'D-05',
    name: 'Devendra Kumar Sharma',
    experienceYears: 10,
    languages: ['Hindi', 'English'],
    rating: 4.97,
    phone: '+91 97950 33811',
    licenseNumber: 'UP42-2014-0098110',
    specialtyRegions: ['Ayodhya', 'Varanasi'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    status: 'Active',
    completedTrips: 198
  }
];

export const INITIAL_PACKAGES: TourPackage[] = [
  {
    id: 'PKG-01',
    slug: 'varanasi-spiritual-odyssey',
    title: 'Varanasi Dawn to Twilight: Spiritual Odyssey',
    subtitle: 'Private Bajra boat cruises, VIP Ganga Aarti terrace access & silk weaver masterclass',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    durationDays: 3,
    durationNights: 2,
    basePricePerPerson: 24500,
    rating: 4.96,
    reviewCount: 48,
    theme: 'Spiritual',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'An intimately curated journey through Kashi, the world’s oldest continuously inhabited sacred city. Travel seamlessly with a dedicated chauffeur, private luxury wooden boat at sunrise, certified Vedic scholar guidance, and five-star heritage riverside hospitality.',
    groupType: 'Private Chauffeured Journey',
    pickupPoints: ['Lal Bahadur Shastri International Airport (VNS)', 'Varanasi Cantt Railway Station', 'Any City Centre Hotel'],
    inclusions: [
      'Private dedicated luxury chauffeur vehicle for all 3 days',
      '2 nights stay in luxury heritage courtyard hotel with gourmet breakfast',
      'Exclusive private Bajra boat with live Shehnai recitals at sunrise',
      'Reserved VIP rooftop terrace seating for Dashashwamedh Ghat Ganga Aarti',
      'Certified historian-scholar guide for Kashi Vishwanath & Sarnath',
      'Private Master Weaver silk atelier walkthrough in Madanpura',
      'Chilled mineral water, organic wet towels, and snacks onboard vehicle'
    ],
    exclusions: [
      'Commercial airline or train tickets',
      'Personal temple donation offerings (Dakshina)',
      'Alcoholic beverages and laundry services',
      'Gratuities for chauffeur and scholar'
    ],
    supportedVehicles: ['V-01', 'V-02', 'V-03', 'V-04'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival in Sacred Kashi & Sunset Boat to Dashashwamedh',
        description: 'Chauffeur airport reception in your chosen executive vehicle. Check into your heritage mansion suite. In the evening, embark on a private wooden barge toward Dashashwamedh Ghat for the spectacular Maha Aarti with reserved terrace seats away from the crowds.',
        highlights: ['Airport VIP pickup', 'BrijRama Palace check-in', 'Private Aarti terrace seating', 'Awadhi-Kashi welcome dinner'],
        meals: 'Dinner included',
        stay: 'Taj Nadesar Palace or BrijRama Heritage'
      },
      {
        day: 2,
        title: 'Subah-e-Banaras, Kashi Vishwanath Corridor & Sarnath',
        description: 'At 5:30 AM, board a private Bajra for the legendary Subah-e-Banaras as chants rise from Manikarnika and Assi ghats. Later, proceed to the Kashi Vishwanath Temple corridor via priority scholar passage, followed by an afternoon excursion to the peaceful Buddhist Deer Park at Sarnath.',
        highlights: ['Dawn wooden boat excursion', 'Priority temple corridor entry', 'Sarnath Dhamek Stupa & Museum', 'Centuries-old silk brocade atelier'],
        meals: 'Breakfast & High Tea included',
        stay: 'Taj Nadesar Palace or BrijRama Heritage'
      },
      {
        day: 3,
        title: 'Akharas, Madanpura Silk Walk & Farewell Departure',
        description: 'Morning walk to the traditional Tulsi Akhara to witness ancient mud-wrestling rituals and temple philosophy. Enjoy a relaxed breakfast overlooking the river. Chauffeur drop to Varanasi Airport for your onward journey.',
        highlights: ['Tulsi Akhara traditional mud wrestling', 'Artisanal spice & sweet tasting', 'Chauffeured airport transfer'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-02',
    slug: 'sacred-twin-citadels-ayodhya-varanasi',
    title: 'Sacred Twin Citadels: Ayodhya & Varanasi Circuit',
    subtitle: 'The ultimate 5-day spiritual highway connecting the Sarayu and Ganga rivers',
    destinationId: 'ayodhya',
    destinationName: 'Ayodhya & Varanasi',
    durationDays: 5,
    durationNights: 4,
    basePricePerPerson: 42000,
    rating: 4.98,
    reviewCount: 39,
    theme: 'Spiritual',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Witness India’s deepest devotion across two legendary sacred capitals. Experience the newly consecrated grandeur of Ayodhya’s Ram Mandir followed by the eternal riverfront mysticism of Varanasi, chauffeured along scenic Uttar Pradesh expressways.',
    groupType: 'Bespoke Chauffeur Circuit',
    pickupPoints: ['Ayodhya Maharishi Valmiki Airport', 'Lucknow Airport', 'Varanasi Airport'],
    inclusions: [
      'Dedicated private chauffeur vehicle for entire 5-day multi-city journey',
      '2 nights in Ayodhya boutique heritage hotel + 2 nights in Varanasi luxury property',
      'Priority Ram Janmabhoomi darshan facilitation & Hanuman Garhi visit',
      'Exclusive Sarayu river solar cruise during evening aarti',
      'Private sunrise boat on the Ganges & VIP Dashashwamedh Aarti pass',
      'All toll taxes, highway interstate permits, driver allowances',
      'Daily curated breakfasts and authentic regional satvik dinners'
    ],
    exclusions: ['Flights to/from UP', 'Personal religious offerings', 'Laundry and minibar'],
    supportedVehicles: ['V-01', 'V-02', 'V-03', 'V-04'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Ayodhya Arrival & Sarayu River Aarti Solar Cruise',
        description: 'Chauffeur welcome at Ayodhya or Lucknow. Check into your royal estate suite. Late afternoon Sarayu river solar boat cruise with devotional Vedic chants, concluding with the mesmerizing Sarayu Maha Aarti at Ram ki Paidi.',
        highlights: ['Chauffeur reception', 'Sarayu solar barge cruise', 'Ram ki Paidi illuminated ghats', 'Satvik Awadhi dinner'],
        meals: 'Dinner included',
        stay: 'The Royal Heritage Ayodhya'
      },
      {
        day: 2,
        title: 'Shri Ram Janmabhoomi Complex & Kanak Bhawan',
        description: 'Morning guided walk to the monumental Shri Ram Janmabhoomi Temple. Continue to the ancient fortress shrine of Hanuman Garhi and the gold-adorned palace of Kanak Bhawan with an expert Ramayana chronicler.',
        highlights: ['Ram Mandir exploration', 'Hanuman Garhi steps', 'Kanak Bhawan architecture', 'Guptar Ghat sunset meditation'],
        meals: 'Breakfast & Lunch included',
        stay: 'The Royal Heritage Ayodhya'
      },
      {
        day: 3,
        title: 'Expressway Drive to Varanasi & Evening Ghats Initiation',
        description: 'Scenic 4-hour chauffeured drive along the Purvanchal & Varanasi corridor. Check into your heritage hotel on the banks of the Ganges. Evening orientation walk through old Kashi alleys with a scholar.',
        highlights: ['Smooth highway transfer', 'Arrival in Varanasi', 'Riverfront welcome drink', 'Ganges dusk view'],
        meals: 'Breakfast & Dinner included',
        stay: 'Taj Ganges or BrijRama Palace'
      },
      {
        day: 4,
        title: 'Ganges Dawn Cruise, Kashi Vishwanath & Sarnath',
        description: 'Subah-e-Banaras dawn boat ride with classical flute recitals. Visit the Kashi Vishwanath temple corridor and spend a peaceful afternoon at Sarnath where Lord Buddha gave his first sermon.',
        highlights: ['Ganges dawn boat', 'Kashi Vishwanath Corridor', 'Sarnath Dhamek Stupa', 'VIP Aarti Terrace'],
        meals: 'Breakfast included',
        stay: 'Taj Ganges or BrijRama Palace'
      },
      {
        day: 5,
        title: 'Silk Weavers Atelier & Airport Departure',
        description: 'Visit Madanpura to observe fourth-generation gold zari zardozi and Banarasi silk weaving. Private chauffeur transfer to Varanasi International Airport.',
        highlights: ['Brocade masterclass', 'Banarasi pan and lassi tasting', 'Airport drop'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-03',
    slug: 'royal-awadh-epics-lucknow-gastronomy',
    title: 'Royal Awadh Epics: Lucknow Gastronomy & Architecture',
    subtitle: 'Nawabi palace salons, secret Dum Pukht kitchen archives & Chikankari ateliers',
    destinationId: 'lucknow',
    destinationName: 'Lucknow',
    durationDays: 4,
    durationNights: 3,
    basePricePerPerson: 32500,
    rating: 4.97,
    reviewCount: 31,
    theme: 'Culinary & Culture',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Immerse yourself in India’s most elegant courtly heritage. From the world’s largest unsupported vaulted arch at Bara Imambara to private 8-course Dastarkhwan feasts prepared by descendants of royal Khansamas.',
    groupType: 'Curated Heritage & Culinary Journey',
    pickupPoints: ['Chaudhary Charan Singh Airport (LKO)', 'Lucknow Charbagh Railway Station', 'City Hotels'],
    inclusions: [
      'Dedicated luxury chauffeur vehicle for all 4 days in Lucknow',
      '3 nights stay at Taj Mahal Lucknow or Lebua Saraca Estate',
      'Private 8-course Awadhi royal tasting dinner hosted by food historian',
      'Exclusive architectural access to Bara Imambara labyrinth & Rumi Darwaza',
      'Chikan needlework masterclass at a female artisan collective',
      'Attar (natural perfume) blending workshop in historic Chowk',
      'Daily breakfast, high tea, and heritage entry tickets'
    ],
    exclusions: ['Airfare', 'Shopping purchases', 'Alcoholic drinks'],
    supportedVehicles: ['V-01', 'V-02', 'V-04', 'V-05'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival in the Nawabi Capital & Twilight Chowk Promenade',
        description: 'Chauffeur greeting at Lucknow airport. Check in to your palace hotel. At dusk, take a guided culinary and perfume stroll through Chowk to sample melt-in-mouth Galawati kebabs and century-old Rooh-e-Gulab attars.',
        highlights: ['Luxury airport transfer', 'Taj Mahal Lucknow check-in', 'Historic Chowk food walk', 'Tunday Kababi original tasting'],
        meals: 'Dinner included',
        stay: 'Taj Mahal Lucknow'
      },
      {
        day: 2,
        title: 'Architectural Wonders: Bara Imambara & Rumi Darwaza',
        description: 'Morning exploration of Asaf-ud-Daula’s 1784 Bara Imambara, navigating the mysterious acoustic Bhool Bhulaiya with a senior historian. Marvel at the Rumi Darwaza and the clock tower.',
        highlights: ['Bara Imambara vault & maze', 'Rumi Darwaza photography', 'Husainabad Picture Gallery', 'Chhota Imambara chandeliers'],
        meals: 'Breakfast & High Tea included',
        stay: 'Taj Mahal Lucknow'
      },
      {
        day: 3,
        title: 'Chikankari Artisan Collective & Royal Dastarkhwan Feast',
        description: 'Spend the morning in an exclusive artisan studio learning the 32 intricate stitches of authentic Lucknowi Chikan needlework. In the evening, attend a private banquet with Awadhi Biryani, Kakori kebabs, and live Sitar music.',
        highlights: ['Chikankari master workshop', 'The British Residency gardens', 'Private royal salon banquet', 'Live classical Ghazal recital'],
        meals: 'Breakfast & Dinner included',
        stay: 'Taj Mahal Lucknow'
      },
      {
        day: 4,
        title: 'La Martiniere College & Chauffeur Airport Drop',
        description: 'Visit the grand Franco-Nawabi architecture of Claude Martin’s Constantia palace (La Martiniere). Conclude your journey with an artisanal Mithai box and chauffeur drop to Lucknow airport.',
        highlights: ['La Martiniere heritage walk', 'Chhappan Bhog royal mithai box', 'Chauffeur airport farewell'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-04',
    slug: 'golden-triangle-heritage-grand-tour',
    title: 'The Golden Triangle Heritage Grand Tour: Delhi, Agra & Jaipur',
    subtitle: '7 days of Mughal monuments, Rajput palaces, and chauffeured interstate luxury',
    destinationId: 'jaipur',
    destinationName: 'Delhi, Agra & Jaipur',
    durationDays: 7,
    durationNights: 6,
    basePricePerPerson: 68000,
    rating: 4.99,
    reviewCount: 64,
    theme: 'Grand Sovereign',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'The definitive royal voyage through India’s storied Golden Triangle. Travel in an ultra-luxury chauffeur vehicle with seasoned local guides in Delhi, sunrise VIP entry at the Taj Mahal in Agra, and royal palace hospitality in Jaipur.',
    groupType: 'Signature Multi-City Expedition',
    pickupPoints: ['Indira Gandhi International Airport (DEL)', 'Any 5-Star Hotel in Delhi NCR'],
    inclusions: [
      'Dedicated premium luxury vehicle & professional chauffeur for all 7 days',
      '2 nights in New Delhi + 2 nights in Agra + 2 nights in Jaipur (5-Star Heritage)',
      'VIP sunrise access tickets and scholar guide at Taj Mahal',
      'Private Chandra Mahal suite tour at Jaipur City Palace',
      'Elephant or jeep ascent to Amber Fort with priority entry',
      'Curated dining experiences in each city celebrating local culinary heritage',
      'All interstate road taxes, toll passes, parking, and chauffeur amenities'
    ],
    exclusions: ['Airfare', 'Personal shopping expenses', 'Optional hot air balloon safari'],
    supportedVehicles: ['V-01', 'V-02', 'V-03', 'V-04', 'V-05'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Imperial Delhi Arrival & Lutyens Welcome Tour',
        description: 'Chauffeur welcome at Delhi airport. Afternoon tour of India Gate, Rashtrapati Bhavan, and the peaceful gardens of Humayun’s Tomb.',
        highlights: ['Delhi airport VIP pickup', 'Humayun’s Tomb UNESCO site', 'Lutyens boulevard drive', 'Welcome dinner at The Imperial'],
        meals: 'Dinner included',
        stay: 'The Imperial or Taj Mahal Hotel, New Delhi'
      },
      {
        day: 2,
        title: 'Old Delhi Shahjahanabad & Qutub Minar',
        description: 'Morning curated cycle-rickshaw safari through Chandni Chowk, Jama Masjid, and spice markets. Afternoon visit to the 12th-century Qutub Minar.',
        highlights: ['Jama Masjid red sandstone court', 'Spice market secret rooftop', 'Qutub Minar complex'],
        meals: 'Breakfast & Lunch included',
        stay: 'The Imperial, New Delhi'
      },
      {
        day: 3,
        title: 'Yamuna Expressway to Agra & Sunset at Mehtab Bagh',
        description: 'Glide down the Yamuna Expressway in chauffeured comfort to Agra. Check into luxury hotel overlooking the Taj Mahal. Sunset views across the river at Mehtab Bagh.',
        highlights: ['Yamuna Expressway drive', 'Check-in at ITC Mughal / Oberoi Amarvilas', 'Mehtab Bagh sunset photo vantage'],
        meals: 'Breakfast & Dinner included',
        stay: 'ITC Mughal or The Oberoi Amarvilas'
      },
      {
        day: 4,
        title: 'Taj Mahal Sunrise & Red Fort Dynastic Palace',
        description: 'Witness the Taj Mahal change colors from blush pink to shimmering white at dawn. Afternoon visit to the grand Agra Fort and Pietra Dura marble artisans.',
        highlights: ['Taj Mahal sunrise private entry', 'Agra Fort royal chambers', 'Pietra Dura marble workshop'],
        meals: 'Breakfast included',
        stay: 'ITC Mughal or The Oberoi Amarvilas'
      },
      {
        day: 5,
        title: 'Fatehpur Sikri to the Pink City of Jaipur',
        description: 'Drive toward Rajasthan, stopping at Akbar’s abandoned red city of Fatehpur Sikri. Arrive in Jaipur and check into a royal palace hotel.',
        highlights: ['Fatehpur Sikri Buland Darwaza', 'Enter Rajasthan royal territory', 'Evening cocktail at Rambagh Palace gardens'],
        meals: 'Breakfast & Dinner included',
        stay: 'Taj Rambagh Palace or Jai Mahal Palace'
      },
      {
        day: 6,
        title: 'Amber Fort Bastions, Hawa Mahal & City Palace',
        description: 'Morning ascent to Amer Fort, admiring the Sheesh Mahal mirror hall. Afternoon photo stop at Hawa Mahal and private access to City Palace inner courtyards.',
        highlights: ['Amber Fort mirror palace', 'Hawa Mahal honeycomb facade', 'City Palace private chambers', 'Jantar Mantar sun dials'],
        meals: 'Breakfast & High Tea included',
        stay: 'Taj Rambagh Palace or Jai Mahal Palace'
      },
      {
        day: 7,
        title: 'Bagru Block Printing & Return Chauffeur Transfer',
        description: 'Visit an authentic block-printing workshop in Bagru. Chauffeured transfer back to New Delhi International Airport or Jaipur Airport for departure.',
        highlights: ['Bagru natural dye textile atelier', 'Farewell lunch', 'Airport drop with luggage assistance'],
        meals: 'Breakfast & Lunch included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-05',
    slug: 'maharajas-rajputana-retreat-jaipur',
    title: 'Maharaja’s Rajputana Retreat: Jaipur Royal Bastions',
    subtitle: '4 days of Amber Fort bastions, palace high tea, and gem atelier discoveries',
    destinationId: 'jaipur',
    destinationName: 'Jaipur',
    durationDays: 4,
    durationNights: 3,
    basePricePerPerson: 38000,
    rating: 4.95,
    reviewCount: 42,
    theme: 'Royal Heritage',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602339752474-f77aa7bc3efb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Experience the regal elegance of Rajput kings in an intimately organized 4-day private holiday. Includes personal luxury chauffeur, private courtyard access at City Palace, and an unforgettable sunrise hot air balloon flight above the Aravalli hills.',
    groupType: 'Royal Heritage Retreat',
    pickupPoints: ['Jaipur International Airport (JAI)', 'Jaipur Junction Railway Station', 'City Hotels'],
    inclusions: [
      'Luxury chauffeured vehicle with fuel, parking, and driver allowance',
      '3 nights at 5-star heritage palace property with royal breakfast',
      'Private access pass to Chandra Mahal inner palace salons',
      'Expert scholar guide for Amber, Jaigarh, and Nahargarh forts',
      'Private gemstone cutting & emerald sorting salon session in Johari Bazaar',
      'Traditional Rajasthani Thali royal degustation at 1135 AD inside Amer Fort',
      'Bottled mountain spring water and refreshing wet towels onboard'
    ],
    exclusions: ['Airfare', 'Hot air balloon safari optional surcharge', 'Personal jewelry purchases'],
    supportedVehicles: ['V-01', 'V-02', 'V-03', 'V-04', 'V-05'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Pink City Welcome & Jal Mahal Sunset View',
        description: 'Chauffeur airport greeting in your selected sedan or luxury SUV. Check in to your palace resort. Drive past the serene water palace of Jal Mahal at twilight.',
        highlights: ['Airport reception', 'Palace check-in', 'Jal Mahal lake view', 'Royal Rajasthani welcome feast'],
        meals: 'Dinner included',
        stay: 'Jai Mahal Palace or Rambagh Palace'
      },
      {
        day: 2,
        title: 'Amber Fort Citadel & 1135 AD Royal Dining',
        description: 'Morning guided exploration of Amber Fort, entering through the Sun Gate. Gaze at the thousands of Belgian mirrors in the Sheesh Mahal. Dine at the opulent 1135 AD restaurant.',
        highlights: ['Amer Fort bastions', 'Sheesh Mahal mirror hall', 'Lunch at 1135 AD', 'Anokhi Museum of Hand Printing'],
        meals: 'Breakfast & Lunch included',
        stay: 'Jai Mahal Palace or Rambagh Palace'
      },
      {
        day: 3,
        title: 'City Palace Chandra Mahal & Johari Bazaar Gems',
        description: 'Exclusive private guided entry to the living quarters of the Maharaja at Chandra Mahal. Afternoon salon session with a master gemstone jeweler in Johari Bazaar.',
        highlights: ['Private Chandra Mahal entry', 'Jantar Mantar observatory', 'Johari Bazaar gemstones', 'Sunset tea at Nahargarh Fort'],
        meals: 'Breakfast & High Tea included',
        stay: 'Jai Mahal Palace or Rambagh Palace'
      },
      {
        day: 4,
        title: 'Patrika Gate Photography & Chauffeur Airport Drop',
        description: 'Morning visit to the colorful painted arches of Patrika Gate. Leisurely breakfast in the palace gardens before your chauffeur transfers you to Jaipur Airport.',
        highlights: ['Patrika Gate photo shoot', 'Laxmi Misthan Bhandar sweet box', 'Airport transfer'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-06',
    slug: 'taj-mahal-sunrise-mughal-dynastic-trail',
    title: 'Taj Mahal Sunrise & Mughal Dynastic Trail',
    subtitle: '3 days of poetic white marble, red sandstone fortresses & royal Yamuna gardens',
    destinationId: 'agra',
    destinationName: 'Agra',
    durationDays: 3,
    durationNights: 2,
    basePricePerPerson: 26000,
    rating: 4.97,
    reviewCount: 51,
    theme: 'Royal Heritage',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'A focused, luxury tribute to Mughal architecture. Enjoy skip-the-line sunrise access to the Taj Mahal with a national award-winning conservation architect, followed by private boat perspectives from the Yamuna river.',
    groupType: 'Private Architectural Tour',
    pickupPoints: ['Agra Cantt Railway Station', 'Delhi Airport Transfer Available', 'Agra Hotels'],
    inclusions: [
      'Chauffeured luxury car service throughout Agra',
      '2 nights in luxury 5-star hotel with Taj Mahal view rooms',
      'Private sunrise entry passes and scholar-architect guide',
      'Agra Fort Jahangiri Mahal and Diwan-i-Khas private tour',
      'Pietra dura marble inlay masterclass at family workshop',
      'Curated Mughlai imperial tasting dinner',
      'All road taxes, parking, and concierge coordination'
    ],
    exclusions: ['Train or flight tickets to Agra', 'Personal purchases', 'Alcoholic drinks'],
    supportedVehicles: ['V-01', 'V-02', 'V-03', 'V-05'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival in Agra & Sunset at Mehtab Bagh',
        description: 'Chauffeur pickup in Agra. Check in to your luxury hotel. At sunset, visit Mehtab Bagh across the river to admire the Taj Mahal silhouetted in warm golden light.',
        highlights: ['Chauffeur reception', 'Hotel check-in', 'Mehtab Bagh sunset stroll', 'Imperial Mughlai dinner'],
        meals: 'Dinner included',
        stay: 'ITC Mughal, Luxury Collection'
      },
      {
        day: 2,
        title: 'Dawn at Taj Mahal & Agra Fort Grandeur',
        description: 'Early morning VIP entrance to the Taj Mahal as the dawn light illuminates the translucent white Makrana marble. Afternoon visit to the red sandstone fortress of Agra Fort.',
        highlights: ['Sunrise Taj Mahal exploration', 'Architectural detail walk', 'Agra Fort palatial halls', 'Pietra Dura master demonstration'],
        meals: 'Breakfast & High Tea included',
        stay: 'ITC Mughal, Luxury Collection'
      },
      {
        day: 3,
        title: 'Tomb of I’timad-ud-Daulah (Baby Taj) & Departure',
        description: 'Morning visit to the jewel-box marble tomb of I’timad-ud-Daulah, often hailed as the artistic draft for the Taj. Chauffeur drop to Agra Cantt or onward transfer to Delhi.',
        highlights: ['Baby Taj delicate lattice work', 'Agra Petha confectionery tasting', 'Chauffeur transfer'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-07',
    slug: 'ganga-aarti-vedic-sanctorum-experience',
    title: 'Ganga Aarti & Vedic Sanctorum Experience',
    subtitle: '2 days of soul-stirring mantras, private riverside bajra, and ancient alleyways',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    durationDays: 2,
    durationNights: 1,
    basePricePerPerson: 16500,
    rating: 4.93,
    reviewCount: 28,
    theme: 'Spiritual',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'A high-impact weekend pilgrimage curated for busy travelers desiring uncompromising comfort and authentic Vedic immersion in sacred Kashi.',
    groupType: 'Intimate Pilgrimage',
    pickupPoints: ['Varanasi Airport', 'Varanasi Cantt Station'],
    inclusions: [
      'Private chauffeured airport transfers and sightseeing car',
      '1 night luxury riverside suite at BrijRama Palace',
      'VIP terrace entry for Dashashwamedh evening Aarti',
      'Dawn private boat ride with Vedic priest chanting blessings',
      'Traditional breakfast and gourmet Kashi thali dinner'
    ],
    exclusions: ['Airfare', 'Temple offerings', 'Personal extras'],
    supportedVehicles: ['V-01', 'V-02', 'V-04'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Sacred Arrival, Vishwanath Darshan & Evening Aarti',
        description: 'Chauffeur pickup at airport. Proceed to Kashi Vishwanath corridor for guided darshan. At dusk, board a private riverboat to witness the Dashashwamedh Aarti.',
        highlights: ['Airport pickup', 'Vishwanath Corridor entry', 'Private boat Aarti pass', 'Traditional dinner'],
        meals: 'Dinner included',
        stay: 'BrijRama Palace Heritage Hotel'
      },
      {
        day: 2,
        title: 'Morning Subah-e-Banaras & Return Departure',
        description: 'Sunrise boat ride along the ghats. Enjoy breakfast overlooking the holy river before chauffeur transfers you back to Varanasi Airport.',
        highlights: ['Sunrise boat ride', 'Ghat walk and morning tea', 'Chauffeur airport transfer'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-08',
    slug: 'ayodhya-ramayana-heritage-trail',
    title: 'Ayodhya Ramayana Heritage Trail & Sarayu Cruise',
    subtitle: '3 days of holy sanctuaries, Sarayu evening cruise & Ram Mandir exploration',
    destinationId: 'ayodhya',
    destinationName: 'Ayodhya',
    durationDays: 3,
    durationNights: 2,
    basePricePerPerson: 22000,
    rating: 4.96,
    reviewCount: 36,
    theme: 'Spiritual',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Delve into the sacred geography of the Valmiki Ramayana in the revered holy city of Ayodhya. Includes private temple passes, serene solar boat rides, and scholarly commentaries.',
    groupType: 'Spiritual Heritage Tour',
    pickupPoints: ['Ayodhya Airport', 'Ayodhya Dham Railway Station', 'Lucknow Airport Transfer'],
    inclusions: [
      'Private luxury vehicle with dedicated chauffeur for all 3 days',
      '2 nights in boutique luxury Ayodhya heritage estate',
      'VIP darshan facilitation at Ram Mandir and Hanuman Garhi',
      'Private sunset solar cruise on Sarayu river',
      'All satvik meals and expert Ramayana historian guide'
    ],
    exclusions: ['Flight or train tickets', 'Personal donations', 'Laundry'],
    supportedVehicles: ['V-01', 'V-02', 'V-03', 'V-04'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival in Ayodhya & Sarayu Twilight Aarti',
        description: 'Chauffeur welcome at the airport or station. Check in to your heritage hotel. Evening private solar boat cruise followed by Sarayu Maha Aarti at Ram ki Paidi.',
        highlights: ['Chauffeured arrival', 'Hotel check-in', 'Sarayu river sunset', 'Ram ki Paidi Aarti'],
        meals: 'Dinner included',
        stay: 'The Royal Heritage Ayodhya'
      },
      {
        day: 2,
        title: 'Ram Janmabhoomi & Ancient Temple Sanctuaries',
        description: 'Detailed morning visit to the Ram Janmabhoomi Temple complex. Continue to Kanak Bhawan, Dashrath Mahal, and Sita ki Rasoi with an expert scholar.',
        highlights: ['Ram Mandir exploration', 'Kanak Bhawan gold palace', 'Hanuman Garhi blessings', 'Guptar Ghat evening visit'],
        meals: 'Breakfast & Lunch included',
        stay: 'The Royal Heritage Ayodhya'
      },
      {
        day: 3,
        title: 'Surya Kund Heritage & Departure',
        description: 'Visit the newly restored Surya Kund water pavilion and temple complex. Chauffeur drop to Ayodhya Airport or Lucknow.',
        highlights: ['Surya Kund light and architecture', 'Traditional Prasad box', 'Chauffeur departure'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-09',
    slug: 'nawabi-dastarkhwan-chikan-craft-residency',
    title: 'Nawabi Dastarkhwan & Chikan Craft Artisan Residency',
    subtitle: '3 days celebrating royal Awadhi kitchen secrets, perfumery, and textile masterminds',
    destinationId: 'lucknow',
    destinationName: 'Lucknow',
    durationDays: 3,
    durationNights: 2,
    basePricePerPerson: 28000,
    rating: 4.94,
    reviewCount: 27,
    theme: 'Culinary & Culture',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'An insider’s cultural and culinary immersion into the aristocratic life of Lucknow. Experience private cooking masterclasses with master Khansamas and learn the heritage stitches of needlecraft.',
    groupType: 'Culinary & Artisan Atelier',
    pickupPoints: ['Lucknow Airport', 'Lucknow Charbagh Railway Station'],
    inclusions: [
      'Chauffeured sedan or luxury MPV for 3 days',
      '2 nights stay in luxury heritage palace suite',
      'Private Awadhi culinary masterclass with royal chef',
      'Full-day Chikankari and Mukaish embroidery masterclass',
      'Bespoke Attar fragrance bottle created to your preference'
    ],
    exclusions: ['Airfare', 'Shopping purchases', 'Alcoholic drinks'],
    supportedVehicles: ['V-01', 'V-02', 'V-04', 'V-05'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Arrival & Royal Dastarkhwan Induction',
        description: 'Chauffeur welcome at Lucknow airport. Evening tasting of 6 iconic kebabs and aromatic Awadhi biryanis with a royal culinary author.',
        highlights: ['Airport pickup', 'Palace check-in', 'Culinary storytelling dinner', 'Ghazal music performance'],
        meals: 'Dinner included',
        stay: 'Lebua Lucknow, Saraca Estate'
      },
      {
        day: 2,
        title: 'Chikan Embroidery Studio & Historic Perfumery',
        description: 'Spend the morning inside a private women’s embroidery studio in Old Lucknow. Afternoon visit to the 200-year-old Sugandh attar house.',
        highlights: ['Needlework hands-on workshop', 'Bara Imambara architecture', 'Attar scent sampling', 'Evening tea in court gardens'],
        meals: 'Breakfast & High Tea included',
        stay: 'Lebua Lucknow, Saraca Estate'
      },
      {
        day: 3,
        title: 'Heritage Street Tasting & Departure',
        description: 'Morning visit to Hazratganj for sweet tastings and architectural photos. Chauffeur transfer to Lucknow Airport.',
        highlights: ['Hazratganj stroll', 'Mithai tasting box', 'Chauffeur airport transfer'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-10',
    slug: 'imperial-delhi-sultanates-and-mughals',
    title: 'Imperial Delhi: Centuries of Sultanates & Mughal Elegance',
    subtitle: '3 days across seven ancient capitals, Persian mausoleums & royal bazaars',
    destinationId: 'delhi',
    destinationName: 'Delhi',
    durationDays: 3,
    durationNights: 2,
    basePricePerPerson: 21500,
    rating: 4.92,
    reviewCount: 35,
    theme: 'Royal Heritage',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Unravel the complex historic layers of Delhi, from 12th-century Afghan sultanates to Shah Jahan’s fortified city and Edwin Lutyens’ grand imperial avenues.',
    groupType: 'Historical Heritage Tour',
    pickupPoints: ['Indira Gandhi International Airport (DEL)', 'New Delhi Railway Station', 'Delhi NCR Hotels'],
    inclusions: [
      'Private luxury chauffeur vehicle throughout Delhi',
      '2 nights in 5-star heritage property (The Imperial / Taj Mansingh)',
      'Certified historian guide for all monuments',
      'Curated cycle-rickshaw journey through Old Delhi spice markets',
      'Priority entry passes to Humayun’s Tomb and Qutub Minar'
    ],
    exclusions: ['Airfare', 'Personal shopping', 'Laundry and minibar'],
    supportedVehicles: ['V-01', 'V-02', 'V-04', 'V-05'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Imperial Lutyens Delhi & Humayun’s Tomb',
        description: 'Chauffeur airport pickup. Drive down Rajpath, view India Gate, and explore the red sandstone and white marble Persian dome of Humayun’s Tomb.',
        highlights: ['Chauffeured arrival', 'The Imperial check-in', 'Humayun’s Tomb gardens', 'Colonial 1911 dinner'],
        meals: 'Dinner included',
        stay: 'The Imperial, New Delhi'
      },
      {
        day: 2,
        title: 'Shahjahanabad, Chandni Chowk & Qutub Minar',
        description: 'Morning exploration of Old Delhi, Jama Masjid, and Asia’s largest spice market by cycle rickshaw. Afternoon visit to the Mehrauli archaeological park and Qutub Minar.',
        highlights: ['Jama Masjid', 'Khari Baoli spice roof', 'Qutub Minar soaring minaret', 'Sundar Nursery gardens'],
        meals: 'Breakfast & High Tea included',
        stay: 'The Imperial, New Delhi'
      },
      {
        day: 3,
        title: 'National Craft Museum & Airport Farewell',
        description: 'Morning private walkthrough of the National Handicrafts and Handlooms Museum. Chauffeur transfer to Delhi Airport for onward flight.',
        highlights: ['National Crafts Museum', 'Cafe Lota artisanal lunch', 'Airport drop with luggage service'],
        meals: 'Breakfast & Lunch included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-11',
    slug: 'brahmavarta-braj-agra-mathura-heritage',
    title: 'Brahmavarta to Braj: Agra & Mathura Sacred Heritage',
    subtitle: '4 days connecting sacred Krishna pilgrimage sites with Mughal marble palaces',
    destinationId: 'agra',
    destinationName: 'Agra & Mathura',
    durationDays: 4,
    durationNights: 3,
    basePricePerPerson: 34000,
    rating: 4.95,
    reviewCount: 29,
    theme: 'Spiritual',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'A spiritually enriching and historically fascinating journey through the heart of the Braj region and the historic seat of Mughal power in Agra.',
    groupType: 'Spiritual & Heritage Journey',
    pickupPoints: ['Delhi Airport', 'Agra Cantt Railway Station'],
    inclusions: [
      'Private chauffeur vehicle for the entire 4-day circuit',
      '2 nights in Agra + 1 night in Mathura/Vrindavan luxury boutique resort',
      'Priority sunrise visit to the Taj Mahal',
      'Guided darshan at Bankey Bihari and Prem Mandir in Vrindavan',
      'All toll taxes, parking, and daily meals specified'
    ],
    exclusions: ['Airfare', 'Personal temple offerings', 'Laundry'],
    supportedVehicles: ['V-01', 'V-02', 'V-04'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Delhi to Mathura & Vrindavan Evening Aarti',
        description: 'Chauffeured drive to sacred Mathura. Check into your resort. Evening visit to the illuminated Prem Mandir and Bankey Bihari temple.',
        highlights: ['Chauffeured pickup', 'Prem Mandir light display', 'Bankey Bihari darshan', 'Satvik vegetarian dinner'],
        meals: 'Dinner included',
        stay: 'Nidhivan Sarovar Portico, Vrindavan'
      },
      {
        day: 2,
        title: 'Govardhan Parikrama Drive & Onward to Agra',
        description: 'Scenic drive around the sacred Govardhan hill. Continue in chauffeured comfort to Agra. Sunset drinks at luxury hotel overlooking Taj Mahal.',
        highlights: ['Govardhan sacred hill', 'Drive to Agra', 'ITC Mughal check-in', 'Mehtab Bagh dusk view'],
        meals: 'Breakfast & Dinner included',
        stay: 'ITC Mughal, Luxury Collection, Agra'
      },
      {
        day: 3,
        title: 'Taj Mahal Sunrise & Agra Fort',
        description: 'Dawn entry into the Taj Mahal with expert guide. Afternoon exploration of Agra Fort and Akbar’s tomb at Sikandra.',
        highlights: ['Sunrise Taj Mahal private tour', 'Agra Fort palatial suites', 'Sikandra red sandstone gateway'],
        meals: 'Breakfast included',
        stay: 'ITC Mughal, Luxury Collection, Agra'
      },
      {
        day: 4,
        title: 'Fatehpur Sikri & Return Departure',
        description: 'Morning visit to the UNESCO World Heritage ghost city of Fatehpur Sikri. Chauffeured transfer back to Delhi or Agra airport.',
        highlights: ['Fatehpur Sikri Buland Darwaza', 'Farewell lunch', 'Chauffeur airport transfer'],
        meals: 'Breakfast & Lunch included',
        stay: 'Departure'
      }
    ]
  },
  {
    id: 'PKG-12',
    slug: 'uttar-heritage-corridor-grand-sovereign',
    title: 'The Uttar Heritage Corridor: Varanasi, Ayodhya & Lucknow Grand Sovereign',
    subtitle: '8 days of imperial Nawabi banquets, Ayodhya sanctuaries & Kashi ghats',
    destinationId: 'varanasi',
    destinationName: 'Varanasi, Ayodhya & Lucknow',
    durationDays: 8,
    durationNights: 7,
    basePricePerPerson: 84000,
    rating: 5.0,
    reviewCount: 45,
    theme: 'Grand Sovereign',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Our masterwork sovereign expedition uniting the three epic cultural pillars of Uttar Pradesh. Travel seamlessly with an elite chauffeur, luxury fleet, palace courtyard suites, and private encounters with scholars, priests, and royal descendants.',
    groupType: 'Elite Sovereign Expedition',
    pickupPoints: ['Lucknow Airport (LKO)', 'Varanasi Airport (VNS)'],
    inclusions: [
      'Dedicated private luxury vehicle and senior master chauffeur for all 8 days',
      '7 nights in 5-star palace hotels (Taj Mahal Lucknow, Royal Estate Ayodhya, Taj Nadesar Palace)',
      'All royal dining feasts, private Dastarkhwans, and gourmet regional breakfasts',
      'Exclusive private Bajra dawn boat and VIP Ganga Aarti rooftop terrace',
      'Priority passes and scholar escort for Ram Mandir and Kashi Vishwanath corridors',
      'Bespoke perfume creation, master silk weaver atelier, and chikan studio access',
      'All interstate tolls, parking, luggage handling, and concierge assistance'
    ],
    exclusions: ['Flights into and out of UP', 'Personal items', 'Gratuities'],
    supportedVehicles: ['V-01', 'V-02', 'V-03', 'V-04'],
    dayByDayItinerary: [
      {
        day: 1,
        title: 'Lucknow Arrival & The Nawabi Evening Initiation',
        description: 'Chauffeur welcome at Lucknow airport. Check in to your palace suite. Evening tasting walk in historic Chowk with a senior culinary historian.',
        highlights: ['VIP airport greeting', 'Taj Mahal Lucknow check-in', 'Chowk kebab tasting', 'Heritage orientation'],
        meals: 'Dinner included',
        stay: 'Taj Mahal Lucknow'
      },
      {
        day: 2,
        title: 'Bara Imambara, British Residency & Chikan Ateliers',
        description: 'Morning architecture tour of Bara Imambara and Rumi Darwaza. Afternoon artisan workshop visit followed by an 8-course Awadhi banquet.',
        highlights: ['Bara Imambara maze', 'Rumi Darwaza', 'Private Chikan studio', 'Royal Dastarkhwan feast'],
        meals: 'Breakfast & Dinner included',
        stay: 'Taj Mahal Lucknow'
      },
      {
        day: 3,
        title: 'Chauffeured Drive to Sacred Ayodhya & Sarayu Twilight',
        description: 'Scenic 2.5-hour highway drive to Ayodhya. Check in to your heritage hotel. Board a luxury solar boat on the Sarayu River for evening Aarti.',
        highlights: ['Chauffeured highway journey', 'Ayodhya hotel check-in', 'Sarayu solar cruise', 'Ram ki Paidi illuminated stairs'],
        meals: 'Breakfast & Dinner included',
        stay: 'The Royal Heritage Ayodhya'
      },
      {
        day: 4,
        title: 'Shri Ram Janmabhoomi & Kanak Bhawan Temple Walk',
        description: 'Morning VIP darshan at the Shri Ram Janmabhoomi Mandir. Tour the gold sanctum of Kanak Bhawan and fortress of Hanuman Garhi.',
        highlights: ['Ram Mandir architecture', 'Kanak Bhawan gold palace', 'Hanuman Garhi blessings', 'Sunset at Guptar Ghat'],
        meals: 'Breakfast & Lunch included',
        stay: 'The Royal Heritage Ayodhya'
      },
      {
        day: 5,
        title: 'Expressway Drive to Varanasi & Evening Ghats Initiation',
        description: 'Comfortable chauffeured drive along the modern corridor to the eternal city of Varanasi. Check in to Taj Nadesar Palace.',
        highlights: ['Scenic drive across UP', 'Taj Nadesar Palace arrival', 'Riverside sunset walk', 'Dinner overlooking river gardens'],
        meals: 'Breakfast & Dinner included',
        stay: 'Taj Nadesar Palace, Varanasi'
      },
      {
        day: 6,
        title: 'Subah-e-Banaras Dawn Boat & Kashi Vishwanath Corridor',
        description: 'Morning boat ride with classical Shehnai music on the holy Ganges. Priority walkthrough of Kashi Vishwanath temple corridor and Sarnath.',
        highlights: ['Dawn wooden boat cruise', 'Vishwanath priority passage', 'Sarnath Buddhist Stupa', 'VIP Aarti Terrace reservation'],
        meals: 'Breakfast & High Tea included',
        stay: 'Taj Nadesar Palace, Varanasi'
      },
      {
        day: 7,
        title: 'Madanpura Silk Brocade Weavers & Classical Sitar Recital',
        description: 'Visit master weavers in Madanpura creating pure zari Banarasi sarees. Evening private sitar recital inside a historic riverside Haveli.',
        highlights: ['Silk masterclass', 'Old city alleys exploration', 'Private Haveli musical evening', 'Gourmet banquet dinner'],
        meals: 'Breakfast & Dinner included',
        stay: 'Taj Nadesar Palace, Varanasi'
      },
      {
        day: 8,
        title: 'Ghat Morning Walk & Chauffeur Airport Farewell',
        description: 'Relaxed morning riverfront tea. Chauffeur transfer to Lal Bahadur Shastri Airport with luggage assistance and farewell memento.',
        highlights: ['Morning ghat stroll', 'Farewell gift package', 'Chauffeur airport transfer'],
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'YA-8921',
    packageId: 'PKG-01',
    packageTitle: 'Varanasi Dawn to Twilight: Spiritual Odyssey',
    destinationName: 'Varanasi',
    customerName: 'Mrs. Sunita Kapoor',
    customerEmail: 'sunita.kapoor@outlook.com',
    customerPhone: '+91 98201 55678',
    pickupLocation: 'Varanasi Airport (VNS)',
    travelDate: '2026-10-25',
    endDate: '2026-10-27',
    guestsCount: 2,
    vehicleId: 'V-02',
    vehicleName: 'Mercedes-Benz E-Class Exclusive',
    assignedDriverId: 'D-01',
    assignedDriverName: 'Raghvendra Pratap Singh',
    baseAmount: 49000,
    vehicleSurchargeTotal: 17000,
    taxesAmount: 3300,
    totalAmount: 69300,
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    transactionId: 'TXN-984218-YA',
    createdAt: '2026-10-10T10:30:00Z',
    specialRequests: 'Flower garlands on arrival and silent chauffeur during morning prayers.'
  },
  {
    id: 'YA-8922',
    packageId: 'PKG-04',
    packageTitle: 'The Golden Triangle Heritage Grand Tour: Delhi, Agra & Jaipur',
    destinationName: 'Delhi, Agra & Jaipur',
    customerName: 'Mr. Rohan & Priya Mehta',
    customerEmail: 'rohan.mehta@techvent.in',
    customerPhone: '+91 99887 12345',
    pickupLocation: 'The Oberoi, New Delhi',
    travelDate: '2026-11-02',
    endDate: '2026-11-08',
    guestsCount: 2,
    vehicleId: 'V-03',
    vehicleName: 'Toyota Vellfire Royal Executive Lounge',
    assignedDriverId: 'D-04',
    assignedDriverName: 'Harpreet Singh Sethi',
    baseAmount: 136000,
    vehicleSurchargeTotal: 87000,
    taxesAmount: 11150,
    totalAmount: 234150,
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    transactionId: 'TXN-663291-YA',
    createdAt: '2026-10-11T14:20:00Z',
    specialRequests: 'Couple celebrates 10th wedding anniversary at Taj Mahal sunrise.'
  },
  {
    id: 'YA-8923',
    packageId: 'PKG-03',
    packageTitle: 'Royal Awadh Epics: Lucknow Gastronomy & Architecture',
    destinationName: 'Lucknow',
    customerName: 'Dr. Alistair & Elena Vance',
    customerEmail: 'alistair.vance@oxon.org',
    customerPhone: '+44 7700 900321',
    pickupLocation: 'Lucknow Airport (LKO)',
    travelDate: '2026-10-18',
    endDate: '2026-10-21',
    guestsCount: 2,
    vehicleId: 'V-01',
    vehicleName: 'Toyota Innova Crysta ZX Executive',
    assignedDriverId: 'D-03',
    assignedDriverName: 'Mohammad Tariq Alvi',
    baseAmount: 65000,
    vehicleSurchargeTotal: 10500,
    taxesAmount: 3775,
    totalAmount: 79275,
    bookingStatus: 'In Progress',
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    transactionId: 'TXN-419823-YA',
    createdAt: '2026-10-08T09:15:00Z',
    specialRequests: 'Interest in architectural sketchbooks and 18th-century acoustic vaults.'
  },
  {
    id: 'YA-8924',
    packageId: 'PKG-05',
    packageTitle: 'Maharaja’s Rajputana Retreat: Jaipur Royal Bastions',
    destinationName: 'Jaipur',
    customerName: 'Rajeev Singhania Family',
    customerEmail: 'singhania.enterprises@gmail.com',
    customerPhone: '+91 98100 44321',
    pickupLocation: 'Jaipur Airport Terminal 2',
    travelDate: '2026-10-14',
    endDate: '2026-10-17',
    guestsCount: 4,
    vehicleId: 'V-04',
    vehicleName: 'Force Urbania Royal Maharaja Cruiser',
    assignedDriverId: 'D-02',
    assignedDriverName: 'Vikramaditya Singh Rathore',
    baseAmount: 152000,
    vehicleSurchargeTotal: 33000,
    taxesAmount: 9250,
    totalAmount: 194250,
    bookingStatus: 'In Progress',
    paymentStatus: 'Paid',
    paymentMethod: 'NetBanking',
    transactionId: 'TXN-110943-YA',
    createdAt: '2026-10-09T18:00:00Z',
    specialRequests: 'Family traveling with senior citizen. Wheelchair accessible boarding requested.'
  },
  {
    id: 'YA-8925',
    packageId: 'PKG-02',
    packageTitle: 'Sacred Twin Citadels: Ayodhya & Varanasi Circuit',
    destinationName: 'Ayodhya & Varanasi',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.d@fintech.co',
    customerPhone: '+91 97654 32109',
    pickupLocation: 'Lucknow Airport',
    travelDate: '2026-11-15',
    endDate: '2026-11-19',
    guestsCount: 1,
    vehicleId: 'V-01',
    vehicleName: 'Toyota Innova Crysta ZX Executive',
    assignedDriverId: undefined,
    assignedDriverName: undefined,
    baseAmount: 42000,
    vehicleSurchargeTotal: 14000,
    taxesAmount: 2800,
    totalAmount: 58800,
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    transactionId: 'TXN-774019-YA',
    createdAt: '2026-10-12T11:45:00Z',
    specialRequests: 'Quiet solo retreat with focus on early morning temple aartis.'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-1001',
    bookingId: 'YA-8921',
    customerName: 'Mrs. Sunita Kapoor',
    amount: 69300,
    method: 'Card',
    status: 'Paid',
    transactionId: 'TXN-984218-YA',
    timestamp: '2026-10-10T10:32:15Z',
    gatewayRef: 'SIM-HDFC-9912048'
  },
  {
    id: 'PAY-1002',
    bookingId: 'YA-8922',
    customerName: 'Mr. Rohan & Priya Mehta',
    amount: 234150,
    method: 'UPI',
    status: 'Paid',
    transactionId: 'TXN-663291-YA',
    timestamp: '2026-10-11T14:22:40Z',
    gatewayRef: 'SIM-UPI-BHIM-884019'
  },
  {
    id: 'PAY-1003',
    bookingId: 'YA-8923',
    customerName: 'Dr. Alistair & Elena Vance',
    amount: 79275,
    method: 'Card',
    status: 'Paid',
    transactionId: 'TXN-419823-YA',
    timestamp: '2026-10-08T09:17:10Z',
    gatewayRef: 'SIM-AMEX-009418'
  },
  {
    id: 'PAY-1004',
    bookingId: 'YA-8924',
    customerName: 'Rajeev Singhania Family',
    amount: 194250,
    method: 'NetBanking',
    status: 'Paid',
    transactionId: 'TXN-110943-YA',
    timestamp: '2026-10-09T18:03:55Z',
    gatewayRef: 'SIM-ICICI-NET-55194'
  },
  {
    id: 'PAY-1005',
    bookingId: 'YA-8925',
    customerName: 'Ananya Deshmukh',
    amount: 58800,
    method: 'UPI',
    status: 'Paid',
    transactionId: 'TXN-774019-YA',
    timestamp: '2026-10-12T11:47:05Z',
    gatewayRef: 'SIM-GPAY-UPI-332901'
  }
];
