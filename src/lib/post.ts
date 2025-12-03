import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDate } from './utils';

export interface Post {
  id: string;
  title: string;
  tags: string[];
  date: string;
  body: string | undefined;
  published: boolean;
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('til');
  return posts
    .map((post: CollectionEntry<'til'>): Post => (
      {
        ...post.data,
        id: post.id,
        date: formatDate(post.data.date),
        body: post.body,
      }))
    .filter((post: Post) => post.published)
    .sort((a: Post, z: Post) => new Date(z.date).getTime() - new Date(a.date).getTime());
}
