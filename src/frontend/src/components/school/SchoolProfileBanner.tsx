import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface SchoolProfileBannerProps {
  schoolName: string;
  location: string;
  onInquire?: () => void;
}

export default function SchoolProfileBanner({
  schoolName,
  location,
  onInquire,
}: SchoolProfileBannerProps) {
  return (
    <div className="relative h-[420px] w-full overflow-hidden">
      <img
        src="/assets/generated/school-profile-banner.dim_1600x420.png"
        alt={schoolName}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-12">
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            {schoolName}
          </h1>
          <div className="flex items-center gap-2 text-lg text-white/90">
            <MapPin className="h-5 w-5" />
            <span>{location}</span>
          </div>
          {onInquire && (
            <Button
              size="lg"
              onClick={onInquire}
              className="mt-6"
            >
              Inquire Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
