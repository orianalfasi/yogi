export async function openFrontCamera(): Promise<MediaStream> {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false,
  });
  return stream;
}
export function stopCamera(stream: MediaStream) {
  stream.getTracks().forEach((track) => track.stop());
}
