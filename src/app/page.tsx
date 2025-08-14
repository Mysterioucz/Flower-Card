"use client";
import React, { useState, useEffect } from "react";

interface Particle {
  id: number;
  size: number;
  left: number;
  top: number;
  delay: number;
  color: string;
}
interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const HydrangeaCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [liked, setLiked] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [currentTime, setCurrentTime] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewCount, setViewCount] = useState(1);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);
    setTimeout(() => setShowMessage(true), 1500);

    // Generate floating particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 12 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      color: [
        "bg-pink-200/30",
        "bg-purple-200/30",
        "bg-blue-200/30",
        "bg-white/40",
      ][i % 4],
    }));
    setParticles(newParticles);

    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setViewCount((prev) => prev + 1);
    }
    // Add heart animation
    setTimeout(() => setLiked(false), 3000);
  };

  const handleSecretClick = () => {
    setShowSecret(!showSecret);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "A Special Message",
          text: "Hydrangeas symbolize heartfelt emotions and gratitude 💜",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const createSparkle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparkle = {
      id: Date.now(),
      x: x,
      y: y,
    };

    setSparkles((prev) => [...prev, newSparkle]);

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1000);
  };

  const message = {
    secret: "You found the secret! 🌟 <br /> This means you're as curious and wonderful as I hoped you'd be 💫",
    meaning: "Hydrangeas symbolize heartfelt emotions, gratitude, and understanding. <br /> They're often given as a gesture of appreciation and to convey deep feelings.",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-indigo-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Parallax Background Layer */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${
            mousePosition.y * 0.05
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/15 rounded-full blur-lg"></div>
      </div>

      {/* Time & View Counter */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm">
        <div className="flex items-center space-x-3">
          <span>🕐 {currentTime}</span>
          <span>👁️ {viewCount}</span>
        </div>
      </div>

      {/* Secret Easter Egg */}
      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md cursor-pointer hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
        onClick={handleSecretClick}
        title="Click for a surprise 🎁"
      >
        <span className="text-white text-xs">✨</span>
      </div>

      {/* Secret Message Popup */}
      {showSecret && (
        <div className="absolute top-16 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl max-w-xs animate-bounce z-10">
          <div className="text-center">
            <div className="text-2xl mb-2">🎁</div>
            <p
              className="text-sm text-gray-700 font-medium"
              dangerouslySetInnerHTML={{ __html: message.secret }}
            />
            <button
              className="mt-2 text-xs text-purple-600 underline"
              onClick={() => setShowSecret(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} pointer-events-none animate-bounce`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            animationIterationCount: "infinite",
          }}
        />
      ))}

      {/* Sparkle Effects */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full pointer-events-none animate-ping"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            animationDuration: "1s",
          }}
        />
      ))}

      {/* Main Card with Enhanced Effects */}
      <div
        className={`max-w-md w-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 text-center transition-all duration-1000 hover:shadow-3xl hover:-translate-y-2 cursor-pointer relative overflow-hidden group ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
        onClick={createSparkle}
      >
        {/* Card Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating Mini Hearts */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="animate-pulse text-pink-400">💕</div>
        </div>

        {/* Flower Icon with Breathing Animation */}
        <div className="text-6xl mb-6 animate-pulse hover:scale-110 transition-transform duration-300 relative z-10">
          🌸
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Enhanced Title with Text Shadow */}
        <h1
          className={`text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent transition-all duration-1500 hover:scale-105 relative z-10 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontFamily: '"Dancing Script", cursive',
            textShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
          }}
        >
          Hydrangea
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60"></div>
        </h1>

        {/* Progress Bar for Reading */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-3000 ease-out"
            style={{ width: isVisible ? "100%" : "0%" }}
          ></div>
        </div>

        {/* Meaning Text */}
        <p
          className={`text-gray-700 mb-8 leading-relaxed text-lg transition-all duration-2000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          dangerouslySetInnerHTML={{ __html: message.meaning }}
        />

        {/* Enhanced Spotify Embed with Vinyl Record Effect */}
        <div
          className={`mb-6 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-2500 relative group ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Vinyl Record Animation */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-black rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-spin transition-opacity duration-300 z-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
          </div>

          <iframe
            src="https://open.spotify.com/embed/track/2yCyYz6JQdJRjGFQjrUJTy?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />

          {/* Music Notes Animation */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-sm animate-bounce">🎵</div>
          </div>
        </div>

        {/* Enhanced Action Buttons with Ripple Effect */}
        <div
          className={`flex justify-center space-x-6 mb-6 transition-all duration-1000 ${
            showMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={handleLike}
            className={`relative p-4 rounded-full transition-all duration-300 hover:scale-110 group overflow-hidden ${
              liked
                ? "text-red-500 bg-red-100 shadow-lg shadow-red-200"
                : "text-gray-500 hover:text-red-400 hover:bg-red-50"
            }`}
            title="Like this message"
          >
            {/* Ripple Effect */}
            <div className="absolute inset-0 bg-red-400 rounded-full scale-0 group-active:scale-100 opacity-30 transition-transform duration-200"></div>

            <svg
              className="w-6 h-6 relative z-10"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>

            {/* Like Counter Badge */}
            {liked && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                {viewCount}
              </div>
            )}
          </button>

          <button
            onClick={handleShare}
            className="relative p-4 rounded-full text-gray-500 hover:text-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-110 group overflow-hidden shadow-lg hover:shadow-blue-200"
            title="Share this beautiful message"
          >
            <div className="absolute inset-0 bg-blue-400 rounded-full scale-0 group-active:scale-100 opacity-30 transition-transform duration-200"></div>
            <svg
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </button>

          <button
            className="relative p-4 rounded-full text-gray-500 hover:text-green-400 hover:bg-green-50 transition-all duration-300 hover:scale-110 group overflow-hidden shadow-lg hover:shadow-green-200"
            title="Listen with your heart 🎧"
            onClick={() => {
              // You could add a gentle chime sound here
              if (typeof Audio !== "undefined") {
                // new Audio('/path-to-your-sound.mp3').play();
              }
            }}
          >
            <div className="absolute inset-0 bg-green-400 rounded-full scale-0 group-active:scale-100 opacity-30 transition-transform duration-200"></div>
            <svg
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 9H4a1 1 0 00-1 1v4a1 1 0 001 1h2l5 4V5L6 9z"
              />
            </svg>

            {/* Sound Wave Animation */}
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-0.5">
                <div className="w-0.5 h-2 bg-green-400 animate-pulse"></div>
                <div
                  className="w-0.5 h-3 bg-green-400 animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-0.5 h-2 bg-green-400 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </button>
        </div>

        {/* Personal Message */}
        <p
          className={`text-gray-600 italic text-sm transition-all duration-1500 ${
            showMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          "Every flower blooms in its own time, just like every feeling finds
          its moment to be shared." 💜
        </p>
      </div>

      {/* Floating Hearts Animation */}
      {liked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-400 text-2xl animate-bounce"
              style={{
                left: `${30 + i * 8}%`,
                top: `${20 + (i % 3) * 15}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "2s",
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HydrangeaCard;
