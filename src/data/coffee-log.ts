export interface CoffeeCup {
  /** Calendar day in Asia/Jakarta, `YYYY-MM-DD`. */
  date: string;
  /** 24-hour local time, `HH:mm`. */
  time: string;
  drink: string;
  /** Curated, lowercase group used for stats: `home`, `office`, `cafe`... */
  place: string;
  /** Specific spot within the place, e.g. `Starbucks`. Optional. */
  venue?: string;
  note?: string;
  /** File name in `src/assets/coffee/`, e.g. `2026-11-27-0740.jpg`. Any ratio; thumbnails crop to a square. */
  photo?: string;
}

/** First day of the log. The heatmap never draws days before this. */
export const COFFEE_START = "2026-11-27";

// One object per cup, appended in any order; the page sorts them.
// { date: "2026-11-27", time: "07:40", drink: "Iced americano", place: "home" },
// { date: "2026-11-27", time: "14:30", drink: "V60 Ethiopia", place: "cafe", venue: "Starbucks" },
export const coffeeCups: CoffeeCup[] = [
  {
    date: "2026-11-27",
    time: "20:40",
    drink: "Hot kopi susu",
    place: "office",
    venue: "Bleum Coffee Pacific Place",
    photo: "2026-11-27-2040.jpg",
  },
];
