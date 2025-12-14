import React from "react";

const CTASection = () => {
  return (
    <section className="bg-purple-500">
      <div className="max-w-7xl mx-auto py-12.px-3 sm:px-6 py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tacking-tight text-white sm:text-4xl">
          <span className="block">Ready to get Started?</span>
          <span className="block text-purple-100">
            Create an account today.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:shrink-0">
          <div className="inline-flex rounded-md shadow">
            <button className="bg-white inline-flex items-center justify-center rounded-md px-3 py-2 border border-transparent text-base font-medium text-purple-600 hover:bg-purple-50 transition-colors duration-200 cursor-pointer">
              Sign up for free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
