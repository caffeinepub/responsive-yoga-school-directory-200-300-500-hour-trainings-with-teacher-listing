import { useState } from 'react';
import { useAdminSchools, useCreateSchool, useUpdateSchool, useDeleteSchool } from '@/hooks/admin/useAdminSchools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { School } from '@/backend';

export default function SchoolsAdminSection() {
  const { data: schools, isLoading } = useAdminSchools();
  const createSchool = useCreateSchool();
  const updateSchool = useUpdateSchool();
  const deleteSchool = useDeleteSchool();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    videoUrl: '',
  });

  const resetForm = () => {
    setFormData({ id: '', name: '', location: '', videoUrl: '' });
    setEditingSchool(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim() || !formData.name.trim() || !formData.location.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createSchool.mutateAsync({
        id: formData.id.trim(),
        name: formData.name.trim(),
        location: formData.location.trim(),
        videoUrl: formData.videoUrl.trim() || null,
      });
      toast.success('School created successfully');
      setIsCreateOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create school');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchool || !formData.name.trim() || !formData.location.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await updateSchool.mutateAsync({
        id: editingSchool.id,
        name: formData.name.trim(),
        location: formData.location.trim(),
        videoUrl: formData.videoUrl.trim() || null,
      });
      toast.success('School updated successfully');
      setEditingSchool(null);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update school');
    }
  };

  const handleDelete = async (schoolId: string) => {
    try {
      await deleteSchool.mutateAsync(schoolId);
      toast.success('School deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete school');
    }
  };

  const openEditDialog = (school: School) => {
    setEditingSchool(school);
    setFormData({
      id: school.id,
      name: school.name,
      location: school.location,
      videoUrl: school.videoUrl || '',
    });
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
            <CardTitle>Schools</CardTitle>
            <CardDescription>Manage yoga schools in the directory</CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Add School
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreate}>
                <DialogHeader>
                  <DialogTitle>Create New School</DialogTitle>
                  <DialogDescription>Add a new yoga school to the directory</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="create-id">School ID *</Label>
                    <Input
                      id="create-id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="e.g., school-001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-name">School Name *</Label>
                    <Input
                      id="create-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Peaceful Yoga Studio"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-location">Location *</Label>
                    <Input
                      id="create-location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Bali, Indonesia"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-video">Video URL</Label>
                    <Input
                      id="create-video"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="e.g., https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createSchool.isPending}>
                    {createSchool.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create School
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {schools && schools.length === 0 ? (
          <Alert>
            <AlertDescription>No schools found. Create your first school to get started.</AlertDescription>
          </Alert>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Video</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools?.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-mono text-sm">{school.id}</TableCell>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell>{school.location}</TableCell>
                    <TableCell>{school.videoUrl ? 'Yes' : 'No'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog open={editingSchool?.id === school.id} onOpenChange={(open) => !open && setEditingSchool(null)}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(school)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <form onSubmit={handleUpdate}>
                              <DialogHeader>
                                <DialogTitle>Edit School</DialogTitle>
                                <DialogDescription>Update school information</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">School Name *</Label>
                                  <Input
                                    id="edit-name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-location">Location *</Label>
                                  <Input
                                    id="edit-location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-video">Video URL</Label>
                                  <Input
                                    id="edit-video"
                                    value={formData.videoUrl}
                                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditingSchool(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit" disabled={updateSchool.isPending}>
                                  {updateSchool.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                  Update School
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete School</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{school.name}"? This will also delete all associated teachers, trainings, and reviews. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(school.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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
