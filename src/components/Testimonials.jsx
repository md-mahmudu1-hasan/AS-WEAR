import React from 'react';

const Testimonials = () => {
const testimonials = [
    {
      id: 1,
      name: "MD. Kamrul Hasan Sujon",
      role: "Regular Customer",
      comment: "সেরা কোয়ালিটি এবং দারুণ সার্ভিস, ঠিক সময়ে ডেলিভারি দেওয়ার জন্য ধন্যবাদ।",
      rating: 5,
      avatar: "https://i.ibb.co.com/YBbbgjGj/2.jpg"
    },
    {
      id: 2,
      name: "MD. Mahabbat Hossain",
      role: "Premium Member",
      comment: "সেরা কাস্টমার সার্ভিস আর দারুণ সব ডিল—সব মিলিয়ে এটিই আমার প্রিয় অনলাইন শপিং সাইট।",
      rating: 5,
      avatar: "https://i.ibb.co.com/WNsQ5jT2/Image-oszbgoszbgoszbgo.png"
    },
    {
      id: 3,
      name: "MD. Ajmain Adib Shakkor",
      role: "First-time Buyer",
      comment: "অসংখ্য পণ্যের কালেকশন এবং অ্যাপের সহজ ইন্টারফেস—সব মিলিয়ে এটি হাইলি রিকমেন্ডেড!",
      rating: 4,
      avatar: "https://i.ibb.co.com/6cyWBHSQ/Image-l29f97l29f97l29f.png"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="py-16 bg-dark-gray-custom">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gold mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-black-custom rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-8 border-l-4 border-gold">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gold">{testimonial.name}</h3>
                  <p className="text-light-silver text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-light-silver italic leading-relaxed">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
