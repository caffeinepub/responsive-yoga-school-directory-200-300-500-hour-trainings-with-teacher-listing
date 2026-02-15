import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Globe, Award, CheckCircle2, Sparkles } from 'lucide-react';

export default function DirectoryInfoSections() {
  return (
    <div className="space-y-16">
      {/* How It Works Section */}
      <section className="text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
          Find your perfect yoga teacher training program in three simple steps
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-2 transition-shadow hover:shadow-soft">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Browse Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explore certified yoga schools offering 100, 200, 300, and 500-hour training programs from around the world.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 transition-shadow hover:shadow-soft">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Compare Schools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Review detailed information about each school, including courses, teachers, reviews, and training details.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 transition-shadow hover:shadow-soft">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Start Your Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with schools that match your goals and begin your transformation as a certified yoga teacher.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="rounded-2xl bg-accent/30 px-6 py-12 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why Use This Directory
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Your trusted resource for finding certified yoga teacher training programs
          </p>
          <div className="grid gap-6 text-left md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Certified Programs</h3>
                <p className="text-sm text-muted-foreground">
                  All listed schools offer Yoga Alliance certified training programs meeting international standards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Community Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Read authentic reviews from students who have completed their training at each school.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Global Reach</h3>
                <p className="text-sm text-muted-foreground">
                  Discover training programs from schools located in diverse locations worldwide.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Detailed Information</h3>
                <p className="text-sm text-muted-foreground">
                  Access comprehensive details about curriculum, teachers, facilities, and training schedules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Levels Section */}
      <section>
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Training Hour Levels Explained
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
            Understanding the different certification levels for yoga teacher training
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2">
            <CardHeader>
              <Badge className="mb-3 w-fit" variant="secondary">
                Introduction
              </Badge>
              <CardTitle className="text-2xl">100-Hour YTT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                An introductory program for those exploring yoga teaching or seeking to deepen their personal practice before committing to full certification.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Foundational yoga principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Basic teaching techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Personal practice development</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <Badge className="mb-3 w-fit" variant="secondary">
                Foundation
              </Badge>
              <CardTitle className="text-2xl">200-Hour YTT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                The foundational certification for aspiring yoga teachers. Covers essential teaching skills, anatomy, philosophy, and practice methodology.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Basic teaching methodology</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Yoga philosophy & history</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Anatomy & physiology basics</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <Badge className="mb-3 w-fit" variant="secondary">
                Advanced
              </Badge>
              <CardTitle className="text-2xl">300-Hour YTT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Advanced training for certified teachers seeking to deepen their knowledge and specialize in specific areas of yoga practice and teaching.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Advanced teaching techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Specialized yoga styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Therapeutic applications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <Badge className="mb-3 w-fit" variant="secondary">
                Master
              </Badge>
              <CardTitle className="text-2xl">500-Hour YTT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                The highest level of yoga teacher certification, combining 200-hour and 300-hour training for comprehensive mastery of yoga teaching.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Complete teaching mastery</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Advanced specializations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Professional development</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
