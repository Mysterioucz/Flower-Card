export interface FlowerColor {
  backgroundColor: string;
  textColor: string;
  gradient: string;
  cardColor?: string;
  progressBarColor?: string;
}

export interface Flower {
  id: number;
  name: string;
  imgPath: string;
  meaning: string;
  color: FlowerColor;
  spotify: {
    url: string;
    color: string;
  };
}

export const flowerColors: Record<string, FlowerColor> = {
  Hydrangea: {
    backgroundColor:
      "bg-gradient-to-br from-purple-400 via-pink-300 to-indigo-500",
    textColor: "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800",
    gradient: "bg-gradient-to-r from-blue-300 to-indigo-500",
    cardColor: "bg-gradient-to-r from-pink-400/20 to-purple-400/20",
    progressBarColor: "bg-gradient-to-r from-pink-400 to-purple-500",
  },
  Freesia: {
    backgroundColor:
      "bg-gradient-to-br from-yellow-300 via-purple-300 to-freesia-purple",
    textColor:
      "bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-800 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]",
    gradient: "bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-600",
    cardColor:
      "bg-gradient-to-r from-purple-200/30 via-purple-300/30 to-indigo-300/30",
    progressBarColor: "bg-gradient-to-r from-purple-400 to-indigo-500",
  },
  "Lily of the Valley": {
    backgroundColor:
      "bg-gradient-to-br from-emerald-200 via-green-300 to-emerald-500",
    textColor:
      "bg-gradient-to-r from-emerald-600 via-green-700 to-emerald-900 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]",
    gradient: "bg-gradient-to-l from-white via-emerald-200 to-emerald-500",
    cardColor: "bg-white/10",
    progressBarColor: "bg-emerald-100",
  },
  "Peach Blossom": {
    backgroundColor: "bg-gradient-to-r from-pink-200 via-rose-300 to-pink-500",
    textColor: "text-pink-700",
    gradient: "bg-gradient-to-r from-pink-300 to-rose-500",
  },
  Lotus: {
    backgroundColor: "bg-gradient-to-r from-rose-200 via-pink-300 to-rose-500",
    textColor: "text-rose-800",
    gradient: "bg-gradient-to-r from-pink-300 to-rose-600",
  },
  Kapok: {
    backgroundColor:
      "bg-gradient-to-r from-orange-200 via-amber-300 to-orange-500",
    textColor: "text-orange-800",
    gradient: "bg-gradient-to-r from-amber-300 to-orange-600",
  },
  Peony: {
    backgroundColor: "bg-gradient-to-r from-rose-300 via-pink-400 to-rose-600",
    textColor: "text-rose-900",
    gradient: "bg-gradient-to-r from-rose-400 to-pink-600",
  },
};

export const flowers: Flower[] = [
  {
    id: 1,
    name: "Hydrangea",
    imgPath: "/flowers/hydrangea.png",
    meaning:
      "Hydrangeas symbolize heartfelt emotions, gratitude, and understanding. They're often given as a gesture of appreciation and to convey deep feelings.",
    color: flowerColors["Hydrangea"],
    spotify: {
      url: "https://open.spotify.com/embed/track/2yCyYz6JQdJRjGFQjrUJTy?utm_source=generator",
      color: "",
    },
  },
  {
    id: 2,
    name: "Freesia",
    imgPath: "/flowers/freesia.png",
    meaning:
      "Freesias symbolize sincere affection, pure intentions, and the hope for true love. They represent honesty in expressing feelings, admiration beyond friendship, and the promise of a genuine love that could blossom if given the chance.",
    color: flowerColors["Freesia"],
    spotify: {
      url: "https://open.spotify.com/embed/track/7h5PIF6duiyMMItVXznlJn?utm_source=generator",
      color: "",
    },
  },
  {
    id: 3,
    name: "Lily of the Valley",
    imgPath: "/flowers/lily_of_the_valley.png",
    meaning:
      "Known as the “return of happiness,” it represents purity, sweetness, and tender love. Giving it is like saying: “You bring light and happiness into my world. My heart feels peaceful and complete when you’re around.”",
    color: flowerColors["Lily of the Valley"],
    spotify: {
      url: "https://open.spotify.com/embed/track/5YZR3UQJQ8OLWYjhieJ6hn?utm_source=generator&theme=0",
      color: "#50C878",
    },
  },
];

export const footerMessage =
  "Every flower blooms in its own time, just like every feeling finds its moment to be shared.";
