// Listas maestras — replicadas de la hoja "⚙️ Listas" de plantilla_contenido_PRO.xlsx
const LISTS = {
  redes: ['📱 Instagram','▶️ YouTube','🎵 TikTok','👤 Facebook','💼 LinkedIn','🐦 Twitter/X','✍️ Blog','🎙️ Podcast','📌 Pinterest','📸 Snapchat','🌐 Otro'],
  formatos: ['🎬 Reels / Video corto','🎞️ Video largo','🖼️ Carrusel','📸 Imagen estática','📖 Historia / Story','✍️ Post de texto','🎙️ Episodio podcast','📝 Blog / Artículo','📊 Infografía','🔴 Live / Directo','🎠 Slideshow','🤳 Selfie / Behind scenes'],
  prioridad: ['🔴 Alta — publicar ya','🟡 Media — esta semana','🟢 Baja — sin urgencia','⚫ En pausa'],
  categoriaEstado: ['💡 Idea anotada','🔍 Investigando','📝 En redacción','🎬 En producción','✏️ En revisión','✅ Publicado','📅 Programado','❌ Descartado','🔁 Reutilizar'],
  objetivo: ['🎯 Alcance / Nuevas personas','❤️ Engagement / Comunidad','🛒 Conversión / Ventas','🤝 Fidelización / Retención','🎓 Educación / Valor','😂 Entretenimiento','💡 Inspiración / Motivación','🏷️ Branding / Posicionamiento'],
  categoria: ['📚 Educativo','🎭 Entretenimiento','💼 Profesional / Corporativo','🌱 Personal / Lifestyle','🛍️ Promocional','🗣️ Testimonios','🔧 Tutorial / Cómo hacer','❓ Preguntas frecuentes','📰 Noticias / Tendencias','🤝 Colaboración','🎁 Concurso / Sorteo'],
  estadoPublicacion: ['✅ Sí, publicado 🎉','⏳ Pendiente','🕐 Programado','❌ No publicado','🔁 Reprogramado','✅ Publicado'],
  nivel: ['🔰 Principiante','📈 Intermedio','🏆 Avanzado'],
  tendencia: ['🟢 En crecimiento','🟡 Estable','🔴 Bajando','⚫ Sin datos'],
  tipoMedia: ['📸 Solo foto','📹 Video','🎙️ Audio','✍️ Solo texto','🎨 Diseño gráfico','🤖 IA generativa','📊 Datos / Estadísticas','🤳 Original propio'],
  horario: ['🌅 Mañana (6-9h)','☀️ Mediodía (12-14h)','🌆 Tarde (17-19h)','🌙 Noche (20-22h)','🕰️ Madrugada'],
  dispositivo: ['📱 Móvil','💻 Computador','🎥 Cámara profesional','📷 DSLR','🎤 Micrófono externo','✏️ Manual/Escrito'],
  herramienta: ['CapCut','Canva','Adobe Premiere','DaVinci Resolve','InShot','Notion','Later','Hootsuite','Metricool','ChatGPT','Midjourney','Sin herramienta'],
  tiempoProd: ['⚡ 30 min','🕐 1 hora','🕑 2-3 horas','📅 Medio día','📆 Varios días'],
  meses: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
};

const BRANDS = ['MODOZAINT','Dermatinta','House of Kaizen'];

const DEFAULT_PILARES = [
  { nombre:'Autoridad', color:'#FF6A3D', descripcion:'', objetivo:'', audiencia:'', formatos:'', pct:0, keywords:'' },
  { nombre:'Adquisición', color:'#3DDC97', descripcion:'', objetivo:'', audiencia:'', formatos:'', pct:0, keywords:'' },
  { nombre:'Conversión', color:'#E8E4DC', descripcion:'', objetivo:'', audiencia:'', formatos:'', pct:0, keywords:'' }
];

