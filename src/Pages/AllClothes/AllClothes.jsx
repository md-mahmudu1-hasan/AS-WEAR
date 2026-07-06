import React, { useEffect, useState } from "react";
import useAxios from "../../Hook/useAxios";
import ProductCardSkeleton from "../../components/ProductCardSkeleton";
import ProductCard from "./ProductCard";

const ClothesSection = ({ title, products, name, isLoading, totalPages, currentPage, onPageChange }) => {
  return (
    <section className="pb-14 bg-dark-gray-custom">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gold">{title}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading 
            ? Array(10).fill(0).map((_, index) => <ProductCardSkeleton key={`skeleton-${index}`} />)
            : products.map((product) => <ProductCard key={product._id} product={product} name={name} />)
          }
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => onPageChange(idx + 1)}
                className={`px-3 py-1 rounded-md border ${currentPage === idx + 1 ? "bg-gold text-black-custom" : "bg-black-custom text-light-silver border-dark-gold"}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const AllClothes = () => {
  const [kids, setKids] = useState([]);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);

  const [kidsLoading, setKidsLoading] = useState(true);
  const [menLoading, setMenLoading] = useState(true);
  const [womenLoading, setWomenLoading] = useState(true);

  const [kidsPage, setKidsPage] = useState(1);
  const [menPage, setMenPage] = useState(1);
  const [womenPage, setWomenPage] = useState(1);

  const [kidsTotalPages, setKidsTotalPages] = useState(1);
  const [menTotalPages, setMenTotalPages] = useState(1);
  const [womenTotalPages, setWomenTotalPages] = useState(1);

  const axiosInstance = useAxios();
  const limit = 10;

  const fetchClothes = async (type, page, setData, setLoading, setTotalPages) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/${type}?page=${page}&limit=${limit}`);
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothes("kidsclothes", kidsPage, setKids, setKidsLoading, setKidsTotalPages);
  }, [kidsPage]);

  useEffect(() => {
    fetchClothes("mensclothes", menPage, setMen, setMenLoading, setMenTotalPages);
  }, [menPage]);

  useEffect(() => {
    fetchClothes("womensclothes", womenPage, setWomen, setWomenLoading, setWomenTotalPages);
  }, [womenPage]);

  return (
    <div className="bg-dark-gray-custom">
      <div className="py-14 text-center">
        <h1 className="text-4xl font-bold mb-3 text-gold">All Clothes</h1>
        <p className="text-light-silver">Complete collection for kids, men and women</p>
      </div>

      <ClothesSection
        title="Kids Clothes"
        products={kids}
        name="kidsclothes"
        isLoading={kidsLoading}
        totalPages={kidsTotalPages}
        currentPage={kidsPage}
        onPageChange={setKidsPage}
      />
      <ClothesSection
        title="Men's Clothes"
        products={men}
        name="mensclothes"
        isLoading={menLoading}
        totalPages={menTotalPages}
        currentPage={menPage}
        onPageChange={setMenPage}
      />
      <ClothesSection
        title="Women's Clothes"
        products={women}
        name="womensclothes"
        isLoading={womenLoading}
        totalPages={womenTotalPages}
        currentPage={womenPage}
        onPageChange={setWomenPage}
      />
    </div>
  );
};

export default AllClothes;
