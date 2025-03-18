
/**
 * Formats a Vimeo URL to ensure it's in the correct embed format
 */
export const formatVimeoUrl = (url: string): string => {
  if (!url) return '';
  
  // Simple validation to ensure it's a Vimeo URL
  if (!url.includes('vimeo.com') && !url.includes('player.vimeo.com')) {
    return url; // Not a Vimeo URL, return as is
  }

  // If it's already in player format, return it
  if (url.includes('player.vimeo.com/video/')) {
    return url;
  }
  
  // Extract the video ID and access hash if present
  let videoId: string | null = null;
  let accessHash: string | null = null;
  
  // Handle format like vimeo.com/1062910579/05e72b4425 (private video with access hash)
  const privateVideoMatch = url.match(/vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/);
  if (privateVideoMatch && privateVideoMatch[1] && privateVideoMatch[2]) {
    videoId = privateVideoMatch[1];
    accessHash = privateVideoMatch[2];
    return `https://player.vimeo.com/video/${videoId}?h=${accessHash}`;
  }
  
  // Handle standard public video format (vimeo.com/12345678)
  const videoIdMatch = url.match(/vimeo\.com\/(\d+)/);
  if (videoIdMatch && videoIdMatch[1]) {
    videoId = videoIdMatch[1];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  // If we couldn't extract the ID, return the original URL
  return url;
};
