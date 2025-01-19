import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./Home.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Introduction from "../../components/Introduction/Introduction";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import CTA from "../../components/CTA/CTA";
import ShopOnlinePage from "../ShopOnline/ShopOnline";
import Products from "../../components/Products/Products";
const Home = () => {
  const [category, setCategory] = useState("All");
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
