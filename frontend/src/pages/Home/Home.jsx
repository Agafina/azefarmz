import React from "react";
import Header from "../../components/Header/Header";
import "./Home.css";
import CTA from "../../components/CTA/CTA";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
const Home = () => {
  return (
    <div>
      <Header />
      <FeaturedProducts />
      <CTA index={1} />
      <CTA type="contactCTA" index={2} />
      <CTA type="aboutCTA" index={3}/>
      <CTA type="sustainabilityCTA" index={4} />
      {/* <Introduction /> */}
      {/* <ShopOnlinePage /> */}
      {/* <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/> */}
      {/* <AppDownload /> */}
    </div>
  );
};

export default Home;
