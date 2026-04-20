// ============================================================
//  FIRESTORE DATA SERVICE
// ============================================================

// Seed data — written to Firestore only if collections are empty
var SEED_EVENTS = [
  { id:1, name:'Summer Music Festival', cat:'Music', loc:'Central Park Arena', city:'New York', date:'Apr 15, 2026', time:'6:00 PM', endTime:'11:00 PM', cap:5000, tickets:3800, attend:2100, level:'medium', pct:42, desc:'An electrifying evening of live music across three stages featuring world-class artists.', peak:'8:00\u20139:30 PM', best:'6:00\u20137:30 PM', org:'Events Corp', alerts:2 },
  { id:2, name:'Tech Conference 2026', cat:'Technology', loc:'Convention Center', city:'San Francisco', date:'Apr 20, 2026', time:'9:00 AM', endTime:'6:00 PM', cap:1000, tickets:620, attend:280, level:'low', pct:28, desc:'The premier technology conference bringing together innovators, founders, and developers.', peak:'11:00 AM\u20131:00 PM', best:'9:00\u201310:30 AM', org:'TechWorld Inc', alerts:0 },
  { id:3, name:'Sports Championship', cat:'Sports', loc:'City Stadium', city:'Chicago', date:'Apr 25, 2026', time:'3:00 PM', endTime:'6:30 PM', cap:30000, tickets:29500, attend:27500, level:'high', pct:92, desc:'The championship final you have been waiting for \u2014 two top teams battle it out.', peak:'3:00\u20135:00 PM', best:'Arrive before 2:00 PM', org:'City Sports Authority', alerts:5 },
  { id:4, name:'Modern Art Exhibition', cat:'Art', loc:'Museum of Modern Art', city:'Los Angeles', date:'May 1, 2026', time:'10:00 AM', endTime:'8:00 PM', cap:800, tickets:420, attend:320, level:'low', pct:40, desc:'A curated exhibition presenting works from 50 emerging and established artists.', peak:'2:00\u20134:00 PM', best:'10:00 AM\u201312:00 PM', org:'Arts Council LA', alerts:0 },
  { id:5, name:'Food & Wine Festival', cat:'Food', loc:'Harbor District Park', city:'Miami', date:'May 10, 2026', time:'12:00 PM', endTime:'10:00 PM', cap:3000, tickets:2900, attend:2700, level:'high', pct:90, desc:'Celebrate culinary culture with top chefs and award-winning wines in a waterfront setting.', peak:'6:00\u20138:00 PM', best:'12:00\u20132:00 PM', org:'Culinary Events Ltd', alerts:3 },
  { id:6, name:'Comedy Night Spectacular', cat:'Entertainment', loc:'Grand Theater', city:'Las Vegas', date:'May 15, 2026', time:'8:00 PM', endTime:'11:00 PM', cap:600, tickets:480, attend:380, level:'medium', pct:63, desc:'An unforgettable night of laughs with the best stand-up comedians in the country.', peak:'9:00\u201310:00 PM', best:'8:00 PM (on time)', org:'LV Entertainment', alerts:1 }
];

var SEED_NOTIFS = [
  { id:1, type:'crowd', sev:'high', event:'Sports Championship', read:false, time:'2 min ago', msg:'Crowd density has reached 92% \u2014 approaching critical levels. Gate B is overloaded.' },
  { id:2, type:'crowd', sev:'high', event:'Food & Wine Festival', read:false, time:'15 min ago', msg:'Main food tent at 90% capacity. Guests are being directed to East Wing tent.' },
  { id:3, type:'update', sev:'info', event:'Tech Conference 2026', read:true, time:'1 hour ago', msg:'Keynote session moved from Hall A to Hall B due to increased registration numbers.' },
  { id:4, type:'emergency', sev:'critical', event:'Summer Music Festival', read:true, time:'3 hours ago', msg:'Emergency: Medical team requested at Zone C. Security personnel please respond immediately.' },
  { id:5, type:'update', sev:'info', event:'Modern Art Exhibition', read:true, time:'5 hours ago', msg:'Exhibition closing time extended from 8:00 PM to 9:00 PM today.' }
];

// ── Seed Firestore on first run ──────────────────────────────
async function seedIfEmpty() {
  var snap = await db.collection('events').limit(1).get();
  if (!snap.empty) return;
  var batch = db.batch();
  SEED_EVENTS.forEach(function(ev) {
    batch.set(db.collection('events').doc(String(ev.id)), ev);
  });
  SEED_NOTIFS.forEach(function(n) {
    batch.set(db.collection('notifications').doc(String(n.id)), n);
  });
  await batch.commit();
}

// ── Read ─────────────────────────────────────────────────────
async function loadEvents() {
  var snap = await db.collection('events').orderBy('id').get();
  EVENTS = snap.docs.map(function(d) { return d.data(); });
}

async function loadNotifs() {
  var snap = await db.collection('notifications').orderBy('id', 'desc').get();
  NOTIFS = snap.docs.map(function(d) { return d.data(); });
}

async function loadAllData() {
  await Promise.all([loadEvents(), loadNotifs()]);
}

// ── Write ────────────────────────────────────────────────────
async function dbAddEvent(evObj) {
  await db.collection('events').doc(String(evObj.id)).set(evObj);
  EVENTS.push(evObj);
}

async function dbUpdateEvent(id, updates) {
  await db.collection('events').doc(String(id)).update(updates);
  var idx = EVENTS.findIndex(function(e) { return e.id === id; });
  if (idx !== -1) Object.assign(EVENTS[idx], updates);
}

async function dbDeleteEvent(id) {
  await db.collection('events').doc(String(id)).delete();
  EVENTS = EVENTS.filter(function(e) { return e.id !== id; });
}

async function dbMarkNotifRead(id) {
  await db.collection('notifications').doc(String(id)).update({ read: true });
  var n = NOTIFS.find(function(x) { return x.id === id; });
  if (n) n.read = true;
}

// ── Users ────────────────────────────────────────────────────
async function dbRegisterUser(email, password, name, role) {
  var existing = await db.collection('users').doc(email).get();
  if (existing.exists) return { error: 'An account with this email already exists.' };
  var user = { email: email, password: password, name: name, role: role, createdAt: new Date().toISOString() };
  await db.collection('users').doc(email).set(user);
  return { user: user };
}

async function dbLoginUser(email, password) {
  var snap = await db.collection('users').doc(email).get();
  if (!snap.exists) return { error: 'No account found with this email.' };
  var user = snap.data();
  if (user.password !== password) return { error: 'Incorrect password.' };
  return { user: user };
}
