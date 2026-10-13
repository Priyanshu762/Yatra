import React, { useState } from 'react';
import { IconClose } from '../components/Icons';
import { useApp } from '../context/AppContext';
import type { Vehicle } from '../types';


export const AdminVehiclesPage: React.FC = () => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useApp();
  const [isCreating, setIsCreating] = useState(false);

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Vehicle['category']>('Luxury Chauffeur Sedan');
  const [newSeats, setNewSeats] = useState(4);
  const [newLuggage, setNewLuggage] = useState(3);
  const [newSurcharge, setNewSurcharge] = useState(5000);
  const [newReg, setNewReg] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newV: Vehicle = {
      id: `V-0${vehicles.length + 1}`,
      name: newName,
      category: newCategory,
      capacitySeats: newSeats,
      luggageCapacity: newLuggage,
      dailySurcharge: newSurcharge,
      ratePerKm: 18,
      baseFare: 500,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      amenities: ['Executive Leather Seats', 'Dual Climate AC', 'Chilled Spring Water & Mints'],
      registrationNumber: newReg || `DL 01 YA ${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Available',
      fuelType: 'Diesel',
      year: 2024
    };

    addVehicle(newV);
    setIsCreating(false);
    setNewName('');
    setNewReg('');
  };

  const handleStatusChange = (veh: Vehicle, status: Vehicle['status']) => {
    updateVehicle({ ...veh, status });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D2C3] pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#173C32]">
            Cabs & Fleet Management
          </h1>
          <p className="text-xs text-[#66756C] mt-1 font-normal">
            Manage owned private cabs, seating capacity, number plates, and daily rental rates.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2.5 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#122F27] border border-[#173C32]"
        >
          Add New Cab / Vehicle
        </button>
      </div>

      {/* Vehicles Grid (2-Column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-[#FAF8F3] p-5 border border-[#D8D2C3] rounded-2xl space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-28 h-20 bg-[#E8E2D5] border border-[#D8D2C3] rounded-xl overflow-hidden shrink-0">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-[#C47A54] block">
                  {v.category} • {v.registrationNumber}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#173C32] mt-0.5">{v.name}</h3>
                <div className="text-xs text-[#5C6A62] mt-1">
                  Seats: {v.capacitySeats} • Luggage: {v.luggageCapacity} Bags • Model: {v.year}
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-[#526058] pt-2 border-t border-[#D8D2C3]">
              <div><strong>Features:</strong> {v.amenities.join(', ')}</div>
              <div><strong>Daily Rate:</strong> +₹{v.dailySurcharge.toLocaleString('en-IN')}/day</div>
            </div>

            <div className="pt-3 border-t border-[#D8D2C3] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6A7870]">Status:</span>
                <select
                  value={v.status}
                  onChange={(e) => handleStatusChange(v, e.target.value as any)}
                  className="bg-[#EAE5D9] border border-[#D8D2C3] rounded-md text-[10px] uppercase font-bold text-[#173C32] px-2 py-1 focus:outline-none cursor-pointer"
                >
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <button
                onClick={() => deleteVehicle(v.id)}
                className="text-xs font-semibold uppercase text-[#8C3E2D] hover:underline"
              >
                Remove Cab
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#FAF8F3] max-w-md w-full border-2 border-[#D8D2C3] rounded-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center border-b border-[#D8D2C3] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">Add New Cab</h3>
              <button type="button" onClick={() => setIsCreating(false)}>
                <IconClose className="w-5 h-5 text-[#173C32]" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Vehicle Model / Name *</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Toyota Innova Crysta"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                >
                  <option value="Executive MPV">Executive MPV</option>
                  <option value="Luxury Chauffeur Sedan">Luxury Sedan</option>
                  <option value="Royal Lounge Cruiser">Royal Lounge Cruiser</option>
                  <option value="Maharaja Tempo Lounge">Maharaja Tempo Lounge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Registration Number</label>
                <input
                  type="text"
                  value={newReg}
                  onChange={(e) => setNewReg(e.target.value)}
                  placeholder="e.g. DL 01 AB 1234"
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Seats</label>
                <input
                  type="number"
                  min={1}
                  value={newSeats}
                  onChange={(e) => setNewSeats(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Bags</label>
                <input
                  type="number"
                  min={1}
                  value={newLuggage}
                  onChange={(e) => setNewLuggage(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Rate / Day (₹)</label>
                <input
                  type="number"
                  step={500}
                  value={newSurcharge}
                  onChange={(e) => setNewSurcharge(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#D8D2C3]">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-[#D8D2C3] rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#173C32] text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                Add Cab
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
