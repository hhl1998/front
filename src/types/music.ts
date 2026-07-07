export type MusicEra =
  | 'baroque'
  | 'classical'
  | 'romantic'
  | 'impressionist'
  | 'modern';

export interface MusicPiece {
  day: number;
  title: string;
  titleEn: string;
  composer: string;
  composerZh: string;
  era: MusicEra;
  yearComposed: string;
  key: string;
  duration: string;
  story: string;
  storyEn?: string;
  audioUrl: string;
  audioCredit: string;
}

export interface CalendarDayData {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  date: Date;
}

export type PlayState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';
