import { useEffect, useState } from 'react';
import type { Post } from '../lib/post';

interface ContributionHeatmapProps {
  posts: Post[];
}

interface DayData {
  date: string;
  count: number;
  level: number;
}

export function ContributionHeatmap({ posts }: ContributionHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<{ x: number; y: number; date: string; count: number } | null>(null);
  const [heatmapData, setHeatmapData] = useState<DayData[]>([]);

  // JSTの日付文字列を取得するヘルパー関数
  const getJSTDateString = (date: Date): string => {
    const jstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // UTC+9時間
    return jstDate.toISOString().split('T')[0];
  };

  const generateHeatmapData = (): DayData[] => {
    // クライアントサイドでのみ実行されることを前提とし、JST基準で統一
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1);

    // startDateをその週の日曜日に調整
    const dayOfWeek = startDate.getDay(); // 0 (Sun) - 6 (Sat)
    if (dayOfWeek !== 0) { // 日曜日でない場合のみ調整
      startDate.setDate(startDate.getDate() - dayOfWeek);
    }

    const postCounts = new Map<string, number>();

    posts.forEach((post) => {
      const dateStr = post.date;
      postCounts.set(dateStr, (postCounts.get(dateStr) || 0) + 1);
    });

    const data: DayData[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= today) {
      const dateStr = getJSTDateString(currentDate);
      const count = postCounts.get(dateStr) || 0;

      let level = 0;
      if (count > 0) {
        if (count === 1)
          level = 1;
        else if (count === 2)
          level = 2;
        else if (count <= 4)
          level = 3;
        else level = 4;
      }

      data.push({
        date: dateStr,
        count,
        level,
      });

      // Move to next day
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDate = nextDate;
    }

    return data;
  };

  const getColorClass = (level: number): string => {
    switch (level) {
      case 0: return 'bg-gray-100 dark:bg-gray-800';
      case 1: return 'bg-green-200 dark:bg-green-900';
      case 2: return 'bg-green-300 dark:bg-green-800';
      case 3: return 'bg-green-400 dark:bg-green-700';
      case 4: return 'bg-green-500 dark:bg-green-600';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  const weeks: DayData[][] = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Generate month labels aligned with month start columns
  const getMonthLabels = () => {
    const labels: { weekIndex: number; month: string }[] = [];
    let lastAddedMonth = -1; // 最後にラベルを追加した月

    weeks.forEach((week, weekIndex) => {
      // この週に、まだラベル付けされていない新しい月の1日が含まれているか探す
      for (const dayData of week) {
        if (dayData) {
          const currentDate = new Date(dayData.date);
          const dayOfMonth = currentDate.getDate();
          const month = currentDate.getMonth();

          if (dayOfMonth === 1 && month !== lastAddedMonth) {
            labels.push({ weekIndex, month: monthLabels[month] });
            lastAddedMonth = month;
            // この週で該当する最初の新しい月の1日を見つけたら、
            // この週に対するラベル付けは完了とし、次の週の処理に移る
            break;
          }
        }
      }
    });
    return labels;
  };

  const monthLabelPositions = getMonthLabels();

  useEffect(() => {
    setHeatmapData(generateHeatmapData());
  }, [posts]);

  return (
    <div className="contribution-heatmap w-full mx-auto relative">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="w-full overflow-x-auto">
          <div className="flex flex-col gap-1">
            {/* Month labels */}
            <div className="flex gap-[3px]">
              <div className="w-8 shrink-0"></div>
              <div className="flex gap-[3px] flex-1">
                {weeks.map((_, weekIndex) => {
                  const monthLabel = monthLabelPositions.find(label => label.weekIndex === weekIndex);
                  return (
                    <div
                      key={weekIndex}
                      className="flex-1 text-left min-w-[9.35px]"
                    >
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {monthLabel ? monthLabel.month : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Day labels and grid */}
            <div className="flex gap-[3px]">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px]">
                {dayLabels.map((label, index) => (
                  <div
                    key={label}
                    className="text-xs text-gray-600 dark:text-gray-400 w-8 h-3 flex items-center"
                  >
                    {index % 2 === 1 ? label : ''}
                  </div>
                ))}
              </div>

              {/* Heatmap grid */}
              <div className="flex gap-[3px] flex-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px] flex-1">
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const dayData = week[dayIndex];
                      if (!dayData) {
                        return (
                          <div
                            key={`empty-${dayIndex}`}
                            className="w-full h-3 min-w-3"
                          />
                        );
                      }

                      return (
                        <div
                          key={dayData.date}
                          className={`w-full h-3 min-w-3 rounded-[2px] ${getColorClass(dayData.level)} border-[0.5px] border-gray-300 dark:border-gray-700 cursor-pointer transition-all hover:scale-110 hover:shadow-md`}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10,
                              date: dayData.date,
                              count: dayData.count,
                            });
                          }}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end mt-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-[2px] ${getColorClass(level)} border-[0.5px] border-gray-300 dark:border-gray-700`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Popover */}
      {hoveredDay && (
        <div
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full min-w-max"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y,
          }}
        >
          <div className="font-medium">{formatDate(hoveredDay.date)}</div>
          <div className="text-gray-200 dark:text-gray-300">
            {hoveredDay.count === 0 ? '投稿なし' : `${hoveredDay.count}件の投稿`}
          </div>
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"
          />
        </div>
      )}
    </div>
  );
}
