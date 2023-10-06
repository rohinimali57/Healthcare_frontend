import React, { useState, useEffect } from "react";
// import Modal from "../../../components/Shared/Modal/Modal"
import { useNavigate } from "react-router-dom";
import AddNewDoctorArea from "./AddNewDoctorArea";
import UpdateDoctorArea from "./UpadateDoctorArea";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ManageProcedure from "../../ProviderLandingPage/ProviderLandingPageArea/ManageProcedure";

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';



const DoctorProfileArea = () => {
  const [showAddNewArea, setshowAddNewArea] = useState(false);
  const [showupdateDoctorArea, setshowupdateDoctorArea] = useState(false);
  const [showAddArea, setshowAddArea] = useState(true);
  const [procedureOne, setprocedureOne] = useState([]);
  const [selectedoctorlist, setselectedoctorlist] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [doctors, setdoctors] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [name, setUsername] = useState("");
  const [pId, setPId] = useState("");
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = async (index) => {
  //   console.log("this is my doctor id ==>", index);
  //   // if(id !==null){
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   })

  //   .then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`http://35.154.170.24:8080/doctor/delete/${index}`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //         .then((response) => {
  //           if (response.status === 200) {
  //             Swal.fire(
  //               'Deleted!',
  //               'Doctor details have been deleted.',
  //               'success'
  //             ).then(() => {
  //               navigate("/DoctorProfileArea");
  //             });
  //           } else {
  //             throw new Error('Failed to delete doctor details.');
  //           }
  //         })
  //         .catch((error) => {
  //           Swal.fire(
  //             'Error!',
  //             error.message,
  //             'error'
  //           );
  //         });

  //     }
  //   });
  // };
  // }
  const handleClickOpen = async (id) => {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // })
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     console.log(selectedoctorlist)
    fetch(`http://35.154.170.24:8080/doctor/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire("Deleted!", "Doctor details have been deleted.", "success");
        } else {
          throw new Error("Failed to delete doctor details.");
        }
      })
      .catch((error) => {
        Swal.fire("Error!", error.message, "error");
      });
  };
  //   });
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      setUsername(storedUsername);
      console.log("provider name", storedUsername);
    }
    const storedPId = localStorage.getItem("provider_id");
    if (storedPId) {
      setPId(storedPId);
      console.log("provider id", storedPId);
    }

    const fetchData = async () => {
      try {
        // console.log(providers_id);
        await fetch(
          `http://35.154.170.24:8080/provider/doctors/search/${storedPId}`
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("procedure==>", doctors);
            console.log("==>", result.doctors);
            setdoctors(result.doctors);
            console.log("new1==>", setdoctors(result.doctors));
            // console.log("Procedure:",procedures);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchprocedure = async () => {
      try {
        // console.log(providers_id);
        if (selectedoctorlist) {
          await fetch(
            `http://35.154.170.24:8080/provider/doctor/search/${selectedoctorlist}`
          )
            .then((res) => res.json())
            .then((data) => setprocedureOne(data.doctor))
            .catch((err) => console.log(err));
        } else {
          setprocedureOne([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchprocedure();
    // Adding a timeout of 2 seconds before executing the fetchProcedure function
    const timeoutId = setTimeout(() => {
      fetchprocedure();
    }, 2000);

    // Clean up the effect and clear the timeout
    return () => clearTimeout(timeoutId);
  }, [selectedoctorlist]);

  const handlesetselecteddoctorlistChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Procedure:", selectedValue);
    setselectedoctorlist(selectedValue);
    setShowResult(true);
  };
  const handleshowAddNewArea = () => {
    setshowAddArea(false);
    setshowAddNewArea(true);
    setshowupdateDoctorArea(false);
  };
  const handleshowupdateDoctorArea = (doctor) => {
    setshowAddArea(false);
    setSelectedProcedure(doctor);
    setshowAddNewArea(false);
    setshowupdateDoctorArea(true);
  };

  return (
    <>
      <div>
        <div className="col py-3">
          <section className="login-area pt-50 pb-80">
            <div className="container-fluid">
              <div className="row flex-nowrap">
                <div
                  className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
                  style={{ backgroundColor: "#223645" }}
                >
                  <br></br>

                  <ManageProcedure />
                </div>
                <div className="col-lg-9 justify-content-center">
                  <article className="service-details-box">
                    <div className="service-details-thumb mb-80">
                      <div className="section-title pos-rel mb-45">
                        {showAddArea && (
                          <div className="basic-login">
                            <h2 className="text-center mb-60">Manage Doctor</h2>
                            {/* <form className="service-contact-form" action=""> */}
                            <form className="service-contact-form" action="">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="contact-input contact-icon contact-hourglass">
                                    <select
                                      style={{ zIndex: "-1" }}
                                      onChange={
                                        handlesetselecteddoctorlistChange
                                      }
                                      className="form-select select_style form-group"
                                      aria-label="Default select example"
                                    >
                                      <option
                                        defaultValue="Select Procedure"
                                        value=""
                                      >
                                        Select Doctor
                                      </option>
                                      {doctors.map((doctor) => (
                                        <option
                                          key={doctor.id}
                                          value={doctor.id}
                                        >
                                          {doctor.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-md-12 text-center mt-40 form-group">
                                  <button
                                    type="submit"
                                    className="primary_btn btn-icon-green w-50"
                                    onClick={handleshowAddNewArea}
                                  >
                                    Add New Doctor
                                  </button>
                                </div>

                                {showResult && (
                                  <div className="col-lg-12 mt-4">
                                    <table className="table table-striped table-hover select_style">
                                      <thead>
                                        <tr>
                                          <th>ID</th>
                                          <th>Doctor Name</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {procedureOne.map((doctor, index) => (
                                          <tr key={doctor.id}>
                                            <td>{doctor.id}</td>
                                            <td>{doctor.name}</td>
                                            <td>
                                              <div className="d-flex flex-column flex-sm-row">
                                                <button
                                                  className="primary_btn btn-icon-green mb-2 mb-sm-0 me-sm-2 btn-sm"
                                                  onClick={() => {
                                                    handleshowupdateDoctorArea(
                                                      doctor
                                                    );
                                                  }}
                                                >
                                                  Update
                                                </button>
                                                <button
                                                  className="primary_btn btn-icon-green btn-sm"
                                                  onClick={() =>
                                                    handleClickOpen(doctor.id)
                                                  }
                                                >
                                                  Delete
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                              {/* </form> */}
                            </form>
                          </div>
                        )}
                        {showAddNewArea && <AddNewDoctorArea />}
                        {showupdateDoctorArea && (
                          <UpdateDoctorArea doctor={selectedProcedure} />
                        )}
                        {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default DoctorProfileArea;
