let mainChartInstance = null;
let overviewBarChartInstance = null;
let barChartInstance = null;

let rawTransactions = [
  { id: 'TX-9021', customer: 'Acme Corp Ltd.', channel: 'Organic Search', amount: 1200.00, status: 'Completed', date: 'Sep 17, 2026' },
  { id: 'TX-9022', customer: 'Global Tech Software', channel: 'Direct Traffic', amount: 450.00, status: 'Pending', date: 'Sep 16, 2026' },
  { id: 'TX-9023', customer: 'Apex Solutions', channel: 'Social Referral', amount: 890.00, status: 'Completed', date: 'Sep 15, 2026' },
  { id: 'TX-9024', customer: 'Starlight Retailers', channel: 'Email Campaign', amount: 2300.00, status: 'Completed', date: 'Sep 14, 2026' },
  { id: 'TX-9025', customer: 'Nexus Digital', channel: 'Direct Traffic', amount: 150.00, status: 'Failed', date: 'Sep 14, 2026' }
];

let currentUser = { name: 'Jane Smith', email: 'jane.smith@apex.com', role: 'Admin', isLoggedIn: true };

document.addEventListener("DOMContentLoaded", function () {
  initSidebar();
  renderTransactions(rawTransactions);
  renderAllTransactions();
  updateUserUI();
  initCharts();
});

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobile-overlay');
  const openBtn = document.getElementById('open-sidebar-btn');
  const closeBtn = document.getElementById('close-sidebar-btn');

  openBtn?.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
  });

  const closeSidebar = () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  };

  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);
}

function initCharts() {
  // Line Chart
  const ctxOverview = document.getElementById('overviewChart');
  if (ctxOverview) {
    if (mainChartInstance) mainChartInstance.destroy();
    mainChartInstance = new Chart(ctxOverview, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue ($)',
          data: [3200, 4100, 3800, 5200, 4800, 6100, 6920],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } }
        }
      }
    });
  }

  // Bar Chart (Overview)
  const ctxOverviewBar = document.getElementById('overviewBarChart');
  if (ctxOverviewBar) {
    if (overviewBarChartInstance) overviewBarChartInstance.destroy();
    overviewBarChartInstance = new Chart(ctxOverviewBar, {
      type: 'bar',
      data: {
        labels: ['Organic Search', 'Direct Traffic', 'Social Referral', 'Email Campaign', 'Affiliate'],
        datasets: [{
          label: 'Visitors / Sales',
          data: [1200, 850, 640, 930, 410],
          backgroundColor: '#818cf8',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } }
        }
      }
    });
  }

  // Analytics Bar Chart
  const ctxBar = document.getElementById('analyticsBarChart');
  if (ctxBar) {
    if (barChartInstance) barChartInstance.destroy();
    barChartInstance = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Conversions',
          data: [450, 590, 800, 810, 960, 1120],
          backgroundColor: '#4f46e5',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } }
        }
      }
    });
  }
}

function updateTimeframe(timeframe, btn) {
  document.querySelectorAll('.tf-btn').forEach(b => {
    b.className = 'tf-btn px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800 transition-all duration-150 hover:scale-105';
  });
  btn.className = 'tf-btn px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm transition-all duration-150 hover:scale-105';

  if (!mainChartInstance) return;

  if (timeframe === '7d') {
    document.getElementById('kpi-revenue').innerText = '$34,120.00';
    document.getElementById('kpi-users').innerText = '6,410';
    mainChartInstance.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    mainChartInstance.data.datasets[0].data = [3200, 4100, 3800, 5200, 4800, 6100, 6920];
  } else if (timeframe === '30d') {
    document.getElementById('kpi-revenue').innerText = '$128,430.00';
    document.getElementById('kpi-users').innerText = '24,520';
    mainChartInstance.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    mainChartInstance.data.datasets[0].data = [24000, 31000, 35000, 38430];
  } else if (timeframe === '1y') {
    document.getElementById('kpi-revenue').innerText = '$1,420,800.00';
    document.getElementById('kpi-users').innerText = '289,100';
    mainChartInstance.data.labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    mainChartInstance.data.datasets[0].data = [280000, 340000, 390000, 410800];
  }

  mainChartInstance.update();
}

