
import React from 'react';
import { Users, Award, Shield, Truck } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above all else."
    },
    {
      icon: Award,
      title: "Quality Products",
      description: "We carefully curate only the highest quality products for our store."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your personal information and payments are always protected."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to get your orders to you fast."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShopEasy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're passionate about bringing you the best shopping experience with quality products at unbeatable prices.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Founded in 2020, ShopEasy began with a simple mission: to make online shopping easier, 
              more affordable, and more enjoyable for everyone. What started as a small team with big 
              dreams has grown into a trusted platform serving thousands of happy customers.
            </p>
            <p className="mb-6">
              We believe that great products shouldn't break the bank, and excellent customer service 
              should be the standard, not the exception. Every product in our catalog is carefully 
              selected for quality, value, and customer satisfaction.
            </p>
            <p>
              Today, we continue to expand our selection while maintaining the personal touch and 
              attention to detail that our customers have come to expect and love.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
