export interface FlowerColor {
  mainColor: string;
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
}

export const flowerColors: Record<string, FlowerColor> = {
  Hydrangea: {
    mainColor: "bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-500",
    textColor: "text-indigo-800",
    gradient: "bg-gradient-to-r from-blue-300 to-indigo-500",
  },
  "Lily of the Valley": {
    mainColor: "bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-500",
    textColor:
      "bg-gradient-to-r from-emerald-600 via-green-700 to-emerald-900 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]",
    gradient: "bg-gradient-to-l from-white via-emerald-200 to-emerald-500",
    cardColor: "bg-white/10",
    progressBarColor: "bg-emerald-100",
  },
  "Peach Blossom": {
    mainColor: "bg-gradient-to-r from-pink-200 via-rose-300 to-pink-500",
    textColor: "text-pink-700",
    gradient: "bg-gradient-to-r from-pink-300 to-rose-500",
  },
  Freesia: {
    mainColor: "bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500",
    textColor: "text-yellow-700",
    gradient: "bg-gradient-to-r from-amber-300 to-yellow-600",
  },
  Lotus: {
    mainColor: "bg-gradient-to-r from-rose-200 via-pink-300 to-rose-500",
    textColor: "text-rose-800",
    gradient: "bg-gradient-to-r from-pink-300 to-rose-600",
  },
  Kapok: {
    mainColor: "bg-gradient-to-r from-orange-200 via-amber-300 to-orange-500",
    textColor: "text-orange-800",
    gradient: "bg-gradient-to-r from-amber-300 to-orange-600",
  },
  Peony: {
    mainColor: "bg-gradient-to-r from-rose-300 via-pink-400 to-rose-600",
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
  },
  {
    id: 2,
    name: "Lily of the Valley",
    imgPath: "/flowers/lily_of_the_valley.png",
    meaning:
      "Known as the “return of happiness,” it represents purity, sweetness, and tender love. Giving it is like saying: “You bring light and happiness into my world. My heart feels peaceful and complete when you’re around.”",
    color: flowerColors["Lily of the Valley"],
  },
];

export const footerMessage =
  "Every flower blooms in its own time, just like every feeling finds its moment to be shared.";
