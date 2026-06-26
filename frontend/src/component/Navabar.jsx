import React from "react";

const Navabar = () => {
  return (
    <>
      <div className="w-full bg-black text-white px-6 py-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wide">Blood Donation</h1>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition duration-300">
              Donor
            </button>

            <button className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition duration-300">
              Receiver
            </button>

            <button className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition duration-300">
              Profile
            </button>

            <button className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition duration-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navabar;
