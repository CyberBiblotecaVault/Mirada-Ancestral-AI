import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Camera, Upload, RotateCw, CheckCircle2, AlertCircle, RefreshCw, 
  Sparkles, X, Shield, Lock, Image as ImageIcon, Smartphone, BookOpen, Hand, ScanFace
} from 'lucide-react';
import { AnalysisType, HandSelection } from '../types';

interface CameraCaptureProps {
  analysisType: AnalysisType;
  selectedHand: HandSelection;
  onSelectHand: (hand: HandSelection) => void;
  onSelectAnalysisType?: (type: AnalysisType) => void;
  onNavigateTab?: (tab: string) => void;
  onImageReady: (faceImg?: string, handImg?: string) => void;
  onCancel: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  analysisType,
  selectedHand,
  onSelectHand,
  onSelectAnalysisType,
  onNavigateTab,
  onImageReady,
  onCancel
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mobileCameraRef = useRef<HTMLInputElement | null>(null);

  const [activeStep, setActiveStep] = useState<'face' | 'hand'>(
    analysisType === 'hand' ? 'hand' : 'face'
  );
  const [capturedFace, setCapturedFace] = useState<string | null>(null);
  const [capturedHand, setCapturedHand] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>(
    activeStep === 'face' ? 'user' : 'environment'
  );
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isStartingCamera, setIsStartingCamera] = useState<boolean>(false);

  // Synchronize when analysisType changes externally
  useEffect(() => {
    setActiveStep(analysisType === 'hand' ? 'hand' : 'face');
  }, [analysisType]);

  // Stop camera stream safely
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn('Error stopping track', e);
        }
      });
      streamRef.current = null;
    }
    setCameraStream(null);
    setIsCameraActive(false);
    setIsStartingCamera(false);
  }, []);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Start WebRTC live camera with cascading fallbacks
  const startCamera = async () => {
    setCameraError(null);
    setIsStartingCamera(true);
    stopCamera();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Tu navegador restringe el acceso directo a video. Puedes usar "Tomar Foto Móvil", subir archivo o probar la muestra.');
      setIsStartingCamera(false);
      return;
    }

    let stream: MediaStream | null = null;

    // Attempt 1: Ideal resolution + facing mode
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false
      });
    } catch (err1) {
      console.warn('Attempt 1 failed, trying fallback 2...', err1);
      // Attempt 2: Simple facingMode
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
          audio: false
        });
      } catch (err2) {
        console.warn('Attempt 2 failed, trying generic video...', err2);
        // Attempt 3: Generic video constraint
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        } catch (err3: any) {
          console.error('All camera attempts failed:', err3);
          setCameraError(
            err3.name === 'NotAllowedError' || err3.name === 'PermissionDeniedError'
              ? 'Permiso de cámara bloqueado o no concedido. Usa "Tomar Foto Móvil" o sube una imagen de tu galería.'
              : 'No se pudo activar la cámara web en este dispositivo. Te recomendamos "Tomar Foto Móvil" o subir un archivo.'
          );
          setIsStartingCamera(false);
          setIsCameraActive(false);
          return;
        }
      }
    }

    if (stream) {
      streamRef.current = stream;
      setCameraStream(stream);
      setIsCameraActive(true);
      setIsStartingCamera(false);
    }
  };

  // Sync video element with stream
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      const video = videoRef.current;
      video.srcObject = cameraStream;
      video.onloadedmetadata = () => {
        video.play().catch((e) => console.warn('Video play rejected:', e));
      };
    }
  }, [cameraStream, isCameraActive]);

  const toggleFacingMode = () => {
    const next = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(next);
    if (isCameraActive) {
      setTimeout(() => {
        startCamera();
      }, 50);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    if (activeStep === 'face') {
      setCapturedFace(dataUrl);
    } else {
      setCapturedHand(dataUrl);
    }
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFileError('Formato no admitido. Por favor selecciona JPG, PNG o WEBP.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError('El archivo es demasiado grande (máximo 10MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (activeStep === 'face') {
        setCapturedFace(result);
      } else {
        setCapturedHand(result);
      }
      stopCamera();
    };
    reader.readAsDataURL(file);
    // Reset input so the same file can be re-selected if desired
    e.target.value = '';
  };

  // Switch modality seamlessly
  const handleSwitchModality = (step: 'face' | 'hand', hand?: HandSelection) => {
    stopCamera();
    setActiveStep(step);
    if (step === 'hand') {
      if (hand) onSelectHand(hand);
      if (onSelectAnalysisType) onSelectAnalysisType('hand');
    } else {
      if (onSelectAnalysisType) onSelectAnalysisType('face');
    }
    setCameraError(null);
    setFileError(null);
  };

  // Instant demo image for users who want to try immediately
  const loadDemoImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 640, 640);
    grad.addColorStop(0, '#161928');
    grad.addColorStop(0.5, '#0e101a');
    grad.addColorStop(1, '#1b1424');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 640);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';

    if (activeStep === 'face') {
      // Face oval
      ctx.beginPath();
      ctx.ellipse(320, 310, 160, 220, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();

      // Eyes
      ctx.beginPath();
      ctx.arc(260, 270, 18, 0, Math.PI * 2);
      ctx.arc(380, 270, 18, 0, Math.PI * 2);
      ctx.stroke();

      // Nose
      ctx.beginPath();
      ctx.moveTo(320, 270);
      ctx.lineTo(310, 360);
      ctx.lineTo(330, 360);
      ctx.closePath();
      ctx.stroke();

      // Mouth
      ctx.beginPath();
      ctx.arc(320, 420, 35, 0.2, Math.PI - 0.2);
      ctx.stroke();

      ctx.fillStyle = '#f5ebd7';
      ctx.font = '20px serif';
      ctx.textAlign = 'center';
      ctx.fillText('Muestra Fisonómica Tradicional (Mian Xiang)', 320, 580);
    } else {
      // Hand contour
      ctx.beginPath();
      ctx.roundRect(220, 260, 200, 250, 40);
      ctx.stroke();
      ctx.fill();

      // Fingers
      ctx.strokeRect(170, 330, 45, 90); // thumb
      ctx.strokeRect(230, 140, 38, 120); // index
      ctx.strokeRect(280, 110, 38, 150); // middle
      ctx.strokeRect(330, 130, 38, 130); // ring
      ctx.strokeRect(380, 180, 36, 90); // little

      // Palm Lines
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(290, 360, 80, 0.2, 1.8); // life line
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(240, 330);
      ctx.quadraticCurveTo(310, 350, 390, 320); // head line
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(240, 300);
      ctx.quadraticCurveTo(320, 280, 390, 290); // heart line
      ctx.stroke();

      ctx.fillStyle = '#f5ebd7';
      ctx.font = '20px serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Muestra Quiromántica (${selectedHand === 'left' ? 'Mano Izquierda' : 'Mano Derecha'})`, 320, 580);
    }

    const demoUrl = canvas.toDataURL('image/jpeg', 0.9);
    if (activeStep === 'face') {
      setCapturedFace(demoUrl);
    } else {
      setCapturedHand(demoUrl);
    }
    stopCamera();
  };

  const handleContinue = () => {
    if (analysisType === 'both' && activeStep === 'face') {
      setActiveStep('hand');
      return;
    }
    onImageReady(capturedFace || undefined, capturedHand || undefined);
  };

  const currentCaptured = activeStep === 'face' ? capturedFace : capturedHand;

  return (
    <div className="relative mx-auto max-w-4xl px-3 sm:px-4 py-4 animate-fade-in text-[#191c28]">
      {/* Top Main Navigation Bar inside Capture */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ded5c5] pb-4 mb-4 gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926d0a]">
            {activeStep === 'face' ? 'Módulo I · Mian Xiang (面相)' : 'Módulo II · Quiromancia Tradicional'}
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#191c28]">
            {activeStep === 'face' ? 'Análisis del Rostro' : 'Análisis de las Manos'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateTab && (
            <button
              onClick={() => {
                stopCamera();
                onNavigateTab('manos');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ded5c5] bg-white hover:border-[#b89028] text-xs font-semibold text-[#191c28] transition-colors shadow-sm cursor-pointer"
              title="Abrir el mapa tradicional de las manos sin cámara"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#926d0a]" />
              <span>Ver Mapa de Manos</span>
            </button>
          )}

          <button
            onClick={() => {
              stopCamera();
              onCancel();
            }}
            className="p-2 text-[#5a6278] hover:text-[#191c28] rounded-lg hover:bg-[#f0ebe0] transition-colors cursor-pointer"
            title="Cerrar y volver al inicio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prominent Modality Switcher (Face, Left Hand, Right Hand, Both) */}
      <div className="mb-5 p-2 rounded-2xl bg-white border border-[#ded5c5] flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <span className="text-xs font-semibold text-[#4b5266] px-2">
          ¿Qué deseas analizar ahora?
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleSwitchModality('face')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeStep === 'face'
                ? 'bg-[#d4af37] text-[#0c0d12] font-bold shadow-md'
                : 'bg-[#fbf7ee] border border-[#ded5c5] text-[#3e4456] hover:bg-[#f4eedf] hover:text-[#191c28]'
            }`}
          >
            <ScanFace className="w-3.5 h-3.5" />
            <span>📷 Rostro (Mian Xiang)</span>
          </button>

          <button
            onClick={() => handleSwitchModality('hand', 'left')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeStep === 'hand' && selectedHand === 'left'
                ? 'bg-[#d4af37] text-[#0c0d12] font-bold shadow-md'
                : 'bg-[#fbf7ee] border border-[#ded5c5] text-[#3e4456] hover:bg-[#f4eedf] hover:text-[#191c28]'
            }`}
          >
            <Hand className="w-3.5 h-3.5" />
            <span>✋ Mano Izquierda</span>
          </button>

          <button
            onClick={() => handleSwitchModality('hand', 'right')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeStep === 'hand' && selectedHand === 'right'
                ? 'bg-[#d4af37] text-[#0c0d12] font-bold shadow-md'
                : 'bg-[#fbf7ee] border border-[#ded5c5] text-[#3e4456] hover:bg-[#f4eedf] hover:text-[#191c28]'
            }`}
          >
            <Hand className="w-3.5 h-3.5 scale-x-[-1]" />
            <span>🤚 Mano Derecha</span>
          </button>
        </div>
      </div>

      {/* Hand Tradition Note when step is hand */}
      {activeStep === 'hand' && (
        <div className="mb-4 p-3.5 bg-[#fbf7ee] rounded-xl border border-[#ded5c5] text-xs text-[#333a4c] flex flex-wrap items-center justify-between gap-2 shadow-sm">
          <div>
            <strong className="text-[#191c28]">
              {selectedHand === 'left' ? 'Mano Izquierda (Tradición Oriental):' : 'Mano Derecha (Tradición Oriental):'}
            </strong>{' '}
            {selectedHand === 'left'
              ? 'Simboliza el potencial hereditario, las raíces familiares y talentos innatos.'
              : 'Simboliza la trayectoria activa, decisiones voluntarias y proyectos forjados.'}
          </div>
          <div className="text-[11px] text-[#926d0a] font-semibold">
            Puedes cambiar de mano en las pestañas superiores.
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Capture Box */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-white rounded-2xl border-2 border-[#ded5c5] overflow-hidden flex items-center justify-center shadow-md">
            {/* Case A: Camera Live */}
            {isCameraActive && !currentCaptured && (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                />
                
                {/* Visual alignment overlay */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  {activeStep === 'face' ? (
                    <div className="relative w-44 sm:w-56 h-64 sm:h-76 border-2 border-dashed border-[#d4af37] rounded-[48%] shadow-[0_0_25px_rgba(212,175,55,0.3)] flex flex-col items-center justify-between py-4">
                      <span className="text-[11px] font-sans tracking-wide text-white bg-black/80 px-2.5 py-0.5 rounded shadow">
                        Alinea el rostro de frente
                      </span>
                      <div className="w-full border-t border-[#d4af37]/40 my-auto" />
                      <span className="text-[10px] text-white bg-black/80 px-2.5 py-0.5 rounded shadow">
                        Mentón
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-48 sm:w-60 h-64 sm:h-80 border-2 border-dashed border-[#d4af37] rounded-2xl shadow-[0_0_25px_rgba(212,175,55,0.3)] flex flex-col items-center justify-between p-4">
                      <span className="text-[11px] font-sans tracking-wide text-white bg-black/80 px-2.5 py-0.5 rounded shadow">
                        Coloca la palma abierta ({selectedHand === 'left' ? 'Izquierda' : 'Derecha'})
                      </span>
                      <div className="w-full border-t border-[#d4af37]/40 my-auto" />
                      <span className="text-[10px] text-white bg-black/80 px-2.5 py-0.5 rounded shadow">
                        Base de la muñeca
                      </span>
                    </div>
                  )}
                </div>

                {/* Flip camera button */}
                <button
                  onClick={toggleFacingMode}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#191c28] p-2.5 rounded-full border border-[#ded5c5] shadow-lg transition-all cursor-pointer"
                  title="Cambiar entre cámara frontal y trasera"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Case B: Frame Captured */}
            {currentCaptured && (
              <div className="relative w-full h-full bg-[#f8f5ee]">
                <img
                  src={currentCaptured}
                  alt="Elemento analizado"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-white/95 border border-[#d4af37]/60 px-3 py-1 rounded-lg text-xs text-[#191c28] font-semibold flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Fotografía cargada en memoria local
                </div>
              </div>
            )}

            {/* Case C: Camera Inactive & No Photo */}
            {!isCameraActive && !currentCaptured && (
              <div className="text-center p-6 max-w-md bg-white">
                <div className="mx-auto w-14 h-14 rounded-full bg-[#fbf7ee] border border-[#ded5c5] flex items-center justify-center text-[#926d0a] mb-3 shadow-sm">
                  {activeStep === 'face' ? <ScanFace className="w-7 h-7" /> : <Hand className="w-7 h-7" />}
                </div>
                <h4 className="font-editorial text-xl font-bold text-[#171923]">
                  {activeStep === 'face' ? 'Preparado para el Rostro' : `Preparado para ${selectedHand === 'left' ? 'Mano Izquierda' : 'Mano Derecha'}`}
                </h4>
                <p className="text-xs text-[#4b5266] mt-1.5 mb-5 leading-relaxed font-medium">
                  Elige la forma más cómoda para ingresar tu imagen. Puedes usar la cámara del teléfono, activar la webcam, subir desde tu galería o usar la muestra instantánea.
                </p>

                {/* Main 4 Quick Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Native phone camera button */}
                    <button
                      onClick={() => mobileCameraRef.current?.click()}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                      title="Abre directamente la aplicación de cámara de tu teléfono móvil"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>FOTO CON CELULAR</span>
                    </button>

                    {/* Live WebRTC Camera */}
                    <button
                      onClick={startCamera}
                      disabled={isStartingCamera}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#191c28] bg-[#fbf7ee] hover:bg-[#f5ecda] border-2 border-[#b89028] rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                      title="Activar transmisión de webcam en vivo"
                    >
                      <Camera className="w-4 h-4 text-[#926d0a]" />
                      <span>{isStartingCamera ? 'Iniciando...' : 'ACTIVAR WEBCAM'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Upload from Gallery */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#1e2230] bg-white hover:bg-[#f6f2ea] border border-[#ded5c5] rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#4b5266]" />
                      <span>SUBIR DE GALERÍA</span>
                    </button>

                    {/* Immediate Demo Image */}
                    <button
                      onClick={loadDemoImage}
                      className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#8b6508] bg-white hover:bg-[#fdf9f0] border border-[#d4af37]/50 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#926d0a]" />
                      <span>MUESTRA INSTANTÁNEA</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Toolbar underneath the viewer */}
          <div className="w-full mt-4 flex flex-wrap items-center justify-between gap-3">
            {isCameraActive && !currentCaptured && (
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <button
                  onClick={captureFrame}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#0c0d12] bg-gradient-to-r from-[#d4af37] to-[#e2c15c] hover:brightness-105 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  {activeStep === 'face' ? 'CAPTURAR ROSTRO' : 'CAPTURAR MANO'}
                </button>
                <button
                  onClick={stopCamera}
                  className="px-3.5 py-2.5 text-xs font-medium text-[#4b5266] hover:text-[#191c28] rounded-xl border border-[#ded5c5] hover:bg-white transition-colors cursor-pointer"
                >
                  Detener cámara
                </button>
              </div>
            )}

            {currentCaptured && (
              <div className="flex flex-wrap items-center gap-2.5 w-full justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (activeStep === 'face') setCapturedFace(null);
                      else setCapturedHand(null);
                      startCamera();
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1e2230] hover:text-[#171923] border border-[#ded5c5] rounded-lg bg-white hover:bg-[#f6f2ea] transition-colors shadow-sm cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Tomar otra
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1e2230] hover:text-[#171923] border border-[#ded5c5] rounded-lg bg-white hover:bg-[#f6f2ea] transition-colors shadow-sm cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Cambiar archivo
                  </button>

                  <button
                    onClick={() => {
                      if (activeStep === 'face') setCapturedFace(null);
                      else setCapturedHand(null);
                    }}
                    className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar de memoria local"
                  >
                    Eliminar
                  </button>
                </div>

                <button
                  onClick={handleContinue}
                  className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-[#0c0d12] bg-[#d4af37] hover:bg-[#e2c15c] rounded-xl shadow-md transition-all active:scale-95 ml-auto cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  {analysisType === 'both' && activeStep === 'face'
                    ? 'Continuar a Captura de Mano'
                    : 'Procesar Análisis Tradicional'}
                </button>
              </div>
            )}

            {!isCameraActive && !currentCaptured && (
              <div className="flex items-center gap-2 text-xs text-[#525970] font-medium">
                <Shield className="w-3.5 h-3.5 text-[#926d0a]" />
                <span>Privacidad garantizada: procesamiento local sin subida a la nube.</span>
              </div>
            )}
          </div>

          {/* Hidden File Inputs */}
          {/* 1. Regular File Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileUpload}
          />
          {/* 2. Direct Mobile Phone Camera Trigger */}
          <input
            ref={mobileCameraRef}
            type="file"
            accept="image/*"
            capture={activeStep === 'face' ? 'user' : 'environment'}
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Error messages & quick recovery */}
          {cameraError && (
            <div className="w-full mt-3 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>{cameraError}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => mobileCameraRef.current?.click()}
                  className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded text-[11px] font-bold cursor-pointer"
                >
                  Foto Móvil
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded text-[11px] font-bold cursor-pointer"
                >
                  Subir Foto
                </button>
                <button
                  onClick={loadDemoImage}
                  className="px-2.5 py-1 bg-[#d4af37] hover:bg-[#e2c15c] text-[#0c0d12] rounded text-[11px] font-bold cursor-pointer"
                >
                  Muestra Demo
                </button>
              </div>
            </div>
          )}

          {fileError && (
            <div className="w-full mt-3 p-3 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{fileError}</span>
            </div>
          )}
        </div>

        {/* Right Column: Visual Capture Guide */}
        <div className="lg:col-span-4 bg-white border border-[#ded5c5] rounded-2xl p-5 text-[#3e4456] shadow-sm">
          <h3 className="font-editorial text-lg font-bold text-[#171923] mb-3 flex items-center gap-2">
            <span>Guía para una Captura Óptima</span>
          </h3>

          <div className="space-y-3 text-xs leading-relaxed font-medium">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>{activeStep === 'face' ? 'Rostro de frente' : 'Palma totalmente abierta'}</strong>: Evita inclinaciones pronunciadas.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Buena iluminación</strong>: Luz frontal suave y uniforme para apreciar los rasgos y líneas con claridad.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Sin elementos obstructivos</strong>: {activeStep === 'face' ? 'Retira gafas oscuras, sombreros o flequillos densos.' : 'Retira anillos grandes o pulseras que cubran la muñeca.'}
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Sin filtros cosméticos</strong>: Los filtros deforman las proporciones geométricas tradicionales.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Dispositivo estable</strong>: Sujeta el teléfono o cámara con firmeza para evitar imágenes borrosas.
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#ded5c5] bg-[#fbf7ee] p-3.5 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#926d0a] mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Compromiso de Privacidad</span>
            </div>
            <p className="text-[11px] text-[#525970] leading-normal font-normal">
              Esta aplicación no almacena automáticamente tus fotografías en bases de datos. Al cerrar o pulsar "Eliminar", tu material visual se purga de la memoria del navegador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
