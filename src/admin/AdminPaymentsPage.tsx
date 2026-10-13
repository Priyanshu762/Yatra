import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AdminPaymentsPage: React.FC = () => {
  const { payments, processSimulatedRefund } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filtered = payments.filter((p) => {
    if (filterStatus !== 'All' && p.status !== filterStatus) return false;
    return true;
  });

  const totalCollected = payments
    .filter((p) => p.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalRefunded = payments
    .filter((p) => p.status === 'Refunded')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="border-b border-[#D8D2C3] pb-4">
        <h1 className="font-serif text-3xl text-[#173C32]">
          Payments & Refund History
        </h1>
        <p className="text-xs text-[#66756C] mt-1 font-light">
          Audit customer payment receipts, payment modes (UPI / Cards / Net Banking), and process instant demo refunds.
        </p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#68766E] tracking-wider block">Total Payments Received</span>
          <div className="font-serif text-2xl font-bold text-[#173C32]">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-[#637269]">
            {payments.filter((p) => p.status === 'Paid').length} Successful Transactions
          </div>
        </div>

        <div className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#68766E] tracking-wider block">Total Refunds Processed</span>
          <div className="font-serif text-2xl font-bold text-[#8C3E2D]">
            ₹{totalRefunded.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-[#637269]">
            {payments.filter((p) => p.status === 'Refunded').length} Refund Credits Issued
          </div>
        </div>

        <div className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#68766E] tracking-wider block">Payment Modes Supported</span>
          <div className="font-serif text-2xl font-bold text-[#173C32]">
            UPI / Cards / Net Banking
          </div>
          <div className="text-[10px] text-[#637269]">
            Instant Bank Simulation
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#FAF8F3] p-4 border border-[#D8D2C3] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-semibold text-[#173C32]">
          Filter Transactions by Status:
        </span>
        <div className="flex flex-wrap gap-2">
          {['All', 'Paid', 'Refunded', 'Failed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border rounded-lg cursor-pointer ${
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

      {/* Ledger Table */}
      <div className="bg-[#FAF8F3] border border-[#D8D2C3] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3E4F45]">
            <thead className="bg-[#F2EFE8] text-[10px] uppercase font-bold text-[#7A8780] tracking-wider border-b border-[#D8D2C3]">
              <tr>
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Payment Mode</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Bank Ref No</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8D2C3]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#F2EFE8]">
                  <td className="py-3 px-4 font-mono font-bold text-[#173C32]">{p.transactionId}</td>
                  <td className="py-3 px-4 font-mono font-medium text-[#173C32]">{p.bookingId}</td>
                  <td className="py-3 px-4 font-medium text-[#173C32]">{p.customerName}</td>
                  <td className="py-3 px-4">{p.method}</td>
                  <td className="py-3 px-4 font-bold text-[#173C32]">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold border rounded-md ${
                        p.status === 'Paid'
                          ? 'bg-[#E3EFE9] text-[#173C32] border-[#BFD9CD]'
                          : p.status === 'Refunded'
                          ? 'bg-[#F2EFE8] text-[#8C3E2D] border-[#E9C8BF]'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-[#717E77]">{p.gatewayRef}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-[#717E77]">
                    {new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                    {new Date(p.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {p.status === 'Paid' ? (
                      <button
                        onClick={() => processSimulatedRefund(p.bookingId)}
                        className="px-2.5 py-1 bg-transparent border border-[#8C3E2D] text-[#8C3E2D] text-[10px] font-semibold uppercase tracking-wider hover:bg-[#F2EFE8] rounded-md cursor-pointer"
                      >
                        Process Refund
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#8A958E] italic">Settled</span>
                    )}
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
