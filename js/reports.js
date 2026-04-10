// ============================================================
//  VIEW: REPORTS
// ============================================================
function renderReports() {
  return '<div class="org-layout">' +
    renderSidebar('reports') +
    '<main class="org-main" id="org-main-reports">' +
      '<div style="padding:32px;">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:16px;">' +
          '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:28px;letter-spacing:-0.02em;">Reports</h1>' +
          '<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">' +
            '<select class="input-field" style="width:200px;font-size:13px;">' + EVENTS.map(function(e){return '<option>'+e.name+'</option>';}).join('') + '</select>' +
            '<input type="date" class="input-field" style="width:160px;font-size:13px;" />' +
            '<input type="date" class="input-field" style="width:160px;font-size:13px;" />' +
            '<button class="btn-primary" style="font-size:13px;" onclick="showToast(\'PDF report exported!\',\'success\')">\uD83D\uDCC4 Export PDF</button>' +
          '</div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:18px;margin-bottom:32px;">' +
          [
            { label:'Total Attendance', value:'30,780', icon:'\uD83D\uDC65', delta:'+6.2%', up:true },
            { label:'Peak Crowd %', value:'95%', icon:'\uD83D\uDCCA', delta:'Sports Champ.', up:false },
            { label:'Tickets Sold', value:'37,720', icon:'\uD83C\uDFAD', delta:'+14.1%', up:true },
            { label:'Alerts Triggered', value:'11', icon:'\u26A0\uFE0F', delta:'3 critical', up:false },
          ].map(function(s) {
            return '<div class="stat-card">' +
              '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;">' +
                '<div style="font-size:11px;color:var(--muted);font-family:\'Montserrat\',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">' + s.label + '</div>' +
                '<span style="font-size:20px;">' + s.icon + '</span>' +
              '</div>' +
              '<div style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:26px;letter-spacing:-0.02em;margin-bottom:4px;">' + s.value + '</div>' +
              '<div style="font-size:12px;color:' + (s.up?'#22C55E':'#F59E0B') + ';">' + s.delta + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px;">' +
          '<div class="card" style="padding:24px;"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:15px;margin-bottom:18px;">Events Performance</h3><div class="chart-wrap" style="height:240px;"><canvas id="chart-perf"></canvas></div></div>' +
          '<div class="card" style="padding:24px;"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:15px;margin-bottom:18px;">Crowd Density Over Hours</h3><div class="chart-wrap" style="height:240px;"><canvas id="chart-density"></canvas></div></div>' +
        '</div>' +
        '<div class="card" style="padding:0;overflow:hidden;">' +
          '<div style="padding:18px 24px;border-bottom:1px solid var(--border);"><h3 style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:15px;">Summary Insights</h3></div>' +
          '<table class="data-table">' +
            '<thead><tr><th>Metric</th><th>Value</th><th>Benchmark</th><th>Status</th></tr></thead>' +
            '<tbody>' +
              [
                ['Avg Attendance Rate','81.7%','> 70%','good'],
                ['Avg Crowd Density','59.2%','< 80%','good'],
                ['High-Alert Events','2 / 6','< 1 / 6','warn'],
                ['Ticket Sell-Through','94.3%','> 85%','good'],
                ['Customer Satisfaction','4.3 / 5.0','> 4.0','good'],
                ['Security Incidents','3','< 2','warn'],
                ['Peak Load Time','8:00 PM avg','Managed','good'],
                ['Staff-to-Attendee Ratio','1:32','< 1:50','good'],
              ].map(function(row) {
                return '<tr>' +
                  '<td style="font-weight:500;">' + row[0] + '</td>' +
                  '<td style="font-family:\'Montserrat\',sans-serif;font-weight:700;">' + row[1] + '</td>' +
                  '<td style="color:var(--muted);font-size:13px;">' + row[2] + '</td>' +
                  '<td>' + (row[3]==='good' ? '<span class="badge badge-low">\u2713 Good</span>' : '<span class="badge badge-medium">\u26A0 Review</span>') + '</td>' +
                '</tr>';
              }).join('') +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
    '</main>' +
  '</div>';
}

function initReportsCharts() {
  Chart.defaults.color = 'rgba(180,175,220,0.6)';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.07)';
  var perfLabels = EVENTS.map(function(e) { return e.name.split(' ').slice(0,2).join(' '); });
  var tickets = [3800,620,29500,420,2900,480];
  var attendance = [2100,280,27500,320,2700,380];
  var cp = document.getElementById('chart-perf');
  if (cp) {
    chartReg['perf'] = new Chart(cp, {
      type:'bar',
      data:{ labels:perfLabels, datasets:[
        { label:'Tickets Sold', data:tickets, backgroundColor:'rgba(233,22,102,0.7)', borderColor:'#E91666', borderWidth:1, borderRadius:5 },
        { label:'Attendance', data:attendance, backgroundColor:'rgba(255,180,0,0.7)', borderColor:'#FFB400', borderWidth:1, borderRadius:5 }
      ]},
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top',labels:{font:{family:'Montserrat',size:11},boxWidth:12,padding:14}}}, scales:{ x:{grid:{display:false},ticks:{font:{size:10},maxRotation:30}}, y:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{font:{size:11}}}}}
    });
  }
  var cd = document.getElementById('chart-density');
  if (cd) {
    chartReg['density'] = new Chart(cd, {
      type:'line',
      data:{ labels:['10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM'], datasets:[{ label:'Crowd Density %', data:[28,42,58,72,80,85,88,82,75,60], borderColor:'#E91666', backgroundColor:'rgba(233,22,102,0.1)', tension:0.4, fill:true, pointRadius:4, pointBackgroundColor:'#E91666', pointHoverRadius:6 }]},
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ x:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{font:{size:11}}}, y:{grid:{color:'rgba(255,255,255,0.05)'},ticks:{font:{size:11},callback:function(v){return v+'%'}},min:0,max:100}}}
    });
  }
}
