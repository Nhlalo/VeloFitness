import { X } from "lucide-react";

export default function ClubModal() {
  return (
    <>
      <div>Backdrop</div>
      <div>
        <div>
          <div>
            <h3>Change Home Club</h3>
            <p>Select from our premium locations</p>
            <button>
              <X />
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by club name or address..."
            />
          </div>
          <div>
            <div>Club List</div>
          </div>
          <div>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
