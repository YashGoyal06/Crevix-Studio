import TeamCard from './TeamCard';
import { team } from '../../data/teamData';

export default function TeamGrid({ members, onMemberClick }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-[1280px] mx-auto">
      {members.map((member) => (
        <TeamCard
          key={member.id}
          member={member}
          index={team.findIndex((teamMember) => teamMember.id === member.id)}
          onOpenModal={onMemberClick}
        />
      ))}
    </div>
  );
}
