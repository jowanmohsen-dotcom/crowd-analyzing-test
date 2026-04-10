// ============================================================
//  STATE
// ============================================================
var state = {
  user: null,
  view: 'home',
  params: {},
  notifFilter: 'all',
  catFilter: 'all',
  scannedSet: new Set(['TKT-011','TKT-012','TKT-013','TKT-014','TKT-015','TKT-016','TKT-017','TKT-018','TKT-019','TKT-020','TKT-021','TKT-022','TKT-023','TKT-024','TKT-025']),
  scanStats: { total: 15, valid: 10, invalid: 5 },
  loginRole: 'customer',
};

// ============================================================
//  MOCK DATA
// ============================================================
var EVENTS = [
  { id:1, name:'Summer Music Festival', cat:'Music', loc:'Central Park Arena', city:'New York', date:'Apr 15, 2026', time:'6:00 PM', endTime:'11:00 PM', cap:5000, tickets:3800, attend:2100, level:'medium', pct:42, desc:'An electrifying evening of live music across three stages featuring world-class artists.', peak:'8:00\u20139:30 PM', best:'6:00\u20137:30 PM', org:'Events Corp', alerts:2 },
  { id:2, name:'Tech Conference 2026', cat:'Technology', loc:'Convention Center', city:'San Francisco', date:'Apr 20, 2026', time:'9:00 AM', endTime:'6:00 PM', cap:1000, tickets:620, attend:280, level:'low', pct:28, desc:'The premier technology conference bringing together innovators, founders, and developers.', peak:'11:00 AM\u20131:00 PM', best:'9:00\u201310:30 AM', org:'TechWorld Inc', alerts:0 },
  { id:3, name:'Sports Championship', cat:'Sports', loc:'City Stadium', city:'Chicago', date:'Apr 25, 2026', time:'3:00 PM', endTime:'6:30 PM', cap:30000, tickets:29500, attend:27500, level:'high', pct:92, desc:'The championship final you have been waiting for \u2014 two top teams battle it out.', peak:'3:00\u20135:00 PM', best:'Arrive before 2:00 PM', org:'City Sports Authority', alerts:5 },
  { id:4, name:'Modern Art Exhibition', cat:'Art', loc:'Museum of Modern Art', city:'Los Angeles', date:'May 1, 2026', time:'10:00 AM', endTime:'8:00 PM', cap:800, tickets:420, attend:320, level:'low', pct:40, desc:'A curated exhibition presenting works from 50 emerging and established artists.', peak:'2:00\u20134:00 PM', best:'10:00 AM\u201312:00 PM', org:'Arts Council LA', alerts:0 },
  { id:5, name:'Food & Wine Festival', cat:'Food', loc:'Harbor District Park', city:'Miami', date:'May 10, 2026', time:'12:00 PM', endTime:'10:00 PM', cap:3000, tickets:2900, attend:2700, level:'high', pct:90, desc:'Celebrate culinary culture with top chefs and award-winning wines in a waterfront setting.', peak:'6:00\u20138:00 PM', best:'12:00\u20132:00 PM', org:'Culinary Events Ltd', alerts:3 },
  { id:6, name:'Comedy Night Spectacular', cat:'Entertainment', loc:'Grand Theater', city:'Las Vegas', date:'May 15, 2026', time:'8:00 PM', endTime:'11:00 PM', cap:600, tickets:480, attend:380, level:'medium', pct:63, desc:'An unforgettable night of laughs with the best stand-up comedians in the country.', peak:'9:00\u201310:00 PM', best:'8:00 PM (on time)', org:'LV Entertainment', alerts:1 },
];

var NOTIFS = [
  { id:1, type:'crowd', sev:'high', event:'Sports Championship', read:false, time:'2 min ago', msg:'Crowd density has reached 92% \u2014 approaching critical levels. Gate B is overloaded.' },
  { id:2, type:'crowd', sev:'high', event:'Food & Wine Festival', read:false, time:'15 min ago', msg:'Main food tent at 90% capacity. Guests are being directed to East Wing tent.' },
  { id:3, type:'update', sev:'info', event:'Tech Conference 2026', read:true, time:'1 hour ago', msg:'Keynote session moved from Hall A to Hall B due to increased registration numbers.' },
  { id:4, type:'emergency', sev:'critical', event:'Summer Music Festival', read:true, time:'3 hours ago', msg:'Emergency: Medical team requested at Zone C. Security personnel please respond immediately.' },
  { id:5, type:'update', sev:'info', event:'Modern Art Exhibition', read:true, time:'5 hours ago', msg:'Exhibition closing time extended from 8:00 PM to 9:00 PM today.' },
];

// ============================================================
//  CHART REGISTRY
// ============================================================
var chartReg = {};
function destroyAllCharts() {
  Object.keys(chartReg).forEach(function(k) { try { chartReg[k].destroy(); } catch(e){} delete chartReg[k]; });
}
