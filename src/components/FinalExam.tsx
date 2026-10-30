/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FINAL_EXAM_QUESTIONS } from '../data/curriculumData';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  Award,
  Printer,
  RotateCcw,
  ShieldCheck,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';

export const FinalExam: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Иванов Алексей Сергеевич');
  const [certificateIssuedDate] = useState<string>(
    new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  );

  const questions = FINAL_EXAM_QUESTIONS;
  const currentQuestion = questions[currentIdx];

  const handleSelectOption = (optId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optId,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsFinished(false);
  };

  // Score calculation
  const totalQuestions = questions.length;
  let correctCount = 0;

  questions.forEach((q) => {
    const selectedOptId = answers[q.id];
    const correctOpt = q.options.find((o) => o.isCorrect);
    if (selectedOptId && correctOpt && selectedOptId === correctOpt.id) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = percentage >= 80;

  return (
    <div className="space-y-8">
      {!isFinished ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Итоговый сертификационный экзамен</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-950">
                Контрольное тестирование по всем 5 клиническим случаям
              </h1>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block">Вопрос</span>
              <span className="font-mono text-base font-bold text-sky-700">
                {currentIdx + 1} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-sky-600 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {currentQuestion.caseTitle}
              </span>
              <span>·</span>
              <span className="capitalize">{currentQuestion.blockType}</span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50 shadow-sm ring-1 ring-sky-600 text-sky-950 font-medium'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shrink-0 font-mono ${
                        isSelected
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm leading-relaxed">{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={handlePrev}
              className="px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              ← Назад
            </button>

            <button
              type="button"
              disabled={!answers[currentQuestion.id]}
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <span>{currentIdx === totalQuestions - 1 ? 'Завершить экзамен' : 'Следующий вопрос'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results & Certificate Screen */
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="text-center max-w-xl mx-auto space-y-4">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}
              >
                {isPassed ? <Award className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>

              <h2 className="text-2xl font-extrabold text-slate-950">
                {isPassed ? 'Экзамен успешно сдан!' : 'Экзамен не сдан. Требуется повторение'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isPassed
                  ? 'Вы продемонстрировали отличные теоретические и практические знания алгоритмов неотложной помощи при критических состояниях у детей.'
                  : 'Для успешного получения сертификата необходимо набрать не менее 80% правильных ответов. Рекомендуется повторить клинические блоки.'}
              </p>

              <div className="flex items-center justify-center gap-6 py-4 border-y border-slate-100">
                <div>
                  <span className="text-xs text-slate-500 block">Результат</span>
                  <span className="text-2xl font-bold font-mono text-slate-900">
                    {percentage}%
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-xs text-slate-500 block">Верных ответов</span>
                  <span className="text-2xl font-bold font-mono text-slate-900">
                    {correctCount} / {totalQuestions}
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-xs text-slate-500 block">Статус</span>
                  <span
                    className={`text-sm font-bold uppercase tracking-wider block mt-1 ${
                      isPassed ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isPassed ? 'Аттестован' : 'Не зачтено'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 no-print">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Пройти экзамен заново</span>
                </button>

                {isPassed && (
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-700 rounded-lg hover:bg-sky-800 transition-colors shadow-sm cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Распечатать сертификат</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Printable Certificate */}
          {isPassed && (
            <div className="bg-white rounded-2xl border-4 border-double border-slate-300 p-8 sm:p-12 shadow-md relative overflow-hidden print-only">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-2 text-sky-800 font-bold uppercase tracking-widest text-xs">
                  <ShieldCheck className="w-5 h-5 text-sky-700" />
                  <span>Сертификат об успешном освоении учебной программы</span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Настоящим подтверждается, что</span>
                  <div className="max-w-md mx-auto pt-1 no-print">
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Ф.И.О. слушателя (можно изменить для печати):
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full text-center text-lg sm:text-xl font-extrabold text-slate-900 border-b-2 border-sky-600 focus:outline-none pb-1 bg-transparent"
                    />
                  </div>
                  <div className="hidden print:block text-2xl font-extrabold text-slate-900">
                    {studentName}
                  </div>
                </div>

                <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
                  успешно освоил(а) квалификационную учебную программу{' '}
                  <strong className="text-slate-950 font-bold">
                    «Оказание первой и неотложной помощи при угрожающих состояниях у детей: разбор 5 клинических случаев, дифференциальная диагностика и алгоритмы действий»
                  </strong>{' '}
                  с итоговым результатом <strong className="font-mono font-bold text-sky-800">{percentage}%</strong>.
                </div>

                <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-slate-600">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Дата выдачи</span>
                    <span className="font-semibold text-slate-800">{certificateIssuedDate}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Номер сертификата</span>
                    <span className="font-mono font-semibold text-slate-800">PALS-RU-2026-0591</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Аттестационная оценка</span>
                    <span className="font-bold text-emerald-700 uppercase">Отлично / Зачтено</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Question Review */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm no-print">
            <h3 className="text-base font-bold text-slate-950 mb-4">
              Детальный разбор ответов на вопросы экзамена
            </h3>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userOptId = answers[q.id];
                const correctOpt = q.options.find((o) => o.isCorrect);
                const userOpt = q.options.find((o) => o.id === userOptId);
                const isUserCorrect = userOptId === correctOpt?.id;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs ${
                      isUserCorrect
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-rose-200 bg-rose-50/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {isUserCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span className="font-bold text-slate-900">
                          {idx + 1}. {q.question}
                        </span>
                      </div>
                      <span className="font-semibold text-slate-500 font-mono whitespace-nowrap">
                        {q.caseTitle}
                      </span>
                    </div>

                    <div className="space-y-1 mt-2 pl-6">
                      <div className="text-slate-700">
                        <strong className="text-slate-900">Ваш выбор: </strong>
                        <span className={isUserCorrect ? 'text-emerald-800' : 'text-rose-800'}>
                          {userOpt?.text || 'Не отвечено'}
                        </span>
                      </div>
                      {!isUserCorrect && (
                        <div className="text-emerald-800">
                          <strong>Правильный ответ: </strong> {correctOpt?.text}
                        </div>
                      )}
                      <p className="text-slate-600 mt-1 pt-1 border-t border-slate-200/60 leading-relaxed">
                        <strong>Обоснование: </strong> {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
