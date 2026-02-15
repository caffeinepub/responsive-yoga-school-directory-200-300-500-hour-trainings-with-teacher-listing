import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface SchoolProfileBannerProps {
  schoolName: string;
  location?: string;
  onInquire?: () => void;
}

export default function SchoolProfileBanner({ schoolName, location, onInquire }: SchoolProfileBannerProps) {
  return (
    <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
      {/* Background Banner Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/school-profile-banner.dim_1600x420.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background dark:from-background/98 dark:via-background/90 dark:to-background" />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {schoolName}
          </h1>
          {location && (
            <p className="mb-6 text-lg text-muted-foreground md:text-xl">
              {location}
            </p>
          )}
          {onInquire && (
            <Button 
              size="lg" 
              onClick={onInquire}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Inquire
            </Button>
          )}
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
