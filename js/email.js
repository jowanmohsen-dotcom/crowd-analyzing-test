// ============================================================
//  EMAILJS — CROWD ALERT EMAIL SERVICE
// ============================================================
var EMAILJS_SERVICE_ID  = 'service_jzksk6l';
var EMAILJS_TEMPLATE_ID = 'template_8jp9yus';
var EMAILJS_PUBLIC_KEY  = 'mZuNT3Eri_kx5aij-';

emailjs.init(EMAILJS_PUBLIC_KEY);

// Call this to send a crowd alert email.
// toEmail: recipient address, toName: recipient name (optional)
async function sendCrowdAlertEmail(toEmail, toName, eventName, crowdLevel, message) {
  if (!toEmail) { showToast('No recipient email provided.', 'error'); return; }
  var params = {
    to_email:    toEmail,
    to_name:     toName || 'Attendee',
    event_name:  eventName,
    crowd_level: crowdLevel,
    message:     message,
    from_name:   'Crowd Analyzing AI'
  };
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
    showToast('Alert email sent to ' + toEmail, 'success');
  } catch(err) {
    showToast('Email failed: ' + (err.text || err.message || 'unknown error'), 'error');
    console.error('EmailJS error:', err);
  }
}

// Send alert for a specific event to the logged-in user's email
function sendAlertForEvent(ev) {
  var email = state.user && state.user.email ? state.user.email : null;
  var name  = state.user && state.user.name  ? state.user.name  : 'Organizer';
  if (!email) {
    showToast('No email on file — log in with a real email to receive alerts.', 'error');
    return;
  }
  var level   = ev.level ? ev.level.charAt(0).toUpperCase() + ev.level.slice(1) : 'Unknown';
  var message = 'Crowd at ' + ev.name + ' is at ' + ev.pct + '% capacity (' + level + ' level). Please take necessary action.';
  sendCrowdAlertEmail(email, name, ev.name, level, message);
}
window.sendAlertForEvent = sendAlertForEvent;

// Look up notification by id then send
function sendAlertFromNotifById(id) {
  var notif = NOTIFS.find(function(n) { return n.id === id; });
  if (notif) sendAlertFromNotif(notif);
}
window.sendAlertFromNotifById = sendAlertFromNotifById;

// Send alert email from a notification object
function sendAlertFromNotif(notif) {
  var email = state.user && state.user.email ? state.user.email : null;
  var name  = state.user && state.user.name  ? state.user.name  : 'User';
  if (!email) {
    showToast('No email on file — log in with a real email to receive alerts.', 'error');
    return;
  }
  var level = notif.sev ? notif.sev.charAt(0).toUpperCase() + notif.sev.slice(1) : 'Alert';
  sendCrowdAlertEmail(email, name, notif.event, level, notif.msg);
}
window.sendAlertFromNotif = sendAlertFromNotif;
