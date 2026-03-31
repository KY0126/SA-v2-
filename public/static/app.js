// ═══════════════════════════════════════════════════════
//  FJU Smart Hub - Frontend Application (Vue 3 CDN Style)
// ═══════════════════════════════════════════════════════

const API = '/api'
const LANGS = {
  'zh-TW': {
    appName: 'FJU Smart Hub',
    appSubtitle: '輔仁大學校園管理系統',
    login: '登入系統',
    googleLogin: '使用 Google 帳號登入',
    domainNotice: '僅限 @cloud.fju.edu.tw 帳號使用',
    selectRole: '選擇示範角色',
    dashboard: '儀表板',
    reservation: '場地預約',
    equipment: '器材借用',
    clubs: '社團管理',
    activities: '活動牆',
    calendar: '行事曆',
    portfolio: 'E-Portfolio',
    users: '用戶管理',
    aiTools: 'AI 工具',
    settings: '系統設定',
    logout: '登出',
    makeReservation: '新增預約',
    phase1: '志願序申請', phase2: '衝突協商', phase3: '官方核定',
    risk_low: '低風險', risk_medium: '中風險', risk_high: '高風險',
    approved: '已核准', pending: '待審核', rejected: '已駁回',
    credit: '信用點數', members: '社員人數', events: '活動場次',
    searchPlaceholder: '搜尋活動、社團...',
    borrowEquipment: '申請借用',
    viewDetails: '查看詳情',
    submit: '送出',
    cancel: '取消',
  },
  'en': {
    appName: 'FJU Smart Hub',
    appSubtitle: 'Campus Management System',
    login: 'Login',
    googleLogin: 'Sign in with Google',
    domainNotice: 'Only @cloud.fju.edu.tw accounts',
    selectRole: 'Select Demo Role',
    dashboard: 'Dashboard',
    reservation: 'Venue Reservation',
    equipment: 'Equipment',
    clubs: 'Clubs',
    activities: 'Activity Wall',
    calendar: 'Calendar',
    portfolio: 'E-Portfolio',
    users: 'User Mgmt',
    aiTools: 'AI Tools',
    settings: 'Settings',
    logout: 'Logout',
    makeReservation: 'New Reservation',
    phase1: 'Apply', phase2: 'Conflict', phase3: 'Official',
    risk_low: 'Low Risk', risk_medium: 'Med Risk', risk_high: 'High Risk',
    approved: 'Approved', pending: 'Pending', rejected: 'Rejected',
    credit: 'Credit Score', members: 'Members', events: 'Events',
    searchPlaceholder: 'Search activities, clubs...',
    borrowEquipment: 'Borrow',
    viewDetails: 'Details',
    submit: 'Submit',
    cancel: 'Cancel',
  },
  'ja': {
    appName: 'FJU Smart Hub',
    appSubtitle: 'キャンパス管理システム',
    login: 'ログイン',
    googleLogin: 'Googleでログイン',
    domainNotice: '@cloud.fju.edu.tw アカウントのみ',
    selectRole: 'デモロール選択',
    dashboard: 'ダッシュボード',
    reservation: '場所予約',
    equipment: '機材管理',
    clubs: 'クラブ管理',
    activities: 'イベント',
    calendar: 'カレンダー',
    portfolio: 'Eポートフォリオ',
    users: 'ユーザー管理',
    aiTools: 'AI ツール',
    settings: '設定',
    logout: 'ログアウト',
    makeReservation: '新規予約',
    phase1: '申請', phase2: '調整', phase3: '承認',
    risk_low: '低リスク', risk_medium: '中リスク', risk_high: '高リスク',
    approved: '承認済', pending: '審査中', rejected: '却下',
    credit: 'クレジット', members: 'メンバー', events: 'イベント数',
    searchPlaceholder: 'イベント、クラブを検索...',
    borrowEquipment: '借用申請',
    viewDetails: '詳細',
    submit: '送信',
    cancel: 'キャンセル',
  },
  'ko': {
    appName: 'FJU Smart Hub',
    appSubtitle: '캠퍼스 관리 시스템',
    login: '로그인',
    googleLogin: 'Google로 로그인',
    domainNotice: '@cloud.fju.edu.tw 계정만',
    selectRole: '데모 역할 선택',
    dashboard: '대시보드',
    reservation: '장소 예약',
    equipment: '장비 관리',
    clubs: '클럽 관리',
    activities: '활동 게시판',
    calendar: '일정',
    portfolio: 'E-포트폴리오',
    users: '사용자 관리',
    aiTools: 'AI 도구',
    settings: '설정',
    logout: '로그아웃',
    makeReservation: '새 예약',
    phase1: '신청', phase2: '조율', phase3: '승인',
    risk_low: '저위험', risk_medium: '중위험', risk_high: '고위험',
    approved: '승인됨', pending: '검토 중', rejected: '거부됨',
    credit: '신용 점수', members: '회원 수', events: '행사 수',
    searchPlaceholder: '활동, 클럽 검색...',
    borrowEquipment: '대여 신청',
    viewDetails: '자세히',
    submit: '제출',
    cancel: '취소',
  }
}

// ── State ──
const state = {
  lang: 'zh-TW',
  user: null,
  currentPage: 'dashboard',
  charts: {},
  data: {
    venues: [], reservations: [], clubs: [], equipment: [],
    activities: [], dashboard: null, calendar: []
  },
  loading: false,
  modal: null,
  reservationStep: 1,
  aiResult: null,
  toasts: []
}

const t = (key) => (LANGS[state.lang] || LANGS['zh-TW'])[key] || key

// ── Utils ──
function toast(msg, type = 'success') {
  const id = Date.now()
  const container = document.getElementById('toast-container')
  if (!container) return
  const el = document.createElement('div')
  el.className = `toast ${type}`
  el.id = `toast-${id}`
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }
  el.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-msg">${msg}</span>`
  container.appendChild(el)
  requestAnimationFrame(() => el.classList.add('show'))
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300) }, 3500)
}

function showModal(content) {
  const overlay = document.getElementById('modal-overlay')
  document.getElementById('modal-body').innerHTML = content
  overlay.classList.add('active')
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('active')
}

// ── API Calls ──
async function fetchData(url) {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (e) {
    console.error('Fetch error:', e)
    return null
  }
}

async function postData(url, data) {
  try {
    const res = await axios.post(url, data)
    return res.data
  } catch (e) {
    return e.response?.data || { error: '請求失敗' }
  }
}

// ── Chart Helpers ──
function destroyChart(id) {
  if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id] }
}

function createChart(id, type, labels, data, options = {}) {
  destroyChart(id)
  const ctx = document.getElementById(id)
  if (!ctx) return
  const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316']
  state.charts[id] = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: type === 'pie' || type === 'doughnut' ? colors : colors[0],
        borderColor: type === 'line' ? colors[0] : undefined,
        borderWidth: type === 'line' ? 2 : 0,
        fill: type === 'line' ? false : undefined,
        tension: 0.4,
        pointRadius: type === 'line' ? 4 : undefined,
        pointBackgroundColor: type === 'line' ? '#fff' : undefined,
        pointBorderColor: type === 'line' ? colors[0] : undefined,
        ...options.dataset
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: type === 'pie' || type === 'doughnut' ? 'bottom' : 'top', labels: { font: { size: 11 }, boxWidth: 12 } }
      },
      scales: (type !== 'pie' && type !== 'doughnut' && type !== 'radar') ? {
        y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      } : undefined,
      ...options.chart
    }
  })
}

