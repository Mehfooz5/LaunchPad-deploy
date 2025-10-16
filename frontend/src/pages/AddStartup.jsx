import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";
import {
  FaRocket,
  FaFileUpload,
  FaVideo,
  FaMapMarkerAlt,  // <-- Make sure this line is added
  FaLaptopCode,
  FaGraduationCap,
  FaBuilding,
  FaLeaf,
  FaHeartbeat,
  FaLightbulb,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChevronRight,
  FaChevronLeft,
  FaRegFilePdf,
  FaRegFileVideo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AddStartup = ({ startupId }) => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    domain: "tech",
    stage: "Idea",
    location: "",
    description: "",
    startupPdf: null,
    pitch: null,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");

  // Fetch the existing startup data when the component is mounted (if editing an existing profile)
  useEffect(() => {
    if (startupId) {
      axios.get(`/startup/${startupId}`)
        .then((response) => {
          setFormData(response.data);  // Assuming response contains the startup data
        })
        .catch((err) => {
          setError("Failed to fetch startup data.");
        });
    }
  }, [startupId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");
  
    try {
      // Construct FormData object to handle file uploads
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) formDataToSend.append(key, formData[key]);
      });
  
      // Always POST to /startup (no need to use PUT or conditional URLs)
      const url = "/startup";
  
      const response = await API.post(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.status === 201) {
        setSuccessMessage("Startup profile submitted successfully!");
        Navigate("/founder-profile");  // Redirect to founder profile page
      } else {
        throw new Error("Error in backend response");
      }
    } catch (err) {
      setError("An error occurred while submitting. Please try again.");
      console.error("Error in submitting form:", err);  // Log error for debugging
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  const getDomainIcon = (domain) => {
    switch (domain) {
      case "tech":
        return <FaLaptopCode className="text-blue-500" />;
      case "education":
        return <FaGraduationCap className="text-green-500" />;
      case "medical":
        return <FaHeartbeat className="text-red-500" />;
      case "agriculture":
        return <FaLeaf className="text-green-600" />;
      default:
        return <FaRocket className="text-gray-500" />;
    }
  };

  const getStageIcon = (stage) => {
    switch (stage) {
      case "Idea":
        return <FaLightbulb className="text-yellow-500" />;
      case "Prototype":
        return <FaRocket className="text-orange-500" />;
      case "MVP":
        return <FaRocket className="text-blue-500" />;
      case "Revenue":
        return <FaChartLine className="text-green-500" />;
      default:
        return <FaLightbulb className="text-yellow-500" />;
    }
  };

  const sections = [
    { id: "basic", title: "Basic Info", icon: "1" },
    { id: "details", title: "Details", icon: "2" },
    { id: "uploads", title: "Uploads", icon: "3" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Launch Your <span className="text-blue-600">Startup</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your startup profile to connect with investors and collaborators
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center w-full max-w-md">
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-col items-center relative ${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    ${activeSection === section.id ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border-2 border-gray-300'}`}>
                    <span className={`font-medium ${activeSection === section.id ? 'text-blue-600' : 'text-gray-500'}`}>
                      {section.icon}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${activeSection === section.id ? 'text-blue-600' : 'text-gray-500'}`}>
                    {section.title}
                  </span>
                </button>
                {index < sections.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-gray-200 relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: sections.findIndex(s => s.id === activeSection) > index ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
        >
          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-4"
              >
                <div className="flex items-center">
                  <FaExclamationTriangle className="text-red-500 mr-3" />
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-green-50 border-l-4 border-green-500 p-4"
              >
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  <div className="text-sm text-green-700">{successMessage}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* Basic Info Section */}
              {activeSection === "basic" && (
                <motion.div
                  key="basic"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.div variants={fadeIn}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Startup Title</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRocket className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Enter your startup name"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                      <div className="relative">
                        <select
                          name="domain"
                          value={formData.domain}
                          onChange={handleChange}
                          required
                          className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        >
                          <option value="tech">Technology</option>
                          <option value="education">Education</option>
                          <option value="medical">Medical</option>
                          <option value="agriculture">Agriculture</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {getDomainIcon(formData.domain)}
                        </div>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Development Stage</label>
                      <div className="relative">
                        <select
                          name="stage"
                          value={formData.stage}
                          onChange={handleChange}
                          required
                          className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        >
                          <option value="Idea">Idea Phase</option>
                          <option value="Prototype">Prototype</option>
                          <option value="MVP">Minimum Viable Product</option>
                          <option value="Revenue">Generating Revenue</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {getStageIcon(formData.stage)}
                        </div>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="City, Country"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn} className="flex justify-end pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveSection("details")}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      Continue
                      <FaChevronRight className="ml-2" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Details Section */}
              {activeSection === "details" && (
                <motion.div
                  key="details"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.div variants={fadeIn}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Startup Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      placeholder="Describe your startup in detail..."
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Explain your value proposition, target market, and what makes your startup unique.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeIn} className="flex justify-between pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveSection("basic")}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      <FaChevronLeft className="mr-2" />
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveSection("uploads")}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      Continue
                      <FaChevronRight className="ml-2" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Uploads Section */}
              {activeSection === "uploads" && (
                <motion.div
                  key="uploads"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.div variants={fadeIn}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pitch Deck (PDF)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="startupPdf"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="startupPdf"
                              name="startupPdf"
                              type="file"
                              onChange={handleChange}
                              accept="application/pdf"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF up to 10MB</p>
                        {formData.startupPdf ? (
                          <div className="flex items-center justify-center mt-2 text-sm text-gray-700">
                            <FaRegFilePdf className="mr-2 text-red-500" />
                            <span>{formData.startupPdf.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center mt-4">
                            <FaFileUpload className="text-3xl text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pitch Video</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="pitch"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="pitch"
                              name="pitch"
                              type="file"
                              onChange={handleChange}
                              accept="video/*"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">MP4, MOV up to 100MB</p>
                        {formData.pitch ? (
                          <div className="flex items-center justify-center mt-2 text-sm text-gray-700">
                            <FaRegFileVideo className="mr-2 text-blue-500" />
                            <span>{formData.pitch.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center mt-4">
                            <FaVideo className="text-3xl text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeIn} className="flex justify-between pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setActiveSection("details")}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      <FaChevronLeft className="mr-2" />
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Startup
                          <FaRocket className="ml-2" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AddStartup