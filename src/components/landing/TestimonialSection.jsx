import { Star } from "lucide-react";
import React from "react";

const TestimonialSection = ({ testimonials }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-extrabold text-gray-600 text-3xl">
            Trusted by many people Worldwide
          </h2>

          <p className="text-base text-gray-600 max-w-3xl mx-auto mt-2">
            See what our users say about Cloud Share
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          {testimonials.map((testimonal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-500 hover:scale-105"
            >
              <div className="p-8">
                <div className="flex items-center">
                  <div className="shrink-0 h-12 w-12">
                    <img
                      src={testimonal.avatar}
                      alt="profile-pic"
                      className="h-12 w-12 rounded-full"
                    />
                  </div>

                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      {testimonal.name}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < testimonal.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } fill-current`}
                    />
                  ))}
                </div>

                <blockquote className="mt-4">
                  <p className="text-base italic text-gray-600">
                    "{testimonal.review}"
                  </p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
