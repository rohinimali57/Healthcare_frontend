import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

function ConsultationComponent() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const patientId = localStorage.getItem('patient_id');

  const [procedureId , setProcedureId] = useState()
  //const procedureId = data.consultations[0].procedure_id ;

  const handleReviewClick = () => {
    // navigate("/Review", {
    //   state: {
    //     patientId: patientId,
    //     procedureId: bookingData.bookingData.procedure_id,
    //   },
      
    // }
    
    // );

    navigate('/Review' , { state : {patientId : patientId , procedureId : procedureId}})
  };



  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch(`http://35.154.170.24:8080/consultation/${patientId}`);
        const data = await response.json();
         console.log("procedur ID", data.consultations[0].procedure_id
         );
         setProcedureId( data.consultations[0].procedure_id);
        if (response.ok) {
          setConsultations(data.consultations);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch consultations");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

//payment 

  const handleDelete = async (consultationId) => {
    try {
      // Send a DELETE request to the backend API to delete the consultation
      const response = await fetch(`http://35.154.170.24:8080/consultation/delete/${consultationId}`, {
        method: "DELETE",
      });
           console.log("procedureID",response)
      if (response.ok) {
        // Remove the deleted consultation from the state
        setConsultations((prevConsultations) =>
          prevConsultations.filter((consultation) => consultation.consult_id!== consultationId)
        );
        setError(null); // Reset the error if there was any
      } else {
        setError("Failed to delete consultation");
      }
    } catch (error) {
      setError("Failed to delete consultation");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  async function onPay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const data = await fetch('http://35.154.170.24:8080/payment', { 
      method: 'POST' ,
      timeout:0,
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        //amount:price*100, 
      })
  })

    console.log(data)

    const options = {
      key: 'rzp_test_LerHhmnSru6RuL',
      //amount: price*100,
      currency: "INR",
      order_id: data.id,
      handler: function (response) {
        alert(response.razorpay_payment_id)
        alert(response.razorpay_order_id)
        alert(response.razorpay_signature)
      },
      }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div>
    <br /><br />
    {consultations.length === 0 ? (
      <div style={{ textAlign: "center", marginTop: "20px" }}>No consultations found</div>
    ) : (

         
   
      <div className="row" >
        
        {consultations.map((consultation) => (

                
          <div className="col-xl-4 col-lg-4 col-md-6"  key={consultation.id}>
            <div className="service-box-3 mb-4 text-center" >
              <div>
                <p style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <img style={{ width: "100px" }} src={consultation.procedure_image} alt="Procedure Image" />
                </p>
                <p>
                  <h6> {consultation.pname}</h6>
                </p>
                <p>Consultation Date: {consultation.consultation_date}</p>
                <p>Doctor: {consultation.name}</p>
                </div>
                <div onClick={() =>handleReviewClick (consultation.consult_id)} className="service-link">
              <Link>Review</Link>
            </div>
        {/* <button
          type="button"
          onClick={() => handleDelete(consultation.consult_id)}
          className="btn btn-success"
          style={{ background: '#dc3545' }}
        >
          <Link style={{ color: '#fcfcfc' }}>Cancel</Link>
        </button> */}
        {/* <button
                      type="button"
                      className="service-link"
                      style={{ marginLeft: "80px", background: "#8fb569" }}
                      onClick={() =>handleReviewClick (consultation.consult_id)}
                    >
                      <Link
                        style={{ color: "#fcfcfc" }}
                      
                        >
                        Review
                      </Link>
                    </button> */}
                 
      
                
             
              
            </div>
         
          </div>
      

        ))}

      </div>
    )}

    
  </div>
   
  );
}
export default ConsultationComponent;
