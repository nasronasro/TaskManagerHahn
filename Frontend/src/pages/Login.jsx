import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import useLoginForm from '../hooks/useLoginForm';

function Login() {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    loading,
    message,
    handleChange,
    handleSubmit,
  } = useLoginForm(() => {
    // This runs only on successful login
    navigate('/projects'); 
  });
  
  return (
    <div className="flex items-center justify-center py-20 px-4 bg-gray-50 font-inter">
      <div 
        className="max-w-md w-full bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-100"
      >
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Welcome Back
        </h2>

        {/* Message Box for API feedback */}
        {message && (
          <div 
            className={`p-3 mb-4 rounded-lg text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <InputField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          
          <InputField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="mt-6">
            {/* Pass the loading state to the Button component */}
            <Button type="submit" loading={loading}>
              Log In
            </Button>
          </div>
        </form>
        {/*
        <div className="mt-6 text-center text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
          */}
      </div>
    </div>
  );
}

export default Login;