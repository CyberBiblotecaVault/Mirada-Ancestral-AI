import React, { useState, useRef, useCallback } from 'react';
import { 
  Camera, Upload, Smartphone, RefreshCw, Trash2, CheckCircle2, 
  AlertCircle, Sparkles, Compass, ShieldAlert, ArrowRight, Eye, ScanFace, FileText
} from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface FacialZoneDetail {
  id: string;
  name: string;
  traditionalName: string;
  visualDescription: string;
  historicalContext: string;
  traditionalInterpretation: string;
  limitations: string;
  sampleExample: string;
}

export const FACIAL_10_ZONES: FacialZoneDetail[] = [
  {
    id: 'frente',
    name: 'Frente',
    traditionalName: 'Shang Ting (上停) / Palacio Celestial',
    visualDescription: 'Proporción vertical superior del rostro desde la línea del cabello hasta el arco superciliar, simetría y amplitud de superficie.',
    historicalContext: 'En los anales del Shen Xiang Quan Bian, la frente representaba el tercio celeste y la etapa inicial de aprendizaje (edades 15 a 30).',
    traditionalInterpretation: 'En algunas escuelas de Mian Xiang, una frente despejada y amplia simboliza receptividad intelectual, curiosidad y vínculos tempranos con maestros y guías.',
    limitations: 'La amplitud de la frente no mide el coeficiente intelectual ni el rendimiento académico real.',
    sampleExample: 'Frente amplia y despejada: tradicionalmente interpretada como preferencia por la reflexión conceptual previa a la acción.'
  },
  {
    id: 'cejas',
    name: 'Cejas',
    traditionalName: 'Bao Shou Guan (保壽官) / Oficiales de Protección',
    visualDescription: 'Dirección del vello, curvatura, densidad y distancia de separación respecto al entrecejo (Yin Tang).',
    historicalContext: 'Los textos de la dinastía Song denominaban a las cejas el espejo del temperamento y el Palacio de los Hermanos y Colegas.',
    traditionalInterpretation: 'Cejas suaves y bien orientadas se interpretan simbólicamente como constancia en los afectos, capacidad de trabajar en equipo y paciencia.',
    limitations: 'No reflejan diagnósticos psicológicos ni determinan la lealtad real de una persona.',
    sampleExample: 'Cejas arqueadas continuas: tradicionalmente asociadas a tacto diplomático en las conversaciones delicadas.'
  },
  {
    id: 'ojos',
    name: 'Ojos',
    traditionalName: 'Jian Cha Guan (監察官) / Oficiales de Inspección',
    visualDescription: 'Alineación horizontal, proporción escleral/iris, firmeza y descanso del foco visual.',
    historicalContext: 'Considerados por los maestros clásicos como la sede del Shen (espíritu vital). Tradicionalmente el ojo izquierdo evocaba el Sol y el derecho la Luna.',
    traditionalInterpretation: 'Una mirada descansada y serena se interpreta como claridad de propósito, tranquilidad moral y honestidad expresiva.',
    limitations: 'El análisis de Mian Xiang no reemplaza la revisión oftalmológica ni neurológica.',
    sampleExample: 'Mirada límpida con Shen firme: en la tradición refleja templanza interior y ausencia de agitación.'
  },
  {
    id: 'nariz',
    name: 'Nariz',
    traditionalName: 'Cai Bo Guan (財帛宮) / Palacio de los Recursos',
    visualDescription: 'Rectitud del puente nasal, carnosidad de la punta (Zhun Tou) y definición de las aletas.',
    historicalContext: 'Ocupa el centro del Reino Humano (Zhong Ting). Los tratados antiguos la denominaban la Montaña Central del rostro.',
    traditionalInterpretation: 'En algunas escuelas de Mian Xiang, la nariz ocupa una posición importante dentro de interpretaciones simbólicas relacionadas con recursos, estabilidad y prosperidad.',
    limitations: 'Esta interpretación pertenece a una tradición cultural y no constituye una predicción financiera ni garantiza estabilidad económica real.',
    sampleExample: 'Puente recto con punta redondeada: tradicionalmente visto como perseverancia en el trabajo honesto y generosidad hacia los semejantes.'
  },
  {
    id: 'pomulos',
    name: 'Pómulos',
    traditionalName: 'Quan Gu (顴骨) / Pilares de la Influencia',
    visualDescription: 'Proyección lateral y frontal de la estructura cigomática en relación con las mejillas.',
    historicalContext: 'En los tratados clásicos, los pómulos se consideraban los guardianes que respaldan la autoridad de la nariz.',
    traditionalInterpretation: 'Pómulos firmes y bien envueltos por tejido muscular se asocian tradicionalmente a valentía cívica, resiliencia y liderazgo participativo.',
    limitations: 'No indican predisposición a la agresividad ni definen habilidades directivas en el ámbito laboral moderno.',
    sampleExample: 'Pómulos altos y suaves: interpretados alegóricamente como determinación para sostener a otros en momentos de dificultad.'
  },
  {
    id: 'boca',
    name: 'Boca',
    traditionalName: 'Chu Na Guan (出納官) / Oficial de Entrada y Salida',
    visualDescription: 'Dimensión transversal, firmeza del sellado labial y orientación de las comisuras.',
    historicalContext: 'Concebida como la puerta del corazón: por ella entra el sustento del cuerpo y sale la verdad del alma.',
    traditionalInterpretation: 'Una boca que cierra con suavidad y comisuras sutilmente ascendentes simboliza veracidad, prudencia comunicativa y calidez en el trato.',
    limitations: 'No constituye un detector de mentiras ni permite juzgar la sinceridad ética de ningún ser humano.',
    sampleExample: 'Cierre labial natural y firme: en la tradición evoca discreción y cumplimiento de las promesas dadas.'
  },
  {
    id: 'labios',
    name: 'Labios',
    traditionalName: 'Borde Bermellón / Equilibrio Yin-Yang',
    visualDescription: 'Grosor relativo entre el labio superior e inferior, textura e hidratación de la superficie.',
    historicalContext: 'El labio superior representaba tradicionalmente el dar (consideración hacia otros); el inferior, el recibir y disfrutar.',
    traditionalInterpretation: 'Una proporción balanceada entre ambos labios simboliza armonía entre el altruismo y el disfrute honesto de los placeres de la vida.',
    limitations: 'El volumen labial varía enormemente por factores genéticos universales sin relación con el egoísmo o altruismo.',
    sampleExample: 'Labios de proporción simétrica: tradicionalmente interpretados como afectividad cálida y ecuánime.'
  },
  {
    id: 'menton',
    name: 'Mentón',
    traditionalName: 'Di Ge (地閣) / Palacio Terrenal',
    visualDescription: 'Anchura y proyección del tercio inferior, firmeza de la base y perfil anterior.',
    historicalContext: 'Simboliza la estabilidad de la madurez avanzada (años 60 en adelante) y el legado hacia las siguientes generaciones.',
    traditionalInterpretation: 'Un mentón amplio y redondeado se interpreta tradicionalmente como tenacidad, serenidad en el retiro y paciencia acumulada.',
    limitations: 'No predice la cantidad de años que vivirá una persona ni certifica el éxito en la vejez.',
    sampleExample: 'Mentón redondeado y firme: alegoría tradicional del árbol maduro con raíces profundas.'
  },
  {
    id: 'mandibula',
    name: 'Mandíbula',
    traditionalName: 'Estructura Ósea de Soporte',
    visualDescription: 'Ángulo mandibular, anchura goníaca y transición hacia el cuello.',
    historicalContext: 'En la filosofía fisonómica china, la mandíbula representaba la capacidad de sobrellevar esfuerzos prolongados con entereza.',
    traditionalInterpretation: 'Una mandíbula bien definida sin asperezas abruptas simboliza constancia, fidelidad a los propios principios y resistencia moral.',
    limitations: 'No define obstinación clínica ni rasgos conductuales agresivos.',
    sampleExample: 'Línea mandibular clara: asociada tradicionalmente a la autodisciplina en el estudio o el oficio.'
  },
  {
    id: 'orejas',
    name: 'Orejas',
    traditionalName: 'Cai Ting Guan (採聽官) / Oficiales de la Escucha',
    visualDescription: 'Grosor del lóbulo, definición del hélix y antihélix, posición respecto a la línea de los ojos.',
    historicalContext: 'Asociadas a los riñones en la medicina tradicional china y a la reserva de vitalidad hereditaria (Jing) en la infancia temprana.',
    traditionalInterpretation: 'Lóbulos carnosos y contornos definidos simbolizan tradicionalmente capacidad de escucha atenta, sabiduría y prudencia.',
    limitations: 'La morfología del pabellón auricular no es un diagnóstico auditivo ni mide la capacidad de aprendizaje.',
    sampleExample: 'Lóbulos carnosos y claros: tradicionalmente asociados al don de escuchar antes de emitir juicio.'
  }
];

