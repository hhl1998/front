import type { MusicPiece } from '../../types/music';
import ComposerBadge from './ComposerBadge';
import PieceMeta from './PieceMeta';
import './StoryPanel.css';

interface StoryPanelProps {
  piece: MusicPiece | null;
}

function StoryPanel({ piece }: StoryPanelProps) {
  if (!piece) {
    return (
      <div className="story-panel">
        <div className="story-panel__empty">
          <div className="story-panel__empty-icon">&#119070;</div>
          <h2>欢迎来到古典音乐日历</h2>
          <p>
            点击右侧日历中带有{' '}
            <span className="text-gold">&#9835;</span> 标记的日期，
            开始你的古典音乐之旅。
          </p>
          <p>每一首曲子背后，都有一段动人的故事在等待着你。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="story-panel">
      <article className="story-panel__article">
        <h2 className="story-panel__title">{piece.title}</h2>
        <p className="story-panel__title-en">{piece.titleEn}</p>

        <ComposerBadge
          composer={piece.composer}
          composerZh={piece.composerZh}
          era={piece.era}
        />

        <div className="story-panel__ornament"></div>

        <div className="story-panel__story">
          {piece.story.split('\n').map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i}>{paragraph.trim()}</p>
            ) : null
          )}
        </div>

        {piece.storyEn && (
          <blockquote className="story-panel__en-quote">
            {piece.storyEn}
          </blockquote>
        )}

        <div className="story-panel__ornament"></div>

        <PieceMeta
          yearComposed={piece.yearComposed}
          key={piece.key}
          duration={piece.duration}
          audioCredit={piece.audioCredit}
        />
      </article>
    </div>
  );
}

export default StoryPanel;
