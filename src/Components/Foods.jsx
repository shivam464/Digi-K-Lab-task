import React, { useState, useEffect, useRef } from "react";

import "../styles/Foods.css";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";
import AllFood from "./AllFood";
import SeeAll from "./SeeAll";

const Foods = () => {
  const [ApiData, setApiData] = useState([]);
  const [categoryIndex, setcategoryIndex] = useState(0);
  const [allRest, setAllRestaurants] = useState([]);
  const [onlySwiggy, setOnlySwiggy] = useState([]);

  useEffect(() => {
    var restArray = [];
    var exclusiveArray = [];

    axios
      .get("https://mocki.io/v1/3fb1488d-bbdb-4ddd-9a03-a0d2efc98597")
      .then((response) => {
        
        setApiData(response.data);
        response.data.forEach((eachCategory) => {
          restArray = [...restArray, ...eachCategory.restaurantList];
        });
        restArray.forEach((restaurant) => {
          if (restaurant.isExlusive) {
            // exclusiveArray = [...exclusiveArray, restaurant]
            exclusiveArray.push(restaurant);
          }
        });
        setAllRestaurants(restArray);
        setOnlySwiggy(exclusiveArray);

        // for add new data into existing data
        setApiData([
          ...response.data,
          {
            category: "Only for swiggy",
            restaurantList: exclusiveArray,
          },
          {
            category: "See All",
            restaurantList: restArray,
          },
        ]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  
  return (
    <div className="container">
      <div className="row " style={{ paddingTop: "5rem" }}>
        {/* LeftNavbar */}
        <div className="col-3 p-0  ">
          <div className="" style={{ position: "fixed", width: "18rem" }}>
            <div id="list-example" className="list-group  ">
              {ApiData.map((data, index) => {
                return (
                  <a
                    className={`list-group-item list-group-item-action text-capitalize categories fs-5 ${
                      index === categoryIndex ? "activediv" : ""
                    }`}
                    onClick={() => {
                      setcategoryIndex(index);
                      executeScroll();
                    }}
                    key={data.category}
                    href={`#${data.category} `}
                  >
                    {data.category}
                    <p className="fs-6 " style={{ color: "gray" }}>
                      {data.restaurantList.length} Restaurants
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* RightNavbar */}
        <div className="col">
          {categoryIndex !== ApiData.length - 1 ? (
            ApiData.slice(0, ApiData.length - 1).map((data, index) => (
              <div key={index}>
                <div
                  data-spy="scroll"
                  data-target="#list-example"
                  data-offset="0"
                  className="scrollspy-example"
                >
                  <div className="row ">
                    <h4
                      id={data.category}
                      ref={myRef}
                      className="text-capitalize"
                    >
                      {data.category}
                    </h4>
                    <RestaurantCard
                      restur={ApiData}
                      categoryIndex={index}
                      newcategoryIndex={categoryIndex}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <SeeAll
              list={ApiData[ApiData.length - 1]}
              idd="See All"
             
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Foods;
