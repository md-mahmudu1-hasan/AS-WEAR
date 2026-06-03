import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    cssEase: 'ease-in-out',
  };

  const slides = [
    { 
      src: "/1.jpg.jpeg", 
      title: "New Arrivals",
      subtitle: "Latest Tech",
      description: "Smartphones & Laptops",
      badge: "NEW",
      badgeColor: "green"
    },
  ];

  return (
    <div className="container mx-auto mt-2">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[50vh] md:h-[70vh]">

        {/* Main Slider */}
        <div className="lg:col-span-3 h-full relative">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="relative">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-[50vh] md:h-[70vh] object-cover rounded-xl"
                />
                
                {/* <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent rounded-xl">
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-8 md:px-12 lg:px-16 w-full lg:w-3/4">
                      <div className="mb-4">
                        <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                          slide.badgeColor === 'red' ? 'bg-accent-red text-white' :
                          slide.badgeColor === 'green' ? 'bg-dark-gold text-white' :
                          'bg-gold text-black-custom'
                        }`}>
                          {slide.badge}
                        </span>
                      </div>
                      
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                        {slide.title}
                      </h1>
                      
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-3">
                        {slide.subtitle}
                      </h2>
                      
                      <p className="text-base md:text-lg text-white/90 mb-6 max-w-md">
                        {slide.description}
                      </p>
                      
                      <button className="bg-gold hover:bg-dark-gold text-black-custom px-8 py-3 rounded-lg font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div> */}

              </div>
            ))}
          </Slider>
        </div>

        {/* Right Side Static Banner */}
        <div className="hidden lg:block h-full">
          <div className="relative h-full group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Side Banner"
              className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-300"
            />
            
            {/* Side Banner Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-dark-gold/80 to-gold/80 rounded-xl flex flex-col justify-center items-center text-white p-6">
              <div className="text-center">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Exclusive
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Premium Collection
                </h3>
                <p className="text-sm md:text-base mb-4 text-white/90">
                  Luxury Items
                </p>
                <Link to="/all-clothes" className="bg-white text-gold px-6 py-2 rounded-lg font-semibold text-sm hover:bg-light-silver transition-all duration-300 transform hover:scale-105">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSlider;
