let store = loadStore();
applySeedIdeasOnce();
let currentBrand = localStorage.getItem('zaint_current_brand') || BRANDS[0];

function applySeedIdeasOnce(){
  if(localStorage.getItem('zaint_seed_v1_applied')) return;
  let changed = false;
  BRANDS.forEach(brand => {
    if(store[brand] && store[brand].ideas && store[brand].ideas.length === 0 && SEED_IDEAS[brand]){
      store[brand].ideas = JSON.parse(JSON.stringify(SEED_IDEAS[brand]));
      changed = true;
    }
  });
  localStorage.setItem('zaint_seed_v1_applied', 'true');
  if(changed) saveStore(store);
}
let ideaViewMode = 'tabla';
let editingIdeaId = null;
let editingDayKey = null;
let currentFichaId = null;

function brandData(){ return store[currentBrand]; }
function persist(){ saveStore(store); }

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function fillSelect(selectEl, options, includeBlank){
  selectEl.innerHTML = '';
  if(includeBlank){
    const o = document.createElement('option');
    o.value=''; o.textContent='—';
    selectEl.appendChild(o);
  }
  options.forEach(opt => {
    const o = document.createElement('option');
    o.value = opt; o.textContent = opt;
    selectEl.appendChild(o);
  });
}

function populateAllSelects(){
  fillSelect(document.getElementById('m_red'), LISTS.redes);
  fillSelect(document.getElementById('m_formato'), LISTS.formatos);
  fillSelect(document.getElementById('m_categoria'), LISTS.categoria);
  fillSelect(document.getElementById('m_pilar'), brandData().pilares.map(p=>p.nombre));
  fillSelect(document.getElementById('m_prioridad'), LISTS.prioridad);
  fillSelect(document.getElementById('m_tiempo'), LISTS.tiempoProd);
  fillSelect(document.getElementById('m_objetivo'), LISTS.objetivo);
  fillSelect(document.getElementById('m_estado'), LISTS.categoriaEstado);

  fillSelect(document.getElementById('d_red'), LISTS.redes);
  fillSelect(document.getElementById('d_formato'), LISTS.formatos);
  fillSelect(document.getElementById('d_hora'), LISTS.horario);
  fillSelect(document.getElementById('d_prioridad'), LISTS.prioridad);
  fillSelect(document.getElementById('d_estado'), LISTS.estadoPublicacion);

  fillSelect(document.getElementById('f_red'), LISTS.redes);
  fillSelect(document.getElementById('f_formato'), LISTS.formatos);
  fillSelect(document.getElementById('f_hora'), LISTS.horario);
  fillSelect(document.getElementById('f_estado'), LISTS.categoriaEstado);
  fillSelect(document.getElementById('f_pilar'), brandData().pilares.map(p=>p.nombre));
  fillSelect(document.getElementById('f_herramienta'), LISTS.herramienta);

  fillSelect(document.getElementById('calMonth'), LISTS.meses);
}

/* ===== NAVEGACIÓN ===== */
function switchSection(name){
  document.querySelectorAll('.channel').forEach(b => b.classList.toggle('active', b.dataset.section===name));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-'+name));
  if(name==='inicio') renderInicio();
  if(name==='pilares') renderPilares();
  if(name==='ideas') renderIdeas();
  if(name==='calendario') renderCalendario();
  if(name==='ficha') renderFichaSelector();
  if(name==='dashboard') renderDashboard();
}

document.querySelectorAll('.channel').forEach(btn => {
  btn.addEventListener('click', () => switchSection(btn.dataset.section));
});

function applyBrandTheme(){
  document.body.dataset.brand = currentBrand;
  document.getElementById('inicioBrandName').textContent = currentBrand;
}

document.getElementById('brandSelect').addEventListener('change', (e) => {
  currentBrand = e.target.value;
  localStorage.setItem('zaint_current_brand', currentBrand);
  applyBrandTheme();
  populateAllSelects();
  refreshActiveView();
});

function refreshActiveView(){
  const active = document.querySelector('.view.active');
  if(!active) return;
  switchSection(active.id.replace('view-',''));
}

