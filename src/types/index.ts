export type AnalysisType = 'face' | 'hand' | 'both';

export type HandSelection = 'left' | 'right';

export type SupportedLanguage = 'es' | 'en' | 'fr' | 'pt' | 'zh';

export type ThemeMode = 'auto' | 'light' | 'dark';

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  speechEnabled: boolean;
  readingSpeed: number;
}

export interface FacialZone {
  id: string;
  name: string;
  traditionalName: string; // e.g. "Tian Ting (天庭)"
  realm: 'cielo' | 'hombre' | 'tierra'; // San Ting
  shortDescription: string;
  historicalMeaning: string;
  symbolicInterpretation: string;
  visualConfidence: number; // e.g. 88%
  sampleObservation: string;
  cx: number; // percentage coordinate 0-100
  cy: number;
  r: number;
}

export interface HandLine {
  id: string;
  name: string;
  symbolicTitle: string;
  description: string;
  traditionalInterpretation: string;
  culturalCaveat: string;
  pathD: string; // SVG path representation
  confidence: number;
  sampleDetail: string;
}

export interface HandMount {
  id: string;
  name: string;
  traditionalAssociation: string;
  symbolicMeaning: string;
  cx: number;
  cy: number;
}

export interface DimensionInterpretation {
  id: string;
  category: 'resumen' | 'relaciones' | 'pensamiento' | 'trabajo' | 'prosperidad' | 'familia' | 'creatividad' | 'cambios';
  title: string;
  iconName: string;
  analyzedFeature: string;
  question: string; // Pregunta clave directa (ej: "¿Tendencia a estabilidad o problemas económicos?", "¿Marcas favorables para hijos?")
  directVerdict: 'SÍ' | 'NO' | 'EQUILIBRIO' | 'EN OBSERVACIÓN';
  verdictLabel: string; // Texto claro del veredicto tradicional
  directExplanation: string; // Explicación clara y sin ambigüedades
  traditionalInterpretation: string;
  historicalContext: string;
  culturalCaveat: string;
  advice: string; // Consejo tradicional oriental
  energyTone: 'Armónico' | 'Reflexivo' | 'Vital' | 'Dinámico' | 'Constante';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  phase: 'INGESTA' | 'VALIDACION' | 'GEOMETRIA' | 'REGLAS_TRADICIONALES' | 'INFORME';
  action: string;
  details: string;
  status: 'info' | 'success' | 'warning';
}

export interface AnalysisReport {
  id: string;
  date: string;
  userName?: string;
  analysisType: AnalysisType;
  selectedHand?: HandSelection;
  capturedFaceImage?: string; // base64 or objectUrl
  capturedHandImage?: string;
  dimensions: DimensionInterpretation[];
  selectedFacialZones: FacialZone[];
  selectedHandLines: HandLine[];
  sanTingProportions: {
    cielo: number; // Upper third %
    hombre: number; // Middle third %
    tierra: number; // Lower third %
  };
  dominantElement: 'Madera' | 'Fuego' | 'Tierra' | 'Metal' | 'Agua';
  elementDescription: string;
  generalSynthesis: string;
  auditLogs: AuditLogEntry[];
}
