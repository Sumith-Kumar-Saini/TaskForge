export default function RoleSelector({ roles, registration, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Role
      </label>
      <div className="flex flex-wrap gap-4">
        {roles.map((role) => (
          <label key={role} className="flex items-center gap-2">
            <input
              type="radio"
              value={role}
              {...registration}
              className="accent-blue-600"
            />
            {role}
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
