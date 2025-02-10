import { useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";


const HospitalList = () => {
  const [address, setAddress] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const fetchHospitals = async () => {
    if (!address) {
      alert("Please enter an address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/user/getClosestHospitals", { address });
      console.log("Fetched Hospitals:", response.data.data);
      setHospitals(response.data.data);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setError("Failed to fetch hospital data. Please try again.");
    }

    setLoading(false);
  };

  const getRandomImage = () => {
    const images = [
      "https://static.vecteezy.com/system/resources/thumbnails/007/681/899/small/hospital-building-outside-composition-vector.jpg",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const renderMap = (hospital) => {
    setSelectedHospital(hospital);

    setTimeout(() => {
      if (mapInstance) {
        mapInstance.remove();
      }

      const map = L.map("map").setView([hospital.latitude, hospital.longitude], 14);
      setMapInstance(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // ✅ Remove the marker icon
      L.marker([hospital.latitude, hospital.longitude], { icon: L.divIcon({ className: "invisible" }) })
        .addTo(map)
        .bindPopup(`<b>${hospital.name}</b><br>${hospital.address}`)
        .openPopup();
    }, 100);
  };

  return (
    
    <div className=" min-h-screen bg-[url('/bg.avif')] bg-cover bg-center bg-no-repeat bg-slate-200 text-black ">
      <Navbar/>
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchHospitals}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Find Hospitals
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-600">Loading hospitals...</p>}

      <div>
        <h2 className="text-xl font-semibold mb-4">Closest Hospitals</h2>
        {hospitals.length === 0 ? (
          <p className="text-gray-500">No hospitals found. Enter an address to search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital, index) => (
              <div key={index} className="border border-gray-300 rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transition">
                <img src={getRandomImage()} alt="Hospital" className="w-full h-40 object-cover" />

                <div className="p-4">
                  <h3 className="text-lg font-bold text-blue-700">{hospital.name}</h3>
                  <p className="text-gray-600"><strong>Address:</strong> {hospital.address}</p>
                  <p className="text-gray-600"><strong>Rate:</strong> {hospital.rating || "N/A"}</p>
                  
                  <button
                    onClick={() => renderMap(hospital)}
                    className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedHospital && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Location of {selectedHospital.name}</h2>
          <div id="map" className="w-full h-96 border rounded-lg shadow-md"></div>
        </div>
      )}
    </div>
    
    </div>
  );
};

export default HospitalList;