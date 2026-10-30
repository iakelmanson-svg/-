/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CURRICULUM_MODULES, REGULATORY_FRAMEWORK } from '../data/curriculumData';
import { ClinicalCase } from '../types/clinical';
import {
  GraduationCap,
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  HeartPulse,
  Activity,
  UserCheck
} from 'lucide-react';

interface CurriculumOverviewProps {
  cases: ClinicalCase[];
  onSelectCase: (caseId: string) => void;
  onStartExam: () => void;
}

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  cases,
  onSelectCase,
  onStartExam,
}) => {
  const totalHours = CURRICULUM_MODULES.reduce((sum, m) => sum + m.hours, 0);

  return (
    <div className="space-y-10">
      {/* Hero Educational Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>Учебная программа дополнительного медицинского образования</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Оказание первой и неотложной помощи при угрожающих состояниях у детей
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Практико-ориентированный курс с разбором 5 ключевых клинических случаев в педиатрии.
                Программа структурирована по 4 обязательным аналитическим блокам:{' '}
                <strong className="text-slate-800">жалобы и анамнез</strong>,{' '}
                <strong className="text-slate-800">клиническая картина и PAT</strong>,{' '}
                <strong className="text-slate-800">дифференциальная диагностика</strong> и{' '}
                <strong className="text-slate-800">алгоритмы неотложной помощи</strong> с тестовым контролем знаний в каждом блоке.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>
                    Объем: <strong className="text-slate-900 font-mono">{totalHours} ак. часов</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>
                    Разделов: <strong className="text-slate-900 font-mono">5 модулей / 5 кейсов</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    Тестов: <strong className="text-slate-900 font-mono">20 блочных + экзамен</strong>
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectCase(cases[0].id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:bg-sky-800 transition-colors cursor-pointer"
              >
                <span>Перейти к разбору Кейса №1</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 min-h-[260px] relative overflow-hidden">
            <img
              src="/src/assets/images/pediatric_emergency_hero_1793269241953.jpg"
              alt="Обучение неотложной педиатрической помощи"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white text-xs">
                <span className="font-semibold block text-sky-300 mb-0.5">
                  Клинический протокол PALS & МЗ РФ
                </span>
                <span>Стандартизированные алгоритмы оценки и спасения жизни детей</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Clinical Cases Matrix Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              5 Клинических случаев учебной программы
            </h2>
            <p className="text-xs text-slate-500">
              Каждый клинический случай содержит разбор 4 блоков и встроенное контрольное тестирование
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-sky-700">Случай №{c.caseNumber}</span>
                  <span className="font-mono text-[11px] text-slate-400">4 тестовых блока</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                  {c.subtitle}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex justify-between">
                    <span>Пациент:</span>
                    <span className="font-medium text-slate-800">
                      {c.patient.gender}, {c.patient.age} ({c.patient.weightKg} кг)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Срочность:</span>
                    <span className="font-bold text-rose-600">{c.urgencyLevel}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectCase(c.id)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors cursor-pointer"
              >
                <span>Открыть разбор и тесты</span>
                <ChevronRightSmall />
              </button>
            </div>
          ))}

          {/* Quick Exam Card */}
          <div className="bg-gradient-to-br from-slate-900 to-sky-950 rounded-xl p-5 text-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Итоговая аттестация</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Комплексный экзамен по всем 5 случаям
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                12 контрольных ситуационных вопросов. При успешной сдаче (≥80%) выдается персонализированный электронный сертификат.
              </p>
            </div>
            <button
              onClick={onStartExam}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-center"
            >
              Сдать итоговый экзамен
            </button>
          </div>
        </div>
      </div>

      {/* Pediatric Assessment Triangle (PAT) Educational Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block mb-1">
            Фундаментальный инструмент диагностики
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
            Педиатрический треугольник оценки (Pediatric Assessment Triangle, PAT)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Метод быстрой первичной визуальной оценки состояния ребенка за 30 секунд без прикосновения и использования диагностической аппаратуры.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-sky-100 bg-sky-50/40 p-5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm mb-3">
              A
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              1. Внешний вид (Appearance)
            </h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Отражает оксигенацию, вентиляцию и перфузию головного мозга. Оценивается по мнемонике <strong>TICLS</strong>:
            </p>
            <ul className="text-xs text-slate-700 space-y-1 font-mono">
              <li><strong>T</strong>one — мышечный тонус (вялый / активный)</li>
              <li><strong>I</strong>nteractiveness — интерес к окружающему</li>
              <li><strong>C</strong>onsolability — способность успокаиваться</li>
              <li><strong>L</strong>ook / Gaze — фиксация взгляда</li>
              <li><strong>S</strong>peech / Cry — сила плача / речь</li>
            </ul>
          </div>

          <div className="border border-amber-100 bg-amber-50/40 p-5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm mb-3">
              B
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              2. Работа дыхания (Breathing)
            </h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Отражает попытки ребенка преодолеть гипоксию или гиперкапнию:
            </p>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>· Патологические звуки: стридор, кряхтение, свистящий выдох</li>
              <li>· Втяжение уступчивых мест грудной клетки (ретракции)</li>
              <li>· Раздувание крыльев носа (nasal flaring)</li>
              <li>· Кивательные движения головы в такт дыханию</li>
              <li>· Вынужденная поза (поза треножника)</li>
            </ul>
          </div>

          <div className="border border-rose-100 bg-rose-50/40 p-5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-sm mb-3">
              C
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              3. Кровообращение кожи (Circulation)
            </h3>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Отражает адекватность сердечного выброса и кровоснабжения жизненно важных органов:
            </p>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>· Бледность кожных покровов (вазоконстрикция)</li>
              <li>· Мраморность кожи (пятнистый синюшный рисунок)</li>
              <li>· Периоральный или диффузный цианоз</li>
              <li>· Время наполнения капилляров (СБП &gt; 2 секунд)</li>
              <li>· Холодные дистальные отделы конечностей</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Curriculum Syllabus Modules Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block mb-1">
            Тематический план обучения
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950">
            Учебно-тематический план модулей
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Общая трудоемкость программы — {totalHours} академических часов
          </p>
        </div>

        <div className="space-y-4">
          {CURRICULUM_MODULES.map((module) => (
            <div
              key={module.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-700">{module.number}:</span>
                  <h3 className="text-sm font-bold text-slate-900">{module.title}</h3>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-500 bg-white px-2.5 py-1 rounded border border-slate-200">
                  {module.hours} ак. ч.
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {module.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-200">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">
                    Формируемые навыки и компетенции:
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {module.competencies.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-1">
                    Основные темы программы:
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {module.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-sky-600 font-bold shrink-0">·</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Framework */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          <Shield className="w-4 h-4 text-sky-600" />
          <span>Нормативно-правовая и доказательная база программы</span>
        </div>
        <h2 className="text-xl font-bold text-slate-950 mb-4">
          Стандарты и клинические рекомендации
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REGULATORY_FRAMEWORK.map((reg, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-900 mb-0.5">{reg.title}</h3>
              <span className="text-[11px] font-semibold text-sky-700 block mb-1.5">
                {reg.subtitle}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">{reg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChevronRightSmall = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);
