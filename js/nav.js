// ============================================================
//  TOP NAV
// ============================================================
function renderTopNav() {
  var user = state.user;
  var unread = NOTIFS.filter(function(n) { return !n.read; }).length;
  return '<nav class="top-nav">' +
    '<a class="nav-logo" href="#" onclick="navigate(\'home\');return false;"><img src="' + LOGO + '" alt="Crowd Analyzing" /></a>' +
    '<div style="flex:1;display:flex;align-items:center;gap:4px;">' +
      '<button class="nav-link ' + (state.view==='home'?'active':'') + '" onclick="navigate(\'home\')">Home</button>' +
      '<button class="nav-link" onclick="navigate(\'home\')">Events</button>' +
    '</div>' +
    '<div style="display:flex;align-items:center;gap:16px;">' +
      '<div style="position:relative;">' +
        '<input class="input-field" style="padding:8px 14px 8px 38px;width:220px;font-size:13px;" placeholder="Search events\u2026" />' +
        '<span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:14px;">\uD83D\uDD0D</span>' +
      '</div>' +
      (user && user.role === 'customer' ?
        '<button class="nav-link" style="position:relative;font-size:18px;padding:4px 8px;" onclick="navigate(\'notifications\')" aria-label="Notifications">\uD83D\uDD14' +
        (unread > 0 ? '<span style="position:absolute;top:0;right:0;background:#E91666;color:#fff;font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:10px;border-radius:10px;padding:1px 5px;min-width:18px;text-align:center;">' + unread + '</span>' : '') +
        '</button>' : '') +
      '<button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme" title="Toggle dark/light mode" id="theme-btn">' + (document.documentElement.getAttribute('data-theme') === 'light' ? '\u2600\uFE0F' : '\uD83C\uDF19') + '</button>' +
      (user ?
        '<div style="display:flex;align-items:center;gap:10px;">' +
          '<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#E91666,#FFB400);display:flex;align-items:center;justify-content:center;font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;color:#fff;">' + user.name.charAt(0) + '</div>' +
          '<div><div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:13px;line-height:1.2;">' + user.name + '</div><div style="font-size:11px;color:var(--muted);text-transform:capitalize;">' + user.role + '</div></div>' +
          '<button class="btn-ghost" style="font-size:12px;padding:6px 12px;" onclick="state.user=null;navigate(\'home\')">Logout</button>' +
        '</div>' :
        '<div style="display:flex;gap:8px;">' +
          '<button class="btn-ghost" style="font-size:13px;padding:8px 16px;" onclick="navigate(\'login\')">Login</button>' +
          '<button class="btn-primary" style="font-size:13px;padding:8px 16px;" onclick="navigate(\'signup\')">Sign Up</button>' +
        '</div>') +
    '</div>' +
  '</nav>';
}

// ============================================================
//  SIDEBAR
// ============================================================
function renderSidebar(active) {
  var u = state.user;
  var items = [
    { id:'dashboard', icon:'\uD83D\uDCCA', label:'Dashboard' },
    { id:'my-events', icon:'\uD83C\uDFAA', label:'My Events' },
    { id:'create', icon:'\u2795', label:'Create Event' },
    { id:'notifications', icon:'\uD83D\uDD14', label:'Notifications' },
    { id:'reports', icon:'\uD83D\uDCC8', label:'Reports' },
  ];
  return '<aside class="sidebar">' +
    '<div class="sidebar-logo"><img src="' + LOGO + '" alt="Crowd Analyzing" /></div>' +
    items.map(function(it) {
      var dest = it.id === 'my-events' ? 'dashboard' : it.id;
      return '<button class="sidebar-item ' + (active===it.id?'active':'') + '" onclick="navigate(\'' + dest + '\')">' +
        '<span style="font-size:16px;">' + it.icon + '</span>' +
        '<span>' + it.label + '</span>' +
      '</button>';
    }).join('') +
    '<div class="sidebar-footer">' +
      (u ?
        '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">' +
          '<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#E91666,#FFB400);display:flex;align-items:center;justify-content:center;font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;color:#fff;flex-shrink:0;">' + u.name.charAt(0) + '</div>' +
          '<div style="min-width:0;"><div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + u.name + '</div><div style="font-size:11px;color:var(--muted);text-transform:capitalize;">' + u.role + '</div></div>' +
        '</div>' +
        '<button class="btn-ghost" style="width:100%;font-size:12px;" onclick="state.user=null;navigate(\'home\')">\uD83D\uDEAA Logout</button>'
        : '') +
    '</div>' +
  '</aside>';
}
