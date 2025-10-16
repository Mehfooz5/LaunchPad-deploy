"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaRocket,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSearch,
  FaPlus,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaChevronUp
} from "react-icons/fa"
import API from "../api/axios"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const isHome = location.pathname === "/"
  const isInvestor = location.pathname === "/investor-profile"
  const isFounder = location.pathname === "/founder-profile"
  const isAboutUs = location.pathname === "/about-us"

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      
      // Show scroll to top button after scrolling down 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await API.post("/logout")
      localStorage.clear()
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleExploreStartups = () => {
    navigate("/explore-startups")
  }

  const handleAddStartup = () => {
    navigate("/add-startup")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-gray-900/95 backdrop-blur-md shadow-xl py-3 border-b border-gray-800/50" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg shadow-md shadow-blue-500/20"
            >
              <FaRocket className="text-white text-xl" />
            </motion.div>
            <div className="text-2xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Launch</span>
              <span className="text-white">Pad</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            {isHome && (
              <>
                <NavLink to="/about-us" icon={<FaInfoCircle />} label="About Us" />
                <NavLink to="/login" icon={<FaSignInAlt />} label="Login" isPrimary />
              </>
            )}

            {isInvestor && (
              <>
                <NavButton onClick={handleExploreStartups} icon={<FaSearch />} label="Explore Startups" />
                <NavButton onClick={handleLogout} icon={<FaSignOutAlt />} label="Logout" variant="danger" />
              </>
            )}

            {isFounder && (
              <>
                <NavButton onClick={handleAddStartup} icon={<FaPlus />} label="Add Startup" variant="purple" />
                <NavButton onClick={handleExploreStartups} icon={<FaSearch />} label="Explore Startups" />
                <NavButton onClick={handleLogout} icon={<FaSignOutAlt />} label="Logout" variant="danger" />
              </>
            )}

            {isAboutUs && (
              <>
                <NavLink to="/" icon={<FaHome />} label="Home" />
                <NavLink to="/login" icon={<FaSignInAlt />} label="Login" isPrimary />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors mobile-menu-button"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 w-full bg-gray-900/95 backdrop-blur-lg z-40 shadow-xl md:hidden mobile-menu-container border-b border-gray-800"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-3">
              {isHome && (
                <>
                  <MobileNavLink to="/about-us" icon={<FaInfoCircle />} label="About Us" onClick={toggleMobileMenu} />
                  <MobileNavLink
                    to="/login"
                    icon={<FaSignInAlt />}
                    label="Login"
                    onClick={toggleMobileMenu}
                    isPrimary
                  />
                </>
              )}

              {isInvestor && (
                <>
                  <MobileNavButton
                    onClick={() => {
                      handleExploreStartups()
                      toggleMobileMenu()
                    }}
                    icon={<FaSearch />}
                    label="Explore Startups"
                  />
                  <MobileNavButton
                    onClick={() => {
                      handleLogout()
                      toggleMobileMenu()
                    }}
                    icon={<FaSignOutAlt />}
                    label="Logout"
                    variant="danger"
                  />
                </>
              )}

              {isFounder && (
                <>
                  <MobileNavButton
                    onClick={() => {
                      handleAddStartup()
                      toggleMobileMenu()
                    }}
                    icon={<FaPlus />}
                    label="Add Startup"
                    variant="purple"
                  />
                  <MobileNavButton
                    onClick={() => {
                      handleExploreStartups()
                      toggleMobileMenu()
                    }}
                    icon={<FaSearch />}
                    label="Explore Startups"
                  />
                  <MobileNavButton
                    onClick={() => {
                      handleLogout()
                      toggleMobileMenu()
                    }}
                    icon={<FaSignOutAlt />}
                    label="Logout"
                    variant="danger"
                  />
                </>
              )}

              {isAboutUs && (
                <>
                  <MobileNavLink to="/" icon={<FaHome />} label="Home" onClick={toggleMobileMenu} />
                  <MobileNavLink
                    to="/login"
                    icon={<FaSignInAlt />}
                    label="Login"
                    onClick={toggleMobileMenu}
                    isPrimary
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

// Desktop Navigation Link Component
const NavLink = ({ to, icon, label, isPrimary = false }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isPrimary
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          : "text-gray-200 hover:bg-gray-800/50 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.div>
  </Link>
)

// Desktop Navigation Button Component
const NavButton = ({ onClick, icon, label, variant = "default" }) => {
  const variants = {
    default:
      "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40",
    purple:
      "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40",
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${variants[variant]}`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  )
}

// Mobile Navigation Link Component
const MobileNavLink = ({ to, icon, label, onClick, isPrimary = false }) => (
  <Link to={to} onClick={onClick}>
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${
        isPrimary
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
          : "text-gray-200 hover:bg-gray-800/70 hover:text-white"
      }`}
    >
      <div className="text-xl">{icon}</div>
      <span>{label}</span>
    </motion.div>
  </Link>
)

// Mobile Navigation Button Component
const MobileNavButton = ({ onClick, icon, label, variant = "default" }) => {
  const variants = {
    default: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md",
    purple: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md",
  }

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-3 p-3 rounded-lg font-medium w-full transition-all ${variants[variant]}`}
    >
      <div className="text-xl">{icon}</div>
      <span>{label}</span>
    </motion.button>
  )
}

export default Navbar