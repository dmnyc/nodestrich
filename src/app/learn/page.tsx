import Link from 'next/link';
import { getAllContent } from '@/lib/content';

export default async function LearnPage() {
  const content = await getAllContent();

  const categorizeContent = (category: string) =>
    content.filter(item => item.category === category);

  const beginnerContent = categorizeContent('beginner');
  const intermediateContent = categorizeContent('intermediate');
  const advancedContent = categorizeContent('advanced');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#f800c1]">Lightning Network Knowledge Base</h1>
      <p className="text-gray-300 mb-8">
        Comprehensive guides and documentation for Lightning Network node operators of all levels.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Beginner Section */}
        <div className="bg-[#282828] border border-[#121212] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#f800c1]">Beginner</h2>
          <p className="text-gray-400 mb-4">Start your Lightning Network journey</p>
          <div className="space-y-3">
            {beginnerContent.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="block p-3 bg-[#121212] rounded-md hover:bg-[#383838] transition-colors"
              >
                <h3 className="text-sm font-medium text-gray-200 mb-1">{article.title}</h3>
                <p className="text-xs text-gray-400">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Intermediate Section */}
        <div className="bg-[#282828] border border-[#121212] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#f800c1]">Intermediate</h2>
          <p className="text-gray-400 mb-4">Expand your node operations</p>
          <div className="space-y-3">
            {intermediateContent.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="block p-3 bg-[#121212] rounded-md hover:bg-[#383838] transition-colors"
              >
                <h3 className="text-sm font-medium text-gray-200 mb-1">{article.title}</h3>
                <p className="text-xs text-gray-400">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Advanced Section */}
        <div className="bg-[#282828] border border-[#121212] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-[#f800c1]">Advanced</h2>
          <p className="text-gray-400 mb-4">Master Lightning Network</p>
          <div className="space-y-3">
            {advancedContent.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="block p-3 bg-[#121212] rounded-md hover:bg-[#383838] transition-colors"
              >
                <h3 className="text-sm font-medium text-gray-200 mb-1">{article.title}</h3>
                <p className="text-xs text-gray-400">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-[#f800c1]">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="block p-4 bg-[#282828] border border-[#121212] rounded-lg hover:border-[#f800c1] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-200">{article.title}</h3>
                <span className="text-xs bg-[#f800c1] text-white px-2 py-1 rounded-full capitalize">
                  {article.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{article.description}</p>
              <div className="flex flex-wrap gap-1">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-[#121212] text-gray-400 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}