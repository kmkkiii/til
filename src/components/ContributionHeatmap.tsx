import React from 'react';
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
  const generateHeatmapData = (): DayData[] => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1);

    const postCounts = new Map<string, number>();
    
    posts.forEach(post => {
      const dateStr = post.date;
      postCounts.set(dateStr, (postCounts.get(dateStr) || 0) + 1);
    });

    const data: DayData[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = postCounts.get(dateStr) || 0;
      
      let level = 0;
      if (count > 0) {
        if (count === 1) level = 1;
        else if (count === 2) level = 2;
        else if (count <= 4) level = 3;
        else level = 4;
      }
      
      data.push({
        date: dateStr,
        count,
        level
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
  };

  const heatmapData = generateHeatmapData();
  
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

  return (
    <div className="contribution-heatmap w-full max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        投稿活動
      </h2>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <div className="inline-flex flex-col gap-1 min-w-fit">
            {/* Month labels */}
            <div className="flex gap-1 mb-2">
              <div className="w-8"></div>
              {weeks.map((week, weekIndex) => {
                if (weekIndex === 0 || weekIndex % 4 === 0) {
                  const firstDay = new Date(week[0]?.date);
                  return (
                    <div 
                      key={weekIndex} 
                      className="text-xs text-gray-600 dark:text-gray-400 w-3 text-center"
                    >
                      {monthLabels[firstDay.getMonth()]}
                    </div>
                  );
                }
                return <div key={weekIndex} className="w-3"></div>;
              })}
            </div>

            {/* Day labels and grid */}
            <div className="flex gap-1">
              {/* Day labels */}
              <div className="flex flex-col gap-1">
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
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const dayData = week[dayIndex];
                      if (!dayData) {
                        return (
                          <div 
                            key={`empty-${dayIndex}`} 
                            className="w-3 h-3"
                          />
                        );
                      }
                      
                      return (
                        <div
                          key={dayData.date}
                          className={`w-3 h-3 rounded-sm ${getColorClass(dayData.level)} border border-gray-200 dark:border-gray-600`}
                          title={`${dayData.date}: ${dayData.count} posts`}
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
        <div className="flex items-center justify-between mt-4 text-xs text-gray-600 dark:text-gray-400">
          <span>過去1年間の投稿活動</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getColorClass(level)} border border-gray-200 dark:border-gray-600`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}