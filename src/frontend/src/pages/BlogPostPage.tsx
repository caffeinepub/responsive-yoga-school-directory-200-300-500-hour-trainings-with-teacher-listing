import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetBlogPost } from '../hooks/useBlogPosts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { splitIntoParagraphs } from '../lib/blogContent';

export default function BlogPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams({ strict: false }) as { postId: string };
  const { data: post, isLoading, isError, error } = useGetBlogPost(postId);

  const handleBackToBlog = () => {
    navigate({ to: '/blog' });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="mb-6 h-10 w-32" />
        <Card className="overflow-hidden">
          <Skeleton className="h-64 w-full md:h-96" />
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={handleBackToBlog}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Post</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load the blog post. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={handleBackToBlog}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Post Not Found</AlertTitle>
          <AlertDescription>
            The blog post you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const paragraphs = splitIntoParagraphs(post.content);

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        onClick={handleBackToBlog}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>

      <article className="mx-auto max-w-3xl">
        <Card className="overflow-hidden p-0">
          {post.featuredImageUrl && (
            <div className="aspect-video w-full overflow-hidden md:aspect-[21/9]">
              <img
                src={post.featuredImageUrl}
                alt={`Featured image for ${post.title}`}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-3xl">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="prose prose-slate max-w-none dark:prose-invert">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-base leading-relaxed last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
