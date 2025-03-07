
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
  
  // Extract the Vimeo ID
  const vimeoId = formattedUrl.split('/').pop();
  if (vimeoId) {
    formattedUrl = `https://player.vimeo.com/video/${vimeoId}`;
  }
  
  return formattedUrl;
};
