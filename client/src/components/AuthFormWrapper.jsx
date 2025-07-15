export default function AuthFormWrapper({ title, subtitle, imageUrl, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row w-[90%] max-w-5xl shadow-lg bg-white rounded-lg overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-10">
          <img src={imageUrl} alt="Illustration" className="w-full max-w-md" />
        </div>

        <div className="w-full md:w-1/2 px-6 py-8 sm:px-10 sm:py-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
