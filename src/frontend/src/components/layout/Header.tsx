import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import SocialLinks from '@/components/common/SocialLinks';
import { socialLinks } from '@/config/socialLinks';

export default function Header() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Filter valid social links for mobile menu
  const validSocialLinks = socialLinks.filter((link) => link.href && link.href.trim() !== '');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="Go to home page"
        >
          <img
            src="/assets/logo_school_.webp"
            alt="Yoga School Directory"
            className="h-10 w-auto object-contain"
          />
          <span className="hidden text-lg font-semibold sm:inline">Yoga School Directory</span>
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/blog' })}
            >
              Blog
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/about' })}
            >
              About
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/contact' })}
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/submit-claim' })}
            >
              Submit/Claim School
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate({ to: '/admin' })}
            >
              Admin
            </Button>
          </nav>

          {/* Desktop Social Links */}
          <div className="hidden md:flex">
            <SocialLinks links={socialLinks} className="ml-2" />
          </div>

          {/* Mobile Navigation Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate({ to: '/blog' })}>
                Blog
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: '/about' })}>
                About
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: '/contact' })}>
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: '/submit-claim' })}>
                Submit/Claim School
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: '/admin' })}>
                Admin
              </DropdownMenuItem>
              {validSocialLinks.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  {validSocialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <DropdownMenuItem key={link.label} asChild>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{link.label}</span>
                        </a>
                      </DropdownMenuItem>
                    );
                  })}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
}