// Snapshot manual de estadísticas reales (Instagram/TikTok) — se actualiza cuando se revisan las cuentas.
// No es una conexión en vivo: refleja el último corte revisado manualmente.
const SOCIAL_DASHBOARD = {
  'House of Kaizen': {
    actualizado: '2026-06-27',
    instagram: {
      handle: '@houseofkaizen',
      seguidores: 259,
      cuentasAlcanzadas30d: 5852,
      formatoGanador: 'Reels — 55.5% de las interacciones',
      topVideo: { titulo: '¿Qué es el tufting?', metrica: 'visualizaciones', valor: 5100, fecha: '2026-06-03', estilo: 'Reacción rápida / pantalla verde' },
      ranking: [
        { titulo: '¿Qué es el tufting?', valor: 5100, fecha: '03 jun' },
        { titulo: 'Casi dañamos la máquina', valor: 1400, fecha: '07 jun' },
        { titulo: 'KAYZEN: El inicio', valor: 397, fecha: '01 jun' },
        { titulo: 'POV: Tú, transformando la realidad...', valor: 309, fecha: '17 jun' },
        { titulo: 'Cuida tus herramientas', valor: 219, fecha: '22 jun' }
      ],
      variantes: [
        'Doblar la apuesta en reacción rápida pantalla verde explicando conceptos básicos ("¿Qué es X?") — es 3.6x mejor que el resto.',
        'Nuevas preguntas tipo FAQ con el mismo formato: "¿Cuánto cuesta un rug personalizado?", "¿Cuánto dura hacer uno?", "¿Por qué es tan caro el tufting?".',
        'Mantener el ritmo de corte rápido (decenas de clips cortos) — es lo que distingue al video ganador de los demás.'
      ]
    },
    tiktok: { handle: '@kayzenhouse', pendiente: true }
  },
  'Dermatinta': {
    actualizado: '2026-06-27',
    instagram: {
      handle: '@dermatinta',
      seguidores: 18,
      cuentasAlcanzadas30d: 1031,
      formatoGanador: 'Reels — 94.9% de las visualizaciones, 89.3% del alcance es gente que no te sigue',
      topVideo: { titulo: 'Por qué tus tatuajes envejecen mal — la culpa es del tatuador', metrica: 'visualizaciones', valor: 1100, fecha: '2026-06-15', estilo: 'B-roll sostenido con voz en off' },
      ranking: [
        { titulo: 'Por qué tus tatuajes envejecen mal — la culpa es del tatuador', valor: 1100, fecha: '15 jun' },
        { titulo: 'Casi nadie te explica sobre tus tatuajes', valor: 184, fecha: '21 jun' },
        { titulo: 'La gente cuida más sus zapatos que sus tattoos', valor: 47, fecha: '01 jun' }
      ],
      variantes: [
        'Replicar el ángulo "la culpa es de X" / mitos con otros temas: "por qué se ve opaco tu tatuaje — la culpa es de...", "por qué pica tu tatuaje nuevo — la culpa es de...".',
        'Seguir 100% en formato Reel — casi todo el alcance (94.9%) viene de ahí, no de posts estáticos.',
        'El alcance es 89.3% no-seguidores: el contenido se está descubriendo orgánicamente — buen momento para aumentar frecuencia.'
      ]
    },
    tiktok: { handle: '@somosdermatinta', pendiente: true }
  },
  'MODOZAINT': {
    actualizado: '2026-06-27',
    instagram: {
      handle: '@modozaint',
      seguidores: 8,
      cuentasAlcanzadas30d: 237,
      formatoGanador: 'Reels — 100% de las visualizaciones',
      topVideo: null,
      topVideoNota: 'Solo hay 5 publicaciones en la cuenta y el panel de Meta no aisló cuál individual lidera — solo el agregado: 1,799 visualizaciones totales en 30 días, 97% de gente que no te sigue.',
      ranking: [],
      variantes: [
        'Cuenta muy nueva (8 seguidores, 5 publicaciones) — prioridad es publicar las 6 ideas del Banco de Ideas ya cargadas, no optimizar todavía.',
        '97% del alcance es gente que no te sigue — la cuenta sí está llegando a desconocidos pese al tamaño, buena señal para mantener ritmo de Reels.',
        'Revisar de nuevo en 2 semanas con más publicaciones para identificar el primer patrón ganador real.'
      ]
    },
    tiktok: { handle: '@modozaint', pendiente: true }
  }
};

function emptyBrandData(){
  return {
    pilares: JSON.parse(JSON.stringify(DEFAULT_PILARES)),
    ideas: [],
    calendar: {}, // key: "YYYY-MM-DD" -> {red, formato, tema, hora, prioridad, estado}
    fichas: [],
    calMonthIndex: 6, // Julio (0-indexed) as in template default
    calYear: 2026
  };
}

