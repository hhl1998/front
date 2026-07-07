import { MONTH_NAMES } from '../../utils/calendar';

interface MonthNavigatorProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function MonthNavigator({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: MonthNavigatorProps) {
  return (
    <div className="month-nav">
      <button className="month-nav__btn" onClick={onPrevMonth} title="上个月">
        &#8249;
      </button>
      <span className="month-nav__label">
        {MONTH_NAMES[month]} {year}
      </span>
      <button className="month-nav__btn" onClick={onNextMonth} title="下个月">
        &#8250;
      </button>
    </div>
  );
}

export default MonthNavigator;
