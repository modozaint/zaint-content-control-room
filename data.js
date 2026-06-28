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
