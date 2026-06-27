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
