import type { CalendarDayData, MusicPiece } from '../types/music';

export function getMonthGrid(year: number, month: number): CalendarDayData[] {
  const firstDay = new Date(year, month, 1);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const days: CalendarDayData[] = [];

  // Leading cells from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    days.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      date: new Date(year, month - 1, day),
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday =
      year === todayYear && month === todayMonth && d === todayDate;
    days.push({
      day: d,
      isCurrentMonth: true,
      isToday,
      date: new Date(year, month, d),
    });
  }

  // Trailing cells to fill 6 rows (42 cells)
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({
      day: d,
      isCurrentMonth: false,
      isToday: false,
      date: new Date(year, month + 1, d),
    });
  }

  return days;
}

export function getDayPiece(
  day: number,
  pieces: MusicPiece[]
): MusicPiece | null {
  if (pieces.length === 0) return null;
  const index = (day - 1) % pieces.length;
  return pieces[index];
}

export const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

export const MONTH_NAMES = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
];
