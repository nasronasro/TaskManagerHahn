
function InputField({ id, label, type, placeholder, error, value, onChange }) {
  const inputClasses = `
    w-full p-3 border
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}
    rounded-lg shadow-sm
    focus:outline-none focus:ring-2 focus:border-transparent
    transition duration-150
  `;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id} 
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        onChange={onChange}

        aria-invalid={!!error} 
      />
      {error && (
        <span className="mt-1 text-xs text-red-600 font-medium" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default InputField;