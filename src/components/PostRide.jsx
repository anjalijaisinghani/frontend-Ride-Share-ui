
// import React, { useState, useRef } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import API_BASE_URL from "../api";
// import "./PostRide.css";

// const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_KEY || "";

// const PostRide = () => {
//   const [step, setStep] = useState(1);
//   const [rideData, setRideData] = useState({
//     source: "",
//     destination: "",
//     fare: "",
//     date: "",
//     availableSeats: "",
//     price: "",
//     pickupLocations: Array(4).fill({ address: "", lat: null, lon: null }),
//     dropLocations: Array(4).fill({ address: "", lat: null, lon: null }),
//     vehicleNumber: "",
//     licenseNumber: "",
//     vehicleAge: "",
//     vehicleType: "",
//     vehicleModel: "",
//     vehicleImage: "",
//   });

//   const [suggestions, setSuggestions] = useState({});
//   const debounceRef = useRef({});

//   // ------------------------- Helpers -------------------------
//   const updateSimpleField = (name, value) =>
//     setRideData((p) => ({ ...p, [name]: value }));

//   const updateArrayField = (type, index, newObj) => {
//     setRideData((p) => {
//       const arr = [...p[type]];
//       arr[index] = { ...arr[index], ...newObj };
//       return { ...p, [type]: arr };
//     });
//   };

//   // ------------------------- Location Suggestions -------------------------
//   const fetchSuggestions = (query, index, type) => {
//     if (!LOCATIONIQ_KEY) {
//       console.error("❌ Missing LocationIQ key in .env");
//       return;
//     }

//     if (!query || query.trim().length < 3) {
//       setSuggestions((s) => ({ ...s, [`${type}-${index}`]: [] }));
//       return;
//     }

//     const key = `${type}-${index}`;
//     if (debounceRef.current[key]) clearTimeout(debounceRef.current[key]);

//     debounceRef.current[key] = setTimeout(async () => {
//       try {
//         const res = await axios.get("https://api.locationiq.com/v1/autocomplete.php", {
//           params: {
//             key: LOCATIONIQ_KEY,
//             q: query,
//             limit: 6,
//             normalizecity: 1,
//             countrycodes: "IN",
//           },
//         });
//         setSuggestions((s) => ({ ...s, [key]: res.data }));
//       } catch (err) {
//         console.error("LocationIQ error:", err?.response || err.message);
//         setSuggestions((s) => ({ ...s, [key]: [] }));
//       }
//     }, 300);
//   };

//   const handleArrayInput = (type, index, value) => {
//     updateArrayField(type, index, { address: value, lat: null, lon: null });
//     fetchSuggestions(value, index, type);
//   };

//   const handleSelectSuggestion = (type, index, suggestion) => {
//     const address = suggestion.display_name || suggestion.name || suggestion.address;
//     const lat = suggestion.lat || suggestion.latitude || null;
//     const lon = suggestion.lon || suggestion.longitude || null;
//     updateArrayField(type, index, { address, lat, lon });
//     setSuggestions((s) => ({ ...s, [`${type}-${index}`]: [] }));
//   };

//   // ------------------------- File Upload -------------------------
//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => updateSimpleField("vehicleImage", reader.result);
//     reader.readAsDataURL(file);
//   };

//   // ------------------------- Validation -------------------------
//   const validateStep = () => {
//     if (step === 1)
//       return (
//         rideData.source.trim() &&
//         rideData.destination.trim() &&
//         rideData.fare &&
//         rideData.date &&
//         rideData.availableSeats &&
//         rideData.price
//       );

//     if (step === 2) {
//       const pickups = rideData.pickupLocations.map((p) => (p.address || "").trim());
//       const drops = rideData.dropLocations.map((d) => (d.address || "").trim());
//       const allPickFilled = pickups.every(Boolean);
//       const allDropFilled = drops.every(Boolean);
//       const pickUnique = new Set(pickups).size === pickups.length;
//       const dropUnique = new Set(drops).size === drops.length;
//       return allPickFilled && allDropFilled && pickUnique && dropUnique;
//     }

