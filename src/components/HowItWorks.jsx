import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Products",
      description: "Explore our wide range of products across various categories",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Add to Cart",
      description: "Select your favorite products and add them to your shopping cart",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Conferm Order",
      description: "Conferm your order and Check your email for order confirmation",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <path d="M2 10h20"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Fast Delivery",
      description: "Receive your products at your doorstep with our fast delivery service",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14"/>
          <path d="M12 5l7 7-7 7"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-dark-gray-custom">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="text-center p-8 bg-black-custom rounded-xl hover:bg-dark-gray-custom transition-all duration-300 hover:-translate-y-2 hover:shadow-lg relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gold text-black-custom rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="text-gold mb-6 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gold mb-4">{step.title}</h3>
              <p className="text-light-silver leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