/* ===== INICIO ===== */
function renderInicio(){
  const d = brandData();
  document.getElementById('inicioBrandName').textContent = currentBrand;
  document.getElementById('statIdeas').textContent = d.ideas.length;
  document.getElementById('statAlta').textContent = d.ideas.filter(i => (i.prioridad||'').includes('Alta')).length;

  const now = new Date();
  const weekFromNow = new Date(now.getTime() + 7*24*60*60*1000);
  let scheduledThisWeek = 0;
  Object.keys(d.calendar).forEach(key => {
    const dt = new Date(key);
    if(dt >= now && dt <= weekFromNow && d.calendar[key].tema) scheduledThisWeek++;
  });
  document.getElementById('statSemana').textContent = scheduledThisWeek;

  let publicadas = d.ideas.filter(i => (i.estado||'').includes('Publicado')).length;
  Object.values(d.calendar).forEach(c => { if((c.estado||'').includes('Publicado')) publicadas++; });
  document.getElementById('statPublicado').textContent = publicadas;

  const barsWrap = document.getElementById('pilarBars');
  barsWrap.innerHTML = '';
  d.pilares.forEach(p => {
    const row = document.createElement('div');
    row.className = 'pilar-bar-row';
    row.innerHTML = `
      <div class="pilar-bar-label">${p.nombre||'(sin nombre)'}</div>
      <div class="pilar-bar-track"><div class="pilar-bar-fill" style="width:${p.pct||0}%; background:${p.color||'#FF6A3D'}"></div></div>
      <div class="pilar-bar-pct">${p.pct||0}%</div>
    `;
    barsWrap.appendChild(row);
  });
}

