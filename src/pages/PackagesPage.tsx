import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { IconSearch, IconClose, IconArrowRight } from '../components/Icons';

import { useApp } from '../context/AppContext';

export const PackagesPage: React.FC = () => {
  const { packages, destinations } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialDest = searchParams.get('destination') || 'all';
  const initialTheme = searchParams.get('theme') || 'all';

  const [selectedDestination, setSelectedDestination] = useState<string>(initialDest);
  const [selectedTheme, setSelectedTheme] = useState<string>(initialTheme);
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      if (selectedDestination !== 'all') {
        const destMatch =
          pkg.destinationId === selectedDestination ||
          pkg.destinationName.toLowerCase().includes(selectedDestination.toLowerCase());
        if (!destMatch) return false;
      }

      if (selectedTheme !== 'all') {
        if (pkg.theme !== selectedTheme) return false;
      }

      if (selectedDuration === 'short' && pkg.durationDays > 3) return false;
      if (selectedDuration === 'medium' && (pkg.durationDays < 4 || pkg.durationDays > 5)) return false;
      if (selectedDuration === 'long' && pkg.durationDays < 6) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(q);
        const matchesSubtitle = pkg.subtitle.toLowerCase().includes(q);
        const matchesDest = pkg.destinationName.toLowerCase().includes(q);
        const matchesOverview = pkg.overview.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesDest && !matchesOverview) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePricePerPerson - b.basePricePerPerson;
      if (sortBy === 'price-high') return b.basePricePerPerson - a.basePricePerPerson;
      if (sortBy === 'duration-low') return a.durationDays - b.durationDays;
      if (sortBy === 'duration-high') return b.durationDays - a.durationDays;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [packages, selectedDestination, selectedTheme, selectedDuration, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedDestination('all');
    setSelectedTheme('all');
    setSelectedDuration('all');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="bg-[#F7F5EF] min-h-screen py-16 text-[#1E2922]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl pb-6 border-b border-[#D8D2C3]">
          <div className="text-xs font-bold tracking-widest uppercase text-[#C47A54] mb-1">
            Tour Packages & Rates
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173C32] font-bold">
            All Holiday & Pilgrimage Tour Packages
          </h1>
          <p className="text-sm text-[#4E5C54] font-normal leading-relaxed mt-2">
            Choose from our family tour packages with clean private AC cabs, verified hotel stays, daily breakfast, and sightseeing. Transparent per-person rates with no hidden fees.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <IconSearch className="w-4 h-4 text-[#8C9890] absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search city, temple, or tour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] placeholder-[#8C9890] focus:outline-none"
              />
            </div>

            <div>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
              >
                <option value="all">All Cities (6 Tour Cities)</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.state})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
              >
                <option value="all">All Tour Types</option>
                <option value="Spiritual">Temple Darshan Tours</option>
                <option value="Royal Heritage">Forts & Heritage Tours</option>
                <option value="Culinary & Culture">City Sightseeing & Food Walks</option>
                <option value="Grand Sovereign">Multi-City Grand Tours</option>
              </select>
            </div>

            <div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
              >
                <option value="all">All Tour Durations</option>
                <option value="short">Short Trip (2 to 3 Days)</option>
                <option value="medium">Medium Circuit (4 to 5 Days)</option>
                <option value="long">Long Tour (6+ Days)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-[#D8D2C3] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#173C32]">
                Showing {filteredPackages.length} of {packages.length} Tour Packages
              </span>
              {(selectedDestination !== 'all' || selectedTheme !== 'all' || selectedDuration !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[#C47A54] hover:underline ml-3 font-semibold"
                >
                  <IconClose className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#6D7A73]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg px-3 py-1.5 text-xs text-[#173C32] focus:outline-none cursor-pointer"
              >
                <option value="featured">Recommended Tours</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration-low">Days: Shortest First</option>
                <option value="duration-high">Days: Longest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Package Grid (No 3-in-a-row) */}
        {filteredPackages.length === 0 ? (
          <div className="bg-[#FAF8F3] p-12 text-center border border-[#D8D2C3] rounded-2xl max-w-xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#173C32]">No Tour Packages Found</h3>
            <p className="text-xs text-[#63726A]">
              We couldn't find any tour packages matching your search. Try resetting filters to see all available packages.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#173C32] text-white text-xs font-semibold rounded-lg hover:bg-[#122F27]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#FAF8F3] border border-[#D8D2C3] rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] bg-[#E8E2D5] overflow-hidden">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#173C32] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    {pkg.theme}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#FAF8F3] text-[#173C32] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D8D2C3]">
                    {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C47A54] block">
                      {pkg.destinationName}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#173C32] mt-1">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-[#526058] mt-2 leading-relaxed">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#D8D2C3] text-xs text-[#48554E]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#173C32]"></span>
                      <span>{pkg.inclusions[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#173C32]"></span>
                      <span>{pkg.inclusions[1]}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D2C3] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#7E8A83] block">
                        Package Price
                      </span>
                      <span className="font-serif text-xl font-bold text-[#173C32]">
                        ₹{pkg.basePricePerPerson.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#7E8A83]"> / person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="px-3.5 py-2 border border-[#D8D2C3] bg-[#FAF8F3] text-xs font-semibold rounded-lg text-[#173C32] hover:bg-[#EAE5D9]"
                      >
                        Tour Plan
                      </Link>
                      <Link
                        to={`/book/${pkg.id}`}
                        className="px-4 py-2 bg-[#173C32] text-white text-xs font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32] flex items-center gap-1.5"
                      >
                        <span>Book Now</span>
                        <IconArrowRight className="w-3.5 h-3.5 text-[#C47A54]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
