import type { CalendarDayData, MusicPiece } from '../../types/music';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  days: CalendarDayData[];
  selectedDay: number | null;
  pieces: Map<number, MusicPiece>;
  onSelectDay: (day: number) => void;
}

function CalendarGrid({ days, selectedDay, pieces, onSelectDay }: CalendarGridProps) {
  return (
    <div className="calendar-grid">
      {days.map((dayData, index) => {
        const piece = pieces.get(dayData.day) ?? null;
        const isSelected = selectedDay === dayData.day && dayData.isCurrentMonth;

        return (
          <CalendarDay
            key={`${dayData.date.getTime()}-${index}`}
            dayData={dayData}
            piece={piece}
            isSelected={isSelected}
            onSelect={() => dayData.isCurrentMonth && onSelectDay(dayData.day)}
          />
        );
      })}
    </div>
  );
}

export default CalendarGrid;
