import { X } from "lucide-react";
import { USAGyms, canadaGyms, SAGyms } from "../../data/constants/gymlocation";

export default function ClubModal({
  isOpen = false,
  onClose,
  onSelectClub,
  currentClub = "",
}) {
  // Static sample data for display
  const availableClubs = [...USAGyms, ...SAGyms, ...canadaGyms];

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="pointer-events-auto flex h-auto max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
          {/* Modal Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6 pb-4">
            <div>
              <h3 className="text-xl font-light">Change Home Club</h3>
              <p className="mt-1 text-xs text-white/40">
                Select from our premium locations
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none text-white/60 transition-colors hover:text-white"
            >
              <X />
            </button>
          </div>

          <div className="shrink-0 px-6 pt-4 pb-2">
            <input
              type="text"
              placeholder="Search by club name or address..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-2 pb-6">
            {availableClubs.map((club) => (
              <button
                key={club.name}
                className="group w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="h-20 w-20 overflow-hidden rounded-lg bg-white/10">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white group-hover:text-white/90">
                      {club.name}
                    </div>
                    <div className="mt-1 text-xs text-white/40">
                      {club.address}
                    </div>
                    {currentClub === club.name && (
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/60">
                        Current Club
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 text-white/40 transition-colors group-hover:text-white">
                    →
                  </div>
                </div>
              </button>
            ))}

            <div className="h-2" />
          </div>

          <div className="shrink-0 border-t border-white/10 p-6 pt-4">
            <button
              onClick={onClose}
              className="w-full rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
