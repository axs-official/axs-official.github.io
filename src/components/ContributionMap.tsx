import data from "@/data/contributions.json";

const contributions = data as {
  total: number;
  activeDays: number;
  longestStreak: number;
  weeks: { d: string; c: number; w: number }[][];
};

const peak = Math.max(...contributions.weeks.flat().map((day) => day.c), 1);

function level(count: number) {
  if (count === 0) return 0;
  const ratio = count / peak;
  if (ratio <= 0.12) return 1;
  if (ratio <= 0.3) return 2;
  if (ratio <= 0.62) return 3;
  return 4;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ContributionMap() {
  const weeks = contributions.weeks;
  const labels: { label: string; column: number }[] = [];
  let lastMonth = "";

  weeks.forEach((week, index) => {
    const month = week[0].d.slice(5, 7);
    if (month !== lastMonth) {
      lastMonth = month;
      labels.push({ label: months[Number(month) - 1], column: index });
    }
  });

  return (
    <div className="card overflow-hidden p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            Last 12 months
          </p>
          <p className="mt-2 text-[clamp(1.6rem,3vw,2.1rem)] font-semibold tracking-[-0.03em]">
            {contributions.total.toLocaleString()} commits
          </p>
        </div>
        <dl className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
          <div>
            <dt>Days active</dt>
            <dd className="mt-1 text-base font-medium tracking-normal text-ink">
              {contributions.activeDays}
            </dd>
          </div>
          <div>
            <dt>Best streak</dt>
            <dd className="mt-1 text-base font-medium tracking-normal text-ink">
              {contributions.longestStreak} days
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="min-w-max">
          <div className="relative mb-2 h-3 font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
            {labels.map((item) => (
              <span
                key={`${item.label}-${item.column}`}
                className="absolute top-0"
                style={{ left: `${item.column * 15}px` }}
              >
                {item.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={week[0].d} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.d}
                    title={`${day.d}: ${day.c} commit${day.c === 1 ? "" : "s"}`}
                    data-level={level(day.c)}
                    className="cm-cell h-[12px] w-[12px] rounded-[2px]"
                    style={{ animationDelay: `${weekIndex * 14 + day.w * 4}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-dim">
        <span>github.com/axs-official</span>
        <span className="flex items-center gap-1.5">
          Less
          {[0, 1, 2, 3, 4].map((value) => (
            <span
              key={value}
              data-level={value}
              className="cm-cell h-[10px] w-[10px] rounded-[2px]"
            />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
