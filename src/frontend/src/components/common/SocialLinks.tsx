import type { SocialLink } from '@/config/socialLinks';

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({ links, className = '', iconClassName = 'h-5 w-5' }: SocialLinksProps) {
  // Filter out links with empty or undefined hrefs
  const validLinks = links.filter((link) => link.href && link.href.trim() !== '');

  // Return null if no valid links
  if (validLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {validLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}
