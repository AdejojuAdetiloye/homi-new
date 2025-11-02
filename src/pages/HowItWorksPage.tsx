import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustSection } from '@/components/home/TrustSection';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden will-change-transform">
          {/* Animated Background Images */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
              alt="Luxury mansion in Lagos"
              className="absolute inset-0 w-full h-full object-cover animate-image-fade"
            />
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop"
              alt="Modern villa in Lagos"
              className="absolute inset-0 w-full h-full object-cover animate-image-fade"
              style={{ animationDelay: '3s' }}
            />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
              alt="Elegant home in Lagos"
              className="absolute inset-0 w-full h-full object-cover animate-image-fade"
              style={{ animationDelay: '6s' }}
            />
            <img
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&h=1080&fit=crop"
              alt="Contemporary mansion in Lagos"
              className="absolute inset-0 w-full h-full object-cover animate-image-fade"
              style={{ animationDelay: '9s' }}
            />
          </div>

          {/* Dark Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Particle Effects */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-particle-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Glassmorphism Container */}
          <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 mx-4 max-w-4xl shadow-2xl animate-float-slow will-change-transform">
            <div className="text-center">
              {/* Enhanced Typography */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl animate-pulse-glow">
                How HomiLink Works
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 drop-shadow-lg">
                Your complete guide to renting safely with escrow protection
              </p>

              {/* Animated Icons */}
              <div className="flex justify-center space-x-4 md:space-x-8 mb-6 md:mb-8">
                <div className="animate-float">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div className="animate-float" style={{ animationDelay: '1s' }}>
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="animate-float" style={{ animationDelay: '2s' }}>
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse-glow">
                Get Started Now
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-scroll-bounce">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
        <HowItWorks />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
