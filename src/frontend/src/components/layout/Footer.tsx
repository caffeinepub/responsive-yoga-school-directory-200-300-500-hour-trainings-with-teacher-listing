import { Heart } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'yoga-directory'
  );

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-3 font-semibold">Yoga School Directory</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted resource for finding certified yoga teacher training programs worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Button
                variant="link"
                className="h-auto justify-start p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => navigate({ to: '/' })}
              >
                Directory
              </Button>
              <Button
                variant="link"
                className="h-auto justify-start p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => navigate({ to: '/blog' })}
              >
                Blog
              </Button>
              <Button
                variant="link"
                className="h-auto justify-start p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => navigate({ to: '/about' })}
              >
                About
              </Button>
              <Button
                variant="link"
                className="h-auto justify-start p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => navigate({ to: '/contact' })}
              >
                Contact
              </Button>
              <Button
                variant="link"
                className="h-auto justify-start p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => navigate({ to: '/submit-claim' })}
              >
                Submit/Claim School
              </Button>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-3 font-semibold">Get in Touch</h3>
            <p className="text-sm text-muted-foreground">
              Have questions? Visit our{' '}
              <Button
                variant="link"
                className="h-auto p-0 text-sm underline-offset-4"
                onClick={() => navigate({ to: '/contact' })}
              >
                contact page
              </Button>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Yoga School Directory. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
