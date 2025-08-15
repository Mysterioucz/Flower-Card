interface FlowerCardProps {
  message: {
    meaning: string;
    footer: string;
    secret: string;
  };
  isVisible: boolean;
  handleLike: () => void;
  handleShare: () => void;
  createSparkle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  liked: boolean;
  showMessage: boolean;
  flowerName: string;
}

const FlowerCard: React.FC<FlowerCardProps> = ({
  flowerName,
  message,
  isVisible,
  handleLike,
  handleShare,
  createSparkle,
  liked,
  showMessage,
}) => {
  return (
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
        {flowerName}
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
          showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
          showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {message.footer}
      </p>
    </div>
  );
};

export default FlowerCard;