//     if (step === 3)
//       return (
//         rideData.vehicleNumber.trim() &&
//         rideData.licenseNumber.trim() &&
//         rideData.vehicleAge &&
//         rideData.vehicleType.trim() &&
//         rideData.vehicleModel.trim() &&
//         rideData.vehicleImage
//       );

//     return false;
//   };

//   // ------------------------- Submit Ride -------------------------
//   const handleSubmit = async () => {
//     if (!validateStep()) {
//       Swal.fire("⚠️ Please complete all required fields before submitting.");
//       return;
//     }

//     const driverEmail = localStorage.getItem("driverEmail");
//     if (!driverEmail) {
//       Swal.fire("❌ Driver email not found!", "Please log in again.", "error");
//       return;
//     }

//     // ✅ Convert arrays to JSON strings (backend expects String)
//     const payload = {
//       source: rideData.source,
//       destination: rideData.destination,
//       farePerKm: rideData.fare,
//       date: rideData.date,
//       availableSeats: rideData.availableSeats,
//       totalPrice: rideData.price,
//       pickupLocations: JSON.stringify(rideData.pickupLocations.map((p) => p.address)),
//       dropLocations: JSON.stringify(rideData.dropLocations.map((d) => d.address)),
//       vehicleNumber: rideData.vehicleNumber,
//       licenseNumber: rideData.licenseNumber,
//       vehicleAge: rideData.vehicleAge,
//       vehicleType: rideData.vehicleType,
//       vehicleModel: rideData.vehicleModel,
//       vehicleImagePath: rideData.vehicleImage,
//     };

//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/rides/add?driverEmail=${encodeURIComponent(driverEmail)}`,
//         payload
//       );

//       Swal.fire("✅ Ride posted successfully!");
//       console.log("✅ Ride Added:", res.data);

//       // Reset form
//       setStep(1);
//       setRideData({
//         source: "",
//         destination: "",
//         fare: "",
//         date: "",
//         availableSeats: "",
//         price: "",
//         pickupLocations: Array(4).fill({ address: "", lat: null, lon: null }),
//         dropLocations: Array(4).fill({ address: "", lat: null, lon: null }),
//         vehicleNumber: "",
//         licenseNumber: "",
//         vehicleAge: "",
//         vehicleType: "",
//         vehicleModel: "",
//         vehicleImage: "",
//       });
//     } catch (err) {
//       console.error("❌ Ride post error:", err?.response || err.message);
//       Swal.fire({
//         icon: "error",
//         title: "❌ Error posting ride!",
//         text:
//           err?.response?.data?.message ||
//           err?.response?.data ||
//           err?.message ||
//           "Something went wrong. Please try again.",
//       });
//     }
//   };

//   // ------------------------- Step Rendering -------------------------
//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="form-step">
//             <h2>🚗 Step 1: Ride Info</h2>
//             <input
//               type="text"
//               placeholder="Enter Source"
//               value={rideData.source}
//               onChange={(e) => updateSimpleField("source", e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Enter Destination"
//               value={rideData.destination}
//               onChange={(e) => updateSimpleField("destination", e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Fare (₹ per km)"
//               value={rideData.fare}
//               onChange={(e) => updateSimpleField("fare", e.target.value)}
//             />
//             <input
//               type="date"
//               value={rideData.date}
//               onChange={(e) => updateSimpleField("date", e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Available Seats"
//               value={rideData.availableSeats}
//               onChange={(e) => updateSimpleField("availableSeats", e.target.value)}
//               min="1"
//             />
//             <input
//               type="number"
//               placeholder="Price per Seat (₹)"
//               value={rideData.price}
//               onChange={(e) => updateSimpleField("price", e.target.value)}
//               min="1"
//             />
//           </div>
//         );

