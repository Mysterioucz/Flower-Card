export interface Flower {
  id: number;
  name: string;
  imgPath: string;
  meaning: string;
}

export interface FlowerColor {
  [key: number]: {
    bgColor: string;
    textColor: string;
    gradientColor: string;
  };
}

export const flowers: Flower[] = [
  {
    id: 1,
    name: "Hydrangea",
    imgPath: "/flowers/hydrangea.png",
    meaning:
      "Hydrangeas symbolize heartfelt emotions, gratitude, and understanding. They're often given as a gesture of appreciation and to convey deep feelings.",
  },
  {
    id: 2,
    name: "Lily of the Valley",
    imgPath: "/flowers/lily_of_the_valley.png",
    meaning:
      "Known as the “return of happiness,” it represents purity, sweetness, and tender love. Giving it is like saying: “You bring light and happiness into my world. My heart feels peaceful and complete when you’re around.”",
  },
];

export const footerMessage =
  "Every flower blooms in its own time, just like every feeling finds its moment to be shared.";