/* ===== PILARES ===== */
function renderPilares(){
  const d = brandData();
  const grid = document.getElementById('pilaresGrid');
  grid.innerHTML = '';
  d.pilares.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'pilar-card';
    card.style.borderLeftColor = p.color || '#FF6A3D';
    card.innerHTML = `
      <button class="pilar-remove" data-idx="${idx}">eliminar ✕</button>
      <input type="text" class="pilar-name" data-idx="${idx}" data-field="nombre" value="${escapeAttr(p.nombre)}" placeholder="Nombre del pilar">
      <label>Descripción</label>
      <textarea data-idx="${idx}" data-field="descripcion" rows="2" placeholder="¿De qué trata?">${escapeHtml(p.descripcion)}</textarea>
      <label>Objetivo principal</label>
      <input type="text" data-idx="${idx}" data-field="objetivo" value="${escapeAttr(p.objetivo)}">
      <label>Audiencia</label>
      <input type="text" data-idx="${idx}" data-field="audiencia" value="${escapeAttr(p.audiencia)}">
      <label>Formatos que usarás</label>
      <input type="text" data-idx="${idx}" data-field="formatos" value="${escapeAttr(p.formatos)}">
      <label>Palabras clave / hashtags</label>
      <input type="text" data-idx="${idx}" data-field="keywords" value="${escapeAttr(p.keywords)}">
      <div class="pilar-pct">
        <label style="margin:0;">% del contenido</label>
        <input type="number" min="0" max="100" data-idx="${idx}" data-field="pct" value="${p.pct||0}">
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      const idx = parseInt(el.dataset.idx);
      const field = el.dataset.field;
      let val = el.value;
      if(field==='pct') val = Math.max(0, Math.min(100, parseInt(val)||0));
      d.pilares[idx][field] = val;
      persist();
    });
  });

  grid.querySelectorAll('.pilar-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      d.pilares.splice(idx,1);
      persist();
      renderPilares();
    });
  });
}

document.getElementById('addPilarBtn').addEventListener('click', () => {
  const d = brandData();
  const palette = ['#FF6A3D','#3DDC97','#E8E4DC','#8A8580','#FFD166'];
  d.pilares.push({ nombre:'Nuevo pilar', color: palette[d.pilares.length % palette.length], descripcion:'', objetivo:'', audiencia:'', formatos:'', pct:0, keywords:'' });
  persist();
  renderPilares();
});

/* ===== BANCO DE IDEAS ===== */
function renderIdeas(){
  const d = brandData();
  const search = (document.getElementById('ideaSearch').value || '').toLowerCase();
  const filtered = d.ideas.filter(i => (i.titulo||'').toLowerCase().includes(search));

  if(ideaViewMode === 'tabla'){
    document.getElementById('ideasTabla').style.display='block';
    document.getElementById('ideasKanban').style.display='none';
    const tbody = document.getElementById('ideasTableBody');
    tbody.innerHTML = '';
    filtered.forEach((idea, i) => {
      const tr = document.createElement('tr');
      const isAlta = (idea.prioridad||'').includes('Alta');
      const isPub = (idea.estado||'').includes('Publicado');
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${escapeHtml(idea.titulo)}</td>
        <td>${idea.red||''}</td>
        <td>${idea.formato||''}</td>
        <td>${idea.pilar||''}</td>
        <td><span class="badge ${isAlta?'alta':''}">${idea.prioridad||''}</span></td>
        <td><span class="badge ${isPub?'publicado':''}">${idea.estado||''}</span></td>
        <td style="font-family:var(--font-mono); font-size:11.5px;">${idea.fecha||''}</td>
        <td>
          <button class="row-action" data-edit="${idea.id}">editar</button>
          <button class="row-action" data-del="${idea.id}">✕</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openIdeaModal(b.dataset.edit)));
    tbody.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
      const dd = brandData();
      dd.ideas = dd.ideas.filter(x => x.id !== b.dataset.del);
      persist(); renderIdeas();
    }));
  } else {
    document.getElementById('ideasTabla').style.display='none';
    document.getElementById('ideasKanban').style.display='flex';
    const kanban = document.getElementById('ideasKanban');
    kanban.innerHTML = '';
    const cols = ['💡 Idea anotada','🔍 Investigando','📝 En redacción','🎬 En producción','✅ Publicado'];
    cols.forEach(colName => {
      const col = document.createElement('div');
      col.className = 'kanban-col';
      const items = filtered.filter(i => (i.estado||'').includes(colName.split(' ').slice(1).join(' ').split('—')[0].trim()) || i.estado === colName);
      col.innerHTML = `<h4>${colName} (${items.length})</h4>`;
      items.forEach(idea => {
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.innerHTML = `<div>${escapeHtml(idea.titulo)}</div><div class="kc-meta">${idea.red||''} · ${idea.pilar||''}</div>`;
        card.addEventListener('click', () => openIdeaModal(idea.id));
        col.appendChild(card);
      });
      kanban.appendChild(col);
    });
  }
}

document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ideaViewMode = btn.dataset.view;
    renderIdeas();
  });
});
document.getElementById('ideaSearch').addEventListener('input', renderIdeas);

function openIdeaModal(id){
  editingIdeaId = id || null;
  const overlay = document.getElementById('ideaModalOverlay');
  overlay.classList.add('active');
  if(id){
    const idea = brandData().ideas.find(i => i.id === id);
    document.getElementById('ideaModalTitle').textContent = 'Editar idea';
    document.getElementById('m_titulo').value = idea.titulo||'';
    document.getElementById('m_red').value = idea.red||'';
    document.getElementById('m_formato').value = idea.formato||'';
    document.getElementById('m_categoria').value = idea.categoria||'';
    document.getElementById('m_pilar').value = idea.pilar||'';
    document.getElementById('m_prioridad').value = idea.prioridad||'';
    document.getElementById('m_tiempo').value = idea.tiempo||'';
    document.getElementById('m_objetivo').value = idea.objetivo||'';
    document.getElementById('m_estado').value = idea.estado||'';
    document.getElementById('m_notas').value = idea.notas||'';
  } else {
    document.getElementById('ideaModalTitle').textContent = 'Nueva idea';
    document.getElementById('m_titulo').value = '';
    document.getElementById('m_notas').value = '';
  }
}
document.getElementById('addIdeaBtn').addEventListener('click', () => openIdeaModal(null));
document.getElementById('cancelIdeaBtn').addEventListener('click', () => document.getElementById('ideaModalOverlay').classList.remove('active'));
document.getElementById('saveIdeaBtn').addEventListener('click', () => {
  const d = brandData();
  const payload = {
    titulo: document.getElementById('m_titulo').value,
    red: document.getElementById('m_red').value,
    formato: document.getElementById('m_formato').value,
    categoria: document.getElementById('m_categoria').value,
    pilar: document.getElementById('m_pilar').value,
    prioridad: document.getElementById('m_prioridad').value,
    tiempo: document.getElementById('m_tiempo').value,
    objetivo: document.getElementById('m_objetivo').value,
    estado: document.getElementById('m_estado').value,
    notas: document.getElementById('m_notas').value,
  };
  if(!payload.titulo.trim()){ alert('Escribe un título para la idea.'); return; }
  if(editingIdeaId){
    const idea = d.ideas.find(i => i.id === editingIdeaId);
    Object.assign(idea, payload);
  } else {
    payload.id = uid();
    payload.fecha = new Date().toISOString().slice(0,10);
    d.ideas.unshift(payload);
  }
  persist();
  document.getElementById('ideaModalOverlay').classList.remove('active');
  renderIdeas();
  renderInicio();
});

/* ===== CALENDARIO ===== */
function renderCalendario(){
  const d = brandData();
  document.getElementById('calMonth').value = LISTS.meses[d.calMonthIndex];
  document.getElementById('calYear').value = d.calYear;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  const firstDay = new Date(d.calYear, d.calMonthIndex, 1);
  const daysInMonth = new Date(d.calYear, d.calMonthIndex+1, 0).getDate();
  let startWeekday = firstDay.getDay(); // 0=Sun
  startWeekday = startWeekday === 0 ? 6 : startWeekday - 1; // convert to Mon=0

  for(let i=0;i<startWeekday;i++){
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for(let day=1; day<=daysInMonth; day++){
    const key = `${d.calYear}-${String(d.calMonthIndex+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const entry = d.calendar[key];
    const cell = document.createElement('div');
    cell.className = 'cal-day';
    cell.innerHTML = `
      <div class="cal-day-num">${String(day).padStart(2,'0')}</div>
      <div class="cal-day-content">
        ${entry && entry.red ? `<div class="cc-red">${entry.red}</div>` : ''}
        ${entry && entry.tema ? `<div class="cc-tema">${escapeHtml(entry.tema)}</div>` : ''}
      </div>
      ${entry && entry.tema ? '<div class="cal-day-dot"></div>' : ''}
    `;
    cell.addEventListener('click', () => openDayModal(key));
    grid.appendChild(cell);
  }
}

document.querySelectorAll('.cal-toggle .toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cal-toggle .toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const isGoogle = btn.dataset.calview === 'google';
    document.getElementById('calPlanView').style.display = isGoogle ? 'none' : 'block';
    document.getElementById('calGoogleView').style.display = isGoogle ? 'block' : 'none';
  });
});

