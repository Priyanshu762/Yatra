import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '../components/Icons';


import { useApp } from '../context/AppContext';

export const DestinationsPage: React.FC = () => {
  const { destinations, packages } = useApp();
  const [filterRegion, setFilterRegion] = useState<string>('All');

  const filteredDestinations = destinations.filter((d) => {
    if (filterRegion === 'All') return true;
    if (filterRegion === 'Spiritual') return d.id === 'varanasi' || d.id === 'ayodhya';
    if (filterRegion === 'Royal') return d.id === 'jaipur' || d.id === 'agra';
    if (filterRegion === 'Nawabi') return d.id === 'lucknow' || d.id === 'delhi';
    return true;
  });

  return (
    <div className="bg-[#F7F5EF] min-h-screen py-16 text-[#1E2922]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3 pb-6 border-b border-[#D8D2C3]">
          <div className="text-xs font-bold tracking-widest uppercase text-[#C47A54]">
            Popular Travel Destinations
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173C32] leading-tight font-bold">
            Temple Cities, Heritage Forts & Holiday Tours
          </h1>
          <p className="text-sm text-[#4E5C54] font-normal leading-relaxed">
            Travel comfortably with our own clean AC cabs, verified polite drivers, and pre-booked hotels. Clear prices with no hidden charges or forced shopping stops.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4">
            {[
              { id: 'All', label: 'All 6 Cities' },
              { id: 'Spiritual', label: 'Temple & Darshan Tours' },
              { id: 'Royal', label: 'Forts & Palace Tours' },
              { id: 'Nawabi', label: 'City Sightseeing & Food Walks' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterRegion(f.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  filterRegion === f.id
                    ? 'bg-[#173C32] text-white border-[#173C32]'
                    : 'bg-[#FAF8F3] text-[#4A5750] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Grid (No 3-in-a-row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDestinations.map((dest) => {
            const destPackages = packages.filter(
              (p) => p.destinationId === dest.id || p.destinationName.toLowerCase().includes(dest.name.toLowerCase())
            );

            return (
              <div
                key={dest.id}
                className="bg-[#FAF8F3] border border-[#D8D2C3] rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] bg-[#E8E2D5] overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#173C32] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    {dest.state}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#FAF8F3] text-[#173C32] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D8D2C3]">
                    {destPackages.length} {destPackages.length === 1 ? 'Tour Package' : 'Tour Packages Available'}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#173C32]">
                      {dest.name}
                    </h2>
                    <p className="text-xs uppercase tracking-wider text-[#C47A54] font-semibold mt-1">
                      {dest.tagline}
                    </p>
                    <p className="text-xs text-[#54625A] mt-2 leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#D8D2C3] space-y-1.5 text-xs text-[#4E5C54]">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-[#7E8B83] block">
                        Top Places to Visit:
                      </span>
                      {dest.culturalHighlights.map((hl, i) => (
                        <div key={i} className="text-xs flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C47A54]"></span>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D2C3] flex items-center justify-between text-xs">
                    <span className="text-[#6A7870] font-medium">Best Month: {dest.bestTimeToVisit}</span>
                    <Link
                      to={`/destinations/${dest.id}`}
                      className="px-4 py-2.5 bg-[#173C32] text-white text-xs font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32] flex items-center gap-1.5"
                    >
                      <span>View City Packages</span>
                      <IconArrowRight className="w-3.5 h-3.5 text-[#C47A54]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
