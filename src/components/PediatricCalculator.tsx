/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, Scale, Heart, AlertCircle, RefreshCw } from 'lucide-react';

export const PediatricCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(14);
  const [ageYears, setAgeYears] = useState<number>(2.5);

  // Calculations
  // 1. Epinephrine 0.1% (1 mg/ml) IM: 0.01 mg/kg = 0.01 ml/kg, max 0.3-0.5 mg
  const epiDoseMg = Math.min(weight * 0.01, 0.5);
  const epiDoseMl = Math.min(weight * 0.01, 0.5);

  // 2. Dexamethasone (0.6 mg/kg for croup, 4 mg/ml)
  const dexaCroupMg = weight * 0.6;
  const dexaCroupMl = dexaCroupMg / 4;

  // 3. Crystalloid Bolus (20 ml/kg)
  const bolusMl = weight * 20;

  // 4. Diazepam rectal (0.5 mg/kg)
  const diazepamRectalMg = Math.min(weight * 0.5, 10);

  // 5. Midazolam buccal (0.2 mg/kg)
  const midazolamBuccalMg = Math.min(weight * 0.2, 5);

  // 6. Paracetamol (15 mg/kg)
  const paracetamolMg = weight * 15;

  // 7. Ibuprofen (10 mg/kg)
  const ibuprofenMg = weight * 10;

  // 8. Minimal Systolic BP: 70 + (age * 2) for age 1-10
  const minSystolicBP = Math.round(70 + ageYears * 2);

  // Age based reference ranges
  let normalHR = '100–140 уд/мин';
  let normalRR = '24–32 в мин';

  if (ageYears < 1) {
    normalHR = '110–160 уд/мин';
    normalRR = '30–45 в мин';
  } else if (ageYears <= 3) {
    normalHR = '95–135 уд/мин';
    normalRR = '22–30 в мин';
  } else if (ageYears <= 6) {
    normalHR = '85–120 уд/мин';
    normalRR = '20–25 в мин';
  } else {
    normalHR = '70–110 уд/мин';
    normalRR = '16–20 в мин';
  }

  const presets = [
    { label: 'Грудной (9 мес)', weight: 8, age: 0.75 },
    { label: 'Ребенок 1.5 года', weight: 11, age: 1.5 },
    { label: 'Ребенок 3 года', weight: 15, age: 3 },
    { label: 'Дошкольник 6 лет', weight: 21, age: 6 },
    { label: 'Школьник 9 лет', weight: 30, age: 9 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
          <Calculator className="w-4 h-4" />
          <span>Клинический инструмент экстренных расчетов</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Педиатрический калькулятор неотложных дозировок
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Автоматический расчет доз препаратов первой линии, кристаллоидных болюсов и возрастных норм гемодинамики по массе тела ребенка.
        </p>

        {/* Input Controls */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-sky-600" />
                <span>Масса тела ребенка (кг)</span>
              </label>
              <span className="font-mono font-bold text-sky-700 text-base">{weight} кг</span>
            </div>
            <input
              type="range"
              min="3"
              max="50"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>3 кг</span>
              <span>15 кг</span>
              <span>30 кг</span>
              <span>50 кг</span>
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Возраст ребенка (лет)</span>
              </label>
              <span className="font-mono font-bold text-rose-700 text-base">
                {ageYears < 1 ? `${Math.round(ageYears * 12)} мес.` : `${ageYears} лет`}
              </span>
            </div>
            <input
              type="range"
              min="0.25"
              max="12"
              step="0.25"
              value={ageYears}
              onChange={(e) => setAgeYears(parseFloat(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>3 мес</span>
              <span>3 года</span>
              <span>6 лет</span>
              <span>12 лет</span>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium mr-1">Быстрые пресеты:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setWeight(p.weight);
                setAgeYears(p.age);
              }}
              className="text-xs px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium cursor-pointer"
            >
              {p.label} ({p.weight} кг)
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Adrenaline */}
        <div className="bg-white rounded-xl border border-rose-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-700 uppercase">Анафилаксия (№1)</span>
            <span className="text-[11px] font-mono text-slate-400">0.01 мг/кг</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Эпинефрин (Адреналин 0.1%)
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Строго внутримышечно в среднюю треть бедра
          </p>

          <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-rose-900 font-medium">Разовая доза (мг):</span>
              <span className="font-mono font-bold text-rose-950">{epiDoseMg.toFixed(2)} мг</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-900 font-medium">Объем раствора 0.1% (мл):</span>
              <span className="font-mono font-bold text-rose-950 text-sm">{epiDoseMl.toFixed(2)} мл</span>
            </div>
          </div>
          <span className="block mt-2 text-[11px] text-slate-400 italic">
            Инсулиновым шприцем 1 мл или автоинжектором.
          </span>
        </div>

        {/* Croup Pulmicort & Dexa */}
        <div className="bg-white rounded-xl border border-sky-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-sky-700 uppercase">Ложный круп (Стеноз)</span>
            <span className="text-[11px] font-mono text-slate-400">0.6 мг/кг</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Будесонид / Дексаметазон
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Небулайзерная или системная терапия
          </p>

          <div className="bg-sky-50 p-3 rounded-lg border border-sky-100 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-sky-900 font-medium">Будесонид (небулайзер):</span>
              <span className="font-mono font-bold text-sky-950">2.0 мг (4 мл)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sky-900 font-medium">Дексаметазон (0.6 мг/кг):</span>
              <span className="font-mono font-bold text-sky-950">
                {dexaCroupMg.toFixed(1)} мг (~{dexaCroupMl.toFixed(1)} мл)
              </span>
            </div>
          </div>
          <span className="block mt-2 text-[11px] text-slate-400 italic">
            Будесонид ингалируется через маску небулайзера.
          </span>
        </div>

        {/* Crystalloid Shock Bolus */}
        <div className="bg-white rounded-xl border border-indigo-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-700 uppercase">Шок / Обезвоживание</span>
            <span className="text-[11px] font-mono text-slate-400">20 мл/кг</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Кристаллоидный болюс (NaCl 0.9%)
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Внутривенно струйно быстро за 15–20 минут
          </p>

          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-indigo-900 font-medium">Объем первого болюса:</span>
              <span className="font-mono font-bold text-indigo-950 text-sm">{bolusMl} мл</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-900 font-medium">Раствор:</span>
              <span className="font-medium text-indigo-950">0.9% NaCl / Рингер</span>
            </div>
          </div>
          <span className="block mt-2 text-[11px] text-slate-400 italic">
            При сохранении признаков гиповолемии болюс повторяют.
          </span>
        </div>

        {/* Anticonvulsants */}
        <div className="bg-white rounded-xl border border-purple-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-700 uppercase">Судороги &gt; 5 мин</span>
            <span className="text-[11px] font-mono text-slate-400">Ректально / Буккально</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Диазепам / Мидазолам
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Купирование судорожного пароксизма
          </p>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-purple-900 font-medium">Диазепам ректально (0.5 мг/кг):</span>
              <span className="font-mono font-bold text-purple-950">{diazepamRectalMg.toFixed(1)} мг</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-900 font-medium">Мидазолам буккально (0.2 мг/кг):</span>
              <span className="font-mono font-bold text-purple-950">{midazolamBuccalMg.toFixed(1)} мг</span>
            </div>
          </div>
          <span className="block mt-2 text-[11px] text-slate-400 italic">
            При медленном введении риск апноэ минимален.
          </span>
        </div>

        {/* Antipyretics */}
        <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-700 uppercase">Жаропонижающие</span>
            <span className="text-[11px] font-mono text-slate-400">10–15 мг/кг</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Парацетамол / Ибупрофен
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Купирование фебрилитета и боли
          </p>

          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-emerald-900 font-medium">Парацетамол (15 мг/кг):</span>
              <span className="font-mono font-bold text-emerald-950">{Math.round(paracetamolMg)} мг</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-900 font-medium">Ибупрофен (10 мг/кг):</span>
              <span className="font-mono font-bold text-emerald-950">{Math.round(ibuprofenMg)} мг</span>
            </div>
          </div>
          <span className="block mt-2 text-[11px] text-slate-400 italic">
            Интервал между приемами одного препарата не менее 6 часов.
          </span>
        </div>

        {/* Age Vitals Norms */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase">Витальные нормы</span>
            <span className="text-[11px] font-mono text-slate-400">Возраст: {ageYears} г.</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Нормативы витальных функций
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Ориентиры для выявления гипотензии и тахипноэ
          </p>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-600">Пульс в покое (ЧСС):</span>
              <span className="font-mono font-semibold text-slate-900">{normalHR}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Частота дыхания (ЧДД):</span>
              <span className="font-mono font-semibold text-slate-900">{normalRR}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Мин. систолическое АД:</span>
              <span className="font-mono font-bold text-rose-700">{minSystolicBP} мм рт.ст.</span>
            </div>
          </div>
          <span className="block mt-2 text-[11px] text-slate-400 italic">
            Ниже {minSystolicBP} мм рт.ст. — признак декомпенсированного шока.
          </span>
        </div>
      </div>
    </div>
  );
};
