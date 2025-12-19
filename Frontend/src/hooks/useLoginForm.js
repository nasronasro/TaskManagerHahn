import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BASE_URL, LOGIN_ENDPOINT } from '../config/apiConfig.js';

const useLoginForm = (onSuccess) => { 
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const url = `${BASE_URL}${LOGIN_ENDPOINT}/login`;
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.Error || 'Login failed');
      }

      login(data.user, data.token);
      
      if (onSuccess) onSuccess();

    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return { formData, errors, loading, message, handleChange, handleSubmit };
};

export default useLoginForm;