import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Teacher } from '@/backend';

interface TeacherListProps {
  teachers: Teacher[];
}

export default function TeacherList({ teachers }: TeacherListProps) {
  if (!teachers || teachers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/20 p-8 text-center">
        <p className="text-muted-foreground">No teachers listed for this school yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {teachers.map((teacher) => (
        <Card key={teacher.id} className="p-4 transition-colors hover:bg-muted/30">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {teacher.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-semibold">{teacher.name}</h3>
                <Badge variant="outline" className="mt-1">
                  {teacher.specialization}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
