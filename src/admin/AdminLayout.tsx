import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IconMenu, IconClose, IconRefresh, IconArrowLeft } from '../components/Icons';
import { useApp } from '../context/AppContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { bookings, vehicles, drivers, resetDemoData } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const activeTripsCount = bookings.filter(
    (b) => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'In Progress'
  ).length;

  const navLinks = [
    { path: '/admin', label: 'Overview' },
    { path: '/admin/bookings', label: 'All Bookings', badge: bookings.length },
    { path: '/admin/allocations', label: 'Cab & Driver Allocation' },
    { path: '/admin/packages', label: 'Tour Packages' },
    { path: '/admin/destinations', label: 'Tour Destinations' },
    { path: '/admin/vehicles', label: 'Cabs & Vehicles', badge: vehicles.length },
    { path: '/admin/drivers', label: 'Drivers List', badge: drivers.length },
    { path: '/admin/payments', label: 'Payments & Accounts' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#1E2922] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#173C32] text-[#F7F5EF] border-r border-[#244E41] shrink-0 justify-between">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EAE5D9] text-[#173C32] flex items-center justify-center font-serif text-lg font-bold border border-[#C47A54] rounded-lg">
              YA
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-white block leading-none">
                Yatra Atelier
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C47A54] font-medium block mt-1">
                Admin Console
              </span>
            </div>
          </div>

          <div className="pt-2">
            <div className="px-3 py-1.5 bg-[#1E4D40] text-[11px] text-[#D8E6DF] flex items-center justify-between border border-[#255C4D] rounded-lg">
              <span>Active Bookings</span>
              <span className="font-bold text-[#E8C5AF]">{activeTripsCount} Trips</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-2">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                    active
                      ? 'bg-[#C47A54] text-white border-[#C47A54]'
                      : 'text-[#D0C9B9] border-transparent hover:bg-[#1E4D40] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        active ? 'bg-black/30 text-white' : 'bg-[#1E4D40] text-[#D0C9B9]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-[#234A3E] space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-[#EAE5D9] hover:text-[#C47A54] py-1.5"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Site</span>
          </Link>

          <button
            onClick={resetDemoData}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#1E4D40] hover:bg-[#255C4D] text-[#EAE5D9] text-xs font-medium rounded-lg border border-[#255C4D]"
          >
            <IconRefresh className="w-3.5 h-3.5 text-[#C47A54]" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-[#FAF8F3] border-b border-[#D8D2C3] h-16 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-[#173C32] border border-[#D8D2C3] bg-[#F2EFE8] rounded-lg"
            >
              <IconMenu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-[#637269]">
              <span className="font-semibold text-[#173C32]">Admin Console</span>
              <span>/</span>
              <span className="capitalize">
                {location.pathname === '/admin'
                  ? 'Overview'
                  : location.pathname.replace('/admin/', '').replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-semibold uppercase tracking-wider text-[#173C32] hover:text-[#C47A54] px-3.5 py-1.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg"
            >
              Live Website
            </Link>

            <button
              onClick={resetDemoData}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3E2D] hover:underline"
            >
              <IconRefresh className="w-3.5 h-3.5" />
              <span>Reset Mock State</span>
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-[#173C32] text-white flex flex-col justify-between p-6 z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#234A3E]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white text-[#173C32] flex items-center justify-center font-serif font-bold">
                    YA
                  </div>
                  <span className="font-serif font-bold">Admin Console</span>
                </div>
                <button onClick={() => setMobileSidebarOpen(false)}>
                  <IconClose className="w-5 h-5 text-white" />
                </button>
              </div>

              <nav className="space-y-1 mt-6">
                {navLinks.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider border ${
                        active ? 'bg-[#C47A54] text-white border-[#C47A54]' : 'text-[#D0C9B9] border-transparent'
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#234A3E] space-y-3">
              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 text-xs text-[#EAE5D9]"
              >
                <IconArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </Link>
              <button
                onClick={() => {
                  resetDemoData();
                  setMobileSidebarOpen(false);
                }}
                className="w-full py-2 bg-[#1E4D40] text-xs font-semibold uppercase tracking-wider text-white border border-[#255C4D]"
              >
                Reset Demo State
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
