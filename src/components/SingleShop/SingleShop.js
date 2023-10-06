import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }

const SingleShop = ({
  id,
  image,
  speciality,
  pname,
  price,
  discount,
  description,
  provider_name,
  address,
  city,
  country,
  phone,
  doctor_name,
}) => {
  const Navigate = useNavigate();
  const { state } = useLocation();
  const patient_id = localStorage.getItem("patient_id");
  console.log("========>>>", patient_id);
  const { result } = state;

  console.log("want procedure id >>>>>", result);

  const onMoreDetails = () => {
    console.log("description==>", description);
    Navigate("/shopDetails", {
      state: {
        id,
        image,
        speciality,
        pname,
        price,
        discount,
        description,
        provider_name,
        address,
        city,
        country,
        phone,
        doctor_name,
      },
    });
  };
  const handleRedirect = () => {
    Navigate("/login", {
      state: {
        result: true,
        id,
        image,
        speciality,
        pname,
        price,
        discount,
        description,
      },
    });
  };
  //const procedure_id = 57;

  // async function onPay() {
  //   const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

  //   if (!res) {
  //     alert('Razorpay SDK failed to load. Are you online?')
  //     return
  //   }

  //   const data = await fetch('http://35.154.170.24:8080/payment', {
  //     method: 'POST' ,
  //     timeout:0,
  //     headers:{
  //       "Content-Type" : "application/json"
  //     },
  //     body:JSON.stringify({
  //       amount:price*100,
  //       patient_id : sessionStorage.getItem("patient_id")
  //     })
  // })

  //   console.log(data)

  //   const options = {
  //     key: 'rzp_test_LerHhmnSru6RuL',
  //     amount: price*100,
  //     currency: "INR",
  //     order_id: data.id,
  //     handler: function (response) {
  //       alert(response.razorpay_payment_id)
  //       alert(response.razorpay_order_id)
  //       alert(response.razorpay_signature)
  //     },
  //     }
  //   const paymentObject = new window.Razorpay(options)
  //   paymentObject.open()
  // }

  // const onBookProcedure = () => {
  //   // Make an API request to save the data to the backend
  //   axios
  //     .post("http://35.154.170.24:8080/api/patients/booking", {
  //       image,
  //       speciality,
  //       pname,
  //       price,
  //       discount,
  //       patient_id,
  //       procedure_id: id,
  //     })
  //     .then((response) => {
  //       // Handle the successful response
  //       console.log("Booking successful:", response.data);
  //       Navigate("/patientlandingpage");
  //       // Optionally, you can navigate to a success page or display a success message
  //     })
  //     .catch((error) => {
  //       // Handle the error
  //       console.error("Error booking procedure:", error);
  //       // Optionally, you can display an error message to the user
  //     });
  // };

  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="product mb-40">
          <div className="product__img">
            {/* <Link to="/shopDetails"> */}
            <img src={image} alt="" />
            {/* </Link> */}
          </div>
          <div className="product__content text-center pt-30">
            <h4>
              <span className="pro-cat">
                <a>{speciality}</a>
              </span>
            </h4>
            <h3 className="pro-title">{pname}</h3>
            <h4>
              <div className="price">
                <span>₹ {price}</span>
                <span className="old-price">₹ {discount}</span>
              </div>
            </h4>
            <h5 className="pro-title">{provider_name}</h5>
            <br></br>
            <div className="product-action-text-center">
              {patient_id !== null && (
                <li>
                  <button
                    className="primary_btn btn-icon ml-0"
                    onClick={onMoreDetails}
                  >
                    <span>+</span> Book Procedure
                  </button>
                </li>
              )}
              {patient_id === null && (
                <li>
                  <button
                    className="primary_btn btn-icon ml-0"
                    onClick={handleRedirect}
                  >
                    <span>+</span> Book Procedure
                  </button>
                </li>
              )}
              <br></br>
              <br></br>

              <button
                className="action-btn"
                onClick={onMoreDetails}
                style={{ backgroundColor: "#e7e7e7", color: "black" }}
              >
                <i className="fas fa-expand"></i> More Details
              </button>
              {/* <button className="action-btn" onClick={onBookProcedure}>
                <i className="fas fa-plus"></i> Book Procedure
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleShop;
