import React, { useState, useRef, useCallback } from 'react';
import { 
  Hand, Camera, Upload, Smartphone, RefreshCw, Trash2, CheckCircle2, 
  AlertCircle, Sparkles, Compass, ShieldAlert, ArrowRight, BookOpen, FileText,
  Heart, Brain, Sprout, Star, Sun
} from 'lucide-react';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface HandLineDetail {
  id: string;
  name: string;
  icon: any;
  symbolicRole: string;
  traditionalMeaning: string;
  vitalWarning?: string;
  pathAdvice: string;
}

export const HAND_LINES_LIST: HandLineDetail[] = [
  {
    id: 'corazon',
    name: 'Línea del Corazón',
    icon: Heart,
    symbolicRole: 'Emociones, afectividad y vínculos humanos',
    traditionalMeaning: 'En la quiromancia tradicional, evoca el curso de los sentimientos, la empatía, el cuidado de las relaciones y la manera en que expresamos el cariño.',
    vitalWarning: 'No tiene correlación alguna con la salud cardíaca, diagnósticos de circulación ni afecciones médicas.',
    pathAdvice: 'Pliegue horizontal superior de la palma, naciendo bajo el meñique en dirección a los dedos índice y medio.'
  },
  {
    id: 'cabeza',
    name: 'Línea de la Cabeza',
    icon: Brain,
    symbolicRole: 'Pensamiento, aprendizaje y discernimiento',
    traditionalMeaning: 'Simboliza el estilo cognitivo de la persona: una trayectoria recta se interpretaba tradicionalmente como pensamiento práctico; una curva suave, como inclinación a la imaginación artística.',
    vitalWarning: 'No mide el cociente intelectual ni previene trastornos neurológicos.',
    pathAdvice: 'Pliegue transversal medio de la palma que cruza hacia el borde exterior.'
  },
  {
    id: 'vida',
    name: 'Línea de la Vida',
    icon: Sprout,
    symbolicRole: 'Vitalidad, entusiasmo y arraigo',
    traditionalMeaning: 'Simbólicamente representa el ardor vital, la energía cotidiana y la conexión con el hogar.',
    vitalWarning: 'No indica cuánto tiempo vivirá una persona y no permite predecir enfermedades. La ciencia anatómica descarta cualquier correlación con la longevidad.',
    pathAdvice: 'Pliegue curvado que rodea la eminencia tenar (monte de Venus en la base del pulgar).'
  },
  {
    id: 'destino',
    name: 'Línea del Destino (Saturno)',
    icon: Star,
    symbolicRole: 'Trayectoria, vocación y autodisciplina',
    traditionalMeaning: 'Se asocia tradicionalmente con la perseverancia profesional y la claridad de objetivos. Su ausencia es común y simboliza adaptabilidad y libertad de elección.',
    vitalWarning: 'No garantiza riqueza material ni sustituye la capacitación y el esfuerzo diario.',
    pathAdvice: 'Línea vertical que asciende desde la base de la palma hacia el dedo medio.'
  },
  {
    id: 'sol',
    name: 'Línea del Sol (Apolo)',
    icon: Sun,
    symbolicRole: 'Creatividad, brillo y reconocimiento',
    traditionalMeaning: 'En los tratados clásicos simboliza la satisfacción íntima por la labor bien hecha, la sensibilidad hacia el arte y la calidez en el trato social.',
    vitalWarning: 'No predice fama mediática ni éxito exterior automático.',
    pathAdvice: 'Trazo vertical auxiliar que asciende en dirección al dedo anular.'
  }
];

interface AnalyzeHandPageProps {
  onNavigate: (path: string) => void;
  onAnalysisComplete?: (photoUrl: string) => void;
}

