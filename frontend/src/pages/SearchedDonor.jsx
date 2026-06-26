import { useRef, useEffect, useContext, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { appContext } from "../context/AppContext";
import { useNavigate } from "react-router";

const SearchedDonor = () => {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const { User, Donors } = useContext(appContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!User?.lat || !User?.lng) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAP_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [User.lng, User.lat],
      zoom: 12,
    });

    mapRef.current.on("load", () => {
      const bounds = new mapboxgl.LngLatBounds();

      // console.log("Adding User Marker", User.lng, User.lat);
      new mapboxgl.Marker({ color: "green" })
        .setLngLat([User.lng, User.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>You</h3><p>Current Location</p>`))
        .addTo(mapRef.current);

      bounds.extend([User.lng, User.lat]);

      Donors.forEach((donor) => {
        // console.log("addding donor marker", donor.location.lng, donor.location.lat);
        
        new mapboxgl.Marker({ color: "#e53935" })
          .setLngLat([donor.location.lng, donor.location.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <h3>${donor.Name}</h3>
              <p>Blood: ${donor.bloodgroup}</p>
              <p>${donor.city}</p>
            `)
          )
          .addTo(mapRef.current);

        bounds.extend([donor.location.lng, donor.location.lat]);
      });

      if (Donors.length > 0) {
        mapRef.current.fitBounds(bounds, { padding: 100 });
      }
    });

    return () => mapRef.current?.remove();
  }, [User, Donors]);


  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#0a0a0a]">
      
      {/* Map Container - Top on mobile, right on desktop */}
      <div className={`
        ${isMobile ? 'h-[50vh] w-full' : 'flex-1 h-full'}
        relative
      `}>
        <div ref={mapContainerRef} className="h-full w-full" />
        
        {/* Mobile results count overlay */}
        {isMobile && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a]/90 backdrop-blur-sm border border-[#2a2a2a] px-4 py-2 rounded-full">
            <span className="text-white text-sm">
              {Donors.length} donor{Donors.length !== 1 ? "s" : ""} found
            </span>
          </div>
        )}
      </div>

      {/* Donor List - Bottom on mobile, right on desktop */}
      <div className={`
        ${isMobile ? 'h-[50vh] w-full border-t border-[#2a2a2a]' : 'w-[340px] h-full border-l border-[#2a2a2a]'}
        bg-[#0a0a0a] flex flex-col
      `}>
        {/* Desktop header - hidden on mobile */}
        {!isMobile && (
          <div className="p-4 border-b border-[#2a2a2a] flex-shrink-0">
            <h2 className="text-white text-lg font-medium">Donors Found</h2>
            <p className="text-[#666] text-xs mt-0.5">{Donors.length} result{Donors.length !== 1 ? "s" : ""}</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
          {Donors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="text-4xl mb-3">🩸</div>
              <p className="text-[#666] text-sm">No donors found. Try a different city or blood group.</p>
            </div>
          ) : (
            Donors.map((donor, index) => (
              <div key={index}
                className="bg-[#111] border border-[#2a2a2a] hover:border-[#444] rounded-xl p-4 transition-colors cursor-pointer">

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-900 border border-red-800 flex items-center justify-center text-red-300 text-sm font-medium shrink-0">
                      {donor.Name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{donor.Name}</p>
                      <p className="text-[#666] text-xs">{donor.city}, {donor.state}</p>
                    </div>
                  </div>
                  <span className="bg-red-900 border border-red-800 text-red-300 text-xs font-medium px-2.5 py-1 rounded-lg">
                    {donor.bloodgroup}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#1a1a1a] rounded-lg px-3 py-2">
                    <p className="text-[#555] text-[10px] uppercase tracking-wider">Age</p>
                    <p className="text-white text-sm">{donor.age} yrs</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg px-3 py-2">
                    <p className="text-[#555] text-[10px] uppercase tracking-wider">Weight</p>
                    <p className="text-white text-sm">{donor.weight} kg</p>
                  </div>
                </div>

                <div className="mt-2 bg-[#1a1a1a] rounded-lg px-3 py-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#555] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5.5A1.5 1.5 0 014.5 4h2a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 016.5 8H6a9 9 0 009 9v-.5A1.5 1.5 0 0116.5 15h1A1.5 1.5 0 0119 16.5v2A1.5 1.5 0 0117.5 20C9.44 20 3 13.56 3 5.5z" />
                  </svg>
                  <p className="text-[#aaa] text-xs truncate">{donor.phone}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchedDonor;