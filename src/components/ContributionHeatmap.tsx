import React, { useState } from 'react';
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

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate month labels aligned with month start columns
  const getMonthLabels = () => {
    const labels: { weekIndex: number; month: string }[] = [];
    let currentMonth = -1;
    
    weeks.forEach((week, weekIndex) => {
      if (week[0]) {
        const firstDay = new Date(week[0].date);
        const month = firstDay.getMonth();
        
        // Check if this is the first week of a new month
        if (month !== currentMonth) {
          // Only add label if it's the first day of the month or close to it
          const dayOfMonth = firstDay.getDate();
          if (dayOfMonth <= 7) { // First week of month
            labels.push({ weekIndex, month: monthLabels[month] });
            currentMonth = month;
          }
        }
      }
    });
    
    return labels;
  };

  const monthLabelPositions = getMonthLabels();

  return (
    <div className="contribution-heatmap w-full mx-auto p-4 relative">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="w-full">
          <div className="flex flex-col gap-1">
            {/* Month labels */}
            <div className="flex gap-[3px] mb-2">
              <div className="w-8"></div>
              {weeks.map((week, weekIndex) => {
                const monthLabel = monthLabelPositions.find(label => label.weekIndex === weekIndex);
                return (
                  <div 
                    key={weekIndex} 
                    className="text-xs text-gray-600 dark:text-gray-400 flex-1 text-left min-w-[12px]"
                  >
                    {monthLabel ? monthLabel.month : ''}
                  </div>
                );
              })}
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
                            className="w-full h-3 min-w-[10px]"
                          />
                        );
                      }
                      
                      return (
                        <div
                          key={dayData.date}
                          className={`w-full h-3 min-w-[10px] rounded-[2px] ${getColorClass(dayData.level)} border-[0.5px] border-gray-300 dark:border-gray-700 cursor-pointer transition-all hover:scale-110 hover:shadow-md`}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10,
                              date: dayData.date,
                              count: dayData.count
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
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
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