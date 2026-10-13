import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { IconArrowRight } from '../components/Icons';
import { useApp } from '../context/AppContext';

export const BookingCheckoutPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { packages, vehicles } = useApp();

  const pkg = packages.find((p) => p.id === packageId);

  const initialGuests = parseInt(searchParams.get('guests') || '2', 10);
  const initialVehicle = searchParams.get('vehicle') || 'V-01';

  const defaultStartDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [travelDate, setTravelDate] = useState<string>(defaultStartDate);
  const [guestsCount, setGuestsCount] = useState<number>(initialGuests);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialVehicle);
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [customPickup, setCustomPickup] = useState<string>('');

  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (pkg && pkg.pickupPoints.length > 0 && !pickupLocation) {
      setPickupLocation(pkg.pickupPoints[0]);
    }
  }, [pkg]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F7F5EF]">
        <h2 className="font-serif text-3xl font-bold text-[#173C32] mb-4">Tour Package Not Found</h2>
        <Link to="/packages" className="px-6 py-2.5 bg-[#173C32] text-white text-xs uppercase tracking-wider font-semibold rounded-lg">
          Return to Tour Packages
        </Link>
      </div>
    );
  }

  const calculateEndDate = (startDateStr: string, durationDays: number) => {
    if (!startDateStr) return '';
    const d = new Date(startDateStr);
    d.setDate(d.getDate() + (durationDays - 1));
    return d.toISOString().split('T')[0];
  };

  const endDate = calculateEndDate(travelDate, pkg.durationDays);
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const baseAmount = pkg.basePricePerPerson * guestsCount;
  const vehicleSurchargeTotal = selectedVehicle.dailySurcharge * pkg.durationDays;
  const taxesAmount = Math.round((baseAmount + vehicleSurchargeTotal) * 0.05);
  const totalAmount = baseAmount + vehicleSurchargeTotal + taxesAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!customerName.trim()) {
      setValidationError('Please enter lead passenger full name.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setValidationError('Please enter a valid email address to receive your tour voucher.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setValidationError('Please enter a valid 10-digit mobile number for driver updates.');
      return;
    }
    if (!travelDate) {
      setValidationError('Please select your tour start date.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (travelDate < todayStr) {
      setValidationError('Tour start date cannot be in the past.');
      return;
    }

    const effectivePickup = customPickup.trim() ? customPickup : pickupLocation;
    if (!effectivePickup) {
      setValidationError('Please select or type your pickup location.');
      return;
    }

    const pendingBooking = {
      packageId: pkg.id,
      packageTitle: pkg.title,
      destinationName: pkg.destinationName,
      customerName,
      customerEmail,
      customerPhone,
      pickupLocation: effectivePickup,
      travelDate,
      endDate,
      guestsCount,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      baseAmount,
      vehicleSurchargeTotal,
      taxesAmount,
      totalAmount,
      specialRequests: specialRequests.trim() || undefined,
    };

    sessionStorage.setItem('ya_pending_booking', JSON.stringify(pendingBooking));
    navigate('/checkout/payment');
  };

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl pb-4 border-b border-[#D8D2C3]">
          <div className="flex items-center gap-2 text-xs text-[#7A8780] mb-2 uppercase tracking-wider">
            <Link to="/packages" className="hover:underline">Tour Packages</Link>
            <span>/</span>
            <Link to={`/packages/${pkg.id}`} className="hover:underline">{pkg.title}</Link>
            <span>/</span>
            <span className="text-[#173C32] font-semibold">Book & Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#173C32] font-bold">
            Step 1: Tour Dates & Passenger Details
          </h1>
          <p className="text-xs text-[#54625A] mt-1">
            Select your journey date, pickup location (hotel, airport or railway station), and choose your private AC cab.
          </p>
        </div>

        {validationError && (
          <div className="p-4 bg-[#F2EFE8] border-2 border-[#8C3E2D] rounded-xl text-[#8C3E2D] text-xs">
            <strong>[Notice]</strong> {validationError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Dates */}
            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#173C32] border-b border-[#D8D2C3] pb-2">
                1. Tour Dates & Passengers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3B4840] mb-1">
                    Tour Start Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                  />
                  <span className="text-[11px] text-[#78857E] mt-1 block">
                    Tour Concludes on: <strong className="text-[#173C32]">{endDate}</strong> ({pkg.durationDays} days)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B4840] mb-1">
                    Number of Passengers
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Solo Passenger' : 'Passengers / Family'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">
                  Pickup Location
                </label>
                <div className="space-y-2">
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
                  >
                    {pkg.pickupPoints.map((pt, i) => (
                      <option key={i} value={pt}>
                        {pt}
                      </option>
                    ))}
                    <option value="custom">Home Address / Other Hotel or Station...</option>
                  </select>

                  {pickupLocation === 'custom' && (
                    <input
                      type="text"
                      placeholder="Enter full address, station platform, or flight number..."
                      value={customPickup}
                      onChange={(e) => setCustomPickup(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 2. Fleet Category (2-Column Grid) */}
            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#173C32] border-b border-[#D8D2C3] pb-2">
                2. Select Dedicated AC Cab
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vehicles.map((veh) => {
                  const isSelected = selectedVehicleId === veh.id;
                  return (
                    <div
                      key={veh.id}
                      onClick={() => setSelectedVehicleId(veh.id)}
                      className={`p-3 border rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#173C32] bg-[#EAE5D9]'
                          : 'border-[#D8D2C3] bg-[#F2EFE8] hover:bg-[#EAE5D9]'
                      }`}
                    >
                      <div className="aspect-[16/9] bg-[#E8E2D5] rounded-lg overflow-hidden mb-2">
                        <img src={veh.image} alt={veh.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs font-bold text-[#173C32]">{veh.name}</div>
                          <div className="text-[10px] text-[#738078]">{veh.category} • {veh.capacitySeats} Seater AC Cab</div>
                        </div>
                        <span className="text-xs font-bold text-[#C47A54]">
                          +₹{veh.dailySurcharge.toLocaleString('en-IN')}/day
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Primary Guest Information */}
            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#173C32] border-b border-[#D8D2C3] pb-2">
                3. Lead Passenger & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3B4840] mb-1">
                    Lead Passenger Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B4840] mb-1">
                    Email Address (for booking voucher) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh.sharma@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B4840] mb-1">
                    Mobile Number (for Driver & WhatsApp updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B4840] mb-1">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian breakfast, senior citizen assistance"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 bg-[#FAF8F3] p-6 border-2 border-[#D8D2C3] rounded-2xl space-y-4">
              <div className="border-b border-[#D8D2C3] pb-3">
                <span className="text-[10px] uppercase font-bold text-[#C47A54] tracking-widest block">
                  Tour Fare Summary
                </span>
                <h3 className="font-serif text-lg font-bold text-[#173C32] mt-0.5">
                  {pkg.title}
                </h3>
              </div>

              <div className="space-y-1.5 text-xs text-[#526058]">
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span className="font-semibold text-[#173C32]">{travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>End Date:</span>
                  <span className="font-semibold text-[#173C32]">{endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span className="font-semibold text-[#173C32]">{guestsCount} Persons</span>
                </div>
                <div className="flex justify-between">
                  <span>Private Cab:</span>
                  <span className="font-semibold text-[#173C32]">{selectedVehicle.name}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8D2C3] space-y-1.5 text-xs text-[#526058]">
                <div className="flex justify-between">
                  <span>Base Package ({guestsCount} × ₹{pkg.basePricePerPerson.toLocaleString('en-IN')}):</span>
                  <span>₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Private AC Cab ({pkg.durationDays} days):</span>
                  <span>₹{vehicleSurchargeTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>₹{taxesAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-[#D8D2C3] flex justify-between items-baseline text-[#173C32]">
                  <span className="text-sm font-bold">Total Tour Price:</span>
                  <span className="font-serif text-2xl font-bold">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#173C32] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32] flex items-center justify-center gap-2"
              >
                <span>Proceed to Test Payment</span>
                <IconArrowRight className="w-3.5 h-3.5 text-[#C47A54]" />
              </button>

              <div className="text-center text-[10px] text-[#78857E]">
                Demo Mode: No actual bank deduction. Instant voucher generation.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
