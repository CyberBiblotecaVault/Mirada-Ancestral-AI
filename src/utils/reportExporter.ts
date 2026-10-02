import { AnalysisReport } from '../types';

const STORAGE_KEY = 'mirada_ancestral_saved_reports_v1';

export function saveReportToStorage(report: AnalysisReport): boolean {
  try {
    const existing = getSavedReports();
    const updated = [report, ...existing.filter(r => r.id !== report.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error saving report to localStorage', err);
    return false;
  }
}

export function getSavedReports(): AnalysisReport[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteSavedReport(id: string): void {
  try {
    const existing = getSavedReports();
    const updated = existing.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting report', err);
  }
}

export function clearAllLocalData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing storage', err);
  }
}

/**
 * Generates an isolated, beautifully formatted printable HTML document
 * that prompts the user's browser to "Guardar como PDF" or Print via a hidden iframe,
 * avoiding popup-blockers and guaranteeing that photos of face and hands are 100% visible and sharp!
 */
export function generatePrintableReportHtml(report: AnalysisReport): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>Expediente PDF - ${escapeHtml(report.userName || 'Mirada Ancestral AI')}</title>
      <style>
        @page {
          size: A4;
          margin: 12mm 15mm 18mm 15mm;
        }
        body {
          font-family: 'Times New Roman', Georgia, serif;
          color: #1a1a1a;
          line-height: 1.45;
          margin: 0;
          padding: 15px;
          background: #ffffff;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #b8860b;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .header h1 {
          font-size: 22pt;
          margin: 0;
          letter-spacing: 2px;
          color: #111;
        }
        .header .subtitle {
          font-size: 11pt;
          color: #8b6508;
          font-style: italic;
          margin-top: 3px;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          background: #fbf9f5;
          border: 1px solid #dcd4c6;
          padding: 8px 12px;
          margin-bottom: 18px;
          font-size: 9.5pt;
        }
        .meta-item strong {
          display: block;
          font-size: 7.5pt;
          color: #666;
          text-transform: uppercase;
        }
        .photos-container {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .photo-card {
          border: 2px solid #b8860b;
          padding: 6px;
          background: #fbf9f5;
          text-align: center;
          width: 48%;
          max-width: 250px;
        }
        .photo-card img {
          width: 100%;
          height: 170px;
          object-fit: cover;
          display: block;
          margin-bottom: 6px;
          border: 1px solid #ccc;
        }
        .photo-card span {
          font-size: 8.5pt;
          font-weight: bold;
          color: #333;
        }
        .disclaimer {
          background: #fdfaf2;
          border-left: 4px solid #8b0000;
          border: 1px solid #d4af37;
          border-left-width: 4px;
          padding: 8px 12px;
          font-size: 8.5pt;
          margin-bottom: 18px;
          color: #444;
          line-height: 1.4;
        }
        .section-title {
          font-size: 13pt;
          color: #7a1f1d;
          border-bottom: 1px solid #d4af37;
          padding-bottom: 3px;
          margin-top: 20px;
          margin-bottom: 10px;
          page-break-after: avoid;
          font-weight: bold;
        }
        .dimension-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .dimension-box {
          border: 1px solid #dcd4c6;
          padding: 10px;
          background: #ffffff;
          page-break-inside: avoid;
          font-size: 9pt;
        }
        .dimension-title {
          font-size: 10.5pt;
          font-weight: bold;
          color: #111;
          margin-bottom: 3px;
        }
        .verdict-badge {
          display: inline-block;
          background: #e6f4ea;
          border: 1px solid #34a853;
          color: #137333;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 8pt;
          margin-bottom: 5px;
        }
        .question-line {
          font-size: 9pt;
          color: #1a1a1a;
          margin-bottom: 5px;
          font-weight: 600;
        }
        .direct-explanation {
          background: #f9f8f6;
          border-left: 3px solid #b8860b;
          padding: 5px 8px;
          margin: 5px 0;
          color: #222;
          font-size: 8.5pt;
        }
        .caveat-box {
          font-size: 7.5pt;
          color: #8b0000;
          background: #fff5f5;
          padding: 3px 5px;
          margin-top: 5px;
        }
        .footer {
          margin-top: 25px;
          padding-top: 12px;
          border-top: 1px solid #ccc;
          text-align: center;
          font-size: 8pt;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>MIRADA ANCESTRAL AI</h1>
        <div class="subtitle">Rostro • Manos • Tradición Oriental</div>
        <p style="font-size: 8.5pt; color: #666; margin: 3px 0 0 0;">"Descubre los símbolos que cuentan una historia." — Tradición milenaria. Tecnología moderna.</p>
      </div>

      <div class="meta-grid">
        <div class="meta-item">
          <strong>Consultante</strong>
          ${escapeHtml(report.userName || 'Viajero Cultural')}
        </div>
        <div class="meta-item">
          <strong>Fecha del Examen</strong>
          ${report.date}
        </div>
        <div class="meta-item">
          <strong>Modalidad</strong>
          ${report.analysisType.toUpperCase()}
        </div>
        <div class="meta-item">
          <strong>Elemento Wu Xing</strong>
          ${report.dominantElement}
        </div>
      </div>

      <!-- FOTOGRAFÍAS REALES DEL ANÁLISIS EN PDF -->
      ${(report.capturedFaceImage || report.capturedHandImage) ? `
        <div class="photos-container">
          ${report.capturedFaceImage ? `
            <div class="photo-card">
              <img src="${report.capturedFaceImage}" alt="Rostro analizado" />
              <span>Fotografía del Rostro (Mian Xiang)</span>
            </div>
          ` : ''}
          ${report.capturedHandImage ? `
            <div class="photo-card">
              <img src="${report.capturedHandImage}" alt="Mano analizada" />
              <span>Fotografía de la Palma (${report.selectedHand === 'left' ? 'Mano Izquierda' : 'Mano Derecha'})</span>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <div class="disclaimer">
        <strong>Aviso Cultural y Ético:</strong> Este informe recopila interpretaciones derivadas de la fisonomía tradicional china (Mian Xiang 面相) y la quiromancia clásica con fines exclusivamente culturales y de entretenimiento. No constituye evaluación médica, psicológica, financiera ni predictiva del futuro.
      </div>

      <div class="section-title">1. Resumen de la Geometría Simbólica y Tres Reinos (San Ting)</div>
      <p style="font-size: 9.5pt; line-height: 1.45; color: #333; margin: 4px 0;">${escapeHtml(report.generalSynthesis)}</p>
      <p style="font-size: 8.5pt; color: #555; margin: 4px 0;">${escapeHtml(report.elementDescription)}</p>

      <div class="section-title">2. Respuestas y Veredictos Tradicionales Directos (Amor, Hijos, Dinero y Trabajo)</div>
      <div class="dimension-grid">
        ${report.dimensions.map(dim => `
          <div class="dimension-box">
            <div class="dimension-title">${escapeHtml(dim.title)}</div>
            <div class="question-line"><strong>Pregunta:</strong> ${escapeHtml(dim.question || dim.title)}</div>
            <div>
              <span class="verdict-badge">${escapeHtml(dim.directVerdict || 'SÍ')}</span>
              <strong style="font-size: 8.5pt; color: #333;">${escapeHtml(dim.verdictLabel || '')}</strong>
            </div>
            <div class="direct-explanation">
              <strong>Explicación Directa:</strong> ${escapeHtml(dim.directExplanation || dim.traditionalInterpretation)}
            </div>
            ${dim.advice ? `<div style="font-size: 8pt; color: #555; margin-top: 3px;"><strong>Consejo Tradicional:</strong> ${escapeHtml(dim.advice)}</div>` : ''}
            <div class="caveat-box">
              <strong>Salvedad:</strong> ${escapeHtml(dim.culturalCaveat)}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="section-title">3. Conclusiones y Filosofía de Vida</div>
      <p style="font-size: 8.5pt; color: #444; line-height: 1.45; margin: 4px 0;">
        El canon tradicional de Mian Xiang sostiene: <em>"La mente engendra la apariencia; transformando la mente, el semblante se armoniza"</em>. Las facciones y líneas de la mano representan tendencias y potenciales alegóricos, nunca sentencias inamovibles. El porvenir se edifica mediante actos éticos, formación constante y fraternidad.
      </p>

      <div class="footer">
        <p style="margin: 3px 0;"><strong>MIRADA ANCESTRAL AI</strong> · Proyecto independiente desarrollado por Gustavo Gómez.</p>
        <p style="margin: 3px 0;">Contacto de Desarrollo Web y Consultas: <strong style="color: #b8860b;">lukasluna816@gmail.com</strong> · Apoyo voluntario PayPal: <strong>@gsordo12</strong></p>
        <p style="margin: 3px 0;">© 2026 Gustavo Gómez & Mirada Ancestral AI. Todos los derechos reservados. Código de auditoría: MA-${report.id.replace('rep-', '')}</p>
      </div>
    </body>
    </html>
  `;
}

export function exportToPrintablePdf(report: AnalysisReport): void {
  const html = generatePrintableReportHtml(report);

  // Use hidden iframe printing method to bypass popup blocker restrictions in iframes
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          console.warn('Iframe print error, falling back to direct download', e);
          downloadHtmlReport(report);
        } finally {
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 4000);
        }
      }, 500);
      return;
    }
  } catch (err) {
    console.warn('Could not inject into iframe for print, falling back to download', err);
  }

  // Fallback: direct download of the standalone HTML/PDF file
  downloadHtmlReport(report);
}

