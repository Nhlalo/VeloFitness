interface Props {
  selectedClub: string;
  memberSince: string;
  onChangeClubClick: () => void;
}

export default function ClubCard({
  selectedClub,
  memberSince,
  onChangeClubClick,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/20 bg-linear-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="font-mono text-xs tracking-wide text-white/40 uppercase">
            Home Club
          </div>
          <div className="mt-1 text-2xl font-light">{selectedClub}</div>
        </div>
        <div className="text-3xl">📍</div>
      </div>

      <div className="my-4 h-px bg-white/10" />

      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-xs text-white/40">Member Since</div>
          <div className="mt-1 text-sm font-light">{memberSince}</div>
        </div>
        <button
          onClick={onChangeClubClick}
          className="font-mono text-xs text-white/60 transition-colors hover:text-white"
        >
          Change Club →
        </button>
      </div>
    </div>
  );
}