//       case 2:
//         return (
//           <div className="form-step">
//             <h2>📍 Step 2: Pickup & Drop Options</h2>
//             <h4>Pickup Locations (4 options)</h4>
//             {rideData.pickupLocations.map((p, i) => (
//               <div key={i} className="autocomplete-container">
//                 <input
//                   placeholder={`Pickup Location ${i + 1}`}
//                   value={p.address}
//                   onChange={(e) => handleArrayInput("pickupLocations", i, e.target.value)}
//                 />
//                 {suggestions[`pickupLocations-${i}`]?.length > 0 && (
//                   <ul className="suggestions-list">
//                     {suggestions[`pickupLocations-${i}`].map((sugg, idx) => (
//                       <li
//                         key={idx}
//                         onClick={() => handleSelectSuggestion("pickupLocations", i, sugg)}
//                       >
//                         {sugg.display_name}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}

//             <h4>Drop Locations (4 options)</h4>
//             {rideData.dropLocations.map((d, i) => (
//               <div key={i} className="autocomplete-container">
//                 <input
//                   placeholder={`Drop Location ${i + 1}`}
//                   value={d.address}
//                   onChange={(e) => handleArrayInput("dropLocations", i, e.target.value)}
//                 />
//                 {suggestions[`dropLocations-${i}`]?.length > 0 && (
//                   <ul className="suggestions-list">
//                     {suggestions[`dropLocations-${i}`].map((sugg, idx) => (
//                       <li
//                         key={idx}
//                         onClick={() => handleSelectSuggestion("dropLocations", i, sugg)}
//                       >
//                         {sugg.display_name}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//           </div>
//         );

//       case 3:
//         return (
//           <div className="form-step">
//             <h2>🚙 Step 3: Vehicle Details</h2>
//             <input
//               type="text"
//               placeholder="Vehicle Number"
//               value={rideData.vehicleNumber}
//               onChange={(e) => updateSimpleField("vehicleNumber", e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="License Number"
//               value={rideData.licenseNumber}
//               onChange={(e) => updateSimpleField("licenseNumber", e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Vehicle Age"
//               value={rideData.vehicleAge}
//               onChange={(e) => updateSimpleField("vehicleAge", e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Vehicle Type (Car, Bike, etc.)"
//               value={rideData.vehicleType}
//               onChange={(e) => updateSimpleField("vehicleType", e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Vehicle Model"
//               value={rideData.vehicleModel}
//               onChange={(e) => updateSimpleField("vehicleModel", e.target.value)}
//             />
//             <label>Upload Vehicle Image:</label>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             {rideData.vehicleImage && (
//               <img
//                 src={rideData.vehicleImage}
//                 alt="Vehicle Preview"
//                 style={{
//                   width: "100%",
//                   height: "200px",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                   marginTop: "10px",
//                 }}
//               />
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="postride-container">
//       <div className="form-card">
//         <div className="step-indicator">Step {step} of 3</div>
//         {renderStep()}
//         <div className="form-buttons">
//           {step < 3 && (
//             <button className="next-btn" onClick={() => setStep(step + 1)} disabled={!validateStep()}>
//               Next →
//             </button>
//           )}
//           {step === 3 && (
//             <button className="submit-btn" onClick={handleSubmit} disabled={!validateStep()}>
//               ✅ Submit Ride
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostRide;



// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import API_BASE_URL from "../api";
// import "./PostRide.css";

// const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_KEY || "";

// const PostRide = () => {
//   const [step, setStep] = useState(1);
//   const [rideData, setRideData] = useState({
//     source: "",
//     destination: "",
//     baseFare: "",
//     fare: "",
//     totalFare: "",
//     date: "",
//     availableSeats: "",
//     pickupLocations: Array(4).fill({ address: "", lat: null, lon: null }),
//     dropLocations: Array(4).fill({ address: "", lat: null, lon: null }),
//     vehicleNumber: "",
//     licenseNumber: "",
//     vehicleAge: "",
//     vehicleType: "",
//     vehicleModel: "",
//     vehicleImage: "",
//   });

