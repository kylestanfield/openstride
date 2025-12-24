export default function formatElapsedTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hours > 0) {
    // H:MM:SS or HH:MM:SS
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }

  if (minutes > 9) {
    // MM:SS (10:00 → 59:59)
    return `${minutes}:${pad(seconds)}`;
  }

  // M:SS (0:00 → 9:59)
  return `${minutes}:${pad(seconds)}`;
}
