'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { ContentWithMeta } from '@/lib/content';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ContentWithMeta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchContent = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchContent, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search knowledge base..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="w-full px-4 py-2 bg-[#121212] border border-[#282828] rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#f800c1] pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-[#f800c1] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#121212] border border-[#282828] rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/learn/${result.slug}`}
              onClick={handleResultClick}
              className="block p-3 hover:bg-[#282828] border-b border-[#282828] last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-200 mb-1">
                    {result.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                    {result.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-[#f800c1] text-white px-2 py-1 rounded-full capitalize">
                      {result.category}
                    </span>
                    {result.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-[#282828] text-gray-400 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#121212] border border-[#282828] rounded-md shadow-lg z-50 p-4">
          <p className="text-gray-400 text-sm">No results found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;