import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';

interface SchoolVideoEmbedSectionProps {
  videoUrl?: string;
}

/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - Raw VIDEO_ID
 */
function extractYouTubeVideoId(url: string): string | null {
  if (!url || url.trim() === '') {
    return null;
  }

  const trimmedUrl = url.trim();

  // Check if it's already just a video ID (11 characters, alphanumeric with dashes/underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmedUrl)) {
    return trimmedUrl;
  }

  // Try to extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export default function SchoolVideoEmbedSection({ videoUrl }: SchoolVideoEmbedSectionProps) {
  const videoId = videoUrl ? extractYouTubeVideoId(videoUrl) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          School Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        {videoId ? (
          <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title="School video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No video available.</p>
        )}
      </CardContent>
    </Card>
  );
}
