import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast, destinations } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationChoice, setDestinationChoice] = useState('Varanasi');
  const [travelPeriod, setTravelPeriod] = useState('Autumn 2026');
  const [travellers, setTravellers] = useState('2');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`Inquiry received from ${name}. Our travel team will contact you shortly.`);
  };

  return (
    <div className="bg-[#F7F5EF] text-[#1E2922] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2 pb-4 border-b border-[#D8D2C3]">
          <div className="text-xs font-bold tracking-widest uppercase text-[#C47A54]">
            Customer Support & Travel Helpdesk
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#173C32] font-bold">
            Contact Us for Custom Tour Packages
          </h1>
          <p className="text-sm text-[#4E5C54] font-normal leading-relaxed">
            Need a custom route, senior citizen darshan assistance, or a group Tempo Traveller package? Fill in your travel details below or reach out to our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF8F3] p-6 sm:p-8 border border-[#D8D2C3] rounded-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="text-xs uppercase font-bold text-[#173C32] block">
                  [Inquiry Received]
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#173C32]">
                  Thank You, {name}
                </h3>
                <p className="text-xs text-[#526058] max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong>{destinationChoice}</strong> has been received. Our tour planner will call you or reply on WhatsApp at <strong>{phone}</strong> within a few hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 border border-[#D8D2C3] text-xs font-semibold uppercase tracking-wider rounded-lg text-[#173C32] hover:bg-[#F2EFE8] mt-3"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#173C32] border-b border-[#D8D2C3] pb-3">
                  Request a Free Tour Quote
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3B4840] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B4840] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B4840] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B4840] mb-1">
                      Destination
                    </label>
                    <select
                      value={destinationChoice}
                      onChange={(e) => setDestinationChoice(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
                    >
                      {destinations.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.state})
                        </option>
                      ))}
                      <option value="Multi-City Custom Circuit">Multi-City Complete Tour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B4840] mb-1">
                      Travel Month
                    </label>
                    <select
                      value={travelPeriod}
                      onChange={(e) => setTravelPeriod(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
                    >
                      <option value="This Month">Upcoming 30 Days</option>
                      <option value="Next 2-3 Months">Next 2 to 3 Months</option>
                      <option value="Holiday Season">Upcoming Holiday Season</option>
                      <option value="Flexible">Dates are Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3B4840] mb-1">
                      Number of Passengers
                    </label>
                    <select
                      value={travellers}
                      onChange={(e) => setTravellers(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none cursor-pointer"
                    >
                      <option value="1">1 Solo Passenger</option>
                      <option value="2">2 Persons (Couple)</option>
                      <option value="4">3 to 4 Family Members</option>
                      <option value="6">5 to 8 Group / Family</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3B4840] mb-1">
                    Trip Requirements or Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements (e.g. VIP darshan assistance, senior citizen support, choice of cab)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#173C32] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#122F27] border border-[#173C32]"
                >
                  Send Inquiry to Travel Team
                </button>
              </form>
            )}
          </div>

          {/* Regional Concierge Offices */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">
                Our Offices & Contact Details
              </h3>

              <div className="space-y-3 text-xs text-[#4B5951]">
                <div>
                  <strong className="text-sm text-[#173C32] block font-bold">New Delhi Main Office</strong>
                  <span>14 Barakhamba Road, Connaught Place, New Delhi 110001</span>
                </div>

                <div className="pt-2 border-t border-[#D8D2C3]">
                  <strong className="text-sm text-[#173C32] block font-bold">Varanasi Tour Hub</strong>
                  <span>Assi Ghat Road, Varanasi, Uttar Pradesh 221005</span>
                </div>

                <div className="pt-2 border-t border-[#D8D2C3]">
                  <strong className="text-sm text-[#173C32] block font-bold">Jaipur Tour Hub</strong>
                  <span>Civil Lines, Near Railway Station, Jaipur, Rajasthan 302006</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D8D2C3] space-y-1.5 text-xs text-[#4B5951]">
                <div><strong>Helpline:</strong> +91 11 4982 7700</div>
                <div><strong>Direct Email:</strong> support@yatraluxe.com</div>
                <div><strong>Office Hours:</strong> 09:00 AM to 08:00 PM (Monday to Sunday)</div>
              </div>
            </div>

            <div className="bg-[#173C32] text-white p-6 rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8C5AF]">
                24x7 Driver & Trip Support
              </span>
              <h4 className="font-serif text-lg font-bold">
                Emergency On-Trip Assistance
              </h4>
              <p className="text-xs text-[#D8D2C5] leading-relaxed">
                If you are currently traveling with us on an active tour, your driver coordinates directly with our 24/7 central operations desk for any highway or flight delay assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
