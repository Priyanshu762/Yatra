import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconCalendar, IconMenu, IconClose, IconPhone } from './Icons';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { bookings } = useApp();
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const activeBookingsCount = bookings.filter(
    (b) => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'In Progress'
  ).length;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5EF] border-b border-[#D8D2C3]">
      {/* Top Notice Bar */}
      <div className="bg-[#173C32] text-[#EFEBE1] py-1.5 px-3 sm:px-4 text-center border-b border-[#234A3E]">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[10px] sm:text-[11px] font-medium tracking-wide">
          <span className="hidden sm:inline">Clean AC Cabs & Verified Drivers</span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="hidden md:inline">No Hidden Charges</span>
          <span className="hidden md:inline opacity-40">•</span>
          <span>Direct Fleet Owner</span>
          <span className="opacity-40">•</span>
          <a
            href="tel:+911149827700"
            className="font-semibold text-[#EFEBE1] hover:text-[#C47A54] transition-colors"
          >
            24x7 Helpline: +91 11 4982 7700
          </a>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#173C32] text-[#F7F5EF] flex items-center justify-center font-serif text-sm sm:text-base font-bold border border-[#C47A54] flex-shrink-0">
            YA
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#173C32] leading-none whitespace-nowrap">
              Yatra Atelier
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-normal text-[#C47A54] font-semibold mt-0.5 sm:mt-1 whitespace-nowrap">
              Tours & Private Cabs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-5 text-[11px] xl:text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
          <Link
            to="/"
            className={`px-2 py-1.5 transition-colors whitespace-nowrap ${
              isActive('/') && location.pathname === '/'
                ? 'text-[#173C32] border-b-2 border-[#C47A54]'
                : 'text-[#55625A] hover:text-[#173C32]'
            }`}
          >
            Home
          </Link>
          <Link
            to="/destinations"
            className={`px-2 py-1.5 transition-colors whitespace-nowrap ${
              isActive('/destinations')
                ? 'text-[#173C32] border-b-2 border-[#C47A54]'
                : 'text-[#55625A] hover:text-[#173C32]'
            }`}
          >
            Destinations
          </Link>
          <Link
            to="/packages"
            className={`px-2 py-1.5 transition-colors whitespace-nowrap ${
              isActive('/packages')
                ? 'text-[#173C32] border-b-2 border-[#C47A54]'
                : 'text-[#55625A] hover:text-[#173C32]'
            }`}
          >
            Tour Packages
          </Link>
          <Link
            to="/calculator"
            className={`px-2 py-1.5 transition-colors whitespace-nowrap ${
              isActive('/calculator') || isActive('/cabs')
                ? 'text-[#173C32] border-b-2 border-[#C47A54]'
                : 'text-[#55625A] hover:text-[#173C32]'
            }`}
          >
            Cab Calculator
          </Link>
          <Link
            to="/about"
            className={`px-2 py-1.5 transition-colors whitespace-nowrap ${
              isActive('/about')
                ? 'text-[#173C32] border-b-2 border-[#C47A54]'
                : 'text-[#55625A] hover:text-[#173C32]'
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`px-2 py-1.5 transition-colors whitespace-nowrap ${
              isActive('/contact')
                ? 'text-[#173C32] border-b-2 border-[#C47A54]'
                : 'text-[#55625A] hover:text-[#173C32]'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* My Bookings Button - Desktop & Tablet */}
          <Link
            to="/my-bookings"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-[#D8D2C3] text-[#173C32] bg-[#FAF8F3] hover:bg-[#EAE5D9] whitespace-nowrap"
          >
            <IconCalendar className="w-3.5 h-3.5 text-[#C47A54]" />
            <span>My Bookings</span>
            {activeBookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#173C32] text-white text-[10px] flex items-center justify-center font-bold">
                {activeBookingsCount}
              </span>
            )}
          </Link>

          {/* Admin Button - Desktop & Tablet */}
          <Link
            to="/admin"
            className="hidden sm:inline-block text-xs font-semibold px-3 py-2 rounded-lg bg-[#173C32] text-[#F7F5EF] hover:bg-[#122F27] border border-[#173C32] whitespace-nowrap"
          >
            Admin Panel
          </Link>

          {/* Compact Mobile My Bookings Icon (< sm) */}
          <Link
            to="/my-bookings"
            className="sm:hidden relative p-2 rounded-lg text-[#173C32] border border-[#D8D2C3] bg-[#FAF8F3]"
            title="My Bookings"
          >
            <IconCalendar className="w-4 h-4" />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#173C32] text-white text-[9px] flex items-center justify-center font-bold">
                {activeBookingsCount}
              </span>
            )}
          </Link>

          {/* Mobile & Tablet Hamburger Toggle (< lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#173C32] border border-[#D8D2C3] bg-[#FAF8F3] hover:bg-[#EAE5D9] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <IconClose className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile & Tablet Dropdown Drawer (< lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F3] border-b border-[#D8D2C3] px-4 pt-3 pb-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-sm">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-[#EAE5D9] text-[#173C32]'
                  : 'text-[#445049] hover:bg-[#F2EFE8]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/destinations')
                  ? 'bg-[#EAE5D9] text-[#173C32]'
                  : 'text-[#445049] hover:bg-[#F2EFE8]'
              }`}
            >
              Destinations (Varanasi, Ayodhya, Jaipur, etc.)
            </Link>
            <Link
              to="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/packages')
                  ? 'bg-[#EAE5D9] text-[#173C32]'
                  : 'text-[#445049] hover:bg-[#F2EFE8]'
              }`}
            >
              Tour Packages (12 Handcrafted Itineraries)
            </Link>
            <Link
              to="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/calculator') || isActive('/cabs')
                  ? 'bg-[#EAE5D9] text-[#173C32]'
                  : 'text-[#445049] hover:bg-[#F2EFE8]'
              }`}
            >
              Cab & Fare Calculator (Source ➔ Destination)
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/about')
                  ? 'bg-[#EAE5D9] text-[#173C32]'
                  : 'text-[#445049] hover:bg-[#F2EFE8]'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/contact')
                  ? 'bg-[#EAE5D9] text-[#173C32]'
                  : 'text-[#445049] hover:bg-[#F2EFE8]'
              }`}
            >
              Contact & 24x7 Customer Desk
            </Link>
          </div>

          {/* Quick Action Buttons in Mobile Menu */}
          <div className="pt-3 border-t border-[#D8D2C3] flex flex-col gap-2">
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#D8D2C3] text-[#173C32] text-xs font-semibold bg-[#FAF8F3] hover:bg-[#EAE5D9]"
            >
              <IconCalendar className="w-3.5 h-3.5 text-[#C47A54]" />
              <span>My Bookings ({activeBookingsCount})</span>
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#173C32] text-white text-xs font-semibold hover:bg-[#122F27]"
            >
              Admin Management Panel
            </Link>
          </div>

          {/* Quick Helpline on Mobile */}
          <div className="pt-2 border-t border-[#D8D2C3] flex items-center justify-between text-xs text-[#55625A]">
            <a
              href="tel:+911149827700"
              className="flex items-center gap-1.5 font-semibold text-[#173C32]"
            >
              <IconPhone className="w-3.5 h-3.5 text-[#C47A54]" />
              <span>+91 11 4982 7700</span>
            </a>
            <span className="text-[10px] text-[#738078]">24x7 Active Booking Desk</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
