import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '../components/Icons';
import { useApp } from '../context/AppContext';

export const AdminOverviewPage: React.FC = () => {
  const { bookings, vehicles, drivers, payments } = useApp();

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'Paid')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const activeTrips = bookings.filter(
    (b) => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'In Progress'
  );

  const completedTrips = bookings.filter((b) => b.bookingStatus === 'Completed');
  const unassignedTrips = activeTrips.filter((b) => !b.assignedDriverId);

  const activeVehicleIds = new Set(activeTrips.map((b) => b.vehicleId));
  const fleetUtilizationRate = Math.round((activeVehicleIds.size / vehicles.length) * 100);

  const assignedDriverIds = new Set(activeTrips.map((b) => b.assignedDriverId).filter(Boolean));
  const driverDeploymentRate = Math.round((assignedDriverIds.size / drivers.length) * 100);

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D2C3] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#173C32]">
            Operations & Bookings Overview
          </h1>
          <p className="text-xs text-[#66756C] mt-1 font-normal">
            Live overview of tour package bookings, driver and cab assignments, and revenue collections.
          </p>
        </div>

        {unassignedTrips.length > 0 && (
          <Link
            to="/admin/allocations"
            className="px-4 py-2.5 bg-[#C47A54] hover:bg-[#B36A45] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shrink-0"
          >
            {unassignedTrips.length} Bookings Need Driver Assignment
          </Link>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#68766E] tracking-wider block">Total Bookings Revenue</span>
          <div className="font-serif text-3xl font-bold text-[#173C32]">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-[#637269]">
            Across {payments.filter((p) => p.status === 'Paid').length} verified transactions
          </div>
        </div>

        <div className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#68766E] tracking-wider block">Total Bookings</span>
          <div className="font-serif text-3xl font-bold text-[#173C32]">
            {bookings.length}
          </div>
          <div className="text-[11px] text-[#637269]">
            {activeTrips.length} active tours | {completedTrips.length} completed
          </div>
        </div>

        <div className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#68766E] tracking-wider block">Cab Fleet Utilization</span>
          <div className="font-serif text-3xl font-bold text-[#173C32]">
            {fleetUtilizationRate}%
          </div>
          <div className="text-[11px] text-[#637269]">
            {activeVehicleIds.size} of {vehicles.length} owned AC cabs on trip
          </div>
        </div>

        <div className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#68766E] tracking-wider block">Driver Deployment</span>
          <div className="font-serif text-3xl font-bold text-[#173C32]">
            {driverDeploymentRate}%
          </div>
          <div className="text-[11px] text-[#637269]">
            {assignedDriverIds.size} of {drivers.length} drivers currently assigned
          </div>
        </div>
      </div>

      {/* 2-Column Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#D8D2C3] pb-3">
            <h3 className="font-serif text-lg font-bold text-[#173C32]">
              Revenue Share by Tour Category
            </h3>
            <span className="text-xs text-[#7B8881]">Calculated from Active Demo Ledger</span>
          </div>

          <div className="space-y-4 pt-1">
            {[
              { theme: 'Multi-City Grand Tours', color: 'bg-[#173C32]', percent: 45 },
              { theme: 'Forts & Palace Tours', color: 'bg-[#C47A54]', percent: 28 },
              { theme: 'Temple Darshan Tours', color: 'bg-[#2A5C4F]', percent: 18 },
              { theme: 'City Sightseeing & Food Walks', color: 'bg-[#B08968]', percent: 9 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#324239]">
                  <span>{item.theme}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="h-2 w-full bg-[#EAE5D9] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#D8D2C3] grid grid-cols-3 gap-4 text-center text-xs text-[#637269]">
            <div>
              <span className="block font-bold text-sm text-[#173C32]">₹84,000</span>
              <span className="text-[10px] uppercase">Top Package Fare</span>
            </div>
            <div>
              <span className="block font-bold text-sm text-[#173C32]">4.8 Days</span>
              <span className="text-[10px] uppercase">Avg Tour Length</span>
            </div>
            <div>
              <span className="block font-bold text-sm text-[#173C32]">4.97 / 5</span>
              <span className="text-[10px] uppercase">Cab Cleanliness Rating</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#D8D2C3] pb-3">
            <h3 className="font-serif text-lg font-bold text-[#173C32]">
              Cab Fleet Status
            </h3>
            <Link to="/admin/vehicles" className="text-xs text-[#C47A54] hover:underline font-semibold uppercase tracking-wider">
              Manage Fleet
            </Link>
          </div>

          <div className="space-y-2">
            {vehicles.map((v) => {
              const isAssigned = activeVehicleIds.has(v.id);
              return (
                <div
                  key={v.id}
                  className="p-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-[#173C32] block">{v.name}</span>
                    <span className="text-[10px] text-[#717E77]">{v.registrationNumber} • {v.category}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      isAssigned
                        ? 'bg-[#E3EFE9] text-[#173C32] border-[#BFD9CD]'
                        : 'bg-[#FAF0E6] text-[#C47A54] border-[#E9C8BF]'
                    }`}
                  >
                    {isAssigned ? 'On Trip' : 'Available'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8D2C3] pb-3">
          <h3 className="font-serif text-lg font-bold text-[#173C32]">
            Recent Tour Bookings
          </h3>
          <Link
            to="/admin/bookings"
            className="text-xs font-semibold uppercase tracking-wider text-[#173C32] hover:text-[#C47A54] flex items-center gap-1"
          >
            <span>View All {bookings.length} Bookings</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left text-xs text-[#3E4F45]">
            <thead className="bg-[#F2EFE8] text-[10px] uppercase font-bold text-[#7A8780] tracking-wider border-b border-[#D8D2C3]">
              <tr>
                <th className="py-2.5 px-3">Booking ID</th>
                <th className="py-2.5 px-3">Lead Passenger</th>
                <th className="py-2.5 px-3">Package</th>
                <th className="py-2.5 px-3">Dates</th>
                <th className="py-2.5 px-3">Driver</th>
                <th className="py-2.5 px-3">Total Fare</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8D2C3]">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-[#F2EFE8]">
                  <td className="py-3 px-3 font-mono font-bold text-[#173C32]">{b.id}</td>
                  <td className="py-3 px-3 font-medium text-[#173C32]">{b.customerName}</td>
                  <td className="py-3 px-3 max-w-xs truncate">{b.packageTitle}</td>
                  <td className="py-3 px-3 whitespace-nowrap">{b.travelDate}</td>
                  <td className="py-3 px-3">
                    {b.assignedDriverName ? (
                      <span className="text-[#173C32] font-medium">{b.assignedDriverName}</span>
                    ) : (
                      <span className="text-[#C47A54] font-semibold">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#173C32]">
                    ₹{b.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md border border-[#D8D2C3] bg-[#EAE4D5] text-[#173C32]">
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to={`/admin/allocations`}
                      className="text-xs text-[#C47A54] hover:underline font-semibold uppercase tracking-wider"
                    >
                      Assign Driver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
