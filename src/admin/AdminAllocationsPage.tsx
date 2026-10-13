import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AdminAllocationsPage: React.FC = () => {
  const {
    bookings,
    vehicles,
    drivers,
    assignVehicleAndDriver,
    checkAllocationConflict
  } = useApp();

  const activeBookings = bookings.filter(
    (b) => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'In Progress'
  );

  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    activeBookings[0]?.id || ''
  );

  const currentBooking = bookings.find((b) => b.id === selectedBookingId);

  const [chosenVehicleId, setChosenVehicleId] = useState<string>(
    currentBooking?.vehicleId || vehicles[0]?.id || ''
  );

  const [chosenDriverId, setChosenDriverId] = useState<string>(
    currentBooking?.assignedDriverId || ''
  );

  const [assignmentNotice, setAssignmentNotice] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleBookingChange = (id: string) => {
    setSelectedBookingId(id);
    const bk = bookings.find((b) => b.id === id);
    if (bk) {
      setChosenVehicleId(bk.vehicleId);
      setChosenDriverId(bk.assignedDriverId || '');
    }
    setAssignmentNotice(null);
  };

  // Run live conflict detection
  const conflicts = currentBooking
    ? checkAllocationConflict(
        currentBooking.id,
        chosenVehicleId,
        chosenDriverId || undefined,
        currentBooking.travelDate,
        currentBooking.endDate
      )
    : { vehicleConflict: undefined, driverConflict: undefined };

  const handleApplyAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBooking) return;

    const res = assignVehicleAndDriver(
      currentBooking.id,
      chosenVehicleId,
      chosenDriverId || undefined
    );

    if (res.success) {
      setAssignmentNotice({
        type: 'success',
        message: `Successfully allocated to Booking ${currentBooking.id}. Customer voucher and dispatcher manifests updated.`,
      });
    } else {
      setAssignmentNotice({
        type: 'error',
        message: res.error || 'Scheduling conflict detected. Cannot assign resources.',
      });
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="border-b border-[#D8D2C3] pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#173C32]">
          Cab & Driver Allocation
        </h1>
        <p className="text-xs text-[#66756C] mt-1 font-normal">
          Assign verified drivers and private AC cabs to confirmed passenger bookings with automatic date-overlap conflict alerts.
        </p>
      </div>

      {assignmentNotice && (
        <div
          className={`p-4 text-xs border-2 rounded-xl ${
            assignmentNotice.type === 'success'
              ? 'bg-[#E3EFE9] text-[#173C32] border-[#BFD9CD]'
              : 'bg-[#F2EFE8] text-[#8C3E2D] border-[#8C3E2D]'
          }`}
        >
          <strong>[{assignmentNotice.type === 'success' ? 'Confirmed' : 'Date Conflict'}]</strong>{' '}
          {assignmentNotice.message}
        </div>
      )}

      {/* Main Allocation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Panel */}
        <form
          onSubmit={handleApplyAllocation}
          className="lg:col-span-7 bg-[#FAF8F3] p-6 sm:p-8 border border-[#D8D2C3] rounded-2xl space-y-6"
        >
          <h2 className="font-serif text-xl font-bold text-[#173C32] border-b border-[#D8D2C3] pb-3">
            Driver & Cab Assignment
          </h2>

          {/* Select Booking */}
          <div>
            <label className="block text-xs font-bold text-[#3B4840] mb-1">
              Select Tour Booking
            </label>
            <select
              value={selectedBookingId}
              onChange={(e) => handleBookingChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
            >
              {activeBookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} : {b.customerName} ({b.packageTitle}) | {b.travelDate} to {b.endDate}
                </option>
              ))}
            </select>
          </div>

          {currentBooking && (
            <div className="p-3.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-xl text-xs text-[#4E5C54] space-y-1">
              <div><strong>Passenger:</strong> {currentBooking.customerName} ({currentBooking.customerPhone})</div>
              <div><strong>Dates:</strong> {currentBooking.travelDate} to {currentBooking.endDate} ({currentBooking.guestsCount} Persons)</div>
              <div><strong>Pickup:</strong> {currentBooking.pickupLocation}</div>
              <div><strong>Selected Cab:</strong> {currentBooking.vehicleName}</div>
              <div><strong>Assigned Driver:</strong> {currentBooking.assignedDriverName || 'Not Assigned'}</div>
            </div>
          )}

          {/* Select Vehicle */}
          <div>
            <label className="block text-xs font-bold text-[#3B4840] mb-1">
              Assign Cab / Vehicle
            </label>
            <select
              value={chosenVehicleId}
              onChange={(e) => setChosenVehicleId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.registrationNumber}) • {v.category} • {v.capacitySeats} Seats
                </option>
              ))}
            </select>
          </div>

          {/* Select Chauffeur */}
          <div>
            <label className="block text-xs font-bold text-[#3B4840] mb-1">
              Assign Verified Driver
            </label>
            <select
              value={chosenDriverId}
              onChange={(e) => setChosenDriverId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
            >
              <option value="">None (Driver Assignment Pending)</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.phone}) • {d.experienceYears} Years Exp • {d.specialtyRegions.join(', ')}
                </option>
              ))}
            </select>
          </div>

          {/* Conflict Warnings */}
          <div className="space-y-2">
            {conflicts.vehicleConflict && (
              <div className="p-3 bg-[#F2EFE8] border-2 border-[#8C3E2D] rounded-xl text-[#8C3E2D] text-xs">
                <strong>[Vehicle Conflict]</strong> {conflicts.vehicleConflict}
              </div>
            )}

            {conflicts.driverConflict && (
              <div className="p-3 bg-[#F2EFE8] border-2 border-[#8C3E2D] rounded-xl text-[#8C3E2D] text-xs">
                <strong>[Driver Conflict]</strong> {conflicts.driverConflict}
              </div>
            )}

            {!conflicts.vehicleConflict && !conflicts.driverConflict && (
              <div className="p-3 bg-[#E3EFE9] border border-[#BFD9CD] rounded-xl text-[#173C32] text-xs">
                [Clear To Assign] No date conflicts detected. Both cab and driver are available for these tour dates.
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={Boolean(conflicts.vehicleConflict || conflicts.driverConflict)}
            className="w-full py-3.5 bg-[#173C32] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Save & Confirm Assignment
          </button>
        </form>

        {/* Master Rostering Schedule Table */}
        <div className="lg:col-span-5 bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#173C32] border-b border-[#D8D2C3] pb-3">
            Active Tour Dates
          </h2>
          <p className="text-xs text-[#637269]">
            Current bookings and driver assignments for date-check reference:
          </p>

          <div className="space-y-3">
            {activeBookings.map((b) => (
              <div
                key={b.id}
                className={`p-3 border rounded-xl text-xs space-y-1 ${
                  b.id === selectedBookingId
                    ? 'border-[#173C32] bg-[#EAE5D9]'
                    : 'border-[#D8D2C3] bg-[#F2EFE8]'
                }`}
              >
                <div className="flex justify-between font-bold text-[#173C32]">
                  <span>{b.id} : {b.customerName}</span>
                  <span>{b.travelDate} to {b.endDate}</span>
                </div>
                <div className="text-[#55625A]">
                  Cab: <strong>{b.vehicleName}</strong>
                </div>
                <div className="text-[#55625A]">
                  Driver:{' '}
                  {b.assignedDriverName ? (
                    <strong className="text-[#173C32]">{b.assignedDriverName}</strong>
                  ) : (
                    <span className="text-[#C47A54] font-semibold">Unassigned</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
