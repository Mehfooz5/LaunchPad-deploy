import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await API.post('/login', formData);
      const { token, role } = res.data;

      localStorage.setItem('token', token);

      if (role === 'founder') {
        navigate('/founder-profile');
      } else if (role === 'investor') {
        navigate('/investor-profile');
      } else {
        navigate('/');
      }

    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-800 to-violet-800 px-4 py-10 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 30, 0],
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-md p-8 border border-white/20 relative z-10"
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white text-center mt-4 mb-6">
          Welcome Back
        </h2>
        
        <p className="text-gray-300 text-center mb-8">
          Sign in to access your account
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 text-red-200 text-center py-3 px-4 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-200 text-sm font-medium block">Email Address</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-transparent outline-none text-white placeholder-gray-400 ml-3 flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-200 text-sm font-medium block">Password</label>
              <a href="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 font-medium">
                Forgot password?
              </a>
            </div>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-transparent outline-none text-white placeholder-gray-400 ml-3 flex-1"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-300 hover:text-blue-200 font-medium">
              Create Account
            </a>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm text-center mb-4">Or continue with</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white/10 hover:bg-white/20 transition p-2 rounded-full">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
            </button>
            <button className="bg-white/10 hover:bg-white/20 transition p-2 rounded-full">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
              </svg>
            </button>
            <button className="bg-white/10 hover:bg-white/20 transition p-2 rounded-full">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;