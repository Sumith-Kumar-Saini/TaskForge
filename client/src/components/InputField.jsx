export default function InputField({ label, error, registration, ...rest }) {
  return (
    <div>
      <label className="block text-sm sm:text-base font-medium text-gray-700">{label}</label>
      <input
        {...registration}
        {...rest}
        className="mt-1 w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {error && <p className="text-xs sm:text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