export function downloadHtmlReport(report: AnalysisReport): void {
  const html = generatePrintableReportHtml(report);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = (report.userName || 'consultante').replace(/[^a-zA-Z0-9_-]/g, '_');
  a.download = `Mirada_Ancestral_Informe_${safeName}_${report.analysisType}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToWordDoc(report: AnalysisReport): void {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Informe Tradicional - Mirada Ancestral AI</title>
      <style>
        body {
          font-family: 'Times New Roman', Georgia, serif;
          line-height: 1.6;
          color: #222;
          padding: 30px;
        }
        .header-box {
          text-align: center;
          border-bottom: 2px solid #b8860b;
          padding-bottom: 15px;
          margin-bottom: 25px;
        }
        h1 {
          font-size: 24pt;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: 2px;
        }
        .subtitle {
          font-size: 12pt;
          color: #8b6508;
          font-style: italic;
          margin-top: 4px;
        }
        .meta-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          background: #faf8f5;
        }
        .meta-table td {
          padding: 8px 12px;
          border: 1px solid #dcd4c6;
          font-size: 10pt;
        }
        .disclaimer-box {
          background-color: #fdfaf2;
          border: 1px solid #d4af37;
          border-left: 5px solid #8b0000;
          padding: 12px 16px;
          font-size: 9.5pt;
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 14pt;
          color: #7a1f1d;
          border-bottom: 1px solid #d4af37;
          padding-bottom: 4px;
          margin-top: 25px;
          margin-bottom: 12px;
        }
        .dimension-card {
          margin-bottom: 18px;
          border: 1px solid #e2dacd;
          padding: 12px;
          background: #ffffff;
        }
        .dimension-title {
          font-size: 11pt;
          font-weight: bold;
          color: #1c1917;
          margin-bottom: 4px;
        }
        .verdict-line {
          color: #15803d;
          font-weight: bold;
          font-size: 10pt;
          margin-bottom: 6px;
        }
        .direct-explanation {
          background: #f7f5f0;
          padding: 8px 10px;
          border-left: 3px solid #b8860b;
          margin: 6px 0;
          font-size: 9.5pt;
        }
        .caveat-text {
          font-size: 8.5pt;
          color: #7f1d1d;
          background: #fef2f2;
          padding: 6px;
          border-left: 3px solid #b91c1c;
          margin-top: 6px;
        }
        .footer {
          margin-top: 35px;
          text-align: center;
          font-size: 8.5pt;
          color: #777;
          border-top: 1px solid #ddd;
          padding-top: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header-box">
        <h1>MIRADA ANCESTRAL AI</h1>
        <div class="subtitle">Rostro • Manos • Tradición Oriental</div>
        <p style="margin-top: 6px; font-size: 9pt; color: #555;">"Descubre los símbolos que cuentan una historia." — Tradición milenaria. Tecnología moderna.</p>
      </div>

      <table class="meta-table">
        <tr>
          <td><strong>Consultante:</strong> ${escapeHtml(report.userName || 'Viajero Cultural')}</td>
          <td><strong>Fecha del Informe:</strong> ${report.date}</td>
        </tr>
        <tr>
          <td><strong>Tipo de Análisis:</strong> ${report.analysisType.toUpperCase()}</td>
          <td><strong>Elemento Afín Tradicional:</strong> ${report.dominantElement}</td>
        </tr>
      </table>

      <!-- FOTOGRAFÍAS ANALIZADAS -->
      ${(report.capturedFaceImage || report.capturedHandImage) ? `
        <table style="width: 100%; margin-bottom: 20px;">
          <tr>
            ${report.capturedFaceImage ? `
              <td style="text-align: center; padding: 10px;">
                <img src="${report.capturedFaceImage}" width="220" style="border: 2px solid #b8860b;" />
                <div style="font-size: 9pt; margin-top: 4px; font-weight: bold;">Fotografía del Rostro (Mian Xiang)</div>
              </td>
            ` : ''}
            ${report.capturedHandImage ? `
              <td style="text-align: center; padding: 10px;">
                <img src="${report.capturedHandImage}" width="220" style="border: 2px solid #b8860b;" />
                <div style="font-size: 9pt; margin-top: 4px; font-weight: bold;">Fotografía de la Mano (${report.selectedHand === 'left' ? 'Izquierda' : 'Derecha'})</div>
              </td>
            ` : ''}
          </tr>
        </table>
      ` : ''}

      <div class="disclaimer-box">
        <strong>AVISO ÉTICO Y CULTURAL FUNDAMENTAL:</strong><br/>
        Este documento recopila interpretaciones derivadas de tratados tradicionales orientales (Mian Xiang 面相 y Quiromancia clásica) con fines puramente culturales, educativos y de entretenimiento. No constituye ni sustituye diagnósticos médicos, evaluaciones psicológicas, científicas, legales, laborales ni predicciones verificables del destino.
      </div>

      <h2 class="section-title">1. Resumen de la Geometría Simbólica</h2>
      <p style="font-size: 10pt;">${escapeHtml(report.generalSynthesis)}</p>
      <p style="font-size: 9pt; color: #555;">${escapeHtml(report.elementDescription)}</p>
      
      <table class="meta-table">
        <tr>
          <td><strong>Shang Ting (Cielo / Juventud):</strong> ${report.sanTingProportions.cielo}%</td>
          <td><strong>Zhong Ting (Hombre / Madurez):</strong> ${report.sanTingProportions.hombre}%</td>
          <td><strong>Xia Ting (Tierra / Cosecha):</strong> ${report.sanTingProportions.tierra}%</td>
        </tr>
      </table>

      <h2 class="section-title">2. Respuestas Claras y Veredictos Tradicionales (Hijos, Dinero, Amor, Trabajo)</h2>
      ${report.dimensions.map(dim => `
        <div class="dimension-card">
          <div class="dimension-title">${escapeHtml(dim.title)} [Tono: ${dim.energyTone}]</div>
          <div style="font-size: 9.5pt; color: #111; margin-bottom: 4px;"><strong>Pregunta Directa:</strong> ${escapeHtml(dim.question || dim.title)}</div>
          <div class="verdict-line">Veredicto Tradicional: [${escapeHtml(dim.directVerdict || 'SÍ')}] ${escapeHtml(dim.verdictLabel || '')}</div>
          <div class="direct-explanation">
            <strong>Explicación Clara:</strong> ${escapeHtml(dim.directExplanation || dim.traditionalInterpretation)}
          </div>
          <div style="font-size: 9pt; color: #444; margin-top: 4px;"><strong>Fundamento Clásico:</strong> ${escapeHtml(dim.traditionalInterpretation)}</div>
          ${dim.advice ? `<div style="font-size: 9pt; color: #2e5939; margin-top: 4px;"><strong>Consejo Tradicional:</strong> ${escapeHtml(dim.advice)}</div>` : ''}
          <div class="caveat-text"><strong>Salvedad Cultural:</strong> ${escapeHtml(dim.culturalCaveat)}</div>
        </div>
      `).join('')}

      <h2 class="section-title">3. Conclusiones y Reflexión Final</h2>
      <p style="font-size: 9.5pt;">
        En la filosofía tradicional china, el rostro y las manos nunca se concibieron como prisiones del destino, sino como espejos para el cultivo de la virtud (De 德). La sabiduría ancestral afirma: <em>"Transformando la mente, el semblante se armoniza"</em>. La libertad del ser humano para construir su camino con rectitud y compasión prevalece por encima de cualquier símbolo.
      </p>

      <div class="footer">
        <p><strong>MIRADA ANCESTRAL AI</strong> — Tradición milenaria. Tecnología moderna.</p>
        <p>Contacto de Desarrollo Web y Consultas: <strong style="color: #8b6508;">lukasluna816@gmail.com</strong> · Donación PayPal: <strong>@gsordo12</strong></p>
        <p>© 2026 Gustavo Gómez & Mirada Ancestral AI. Todos los derechos reservados. Proyecto independiente.</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], {
    type: 'application/msword'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Mirada_Ancestral_${(report.userName || 'Informe').replace(/\s+/g, '_')}_${Date.now()}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
