// ============================================================
//  VIEW: CREATE EVENT
// ============================================================
function renderCreate() {
  return '<div class="org-layout">' +
    renderSidebar('create') +
    '<main class="org-main">' +
      '<div style="padding:32px;max-width:920px;">' +
        '<div style="margin-bottom:28px;">' +
          '<button class="btn-ghost" style="margin-bottom:16px;" onclick="navigate(\'dashboard\')">\u2190 Back to Dashboard</button>' +
          '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:28px;letter-spacing:-0.02em;">Create New Event</h1>' +
          '<p style="font-size:14px;color:var(--muted);">Fill in the details below to create and publish your event.</p>' +
        '</div>' +
        '<div class="card" style="padding:32px;">' +
          '<form onsubmit="doCreateEvent(event)" id="create-form">' +
            '<div class="form-section-title">Basic Information</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">' +
              '<div style="grid-column:1/-1;"><label class="field-label">Event Name *</label><input type="text" class="input-field" placeholder="Enter event name\u2026" required id="f-name" /></div>' +
              '<div><label class="field-label">Category *</label><select class="input-field" required id="f-cat"><option value="">Select category</option><option>Music</option><option>Technology</option><option>Sports</option><option>Art</option><option>Food</option><option>Entertainment</option></select></div>' +
              '<div><label class="field-label">Organizer Name</label><input type="text" class="input-field" placeholder="Your organization" id="f-org" value="' + (state.user ? state.user.name : '') + '" /></div>' +
              '<div style="grid-column:1/-1;"><label class="field-label">Description *</label><textarea class="input-field" rows="4" placeholder="Describe your event\u2026" required id="f-desc" style="resize:vertical;"></textarea></div>' +
            '</div>' +
            '<div class="section-divider"></div>' +
            '<div class="form-section-title">Location &amp; Date</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">' +
              '<div><label class="field-label">Venue / Location *</label><input type="text" class="input-field" placeholder="Venue name" required id="f-loc" /></div>' +
              '<div><label class="field-label">City *</label><input type="text" class="input-field" placeholder="City" required id="f-city" /></div>' +
              '<div><label class="field-label">Start Date *</label><input type="date" class="input-field" required id="f-date" /></div>' +
              '<div><label class="field-label">Start Time *</label><input type="time" class="input-field" required id="f-time" /></div>' +
              '<div><label class="field-label">End Time</label><input type="time" class="input-field" id="f-endtime" /></div>' +
            '</div>' +
            '<div class="section-divider"></div>' +
            '<div class="form-section-title">Capacity &amp; Tickets</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">' +
              '<div><label class="field-label">Total Capacity *</label><input type="number" class="input-field" placeholder="e.g. 5000" min="1" required id="f-cap" /></div>' +
              '<div><label class="field-label">Ticket Price ($)</label><input type="number" class="input-field" placeholder="0.00" min="0" step="0.01" id="f-price" /></div>' +
              '<div style="grid-column:1/-1;"><label class="field-label">Ticket Purchase URL</label><input type="url" class="input-field" placeholder="https://\u2026" id="f-ticketurl" /></div>' +
            '</div>' +
            '<div class="section-divider"></div>' +
            '<div class="form-section-title">Alert Settings</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;">' +
              '<div style="grid-column:1/-1;"><label class="field-label">Alert Threshold: <span id="thresh-val">75</span>%</label><input type="range" min="50" max="95" value="75" step="5" id="f-thresh" oninput="document.getElementById(\'thresh-val\').textContent=this.value" /><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:4px;"><span>50%</span><span>95%</span></div></div>' +
              '<div><label class="field-label" style="margin-bottom:12px;">Notification Channels</label><div style="display:flex;flex-direction:column;gap:10px;">' +
                ['Push Notifications','Email Alerts','SMS Alerts','In-App Notifications'].map(function(l) {
                  return '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:14px;"><input type="checkbox" ' + (l.includes('Push')||l.includes('In-App')?'checked':'') + ' /><span>' + l + '</span></label>';
                }).join('') +
              '</div></div>' +
              '<div><label class="field-label" style="margin-bottom:12px;">Alert Types</label><div style="display:flex;flex-direction:column;gap:10px;">' +
                ['High Crowd Density','Emergency Events','Event Updates','Entry/Exit Counts'].map(function(l) {
                  return '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:14px;"><input type="checkbox" checked /><span>' + l + '</span></label>';
                }).join('') +
              '</div></div>' +
            '</div>' +
            '<div style="display:flex;gap:12px;justify-content:flex-end;">' +
              '<button type="button" class="btn-ghost" onclick="navigate(\'dashboard\')">Cancel</button>' +
              '<button type="submit" class="btn-primary" style="padding:12px 28px;">\u2728 Publish Event</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</main>' +
  '</div>';
}

function doCreateEvent(e) {
  e.preventDefault();
  var name = document.getElementById('f-name').value;
  var cat = document.getElementById('f-cat').value;
  var desc = document.getElementById('f-desc').value;
  var loc = document.getElementById('f-loc').value;
  var city = document.getElementById('f-city').value;
  var dateRaw = document.getElementById('f-date').value;
  var time = document.getElementById('f-time').value;
  var endTime = document.getElementById('f-endtime').value;
  var cap = parseInt(document.getElementById('f-cap').value) || 0;
  var org = document.getElementById('f-org').value || (state.user ? state.user.name : 'Unknown');
  var dateObj = dateRaw ? new Date(dateRaw) : new Date();
  var dateFmt = dateObj.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  var newId = EVENTS.length > 0 ? Math.max.apply(null, EVENTS.map(function(ev){return ev.id;})) + 1 : 1;
  EVENTS.push({ id:newId, name:name, cat:cat, loc:loc, city:city, date:dateFmt, time:time, endTime:endTime, cap:cap, tickets:0, attend:0, level:'low', pct:0, desc:desc, peak:'TBD', best:'Anytime', org:org, alerts:0 });
  showToast('Event "' + name + '" created successfully!', 'success');
  navigate('dashboard');
}
window.doCreateEvent = doCreateEvent;
