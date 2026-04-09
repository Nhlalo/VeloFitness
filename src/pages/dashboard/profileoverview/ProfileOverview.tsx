// ProfileOverview.jsx - Main component

import { useState } from "react";
import { User } from "../../../types/user.interface";
import { mockUser } from "../../../data/mock/mockUser";
import validateField from "../../../utils/validateInputs";
import ClubModal from "./clubModal";
import ProfileHeader from "./ProfileHeader";
import PersonalDetails from "./PersonalDetails";
import { Stats, QuickStats } from "./Stats";
import ClubCard from "./ClubCard";

export default function ProfileOverview() {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    surname: false,
    email: false,
    zipCode: false,
    phoneNumber: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string,
    jsPattern: string,
  ) => {
    const { value } = e.target;
    setUser((prev) => ({ ...prev, [inputName]: value }));
    validateField(setFormErrors, inputName, value, jsPattern);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const hasErrors = Object.values(formErrors).some((error) => error === true);
    const hasEmptyFields =
      !user.name.trim() ||
      !user.surname.trim() ||
      !user.email.trim() ||
      !user.zipCode.trim() ||
      !user.phoneNumber.trim();

    if (!hasErrors && !hasEmptyFields) {
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setUser(mockUser);
    setFormErrors({
      name: false,
      surname: false,
      email: false,
      zipCode: false,
      phoneNumber: false,
    });
    setIsEditing(false);
  };

  const handleChangeClubClick = () => {
    setIsClubModalOpen(true);
  };

  const handleCloseClubModal = () => {
    setIsClubModalOpen(false);
  };

  const handleSelectClub = (clubName: string) => {
    setUser((prev) => ({ ...prev, selectedClub: clubName }));
    setIsClubModalOpen(false);
  };

  return (
    <div className="mt-6 min-h-screen bg-black text-white md:mt-0">
      {/* Grid Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="bg-size-[4rem_4rem absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
          <ProfileHeader
            name={user.name}
            surname={user.surname}
            avatarInitials={user.avatarInitials}
          />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <PersonalDetails
                user={user}
                formErrors={formErrors}
                isEditing={isEditing}
                handleChange={handleChange}
                handleEditClick={handleEditClick}
                handleCancelClick={handleCancelClick}
                handleSaveClick={handleSaveClick}
              />

              <Stats />
            </div>

            <div className="space-y-6">
              <ClubCard
                selectedClub={user.selectedClub}
                memberSince={user.memberSince}
                onChangeClubClick={handleChangeClubClick}
              />

              <QuickStats />
            </div>
          </div>
        </div>
      </div>

      <ClubModal
        isOpen={isClubModalOpen}
        onClose={handleCloseClubModal}
        onSelectClub={handleSelectClub}
        currentClub={user.selectedClub}
      />
    </div>
  );
}