//   const [suggestions, setSuggestions] = useState({});
//   const debounceRef = useRef({});

//   // 🔹 Helper for updating state
//   const updateSimpleField = (name, value) =>
//     setRideData((p) => ({ ...p, [name]: value }));

//   const updateArrayField = (type, index, newObj) => {
//     setRideData((p) => {
//       const arr = [...p[type]];
//       arr[index] = { ...arr[index], ...newObj };
//       return { ...p, [type]: arr };
//     });
//   };

//   // -------------------------------------------------------
//   // 🏙️ FETCH CITY SUGGESTIONS (only city names)
//   // -------------------------------------------------------
//   const fetchCitySuggestions = (query, fieldName) => {
//     if (!query || query.trim().length < 2) {
//       setSuggestions((s) => ({ ...s, [fieldName]: [] }));
//       return;
//     }

//     if (debounceRef.current[fieldName]) clearTimeout(debounceRef.current[fieldName]);

//     debounceRef.current[fieldName] = setTimeout(async () => {
//       try {
//         const res = await axios.get("https://api.locationiq.com/v1/autocomplete.php", {
//           params: {
//             key: LOCATIONIQ_KEY,
//             q: query,
//             countrycodes: "IN",
//             tag: "place:city",
//             limit: 6,
//           },
//         });
//         setSuggestions((s) => ({
//           ...s,
//           [fieldName]: res.data.map((item) => ({
//             name: item.display_name.split(",")[0],
//             lat: item.lat,
//             lon: item.lon,
//           })),
//         }));
//       } catch (err) {
//         console.error("City suggestion error:", err);
//         setSuggestions((s) => ({ ...s, [fieldName]: [] }));
//       }
//     }, 300);
//   };

//   const handleCitySelect = (fieldName, city) => {
//     updateSimpleField(fieldName, city.name);
//     setSuggestions((s) => ({ ...s, [fieldName]: [] }));
//     if (fieldName === "source")
//       updateSimpleField("sourceCoords", { lat: city.lat, lon: city.lon });
//     if (fieldName === "destination")
//       updateSimpleField("destCoords", { lat: city.lat, lon: city.lon });
//   };

//   // -------------------------------------------------------
//   // 📏 AUTO CALCULATE TOTAL FARE WHEN DATA CHANGES
//   // -------------------------------------------------------
//   useEffect(() => {
//     const calculateFare = async () => {
//       const { baseFare, fare, sourceCoords, destCoords } = rideData;
//       if (
//         baseFare &&
//         fare &&
//         sourceCoords?.lat &&
//         destCoords?.lat &&
//         LOCATIONIQ_KEY
//       ) {
//         try {
//           const res = await axios.get(
//             `https://us1.locationiq.com/v1/directions/driving/${sourceCoords.lon},${sourceCoords.lat};${destCoords.lon},${destCoords.lat}.json`,
//             { params: { key: LOCATIONIQ_KEY } }
//           );

//           const distanceKm = res.data.routes[0].distance / 1000;
//           const totalFare = parseFloat(baseFare) + parseFloat(fare) * distanceKm;
//           updateSimpleField("totalFare", totalFare.toFixed(2));
//         } catch (err) {
//           console.error("Distance calculation failed:", err);
//         }
//       }
//     };
//     calculateFare();
//   }, [rideData.baseFare, rideData.fare, rideData.source, rideData.destination]);

//   // -------------------------------------------------------
//   // 🧾 SUBMIT FUNCTION (unchanged backend logic)
//   // -------------------------------------------------------
//   const handleSubmit = async () => {
//     const driverEmail = localStorage.getItem("driverEmail");
//     if (!driverEmail) {
//       Swal.fire("❌ Driver email not found!", "Please log in again.", "error");
//       return;
//     }

