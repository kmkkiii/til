import type { Post } from '@/lib/post';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  return (
    <Card className="hover:bg-accent my-5">
      <a href={`/til/${post.id}`}>
        <CardHeader>
          <CardTitle className="text-md">{post.title}</CardTitle>
          <CardDescription>
            <div className="text-xs my-2">{post.date}</div>
            <div className="flex flex-wrap">

              {post.tags.map(tag => (
                <div className="bg-slate-300 dark:bg-slate-500 rounded-xl text-xs py-1 px-2 mr-1 mt-2">
                  {tag}
                </div>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
      </a>
    </Card>
  );
}
