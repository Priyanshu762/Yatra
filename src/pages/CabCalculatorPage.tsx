import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Vehicle } from '../types';
import {
  IconCar,
  IconMapPin,
  IconCalendar,
  IconClock,
  IconShield,
  IconPhone,
  IconSwap,
  IconChevronDown,
  IconChevronUp,
  IconClose
} from '../components/Icons';

// Popular routes data with approximate highway distances
const POPULAR_ROUTES = [
  { source: 'Varanasi', destination: 'Ayodhya', distanceKm: 220, tollEstimate: 280, note: 'Via NH330 - Approx 4.5 hours' },
  { source: 'Varanasi', destination: 'Prayagraj (Sangam)', distanceKm: 125, tollEstimate: 160, note: 'Via NH19 - Approx 2.5 hours' },
  { source: 'Lucknow', destination: 'Ayodhya', distanceKm: 135, tollEstimate: 180, note: 'Via Purvanchal / NH27 - Approx 2.5 hours' },
  { source: 'Lucknow', destination: 'Varanasi', distanceKm: 310, tollEstimate: 390, note: 'Via Purvanchal Expressway - Approx 4.5 hours' },
  { source: 'Delhi NCR', destination: 'Agra (Taj Mahal)', distanceKm: 230, tollEstimate: 450, note: 'Via Yamuna Expressway - Approx 3.5 hours' },
  { source: 'Delhi NCR', destination: 'Jaipur (Pink City)', distanceKm: 280, tollEstimate: 360, note: 'Via Delhi-Mumbai Expressway - Approx 4.5 hours' },
  { source: 'Jaipur', destination: 'Udaipur', distanceKm: 390, tollEstimate: 420, note: 'Via NH48 - Approx 6.5 hours' },
  { source: 'Jaipur', destination: 'Jodhpur', distanceKm: 330, tollEstimate: 340, note: 'Via NH25 - Approx 5.5 hours' },
  { source: 'Varanasi', destination: 'Bodh Gaya', distanceKm: 260, tollEstimate: 290, note: 'Via GT Road / NH19 - Approx 5 hours' },
  { source: 'Haridwar', destination: 'Rishikesh', distanceKm: 35, tollEstimate: 60, note: 'Via Bypass - Approx 1 hour' },
  { source: 'Delhi NCR', destination: 'Haridwar / Rishikesh', distanceKm: 240, tollEstimate: 320, note: 'Via Meerut Expressway - Approx 4.5 hours' },
  { source: 'Gorakhpur', destination: 'Ayodhya', distanceKm: 140, tollEstimate: 150, note: 'Via NH27 - Approx 3 hours' },
];

const CITIES_LIST = [
  'Varanasi (Kashi)',
  'Ayodhya (Ram Mandir)',
  'Lucknow',
  'Prayagraj (Allahabad)',
  'Delhi NCR (Airport/City)',
  'Agra',
  'Jaipur',
  'Udaipur',
  'Jodhpur',
  'Haridwar',
  'Rishikesh',
  'Dehradun',
  'Bodh Gaya',
  'Gorakhpur',
  'Mathura & Vrindavan',
  'Chitrakoot',
  'Khajuraho',
  'Patna',
  'Gwalior'
];

type TripType = 'oneway' | 'roundtrip' | 'local' | 'airport';

