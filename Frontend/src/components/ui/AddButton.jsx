
const AddButton = ({ children, onClick, type = 'button', className = '', disabled, loading = false }) => {
  const baseClasses = "flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150";
  
  const styleClasses = loading || disabled 
    ? "bg-indigo-400 text-white cursor-not-allowed"
    : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 transform hover:scale-[1.02]";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${styleClasses} ${className}`}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AddButton;