import TeamCard from './TeamCard';
import { team } from '../../data/teamData';

const getGridClasses = (count) => {
  if (count === 1) {
    return 'flex justify-center';
  }
  if (count === 2) {
    return 'grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center max-w-[640px] mx-auto';
  }
  if (count === 3) {
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-[960px] mx-auto';
  }
  return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center max-w-[1280px] mx-auto';
};

export default function TeamGrid({ members }) {
  return (
    <div className={getGridClasses(members.length)}>
      {members.map((member) => (
        <TeamCard
          key={member.name}
          member={member}
          index={team.findIndex((teamMember) => teamMember.name === member.name)}
        />
      ))}
    </div>
  );
}