// Ideas semilla — se aplican automáticamente una sola vez si el banco de ideas de la marca está vacío.
const SEED_IDEAS = {
  'MODOZAINT': [
    { id: "mz1", titulo: "Así se ve mi sistema por dentro, tal como está hoy.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "🌱 Personal / Lifestyle", pilar: "Construyendo en público ATRACCIÓN", prioridad: "🔴 Alta — publicar ya", tiempo: "⚡ 30 min", objetivo: "🎯 Alcance / Nuevas personas", estado: "💡 Idea anotada", notas: "Trial reel — cámara simple, 20-45s, hook fijo, resto natural, sin CTA de venta.", fecha: "2026-06-28" },
    { id: "mz2", titulo: "No quiero un trabajo mejor, quiero no necesitar uno.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "🌱 Personal / Lifestyle", pilar: "FOUNDER DISCIPLINE (AUTORIDAD)", prioridad: "🔴 Alta — publicar ya", tiempo: "⚡ 30 min", objetivo: "❤️ Engagement / Comunidad", estado: "💡 Idea anotada", notas: "Trial reel — cámara simple, 20-45s, hook fijo, resto natural, sin CTA de venta.", fecha: "2026-06-28" },
    { id: "mz3", titulo: "Hoy trabajé mi turno y después hice esto.", red: "🎵 TikTok", formato: "🎬 Reels / Video corto", categoria: "🌱 Personal / Lifestyle", pilar: "Construyendo en público ATRACCIÓN", prioridad: "🟡 Media — esta semana", tiempo: "⚡ 30 min", objetivo: "❤️ Engagement / Comunidad", estado: "💡 Idea anotada", notas: "Grabar justo después de salir del turno — es literal, recién vivido. No grabar antes.", fecha: "2026-06-28" },
    { id: "mz4", titulo: "Creo que la libertad vale más que cualquier sueldo.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "🌱 Personal / Lifestyle", pilar: "FOUNDER DISCIPLINE (AUTORIDAD)", prioridad: "🔴 Alta — publicar ya", tiempo: "⚡ 30 min", objetivo: "💡 Inspiración / Motivación", estado: "💡 Idea anotada", notas: "Trial reel — cámara simple, 20-45s, hook fijo, resto natural, sin CTA de venta.", fecha: "2026-06-28" },
    { id: "mz5", titulo: "Así se ve un día real construyendo, no la versión bonita.", red: "🎵 TikTok", formato: "🎬 Reels / Video corto", categoria: "🌱 Personal / Lifestyle", pilar: "Construyendo en público ATRACCIÓN", prioridad: "🟡 Media — esta semana", tiempo: "⚡ 30 min", objetivo: "🎯 Alcance / Nuevas personas", estado: "💡 Idea anotada", notas: "Trial reel — cámara simple, 20-45s, hook fijo, resto natural, sin CTA de venta.", fecha: "2026-06-28" },
    { id: "mz6", titulo: "Prefiero avanzar lento y real que rápido y falso.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "🌱 Personal / Lifestyle", pilar: "FOUNDER DISCIPLINE (AUTORIDAD)", prioridad: "🟡 Media — esta semana", tiempo: "⚡ 30 min", objetivo: "❤️ Engagement / Comunidad", estado: "💡 Idea anotada", notas: "Trial reel — cámara simple, 20-45s, hook fijo, resto natural, sin CTA de venta.", fecha: "2026-06-28" }
  ],
  'Dermatinta': [
    { id: "dt1", titulo: "Por qué se ve opaco tu tatuaje — la culpa es de tu rutina de limpieza.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "📚 Educativo", pilar: "Autoridad", prioridad: "🔴 Alta — publicar ya", tiempo: "🕐 1 hora", objetivo: "🎓 Educación / Valor", estado: "💡 Idea anotada", notas: "Replica el ángulo ganador real (1,100 views): 'la culpa es de X'. B-roll sostenido + voz en off, mismo estilo que el video top de junio.", fecha: "2026-06-28" },
    { id: "dt2", titulo: "Por qué pica tanto tu tatuaje nuevo — la culpa es de la crema que estás usando.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "📚 Educativo", pilar: "Autoridad", prioridad: "🔴 Alta — publicar ya", tiempo: "🕐 1 hora", objetivo: "🎓 Educación / Valor", estado: "💡 Idea anotada", notas: "Mismo ángulo ganador 'la culpa es de X'. B-roll sostenido + voz en off.", fecha: "2026-06-28" },
    { id: "dt3", titulo: "Por qué tu tatuaje perdió color en meses — la culpa no es del tatuador.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "📚 Educativo", pilar: "Autoridad", prioridad: "🟡 Media — esta semana", tiempo: "🕐 1 hora", objetivo: "🎓 Educación / Valor", estado: "💡 Idea anotada", notas: "Tercera variación del ángulo ganador — probar si el patrón se confirma (regla: 3 piezas del mismo patrón = patrón confirmado).", fecha: "2026-06-28" },
    { id: "dt4", titulo: "5 errores que casi todos cometen cuidando un tatuaje nuevo.", red: "🎵 TikTok", formato: "🖼️ Carrusel", categoria: "🔧 Tutorial / Cómo hacer", pilar: "Adquisición", prioridad: "🟡 Media — esta semana", tiempo: "🕐 1 hora", objetivo: "🎯 Alcance / Nuevas personas", estado: "💡 Idea anotada", notas: "Formato lista, altamente compartible — pilar Adquisición.", fecha: "2026-06-28" },
    { id: "dt5", titulo: "Lo que nadie te dice antes de tatuarte.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "📚 Educativo", pilar: "Adquisición", prioridad: "🟢 Baja — sin urgencia", tiempo: "🕐 1 hora", objetivo: "🎯 Alcance / Nuevas personas", estado: "💡 Idea anotada", notas: "Hook relacionable, formato similar al de 'Casi nadie te explica sobre tus tatuajes' (184 views, 2º mejor del mes).", fecha: "2026-06-28" },
    { id: "dt6", titulo: "Así se usa Dermatinta paso a paso en tu rutina de cicatrización.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "🛍️ Promocional", pilar: "Conversión", prioridad: "🟢 Baja — sin urgencia", tiempo: "🕑 2-3 horas", objetivo: "🛒 Conversión / Ventas", estado: "💡 Idea anotada", notas: "Producto en uso real, tutorial — para cuando ya haya audiencia educada por las piezas de Autoridad.", fecha: "2026-06-28" }
  ],
  'House of Kaizen': [
    { id: "hk1", titulo: "¿Cuánto cuesta un rug personalizado y por qué vale lo que cuesta?", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "❓ Preguntas frecuentes", pilar: "Autoridad", prioridad: "🔴 Alta — publicar ya", tiempo: "🕐 1 hora", objetivo: "🎓 Educación / Valor", estado: "💡 Idea anotada", notas: "Mismo formato del video top real (5,100 views): reacción rápida pantalla verde, decenas de cortes cortos, respondiendo una pregunta básica.", fecha: "2026-06-28" },
    { id: "hk2", titulo: "¿Cuánto se demora hacer un keyboard rug desde cero?", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "❓ Preguntas frecuentes", pilar: "Autoridad", prioridad: "🔴 Alta — publicar ya", tiempo: "🕐 1 hora", objetivo: "🎓 Educación / Valor", estado: "💡 Idea anotada", notas: "Replica el formato ganador (reacción rápida pantalla verde) — segunda variación para confirmar el patrón.", fecha: "2026-06-28" },
    { id: "hk3", titulo: "3 errores que arruinan un rug hecho en casa.", red: "🎵 TikTok", formato: "🎬 Reels / Video corto", categoria: "🔧 Tutorial / Cómo hacer", pilar: "Autoridad", prioridad: "🟡 Media — esta semana", tiempo: "🕐 1 hora", objetivo: "🎓 Educación / Valor", estado: "💡 Idea anotada", notas: "Mismo estilo reacción rápida que 'Casi dañamos la máquina' (2º mejor del mes, 1,400 views).", fecha: "2026-06-28" },
    { id: "hk4", titulo: "POV: encargas tu primer keyboard rug personalizado.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "🌱 Personal / Lifestyle", pilar: "Adquisición", prioridad: "🟡 Media — esta semana", tiempo: "🕑 2-3 horas", objetivo: "🎯 Alcance / Nuevas personas", estado: "💡 Idea anotada", notas: "Formato satisfying/transformación — pilar Adquisición, dirigido a gamers/anime.", fecha: "2026-06-28" },
    { id: "hk5", titulo: "Así se ve transformar un diseño random en una alfombra real.", red: "🎵 TikTok", formato: "🎬 Reels / Video corto", categoria: "🌱 Personal / Lifestyle", pilar: "Adquisición", prioridad: "🟢 Baja — sin urgencia", tiempo: "🕑 2-3 horas", objetivo: "🎯 Alcance / Nuevas personas", estado: "💡 Idea anotada", notas: "Before/after satisfying — alto potencial de viralidad por formato visual.", fecha: "2026-06-28" },
    { id: "hk6", titulo: "Así llega tu pedido personalizado a la puerta de tu casa.", red: "📱 Instagram", formato: "🎬 Reels / Video corto", categoria: "🛍️ Promocional", pilar: "Conversión", prioridad: "🟢 Baja — sin urgencia", tiempo: "⚡ 30 min", objetivo: "🛒 Conversión / Ventas", estado: "💡 Idea anotada", notas: "Unboxing/packaging — para cuando ya haya pedidos reales que mostrar.", fecha: "2026-06-28" }
  ]
};

const STORAGE_KEY = 'zaint_content_control_room_v1';

function loadStore(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  const fresh = {};
  BRANDS.forEach(b => fresh[b] = emptyBrandData());
  return fresh;
}

function saveStore(store){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}
