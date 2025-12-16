import React, { useState } from 'react';

import { BASE_URL, LOGIN_ENDPOINT } from '../config/apiConfig.js';

const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage(null);
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    const url = `${BASE_URL}${LOGIN_ENDPOINT}`;
    
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorText = 'Login failed. Please check your credentials.';
        try {
            const errorData = await response.json();
            errorText = errorData.message || errorText;
            console.error('API Error Response:', errorData);
        } catch (e) {
            console.error('Failed to parse error response body:', e);
        }
        
        setMessage({ type: 'error', text: errorText });
        return;
      }

      const data = await response.json();
      
      setMessage({ type: 'success', text: `Welcome, ${data.user?.name || 'User'}! Login was successful.` });
      console.log('Login Successful, received data:', data);
      
      // In a real app, you would save the token and redirect here
      
    } catch (err) {
      console.error('Network or Parse Error:', err);
      setMessage({ type: 'error', text: 'A network error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleLogin();
    }
  };

  const isFormValid = formData.email && formData.password.length >= 6;
  
  return {
    formData,
    errors,
    loading,
    message,
    handleChange,
    handleSubmit,
    isFormValid,
  };
};

export default useLoginForm