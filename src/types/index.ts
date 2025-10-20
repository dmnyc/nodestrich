// Type definitions for Nodestrich application

export interface CommunityMember {
  pub_key: string;
  alias: string;
}

export interface CommunityStats {
  member_count: number;
  total_channels: number;
  total_capacity: number;
}

export interface CommunityData {
  description: string;
  pubId: string;
  member_list: string[];
  member_count: number;
  community_stats: CommunityStats;
}

export interface AmbossResponse<T> {
  data: T;
  error?: string;
}

export interface KnowledgeBaseArticle {
  slug: string;
  title: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  content: string;
}