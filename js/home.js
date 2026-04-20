// ============================================================
//  VIEW: HOME
// ============================================================
function renderHome() {
  var cats = ['All', 'Music', 'Technology', 'Sports', 'Art', 'Food'];
  var cat = state.catFilter || 'all';
  var filtered = cat === 'all' ? EVENTS : EVENTS.filter(function(e) { return e.cat.toLowerCase() === cat.toLowerCase(); });

  var cardHtml = filtered.map(function(ev) {
    return '<div class="card" style="transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.2s ease;cursor:pointer;" onmouseenter="this.style.transform=\'translateY(-6px)\';this.style.boxShadow=\'0 16px 48px rgba(233,22,102,0.2),0 4px 12px rgba(0,0,0,0.4)\'" onmouseleave="this.style.transform=\'\';this.style.boxShadow=\'\'" onclick="navigate(\'detail\',{id:' + ev.id + '})">' +
      '<div style="position:relative;overflow:hidden;">' +
        '<img src="https://placehold.co/400x220/1e1a3a/3a3560?text=' + encodeURIComponent(ev.name) + '" alt="' + ev.name + '" style="width:100%;height:180px;object-fit:cover;display:block;" />' +
        '<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(13,12,26,0.85) 0%,transparent 55%);"></div>' +
        '<div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(233,22,102,0.15),rgba(255,180,0,0.08));mix-blend-mode:multiply;"></div>' +
        '<span class="badge badge-cat" style="position:absolute;top:12px;left:12px;">' + ev.cat + '</span>' +
        '<div style="position:absolute;bottom:12px;right:12px;">' + levelBadge(ev.level) + '</div>' +
      '</div>' +
      '<div style="padding:18px 18px 20px;">' +
        '<h3 style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:16px;margin-bottom:8px;line-height:1.3;">' + ev.name + '</h3>' +
        '<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px;">' +
          '<span style="font-size:13px;color:var(--muted);">\uD83D\uDCCD ' + ev.loc + ', ' + ev.city + '</span>' +
          '<span style="font-size:13px;color:var(--muted);">\uD83D\uDCC5 ' + ev.date + ' \u00B7 ' + ev.time + '</span>' +
        '</div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;">' +
          '<div style="font-size:12px;color:var(--muted);"><span style="color:' + capBarColor(ev.pct) + ';font-weight:700;">' + ev.pct + '%</span> capacity</div>' +
          '<button class="btn-primary" style="font-size:12px;padding:8px 16px;" onclick="event.stopPropagation();navigate(\'detail\',{id:' + ev.id + '})">View Details</button>' +
        '</div>' +
        '<div class="cap-bar-outer" style="margin-top:10px;">' +
          '<div class="cap-bar-inner" style="width:' + ev.pct + '%;background:' + capBarColor(ev.pct) + ';"></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  return renderTopNav() +
  '<section class="hero-section noise">' +
    '<div class="grid-bg"></div>' +
    '<div style="position:relative;z-index:1;max-width:760px;margin:0 auto;text-align:center;">' +
      '<div class="badge badge-cat" style="margin-bottom:20px;font-size:12px;padding:5px 14px;">\u2728 AI-Powered Crowd Intelligence</div>' +
      '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:clamp(36px,6vw,64px);line-height:1.1;letter-spacing:-0.03em;margin-bottom:20px;">Discover<br/><span class="grad-text">Events</span></h1>' +
      '<p style="color:var(--muted);font-size:18px;max-width:520px;margin:0 auto 36px;">Real-time crowd predictions and AI-powered insights to make every event experience unforgettable.</p>' +
      '<div style="display:flex;gap:12px;max-width:540px;margin:0 auto;position:relative;">' +
        '<input class="input-field" style="flex:1;font-size:15px;padding:14px 20px 14px 46px;" placeholder="Search events, artists, venues\u2026" />' +
        '<span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:18px;">\uD83D\uDD0D</span>' +
        '<button class="btn-primary" style="padding:14px 24px;font-size:15px;">Search</button>' +
      '</div>' +
    '</div>' +
  '</section>' +
  '<section id="events-section" style="max-width:1200px;margin:0 auto;padding:48px 32px;">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;">' +
      '<h2 style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:22px;">Upcoming Events</h2>' +
      '<div class="tab-bar" style="flex-wrap:wrap;">' +
        cats.map(function(c) {
          var isActive = (cat === c.toLowerCase()) || (cat === 'all' && c === 'All');
          return '<button class="tab-btn ' + (isActive?'active':'') + '" onclick="state.catFilter=\'' + c.toLowerCase() + '\';navigate(\'home\')">' + c + '</button>';
        }).join('') +
      '</div>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px;">' +
      cardHtml +
    '</div>' +
  '</section>';
}
