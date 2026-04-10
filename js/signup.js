// ============================================================
//  VIEW: SIGN UP
// ============================================================
function renderSignup() {
  var roles = ['customer','organizer'];
  var roleLabels = ['Attendee','Event Organizer'];
  var signupRole = state.signupRole || 'customer';

  return '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;overflow:hidden;background:var(--dark);">' +
    '<div class="grid-bg"></div>' +
    '<div style="position:absolute;inset:0;background:radial-gradient(ellipse 700px 500px at 70% 50%,rgba(233,22,102,0.1) 0%,transparent 70%),radial-gradient(ellipse 500px 400px at 30% 40%,rgba(255,180,0,0.07) 0%,transparent 60%);pointer-events:none;"></div>' +
    '<div class="card" style="width:100%;max-width:460px;padding:36px;position:relative;z-index:1;background:rgba(255,255,255,0.06);backdrop-filter:blur(16px);">' +
      '<div style="text-align:center;margin-bottom:28px;">' +
        '<img src="' + LOGO + '" alt="Crowd Analyzing" style="height:50px;margin-bottom:16px;" />' +
        '<h1 style="font-family:\'Montserrat\',sans-serif;font-weight:800;font-size:22px;margin-bottom:6px;">Create Account</h1>' +
        '<p style="color:var(--muted);font-size:14px;">Join Crowd Analyzing and discover smarter events</p>' +
      '</div>' +
      '<div style="margin-bottom:24px;">' +
        '<div class="tab-bar" id="signup-role-tabs">' +
          roles.map(function(r, i) {
            return '<button class="tab-btn ' + (signupRole===r?'active':'') + '" onclick="state.signupRole=\'' + r + '\';updateSignupRoleTabs()">' + roleLabels[i] + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<form onsubmit="doSignup(event)" id="signup-form">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">' +
          '<div>' +
            '<label class="field-label">First Name</label>' +
            '<input type="text" class="input-field" placeholder="First name" required id="signup-fname" />' +
          '</div>' +
          '<div>' +
            '<label class="field-label">Last Name</label>' +
            '<input type="text" class="input-field" placeholder="Last name" required id="signup-lname" />' +
          '</div>' +
        '</div>' +
        '<div style="margin-bottom:14px;">' +
          '<label class="field-label">Email Address</label>' +
          '<input type="email" class="input-field" placeholder="you@example.com" required id="signup-email" />' +
        '</div>' +
        '<div style="margin-bottom:14px;">' +
          '<label class="field-label">Password</label>' +
          '<input type="password" class="input-field" placeholder="Min. 8 characters" required minlength="8" id="signup-pass" />' +
        '</div>' +
        '<div style="margin-bottom:24px;">' +
          '<label class="field-label">Confirm Password</label>' +
          '<input type="password" class="input-field" placeholder="Re-enter password" required id="signup-confirm" />' +
        '</div>' +
        '<div style="margin-bottom:24px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:14px;">' +
          '<label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:13px;color:var(--muted);">' +
            '<input type="checkbox" required style="margin-top:2px;" />' +
            '<span>I agree to the <span style="color:#E91666;cursor:pointer;">Terms of Service</span> and <span style="color:#E91666;cursor:pointer;">Privacy Policy</span></span>' +
          '</label>' +
        '</div>' +
        '<button type="submit" class="btn-primary" style="width:100%;justify-content:center;font-size:15px;padding:14px;">\u2728 Create Account</button>' +
      '</form>' +
      '<div style="text-align:center;margin-top:20px;">' +
        '<div style="font-size:13px;color:var(--muted);">Already have an account? <button class="nav-link" style="display:inline;color:#E91666;font-size:13px;" onclick="navigate(\'login\')">Sign In</button></div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function updateSignupRoleTabs() {
  var tabs = document.querySelectorAll('#signup-role-tabs .tab-btn');
  var roles = ['customer','organizer'];
  tabs.forEach(function(btn, i) {
    btn.classList.toggle('active', (state.signupRole || 'customer') === roles[i]);
  });
}
window.updateSignupRoleTabs = updateSignupRoleTabs;

function doSignup(e) {
  e.preventDefault();
  var fname = document.getElementById('signup-fname').value.trim();
  var lname = document.getElementById('signup-lname').value.trim();
  var pass = document.getElementById('signup-pass').value;
  var confirm = document.getElementById('signup-confirm').value;

  if (pass !== confirm) {
    showToast('Passwords do not match!', 'error');
    return;
  }

  var role = state.signupRole || 'customer';
  state.user = { name: fname + ' ' + lname, role: role };
  showToast('Account created! Welcome, ' + fname + '!', 'success');
  var dest = role === 'organizer' ? 'dashboard' : 'home';
  navigate(dest);
}
window.doSignup = doSignup;
