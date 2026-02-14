import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Contact Info Cards */}
          <div className="space-y-4 md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  contact@yogadirectory.example
                </p>
                <p className="mt-2 text-xs text-muted-foreground italic">
                  (Placeholder email address)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="h-5 w-5 text-primary" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </p>
                <p className="mt-2 text-xs text-muted-foreground italic">
                  (Placeholder phone number)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  123 Yoga Street<br />
                  Wellness City, YG 12345
                </p>
                <p className="mt-2 text-xs text-muted-foreground italic">
                  (Placeholder address)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertDescription>
                  <strong>Note:</strong> This is a non-functional placeholder form. Form submission 
                  functionality will be implemented in a future update.
                </AlertDescription>
              </Alert>

              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What is this regarding?"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    disabled
                  />
                </div>

                <Button type="button" disabled className="w-full">
                  Send Message (Coming Soon)
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (EST)
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We typically respond to inquiries within 24-48 hours during business days.
            </p>
            <p className="mt-4 text-xs italic text-muted-foreground">
              (Placeholder information - actual contact details and response times will be updated)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
