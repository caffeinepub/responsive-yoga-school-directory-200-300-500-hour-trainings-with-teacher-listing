/**
 * Utility functions for blog content presentation
 */

/**
 * Generates a safe excerpt from blog content when no explicit excerpt is provided
 * @param content - The full blog post content
 * @param maxLength - Maximum length of the excerpt (default: 150)
 * @returns A truncated excerpt with ellipsis
 */
export function generateExcerptFromContent(content: string, maxLength: number = 150): string {
  // Normalize whitespace and remove extra newlines
  const normalized = content.replace(/\s+/g, ' ').trim();
  
  if (normalized.length <= maxLength) {
    return normalized;
  }
  
  // Truncate at the last complete word before maxLength
  const truncated = normalized.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

/**
 * Splits blog content into paragraphs for rendering
 * @param content - The full blog post content
 * @returns Array of paragraph strings
 */
export function splitIntoParagraphs(content: string): string[] {
  // Split on double newlines (blank lines) or single newlines
  const paragraphs = content
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  return paragraphs;
}

/**
 * Gets the display excerpt for a blog post, preferring explicit excerpt over generated
 * @param post - The blog post object
 * @returns The excerpt to display
 */
export function getDisplayExcerpt(post: { excerpt?: string; content: string }): string {
  if (post.excerpt && post.excerpt.trim().length > 0) {
    return post.excerpt;
  }
  
  return generateExcerptFromContent(post.content);
}
