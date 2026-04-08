// ProfileOverview.jsx - Phase 1: Base Structure

import { useState } from "react";
import ClubModal from "./clubModal";
import { mockUser } from "../../data/mock/mockUser";

// ProfileOverview.jsx - Phase 2: With Styling, No Logic

export default function ProfileOverview() {
  // State declarations (same as Phase 1)
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    surname: false,
    email: false,
    zipCode: false,
    phoneNumber: false,
  });

  // Empty placeholder functions
  const handleChange = () => {};
  const handleEditClick = () => {};
  const handleSaveClick = () => {};
  const handleCancelClick = () => {};
  const handleChangeClubClick = () => {};
  const handleCloseClubModal = () => {};
  const handleSelectClub = () => {};

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
          {/* Header */}
          <header className="mb-12 flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <div className="mb-2 font-mono text-xs tracking-wider text-white/40 uppercase">
                Welcome Back
              </div>
              <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
                {user.name} {user.surname}
              </h1>
            </div>
            <div className="hidden sm:block">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/20 to-white/5 text-xl font-light backdrop-blur-sm">
                {user.avatarInitials}
              </div>
            </div>
          </header>

          {/* Profile Section */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="group">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-mono text-sm tracking-wider text-white/40 uppercase">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-xs text-white/30">
                      Your identity & contact details
                    </p>
                  </div>
                  <button className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black">
                    Edit Profile
                  </button>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border-b border-white/10 pb-3 transition-colors group-hover:border-white/30">
                      <div className="mb-1 font-mono text-xs text-white/40">
                        First Name
                      </div>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full cursor-default bg-transparent text-xl font-light tracking-wide focus:outline-none"
                      />
                    </div>
                    <div className="border-b border-white/10 pb-3 transition-colors group-hover:border-white/30">
                      <div className="mb-1 font-mono text-xs text-white/40">
                        Last Name
                      </div>
                      <input
                        type="text"
                        value={user.surname}
                        readOnly
                        className="w-full cursor-default bg-transparent text-xl font-light tracking-wide focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="border-b border-white/10 pb-3 transition-colors group-hover:border-white/30">
                    <div className="mb-1 font-mono text-xs text-white/40">
                      Email Address
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="flex-1 cursor-default bg-transparent text-lg font-light tracking-wide focus:outline-none"
                      />
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40">
                        verified
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="border-b border-white/10 pb-3 transition-colors group-hover:border-white/30">
                      <div className="mb-1 font-mono text-xs text-white/40">
                        Phone Number
                      </div>
                      <input
                        type="tel"
                        value={user.phoneNumber}
                        readOnly
                        className="w-full cursor-default bg-transparent text-lg font-light tracking-wide focus:outline-none"
                      />
                    </div>
                    <div className="border-b border-white/10 pb-3 transition-colors group-hover:border-white/30">
                      <div className="mb-1 font-mono text-xs text-white/40">
                        Postal Code
                      </div>
                      <input
                        type="text"
                        value={user.zipCode}
                        readOnly
                        className="w-full cursor-default bg-transparent text-lg font-light tracking-wide focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="mb-1 text-2xl font-light">12</div>
                  <div className="font-mono text-xs tracking-wide text-white/40 uppercase">
                    Classes Attended
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="mb-1 text-2xl font-light">3</div>
                  <div className="font-mono text-xs tracking-wide text-white/40 uppercase">
                    Guest Passes Used
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs tracking-wide text-white/40 uppercase">
                      Home Club
                    </div>
                    <div className="mt-1 text-2xl font-light">
                      {user.selectedClub}
                    </div>
                  </div>
                  <div className="text-3xl">📍</div>
                </div>
                <div className="my-4 h-px bg-white/10" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs text-white/40">
                      Member Since
                    </div>
                    <div className="mt-1 text-sm font-light">
                      {user.memberSince}
                    </div>
                  </div>
                  <button className="font-mono text-xs text-white/60 transition-colors hover:text-white">
                    Change Club →
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 font-mono text-xs tracking-wide text-white/40 uppercase">
                  Quick Stats
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      Check-ins this month
                    </span>
                    <span className="text-lg font-light">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      Favorite class
                    </span>
                    <span className="font-mono text-sm text-white/80">
                      Cycling
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClubModal
        isOpen={false}
        onClose={() => {}}
        onSelectClub={() => {}}
        currentClub=""
      />
    </div>
  );
}
