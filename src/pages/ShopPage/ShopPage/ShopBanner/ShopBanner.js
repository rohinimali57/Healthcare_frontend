import React from "react";
import SingleSecondShop from "../../../../components/SingleSecondShop/SingleSecondShop";
import SingleShop from "../../../../components/SingleShop/SingleShop";

const ShopBanner = (result) => {
  console.log("result===>", result);
  return (
    <>
      <section className="shop-banner-area pt-120 pb-120">
        <div className="container">
          <div className="row mt-20">
            <div className="col-xl-4 col-lg-5 col-md-6">
              <div className="product-showing mb-40">
                {/* <p>Showing 1–22 of 32 results</p> */}
              </div>
            </div>
            <div className="col-xl-8 col-lg-7 col-md-6">
              <div className="shop-tab f-right">
                <ul className="nav text-center" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      <i className="fas fa-th-large"></i>{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      <i className="fas fa-list-ul"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="pro-filter mb-40 f-right">
                <form action="#">
                  <select name="pro-filter" id="pro-filter">
                    <option defaultValue="1">Shop By </option>
                    <option defaultValue="2">Top Sales </option>
                    <option defaultValue="3">New Product </option>
                    <option defaultValue="4">A to Z Product </option>
                  </select>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    {result.result.procedure.map((procedure, index) => (
                      // Render component for each procedure
                      <SingleShop
                        key={index}
                        id={procedure.id}
                        image={procedure.procedure_image}
                        speciality={procedure.speciality}
                        pname={procedure.pname}
                        price={procedure.price}
                        discount={procedure.discount}
                        description={procedure.description}
                        provider_name={procedure.provider_name}
                        address={procedure.address}
                        city={procedure.city}
                        country={procedure.country}
                        phone={procedure.phone}
                        doctor_name={procedure.doctor_name}
                      />
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    {result.result.procedure.map((procedure, index) => (
                      // Render component for each procedure
                      <SingleSecondShop
                        key={index}
                        id={procedure.id}
                        image={procedure.procedure_image}
                        speciality={procedure.speciality}
                        pname={procedure.pname}
                        price={procedure.price}
                        discount={procedure.discount}
                        description={procedure.description}
                        provider_name={procedure.provider_name}
                        address={procedure.address}
                        city={procedure.city}
                        country={procedure.country}
                        phone={procedure.phone}
                        doctor_name={procedure.doctor_name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="basic-pagination basic-pagination-2 text-center mt-20">
                {/* <ul>
                  <li>
                    <a href="">
                      <i className="fas fa-angle-double-left"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">01</a>
                  </li>
                  <li>
                    <a href="">02</a>
                  </li>
                  <li>
                    <a href="">03</a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fas fa-ellipsis-h"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fas fa-angle-double-right"></i>
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopBanner;
