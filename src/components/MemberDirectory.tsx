'use client';

import { useState, useMemo } from 'react';
import type { CommunityMember } from '@/types';

interface MemberDirectoryProps {
  members: CommunityMember[];
}

const MemberDirectory = ({ members }: MemberDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = useMemo(() => {
    if (!searchTerm) return members;
    return members.filter(member =>
      member.alias.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#f800c1]">Members</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-[#121212] border border-[#282828] rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#f800c1]"
          />
          <span className="text-sm text-gray-400">
            {filteredMembers.length} of {members.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMembers.map((member) => (
          <a
            key={member.pub_key}
            href={`https://amboss.space/node/${member.pub_key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#21262d] border-2 border-[#30363d] rounded-lg p-4 text-center hover:border-[#f800c1] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#f800c1]/20 transition-all break-all text-sm text-[#f0f6fc] font-medium"
          >
            {member.alias}
          </a>
        ))}
      </div>

      {filteredMembers.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-400">
          No members found matching &quot;{searchTerm}&quot;
        </div>
      )}
    </div>
  );
};

export default MemberDirectory;