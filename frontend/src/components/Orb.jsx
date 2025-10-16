<div
      ref={mainRef}
      className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Animated Missile (CSS-based instead of Three.js) */}
      <motion.div
        className="fixed bottom-0 right-0 z-10 pointer-events-none"
        style={{
          y: missileY,
          x: missileX,
          rotate: missileRotate,
          scale: missileScale,
        }}
      >
        <div className="relative">
          <FaRocket className="text-blue-500 text-5xl" />
          <div className="absolute -bottom-6 -left-1 w-8 h-12 bg-gradient-to-t from-blue-500/80 to-transparent rounded-full blur-md"></div>
        </div>
      </motion.div>

      {/* Hero Section - Enhanced */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg?t=st=1744815699~exp=1744819299~hmac=2bf550ce03c25fce2d1227360dfe78012b01b2fc90416c9a5d1dc6b76d25e161&w=1380"
            alt="Hero"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoMzB2NkgzNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-left mb-10 md:mb-0"
          >
            <span className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 text-sm font-medium">
              Transforming Ideas into Reality
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Elevate Your Vision
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold max-w-2xl mb-8 leading-relaxed text-gray-200">
              We connect groundbreaking innovations with strategic investors and industry experts who can transform your
              concept into a market-leading reality.
            </h2>

            <div className="flex flex-wrap gap-4">
              <GradientButton href="/login" primary>
                Launch Your Journey
                <FaRocket className="text-sm" />
              </GradientButton>

              <motion.a
                href="#learn-more"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-blue-500/50 hover:border-blue-500 rounded-full text-lg font-bold text-blue-300 hover:text-blue-200 transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>Learn More</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div style={{ y: heroImageY }} className="md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              {/* Animated Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    scale: 1 + i * 0.15,
                  }}
                  animate={{
                    scale: [1 + i * 0.15, 1.2 + i * 0.15, 1 + i * 0.15],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <FaRocket className="text-7xl md:text-8xl text-white" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Stats Section - Enhanced */}
      <section
        id="learn-more"
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-3xl"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 20 + Math.random() * 30,
                height: 20 + Math.random() * 30,
                background: `rgba(${59 + Math.random() * 100}, ${130 + Math.random() * 50}, 246, ${0.1 + Math.random() * 0.2})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 text-sm font-medium">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Driving Innovation Forward
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg">
              Our platform has become the catalyst for groundbreaking collaborations between visionaries and investors,
              creating a thriving ecosystem of innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm hover:from-gray-800 hover:to-gray-800 transition-all duration-300 border border-blue-500/10 group h-full rounded-xl shadow-lg p-8 text-center">
                  <div className="text-5xl text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {loading ? "..." : <CounterAnimation target={stat.value} />}
                  </div>
                  <div className="text-xl text-blue-200 font-medium mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {error && <div className="text-red-500 text-center mt-6 text-lg font-medium">{error}</div>}
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/5 backdrop-blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-sm font-medium">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Hear From Our Community
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300 text-lg">
              Real stories from founders and investors who have transformed their visions into reality through our
              platform.
            </p>
          </motion.div>

          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-gray-800/50 p-1 rounded-full">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === index
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  activeTab === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-purple-500/10 h-full rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-purple-500/30">
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                          <div>
                            <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                            <p className="text-purple-300">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Founders vs Investors Section - Enhanced */}
      <section className="min-h-[600px] flex flex-col justify-center items-center px-6 py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoMzB2NkgzNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat opacity-5"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <span className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 text-sm font-medium">
            Join Our Ecosystem
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Connect & Collaborate
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg">
            Whether you're building the next big thing or looking to invest in tomorrow's innovations, our platform
            brings together the perfect partners.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl relative z-10">
          {/* Founder Box */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1)" }}
            className="h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-10 rounded-2xl shadow-xl border border-blue-500/20 text-center transition-all duration-300 relative overflow-hidden group"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-500/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <FaUsers className="text-3xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-blue-300">Visionary Founders</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                I'm an entrepreneur with groundbreaking ideas seeking strategic investment and expert mentorship to
                transform my vision into market-leading reality.
              </p>
              <GradientButton href="/login" className="w-full justify-center">
                Start Your Journey
              </GradientButton>
            </div>
          </motion.div>

          {/* Investor Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.1)" }}
            className="h-full bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-10 rounded-2xl shadow-xl border border-purple-500/20 text-center transition-all duration-300 relative overflow-hidden group"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -left-20 -top-20 w-40 h-40 bg-purple-500/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                  <FaBriefcase className="text-3xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-purple-300">Strategic Investors</h2>
              <p className="text-purple-100 mb-8 leading-relaxed">
                I have the capital, industry connections, and expertise to fuel promising startups, helping them scale
                rapidly while providing valuable strategic guidance.
              </p>
              <GradientButton
                href="/login"
                className="w-full justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600"
              >
                Discover Opportunities
              </GradientButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sample Pitches Section - Enhanced */}
      <div className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800 relative">
        <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-3xl"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto relative z-10"
        >
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 text-sm font-medium">
              Innovation Showcase
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Breakthrough Startup Ventures
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore revolutionary ideas that are reshaping industries and creating new market opportunities. These
              innovative startups are tackling real-world challenges with cutting-edge solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pitches.map((pitch, idx) => (
              <AnimatedCard key={idx} delay={idx * 0.1} className="h-full">
                <div className="group h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 overflow-hidden relative transition-all duration-300 rounded-xl shadow-lg">
                  <div
                    className="absolute -right-10 -top-10 w-24 h-24 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ background: `${pitch.color}33` }}
                  ></div>

                  <div className="relative p-6">
                    <span
                      className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full"
                      style={{ backgroundColor: `${pitch.color}22`, color: pitch.color }}
                    >
                      {pitch.category}
                    </span>

                    <div className="overflow-hidden rounded-xl mb-5">
                      <img
                        src={pitch.image || "/placeholder.svg"}
                        alt={pitch.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {pitch.title}
                    </h3>

                    <p className="text-gray-400">{pitch.desc}</p>

                    <div className="mt-6 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-1 group"
                      >
                        <span>Learn more</span>
                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section - Enhanced */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0wIDBoMzB2NkgzNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat opacity-5"></div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Vision Into Reality?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join our thriving ecosystem of innovators, investors, and industry experts to accelerate your journey from
              concept to market leadership.
            </p>
            <GradientButton href="/login" primary={false}>
              <span>Begin Your Journey</span>
              <FaRocket className="text-sm" />
            </GradientButton>
          </motion.div>
        </div>
      </section>
    </div>