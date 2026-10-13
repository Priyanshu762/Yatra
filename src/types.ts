export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  heroImage: string;
  gallery: string[];
  bestTimeToVisit: string;
  idealDuration: string;
  culturalHighlights: string[];
  signatureExperiences: string[];
  weather: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  meals: string;
  stay: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destinationId: string;
  destinationName: string;
  durationDays: number;
  durationNights: number;
  basePricePerPerson: number;
  rating: number;
  reviewCount: number;
  theme: 'Spiritual' | 'Royal Heritage' | 'Culinary & Culture' | 'Grand Sovereign';
  featured: boolean;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  dayByDayItinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  supportedVehicles: string[]; // Vehicle IDs
  pickupPoints: string[];
  groupType: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'Budget Sedan' | 'Comfort Sedan' | 'Executive MPV' | 'Luxury Chauffeur Sedan' | 'Royal Lounge Cruiser' | 'Maharaja Tempo Lounge' | 'Traveller Van' | 'Luxury SUV';
  capacitySeats: number;
  luggageCapacity: number;
  dailySurcharge: number; // additional charge per day
  ratePerKm: number; // per km rate in Rs
  baseFare: number; // flat base fare for first 10km
  image: string;
  amenities: string[];
  registrationNumber: string;
  status: 'Available' | 'On Trip' | 'Maintenance';
  fuelType: string;
  year: number;
}

export interface Driver {
  id: string;
  name: string;
  experienceYears: number;
  languages: string[];
  rating: number;
  phone: string;
  licenseNumber: string;
  specialtyRegions: string[];
  image: string;
  status: 'Active' | 'On Leave' | 'Assigned';
  completedTrips: number;
}

export interface Booking {
  id: string; // e.g. YA-8921
  packageId: string;
  packageTitle: string;
  destinationName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  travelDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  guestsCount: number;
  vehicleId: string;
  vehicleName: string;
  assignedDriverId?: string;
  assignedDriverName?: string;
  baseAmount: number;
  vehicleSurchargeTotal: number;
  taxesAmount: number;
  totalAmount: number;
  bookingStatus: 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Refunded' | 'Pending' | 'Failed';
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  transactionId: string;
  createdAt: string;
  specialRequests?: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  method: 'UPI' | 'Card' | 'NetBanking';
  status: 'Paid' | 'Refunded' | 'Failed';
  transactionId: string;
  timestamp: string;
  gatewayRef: string;
}
