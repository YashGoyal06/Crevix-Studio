import { GradientText } from './GradientText';

export const SectionLabel = ({ text, useGradient = false }) => {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.25em] mb-6">
      {useGradient ? (
        <GradientText>{text}</GradientText>
      ) : (
        <span className="text-text-secondary">{text}</span>
      )}
    </div>
  );
};
