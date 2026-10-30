/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartPulse } from 'lucide-react';

export type ActiveTab = 'curriculum' | 'cases' | 'calculator' | 'exam' | 'protocols';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  completedTestsCount: number;
  totalTestsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  completedTestsCount,
  totalTestsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand title, single line */}
        <button
          onClick={() => onTabChange('curriculum')}
          className="flex items-center gap-2.5 text-left text-slate-900 group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-700 transition-colors">
            <HeartPulse className="w-5 h-5" />
          </div>
          <span className="text-base font-bold tracking-tight whitespace-nowrap">
            Педиатрия: Неотложная помощь
          </span>
        </button>

        {/* Zone 2: 4–5 nav links, 1–2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onTabChange('curriculum')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Учебный план
          </button>

          <button
            onClick={() => onTabChange('cases')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'cases'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Клинические случаи (5)
          </button>

          <button
            onClick={() => onTabChange('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'calculator'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Калькулятор доз
          </button>

          <button
            onClick={() => onTabChange('exam')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'exam'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Итоговый экзамен
          </button>

          <button
            onClick={() => onTabChange('protocols')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 cursor-pointer ${
              activeTab === 'protocols'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Памятки для печати
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span>Тесты:</span>
            <span className="font-semibold text-sky-700 tabular-nums">
              {completedTestsCount}/{totalTestsCount}
            </span>
          </div>

          <button
            onClick={() => onTabChange('cases')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            Разбор случаев
          </button>
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs font-medium gap-2">
        <button
          onClick={() => onTabChange('curriculum')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'curriculum' ? 'bg-sky-100 text-sky-800 font-semibold' : 'text-slate-600'
          }`}
        >
          План
        </button>
        <button
          onClick={() => onTabChange('cases')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'cases' ? 'bg-sky-100 text-sky-800 font-semibold' : 'text-slate-600'
          }`}
        >
          Случаи (5)
        </button>
        <button
          onClick={() => onTabChange('calculator')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'calculator' ? 'bg-sky-100 text-sky-800 font-semibold' : 'text-slate-600'
          }`}
        >
          Калькулятор
        </button>
        <button
          onClick={() => onTabChange('exam')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'exam' ? 'bg-sky-100 text-sky-800 font-semibold' : 'text-slate-600'
          }`}
        >
          Экзамен
        </button>
        <button
          onClick={() => onTabChange('protocols')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'protocols' ? 'bg-sky-100 text-sky-800 font-semibold' : 'text-slate-600'
          }`}
        >
          Памятки
        </button>
      </div>
    </header>
  );
};
