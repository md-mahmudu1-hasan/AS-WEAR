import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAxios from "../Hook/useAxios";
import ProductCardSkeleton from "./ProductCardSkeleton";

const BestProducts = () => {
  const [clothes, setClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const axiosInstance = useAxios();
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 relative">
          ★
        </span>,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>,
      );
    }

    return stars;
  };

  useEffect(() => {
    axiosInstance.get("/bestclothes").then((response) => {
      setClothes(response.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-dark-gray-custom">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gold mb-12">
            Best Clothes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-dark-gray-custom">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gold mb-12">
          Best Clothes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {clothes.map((product) => (
            <Link
              key={product._id}
              to={`/bestclothes/${product._id}`}
              className="block h-full group"
            >
              <div className="bg-black-custom rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-dark-gold cursor-pointer h-full flex flex-col relative">
                {/* Discount Badge */}
                <div className="absolute top-3 right-3 z-10 bg-linear-to-r from-accent-red to-accent-red text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {product.discount}% OFF
                </div>

                {/* Product Image */}
                <div className="w-full h-40 overflow-hidden relative bg-linear-to-br from-dark-gray-custom to-black-custom">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    {/* Product Title */}
                    <h3 className="text-sm text-gold font-semibold mb-2 line-clamp-2 leading-5 h-8 group-hover:text-dark-gold transition-colors duration-300">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center bg-dark-gray-custom px-2 py-1 rounded-md">
                        {renderStars(product.ratings)}
                      </div>
                      <span className="text-light-silver text-xs font-medium">
                        ({product.ratings})
                      </span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="space-y-2 pt-2 border-t border-dark-gold">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg lg:text-xl font-bold bg-linear-to-r from-gold to-dark-gold bg-clip-text text-transparent">
                        ৳{product.after_discount_price}
                      </span>
                      <span className="text-sm lg:text-base text-light-silver line-through">
                        ৳{product.main_price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                      <span className="text-xs text-gold font-medium">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/all-clothes"
            className="bg-transparent text-gold px-8 py-3 border-2 border-gold rounded-lg font-semibold text-lg hover:bg-gold hover:text-black-custom transition-all duration-300 hover:-translate-y-1"
          >
            All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestProducts;