function createRadarChart(id, labels, data) {
  destroyChart(id)
  const ctx = document.getElementById(id)
  if (!ctx) return
  state.charts[id] = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: 'rgba(0,48,135,0.15)',
        borderColor: '#003087',
        borderWidth: 2,
        pointBackgroundColor: '#003087',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20, font: { size: 10 } } } }
    }
  })
}

// ── Pages ──
function renderLogin() {
  document.getElementById('app').innerHTML = `
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">
        <div style="width:80px;height:80px;background:linear-gradient(135deg,#003087,#1a3a8f);border-radius:16px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;">
          <i class="fas fa-university" style="font-size:36px;color:#C8A951;"></i>
        </div>
        <h1>FJU Smart Hub</h1>
        <p>輔仁大學全方位校園管理與資源調度系統</p>
      </div>

      <div style="margin-bottom:24px;">
        <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:10px;text-align:center;">${t('selectRole')}</div>
        <div class="role-select-grid">
          <div class="role-option selected" onclick="selectRole('student',this)">
            <i class="fas fa-user-graduate"></i>
            <span>學生</span>
          </div>
          <div class="role-option" onclick="selectRole('club_officer',this)">
            <i class="fas fa-users"></i>
            <span>社團幹部</span>
          </div>
          <div class="role-option" onclick="selectRole('professor',this)">
            <i class="fas fa-chalkboard-teacher"></i>
            <span>指導教授</span>
          </div>
          <div class="role-option" onclick="selectRole('admin',this)">
            <i class="fas fa-user-shield"></i>
            <span>課指組職員</span>
          </div>
        </div>
        <div style="margin-top:8px;">
          <div class="role-option" onclick="selectRole('it_admin',this)" style="display:flex;align-items:center;gap:10px;text-align:left;padding:10px 14px;">
            <i class="fas fa-server" style="font-size:18px;"></i>
            <span>資訊中心管理員</span>
          </div>
        </div>
      </div>

      <button class="google-btn" onclick="demoLogin()">
        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        以 Google 帳號示範登入
      </button>
      <div class="domain-notice">
        <i class="fas fa-shield-alt" style="margin-right:6px;"></i>
        ${t('domainNotice')}
      </div>
    </div>
  </div>
  <div id="toast-container" class="toast-container"></div>`

  window._selectedRole = 'student'
}

function selectRole(role, el) {
  document.querySelectorAll('.role-option').forEach(e => e.classList.remove('selected'))
  el.classList.add('selected')
  window._selectedRole = role
}

async function demoLogin() {
  const roleMap = {
    student: { id: 1, name: '王小明', email: 'a112071001@cloud.fju.edu.tw', role: 'student', credit: 95 },
    club_officer: { id: 2, name: '李美華（攝影社社長）', email: 'a112071002@cloud.fju.edu.tw', role: 'club_officer', credit: 88 },
    professor: { id: 3, name: '陳大中 教授', email: 'chen@mail.fju.edu.tw', role: 'professor', credit: 100 },
    admin: { id: 4, name: '課指組 張組員', email: 'activity@mail.fju.edu.tw', role: 'admin', credit: 100 },
    it_admin: { id: 5, name: '資訊中心 林工程師', email: 'it@mail.fju.edu.tw', role: 'it_admin', credit: 100 },
  }
  state.user = roleMap[window._selectedRole || 'student']
  toast(`歡迎回來，${state.user.name}！`, 'success')
  renderApp()
}

// ── Sidebar ──
function getSidebarNav() {
  const role = state.user?.role
  const baseNav = [
    { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: t('dashboard') },
    { id: 'reservation', icon: 'fas fa-calendar-check', label: t('reservation'), badge: 2 },
    { id: 'equipment', icon: 'fas fa-tools', label: t('equipment') },
    { id: 'clubs', icon: 'fas fa-users', label: t('clubs') },
    { id: 'activities', icon: 'fas fa-bullhorn', label: t('activities') },
    { id: 'calendar', icon: 'fas fa-calendar-alt', label: t('calendar') },
    { id: 'portfolio', icon: 'fas fa-id-badge', label: t('portfolio') },
  ]
  const adminNav = [
    { id: 'users', icon: 'fas fa-user-cog', label: t('users') },
    { id: 'ai_tools', icon: 'fas fa-brain', label: t('aiTools') },
  ]
  return role === 'admin' || role === 'it_admin' ? [...baseNav, ...adminNav] : baseNav
}

function renderSidebar() {
  const navItems = getSidebarNav()
  return `
  <div class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div style="width:44px;height:44px;background:rgba(200,169,81,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <i class="fas fa-university" style="color:#C8A951;font-size:20px;"></i>
      </div>
      <div>
        <h1>FJU Smart Hub</h1>
        <span>輔仁大學</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section">主要功能</div>
      ${navItems.map(item => `
        <div class="nav-item ${state.currentPage === item.id ? 'active' : ''}" onclick="navigate('${item.id}')">
          <i class="${item.icon}"></i>
          <span>${item.label}</span>
          ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
        </div>
      `).join('')}
      <div class="nav-section" style="margin-top:8px;">帳號</div>
      <div class="nav-item" onclick="changeLang()">
        <i class="fas fa-globe"></i>
        <span>語系 / Language</span>
      </div>
      <div class="nav-item" onclick="logout()">
        <i class="fas fa-sign-out-alt"></i>
        <span>${t('logout')}</span>
      </div>
    </nav>
    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar">${(state.user?.name || '?')[0]}</div>
        <div class="user-info">
          <div class="name">${state.user?.name || ''}</div>
          <div class="role">${getRoleLabel(state.user?.role)}</div>
        </div>
      </div>
    </div>
  </div>`
}

function getRoleLabel(role) {
  const map = { student: '學生', club_officer: '社團幹部', professor: '指導教授', admin: '課指組職員', it_admin: '資訊中心' }
  return map[role] || role
}

// ── Main App Render ──
function renderApp() {
  document.getElementById('app').innerHTML = `
    ${renderSidebar()}
    <div class="main" id="main-content">
      <div class="topbar">
        <button class="btn btn-secondary btn-sm" onclick="toggleSidebar()" style="display:none;" id="menu-btn">
          <i class="fas fa-bars"></i>
        </button>
        <div class="topbar-title" id="topbar-title">載入中...</div>
        <div class="topbar-actions">
          ${['zh-TW','en','ja','ko'].map(l =>
            `<button class="lang-btn ${state.lang === l ? 'active' : ''}" onclick="setLang('${l}')">${l}</button>`
          ).join('')}
          <button class="notif-btn" onclick="showNotifications()">
            <i class="fas fa-bell"></i>
            <span class="notif-dot"></span>
          </button>
        </div>
      </div>
      <div class="content" id="page-content">
        <div class="loading" style="text-align:center;padding:60px;color:#64748b;">
          <i class="fas fa-spinner fa-spin" style="font-size:32px;"></i>
          <p style="margin-top:12px;">載入中...</p>
        </div>
      </div>
    </div>
    <div class="modal-overlay" id="modal-overlay" onclick="closeModalOnOverlay(event)">
      <div class="modal" id="modal-body"></div>
    </div>
    <div id="toast-container" class="toast-container"></div>`

  loadPage(state.currentPage)
}

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open')
}

function closeModalOnOverlay(e) {
  if (e.target.id === 'modal-overlay') closeModal()
}

function navigate(page) {
  state.currentPage = page
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'))
  document.querySelector(`[onclick="navigate('${page}')"]`)?.classList.add('active')
  loadPage(page)
}

