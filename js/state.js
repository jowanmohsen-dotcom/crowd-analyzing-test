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
//  DATA (populated from Firestore by db.js on boot)
// ============================================================
var EVENTS = [];
var NOTIFS = [];

// ============================================================
//  CHART REGISTRY
// ============================================================
var chartReg = {};
function destroyAllCharts() {
  Object.keys(chartReg).forEach(function(k) { try { chartReg[k].destroy(); } catch(e){} delete chartReg[k]; });
}
