import { useNavigate } from '@tanstack/react-router';
import { useGetAllBlogPosts } from '../hooks/useBlogPosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, BookOpen, RefreshCw } from 'lucide-react';
import { getDisplayExcerpt } from '../lib/blogContent';

export default function BlogPage() {
  const navigate = useNavigate();
  const { data: posts, isLoading, isError, error, refetch, isRefetching } = useGetAllBlogPosts();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="mb-2 h-10 w-48" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-4 h-20 w-full" />
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Blog Posts</AlertTitle>
          <AlertDescription className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span>
              {error instanceof Error ? error.message : 'Failed to load blog posts. Please try again.'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="shrink-0"
            >
              {isRefetching ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </>
              )}
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-4 text-4xl font-bold">Blog</h1>
        <Alert>
          <BookOpen className="h-4 w-4" />
          <AlertTitle>No Blog Posts Yet</AlertTitle>
          <AlertDescription>
            Check back soon for articles about yoga teacher training, mindfulness practices, and insights from experienced yoga instructors.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, tips, and stories from the world of yoga teacher training
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden">
            {post.featuredImageUrl && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.featuredImageUrl}
                  alt={`Featured image for ${post.title}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="mb-4 flex-1 line-clamp-3 text-sm text-muted-foreground">
                {getDisplayExcerpt(post)}
              </p>
              <Button
                onClick={() => navigate({ to: `/blog/${post.id}` })}
                variant="outline"
                className="w-full"
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