export const CabCalculatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, createBooking, showToast } = useApp();

  // Search & Calculator state
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [sourceCity, setSourceCity] = useState('Varanasi (Kashi)');
  const [destinationCity, setDestinationCity] = useState('Ayodhya (Ram Mandir)');
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  
  // Date & Time
  const today = new Date().toISOString().split('T')[0];
  const [travelDate, setTravelDate] = useState(today);
  const [travelTime, setTravelTime] = useState('08:00');
  const [returnDate, setReturnDate] = useState(today);
  const [durationDays, setDurationDays] = useState(1);

  // Local rental package selection
  const [localPackage, setLocalPackage] = useState<'4hr40km' | '8hr80km' | '12hr120km'>('8hr80km');

  // Airport transfer type
  const [airportMode, setAirportMode] = useState<'pickup' | 'drop'>('pickup');
  const [flightNumber, setFlightNumber] = useState('');

  // Distance computation
  const [distanceKm, setDistanceKm] = useState<number>(220);
  const [customDistanceOverride, setCustomDistanceOverride] = useState(false);

  // Vehicle selection & filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('V-B1'); // default Dzire

  // Toggles
  const [includeTollsInTotal, setIncludeTollsInTotal] = useState(true);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'token' | 'driver_cash' | 'full_online'>('token');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ open/close accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Auto calculate distance whenever source or destination changes
  const updateDistanceForRoute = (src: string, dest: string, type: TripType) => {
    if (type === 'local') {
      if (localPackage === '4hr40km') setDistanceKm(40);
      else if (localPackage === '8hr80km') setDistanceKm(80);
      else setDistanceKm(120);
      return;
    }

    if (type === 'airport') {
      setDistanceKm(45); // standard city-airport radius
      return;
    }

    // Try finding in popular routes
    const srcClean = src.split(' ')[0].toLowerCase();
    const destClean = dest.split(' ')[0].toLowerCase();

    const matched = POPULAR_ROUTES.find((r) => {
      const rSrc = r.source.toLowerCase();
      const rDest = r.destination.toLowerCase();
      return (
        (rSrc.includes(srcClean) && rDest.includes(destClean)) ||
        (rSrc.includes(destClean) && rDest.includes(srcClean))
      );
    });

    if (matched) {
      const baseKm = matched.distanceKm;
      setDistanceKm(type === 'roundtrip' ? Math.max(baseKm * 2, durationDays * 250) : baseKm);
    } else {
      // Default estimate if not matched
      const defaultKm = 180;
      setDistanceKm(type === 'roundtrip' ? Math.max(defaultKm * 2, durationDays * 250) : defaultKm);
    }
  };

  const handleSwapCities = () => {
    const prevSrc = sourceCity;
    const prevDest = destinationCity;
    setSourceCity(prevDest);
    setDestinationCity(prevSrc);
    updateDistanceForRoute(prevDest, prevSrc, tripType);
  };

  const handleSelectPopularRoute = (route: typeof POPULAR_ROUTES[0]) => {
    setTripType('oneway');
    setSourceCity(route.source);
    setDestinationCity(route.destination);
    setDistanceKm(route.distanceKm);
    setCustomDistanceOverride(false);
  };

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    if (selectedCategory === 'All') return vehicles;
    return vehicles.filter((v) => {
      if (selectedCategory === 'Sedan') return v.category.includes('Sedan');
      if (selectedCategory === 'SUV / MPV') return v.category.includes('MPV') || v.category.includes('SUV');
      if (selectedCategory === 'Luxury') return v.category.includes('Luxury') || v.category.includes('Royal');
      if (selectedCategory === 'Tempo / Van') return v.category.includes('Tempo') || v.category.includes('Traveller');
      return true;
    });
  }, [vehicles, selectedCategory]);

  const selectedVehicle: Vehicle = useMemo(() => {
    const found = vehicles.find((v) => v.id === selectedVehicleId);
    return found || vehicles[0];
  }, [vehicles, selectedVehicleId]);

  // Fare calculation breakdown
  const fareBreakdown = useMemo(() => {
    const effectiveKm = distanceKm;
    const ratePerKm = selectedVehicle.ratePerKm || 12;
    
    // Kilometer charge
    let kmFare = 0;
    if (tripType === 'local') {
      // Base local package charge
      if (localPackage === '4hr40km') {
        kmFare = selectedVehicle.baseFare * 4 + 40 * ratePerKm;
      } else if (localPackage === '8hr80km') {
        kmFare = selectedVehicle.baseFare * 6 + 80 * ratePerKm;
      } else {
        kmFare = selectedVehicle.baseFare * 8 + 120 * ratePerKm;
      }
    } else {
      kmFare = effectiveKm * ratePerKm;
    }

    // Driver daily allowance (bata)
    const driverAllowancePerDay = 400;
    const driverBata = tripType === 'local' ? 0 : driverAllowancePerDay * Math.max(1, durationDays);

    // Toll and state taxes estimate
    let tollEstimate = 0;
    if (tripType === 'oneway') {
      tollEstimate = Math.round(effectiveKm * 1.3);
    } else if (tripType === 'roundtrip') {
      tollEstimate = Math.round(effectiveKm * 1.3);
    } else if (tripType === 'airport') {
      tollEstimate = 120; // airport parking / toll
    } else {
      tollEstimate = 0; // local parking as actuals
    }

    const subTotal = kmFare + driverBata + (includeTollsInTotal ? tollEstimate : 0);
    const gstAmount = Math.round(subTotal * 0.05); // 5% GST
    const totalAmount = subTotal + gstAmount;

    // Per passenger cost
    const seats = selectedVehicle.capacitySeats || 4;
    const perPassengerCost = Math.round(totalAmount / seats);

    return {
      effectiveKm,
      ratePerKm,
      kmFare,
      driverBata,
      tollEstimate,
      gstAmount,
      totalAmount,
      perPassengerCost
    };
  }, [distanceKm, selectedVehicle, tripType, localPackage, durationDays, includeTollsInTotal]);

  // Handle Instant Cab Booking Submission
  const handleConfirmCabBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim() || !passengerPhone.trim()) {
      showToast('Please enter your full name and 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    const tripSummaryTitle = 
      tripType === 'local'
        ? `Local City Rental (${localPackage}) in ${sourceCity}`
        : tripType === 'airport'
        ? `Airport ${airportMode === 'pickup' ? 'Pickup' : 'Drop'} at ${sourceCity}`
        : `${sourceCity} to ${destinationCity} (${tripType === 'oneway' ? 'One Way' : 'Round Trip'})`;

    const newBookingData = {
      packageId: `CAB-${tripType.toUpperCase()}`,
      packageTitle: tripSummaryTitle,
      destinationName: destinationCity || sourceCity,
      customerName: passengerName,
      customerEmail: passengerEmail || 'guest@yatraatelier.com',
      customerPhone: passengerPhone,
      pickupLocation: pickupAddress.trim() ? `${sourceCity} (${pickupAddress})` : `${sourceCity} Doorstep / Station`,
      travelDate: travelDate,
      endDate: tripType === 'roundtrip' ? returnDate : travelDate,
      guestsCount: selectedVehicle.capacitySeats,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      baseAmount: fareBreakdown.kmFare,
      vehicleSurchargeTotal: fareBreakdown.driverBata,
      taxesAmount: fareBreakdown.gstAmount + (includeTollsInTotal ? fareBreakdown.tollEstimate : 0),
      totalAmount: fareBreakdown.totalAmount,
      bookingStatus: 'Confirmed' as const,
      paymentStatus: paymentPreference === 'full_online' ? ('Paid' as const) : ('Pending' as const),
      paymentMethod: (paymentPreference === 'full_online' ? 'UPI' : 'Card') as 'UPI' | 'Card',
      transactionId: `TXN-CAB-${Math.floor(100000 + Math.random() * 900000)}`,
      specialRequests: `${tripType.toUpperCase()} CAB | Time: ${travelTime} | ${dropAddress ? 'Drop: ' + dropAddress : ''} | ${specialNote ? 'Note: ' + specialNote : ''}`
    };

    setTimeout(() => {
      const created = createBooking(newBookingData);
      setIsSubmitting(false);
      setIsBookingModalOpen(false);
      showToast(`Booking ${created.id} confirmed! Chauffeur assigned.`);
      navigate(`/booking-confirmation/${created.id}`);
    }, 600);
  };

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen">
      {/* 1. Header / Hero Banner */}
      <section className="bg-[#173C32] text-[#FAF8F3] py-10 px-4 sm:px-6 lg:px-8 border-b border-[#234A3E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#C47A54] font-semibold">
                Direct Fleet Owner • Transparent Per-KM Rates
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF8F3]">
                Intercity Cab Booking & Live Fare Calculator
              </h1>
              <p className="text-xs sm:text-sm text-[#CDC7B9] max-w-2xl font-light">
                Calculate real-time taxi rates across Uttar Pradesh, Rajasthan, Delhi NCR, and Bihar.
                Verified polite drivers, sanitized AC cars, and 100% all-inclusive pricing with zero hidden charges.
              </p>
            </div>

            {/* Quick Helpline Box */}
            <div className="bg-[#1E4D40] border border-[#2D6657] p-4 rounded-xl flex items-center gap-4 self-start md:self-auto">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F3] text-[#173C32] flex items-center justify-center font-bold">
                <IconPhone className="w-5 h-5 text-[#173C32]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C47A54] font-semibold block">
                  Need Help or Custom Tour?
                </span>
                <span className="text-sm font-bold text-[#FAF8F3] block">
                  +91 11 4982 7700
                </span>
                <span className="text-[10px] text-[#A6C0B7]">
                  Instant Cab Booking Helpline (24x7)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Value Points */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#234A3E] text-xs text-[#CDC7B9]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C47A54]"></span>
              <span>100% Own Vehicle Fleet</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C47A54]"></span>
              <span>Verified & Polite Chauffeurs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C47A54]"></span>
              <span>Guaranteed On-Time Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C47A54]"></span>
              <span>Pay ₹500 Token or Pay at Drop</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Calculator Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Popular Route Shortcuts Pill Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#738078]">
              Popular One-Click Routes:
            </span>
            <span className="text-[11px] text-[#738078]">
              Click any route to auto-fill details
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {POPULAR_ROUTES.slice(0, 8).map((route, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPopularRoute(route)}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg border border-[#D8D2C3] bg-[#FAF8F3] text-xs text-[#173C32] hover:bg-[#EAE5D9] transition-colors flex items-center gap-1.5"
              >
                <span className="font-medium">{route.source}</span>
                <span className="text-[#C47A54] font-bold">➔</span>
                <span className="font-medium">{route.destination}</span>
                <span className="text-[10px] text-[#738078] bg-[#EFECE4] px-1.5 py-0.5 rounded">
                  {route.distanceKm} km
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Route & Trip Configuration Form */}
          <div className="lg:col-span-7 bg-[#FAF8F3] rounded-2xl border border-[#D8D2C3] p-5 sm:p-7 space-y-6">
            {/* Trip Type Tabs */}
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#738078] mb-2">
                Select Trip Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTripType('oneway');
                    updateDistanceForRoute(sourceCity, destinationCity, 'oneway');
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-center transition-colors border ${
                    tripType === 'oneway'
                      ? 'bg-[#173C32] text-[#FAF8F3] border-[#173C32]'
                      : 'bg-[#F2EFE8] text-[#46544C] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                  }`}
                >
                  One-Way Drop
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTripType('roundtrip');
                    updateDistanceForRoute(sourceCity, destinationCity, 'roundtrip');
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-center transition-colors border ${
                    tripType === 'roundtrip'
                      ? 'bg-[#173C32] text-[#FAF8F3] border-[#173C32]'
                      : 'bg-[#F2EFE8] text-[#46544C] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                  }`}
                >
                  Round-Trip Outstation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTripType('local');
                    updateDistanceForRoute(sourceCity, destinationCity, 'local');
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-center transition-colors border ${
                    tripType === 'local'
                      ? 'bg-[#173C32] text-[#FAF8F3] border-[#173C32]'
                      : 'bg-[#F2EFE8] text-[#46544C] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                  }`}
                >
                  Local Hourly Rental
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTripType('airport');
                    updateDistanceForRoute(sourceCity, destinationCity, 'airport');
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-center transition-colors border ${
                    tripType === 'airport'
                      ? 'bg-[#173C32] text-[#FAF8F3] border-[#173C32]'
                      : 'bg-[#F2EFE8] text-[#46544C] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                  }`}
                >
                  Airport Transfer
                </button>
              </div>
            </div>

            {/* Source & Destination Inputs */}
            {tripType !== 'local' && tripType !== 'airport' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
                  {/* Source City */}
                  <div className="sm:col-span-5 bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#738078] uppercase mb-1">
                      <IconMapPin className="w-3.5 h-3.5 text-[#173C32]" />
                      <span>Pick-up City (Source)</span>
                    </div>
                    <select
                      value={sourceCity}
                      onChange={(e) => {
                        setSourceCity(e.target.value);
                        updateDistanceForRoute(e.target.value, destinationCity, tripType);
                      }}
                      className="w-full bg-transparent text-sm font-semibold text-[#173C32] focus:outline-none cursor-pointer"
                    >
                      {CITIES_LIST.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Specific pickup address / landmark (Optional)"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      className="w-full mt-2 pt-1 border-t border-[#D8D2C3] bg-transparent text-xs text-[#1E2922] placeholder-[#8C9890] focus:outline-none"
                    />
                  </div>

                  {/* Swap Button */}
                  <div className="sm:col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={handleSwapCities}
                      title="Swap Source and Destination"
                      className="p-2 rounded-lg bg-[#FAF8F3] border border-[#D8D2C3] text-[#173C32] hover:bg-[#EAE5D9] transition-colors"
                    >
                      <IconSwap className="w-4 h-4 text-[#173C32]" />
                    </button>
                  </div>

                  {/* Destination City */}
                  <div className="sm:col-span-5 bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#738078] uppercase mb-1">
                      <IconMapPin className="w-3.5 h-3.5 text-[#C47A54]" />
                      <span>Drop City (Destination)</span>
                    </div>
                    <select
                      value={destinationCity}
                      onChange={(e) => {
                        setDestinationCity(e.target.value);
                        updateDistanceForRoute(sourceCity, e.target.value, tripType);
                      }}
                      className="w-full bg-transparent text-sm font-semibold text-[#173C32] focus:outline-none cursor-pointer"
                    >
                      {CITIES_LIST.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Specific drop address / landmark (Optional)"
                      value={dropAddress}
                      onChange={(e) => setDropAddress(e.target.value)}
                      className="w-full mt-2 pt-1 border-t border-[#D8D2C3] bg-transparent text-xs text-[#1E2922] placeholder-[#8C9890] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Local Rental Specific Options */}
            {tripType === 'local' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                    <label className="block text-[11px] font-bold text-[#738078] uppercase mb-1">
                      City for Sightseeing / Rental
                    </label>
                    <select
                      value={sourceCity}
                      onChange={(e) => setSourceCity(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#173C32] focus:outline-none cursor-pointer"
                    >
                      {CITIES_LIST.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                    <label className="block text-[11px] font-bold text-[#738078] uppercase mb-1">
                      Select Hourly Package
                    </label>
                    <select
                      value={localPackage}
                      onChange={(e) => {
                        const val = e.target.value as '4hr40km' | '8hr80km' | '12hr120km';
                        setLocalPackage(val);
                        if (val === '4hr40km') setDistanceKm(40);
                        else if (val === '8hr80km') setDistanceKm(80);
                        else setDistanceKm(120);
                      }}
                      className="w-full bg-transparent text-sm font-semibold text-[#173C32] focus:outline-none cursor-pointer"
                    >
                      <option value="4hr40km">4 Hours / 40 KM (Half Day)</option>
                      <option value="8hr80km">8 Hours / 80 KM (Full Day Sightseeing)</option>
                      <option value="12hr120km">12 Hours / 120 KM (Extended Full Day)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                  <label className="block text-[11px] font-bold text-[#738078] uppercase mb-1">
                    Pickup Address / Hotel Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your hotel or residence address for doorstep pickup"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#1E2922] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Airport Transfer Specific Options */}
            {tripType === 'airport' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAirportMode('pickup')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-center border ${
                      airportMode === 'pickup'
                        ? 'bg-[#173C32] text-[#FAF8F3] border-[#173C32]'
                        : 'bg-[#F2EFE8] text-[#46544C] border-[#D8D2C3]'
                    }`}
                  >
                    Airport Pickup ➔ City / Hotel
                  </button>
                  <button
                    type="button"
                    onClick={() => setAirportMode('drop')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-center border ${
                      airportMode === 'drop'
                        ? 'bg-[#173C32] text-[#FAF8F3] border-[#173C32]'
                        : 'bg-[#F2EFE8] text-[#46544C] border-[#D8D2C3]'
                    }`}
                  >
                    City / Hotel ➔ Airport Drop
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                    <label className="block text-[11px] font-bold text-[#738078] uppercase mb-1">
                      Airport City
                    </label>
                    <select
                      value={sourceCity}
                      onChange={(e) => setSourceCity(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-[#173C32] focus:outline-none"
                    >
                      <option value="Varanasi (Babatpur Airport - VNS)">Varanasi (Babatpur VNS)</option>
                      <option value="Ayodhya (Maharishi Valmiki Airport - AYJ)">Ayodhya (AYJ Airport)</option>
                      <option value="Lucknow (Chaudhary Charan Singh - LKO)">Lucknow (Amausi LKO)</option>
                      <option value="Delhi (Indira Gandhi Airport - DEL)">Delhi (IGIA DEL T1/T2/T3)</option>
                      <option value="Jaipur (Sanganer Airport - JAI)">Jaipur (Sanganer JAI)</option>
                    </select>
                  </div>

                  <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                    <label className="block text-[11px] font-bold text-[#738078] uppercase mb-1">
                      Flight Number (For live delay tracking)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 6E 2145 or AI 406"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-transparent text-xs text-[#1E2922] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                  <label className="block text-[11px] font-bold text-[#738078] uppercase mb-1">
                    {airportMode === 'pickup' ? 'Drop Hotel / Address' : 'Pickup Hotel / Address'}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your hotel name or doorstep address"
                    value={dropAddress}
                    onChange={(e) => setDropAddress(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#1E2922] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Travel Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#738078] uppercase mb-1">
                  <IconCalendar className="w-3.5 h-3.5 text-[#173C32]" />
                  <span>Travel Date</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  min={today}
                  onChange={(e) => {
                    setTravelDate(e.target.value);
                    if (tripType === 'roundtrip' && e.target.value > returnDate) {
                      setReturnDate(e.target.value);
                    }
                  }}
                  className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer"
                />
              </div>

              <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#738078] uppercase mb-1">
                  <IconClock className="w-3.5 h-3.5 text-[#173C32]" />
                  <span>Pickup Time</span>
                </label>
                <select
                  value={travelTime}
                  onChange={(e) => setTravelTime(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer"
                >
                  <option value="05:00">05:00 AM (Early Dawn Darshan)</option>
                  <option value="06:30">06:30 AM (Morning Departure)</option>
                  <option value="08:00">08:00 AM (Standard Morning)</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM (Noon)</option>
                  <option value="14:00">02:00 PM (Afternoon)</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM (Evening)</option>
                  <option value="21:00">09:00 PM (Night Train / Highway)</option>
                  <option value="23:00">11:00 PM (Late Night)</option>
                </select>
              </div>

              {tripType === 'roundtrip' ? (
                <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#738078] uppercase mb-1">
                    <IconCalendar className="w-3.5 h-3.5 text-[#C47A54]" />
                    <span>Return Date</span>
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    min={travelDate}
                    onChange={(e) => {
                      setReturnDate(e.target.value);
                      const diffTime = Math.abs(new Date(e.target.value).getTime() - new Date(travelDate).getTime());
                      const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
                      setDurationDays(days);
                      setDistanceKm((prev) => Math.max(prev, days * 250));
                    }}
                    className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer"
                  />
                </div>
              ) : (
                <div className="bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#738078] uppercase mb-1">
                    <IconCar className="w-3.5 h-3.5 text-[#173C32]" />
                    <span>Trip Distance (KM)</span>
                  </label>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#173C32]">{distanceKm} KM</span>
                    <button
                      type="button"
                      onClick={() => setCustomDistanceOverride(!customDistanceOverride)}
                      className="text-[10px] text-[#C47A54] hover:underline"
                    >
                      {customDistanceOverride ? 'Auto Calculate' : 'Change KM'}
                    </button>
                  </div>
                  {customDistanceOverride && (
                    <input
                      type="number"
                      min={20}
                      max={2000}
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      className="w-full mt-1 px-2 py-0.5 bg-[#FAF8F3] border border-[#D8D2C3] rounded text-xs text-[#173C32]"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Vehicle Category Filter Pills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase font-bold tracking-wider text-[#738078]">
                  Select Vehicle Category
                </label>
                <span className="text-[11px] text-[#738078]">
                  Showing {filteredVehicles.length} vehicles
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', 'Sedan', 'SUV / MPV', 'Luxury', 'Tempo / Van'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                      selectedCategory === cat
                        ? 'bg-[#173C32] text-[#FAF8F3] border-[#173C32]'
                        : 'bg-[#F2EFE8] text-[#46544C] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Selection List */}
            <div className="space-y-3">
              {filteredVehicles.map((v) => {
                const isSelected = v.id === selectedVehicleId;
                const vFare = Math.round(
                  tripType === 'local'
                    ? (localPackage === '4hr40km' ? v.baseFare * 4 + 40 * v.ratePerKm : localPackage === '8hr80km' ? v.baseFare * 6 + 80 * v.ratePerKm : v.baseFare * 8 + 120 * v.ratePerKm)
                    : (distanceKm * v.ratePerKm + (tripType === 'roundtrip' ? 400 * durationDays : 400) + (includeTollsInTotal ? distanceKm * 1.3 : 0)) * 1.05
                );

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                      isSelected
                        ? 'border-[#173C32] bg-[#F2EDE2]'
                        : 'border-[#D8D2C3] bg-[#FAF8F3] hover:bg-[#F5F2EA]'
                    }`}
                  >
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-3">
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-16 h-12 rounded-lg object-cover border border-[#D8D2C3]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#173C32]">{v.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#E8E2D5] text-[#173C32] font-semibold">
                            {v.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#55625A] flex items-center gap-3 mt-1">
                          <span>{v.capacitySeats} Seats</span>
                          <span>•</span>
                          <span>{v.luggageCapacity} Large Bags</span>
                          <span>•</span>
                          <span className="font-semibold text-[#173C32]">₹{v.ratePerKm}/km</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price & Selection Status */}
                    <div className="flex items-center justify-between sm:justify-end sm:gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E8E2D5]">
                      <div className="text-left sm:text-right">
                        <span className="text-base font-bold text-[#173C32] block">
                          ₹{vFare.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-[#738078] block">
                          ₹{Math.round(vFare / v.capacitySeats).toLocaleString('en-IN')} / person
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicleId(v.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          isSelected
                            ? 'bg-[#173C32] text-white border-[#173C32]'
                            : 'bg-[#FAF8F3] text-[#173C32] border-[#D8D2C3]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Fare Estimate & Breakdown Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F3] rounded-2xl border border-[#D8D2C3] p-5 sm:p-6 sticky top-28 space-y-5">
              <div className="border-b border-[#D8D2C3] pb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-[#C47A54]">
                  Transparent Rate Card
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173C32] mt-1">
                  Trip Fare Quotation
                </h3>
                <p className="text-xs text-[#55625A] mt-0.5">
                  {tripType === 'local'
                    ? `Local Rental: ${localPackage} in ${sourceCity}`
                    : tripType === 'airport'
                    ? `Airport Transfer: ${sourceCity}`
                    : `${sourceCity} to ${destinationCity} (${tripType === 'oneway' ? 'One-Way' : 'Round-Trip'})`}
                </p>
              </div>

              {/* Selected Vehicle Overview */}
              <div className="flex items-center gap-3 bg-[#F2EFE8] p-3 rounded-xl border border-[#D8D2C3]">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-16 h-12 rounded-lg object-cover border border-[#D8D2C3]"
                />
                <div className="flex-1">
                  <span className="text-xs font-bold text-[#173C32] block">
                    {selectedVehicle.name}
                  </span>
                  <span className="text-[11px] text-[#55625A] block">
                    {selectedVehicle.capacitySeats} Passengers • {selectedVehicle.luggageCapacity} Luggage Bags
                  </span>
                  <span className="text-[10px] text-[#C47A54] font-medium block">
                    Rate: ₹{selectedVehicle.ratePerKm} / km • Clean AC
                  </span>
                </div>
              </div>

              {/* Detailed Cost Breakdown Rows */}
              <div className="space-y-2.5 text-xs text-[#3D4A42]">
                <div className="flex items-center justify-between">
                  <span className="text-[#55625A]">
                    Total Highway Distance
                  </span>
                  <span className="font-semibold text-[#173C32]">
                    {fareBreakdown.effectiveKm} KM
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#55625A]">
                    Base Fuel & Km Charge (₹{fareBreakdown.ratePerKm}/km)
                  </span>
                  <span className="font-semibold text-[#173C32]">
                    ₹{fareBreakdown.kmFare.toLocaleString('en-IN')}
                  </span>
                </div>

                {tripType !== 'local' && (
                  <div className="flex items-center justify-between">
                    <span className="text-[#55625A]">
                      Driver Daily Allowance ({durationDays} Day{durationDays > 1 ? 's' : ''})
                    </span>
                    <span className="font-semibold text-[#173C32]">
                      ₹{fareBreakdown.driverBata.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between py-1 border-t border-[#E8E2D5]">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="tollToggle"
                      checked={includeTollsInTotal}
                      onChange={(e) => setIncludeTollsInTotal(e.target.checked)}
                      className="rounded border-[#D8D2C3] text-[#173C32] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="tollToggle" className="text-[#55625A] cursor-pointer">
                      Include Tolls & State Taxes
                    </label>
                  </div>
                  <span className="font-semibold text-[#173C32]">
                    ₹{fareBreakdown.tollEstimate.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#55625A]">GST (5% Government Tax)</span>
                  <span className="font-semibold text-[#173C32]">
                    ₹{fareBreakdown.gstAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Total Highlight */}
                <div className="pt-3 border-t-2 border-[#173C32] flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#738078] block">
                      Total Payable Amount
                    </span>
                    <span className="text-[11px] text-[#55625A]">
                      All-inclusive price
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-[#173C32] block">
                      ₹{fareBreakdown.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-semibold text-[#C47A54] block">
                      ₹{fareBreakdown.perPassengerCost.toLocaleString('en-IN')} / person
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-[#EFECE4] p-3 rounded-xl border border-[#D8D2C3] text-[11px] text-[#55625A] space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-[#173C32]">
                  <IconShield className="w-3.5 h-3.5 text-[#173C32]" />
                  <span>Yatra Atelier Cab Promise:</span>
                </div>
                <div>• Zero hidden driver overtime charges before 10 PM.</div>
                <div>• Clean AC cab with verified chauffeur in company uniform.</div>
                <div>• Free cancellation up to 6 hours before departure time.</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#173C32] text-[#FAF8F3] hover:bg-[#122F27] text-xs font-bold tracking-wide uppercase transition-colors"
                >
                  Book This Cab Now (Instant Demo Confirmation)
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+911149827700"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-[#D8D2C3] bg-[#FAF8F3] hover:bg-[#EAE5D9] text-xs font-semibold text-[#173C32] text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <IconPhone className="w-3.5 h-3.5 text-[#173C32]" />
                    <span>Call 24x7 Help</span>
                  </a>

                  <a
                    href="https://wa.me/919820155678"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-[#D8D2C3] bg-[#FAF8F3] hover:bg-[#EAE5D9] text-xs font-semibold text-[#173C32] text-center transition-colors"
                  >
                    WhatsApp Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comprehensive Fleet Specification Table */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#D8D2C3]">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase font-bold tracking-wider text-[#C47A54]">
            Transparent Vehicle Guide
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173C32] mt-1">
            Compare Our Full AC Taxi Fleet
          </h2>
          <p className="text-xs sm:text-sm text-[#55625A] mt-2">
            Every vehicle in our fleet is company-owned, commercial yellow-plate registered,
            and insured with GPS tracking for customer safety.
          </p>
        </div>

        <div className="overflow-x-auto bg-[#FAF8F3] rounded-2xl border border-[#D8D2C3]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2EFE8] border-b border-[#D8D2C3] text-[11px] uppercase tracking-wider text-[#738078]">
              <tr>
                <th className="py-3 px-4 font-bold">Vehicle Model</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Seating</th>
                <th className="py-3 px-4 font-bold">Luggage</th>
                <th className="py-3 px-4 font-bold">Rate / KM</th>
                <th className="py-3 px-4 font-bold">Best Suited For</th>
                <th className="py-3 px-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D5] text-[#3D4A42]">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-[#F7F5EF]">
                  <td className="py-3.5 px-4 font-semibold text-[#173C32] flex items-center gap-2">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-10 h-7 rounded object-cover border border-[#D8D2C3]"
                    />
                    <span>{v.name}</span>
                  </td>
                  <td className="py-3.5 px-4">{v.category}</td>
                  <td className="py-3.5 px-4 font-medium">{v.capacitySeats} Adults</td>
                  <td className="py-3.5 px-4">{v.luggageCapacity} Bags</td>
                  <td className="py-3.5 px-4 font-bold text-[#173C32]">₹{v.ratePerKm} / km</td>
                  <td className="py-3.5 px-4 text-[#55625A]">
                    {v.category.includes('Sedan')
                      ? 'Couples & Small Families (Budget friendly)'
                      : v.category.includes('MPV')
                      ? 'Families with Luggage, Temple Trips'
                      : v.category.includes('Luxury')
                      ? 'VIP Business, Weddings, Deluxe Transfers'
                      : 'Large Family Groups, Chardham Yatra'}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedVehicleId(v.id);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1 rounded bg-[#173C32] text-white text-[11px] font-semibold"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (Accordion) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#D8D2C3]">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-bold tracking-wider text-[#C47A54]">
            Customer Help & Clarifications
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#173C32] mt-1">
            Frequently Asked Questions on Cab Bookings
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Are tolls, state border taxes and parking fees included in the price?',
              a: 'Yes, when you keep "Include Tolls & State Taxes" checked, our fare quotation includes all highway FASTag tolls and interstate permit taxes so you do not have to pay anything extra to the driver on the highway.'
            },
            {
              q: 'Can we stop on the highway for breakfast, lunch, or temple darshan?',
              a: 'Absolutely! Our chauffeurs are polite and cooperative. Reasonable halts for meals, tea breaks, and roadside temple darshan are welcomed without any additional hourly waiting fee.'
            },
            {
              q: 'What is the advance booking token amount?',
              a: 'You can confirm any booking by paying a simple ₹500 token amount online. The remaining balance can be handed over to your driver at the end of the trip via UPI (Google Pay, PhonePe, Paytm) or Cash.'
            },
            {
              q: 'Do you provide airport pickup with flight delay tracking?',
              a: 'Yes, for airport pickups at Varanasi, Lucknow, Ayodhya, and Delhi, our operations desk monitors live flight arrival times so your chauffeur is stationed outside the terminal gate even if your flight is delayed.'
            },
            {
              q: 'What if we need to modify our travel dates or cancel?',
              a: 'We offer free cancellation up to 6 hours before departure. Simply call our 24x7 desk at +91 11 4982 7700 or message us on WhatsApp.'
            }
          ].map((item, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F3] rounded-xl border border-[#D8D2C3] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#173C32]"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <IconChevronUp className="w-4 h-4 text-[#C47A54] flex-shrink-0 ml-2" />
                  ) : (
                    <IconChevronDown className="w-4 h-4 text-[#738078] flex-shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#55625A] border-t border-[#E8E2D5] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Instant Cab Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#173C32]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF8F3] rounded-2xl border border-[#D8D2C3] w-full max-w-lg p-6 relative space-y-5 my-8">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#55625A] hover:bg-[#EAE5D9]"
            >
              <IconClose className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#C47A54] font-bold">
                Instant Cab Reservation
              </span>
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                Confirm Your Cab Booking
              </h3>
              <p className="text-xs text-[#55625A] mt-1">
                {sourceCity} ➔ {destinationCity} • {selectedVehicle.name} • Total: ₹{fareBreakdown.totalAmount.toLocaleString('en-IN')}
              </p>
            </div>

            <form onSubmit={handleConfirmCabBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#173C32] mb-1">
                  Full Name (Primary Passenger) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3] text-xs text-[#173C32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#173C32] mb-1">
                    Mobile Number (For Driver SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98201 12345"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3] text-xs text-[#173C32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173C32] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rajesh@gmail.com"
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3] text-xs text-[#173C32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173C32] mb-1">
                  Doorstep Pickup Address / Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hotel Taj Ganges / Cantt Railway Station Platform 1"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3] text-xs text-[#173C32] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173C32] mb-1">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior citizens travelling, roof luggage carrier needed, etc."
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3] text-xs text-[#173C32] focus:outline-none"
                />
              </div>

              {/* Payment Mode Selection */}
              <div>
                <label className="block text-xs font-bold text-[#173C32] mb-1.5">
                  Select Payment Preference
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#D8D2C3] bg-[#F2EFE8] cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="paymentPref"
                      checked={paymentPreference === 'token'}
                      onChange={() => setPaymentPreference('token')}
                      className="text-[#173C32]"
                    />
                    <div>
                      <span className="font-bold text-[#173C32] block">
                        Pay ₹500 Token Now (Demo Instant)
                      </span>
                      <span className="text-[11px] text-[#55625A] block">
                        Remaining balance ₹{(fareBreakdown.totalAmount - 500).toLocaleString('en-IN')} to be paid to driver upon trip completion.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#D8D2C3] bg-[#F2EFE8] cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="paymentPref"
                      checked={paymentPreference === 'driver_cash'}
                      onChange={() => setPaymentPreference('driver_cash')}
                      className="text-[#173C32]"
                    />
                    <div>
                      <span className="font-bold text-[#173C32] block">
                        Pay Driver Directly (Zero Advance)
                      </span>
                      <span className="text-[11px] text-[#55625A] block">
                        Pay total ₹{fareBreakdown.totalAmount.toLocaleString('en-IN')} via Cash or UPI at drop.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-[#173C32] text-[#FAF8F3] hover:bg-[#122F27] text-xs font-bold uppercase tracking-wide transition-colors"
                >
                  {isSubmitting ? 'Confirming Cab...' : 'Confirm Cab Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
