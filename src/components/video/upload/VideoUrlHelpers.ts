
/**
 * Formats an Instagram URL to ensure it's in the correct embed format
 */
export const formatInstagramUrl = (url: string): string => {
  if (!url) return '';
  
  // Remove query parameters
  let cleanUrl = url.split('?')[0];
  // Remove trailing slashes
  cleanUrl = cleanUrl.replace(/\/+$/, '');
  
  // First, determine if this is an Instagram URL
  if (!cleanUrl.includes('instagram.com') && !cleanUrl.includes('instagr.am')) {
    return url; // Not an Instagram URL, return as is
  }
  
  let postId = '';
  
  // Extract post ID from different URL formats
  if (cleanUrl.includes('/p/')) {
    postId = cleanUrl.split('/p/')[1].split('/')[0];
  } else if (cleanUrl.includes('/reel/')) {
    postId = cleanUrl.split('/reel/')[1].split('/')[0];
  }
  
  if (postId) {
    // Return full embed URL with params - using /embed/ which is more reliable than just /embed
    return `https://www.instagram.com/p/${postId}/embed/`;
  }
  
  // If URL doesn't already have /embed or /embed/, add it
  if (!cleanUrl.endsWith('/embed/') && !cleanUrl.endsWith('/embed')) {
    return cleanUrl.endsWith('/') ? `${cleanUrl}embed/` : `${cleanUrl}/embed/`;
  }
  
  return cleanUrl;
};
