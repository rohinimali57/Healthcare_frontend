import React from "react";

import { useState } from "react";
import Swal from "sweetalert2";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const insuranceProviders = [
  "Star Health",
  "Aditya Birla",
  "Kotak Mahindra",
  "Other",
];

const RegisteArea = (data) => {
  const [showPatientForm, setShowPatientForm] = useState(true);
  const [showProviderForm, setShowProviderForm] = useState(false);
  const navigate = useNavigate();

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  // const [insuranceProvider, setInsuranceProvider] = useState('');
  // const [customInsuranceProvider, setCustomInsuranceProvider] = useState('');
  const [policyNumber, setPolicyNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [sumAssured, setSumAssured] = useState("");

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [hasInsurance, setHasInsurance] = useState(true);


  const [website, setWebsite] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [customInsuranceProvider, setCustomInsuranceProvider] = useState("");

  const handlePatientClick = () => {
    setShowPatientForm(true);
    setShowProviderForm(false);
  };

  const handleProviderClick = () => {
    setShowProviderForm(true);
    setShowPatientForm(false);
  };

  // const { registerUser, googleSignIn } = useAuth();
  // const {handleSubmit, reset } = useForm();

  const handlePatientSignup = async (event) => {
    if (
      !fname ||
      !lname ||
      !dob ||
      !gender ||
      !username ||
      !email ||
      !password ||
      !phone ||
      !age ||
      !address
    ) {
      // Display an error message or perform any necessary action
      Swal.fire({
        text: "All Fields Required...",
        confirmButtonColor: "8fb569",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!/^[A-Za-z\s]+$/i.test(fname) || !/^[A-Za-z\s]+$/i.test(lname)) {
      return Swal.fire({
        icon: "error",
        text: "Invalid  Name . Only alphabets are allowed",
      });
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return Swal.fire({
        icon: "error",
        text: " invalid Email",
      });
    }
    if (password.length <= 8) {
      return Swal.fire({
        icon: "error",
        text: "Password must be at least 6 characters",
      });
    }
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      Swal.fire({
        icon: "error",
        // title: 'Oops...',
        text: "Invalid phone number",
      });
      return
    }
    if (age.length > 3) {
      return Swal.fire({
        icon: "error",
        // title: 'Oops...',
        text: "Invalid age ",
      });
    }
    if (!/^\d+$/.test(sumAssured)) {
      return Swal.fire({
        icon: "error",
        // title: 'Oops...',
        text: "Invalid amount",
      });
    }
    event.preventDefault();

    // Determine the insurance provider value to be passed
    const selectedInsuranceProvider =
      customInsuranceProvider || insuranceProvider;

    Axios.post("http://35.154.170.24:8080/registerpatient", {
      first_name: fname,
      last_name: lname,
      dob: dob,
      address: address,
      username: username,
      email: email,
      password: password,
      gender: gender,
      age: age,
      phone: phone,
      insurance_provider: selectedInsuranceProvider,
      sumAssured: sumAssured,
      expirationDate: expirationDate,
      policyNumber: policyNumber,
    })
      .then((response) => {
        const { patient_id, sessionId, message } = response.data;
        if (message) {
          console.log("Email already exists"); // Display the message in the console
          // TODO: Show the message in your UI (e.g., display an error message to the user)
          // Example:
          // errorMessageElement.textContent = "Email already exists";
          return;
        }
        if (sessionId === null) {
          console.log("null");
        }
        if (sessionId) {
          const sessionKey = Object.keys(sessionId)[0];
          const sessionExpirationTime = new Date(sessionId[sessionKey].expirationTime);
          localStorage.setItem("sessionKey", sessionKey);
          localStorage.setItem("sessionExpirationTime", sessionExpirationTime);
        }
        localStorage.setItem("patient_id", patient_id);
        sessionStorage.setItem("username", username);
        console.log("before==>", patient_id);
        if (data.data.result) {
          const { id, image, speciality, pname, price, discount, description } = data.data;
          console.log();
          navigate("/shopDetails", {
            state: { id, image, speciality, pname, price, discount, description },
          });
        } else {
          navigate("/patientprofile");
          Swal.fire({
            title: "Success!",
            text: "Sign Up Successful.",
            icon: "success",
            confirmButtonColor: "8fb569",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Oops...',
          text: "User already Exists.",
          icon: "error",
          confirmButtonColor: "8fb569",
          confirmButtonText: "OK",
        });
        console.error(error);
        console.log(error);

      });
  };

  const handleProviderSignup = async (event) => {
    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !country ||
      !zip ||
      !speciality ||
      !password ||
      !website
    ) {
      // Display an error message or perform any necessary action
      Swal.fire({
        text: "All Fields Requried...",
        confirmButtonColor: "8fb569",
        confirmButtonText: "OK",
      });
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return Swal.fire({
        icon: "error",
        text: "Email invalid",
      });
    }
    if (password.length < 8) {
      return Swal.fire({
        icon: "error",
        text: "Password must be at least 8 characters",
      });
    }
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      return Swal.fire({
        icon: "error",
        // title: 'Oops...',
        text: "Invalid phone number",
      });
    }
    if (zip.length < 6 || zip.length > 6) {
      return Swal.fire({
        icon: "error",
        // title: 'Oops...',
        text: "Invalid postcode",
      });
    }
    event.preventDefault();

    Axios.post("http://35.154.170.24:8080/providersignup", {
      name: name,
      phone: phone,
      email: email,
      address: address,
      city: city,
      state: state,
      country: country,
      password: password,
      zipcode: zip,
      speciality: speciality,
      website: website,
    })
      .then((response) => {
        const { provider_id, sessionId } = response.data;
        if (sessionId) {
          const sessionKey = Object.keys(sessionId)[0];
          const sessionExpirationTime = new Date(sessionId[sessionKey].expirationTime);
          localStorage.setItem("sessionKey", sessionKey);
          localStorage.setItem("sessionExpirationTime", sessionExpirationTime);
        }
        sessionStorage.setItem("name", name);
        localStorage.setItem("provider_id", provider_id);

        console.log("before==>", provider_id);

        navigate("/ProviderLandingPage");
        Swal.fire({
          title: "success!",
          text: "SignUp Successful..",
          icon: "success",
          confirmButtonColor: "8fb569",
          confirmButtonText: "OK",
        });
      })

      .catch((error) => {
        Swal.fire({
          title: 'Oops...',
          text: "User already Exists.",
          icon: "error",
          confirmButtonColor: "8fb569",
          confirmButtonText: "OK",
        });
        console.error(error);
      });
  };

  // Event handler for insurance provider dropdown
  const handleInsuranceProviderChange = (e) => {
    const selectedProvider = e.target.value;
    setInsuranceProvider(selectedProvider);
  };

  // Event handler for custom insurance provider input field
  const handleCustomInsuranceProviderChange = (e) => {
    const customProvider = e.target.value;
    setCustomInsuranceProvider(customProvider);
  };

  return (
    <>
      <div class="containersign">
        <div class="flex-column flex-sm-row">
          <button
            className={showPatientForm === true ? "tabs active-tabs" : "tabs"}
            onClick={handlePatientClick}
          >
            SIGNUP AS PATIENT
          </button>
          <button
            className={showProviderForm === true ? "tabs active-tabs" : "tabs"}
            onClick={handleProviderClick}
          >
            SIGNUP AS PROVIDER
          </button>
        </div>
      </div>

      {showPatientForm && (
        <section className="login-area pt-40 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Patient Signup Form</h3>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="fname" className="md-6">
                          First Name <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="fname"
                          type="text"
                          placeholder="Enter First Name..."
                          onChange={(e) => setFName(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="lname" className="md-6">
                          Last Name <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="lname"
                          type="text"
                          placeholder="Enter Last Name..."
                          onChange={(e) => setLName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="dob" className="mb-2">
                          Date of Birth <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="dob"
                          type="date"
                          placeholder="Enter Date of Birth..."
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="gender" className="mb-3">
                          Gender <span>*</span>
                        </label>
                        <select
                          style={{ marginTop: "-7px", height: "59px" }}
                          className="form-select select_style form-group"
                          required={true}
                          id="gender"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="phone" className="mb-2">
                          Contact Number <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="phone"
                          type="tel"
                          placeholder="Enter Phone number..."
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="age" className="mb-2">
                          Age <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="age"
                          type="number"
                          placeholder="Enter age"
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="username" className="mb-2">
                          Username <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="username"
                          type="text"
                          placeholder="Enter Username..."
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="pass" className="mb-2">
                          Password <span>*</span>
                        </label>
                        <input
                          required
                          id="pass"
                          type="password"
                          placeholder="Enter password..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="email-id" className="mb-2">
                          Email Address <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="email-id"
                          type="text"
                          placeholder="Enter Username or Email address..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="address" className="mb-2">
                          Address <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="address"
                          type="text"
                          placeholder="Enter Address..."
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Insurance Provider field */}
                    {/* Insurance Provider field */}
                    <div className="mb-2">
                      <label htmlFor="insuranceProvider" className="mb-2">
                        Do you have insurance? <span>*</span>
                      </label>
                      <select
                        required={true}
                        className="form-select select_style form-group"
                        id="insuranceProvider"
                        onChange={(e) => {
                          setInsuranceProvider(""); // Clear the selected insurance provider
                          setHasInsurance(e.target.value === "Yes");
                        }}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option> {/* Option for "No Insurance" */}
                      </select>
                    </div>


                    {/* Insurance Provider field */}
                    {hasInsurance && (
                      <div>
                        <div className="mb-2">
                          <label htmlFor="insuranceProvider" className="mb-2">
                            Insurance Provider <span>*</span>
                          </label>
                          <select
                            required={true}
                            className="form-select select_style form-group"
                            id="insuranceProvider"
                            onChange={handleInsuranceProviderChange}
                            disabled={!hasInsurance} // Disable if patient selects "No Insurance"
                          >
                            <option value="">Select Insurance Provider</option>
                            {insuranceProviders.map((provider, index) => (
                              <option key={index} value={provider}>
                                {provider}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Custom Insurance Provider field */}
                        {insuranceProvider === "Other" && (
                          <div className="mb-2">
                            <label
                              htmlFor="customInsuranceProvidercd    "
                              className="mb-2"
                            >
                              Insurance Provider Name <span>*</span>
                            </label>
                            <input
                              required={true}
                              id="customInsuranceProvider"
                              type="text"
                              placeholder="Enter Insurance Provider Name..."
                              onChange={handleCustomInsuranceProviderChange}
                            />
                          </div>
                        )}


                        {/* Custom Insurance Provider field */}
                        <div className="mb-2">
                          <label htmlFor="customInsuranceProvider" className="mb-2">
                            Insurance Provider Name <span>*</span>
                          </label>
                          <input
                            required={true}
                            id="customInsuranceProvider"
                            type="text"
                            placeholder="Enter Insurance Provider Name..."
                            onChange={handleCustomInsuranceProviderChange}
                          // disabled={!hasInsurance} // Disable if patient selects "No Insurance"
                          />
                        </div>


                        {/* Expiration Date field */}
                        <div className="mb-2">
                          <label htmlFor="expirationDate" className="mb-2">
                            Expiration Date <span>*</span>
                          </label>
                          <input
                            required={true}
                            id="expirationDate"
                            type="date"
                            placeholder="Enter Expiration Date..."
                            onChange={(e) => setExpirationDate(e.target.value)}
                          // disabled={!hasInsurance} // Disable if patient selects "No Insurance"
                          />
                        </div>

                        {/* Sum Assured field */}
                        <div className="mb-2">
                          <label htmlFor="sumAssured" className="mb-2">
                            Sum Assured <span>*</span>
                          </label>
                          <input
                            required={true}
                            id="sumAssured"
                            type="text"
                            placeholder="Enter Sum Assured..."
                            onChange={(e) => setSumAssured(e.target.value)}
                          // disabled={!hasInsurance} // Disable if patient selects "No Insurance"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-10"></div>
                    <button
                      type="submit"
                      className="primary_btn theme-btn-2 w-100"
                      onClick={handlePatientSignup}
                    >
                      Register Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {showProviderForm && (
        <section className="login-area pt-40 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Provider Signup Form</h3>
                  <form>
                    <div className="mb-2">
                      <label htmlFor="name" className="mb-2">
                        Hospital Name<span>*</span>
                      </label>
                      <input
                        required={true}
                        id="name"
                        type="text"
                        placeholder="Enter Name..."
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <label htmlFor="email-id" className="mb-2">
                      Hospital Email Address <span>*</span>
                    </label>
                    <input
                      required={true}
                      id="email-id"
                      type="email"
                      placeholder="Enter Email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="mb-2">
                      <label htmlFor="phone" className="mb-2">
                        Hospital Contact number <span>*</span>
                      </label>
                      <input
                        required={true}
                        id="phone"
                        type="tel"
                        placeholder="Enter Mobile number..."
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="address" className="mb-2">
                        Hospital Address <span>*</span>
                      </label>
                      <input
                        required={true}
                        id="address"
                        type="text"
                        placeholder="Enter Address..."
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="city" className="mb-2">
                          City <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="city"
                          type="text"
                          placeholder="Enter City..."
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="state" className="mb-2">
                          State <span>*</span>
                        </label>
                        <input
                          required={true}
                          id="state"
                          type="text"
                          placeholder="Enter State..."
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="country" className="mb-2">
                        Country <span>*</span>
                      </label>
                      <input
                        required={true}
                        id="country"
                        type="text"
                        placeholder="Enter country..."
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="zip" className="mb-2">
                        Post Code <span>*</span>
                      </label>
                      <input
                        required={true}
                        id="zip"
                        type="text"
                        placeholder="Enter Zip Code..."
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="speciality" className="mb-2">
                        Specialty <span>*</span>
                      </label>
                      <input
                        required={true}
                        id="speciality"
                        type="text"
                        placeholder="Enter Speciality..."
                        onChange={(e) => setSpeciality(e.target.value)}
                      />
                    </div>

                    <label htmlFor="pass" className="mb-2">
                      Password <span>*</span>
                    </label>
                    <input
                      required={true}
                      id="pass"
                      type="password"
                      placeholder="Enter password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="mb-2">
                      <label htmlFor="url" className="mb-2">
                        Website <span>*</span>
                      </label>
                      <input
                        required={true}
                        id="username"
                        type="url"
                        placeholder="Enter Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                    <div className="mt-10"></div>
                    <button
                      type="submit"
                      className="primary_btn theme-btn-2 w-100"
                      onClick={handleProviderSignup}
                    >
                      Register Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default RegisteArea; 