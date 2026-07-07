import { useMemo } from 'react';
import type { MusicPiece } from '../../types/music';
import { getMonthGrid } from '../../utils/calendar';
import MonthNavigator from './MonthNavigator';
import WeekdayHeader from './WeekdayHeader';
import CalendarGrid from './CalendarGrid';
import './CalendarPanel.css';
import './CalendarDay.css';

interface CalendarPanelProps {
  year: number;
  month: number;
  selectedDay: number | null;
  todayDay: number;
  pieces: Map<number, MusicPiece>;
  onSelectDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function CalendarPanel({
  year,
  month,
  selectedDay,
  pieces,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
}: CalendarPanelProps) {
  const days = useMemo(() => getMonthGrid(year, month), [year, month]);

  return (
    <div className="calendar-panel">
      <div className="calendar-panel__card">
        <MonthNavigator
          year={year}
          month={month}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
        />
        <WeekdayHeader />
        <CalendarGrid
          days={days}
          selectedDay={selectedDay}
          pieces={pieces}
          onSelectDay={onSelectDay}
        />
      </div>
    </div>
  );
}

export default CalendarPanel;
