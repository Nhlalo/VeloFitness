// ProfileOverview.jsx - Phase 1: Base Structure

import { useState } from "react";
import ClubModal from "./clubModal";

export default function ProfileOverview() {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = () => {};
  const handleEditClick = () => {};
  const handleSaveClick = () => {};
  const handleCancelClick = () => {};
  const handleChangeClubClick = () => {};
  const handleCloseClubModal = () => {};
  const handleSelectClub = () => {};

  return (
    <div>
      <header>
        <div>Welcome Back</div>
        <h1>User Name</h1>
        <div>Avatar</div>
      </header>

      <div>
        <div>
          <div>
            <h2>Personal Information</h2>
            <p>Your identity & contact details</p>
            <button>Edit Profile</button>
          </div>

          <form>
            <div>
              <div>
                <label>First Name</label>
                <input type="text" name="name" />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" name="surname" />
              </div>
            </div>

            <div>
              <label>Email Address</label>
              <input type="email" name="email" />
              <span>verified</span>
            </div>

            <div>
              <div>
                <label>Phone Number</label>
                <input type="tel" name="phoneNumber" />
              </div>
              <div>
                <label>Postal Code</label>
                <input type="text" name="zipCode" />
              </div>
            </div>
          </form>
        </div>

        <div>
          <div>
            <div>12</div>
            <div>Classes Attended</div>
          </div>
          <div>
            <div>3</div>
            <div>Guest Passes Used</div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <div>Home Club</div>
              <div>Selected Club</div>
            </div>
            <div>📍</div>
          </div>
          <hr />
          <div>
            <div>
              <div>Member Since</div>
              <div>Date</div>
            </div>
            <button>Change Club →</button>
          </div>

          <div>
            <div>Quick Stats</div>
            <div>
              <div>
                <span>Check-ins this month</span>
                <span>8</span>
              </div>
              <div>
                <span>Favorite class</span>
                <span>Cycling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClubModal />
    </div>
  );
}
