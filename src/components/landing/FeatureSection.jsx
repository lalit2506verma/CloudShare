import React from 'react'

const FeatureSection = ({features}) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-extrabold text-3xl text-gray-600 sm:text-4xl">
            Everything you need for file sharing
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Cloud Share provide all the tools you need to manage your digital content
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"></div>
        </div>
        {features.map((feature, index) => (
          <div key={index} className="pt-5 border border-gray-100 shadow-lg rounded-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8"></div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default FeatureSection