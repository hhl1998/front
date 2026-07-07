import { useState, useMemo, useCallback, useEffect } from 'react';
import { musicPieces } from './data/musicData';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { getDayPiece } from './utils/calendar';
import Header from './components/Header/Header';
import MainLayout from './components/MainLayout/MainLayout';
import StoryPanel from './components/StoryPanel/StoryPanel';
import CalendarPanel from './components/CalendarPanel/CalendarPanel';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import type { MusicPiece } from './types/music';
import './App.css';

function App() {
  const today = new Date();
  const todayDay = today.getDate();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();

  const [currentYear, setCurrentYear] = useState(todayYear);
  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(todayDay);

  const audio = useAudioPlayer();

  // Build day-to-piece map (31 days, each mapped to a unique piece via modulo)
  const dayPieceMap = useMemo(() => {
    const map = new Map<number, MusicPiece>();
    for (let d = 1; d <= 31; d++) {
      const piece = getDayPiece(d, musicPieces);
      if (piece) map.set(d, piece);
    }
    return map;
  }, []);

  // Derive selected piece from selectedDay
  const selectedPiece = useMemo(
    () => (selectedDay ? (dayPieceMap.get(selectedDay) ?? null) : null),
    [selectedDay, dayPieceMap]
  );

  // When selectedPiece changes, load and auto-play
  useEffect(() => {
    if (selectedPiece) {
      audio.load(selectedPiece.audioUrl);
      const timer = setTimeout(() => audio.play(), 300);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPiece]);

  const handleSelectDay = useCallback((day: number) => {
    setSelectedDay(day);
  }, []);

  const handlePrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth]);

  return (
    <div className="app">
      <Header />
      <MainLayout>
        <StoryPanel piece={selectedPiece} />
        <CalendarPanel
          year={currentYear}
          month={currentMonth}
          selectedDay={selectedDay}
          todayDay={todayDay}
          pieces={dayPieceMap}
          onSelectDay={handleSelectDay}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </MainLayout>
      <AudioPlayer
        piece={selectedPiece}
        isPlaying={audio.isPlaying}
        playState={audio.playState}
        currentTime={audio.currentTime}
        duration={audio.duration}
        error={audio.error}
        onToggle={audio.toggle}
        onStop={audio.stop}
      />
    </div>
  );
}

export default App;
