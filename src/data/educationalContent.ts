export interface ArticleSection {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  readTime: string;
  keyPoints: string[];
  content: string[];
}

export const EDUCATIONAL_ARTICLES: ArticleSection[] = [
  {
    id: 'mian-xiang-history',
    title: 'Mian Xiang (面相): El Espejo de las Tres Eras',
    subtitle: 'Historia y filosofía de la fisonomía tradicional china',
    era: 'Dinastías Zhou, Han y Song (siglos X a.C. - XII d.C.)',
    readTime: '4 min de lectura',
    keyPoints: [
      'Nace como una alegoría cosmológica entre el Cielo, el Hombre y la Tierra.',
      'No buscaba etiquetar ni predecir de forma fatalista, sino cultivar la autobservación.',
      'El Shen Xiang Quan Bian (Tratado Completo del Rostro Sagrado) sentó las bases de los 12 Palacios.'
    ],
    content: [
      'El Mian Xiang es una de las artes de observación más antiguas de Asia Oriental. Su origen se entrelaza con el pensamiento taoísta y confuciano, donde el microcosmos del cuerpo humano se concibe como un reflejo del macrocosmos natural.',
      'A diferencia de las pseudociencias occidentales del siglo XIX como la frenología, que pretendían clasificar de forma discriminatoria a las personas, los grandes maestros chinos de Mian Xiang —como Guiguzi o Chen Tuan— insistían en que el rostro es dinámico y maleable: "La mente engendra la apariencia; transformando la mente, la apariencia se transforma" (有心無相，相逐心生).',
      'La lectura facial tradicional nunca pretendió ser una ciencia deductiva exacta, sino un mapa de símbolos para reflexionar sobre el propio temperamento, las relaciones interpersonales y la armonía con el entorno.'
    ]
  },
  {
    id: 'san-ting-three-realms',
    title: 'San Ting (三停): La Trinidad del Rostro',
    subtitle: 'El equilibrio entre Cielo, Humanidad y Tierra',
    era: 'Canon clásico de la dinastía Tang',
    readTime: '3 min de lectura',
    keyPoints: [
      'Shang Ting (Cielo): De la raíz del cabello a las cejas — Juventud y sabiduría.',
      'Zhong Ting (Hombre): De las cejas a la base nasal — Madurez y realizaciones.',
      'Xia Ting (Tierra): De la nariz al mentón — Sabiduría tardía y estabilidad.'
    ],
    content: [
      'La regla fundamental del Mian Xiang es la división del rostro en tres tercios simétricos denominados San Ting. Cuando estas tres porciones guardan una proporción visual armónica, la tradición la califica como "vida en equilibrio armónico".',
      'El tercio superior o Palacio Celestial habla de la herencia cultural, la imaginación y la curiosidad juvenil. El tercio medio o Palacio Humano refleja las fuerzas puestas en marcha durante la adultez: el empeño, la ética y las alianzas. El tercio inferior o Palacio Terrenal simboliza las raíces que sostienen la copa del árbol en la vejez: la serenidad, la generosidad y el legado que se deja a los descendientes.',
      'En la tradición, si un tercio presenta menor relieve, no se considera una debilidad, sino un recordatorio de cultivar conscientemente las virtudes de esa etapa mediante la educación y el autodominio.'
    ]
  },
  {
    id: 'chiromancy-traditions',
    title: 'La Quiromancia Tradicional y sus Líneas',
    subtitle: 'El lenguaje simbólico de las palmas a través de Oriente y Occidente',
    era: 'Tradición védica de Samudrika y textos helénico-orientales',
    readTime: '4 min de lectura',
    keyPoints: [
      'La mano izquierda como mapa de potencial inicial; la derecha como lienzo de las elecciones vivenciales.',
      'Las líneas no son fijas: evolucionan a lo largo de los años según los hábitos de vida.',
      'La Línea de la Vida mide intensidad simbólica y vitalidad, JAMÁS la longevidad cronológica.'
    ],
    content: [
      'La quiromancia tradicional (del griego kheir, mano, y manteia, interpretación simbólica) posee raíces antiquísimas en la India védica bajo el nombre de Samudrika Shastra, extendiéndose posteriormente por la Ruta de la Seda hacia China, Persia y el Mediterráneo.',
      'En la visión oriental, la mano izquierda se entiende como el cántaro de la herencia natural (lo recibido al nacer), mientras que la mano derecha (en personas diestras) representa el camino recorrido y los hábitos forjados por la voluntad.',
      'Uno de los malentendidos más difundidos de la quiromancia popular es atribuir a la Línea de la Vida la capacidad de medir cuántos años vivirá una persona. Los tratados serios de todas las épocas advierten enérgicamente contra esta interpretación: la línea de la vida señala el ardor, el ritmo y los cambios de rumbo vitales, no una fecha de caducidad biológica.'
    ]
  },
  {
    id: 'five-elements-physiognomy',
    title: 'Los Cinco Elementos (Wu Xing) en la Fisonomía',
    subtitle: 'Madera, Fuego, Tierra, Metal y Agua en las facciones humanas',
    era: 'Medicina Tradicional China y Fisiognomía Taoísta',
    readTime: '5 min de lectura',
    keyPoints: [
      'Madera (Mù): Estructura esbelta, rasgos rectos, simboliza crecimiento y generosidad.',
      'Fuego (Huǒ): Rasgos angulares o puntiagudos, simboliza entusiasmo y creatividad.',
      'Tierra (Tǔ): Rasgos cuadrados y firmes, simboliza estabilidad y honestidad.',
      'Metal (Jīn): Contornos definidos y limpios, simboliza discernimiento y rectitud.',
      'Agua (Shuǐ): Rasgos redondeados y suaves, simboliza adaptabilidad y sabiduría profunda.'
    ],
    content: [
      'La teoría de las Cinco Fases o Wu Xing (五行) articula tanto el diagnóstico en medicina tradicional china como la lectura fisonómica del Mian Xiang. Cada rostro combina elementos en diversas proporciones.',
      'El tipo Madera suele asociarse con frentes despejadas y cejas largas; el tipo Fuego con miradas vivas y barbillas marcadas; el tipo Tierra con mandíbulas sólidas y pómulos fuertes; el tipo Metal con narices rectas y tez despejada; y el tipo Agua con miradas profundas y contornos llenos de suavidad.',
      'Comprender el propio elemento dominante permite, según la tradición, comprender qué ritmos de descanso y qué estímulos nutren mejor el espíritu de cada persona.'
    ]
  },
  {
    id: 'ethical-charter',
    title: 'Código Ético y Rigor Cultural',
    subtitle: 'Por qué la fisonomía tradicional es cultura y entretenimiento, no ciencia',
    era: 'Declaración Moderna de Respeto y Transparencia',
    readTime: '3 min de lectura',
    keyPoints: [
      'Ninguna forma de rostro o mano determina la inteligencia, bondad, salud o destino de una persona.',
      'Rechazo explícito a cualquier sesgo discriminatorio, racial o socioeconómico.',
      'Experiencia diseñada para el disfrute humanista y el aprecio de la literatura oriental.'
    ],
    content: [
      'Mirada Ancestral AI se fundamenta en un compromiso irrestricto de transparencia y ética contemporánea. La fisonomía y la quiromancia son patrimonios culturales intangibles, ricos en poesía, metáfora y mitología, pero carecen de validez científica.',
      'Ningún algoritmo ni tradición milenaria puede dictaminar las capacidades de un ser humano, su honradez moral, su vocación profesional, su orientaciones personales ni su porvenir económico. La persona humana es libre y se define por sus actos, sus decisiones conscientes y su convivencia en comunidad.',
      'Te invitamos a disfrutar de esta aplicación como quien contempla una obra de teatro clásica o lee un poema antiguo: con curiosidad, deleite estético y mirada reflexiva.'
    ]
  }
];
