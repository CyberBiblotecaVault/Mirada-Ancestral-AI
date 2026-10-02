import { HandLine, HandMount } from '../types';

export const HAND_LINES: HandLine[] = [
  {
    id: 'corazon',
    name: 'Línea del Corazón',
    symbolicTitle: 'Vínculos, Afectos y Emocionalidad',
    description: 'Recorre la parte superior de la palma, naciendo bajo el dedo meñique o el anular y extendiéndose hacia el índice o medio.',
    traditionalInterpretation: 'En la quiromancia tradicional se interpreta simbólicamente en relación con emociones, vínculos y afectividad. Una curva suave y ascendente suele asociarse tradicionalmente con calidez en el trato y disposición a construir relaciones de confianza sinceras.',
    culturalCaveat: 'Esta interpretación es meramente simbólica y cultural; no predice sucesos románticos ni estados de salud cardiovascular.',
    pathD: 'M 18,36 C 35,33 58,35 78,42',
    confidence: 93,
    sampleDetail: 'Trazo continuo y fluido con curvatura armónica hacia la base del índice.',
  },
  {
    id: 'cabeza',
    name: 'Línea de la Cabeza',
    symbolicTitle: 'Pensamiento, Concentración y Enfoque',
    description: 'Atraviesa horizontalmente el centro de la palma, entre la línea del corazón y la de la vida.',
    traditionalInterpretation: 'Tradicionalmente se relaciona con pensamiento, aprendizaje y forma simbólica de tomar decisiones. Un trazo nítido y extendido se interpreta como inclinación al análisis reflexivo, la curiosidad intelectual y la capacidad de resolver dilemas con ponderación.',
    culturalCaveat: 'No mide la capacidad intelectual, coeficiente intelectual ni afecciones neurológicas.',
    pathD: 'M 22,50 C 44,51 64,56 82,60',
    confidence: 91,
    sampleDetail: 'Profundidad uniforme con ligera inclinación hacia el monte de la luna.',
  },
  {
    id: 'vida',
    name: 'Línea de la Vida',
    symbolicTitle: 'Energía, Ciclos y Vitalidad Simbólica',
    description: 'Bordea el pulgar en forma de arco envolvente sobre el Monte de Venus.',
    traditionalInterpretation: 'En la quiromancia tradicional, esta línea se interpreta simbólicamente en relación con energía, cambios y etapas de vida. Un arco amplio y despejado se concibe en los tratados tradicionales como entusiasmo por el movimiento, resistencia a la rutina y gusto por la vida activa.',
    culturalCaveat: 'IMPORTANTE: No permite determinar la duración de la vida de una persona ni predecir enfermedades o incidentes. Su lectura es un ejercicio cultural y alegórico de etapas y energías.',
    pathD: 'M 35,46 C 30,62 33,82 52,94',
    confidence: 95,
    sampleDetail: 'Arco despejado alrededor del pulgar con buena definición de contorno.',
  },
  {
    id: 'destino',
    name: 'Línea del Destino (o Saturno)',
    symbolicTitle: 'Trayectoria, Vocación y Decisiones',
    description: 'Línea vertical que asciende desde la base de la muñeca hacia el dedo medio (Saturno).',
    traditionalInterpretation: 'Algunas tradiciones relacionan esta línea con trayectoria profesional, decisiones y cambios importantes. En la lectura oriental, se concibe como el canal de los compromisos asumidos libremente y la persistencia en metas a largo plazo.',
    culturalCaveat: 'No predice puestos laborales, ascensos ni resultados financieros garantizados.',
    pathD: 'M 52,90 L 52,38',
    confidence: 86,
    sampleDetail: 'Presencia vertical visible que organiza el centro de la palma.',
  },
  {
    id: 'sol',
    name: 'Línea del Sol (o de Apolo)',
    symbolicTitle: 'Creatividad, Brillo y Reconocimiento',
    description: 'Línea vertical secundaria que asciende hacia el dedo anular (Sol).',
    traditionalInterpretation: 'Tradicionalmente relacionada simbólicamente con reconocimiento, creatividad y expresión. En los textos clásicos simboliza la capacidad de compartir con otros los frutos del propio arte, carisma o ingenio.',
    culturalCaveat: 'Es una metáfora de florecimiento creativo y no un indicador verificable de fama pública.',
    pathD: 'M 65,75 L 68,36',
    confidence: 84,
    sampleDetail: 'Trazo sutil y claro hacia la colina del dedo anular.',
  }
];

export const HAND_MOUNTS: HandMount[] = [
  {
    id: 'venus',
    name: 'Monte de Venus',
    traditionalAssociation: 'Base del Pulgar',
    symbolicMeaning: 'Simbólicamente asociado con la calidez vital, el aprecio por las artes, la generosidad y el entusiasmo por vivir.',
    cx: 38,
    cy: 70
  },
  {
    id: 'jupiter',
    name: 'Monte de Júpiter',
    traditionalAssociation: 'Base del Dedo Índice',
    symbolicMeaning: 'Tradicionalmente interpretado en relación con nobleza, aspiraciones éticas y vocación de guía constructivo.',
    cx: 72,
    cy: 35
  },
  {
    id: 'saturno',
    name: 'Monte de Saturno',
    traditionalAssociation: 'Base del Dedo Medio',
    symbolicMeaning: 'Vinculado a la prudencia, la introspección, el sentido del deber y la búsqueda de profundidad conceptual.',
    cx: 55,
    cy: 32
  },
  {
    id: 'sol',
    name: 'Monte del Sol (Apolo)',
    traditionalAssociation: 'Base del Dedo Anular',
    symbolicMeaning: 'En la tradición quiromántica representa la sensibilidad estética, la armonía y la expresión personal radiante.',
    cx: 40,
    cy: 33
  },
  {
    id: 'mercurio',
    name: 'Monte de Mercurio',
    traditionalAssociation: 'Base del Dedo Meñique',
    symbolicMeaning: 'Relacionado simbólicamente con la comunicación fluida, el ingenio en el intercambio y la destreza discursiva.',
    cx: 24,
    cy: 38
  },
  {
    id: 'luna',
    name: 'Monte de la Luna',
    traditionalAssociation: 'Zona inferior opuesta al pulgar',
    symbolicMeaning: 'Asociado a la imaginación creadora, la intuición, los viajes del pensamiento y la empatía sensible.',
    cx: 22,
    cy: 75
  },
  {
    id: 'marte',
    name: 'Llanura de Marte',
    traditionalAssociation: 'Centro de la palma',
    symbolicMeaning: 'Tradicionalmente representa la perseverancia moral y la serenidad para sostener esfuerzos continuados.',
    cx: 48,
    cy: 56
  }
];

export const HAND_TRADITION_RULES = {
  leftHand: {
    title: 'Mano Izquierda (Mano Receptiva / Raíces)',
    symbolicRole: 'En las corrientes tradicionales orientales, la mano izquierda se asocia al potencial heredado, la memoria interior y las inclinaciones naturales con las que se inicia el camino.',
    maxim: 'El cielo propone las inclinaciones iniciales.'
  },
  rightHand: {
    title: 'Mano Derecha (Mano Activa / Trayectoria Desarrollada)',
    symbolicRole: 'Tradicionalmente se relaciona con las decisiones tomadas conscientemente, el aprendizaje cultivado y las adaptaciones forjadas por la propia experiencia.',
    maxim: 'El ser humano labra su camino a través de sus actos.'
  }
};
