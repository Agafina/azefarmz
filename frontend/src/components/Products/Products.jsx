import { Link, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProductContext } from "../../context/ProductContext";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useContext(StoreContext);
  const { products, categories } = useProductContext();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { t } = useTranslation();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#313a53" }}>
            {t("products.maintitle")}
          </h2>
          <p className="text-xl text-gray-600">{t("products.subtitle")}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.includes("All") ? null : (
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 
                ${selectedCategory === "All" ? "bg-313a53 text-white shadow-lg" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
              onClick={() => setSelectedCategory("All")}
            >
              {t("All")}
            </button>
          )}
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === category ? "bg-313a53 text-white shadow-lg" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
              style={{ backgroundColor: selectedCategory === category ? "#313a53" : "white" }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={t("products.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`${backendUrl}/images/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <p className="text-lg font-bold text-blue-600 mb-4">
                    {product.price} XAF / {product.unit}
                  </p>
                  <div className="flex gap-3">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 text-center"
                    >
                      {t("products.viewDetails")}
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      {t("products.addToCart")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            {t("products.noProductsFound")}
          </p>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600 mb-6">{t("products.cta.text")}</p>
          <Link
            to="/shop"
            className="inline-block px-8 py-3 text-lg font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            {t("products.cta.buttonText")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
