/**
 * MIRADA ANCESTRAL AI - Configuración Global del Proyecto
 * Propietario: Gustavo Gómez
 * Copyright: © 2026 Gustavo Gómez — Todos los derechos reservados.
 * 
 * En este archivo el propietario puede ajustar la configuración de AdSense,
 * Google Analytics, correo de contacto y metadatos del sitio web.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  siteUrl: string;
  ownerName: string;
  owner: string;
  copyright: string;
  contactEmail: string;
  adsenseAccountEmail: string;
  
  // Publicidad y Monetización
  adsenseEnabled: boolean;
  adsenseClientId: string; // Ejemplo: 'ca-pub-XXXXXXXXXXXX'
  
  // Analítica Web
  analyticsEnabled: boolean;
  analyticsMeasurementId: string; // Ejemplo: 'G-XXXXXXXXXX'
  
  // Redes y Atribución
  authorUrl: string;
  canonicalDomain: string;
}

export const SITE_CONFIG: SiteConfig = {
  name: "MIRADA ANCESTRAL AI",
  shortName: "Mirada Ancestral",
  tagline: "Tradición milenaria. Tecnología moderna.",
  description: "Explora las tradiciones de interpretación del rostro y las manos mediante una experiencia digital moderna basada en inteligencia artificial, visión por computador y contenido educativo.",
  siteUrl: "https://mirada-ancestral-ai.ai.studio",
  ownerName: "Gustavo Gómez",
  owner: "Gustavo Gómez",
  copyright: "© 2026 Gustavo Gómez — Todos los derechos reservados.",
  
  // Correo de contacto directo para consultas y proyectos web
  contactEmail: "lukasluna816@gmail.com",
  adsenseAccountEmail: "gsordo@gmail.com",
  
  // CONFIGURACIÓN DE GOOGLE ADSENSE
  // Para activar: cambiar adsenseEnabled a true y reemplazar adsenseClientId con el ID provisto por Google.
  adsenseEnabled: false,
  adsenseClientId: "ca-pub-XXXXXXXXXXXX",
  
  // CONFIGURACIÓN DE ANALÍTICA WEB
  analyticsEnabled: false,
  analyticsMeasurementId: "",
  
  authorUrl: "https://mirada-ancestral-ai.ai.studio/sobre-nosotros",
  canonicalDomain: "https://mirada-ancestral-ai.ai.studio",
};

/**
 * Aviso legal canónico que debe acompañar todo informe descargable e interactivo
 */
export const MANDATORY_LEGAL_NOTICE = 
  "Este análisis visual e interactivo se fundamenta en principios culturales de la fisonomía oriental tradicional (Mian Xiang 面相) y de la quiromancia clásica. Constituye una herramienta educativa y de entretenimiento cultural. No representa una evaluación psicológica, científica, médica, psiquiátrica ni un diagnóstico biomédico. La ciencia médica contemporánea determina que los rasgos faciales y las líneas de la piel no predicen la personalidad, la salud futura ni el destino de una persona.";
