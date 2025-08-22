'use client';
import React, { useState, useEffect } from "react";
import {
  Heart,
  Star,
  Sun,
  Moon,
  Cloud,
  Sparkles,
  MessageCircle,
  Coffee,
  Music,
  BookOpen,
} from "lucide-react";

const MoodEncouragementWeb = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [particles, setParticles] = useState([]);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const moods = [
    {
      id: "happy",
      icon: Sun,
      label: "Happy",
      color: "from-yellow-400 to-orange-500",
      position: "top-20 left-20",
      messages: [
        "Your smile lights up the world! ✨",
        "Keep shining, beautiful soul! 🌟",
        "Your happiness is contagious! 😊",
      ],
    },
    {
      id: "sad",
      icon: Cloud,
      label: "Sad",
      color: "from-blue-400 to-blue-600",
      position: "top-32 right-24",
      messages: [
        "It's okay to feel this way. You're stronger than you know 💙",
        "This too shall pass. I believe in you 🌈",
        "You're not alone. Better days are coming 🤗",
      ],
    },
    {
      id: "tired",
      icon: Moon,
      label: "Tired",
      color: "from-purple-400 to-indigo-500",
      position: "top-64 left-32",
      messages: [
        "Rest is not a luxury, it's necessary. Take care of yourself 🌙",
        "You've been working so hard. You deserve a break ✨",
        "Even the stars need darkness to shine 🌟",
      ],
    },
    {
      id: "stressed",
      icon: Coffee,
      label: "Stressed",
      color: "from-red-400 to-pink-500",
      position: "bottom-40 right-20",
      messages: [
        "Take a deep breath. You've got this! 💪",
        "One step at a time. You're doing amazing 🌺",
        "Pressure makes diamonds. You're becoming brilliant ✨",
      ],
    },
    {
      id: "excited",
      icon: Sparkles,
      label: "Excited",
      color: "from-green-400 to-emerald-500",
      position: "bottom-32 left-16",
      messages: [
        "Your energy is infectious! Keep that spark alive! ⚡",
        "Amazing things happen to amazing people like you! 🎉",
        "The world is lucky to have your enthusiasm! 🌟",
      ],
    },
    {
      id: "creative",
      icon: Music,
      label: "Creative",
      color: "from-teal-400 to-cyan-500",
      position: "top-80 right-32",
      messages: [
        "Your creativity is a gift to the world! 🎨",
        "Keep creating magic with your beautiful mind! ✨",
        "Art flows through you like poetry in motion 🎭",
      ],
    },
    {
      id: "thoughtful",
      icon: BookOpen,
      label: "Thoughtful",
      color: "from-amber-400 to-yellow-500",
      position: "bottom-64 right-40",
      messages: [
        "Your depth of thought is truly beautiful 📚",
        "The way you see the world inspires me every day 🌍",
        "Your wisdom shines through everything you do ✨",
      ],
    },
    {
      id: "loved",
      icon: Heart,
      label: "Loved",
      color: "from-rose-400 to-pink-500",
      position: "top-40 left-1/2 transform -translate-x-1/2",
      messages: [
        "You are so deeply cherished and valued 💕",
        "The love you give comes back to you tenfold 💖",
        "You make the world brighter just by being you 🌟",
      ],
    },
  ];

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };

  const getRandomMessage = (messages) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-12 pb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-pulse">
          Your Mood Universe
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-2">
          Click on any mood to receive a personalized message
        </p>
        <p className="text-lg text-white/60">Made with 💖 just for you</p>
      </div>

      {/* Mood Web */}
      <div className="relative z-10 flex-1 relative max-w-6xl mx-auto px-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood)}
              className={`absolute ${mood.position} group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-12`}
            >
              <div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r ${mood.color} shadow-2xl flex items-center justify-center group-hover:shadow-3xl transition-all duration-300`}
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full whitespace-nowrap">
                  {mood.label}
                </span>
              </div>

              {/* Connecting lines to center */}
              <div className="absolute top-1/2 left-1/2 w-32 h-0.5 bg-white/20 origin-left transform -translate-y-1/2 rotate-45 opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            </button>
          );
        })}

        {/* Center heart */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-2xl flex items-center justify-center animate-pulse">
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-white fill-current" />
          </div>
        </div>
      </div>

      {/* Message Display */}
      {showMessage && selectedMood && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 mx-4 max-w-md transform animate-bounce shadow-2xl">
            <div className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${selectedMood.color} flex items-center justify-center`}
              >
                <selectedMood.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Feeling {selectedMood.label}?
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {getRandomMessage(selectedMood.messages)}
              </p>
              <button
                onClick={() => setShowMessage(false)}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all duration-300"
              >
                Thank you! 💖
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 pt-16">
        <p className="text-white/60 text-sm">
          Remember: You are loved, valued, and absolutely amazing! ✨
        </p>
      </div>
    </div>
  );
};

export default MoodEncouragementWeb;
