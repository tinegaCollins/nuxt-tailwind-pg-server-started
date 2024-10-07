export function useColor() {
  const isLightColor = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  return { isLightColor };
}
