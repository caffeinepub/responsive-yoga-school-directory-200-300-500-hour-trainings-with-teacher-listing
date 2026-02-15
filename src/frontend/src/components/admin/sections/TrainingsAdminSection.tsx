import { useState } from 'react';
import { useAdminTrainings, useCreateTraining, useDeleteTraining } from '@/hooks/admin/useAdminTrainings';
import { useAdminSchools } from '@/hooks/admin/useAdminSchools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TrainingsAdminSection() {
  const { data: trainings, isLoading } = useAdminTrainings();
  const { data: schools } = useAdminSchools();
  const createTraining = useCreateTraining();
  const deleteTraining = useDeleteTraining();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    hours: '',
    description: '',
    schoolId: '',
  });

  const resetForm = () => {
    setFormData({ id: '', hours: '', description: '', schoolId: '' });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim() || !formData.hours || !formData.description.trim() || !formData.schoolId) {
      toast.error('Please fill in all required fields');
      return;
    }

    const hours = parseInt(formData.hours);
    if (isNaN(hours) || hours <= 0) {
      toast.error('Hours must be a positive number');
      return;
    }

    try {
      await createTraining.mutateAsync({
        id: formData.id.trim(),
        hours: BigInt(hours),
        description: formData.description.trim(),
        schoolId: formData.schoolId,
      });
      toast.success('Training created successfully');
      setIsCreateOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create training');
    }
  };

  const handleDelete = async (trainingId: string) => {
    try {
      await deleteTraining.mutateAsync(trainingId);
      toast.success('Training deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete training');
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
            <CardTitle>Trainings</CardTitle>
            <CardDescription>Manage training programs across all schools</CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Training
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Create New Training</DialogTitle>
                  <DialogDescription>Add a new training program to a school</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="training-id">Training ID *</Label>
                    <Input
                      id="training-id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="e.g., training-001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="training-hours">Hours *</Label>
                    <Input
                      id="training-hours"
                      type="number"
                      min="1"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      placeholder="e.g., 200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="training-description">Description *</Label>
                    <Textarea
                      id="training-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="e.g., 200-Hour Yoga Teacher Training"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="training-school">School *</Label>
                    <Select value={formData.schoolId} onValueChange={(value) => setFormData({ ...formData, schoolId: value })}>
                      <SelectTrigger id="training-school">
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
                  <Button type="submit" disabled={createTraining.isPending}>
                    {createTraining.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Training
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {trainings && trainings.length === 0 ? (
          <Alert>
            <AlertDescription>No trainings found. Create your first training program to get started.</AlertDescription>
          </Alert>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainings?.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell className="font-mono text-sm">{training.id}</TableCell>
                    <TableCell className="font-medium">{training.hours.toString()}</TableCell>
                    <TableCell className="max-w-xs truncate">{training.description}</TableCell>
                    <TableCell>{getSchoolName(training.schoolId)}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Training</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this training program? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(training.id)}
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
