/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CLINICAL_CASES } from '../data/clinicalCases';
import { Printer, FileDown, ShieldAlert, Ban, AlertCircle } from 'lucide-react';

export const PrintProtocols: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Top Banner with Print Button */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-wrap items-center justify-between gap-4 no-print">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block mb-1">
            Клинические памятки и алгоритмы действий
          </span>
          <h1 className="text-2xl font-bold text-slate-950">
            Сводные протоколы первой помощи при 5 неотложных состояниях
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Готовые памятки для кабинета врача, процедурной, детского учреждения или домашней аптечки.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Распечатать все памятки (Print)</span>
        </button>
      </div>

      {/* Protocols Cards List */}
      <div className="space-y-6">
        {CLINICAL_CASES.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm break-inside-avoid"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                  Протокол №{c.caseNumber} · {c.category.toUpperCase()}
                </span>
                <h2 className="text-lg font-bold text-slate-950">{c.title}</h2>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">
                Уровень: {c.urgencyLevel}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 block mb-1.5 uppercase tracking-wider text-[11px]">
                  Ключевые симптомы и жалобы
                </span>
                <ul className="space-y-1 text-slate-700">
                  {c.complaints.keyComplaintsList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-sky-600 font-bold shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/60 p-3.5 rounded-lg border border-rose-200">
                <span className="font-bold text-rose-950 block mb-1.5 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Ban className="w-3.5 h-3.5 text-rose-600" />
                  <span>Категорически запрещено делать</span>
                </span>
                <ul className="space-y-1 text-rose-900">
                  {c.emergencyCare.contraindicationsAndErrors.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Algorithm Steps */}
            <div className="mb-4">
              <span className="font-bold text-slate-900 block mb-2 text-xs uppercase tracking-wider">
                Пошаговый алгоритм действий первой помощи:
              </span>
              <div className="space-y-2">
                {c.emergencyCare.algorithmSteps.map((step) => (
                  <div
                    key={step.order}
                    className="p-3 rounded-lg border border-slate-200 bg-white text-xs"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded text-[11px]">
                        Шаг {step.order} ({step.phase})
                      </span>
                      <span className="font-bold text-slate-900">{step.title}</span>
                    </div>
                    <p className="text-slate-800 font-semibold mb-0.5">{step.action}</p>
                    <p className="text-slate-500 text-[11px]">{step.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Medications Dosage Reference */}
            {c.emergencyCare.medications.length > 0 && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block mb-2 text-[11px] uppercase tracking-wider">
                  Экстренная фармакотерапия и дозировки:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {c.emergencyCare.medications.map((med, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded border border-slate-200">
                      <span className="font-bold text-slate-900 block">{med.name}</span>
                      <span className="text-[11px] text-sky-700 block font-mono">{med.pediatricDose}</span>
                      <span className="text-[11px] text-slate-500 block">{med.route}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
