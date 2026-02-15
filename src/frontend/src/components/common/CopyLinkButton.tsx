import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, Check } from 'lucide-react';
import { toast } from 'sonner';

interface CopyLinkButtonProps {
  url?: string;
  label?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export default function CopyLinkButton({
  url,
  label = 'Copy Link',
  variant = 'outline',
  size = 'default',
  className,
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const linkToCopy = url || window.location.href;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(linkToCopy);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for non-secure contexts
        toast.error('Unable to copy link. Please copy the URL from your address bar.');
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Unable to copy link. Please copy the URL from your address bar.');
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Link className="mr-2 h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
