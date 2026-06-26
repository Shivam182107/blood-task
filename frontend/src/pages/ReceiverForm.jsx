import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { appContext } from "../context/AppContext";

const ReceiverForm = () => {
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const { ReceiverFormData, setReceiverFormData, setDonors, setUser, DonorsData } = useContext(appContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setReceiverFormData({ ...ReceiverFormData, [e.target.name]: e.target.value });
  };

  const allowLocation = () => {
    setLocationStatus("loading");
    if (!navigator.geolocation) { setLocationStatus("error"); return; }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ lat, lng });
        setUser({ lat, lng });
        setLocationStatus("success");
      },
      () => setLocationStatus("error")
    );
  };

  const handleSearch = () => {
   try {
     const filtered = DonorsData.filter(
      (val) =>
        val.city.toLowerCase() === ReceiverFormData.city.toLowerCase() &&
        val.bloodgroup.toLowerCase() === ReceiverFormData.bloodGroup.toLowerCase()
        // val.bloodgroup.toLowerCase() === ReceiverFormData.bloodGroup.toLowerCase()
    );
    console.log(filtered)
    setDonors(filtered);

    if (location) {
      setUser({ lat: location.lat, lng: location.lng });
    }

    navigate("/donorlist");
   } catch (error) {
    console.log(error)
   }
  };
 

  return (
    <div className="bg-[#0a0a0a] w-full h-full overflow-y-auto py-6 px-4">
      <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl w-full max-w-lg mx-auto p-6 sm:p-8">

        <div className="mb-6">
          <h1 className="text-white text-xl sm:text-2xl font-medium">Find a Blood Donor</h1>
          <p className="text-[#666] text-sm mt-1">Fill in your details to search nearby donors</p>
        </div>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">Full Name</label>
            <input type="text" name="name" value={ReceiverFormData.name} onChange={handleChange}
              placeholder="Rahul Sharma"
              className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">Age</label>
              <input type="number" name="age" value={ReceiverFormData.age} onChange={handleChange}
                placeholder="25"
                className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors w-full" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">Weight (kg)</label>
              <input type="number" name="weight" value={ReceiverFormData.weight} onChange={handleChange}
                placeholder="70"
                className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors w-full" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">Phone Number</label>
            <input type="tel" name="phone" value={ReceiverFormData.phone} onChange={handleChange}
              placeholder="+91 98765 43210"
              className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors w-full" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">Blood Group</label>
            <input type="text" name="bloodGroup" value={ReceiverFormData.bloodGroup} onChange={handleChange}
              placeholder="e.g. B+"
              className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">City</label>
              <input type="text" name="city" value={ReceiverFormData.city} onChange={handleChange}
                placeholder="Bhubaneswar"
                className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors w-full" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">State</label>
              <input type="text" name="state" value={ReceiverFormData.state} onChange={handleChange}
                placeholder="Odisha"
                className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors w-full" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">Country</label>
            <input type="text" name="country" value={ReceiverFormData.country} onChange={handleChange}
              placeholder="India"
              className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors w-full" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#888] text-[11px] font-medium uppercase tracking-wider">Address</label>
            <textarea name="address" value={ReceiverFormData.address} onChange={handleChange}
              placeholder="Street, area, landmark..." rows={3}
              className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-red-600 rounded-lg text-white text-sm px-3 py-2.5 outline-none placeholder-[#444] transition-colors resize-none w-full" />

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[#2a2a2a]" />
              <span className="text-[#555] text-xs">or</span>
              <div className="flex-1 h-px bg-[#2a2a2a]" />
            </div>

            <button type="button" onClick={allowLocation} disabled={locationStatus === "loading"}
              className={`flex items-center justify-center gap-2 border rounded-lg text-sm py-2.5 px-4 transition-all w-full
                ${locationStatus === "success" ? "bg-[#0d1f0e] border-green-800 text-green-400"
                  : locationStatus === "error" ? "bg-[#1f0d0d] border-red-900 text-red-400"
                  : "bg-[#1a1a1a] border-[#2a2a2a] text-[#aaa] hover:border-[#555] hover:text-white"}`}>
              {locationStatus === "loading" ? (
                <div className="w-3.5 h-3.5 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 0V3m0 17v-2M3 12H5m14 0h2" />
                </svg>
              )}
              <span>
                {locationStatus === "idle" && "Use my current location instead"}
                {locationStatus === "loading" && "Detecting your location…"}
                {locationStatus === "success" && location && `📍 ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
                {locationStatus === "error" && "Could not get location. Try again"}
              </span>
            </button>
          </div>

        </div>

        <div className="mt-6">
          <button type="button" onClick={handleSearch}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 rounded-lg transition-colors">
            Search Donors
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReceiverForm;