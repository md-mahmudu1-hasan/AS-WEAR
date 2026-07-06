import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    fade: true,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
  };

  const slides = [
    { 
      src: "/1.jpg.jpeg", 
      title: "New Collection",
      subtitle: "Summer 2026",
      description: "Discover the latest trends in fashion",
      badge: "NEW",
      badgeColor: "gold"
    },
    { 
      src: "/1.jpg.jpeg", 
      title: "Premium Quality",
      subtitle: "Best Sellers",
      description: "Top rated products from our collection",
      badge: "HOT",
      badgeColor: "red"
    },
    { 
      src: "/1.jpg.jpeg", 
      title: "Special Offer",
      subtitle: "Up to 50% Off",
      description: "Limited time sale on selected items",
      badge: "SALE",
      badgeColor: "green"
    },
  ];

  return (
    <div className="container mx-auto mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[55vh] md:h-[75vh]">

        {/* Main Slider */}
        <div className="lg:col-span-3 h-full relative">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="relative">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-[55vh] md:h-[75vh] object-cover rounded-xl"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent rounded-xl">
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-8 md:px-12 lg:px-16 w-full lg:w-3/4">
                      <div className="mb-4">
                        <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${
                          slide.badgeColor === 'red' ? 'bg-accent-red/90 text-white' :
                          slide.badgeColor === 'green' ? 'bg-dark-gold/90 text-white' :
                          'bg-gold/90 text-black-custom'
                        }`}>
                          {slide.badge}
                        </span>
                      </div>
                      
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                        {slide.title}
                      </h1>
                      
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gold mb-3">
                        {slide.subtitle}
                      </h2>
                      
                      <p className="text-gold md:text-lg text-light-silver/90 mb-6 max-w-md">
                        {slide.description}
                      </p>
                      
                      <Link 
                        to="/all-clothes"
                        className="inline-flex items-center space-x-2 bg-linear-to-r from-gold to-dark-gold text-black-custom px-8 py-3 rounded-lg font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:from-dark-gold hover:to-gold"
                      >
                        <span>All Products</span>
                        <FiArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </Slider>
        </div>

        {/* Right Side Static Banner */}
        <div className="hidden lg:flex flex-col h-full gap-4">
          {/* Top Banner */}
          <div className="relative h-1/2 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Side Banner"
              className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Side Banner Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-dark-gold/80 to-gold/80 rounded-xl flex flex-col justify-center items-center text-black-custom p-6">
              <div className="text-center">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  Exclusive
                </span>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Premium
                </h3>
                <p className="text-xs md:text-sm mb-3">
                  Luxury Items
                </p>
                <Link to="/all-clothes" className="bg-black-custom text-gold px-5 py-2 rounded-lg font-semibold text-sm hover:bg-gold hover:text-black-custom transition-all duration-300 transform hover:scale-105">
                  Explore
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="relative h-1/2 group cursor-pointer bg-black-custom rounded-xl border border-dark-gold overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-dark-gray-custom to-black-custom p-6 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-linear-to-r from-gold to-dark-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FiShoppingBag className="w-8 h-8 text-black-custom" />
              </div>
              <Link to="/all-clothes" className="text-gold text-sm font-semibold hover:text-dark-gold transition-colors">
                All Products →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSlider;
