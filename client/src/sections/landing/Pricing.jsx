import plans from "@/data/landing/pricingPlans";
import React from "react";

export default function PricingSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Pricing Plans</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Choose the plan that fits your workflow and team size.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`flex-1 border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between ${
              plan.isPopular ? "border-black" : "border-gray-200"
            }`}
          >
            <div>
              {plan.isPopular && (
                <div className="text-xs uppercase text-white bg-black px-2 py-1 rounded-full mb-3 inline-block">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
              <div className="text-2xl font-bold mb-4">{plan.price}</div>
              <ul className="text-gray-700 text-sm mb-6 space-y-2 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
              </ul>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors mt-4">
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
