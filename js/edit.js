// ============================================================
//  VIEW: EDIT EVENT
// ============================================================
function renderEdit() {
  var id = state.params.id;
  var ev = EVENTS.find(function(e) { return e.id === id; }) || EVENTS[0];

  function toTimeInput(t) {
    if (!t) return '';
    var m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return '';
    var h = parseInt(m[1]); var min = m[2]; var ampm = m[3].toUpperCase();
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return (h < 10 ? '0' : '') + h + ':' + min;
  }

  return '<div class="org-layout">' +
    renderSidebar('dashboard') +
    '<main class="org-main">' +
      '<div style="padding:32px;max-width:920px;">' +
        '<div style="margin-bottom:28px;">' +
          '<button class="btn-ghost" style="margin-bottom:16px;" onclick="navigate(\'dashboard\')">\u2190 Back to Dashboard</button>' +
          '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:28px;letter-spacing:-0.02em;">Edit Event</h1>' +
          '<p style="font-size:14px;color:var(--muted);">Update the details for <strong>' + ev.name + '</strong></p>' +
        '</div>' +
        '<div class="card" style="padding:32px;">' +
          '<form onsubmit="doSaveEvent(event,' + ev.id + ')" id="edit-form">' +
            '<div class="form-section-title">Basic Information</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">' +
              '<div style="grid-column:1/-1;"><label class="field-label">Event Name *</label><input type="text" class="input-field" required id="ef-name" value="' + ev.name + '" /></div>' +
              '<div><label class="field-label">Category *</label><select class="input-field" required id="ef-cat">' +
                ['Music','Technology','Sports','Art','Food','Entertainment'].map(function(c) { return '<option value="'+c+'" '+(ev.cat===c?'selected':'')+'>'+c+'</option>'; }).join('') +
              '</select></div>' +
              '<div><label class="field-label">Organizer</label><input type="text" class="input-field" id="ef-org" value="' + ev.org + '" /></div>' +
              '<div style="grid-column:1/-1;"><label class="field-label">Description *</label><textarea class="input-field" rows="4" required id="ef-desc" style="resize:vertical;">' + ev.desc + '</textarea></div>' +
            '</div>' +
            '<div class="section-divider"></div>' +
            '<div class="form-section-title">Location &amp; Date</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">' +
              '<div><label class="field-label">Venue *</label><input type="text" class="input-field" required id="ef-loc" value="' + ev.loc + '" /></div>' +
              '<div><label class="field-label">City *</label><input type="text" class="input-field" required id="ef-city" value="' + ev.city + '" /></div>' +
              '<div><label class="field-label">Start Time</label><input type="time" class="input-field" id="ef-time" value="' + toTimeInput(ev.time) + '" /></div>' +
              '<div><label class="field-label">End Time</label><input type="time" class="input-field" id="ef-endtime" value="' + toTimeInput(ev.endTime) + '" /></div>' +
            '</div>' +
            '<div class="section-divider"></div>' +
            '<div class="form-section-title">Capacity &amp; Settings</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;">' +
              '<div><label class="field-label">Total Capacity</label><input type="number" class="input-field" id="ef-cap" value="' + ev.cap + '" min="1" /></div>' +
              '<div><label class="field-label">Current Crowd Level</label><select class="input-field" id="ef-level">' +
                ['low','medium','high'].map(function(l) { return '<option value="'+l+'" '+(ev.level===l?'selected':'')+'>'+(l.charAt(0).toUpperCase()+l.slice(1))+'</option>'; }).join('') +
              '</select></div>' +
            '</div>' +
            '<div style="display:flex;gap:12px;justify-content:flex-end;">' +
              '<button type="button" class="btn-ghost" onclick="navigate(\'dashboard\')">Cancel</button>' +
              '<button type="submit" class="btn-primary" style="padding:12px 28px;">\uD83D\uDCBE Save Changes</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</main>' +
  '</div>';
}

async function doSaveEvent(e, id) {
  e.preventDefault();
  var ev = EVENTS.find(function(x) { return x.id === id; });
  var updates = {
    name:  document.getElementById('ef-name').value,
    cat:   document.getElementById('ef-cat').value,
    desc:  document.getElementById('ef-desc').value,
    loc:   document.getElementById('ef-loc').value,
    city:  document.getElementById('ef-city').value,
    cap:   parseInt(document.getElementById('ef-cap').value) || (ev ? ev.cap : 0),
    level: document.getElementById('ef-level').value,
    org:   document.getElementById('ef-org').value
  };
  try {
    await dbUpdateEvent(id, updates);
    showToast('Event updated successfully!', 'success');
  } catch(err) {
    showToast('Failed to update event. Check Firebase config.', 'error');
    console.error(err);
    return;
  }
  navigate('dashboard');
}
window.doSaveEvent = doSaveEvent;
