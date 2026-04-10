// ============================================================
//  VIEW: EVENT DETAIL
// ============================================================
function renderDetail() {
  var id = state.params.id;
  var ev = EVENTS.find(function(e) { return e.id === id; }) || EVENTS[0];
  var forecastHours = ['6PM','7PM','8PM','9PM','10PM','11PM'];
  var forecastData = [35, 55, ev.pct, Math.min(ev.pct + 12, 99), Math.max(ev.pct - 5, 0), Math.max(ev.pct - 20, 0)];

  var infoItems = [
    ['\uD83C\uDFE2 Organizer', ev.org],
    ['\uD83D\uDCCD Location', ev.loc + ', ' + ev.city],
    ['\uD83D\uDCC5 Date', ev.date],
    ['\u23F0 Time', ev.time + ' \u2013 ' + ev.endTime],
    ['\uD83C\uDFAB Capacity', ev.cap.toLocaleString() + ' attendees'],
    ['\uD83C\uDFAD Tickets Sold', ev.tickets.toLocaleString()],
  ];

  return renderTopNav() +
  '<div style="max-width:1160px;margin:0 auto;padding:32px;">' +
    '<button class="btn-ghost" style="margin-bottom:24px;" onclick="navigate(\'home\')">\u2190 Back to Events</button>' +
    '<div style="position:relative;border-radius:20px;overflow:hidden;margin-bottom:36px;">' +
      '<img src="https://placehold.co/1160x360/1e1a3a/3a3560?text=' + encodeURIComponent(ev.name) + '" alt="' + ev.name + '" style="width:100%;height:320px;object-fit:cover;display:block;" />' +
      '<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(13,12,26,0.9) 0%,rgba(13,12,26,0.3) 60%,transparent 100%);"></div>' +
      '<div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(233,22,102,0.2),rgba(255,180,0,0.1));mix-blend-mode:multiply;"></div>' +
      '<div style="position:absolute;bottom:28px;left:32px;">' +
        '<span class="badge badge-cat" style="margin-bottom:10px;">' + ev.cat + '</span>' +
        '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:clamp(24px,4vw,42px);letter-spacing:-0.02em;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,0.5);">' + ev.name + '</h1>' +
      '</div>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:1fr 360px;gap:28px;align-items:start;">' +
      '<div>' +
        '<div class="card" style="padding:28px;margin-bottom:24px;">' +
          '<h2 style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:18px;margin-bottom:18px;">Event Information</h2>' +
          '<p style="color:var(--muted);line-height:1.8;margin-bottom:24px;">' + ev.desc + '</p>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">' +
            infoItems.map(function(item) {
              return '<div style="background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:14px;">' +
                '<div style="font-size:12px;color:var(--muted);margin-bottom:4px;font-family:\'Montserrat\',sans-serif;font-weight:600;">' + item[0] + '</div>' +
                '<div style="font-weight:500;font-size:14px;">' + item[1] + '</div>' +
              '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="card" style="padding:28px;">' +
          '<h2 style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:18px;margin-bottom:6px;"><span class="grad-text">AI</span> Crowd Forecast</h2>' +
          '<p style="color:var(--muted);font-size:13px;margin-bottom:20px;">Machine learning predictions based on historical data and real-time signals.</p>' +
          '<div style="display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap;">' +
            forecastHours.map(function(h, i) {
              var d = forecastData[i];
              var col = d < 50 ? '#22C55E' : d < 75 ? '#F59E0B' : '#EF4444';
              return '<div style="flex:1;min-width:60px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:10px;text-align:center;">' +
                '<div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:11px;color:var(--muted);margin-bottom:6px;">' + h + '</div>' +
                '<div style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:16px;color:' + col + ';">' + d + '%</div>' +
                '<div style="height:3px;background:rgba(255,255,255,0.08);border-radius:2px;margin-top:8px;overflow:hidden;"><div style="height:100%;width:' + d + '%;background:' + col + ';border-radius:2px;"></div></div>' +
              '</div>';
            }).join('') +
          '</div>' +
          '<div style="background:rgba(255,180,0,0.08);border:1px solid rgba(255,180,0,0.2);border-radius:10px;padding:14px;display:flex;gap:12px;align-items:center;">' +
            '<span style="font-size:20px;">\uD83D\uDCA1</span>' +
            '<div><div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:13px;color:#FFB400;margin-bottom:2px;">Best Time to Visit</div><div style="font-size:13px;color:var(--muted);">' + ev.best + '</div></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="position:sticky;top:80px;">' +
        '<div class="card" style="padding:24px;">' +
          '<div style="text-align:center;margin-bottom:20px;">' +
            '<div style="font-size:12px;color:var(--muted);font-family:\'Montserrat\',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Current Crowd Level</div>' +
            levelBadge(ev.level) +
            '<div style="margin-top:12px;"><span style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:42px;color:' + capBarColor(ev.pct) + ';">' + ev.pct + '%</span><span style="font-size:14px;color:var(--muted);"> capacity</span></div>' +
          '</div>' +
          '<div class="cap-bar-outer" style="height:10px;margin-bottom:20px;">' +
            '<div class="cap-bar-inner" style="width:' + ev.pct + '%;background:' + capBarColor(ev.pct) + ';"></div>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">' +
            '<div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--muted);">\uD83D\uDCCD Predicted Peak</span><span style="font-weight:500;">' + ev.peak + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--muted);">\u2705 Best Visit Time</span><span style="font-weight:500;color:#22C55E;">' + ev.best + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--muted);">\uD83C\uDFAB Tickets Available</span><span style="font-weight:500;">' + (ev.cap - ev.tickets).toLocaleString() + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--muted);">\u26A0\uFE0F Active Alerts</span><span style="font-weight:500;color:' + (ev.alerts > 0 ? '#EF4444' : '#22C55E') + ';">' + ev.alerts + '</span></div>' +
          '</div>' +
          '<button class="btn-primary" style="width:100%;justify-content:center;font-size:15px;padding:14px;" onclick="showToast(\'Redirecting to ticket purchase\u2026\')">\uD83C\uDFAD Buy Ticket</button>' +
          '<div style="margin-top:16px;display:flex;align-items:center;justify-content:space-between;padding:12px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;">' +
            '<div><div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:13px;margin-bottom:2px;">Crowd Alerts</div><div style="font-size:12px;color:var(--muted);">Get notified of high density</div></div>' +
            '<label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer;">' +
              '<input type="checkbox" id="notif-toggle" style="opacity:0;width:0;height:0;position:absolute;" onchange="toggleAlertSwitch(this)" />' +
              '<span id="toggle-track" style="position:absolute;inset:0;background:rgba(255,255,255,0.1);border-radius:12px;border:1px solid var(--border);transition:background 0.2s;"></span>' +
              '<span id="toggle-thumb" style="position:absolute;top:3px;left:3px;width:16px;height:16px;background:#fff;border-radius:50%;transition:transform 0.2s;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></span>' +
            '</label>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function toggleAlertSwitch(el) {
  var track = document.getElementById('toggle-track');
  var thumb = document.getElementById('toggle-thumb');
  if (track) track.style.background = el.checked ? 'linear-gradient(135deg,#E91666,#FFB400)' : 'rgba(255,255,255,0.1)';
  if (thumb) thumb.style.transform = el.checked ? 'translateX(20px)' : 'translateX(0)';
  showToast(el.checked ? 'Subscribed to crowd alerts!' : 'Unsubscribed from alerts', el.checked ? 'success' : 'error');
}
window.toggleAlertSwitch = toggleAlertSwitch;
