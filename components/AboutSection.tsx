export default function AboutSection() {
  return (
    <section id="about-section" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-400 mb-4">About SomaScents</h2>
          <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
            At SomaScents, we believe that every moment deserves to be illuminated with beauty and fragrance. Our
            handcrafted candles are more than just sources of light – they are gateways to tranquility, romance, and
            spiritual connection.
          </p>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            Each candle is carefully crafted using premium wax and natural fragrances, ensuring a clean burn and
            long-lasting scent that transforms your space into a sanctuary of peace and warmth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors">
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
            <p className="text-gray-400">
              Made with the finest natural wax and premium fragrance oils for superior quality.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors">
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Handcrafted with Love</h3>
            <p className="text-gray-400">
              Every candle is carefully handmade with attention to detail and passion for excellence.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-700 transition-colors">
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Eco-Friendly</h3>
            <p className="text-gray-400">Sustainable materials and eco-conscious practices for a better tomorrow.</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-amber-400 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            To bring warmth, beauty, and tranquility to every home through our carefully crafted candles. We strive to
            create products that not only illuminate spaces but also elevate spirits and create lasting memories for our
            customers.
          </p>
        </div>
      </div>
    </section>
  )
}
