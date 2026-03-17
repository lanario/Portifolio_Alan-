'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { technologyCategories } from '@/lib/constants/technologies';

interface TechnologyFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function TechnologyFilter({
  activeCategory,
  onCategoryChange,
}: TechnologyFilterProps) {
  return (
    <Tabs.Root
      value={activeCategory}
      onValueChange={onCategoryChange}
      className="mb-12"
    >
      <Tabs.List className="flex flex-wrap justify-center gap-3">
        {technologyCategories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <Tabs.Trigger
              key={category.id}
              value={category.id}
              className={`
                px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300
                ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              {category.label}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
    </Tabs.Root>
  );
}

export { TechnologyFilter };
