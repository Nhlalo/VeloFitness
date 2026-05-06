import { useEffect } from "react";
import { MapPin, ChevronRight } from "lucide-react";

interface Props {
  clubName: string | undefined;
  memberSince: string | undefined;
  onChangeClubClick: () => void;
  toastMessage: string | null;
  setToastMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const Toast = ({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="alert"
      className="animate-fade-in-up fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-red-500 px-4 py-2 text-sm text-white shadow-lg"
    >
      {message}
    </div>
  );
};

export default function ClubCard({
  clubName,
  memberSince,
  onChangeClubClick,
  toastMessage,
  setToastMessage,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/20 bg-linear-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="font-mono text-xs tracking-wide text-white/40 uppercase">
            Home Club
          </div>
          <div className="mt-1 text-2xl font-light">{clubName}</div>
        </div>
        <div className="text-3xl" aria-hidden="true">
          {" "}
          <MapPin />
        </div>
      </div>

      <div className="my-4 h-px bg-white/10" />

      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-xs text-white/40">Member Since</div>
          <div className="mt-1 text-sm font-light">
            {memberSince?.split("T")[0]}
          </div>
        </div>
        <button
          onClick={onChangeClubClick}
          className="font-mono text-xs text-white/60 transition-colors hover:text-white"
        >
          Change Club <ChevronRight aria-hidden="true" />
        </button>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>
    </div>
  );
}
