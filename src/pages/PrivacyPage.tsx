import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#D8D2C3] pb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block mb-2">
            Data Protection & Privacy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#173C32]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#637269] mt-2">
            Effective Date: October 2026. Yatra Atelier Private Limited.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#3E4E45] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#173C32] font-semibold">
              1. Information We Collect
            </h2>
            <p>
              When requesting an itinerary or reserving a journey with Yatra Atelier, we collect the primary traveler's name, email address, telephone contact, and designated airport/hotel pickup locations to ensure precise chauffeur dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#173C32] font-semibold">
              2. Use of Traveler Data
            </h2>
            <p>
              Your personal information is used exclusively to dispatch assigned chauffeurs, issue official temple sanctorum entry passes, and deliver your travel itinerary vouchers. We do not sell, rent, or distribute guest data to third-party commercial marketing platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-[#173C32] font-semibold">
              3. Local Storage in Demonstration Environment
            </h2>
            <p>
              This website persists booking and fleet allocations inside your browser's local storage for demo evaluation purposes. You may reset this data at any moment using the "Reset Demo State" button in the footer or admin console.
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
