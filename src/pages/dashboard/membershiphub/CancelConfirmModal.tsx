import { TriangleAlert } from "lucide-react";

interface CancelConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  membershipTitle: string | undefined;
  membershipEndsOn: string | undefined;
}

export default function CancelConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  membershipTitle,
  membershipEndsOn,
}: CancelConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-red-500/30 bg-black shadow-2xl">
          <div className="border-b border-red-500/30 p-6">
            <div className="flex items-center gap-3">
              <div aria-hidden={true} className="text-3xl">
                <TriangleAlert />
              </div>
              <div>
                <h3 className="text-xl font-light">Cancel Subscription</h3>
                <p className="mt-1 text-xs text-white/40">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-white/80">
              Are you sure you want to cancel your{" "}
              <span className="font-semibold text-white">
                {membershipTitle}
              </span>{" "}
              membership?
            </p>
            <div className="mt-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-xs text-yellow-400">
                <TriangleAlert aria-hidden="true" /> You will lose access to:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-white/60">
                <li>• All remaining guest passes</li>
                <li>• Class booking privileges</li>
                <li>• Club access after 30 days</li>
              </ul>
            </div>
            <p className="mt-4 text-xs text-white/40">
              Your membership will remain active until{" "}
              <span className="text-white">{membershipEndsOn}</span>.
            </p>
          </div>
          <div className="flex gap-3 border-t border-red-500/30 p-6 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-full border border-white/20 px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-white/10"
            >
              Keep Membership
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-red-600"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
