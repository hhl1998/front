import type { MusicPiece, PlayState } from '../../types/music';
import './AudioPlayer.css';

interface AudioPlayerProps {
  piece: MusicPiece | null;
  isPlaying: boolean;
  playState: PlayState;
  currentTime: number;
  duration: number;
  error: string | null;
  onToggle: () => void;
  onStop: () => void;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function AudioPlayer({
  piece,
  isPlaying,
  playState,
  currentTime,
  duration,
  error,
  onToggle,
  onStop,
}: AudioPlayerProps) {
  const isLoading = playState === 'loading';
  const hasError = playState === 'error';
  const hasTrack = piece !== null && playState !== 'idle';

  return (
    <div className={`audio-player ${hasTrack ? 'audio-player--active' : ''}`}>
      {/* Track Info */}
      <div className="audio-player__info">
        <div className={`audio-player__icon ${isPlaying ? 'audio-player__icon--playing' : ''}`}>
          <span className="audio-player__note">&#9835;</span>
          {isPlaying && (
            <span className="audio-player__equalizer">
              <span className="audio-player__bar"></span>
              <span className="audio-player__bar"></span>
              <span className="audio-player__bar"></span>
            </span>
          )}
        </div>
        <div className="audio-player__text">
          {hasTrack && piece ? (
            <>
              <span className="audio-player__title">{piece.title}</span>
              <span className="audio-player__composer">{piece.composerZh}</span>
            </>
          ) : (
            <>
              <span className="audio-player__title">
                {hasError ? '播放出错' : '点击日历中的日期开始聆听'}
              </span>
              <span className="audio-player__composer">
                {hasError ? error : '选择一天，探索古典音乐之美'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {hasTrack && !hasError && (
        <div className="audio-player__progress">
          <span className="audio-player__time">{formatTime(currentTime)}</span>
          <div className="audio-player__progress-bar">
            <div
              className="audio-player__progress-fill"
              style={{
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </div>
          <span className="audio-player__time">{formatTime(duration)}</span>
        </div>
      )}

      {/* Controls */}
      <div className="audio-player__controls">
        <button
          className={`audio-player__btn audio-player__btn--play ${
            isLoading ? 'audio-player__btn--loading' : ''
          } ${hasError ? 'audio-player__btn--error' : ''}`}
          onClick={onToggle}
          disabled={!hasTrack || isLoading}
          title={isPlaying ? '暂停' : hasError ? '重试' : '播放'}
        >
          {isLoading ? (
            <span className="audio-player__spinner"></span>
          ) : hasError ? (
            '↻'
          ) : isPlaying ? (
            <span className="audio-player__pause-icon">&#10074;&#10074;</span>
          ) : (
            '▶'
          )}
        </button>
        <button
          className="audio-player__btn audio-player__btn--stop"
          onClick={onStop}
          disabled={!hasTrack}
          title="停止"
        >
          ■
        </button>
      </div>
    </div>
  );
}

export default AudioPlayer;