export const AnalyzeHandPage: React.FC<AnalyzeHandPageProps> = ({ 
  onNavigate,
  onAnalysisComplete
}) => {
  const [selectedHand, setSelectedHand] = useState<'left' | 'right'>('left');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<HandLineDetail>(HAND_LINES_LIST[2]); // Línea de la vida por defecto para educar sobre el mito
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [imageQualityNotice, setImageQualityNotice] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    stopCamera();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Tu navegador restringe el acceso directo a video. Usa "Foto con Celular" o sube una fotografía.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      setCameraError('No se pudo activar la cámara web. Puedes utilizar "Foto con Celular" o subir una imagen de tu galería.');
    }
  };

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
      setImageQualityNotice(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setFileError('Formato no admitido. Sube un archivo JPG, JPEG, PNG o WEBP.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError('El archivo excede el límite de 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhoto(reader.result);
        stopCamera();
        setImageQualityNotice(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDemoPhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 640, 480);
      grad.addColorStop(0, '#fbf8f2');
      grad.addColorStop(1, '#f1ebd9');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 480);

      // Trazo de palma estilizada
      ctx.strokeStyle = '#b89028';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(320, 260, 120, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#171923';
      ctx.font = 'bold 16px serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Muestra Quiromántica (${selectedHand === 'left' ? 'Mano Izquierda' : 'Mano Derecha'})`, 320, 440);
    }
    setPhoto(canvas.toDataURL('image/jpeg', 0.9));
    stopCamera();
    setImageQualityNotice(null);
  };

  const handleSimulateLowQuality = () => {
    setImageQualityNotice('No podemos identificar esta línea con suficiente claridad. Intenta tomar otra fotografía con mejor iluminación.');
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
              <Hand className="w-4 h-4 text-[#926d0a]" />
              <span>Herramienta Interactiva · Quiromancia Clásica</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-[#171923]">
              Analizar Mano (Quiromancia Tradicional)
            </h1>
            <p className="text-xs sm:text-sm text-[#4b5266] mt-1 max-w-2xl font-normal">
              Inspecciona los surcos de la palma, compara la mano izquierda con la derecha y conoce la interpretación tradicional de las 5 líneas principales sin superstición ni determinismos.
            </p>
          </div>

          {/* Selector de mano izquierda / derecha */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#ded5c5] rounded-xl shadow-sm self-start sm:self-center">
            <button
              onClick={() => setSelectedHand('left')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedHand === 'left'
                  ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                  : 'text-[#4b5266] hover:bg-[#faf6ee] hover:text-[#171923]'
              }`}
            >
              ✋ Mano Izquierda
            </button>
            <button
              onClick={() => setSelectedHand('right')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedHand === 'right'
                  ? 'bg-[#d4af37] text-[#0c0d12] shadow-sm'
                  : 'text-[#4b5266] hover:bg-[#faf6ee] hover:text-[#171923]'
              }`}
            >
              🤚 Mano Derecha
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-[4/3] rounded-2xl border-2 border-[#ded5c5] bg-white overflow-hidden shadow-md flex items-center justify-center">
            {isCameraActive && !photo && (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="w-56 h-72 border-2 border-dashed border-[#d4af37] rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.3)] flex flex-col justify-between items-center p-3">
                    <span className="text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
                      Coloca la palma abierta ({selectedHand === 'left' ? 'Izquierda' : 'Derecha'})
                    </span>
                    <span className="text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
                      Base de la muñeca
                    </span>
                  </div>
                </div>
              </div>
            )}

            {photo && (
              <div className="relative w-full h-full bg-[#fbf7ee] flex items-center justify-center">
                <img
                  src={photo}
                  alt="Palma capturada"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-white/95 border border-emerald-300 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Palma ({selectedHand === 'left' ? 'Izquierda' : 'Derecha'}) en memoria local</span>
                </div>
              </div>
            )}

            {!isCameraActive && !photo && (
              <div className="p-6 text-center max-w-sm space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#fbf7ee] border border-[#ded5c5] flex items-center justify-center text-[#926d0a]">
                  <Hand className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#171923]">
                    Listo para Analizar tu Palma ({selectedHand === 'left' ? 'Izquierda' : 'Derecha'})
                  </h3>
                  <p className="text-xs text-[#525970] mt-1 font-medium">
                    Elige si deseas capturar con la cámara del teléfono celular, webcam o subir una fotografía nítida.
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
                  <span>Capturar Palma</span>
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
                    onClick={() => setPhoto(null)}
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
                  <span>{isAnalyzing ? 'Identificando surcos...' : 'GENERAR INFORME TRADICIONAL'}</span>
                </button>
              </div>
            )}

            {!isCameraActive && !photo && (
              <div className="text-[11px] text-[#6b7280] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mano seleccionada: {selectedHand === 'left' ? 'Izquierda (potencial innato)' : 'Derecha (trayectoria activa)'}</span>
              </div>
            )}
          </div>

          {/* Hidden Inputs */}
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
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Alerta de calidad insuficiente (Requerida en las especificaciones) */}
          {imageQualityNotice && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="font-medium">{imageQualityNotice}</span>
            </div>
          )}

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

          {/* Botón para probar el mensaje de calidad */}
          <div className="text-right">
            <button
              onClick={handleSimulateLowQuality}
              className="text-[10px] text-[#8b91a5] hover:text-[#4b5266] underline cursor-pointer"
            >
              Comprobar aviso si la iluminación es insuficiente
            </button>
          </div>
        </div>

        {/* Right Column: Las 5 Líneas Principales y Montes */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#ded5c5] space-y-3 shadow-sm">
            <span className="text-xs font-bold text-[#171923] uppercase tracking-wider block">
              Las 5 Líneas Tradicionales de la Mano
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HAND_LINES_LIST.map((line) => {
                const Icon = line.icon;
                const isSelected = line.id === selectedLine.id;
                return (
                  <button
                    key={line.id}
                    onClick={() => setSelectedLine(line)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs flex items-center gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'border-[#b89028] bg-[#fbf7ee] text-[#171923] shadow-sm font-bold'
                        : 'border-[#ded5c5] bg-white text-[#4b5266] hover:bg-[#faf6ee] hover:text-[#171923]'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-white border border-[#ded5c5] text-[#926d0a]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="truncate">{line.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ficha explicativa de la línea seleccionada */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#d4af37]/60 space-y-4 shadow-sm text-[#191c28]">
            <div className="border-b border-[#ded5c5] pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#926d0a] font-bold block">
                  Quiromancia Tradicional ({selectedHand === 'left' ? 'Mano Izquierda' : 'Mano Derecha'})
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#171923] mt-0.5">
                  {selectedLine.name}
                </h3>
              </div>
              <div className="p-2.5 rounded-xl bg-[#fbf7ee] text-[#926d0a] border border-[#ded5c5]">
                <selectedLine.icon className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#171923] block">
                Ubicación y Trayectoria en la Palma
              </span>
              <p className="text-xs text-[#4b5266] bg-[#fbf7ee] p-2.5 rounded-lg border border-[#ded5c5]">
                {selectedLine.pathAdvice}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#926d0a] block">
                Significado Simbólico Tradicional
              </span>
              <p className="text-xs text-[#191c28] leading-relaxed font-medium bg-[#fcfaf6] p-3 rounded-lg border-l-3 border-[#d4af37]">
                {selectedLine.traditionalMeaning}
              </p>
            </div>

            {/* Advertencia vital requerida expresamente */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Advertencia Ética y Científica</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {selectedLine.vitalWarning}
              </p>
            </div>

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
