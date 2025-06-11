import React, { useEffect, useState } from 'react';
import './HospitalView.css';

const HospitalView = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedHospitals, setSearchedHospitals] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation(pos.coords);
          setGeoError(null);
        },
        err => {
          setUserLocation(null);
          setGeoError(err.message);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      if (!userLocation) {
        setHospitals([]);
        setLoading(false);
        return;
      }
      setLoading(true);

      // Overpass QL: find hospitals within 5km of user
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:5000,${userLocation.latitude},${userLocation.longitude});
          way["amenity"="hospital"](around:5000,${userLocation.latitude},${userLocation.longitude});
          relation["amenity"="hospital"](around:5000,${userLocation.latitude},${userLocation.longitude});
        );
        out center 20;
      `;
      const url = "https://overpass-api.de/api/interpreter";
      try {
        const res = await fetch(url, {
          method: "POST",
          body: query,
          headers: { "Content-Type": "text/plain" }
        });
        const data = await res.json();
        // Map and filter results, sort by distance
        const hospitalsWithDistance = data.elements
          .map(el => {
            const lat = el.lat || (el.center && el.center.lat);
            const lon = el.lon || (el.center && el.center.lon);
            if (!lat || !lon) return null;
            // Calculate distance to user
            const dLat = (lat - userLocation.latitude) * Math.PI / 180;
            const dLon = (lon - userLocation.longitude) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(userLocation.latitude * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distance = 6371 * c; // km
            return {
              name: el.tags && el.tags.name ? el.tags.name : "Unknown Hospital",
              lat,
              lon,
              address: el.tags && el.tags["addr:full"] ? el.tags["addr:full"] : "",
              distance
            };
          })
          .filter(Boolean)
          .sort((a, b) => a.distance - b.distance);
        setHospitals(hospitalsWithDistance);
      } catch (e) {
        setHospitals([]);
      }
      setLoading(false);
    };
    fetchHospitals();
  }, [userLocation]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchedHospitals([]);
      return;
    }
    const found = hospitals.filter(h =>
      h.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    if (found.length > 0) {
      setSearchedHospitals([found[0]]); // Show only the first match
    } else {
      setSearchedHospitals(hospitals.slice(0, 3)); // Show 3 nearest if not found
    }
  };

  return (
    <div className="hospital-container">
      <h2>Find a Hospital by Name</h2>
      <form onSubmit={handleSearch} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Enter hospital name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '0.7rem 1rem',
            borderRadius: '8px',
            border: '1px solid #b0b0b0',
            width: '60%',
            fontSize: '1rem',
            marginRight: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.7rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            background: '#2d6cdf',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>
      {loading && <p>Loading hospitals...</p>}
      {!loading && !userLocation && (
        <p>
          Location not available. {geoError ? `Reason: ${geoError}` : 'Please allow location access.'}
        </p>
      )}
      {!loading && userLocation && (searchedHospitals.length === 0 && hospitals.length === 0) && <p>No hospitals found nearby.</p>}
      <ul>
        {(searchedHospitals.length > 0 ? searchedHospitals : hospitals.slice(0, 3)).map((h, idx) => (
          <li key={idx}>
            <b>{h.name}</b><br />
            {h.address}<br />
            {h.distance && <span>Distance: {h.distance.toFixed(2)} km<br /></span>}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lon}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalView;