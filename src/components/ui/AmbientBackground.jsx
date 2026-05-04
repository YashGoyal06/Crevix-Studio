export const AmbientBackground = () => {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-background__mesh" />
      <div className="ambient-background__grid" />
      <div className="ambient-background__beam ambient-background__beam--one" />
      <div className="ambient-background__beam ambient-background__beam--two" />
      <div className="ambient-background__beam ambient-background__beam--three" />
    </div>
  );
};
