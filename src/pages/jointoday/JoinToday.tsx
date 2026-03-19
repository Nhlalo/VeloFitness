function SelectClub() {
  return (
    <div>
      <div>
        <div>
          <h2>3 Steps you are in</h2>

          <form>
            <div>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Surname" />
            </div>

            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Zip Code" />
            <input type="tel" placeholder="Phone Number" />

            <button type="submit">Select a club +</button>
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
