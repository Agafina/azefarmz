import React from "react";
import Header from "../../components/Header/Header";
import "./Home.css";
import CTA from "../../components/CTA/CTA";
import Products from "../../components/Products/Products";
const Home = () => {
  return (
    <div>
      <Header />
      
      <Products />
      {/* <Introduction /> */}
      {/* <ShopOnlinePage /> */}
      <CTA />
      {/* <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/> */}
      {/* <AppDownload /> */}
    </div>
  );
};

export default Home;
