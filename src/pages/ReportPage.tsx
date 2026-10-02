import React, { useRef } from 'react';
import { 
  Printer, Download, FileText, Sparkles, ShieldAlert, ArrowLeft,
  CheckCircle2, Compass, Hand, ScanFace, FileCode, Check
} from 'lucide-react';
import { SITE_CONFIG, MANDATORY_LEGAL_NOTICE } from '../config/siteConfig';
import { exportToWordDoc, exportToPrintablePdf, downloadHtmlReport } from '../utils/reportExporter';
import { AnalysisReport } from '../types';

interface ReportPageProps {
  onNavigate: (path: string) => void;
  currentReport?: AnalysisReport | null;
  capturedFaceImage?: string;
  capturedHandImage?: string;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  onNavigate,
  currentReport,
  capturedFaceImage,
  capturedHandImage
}) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const faceImg = capturedFaceImage || currentReport?.capturedFaceImage;
  const handImg = capturedHandImage || currentReport?.capturedHandImage;

  // Fallback mock report object if user directly navigates to /informe without taking a picture
  const reportData: AnalysisReport = currentReport || {
    id: 'rep-general-2026',
    date: currentDate,
    userName: 'Consultante Cultural',
    analysisType: faceImg && handImg ? 'both' : handImg ? 'hand' : 'face',
    selectedHand: 'left',
    capturedFaceImage: faceImg,
    capturedHandImage: handImg,
    dimensions: [
      {
        id: 'dim-1',
        category: 'pensamiento',
        title: 'Pensamiento y Discernimiento',
        iconName: 'brain',
        analyzedFeature: 'Frente y Línea de la Cabeza',
        question: '¿Tendencia a reflexión conceptual o acción empírica directa?',
        directVerdict: 'EQUILIBRIO',
        verdictLabel: 'Reflexión Armónica',
        directExplanation: 'La amplitud del tercio superior y la fluidez del surco medio evocan una mente analítica que medita antes de emprender compromisos mayores.',
        traditionalInterpretation: 'En la fisonomía clásica, la frente despejada se asocia a receptividad de consejo y respeto por las enseñanzas formativas.',
        historicalContext: 'Canon de la dinastía Song (Shen Xiang Quan Bian).',
        culturalCaveat: 'No mide el cociente intelectual ni predetermina capacidades cognitivas.',
        advice: 'Cultivar la lectura profunda y el diálogo sereno en momentos de incertidumbre.',
        energyTone: 'Armónico'
      },
      {
        id: 'dim-2',
        category: 'relaciones',
        title: 'Relaciones y Convivencia',
        iconName: 'heart',
        analyzedFeature: 'Cejas y Línea del Corazón',
        question: '¿Tendencia a estabilidad afectiva y lealtad en los vínculos?',
        directVerdict: 'SÍ',
        verdictLabel: 'Constancia Afectiva',
        directExplanation: 'El arco regular de las cejas y la nitidez del pliegue superior simbolizan en la tradición lealtad a los afectos y empatía sincera.',
        traditionalInterpretation: 'Los tratados tradicionales consideran que las cejas peinadas en una sola dirección reflejan templanza y ausencia de rencores.',
        historicalContext: 'Oficial de la Protección (Bao Shou Guan).',
        culturalCaveat: 'No garantiza la ausencia de desacuerdos cotidianos en la pareja o la familia.',
        advice: 'Expresar la gratitud en actos concretos de servicio hacia los seres queridos.',
        energyTone: 'Vital'
      },
      {
        id: 'dim-3',
        category: 'prosperidad',
        title: 'Recursos y Vocación',
        iconName: 'coins',
        analyzedFeature: 'Puente Nasal y Línea del Destino',
        question: '¿Estabilidad en el esfuerzo sostenido y perseverancia laboral?',
        directVerdict: 'SÍ',
        verdictLabel: 'Laboriosidad Constante',
        directExplanation: 'La firmeza de la cordillera central y la verticalidad del trazo medio evocan perseverancia en el trabajo honesto y prudencia administrativa.',
        traditionalInterpretation: 'El Palacio de los Recursos (Cai Bo Guan) simboliza la acumulación paciente fruto del trabajo honrado.',
        historicalContext: 'Tratado de los Doce Palacios.',
        culturalCaveat: 'No constituye una predicción financiera ni reemplaza el estudio y la planificación económica.',
        advice: 'Diversificar los aprendizajes y mantener hábitos de sobriedad.',
        energyTone: 'Constante'
      },
      {
        id: 'dim-4',
        category: 'familia',
        title: 'Arraigo y Vitalidad',
        iconName: 'users',
        analyzedFeature: 'Mentón y Línea de la Vida',
        question: '¿Solidez de raíces, conexión con el hogar y vitalidad diaria?',
        directVerdict: 'SÍ',
        verdictLabel: 'Arraigo Firme',
        directExplanation: 'El basamento del tercio inferior y el semicírculo palmar simbolizan tradicionalmente apego a los valores fundacionales y vigor cotidiano.',
        traditionalInterpretation: 'El Di Ge (Palacio Terrenal) representa el árbol de copa frondosa sostenido por raíces hondas.',
        historicalContext: 'San Ting (Reino de la Tierra).',
        culturalCaveat: 'No predice la cantidad de años ni diagnostica el estado médico corporal.',
        advice: 'Cuidar el descanso nocturno, el contacto con la naturaleza y la unión familiar.',
        energyTone: 'Reflexivo'
      }
    ],
    selectedFacialZones: [],
    selectedHandLines: [],
    sanTingProportions: {
      cielo: 33,
      hombre: 34,
      tierra: 33
    },
    dominantElement: 'Tierra',
    elementDescription: 'Arquetipo tradicional asociado a la estabilidad, la generosidad comunitaria, la paciencia y la capacidad de cobijar a otros.',
    generalSynthesis: 'El análisis visual interactivo refleja una proporción armónica entre los tres planos tradicionales, invitando a cultivar el equilibrio entre el estudio noble, la acción decidida y la serenidad interior.',
    auditLogs: []
  };

  const handlePrint = () => {
    exportToPrintablePdf(reportData);
  };

  const handleDownloadWord = () => {
    exportToWordDoc(reportData);
  };

  const handleDownloadHtml = () => {
    downloadHtmlReport(reportData);
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#191c28] py-2">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ded5c5] pb-4">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-xs text-[#4b5266] hover:text-[#171923] font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            title="Abre el cuadro de diálogo para Imprimir o Guardar como PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>DESCARGAR PDF / IMPRIMIR</span>
          </button>

          <button
            onClick={handleDownloadWord}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#faf6ee] border border-[#ded5c5] rounded-xl transition-colors cursor-pointer shadow-sm"
            title="Descargar documento Word compatible con Google Docs"
          >
            <Download className="w-3.5 h-3.5 text-[#926d0a]" />
            <span>Descargar Word (.doc)</span>
          </button>

          <button
            onClick={handleDownloadHtml}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#faf6ee] border border-[#ded5c5] rounded-xl transition-colors cursor-pointer shadow-sm"
            title="Descargar archivo HTML autocontenido con fotos en base64"
          >
            <FileCode className="w-3.5 h-3.5 text-[#926d0a]" />
            <span>Descargar Archivo HTML</span>
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="rounded-3xl border-2 border-[#d4af37]/60 bg-white p-6 sm:p-10 lg:p-12 shadow-xl space-y-10 max-w-4xl mx-auto">
        {/* Cover / Portada */}
        <div className="text-center border-b-2 border-[#d4af37] pb-8 pt-2">
          <div className="inline-block p-2.5 rounded-full border border-[#d4af37] mb-3 bg-[#fdfaf3]">
            <Compass className="w-8 h-8 text-[#926d0a]" />
          </div>
          <h1 className="font-brand text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-[#171923]">
            {SITE_CONFIG.name}
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-[#926d0a] mt-1 font-semibold">
            {SITE_CONFIG.tagline}
          </p>
          <p className="text-xs uppercase tracking-widest text-[#525970] mt-1 font-semibold">
            Informe Oficial de Observación Visual y Tradición Cultural
          </p>

          {/* Metadata Table */}
          <div className="mt-8 max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-left p-4 rounded-xl bg-[#fbf7ee] border border-[#ded5c5] text-xs shadow-sm">
            <div>
              <span className="text-[10px] text-[#6b7280] uppercase block font-semibold">Consultante</span>
              <span className="font-bold text-[#171923] block truncate">
                {reportData.userName}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#6b7280] uppercase block font-semibold">Fecha</span>
              <span className="font-bold text-[#171923] block">
                {reportData.date}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#6b7280] uppercase block font-semibold">Modalidad</span>
              <span className="font-bold text-[#926d0a] uppercase block">
                {reportData.analysisType}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#6b7280] uppercase block font-semibold">Arquetipo</span>
              <span className="font-bold text-[#926d0a] block">
                {reportData.dominantElement}
              </span>
            </div>
          </div>

          {/* Cultural Notice Box */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs text-left flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <strong>Aviso de Transparencia y Salvedad Cultural:</strong> {MANDATORY_LEGAL_NOTICE}
            </p>
          </div>
        </div>

        {/* Captured Photos (Rostro y/o Mano) */}
        {(faceImg || handImg) && (
          <div className="space-y-4">
            <h2 className="font-editorial text-2xl font-bold text-[#171923] border-b border-[#ded5c5] pb-2 flex items-center justify-between">
              <span>Fotografías Analizadas</span>
              <span className="text-xs font-semibold text-emerald-700">✓ Memoria Local Privada</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
              {faceImg && (
                <div className="flex flex-col items-center p-4 bg-[#fbf7ee] rounded-2xl border border-[#ded5c5] shadow-sm">
                  <div className="w-full max-w-[260px] aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#d4af37] bg-white shadow-md">
                    <img
                      src={faceImg}
                      alt="Rostro Analizado"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#171923] mt-2 flex items-center gap-1">
                    <ScanFace className="w-3.5 h-3.5 text-[#926d0a]" />
                    Rostro Analizado (Mian Xiang 面相)
                  </span>
                  <span className="text-[10px] text-[#525970] font-medium">
                    Proporciones de los Tres Reinos (San Ting)
                  </span>
                </div>
              )}

              {handImg && (
                <div className="flex flex-col items-center p-4 bg-[#fbf7ee] rounded-2xl border border-[#ded5c5] shadow-sm">
                  <div className="w-full max-w-[260px] aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#d4af37] bg-white shadow-md">
                    <img
                      src={handImg}
                      alt="Palma Analizada"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#171923] mt-2 flex items-center gap-1">
                    <Hand className="w-3.5 h-3.5 text-[#926d0a]" />
                    Palma Analizada ({reportData.selectedHand === 'left' ? 'Mano Izquierda' : 'Mano Derecha'})
                  </span>
                  <span className="text-[10px] text-[#525970] font-medium">
                    Pliegues y surcos palmares tradicionales
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Síntesis General */}
        <div className="space-y-3">
          <h2 className="font-editorial text-2xl font-bold text-[#171923] border-b border-[#ded5c5] pb-2">
            1. Resumen General y Síntesis
          </h2>
          <p className="bg-[#fbf7ee] p-4 rounded-xl border border-[#ded5c5] text-xs sm:text-sm text-[#191c28] leading-relaxed font-medium">
            {reportData.generalSynthesis}
          </p>
          <p className="text-xs text-[#525970]">
            Arquetipo predominante: <strong className="text-[#171923]">{reportData.dominantElement}</strong>. {reportData.elementDescription}
          </p>
        </div>

        {/* Las 4 Dimensiones con preguntas claras y veredictos */}
        <div className="space-y-4">
          <h2 className="font-editorial text-2xl font-bold text-[#171923] border-b border-[#ded5c5] pb-2">
            2. Respuestas y Veredictos por Dimensión Tradicional
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reportData.dimensions.map((dim) => (
              <div key={dim.id} className="p-4 rounded-xl bg-white border border-[#ded5c5] space-y-2 text-xs shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#171923] text-sm">{dim.title}</h3>
                  <span className="text-[10px] font-mono text-[#8b6508] font-bold px-2 py-0.5 rounded bg-[#fbf7ee] border border-[#ded5c5]">
                    {dim.energyTone}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#fbf7ee] border border-[#ded5c5] space-y-1">
                  <div className="text-[11px] text-[#4b5266] font-semibold">
                    <strong>Pregunta clave:</strong> {dim.question}
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-extrabold text-[11px] border border-emerald-300">
                      {dim.directVerdict}
                    </span>
                    <span className="text-[11px] font-bold text-[#171923]">
                      {dim.verdictLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#191c28] pt-1 bg-white p-2 rounded border border-[#e8dfd0]">
                    <strong>Explicación:</strong> {dim.directExplanation}
                  </p>
                </div>

                <p className="text-[#4b5266] text-[11px] leading-relaxed">
                  <strong>Fundamento tradicional:</strong> {dim.traditionalInterpretation}
                </p>

                {dim.advice && (
                  <p className="text-[10px] text-emerald-950 bg-emerald-50 p-2 rounded border border-emerald-200">
                    <strong>Consejo:</strong> {dim.advice}
                  </p>
                )}

                <p className="text-[10px] text-amber-950 bg-amber-50 p-2 rounded border border-amber-200">
                  {dim.culturalCaveat}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusión cultural y derechos */}
        <div className="border-t border-[#ded5c5] pt-6 space-y-3 text-xs text-[#525970] leading-relaxed">
          <h3 className="font-editorial text-lg font-bold text-[#171923]">
            Reflexión y Conclusión Tradicional
          </h3>
          <p>
            En la tradición clásica del Mian Xiang se recuerda: <em>"La mente engendra el semblante; transformando la mente, el semblante se armoniza"</em>. La fisonomía y la quiromancia tradicional son invitaciones a la contemplación serena y al perfeccionamiento ético personal.
          </p>
        </div>

        {/* Footer del documento con Copyright requerido */}
        <div className="border-t-2 border-[#d4af37] pt-6 text-center text-xs text-[#6b7280] space-y-1">
          <p className="font-brand font-bold text-[#926d0a]">
            {SITE_CONFIG.name} · {SITE_CONFIG.tagline}
          </p>
          <p className="font-semibold text-[#171923]">
            {SITE_CONFIG.copyright}
          </p>
          <p className="text-[10px] text-[#8b91a5]">
            Documento emitido electrónicamente con fines pedagógicos. Propietario: {SITE_CONFIG.ownerName}.
          </p>
        </div>
      </div>
    </div>
  );
};
