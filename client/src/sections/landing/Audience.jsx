import userTypes from "@/data/landing/userTypes";

const cardWrapperClasses =
  "w-full h-[300px] md:h-[400px] flex flex-col items-center justify-center bg-gray-100 text-gray-400 border text-center px-4";

const TargetUsers = () => {
  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mt-10 px-4 text-center">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl">
          Built for Everyone
        </h1>
        <p className="font-semibold md:text-xl mb-5">
          Whether you work solo, in a startup, or on a big team — TaskForge
          helps you stay organized.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-2 lg:grid-cols-2 lg:px-20 xl:px-40">
        {userTypes.map(({ id, title, description }) => (
          <div key={id} className={cardWrapperClasses}>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-sm md:text-base">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TargetUsers;