//     const payload = {
//       source: rideData.source,
//       destination: rideData.destination,
//       farePerKm: rideData.fare,
//       date: rideData.date,
//       availableSeats: rideData.availableSeats,
//       totalPrice: rideData.totalFare,
//       pickupLocations: JSON.stringify(
//         rideData.pickupLocations.map((p) => p.address)
//       ),
//       dropLocations: JSON.stringify(
//         rideData.dropLocations.map((d) => d.address)
//       ),
//       vehicleNumber: rideData.vehicleNumber,
//       licenseNumber: rideData.licenseNumber,
//       vehicleAge: rideData.vehicleAge,
//       vehicleType: rideData.vehicleType,
//       vehicleModel: rideData.vehicleModel,
//       vehicleImagePath: rideData.vehicleImage,
//     };

//     try {
//       await axios.post(
//         `${API_BASE_URL}/rides/add?driverEmail=${encodeURIComponent(driverEmail)}`,
//         payload
//       );
//       Swal.fire("✅ Ride posted successfully!");
//       setStep(1);
//     } catch (err) {
//       Swal.fire("❌ Error posting ride!", err.message, "error");
//     }
//   };

//   // -------------------------------------------------------
//   // 🧱 FORM STEPS
//   // -------------------------------------------------------
//   const renderStep = () => {
//     if (step === 1) {
//       return (
//         <div className="form-step">
//           <h2>🚗 Step 1: Ride Info</h2>

//           {/* Source */}
//           <input
//             type="text"
//             placeholder="Enter Source City"
//             value={rideData.source}
//             onChange={(e) => {
//               updateSimpleField("source", e.target.value);
//               fetchCitySuggestions(e.target.value, "source");
//             }}
//           />
//           {suggestions.source?.length > 0 && (
//             <ul className="suggestions-list">
//               {suggestions.source.map((city, idx) => (
//                 <li key={idx} onClick={() => handleCitySelect("source", city)}>
//                   {city.name}
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* Destination */}
//           <input
//             type="text"
//             placeholder="Enter Destination City"
//             value={rideData.destination}
//             onChange={(e) => {
//               updateSimpleField("destination", e.target.value);
//               fetchCitySuggestions(e.target.value, "destination");
//             }}
//           />
//           {suggestions.destination?.length > 0 && (
//             <ul className="suggestions-list">
//               {suggestions.destination.map((city, idx) => (
//                 <li key={idx} onClick={() => handleCitySelect("destination", city)}>
//                   {city.name}
//                 </li>
//               ))}
//             </ul>
//           )}

//           <input
//             type="number"
//             placeholder="Base Fare (₹)"
//             value={rideData.baseFare}
//             onChange={(e) => updateSimpleField("baseFare", e.target.value)}
//           />

//           <input
//             type="number"
//             placeholder="Fare per KM (₹)"
//             value={rideData.fare}
//             onChange={(e) => updateSimpleField("fare", e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Total Fare (Auto-calculated)"
//             value={rideData.totalFare}
//             readOnly
//           />

//           <input
//             type="date"
//             value={rideData.date}
//             onChange={(e) => updateSimpleField("date", e.target.value)}
//           />

//           <input
//             type="number"
//             placeholder="Available Seats"
//             value={rideData.availableSeats}
//             onChange={(e) => updateSimpleField("availableSeats", e.target.value)}
//           />
//         </div>
//       );
//     }

//     // Step 2 and 3 remain same as your code...
//     return null;
//   };

//   return (
//     <div className="postride-container">
//       <div className="form-card">
//         <div className="step-indicator">Step {step} of 3</div>
//         {renderStep()}
//         <div className="form-buttons">
//           {step < 3 && (
//             <button onClick={() => setStep(step + 1)}>Next →</button>
//           )}
//           {step === 3 && (
//             <button onClick={handleSubmit}>✅ Submit Ride</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostRide;



import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../api";
import "./PostRide.css";

const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_KEY || "";

