"use client"
import { motion } from "framer-motion"
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaHandshake,
  FaChartLine,
  FaStar,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa"

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6 lg:px-24">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5"></div>
          <div className="p-10">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full shadow-md">
                <FaRocket className="text-blue-600 text-4xl" />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">LaunchPad</span>
            </h1>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Welcome to <span className="font-semibold text-blue-600">LaunchPad</span>, your gateway to the startup
              ecosystem. We empower <strong>founders</strong>, connect them with <strong>investors</strong>, and provide
              the tools to build the future.
            </p>
          </div>
        </div>

        {/* Mission */}
        <motion.div variants={fadeIn} className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-8 mb-12 border-l-4 border-blue-500/60">
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 text-2xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 pl-9 leading-relaxed">
            To bridge the gap between visionary founders and forward-thinking investors by providing a streamlined,
            transparent, and opportunity-rich environment where ideas transform into thriving ventures.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-10 mb-12">
          <div className="flex items-center mb-6">
            <FaLightbulb className="text-blue-600 text-2xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">What We Do</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {[
              ["Showcase Startups", "Detailed profiles and video pitches"],
              ["Investor Exploration", "Help investors find high-potential startups"],
              ["Smart Matchmaking", "Connect startups with the right investors"],
              ["Full-Stage Support", "From idea to revenue generation"],
            ].map(([title, desc], i) => (
              <motion.div variants={fadeIn} key={i} className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg mt-1">
                  <FaCheckCircle className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Who We Serve */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-10 mb-12">
          <div className="flex items-center mb-6">
            <FaUsers className="text-blue-600 text-2xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Who We Serve</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              ["Founders", "Students, professionals, and innovative thinkers", FaRocket],
              ["Investors", "Angels, VCs, and investment institutions", FaChartLine],
              ["Mentors & Incubators", "Guides and supporters for growing startups", FaGraduationCap],
            ].map(([title, desc, Icon], i) => (
              <motion.div
                variants={fadeIn}
                key={i}
                className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-all border border-blue-100"
              >
                <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4 shadow-sm">
                  <Icon className="text-blue-600 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call To Action */}
        <motion.div
          variants={fadeIn}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-10 text-center text-white"
        >
          <FaHandshake className="text-white text-3xl mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-3">Join us in shaping the future of innovation</h2>
          <p className="opacity-90 mb-6">Let's build, back, and bring ideas to life.</p>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition"
          >
            Get Started
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutUs
