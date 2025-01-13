import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItems from "../FoodItems/FoodItems";

const FoodDisplay = ({category}) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => { 
            if(category === "All" || category === item.category){
          return (
            <FoodItems
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          )};
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
