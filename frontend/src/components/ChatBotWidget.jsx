import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaRocket, 
  FaComments, 
  FaPaperPlane, 
  FaTimes, 
  FaRobot, 
  FaUser,
  FaFilePdf
} from "react-icons/fa";

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your LaunchPad assistant. How can I help you with your startup today?", type: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      // For demo purposes, we'll just show the filename
      // In a real app, you would upload this to your server/Cloudinary
      setPdfUrl(file.name);
      setMessages(prev => [...prev, {
        text: `PDF attached: ${file.name}`,
        type: "system",
        isPdf: true
      }]);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfUrl("");
  };
  const sendMessage = async () => {
    if (!newMessage.trim() && !pdfFile) return;
  
    // Add user message to chat
    const userMessage = { text: newMessage, type: "user" };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);
  
    try {
      // Convert PDF file to base64 if present
      let pdfBase64 = null;
      if (pdfFile) {
        pdfBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(pdfFile);
        });
      }
  
      const requestBody = {
        question: newMessage,
        pdfBase64: pdfBase64,
        pdfUrl: pdfUrl
      };
  
      const response = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const botResponse = data.summary || data.answer || "I couldn't process that request.";
  
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          text: botResponse, 
          type: "bot" 
        }]);
      }, 700);
      
    } catch (error) {
      console.error("Error sending message:", error);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          text: `Sorry, I encountered an error (${error.message}). Please try again.`, 
          type: "bot" 
        }]);
      }, 700);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && chatWindowRef.current && 
          !chatWindowRef.current.contains(event.target) && 
          !event.target.closest('.chat-toggle-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-blue-500/30 z-50 chat-toggle-button"
        aria-label="Toggle chat"
      >
        <FaComments className="text-xl" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-gray-900 rounded-xl shadow-2xl flex flex-col z-50 border border-gray-800 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <FaRocket className="text-white text-lg" />
                </div>
                <h2 className="text-lg font-bold text-white">LaunchPad Assistant</h2>
              </div>
              <motion.button 
                onClick={toggleChat} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <FaTimes />
              </motion.button>
            </div>
            
            {/* Chat Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 bg-gray-900"
              style={{ height: "350px" }}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-3 ${msg.type === "user" ? "flex justify-end" : "flex justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none"
                        : msg.type === "system"
                        ? "bg-gray-700 text-gray-300 rounded-tl-none"
                        : "bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.type === "bot" && (
                        <div className="bg-blue-500 p-1 rounded-full mt-1">
                          <FaRobot className="text-xs text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        {msg.text}
                        {msg.isPdf && (
                          <div className="flex items-center mt-2 text-blue-300">
                            <FaFilePdf className="mr-2" />
                            <span className="text-sm">{msg.text.replace('PDF attached: ', '')}</span>
                          </div>
                        )}
                      </div>
                      {msg.type === "user" && (
                        <div className="bg-purple-500 p-1 rounded-full mt-1">
                          <FaUser className="text-xs text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-3"
                >
                  <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-500 p-1 rounded-full">
                        <FaRobot className="text-xs text-white" />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-800 bg-gray-900">
              {pdfFile && (
                <div className="flex items-center justify-between mb-2 p-2 bg-gray-800 rounded-lg">
                  <div className="flex items-center text-blue-300">
                    <FaFilePdf className="mr-2" />
                    <span className="text-sm truncate max-w-xs">{pdfFile.name}</span>
                  </div>
                  <button 
                    onClick={removePdf}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              
              <div className="flex gap-2 items-center">
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                  title="Attach PDF"
                >
                  <FaFilePdf />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={pdfFile ? "Ask about the PDF..." : "Type your message..."}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() && !pdfFile}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r ${
                    (newMessage.trim() || pdfFile)
                      ? "from-blue-500 to-purple-600 hover:shadow-blue-500/20" 
                      : "from-gray-600 to-gray-700"
                  } text-white p-3 rounded-lg transition-all`}
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-500">
                  Powered by Gemini AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotWidget;