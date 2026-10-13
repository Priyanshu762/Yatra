import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  IconChevronDown,
  IconChevronUp,
  IconArrowRight
} from '../components/Icons';

import { useApp } from '../context/AppContext';

export const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { packages, vehicles } = useApp();
  const navigate = useNavigate();

  const pkg = packages.find((p) => p.id === id);

  const [selectedGuests, setSelectedGuests] = useState<number>(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('V-01');
  const [openDay, setOpenDay] = useState<number>(1);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F7F5EF]">
        <h2 className="font-serif text-3xl font-bold text-[#173C32] mb-4">Tour Package Not Found</h2>
        <Link to="/packages" className="px-6 py-2.5 bg-[#173C32] text-white text-xs uppercase tracking-wider font-semibold rounded-lg">
          Browse All Tour Packages
        </Link>
      </div>
    );
  }

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const baseTotal = pkg.basePricePerPerson * selectedGuests;
  const vehicleSurchargeTotal = (selectedVehicle?.dailySurcharge || 0) * pkg.durationDays;
  const estimatedGst = Math.round((baseTotal + vehicleSurchargeTotal) * 0.05);
  const grandTotalEstimate = baseTotal + vehicleSurchargeTotal + estimatedGst;

  const handleProceedToBooking = () => {
    navigate(`/book/${pkg.id}?guests=${selectedGuests}&vehicle=${selectedVehicleId}`);
  };

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[380px] max-h-[500px] overflow-hidden bg-[#173C32]">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-white">
          <div className="flex items-center gap-2 text-xs text-[#EAE5D9] mb-3 uppercase tracking-wider">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/packages" className="hover:underline">Tour Packages</Link>
            <span>/</span>
            <span className="text-white font-semibold truncate max-w-xs">{pkg.title}</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <div className="inline-block px-3 py-1 bg-[#173C32] text-white text-[11px] font-bold uppercase tracking-wider border border-[#C47A54] rounded-md">
              {pkg.theme}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight">
              {pkg.title}
            </h1>

            <p className="text-sm text-[#EAE5D9] font-normal max-w-2xl">
              {pkg.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Facts Strip */}
      <div className="bg-[#173C32] text-[#F7F5EF] border-b border-[#255246] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C47A54] block">Tour Duration</span>
            <span className="font-medium text-sm mt-0.5 block">{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C47A54] block">Destination</span>
            <span className="font-medium text-sm mt-0.5 block">{pkg.destinationName}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C47A54] block">Tour Type</span>
            <span className="font-medium text-sm mt-0.5 block">{pkg.groupType}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C47A54] block">Cab Type</span>
            <span className="font-medium text-sm mt-0.5 block">Dedicated Private AC Cab</span>
          </div>
        </div>
      </div>

      {/* Body & Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#C47A54] block">
                Tour Details & Plan
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173C32]">
                Package Overview
              </h2>
              <p className="text-sm text-[#46544C] leading-relaxed font-normal">
                {pkg.overview}
              </p>

              {/* Gallery Images (2-Column) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {pkg.galleryImages.slice(0, 2).map((img, i) => (
                  <div key={i} className="aspect-[16/10] bg-[#E8E2D5] border border-[#D8D2C3] rounded-2xl overflow-hidden">
                    <img src={img} alt={`Tour photo ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Day by Day Accordion */}
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-1">
                  Daily Itinerary
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#173C32]">
                  Day-by-Day Tour Plan
                </h2>
              </div>

              <div className="space-y-3">
                {pkg.dayByDayItinerary.map((day) => {
                  const isOpen = openDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="bg-[#FAF8F3] border border-[#D8D2C3] rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenDay(isOpen ? 0 : day.day)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-[#F2EFE8]"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-9 h-9 bg-[#173C32] text-white flex items-center justify-center font-serif text-xs font-bold rounded-lg shrink-0">
                            {day.day}
                          </span>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#C47A54] tracking-wider block">
                              Day 0{day.day}
                            </span>
                            <h3 className="font-serif text-base font-bold text-[#173C32]">
                              {day.title}
                            </h3>
                          </div>
                        </div>
                        {isOpen ? <IconChevronUp className="w-4 h-4 text-[#88968F]" /> : <IconChevronDown className="w-4 h-4 text-[#88968F]" />}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 border-t border-[#D8D2C3] space-y-4 text-xs text-[#4E5C54]">
                          <p className="leading-relaxed font-normal">
                            {day.description}
                          </p>

                          <div className="space-y-1 pt-1">
                            <span className="text-[11px] uppercase font-bold tracking-wider text-[#7E8B83] block">
                              Key Places Visited Today:
                            </span>
                            {day.highlights.map((hl, hIdx) => (
                              <div key={hIdx} className="text-xs flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C47A54]"></span>
                                <span>{hl}</span>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#D8D2C3] text-xs">
                            <div className="p-2.5 bg-[#F2EFE8] rounded-lg">
                              <strong className="text-[#173C32] block">Meals Included:</strong> {day.meals}
                            </div>
                            <div className="p-2.5 bg-[#F2EFE8] rounded-lg">
                              <strong className="text-[#173C32] block">Hotel Stay:</strong> {day.stay}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions (2-Column Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#173C32]">
                  What is Included in This Tour
                </h3>
                <div className="space-y-2 text-xs text-[#3E4E45]">
                  {pkg.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#173C32]"></span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#8C4631]">
                  What is Not Included
                </h3>
                <div className="space-y-2 text-xs text-[#5E6862]">
                  {pkg.exclusions.map((exc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8C4631]"></span>
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pickup points */}
            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-2 text-xs text-[#526058]">
              <h4 className="font-serif text-base font-bold text-[#173C32]">
                Free Pickup & Drop Locations
              </h4>
              <p className="text-xs text-[#627068]">
                Our driver will pick you up from any of these points at no extra charge:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {pkg.pickupPoints.map((pt, i) => (
                  <span key={i} className="px-3.5 py-1.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-[#173C32] font-medium">
                    {pt}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Calculator */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 bg-[#FAF8F3] p-6 border-2 border-[#D8D2C3] rounded-2xl space-y-6">
              <div className="border-b border-[#D8D2C3] pb-4">
                <span className="text-[10px] uppercase font-bold text-[#C47A54] tracking-widest block">
                  Tour Price Calculator
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-3xl font-bold text-[#173C32]">
                    ₹{pkg.basePricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#7A8881]">/ person base price</span>
                </div>
              </div>

              {/* Guest selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#3B4840]">
                  Number of Passengers / Family
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedGuests(num)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        selectedGuests === num
                          ? 'bg-[#173C32] text-white border-[#173C32]'
                          : 'bg-[#F2EFE8] text-[#4A5750] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                      }`}
                    >
                      {num} {num === 1 ? 'Person' : 'Persons'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#3B4840]">
                  Select Private Cab
                </label>
                <div className="space-y-2">
                  {vehicles.slice(0, 4).map((veh) => (
                    <button
                      key={veh.id}
                      type="button"
                      onClick={() => setSelectedVehicleId(veh.id)}
                      className={`w-full p-2.5 border rounded-xl text-left flex items-center justify-between transition-all ${
                        selectedVehicleId === veh.id
                          ? 'border-[#173C32] bg-[#EAE5D9]'
                          : 'border-[#D8D2C3] bg-[#F2EFE8] hover:bg-[#EAE5D9]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#173C32]">{veh.name}</div>
                        <div className="text-[10px] text-[#6A7870]">{veh.category} • {veh.capacitySeats} Seater AC Cab</div>
                      </div>
                      <span className="text-xs font-semibold text-[#C47A54]">
                        +₹{veh.dailySurcharge.toLocaleString('en-IN')}/day
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-[#D8D2C3] space-y-1.5 text-xs text-[#5C6A62]">
                <div className="flex justify-between">
                  <span>Base Tour ({selectedGuests} x ₹{pkg.basePricePerPerson.toLocaleString('en-IN')}):</span>
                  <span>₹{baseTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Private Cab ({pkg.durationDays} days):</span>
                  <span>₹{vehicleSurchargeTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>₹{estimatedGst.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-3 border-t border-[#D8D2C3] flex justify-between items-baseline text-[#173C32]">
                  <span className="text-sm font-bold">Total Tour Amount:</span>
                  <span className="font-serif text-2xl font-bold">
                    ₹{grandTotalEstimate.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToBooking}
                className="w-full py-3.5 bg-[#173C32] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32] flex items-center justify-center gap-2"
              >
                <span>Book This Tour Package</span>
                <IconArrowRight className="w-3.5 h-3.5 text-[#C47A54]" />
              </button>

              <div className="text-center text-[10px] text-[#7A8881]">
                Clean AC Cab & Verified Driver Guaranteed • No Advance Cancellation Penalty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
