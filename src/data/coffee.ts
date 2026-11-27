import { COFFEE_START, coffeeCups, type CoffeeCup } from "./coffee-log";

const TIME_ZONE = "Asia/Jakarta";
const MS_PER_DAY = 86_400_000;
const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Days are plain integers since 1970-01-01 (UTC), so no local-timezone drift.
const dayNumber = (iso: string) => Math.floor(Date.parse(`${iso}T00:00:00Z`) / MS_PER_DAY);
const isoOf = (day: number) => new Date(day * MS_PER_DAY).toISOString().slice(0, 10);
// 1970-01-01 was a Thursday, so Monday = 0.
const weekdayOf = (day: number) => (day + 3) % 7;
// Heatmap weeks start on Sunday; 1970-01-01 was a Thursday, so Sunday = 0 at (day + 4) % 7.
const sundayOf = (day: number) => day - ((day + 4) % 7);

const shortDate = (day: number) =>
  new Date(day * MS_PER_DAY).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

export const todayIso = () => new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE });

export interface Tally {
  label: string;
  count: number;
}

function tally(values: string[]): Tally[] {
  const counts = new Map<string, Tally>();
  for (const value of values) {
    const label = value.trim();
    const key = label.toLowerCase();
    const entry = counts.get(key);
    if (entry) entry.count += 1;
    else counts.set(key, { label, count: 1 });
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export interface CoffeeDay {
  date: string;
  weekday: string;
  cups: CoffeeCup[];
}

export interface CoffeeMonth {
  key: string;
  label: string;
  total: number;
  days: CoffeeDay[];
}

export interface CoffeeSummary {
  today: string;
  cups: CoffeeCup[];
  total: number;
  daysLogged: number;
  /** Cups per calendar day since `COFFEE_START`, empty days included. */
  averagePerDay: number;
  /** Consecutive days with a cup, ending today (or yesterday while today is empty). */
  streak: number;
  todayCount: number;
  last7: number;
  latest: CoffeeCup | undefined;
  /** Cups per hour of day, index 0-23. */
  hours: number[];
  peakHour: number | null;
  peakCount: number;
  /** Cups per place (`home`, `office`, `cafe`...). */
  places: Tally[];
  months: CoffeeMonth[];
  counts: Map<string, number>;
}

export function getCoffeeSummary(): CoffeeSummary {
  const today = todayIso();
  const todayDay = dayNumber(today);
  const cups = [...coffeeCups].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const byDate = new Map<string, CoffeeCup[]>();
  for (const cup of cups) byDate.set(cup.date, [...(byDate.get(cup.date) ?? []), cup]);

  // Streak counts back from today, or from yesterday while today is still empty.
  let cursor = byDate.has(today) ? todayDay : todayDay - 1;
  let streak = 0;
  while (byDate.has(isoOf(cursor))) {
    streak += 1;
    cursor -= 1;
  }

  const hours = Array.from({ length: 24 }, () => 0);
  for (const cup of cups) hours[Number(cup.time.slice(0, 2))] += 1;
  const peakCount = Math.max(...hours);
  const peakHour = peakCount > 0 ? hours.indexOf(peakCount) : null;

  const days: CoffeeDay[] = [...byDate.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, dayCups]) => ({ date, weekday: WEEKDAYS[weekdayOf(dayNumber(date))], cups: dayCups }));

  const months: CoffeeMonth[] = [];
  for (const day of days) {
    const key = day.date.slice(0, 7);
    let month = months.find((m) => m.key === key);
    if (!month) {
      const label = new Date(`${key}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
      months.push((month = { key, label, total: 0, days: [] }));
    }
    month.days.push(day);
    month.total += day.cups.length;
  }

  const elapsedDays = Math.max(1, todayDay - dayNumber(COFFEE_START) + 1);
  const last7 = cups.filter((c) => {
    const age = todayDay - dayNumber(c.date);
    return age >= 0 && age < 7;
  }).length;

  return {
    today,
    cups,
    total: cups.length,
    daysLogged: byDate.size,
    averagePerDay: cups.length / elapsedDays,
    streak,
    todayCount: byDate.get(today)?.length ?? 0,
    last7,
    latest: cups.at(-1),
    hours,
    peakHour,
    peakCount,
    places: tally(cups.map((c) => c.place)),
    months,
    counts: new Map([...byDate].map(([date, dayCups]) => [date, dayCups.length])),
  };
}

export interface HeatCell {
  date: string;
  cups: number;
  level: 0 | 1 | 2 | 3;
  state: "past" | "today" | "future" | "before";
  label: string;
}

/**
 * Weeks as columns, Monday-first. Spans from the log's first week to the
 * current one, padded forward to `minWeeks` and trimmed to the latest `maxWeeks`.
 */
export function buildHeatmap(summary: CoffeeSummary, minWeeks: number, maxWeeks: number): HeatCell[][] {
  const startDay = dayNumber(COFFEE_START);
  const todayDay = dayNumber(summary.today);
  const lastCupDay = summary.cups.length ? dayNumber(summary.cups.at(-1)!.date) : todayDay;
  const lastWeek = sundayOf(Math.max(todayDay, lastCupDay));

  let firstWeek = sundayOf(startDay);
  let weekCount = (lastWeek - firstWeek) / 7 + 1;
  if (weekCount > maxWeeks) {
    firstWeek = lastWeek - (maxWeeks - 1) * 7;
    weekCount = maxWeeks;
  } else if (weekCount < minWeeks) {
    weekCount = minWeeks;
  }

  return Array.from({ length: weekCount }, (_, week) =>
    Array.from({ length: 7 }, (_, offset): HeatCell => {
      const day = firstWeek + week * 7 + offset;
      const date = isoOf(day);
      const cups = summary.counts.get(date) ?? 0;
      const state = day < startDay ? "before" : day === todayDay ? "today" : day > todayDay ? "future" : "past";
      const when = `${WEEKDAYS[(offset + 6) % 7].slice(0, 3)} ${shortDate(day)}`;
      return {
        date,
        cups,
        level: Math.min(cups, 3) as HeatCell["level"],
        state,
        label: state === "future" ? when : `${when} · ${cups} ${cups === 1 ? "cup" : "cups"}`,
      };
    }),
  );
}

export function formatCupDay(date: string, today: string) {
  const diff = dayNumber(today) - dayNumber(date);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return shortDate(dayNumber(date));
}

export const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;
