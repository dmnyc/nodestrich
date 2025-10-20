// Amboss API integration for Nodestrich
import type { CommunityData, CommunityMember, AmbossResponse } from '@/types';

const AMBOSS_API_URL = 'https://amboss.space/graphql';
const COMMUNITY_ID = '6d41c0bd-6e39-40a2-a062-a809c2e8c2b5';

// API key should be set in environment variables
const API_KEY = process.env.AMBOSS_API_KEY || '';

const COMMUNITY_QUERY = `
  query GetCommunity($getCommunityId: String!) {
    getCommunity(id: $getCommunityId) {
      details {
        description
        pubId
      }
      member_count
      member_list
      community_stats {
        total_channels
        total_capacity
      }
    }
  }
`;

const MEMBER_ALIASES_QUERY = `
  query getNodeAliasBatch($pubkeys: [String!]!) {
    getNodeAliasBatch(pubkeys: $pubkeys) {
      alias
      pub_key
    }
  }
`;

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function fetchGraphQL<T>(query: string, variables: Record<string, unknown>): Promise<AmbossResponse<T>> {
  try {
    const response = await fetch(AMBOSS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      return { data: null as T, error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors && result.errors.length > 0) {
      return { data: null as T, error: result.errors[0].message };
    }

    return { data: result.data as T };
  } catch (error) {
    return {
      data: null as T,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function getCommunityData(): Promise<AmbossResponse<{ getCommunity: CommunityData }>> {
  return fetchGraphQL(COMMUNITY_QUERY, { getCommunityId: COMMUNITY_ID });
}

export async function getMemberAliases(pubkeys: string[]): Promise<AmbossResponse<{ getNodeAliasBatch: CommunityMember[] }>> {
  return fetchGraphQL(MEMBER_ALIASES_QUERY, { pubkeys });
}

export async function getFullCommunityInfo(): Promise<{
  community: CommunityData | null;
  members: CommunityMember[];
  error?: string;
}> {
  // Get community data first
  const communityResult = await getCommunityData();

  if (communityResult.error || !communityResult.data) {
    return {
      community: null,
      members: [],
      error: communityResult.error || 'Failed to fetch community data'
    };
  }

  const community = communityResult.data.getCommunity;

  // Get member aliases
  const memberResult = await getMemberAliases(community.member_list);

  if (memberResult.error || !memberResult.data) {
    return {
      community,
      members: [],
      error: memberResult.error || 'Failed to fetch member data'
    };
  }

  // Sort members alphabetically by alias
  const sortedMembers = memberResult.data.getNodeAliasBatch.sort((a, b) =>
    a.alias.localeCompare(b.alias, undefined, { sensitivity: 'base' })
  );

  return {
    community,
    members: sortedMembers
  };
}