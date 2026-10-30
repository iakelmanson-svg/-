/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TestOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface BlockTest {
  id: string;
  question: string;
  options: TestOption[];
  rationale: string;
}

export interface ClinicalBlockComplaints {
  historyOfIllness: string;
  onsetCharacteristics: string;
  triggerFactors: string;
  epidemiologicalAndAllergyHistory: string;
  keyComplaintsList: string[];
  test: BlockTest;
}

export interface VitalSign {
  parameter: string;
  value: string;
  normalRange: string;
  isAbnormal: boolean;
  interpretation: string;
}

export interface ClinicalBlockPresentation {
  patAssessment: {
    appearance: string; // Внешний вид (тонус, взгляд, плач)
    breathing: string;  // Работа дыхания (ретракции, хрипы, раздувание крыльев носа)
    circulation: string;// Кровообращение кожи (бледность, мраморность, цианоз)
    patConclusion: string;
  };
  vitals: VitalSign[];
  physicalExamFindings: {
    category: string;
    description: string;
  }[];
  severityAssessment: string;
  test: BlockTest;
}

export interface DifferentialItem {
  disease: string;
  similarity: string;
  distinguishingFeatures: string[];
  dangerLevel: 'high' | 'critical' | 'moderate';
}

export interface ClinicalBlockDifferential {
  mainSuspectedDiagnosis: string;
  differentialTable: DifferentialItem[];
  diagnosticPitfalls: string[];
  diagnosticRedFlags: string[];
  test: BlockTest;
}

export interface EmergencyActionStep {
  phase: string; // "Доврачебный этап", "Медицинский этап", "Специализированная помощь"
  order: number;
  title: string;
  action: string;
  details: string;
  highlight?: boolean;
}

export interface MedicationGuideline {
  name: string;
  indication: string;
  route: string;
  pediatricDose: string;
  calculatedForPatient: string;
  caution: string;
}

export interface ClinicalBlockEmergencyCare {
  urgentFirstSteps: string[];
  algorithmSteps: EmergencyActionStep[];
  medications: MedicationGuideline[];
  contraindicationsAndErrors: string[];
  hospitalizationCriteria: string;
  test: BlockTest;
}

export interface ClinicalCase {
  id: string;
  caseNumber: number;
  title: string;
  subtitle: string;
  category: 'respiratory' | 'allergic' | 'neurological' | 'obstruction' | 'dehydration';
  patient: {
    age: string;
    gender: 'мальчик' | 'девочка';
    weightKg: number;
    location: string;
  };
  urgencyLevel: 'Критическое' | 'Экстренное' | 'Срочное';
  imagePlaceholderId: string;
  imagePath?: string;
  complaints: ClinicalBlockComplaints;
  presentation: ClinicalBlockPresentation;
  differential: ClinicalBlockDifferential;
  emergencyCare: ClinicalBlockEmergencyCare;
}

export interface ExamQuestion {
  id: string;
  caseId: string;
  caseTitle: string;
  blockType: 'жалобы' | 'клиника' | 'дифдиагностика' | 'неотложка';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}
