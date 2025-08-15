"use client";
import React, { useState, useEffect } from "react";
import FlowerCard from "@components/flower_card";

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
    secret:
      "You found the secret! 🌟 <br /> This means you're as curious and wonderful as I hoped you'd be 💫",
    meaning:
      "Hydrangeas symbolize heartfelt emotions, gratitude, and understanding. <br /> They're often given as a gesture of appreciation and to convey deep feelings.",
    footer:
      "Every flower blooms in its own time, just like every feeling finds its moment to be shared. 💜",
  };

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
      <FlowerCard
        message={message}
        isVisible={isVisible}
        handleLike={handleLike}
        handleShare={handleShare}
        createSparkle={createSparkle}
        liked={liked}
        showMessage={showMessage}
      />

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
