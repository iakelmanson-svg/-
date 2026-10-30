/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { CurriculumOverview } from './components/CurriculumOverview';
import { CaseDetailView } from './components/CaseDetailView';
import { PediatricCalculator } from './components/PediatricCalculator';
import { FinalExam } from './components/FinalExam';
import { PrintProtocols } from './components/PrintProtocols';
import { CLINICAL_CASES } from './data/clinicalCases';
import { HeartPulse, CheckCircle2, ShieldAlert } from 'lucide-react';

const STORAGE_KEY = 'pediatric_emergency_saved_answers_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('curriculum');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CLINICAL_CASES[0].id);
  const [savedAnswers, setSavedAnswers] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedAnswers));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedAnswers]);

  const handleSaveAnswer = (testId: string, isCorrect: boolean) => {
    setSavedAnswers((prev) => ({
      ...prev,
      [testId]: isCorrect ? 'correct' : 'incorrect',
    }));
  };

  // Count total block tests (5 cases * 4 blocks = 20 tests)
  const allBlockTestIds = CLINICAL_CASES.flatMap((c) => [
    c.complaints.test.id,
    c.presentation.test.id,
    c.differential.test.id,
    c.emergencyCare.test.id,
  ]);

  const completedTestsCount = allBlockTestIds.filter((id) => !!savedAnswers[id]).length;
  const totalTestsCount = allBlockTestIds.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        completedTestsCount={completedTestsCount}
        totalTestsCount={totalTestsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'curriculum' && (
          <CurriculumOverview
            cases={CLINICAL_CASES}
            onSelectCase={(id) => {
              setSelectedCaseId(id);
              setActiveTab('cases');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartExam={() => {
              setActiveTab('exam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'cases' && (
          <CaseDetailView
            cases={CLINICAL_CASES}
            selectedCaseId={selectedCaseId}
            onSelectCase={(id) => setSelectedCaseId(id)}
            savedAnswers={savedAnswers}
            onSaveAnswer={handleSaveAnswer}
          />
        )}

        {activeTab === 'calculator' && <PediatricCalculator />}

        {activeTab === 'exam' && <FinalExam />}

        {activeTab === 'protocols' && <PrintProtocols />}
      </main>

      {/* Clean Educational Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-sky-600" />
            <span>
              Учебная программа: <strong>Неотложная помощь в педиатрии</strong> (5 клинических случаев, 4 блока, тесты)
            </span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400 max-w-xl">
            Соответствует Приказу Минздрава России № 477н и международным протоколам PALS / ERC. Совместимо с Яндекс.Браузером и Google Chrome.
          </div>
        </div>
      </footer>
    </div>
  );
}
