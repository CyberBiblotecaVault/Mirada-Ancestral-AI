import { SupportedLanguage } from '../types';

export const TRANSLATIONS: Record<SupportedLanguage, {
  name: string;
  flag: string;
  langCode: string;
  nav: {
    home: string;
    face: string;
    hands: string;
    tradition: string;
    reports: string;
    transparency: string;
    donate: string;
    contact: string;
    accessibility: string;
    start: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    btnFace: string;
    btnHands: string;
    btnUpload: string;
    btnTradition: string;
    btnReports: string;
    freeTitle: string;
    noSub: string;
    noCard: string;
    noTrial: string;
    noPay: string;
  };
  disclaimer: {
    badge: string;
    title: string;
    text: string;
    btnAccept: string;
    btnCancel: string;
  };
  accessibility: {
    title: string;
    fontSize: string;
    normal: string;
    large: string;
    xlarge: string;
    contrast: string;
    highContrast: string;
    voiceReader: string;
    readAloud: string;
    stopReading: string;
    speed: string;
  };
  theme: {
    light: string;
    dark: string;
    auto: string;
    autoDesc: string;
  };
  donate: {
    title: string;
    subtitle: string;
    paypalUser: string;
    btnPaypal: string;
    copyUser: string;
    userCopied: string;
    description: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    copyEmail: string;
    emailCopied: string;
    cta: string;
  };
  results: {
    badge: string;
    title: string;
    downloadPdf: string;
    downloadWord: string;
    saveReport: string;
    clearResult: string;
    deletePhotos: string;
    keyQuestion: string;
    traditionalVerdict: string;
    clearExplanation: string;
    traditionalBasis: string;
    advice: string;
    caveat: string;
  };
}> = {
  es: {
    name: 'Español',
    flag: '🇪🇸',
    langCode: 'es-ES',
    nav: {
      home: 'Inicio',
      face: 'Rostro (Mian Xiang)',
      hands: 'Manos (Quiromancia)',
      tradition: 'Tradición y Sabiduría',
      reports: 'Mis Informes',
      transparency: 'Transparencia',
      donate: 'Donar PayPal',
      contact: 'Contacto',
      accessibility: 'Accesibilidad',
      start: 'Comenzar'
    },
    hero: {
      title: 'MIRADA ANCESTRAL AI',
      subtitle: 'Explora las antiguas tradiciones de interpretación del rostro y las manos',
      description: 'Una experiencia digital inspirada en tradiciones orientales de fisonomía y quiromancia. Utiliza tu cámara o una fotografía para explorar símbolos y conceptos tradicionales.',
      btnFace: 'ANALIZAR MI ROSTRO',
      btnHands: 'ANALIZAR MIS MANOS',
      btnUpload: 'SUBIR FOTOGRAFÍA',
      btnTradition: 'APRENDER SOBRE LA TRADICIÓN',
      btnReports: 'VER MIS INFORMES',
      freeTitle: '100% GRATIS',
      noSub: 'Sin suscripción',
      noCard: 'Sin tarjeta',
      noTrial: 'Sin prueba limitada',
      noPay: 'Sin pago obligatorio'
    },
    disclaimer: {
      badge: 'Marco Ético y Cultural',
      title: 'Aviso Importante',
      text: 'Esta aplicación presenta interpretaciones tradicionales de fisonomía y quiromancia con fines culturales y de entretenimiento. Las interpretaciones no constituyen diagnósticos médicos, psicológicos, científicos, financieros ni predicciones verificables del futuro.',
      btnAccept: 'ENTENDIDO — COMENZAR',
      btnCancel: 'Volver'
    },
    accessibility: {
      title: 'Accesibilidad e Inclusión',
      fontSize: 'Tamaño de Texto',
      normal: 'Normal',
      large: 'Grande',
      xlarge: 'Muy Grande',
      contrast: 'Contraste Visual',
      highContrast: 'Alto Contraste',
      voiceReader: 'Lector de Voz (Voz Alta)',
      readAloud: 'Escuchar en Voz Alta',
      stopReading: 'Detener Voz',
      speed: 'Velocidad de Lectura'
    },
    theme: {
      light: 'Modo Día (Claro)',
      dark: 'Modo Noche (Oscuro)',
      auto: 'Automático por Horario',
      autoDesc: 'Claro de 6:00 AM a 6:00 PM, Oscuro de 6:00 PM a 6:00 AM'
    },
    donate: {
      title: 'Apoyar el Proyecto',
      subtitle: 'Contribuye libremente al mantenimiento de Mirada Ancestral AI',
      paypalUser: '@gsordo12',
      btnPaypal: 'Donar con PayPal (@gsordo12)',
      copyUser: 'Copiar usuario PayPal',
      userCopied: '¡Usuario copiado al portapapeles!',
      description: 'Tu aporte voluntario permite mantener esta plataforma gratuita, accesible y sin anuncios molestos.'
    },
    contact: {
      title: 'Contacto y Desarrollo Web',
      subtitle: '¿Te interesa esta página web o tienes alguna consulta?',
      email: 'lukasluna816@gmail.com',
      copyEmail: 'Copiar correo',
      emailCopied: '¡Correo copiado al portapapeles!',
      cta: 'Escríbeme para proyectos, colaboraciones o preguntas sobre la plataforma.'
    },
    results: {
      badge: 'Análisis Concluido · Respuestas Claras',
      title: 'Tu Informe Tradicional Personalizado',
      downloadPdf: 'DESCARGAR PDF CON FOTOS',
      downloadWord: 'DESCARGAR WORD (.DOC)',
      saveReport: 'Guardar Informe',
      clearResult: 'Borrar resultado',
      deletePhotos: 'Eliminar fotografía',
      keyQuestion: 'Pregunta Clave:',
      traditionalVerdict: 'Veredicto Tradicional:',
      clearExplanation: 'Explicación Clara y Directa:',
      traditionalBasis: 'Fundamento tradicional:',
      advice: 'Consejo oriental:',
      caveat: 'Salvedad Cultural:'
    }
  },
  en: {
    name: 'English',
    flag: '🇬🇧',
    langCode: 'en-US',
    nav: {
      home: 'Home',
      face: 'Face (Mian Xiang)',
      hands: 'Hands (Palmistry)',
      tradition: 'Tradition & Wisdom',
      reports: 'My Reports',
      transparency: 'Transparency',
      donate: 'Donate PayPal',
      contact: 'Contact',
      accessibility: 'Accessibility',
      start: 'Get Started'
    },
    hero: {
      title: 'MIRADA ANCESTRAL AI',
      subtitle: 'Explore ancient traditions of facial and hand interpretation',
      description: 'A digital experience inspired by Eastern traditions of physiognomy and palmistry. Use your camera or upload a photo to explore traditional symbols and timeless concepts.',
      btnFace: 'ANALYZE MY FACE',
      btnHands: 'ANALYZE MY HANDS',
      btnUpload: 'UPLOAD PHOTO',
      btnTradition: 'LEARN THE TRADITION',
      btnReports: 'VIEW MY REPORTS',
      freeTitle: '100% FREE',
      noSub: 'No subscription',
      noCard: 'No credit card',
      noTrial: 'No limited trial',
      noPay: 'No required payment'
    },
    disclaimer: {
      badge: 'Ethical & Cultural Framework',
      title: 'Important Notice',
      text: 'This application presents traditional interpretations of physiognomy and palmistry for cultural and entertainment purposes. Interpretations do not constitute medical, psychological, scientific, or financial evaluations nor verifiable predictions of the future.',
      btnAccept: 'UNDERSTOOD — PROCEED',
      btnCancel: 'Go Back'
    },
    accessibility: {
      title: 'Accessibility & Inclusion',
      fontSize: 'Text Size',
      normal: 'Normal',
      large: 'Large',
      xlarge: 'Extra Large',
      contrast: 'Visual Contrast',
      highContrast: 'High Contrast',
      voiceReader: 'Voice Narrator (Read Aloud)',
      readAloud: 'Read Aloud',
      stopReading: 'Stop Voice',
      speed: 'Reading Speed'
    },
    theme: {
      light: 'Day Mode (Light)',
      dark: 'Night Mode (Dark)',
      auto: 'Automatic Schedule',
      autoDesc: 'Light from 6:00 AM to 6:00 PM, Dark from 6:00 PM to 6:00 AM'
    },
    donate: {
      title: 'Support the Project',
      subtitle: 'Contribute freely to keep Mirada Ancestral AI alive and accessible',
      paypalUser: '@gsordo12',
      btnPaypal: 'Donate with PayPal (@gsordo12)',
      copyUser: 'Copy PayPal handle',
      userCopied: 'Handle copied to clipboard!',
      description: 'Your voluntary donation keeps this platform 100% free, accessible, and independent.'
    },
    contact: {
      title: 'Contact & Web Inquiries',
      subtitle: 'Interested in this website or have questions?',
      email: 'lukasluna816@gmail.com',
      copyEmail: 'Copy Email',
      emailCopied: 'Email copied to clipboard!',
      cta: 'Contact me for web development projects, custom apps, or questions.'
    },
    results: {
      badge: 'Analysis Complete · Clear Answers',
      title: 'Your Personalized Traditional Report',
      downloadPdf: 'DOWNLOAD PDF WITH PHOTOS',
      downloadWord: 'DOWNLOAD WORD (.DOC)',
      saveReport: 'Save Report',
      clearResult: 'Clear result',
      deletePhotos: 'Delete photo',
      keyQuestion: 'Key Question:',
      traditionalVerdict: 'Traditional Verdict:',
      clearExplanation: 'Direct & Clear Explanation:',
      traditionalBasis: 'Traditional basis:',
      advice: 'Eastern advice:',
      caveat: 'Cultural Caveat:'
    }
  },
  fr: {
    name: 'Français',
    flag: '🇫🇷',
    langCode: 'fr-FR',
    nav: {
      home: 'Accueil',
      face: 'Visage (Mian Xiang)',
      hands: 'Mains (Chiromancie)',
      tradition: 'Tradition & Sagesse',
      reports: 'Mes Rapports',
      transparency: 'Transparence',
      donate: 'Donner PayPal',
      contact: 'Contact',
      accessibility: 'Accessibilité',
      start: 'Commencer'
    },
    hero: {
      title: 'MIRADA ANCESTRAL AI',
      subtitle: 'Explorez les anciennes traditions d’interprétation du visage et des mains',
      description: 'Une expérience numérique inspirée des traditions orientales de physiognomonie et de chiromancie. Utilisez votre caméra ou une photo pour explorer des symboles ancestraux.',
      btnFace: 'ANALYSER MON VISAGE',
      btnHands: 'ANALYSER MES MAINS',
      btnUpload: 'TÉLÉVERSER UNE PHOTO',
      btnTradition: 'APPRENDRE LA TRADITION',
      btnReports: 'VOIR MES RAPPORTS',
      freeTitle: '100% GRATUIT',
      noSub: 'Sans abonnement',
      noCard: 'Sans carte bancaire',
      noTrial: 'Sans essai limité',
      noPay: 'Sans paiement obligatoire'
    },
    disclaimer: {
      badge: 'Cadre Éthique et Culturel',
      title: 'Avis Important',
      text: 'Cette application présente des interprétations traditionnelles de physiognomonie et de chiromancie à des fins culturelles et de divertissement. Elles ne constituent ni diagnostics médicaux ni prédictions scientifiques.',
      btnAccept: 'COMPRIS — COMMENCER',
      btnCancel: 'Retour'
    },
    accessibility: {
      title: 'Accessibilité et Inclusion',
      fontSize: 'Taille du texte',
      normal: 'Normale',
      large: 'Grande',
      xlarge: 'Très Grande',
      contrast: 'Contraste Visuel',
      highContrast: 'Haut Contraste',
      voiceReader: 'Lecture Vocale',
      readAloud: 'Écouter à Voix Haute',
      stopReading: 'Arrêter la Voix',
      speed: 'Vitesse de Lecture'
    },
    theme: {
      light: 'Mode Jour (Clair)',
      dark: 'Mode Nuit (Sombre)',
      auto: 'Automatique par Heure',
      autoDesc: 'Clair de 6h à 18h, Sombre de 18h à 6h'
    },
    donate: {
      title: 'Soutenir le Projet',
      subtitle: 'Contribuez librement à Mirada Ancestral AI',
      paypalUser: '@gsordo12',
      btnPaypal: 'Donner via PayPal (@gsordo12)',
      copyUser: 'Copier identifiant',
      userCopied: 'Identifiant copié !',
      description: 'Votre soutien volontaire permet de garder cette application gratuite et accessible à tous.'
    },
    contact: {
      title: 'Contact et Développement Web',
      subtitle: 'Intéressé par ce site web ou une question ?',
      email: 'lukasluna816@gmail.com',
      copyEmail: 'Copier le courriel',
      emailCopied: 'Courriel copié !',
      cta: 'Contactez-moi pour des projets web ou toute question.'
    },
    results: {
      badge: 'Analyse Conclue · Réponses Claires',
      title: 'Votre Rapport Traditionnel Personnalisé',
      downloadPdf: 'TÉLÉCHARGER PDF AVEC PHOTOS',
      downloadWord: 'TÉLÉCHARGER WORD (.DOC)',
      saveReport: 'Sauvegarder le rapport',
      clearResult: 'Effacer le résultat',
      deletePhotos: 'Supprimer la photo',
      keyQuestion: 'Question Clé :',
      traditionalVerdict: 'Verdict Traditionnel :',
      clearExplanation: 'Explication Claire et Directe :',
      traditionalBasis: 'Fondement traditionnel :',
      advice: 'Conseil oriental :',
      caveat: 'Avertissement Culturel :'
    }
  },
  pt: {
    name: 'Português',
    flag: '🇵🇹',
    langCode: 'pt-BR',
    nav: {
      home: 'Início',
      face: 'Rosto (Mian Xiang)',
      hands: 'Mãos (Quiromancia)',
      tradition: 'Tradição e Sabedoria',
      reports: 'Meus Relatórios',
      transparency: 'Transparência',
      donate: 'Doar PayPal',
      contact: 'Contato',
      accessibility: 'Acessibilidade',
      start: 'Começar'
    },
    hero: {
      title: 'MIRADA ANCESTRAL AI',
      subtitle: 'Explore as antigas tradições de interpretação do rosto e das mãos',
      description: 'Uma experiência digital inspirada em tradições orientais de fisionomia e quiromancia. Use sua câmera ou uma foto para explorar símbolos e conceitos tradicionais.',
      btnFace: 'ANALISAR MEU ROSTO',
      btnHands: 'ANALISAR MINHAS MÃOS',
      btnUpload: 'ENVIAR FOTOGRAFIA',
      btnTradition: 'APRENDER A TRADIÇÃO',
      btnReports: 'VER MEUS RELATÓRIOS',
      freeTitle: '100% GRÁTIS',
      noSub: 'Sem assinatura',
      noCard: 'Sem cartão',
      noTrial: 'Sem teste limitado',
      noPay: 'Sem pagamento obrigatório'
    },
    disclaimer: {
      badge: 'Marco Ético e Cultural',
      title: 'Aviso Importante',
      text: 'Este aplicativo apresenta interpretações tradicionais de fisionomia e quiromancia para fins culturais e de entretenimento. Não constituem diagnósticos médicos nem previsões científicas.',
      btnAccept: 'ENTENDIDO — COMEÇAR',
      btnCancel: 'Voltar'
    },
    accessibility: {
      title: 'Acessibilidade e Inclusão',
      fontSize: 'Tamanho do Texto',
      normal: 'Normal',
      large: 'Grande',
      xlarge: 'Muito Grande',
      contrast: 'Contraste Visual',
      highContrast: 'Alto Contraste',
      voiceReader: 'Leitor de Voz (Ouvir)',
      readAloud: 'Ouvir em Voz Alta',
      stopReading: 'Parar Leitura',
      speed: 'Velocidade'
    },
    theme: {
      light: 'Modo Dia (Claro)',
      dark: 'Modo Noite (Escuro)',
      auto: 'Automático por Horário',
      autoDesc: 'Claro das 6h às 18h, Escuro das 18h às 6h'
    },
    donate: {
      title: 'Apoiar o Projeto',
      subtitle: 'Contribua livremente para a Mirada Ancestral AI',
      paypalUser: '@gsordo12',
      btnPaypal: 'Doar com PayPal (@gsordo12)',
      copyUser: 'Copiar usuário',
      userCopied: 'Usuário copiado!',
      description: 'Sua contribuição voluntária ajuda a manter a plataforma gratuita e acessível.'
    },
    contact: {
      title: 'Contato e Desenvolvimento Web',
      subtitle: 'Interessado neste site ou tem alguma dúvida?',
      email: 'lukasluna816@gmail.com',
      copyEmail: 'Copiar e-mail',
      emailCopied: 'E-mail copiado!',
      cta: 'Escreva para projetos de desenvolvimento web ou dúvidas.'
    },
    results: {
      badge: 'Análise Concluída · Respostas Claras',
      title: 'Seu Relatório Tradicional Personalizado',
      downloadPdf: 'BAIXAR PDF COM FOTOS',
      downloadWord: 'BAIXAR WORD (.DOC)',
      saveReport: 'Salvar Relatório',
      clearResult: 'Limpar resultado',
      deletePhotos: 'Excluir foto',
      keyQuestion: 'Pergunta-chave:',
      traditionalVerdict: 'Veredito Tradicional:',
      clearExplanation: 'Explicação Clara e Direta:',
      traditionalBasis: 'Fundamento tradicional:',
      advice: 'Conselho oriental:',
      caveat: 'Ressalva Cultural:'
    }
  },
  zh: {
    name: '中文 (Chinese)',
    flag: '🇨🇳',
    langCode: 'zh-CN',
    nav: {
      home: '首页',
      face: '面相研析',
      hands: '手相研析',
      tradition: '东方传统与智慧',
      reports: '我的研析报告',
      transparency: '透明度',
      donate: 'PayPal 赞助',
      contact: '联系我们',
      accessibility: '无障碍辅助',
      start: '立即体验'
    },
    hero: {
      title: 'MIRADA ANCESTRAL AI (面相与手相)',
      subtitle: '探索中华传统面相学 (面相) 与东方手相学的古老象征',
      description: '基于中国古代传统《神相全编》及东方手相体系的文化体验。通过您的摄像头或照片，探索三停五行与生命纹理的象征意义。',
      btnFace: '分析我的面相',
      btnHands: '分析我的手相',
      btnUpload: '上传照片',
      btnTradition: '研读相学传统',
      btnReports: '查看历史报告',
      freeTitle: '100% 免费体验',
      noSub: '无订阅',
      noCard: '无须信用卡',
      noTrial: '无限制期',
      noPay: '无强制收费'
    },
    disclaimer: {
      badge: '文化与伦理规范',
      title: '文化与娱乐声明',
      text: '本应用展示中华传统面相学与传统手相学的文化解读，仅用于文化鉴赏与娱乐体验。此解读绝不构成医学诊断、心理评测、科学证据或命运宿命论。',
      btnAccept: '明白理解 — 立即开始',
      btnCancel: '返回'
    },
    accessibility: {
      title: '无障碍关怀与辅助',
      fontSize: '字体大小',
      normal: '标准',
      large: '大字号',
      xlarge: '超大字号',
      contrast: '视觉对比度',
      highContrast: '高对比度',
      voiceReader: '语音播报 (朗读)',
      readAloud: '语音朗读解读',
      stopReading: '停止播报',
      speed: '语速调节'
    },
    theme: {
      light: '日间模式 (浅色)',
      dark: '夜间模式 (深色)',
      auto: '按时段自动切换',
      autoDesc: '早6:00至晚18:00为浅色，晚18:00至早6:00为深色'
    },
    donate: {
      title: '支持此项目',
      subtitle: '自愿赞助 Mirada Ancestral AI 的维护与开发',
      paypalUser: '@gsordo12',
      btnPaypal: '通过 PayPal 赞助 (@gsordo12)',
      copyUser: '复制 PayPal 账号',
      userCopied: '账号已复制到剪贴板！',
      description: '您的支持能帮助我们持续为所有人提供免费、无广告且无障碍的优质文化体验。'
    },
    contact: {
      title: '联系与网站开发',
      subtitle: '对此网站感兴趣或有任何咨询？',
      email: 'lukasluna816@gmail.com',
      copyEmail: '复制邮箱',
      emailCopied: '邮箱已复制到剪贴板！',
      cta: '如有网页定制、合作或疑问，请随时联系我。'
    },
    results: {
      badge: '分析完成 · 明确解读',
      title: '您的个性化传统研析报告',
      downloadPdf: '下载包含照片的完整 PDF',
      downloadWord: '下载 Word (.doc) 报告',
      saveReport: '保存报告',
      clearResult: '清除当前结果',
      deletePhotos: '删除本地照片',
      keyQuestion: '核心关注：',
      traditionalVerdict: '传统指引判定：',
      clearExplanation: '清晰直接阐释：',
      traditionalBasis: '传统古籍依据：',
      advice: '东方修养建议：',
      caveat: '文化与科学声明：'
    }
  }
};

/**
 * Text-to-Speech Helper supporting multi-language narration
 */
class SpeechNarrator {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  speak(text: string, lang: SupportedLanguage, speed = 1.0, onEnd?: () => void) {
    if (!this.synth) return;
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    const langCode = TRANSLATIONS[lang]?.langCode || 'es-ES';
    utterance.lang = langCode;
    utterance.rate = speed;

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.currentUtterance = null;
  }

  isSpeaking(): boolean {
    return !!this.synth?.speaking;
  }
}

export const speechNarrator = new SpeechNarrator();
