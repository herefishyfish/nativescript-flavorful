
export function getMinimumCycleCount(frequency: number = 0.05) {
  return Math.round(Math.PI * 2 / frequency);
}

export function RGB2Color(r: number, g: number, b: number) {
  return (
    'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')'
  );
}

export function getColor(phase: number, frequency = 0.05) {
  const red = Math.sin(frequency * phase + 0) * 127 + 128;
  const green = Math.sin(frequency * phase + 2) * 127 + 128;
  const blue = Math.sin(frequency * phase + 4) * 127 + 128;

  return RGB2Color(red, green, blue);
}
