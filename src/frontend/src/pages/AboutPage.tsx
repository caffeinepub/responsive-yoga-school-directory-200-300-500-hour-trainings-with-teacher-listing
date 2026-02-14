import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, Users, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            About Yoga School Directory
          </h1>
          <p className="text-lg text-muted-foreground">
            Your trusted resource for finding certified yoga teacher training programs
          </p>
        </div>

        {/* Mission Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The Yoga School Directory is dedicated to connecting aspiring yoga teachers with high-quality, 
              certified training programs around the world. We provide a comprehensive platform where students 
              can discover and compare yoga teacher training courses that meet Yoga Alliance standards.
            </p>
            <p className="text-muted-foreground">
              <strong>Note:</strong> This is a placeholder description. The actual mission statement and detailed 
              information about the directory will be added here.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-6 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect with a global community of yoga practitioners, teachers, and schools committed to 
                authentic yoga education.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-primary" />
                Certified Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All listed schools offer programs that align with Yoga Alliance standards, including 200, 300, 
                and 500-hour certifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-primary" />
                Global Reach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover training programs from schools located around the world, offering diverse styles and 
                teaching approaches.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>What We Offer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Comprehensive School Profiles</h3>
              <p className="text-sm text-muted-foreground">
                Detailed information about each school, including training programs, experienced teachers, 
                student reviews, and curriculum details.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 font-semibold">Easy Filtering & Search</h3>
              <p className="text-sm text-muted-foreground">
                Find the perfect training program by filtering schools based on training hours (200, 300, 500) 
                and other criteria.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 font-semibold">Verified Reviews</h3>
              <p className="text-sm text-muted-foreground">
                Read authentic reviews from students who have completed training programs to make informed decisions.
              </p>
            </div>
            <Separator />
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm italic text-muted-foreground">
                <strong>Placeholder Content:</strong> Additional details about our platform, team, and values 
                will be added here in future updates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
