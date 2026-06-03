import { useState, useEffect } from "react";
import BannerSlider from "../../components/BannerSlider";
import BestProducts from "../../components/BestProducts";
import Testimonials from "../../components/Testimonials";
import HowItWorks from "../../components/HowItWorks";
import Loader from "../../components/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-gray-custom">
        <Loader size="large" text="Loading Your Shopping Experience" />
      </div>
    );
  }

  return (
    <>
      <BannerSlider />
      <BestProducts />
      <Testimonials />
      <HowItWorks />
    </>
  );
};

export default Home;
