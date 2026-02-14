import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, MessageSquare, AlertCircle, LogIn } from 'lucide-react';
import { useSchoolReviews, useAddSchoolReview } from '@/hooks/useSchoolReviews';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { toast } from 'sonner';

interface SchoolReviewsSectionProps {
  schoolId: string;
}

export default function SchoolReviewsSection({ schoolId }: SchoolReviewsSectionProps) {
  const { data: reviews, isLoading, error } = useSchoolReviews(schoolId);
  const addReviewMutation = useAddSchoolReview(schoolId);
  const { identity, login } = useInternetIdentity();

  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState('');
  const [validationError, setValidationError] = useState('');

  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (!reviewerName.trim()) {
      setValidationError('Please enter your name');
      return;
    }
    if (!rating) {
      setValidationError('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      setValidationError('Please write a review');
      return;
    }

    try {
      await addReviewMutation.mutateAsync({
        reviewerName: reviewerName.trim(),
        rating: parseInt(rating),
        comment: comment.trim(),
      });

      // Success feedback
      toast.success('Review submitted successfully!');

      // Reset form
      setReviewerName('');
      setRating('');
      setComment('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit review');
    }
  };

  // Calculate average rating and count
  const reviewCount = reviews?.length || 0;
  const averageRating =
    reviewCount > 0
      ? (reviews!.reduce((sum, review) => sum + Number(review.rating), 0) / reviewCount).toFixed(1)
      : '0.0';

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Review Summary */}
        {reviewCount > 0 && (
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{averageRating}</div>
                <div className="text-sm text-muted-foreground">out of 5</div>
              </div>
              <div className="flex-1">
                {renderStars(Math.round(parseFloat(averageRating)))}
                <div className="mt-1 text-sm text-muted-foreground">
                  Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Review Submission Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Write a Review</h3>

          {!isAuthenticated ? (
            <Alert>
              <LogIn className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Please log in to submit a review</span>
                <Button onClick={login} size="sm" className="ml-4">
                  Log In
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reviewerName">Your Name</Label>
                <Input
                  id="reviewerName"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={addReviewMutation.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Select value={rating} onValueChange={setRating} disabled={addReviewMutation.isPending}>
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                    <SelectItem value="4">4 - Very Good</SelectItem>
                    <SelectItem value="3">3 - Good</SelectItem>
                    <SelectItem value="2">2 - Fair</SelectItem>
                    <SelectItem value="1">1 - Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this school..."
                  rows={4}
                  disabled={addReviewMutation.isPending}
                />
              </div>

              {validationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{validationError}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={addReviewMutation.isPending}>
                {addReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {reviewCount > 0 ? `All Reviews (${reviewCount})` : 'Reviews'}
          </h3>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2 rounded-lg border p-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load reviews. Please try again later.
              </AlertDescription>
            </Alert>
          ) : reviewCount === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <MessageSquare className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews!.map((review, index) => (
                <div key={index} className="space-y-2 rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{review.reviewerName}</div>
                      {renderStars(Number(review.rating))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