function renderTransactions(data) {
  const tbody = document.getElementById('transactions-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  data.slice(0, 5).forEach(item => {
    const badgeColor = item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                       item.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
    tbody.innerHTML += `
      <tr class="hover:bg-slate-900/50 transition-colors">
        <td class="py-3.5 px-6 font-semibold text-slate-100">${item.customer}</td>
        <td class="py-3.5 px-6 text-slate-400">${item.channel}</td>
        <td class="py-3.5 px-6 font-bold text-slate-100">$${item.amount.toFixed(2)}</td>
        <td class="py-3.5 px-6"><span class="px-2.5 py-1 text-xs font-bold rounded-full ${badgeColor}">${item.status}</span></td>
      </tr>
    `;
  });
}

function renderAllTransactions() {
  const tbody = document.getElementById('all-transactions-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  rawTransactions.forEach(item => {
    const badgeColor = item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                       item.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
    tbody.innerHTML += `
      <tr class="hover:bg-slate-900/50 transition-colors">
        <td class="py-3.5 px-6 font-mono text-xs text-slate-400">${item.id}</td>
        <td class="py-3.5 px-6 font-semibold text-slate-100">${item.customer}</td>
        <td class="py-3.5 px-6 font-bold text-slate-100">$${item.amount.toFixed(2)}</td>
        <td class="py-3.5 px-6"><span class="px-2.5 py-1 text-xs font-bold rounded-full ${badgeColor}">${item.status}</span></td>
      </tr>
    `;
  });
}

function handleAuthAction() {
  if (currentUser.isLoggedIn) {
    currentUser = { name: 'Guest User', email: '', role: 'Guest', isLoggedIn: false };
    updateUserUI();
    triggerToast('Logged out. Switched to Guest View.');
  } else {
    document.getElementById('login-modal').classList.remove('hidden');
  }
}

function processLogin(e) {
  e.preventDefault();
  const user = document.getElementById('login-user').value;
  const email = document.getElementById('login-email').value;
  
  currentUser = { name: user || 'Jane Smith', email: email || 'jane.smith@apex.com', role: 'Admin', isLoggedIn: true };
  
  const settingName = document.getElementById('setting-name');
  const settingEmail = document.getElementById('setting-email');
  if (settingName) settingName.value = currentUser.name;
  if (settingEmail) settingEmail.value = currentUser.email;

  document.getElementById('login-modal').classList.add('hidden');
  updateUserUI();
  triggerToast(`Welcome back, ${currentUser.name}!`);
}

function loginAsGuest() {
  currentUser = { name: 'Guest User', email: '', role: 'Guest', isLoggedIn: false };
  document.getElementById('login-modal').classList.add('hidden');
  updateUserUI();
  triggerToast('Viewing as Guest.');
}

