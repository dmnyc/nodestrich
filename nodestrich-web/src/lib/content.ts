import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentMeta {
  title: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
}

export interface ContentWithMeta extends ContentMeta {
  slug: string;
  content: string;
}

export async function getAllContent(): Promise<ContentWithMeta[]> {
  const content: ContentWithMeta[] = [];

  // Get all category directories
  const categories = ['beginner', 'intermediate', 'advanced'];

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, 'learn', category);

    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content: markdownContent } = matter(fileContents);

      const slug = file.replace(/\.mdx$/, '');

      content.push({
        slug: `${category}/${slug}`,
        title: data.title,
        description: data.description,
        category: category as 'beginner' | 'intermediate' | 'advanced',
        tags: data.tags || [],
        author: data.author,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        content: markdownContent,
      });
    }
  }

  // Sort by category and then by title
  return content.sort((a, b) => {
    const categoryOrder = { beginner: 0, intermediate: 1, advanced: 2 };
    const categoryDiff = categoryOrder[a.category] - categoryOrder[b.category];
    if (categoryDiff !== 0) return categoryDiff;
    return a.title.localeCompare(b.title);
  });
}

export async function getContentBySlug(slug: string): Promise<ContentWithMeta | null> {
  try {
    const [category, filename] = slug.split('/');
    const filePath = path.join(contentDirectory, 'learn', category, `${filename}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      category: category as 'beginner' | 'intermediate' | 'advanced',
      tags: data.tags || [],
      author: data.author,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      content,
    };
  } catch (error) {
    console.error('Error reading content:', error);
    return null;
  }
}

export async function getContentByCategory(category: 'beginner' | 'intermediate' | 'advanced'): Promise<ContentWithMeta[]> {
  const allContent = await getAllContent();
  return allContent.filter(item => item.category === category);
}

export async function searchContent(query: string): Promise<ContentWithMeta[]> {
  const allContent = await getAllContent();
  const lowercaseQuery = query.toLowerCase();

  return allContent.filter(item =>
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    item.content.toLowerCase().includes(lowercaseQuery)
  );
}