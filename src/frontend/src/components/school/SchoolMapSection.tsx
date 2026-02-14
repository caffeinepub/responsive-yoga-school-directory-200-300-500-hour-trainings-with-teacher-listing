import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink } from 'lucide-react';

interface SchoolMapSectionProps {
  location: string;
  schoolName: string;
  showEmbed?: boolean;
}

export default function SchoolMapSection({
  location,
  schoolName,
  showEmbed = true,
}: SchoolMapSectionProps) {
  if (!location || location.trim() === '') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Location information is not available for this school.
          </p>
        </CardContent>
      </Card>
    );
  }

  const encodedLocation = encodeURIComponent(location);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=&q=${encodedLocation}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showEmbed && (
          <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title={`Map of ${schoolName}`}
              className="absolute left-0 top-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
        <Button
          variant="outline"
          className="w-full"
          asChild
        >
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
