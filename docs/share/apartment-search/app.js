const KEY = 'aptsearch.v1';
const store = JSON.parse(localStorage.getItem(KEY) || '{}');
const save = () => localStorage.setItem(KEY, JSON.stringify(store));

const areaClass = a => a === 'Emeryville' ? 'p-emv' : a === 'Berkeley' ? 'p-bky' : a === 'El Cerrito' ? 'p-elc' : 'p-oak';
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const tel = p => (p || '').replace(/[^0-9+]/g, '');

const money = d => {
  if (d.rent == null) return '<span class="ask">ask</span>';
  const hi = d.rentHi && d.rentHi !== d.rent ? '–' + d.rentHi.toLocaleString() : '';
  const flag = d.conf === 'site' ? '' : '<sup title="From a listing feed, not the property site — reconfirm">*</sup>';
  return '$' + d.rent.toLocaleString() + hi + flag;
};

const tourPill = t =>
  t === 'booked' ? '<span class="pill p-booked">Booked</span>'
  : t === 'walkin' ? '<span class="pill p-walkin">Walk-in</span>'
  : t === 'appt'   ? '<span class="pill p-callme">Appt req.</span>'
  : t === 'online' ? '<span class="pill p-online">Book online</span>'
  : '<span class="pill p-na">?</span>';

let hideDone = false, budgetOnly = false, availOnly = false, mineOnly = false;
const open = new Set();

function visible() {
  const q = document.getElementById('q').value.toLowerCase();
  const area = document.getElementById('area').value;
  const sort = document.getElementById('sort').value;

  const rows = DATA.filter(d => {
    if (area && d.area !== area) return false;
    if (hideDone && store[d.id]?.status === 'Ruled out') return false;
    if (availOnly && !d.availGood) return false;
    if (mineOnly && !d.mine) return false;
    if (budgetOnly && (d.rent == null || d.rent > 3000)) return false;
    return !q || (d.name + ' ' + d.addr + ' ' + d.area).toLowerCase().includes(q);
  });

  rows.sort((a, b) =>
      sort === 'rent'    ? (a.rent ?? 1e9) - (b.rent ?? 1e9)
    : sort === 'commute' ? (a.drive ?? 99) - (b.drive ?? 99)
    : sort === 'area'    ? a.area.localeCompare(b.area) || (a.rent ?? 1e9) - (b.rent ?? 1e9)
    : a.name.localeCompare(b.name));

  return rows;
}

function render() {
  const rows = visible();

  document.getElementById('tb').innerHTML = rows.map(d => {
    const st = store[d.id]?.status || '';
    const nt = store[d.id]?.note || '';
    const opts = ['', 'Interested', 'Toured', 'Applied', 'Ruled out']
      .map(o => `<option value="${o}"${o === st ? ' selected' : ''}>${o || '—'}</option>`).join('');
    const isOpen = open.has(d.id);

    return `<tr class="${st === 'Ruled out' ? 'done' : ''}">
      <td>
        ${d.mine ? '<span class="star" title="From your original sheet">★</span>' : ''}<a class="apt-name" href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.name)}</a>
        <button class="info" data-toggle="${d.id}" title="Research notes">${isOpen ? '−' : 'i'}</button><br>
        <span class="pill ${areaClass(d.area)}">${esc(d.area)}</span>
      </td>
      <td class="addr">${esc(d.addr)}</td>
      <td class="num">${money(d)}</td>
      <td class="num">${d.sqft ? d.sqft + ' sf' : '—'}</td>
      <td class="num">${d.drive != null ? d.drive + ' min' : '—'}${d.bike ? `<br><span class="w">${d.bike} bike</span>` : ''}</td>
      <td class="${d.availGood ? 'good' : 'bad'}">${esc(d.avail || '—')}</td>
      <td>${d.phone ? `<a class="tel" href="tel:${tel(d.phone)}">${esc(d.phone)}</a>` : '—'}</td>
      <td>${esc(d.sat || '—')}</td>
      <td>${tourPill(d.tour)}${d.tourTime ? `<br><b>${esc(d.tourTime)}</b>` : ''}${
        d.book ? `<br><a class="booklink" href="${esc(d.book)}" target="_blank" rel="noopener">${esc(d.bookLabel || 'Book')}</a>` : ''}</td>
      <td><select class="apt-status" data-id="${d.id}">${opts}</select></td>
      <td><textarea class="apt-note" data-id="${d.id}" placeholder="…">${esc(nt)}</textarea></td>
    </tr>` + (isOpen
      ? `<tr class="detail"><td colspan="11">${d.note || 'No extra notes.'}</td></tr>`
      : '');
  }).join('');

  const priced = rows.filter(r => r.rent != null).map(r => r.rent).sort((a, b) => a - b);
  const med = priced.length ? priced[Math.floor(priced.length / 2)] : null;
  document.getElementById('stats').innerHTML = `
    <div class="apt-stat"><b>${rows.length}</b><span>shown</span></div>
    <div class="apt-stat"><b>${med ? '$' + med.toLocaleString() : '—'}</b><span>median studio</span></div>
    <div class="apt-stat"><b>${rows.filter(r => r.availGood).length}</b><span>with real availability</span></div>
    <div class="apt-stat"><b>${rows.filter(r => r.tour === 'walkin').length}</b><span>walk-in friendly</span></div>
    <div class="apt-stat booked"><b>${DATA.filter(r => r.tour === 'booked').length}</b><span>tours booked</span></div>`;

  document.querySelectorAll('.apt-status').forEach(el => el.onchange = e => {
    (store[e.target.dataset.id] ||= {}).status = e.target.value; save(); render();
  });
  document.querySelectorAll('.apt-note').forEach(el => el.oninput = e => {
    (store[e.target.dataset.id] ||= {}).note = e.target.value; save();
  });
  document.querySelectorAll('.info').forEach(el => el.onclick = e => {
    const id = e.target.dataset.toggle;
    open.has(id) ? open.delete(id) : open.add(id);
    render();
  });
}

