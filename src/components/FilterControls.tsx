import React from 'react';
import { CategoryType, CSSFilterType } from '../types';
import { Eye, Layers } from 'lucide-react';

interface FilterControlsProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  activeCSSFilter: CSSFilterType;
  onSelectCSSFilter: (filter: CSSFilterType) => void;
  totalCount: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  activeCategory,
  onSelectCategory,
  activeCSSFilter,
  onSelectCSSFilter,
  totalCount,
}) => {
  const categories: { label: string; value: CategoryType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Nature', value: 'nature' },
    { label: 'Animals', value: 'animals' },
    { label: 'Cities', value: 'cities' },
    { label: 'Technology', value: 'technology' },
  ];

  const cssFilters: { label: string; value: CSSFilterType }[] = [
    { label: 'Normal', value: 'none' },
    { label: 'B&W', value: 'grayscale' },
    { label: 'Sepia', value: 'sepia' },
    { label: 'Blur', value: 'blur' },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-5">
      {/* Category Chips Container */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2.5" id="filter-container">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`filter-btn px-5 py-2 rounded-full font-headline text-sm font-semibold transition-all duration-300 transform active:scale-95 ${
                  isActive
                    ? 'active bg-primary text-black shadow-[0_0_15px_rgba(164,201,255,0.4)]'
                    : 'bg-surface-container text-[#A0A0A0] hover:bg-surface-container-high hover:text-white'
                }`}
                data-filter={cat.value}
                id={`filter-btn-${cat.value}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        <div className="text-on-surface-variant font-mono text-[11px] uppercase tracking-widest pl-2">
          showing {totalCount} curated photographs
        </div>
      </div>

      {/* CSS Live Lens Filters */}
      <div className="flex items-center gap-3 self-end md:self-center">
        <span className="text-xs text-[#A0A0A0] font-mono hidden sm:inline-flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-primary" /> Cinematic Filter:
        </span>
        <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1 border border-outline-variant/10">
          {cssFilters.map((filter) => {
            const isActive = activeCSSFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => onSelectCSSFilter(filter.value)}
                className={`css-filter-btn px-4 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-surface-variant text-on-surface border-b-2 border-primary/40'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30'
                }`}
                data-css={filter.value}
                id={`css-filter-btn-${filter.value}`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