document.getElementById('calMonth').addEventListener('change', (e) => {
  brandData().calMonthIndex = LISTS.meses.indexOf(e.target.value);
  persist(); renderCalendario();
});
document.getElementById('calYear').addEventListener('change', (e) => {
  brandData().calYear = parseInt(e.target.value) || 2026;
  persist(); renderCalendario();
});

function openDayModal(key){
  editingDayKey = key;
  const overlay = document.getElementById('dayModalOverlay');
  overlay.classList.add('active');
  const entry = brandData().calendar[key] || {};
  document.getElementById('dayModalTitle').textContent = 'Programar — ' + key;
  document.getElementById('d_red').value = entry.red||'';
  document.getElementById('d_formato').value = entry.formato||'';
  document.getElementById('d_tema').value = entry.tema||'';
  document.getElementById('d_hora').value = entry.hora||'';
  document.getElementById('d_prioridad').value = entry.prioridad||'';
  document.getElementById('d_estado').value = entry.estado||'';
}
document.getElementById('cancelDayBtn').addEventListener('click', () => document.getElementById('dayModalOverlay').classList.remove('active'));
document.getElementById('clearDayBtn').addEventListener('click', () => {
  delete brandData().calendar[editingDayKey];
  persist();
  document.getElementById('dayModalOverlay').classList.remove('active');
  renderCalendario(); renderInicio();
});
document.getElementById('saveDayBtn').addEventListener('click', () => {
  brandData().calendar[editingDayKey] = {
    red: document.getElementById('d_red').value,
    formato: document.getElementById('d_formato').value,
    tema: document.getElementById('d_tema').value,
    hora: document.getElementById('d_hora').value,
    prioridad: document.getElementById('d_prioridad').value,
    estado: document.getElementById('d_estado').value,
  };
  persist();
  document.getElementById('dayModalOverlay').classList.remove('active');
  renderCalendario(); renderInicio();
});

