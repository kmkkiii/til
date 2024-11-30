import { getCollection } from 'astro:content';
import { formatDate } from './utils';

export interface Post {
  title: string;
  tags: string[];
  date: string;
  slug: string;
  body: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('til');
  return posts
    .map(post => ({
      ...post.data,
      date: formatDate(post.data.date),
      slug: post.slug,
      body: post.body,
    }))
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}
