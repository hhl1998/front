import { WEEKDAY_LABELS } from '../../utils/calendar';

function WeekdayHeader() {
  return (
    <div className="weekday-header">
      {WEEKDAY_LABELS.map((label) => (
        <div key={label} className="weekday-header__cell">
          {label}
        </div>
      ))}
    </div>
  );
}

export default WeekdayHeader;
