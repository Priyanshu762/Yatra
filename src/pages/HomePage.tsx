import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowRight, IconCar, IconMapPin, IconSwap } from '../components/Icons';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { destinations, packages, vehicles } = useApp();
  const navigate = useNavigate();

  // Search mode tabs
  const [searchTab, setSearchTab] = useState<'cabs' | 'packages'>('cabs');

  // Cab Search state
  const [cabTripType, setCabTripType] = useState<'oneway' | 'roundtrip' | 'local' | 'airport'>('oneway');
  const [cabSource, setCabSource] = useState('Varanasi');
  const [cabDestination, setCabDestination] = useState('Ayodhya');
  const [cabVehicleId, setCabVehicleId] = useState('V-B1'); // Dzire

  // Package Search state
  const [selectedDestination, setSelectedDestination] = useState('');
  const [travelMonth, setTravelMonth] = useState('October 2026');
  const [guestCount, setGuestCount] = useState('2');

  // Package theme filter
  const [activeTheme, setActiveTheme] = useState<string>('All');

  // Sample itinerary day state
  const [activeItineraryTime, setActiveItineraryTime] = useState<number>(0);

  const handleSwapCabCities = () => {
    const s = cabSource;
    const d = cabDestination;
    setCabSource(d);
    setCabDestination(s);
  };

  const handleCabSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/calculator`);
  };

  const handlePackageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDestination) params.append('destination', selectedDestination);
    if (guestCount) params.append('guests', guestCount);
    navigate(`/packages?${params.toString()}`);
  };

  const filteredPackages = activeTheme === 'All'
    ? packages.slice(0, 6)
    : packages.filter((p) => p.theme === activeTheme).slice(0, 6);

  const sampleDayMoments = [
    {
      time: '05:30 AM',
      title: 'Sunrise Boat Ride on the Holy Ganga',
      location: 'Assi to Dashashwamedh Ghat, Varanasi',
      description: 'Your private driver takes you to the river ghat in the early morning. A traditional wooden boat is ready with fresh marigold flowers and hot tea while the morning aarti chants echo across the river.',
      image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80'
    },
    {
      time: '10:00 AM',
      title: 'Kashi Vishwanath Temple Darshan with Local Guide',
      location: 'Kashi Vishwanath Corridor',
      description: 'Our experienced local guide assists your family through the temple corridor smoothly, explaining the history and significance of the golden spire with complete peace of mind.',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'
    },
    {
      time: '02:30 PM',
      title: 'Famous Banarasi Saree Weavers & Local Street Food',
      location: 'Madanpura Weavers Quarter',
      description: 'Visit an authentic handloom workshop where genuine Banarasi silk sarees are woven by 4th-generation master weavers. Taste the famous Banarasi malaiyo, kachori, and lassi on the way.',
      image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80'
    },
    {
      time: '06:30 PM',
      title: 'Grand Evening Ganga Aarti from Reserved Balcony',
      location: 'Dashashwamedh Ghat Balcony',
      description: 'Watch the world-famous evening Ganga Aarti comfortably from a reserved elevated terrace with a full unobstructed view of the holy brass lamp ceremony, away from the rushing crowd.',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const POPULAR_HERO_ROUTES = [
    { src: 'Varanasi', dest: 'Ayodhya', km: '220 KM' },
    { src: 'Lucknow', dest: 'Ayodhya', km: '135 KM' },
    { src: 'Varanasi', dest: 'Prayagraj', km: '125 KM' },
    { src: 'Delhi NCR', dest: 'Agra', km: '230 KM' },
    { src: 'Delhi NCR', dest: 'Jaipur', km: '280 KM' },
  ];

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922]">
      {/* 1. Hero Section */}
      <section className="pt-10 pb-16 md:pt-14 md:pb-20 border-b border-[#D8D2C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-block px-3 py-1 rounded-md bg-[#EAE5D9] border border-[#D8D2C3] text-xs font-semibold text-[#173C32] uppercase tracking-wider">
                Direct Fleet Owner • 100% Verified AC Cabs
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173C32] leading-tight font-bold">
                Book Private Tour Packages & Verified AC Cabs Across India
              </h1>

              <p className="text-xs sm:text-sm text-[#46544C] max-w-xl font-normal leading-relaxed">
                Clean sanitized AC cabs with polite drivers, transparent per-km rates, and handcrafted holiday packages. No hidden tolls, zero surge pricing, and 24x7 customer support.
              </p>

              {/* Main Tabbed Search Widget */}
              <div className="bg-[#FAF8F3] rounded-2xl border border-[#D8D2C3] p-4 sm:p-5 mt-4 space-y-4">
                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-[#D8D2C3] pb-3">
                  <button
                    type="button"
                    onClick={() => setSearchTab('cabs')}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                      searchTab === 'cabs'
                        ? 'bg-[#173C32] text-[#FAF8F3]'
                        : 'bg-[#F2EFE8] text-[#55625A] hover:bg-[#EAE5D9]'
                    }`}
                  >
                    <IconCar className="w-3.5 h-3.5" />
                    <span>Outstation Cab & Fare Calculator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSearchTab('packages')}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                      searchTab === 'packages'
                        ? 'bg-[#173C32] text-[#FAF8F3]'
                        : 'bg-[#F2EFE8] text-[#55625A] hover:bg-[#EAE5D9]'
                    }`}
                  >
                    <IconMapPin className="w-3.5 h-3.5" />
                    <span>Holiday Tour Packages</span>
                  </button>
                </div>

                {/* Tab 1: Outstation Cab & Taxi Booking */}
                {searchTab === 'cabs' && (
                  <form onSubmit={handleCabSearch} className="space-y-3">
                    {/* Trip Types Pill */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
                      {(['oneway', 'roundtrip', 'local', 'airport'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setCabTripType(t)}
                          className={`px-2.5 py-1 rounded-md border ${
                            cabTripType === t
                              ? 'bg-[#173C32] text-white border-[#173C32]'
                              : 'bg-[#F2EFE8] text-[#55625A] border-[#D8D2C3]'
                          }`}
                        >
                          {t === 'oneway'
                            ? 'One-Way Drop'
                            : t === 'roundtrip'
                            ? 'Round Trip'
                            : t === 'local'
                            ? 'Local Rental (8hr/80km)'
                            : 'Airport Transfer'}
                        </button>
                      ))}
                    </div>

                    {/* Source, Swap, Destination */}
                    <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center">
                      <div className="sm:col-span-5 px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3]">
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#738078]">
                          Pickup City (From)
                        </label>
                        <select
                          value={cabSource}
                          onChange={(e) => setCabSource(e.target.value)}
                          className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer mt-0.5"
                        >
                          {['Varanasi', 'Ayodhya', 'Lucknow', 'Prayagraj', 'Delhi NCR', 'Agra', 'Jaipur', 'Haridwar', 'Bodh Gaya', 'Gorakhpur'].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-1 flex justify-center">
                        <button
                          type="button"
                          onClick={handleSwapCabCities}
                          title="Swap Cities"
                          className="p-1.5 rounded-md bg-[#FAF8F3] border border-[#D8D2C3] hover:bg-[#EAE5D9]"
                        >
                          <IconSwap className="w-3.5 h-3.5 text-[#173C32]" />
                        </button>
                      </div>

                      <div className="sm:col-span-5 px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3]">
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#738078]">
                          Drop City (To)
                        </label>
                        <select
                          value={cabDestination}
                          onChange={(e) => setCabDestination(e.target.value)}
                          className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer mt-0.5"
                        >
                          {['Ayodhya', 'Varanasi', 'Prayagraj', 'Lucknow', 'Agra', 'Delhi NCR', 'Jaipur', 'Udaipur', 'Bodh Gaya', 'Rishikesh'].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Vehicle & Date Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <div className="sm:col-span-7 px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3]">
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-[#738078]">
                          Select Car Model
                        </label>
                        <select
                          value={cabVehicleId}
                          onChange={(e) => setCabVehicleId(e.target.value)}
                          className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer mt-0.5"
                        >
                          <option value="V-B1">Maruti Dzire AC (4 Seats • ₹12/km)</option>
                          <option value="V-C1">Maruti Ertiga 7-Seater AC (6 Seats • ₹15/km)</option>
                          <option value="V-01">Toyota Innova Crysta ZX (6 Seats • ₹18/km)</option>
                          <option value="V-04">Force Urbania 9-Seater (9 Seats • ₹22/km)</option>
                          <option value="V-T2">Tempo Traveller 12-Seater (12 Seats • ₹20/km)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-5 flex items-center">
                        <button
                          type="submit"
                          className="w-full py-3 px-4 bg-[#173C32] text-white text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#122F27] border border-[#173C32]"
                        >
                          <span>Calculate Fare & Book</span>
                          <IconArrowRight className="w-3.5 h-3.5 text-[#C47A54]" />
                        </button>
                      </div>
                    </div>

                    {/* Popular Routes Shortcuts */}
                    <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                      <span className="text-[#738078] font-bold uppercase whitespace-nowrap">Popular:</span>
                      {POPULAR_HERO_ROUTES.map((r, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setCabSource(r.src);
                            setCabDestination(r.dest);
                            navigate('/calculator');
                          }}
                          className="whitespace-nowrap px-2 py-1 rounded bg-[#F2EFE8] border border-[#D8D2C3] hover:bg-[#EAE5D9] text-[#173C32] font-medium"
                        >
                          {r.src} ➔ {r.dest} ({r.km})
                        </button>
                      ))}
                    </div>
                  </form>
                )}

                {/* Tab 2: Tour Packages Search */}
                {searchTab === 'packages' && (
                  <form
                    onSubmit={handlePackageSearch}
                    className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
                  >
                    {/* Destination */}
                    <div className="flex-1 px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3]">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#738078]">
                        Select City / Destination
                      </label>
                      <select
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer mt-0.5"
                      >
                        <option value="">All Destinations (Varanasi, Ayodhya, etc.)</option>
                        {destinations.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.state})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Month */}
                    <div className="flex-1 px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3]">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#738078]">
                        Travel Month
                      </label>
                      <select
                        value={travelMonth}
                        onChange={(e) => setTravelMonth(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer mt-0.5"
                      >
                        <option value="October 2026">Oct to Nov 2026 (Festive Season)</option>
                        <option value="December 2026">Dec 2026 to Jan 2027 (Winter Holidays)</option>
                        <option value="February 2027">Feb to Mar 2027 (Spring Tours)</option>
                      </select>
                    </div>

                    {/* Passengers */}
                    <div className="w-full sm:w-32 px-3 py-2 bg-[#F2EFE8] rounded-lg border border-[#D8D2C3]">
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#738078]">
                        Passengers
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full bg-transparent text-xs font-semibold text-[#173C32] focus:outline-none cursor-pointer mt-0.5"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="4">4 Persons (Family)</option>
                        <option value="6">6+ Persons (Group)</option>
                      </select>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#173C32] text-white text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#122F27] border border-[#173C32]"
                    >
                      <span>Search Tours</span>
                      <IconArrowRight className="w-3.5 h-3.5 text-[#C47A54]" />
                    </button>
                  </form>
                )}
              </div>

              {/* Service Badges (Strictly no checkmarks) */}
              <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs text-[#55625A]">
                <span className="px-2.5 py-1 rounded-md bg-[#EAE5D9] border border-[#D8D2C3] font-medium">100% Own AC Cabs</span>
                <span className="px-2.5 py-1 rounded-md bg-[#EAE5D9] border border-[#D8D2C3] font-medium">Polite Verified Drivers</span>
                <span className="px-2.5 py-1 rounded-md bg-[#EAE5D9] border border-[#D8D2C3] font-medium">No Hidden Costs</span>
                <span className="px-2.5 py-1 rounded-md bg-[#EAE5D9] border border-[#D8D2C3] font-medium">Hotel & Sightseeing Assistance</span>
              </div>
            </div>

            {/* Right Visual Frame */}

            <div className="lg:col-span-5">
              <div className="border border-[#D8D2C3] bg-[#FAF8F3] p-3 rounded-2xl">
                <div className="relative aspect-[4/3] bg-[#E8E2D5] rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80"
                    alt="Varanasi Ganga Ghats at Sunrise"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#173C32]/95 text-white p-4">
                    <span className="text-[10px] uppercase tracking-wider text-[#E8C5AF] font-bold block">
                      Most Popular Tour Package
                    </span>
                    <h3 className="font-serif text-lg font-bold mt-0.5">
                      Varanasi Dawn to Twilight: 3 Days Spiritual Tour
                    </h3>
                    <p className="text-xs text-[#D8D2C5] mt-1 font-normal">
                      Includes private AC cab, hotel stay, sunrise boat, and special Aarti darshan assistance.
                    </p>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-[#F0ECE1] rounded-lg border border-[#D8D2C3] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#173C32] block">Clean Vehicle Fleet</span>
                    <span className="text-[#68766E] text-[11px]">Innova Crysta, Dzire, Mercedes, & Tempo Travellers</span>
                  </div>
                  <Link to="/packages" className="text-[#C47A54] font-bold uppercase tracking-wider text-[11px] hover:underline">
                    View Fleet →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Destinations Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#D8D2C3]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-1">
              Explore Popular Cities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#173C32]">
              Top Travel Destinations in North India
            </h2>
          </div>
          <Link
            to="/destinations"
            className="mt-3 sm:mt-0 text-xs uppercase font-bold tracking-wider text-[#173C32] hover:text-[#C47A54] flex items-center gap-1.5"
          >
            <span>View All Destinations</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.slice(0, 4).map((dest) => (
            <div
              key={dest.id}
              className="bg-[#FAF8F3] rounded-2xl border border-[#D8D2C3] flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-[16/9] bg-[#E8E2D5] overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#173C32] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                  {dest.state}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#FAF8F3] text-[#173C32] text-xs font-semibold px-2.5 py-1 rounded border border-[#D8D2C3]">
                  {dest.idealDuration} Needed
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#173C32]">
                    {dest.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#C47A54] font-semibold mt-1">
                    {dest.tagline}
                  </p>
                  <p className="text-xs text-[#526058] mt-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D8D2C3] flex items-center justify-between text-xs">
                  <span className="text-[#6C7872]">Best Season: {dest.bestTimeToVisit}</span>
                  <Link
                    to={`/destinations/${dest.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#173C32] text-white text-xs font-semibold hover:bg-[#122F27]"
                  >
                    View Packages
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Tour Packages */}
      <section className="py-16 bg-[#F0ECE1] border-y border-[#D8D2C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-1">
              Handpicked Holiday Packages
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#173C32]">
              Best Tour Packages with Dedicated Private Cab
            </h2>
            <p className="text-xs text-[#5A6660] mt-1">
              Every package includes your own private AC cab with driver, vetted hotel stays, daily breakfast, and complete sightseeing with all tolls paid.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mt-5">
              {[
                { id: 'All', label: 'All Packages' },
                { id: 'Spiritual', label: 'Temple & Darshan Tours' },
                { id: 'Royal Heritage', label: 'Forts & Palace Tours' },
                { id: 'Culinary & Culture', label: 'Food & Heritage Tours' },
                { id: 'Grand Sovereign', label: 'Multi-City Long Circuits' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border ${
                    activeTheme === theme.id
                      ? 'bg-[#173C32] text-white border-[#173C32]'
                      : 'bg-[#FAF8F3] text-[#4A5750] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPackages.slice(0, 4).map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#FAF8F3] rounded-2xl border border-[#D8D2C3] flex flex-col justify-between overflow-hidden"
              >
                <div className="relative aspect-[16/9] bg-[#E8E2D5] overflow-hidden">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#173C32] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {pkg.theme}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#FAF8F3] text-[#173C32] text-xs font-semibold px-2.5 py-1 rounded border border-[#D8D2C3]">
                    {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C47A54] block">
                      {pkg.destinationName}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#173C32] mt-0.5">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-[#526058] mt-1.5 leading-relaxed">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#D8D2C3] space-y-1 text-xs text-[#435149]">
                    <div>• {pkg.inclusions[0]}</div>
                    <div>• {pkg.inclusions[1]}</div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D2C3] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#7A8780] block">
                        Package Price Starts
                      </span>
                      <span className="font-serif text-xl font-bold text-[#173C32]">
                        ₹{pkg.basePricePerPerson.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-[#7A8780]"> / person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="px-3.5 py-2 rounded-lg border border-[#D8D2C3] bg-[#FAF8F3] text-xs font-semibold text-[#173C32] hover:bg-[#EAE5D9]"
                      >
                        Plan Details
                      </Link>
                      <Link
                        to={`/book/${pkg.id}`}
                        className="px-4 py-2 rounded-lg bg-[#173C32] text-white text-xs font-semibold hover:bg-[#122F27] border border-[#173C32]"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/packages"
              className="inline-block px-8 py-3 bg-[#173C32] text-white text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-[#122F27] border border-[#173C32]"
            >
              Browse All 12 Tour Packages
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Owned Cab Fleet Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-[#C47A54]">
              Clean & Reliable Fleet
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#173C32] leading-tight font-bold">
              Our Own Clean Private AC Cabs
            </h2>
            <p className="text-xs sm:text-sm text-[#4E5C54] leading-relaxed">
              We never outsource your trip to random local taxi stands. We own our vehicles, perform regular safety checks before every journey, and provide courteous drivers who ensure your family travels safely and comfortably.
            </p>

            <div className="space-y-2 pt-1 text-xs text-[#2A3B33]">
              <div className="p-2 rounded-lg bg-[#FAF8F3] border border-[#D8D2C3] font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#173C32]"></span>
                <span>Verified & Experienced Drivers with ID Verification</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF8F3] border border-[#D8D2C3] font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#173C32]"></span>
                <span>Sanitized AC Interiors with Cold Water Bottles & Mints</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF8F3] border border-[#D8D2C3] font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#173C32]"></span>
                <span>All Highway Tolls, Border Tax & Fuel Charges Included</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/calculator"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#173C32] text-white text-xs font-bold hover:bg-[#122F27] border border-[#173C32]"
              >
                Open Cab Fare Calculator & Rates
              </Link>
              <Link
                to="/packages"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#FAF8F3] border border-[#D8D2C3] text-xs font-bold text-[#173C32] hover:bg-[#EAE5D9]"
              >
                Tour Packages
              </Link>
            </div>
          </div>

          {/* 2-Column Fleet Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {vehicles.slice(0, 4).map((veh) => (
              <div
                key={veh.id}
                className="bg-[#FAF8F3] p-4 rounded-xl border border-[#D8D2C3]"
              >
                <div className="aspect-[16/10] bg-[#E8E2D5] rounded-lg overflow-hidden mb-3">
                  <img src={veh.image} alt={veh.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-[10px] uppercase font-bold text-[#C47A54]">
                  {veh.category}
                </div>
                <h4 className="font-serif text-base font-bold text-[#173C32] mt-0.5">
                  {veh.name}
                </h4>
                <div className="text-xs text-[#6B7871] mt-1 font-medium">
                  Capacity: {veh.capacitySeats} Passengers | {veh.luggageCapacity} Bags
                </div>
                <div className="mt-2 text-xs font-semibold text-[#173C32]">
                  Rate Tier: +₹{veh.dailySurcharge.toLocaleString('en-IN')}/day
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sample Itinerary Rhythm */}
      <section className="py-16 bg-[#173C32] text-[#F7F5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-1">
              Sample Tour Day
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              How Your Tour Day Looks Like
            </h2>
            <p className="text-xs text-[#CDC7B9] mt-1">
              Here is an example of how smoothly your morning, afternoon, and evening are planned in Varanasi with our driver and guide.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {sampleDayMoments.map((moment, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveItineraryTime(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    activeItineraryTime === idx
                      ? 'bg-[#C47A54] text-white border-[#C47A54]'
                      : 'bg-[#1E4D40] text-[#D0C9B9] border-[#255C4D] hover:bg-[#255C4D]'
                  }`}
                >
                  {moment.time}
                </button>
              ))}
            </div>
          </div>

          {/* Active Moment Spotlight */}
          <div className="bg-[#1E4D40] p-6 sm:p-8 rounded-2xl border border-[#2B6153]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] bg-[#173C32] rounded-xl overflow-hidden border border-[#2B6153]">
                <img
                  src={sampleDayMoments[activeItineraryTime].image}
                  alt={sampleDayMoments[activeItineraryTime].title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs uppercase font-bold tracking-wider text-[#C47A54] block">
                  {sampleDayMoments[activeItineraryTime].location}
                </span>
                <h3 className="font-serif text-2xl text-white font-bold">
                  {sampleDayMoments[activeItineraryTime].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D8D2C5] leading-relaxed font-normal">
                  {sampleDayMoments[activeItineraryTime].description}
                </p>
                <div className="pt-2 text-xs text-[#A9BDB4]">
                  • Private AC cab with driver waiting for you at every stop
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Travel Trust Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 pb-3 border-b border-[#D8D2C3]">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-1">
            Why Book With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#173C32]">
            Our Guarantees for Every Booking
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#435149] leading-relaxed">
          <div className="p-6 bg-[#FAF8F3] rounded-xl border border-[#D8D2C3] space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#173C32]">
              1. Punctual Pickup at Airport or Railway Station
            </h3>
            <p>
              Your driver reaches the pickup point 30 minutes before your train or flight arrives. You will receive the driver's phone number and cab details 24 hours in advance on WhatsApp.
            </p>
          </div>

          <div className="p-6 bg-[#FAF8F3] rounded-xl border border-[#D8D2C3] space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#173C32]">
              2. Hassle-Free Temple Darshan Assistance
            </h3>
            <p>
              In Varanasi (Kashi Vishwanath), Ayodhya (Ram Mandir), and Mathura, our local tour coordinators guide you through temple entry smoothly, keeping family and senior citizens comfortable.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
