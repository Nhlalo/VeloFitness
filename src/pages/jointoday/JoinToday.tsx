function SelectClub() {
  return (
    <div className="space-y-8">
      <div>
        <div>
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            3 Steps you are in
          </h2>

          <form className="mt-6 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
              />
              <input
                type="text"
                placeholder="Surname"
                className="flex-1 rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
            />

            <input
              type="text"
              placeholder="Zip Code"
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 transition-colors focus:border-black focus:outline-none"
            />

            <button
              type="submit"
              className="w-full rounded-md border-2 border-black bg-white px-6 py-4 text-center font-bold transition-colors duration-300 hover:bg-black hover:text-white"
            >
              Select a club +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function JoinToday() {
  return (
    <div>
      <div>
        <div>
          {/* Left column - Fixed image column */}
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <h1>Vélo Fitness Discount</h1>
                    <p>
                      Join now and receive a complementary suite of services.
                    </p>
                    <ul>
                      <li>1 Vélo Assessment</li>
                      <li>2 Personal Training r 2 Pilate Sessions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Scrollable content */}
          <div>
            <div>
              <div>
                <div>
                  <button>
                    <span>01</span>
                    <span>Select Club</span>
                  </button>

                  <div></div>

                  <button>
                    <span>02</span>
                    <span>Choose Membership</span>
                  </button>

                  <div></div>

                  <button>
                    <span>03</span>
                    <span>Review and Pay</span>
                  </button>
                </div>

                {/* Full width line under buttons */}
                <div></div>
              </div>

              {/* Main content */}
              <SelectClub />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