function updateUserUI() {
  const avatar = document.getElementById('user-avatar');
  const nameDisp = document.getElementById('user-name-display');
  const roleDisp = document.getElementById('user-role-display');
  const authBtn = document.getElementById('auth-action-btn');
  
  const addTxBtn = document.getElementById('add-tx-btn');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const downloadPdfBtn = document.getElementById('download-pdf-btn');
  const guestBanner = document.getElementById('guest-guard-banner');
  const settingInputs = document.querySelectorAll('.setting-input');
  const saveBtn = document.getElementById('save-settings-btn');

  if (currentUser.role === 'Admin' && currentUser.isLoggedIn) {
    if (avatar) avatar.innerText = getInitials(currentUser.name);
    if (nameDisp) nameDisp.innerText = currentUser.name;
    if (roleDisp) roleDisp.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span> Admin Online';
    
    if (authBtn) {
      authBtn.title = "Logout";
      authBtn.innerHTML = `<svg class="w-5 h-5 text-rose-400 hover:text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>`;
    }

    if (addTxBtn) addTxBtn.classList.remove('hidden');
    if (exportCsvBtn) exportCsvBtn.disabled = false;
    if (downloadPdfBtn) downloadPdfBtn.disabled = false;
    if (guestBanner) guestBanner.classList.add('hidden');
    settingInputs.forEach(input => input.removeAttribute('disabled'));
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  } else {
    if (avatar) avatar.innerText = 'GU';
    if (nameDisp) nameDisp.innerText = 'Guest User';
    if (roleDisp) roleDisp.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1 animate-pulse"></span> Guest Mode';
    
    if (authBtn) {
      authBtn.title = "Sign In as Admin";
      authBtn.innerHTML = `<svg class="w-5 h-5 text-indigo-400 hover:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h7a3 3 0 013 3v1"/></svg>`;
    }

    if (addTxBtn) addTxBtn.classList.add('hidden');
    if (guestBanner) guestBanner.classList.remove('hidden');
    settingInputs.forEach(input => input.setAttribute('disabled', 'true'));
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
  }
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
    btn.classList.add('text-slate-400');
  });

  const activeTab = document.getElementById(`tab-${tabId}`);
  const activeNav = document.getElementById(`nav-${tabId}`);
  const pageTitle = document.getElementById('page-title');

  if (activeTab && activeNav) {
    activeTab.classList.remove('hidden');
    activeNav.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');
    if (pageTitle) {
      const titles = {
        overview: 'Overview Dashboard',
        analytics: 'Analytics & Deep Reports',
        transactions: 'Transaction History',
        settings: 'Dashboard Settings'
      };
      pageTitle.innerText = titles[tabId] || 'Dashboard';
    }
  }
}

function saveSettings(e) {
  e.preventDefault();
  if (!currentUser.isLoggedIn || currentUser.role !== 'Admin') return;
  const newName = document.getElementById('setting-name').value;
  const newEmail = document.getElementById('setting-email').value;
  if (newName) currentUser.name = newName;
  if (newEmail) currentUser.email = newEmail;
  updateUserUI();
  triggerToast('Dashboard settings saved!');
}

function openAddTransactionModal() {
  if (!currentUser.isLoggedIn || currentUser.role !== 'Admin') return;
  document.getElementById('add-tx-modal').classList.remove('hidden');
}

function closeAddTransactionModal() {
  document.getElementById('add-tx-modal').classList.add('hidden');
}

function submitNewTransaction(e) {
  e.preventDefault();
  if (!currentUser.isLoggedIn || currentUser.role !== 'Admin') return;

  const cust = document.getElementById('tx-cust').value;
  const chan = document.getElementById('tx-chan').value;
  const amt = parseFloat(document.getElementById('tx-amt').value);
  const status = document.getElementById('tx-status').value;

  const newTx = {
    id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
    customer: cust,
    channel: chan,
    amount: amt,
    status: status,
    date: 'Sep 17, 2026'
  };

  rawTransactions.unshift(newTx);
  renderTransactions(rawTransactions);
  renderAllTransactions();
  closeAddTransactionModal();
  e.target.reset();
  triggerToast('New transaction added successfully!');
}

function exportReportCSV() {
  if (!currentUser.isLoggedIn || currentUser.role !== 'Admin') return;
  let csvContent = "data:text/csv;charset=utf-8,Transaction ID,Customer,Channel,Amount,Status,Date\n";
  rawTransactions.forEach(t => {
    csvContent += `${t.id},"${t.customer}",${t.channel},${t.amount},${t.status},${t.date}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "dashboard-report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  triggerToast('Report CSV downloaded!');
}

function downloadAnalyticsPDF() {
  if (!currentUser.isLoggedIn || currentUser.role !== 'Admin') return;
  const element = document.getElementById('pdf-report-container');
  triggerToast('Generating PDF document...');
  const opt = {
    margin: 0.5,
    filename: 'analytics-report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

function handleSearch(query) {
  const q = query.toLowerCase();
  const filtered = rawTransactions.filter(t => 
    t.customer.toLowerCase().includes(q) || 
    t.channel.toLowerCase().includes(q) ||
    t.status.toLowerCase().includes(q)
  );
  renderTransactions(filtered);
  renderAllTransactions();
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function triggerToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;
  toastMsg.innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}