import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';


export const PaymentSimulationPage: React.FC = () => {
  const navigate = useNavigate();
  const { createBooking } = useApp();

  const [pendingBooking, setPendingBooking] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<'Card' | 'UPI' | 'NetBanking'>('Card');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('ya_pending_booking');
    if (saved) {
      setPendingBooking(JSON.parse(saved));
    } else {
      setPendingBooking({
        packageId: 'PKG-01',
        packageTitle: 'Varanasi Dawn to Twilight: Spiritual Odyssey',
        destinationName: 'Varanasi',
        customerName: 'Sovereign Patron',
        customerEmail: 'patron@yatraatelier.com',
        customerPhone: '+91 98200 12345',
        pickupLocation: 'Varanasi Airport (VNS)',
        travelDate: '2026-11-05',
        endDate: '2026-11-07',
        guestsCount: 2,
        vehicleId: 'V-02',
        vehicleName: 'Mercedes-Benz E-Class Exclusive',
        baseAmount: 49000,
        vehicleSurchargeTotal: 17000,
        taxesAmount: 3300,
        totalAmount: 69300,
      });
    }
  }, []);

  const fillTestCard = () => {
    setCardNumber('4532 9918 2004 8892');
    setCardExpiry('12/28');
    setCardCvv('982');
    setCardName(pendingBooking?.customerName || 'Maharaja Yashwant');
  };

  const handleSimulateSuccess = () => {
    setSimulationError(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (!pendingBooking) return;

      const randomTxn = `TXN-${Math.floor(100000 + Math.random() * 900000)}-YA`;

      const newBooking = createBooking({
        packageId: pendingBooking.packageId,
        packageTitle: pendingBooking.packageTitle,
        destinationName: pendingBooking.destinationName,
        customerName: pendingBooking.customerName,
        customerEmail: pendingBooking.customerEmail,
        customerPhone: pendingBooking.customerPhone,
        pickupLocation: pendingBooking.pickupLocation,
        travelDate: pendingBooking.travelDate,
        endDate: pendingBooking.endDate,
        guestsCount: pendingBooking.guestsCount,
        vehicleId: pendingBooking.vehicleId,
        vehicleName: pendingBooking.vehicleName,
        baseAmount: pendingBooking.baseAmount,
        vehicleSurchargeTotal: pendingBooking.vehicleSurchargeTotal,
        taxesAmount: pendingBooking.taxesAmount,
        totalAmount: pendingBooking.totalAmount,
        bookingStatus: 'Confirmed',
        paymentStatus: 'Paid',
        paymentMethod: selectedMethod,
        transactionId: randomTxn,
        specialRequests: pendingBooking.specialRequests,
      });

      sessionStorage.removeItem('ya_pending_booking');
      navigate(`/booking-confirmation/${newBooking.id}`);
    }, 1400);
  };

  const handleSimulateFailure = () => {
    setSimulationError(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setSimulationError(
        'Simulated Gateway Notice: The bank issuer declined the transaction (Simulated 3D-Secure authorization timeout / Test card limits). No funds were deducted.'
      );
    }, 1200);
  };

  if (!pendingBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5EF] text-xs text-[#173C32]">
        Loading Gateway Simulation...
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Simulation Banner */}
        <div className="bg-[#EAE5D9] border-2 border-[#173C32] rounded-2xl p-5 text-[#173C32] text-xs">
          <div className="font-bold uppercase tracking-wider mb-1">
            [Demo Payment Mode]
          </div>
          <div>
            This is a demo booking test. No real money or bank account will ever be deducted. You can test a successful confirmation or test a declined payment state below.
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-[#D8D2C3] pb-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C47A54] block mb-1">
            Step 2: Payment Demo
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#173C32] font-bold">
            Confirm & Complete Tour Booking
          </h1>
        </div>

        {simulationError && (
          <div className="p-4 bg-[#F2EFE8] border-2 border-[#8C3E2D] rounded-xl text-[#8C3E2D] text-xs">
            <strong className="block font-bold">[Payment Declined]</strong>
            <span>{simulationError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Methods */}
          <div className="md:col-span-7 bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('Card')}
                className={`py-2.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  selectedMethod === 'Card'
                    ? 'border-[#173C32] bg-[#EAE5D9] text-[#173C32]'
                    : 'border-[#D8D2C3] bg-[#F2EFE8] text-[#55635B] hover:bg-[#EAE5D9]'
                }`}
              >
                Debit / Credit Card
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('UPI')}
                className={`py-2.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  selectedMethod === 'UPI'
                    ? 'border-[#173C32] bg-[#EAE5D9] text-[#173C32]'
                    : 'border-[#D8D2C3] bg-[#F2EFE8] text-[#55635B] hover:bg-[#EAE5D9]'
                }`}
              >
                UPI (GPay / PhonePe)
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('NetBanking')}
                className={`py-2.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  selectedMethod === 'NetBanking'
                    ? 'border-[#173C32] bg-[#EAE5D9] text-[#173C32]'
                    : 'border-[#D8D2C3] bg-[#F2EFE8] text-[#55635B] hover:bg-[#EAE5D9]'
                }`}
              >
                Net Banking
              </button>
            </div>

            {selectedMethod === 'Card' && (
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#3B4840]">
                    Card Information
                  </label>
                  <button
                    type="button"
                    onClick={fillTestCard}
                    className="text-[11px] text-[#C47A54] hover:underline font-semibold"
                  >
                    Auto-Fill Test Card Details
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="4532 8900 1234 5678"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                  />
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Name on Card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                />
              </div>
            )}

            {selectedMethod === 'UPI' && (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-[#F2EFE8] border border-[#D8D2C3] rounded-xl text-center text-xs">
                  <span className="font-bold block text-[#173C32]">Instant UPI Payment</span>
                  <span className="text-[#6D7B73] block mt-1">Accepts Google Pay, PhonePe, Paytm & BHIM UPI</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B4840] mb-1">
                    Enter UPI ID (e.g. mobile@upi)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="mobile@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setUpiId('customer@upi')}
                      className="px-4 py-2 bg-[#EAE5D9] text-[#173C32] text-xs font-semibold rounded-lg hover:bg-[#DDD5C3] border border-[#D8D2C3]"
                    >
                      Fill Demo UPI
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'NetBanking' && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-[#3B4840] block">
                  Select Your Bank
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBank(b)}
                      className={`p-3 border rounded-xl text-xs font-semibold text-left transition-all ${
                        selectedBank === b
                          ? 'border-[#173C32] bg-[#EAE5D9] text-[#173C32]'
                          : 'border-[#D8D2C3] bg-[#F2EFE8] text-[#526058] hover:bg-[#EAE5D9]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Simulation controls */}
            <div className="pt-4 border-t border-[#D8D2C3] space-y-2">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSimulateSuccess}
                className="w-full py-3.5 bg-[#173C32] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32] disabled:opacity-60"
              >
                {isProcessing
                  ? 'Processing Test Payment...'
                  : `Pay Now & Confirm Booking (₹${pendingBooking.totalAmount.toLocaleString('en-IN')})`}
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSimulateFailure}
                className="w-full py-2 bg-transparent text-[#8C3E2D] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#F2EFE8] border border-[#D8D2C3] disabled:opacity-50"
              >
                Simulate Payment Failure / Bank Error State
              </button>
            </div>
          </div>

          {/* Right Summary */}
          <div className="md:col-span-5 bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
            <h3 className="font-serif text-base font-bold text-[#173C32] border-b border-[#D8D2C3] pb-2">
              Tour Package Details
            </h3>

            <div className="space-y-2 text-xs text-[#4E5C54]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7D8A82] block">Package</span>
                <span className="font-semibold text-sm text-[#173C32]">{pendingBooking.packageTitle}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7D8A82] block">Dates</span>
                <span>{pendingBooking.travelDate} to {pendingBooking.endDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7D8A82] block">Private Cab</span>
                <span className="font-semibold text-[#173C32]">{pendingBooking.vehicleName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#7D8A82] block">Passenger Details</span>
                <span>{pendingBooking.customerName} ({pendingBooking.customerPhone})</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D8D2C3] space-y-1 text-xs">
              <div className="flex justify-between text-[#68766F]">
                <span>Base Tour:</span>
                <span>₹{pendingBooking.baseAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#68766F]">
                <span>Private Cab:</span>
                <span>₹{pendingBooking.vehicleSurchargeTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#68766F]">
                <span>GST (5%):</span>
                <span>₹{pendingBooking.taxesAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-2 border-t border-[#D8D2C3] flex justify-between items-baseline font-bold text-[#173C32]">
                <span className="text-xs uppercase">Total Payable:</span>
                <span className="font-serif text-2xl">₹{pendingBooking.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
