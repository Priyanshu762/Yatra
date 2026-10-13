import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconSearch, IconClose } from '../components/Icons';
import { useApp } from '../context/AppContext';
import type { Booking } from '../types';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filtered = bookings.filter((b) => {
    if (filterStatus !== 'All' && b.bookingStatus !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = b.id.toLowerCase().includes(q);
      const matchName = b.customerName.toLowerCase().includes(q);
      const matchPackage = b.packageTitle.toLowerCase().includes(q);
      const matchPhone = b.customerPhone.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPackage && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D2C3] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#173C32]">
            All Tour Bookings
          </h1>
          <p className="text-xs text-[#66756C] mt-1 font-normal">
            Search bookings, view passenger vouchers, update trip status, and manage driver assignments.
          </p>
        </div>

        <Link
          to="/admin/allocations"
          className="px-4 py-2.5 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#122F27] border border-[#173C32]"
        >
          Cab & Driver Allocations
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF8F3] p-4 border border-[#D8D2C3] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <IconSearch className="w-4 h-4 text-[#8C9890] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by ID, passenger, phone, or package..."
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

      {/* Table */}
      <div className="bg-[#FAF8F3] border border-[#D8D2C3] rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-xs text-[#3E4F45]">
          <thead className="bg-[#F2EFE8] text-[10px] uppercase font-bold text-[#7A8780] tracking-wider border-b border-[#D8D2C3]">
            <tr>
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Lead Passenger</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Dates</th>
              <th className="py-3 px-4">Passengers</th>
              <th className="py-3 px-4">Cab</th>
              <th className="py-3 px-4">Driver</th>
              <th className="py-3 px-4">Total Fare</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8D2C3]">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-[#F2EFE8]">
                <td className="py-3 px-4 font-mono font-bold text-[#173C32]">{b.id}</td>
                <td className="py-3 px-4 font-medium text-[#173C32]">
                  <div>{b.customerName}</div>
                  <div className="text-[10px] text-[#78857E]">{b.customerPhone}</div>
                </td>
                <td className="py-3 px-4 max-w-xs truncate">{b.packageTitle}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div>{b.travelDate}</div>
                  <div className="text-[10px] text-[#78857E]">to {b.endDate}</div>
                </td>
                <td className="py-3 px-4">{b.guestsCount} Persons</td>
                <td className="py-3 px-4">{b.vehicleName}</td>
                <td className="py-3 px-4">
                  {b.assignedDriverName ? (
                    <span className="text-[#173C32] font-semibold">{b.assignedDriverName}</span>
                  ) : (
                    <span className="text-[#C47A54] font-semibold">Unassigned</span>
                  )}
                </td>
                <td className="py-3 px-4 font-bold text-[#173C32]">
                  ₹{b.totalAmount.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={b.bookingStatus}
                    onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                    className="bg-[#EAE4D5] border border-[#D8D2C3] rounded-md text-[10px] uppercase font-bold text-[#173C32] px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="text-[#173C32] hover:underline font-semibold uppercase text-[11px]"
                  >
                    View Details
                  </button>
                  <Link
                    to="/admin/allocations"
                    className="text-[#C47A54] hover:underline font-semibold uppercase text-[11px]"
                  >
                    Assign
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] max-w-2xl w-full border-2 border-[#D8D2C3] rounded-2xl p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-[#D8D2C3] pb-3">
              <div>
                <span className="font-mono text-lg font-bold text-[#173C32]">{selectedBooking.id}</span>
                <span className="text-xs text-[#637269] block">Passenger Details & Assignment Info</span>
              </div>
              <button onClick={() => setSelectedBooking(null)}>
                <IconClose className="w-5 h-5 text-[#173C32]" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-[#435149]">
              <div>
                <strong className="block text-[#173C32]">Lead Passenger:</strong>
                <div>{selectedBooking.customerName}</div>
                <div>{selectedBooking.customerEmail}</div>
                <div>{selectedBooking.customerPhone}</div>
              </div>
              <div>
                <strong className="block text-[#173C32]">Tour Package:</strong>
                <div>{selectedBooking.packageTitle}</div>
                <div>{selectedBooking.travelDate} to {selectedBooking.endDate} ({selectedBooking.guestsCount} Persons)</div>
                <div>City: {selectedBooking.destinationName}</div>
              </div>
              <div>
                <strong className="block text-[#173C32]">Pickup Location:</strong>
                <div>{selectedBooking.pickupLocation}</div>
              </div>
              <div>
                <strong className="block text-[#173C32]">Special Requests:</strong>
                <div>{selectedBooking.specialRequests || 'None requested'}</div>
              </div>
            </div>

            <div className="p-3 bg-[#F2EFE8] border border-[#D8D2C3] rounded-xl text-xs">
              <strong className="block text-[#173C32] mb-1">Assigned Cab & Driver:</strong>
              <div>Cab: {selectedBooking.vehicleName}</div>
              <div>Driver: {selectedBooking.assignedDriverName || 'Not yet assigned'}</div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#D8D2C3]">
              <div className="font-bold text-[#173C32] text-sm">
                Total Amount: ₹{selectedBooking.totalAmount.toLocaleString('en-IN')} ({selectedBooking.paymentStatus})
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/booking-confirmation/${selectedBooking.id}`}
                  className="px-4 py-2 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  View Public Voucher
                </Link>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 border border-[#D8D2C3] text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
