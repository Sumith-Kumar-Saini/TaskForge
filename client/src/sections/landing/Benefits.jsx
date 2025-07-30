import benefits from "@/data/landing/benefits";

export default function WhyChooseTaskForge() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Why Teams Love TaskForge</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          From speed to privacy, here’s why TaskForge stands out for modern
          teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {benefits.map((feature, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700 text-sm">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
