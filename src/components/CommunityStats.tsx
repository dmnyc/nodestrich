'use client';

import { useEffect, useState } from 'react';
import AnimatedCounter from './AnimatedCounter';
import type { CommunityData, CommunityMember } from '@/types';

interface CommunityStatsProps {
  initialData?: {
    community: CommunityData | null;
    members: CommunityMember[];
  };
}

const CommunityStats = ({ initialData }: CommunityStatsProps) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (initialData) {
        // If we have initial data, fetch fresh data in the background
        try {
          const response = await fetch('/api/community');
          if (response.ok) {
            const freshData = await response.json();
            if (!freshData.error) {
              setData(freshData);
            }
          }
        } catch (err) {
          // Silently fail and keep using initial data
          console.error('Failed to fetch fresh data:', err);
        }
        return;
      }

      // If no initial data, fetch it now
      try {
        setLoading(true);
        const response = await fetch('/api/community');
        if (!response.ok) {
          throw new Error('Failed to fetch community data');
        }
        const result = await response.json();

        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialData]);

  if (loading && !data) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-400">Loading community stats...</div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (!data?.community) {
    return null;
  }

  const { community } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-[#f800c1] to-[#d91e7a] rounded-lg p-6 text-center shadow-lg">
        <AnimatedCounter
          end={community.member_count}
          className="text-5xl font-bold text-white block mb-2"
        />
        <h4 className="text-white text-base font-medium opacity-90">Members</h4>
      </div>

      <div className="bg-gradient-to-br from-[#f800c1] to-[#d91e7a] rounded-lg p-6 text-center shadow-lg">
        <AnimatedCounter
          end={community.community_stats.total_channels}
          className="text-5xl font-bold text-white block mb-2"
        />
        <h4 className="text-white text-base font-medium opacity-90">Channels</h4>
      </div>

      <div className="bg-gradient-to-br from-[#f800c1] to-[#d91e7a] rounded-lg p-6 text-center shadow-lg">
        <AnimatedCounter
          end={Math.floor(community.community_stats.total_capacity / 100000000)}
          className="text-5xl font-bold text-white block mb-2"
        />
        <h4 className="text-white text-base font-medium opacity-90">BTC Capacity</h4>
      </div>
    </div>
  );
};

export default CommunityStats;