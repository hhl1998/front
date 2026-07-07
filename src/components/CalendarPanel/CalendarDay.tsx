import type { CalendarDayData, MusicPiece } from '../../types/music';

interface CalendarDayProps {
  dayData: CalendarDayData;
  piece: MusicPiece | null;
  isSelected: boolean;
  onSelect: () => void;
}

function CalendarDay({ dayData, piece, isSelected, onSelect }: CalendarDayProps) {
  const { day, isCurrentMonth, isToday } = dayData;

  const classNames = ['calendar-day'];
  if (!isCurrentMonth) classNames.push('calendar-day--other-month');
  if (isToday) classNames.push('calendar-day--today');
  if (isSelected) classNames.push('calendar-day--selected');
  if (piece) classNames.push('calendar-day--has-piece');

  return (
    <button
      className={classNames.join(' ')}
      onClick={onSelect}
      disabled={!isCurrentMonth}
      title={piece ? `${piece.title} — ${piece.composerZh}` : undefined}
    >
      <span className="calendar-day__number">{day}</span>
      {piece && isCurrentMonth && (
        <span className="calendar-day__indicator">&#9835;</span>
      )}
    </button>
  );
}

export default CalendarDay;