export default function PostRide({ driverEmail }) {
  const [step, setStep] = useState(1);

  // Step 1: Ride info
  const [rideInfo, setRideInfo] = useState({
    sourceCity: "",
    destinationCity: "",
    baseFare: "",
    farePerKm: "",
    distance: "",
    totalFare: "",
    date: "",
  });

  // Step 2: Locations
  const [pickupLocations, setPickupLocations] = useState([""]);
  const [dropLocations, setDropLocations] = useState([""]);

  // Step 3: Vehicle info
  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    licenseNumber: "",
    availableSeats: "",
  });
  const [vehicleImages, setVehicleImages] = useState([]);

  // Suggestions
  const [citySuggestions, setCitySuggestions] = useState({ source: [], dest: [] });
  const [pickupSuggestions, setPickupSuggestions] = useState({});
  const [dropSuggestions, setDropSuggestions] = useState({});

  // Fetch city suggestions
  const fetchCitySuggestions = async (query, type) => {
    if (!query) return;
    try {
      const res = await axios.get(
        `https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_KEY}&q=${query}&limit=5&countrycodes=in`
      );
      const cities = [
        ...new Set(res.data.map((item) => item.address.city || item.address.state || item.display_name)),
      ];
      setCitySuggestions((prev) => ({ ...prev, [type]: cities }));
    } catch (err) {
      console.error("City suggestion error:", err);
    }
  };

  // Fetch address suggestions per city & field index
  const fetchAddressSuggestions = async (city, query, type, index) => {
    if (!city || !query.trim()) return;
    try {
      const res = await axios.get(
        `https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_KEY}&q=${query}+${city}&limit=5&countrycodes=in`
      );
      const addresses = res.data.map((item) => item.display_name);

      if (type === "pickup")
        setPickupSuggestions((prev) => ({ ...prev, [index]: addresses }));
      else setDropSuggestions((prev) => ({ ...prev, [index]: addresses }));
    } catch (err) {
      console.error("Address suggestion error:", err);
    }
  };

  // Fare calculation
  // const handleFareChange = (e) => {
  //   const { name, value } = e.target;
  //   const updated = { ...rideInfo, [name]: value };
  //   if (updated.baseFare && updated.farePerKm) {
  //     updated.totalFare = (
  //       parseFloat(updated.baseFare) + parseFloat(updated.farePerKm) * 10
  //     ).toFixed(2);
  //   }
  //   setRideInfo(updated);
  // };

  // Fare calculation (with Distance included)
