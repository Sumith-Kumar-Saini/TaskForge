const FeatureCard = ({ title, description }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-2 my-5 sm:px-10 md:p-0">
      <div className="w-full lg:w-[70%] lg:max-w-96 border rounded-[7px] flex flex-col items-center justify-center gap-2">
        {/* Title */}
        <h1 className="font-bold text-lg mt-4">{title}</h1>

        {/* Media Placeholder */}
        <div className="bg-zinc-300 w-full h-[300px] flex items-center justify-center text-white">
          <span className="text-sm">img/video show here</span>
        </div>

        {/* Description */}
        <p className="font-semibold text-center mb-4 px-4">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
