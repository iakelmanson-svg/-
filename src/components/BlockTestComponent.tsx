/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BlockTest } from '../types/clinical';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface BlockTestComponentProps {
  test: BlockTest;
  blockLabel: string;
  onAnswerSubmitted?: (isCorrect: boolean) => void;
  savedAnswerId?: string;
}

export const BlockTestComponent: React.FC<BlockTestComponentProps> = ({
  test,
  blockLabel,
  onAnswerSubmitted,
  savedAnswerId,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(savedAnswerId || null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!savedAnswerId);

  const selectedOption = test.options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
    if (onAnswerSubmitted) {
      onAnswerSubmitted(isCorrect);
    }
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
  };

  return (
    <div className="mt-8 rounded-xl border border-sky-200 bg-sky-50/50 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
          ?
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          Контрольное тестовое задание · {blockLabel}
        </span>
      </div>

      <h4 className="text-base font-semibold text-slate-900 mb-4 leading-snug">
        {test.question}
      </h4>

      <div className="space-y-2.5 mb-5">
        {test.options.map((option, idx) => {
          const isChosen = selectedOptionId === option.id;
          let containerClasses =
            'relative flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors text-sm ';

          if (!isSubmitted) {
            containerClasses += isChosen
              ? 'border-sky-600 bg-sky-100/70 text-sky-950 font-medium'
              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
          } else {
            if (option.isCorrect) {
              containerClasses += 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-medium';
            } else if (isChosen && !option.isCorrect) {
              containerClasses += 'border-rose-400 bg-rose-50 text-rose-950';
            } else {
              containerClasses += 'border-slate-200 bg-white/60 text-slate-500 opacity-70';
            }
          }

          return (
            <label key={option.id} className={containerClasses}>
              <input
                type="radio"
                name={`test-${test.id}`}
                value={option.id}
                checked={isChosen}
                disabled={isSubmitted}
                onChange={() => setSelectedOptionId(option.id)}
                className="mt-0.5 h-4 w-4 text-sky-600 focus:ring-sky-500 shrink-0"
              />
              <div className="flex-1">
                <span className="inline-block text-slate-500 font-mono text-xs mr-2">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span>{option.text}</span>

                {isSubmitted && option.isCorrect && (
                  <div className="mt-2 text-xs text-emerald-800 flex items-start gap-1.5 pt-1 border-t border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{option.explanation}</span>
                  </div>
                )}

                {isSubmitted && isChosen && !option.isCorrect && (
                  <div className="mt-2 text-xs text-rose-800 flex items-start gap-1.5 pt-1 border-t border-rose-200">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{option.explanation}</span>
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          type="button"
          disabled={!selectedOptionId}
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Проверить ответ</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <div className="rounded-lg bg-white p-4 border border-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-semibold text-emerald-900">
                    Верно! Клиническое решение правильное
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span className="text-sm font-semibold text-rose-900">
                    Ответ неточный или ошибочный
                  </span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
            >
              Пройти заново
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-700">Клиническое обоснование:</strong> {test.rationale}
          </p>
        </div>
      )}
    </div>
  );
};
