import type { MusicEra } from '../../types/music';

const ERA_LABELS: Record<MusicEra, string> = {
  baroque: '巴洛克',
  classical: '古典主义',
  romantic: '浪漫主义',
  impressionist: '印象主义',
  modern: '现代',
};

interface ComposerBadgeProps {
  composer: string;
  composerZh: string;
  era: MusicEra;
}

function ComposerBadge({ composer, composerZh, era }: ComposerBadgeProps) {
  return (
    <div className="composer-badge">
      <span className="composer-badge__name">{composerZh}</span>
      <span className="composer-badge__origin">{composer}</span>
      <span className="composer-badge__era">{ERA_LABELS[era]}</span>
    </div>
  );
}

export default ComposerBadge;
