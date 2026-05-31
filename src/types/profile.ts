export type Profile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  // Ordered photo gallery (image/GIF URLs). photos[0] is the cover. The Swipe
  // card lets you tap left/right to move through these, story-style.
  photos: string[];
};