async function loadPage(page) {
  const el = document.getElementById('page-content')
  if (!el) return
  el.innerHTML = `<div style="text-align:center;padding:40px;color:#94a3b8;"><i class="fas fa-spinner fa-spin fa-2x"></i></div>`

  switch (page) {
    case 'dashboard': await renderDashboard(); break
    case 'reservation': await renderReservation(); break
    case 'equipment': await renderEquipment(); break
    case 'clubs': await renderClubs(); break
    case 'activities': await renderActivities(); break
    case 'calendar': await renderCalendar(); break
    case 'portfolio': await renderPortfolio(); break
    case 'users': await renderUsers(); break
    case 'ai_tools': renderAITools(); break
    default: renderDashboard()
  }
}

// ─────────────────────────────────────────────
// DASHBOARD PAGE
// ─────────────────────────────────────────────
async function renderDashboard() {
  document.getElementById('topbar-title').textContent = t('dashboard')
  const role = state.user?.role || 'student'
  const data = await fetchData(`${API}/dashboard/${role}`)
  if (!data) return

  state.data.dashboard = data
  const el = document.getElementById('page-content')

  const roleLabel = getRoleLabel(role)
  el.innerHTML = `
  <div class="hero-banner fade-in">
    <div class="hero-title"><i class="fas fa-tachometer-alt" style="margin-right:8px;"></i>${roleLabel}儀表板</div>
    <div class="hero-sub">歡迎回來，${state.user.name}　|　今日：${new Date().toLocaleDateString('zh-TW')}</div>
    <div class="hero-actions">
      <button class="btn btn-gold btn-sm" onclick="navigate('reservation')"><i class="fas fa-plus"></i>${t('makeReservation')}</button>
      <button class="btn btn-secondary btn-sm" onclick="navigate('activities')"><i class="fas fa-fire"></i>熱門活動</button>
    </div>
  </div>

  <div class="stat-grid fade-in" id="stat-grid"></div>
  <div class="chart-grid fade-in" id="chart-grid"></div>`

  // Render stats
  renderStats(data.stats, role)
  // Render charts (async after DOM ready)
  setTimeout(() => renderCharts(data.charts, role), 100)
}

function renderStats(stats, role) {
  const statEl = document.getElementById('stat-grid')
  if (!statEl || !stats) return

  const roleStats = {
    admin: [
      { key: 'total_clubs', label: '社團總數', icon: 'fas fa-users', color: 'blue', suffix: '個' },
      { key: 'active_reservations', label: '進行中預約', icon: 'fas fa-calendar-check', color: 'green', suffix: '件' },
      { key: 'pending_review', label: '待審核申請', icon: 'fas fa-clock', color: 'yellow', suffix: '件' },
      { key: 'total_users', label: '系統用戶', icon: 'fas fa-user', color: 'purple', suffix: '人' },
    ],
    club_officer: [
      { key: 'members', label: t('members'), icon: 'fas fa-users', color: 'blue', suffix: '人' },
      { key: 'upcoming_events', label: '近期活動', icon: 'fas fa-calendar', color: 'green', suffix: '場' },
      { key: 'credit_score', label: t('credit'), icon: 'fas fa-star', color: 'yellow', suffix: '分' },
      { key: 'pending_items', label: '待處理事項', icon: 'fas fa-exclamation', color: 'red', suffix: '項' },
    ],
    professor: [
      { key: 'guided_clubs', label: '指導社團', icon: 'fas fa-users', color: 'blue', suffix: '個' },
      { key: 'total_activities', label: '活動場次', icon: 'fas fa-calendar', color: 'green', suffix: '場' },
      { key: 'students_guided', label: '輔導學生', icon: 'fas fa-user-graduate', color: 'purple', suffix: '人' },
    ],
    student: [
      { key: 'activities_joined', label: '參與活動', icon: 'fas fa-calendar-check', color: 'blue', suffix: '場' },
      { key: 'volunteer_hours', label: '志工時數', icon: 'fas fa-hands-helping', color: 'green', suffix: 'hr' },
      { key: 'skill_tags', label: '技能標籤', icon: 'fas fa-tags', color: 'yellow', suffix: '個' },
      { key: 'credit_score', label: t('credit'), icon: 'fas fa-star', color: 'purple', suffix: '分' },
    ],
    it_admin: [
      { key: 'api_uptime', label: 'API 可用率', icon: 'fas fa-server', color: 'green', suffix: '' },
      { key: 'blocked_attacks', label: '攔截攻擊', icon: 'fas fa-shield-alt', color: 'red', suffix: '次' },
      { key: 'storage_used', label: 'R2 使用量', icon: 'fas fa-database', color: 'blue', suffix: '' },
      { key: 'active_sessions', label: '活躍用戶', icon: 'fas fa-users', color: 'purple', suffix: '人' },
    ]
  }

  const defs = roleStats[role] || roleStats.student
  statEl.innerHTML = defs.map(def => `
    <div class="stat-card ${def.color} fade-in">
      <div class="stat-icon ${def.color}"><i class="${def.icon}"></i></div>
      <div>
        <div class="stat-value">${stats[def.key] ?? '—'}${def.suffix ? `<span style="font-size:14px;font-weight:400;">${def.suffix}</span>` : ''}</div>
        <div class="stat-label">${def.label}</div>
      </div>
    </div>`).join('')
}

function renderCharts(charts, role) {
  const el = document.getElementById('chart-grid')
  if (!el || !charts) return

  el.innerHTML = charts.map((c, i) => `
    <div class="chart-card fade-in">
      <h3><i class="fas fa-chart-${c.type === 'pie' ? 'pie' : c.type === 'radar' ? 'spider-web' : 'bar'}"></i>${c.title}</h3>
      <div class="chart-container">
        ${c.type === 'gauge' ? renderGaugeHTML(c) : `<canvas id="chart-${i}"></canvas>`}
      </div>
    </div>`).join('')

  charts.forEach((c, i) => {
    if (c.type === 'gauge') return
    if (c.type === 'radar') {
      createRadarChart(`chart-${i}`, c.data.labels, c.data.values)
    } else {
      createChart(`chart-${i}`, c.type === 'bar' ? 'bar' : c.type, c.data.labels, c.data.values)
    }
  })
}

function renderGaugeHTML(c) {
  const pct = c.current_value || 88
  const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444'
  return `
  <div class="credit-gauge">
    <div class="credit-circle" style="background:conic-gradient(${color} 0% ${pct}%, #e5e7eb ${pct}% 100%);">
      <div class="credit-inner">
        <span class="credit-score" style="color:${color};">${pct}</span>
        <span class="credit-label">信用分</span>
      </div>
    </div>
    <div style="font-size:13px;font-weight:600;color:${color};">
      ${pct >= 80 ? '✅ 良好' : pct >= 60 ? '⚠️ 注意' : '❌ 停權'}
    </div>
  </div>`
}

