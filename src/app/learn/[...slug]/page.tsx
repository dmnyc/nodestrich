import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getAllContent } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type React from 'react';

interface ArticlePageProps {
  params: Promise<{ slug: string[] }>;
}

// MDX Components
const components = {
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => <h1 className="text-3xl font-bold mb-6 text-[#f800c1]" {...props} />,
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => <h2 className="text-2xl font-bold mb-4 text-[#f800c1] mt-8" {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => <h3 className="text-xl font-semibold mb-3 text-gray-200 mt-6" {...props} />,
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => <h4 className="text-lg font-medium mb-2 text-gray-300 mt-4" {...props} />,
  p: (props: React.ComponentPropsWithoutRef<'p'>) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1" {...props} />,
  ol: (props: React.ComponentPropsWithoutRef<'ol'>) => <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-1" {...props} />,
  li: (props: React.ComponentPropsWithoutRef<'li'>) => <li className="text-gray-300" {...props} />,
  a: (props: React.ComponentPropsWithoutRef<'a'>) => <a className="text-[#f800c1] hover:underline" {...props} />,
  code: (props: React.ComponentPropsWithoutRef<'code'>) => <code className="bg-[#121212] px-2 py-1 rounded text-sm font-mono text-gray-200" {...props} />,
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => (
    <pre className="bg-[#121212] p-4 rounded-lg overflow-x-auto mb-4 border border-[#282828]" {...props} />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="border-l-4 border-[#f800c1] pl-4 italic text-gray-400 mb-4" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => <strong className="font-semibold text-gray-200" {...props} />,
  em: (props: React.ComponentPropsWithoutRef<'em'>) => <em className="italic text-gray-300" {...props} />,
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const fullSlug = slug.join('/');

  const article = await getContentBySlug(fullSlug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-400">
          <li>
            <Link href="/learn" className="hover:text-[#f800c1]">
              Knowledge Base
            </Link>
          </li>
          <li>→</li>
          <li className="capitalize">{article.category}</li>
          <li>→</li>
          <li className="text-gray-300">{article.title}</li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-[#f800c1]">{article.title}</h1>
          <span className="bg-[#f800c1] text-white px-3 py-1 rounded-full text-sm capitalize">
            {article.category}
          </span>
        </div>

        <p className="text-gray-400 text-lg mb-4">{article.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>By {article.author}</span>
            <span>Updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="bg-[#121212] px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none">
        <div className="bg-[#121212] rounded-lg p-6 border border-[#282828]">
          <MDXRemote
            source={article.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>
      </article>

      {/* Back to Knowledge Base */}
      <div className="mt-8 pt-8 border-t border-[#282828]">
        <Link
          href="/learn"
          className="inline-flex items-center text-[#f800c1] hover:underline"
        >
          ← Back to Knowledge Base
        </Link>
      </div>
    </div>
  );
}

// Generate static params for all content
export async function generateStaticParams() {
  const content = await getAllContent();

  return content.map((article) => ({
    slug: article.slug.split('/'),
  }));
}