export function mapLandmark(
  point: { x: number; y: number },
  video: { width: number; height: number },
  box: { width: number; height: number },
  mirrored: boolean,
): { x: number; y: number } {
  const scale = Math.min(box.width / video.width, box.height / video.height);
  const drawnWidth = video.width * scale;
  const drawnHeight = video.height * scale;
  const bandX = (box.width - drawnWidth) / 2;
  const bandY = (box.height - drawnHeight) / 2;
  const x = mirrored ? 1 - point.x : point.x;

  return {
    x: bandX + x * drawnWidth,
    y: bandY + point.y * drawnHeight,
  };
}
