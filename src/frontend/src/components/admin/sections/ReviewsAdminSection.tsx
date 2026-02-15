import { useAdminReviews, useDeleteReview } from '@/hooks/admin/useAdminReviews';
import { useAdminSchools } from '@/hooks/admin/useAdminSchools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, Loader2, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function ReviewsAdminSection() {
  const { data: reviews, isLoading } = useAdminReviews();
  const { data: schools } = useAdminSchools();
  const deleteReview = useDeleteReview();

  const handleDelete = async (reviewIndex: number) => {
    try {
      await deleteReview.mutateAsync(reviewIndex);
      toast.success('Review deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete review');
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
        <div>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>Manage reviews across all schools</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {reviews && reviews.length === 0 ? (
          <Alert>
            <AlertDescription>No reviews found.</AlertDescription>
          </Alert>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews?.map((review, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{review.reviewerName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{review.rating.toString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md truncate">{review.comment}</TableCell>
                    <TableCell>{getSchoolName(review.schoolId)}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Review</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this review by "{review.reviewerName}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(index)}
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
