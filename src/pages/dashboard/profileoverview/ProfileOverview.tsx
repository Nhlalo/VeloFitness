import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/authContext";
import apiRequest from "../../../service/appApi";
import validateField from "../../../utils/validateInputs";
import generateInitials from "../../../utils/generateInitials";
import ClubModal from "./clubModal";
import ProfileHeader from "./ProfileHeader";
import PersonalDetails from "./PersonalDetails";
import { Stats, QuickStats } from "./Stats";
import ClubCard from "./ClubCard";

export default function ProfileOverview() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState({
    name: false,
    surname: false,
    email: false,
    zipCode: false,
    phoneNumber: false,
  });

  const navigate = useNavigate();

  //This will store the user's infor before any change, so when the cancel button is pressed, it can revert to the old information.
  const userInforRef = useRef(user);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string,
    jsPattern: string,
  ) => {
    const { value } = e.target;
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [inputName]: value,
      };
    });
    validateField(setFormErrors, inputName, value, jsPattern);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (loading) return;

    const hasErrors = Object.values(formErrors).some((error) => error === true);
    if (!user) return;
    const hasEmptyFields =
      !user.name.trim() ||
      !user.surname.trim() ||
      !user.email.trim() ||
      !user.zipCode.trim() ||
      !user.phoneNumber.trim();

    if (hasErrors && hasEmptyFields) return;

    try {
      const body = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        zipCode: user.zipCode,
      };

      const response = await apiRequest("profile/update", body);

      if (!response.ok) {
        setLoading(false);
        if (response.status == 401) {
          navigate("/sigin", { replace: true });
        }
        throw new Error("Personal details change failed");
      }

      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          ...body,
        };
      });
      userInforRef.current = user;
      setLoading(false);
      setIsClubModalOpen(false);
      setIsEditing(false);
    } catch (error) {
      setLoading(false);
      console.error("Personal details change error:", error);
    }
  };

  const handleCancelClick = () => {
    setFormErrors({
      name: false,
      surname: false,
      email: false,
      zipCode: false,
      phoneNumber: false,
    });
    setIsEditing(false);
    setUser(userInforRef.current);
  };

  const handleChangeClubClick = () => {
    if (user?.membershipStatus?.toLowerCase() !== "active") {
      setToastMessage("Please reactivate your membership to change club");
      return;
    }
    setIsClubModalOpen(true);
  };

  const handleCloseClubModal = () => {
    setIsClubModalOpen(false);
  };

  const handleSelectClub = async (clubName: string) => {
    if (loading) return;
    if (clubName == userInforRef.current?.clubName) {
      setIsClubModalOpen(false);
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest(
        "club",
        {
          clubName: clubName,
        },
        "PATCH",
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          `Club change error: ${response.status} ${response.statusText}`,
          errorData,
        );
        setLoading(false);
        if (response.status == 401) {
          navigate("/sigin", { replace: true });
        }
        return;
      }

      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          clubName: clubName,
        };
      });
      setLoading(false);
      setIsClubModalOpen(false);
    } catch (error) {
      setLoading(false);
      console.error("Club Name change error:", error);
    }
  };

  return (
    <div className="mt-6 min-h-screen bg-black text-white md:mt-0">
      {/* Grid Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="bg-size-[4rem_4rem absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
          <ProfileHeader
            name={user?.name}
            surname={user?.surname}
            avatarInitials={generateInitials(user?.name, user?.surname)}
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
                clubName={user?.clubName}
                memberSince={user?.membershipStartDate}
                onChangeClubClick={handleChangeClubClick}
                toastMessage={toastMessage}
                setToastMessage={setToastMessage}
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
        currentClub={user?.clubName}
      />
    </div>
  );
}
