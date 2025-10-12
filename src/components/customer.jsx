import React from "react";

const testimonials = [
  {
    name: "Imran Khan",
    role: "Software Engineer",
    image: "/path-to-image3.jpg",
    rating: 5,
    review:
      "Without any doubt I recommend Alcaline Solutions as one of the best web design and digital marketing agencies. One of the best agencies I've come across so far. Wouldn't be hesitant to introduce their work to someone else.",
  },
  {
    name: "Romena De Silva",
    role: "Junior Consultant",
    image: "/path-to-image1.jpg",
    rating: 5,
  },
  {
    name: "Romena De Silva",
    role: "Junior Consultant",
    image: "/path-to-image2.jpg",
    rating: 5,
  },
  {
    name: "Romena De Silva",
    role: "Junior Consultant",
    image: "/path-to-image4.jpg",
    rating: 5,
  },
  {
    name: "Romena De Silva",
    role: "Junior Consultant",
    image: "/path-to-image5.jpg",
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <section className="max-w-6xl mx-auto py-12 text-center">
        <div className="w-20 h-1 bg-[#188bff] mx-auto mt-2 mb-5"></div>
      <h2 className="text-3xl font-semibold mb-4">
        Why customers love <span className="font-bold bg-gradient-to-r from-[#6675F7] to-[#57007B]">working with us</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        {testimonials[0].review}
      </p>
      
      {/* Testimonials */}
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="text-center">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-300"
            />
            <div className="flex justify-center mb-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-gray-500 text-sm">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
