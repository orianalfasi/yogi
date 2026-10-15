export type Point = { x: number; y: number };

export function scalePoint(point: Point, width: number, height: number): Point {
  return { x: point.x * width, y: point.y * height };
}

export function angleAt(a: Point, b: Point, c: Point): number {
  // Create the vector from point B to point A.
  const baX = a.x - b.x;
  const baY = a.y - b.y;
  // Create the vector from point B to point C.
  const bcX = c.x - b.x;
  const bcY = c.y - b.y;
  // Calculate the length (magnitude) of vector BA.
  // Math.hypot(x, y) calculates:
  // sqrt(x^2 + y^2)
  const baLength = Math.hypot(baX, baY);
  // Calculate the length of vector BC.
  const bcLength = Math.hypot(bcX, bcY);
  if (baLength === 0 || bcLength === 0) {
    return 0;
  }
  // Calculate the dot product of vectors BA and BC.
  // (x1 * x2) + (y1 * y2)
  const dot = baX * bcX + baY * bcY;
  // cos(angle) = dotProduct / (lengthBA * lengthBC)
  const cosine = dot / (baLength * bcLength);
  // Math.acos returns in radians the angle whose cosine is the given value.
  const angleRadians = Math.acos(cosine);
  // Convert radians to degrees and return the result.
  // radians * (180 / PI) = degrees
  return angleRadians * (180 / Math.PI);
}
