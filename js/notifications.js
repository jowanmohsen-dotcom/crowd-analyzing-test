// ============================================================
//  VIEW: NOTIFICATIONS
// ============================================================
function renderNotifications() {
  var f = state.notifFilter || 'all';
  var filtered = f === 'all' ? NOTIFS : NOTIFS.filter(function(n) { return n.type === f; });
  var unread = NOTIFS.filter(function(n) { return !n.read; }).length;

  return renderTopNav() +
  '<div style="max-width:860px;margin:0 auto;padding:40px 32px;">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;">' +
      '<div>' +
        '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:26px;margin-bottom:4px;">Notifications</h1>' +
        (unread > 0 ? '<span style="font-size:13px;color:var(--muted);">' + unread + ' unread notification' + (unread>1?'s':'') + '</span>' : '<span style="font-size:13px;color:#22C55E;">All caught up!</span>') +
      '</div>' +
      '<button class="btn-ghost" onclick="NOTIFS.forEach(function(n){n.read=true;});navigate(\'notifications\')">Mark All Read</button>' +
    '</div>' +
    '<div style="margin-bottom:24px;">' +
      '<div class="tab-bar">' +
        [['all','All'],['crowd','Crowd Alerts'],['update','Event Updates'],['emergency','Emergency']].map(function(t) {
          return '<button class="tab-btn ' + (f===t[0]?'active':'') + '" onclick="state.notifFilter=\'' + t[0] + '\';navigate(\'notifications\')">' + t[1] + '</button>';
        }).join('') +
      '</div>' +
    '</div>' +
    '<div style="display:flex;flex-direction:column;gap:12px;">' +
      filtered.map(function(n) {
        return '<div class="notif-card">' +
          '<div class="notif-strip" style="background:' + notifColor(n.sev) + ';margin-left:16px;"></div>' +
          '<div style="font-size:24px;flex-shrink:0;margin-top:2px;">' + notifIcon(n.type, n.sev) + '</div>' +
          '<div style="flex:1;min-width:0;padding-right:16px;">' +
            '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">' +
              '<span style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;">' + n.event + '</span>' +
              '<span class="badge ' + (n.sev==='critical'?'badge-high':n.sev==='high'?'badge-medium':'badge-info') + '" style="font-size:10px;">' + n.sev + '</span>' +
              (!n.read ? '<span class="unread-dot"></span>' : '') +
            '</div>' +
            '<p style="font-size:13px;color:var(--muted);margin-bottom:6px;">' + n.msg + '</p>' +
            '<span style="font-size:12px;color:rgba(180,175,220,0.4);">\uD83D\uDD50 ' + n.time + '</span>' +
          '</div>' +
          ((n.sev === 'high' || n.sev === 'critical') && state.user && state.user.role === 'organizer'
            ? '<button class="btn-danger" style="font-size:11px;padding:6px 12px;white-space:nowrap;align-self:center;" onclick="sendAlertFromNotifById(' + n.id + ')">\uD83D\uDCE7 Email Alert</button>'
            : '') +
        '</div>';
      }).join('') +
      (filtered.length === 0 ? '<div style="text-align:center;padding:60px;color:var(--muted);"><div style="font-size:48px;margin-bottom:16px;">\uD83D\uDD14</div><div style="font-family:\'Montserrat\',sans-serif;font-weight:700;">No notifications in this category</div></div>' : '') +
    '</div>' +
  '</div>';
}
