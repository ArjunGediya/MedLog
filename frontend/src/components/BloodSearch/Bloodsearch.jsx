import React, { useRef, useState } from "react";
import "./Bloodsearch.css";

function BloodSearch() {
  // const [bloodGroup, setBloodGroup] = useState("");
  // const [taluka, setTaluka] = useState("");
  // const [district, setDistrict] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const bloodGroup = useRef();
  const taluka = useRef();
  const district = useRef();

  const handleSearch = async (e) => {
    // const bloodGroup = blood.current.value;
    // const taluka = tal.current.value;
    // const district = dist.current.value;
    e.preventDefault();

    const queryParams = {
      bloodGroup: bloodGroup.current.value,
      taluka: taluka.current.value,
      district: district.current.value,
    };
    console.log(queryParams);

    const apiUrl = "/api/v1/Patient-Tracker/Patient/bloodSearch";
    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = `${apiUrl}?${queryString}`;
    console.log(fullUrl);
    try {
      const response = await fetch(fullUrl)
        .then((res) => res.json())
        .then((res) => {
          console.log("Result:", res);
          setSearchResults(res.Information);
        });
      // if (response.ok) {
      //   const data = await response.json();
      //   setSearchResults(data);
      // } else {
      //   console.error("Blood Search failed:", response.statusText);
      // }
    } catch (error) {
      console.error("Blood Search error:", error);
    }

    // const dummyPatients = [
    //   { name: "John Doe", mobileNumber: "1234567890" },
    //   { name: "Jane Doe", mobileNumber: "9876543210" },
    // ];

    // const filteredPatients = dummyPatients.filter(
    //   (patient) =>
    //     patient.bloodGroup === bloodGroup &&
    //     patient.taluka === taluka &&
    //     patient.district === district
    // );

    // setPatients(filteredPatients);
  };

  return (
    <>
      <div className="blood-search-container">
        <h2>Find Blood</h2>
        <form onSubmit={handleSearch}>
          <div>
            <label>Blood Group:</label>
            <input
              ref={bloodGroup}
              type="text"
              // value={bloodGroup}
              // onChange={(e) => setBloodGroup(e.target.value)}
            />
          </div>
          <div>
            <label>Taluka:</label>
            <input
              ref={taluka}
              type="text"
              // value={taluka}
              // onChange={(e) => setTaluka(e.target.value)}
            />
          </div>
          <div>
            <label>District:</label>
            <input
              ref={district}
              type="text"
              // value={district}
              // onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="patient-list">
        <h3>Blood Matchers</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BloodSearch;
