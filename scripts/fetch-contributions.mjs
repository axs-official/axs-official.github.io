const token = process.env.GH_TOKEN;
if (!token) {
  console.error("GH_TOKEN missing");
  process.exit(1);
}

const query = `query {
  user(login: "axs-official") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
  }
}`;

const response = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "axs-site-build",
  },
  body: JSON.stringify({ query }),
});

const payload = await response.json();
if (payload.errors) {
  console.error(JSON.stringify(payload.errors, null, 2));
  process.exit(1);
}
const calendar = payload.data.user.contributionsCollection.contributionCalendar;
const days = calendar.weeks.flatMap((week) => week.contributionDays);
const activeDays = days.filter((day) => day.contributionCount > 0).length;
let longest = 0;
let current = 0;
for (const day of days) {
  if (day.contributionCount > 0) {
    current += 1;
    longest = Math.max(longest, current);
  } else {
    current = 0;
  }
}
const trailing = [...days].reverse();
let currentStreak = 0;
for (const day of trailing) {
  if (day.contributionCount > 0) currentStreak += 1;
  else break;
}
const output = {
  total: calendar.totalContributions,
  activeDays,
  currentStreak,
  longestStreak: longest,
  weeks: calendar.weeks.map((week) =>
    week.contributionDays.map((day) => ({
      d: day.date,
      c: day.contributionCount,
      w: day.weekday,
    })),
  ),
};
console.log(JSON.stringify(output));
