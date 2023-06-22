export function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = now.getTime() - date.getTime();
  
  // Calculate the time difference in hours
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  // Check if it's less than 24 hours ago
  if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  }

  // Check if it's in the same year
  if (date.getFullYear() === now.getFullYear()) {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  // Return the date in the format: Month Day, Year
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
