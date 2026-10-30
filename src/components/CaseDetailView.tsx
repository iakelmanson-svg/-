/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClinicalCase } from '../types/clinical';
import { BlockTestComponent } from './BlockTestComponent';
import {
  FileText,
  Stethoscope,
  GitCompare,
  AlertOctagon,
  ChevronRight,
  ShieldAlert,
  Clock,
  User,
  Scale,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Pill,
  Ban,
  Activity,
  Heart,
  Wind
} from 'lucide-react';

interface CaseDetailViewProps {
  cases: ClinicalCase[];
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
  savedAnswers: Record<string, string>;
  onSaveAnswer: (testId: string, isCorrect: boolean) => void;
}

type BlockTab = 'all' | 'complaints' | 'presentation' | 'differential' | 'emergency';

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({
  cases,
  selectedCaseId,
  onSelectCase,
  savedAnswers,
  onSaveAnswer,
}) => {
  const [activeBlockTab, setActiveBlockTab] = useState<BlockTab>('all');

  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  // Helper to count answered tests in this case
  const caseTestIds = [
    currentCase.complaints.test.id,
    currentCase.presentation.test.id,
    currentCase.differential.test.id,
    currentCase.emergencyCare.test.id,
  ];

  const completedInThisCase = caseTestIds.filter((id) => !!savedAnswers[id]).length;

  return (
    <div className="space-y-8">
      {/* 5 Clinical Cases Selector Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Клинические случаи неотложных состояний
            </h2>
            <p className="text-xs text-slate-500">
              Выберите клинический случай для детального пошагового разбора всех 4 блоков
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Случай <span className="font-bold text-sky-700">{currentCase.caseNumber}</span> из {cases.length}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {cases.map((c) => {
            const isSelected = c.id === currentCase.id;
            const completedCount = [
              c.complaints.test.id,
              c.presentation.test.id,
              c.differential.test.id,
              c.emergencyCare.test.id,
            ].filter((id) => !!savedAnswers[id]).length;

            return (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCase(c.id);
                  setActiveBlockTab('all');
                }}
                className={`text-left p-3 rounded-lg border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50 shadow-sm ring-1 ring-sky-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className={isSelected ? 'text-sky-800' : 'text-slate-600'}>
                    Случай №{c.caseNumber}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {completedCount}/4 тестов
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                  {c.title}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span>{c.patient.age}</span>
                  <span>·</span>
                  <span>{c.patient.weightKg} кг</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="font-semibold text-sky-700">Клинический случай №{currentCase.caseNumber}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {currentCase.urgencyLevel}
                </span>
                <span>·</span>
                <span>Освоено {completedInThisCase} из 4 тестовых блоков</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {currentCase.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                {currentCase.subtitle}
              </p>
            </div>

            {/* Patient Meta Strip */}
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 block">Возраст и пол</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {currentCase.patient.gender}, {currentCase.patient.age}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 block">Масса тела</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {currentCase.patient.weightKg} кг
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 block">Локация / Обстановка</span>
                  <span className="font-semibold text-slate-900">
                    {currentCase.patient.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-100 min-h-[220px] relative overflow-hidden">
            {currentCase.imagePath ? (
              <img
                src={currentCase.imagePath}
                alt={currentCase.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-sky-900 to-slate-900 text-white">
                <div className="text-center">
                  <Activity className="w-12 h-12 mx-auto text-sky-400 mb-2 opacity-80" />
                  <span className="text-sm font-semibold">{currentCase.title}</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none lg:hidden" />
          </div>
        </div>

        {/* Block Navigation Tabs */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 sm:px-6 py-2.5 flex items-center gap-1 sm:gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-500 mr-2 whitespace-nowrap">
            Разделы случая:
          </span>

          <button
            onClick={() => setActiveBlockTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeBlockTab === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Все 4 блока вместе
          </button>

          <button
            onClick={() => setActiveBlockTab('complaints')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeBlockTab === 'complaints'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Жалобы и анамнез</span>
          </button>

          <button
            onClick={() => setActiveBlockTab('presentation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeBlockTab === 'presentation'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>2. Клиническая картина</span>
          </button>

          <button
            onClick={() => setActiveBlockTab('differential')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeBlockTab === 'differential'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>3. Дифдиагностика</span>
          </button>

          <button
            onClick={() => setActiveBlockTab('emergency')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeBlockTab === 'emergency'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>4. Тактика помощи</span>
          </button>
        </div>
      </div>

      {/* 4 DISTINCT BLOCKS */}

      {/* ========================================================= */}
      {/* BLOCK 1: Жалобы и анамнез */}
      {/* ========================================================= */}
      {(activeBlockTab === 'all' || activeBlockTab === 'complaints') && (
        <section
          id="block-complaints"
          className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Блок 1: Жалобы и анамнез заболевания
                </h3>
                <p className="text-xs text-slate-500">
                  Хронология развития симптомов, триггеры, преморбидный фон
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">Раздел 1/4</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  История настоящего заболевания
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                  {currentCase.complaints.historyOfIllness}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block mb-1">Особенности дебюта</span>
                  <span className="font-semibold text-slate-800">
                    {currentCase.complaints.onsetCharacteristics}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block mb-1">Провоцирующий триггер</span>
                  <span className="font-semibold text-slate-800">
                    {currentCase.complaints.triggerFactors}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                <span className="text-slate-500 block mb-1">Анамнез жизни и аллергологический статус</span>
                <span className="text-slate-800">
                  {currentCase.complaints.epidemiologicalAndAllergyHistory}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Ведущие симптомы и жалобы (Checklist)
              </h4>
              <ul className="space-y-2">
                {currentCase.complaints.keyComplaintsList.map((complaint, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-800 bg-sky-50/40 p-3 rounded-lg border border-sky-100"
                  >
                    <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{complaint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Test for Block 1 */}
          <BlockTestComponent
            test={currentCase.complaints.test}
            blockLabel="Блок 1: Жалобы и анамнез"
            savedAnswerId={savedAnswers[currentCase.complaints.test.id]}
            onAnswerSubmitted={(isCorrect) => onSaveAnswer(currentCase.complaints.test.id, isCorrect)}
          />
        </section>
      )}

      {/* ========================================================= */}
      {/* BLOCK 2: Клиническая картина и объективный осмотр */}
      {/* ========================================================= */}
      {(activeBlockTab === 'all' || activeBlockTab === 'presentation') && (
        <section
          id="block-presentation"
          className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Блок 2: Клиническая картина и объективный осмотр
                </h3>
                <p className="text-xs text-slate-500">
                  Педиатрический треугольник оценки (PAT), Vital Signs, физикальный статус
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">Раздел 2/4</span>
          </div>

          {/* Pediatric Assessment Triangle (PAT) Interactive Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Педиатрический треугольник оценки (Pediatric Assessment Triangle, PAT)
              </h4>
              <span className="text-xs text-sky-700 font-medium">Первичная оценка за 30 секунд</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-sky-700" />
                  <span className="text-xs font-bold text-sky-900 uppercase">
                    1. Внешний вид (Appearance)
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentCase.presentation.patAssessment.appearance}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-amber-900 uppercase">
                    2. Работа дыхания (Breathing)
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentCase.presentation.patAssessment.breathing}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-rose-700" />
                  <span className="text-xs font-bold text-rose-900 uppercase">
                    3. Кровообращение кожи (Circulation)
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentCase.presentation.patAssessment.circulation}
                </p>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-slate-900 text-white text-xs flex items-center justify-between">
              <span className="text-slate-300">Заключение по PAT:</span>
              <span className="font-semibold text-amber-300">
                {currentCase.presentation.patAssessment.patConclusion}
              </span>
            </div>
          </div>

          {/* Vital Signs Table with Deviation Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Витальные функции пациента (Vital Signs)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-4">Параметр</th>
                    <th className="py-2.5 px-4">Значение у пациента</th>
                    <th className="py-2.5 px-4">Возрастная норма</th>
                    <th className="py-2.5 px-4">Клиническая интерпретация</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentCase.presentation.vitals.map((v, idx) => (
                    <tr
                      key={idx}
                      className={v.isAbnormal ? 'bg-rose-50/40' : 'bg-white hover:bg-slate-50'}
                    >
                      <td className="py-2.5 px-4 font-medium text-slate-900">{v.parameter}</td>
                      <td className="py-2.5 px-4 font-mono font-bold">
                        <span className={v.isAbnormal ? 'text-rose-700' : 'text-slate-800'}>
                          {v.value}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-500">{v.normalRange}</td>
                      <td className="py-2.5 px-4 text-slate-700">
                        {v.isAbnormal && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
                        )}
                        {v.interpretation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Physical Exam Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Результаты физикального обследования
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentCase.presentation.physicalExamFindings.map((finding, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    {finding.category}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {finding.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Severity Conclusion Callout */}
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50 text-sky-950 text-sm">
            <span className="font-bold text-sky-900 block mb-1">Итоговая оценка тяжести:</span>
            <p className="text-xs sm:text-sm text-sky-900 font-medium">
              {currentCase.presentation.severityAssessment}
            </p>
          </div>

          {/* Test for Block 2 */}
          <BlockTestComponent
            test={currentCase.presentation.test}
            blockLabel="Блок 2: Клиническая картина"
            savedAnswerId={savedAnswers[currentCase.presentation.test.id]}
            onAnswerSubmitted={(isCorrect) => onSaveAnswer(currentCase.presentation.test.id, isCorrect)}
          />
        </section>
      )}

      {/* ========================================================= */}
      {/* BLOCK 3: Дифференциальная диагностика */}
      {/* ========================================================= */}
      {(activeBlockTab === 'all' || activeBlockTab === 'differential') && (
        <section
          id="block-differential"
          className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Блок 3: Дифференциальная диагностика
                </h3>
                <p className="text-xs text-slate-500">
                  Критерии исключения сходных патологий, диагностические ловушки и красные флаги
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">Раздел 3/4</span>
          </div>

          <div className="p-3.5 rounded-lg bg-purple-50/70 border border-purple-200 text-xs text-purple-950">
            <span className="font-bold text-purple-900">Ведущий рабочий диагноз: </span>
            <span className="font-semibold">{currentCase.differential.mainSuspectedDiagnosis}</span>
          </div>

          {/* Differential Comparison Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Дифференциально-диагностическая матрица
            </h4>
            <div className="space-y-3">
              {currentCase.differential.differentialTable.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-slate-900">{item.disease}</span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        item.dangerLevel === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : item.dangerLevel === 'high'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Опасность: {item.dangerLevel === 'critical' ? 'Критическая' : item.dangerLevel === 'high' ? 'Высокая' : 'Умеренная'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-2">
                    <strong className="text-slate-700">Сходство:</strong> {item.similarity}
                  </p>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                      Отличительные ключевые признаки (Key Differentiators):
                    </span>
                    <ul className="space-y-1">
                      {item.distinguishingFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-slate-800 flex items-start gap-1.5">
                          <span className="text-sky-600 font-bold shrink-0">·</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pitfalls and Red Flags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60">
              <div className="flex items-center gap-2 mb-2 text-rose-900 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Диагностические ловушки и частые ошибки</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-950">
                {currentCase.differential.diagnosticPitfalls.map((pitfall, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60">
              <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold text-xs uppercase">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>«Красные флаги» тревоги (Red Flags)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {currentCase.differential.diagnosticRedFlags.map((flag, flIdx) => (
                  <li key={flIdx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">▲</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Test for Block 3 */}
          <BlockTestComponent
            test={currentCase.differential.test}
            blockLabel="Блок 3: Дифференциальная диагностика"
            savedAnswerId={savedAnswers[currentCase.differential.test.id]}
            onAnswerSubmitted={(isCorrect) => onSaveAnswer(currentCase.differential.test.id, isCorrect)}
          />
        </section>
      )}

      {/* ========================================================= */}
      {/* BLOCK 4: Выбор тактики неотложной помощи */}
      {/* ========================================================= */}
      {(activeBlockTab === 'all' || activeBlockTab === 'emergency') && (
        <section
          id="block-emergency"
          className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Блок 4: Выбор тактики неотложной помощи
                </h3>
                <p className="text-xs text-slate-500">
                  Пошаговый протокол действий, расчет дозировок препаратов, запрещенные действия
                </p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">Раздел 4/4</span>
          </div>

          {/* Urgent First Steps */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-xs">
            <span className="font-bold uppercase tracking-wider text-rose-900 block mb-2">
              Немедленные действия первых секунд:
            </span>
            <div className="space-y-1.5 text-rose-950">
              {currentCase.emergencyCare.urgentFirstSteps.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2">
                  <span className="font-bold text-rose-700 shrink-0 font-mono">{sIdx + 1}.</span>
                  <span className="font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Algorithm */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Пошаговый алгоритм оказания помощи
            </h4>
            <div className="space-y-3">
              {currentCase.emergencyCare.algorithmSteps.map((step) => (
                <div
                  key={step.order}
                  className={`p-4 rounded-xl border transition-all ${
                    step.highlight
                      ? 'border-sky-300 bg-sky-50/60 ring-1 ring-sky-200'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                        {step.order}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{step.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {step.phase}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-1 ml-7">
                    {step.action}
                  </p>
                  <p className="text-xs text-slate-600 ml-7 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pediatric Medications Table with Patient Calculations */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-sky-700" />
                <span>Медикаментозная терапия и расчет доз (масса: {currentCase.patient.weightKg} кг)</span>
              </h4>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Препарат</th>
                    <th className="py-2.5 px-3">Показание</th>
                    <th className="py-2.5 px-3">Путь</th>
                    <th className="py-2.5 px-3">Педиатрическая доза</th>
                    <th className="py-2.5 px-3">Расчет для пациента ({currentCase.patient.weightKg} кг)</th>
                    <th className="py-2.5 px-3">Особые предостережения</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {currentCase.emergencyCare.medications.map((med, mIdx) => (
                    <tr key={mIdx} className="bg-white hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{med.name}</td>
                      <td className="py-2.5 px-3 text-slate-700">{med.indication}</td>
                      <td className="py-2.5 px-3 text-slate-600 font-medium">{med.route}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">{med.pediatricDose}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-sky-800 bg-sky-50/50">
                        {med.calculatedForPatient}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 italic">{med.caution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contraindications & Common Errors */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/70">
            <div className="flex items-center gap-2 mb-2 text-rose-900 font-bold text-xs uppercase">
              <Ban className="w-4 h-4 text-rose-600" />
              <span>Категорически запрещенные действия (Типичные опасные ошибки)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-950">
              {currentCase.emergencyCare.contraindicationsAndErrors.map((err, eIdx) => (
                <li key={eIdx} className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold">⛔</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hospitalization Criteria */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="font-bold text-slate-900">Критерии госпитализации / транспортировки: </span>
            <span>{currentCase.emergencyCare.hospitalizationCriteria}</span>
          </div>

          {/* Test for Block 4 */}
          <BlockTestComponent
            test={currentCase.emergencyCare.test}
            blockLabel="Блок 4: Тактика помощи"
            savedAnswerId={savedAnswers[currentCase.emergencyCare.test.id]}
            onAnswerSubmitted={(isCorrect) => onSaveAnswer(currentCase.emergencyCare.test.id, isCorrect)}
          />
        </section>
      )}

      {/* Case Footer Navigation */}
      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
        <button
          disabled={currentCase.caseNumber === 1}
          onClick={() => {
            const prev = cases[currentCase.caseNumber - 2];
            if (prev) {
              onSelectCase(prev.id);
              setActiveBlockTab('all');
            }
          }}
          className="px-4 py-2 text-xs font-semibold text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          ← Предыдущий случай
        </button>

        <span className="text-xs text-slate-500 font-medium">
          Случай {currentCase.caseNumber} из {cases.length}
        </span>

        <button
          disabled={currentCase.caseNumber === cases.length}
          onClick={() => {
            const next = cases[currentCase.caseNumber];
            if (next) {
              onSelectCase(next.id);
              setActiveBlockTab('all');
            }
          }}
          className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Следующий случай →
        </button>
      </div>
    </div>
  );
};
