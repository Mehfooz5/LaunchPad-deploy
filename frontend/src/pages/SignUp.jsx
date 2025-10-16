import React, { useState } from 'react';
import API from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'founder',
    contactNo: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // For multi-step form
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Password strength checker
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    setSuccessMessage('');
  
    try {
      const response = await API.post('/signup', {
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
        role: formData.role,
        contactNo: formData.contactNo,
      });
      console.log(response.data);  // Log response data
      if (response.status === 201) {
        setSuccessMessage('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate(formData.role === 'founder' ? '/signup-founder' : '/signup-investor');
        }, 1500);
      }
    } catch (err) {
      console.error('Error:', err?.response?.data || err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Move to next step in the multi-step form
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 px-4 py-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-400 rounded-full opacity-10 blur-3xl"
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 40, 0],
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/2 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 50, 0],
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 18,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-lg p-8 border border-white/20 text-white relative z-10 mb-8"
      >
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-5 rounded-2xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mt-4 mb-2">Join Our Community</h2>
        <p className="text-center text-gray-300 mb-6">Create an account to get started</p>
        
        {/* Progress bar for multi-step form */}
        <div className="flex justify-between items-center mb-8 px-4">
          <div className="flex items-center justify-center w-full">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-500' : 'bg-gray-600'}`}>1</div>
            <div className={`h-1 flex-1 ${step >= 2 ? 'bg-purple-500' : 'bg-gray-600'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-500' : 'bg-gray-600'}`}>2</div>
            <div className={`h-1 flex-1 ${step >= 3 ? 'bg-purple-500' : 'bg-gray-600'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-500' : 'bg-gray-600'}`}>3</div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </motion.div>
        )}
        
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/20 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg mb-6"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800 shadow-lg transition-all"
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Security */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-300">Password strength:</span>
                      <span className="text-xs">
                        {passwordStrength === 0 && "Very weak"}
                        {passwordStrength === 1 && "Weak"}
                        {passwordStrength === 2 && "Medium"}
                        {passwordStrength === 3 && "Strong"}
                        {passwordStrength === 4 && "Very strong"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          passwordStrength === 0 ? 'bg-red-500 w-1/5' : 
                          passwordStrength === 1 ? 'bg-orange-500 w-2/5' : 
                          passwordStrength === 2 ? 'bg-yellow-500 w-3/5' : 
                          passwordStrength === 3 ? 'bg-green-400 w-4/5' : 
                          'bg-green-500 w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {formData.password && formData.confirmPassword && (
                  formData.password !== formData.confirmPassword ? (
                    <p className="text-red-300 text-sm mt-1">Passwords don't match</p>
                  ) : (
                    <p className="text-green-300 text-sm mt-1">Passwords match</p>
                  )
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white/10 text-white font-medium py-2 px-6 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800 shadow-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={formData.password !== formData.confirmPassword}
                  className={`bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800 shadow-lg transition-all ${
                    formData.password !== formData.confirmPassword ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Profile Information */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">I am a:</label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`border ${
                      formData.role === 'founder'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-white/10'
                    } rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-all`}
                    onClick={() => setFormData({ ...formData, role: 'founder' })}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="founder"
                        name="role"
                        checked={formData.role === 'founder'}
                        onChange={() => {}}
                        className="h-4 w-4 text-purple-500 border-gray-300 focus:ring-purple-500"
                      />
                      <label htmlFor="founder" className="ml-2 block cursor-pointer">
                        Founder
                      </label>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">I want to build my startup</p>
                  </div>
                  <div
                    className={`border ${
                      formData.role === 'investor'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-white/10'
                    } rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-all`}
                    onClick={() => setFormData({ ...formData, role: 'investor' })}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="investor"
                        name="role"
                        checked={formData.role === 'investor'}
                        onChange={() => {}}
                        className="h-4 w-4 text-purple-500 border-gray-300 focus:ring-purple-500"
                      />
                      <label htmlFor="investor" className="ml-2 block cursor-pointer">
                        Investor
                      </label>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">I want to invest in startups</p>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Contact Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="+91 000 000 0000"
                  />
                </div>
              </div>

              <div className="flex items-center mb-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                  I agree to the <a href="/terms" className="text-purple-300 hover:text-purple-200">Terms and Conditions</a> and <a href="/privacy" className="text-purple-300 hover:text-purple-200">Privacy Policy</a>
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white/10 text-white font-medium py-2 px-6 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800 shadow-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800 shadow-lg transition-all ${
                    isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
      
      <div className="text-center text-white/80 text-sm">
        <Link to="/login" className="text-white/60 hover:text-white transition-colors">Already have an account? <h1 className="text-purple-300 hover:text-purple-200 font-medium">Sign In</h1></Link>
      </div>
    </div>
  );
};

export default SignUp;