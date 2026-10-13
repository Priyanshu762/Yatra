import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-3 pb-6 border-b border-[#D8D2C3]">
          <div className="text-xs font-bold tracking-widest uppercase text-[#C47A54]">
            About Our Travel Company
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173C32] leading-tight font-bold">
            Clean Cabs, Verified Drivers & Transparent Prices
          </h1>
          <p className="text-sm sm:text-base text-[#4E5C54] font-normal leading-relaxed">
            Yatra Atelier was created to give Indian families and travelers a comfortable, hassle-free travel experience with 100% owned AC cabs, polite experienced drivers, and pre-booked hotels with zero hidden charges.
          </p>
        </div>

        {/* Narrative Section (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#435149] leading-relaxed">
            <h2 className="font-serif text-3xl text-[#173C32] font-bold">
              Why We Own Our Fleet Instead of Outsourcing
            </h2>
            <p>
              In conventional travel agencies, your booking is passed down through middlemen and outsourced to unknown taxi unions. The vehicle that arrives at the station or airport is often poorly maintained, and drivers often force passengers to stop at expensive commission gift shops.
            </p>
            <p>
              At <strong>Yatra Atelier</strong>, we run our own vehicles: Dzire sedans, Innova Crysta family MPVs, luxury Tempo Travellers, and premium cars.
            </p>
            <p>
              Our drivers are full-time employees with verified backgrounds, polite manners, and years of safe driving experience. They strictly follow trip timings, do not force any shopping stops, and ensure your family has a safe and relaxing journey.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#FAF8F3] p-3 border border-[#D8D2C3] rounded-2xl">
              <div className="aspect-[4/3] bg-[#E8E2D5] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
                  alt="Yatra Atelier Tour Cabs"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-[#F0ECE1] text-[#173C32] text-xs font-bold uppercase tracking-wider rounded-lg mt-2 text-center">
                100% Owned Fleet • Clean AC Cabs & Verified Drivers
              </div>
            </div>
          </div>
        </div>

        {/* The Pillars (2-Column Grid, avoids 3 cards in a row) */}
        <div className="pt-6 space-y-6">
          <div className="pb-3 border-b border-[#D8D2C3]">
            <h2 className="font-serif text-3xl text-[#173C32] font-bold">
              Our 4 Customer Guarantees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C47A54] tracking-widest block">
                Guarantee 01
              </span>
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                Clean & Sanitized AC Cabs
              </h3>
              <p className="text-xs text-[#54625A] leading-relaxed font-normal">
                No third-party taxi brokering. Chilled air conditioning, clean seats, bottles of water, and multi-point vehicle checks before every departure.
              </p>
            </div>

            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C47A54] tracking-widest block">
                Guarantee 02
              </span>
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                Verified & Polite Drivers
              </h3>
              <p className="text-xs text-[#54625A] leading-relaxed font-normal">
                Experienced local drivers who know exact temple darshan timings, traffic routes, and safe highway food stops. Zero commission shopping pressure.
              </p>
            </div>

            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C47A54] tracking-widest block">
                Guarantee 03
              </span>
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                Pre-Booked Clean Hotels
              </h3>
              <p className="text-xs text-[#54625A] leading-relaxed font-normal">
                Carefully checked family-friendly hotels with clean beds, sanitized washrooms, hot water, and delicious daily breakfast included.
              </p>
            </div>

            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#C47A54] tracking-widest block">
                Guarantee 04
              </span>
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                Transparent Flat Rates
              </h3>
              <p className="text-xs text-[#54625A] leading-relaxed font-normal">
                Highway tolls, state border road taxes, parking charges, and driver night allowances are clearly included in your package bill. No surprise fees.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#173C32] text-white p-8 sm:p-12 text-center space-y-4 max-w-4xl mx-auto border border-[#173C32] rounded-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Need Help Planning Your Tour?
          </h2>
          <p className="text-xs sm:text-sm text-[#D5CEBF] max-w-lg mx-auto">
            Whether you want a quick weekend darshan in Varanasi or Ayodhya, or an extended 7-day Rajasthan family tour, our team is ready to assist you.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/packages"
              className="px-6 py-3 bg-[#C47A54] hover:bg-[#B36A45] text-white text-xs uppercase tracking-wider font-semibold rounded-lg"
            >
              Explore Tour Packages
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#FAF8F3] text-[#173C32] text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#EAE5D9]"
            >
              Contact Travel Helpdesk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
