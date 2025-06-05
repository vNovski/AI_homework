import React from "react";

type PricingCardProps = {
  plan: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
};

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  price,
  features,
  isFeatured = false,
}) => {
  return (
    <div
      className={`
    w-[320px] relative p-8 transition-all duration-300 cursor-pointer h-auto
    focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:z-2
    hover:shadow-xl hover:-translate-y-1
    ${
      isFeatured
        ? " bg-slate-700 text-white shadow-lg scale-y-110 px-0 w-full w-[320px]"
        : "bg-white text-gray-900 shadow-md hover:shadow-lg"
    }
  `}
      tabIndex={0}
    >
      <div className="text-center">
        <h3
          className={`text-lg font-semibold mb-4 ${
            isFeatured ? "text-white" : "text-gray-900"
          }`}
        >
          {plan}
        </h3>

        <div className="mb-6">
          <span
            className={`text-4xl font-bold ${
              isFeatured ? "text-white" : "text-gray-900"
            }`}
          >
            {price}
          </span>
        </div>

        <div className="mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
            py-4 text-sm border-t
            ${
              isFeatured
                ? "text-gray-200 border-slate-600"
                : "text-gray-600 border-gray-200"
            }
            ${index === features.length - 1 ? "border-b" : ""}
          `}
            >
              {feature}
            </div>
          ))}
        </div>

        <div
          className={`
            w-full py-3 px-6 font-semibold text-sm uppercase tracking-wide
            `}
        >
          Subscribe
        </div>
      </div>
    </div>
  );
};