function bindToggle(id, flip, onLabel, offLabel) {
  const el = document.getElementById(id);
  el.onclick = () => {
    const on = flip();
    el.classList.toggle('on', on);
    el.textContent = on ? onLabel : offLabel;
    render();
  };
}

document.getElementById('q').oninput = render;
document.getElementById('area').onchange = render;
document.getElementById('sort').onchange = render;
bindToggle('mineonly', () => (mineOnly = !mineOnly), '✓ ★ Your list', '★ Your list');
bindToggle('availonly', () => (availOnly = !availOnly), '✓ Available only', 'Available only');
bindToggle('budgetonly', () => (budgetOnly = !budgetOnly), '✓ Under $3,000', 'Under $3,000');
bindToggle('hidedone', () => (hideDone = !hideDone), '✓ Ruled-out hidden', 'Hide ruled-out');

document.getElementById('reset').onclick = () => {
  if (confirm('Clear all your saved statuses and notes?')) {
    localStorage.removeItem(KEY);
    for (const k in store) delete store[k];
    render();
  }
};

document.getElementById('export').onclick = () => {
  const lines = visible().map(d => [
    d.name, d.addr, d.rent ?? '', d.sqft ?? '', d.drive ?? '', d.avail ?? '',
    d.phone ?? '', d.sat ?? '', d.tour ?? '', store[d.id]?.status ?? '', store[d.id]?.note ?? '',
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
  const csv = ['Name,Address,Rent,Sqft,DriveMin,Availability,Phone,SatHours,Tour,Status,Notes', ...lines].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'apartment-search.csv';
  a.click();
};

document.getElementById('plan').innerHTML = '<ul class="sched">' + PLAN.map(p =>
  `<li class="${esc(p.kind || '')}"><span class="t">${esc(p.time)}</span> ${p.html}</li>`).join('') + '</ul>';

document.getElementById('calls').innerHTML = CALLS.map((c, i) => {
  const ck = 'call' + i;
  const checked = store[ck]?.done ? ' checked' : '';
  return `<div class="callcard${c.done ? ' ok' : ''}${checked ? ' struck' : ''}">
     <h4><label><input type="checkbox" class="calldone" data-k="${ck}"${checked}> ${esc(c.name)}</label>
         — <a class="tel" href="tel:${tel(c.phone)}">${esc(c.phone)}</a></h4>
     ${c.lines.map(l => '<p>' + l + '</p>').join('')}
     <div class="script">${c.script}</div>
   </div>`;
}).join('');

document.querySelectorAll('.calldone').forEach(el => el.onchange = e => {
  (store[e.target.dataset.k] ||= {}).done = e.target.checked;
  save();
  e.target.closest('.callcard').classList.toggle('struck', e.target.checked);
});

render();
