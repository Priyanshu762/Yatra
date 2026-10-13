import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#D8D2C3] pb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-2">
            Legal & Regulatory Framework
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#173C32]">
            Terms of Service
          </h1>
          <p className="text-xs text-[#637269] mt-2">
            Effective Date: October 2026. Yatra Atelier Private Limited.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#3E4E45] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#173C32] font-semibold">
              1. Nature of the Service
            </h2>
            <p>
              Yatra Atelier organizes privately chauffeured travel itineraries, palace accommodations, and scholarly guided walkthroughs across sovereign destinations in India. All bookings made via this portal are subject to vehicle availability, road conditions, and security clearances in heritage zones.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#173C32] font-semibold">
              2. Owned Fleet and Chauffeur Conduct
            </h2>
            <p>
              All vehicles provided under Yatra Atelier packages are 100% company-owned or operated under strict sovereign audit. Chauffeurs are forbidden from soliciting commercial commissions or modifying approved routes without guest authorization. Guests are entitled to non-smoking, sanitized cabins with daily mineral water and chilled amenities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#173C32] font-semibold">
              3. Cancellation and Refund Policy
            </h2>
            <p>
              Cancellations initiated more than 14 days prior to departure are eligible for a full refund minus administrative processing fees. In this interactive demonstration, cancellations immediately simulate a refund to the demonstration payment record.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#173C32] font-semibold">
              4. Demonstration Disclaimer
            </h2>
            <p>
              This website is an interactive product demonstration. All payments simulated within this application are strictly mock transactions; no live credit cards or bank accounts are debited.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-[#D8D2C3]">
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#122F27]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
