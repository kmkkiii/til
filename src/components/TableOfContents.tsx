import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  html: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ html }) => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const items: TocItem[] = Array.from(headingElements).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      const level = parseInt(heading.tagName.substring(1));
      return {
        id,
        text: heading.textContent || '',
        level,
      };
    });
    
    setHeadings(items);
  }, [html]);

  useEffect(() => {
    // Wait for the DOM to be fully rendered
    const timeoutId = setTimeout(() => {
      const postContent = document.querySelector('.znc');
      if (!postContent) return;
      
      const headingElements = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingIds: string[] = [];
      
      headingElements.forEach((element, index) => {
        if (!element.id) {
          element.id = `heading-${index}`;
        }
        headingIds.push(element.id);
      });

      const handleScroll = () => {
        const scrollPosition = window.scrollY + 100; // Adjusted offset
        let currentActiveId = '';

        for (const id of headingIds) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            if (absoluteTop <= scrollPosition) {
              currentActiveId = id;
            }
          }
        }

        // Check if we're at the bottom of the page
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
          if (headingIds.length > 0) {
            currentActiveId = headingIds[headingIds.length - 1];
          }
        }

        if (currentActiveId) {
          setActiveId(currentActiveId);
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Call once to set initial state

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="h-full overflow-y-auto">
      <h2 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
        目次
      </h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={`block w-full text-left py-1 px-2 rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                activeId === heading.id
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};