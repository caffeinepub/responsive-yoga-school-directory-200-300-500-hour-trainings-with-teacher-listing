import { useState } from 'react';
import { useAdminTeachers, useCreateTeacher, useDeleteTeacher } from '@/hooks/admin/useAdminTeachers';
import { useAdminSchools } from '@/hooks/admin/useAdminSchools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TeachersAdminSection() {
  const { data: teachers, isLoading } = useAdminTeachers();
  const { data: schools } = useAdminSchools();
  const createTeacher = useCreateTeacher();
  const deleteTeacher = useDeleteTeacher();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    specialization: '',
    schoolId: '',
  });

  const resetForm = () => {
    setFormData({ id: '', name: '', specialization: '', schoolId: '' });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim() || !formData.name.trim() || !formData.specialization.trim() || !formData.schoolId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createTeacher.mutateAsync({
        id: formData.id.trim(),
        name: formData.name.trim(),
        specialization: formData.specialization.trim(),
        schoolId: formData.schoolId,
      });
      toast.success('Teacher created successfully');
      setIsCreateOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create teacher');
    }
  };

  const handleDelete = async (teacherId: string) => {
    try {
      await deleteTeacher.mutateAsync(teacherId);
      toast.success('Teacher deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete teacher');
    }
  };

  const getSchoolName = (schoolId: string) => {
    return schools?.find((s) => s.id === schoolId)?.name || schoolId;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Teachers</CardTitle>
            <CardDescription>Manage teachers across all schools</CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Create New Teacher</DialogTitle>
                  <DialogDescription>Add a new teacher to a school</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-id">Teacher ID *</Label>
                    <Input
                      id="teacher-id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="e.g., teacher-001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-name">Teacher Name *</Label>
                    <Input
                      id="teacher-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Sarah Johnson"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-specialization">Specialization *</Label>
                    <Input
                      id="teacher-specialization"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      placeholder="e.g., Hatha Yoga"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-school">School *</Label>
                    <Select value={formData.schoolId} onValueChange={(value) => setFormData({ ...formData, schoolId: value })}>
                      <SelectTrigger id="teacher-school">
                        <SelectValue placeholder="Select a school" />
                      </SelectTrigger>
                      <SelectContent>
                        {schools?.map((school) => (
                          <SelectItem key={school.id} value={school.id}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createTeacher.isPending}>
                    {createTeacher.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Teacher
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {teachers && teachers.length === 0 ? (
          <Alert>
            <AlertDescription>No teachers found. Create your first teacher to get started.</AlertDescription>
          </Alert>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers?.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-mono text-sm">{teacher.id}</TableCell>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.specialization}</TableCell>
                    <TableCell>{getSchoolName(teacher.schoolId)}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{teacher.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(teacher.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
