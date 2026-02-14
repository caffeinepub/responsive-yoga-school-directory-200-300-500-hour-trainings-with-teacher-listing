import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface AboutSchoolSectionProps {
  schoolName?: string;
  location?: string;
  aboutText?: string;
}

export default function AboutSchoolSection({
  schoolName,
  location,
  aboutText,
}: AboutSchoolSectionProps) {
  // Generate a sensible default description if no aboutText is provided
  const defaultDescription = aboutText || 
    `${schoolName || 'This school'} is a dedicated yoga teacher training center${location ? ` located in ${location}` : ''}. We offer comprehensive yoga teacher training programs designed to deepen your practice and prepare you for a fulfilling career in yoga instruction. Our experienced teachers provide personalized guidance in a supportive environment, helping students develop the skills, knowledge, and confidence needed to become exceptional yoga teachers.`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          About School
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed text-muted-foreground">
          {defaultDescription}
        </p>
      </CardContent>
    </Card>
  );
}
