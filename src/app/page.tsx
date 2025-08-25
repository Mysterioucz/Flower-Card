"use client";
import React, { useState, useEffect } from "react";
import FlowerCard from "@components/flower_card";
import { Flower, flowers, footerMessage } from "@/data/flower";

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

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [liked, setLiked] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentFlowerId, setCurrentFlowerId] = useState<number>(
    flowers.length - 1
  );
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  // Handle touch/mouse start
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  // Handle touch/mouse move
  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startX;
    setTranslateX(deltaX);
  };

  // Handle touch/mouse end
  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const threshold = 100; // Minimum swipe distance

    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentFlowerId > 0) {
        // Swipe right - go to previous card
        console.log("Swiped right");
        setCurrentFlowerId((prev) => prev - 1);
      } else if (translateX < 0 && currentFlowerId < flowers.length - 1) {
        // Swipe left - go to next card
        console.log("Swiped left");
        setCurrentFlowerId((prev) => prev + 1);
      }
    }

    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  // Navigation functions
  const goToNext = () => {
    if (currentFlowerId < flowers.length - 1) {
      setCurrentFlowerId((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentFlowerId > 0) {
      setCurrentFlowerId((prev) => prev - 1);
    }
  };

  const goToCard = (flowerId: number) => {
    setCurrentFlowerId(flowerId);
  };

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, startX, translateX]);

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
      navigator.clipboard.writeText(window.location.toString());
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

  return (
    <div
      className={`gap-4 min-h-screen ${flowers[currentFlowerId].color.backgroundColor} flex items-center justify-center p-4 relative overflow-hidden`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Secret Easter Egg */}
      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md cursor-pointer hover:bg-white/30 transition-all duration-300 flex items-center justify-center z-1"
        onClick={handleSecretClick}
        title="Click for a surprise 🎁"
      >
        <span className="text-white text-xs">✨</span>
      </div>

      {/* Secret Message Popup */}
      {showSecret && (
        <div className="absolute top-16 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl max-w-xs z-5">
          <div className="text-center">
            <div className="text-2xl mb-2">🎁</div>
            <p
              className="text-sm text-gray-700 font-medium"
              dangerouslySetInnerHTML={{
                __html: flowers[currentFlowerId].meaning,
              }}
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
        flower={flowers[currentFlowerId]}
        isVisible={isVisible}
        handleLike={handleLike}
        handleShare={handleShare}
        createSparkle={createSparkle}
        liked={liked}
        showMessage={showMessage}
        footerMessage={footerMessage}
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

export default Page;
