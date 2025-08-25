import { Flower } from "@/data/flower";
import { Dancing_Script } from "next/font/google";
import Image from "next/image";
interface FlowerCardProps {
  isVisible: boolean;
  handleLike: () => void;
  handleShare: () => void;
  createSparkle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  liked: boolean;
  showMessage: boolean;
  flower: Flower;
  footerMessage: string;
}

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: "700" });

const FlowerCard: React.FC<FlowerCardProps> = ({
  flower,
  isVisible,
  handleLike,
  handleShare,
  createSparkle,
  liked,
  showMessage,
  footerMessage,
}) => {
  return (
    <div
      className={`max-w-sm md:max-w-md h-fit w-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 text-center transition-all duration-1000 hover:shadow-3xl hover:-translate-y-2 cursor-pointer relative overflow-hidden group ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      onClick={createSparkle}
    >
      {/* Card Glow Effect */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${
          flower.color.cardColor ?? flower.color.gradient
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      {/* Floating Mini Hearts */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="animate-pulse text-pink-400">💕</div>
      </div>

      {/* Flower Icon with Breathing Animation */}
      <div className="flex text-6xl mb-6 animate-pulse hover:scale-110 transition-transform duration-300 relative z-10 justify-center">
        <Image src={flower.imgPath} alt={flower.name} width={60} height={60} />
      </div>

      {/* Enhanced Title with Text Shadow */}
      <h1
        className={`text-4xl md:text-5xl font-bold mb-6 text-shadow-[0_0_20px_rgba(147,51,234,0.3)] ${
          dancingScript.className
        } ${
          flower.color.textColor
        } bg-clip-text text-transparent transition-all duration-1500 hover:scale-105 relative z-10 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {flower.name}
      </h1>

      {/* Progress Bar for Reading */}
      <div className="w-full h-1 bg-white/20 rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full ${
            flower.color.progressBarColor ?? flower.color.gradient
          } rounded-full transition-all duration-3000 ease-out`}
          style={{ width: isVisible ? "100%" : "0%" }}
        ></div>
      </div>

      {/* Meaning Text */}
      <p
        className={`text-gray-700 mb-8 leading-relaxed text-lg transition-all duration-2000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        dangerouslySetInnerHTML={{ __html: flower.meaning }}
      />

      {/* Enhanced Spotify Embed with Vinyl Record Effect */}
      <div
        className={`mb-6 rounded-2xl bg-transparent overflow-hidden shadow-lg hover:scale-105 transition-all duration-2500 relative group ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <iframe
          src={flower.spotify.url}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={flower.spotify.color ? { background: 'green' } : {}}
        />
      </div>

      {/* Enhanced Action Buttons with Ripple Effect */}
      <div
        className={`flex justify-center space-x-6 mb-6 transition-all duration-1000 ${
          showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={handleLike}
          className={`relative p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg group overflow-hidden ${
            liked
              ? "text-red-500 bg-red-100 shadow-lg shadow-red-200"
              : "text-gray-500 hover:text-red-400 hover:bg-red-50"
          }`}
          title="Like this message"
        >
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
      </div>

      {/* Personal Message */}
      <p
        className={`text-gray-600 italic text-sm transition-all duration-1500 ${
          showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {footerMessage}
      </p>
    </div>
  );
};

export default FlowerCard;
