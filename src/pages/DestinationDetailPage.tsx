import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';


export const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { destinations, packages } = useApp();

  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F7F5EF]">
        <h2 className="font-serif text-3xl font-bold text-[#173C32] mb-4">Destination Not Found</h2>
        <Link to="/destinations" className="px-6 py-2.5 bg-[#173C32] text-white text-xs uppercase tracking-wider font-semibold rounded-lg">
          View All Tour Destinations
        </Link>
      </div>
    );
  }

  const matchedPackages = packages.filter(
    (p) =>
      p.destinationId === destination.id ||
      p.destinationName.toLowerCase().includes(destination.name.toLowerCase())
  );

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[55vh] min-h-[380px] max-h-[500px] overflow-hidden bg-[#173C32]">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-white">
          <div className="flex items-center gap-2 text-xs text-[#EAE5D9] mb-3 uppercase tracking-wider">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/destinations" className="hover:underline">Destinations</Link>
            <span>/</span>
            <span className="text-white font-semibold">{destination.name}</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#E8C5AF]">
              {destination.state} • Top Holiday & Darshan Destination
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold">
              {destination.name}
            </h1>
            <p className="text-sm text-[#EAE5D9] font-normal max-w-2xl">
              {destination.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Facts Strip */}
      <div className="bg-[#173C32] text-[#F7F5EF] border-b border-[#255246] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C47A54] block">Recommended Days</span>
            <span className="font-medium text-sm mt-0.5 block">{destination.idealDuration}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C47A54] block">Best Travel Season</span>
            <span className="font-medium text-sm mt-0.5 block">{destination.bestTimeToVisit}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C47A54] block">Typical Weather</span>
            <span className="font-medium text-sm mt-0.5 block">{destination.weather}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C47A54] block">Cab Standard</span>
            <span className="font-medium text-sm mt-0.5 block">Clean AC Private Cabs</span>
          </div>
        </div>
      </div>

      {/* Editorial Body */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-2">
                City Overview & Sightseeing
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173C32]">
                Travel Guide to {destination.name}
              </h2>
              <p className="text-sm text-[#46544C] leading-relaxed mt-4 font-normal">
                {destination.description}
              </p>
            </div>

            {/* Signature Experiences (2-Column Grid) */}
            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                Must-Visit Sightseeing Spots in {destination.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {destination.signatureExperiences.map((exp, idx) => (
                  <div key={idx} className="p-3 bg-[#F2EFE8] border border-[#D8D2C3] rounded-xl text-xs text-[#293B32] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#173C32] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vignette Grid (2-Column) */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#173C32] mb-3">
                Sightseeing Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.gallery.slice(0, 2).map((img, i) => (
                  <div key={i} className="aspect-[4/3] bg-[#E8E2D5] border border-[#D8D2C3] rounded-2xl overflow-hidden">
                    <img src={img} alt={`${destination.name} photo ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#173C32]">
                Key Travel Highlights
              </h4>
              <div className="space-y-2 text-xs text-[#3E4E45]">
                {destination.culturalHighlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C47A54]"></span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#173C32] text-[#F7F5EF] p-6 rounded-2xl space-y-3">
              <h4 className="font-serif text-lg text-white font-bold">
                Need a Custom Family Tour Plan?
              </h4>
              <p className="text-xs text-[#CDC7B9] leading-relaxed">
                Connect {destination.name} with nearby cities. Our travel planner will prepare an affordable customized package with private AC cab and hotel stays.
              </p>
              <Link
                to="/contact"
                className="inline-block w-full text-center py-2.5 bg-[#C47A54] text-white text-xs font-semibold rounded-lg hover:bg-[#B36A45]"
              >
                Inquire For Custom Package
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Matched Packages (2-Column Grid) */}
      <section className="py-16 bg-[#F0ECE1] border-t border-[#D8D2C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 pb-3 border-b border-[#D8D2C3]">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-1">
                Best Value Tours
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#173C32]">
                Tour Packages for {destination.name}
              </h2>
            </div>
            <span className="text-xs text-[#6B7971]">
              {matchedPackages.length} available packages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {matchedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#FAF8F3] border border-[#D8D2C3] rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] bg-[#E8E2D5] overflow-hidden">
                  <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#173C32] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    {pkg.theme}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#FAF8F3] text-[#173C32] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D8D2C3]">
                    {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#173C32]">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#526058] leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  <div className="pt-4 border-t border-[#D8D2C3] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#7E8A83] block">Starting At</span>
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
                        Tour Details
                      </Link>
                      <Link
                        to={`/book/${pkg.id}`}
                        className="px-4 py-2 bg-[#173C32] text-white text-xs font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32]"
                      >
                        Book Package
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
