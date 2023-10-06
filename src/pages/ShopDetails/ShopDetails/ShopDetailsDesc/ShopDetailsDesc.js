import React from "react";
import ProcedureReviews from "../../../AddReviewForm/Displayreview/ProcedureReviews";
import Chatbot from "../../../../components/Chatbot/Chatbot"; // Import the Chatbot component
import DisplayOptions from "../../../AddNewProcedure/DisplayOptions";

const ShopDetailsDesc = (data) => {
  // const {description } = description;
  console.log("data.description", data);
  console.log("<><><><</></></>", data);

  return (
    <>
      <section className="product-desc-area pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bakix-details-tab">
                <ul
                  className="nav text-center justify-content-center pb-30 mb-50"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="desc-tab"
                      data-bs-toggle="tab"
                      href="#id-desc"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Description{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="id-add-in"
                      data-bs-toggle="tab"
                      href="#id-add"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Hospital Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="id-r"
                      data-bs-toggle="tab"
                      href="#id-rev"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Reviews
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      className="nav-link"
                      id="id-r"
                      data-bs-toggle="tab"
                      href="#id-Option"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Procedure Options
                    </a>
                  </li> */}
                </ul>
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="id-desc"
                  role="tabpanel"
                  aria-labelledby="desc-tab"
                >
                  <div className="event-text mb-40">
                    <p>{data.description}</p>
                  </div>
                  <Chatbot pname={data.pname} />
                  {/* Render the Chatbot component */}
                </div>

                <div
                  className="tab-pane fade"
                  id="id-add"
                  role="tabpanel"
                  aria-labelledby="id-add-in"
                >
                  <div className="additional-info">
                    <div className="table-responsive">
                      <h4>Hospital information</h4>
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Hospital Name</th>
                            <td className="product_weight">
                              {data.provider_name}
                            </td>
                          </tr>
                          <tr>
                            <th>Hospital Phone Number</th>
                            <td className="product_dimensions">{data.phone}</td>
                          </tr>
                          <tr>
                            <th>Hospital Address</th>
                            <td className="product_dimensions">
                              {[
                                data.address,
                                ", ",
                                data.city,
                                ", ",
                                data.country,
                              ]}
                            </td>
                          </tr>
                          <tr>
                            <th>Doctor Name</th>
                            <td className="product_dimensions">
                              {data.doctor_name}
                            </td>
                          </tr>
                          <tr>
                            <th>Tieup with Insurance Companies</th>
                            <td className="product_dimensions">{data.phone}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="id-rev"
                  role="tabpanel"
                  aria-labelledby="id-r"
                >
                  <div className="additional-info">
                    <div className="event-text mb-40">
                      <ProcedureReviews procedureId={data.procedureId} />
                    </div>
                  </div>
                </div>
                {/* <div
                  className="tab-pane fade"
                  id="id-Option"
                  role="tabpanel"
                  aria-labelledby="id-r"
                >
                  <div className="additional-info">
                    <div className="event-text mb-40">
                      <DisplayOptions procedureId={data.procedureId} />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopDetailsDesc;
