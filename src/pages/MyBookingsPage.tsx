import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconSearch, IconPrinter } from '../components/Icons';
import { useApp } from '../context/AppContext';

export const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking, drivers } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cancelModalBookingId, setCancelModalBookingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus !== 'All' && b.bookingStatus !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = b.id.toLowerCase().includes(q);
      const matchName = b.customerName.toLowerCase().includes(q);
      const matchPackage = b.packageTitle.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPackage) return false;
    }
    return true;
  });

  const handleConfirmCancel = () => {
    if (cancelModalBookingId) {
      cancelBooking(cancelModalBookingId);
      setCancelModalBookingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-[#E3EFE9] text-[#173C32] border-[#BFD9CD]';
      case 'In Progress':
        return 'bg-[#F2E8D5] text-[#8C5F35] border-[#D8C7A8]';
      case 'Completed':
        return 'bg-[#EAE5D9] text-[#173C32] border-[#D8D2C3]';
      case 'Cancelled':
        return 'bg-[#F2EFE8] text-[#8C3E2D] border-[#E9C8BF]';
      default:
        return 'bg-[#F2EFE8] text-[#55625A] border-[#D8D2C3]';
    }
  };

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl pb-4 border-b border-[#D8D2C3]">
          <div className="text-xs font-bold tracking-widest uppercase text-[#C47A54] mb-1">
            Customer Bookings
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#173C32] font-bold">
            My Bookings & Tour Vouchers
          </h1>
          <p className="text-xs text-[#54625A] mt-1 font-normal">
            Check your confirmed tour packages, see your assigned driver and private AC cab details, and view or print booking vouchers.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#FAF8F3] p-4 border border-[#D8D2C3] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <IconSearch className="w-4 h-4 text-[#8C9890] absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by Booking ID, city, or passenger name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['All', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-all ${
                  filterStatus === st
                    ? 'bg-[#173C32] text-white border-[#173C32]'
                    : 'bg-[#F2EFE8] text-[#55635B] border-[#D8D2C3] hover:bg-[#EAE5D9]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-[#FAF8F3] p-12 text-center border border-[#D8D2C3] rounded-2xl space-y-4 max-w-lg mx-auto">
            <h3 className="font-serif text-2xl font-bold text-[#173C32]">No Bookings Found</h3>
            <p className="text-xs text-[#63726A]">
              You currently have no tour bookings matching this filter. Explore our affordable tour packages to book your next trip.
            </p>
            <Link
              to="/packages"
              className="inline-block px-6 py-2.5 bg-[#173C32] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#122F27]"
            >
              Browse Tour Packages
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((b) => {
              const driver = b.assignedDriverId
                ? drivers.find((d) => d.id === b.assignedDriverId)
                : undefined;

              return (
                <div
                  key={b.id}
                  className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D8D2C3] gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold text-[#173C32]">
                        {b.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getStatusBadge(
                          b.bookingStatus
                        )}`}
                      >
                        {b.bookingStatus}
                      </span>
                      <span className="text-xs text-[#66756D]">
                        Payment: <strong className="text-[#173C32]">{b.paymentStatus}</strong>
                      </span>
                    </div>

                    <span className="text-xs text-[#7B8881]">
                      Booked on: {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 space-y-2">
                      <h3 className="font-serif text-xl font-bold text-[#173C32]">
                        {b.packageTitle}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#526058]">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Tour Dates</span>
                          <span>{b.travelDate} to {b.endDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Passengers</span>
                          <span>{b.guestsCount} Persons ({b.customerName})</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Private Cab</span>
                          <span>{b.vehicleName}</span>
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-[#173C32]">
                        {driver ? (
                          <span>
                            Assigned Driver: <strong>{driver.name}</strong> (Mobile: {driver.phone})
                          </span>
                        ) : (
                          <span className="text-[#C47A54] font-medium">
                            Driver Assignment in Progress (Details sent on WhatsApp 24h prior)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col sm:items-end justify-between space-y-3 pt-3 md:pt-0 md:border-l md:border-[#D8D2C3] md:pl-6">
                      <div className="sm:text-right">
                        <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">
                          Total Paid
                        </span>
                        <span className="font-serif text-2xl font-bold text-[#173C32]">
                          ₹{b.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/booking-confirmation/${b.id}`}
                          className="px-4 py-2 bg-[#173C32] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32] flex items-center gap-1.5"
                        >
                          <IconPrinter className="w-3.5 h-3.5 text-[#C47A54]" />
                          <span>View Voucher</span>
                        </Link>

                        {b.bookingStatus !== 'Cancelled' && (
                          <button
                            onClick={() => setCancelModalBookingId(b.id)}
                            className="px-3 py-2 bg-transparent text-[#8C3E2D] hover:bg-[#F2EFE8] text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#D8D2C3]"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cancel Modal */}
        {cancelModalBookingId && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-[#FAF8F3] p-6 max-w-md w-full border-2 border-[#D8D2C3] rounded-2xl space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#173C32]">
                  Cancel Tour Booking?
                </h3>
                <p className="text-xs text-[#54625A] mt-2 leading-relaxed">
                  Are you sure you want to cancel booking <strong>{cancelModalBookingId}</strong>? The booking status will be updated to Cancelled and a simulated refund will be credited back immediately.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D8D2C3]">
                <button
                  type="button"
                  onClick={() => setCancelModalBookingId(null)}
                  className="px-4 py-2 border border-[#D8D2C3] text-xs font-semibold uppercase tracking-wider rounded-lg text-[#173C32] hover:bg-[#F2EFE8]"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-4 py-2 bg-[#8C3E2D] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#773324]"
                >
                  Confirm Cancel & Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
