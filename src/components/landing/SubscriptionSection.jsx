import React from "react";
import { features } from "../../data/FeatureData";
import { useNavigate } from "react-router-dom";

const SubscriptionSection = ({ subscriptionPlans }) => {

  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl text-gray-900 font-semibold sm:text-4xl">
            Secure, Transparent Subscription Plan
          </h2>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-4">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {subscriptionPlans.map((subscriptionPlan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
                subscriptionPlan.highlighted
                  ? "border-2 border-purple-500 transform scale-105"
                  : "border border-gray-200"
              }`}
            >
              <div
                className={`px-6 py-8 bg-white ${
                  subscriptionPlan.highlighted
                    ? "bg-linear-to-r from-purple-50 to-white"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-medium text-gray-900">
                    {subscriptionPlan.name}
                  </h3>

                  {subscriptionPlan.highlighted && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      Popular
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  {subscriptionPlan.description}
                </p>

                <div className="flex items-baseline text-heading mt-4">
                  <span className="text-4xl font-bold tracking-tight">
                    ₹{subscriptionPlan.price}
                  </span>
                  <span className="ms-2 font-medium text-body">/month</span>
                </div>
              </div>

              <div className="flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6">
                <ul role="list" className="space-y-4 my-6">
                  {subscriptionPlan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center ${
                        feature.available ? "" : "line-through decoration-body"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 shrink-0 text-fg-brand me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span className="text-body">{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-md shadow">
                  <button
                    type="button"
                    onClick={() => navigate("/auth/register")}
                    className={`w-full rounded-md bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-semibold leading-5 rounded-base text-base px-4 py-2.5 focus:outline-none cursor-pointer ${subscriptionPlan.highlighted ? 'text-white bg-purple-500 hover:bg-purple-600' : 'text-purple-600 bg-white hover:bg-gray-50'} transition-colors duration-200`}
                  >
                    {subscriptionPlan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
