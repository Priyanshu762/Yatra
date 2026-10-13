import React, { useState } from 'react';
import { IconClose } from '../components/Icons';
import { useApp } from '../context/AppContext';
import type { Destination } from '../types';


export const AdminDestinationsPage: React.FC = () => {
  const { destinations, addDestination, updateDestination, deleteDestination } = useApp();
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newName, setNewName] = useState('');
  const [newState, setNewState] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDuration, setNewDuration] = useState('3 - 4 Days');
  const [newBestTime, setNewBestTime] = useState('October to March');
  const [newDescription, setNewDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const id = newName.toLowerCase().replace(/[^a-z0-9]+/g, '');
    const newDest: Destination = {
      id,
      name: newName,
      state: newState,
      tagline: newTagline,
      description: newDescription,
      heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80'
      ],
      bestTimeToVisit: newBestTime,
      idealDuration: newDuration,
      culturalHighlights: ['Historic monument walkthrough', 'Private evening river/courtyard ceremony'],
      signatureExperiences: ['Curated scholar escort', 'Artisanal atelier tour'],
      weather: 'Pleasant autumn and winter season'
    };

    addDestination(newDest);
    setIsCreating(false);
    setNewName('');
    setNewState('');
    setNewTagline('');
    setNewDescription('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDest) {
      updateDestination(editingDest);
      setEditingDest(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D2C3] pb-4">
        <div>
          <h1 className="font-serif text-3xl text-[#173C32]">
            Destinations & City Sightseeing
          </h1>
          <p className="text-xs text-[#66756C] mt-1 font-light">
            Manage featured travel destinations, sightseeing highlights, ideal days, and best travel seasons.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-[#173C32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#122F27] border border-[#173C32] rounded-lg cursor-pointer"
        >
          Add New Destination
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="bg-[#FAF8F3] p-6 border border-[#D8D2C3] rounded-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#173C32]">{dest.name}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C47A54] block mt-0.5">
                  {dest.state} | {dest.tagline}
                </span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingDest(dest)}
                  className="text-xs font-semibold uppercase text-[#173C32] hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteDestination(dest.id)}
                  className="text-xs font-semibold uppercase text-[#8C3E2D] hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="text-xs text-[#526058] line-clamp-3 leading-relaxed">
              {dest.description}
            </p>

            <div className="pt-3 border-t border-[#D8D2C3] text-xs text-[#637269] flex justify-between">
              <span>Ideal Duration: {dest.idealDuration}</span>
              <span>Best Season: {dest.bestTimeToVisit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#FAF8F3] max-w-lg w-full border-2 border-[#D8D2C3] rounded-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center border-b border-[#D8D2C3] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">Add Destination City</h3>
              <button type="button" onClick={() => setIsCreating(false)} className="cursor-pointer">
                <IconClose className="w-5 h-5 text-[#173C32]" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">City / Destination Name *</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Udaipur"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  placeholder="e.g. Rajasthan"
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Ideal Duration</label>
                <input
                  type="text"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="e.g. 3 - 4 Days"
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3B4840] mb-1">Best Travel Season</label>
                <input
                  type="text"
                  value={newBestTime}
                  onChange={(e) => setNewBestTime(e.target.value)}
                  placeholder="e.g. October to March"
                  className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Tagline</label>
              <input
                type="text"
                value={newTagline}
                onChange={(e) => setNewTagline(e.target.value)}
                placeholder="e.g. City of Lakes & Royal Palaces"
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Description</label>
              <textarea
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Attractions, temple details, and sightseeing information..."
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
                Save Destination
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {editingDest && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="bg-[#FAF8F3] max-w-lg w-full border-2 border-[#D8D2C3] rounded-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center border-b border-[#D8D2C3] pb-2">
              <h3 className="font-serif text-xl font-bold text-[#173C32]">Edit City: {editingDest.name}</h3>
              <button type="button" onClick={() => setEditingDest(null)} className="cursor-pointer">
                <IconClose className="w-5 h-5 text-[#173C32]" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Tagline</label>
              <input
                type="text"
                value={editingDest.tagline}
                onChange={(e) => setEditingDest({ ...editingDest, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B4840] mb-1">Description</label>
              <textarea
                rows={4}
                value={editingDest.description}
                onChange={(e) => setEditingDest({ ...editingDest, description: e.target.value })}
                className="w-full px-3 py-2 bg-[#F2EFE8] border border-[#D8D2C3] rounded-lg text-xs text-[#173C32]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#D8D2C3]">
              <button
                type="button"
                onClick={() => setEditingDest(null)}
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