interface AnalyzeFacePageProps {
  onNavigate: (path: string) => void;
  onAnalysisComplete?: (photoUrl: string) => void;
}

export const AnalyzeFacePage: React.FC<AnalyzeFacePageProps> = ({ 
  onNavigate,
  onAnalysisComplete
}) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<FacialZoneDetail>(FACIAL_10_ZONES[3]); // Nariz por defecto
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  // Detener cámara WebRTC
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Activar cámara
  const startCamera = async () => {
    setCameraError(null);
    stopCamera();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Tu navegador no permite acceso directo a la cámara. Te recomendamos "Foto con Celular" o subir un archivo.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.warn('Error al iniciar webcam:', err);
      setCameraError('Permiso de cámara no concedido o no disponible. Puedes usar "Foto con Celular" o subir una imagen de tu galería.');
    }
  };

  // Capturar fotograma de la webcam
  const captureFromVideo = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setPhoto(dataUrl);
      stopCamera();
    }
  };

  // Validación de archivos subidos (Formatos: JPG, JPEG, PNG, WEBP. Tamaño max: 10MB)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Formato no compatible. Por favor sube un archivo JPG, JPEG, PNG o WEBP.');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      setFileError('El archivo supera los 10MB permitidos. Por favor selecciona una imagen más liviana.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  // Generar muestra instantánea para pruebas inmediatas
  const handleDemoPhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 640, 480);
      grad.addColorStop(0, '#fbf8f2');
      grad.addColorStop(1, '#eee6d8');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Silueta estética de rostro
      ctx.strokeStyle = '#b89028';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(320, 240, 140, 190, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#171923';
      ctx.font = 'bold 18px serif';
      ctx.textAlign = 'center';
      ctx.fillText('Muestra Educativa de Rostro (Mian Xiang)', 320, 450);
    }
    setPhoto(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
  };

  const handleClearPhoto = () => {
    setPhoto(null);
    stopCamera();
  };

  const handleExecuteAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (onAnalysisComplete && photo) {
        onAnalysisComplete(photo);
      }
      onNavigate('/informe');
    }, 900);
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#191c28] py-2">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#ded5c5] bg-gradient-to-r from-white via-[#fbf7ee] to-white p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#926d0a] uppercase tracking-wider mb-1">
              <ScanFace className="w-4 h-4 text-[#926d0a]" />
              <span>Herramienta Interactiva · Mian Xiang Clásico</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-[#171923]">
              Analizar Rostro (Mian Xiang 面相)
            </h1>
            <p className="text-xs sm:text-sm text-[#4b5266] mt-1 max-w-2xl font-normal">
              Utiliza la cámara de tu teléfono móvil, activa tu webcam o sube una fotografía para explorar las 10 zonas fisonómicas tradicionales con procesamiento local confidencial.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/mian-xiang')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#191c28] bg-white hover:bg-[#faf6ee] border border-[#ded5c5] rounded-xl transition-colors cursor-pointer self-start sm:self-center shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 text-[#926d0a]" />
            <span>Guía de Mian Xiang</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Capture Viewport + Interactive 10-Zones Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Camera Viewport & Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-[#ded5c5] bg-white overflow-hidden shadow-md flex items-center justify-center">
            {/* 1. Live Webcam Feed */}
            {isCameraActive && !photo && (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="w-52 h-72 border-2 border-dashed border-[#d4af37] rounded-[48%] shadow-[0_0_20px_rgba(212,175,55,0.3)] flex flex-col justify-between items-center py-4">
                    <span className="text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
                      Alinea tu rostro de frente
                    </span>
                    <span className="text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
                      Mentón
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Captured Photo Preview */}
            {photo && (
              <div className="relative w-full h-full bg-[#fbf7ee] flex items-center justify-center">
                <img
                  src={photo}
                  alt="Fotografía de rostro cargada"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-white/95 border border-emerald-300 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Imagen en memoria local</span>
                </div>
              </div>
            )}

            {/* 3. Inactive State (Prompt to Choose Camera/Upload) */}
            {!isCameraActive && !photo && (
              <div className="p-6 text-center max-w-sm space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#fbf7ee] border border-[#ded5c5] flex items-center justify-center text-[#926d0a]">
                  <ScanFace className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#171923]">
                    Listo para Capturar tu Rostro
                  </h3>
                  <p className="text-xs text-[#525970] mt-1 font-medium">
                    Elige el método más cómodo: cámara del celular, webcam de escritorio o una fotografía de tu galería.
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => mobileInputRef.current?.click()}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>FOTO CON CELULAR</span>
                    </button>

                    <button
                      onClick={startCamera}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#fbf7ee] hover:bg-[#f5ecda] text-[#191c28] border-2 border-[#b89028] font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-[#926d0a]" />
                      <span>ACTIVAR WEBCAM</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#f6f2ea] text-[#4b5266] border border-[#ded5c5] font-semibold text-xs shadow-sm cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir archivo</span>
                    </button>

                    <button
                      onClick={handleDemoPhoto}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#f6f2ea] text-[#926d0a] border border-[#d4af37]/60 font-semibold text-xs shadow-sm cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Muestra demo</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white border border-[#ded5c5] shadow-sm">
            {isCameraActive && !photo && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={captureFromVideo}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Tomar Fotografía</span>
                </button>
                <button
                  onClick={stopCamera}
                  className="px-3 py-2 text-xs font-medium text-[#4b5266] hover:text-[#171923] border border-[#ded5c5] rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            )}

            {photo && (
              <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPhoto(null);
                      startCamera();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#191c28] bg-white border border-[#ded5c5] rounded-lg hover:bg-[#f6f2ea] cursor-pointer shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#926d0a]" />
                    <span>Volver a capturar</span>
                  </button>

                  <button
                    onClick={handleClearPhoto}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar</span>
                  </button>
                </div>

                <button
                  onClick={handleExecuteAnalysis}
                  disabled={isAnalyzing}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isAnalyzing ? 'Calculando proporciones...' : 'GENERAR INFORME TRADICIONAL'}</span>
                </button>
              </div>
            )}

            {!isCameraActive && !photo && (
              <div className="text-[11px] text-[#6b7280] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Formatos soportados: JPG, JPEG, PNG, WEBP (máx. 10MB)</span>
              </div>
            )}
          </div>

          {/* Hidden inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            ref={mobileInputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Feedback & Error notices */}
          {cameraError && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}

          {fileError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Guía requerida exactamente por el usuario */}
          <div className="p-4 rounded-2xl bg-white border border-[#ded5c5] space-y-2.5 shadow-sm">
            <h4 className="font-editorial text-base font-bold text-[#171923] flex items-center gap-2">
              <span>Guía para una Captura Correcta</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#333a4c] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rostro completo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Buena iluminación</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cámara estable</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rostro mirando de frente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Las 10 Zonas Interactivas */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#ded5c5] space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#ded5c5] pb-2">
              <span className="text-xs font-bold text-[#171923] uppercase tracking-wider">
                Las 10 Oficialías del Rostro
              </span>
              <span className="text-[11px] text-[#926d0a] font-semibold">
                Haz clic en cada zona
              </span>
            </div>

            {/* Selector de las 10 zonas */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {FACIAL_10_ZONES.map((zone) => {
                const isSelected = zone.id === selectedZone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                        : 'bg-[#fbf7ee] text-[#4b5266] hover:bg-[#f5ecda] hover:text-[#171923] border border-[#ded5c5]'
                    }`}
                  >
                    {zone.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ficha explicativa completa de la zona seleccionada */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#d4af37]/60 space-y-4 shadow-sm text-[#191c28]">
            <div className="border-b border-[#ded5c5] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#926d0a] font-bold block">
                {selectedZone.traditionalName}
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#171923] mt-0.5">
                {selectedZone.name.toUpperCase()}
              </h3>
            </div>

            {/* 1. Descripción visual */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#171923] block">
                1. Observación Visual
              </span>
              <p className="text-xs text-[#4b5266] leading-relaxed bg-[#fbf7ee] p-2.5 rounded-lg border border-[#ded5c5]">
                {selectedZone.visualDescription}
              </p>
            </div>

            {/* 2. Contexto histórico */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#171923] block">
                2. Contexto Histórico
              </span>
              <p className="text-xs text-[#4b5266] leading-relaxed">
                {selectedZone.historicalContext}
              </p>
            </div>

            {/* 3. Interpretación tradicional */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#926d0a] block">
                3. Interpretación Tradicional
              </span>
              <p className="text-xs text-[#191c28] leading-relaxed font-medium bg-[#fcfaf6] p-3 rounded-lg border-l-3 border-[#d4af37]">
                {selectedZone.traditionalInterpretation}
              </p>
            </div>

            {/* 4. Limitaciones y Aviso */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Limitaciones y Salvedad Cultural</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {selectedZone.limitations}
              </p>
            </div>

            {/* Ejemplo didáctico */}
            <div className="pt-2 text-[11px] text-[#525970] italic">
              * Ejemplo tradicional: {selectedZone.sampleExample}
            </div>

            {/* Botón para ver informe completo */}
            <button
              onClick={() => onNavigate('/informe')}
              className="w-full mt-2 py-2.5 px-4 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Ver Informe Completo con Fotografías</span>
            </button>
          </div>
        </div>
      </div>

      {/* AdSense Slot */}
      <AdPlaceholder slot="desktop-pre-footer" />
    </div>
  );
};
