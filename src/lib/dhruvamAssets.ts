// Static imports let next/image read each file's real dimensions at build
// time and serve a right-sized, modern-format (webp/avif) version instead of
// the original multi-hundred-KB JPG — these are reused across many sections,
// so importing them once here keeps every usage consistent.
import celestialTexture from "../../public/assets/dhruvam/backgrounds/celestial-texture.jpg";
import mountains from "../../public/assets/dhruvam/backgrounds/mountains.jpg";
import starrySky from "../../public/assets/dhruvam/backgrounds/starry-sky.jpg";
import lighthouseNight from "../../public/assets/dhruvam/backgrounds/lighthouse-night.jpg";
import heroAurora from "../../public/assets/dhruvam/backgrounds/hero-aurora.jpg";
import auroraSky from "../../public/assets/dhruvam/backgrounds/aurora-sky.jpg";

import penguinMain from "../../public/assets/dhruvam/characters/penguin-main.jpg";
import penguinTelescope from "../../public/assets/dhruvam/characters/penguin-telescope.jpg";
import penguinLantern from "../../public/assets/dhruvam/characters/penguin-lantern.jpg";
import penguinHiking from "../../public/assets/dhruvam/characters/penguin-hiking.jpg";
import penguinBack from "../../public/assets/dhruvam/characters/penguin-back.jpg";

export const backgrounds = {
  celestialTexture,
  mountains,
  starrySky,
  lighthouseNight,
  heroAurora,
  auroraSky,
};

export const characters = {
  penguinMain,
  penguinTelescope,
  penguinLantern,
  penguinHiking,
  penguinBack,
};
