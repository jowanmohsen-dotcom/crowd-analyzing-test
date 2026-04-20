// ============================================================
//  VIEW: LOGIN
// ============================================================
function renderLogin() {
  var roles = ['customer','organizer','staff'];
  var roleLabels = ['Customer','Organizer','Staff'];
  return '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden;background:var(--dark);">' +
    '<div class="grid-bg"></div>' +
    '<div style="position:absolute;inset:0;background:radial-gradient(ellipse 700px 500px at 30% 50%,rgba(168,18,80,0.08) 0%,transparent 70%),radial-gradient(ellipse 500px 400px at 70% 40%,rgba(184,120,10,0.05) 0%,transparent 60%);pointer-events:none;"></div>' +
    '<button class="btn-ghost" style="position:absolute;top:24px;left:24px;z-index:10;" onclick="navigate(\'home\')">\u2190 Back</button>' +
    '<div class="card" style="width:100%;max-width:420px;padding:36px;position:relative;z-index:1;background:rgba(255,255,255,0.06);backdrop-filter:blur(16px);">' +
      '<div style="text-align:center;margin-bottom:28px;">' +
        '<img src="' + LOGO + '" alt="Crowd Analyzing" style="height:50px;margin-bottom:16px;" />' +
        '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:22px;margin-bottom:6px;">Welcome Back</h1>' +
        '<p style="color:var(--muted);font-size:14px;">Sign in to continue to Crowd Analyzing</p>' +
      '</div>' +
      '<div style="margin-bottom:24px;">' +
        '<div class="tab-bar" id="role-tabs">' +
          roles.map(function(r, i) {
            return '<button class="tab-btn ' + (state.loginRole===r?'active':'') + '" onclick="state.loginRole=\'' + r + '\';updateRoleTabs()">' + roleLabels[i] + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<form onsubmit="doLogin(event)" id="login-form">' +
        '<div style="margin-bottom:16px;">' +
          '<label class="field-label">Email Address</label>' +
          '<input type="email" class="input-field" placeholder="you@example.com" required id="login-email" />' +
        '</div>' +
        '<div style="margin-bottom:24px;">' +
          '<label class="field-label">Password</label>' +
          '<input type="password" class="input-field" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required id="login-pass" />' +
        '</div>' +
        '<button type="submit" class="btn-primary" style="width:100%;justify-content:center;font-size:15px;padding:14px;">Sign In \u2192</button>' +
      '</form>' +
      '<div style="text-align:center;margin-top:20px;display:flex;flex-direction:column;gap:10px;">' +
        '<button class="nav-link" style="font-size:13px;" onclick="showToast(\'Password reset link sent!\',\'success\')">Forgot Password?</button>' +
        '<div style="font-size:13px;color:var(--muted);">Don\'t have an account? <button class="nav-link" style="display:inline;color:#E91666;font-size:13px;" onclick="navigate(\'signup\')">Create Account</button></div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function updateRoleTabs() {
  var tabs = document.querySelectorAll('#role-tabs .tab-btn');
  var roles = ['customer','organizer','staff'];
  tabs.forEach(function(btn, i) {
    btn.classList.toggle('active', state.loginRole === roles[i]);
  });
}
window.updateRoleTabs = updateRoleTabs;

async function doLogin(e) {
  e.preventDefault();
  var email = document.getElementById('login-email').value.trim();
  var pass  = document.getElementById('login-pass').value;

  var btn = document.querySelector('#login-form button[type="submit"]');
  if (btn) btn.disabled = true;

  var result = await dbLoginUser(email, pass);

  if (result.error) {
    showToast(result.error, 'error');
    if (btn) btn.disabled = false;
    return;
  }

  state.user = result.user;
  showToast('Welcome back, ' + result.user.name + '!', 'success');
  if (state.pendingPurchaseId) {
    var pid = state.pendingPurchaseId;
    state.pendingPurchaseId = null;
    navigate('detail', { id: pid });
    setTimeout(function() { showPaymentModal(pid); }, 400);
    return;
  }
  var dest = result.user.role === 'organizer' ? 'dashboard' : result.user.role === 'staff' ? 'scan' : 'home';
  navigate(dest);
}
window.doLogin = doLogin;
