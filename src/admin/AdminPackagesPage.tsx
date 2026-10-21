import React, { useState } from 'react';
import { IconClose } from '../components/Icons';
import { useApp } from '../context/AppContext';
import type { TourPackage } from '../types';


export const AdminPackagesPage: React.FC = () => {
  const { packages, addPackage, updatePackage, deletePackage, destinations } = useApp();
  const [editingPkg, setEditingPkg] = useState<TourPackage | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // New package form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDestinationId, setNewDestinationId] = useState(destinations[0]?.id || 'varanasi');
  const [newDurationDays, setNewDurationDays] = useState(3);
  const [newDurationNights, setNewDurationNights] = useState(2);
  const [newBasePrice, setNewBasePrice] = useState(25000);
  const [newTheme, setNewTheme] = useState<'Spiritual' | 'Royal Heritage' | 'Culinary & Culture' | 'Grand Sovereign'>('Royal Heritage');
  const [newOverview, setNewOverview] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = destinations.find((d) => d.id === newDestinationId);
    const newPkg: TourPackage = {
      id: `PKG-${Math.floor(10 + Math.random() * 90)}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newTitle,
      subtitle: newSubtitle,
      destinationId: newDestinationId,
      destinationName: dest ? dest.name : 'Varanasi',
      durationDays: newDurationDays,
      durationNights: newDurationNights,
      basePricePerPerson: newBasePrice,
      rating: 4.95,
      reviewCount: 12,
      theme: newTheme,
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80'
      ],
      overview: newOverview || 'A handcrafted private journey designed by Yatra Luxe curators.',
      groupType: 'Private Chauffeured Journey',
      pickupPoints: ['City Airport', 'City Centre Hotel'],
      inclusions: [
        'Dedicated luxury chauffeur vehicle for all days',
        'Heritage palace hotel stay with breakfast',
        'Certified scholar-curator guide'
      ],
      exclusions: [
        'Commercial airline tickets',
        'Personal purchases and gratuities'
      ],
      supportedVehicles: ['V-01', 'V-02'],
      dayByDayItinerary: [
        {
          day: 1,
          title: 'Arrival & Welcome Salons',
          description: 'Chauffeur reception and check-in to heritage courtyard suite.',
          highlights: ['Chauffeur VIP arrival', 'Welcome palace dinner'],
          meals: 'Dinner included',
          stay: 'Palace Heritage'
        },
        {
          day: 2,
          title: 'Monuments & Ateliers',
          description: 'Guided scholar tour of historic corridors and master artisan studios.',
          highlights: ['Historic monument walk', 'Artisanal atelier visit'],
          meals: 'Breakfast included',
          stay: 'Palace Heritage'
        }
      ]
    };

    addPackage(newPkg);
    setIsCreating(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewOverview('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPkg) {
      updatePackage(editingPkg);
      setEditingPkg(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D2C3] pb-4">
        <div>
          <h1 className="font-serif text-3xl text-[#173C32]">
            Tour Packages Manager
          </h1>
          <p className="text-xs text-[#66756C] mt-1 font-light">
            Create and update holiday packages, temple darshan tours, itinerary plans, and pricing.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#122F27] border border-[#173C32] rounded-lg cursor-pointer"
        >
          Add New Tour Package
        </button>
      </div>

      {/* Package Registry Table */}
      <div className="bg-[#FAF8F3] border border-[#D8D2C3] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#3E4F45]">
            <thead className="bg-[#F2EFE8] text-[10px] uppercase font-bold text-[#7A8780] tracking-wider border-b border-[#D8D2C3]">
              <tr>
                <th className="py-3 px-4">Package ID</th>
                <th className="py-3 px-4">Tour Title</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Starting Fare</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8D2C3]">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-[#F2EFE8]">
                  <td className="py-3 px-4 font-mono font-bold text-[#173C32]">{pkg.id}</td>
                  <td className="py-3 px-4 font-medium text-[#173C32]">
                    <div>{pkg.title}</div>
                    <div className="text-[10px] text-[#78857E] truncate max-w-xs">{pkg.subtitle}</div>
                  </td>
                  <td className="py-3 px-4">{pkg.destinationName}</td>
                  <td className="py-3 px-4">{pkg.durationDays}D / {pkg.durationNights}N</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold border border-[#D8D2C3] bg-[#EAE4D5] text-[#173C32] rounded-md">
                      {pkg.theme}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#173C32]">
                    ₹{pkg.basePricePerPerson.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-3">
                    <button
                      onClick={() => setEditingPkg(pkg)}
                      className="text-[#173C32] hover:underline font-semibold uppercase text-[11px] cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePackage(pkg.id)}
                      className="text-[#8C3E2D] hover:underline font-semibold uppercase text-[11px] cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#FAF8F3] max-w-xl w-full border-2 border-[#D8D2C3] rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-[#D8D2C3] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">Add New Tour Package</h3>
              <button type="button" onClick={() => setIsCreating(false)} className="cursor-pointer">
                <IconClose className="w-5 h-5 text-[#173C32]" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Package Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Royal Bastions of Amber"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Subtitle / Short Summary *</label>
              <input
                type="text"
                required
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="e.g. 4-day private holiday covering Amer Fort, City Palace & markets"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Destination City</label>
                <select
                  value={newDestinationId}
                  onChange={(e) => setNewDestinationId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Theme / Category</label>
                <select
                  value={newTheme}
                  onChange={(e) => setNewTheme(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                >
                  <option value="Spiritual">Spiritual / Darshan</option>
                  <option value="Royal Heritage">Heritage & Forts</option>
                  <option value="Culinary & Culture">Culinary & Culture</option>
                  <option value="Grand Sovereign">Grand Family Tour</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Days</label>
                <input
                  type="number"
                  min={1}
                  value={newDurationDays}
                  onChange={(e) => setNewDurationDays(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Nights</label>
                <input
                  type="number"
                  min={0}
                  value={newDurationNights}
                  onChange={(e) => setNewDurationNights(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Base Fare Per Person (₹)</label>
                <input
                  type="number"
                  step={500}
                  value={newBasePrice}
                  onChange={(e) => setNewBasePrice(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Tour Overview</label>
              <textarea
                rows={3}
                value={newOverview}
                onChange={(e) => setNewOverview(e.target.value)}
                placeholder="Day to day highlights and summary of this tour..."
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
                Save Package
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="bg-[#FAF8F3] max-w-xl w-full border-2 border-[#D8D2C3] rounded-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center border-b border-[#D8D2C3] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">Edit Package: {editingPkg.id}</h3>
              <button type="button" onClick={() => setEditingPkg(null)} className="cursor-pointer">
                <IconClose className="w-5 h-5 text-[#173C32]" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Title</label>
              <input
                type="text"
                value={editingPkg.title}
                onChange={(e) => setEditingPkg({ ...editingPkg, title: e.target.value })}
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Subtitle</label>
              <input
                type="text"
                value={editingPkg.subtitle}
                onChange={(e) => setEditingPkg({ ...editingPkg, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Base Fare Per Person (₹)</label>
                <input
                  type="number"
                  step={500}
                  value={editingPkg.basePricePerPerson}
                  onChange={(e) => setEditingPkg({ ...editingPkg, basePricePerPerson: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Theme / Category</label>
                <select
                  value={editingPkg.theme}
                  onChange={(e) => setEditingPkg({ ...editingPkg, theme: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                >
                  <option value="Spiritual">Spiritual / Darshan</option>
                  <option value="Royal Heritage">Heritage & Forts</option>
                  <option value="Culinary & Culture">Culinary & Culture</option>
                  <option value="Grand Sovereign">Grand Family Tour</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#D8D2C3]">
              <button
                type="button"
                onClick={() => setEditingPkg(null)}
                className="px-4 py-2 border border-[#D8D2C3] rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
