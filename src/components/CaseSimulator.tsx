/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClinicalCase } from '../types/clinical';
import { Activity, AlertTriangle, CheckCircle2, RotateCcw, Heart, Wind, ShieldAlert } from 'lucide-react';

interface CaseSimulatorProps {
  currentCase: ClinicalCase;
}

interface SimStep {
  id: number;
  stageName: string;
  patientStatus: string;
  vitals: { hr: string; rr: string; spo2: string; bp: string };
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    consequence: string;
    vitalsDelta?: { hr: string; rr: string; spo2: string; bp: string };
  }[];
}

const SIMULATION_DATA: Record<string, SimStep[]> = {
  'croup-stenosis': [
    {
      id: 1,
      stageName: 'Ночной вызов: комната ребенка',
      patientStatus: 'Ребенок 2.5 лет мечется на руках у отца, грубый «лающий» кашель, выраженный свист на вдохе в покое, плач осиплый.',
      vitals: { hr: '142 уд/мин', rr: '44 в мин', spo2: '93%', bp: '95/60 мм рт.ст.' },
      question: 'Мать предлагает сделать паровую ингаляцию над кастрюлей с кипятком. Ваше первое решение?',
      options: [
        {
          text: 'Категорически запретить горячий пар; взять ребенка на руки, обеспечить приток свежего увлажненного воздуха и приготовить небулайзер с будесонидом',
          isCorrect: true,
          consequence: 'Правильно! Горячий пар опасен ожогом и отеком. Свежий прохладный воздух и покой уменьшают стридор.',
          vitalsDelta: { hr: '130 уд/мин', rr: '38 в мин', spo2: '95%', bp: '95/60 мм рт.ст.' }
        },
        {
          text: 'Согласиться и посадить ребенка дышать над паром под полотенцем',
          isCorrect: false,
          consequence: 'Грубейшая ошибка! Горячий пар усиливает приток крови к подскладочному пространству, отек гортани резко нарастает, ребенок синеет.',
          vitalsDelta: { hr: '165 уд/мин', rr: '52 в мин', spo2: '87%', bp: '100/65 мм рт.ст.' }
        },
        {
          text: 'Насильно уложить на спину и ввести ложку в рот для осмотра миндалин',
          isCorrect: false,
          consequence: 'Опасно! При осмотре шпателем у возбужденного ребенка возникает рефлекторный ларингоспазм и остановка дыхания.',
          vitalsDelta: { hr: '170 уд/мин', rr: '56 в мин', spo2: '85%', bp: '105/70 мм рт.ст.' }
        }
      ]
    },
    {
      id: 2,
      stageName: 'Ингаляционная терапия',
      patientStatus: 'Ребенок спокоен на руках у матери. Голос остается хриплым, сохраняется умеренное втяжение яремной ямки в покое.',
      vitals: { hr: '130 уд/мин', rr: '38 в мин', spo2: '95%', bp: '95/60 мм рт.ст.' },
      question: 'Какой препарат и в какой дозе необходимо ингалировать через небулайзер?',
      options: [
        {
          text: 'Будесонид (Пульмикорт) суспензия 2 мг (4 мл по 0.5 мг/мл)',
          isCorrect: true,
          consequence: 'Отлично! Будесонид 2 мг снимает воспалительный отек гортани через 20–30 минут.',
          vitalsDelta: { hr: '115 уд/мин', rr: '28 в мин', spo2: '98%', bp: '95/60 мм рт.ст.' }
        },
        {
          text: 'Беродуал 10 капель',
          isCorrect: false,
          consequence: 'Неверно. Беродуал действует на бронхи (нижние дыхательные пути), а при крупе обструкция расположена в гортани (верхние пути).'
        },
        {
          text: 'Амбробене с физраствором',
          isCorrect: false,
          consequence: 'Опасно! Муколитики стимулируют секрецию мокроты, ребенок с узкой гортанью не сможет ее откашлять.'
        }
      ]
    }
  ],
  'anaphylaxis-shock': [
    {
      id: 1,
      stageName: 'Детское кафе: острая реакция на десерт',
      patientStatus: 'Девочка 6 лет, отек губ и век, сливная сыпь, заторможена, дыхание со свистом, кожа липкая холодная.',
      vitals: { hr: '158 уд/мин', rr: '38 в мин', spo2: '88%', bp: '68/38 мм рт.ст.' },
      question: 'Ребенок в шоке. Ваше немедленное действие №1?',
      options: [
        {
          text: 'Ввести Эпинефрин (адреналин 0.1%) 0.2 мл внутримышечно в бедро и уложить на спину с поднятыми ногами',
          isCorrect: true,
          consequence: 'Спасительное действие! Адреналин восстанавливает тонус сосудов, купирует бронхоспазм и отек гортани.',
          vitalsDelta: { hr: '135 уд/мин', rr: '26 в мин', spo2: '95%', bp: '85/55 мм рт.ст.' }
        },
        {
          text: 'Поставить ребенка на ноги, вывести на улицу и дать таблетку супрастина',
          isCorrect: false,
          consequence: 'Смертельная ошибка! Перевод в вертикальное положение вызывает остановку сердца (синдром пустого желудочка), а таблетка не проглотится.'
        },
        {
          text: 'Ввести внутримышечно 2 мл но-шпы',
          isCorrect: false,
          consequence: 'Фатально! Но-шпа расширит сосуды, уронит АД до нуля и вызовет асистолию.'
        }
      ]
    }
  ]
};

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({ currentCase }) => {
  const steps = SIMULATION_DATA[currentCase.id];
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  if (!steps || steps.length === 0) {
    return null;
  }

  const step = steps[currentStepIdx];
  const selectedOption = selectedOptIdx !== null ? step.options[selectedOptIdx] : null;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptIdx(idx);
    setIsAnswered(true);
  };

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
      setSelectedOptIdx(null);
      setIsAnswered(false);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setSelectedOptIdx(null);
    setIsAnswered(false);
  };

  const currentVitals =
    isAnswered && selectedOption?.vitalsDelta ? selectedOption.vitalsDelta : step.vitals;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block">
              Интерактивный симулятор клинического сценария
            </span>
            <h3 className="text-base font-bold text-white">
              {step.stageName} (Этап {currentStepIdx + 1} из {steps.length})
            </h3>
          </div>
        </div>

        {/* Live Vitals Monitor */}
        <div className="flex items-center gap-3 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800 font-mono text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">ЧСС</span>
            <span className="font-bold text-emerald-400">{currentVitals.hr}</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">ЧДД</span>
            <span className="font-bold text-sky-400">{currentVitals.rr}</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">SpO2</span>
            <span className="font-bold text-amber-400">{currentVitals.spo2}</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">АД</span>
            <span className="font-bold text-rose-400">{currentVitals.bp}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300">
          <strong className="text-white">Текущее состояние: </strong>
          {step.patientStatus}
        </div>

        <h4 className="text-sm sm:text-base font-semibold text-white">
          {step.question}
        </h4>

        <div className="space-y-2.5">
          {step.options.map((opt, idx) => {
            const isChosen = selectedOptIdx === idx;
            let btnClass =
              'w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm cursor-pointer ';

            if (!isAnswered) {
              btnClass += 'border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200';
            } else {
              if (opt.isCorrect) {
                btnClass += 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-medium';
              } else if (isChosen && !opt.isCorrect) {
                btnClass += 'border-rose-500 bg-rose-950/60 text-rose-200';
              } else {
                btnClass += 'border-slate-800 bg-slate-850/40 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={btnClass}
              >
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && selectedOption && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm mb-4 ${
            selectedOption.isCorrect
              ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
              : 'border-rose-500/50 bg-rose-950/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            {selectedOption.isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            )}
            <span>{selectedOption.isCorrect ? 'Верное решение!' : 'Опасная ошибка!'}</span>
          </div>
          <p>{selectedOption.consequence}</p>
        </div>
      )}

      {isAnswered && (
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить симулятор</span>
          </button>

          {currentStepIdx < steps.length - 1 && selectedOption?.isCorrect && (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-sky-400 rounded-lg hover:bg-sky-300 transition-colors cursor-pointer"
            >
              Перейти к следующему этапу симуляции →
            </button>
          )}
        </div>
      )}
    </div>
  );
};
