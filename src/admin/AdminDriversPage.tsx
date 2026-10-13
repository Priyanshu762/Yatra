import React, { useState } from 'react';
import { IconClose } from '../components/Icons';
import { useApp } from '../context/AppContext';
import type { Driver } from '../types';


export const AdminDriversPage: React.FC = () => {
  const { drivers, addDriver, updateDriver, deleteDriver } = useApp();
  const [isCreating, setIsCreating] = useState(false);

  const [newName, setNewName] = useState('');
  const [newExp, setNewExp] = useState(10);
  const [newPhone, setNewPhone] = useState('+91 98200 00000');
  const [newLicense, setNewLicense] = useState('');
  const [newRegions, setNewRegions] = useState('Varanasi, Ayodhya');
  const [newLanguages, setNewLanguages] = useState('Hindi, English');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newD: Driver = {
      id: `D-0${drivers.length + 1}`,
      name: newName,
      experienceYears: newExp,
      languages: newLanguages.split(',').map((s) => s.trim()),
      rating: 4.96,
      phone: newPhone,
      licenseNumber: newLicense || `UP65-2015-${Math.floor(1000000 + Math.random() * 9000000)}`,
      specialtyRegions: newRegions.split(',').map((s) => s.trim()),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      status: 'Active',
      completedTrips: 45
    };

    addDriver(newD);
    setIsCreating(false);
    setNewName('');
    setNewLicense('');
  };

  const handleToggleStatus = (driver: Driver) => {
    const nextStatus = driver.status === 'Active' ? 'On Leave' : 'Active';
    updateDriver({ ...driver, status: nextStatus });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D2C3] pb-4">
        <div>
          <h1 className="font-serif text-3xl text-[#173C32]">
            Verified Drivers Directory
          </h1>
          <p className="text-xs text-[#66756C] mt-1 font-light">
            Salaried, police-verified tour drivers with commercial licenses and local city expertise.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#122F27] border border-[#173C32] rounded-lg cursor-pointer"
        >
          Add New Driver
        </button>
      </div>

      {/* Drivers 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drivers.map((d) => (
          <div key={d.id} className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 bg-[#E8E2D5] border border-[#D8D2C3] rounded-xl overflow-hidden shrink-0">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#173C32]">{d.name}</h3>
                    <span className="text-[10px] text-[#78857E] block mt-0.5">
                      DL No: {d.licenseNumber}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-md ${
                    d.status === 'Active'
                      ? 'bg-[#E3EFE9] text-[#173C32] border-[#BFD9CD]'
                      : 'bg-[#F2EFE8] text-[#8C3E2D] border-[#E9C8BF]'
                  }`}>
                    {d.status}
                  </span>
                </div>

                <div className="text-xs text-[#526058] mt-2 space-y-0.5">
                  <div>Experience: {d.experienceYears} Years | Rating: {d.rating} / 5 ({d.completedTrips} Trips Completed)</div>
                  <div>Phone: {d.phone}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#D8D2C3] space-y-1 text-xs text-[#526058]">
              <div><strong>Familiar Routes:</strong> {d.specialtyRegions.join(', ')}</div>
              <div><strong>Languages Spoken:</strong> {d.languages.join(', ')}</div>
            </div>

            <div className="pt-3 border-t border-[#D8D2C3] flex items-center justify-between">
              <button
                onClick={() => handleToggleStatus(d)}
                className="text-xs font-semibold uppercase text-[#173C32] hover:underline cursor-pointer"
              >
                Set to {d.status === 'Active' ? 'On Leave' : 'Active'}
              </button>
              <button
                onClick={() => deleteDriver(d.id)}
                className="text-xs font-semibold uppercase text-[#8C3E2D] hover:underline cursor-pointer"
              >
                Remove Driver
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Onboard Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#FAF8F3] max-w-md w-full border-2 border-[#D8D2C3] rounded-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center border-b border-[#D8D2C3] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">Add New Tour Driver</h3>
              <button type="button" onClick={() => setIsCreating(false)} className="cursor-pointer">
                <IconClose className="w-5 h-5 text-[#173C32]" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Driver Full Name *</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Surendra Mohan Sharma"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Driving Experience (Years)</label>
                <input
                  type="number"
                  min={1}
                  value={newExp}
                  onChange={(e) => setNewExp(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Driving License Number</label>
              <input
                type="text"
                value={newLicense}
                onChange={(e) => setNewLicense(e.target.value)}
                placeholder="e.g. DL01-2016-00912"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Preferred Routes / Cities</label>
              <input
                type="text"
                value={newRegions}
                onChange={(e) => setNewRegions(e.target.value)}
                placeholder="Varanasi, Lucknow, Ayodhya"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Languages (comma-separated)</label>
              <input
                type="text"
                value={newLanguages}
                onChange={(e) => setNewLanguages(e.target.value)}
                placeholder="Hindi, English, Bhojpuri"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#D8D2C3]">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-[#D8D2C3] rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
              >
                Save Driver
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
