import React, { useState, useEffect, useRef } from "react";
import "./Hospital.css";
import Profile from "../../assets/Profile.png";

let data;
function Hospital() {
  const [userDetails, setUserDetails] = useState(null);
  // // const [medicaldata, setMedicaldata] = useState(null);

  const [searchResults, setSearchResults] = useState([]);

  const aadharNumber = useRef();
    const fileRef = useRef();


  const handleSearch = async (e) => {
    e.preventDefault();

    const queryParams = {
      patientAadharcardNumber: aadharNumber.current.value,
    };
    // console.log(queryParams);

    const apiUrl = "/api/v1/Patient-Tracker/Hospital/ReadMedicalData";
    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = `${apiUrl}?${queryString}`;
    console.log(fullUrl);
    try {
      const response = await fetch(fullUrl)
        .then((res) => res.json())
        .then((res) => {
          console.log("Result:", res);
          console.log("Result:", res.patientInformation);
          setSearchResults(res.patientInformation);
        });
    } catch (error) {
      console.error("Data Search error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);    
    try {
      // let response;
      console.log(data);
      fetch("/api/v1/Patient-Tracker/Hospital/CreateMedicalData", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log("Record Insert Time Error: ", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/v1/Patient-Tracker/getUser", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          data = await response.json();
          console.log(data.user.name);
          setUserDetails(data.user);
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div id="profile">
              <img src={Profile} alt="profile" />
            </div>
            {/* <div className="p_name">
              <span id="pn">Kalpesh Patel</span>
            </div> */}
          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <p id="pn">{userDetails?.name}</p>
            </li>
            <li className="sidebar-list-items">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
                <p>
                  Taluka :<span> {userDetails?.taluka}</span>
                </p>
              </a>
            </li>
            <li className="sidebar-list-items">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
                <p>
                  District :<span> {userDetails?.district}</span>
                </p>
              </a>
            </li>
            <li className="sidebar-list-items">
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
                <p>
                  State :<span> {userDetails?.state}</span>
                </p>
              </a>
            </li>
          </ul>
        </div>

        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Search Patient Record</h1>
          </div>
          <div className="searchbox">
            <input
              ref={aadharNumber}
              name="aadharNumber"
              type="text"
              placeholder="Enter Aadhar Number"
              // value={aadharNumber}
              // onChange={handleInputChange}
              className="aadharinput"
            />
            <button className="aadharsearchButton" onClick={handleSearch}>
              Search
            </button>
          </div>

          {searchResults &&
            searchResults.map((patient, index) => (
              <div className="patientInfo" key={index}>
                <div className="infolabelname">Name:</div>
                <div className="infovaluename">{patient.name}</div>
                <div className="infolabelblood">Blood Group:</div>
                <div className="infovalueblood">{patient.bloodGroup}</div>
              </div>
            ))}

          <form className="add-record-form" onSubmit={handleSubmit}>
            <div className="form-group-add">
              <label htmlFor="aadharNumber">Aadhar Number:</label>
              <input type="text" id="aadharNumber" name="patientAadharNumber" />
            </div>
            <div className="form-group-add">
              <label htmlFor="diseaseDescription">Disease Description:</label>
              <input
                type="text"
                id="diseaseDescription"
                name="diseaseDescription"
              />
            </div>
            <div className="form-group-add">
              <label htmlFor="diagnosedByDoctor">Diagnosed By Doctor:</label>
              <input
                type="text"
                id="diagnosedByDoctor"
                name="diagonsedByDoctor"
              />
            </div>
            <div className="form-group-add">
              <label htmlFor="pdfFile">PDF File:</label>

              <input
                ref={fileRef}
                type="file"
                id="pdfFile"
                name="pdfFile"
              />
            </div>
            <button type="submit" className="submit-button">
              Add Record
            </button>
          </form>

          <div className="products-area-wrapper tableView">
            <div className="products-header">
              <div className="product-cell image">Disease</div>
              <div className="product-cell category">
                Date<button className="sort-button"></button>
              </div>
              <div className="product-cell status-cell">
                Diagnosed By Doctor<button className="sort-button"></button>
              </div>
              <div className="product-cell sales">
                Diagnosed By Hospital<button className="sort-button"></button>
              </div>
              <div className="product-cell stock">
                Attach File<button className="sort-button"></button>
              </div>
            </div>

            {searchResults &&
              searchResults.map((patient, patientIndex) => (
                <div key={patientIndex}>
                  {patient.MedicalData &&
                    patient.MedicalData.map((disease, diseaseIndex) => (
                      <div className="products-row" key={diseaseIndex}>
                        <div className="product-cell image">
                          <span>{disease.diseaseDescription}</span>
                        </div>
                        <div className="product-cell category">
                          <span>{disease.Date}</span>
                        </div>
                        <div className="product-cell sales">
                          <span>{disease.diagonsedByDoctor}</span>
                        </div>
                        <div className="product-cell stock">
                          <span>{disease.diagonsedByHospital}</span>
                        </div>
                        <div className="product-cell price">
                          <span>
                            <svg
                              id="download"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-download"
                              viewBox="0 0 16 16"
                            >
                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}

            {/* <div className="products-row">
              <div className="product-cell image">
                <span>Cancer</span>
              </div>
              <div className="product-cell category">
                <span>2024-01-03</span>
              </div>
              <div className="product-cell sales">
                <span>Dr. Smith</span>
              </div>
              <div className="product-cell stock">
                <span>General Hospital</span>
              </div>
              <div className="product-cell price">
                <span>
                  <svg
                    id="download"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                </span>
              </div>
            </div> */}

            {/* Other products-row elements go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hospital;
