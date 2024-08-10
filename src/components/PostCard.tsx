import type { Post } from "@/lib/post";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  return (
    <Card className="hover:bg-accent my-5">
      <a href={`/til/${post.slug}`}>
        <CardHeader>
          <CardTitle className="text-md">{post.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center">
              <div className="text-xs mr-2">{post.date}</div>
              {post.tags.map((tag) => (
                <div className="bg-slate-300 dark:bg-slate-500 rounded-full text-xs mx-1 py-1 px-2">
                  {tag}
                </div>
              ))}
            </div>
          </CardDescription>
        </CardHeader>
      </a>
    </Card>
  );
};