// ─────────────────────────────────────────────
// RESERVATION PAGE
// ─────────────────────────────────────────────
async function renderReservation() {
  document.getElementById('topbar-title').textContent = t('reservation')
  const [venues, reservations] = await Promise.all([
    fetchData(`${API}/venues`), fetchData(`${API}/reservations`)
  ])
  state.data.venues = venues || []
  state.data.reservations = reservations || []

  const el = document.getElementById('page-content')
  el.innerHTML = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <h2 style="font-size:20px;font-weight:800;color:#1e293b;"><i class="fas fa-calendar-check" style="color:#003087;margin-right:8px;"></i>${t('reservation')}</h2>
    <button class="btn btn-primary" onclick="showReservationForm()">
      <i class="fas fa-plus"></i>${t('makeReservation')}
    </button>
  </div>

  <div class="phase-indicator">
    <div class="phase-step done"><i class="fas fa-clipboard-list"></i> ${t('phase1')}</div>
    <div class="phase-step active"><i class="fas fa-handshake"></i> ${t('phase2')}</div>
    <div class="phase-step"><i class="fas fa-stamp"></i> ${t('phase3')}</div>
  </div>

  <div class="chart-grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-bottom:20px;">
    ${(state.data.venues || []).map(v => `
      <div class="card" style="padding:16px;cursor:pointer;" onclick="reserveVenue(${v.id}, '${v.name}')">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-weight:700;font-size:15px;"><i class="fas fa-building" style="color:#003087;margin-right:6px;"></i>${v.name}</span>
          <span class="badge ${v.available ? 'badge-approved' : 'badge-rejected'}">${v.available ? '可借用' : '已佔用'}</span>
        </div>
        <div style="font-size:12px;color:#64748b;"><i class="fas fa-users" style="margin-right:4px;"></i>容量：${v.capacity} 人　　<i class="fas fa-tag" style="margin-right:4px;"></i>${v.type}</div>
        ${v.available ? `<button class="btn btn-primary btn-sm" style="width:100%;margin-top:10px;"><i class="fas fa-calendar-plus"></i>立即預約</button>` : `<button class="btn btn-secondary btn-sm" style="width:100%;margin-top:10px;" disabled>暫無空位</button>`}
      </div>`).join('')}
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-title"><i class="fas fa-list"></i>預約記錄</span>
      <button class="btn btn-secondary btn-sm" onclick="renderReservation()"><i class="fas fa-sync"></i>重新整理</button>
    </div>
    <table>
      <thead><tr>
        <th>場地</th><th>申請單位</th><th>日期時間</th><th>優先等級</th><th>AI 預審</th><th>狀態</th><th>操作</th>
      </tr></thead>
      <tbody>
        ${(state.data.reservations || []).map(r => `
          <tr>
            <td><strong>${r.venue}</strong></td>
            <td>${r.user}</td>
            <td><span style="font-size:12px;">${r.start}</span></td>
            <td><span class="badge badge-info">Level ${r.priority}</span></td>
            <td><span style="font-size:12px;color:#64748b;">✅ 已通過</span></td>
            <td><span class="badge ${r.status === 'APPROVED' ? 'badge-approved' : r.status === 'PENDING_MANUAL_REVIEW' ? 'badge-pending' : 'badge-rejected'}">${r.status === 'APPROVED' ? t('approved') : t('pending')}</span></td>
            <td><button class="btn btn-secondary btn-sm" onclick="viewReservation(${r.id})"><i class="fas fa-eye"></i></button></td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div>`
}

function reserveVenue(id, name) {
  showReservationForm(id, name)
}

function showReservationForm(venueId = null, venueName = '') {
  const venueOpts = (state.data.venues || []).map(v =>
    `<option value="${v.id}" ${v.id == venueId ? 'selected' : ''}>${v.name}（容量：${v.capacity}人）</option>`
  ).join('')

  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-calendar-plus" style="color:#003087;"></i> 新增場地預約</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>

    <div class="steps">
      <div class="step active" id="step1-ind">
        <div class="step-circle">1</div><div class="step-label">填寫申請</div>
      </div>
      <div class="step" id="step2-ind">
        <div class="step-circle">2</div><div class="step-label">AI 預審</div>
      </div>
      <div class="step" id="step3-ind">
        <div class="step-circle">3</div><div class="step-label">送出確認</div>
      </div>
    </div>

    <div id="step-form">
      <div class="form-group">
        <label class="form-label">選擇場地 *</label>
        <select class="form-control" id="f-venue">${venueOpts}</select>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group">
          <label class="form-label">開始時間 *</label>
          <input type="datetime-local" class="form-control" id="f-start" value="2026-04-20T09:00"/>
        </div>
        <div class="form-group">
          <label class="form-label">結束時間 *</label>
          <input type="datetime-local" class="form-control" id="f-end" value="2026-04-20T17:00"/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">申請用途 * <span style="font-size:11px;color:#94a3b8;">（供 AI 預審使用）</span></label>
        <textarea class="form-control" id="f-purpose" rows="3" placeholder="請詳細說明活動目的、預計參與人數及活動內容..."></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">志願序（熱門場地選填）</label>
        <select class="form-control" id="f-priority">
          <option value="1">第一志願</option>
          <option value="2">第二志願</option>
          <option value="3">第三志願</option>
        </select>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-secondary" onclick="closeModal()">取消</button>
        <button class="btn btn-primary" onclick="submitAIScreen()">
          <i class="fas fa-brain"></i> AI 預審
        </button>
      </div>
    </div>
    <div id="ai-step" style="display:none;"></div>`)
}

async function submitAIScreen() {
  const purpose = document.getElementById('f-purpose')?.value
  if (!purpose) { toast('請填寫申請用途', 'error'); return }

  document.getElementById('step2-ind').classList.add('active')
  const aiEl = document.getElementById('ai-step')
  const formEl = document.getElementById('step-form')
  aiEl.style.display = 'block'
  aiEl.innerHTML = `<div class="ai-panel"><h3><i class="fas fa-brain"></i> Dify AI 智慧預審中...</h3><div class="loading" style="padding:20px;text-align:center;">⏳ 正在比對法規知識庫...</div></div>`

  const result = await postData(`${API}/ai/screen`, { purpose, role: state.user?.role })

  const riskClass = result.risk_level === 'High' ? 'risk-high' : result.risk_level === 'Medium' ? 'risk-medium' : 'risk-low'
  const riskLabel = result.risk_level === 'High' ? '❌ 高風險' : result.risk_level === 'Medium' ? '⚠️ 中風險，待人工審核' : '✅ 低風險，建議核准'

  aiEl.innerHTML = `
    <div class="ai-panel">
      <h3><i class="fas fa-robot"></i> AI 預審完成</h3>
      <div class="ai-result">
        <div class="${riskClass}" style="font-size:16px;margin-bottom:8px;">${riskLabel}</div>
        <p style="margin-bottom:8px;">${result.reasoning}</p>
        ${result.law_reference ? `<p style="font-size:11px;opacity:0.8;margin-bottom:8px;"><i class="fas fa-book"></i> ${result.law_reference}</p>` : ''}
        <div>${(result.suggested_tags || []).map(tag => `<span class="ai-tag">${tag}</span>`).join('')}</div>
      </div>
      ${result.risk_level !== 'High' ? `
        <div style="margin-top:14px;display:flex;gap:10px;justify-content:flex-end;">
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('ai-step').style.display='none'">← 修改</button>
          <button class="btn" style="background:#fff;color:#003087;" onclick="submitReservation()">
            <i class="fas fa-paper-plane"></i> 送出預約申請
          </button>
        </div>` : `
        <div style="margin-top:12px;text-align:right;">
          <button class="btn" style="background:rgba(255,255,255,0.2);" onclick="document.getElementById('ai-step').style.display='none'">← 重新填寫</button>
        </div>`}
    </div>`
}

async function submitReservation() {
  const payload = {
    venue_id: document.getElementById('f-venue')?.value,
    start_time: document.getElementById('f-start')?.value,
    end_time: document.getElementById('f-end')?.value,
    purpose: document.getElementById('f-purpose')?.value,
    role: state.user?.role
  }
  const result = await postData(`${API}/reservations`, payload)
  closeModal()
  if (result.status === 'APPROVED') {
    toast('🎉 預約已核准！', 'success')
  } else if (result.status === 'PENDING_MANUAL_REVIEW') {
    toast('📋 預約已提交，待人工審核', 'info')
  } else {
    toast('❌ 預約未通過：' + result.reason, 'error')
  }
  setTimeout(() => renderReservation(), 500)
}

function viewReservation(id) {
  showModal(`
    <div class="modal-header">
      <span class="modal-title">預約詳情 #${id}</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:16px;">
      <div style="font-size:13px;color:#64748b;line-height:1.8;">
        <div><strong>場地：</strong>焯炤館演講廳</div>
        <div><strong>時間：</strong>2026-04-10 09:00 — 12:00</div>
        <div><strong>用途：</strong>資管系學會春季成果展</div>
        <div><strong>狀態：</strong><span class="badge badge-approved">已核准</span></div>
        <div><strong>AI 預審：</strong><span style="color:#10b981;">✅ 低風險</span></div>
      </div>
    </div>
    <div style="background:linear-gradient(135deg,#667eea,#764ba2);border-radius:10px;padding:16px;color:white;text-align:center;">
      <div style="font-size:12px;opacity:0.8;margin-bottom:8px;">動態 TOTP 憑證（30秒更新）</div>
      <div style="font-size:36px;font-weight:800;letter-spacing:8px;">483 726</div>
      <div style="font-size:11px;opacity:0.7;margin-top:6px;">⚡ 使用者與管理員雙重掃碼驗證</div>
    </div>
    <div style="text-align:right;margin-top:16px;">
      <button class="btn btn-primary btn-sm" onclick="closeModal()">關閉</button>
    </div>`)
}

// ─────────────────────────────────────────────
// EQUIPMENT PAGE
// ─────────────────────────────────────────────
async function renderEquipment() {
  document.getElementById('topbar-title').textContent = t('equipment')
  const data = await fetchData(`${API}/equipment`)
  state.data.equipment = data || []

  const el = document.getElementById('page-content')
  el.innerHTML = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <h2 style="font-size:20px;font-weight:800;color:#1e293b;"><i class="fas fa-tools" style="color:#003087;margin-right:8px;"></i>${t('equipment')}</h2>
    <button class="btn btn-primary" onclick="showBorrowForm()"><i class="fas fa-plus"></i>${t('borrowEquipment')}</button>
  </div>
  <div class="equip-grid fade-in">
    ${(state.data.equipment || []).map(e => {
      const pct = Math.round(e.qty_available / e.qty_total * 100)
      return `
      <div class="equip-card">
        <div class="equip-icon">${e.category === '音響' ? '🎙️' : e.category === '視聽' ? '📽️' : e.category === '傢俱' ? '🪑' : e.category === '戶外' ? '⛺' : '📦'}</div>
        <div class="equip-name">${e.name}</div>
        <div class="equip-qty">可借：<strong>${e.qty_available}</strong> / ${e.qty_total} 件</div>
        <div class="equip-bar"><div class="equip-fill ${pct < 30 ? 'danger' : pct < 60 ? 'warn' : ''}" style="width:${pct}%;"></div></div>
        <div style="font-size:11px;color:#94a3b8;margin-bottom:10px;"><i class="fas fa-map-marker-alt"></i> ${e.location}</div>
        <button class="btn btn-primary btn-sm" style="width:100%;" onclick="showBorrowForm(${e.id}, '${e.name}')">
          <i class="fas fa-hand-holding"></i> ${t('borrowEquipment')}
        </button>
      </div>`
    }).join('')}
  </div>`
}

function showBorrowForm(equipId = null, equipName = '') {
  const equips = state.data.equipment || []
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-hand-holding" style="color:#003087;"></i> 器材借用申請</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="form-group">
      <label class="form-label">器材品項 *</label>
      <select class="form-control" id="borrow-item">
        ${equips.map(e => `<option value="${e.id}" ${e.id == equipId ? 'selected' : ''}>${e.name}（可借：${e.qty_available}件）</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">借用數量 *</label>
      <input type="number" class="form-control" id="borrow-qty" value="1" min="1"/>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div class="form-group">
        <label class="form-label">借用日期</label>
        <input type="date" class="form-control" id="borrow-date" value="2026-04-10"/>
      </div>
      <div class="form-group">
        <label class="form-label">歸還日期</label>
        <input type="date" class="form-control" id="return-date" value="2026-04-12"/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">借用用途</label>
      <textarea class="form-control" id="borrow-purpose" rows="2" placeholder="說明用途..."></textarea>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end;">
      <button class="btn btn-secondary" onclick="closeModal()">取消</button>
      <button class="btn btn-primary" onclick="submitBorrow()"><i class="fas fa-paper-plane"></i> 送出申請</button>
    </div>`)
}

async function submitBorrow() {
  const result = await postData(`${API}/equipment/borrow`, {
    item_id: document.getElementById('borrow-item')?.value,
    qty: document.getElementById('borrow-qty')?.value,
    return_date: document.getElementById('return-date')?.value,
    purpose: document.getElementById('borrow-purpose')?.value
  })
  closeModal()
  toast('器材借用申請已送出，TOTP QR Code 已生成！', 'success')
}

// ─────────────────────────────────────────────
// CLUBS PAGE
// ─────────────────────────────────────────────
async function renderClubs() {
  document.getElementById('topbar-title').textContent = t('clubs')
  const data = await fetchData(`${API}/clubs`)
  state.data.clubs = data || []

  const el = document.getElementById('page-content')
  el.innerHTML = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <h2 style="font-size:20px;font-weight:800;"><i class="fas fa-users" style="color:#003087;margin-right:8px;"></i>${t('clubs')}</h2>
    <input type="text" class="form-control" placeholder="${t('searchPlaceholder')}" style="width:240px;" oninput="filterClubs(this.value)"/>
  </div>
  <div class="chart-grid fade-in" id="clubs-grid">
    ${renderClubCards(state.data.clubs)}
  </div>`
}

function filterClubs(keyword) {
  const filtered = (state.data.clubs || []).filter(c => c.name.includes(keyword) || c.category.includes(keyword))
  document.getElementById('clubs-grid').innerHTML = renderClubCards(filtered)
}

function renderClubCards(clubs) {
  return clubs.map(c => `
    <div class="card" style="cursor:pointer;" onclick="viewClub(${c.id})">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <div style="width:48px;height:48px;background:linear-gradient(135deg,#003087,#1a3a8f);border-radius:12px;display:flex;align-items:center;justify-content:center;">
          <i class="fas fa-users" style="color:#C8A951;font-size:20px;"></i>
        </div>
        <div>
          <div style="font-weight:700;font-size:15px;">${c.name}</div>
          <div style="font-size:12px;color:#64748b;">${c.category}</div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:12px;">
        <span><i class="fas fa-users" style="color:#3b82f6;"></i> ${c.members} 人</span>
        <span><i class="fas fa-star" style="color:#f59e0b;"></i> 信用 ${c.credit} 分</span>
        <span class="badge badge-approved">${c.status === 'active' ? '運作中' : '停止'}</span>
      </div>
      <div style="background:#f1f5f9;border-radius:6px;padding:8px;font-size:12px;color:#64748b;text-align:center;">
        點擊查看詳情 →
      </div>
    </div>`).join('')
}

function viewClub(id) {
  const club = (state.data.clubs || []).find(c => c.id == id)
  if (!club) return
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-users" style="color:#003087;"></i> ${club.name}</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;">
      <div style="text-align:center;background:#f8fafc;padding:12px;border-radius:8px;">
        <div style="font-size:22px;font-weight:800;color:#003087;">${club.members}</div>
        <div style="font-size:11px;color:#64748b;">${t('members')}</div>
      </div>
      <div style="text-align:center;background:#f8fafc;padding:12px;border-radius:8px;">
        <div style="font-size:22px;font-weight:800;color:#10b981;">${club.credit}</div>
        <div style="font-size:11px;color:#64748b;">${t('credit')}</div>
      </div>
      <div style="text-align:center;background:#f8fafc;padding:12px;border-radius:8px;">
        <div style="font-size:22px;font-weight:800;color:#f59e0b;">${club.category}</div>
        <div style="font-size:11px;color:#64748b;">類別</div>
      </div>
    </div>
    <div style="font-size:13px;color:#475569;line-height:1.8;">
      <div><i class="fas fa-info-circle" style="color:#003087;margin-right:6px;"></i>社團類別：${club.category}</div>
      <div><i class="fas fa-check-circle" style="color:#10b981;margin-right:6px;"></i>狀態：${club.status === 'active' ? '正常運作' : '停止運作'}</div>
    </div>
    <div style="margin-top:16px;display:flex;gap:8px;">
      <button class="btn btn-primary btn-sm" onclick="navigate('reservation');closeModal()"><i class="fas fa-calendar"></i>申請場地</button>
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">關閉</button>
    </div>`)
}

// ─────────────────────────────────────────────
// ACTIVITIES PAGE
// ─────────────────────────────────────────────
async function renderActivities() {
  document.getElementById('topbar-title').textContent = t('activities')
  const data = await fetchData(`${API}/activities`)
  state.data.activities = data || []

  const el = document.getElementById('page-content')
  el.innerHTML = `
  <div style="display:flex;gap:12px;align-items:center;margin-bottom:20px;flex-wrap:wrap;">
    <h2 style="font-size:20px;font-weight:800;flex:1;"><i class="fas fa-bullhorn" style="color:#003087;margin-right:8px;"></i>${t('activities')}</h2>
    <input type="text" class="form-control" placeholder="${t('searchPlaceholder')}" style="width:220px;" oninput="filterActivities(this.value,'')"/>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      ${['全部','競賽','展覽','服務','體育','講座'].map(tag =>
        `<button class="btn btn-secondary btn-sm" onclick="filterActivities('','${tag === '全部' ? '' : tag}')">${tag}</button>`
      ).join('')}
    </div>
  </div>
  <div id="activities-list" style="display:flex;flex-direction:column;gap:12px;">
    ${renderActivityCards(state.data.activities)}
  </div>`
}

function filterActivities(keyword, tag) {
  let filtered = state.data.activities || []
  if (keyword) filtered = filtered.filter(a => a.title.includes(keyword) || a.club.includes(keyword))
  if (tag) filtered = filtered.filter(a => a.tags.includes(tag))
  document.getElementById('activities-list').innerHTML = renderActivityCards(filtered)
}

function renderActivityCards(activities) {
  return activities.map(a => {
    const d = new Date(a.date)
    const day = d.getDate()
    const month = d.toLocaleString('zh-TW', { month: 'short' })
    const statusMap = { upcoming: '即將舉行', ongoing: '進行中', completed: '已結束' }
    const statusClass = { upcoming: 'badge-info', ongoing: 'badge-approved', completed: 'badge-pending' }
    return `
    <div class="activity-card fade-in">
      <div class="activity-date-box">
        <span class="day">${day}</span>
        <span class="month">${month}</span>
      </div>
      <div class="activity-info">
        <h4>${a.title}</h4>
        <div class="meta">
          <span><i class="fas fa-users"></i> ${a.club}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${a.location}</span>
          <span><i class="fas fa-user-friends"></i> ${a.participants}人</span>
          <span class="badge ${statusClass[a.status]}">${statusMap[a.status]}</span>
        </div>
        <div class="activity-tags">
          ${a.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
      </div>
      <div>
        <button class="btn btn-primary btn-sm" onclick="showActivityDetail(${a.id})">
          <i class="fas fa-info-circle"></i>
        </button>
      </div>
    </div>`
  }).join('')
}

function showActivityDetail(id) {
  const act = (state.data.activities || []).find(a => a.id == id)
  if (!act) return
  showModal(`
    <div class="modal-header">
      <span class="modal-title">${act.title}</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;text-align:center;">
      <div style="background:#f8fafc;padding:12px;border-radius:8px;">
        <div style="font-weight:700;color:#003087;">${act.participants}</div>
        <div style="font-size:11px;color:#64748b;">預計參與</div>
      </div>
      <div style="background:#f8fafc;padding:12px;border-radius:8px;">
        <div style="font-weight:700;color:#003087;">${act.date}</div>
        <div style="font-size:11px;color:#64748b;">活動日期</div>
      </div>
      <div style="background:#f8fafc;padding:12px;border-radius:8px;">
        <div style="font-weight:700;color:#003087;">${act.location}</div>
        <div style="font-size:11px;color:#64748b;">地點</div>
      </div>
    </div>
    <p style="font-size:13px;color:#475569;margin-bottom:16px;">本次活動由 <strong>${act.club}</strong> 主辦，歡迎全校師生踴躍參與。</p>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
      ${act.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
    </div>
    <div style="display:flex;gap:8px;justify-content:flex-end;">
      <button class="btn btn-primary btn-sm"><i class="fas fa-calendar-plus"></i>加入行事曆</button>
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">關閉</button>
    </div>`)
}

// ─────────────────────────────────────────────
// CALENDAR PAGE
// ─────────────────────────────────────────────
async function renderCalendar() {
  document.getElementById('topbar-title').textContent = t('calendar')
  const data = await fetchData(`${API}/calendar?month=2026-04`)
  const el = document.getElementById('page-content')

  const typeColors = { competition: '#3b82f6', exhibition: '#8b5cf6', service: '#10b981', training: '#f59e0b', lecture: '#ef4444' }
  const typeLabels = { competition: '競賽', exhibition: '展覽', service: '服務', training: '研習', lecture: '講座' }

  el.innerHTML = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <h2 style="font-size:20px;font-weight:800;"><i class="fas fa-calendar-alt" style="color:#003087;margin-right:8px;"></i>${t('calendar')}</h2>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-secondary btn-sm"><i class="fas fa-chevron-left"></i></button>
      <span style="font-size:15px;font-weight:700;padding:6px 12px;">2026年 4月</span>
      <button class="btn btn-secondary btn-sm"><i class="fas fa-chevron-right"></i></button>
    </div>
  </div>

  <div class="card" style="margin-bottom:20px;">
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;background:#e5e7eb;">
      ${['日','一','二','三','四','五','六'].map(d => `<div style="background:#f8fafc;padding:10px;text-align:center;font-size:13px;font-weight:600;color:#64748b;">${d}</div>`).join('')}
      ${generateCalendarDays(2026, 4, (data?.events || []))}
    </div>
  </div>

  <div class="card">
    <div class="card-header"><span class="card-title"><i class="fas fa-list"></i>4月活動列表</span></div>
    ${(data?.events || []).map(e => `
      <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #f1f5f9;">
        <div style="width:8px;height:8px;border-radius:50%;background:${typeColors[e.type] || '#94a3b8'};flex-shrink:0;"></div>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:14px;">${e.title}</div>
          <div style="font-size:12px;color:#64748b;">${e.club} · ${e.venue} · ${e.date}</div>
        </div>
        <span class="badge" style="background:${typeColors[e.type]}20;color:${typeColors[e.type]};">${typeLabels[e.type] || e.type}</span>
      </div>`).join('')}
  </div>`
}

function generateCalendarDays(year, month, events) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  let html = ''

  for (let i = 0; i < firstDay; i++) {
    html += `<div style="background:white;padding:8px;min-height:70px;"></div>`
  }

  const eventDates = {}
  events.forEach(e => {
    const d = parseInt(e.date.split('-')[2])
    if (!eventDates[d]) eventDates[d] = []
    eventDates[d].push(e)
  })

  const typeColors = { competition: '#3b82f6', exhibition: '#8b5cf6', service: '#10b981', training: '#f59e0b', lecture: '#ef4444' }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === 20
    const dayEvents = eventDates[d] || []
    html += `
    <div style="background:white;padding:8px;min-height:70px;${isToday ? 'background:#eff6ff;' : ''}">
      <div style="font-size:13px;font-weight:${isToday ? '800' : '400'};color:${isToday ? '#003087' : '#374151'};margin-bottom:4px;">${d}</div>
      ${dayEvents.map(e => `<div style="font-size:10px;background:${typeColors[e.type] || '#94a3b8'}20;color:${typeColors[e.type] || '#94a3b8'};padding:2px 5px;border-radius:3px;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${e.title}</div>`).join('')}
    </div>`
  }
  return html
}

// ─────────────────────────────────────────────
// E-PORTFOLIO PAGE
// ─────────────────────────────────────────────
async function renderPortfolio() {
  document.getElementById('topbar-title').textContent = t('portfolio')
  const data = await fetchData(`${API}/portfolio/1`)
  const el = document.getElementById('page-content')

  el.innerHTML = `
  <div style="max-width:800px;margin:0 auto;">
    <div class="hero-banner" style="margin-bottom:20px;">
      <div style="display:flex;align-items:center;gap:16px;">
        <div style="width:70px;height:70px;background:rgba(200,169,81,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800;color:#C8A951;">${data?.name?.[0] || '王'}</div>
        <div>
          <div class="hero-title" style="font-size:20px;">${data?.name || '王小明'}</div>
          <div class="hero-sub">${data?.student_id || '112071001'} · 輔仁大學 資訊管理學系</div>
        </div>
        <button class="btn btn-gold" style="margin-left:auto;" onclick="toast('PDF 報告生成中...','info')">
          <i class="fas fa-file-pdf"></i> 匯出 PDF
        </button>
      </div>
    </div>

    <div class="stat-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px;">
      <div class="stat-card green"><div class="stat-icon green"><i class="fas fa-calendar-check"></i></div><div><div class="stat-value">${data?.activities?.length || 2}</div><div class="stat-label">參與活動</div></div></div>
      <div class="stat-card blue"><div class="stat-icon blue"><i class="fas fa-hands-helping"></i></div><div><div class="stat-value">${data?.total_volunteer_hours || 24}</div><div class="stat-label">志工時數</div></div></div>
      <div class="stat-card yellow"><div class="stat-icon yellow"><i class="fas fa-certificate"></i></div><div><div class="stat-value">${data?.certificates?.length || 1}</div><div class="stat-label">獲得證書</div></div></div>
      <div class="stat-card purple"><div class="stat-icon purple"><i class="fas fa-star"></i></div><div><div class="stat-value">${data?.credit_score || 95}</div><div class="stat-label">信用點數</div></div></div>
    </div>

    <div class="chart-grid" style="margin-bottom:20px;">
      <div class="chart-card">
        <h3><i class="fas fa-spider-web"></i>職能成長雷達</h3>
        <div class="chart-container"><canvas id="portfolio-radar"></canvas></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title"><i class="fas fa-tags"></i>技能標籤</span></div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">
          ${(data?.skills || ['Vue.js','Python','資料分析','專案管理','公眾演講']).map(s =>
            `<span style="background:#eff6ff;color:#2563eb;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;">${s}</span>`
          ).join('')}
        </div>
        <div class="card-header" style="margin-top:16px;"><span class="card-title"><i class="fas fa-certificate"></i>獲得證書</span></div>
        ${(data?.certificates || []).map(c => `
          <div style="display:flex;align-items:center;gap:10px;padding:10px;background:#f8fafc;border-radius:8px;margin-bottom:8px;">
            <i class="fas fa-award" style="font-size:20px;color:#f59e0b;"></i>
            <div>
              <div style="font-size:13px;font-weight:600;">${c.name}</div>
              <div style="font-size:11px;color:#64748b;">${c.issuer} · ${c.date}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header"><span class="card-title"><i class="fas fa-history"></i>活動參與記錄</span></div>
      <table>
        <thead><tr><th>活動名稱</th><th>擔任角色</th><th>日期</th><th>成果</th></tr></thead>
        <tbody>
          ${(data?.activities || []).map(a => `
            <tr>
              <td><strong>${a.name}</strong></td>
              <td><span class="badge badge-info">${a.role}</span></td>
              <td style="font-size:12px;">${a.date}</td>
              <td style="font-size:13px;">${a.achievement || `${a.hours || 0}小時`}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`

  setTimeout(() => {
    createRadarChart('portfolio-radar',
      ['溝通', '領導', '技術', '創意', '執行', '團隊'],
      [70, 65, 88, 75, 72, 80])
  }, 100)
}

// ─────────────────────────────────────────────
// USERS PAGE
// ─────────────────────────────────────────────
async function renderUsers() {
  document.getElementById('topbar-title').textContent = t('users')
  const data = await fetchData(`${API}/users`)

  const el = document.getElementById('page-content')
  el.innerHTML = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <h2 style="font-size:20px;font-weight:800;"><i class="fas fa-user-cog" style="color:#003087;margin-right:8px;"></i>${t('users')}</h2>
  </div>
  <div class="card">
    <table>
      <thead><tr>
        <th>姓名</th><th>學號</th><th>Email</th><th>角色</th><th>信用分</th><th>操作</th>
      </tr></thead>
      <tbody>
        ${(data || []).map(u => `
          <tr>
            <td><strong>${u.name}</strong></td>
            <td style="font-size:12px;">${u.student_id}</td>
            <td style="font-size:12px;">${u.email}</td>
            <td><span class="badge badge-info">${getRoleLabel(u.role)}</span></td>
            <td>
              <span style="color:${u.credit_score >= 80 ? '#10b981' : u.credit_score >= 60 ? '#f59e0b' : '#ef4444'};font-weight:700;">
                ${u.credit_score}
              </span>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="toast('查看用戶 ${u.name} 詳情','info')">
                <i class="fas fa-eye"></i>
              </button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div>`
}

// ─────────────────────────────────────────────
// AI TOOLS PAGE
// ─────────────────────────────────────────────
function renderAITools() {
  document.getElementById('topbar-title').textContent = t('aiTools')
  const el = document.getElementById('page-content')
  el.innerHTML = `
  <h2 style="font-size:20px;font-weight:800;margin-bottom:20px;"><i class="fas fa-brain" style="color:#003087;margin-right:8px;"></i>AI 智慧工具中心</h2>

  <div class="chart-grid">
    <div class="card">
      <div class="card-header"><span class="card-title"><i class="fas fa-robot"></i>AI 智慧預審</span></div>
      <div class="form-group">
        <label class="form-label">輸入申請內容</label>
        <textarea class="form-control" id="ai-screen-input" rows="4" placeholder="輸入預約理由或活動企劃摘要..."></textarea>
      </div>
      <button class="btn btn-primary" onclick="runAIScreen()"><i class="fas fa-search"></i>執行預審</button>
      <div id="ai-screen-result" style="margin-top:12px;"></div>
    </div>

    <div class="card">
      <div class="card-header"><span class="card-title"><i class="fas fa-magic"></i>AI 企劃書生成器</span></div>
      <div class="form-group">
        <label class="form-label">活動名稱</label>
        <input type="text" class="form-control" id="plan-name" placeholder="e.g. 春季聯誼活動"/>
      </div>
      <div class="form-group">
        <label class="form-label">社團名稱</label>
        <input type="text" class="form-control" id="plan-club" placeholder="e.g. 資管系學會"/>
      </div>
      <div class="form-group">
        <label class="form-label">預計人數</label>
        <input type="number" class="form-control" id="plan-pax" value="100"/>
      </div>
      <button class="btn btn-primary" onclick="generatePlan()"><i class="fas fa-file-alt"></i>生成企劃書</button>
      <div id="plan-result" style="margin-top:12px;"></div>
    </div>
  </div>

  <div class="ai-panel" style="margin-top:20px;">
    <h3><i class="fas fa-database"></i> Dify RAG 知識庫狀態</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:12px;">
      ${[
        { name: '課指組法規 FAQ', count: 48, status: '✅' },
        { name: '場地器材規定', count: 23, status: '✅' },
        { name: '社團輔導辦法', count: 156, status: '✅' },
        { name: '表單下載索引', count: 37, status: '✅' },
        { name: '歷年優秀活動', count: 89, status: '🔄' },
        { name: '行政法規彙整', count: 201, status: '✅' },
      ].map(kb => `
        <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:12px;text-align:center;">
          <div style="font-size:20px;margin-bottom:4px;">${kb.status}</div>
          <div style="font-size:12px;font-weight:600;">${kb.name}</div>
          <div style="font-size:10px;opacity:0.7;">${kb.count} 筆資料</div>
        </div>`).join('')}
    </div>
  </div>`
}

async function runAIScreen() {
  const input = document.getElementById('ai-screen-input')?.value
  if (!input) { toast('請輸入申請內容', 'error'); return }
  const result = await postData(`${API}/ai/screen`, { purpose: input, role: state.user?.role })
  const rClass = result.risk_level === 'High' ? '#fee2e2' : result.risk_level === 'Medium' ? '#fef3c7' : '#dcfce7'
  const rText = result.risk_level === 'High' ? '#dc2626' : result.risk_level === 'Medium' ? '#d97706' : '#16a34a'
  document.getElementById('ai-screen-result').innerHTML = `
    <div style="background:${rClass};border-radius:8px;padding:14px;">
      <div style="font-size:15px;font-weight:700;color:${rText};margin-bottom:6px;">
        ${result.risk_level === 'High' ? '❌' : result.risk_level === 'Medium' ? '⚠️' : '✅'} 
        ${result.risk_level} Risk
      </div>
      <p style="font-size:13px;color:#374151;">${result.reasoning}</p>
      ${result.law_reference ? `<p style="font-size:11px;color:#64748b;margin-top:6px;">${result.law_reference}</p>` : ''}
    </div>`
}

async function generatePlan() {
  const name = document.getElementById('plan-name')?.value
  const club = document.getElementById('plan-club')?.value
  const pax = document.getElementById('plan-pax')?.value
  if (!name) { toast('請輸入活動名稱', 'error'); return }
  document.getElementById('plan-result').innerHTML = `<div class="loading" style="padding:16px;text-align:center;">⏳ AI 生成中...</div>`
  const result = await postData(`${API}/ai/generate-plan`, { event_name: name, club_name: club, expected_participants: parseInt(pax), event_type: '社團活動' })
  if (result?.data) {
    document.getElementById('plan-result').innerHTML = `
      <div style="background:#f8fafc;border-radius:8px;padding:14px;">
        <div style="font-weight:700;font-size:14px;margin-bottom:10px;color:#1e293b;">${result.data.title}</div>
        ${result.data.sections.map(s => `
          <div style="margin-bottom:8px;">
            <div style="font-size:12px;font-weight:600;color:#003087;">${s.title}</div>
            <div style="font-size:12px;color:#475569;">${s.content}</div>
          </div>`).join('')}
        <div style="font-size:12px;color:#10b981;font-weight:600;">✅ 法規合規：${result.data.compliance_check} | 預估費用：$${result.data.estimated_budget?.toLocaleString()}</div>
      </div>`
  }
}

// ─────────────────────────────────────────────
// MISC
// ─────────────────────────────────────────────
function setLang(lang) {
  state.lang = lang
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === lang)
  })
  renderApp()
}

function changeLang() {
  const langs = ['zh-TW', 'en', 'ja', 'ko']
  const idx = langs.indexOf(state.lang)
  setLang(langs[(idx + 1) % langs.length])
  toast(`語系已切換為：${state.lang}`, 'info')
}

function showNotifications() {
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-bell" style="color:#003087;"></i> 系統通知</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    ${[
      { icon: '📋', msg: '您的場地預約申請（焯炤館）已核准', time: '5分鐘前', type: 'success' },
      { icon: '⚠️', msg: 'AI 預審偵測到申請內容需人工審核', time: '1小時前', type: 'warning' },
      { icon: '📣', msg: '課指組：幹部知能研習報名截止提醒', time: '3小時前', type: 'info' },
      { icon: '🔴', msg: '器材借用（無線麥克風×2）明日到期，請及時歸還', time: '昨天', type: 'error' },
    ].map(n => `
      <div style="display:flex;gap:10px;padding:12px;border-bottom:1px solid #f1f5f9;align-items:flex-start;">
        <span style="font-size:20px;">${n.icon}</span>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:500;">${n.msg}</div>
          <div style="font-size:11px;color:#94a3b8;">${n.time}</div>
        </div>
      </div>`).join('')}
    <div style="text-align:center;padding:12px;">
      <button class="btn btn-secondary btn-sm" onclick="closeModal()">全部已讀</button>
    </div>`)
}

function logout() {
  state.user = null
  state.currentPage = 'dashboard'
  toast('已登出系統', 'info')
  Object.values(state.charts).forEach(c => c.destroy())
  state.charts = {}
  renderLogin()
}

// ── Boot ──
window.navigate = navigate
window.demoLogin = demoLogin
window.selectRole = selectRole
window.logout = logout
window.closeModal = closeModal
window.closeModalOnOverlay = closeModalOnOverlay
window.setLang = setLang
window.changeLang = changeLang
window.showNotifications = showNotifications
window.toggleSidebar = toggleSidebar

window.showReservationForm = showReservationForm
window.reserveVenue = reserveVenue
window.submitAIScreen = submitAIScreen
window.submitReservation = submitReservation
window.viewReservation = viewReservation

window.showBorrowForm = showBorrowForm
window.submitBorrow = submitBorrow

window.filterClubs = filterClubs
window.viewClub = viewClub

window.filterActivities = filterActivities
window.showActivityDetail = showActivityDetail

window.runAIScreen = runAIScreen
window.generatePlan = generatePlan

document.addEventListener('DOMContentLoaded', () => {
  renderLogin()
})
