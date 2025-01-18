import React from "react";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import ShopOnlineHeader from "../../components/ShopOnline/top";
import CTA from "../../components/ShopOnline/bottom";

const ShopOnlinePage = () => {
  return (
    <div className="shop-online-page">
      {/* Shop Online Header */}
      <ShopOnlineHeader />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Footer */}
      <CTA />
    </div>
  );
};

export default ShopOnlinePage;
