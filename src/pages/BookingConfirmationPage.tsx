import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { IconPrinter, IconArrowRight } from '../components/Icons';

import { useApp } from '../context/AppContext';

export const BookingConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { bookings, vehicles, drivers } = useApp();

  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F7F5EF]">
        <h2 className="font-serif text-3xl font-bold text-[#173C32] mb-4">Booking Voucher Not Found</h2>
        <Link to="/my-bookings" className="px-6 py-2.5 bg-[#173C32] text-white text-xs uppercase tracking-wider font-semibold rounded-lg">
          View My Bookings
        </Link>
      </div>
    );
  }

  const assignedDriver = booking.assignedDriverId
    ? drivers.find((d) => d.id === booking.assignedDriverId)
    : undefined;

  const assignedVehicle = vehicles.find((v) => v.id === booking.vehicleId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C47A54] block">
            Tour Booking Confirmed & Payment Received
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173C32] font-bold">
            Official Travel Voucher & Bill
          </h1>
          <p className="text-xs text-[#5C6A63]">
            Booking ID: <strong className="text-[#173C32] font-mono">{booking.id}</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-[#FAF8F3] border border-[#D8D2C3] text-[#173C32] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#EAE5D9] flex items-center gap-2"
          >
            <IconPrinter className="w-4 h-4 text-[#C47A54]" />
            <span>Print / Save Voucher</span>
          </button>
          <Link
            to="/my-bookings"
            className="px-5 py-2.5 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#122F27] border border-[#173C32] flex items-center gap-2"
          >
            <span>View All My Bookings</span>
            <IconArrowRight className="w-3.5 h-3.5 text-[#C47A54]" />
          </Link>
          <Link
            to="/admin/allocations"
            className="px-4 py-2.5 bg-[#EAE4D5] text-[#173C32] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#DDD5C3] border border-[#D8D2C3]"
          >
            <span>Admin Cab & Driver View</span>
          </Link>
        </div>

        {/* Printable Voucher Card */}
        <div className="bg-[#FAF8F3] border-2 border-[#D8D2C3] rounded-2xl overflow-hidden print:border-none">
          {/* Header */}
          <div className="bg-[#173C32] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EAE5D9] text-[#173C32] flex items-center justify-center font-serif text-lg font-bold border border-[#C47A54] rounded-lg">
                YA
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  Yatra Atelier
                </h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8C5AF] block mt-1">
                  Confirmed Tour Voucher
                </span>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#CDC7B9] block">
                Booking Reference
              </span>
              <span className="font-mono text-xl font-bold text-[#E8C5AF]">
                {booking.id}
              </span>
              <span className="text-[10px] text-[#A6BAAE] block mt-0.5">
                Status: {booking.bookingStatus} • Paid via {booking.paymentMethod}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#F2EFE8] border border-[#D8D2C3] rounded-xl text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Lead Passenger</span>
                <span className="font-semibold text-sm text-[#173C32] block mt-0.5">{booking.customerName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Travel Dates</span>
                <span className="font-medium text-[#173C32] block mt-0.5">{booking.travelDate} to {booking.endDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Total Passengers</span>
                <span className="font-medium text-[#173C32] block mt-0.5">{booking.guestsCount} Persons</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Total Amount Paid</span>
                <span className="font-bold text-sm text-[#173C32] block mt-0.5">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C47A54] block">
                Booked Tour Package
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#173C32] mt-0.5">
                {booking.packageTitle}
              </h3>
              <p className="text-xs text-[#5D6B62] mt-1">
                Destination: <strong>{booking.destinationName}</strong> • Private AC Cab with Verified Local Driver
              </p>
            </div>

            {/* Vehicle & Chauffeur */}
            <div className="p-5 border border-[#D8D2C3] bg-[#F2EFE8] rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-[#D8D2C3] pb-2">
                <h4 className="font-serif text-base font-bold text-[#173C32]">
                  Assigned Private Cab & Driver Details
                </h4>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#EAE4D5] text-[#173C32] rounded-md">
                  {assignedDriver ? 'Driver Confirmed' : 'Driver Assignment in Progress'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4E5C54]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Private Cab</span>
                  <span className="font-semibold text-sm text-[#173C32]">{booking.vehicleName}</span>
                  {assignedVehicle && (
                    <span className="text-[11px] text-[#69766F] block mt-0.5">
                      Registration: {assignedVehicle.registrationNumber} • Category: {assignedVehicle.category}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#7E8B83] block">Assigned Driver</span>
                  {assignedDriver ? (
                    <div>
                      <span className="font-semibold text-sm text-[#173C32]">{assignedDriver.name}</span>
                      <span className="text-[11px] text-[#69766F] block mt-0.5">
                        Mobile: {assignedDriver.phone} • {assignedDriver.experienceYears} Years Safe Driving Experience
                      </span>
                    </div>
                  ) : (
                    <div className="text-[#C47A54] font-medium">
                      Driver name and mobile number will also be sent on WhatsApp 24 hours prior to travel
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-[#D8D2C3] text-xs text-[#526058]">
                <strong>Pickup Location:</strong> {booking.pickupLocation}
              </div>
            </div>

            {/* Ledger */}
            <div className="p-4 bg-[#F2EFE8] border border-[#D8D2C3] rounded-xl space-y-1.5 text-xs text-[#68766F]">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono text-[#173C32]">{booking.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-medium text-[#173C32]">{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Booking Date & Time:</span>
                <span>{new Date(booking.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8D2C3] flex flex-col sm:flex-row justify-between text-xs text-[#68766F] gap-2">
              <div>Customer Support Helpline: +91 11 4982 7700 (24x7)</div>
              <div>Email: help@yatraatelier.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
