import React from "react";
import imgArray from "./imgArray";
import "../styles/Foods.css";

const SeeAll = ({ list , refff ,idd}) => {

  return (
    <>
      <div className="row">
        <h4  id={idd}>{list.category}</h4>
        {/* card  */}
        {list.restaurantList.map((data, index) => (
          <div key={index} className="col-4 pb-3">
            <div className="card">
              <img
                className="card-img-top w-100"
                style={{ objectFit: "cover", height: "150px" }}
                src={imgArray[index % imgArray.length]}
                alt="Card Item"
              />
              <div className="card-body p-0">
                <p className="fw-bold">{data.name}</p>
                <div className="d-flex">
                  {data.food_types.slice(0, 3).map((type, index) => (
                    <p key={index} className="badge bg-secondary me-1">
                      {type}
                    </p>
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  {data.ratings !== "" ? (
                    <p
                      className="bg-success rounded"
                      style={{ padding: "0px 4px" }}
                    >
                      ★{data.ratings}
                    </p>
                  ) : (
                    <p className=" rounded" style={{ padding: "0px 4px" }}>
                      ★--
                    </p>
                  )}
                  <p>•</p>
                  {data.delivery_time !== "" ? (
                    <p>{data.delivery_time}</p>
                  ) : (
                    <p>--</p>
                  )}
                  <p>•</p>
                  {data.price_for_two !== "" ? (
                    <p>₹{data.price_for_two} FOR TWO</p>
                  ) : (
                    <p>--</p>
                  )}
                </div>
                <div className=" hovertext border-top text-primary text-center">
                  <p className="m-0">QUICK VIEW</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SeeAll;
