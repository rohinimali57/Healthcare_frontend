import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientArea from "../../PatientLandingPage/PatientLandingPageArea/PatientLandingPageArea";

const PatientProfileArea = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [website, setWebsite] = useState("");
  const [file, setFile] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const patientId = localStorage.getItem("patient_id");

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(
        `http://35.154.170.24:8080/api/patients/${patientId}`
      );
      const {
        name,
        email,
        phone,
        firstname,
        lastname,
        password,
        address,
        city,
        state,
        country,
        zip,
        speciality,
        website,
      } = response.data;
      setName(name);
      setEmail(email);
      setFirstName(firstname);
      setLastName(lastname);
      setPassword(password);
      setPhone(phone);
      setAddress(address);
      setCity(city);
      setState(state);
      setCountry(country);
      setZip(zip);
      setSpeciality(speciality);
      setWebsite(website);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("zip", zip);
      formData.append("speciality", speciality);
      formData.append("website", website);
      if (file) {
        formData.append("photo", file);
      }

      await axios.put(
        `http://35.154.170.24:8080/api/patients/${patientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchPatientData();
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating patient profile:", error);
    } finally {
      setFile(null);
    }
  };

  return (
    <>
      {/* <h2 className="text-center mb-80">Welcome {firstName}</h2> */}

      <div className="col py-3">
        <section className="login-area pt-50 pb-80">
          <div className="container-fluid">
            <div className="row flex-nowrap">
              <div
                class="col-auto col-md-3 col-xl-2 px-sm-2  "
                style={{ backgroundColor: "#223645" }}
              >              <br></br>
                <PatientArea />
              </div>
              <div className="col-lg-9  justify-content-center">
                  <div className="basic-login">
                    <h2 className="text-center mb-60 " > Welcome {firstName}
                    </h2>
                     <br></br>
                    <form>
                      <div className="mb-2">
                        <label htmlFor="name" className="mb-2">
                          <h5 className="theme-color">
                            First Name<span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          // id="name"
                          type="text"
                          placeholder="Enter Name..."
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="name" className="mb-2">
                          <h5 className="theme-color">
                            Last Name<span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          // id="name"
                          type="text"
                          placeholder="Enter Name..."
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="password" className="mb-2">
                          <h5 className="theme-color">
                            Password<span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          // id="name"
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <label htmlFor="email-id" className="mb-2">
                        <h5 className="theme-color">
                          Email Address <span>*</span>
                        </h5>
                      </label>
                      <input
                        required
                        id="email-id"
                        type="email"
                        placeholder="Enter Email address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <div className="mb-2">
                        <label htmlFor="phone" className="mb-2">
                          <h5 className="theme-color">
                            number <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="phone"
                          type="tel"
                          placeholder="Enter Mobile number..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="address" className="mb-2">
                          <h5 className="theme-color">
                            Address <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="address"
                          type="text"
                          placeholder="Enter Address..."
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <label htmlFor="city" className="mb-2">
                            <h5 className="theme-color">
                              City <span>*</span>
                            </h5>
                          </label>
                          <input
                            required
                            id="city"
                            type="text"
                            value={city}
                            placeholder="Enter City..."
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>

                        <div className="col-md-6 mb-2">
                          <label htmlFor="state" className="mb-2">
                            <h5 className="theme-color">
                              State <span>*</span>
                            </h5>
                          </label>
                          <input
                            required
                            id="state"
                            type="text"
                            value={state}
                            placeholder="Enter State..."
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-2">
                        <label htmlFor="country" className="mb-2">
                          <h5 className="theme-color">
                            Country <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="country"
                          type="text"
                          value={country}
                          placeholder="Enter country..."
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <label htmlFor="zip" className="mb-2">
                          <h5 className="theme-color">
                            Post Code <span>*</span>
                          </h5>
                        </label>
                        <input
                          required
                          id="zip"
                          type="text"
                          value={zip}
                          placeholder="Enter Zip Code..."
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="checkout-form-list">
                            <label>
                              <h5 className="theme-color">
                                Upload Image <span className="required">*</span>
                              </h5>
                            </label>
                            <input
                              type="file"
                              name="photo"
                              onChange={(e) => {
                                setFile(e.target.files[0]);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 text-center mt-40 form-group">
                        <button
                          type="submit"
                          className="primary_btn btn-icon-green w-50"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {updateSuccess && (
        <div style={{ color: "green", textAlign: "center" }}>
          Patient profile updated successfully!
        </div>
      )}
    </>
  );
};

export default PatientProfileArea;
