// ============================================================
//  NAVIGATION
// ============================================================
var DATA_VIEWS = ['home','dashboard','reports','detail','notifications'];

async function navigate(view, params) {
  params = params || {};
  state.view = view;
  state.params = params;
  if (DATA_VIEWS.indexOf(view) !== -1) {
    await loadAllData();
  }
  render();
}
window.navigate = navigate;

// ============================================================
//  RENDER ROUTER
// ============================================================
function render() {
  destroyAllCharts();
  var app = document.getElementById('app');
  var v = state.view;

  if (v === 'home') {
    app.innerHTML = renderHome();
  } else if (v === 'detail') {
    app.innerHTML = renderDetail();
  } else if (v === 'login') {
    app.innerHTML = renderLogin();
  } else if (v === 'signup') {
    app.innerHTML = renderSignup();
  } else if (v === 'notifications') {
    app.innerHTML = renderNotifications();
  } else if (v === 'dashboard') {
    if (!state.user || state.user.role !== 'organizer') { navigate('login'); return; }
    app.innerHTML = renderDashboard();
    setTimeout(initDashboardCharts, 20);
  } else if (v === 'create') {
    if (!state.user || state.user.role !== 'organizer') { navigate('login'); return; }
    app.innerHTML = renderCreate();
  } else if (v === 'edit') {
    if (!state.user || state.user.role !== 'organizer') { navigate('login'); return; }
    app.innerHTML = renderEdit();
  } else if (v === 'scan') {
    if (!state.user) { navigate('login'); return; }
    app.innerHTML = renderScan();
  } else if (v === 'reports') {
    if (!state.user || state.user.role !== 'organizer') { navigate('login'); return; }
    app.innerHTML = renderReports();
    setTimeout(initReportsCharts, 20);
  } else {
    app.innerHTML = renderHome();
  }

  window.scrollTo(0, 0);
}

// Boot — seed Firestore on first run, then load data and render
async function initApp() {
  try {
    await seedIfEmpty();
    await loadAllData();
  } catch(err) {
    console.error('Firebase init failed:', err);
    showToast('Could not connect to database. Check Firebase config.', 'error');
  }
  render();
}
initApp();
