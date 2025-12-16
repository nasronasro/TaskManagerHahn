
function Button({ children, type = 'button', onClick, disabled = false }) {
  const baseClasses = `
    w-full py-3 px-4
    text-white font-semibold rounded-lg
    shadow-md
    transition duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
  `;

  const enabledClasses = `
    bg-green-600 hover:bg-green-700
    active:bg-green-800
  `;

  const disabledClasses = `
    bg-green-300 cursor-not-allowed
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
    >
      {children}
    </button>
  );
}

export default Button;