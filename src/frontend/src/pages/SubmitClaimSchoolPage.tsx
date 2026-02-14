import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { School, CheckCircle2, FileText, Mail, Info } from 'lucide-react';

export default function SubmitClaimSchoolPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Submit or Claim Your School
          </h1>
          <p className="text-lg text-muted-foreground">
            Add your yoga school to our directory or claim an existing listing
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Informational Page</AlertTitle>
          <AlertDescription>
            This page provides information about submitting or claiming a school listing. 
            The actual submission workflow will be implemented in a future update.
          </AlertDescription>
        </Alert>

        {/* Two Options */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-primary" />
                Submit a New School
              </CardTitle>
              <CardDescription>
                Add your yoga school to our directory
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If your yoga school is not yet listed in our directory, you can submit it for inclusion. 
                We welcome all certified yoga schools offering teacher training programs.
              </p>
              <Button disabled className="w-full">
                Submit New School (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Claim Existing School
              </CardTitle>
              <CardDescription>
                Take ownership of your school's listing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If your school is already listed in our directory, you can claim it to manage the information, 
                respond to reviews, and keep your listing up to date.
              </p>
              <Button disabled className="w-full">
                Claim Your School (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Requirements Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Requirements & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Eligibility Criteria</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>School must offer Yoga Alliance certified teacher training programs</li>
                <li>Programs should include 200-hour, 300-hour, or 500-hour certifications</li>
                <li>School must have qualified and experienced yoga teachers on staff</li>
                <li>Valid business registration and contact information required</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 font-semibold">Information You'll Need to Provide</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>School name, location, and contact details</li>
                <li>Description of your school and teaching philosophy</li>
                <li>Details about training programs offered (hours, curriculum, pricing)</li>
                <li>Information about your teaching staff and their qualifications</li>
                <li>Photos of your facility and training sessions</li>
                <li>Yoga Alliance registration number (if applicable)</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 font-semibold">Verification Process</h3>
              <p className="text-sm text-muted-foreground">
                All submissions go through a verification process to ensure the quality and authenticity of 
                listings in our directory. This typically takes 3-5 business days. We may contact you for 
                additional information or documentation.
              </p>
            </div>
            <Separator />
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm italic text-muted-foreground">
                <strong>Placeholder Content:</strong> Detailed submission guidelines, verification procedures, 
                and specific requirements will be finalized and added here.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you have questions about submitting or claiming a school listing, please contact our support team. 
              We're here to help you get your school listed in our directory.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" disabled>
                Contact Support (Coming Soon)
              </Button>
              <Button variant="outline" disabled>
                View FAQ (Coming Soon)
              </Button>
            </div>
            <p className="text-xs italic text-muted-foreground">
              (Placeholder - actual contact methods and support resources will be implemented)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
