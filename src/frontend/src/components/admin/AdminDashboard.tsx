import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { School, Users, GraduationCap, MessageSquare } from 'lucide-react';
import SchoolsAdminSection from './sections/SchoolsAdminSection';
import TeachersAdminSection from './sections/TeachersAdminSection';
import TrainingsAdminSection from './sections/TrainingsAdminSection';
import ReviewsAdminSection from './sections/ReviewsAdminSection';

export default function AdminDashboard() {
  return (
    <Tabs defaultValue="schools" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="schools" className="flex items-center gap-2">
          <School className="h-4 w-4" />
          <span className="hidden sm:inline">Schools</span>
        </TabsTrigger>
        <TabsTrigger value="teachers" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Teachers</span>
        </TabsTrigger>
        <TabsTrigger value="trainings" className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          <span className="hidden sm:inline">Trainings</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Reviews</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="schools" className="mt-6">
        <SchoolsAdminSection />
      </TabsContent>

      <TabsContent value="teachers" className="mt-6">
        <TeachersAdminSection />
      </TabsContent>

      <TabsContent value="trainings" className="mt-6">
        <TrainingsAdminSection />
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ReviewsAdminSection />
      </TabsContent>
    </Tabs>
  );
}
