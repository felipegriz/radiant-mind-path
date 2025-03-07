
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
    // Ensure there are no alphanumeric characters mixed with the video ID
    // Vimeo IDs should be numeric only
    const parts = formattedUrl.split('/');
    const vimeoIdPart = parts[parts.length - 1];
    
    // Extract only the numeric part if there's any mix of letters
    const numericId = vimeoIdPart.replace(/[^0-9]/g, '');
    
    if (numericId && numericId !== vimeoIdPart) {
      // Reconstruct URL with cleaned ID
      parts[parts.length - 1] = numericId;
      return parts.join('/');
    }
    
    return formattedUrl;
  }
  
  // Handle format like vimeo.com/1062910579/05e72b4425
  if (formattedUrl.match(/vimeo\.com\/\d+\/[a-zA-Z0-9]+/)) {
    // Extract the main video ID (first number in the path)
    const matches = formattedUrl.match(/vimeo\.com\/(\d+)/);
    if (matches && matches[1]) {
      return `https://player.vimeo.com/video/${matches[1]}`;
    }
  }
  
  // Extract the Vimeo ID (should be numeric)
  const urlParts = formattedUrl.split('/');
  const lastPart = urlParts[urlParts.length - 1];
  // Extract only the numeric part
  const vimeoId = lastPart.replace(/[^0-9]/g, '');
  
  if (vimeoId) {
    formattedUrl = `https://player.vimeo.com/video/${vimeoId}`;
  }
  
  return formattedUrl;
};
