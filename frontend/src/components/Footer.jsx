import React, { useState } from 'react';
import { 
  FaRocket, 
  FaTwitter, 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Here you would normally send the email to your API
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg shadow-md shadow-blue-500/20">
                  <FaRocket className="text-white" />
                </div>
                <span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Launch</span>
                  <span className="text-white">Pad</span>
                </span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Connecting visionary founders with strategic investors to transform ideas into market-leading realities.
              </p>
            </motion.div>
            
            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4 mt-6"
            >
              <SocialIcon icon={<FaTwitter />} href="#" />
              <SocialIcon icon={<FaLinkedinIn />} href="#" />
              <SocialIcon icon={<FaInstagram />} href="#" />
              <SocialIcon icon={<FaGithub />} href="#" />
            </motion.div>
          </div>
          
          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#" label="About Us" />
              <FooterLink href="#" label="Our Services" />
              <FooterLink href="#" label="Success Stories" />
              <FooterLink href="#" label="Blog" />
            </ul>
          </motion.div>
          
          {/* Column 3: Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500 pb-2">
              Resources
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#" label="Startup Guide" />
              <FooterLink href="#" label="Investor Resources" />
              <FooterLink href="#" label="Events Calendar" />
              <FooterLink href="#" label="FAQ" />
            </ul>
          </motion.div>
          
          {/* Column 4: Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-blue-500 pb-2">
              Stay Updated
            </h4>
            
            {/* Contact Info */}
            <ul className="space-y-3 mb-6">
              <ContactItem icon={<FaEnvelope />} text="info@launchpad.com" />
              <ContactItem icon={<FaPhone />} text="+1 (555) 123-4567" />
              <ContactItem icon={<FaMapMarkerAlt />} text="123 Innovation Way, Tech City" />
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-gray-400 mb-3">Subscribe to our newsletter</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                  {!subscribed && <FaArrowRight className="text-sm" />}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LaunchPad. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Icon Component
const SocialIcon = ({ icon, href }) => (
  <motion.a
    whileHover={{ scale: 1.1, y: -3 }}
    whileTap={{ scale: 0.9 }}
    href={href}
    className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </motion.a>
);

// Footer Link Component
const FooterLink = ({ href, label }) => (
  <li>
    <motion.a
      whileHover={{ x: 5 }}
      href={href}
      className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1 group"
    >
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
        <FaArrowRight className="text-xs" />
      </span>
      {label}
    </motion.a>
  </li>
);

// Contact Item Component
const ContactItem = ({ icon, text }) => (
  <li className="flex items-center gap-3 text-gray-400">
    <span className="text-blue-400">{icon}</span>
    <span>{text}</span>
  </li>
);

export default Footer;