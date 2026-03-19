export default function SelectClub() {
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
