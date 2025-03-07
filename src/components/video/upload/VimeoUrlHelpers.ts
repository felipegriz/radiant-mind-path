
/**
 * Formats a Vimeo URL to ensure it's in the correct embed format
 */
export const formatVimeoUrl = (url: string): string => {
  if (!url) return '';
  
  // Simple validation to ensure it's a Vimeo URL
  if (!url.includes('vimeo.com') && !url.includes('player.vimeo.com')) {
    return url; // Not a Vimeo URL, return as is
  }

  // Format URL to embed format if it's not already
  let formattedUrl = url.trim();
  
  // Check if it's already a player URL
  if (formattedUrl.includes('player.vimeo.com/video/')) {
    return formattedUrl;
  }
  
  // Handle format like vimeo.com/1062910579/05e72b4425
  const videoIdMatch = formattedUrl.match(/vimeo\.com\/(\d+)/);
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  // If we couldn't extract the ID using the regex above, try a fallback approach
  const parts = formattedUrl.split('/');
  // Find the first part that contains only digits
  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      return `https://player.vimeo.com/video/${part}`;
    }
  }
  
  // If we still couldn't extract the ID, return the original URL
  return formattedUrl;
};