const handleFareChange = (e) => {
  const { name, value } = e.target;
  const updated = { ...rideInfo, [name]: value };

  // Auto calculate total fare when all values are present
  if (updated.baseFare && updated.farePerKm && updated.distance) {
    updated.totalFare = (
      parseFloat(updated.baseFare) +
      parseFloat(updated.farePerKm) * parseFloat(updated.distance)
    ).toFixed(2);
  } else {
    updated.totalFare = "";
  }

  setRideInfo(updated);
};


  // Navigation
  const handleNext = () => {
    if (
      step === 1 &&
      (!rideInfo.sourceCity ||
        !rideInfo.destinationCity ||
        !rideInfo.baseFare ||
        !rideInfo.farePerKm)||
        !rideInfo.distance ||
          !rideInfo.date
    ) {
      Swal.fire("Please complete Step 1 details");
      return;
    }
    if (step === 2 && (pickupLocations.length === 0 || dropLocations.length === 0)) {
      Swal.fire("Please enter at least one pickup and drop location");
      return;
    }
    setStep(step + 1);
  };
  const handlePrev = () => setStep(step - 1);

  // Add pickup/drop
  const addPickup = () => {
    if (pickupLocations.length < 4) setPickupLocations([...pickupLocations, ""]);
  };
  const addDrop = () => {
    if (dropLocations.length < 4) setDropLocations([...dropLocations, ""]);
  };

  // Change pickup/drop
  const handlePickupChange = (value, index) => {
    const updated = [...pickupLocations];
    updated[index] = value;
    setPickupLocations(updated);
  };
  const handleDropChange = (value, index) => {
    const updated = [...dropLocations];
    updated[index] = value;
    setDropLocations(updated);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (vehicleImages.length + files.length > 3) {
      Swal.fire("You can upload a maximum of 3 images.");
      return;
    }
    setVehicleImages([...vehicleImages, ...files]);
  };
  const removeImage = (index) => {
    const updated = vehicleImages.filter((_, i) => i !== index);
    setVehicleImages(updated);
  };

  // Submit
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("driverEmail", driverEmail);
      formData.append("sourceCity", rideInfo.sourceCity);
      formData.append("destinationCity", rideInfo.destinationCity);
      formData.append("distance", rideInfo.distance);
      formData.append("baseFare", rideInfo.baseFare);
      formData.append("farePerKm", rideInfo.farePerKm);
      formData.append("totalFare", Number(rideInfo.totalFare));

      formData.append("date", rideInfo.date);

      formData.append("pickupLocations", JSON.stringify(pickupLocations));
      formData.append("dropLocations", JSON.stringify(dropLocations));
      formData.append("vehicleNumber", vehicleData.vehicleNumber);

      formData.append("licenseNumber", vehicleData.licenseNumber);
      formData.append("availableSeats", vehicleData.availableSeats);
      vehicleImages.forEach((img) => formData.append("vehicleImages", img));

      await axios.post("http://localhost:8080/v1/rides/add", formData, 
  // headers: { "Content-Type": "multipart/form-data" },
);

      Swal.fire("Ride posted successfully!");
      setStep(1);
    } catch (err) {
      console.error(err);
      Swal.fire("Error posting ride!");
    }
  };

  return (

    
    <div className="postride-container">
      <h2 className="heading">🚘 Post a Ride</h2>

      {/* Step Indicators */}
      <div className="steps">
        <div className={`step ${step === 1 ? "active" : ""}`}>Step 1: Ride Info</div>
        <div className={`step ${step === 2 ? "active" : ""}`}>Step 2: Locations</div>
        <div className={`step ${step === 3 ? "active" : ""}`}>Step 3: Vehicle</div>
      </div>

      {/* ---------- Step 1 ---------- */}
    {step === 1 && (
  <div className="step-content">
    <div className="form-group">
      <label>Source City</label>
      <input
        type="text"
        name="sourceCity"
        value={rideInfo.sourceCity}
        onChange={(e) => {
          setRideInfo({ ...rideInfo, sourceCity: e.target.value });
          fetchCitySuggestions(e.target.value, "source");
        }}
        list="sourceCities"
        placeholder="Enter source city"
      />
      <datalist id="sourceCities">
        {citySuggestions.source.map((c, i) => (
          <option key={i} value={c} />
        ))}
      </datalist>
    </div>

    <div className="form-group">
      <label>Destination City</label>
      <input
        type="text"
        name="destinationCity"
        value={rideInfo.destinationCity}
        onChange={(e) => {
          setRideInfo({ ...rideInfo, destinationCity: e.target.value });
          fetchCitySuggestions(e.target.value, "dest");
        }}
        list="destCities"
        placeholder="Enter destination city"
      />
      <datalist id="destCities">
        {citySuggestions.dest.map((c, i) => (
          <option key={i} value={c} />
        ))}
      </datalist>
    </div>

    <div className="form-group">
  <label>Ride Date</label>
  <input
    type="date"
    name="date"
    value={rideInfo.date}
    onChange={(e) => setRideInfo({ ...rideInfo, date: e.target.value })}
  />
</div>



    <div className="form-group">
      <label>Base Fare</label>
      <input
        type="number"
        name="baseFare"
        value={rideInfo.baseFare}
        onChange={handleFareChange}
      />
    </div>

    <div className="form-group">
      <label>Fare per KM</label>
      <input
        type="number"
        name="farePerKm"
        value={rideInfo.farePerKm}
        onChange={handleFareChange}
      />
    </div>

    {/* 👇 Added Distance input */}
    <div className="form-group">
      <label>Distance (in KM)</label>
      <input
        type="number"
        name="distance"
        value={rideInfo.distance || ""}
        onChange={handleFareChange}
        placeholder="Enter distance"
      />
    </div>

    <div className="form-group">
      <label>Total Fare (auto)</label>
      <input type="text" value={rideInfo.totalFare} readOnly />
    </div>
    
  </div>
)}

      {/* ---------- Step 2 ---------- */}
      {step === 2 && (
        <div className="step-content">
          <h3>Pickup Locations (City: {rideInfo.sourceCity})</h3>
          {pickupLocations.map((loc, i) => (
            <div key={i} className="form-group suggestions-container">
              <input
                type="text"
                placeholder={`Pickup Location ${i + 1}`}
                value={loc}
                onChange={(e) => {
                  handlePickupChange(e.target.value, i);
                  fetchAddressSuggestions(rideInfo.sourceCity, e.target.value, "pickup", i);
                }}
                autoComplete="off"
              />
              {pickupSuggestions[i]?.length > 0 && (
                <ul className="suggestions-list">
                  {pickupSuggestions[i].map((s, idx) => (
                    <li
                      key={idx}
                      className="suggestion-item"
                      onClick={() => {
                        handlePickupChange(s, i);
                        setPickupSuggestions((prev) => ({ ...prev, [i]: [] }));
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {pickupLocations.length < 4 && (
            <button className="add-btn" onClick={addPickup}>
              ➕ Add Pickup
            </button>
          )}

          <h3>Drop Locations (City: {rideInfo.destinationCity})</h3>
          {dropLocations.map((loc, i) => (
            <div key={i} className="form-group suggestions-container">
              <input
                type="text"
                placeholder={`Drop Location ${i + 1}`}
                value={loc}
                onChange={(e) => {
                  handleDropChange(e.target.value, i);
                  fetchAddressSuggestions(rideInfo.destinationCity, e.target.value, "drop", i);
                }}
                autoComplete="off"
              />
              {dropSuggestions[i]?.length > 0 && (
                <ul className="suggestions-list">
                  {dropSuggestions[i].map((s, idx) => (
                    <li
                      key={idx}
                      className="suggestion-item"
                      onClick={() => {
                        handleDropChange(s, i);
                        setDropSuggestions((prev) => ({ ...prev, [i]: [] }));
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {dropLocations.length < 4 && (
            <button className="add-btn" onClick={addDrop}>
              ➕ Add Drop
            </button>
          )}
        </div>
      )}

      {/* ---------- Step 3 ---------- */}
      {step === 3 && (
        <div className="step-content">
          <div className="form-group">
            <label>Vehicle Number</label>
            <input
              type="text"
              value={vehicleData.vehicleNumber}
              onChange={(e) => setVehicleData({ ...vehicleData, vehicleNumber: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>License Number</label>
            <input
              type="text"
              value={vehicleData.licenseNumber}
              onChange={(e) => setVehicleData({ ...vehicleData, licenseNumber: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Available Seats</label>
            <input
              type="number"
              value={vehicleData.availableSeats}
              onChange={(e) => setVehicleData({ ...vehicleData, availableSeats: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Upload Vehicle Images (max 3)</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
            <div className="image-preview">
              {vehicleImages.map((img, i) => (
                <div key={i} className="image-box">
                  <img src={URL.createObjectURL(img)} alt="vehicle" />
                  <button onClick={() => removeImage(i)}>❌</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------- Navigation Buttons ---------- */}
      <div className="nav-buttons">
        {step > 1 && (
          <button onClick={handlePrev} className="btn prev">
            ⬅ Previous
          </button>
        )}
        {step < 3 && (
          <button onClick={handleNext} className="btn next">
            Next ➡
          </button>
        )}
        {step === 3 && (
          <button onClick={handleSubmit} className="btn submit">
            ✅ Submit Ride
          </button>
        )}

      </div>

    </div>
  );
}
