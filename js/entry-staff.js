// ============================================================
//  VIEW: ENTRY STAFF (SCANNER)
// ============================================================
function renderScan() {
  var ss = state.scanStats;
  var evIdx = (state.params && state.params.scanEvent !== undefined) ? state.params.scanEvent : 0;
  var evName = EVENTS[evIdx] ? EVENTS[evIdx].name : 'Select Event';

  return '<div style="min-height:100vh;background:var(--dark);display:flex;flex-direction:column;">' +
    '<header style="background:var(--dark2);border-bottom:1px solid var(--border);padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;">' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<img src="' + LOGO + '" alt="Crowd Analyzing" style="height:32px;" />' +
        '<div style="width:1px;height:24px;background:var(--border);"></div>' +
        '<div><div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:13px;">Entry Staff Portal</div><div style="font-size:11px;color:var(--muted);">' + evName + '</div></div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:12px;">' +
        '<button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme" id="theme-btn">' + (document.documentElement.getAttribute('data-theme') === 'light' ? '\u2600\uFE0F' : '\uD83C\uDF19') + '</button>' +
        '<button class="btn-ghost" style="font-size:12px;" onclick="state.user=null;navigate(\'login\')">\uD83D\uDEAA Logout</button>' +
      '</div>' +
    '</header>' +
    '<main style="flex:1;display:flex;flex-direction:column;align-items:center;padding:32px 24px;gap:24px;max-width:640px;margin:0 auto;width:100%;">' +
      '<div style="width:100%;">' +
        '<label class="field-label">Current Event</label>' +
        '<select class="input-field" style="font-size:14px;" onchange="state.params.scanEvent=parseInt(this.value);navigate(\'scan\',state.params)">' +
          EVENTS.map(function(e, i) { return '<option value="'+i+'" '+(i===evIdx?'selected':'')+'>'+e.name+'</option>'; }).join('') +
        '</select>' +
      '</div>' +
      '<div class="scan-area" style="width:100%;max-width:380px;aspect-ratio:1;border:3px solid rgba(233,22,102,0.5);border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:rgba(233,22,102,0.04);position:relative;overflow:hidden;">' +
        '<div style="position:absolute;inset:0;background:radial-gradient(circle,rgba(233,22,102,0.06) 0%,transparent 70%);pointer-events:none;"></div>' +
        '<div style="position:absolute;top:12px;left:12px;width:24px;height:24px;border-top:3px solid #E91666;border-left:3px solid #E91666;border-radius:4px 0 0 0;"></div>' +
        '<div style="position:absolute;top:12px;right:12px;width:24px;height:24px;border-top:3px solid #E91666;border-right:3px solid #E91666;border-radius:0 4px 0 0;"></div>' +
        '<div style="position:absolute;bottom:12px;left:12px;width:24px;height:24px;border-bottom:3px solid #E91666;border-left:3px solid #E91666;border-radius:0 0 0 4px;"></div>' +
        '<div style="position:absolute;bottom:12px;right:12px;width:24px;height:24px;border-bottom:3px solid #E91666;border-right:3px solid #E91666;border-radius:0 0 4px 0;"></div>' +
        '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:0.5;">' +
          '<rect x="4" y="4" width="28" height="28" rx="4" stroke="#E91666" stroke-width="3"/>' +
          '<rect x="12" y="12" width="12" height="12" rx="2" fill="#E91666"/>' +
          '<rect x="48" y="4" width="28" height="28" rx="4" stroke="#E91666" stroke-width="3"/>' +
          '<rect x="56" y="12" width="12" height="12" rx="2" fill="#E91666"/>' +
          '<rect x="4" y="48" width="28" height="28" rx="4" stroke="#E91666" stroke-width="3"/>' +
          '<rect x="12" y="56" width="12" height="12" rx="2" fill="#E91666"/>' +
          '<rect x="48" y="48" width="8" height="8" rx="1" fill="#E91666" opacity="0.5"/>' +
          '<rect x="60" y="48" width="8" height="8" rx="1" fill="#E91666" opacity="0.5"/>' +
          '<rect x="48" y="60" width="8" height="8" rx="1" fill="#E91666" opacity="0.5"/>' +
          '<rect x="60" y="60" width="8" height="8" rx="1" fill="#E91666" opacity="0.5"/>' +
          '<rect x="54" y="54" width="8" height="8" rx="1" fill="#E91666"/>' +
        '</svg>' +
        '<div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;letter-spacing:0.12em;color:rgba(233,22,102,0.8);">SCANNER READY</div>' +
        '<div style="font-size:12px;color:var(--muted);">Point camera at QR or enter ticket code below</div>' +
      '</div>' +
      '<div style="width:100%;">' +
        '<label class="field-label">Ticket Code</label>' +
        '<div style="display:flex;gap:10px;">' +
          '<input type="text" class="input-field" id="ticket-input" placeholder="e.g. TKT-001" style="font-size:16px;font-family:\'Montserrat\',sans-serif;font-weight:700;letter-spacing:0.08em;text-align:center;" onkeydown="if(event.key===\'Enter\')validateTicket()" />' +
          '<button class="btn-primary" style="white-space:nowrap;" onclick="validateTicket()">Validate</button>' +
        '</div>' +
      '</div>' +
      '<div id="scan-result" style="width:100%;"></div>' +
      '<div style="width:100%;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;" id="scan-stats">' +
        [
          { label:'Total Scanned', val: ss.total, color: '#E91666' },
          { label:'Valid', val: ss.valid, color: '#22C55E' },
          { label:'Invalid', val: ss.invalid, color: '#EF4444' },
        ].map(function(s) {
          return '<div class="stat-card" style="text-align:center;padding:16px;">' +
            '<div style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:28px;color:' + s.color + ';margin-bottom:4px;">' + s.val + '</div>' +
            '<div style="font-size:12px;color:var(--muted);font-family:\'Montserrat\',sans-serif;font-weight:600;">' + s.label + '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</main>' +
  '</div>';
}

function validateTicket() {
  var input = document.getElementById('ticket-input');
  if (!input) return;
  var code = input.value.trim().toUpperCase();
  var resultEl = document.getElementById('scan-result');
  if (!code) { showToast('Please enter a ticket code', 'error'); return; }

  var validPattern = /^TKT-0(0[1-9]|10)$/;
  var usedPattern = /^TKT-0(1[1-9]|2[0-5])$/;
  var html = '';

  if (validPattern.test(code) && !state.scannedSet.has(code)) {
    state.scanStats.total++;
    state.scanStats.valid++;
    state.scannedSet.add(code);
    html = '<div style="background:rgba(34,197,94,0.1);border:2px solid rgba(34,197,94,0.4);border-radius:14px;padding:20px;text-align:center;">' +
      '<div style="font-size:40px;margin-bottom:8px;">\u2705</div>' +
      '<div style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:20px;color:#22C55E;margin-bottom:4px;">VALID TICKET</div>' +
      '<div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;margin-bottom:12px;">' + code + ' \u2014 Entry Granted</div>' +
      '<div style="display:flex;justify-content:center;gap:24px;font-size:13px;color:var(--muted);">' +
        '<span>\uD83D\uDC64 Demo Attendee</span><span>\uD83D\uDCBA General Admission</span><span>\uD83D\uDD50 ' + new Date().toLocaleTimeString() + '</span>' +
      '</div>' +
    '</div>';
    showToast('Entry granted!', 'success');
  } else if (state.scannedSet.has(code) || usedPattern.test(code) || validPattern.test(code)) {
    state.scanStats.total++;
    html = '<div style="background:rgba(245,158,11,0.1);border:2px solid rgba(245,158,11,0.4);border-radius:14px;padding:20px;text-align:center;">' +
      '<div style="font-size:40px;margin-bottom:8px;">\u26A0\uFE0F</div>' +
      '<div style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:20px;color:#F59E0B;margin-bottom:4px;">ALREADY USED</div>' +
      '<div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;margin-bottom:8px;">' + code + '</div>' +
      '<div style="font-size:13px;color:var(--muted);">This ticket was previously scanned. Entry denied.</div>' +
    '</div>';
    showToast('Ticket already used!', 'error');
  } else {
    state.scanStats.total++;
    state.scanStats.invalid++;
    html = '<div style="background:rgba(239,68,68,0.1);border:2px solid rgba(239,68,68,0.4);border-radius:14px;padding:20px;text-align:center;">' +
      '<div style="font-size:40px;margin-bottom:8px;">\u274C</div>' +
      '<div style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:20px;color:#EF4444;margin-bottom:4px;">INVALID TICKET</div>' +
      '<div style="font-family:\'Montserrat\',sans-serif;font-weight:700;font-size:14px;margin-bottom:8px;">' + code + '</div>' +
      '<div style="font-size:13px;color:var(--muted);">Ticket not found in the system. Please contact support.</div>' +
    '</div>';
    showToast('Invalid ticket code!', 'error');
  }

  if (resultEl) resultEl.innerHTML = html;

  var statsEl = document.getElementById('scan-stats');
  if (statsEl) {
    var ss = state.scanStats;
    statsEl.innerHTML = [
      { label:'Total Scanned', val: ss.total, color: '#E91666' },
      { label:'Valid', val: ss.valid, color: '#22C55E' },
      { label:'Invalid', val: ss.invalid, color: '#EF4444' },
    ].map(function(s) {
      return '<div class="stat-card" style="text-align:center;padding:16px;">' +
        '<div style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:28px;color:' + s.color + ';margin-bottom:4px;">' + s.val + '</div>' +
        '<div style="font-size:12px;color:var(--muted);font-family:\'Montserrat\',sans-serif;font-weight:600;">' + s.label + '</div>' +
      '</div>';
    }).join('');
  }

  input.value = '';
  input.focus();
}
window.validateTicket = validateTicket;
