import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, X } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGallerySectionProps {
  images?: GalleryImage[];
}

const defaultImages: GalleryImage[] = [
  {
    src: '/assets/generated/yoga-gallery-01.dim_1200x800.jpg',
    alt: 'Bright yoga studio interior with natural light',
  },
  {
    src: '/assets/generated/yoga-gallery-02.dim_1200x800.jpg',
    alt: 'Outdoor yoga class at sunrise on a calm landscape',
  },
  {
    src: '/assets/generated/yoga-gallery-03.dim_1200x800.jpg',
    alt: 'Close-up of yoga mats neatly arranged with props',
  },
  {
    src: '/assets/generated/yoga-gallery-04.dim_1200x800.jpg',
    alt: 'Serene meditation corner with candles and plants',
  },
  {
    src: '/assets/generated/yoga-gallery-05.dim_1200x800.jpg',
    alt: 'Instructor assisting a student in a gentle stretch',
  },
  {
    src: '/assets/generated/yoga-gallery-06.dim_1200x800.jpg',
    alt: 'Minimalist reception area with warm wood tones',
  },
  {
    src: '/assets/generated/yoga-gallery-07.dim_1200x800.jpg',
    alt: 'Group savasana in a softly lit room',
  },
  {
    src: '/assets/generated/yoga-gallery-08.dim_1200x800.jpg',
    alt: 'Peaceful garden path leading to a retreat space',
  },
];

export default function ImageGallerySection({ images = defaultImages }: ImageGallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Photo Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(image)}
                  className="group relative aspect-[3/2] overflow-hidden rounded-lg border bg-muted transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`View ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No photos available.</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl p-0">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={handleClose}
              aria-label="Close gallery"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
          {selectedImage && (
            <div className="relative flex items-center justify-center bg-muted p-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[80vh] w-auto rounded-lg object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
