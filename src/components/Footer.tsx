import React from 'react';
import { Link } from 'react-router-dom';
import { IconRefresh } from './Icons';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { resetDemoData } = useApp();

  return (
    <footer className="bg-[#173C32] text-[#E7E2D6] pt-16 pb-12 border-t border-[#234A3E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#244E41]">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EAE5D9] text-[#173C32] flex items-center justify-center font-serif text-lg font-bold border border-[#C47A54]">
                YL
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F0] block leading-none">
                  Yatra Luxe
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#C47A54] font-medium block mt-1">
                  Private Tour Packages & Cabs
                </span>
              </div>
            </div>
            <p className="text-xs text-[#CDC7B9] leading-relaxed font-light">
              Trusted tour operator for North India. We provide our own clean AC cars, verified courteous drivers, sanitized hotels, and complete family holiday packages with no hidden costs.
            </p>
            <div className="text-xs text-[#CDC7B9] space-y-1 pt-1">
              <div>• 100% Own Vehicle Fleet (Innova, Sedans, Tempo Travellers)</div>
              <div>• Verified Polite Drivers with Local Route Expertise</div>
              <div>• Guaranteed Timely Pickup from Airport / Railway Station</div>
            </div>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-[#FAF7F0] font-semibold mb-4">
              Top Travel Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CDC7B9]">
              <li>
                <Link to="/destinations/varanasi" className="hover:text-white">
                  Varanasi: Ganga Aarti & Kashi Vishwanath
                </Link>
              </li>
              <li>
                <Link to="/destinations/ayodhya" className="hover:text-white">
                  Ayodhya: Shri Ram Mandir & Sarayu River
                </Link>
              </li>
              <li>
                <Link to="/destinations/lucknow" className="hover:text-white">
                  Lucknow: Awadhi Food & Imambara
                </Link>
              </li>
              <li>
                <Link to="/destinations/jaipur" className="hover:text-white">
                  Jaipur: Amer Fort & Pink City
                </Link>
              </li>
              <li>
                <Link to="/destinations/agra" className="hover:text-white">
                  Agra: Taj Mahal Sunrise Tour
                </Link>
              </li>
              <li>
                <Link to="/destinations/delhi" className="hover:text-white">
                  Delhi: Historical Monuments & Markets
                </Link>
              </li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-[#FAF7F0] font-semibold mb-4">
              Tour Package Types
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CDC7B9]">
              <li>
                <Link to="/packages?theme=Spiritual" className="hover:text-white">
                  Temple Darshan & Pilgrimage Tours
                </Link>
              </li>
              <li>
                <Link to="/packages?theme=Royal+Heritage" className="hover:text-white">
                  Royal Forts & Heritage Palace Tours
                </Link>
              </li>
              <li>
                <Link to="/packages?theme=Culinary+%26+Culture" className="hover:text-white">
                  Local Food & Handicraft Tours
                </Link>
              </li>
              <li>
                <Link to="/packages?theme=Grand+Sovereign" className="hover:text-white">
                  Golden Triangle & Multi-City Circuits
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white">
                  View All 12 Packages
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-[#C47A54] hover:text-[#E2A687] font-semibold">
                  Cab Fare Calculator & Taxi Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Support and Booking Desk */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-widest text-[#FAF7F0] font-semibold mb-4">
              24x7 Customer Helpline
            </h4>
            <ul className="space-y-2 text-xs text-[#CDC7B9]">
              <li>Phone: +91 11 4982 7700</li>
              <li>WhatsApp: +91 98201 55678</li>
              <li>Email: booking@yatraluxe.com</li>
              <li>Address: 14 Barakhamba Rd, New Delhi</li>
              <li>Timing: 24 Hours Open for Active Bookings</li>
            </ul>

            <div className="mt-5 pt-3 border-t border-[#234A3E]">
              <button
                onClick={resetDemoData}
                className="flex items-center gap-1.5 text-xs text-[#C47A54] hover:text-[#E2A687] underline"
              >
                <IconRefresh className="w-3.5 h-3.5" />
                <span>Reset Demo Mock Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9A293]">
          <p>© {new Date().getFullYear()} Yatra Luxe Private Limited. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 text-xs">
            <Link to="/terms" className="hover:text-white underline">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-white underline">
              Privacy Policy
            </Link>
            <Link to="/admin" className="text-[#C47A54] hover:underline font-semibold">
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