/* ===== DASHBOARD (redes sociales) ===== */
function renderDashboard(){
  document.getElementById('dashBrandName').textContent = currentBrand;
  const data = SOCIAL_DASHBOARD[currentBrand];
  const empty = document.getElementById('dashEmpty');
  const content = document.getElementById('dashContent');

  if(!data || !data.instagram || data.instagram.pendiente){
    empty.style.display = 'block';
    content.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  content.style.display = 'block';

  const ig = data.instagram;

  const statsGrid = document.getElementById('dashStatsGrid');
  statsGrid.innerHTML = `
    <div class="stat-card">
      <div class="stat-num">${ig.seguidores}</div>
      <div class="stat-label">Seguidores (${ig.handle})</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${ig.cuentasAlcanzadas30d.toLocaleString('es-CO')}</div>
      <div class="stat-label">Cuentas alcanzadas (30d)</div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${ig.topVideo ? ig.topVideo.valor.toLocaleString('es-CO') : '—'}</div>
      <div class="stat-label">Vistas del video top</div>
    </div>
    <div class="stat-card">
      <div class="stat-num" style="font-size:15px; line-height:1.3;">${ig.formatoGanador}</div>
      <div class="stat-label">Formato ganador</div>
    </div>
  `;

  if(ig.topVideo){
    document.getElementById('dashTopVideo').innerHTML = `
      <p style="font-size:16px; font-weight:600; margin:0 0 6px;">${escapeHtml(ig.topVideo.titulo)}</p>
      <p class="sub" style="margin:0;">${ig.topVideo.valor.toLocaleString('es-CO')} ${ig.topVideo.metrica} · ${ig.topVideo.fecha} · Estilo: ${escapeHtml(ig.topVideo.estilo)}</p>
    `;
  } else {
    document.getElementById('dashTopVideo').innerHTML = `<p class="sub" style="margin:0;">${escapeHtml(ig.topVideoNota || 'Aún no identificado.')}</p>`;
  }

  const rankingWrap = document.getElementById('dashRanking');
  if(ig.ranking && ig.ranking.length){
    let rows = '<table class="data-table"><thead><tr><th>#</th><th>Video</th><th>Vistas</th><th>Fecha</th></tr></thead><tbody>';
    ig.ranking.forEach((r, i) => {
      rows += `<tr><td>${i+1}</td><td>${escapeHtml(r.titulo)}</td><td>${r.valor.toLocaleString('es-CO')}</td><td>${r.fecha}</td></tr>`;
    });
    rows += '</tbody></table>';
    rankingWrap.innerHTML = rows;
  } else {
    rankingWrap.innerHTML = '<p class="sub">Sin ranking individual disponible todavía — solo datos agregados de la cuenta.</p>';
  }

  const variantsList = document.getElementById('dashVariants');
  variantsList.innerHTML = '';
  ig.variantes.forEach(v => {
    const li = document.createElement('li');
    li.style.fontSize = '13.5px';
    li.textContent = v;
    variantsList.appendChild(li);
  });

  document.getElementById('dashUpdated').textContent = `Última revisión manual: ${data.actualizado}. No es una conexión en vivo — se actualiza cuando se vuelve a revisar la cuenta.`;
}

/* ===== FICHA DE CONTENIDO ===== */
function renderFichaSelector(){
  const d = brandData();
  const sel = document.getElementById('fichaSelector');
  sel.innerHTML = '<option value="">— Nueva ficha —</option>';
  d.fichas.forEach(f => {
    const o = document.createElement('option');
    o.value = f.id; o.textContent = f.titulo || '(sin título)';
    sel.appendChild(o);
  });
  if(currentFichaId && d.fichas.find(f=>f.id===currentFichaId)){
    sel.value = currentFichaId;
  } else {
    clearFichaForm();
    currentFichaId = null;
  }
}
document.getElementById('fichaSelector').addEventListener('change', (e) => {
  currentFichaId = e.target.value || null;
  loadFichaIntoForm(currentFichaId);
});
document.getElementById('newFichaBtn').addEventListener('click', () => {
  currentFichaId = null;
  document.getElementById('fichaSelector').value = '';
  clearFichaForm();
});
document.getElementById('deleteFichaBtn').addEventListener('click', () => {
  if(!currentFichaId) return;
  const d = brandData();
  d.fichas = d.fichas.filter(f => f.id !== currentFichaId);
  persist();
  currentFichaId = null;
  renderFichaSelector();
});

function clearFichaForm(){
  document.getElementById('fichaForm').reset();
  document.getElementById('f_titulo').value = '';
}

function loadFichaIntoForm(id){
  if(!id){ clearFichaForm(); return; }
  const f = brandData().fichas.find(x => x.id === id);
  if(!f) return;
  document.getElementById('f_titulo').value = f.titulo||'';
  document.getElementById('f_red').value = f.red||'';
  document.getElementById('f_formato').value = f.formato||'';
  document.getElementById('f_fecha').value = f.fecha||'';
  document.getElementById('f_hora').value = f.hora||'';
  document.getElementById('f_estado').value = f.estado||'';
  document.getElementById('f_pilar').value = f.pilar||'';
  document.getElementById('f_audiencia').value = f.audiencia||'';
  document.getElementById('f_tono').value = f.tono||'';
  document.getElementById('f_problema').value = f.problema||'';
  document.getElementById('f_mensaje').value = f.mensaje||'';
  document.getElementById('f_hook').value = f.hook||'';
  document.getElementById('f_desarrollo').value = f.desarrollo||'';
  document.getElementById('f_cierre').value = f.cierre||'';
  document.getElementById('f_hashtags').value = f.hashtags||'';
  document.getElementById('f_herramienta').value = f.herramienta||'';
  document.getElementById('f_duracion').value = f.duracion||'';
  document.querySelectorAll('#fichaChecklist input[type=checkbox]').forEach(cb => {
    cb.checked = !!(f.checklist && f.checklist[cb.dataset.check]);
  });
}

document.getElementById('saveFichaBtn').addEventListener('click', () => {
  const d = brandData();
  const titulo = document.getElementById('f_titulo').value;
  if(!titulo.trim()){ alert('Escribe un título para la ficha.'); return; }
  const checklist = {};
  document.querySelectorAll('#fichaChecklist input[type=checkbox]').forEach(cb => { checklist[cb.dataset.check] = cb.checked; });
  const payload = {
    titulo,
    red: document.getElementById('f_red').value,
    formato: document.getElementById('f_formato').value,
    fecha: document.getElementById('f_fecha').value,
    hora: document.getElementById('f_hora').value,
    estado: document.getElementById('f_estado').value,
    pilar: document.getElementById('f_pilar').value,
    audiencia: document.getElementById('f_audiencia').value,
    tono: document.getElementById('f_tono').value,
    problema: document.getElementById('f_problema').value,
    mensaje: document.getElementById('f_mensaje').value,
    hook: document.getElementById('f_hook').value,
    desarrollo: document.getElementById('f_desarrollo').value,
    cierre: document.getElementById('f_cierre').value,
    hashtags: document.getElementById('f_hashtags').value,
    herramienta: document.getElementById('f_herramienta').value,
    duracion: document.getElementById('f_duracion').value,
    checklist
  };
  if(currentFichaId){
    Object.assign(d.fichas.find(f=>f.id===currentFichaId), payload);
  } else {
    payload.id = uid();
    d.fichas.unshift(payload);
    currentFichaId = payload.id;
  }
  persist();
  renderFichaSelector();
  alert('Ficha guardada.');
});

/* ===== SINCRONIZAR DATOS ===== */
document.getElementById('exportBtn').addEventListener('click', () => {
  const json = JSON.stringify(store, null, 2);
  const box = document.getElementById('syncBox');
  box.value = json;
  box.select();
  const status = document.getElementById('syncStatus');
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(json).then(() => {
      status.textContent = 'Copiado al portapapeles. Pégalo en el chat con Claude.';
    }).catch(() => {
      status.textContent = 'No se pudo copiar automáticamente. El texto está seleccionado arriba — cópialo manualmente.';
    });
  } else {
    status.textContent = 'El texto está seleccionado arriba — cópialo manualmente.';
  }
});

document.getElementById('importBtn').addEventListener('click', () => {
  const box = document.getElementById('syncBox');
  const status = document.getElementById('syncStatus');
  try{
    const parsed = JSON.parse(box.value);
    store = parsed;
    persist();
    status.textContent = 'Datos importados correctamente. Recargando...';
    setTimeout(() => location.reload(), 800);
  } catch(e){
    status.textContent = 'Error: el texto pegado no es un respaldo válido (' + e.message + ').';
  }
});

/* ===== UTIL ===== */
function escapeHtml(str){
  if(!str) return '';
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeAttr(str){ return escapeHtml(str); }

/* ===== INIT ===== */
document.getElementById('brandSelect').value = currentBrand;
applyBrandTheme();
populateAllSelects();
switchSection('inicio');
