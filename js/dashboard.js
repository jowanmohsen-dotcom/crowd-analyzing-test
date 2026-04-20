// ============================================================
//  VIEW: DASHBOARD
// ============================================================
function renderDashboard() {
  var highEvents = EVENTS.filter(function(e) { return e.level === 'high'; });
  var today = new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

  var statCards = [
    { label:'Total Tickets Sold', value:'9,150', icon:'\uD83C\uDFAD', delta:'+12.3%', up:true },
    { label:'Current Attendance', value:'3,200', icon:'\uD83D\uDC65', delta:'+8.1%', up:true },
    { label:'Predicted Level', value:'medium', icon:'\uD83D\uDCCA', badge:true },
    { label:'Active Alerts', value:'3', icon:'\u26A0\uFE0F', delta:'\u2191 Critical', up:false },
  ];

  return '<div class="org-layout">' +
    renderSidebar('dashboard') +
    '<main class="org-main" id="org-main">' +
      '<div style="padding:32px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;">' +
          '<div>' +
            '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:28px;letter-spacing:-0.02em;margin-bottom:4px;">Dashboard</h1>' +
            '<p style="font-size:13px;color:var(--muted);">\uD83D\uDCC5 ' + today + '</p>' +
          '</div>' +
          '<button class="btn-primary" onclick="sendAlertForEvent(EVENTS.filter(function(e){return e.level===\'high\';})[0]||EVENTS[0])">\uD83D\uDCE2 Send Alert</button>' +
        '</div>' +
        (highEvents.length > 0 ?
          '<div class="alert-banner">' +
            '<span style="font-size:20px;">\uD83D\uDEA8</span>' +
            '<div>' +
              '<div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;color:#EF4444;margin-bottom:2px;">High Density Alert</div>' +
              '<div style="font-size:13px;color:var(--muted);">' + highEvents.map(function(e){return e.name;}).join(', ') + ' ' + (highEvents.length>1?'are':'is') + ' approaching critical crowd levels.</div>' +
            '</div>' +
            '<button class="btn-danger" style="margin-left:auto;white-space:nowrap;" onclick="showToast(\'Viewing alerts\u2026\')">View Alerts</button>' +
          '</div>' : '') +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;margin-bottom:32px;">' +
          statCards.map(function(s) {
            return '<div class="stat-card">' +
              '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;">' +
                '<div style="font-size:11px;color:var(--muted);font-family:\'Montserrat\',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">' + s.label + '</div>' +
                '<span style="font-size:22px;">' + s.icon + '</span>' +
              '</div>' +
              (s.badge
                ? '<div style="margin-bottom:6px;">' + levelBadge(s.value) + '</div>'
                : '<div style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:28px;letter-spacing:-0.02em;margin-bottom:6px;">' + s.value + '</div>') +
              (s.delta ? '<div style="font-size:12px;color:' + (s.up?'#22C55E':'#EF4444') + ';">' + s.delta + '</div>' : '') +
            '</div>';
          }).join('') +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px;">' +
          '<div class="card" style="padding:24px;">' +
            '<h3 style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:15px;margin-bottom:18px;">Attendance Timeline</h3>' +
            '<div class="chart-wrap" style="height:220px;"><canvas id="chart-attend"></canvas></div>' +
          '</div>' +
          '<div class="card" style="padding:24px;">' +
            '<h3 style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:15px;margin-bottom:18px;">Crowd Forecast by Hour</h3>' +
            '<div class="chart-wrap" style="height:220px;"><canvas id="chart-forecast"></canvas></div>' +
          '</div>' +
        '</div>' +
        '<div class="card" style="padding:0;overflow:hidden;">' +
          '<div style="padding:20px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">' +
            '<h3 style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:15px;">Event Management</h3>' +
            '<button class="btn-primary" style="font-size:12px;padding:8px 14px;" onclick="navigate(\'create\')">+ New Event</button>' +
          '</div>' +
          '<div style="overflow-x:auto;">' +
            '<table class="data-table">' +
              '<thead><tr><th>Event</th><th>Status</th><th>Tickets</th><th>Attendance</th><th>Crowd</th><th>Actions</th></tr></thead>' +
              '<tbody>' +
                EVENTS.map(function(ev) {
                  return '<tr>' +
                    '<td><div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:13px;">' + ev.name + '</div><div style="font-size:12px;color:var(--muted);">' + ev.date + '</div></td>' +
                    '<td><span class="badge badge-cat">Active</span></td>' +
                    '<td style="font-weight:600;">' + ev.tickets.toLocaleString() + '</td>' +
                    '<td style="font-weight:600;">' + ev.attend.toLocaleString() + '</td>' +
                    '<td>' + levelBadge(ev.level) + '</td>' +
                    '<td><div style="display:flex;gap:6px;">' +
                      '<button class="btn-ghost" style="font-size:11px;padding:6px 10px;" onclick="navigate(\'edit\',{id:' + ev.id + '})">\u270F\uFE0F Edit</button>' +
                      '<button class="btn-ghost" style="font-size:11px;padding:6px 10px;" onclick="navigate(\'reports\')">\uD83D\uDCC8 Report</button>' +
                      '<button class="btn-danger" style="font-size:11px;padding:6px 10px;" onclick="showToast(\'Alert sent!\',\'error\')">\uD83D\uDEA8 Alert</button>' +
                    '</div></td>' +
                  '</tr>';
                }).join('') +
              '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</main>' +
  '</div>';
}

function initDashboardCharts() {
  Chart.defaults.color = 'rgba(180,175,220,0.6)';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.07)';
  var hours = ['12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'];
  var actual = [420,780,1150,1650,2100,2450,2800,3100,3350,3200,3050,2700];
  var forecast = [400,720,1100,1600,2050,2400,2750,3050,3280,3150,3000,2600];
  var ca = document.getElementById('chart-attend');
  if (ca) {
    chartReg['attend'] = new Chart(ca, {
      type: 'line',
      data: { labels: hours, datasets: [
        { label:'Actual', data:actual, borderColor:'#E91666', backgroundColor:'rgba(233,22,102,0.12)', tension:0.4, fill:true, pointRadius:3, pointBackgroundColor:'#E91666' },
        { label:'Forecast', data:forecast, borderColor:'#FFB400', backgroundColor:'rgba(255,180,0,0.07)', tension:0.4, fill:true, borderDash:[5,5], pointRadius:3, pointBackgroundColor:'#FFB400' }
      ]},
      options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'top', labels:{ font:{family:'Montserrat',size:11}, boxWidth:12, padding:14 }}}, scales:{ x:{ grid:{color:'rgba(255,255,255,0.05)'}, ticks:{font:{size:11}} }, y:{ grid:{color:'rgba(255,255,255,0.05)'}, ticks:{font:{size:11}} }}}
    });
  }
  var cf = document.getElementById('chart-forecast');
  if (cf) {
    var fData = [35,55,72,88,95,78];
    var fColors = fData.map(function(d) { return d < 50 ? 'rgba(34,197,94,0.8)' : d < 75 ? 'rgba(245,158,11,0.8)' : 'rgba(239,68,68,0.8)'; });
    chartReg['forecast'] = new Chart(cf, {
      type: 'bar',
      data: { labels:['12PM','2PM','4PM','6PM','8PM','10PM'], datasets:[{ label:'Density %', data:fData, backgroundColor:fColors, borderRadius:6 }]},
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ x:{grid:{display:false},ticks:{font:{size:11}}}, y:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{font:{size:11},callback:function(v){return v+'%'}},max:100}}}
    });
  }
}
