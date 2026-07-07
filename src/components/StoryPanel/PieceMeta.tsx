interface PieceMetaProps {
  yearComposed: string;
  key: string;
  duration: string;
  audioCredit: string;
}

function PieceMeta({ yearComposed, key, duration, audioCredit }: PieceMetaProps) {
  return (
    <div className="piece-meta">
      <div className="piece-meta__grid">
        <div className="piece-meta__item">
          <span className="piece-meta__label">创作年份</span>
          <span className="piece-meta__value">{yearComposed}</span>
        </div>
        <div className="piece-meta__item">
          <span className="piece-meta__label">调性</span>
          <span className="piece-meta__value">{key}</span>
        </div>
        <div className="piece-meta__item">
          <span className="piece-meta__label">时长</span>
          <span className="piece-meta__value">{duration}</span>
        </div>
      </div>
      <p className="piece-meta__credit">音频来源: {audioCredit}</p>
    </div>
  );
}

export default PieceMeta;
