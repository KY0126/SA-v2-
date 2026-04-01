// ═══════════════════════════════════════════════════════
//  FJU Smart Hub v3.1 - Full Frontend Application
//  Features: Campus Map, AI Nav, Regulations RAG, Venue RAG
// ═══════════════════════════════════════════════════════

const API = '/api'

// ── i18n Translations ──
const LANGS = {
  'zh-TW': {
    appName: 'FJU Smart Hub', appSubtitle: '輔仁大學校園管理系統',
    login: '登入系統', googleLogin: '以 Google 帳號示範登入',
    domainNotice: '僅限 @cloud.fju.edu.tw 帳號使用', selectRole: '選擇示範角色',
    dashboard: '儀表板', reservation: '場地預約', equipment: '器材借用',
    clubs: '社團管理', activities: '活動牆', calendar: '行事曆',
    portfolio: 'E-Portfolio', users: '用戶管理', aiTools: 'AI 工具',
    campusMap: '校園地圖', aiNav: 'AI 導覽查詢', regsRag: '法規查詢 RAG',
    venueRag: '預約流程 RAG', settings: '系統設定', logout: '登出',
    makeReservation: '新增預約', phase1: '志願序申請', phase2: '衝突協商', phase3: '官方核定',
    risk_low: '低風險', risk_medium: '中風險', risk_high: '高風險',
    approved: '已核准', pending: '待審核', rejected: '已駁回',
    credit: '信用點數', members: '社員人數', events: '活動場次',
    searchPlaceholder: '搜尋活動、社團...', borrowEquipment: '申請借用',
    viewDetails: '查看詳情', submit: '送出', cancel: '取消',
    sendMsg: '發送訊息', clearChat: '清除對話',
    aiPlaceholder: '請輸入問題，例如：焯炤館在哪裡？如何預約場地？',
    regPlaceholder: '請輸入法規相關問題，例如：場地需要提前幾天申請？信用點數如何扣款？',
    venuePlaceholder: '請描述您的預約需求，例如：我要為社團活動預約場地，應該如何操作？',
    queryBtn: '查詢法規', venueQueryBtn: '查詢流程',
    accessibility: '無障礙設施', mapLegend: '地圖圖例',
    mapFilter: '篩選顯示', showAll: '顯示全部',
    showAccessible: '僅顯示無障礙設施',
  },
  'en': {
    appName: 'FJU Smart Hub', appSubtitle: 'Campus Management System',
    login: 'Login', googleLogin: 'Sign in with Google',
    domainNotice: 'Only @cloud.fju.edu.tw accounts', selectRole: 'Select Demo Role',
    dashboard: 'Dashboard', reservation: 'Venue Reservation', equipment: 'Equipment',
    clubs: 'Clubs', activities: 'Activity Wall', calendar: 'Calendar',
    portfolio: 'E-Portfolio', users: 'User Mgmt', aiTools: 'AI Tools',
    campusMap: 'Campus Map', aiNav: 'AI Navigation', regsRag: 'Regulations RAG',
    venueRag: 'Venue Booking RAG', settings: 'Settings', logout: 'Logout',
    makeReservation: 'New Reservation', phase1: 'Apply', phase2: 'Conflict', phase3: 'Official',
    risk_low: 'Low Risk', risk_medium: 'Med Risk', risk_high: 'High Risk',
    approved: 'Approved', pending: 'Pending', rejected: 'Rejected',
    credit: 'Credit Score', members: 'Members', events: 'Events',
    searchPlaceholder: 'Search activities, clubs...', borrowEquipment: 'Borrow',
    viewDetails: 'Details', submit: 'Submit', cancel: 'Cancel',
    sendMsg: 'Send', clearChat: 'Clear',
    aiPlaceholder: 'Ask anything, e.g.: Where is the auditorium? How to book a venue?',
    regPlaceholder: 'Ask about regulations, e.g.: How many days in advance for venue booking?',
    venuePlaceholder: 'Describe your booking needs, e.g.: How do I book a venue for a club event?',
    queryBtn: 'Query Regulations', venueQueryBtn: 'Query Process',
    accessibility: 'Accessibility', mapLegend: 'Map Legend',
    mapFilter: 'Filter', showAll: 'Show All', showAccessible: 'Accessible Only',
  },
  'ja': {
    appName: 'FJU Smart Hub', appSubtitle: 'キャンパス管理システム',
    login: 'ログイン', googleLogin: 'Googleでログイン',
    domainNotice: '@cloud.fju.edu.tw アカウントのみ', selectRole: 'デモロール選択',
    dashboard: 'ダッシュボード', reservation: '場所予約', equipment: '機材管理',
    clubs: 'クラブ管理', activities: 'イベント', calendar: 'カレンダー',
    portfolio: 'Eポートフォリオ', users: 'ユーザー管理', aiTools: 'AI ツール',
    campusMap: 'キャンパスマップ', aiNav: 'AI ナビ', regsRag: '規則照会',
    venueRag: '予約フロー', settings: '設定', logout: 'ログアウト',
    makeReservation: '新規予約', phase1: '申請', phase2: '調整', phase3: '承認',
    risk_low: '低リスク', risk_medium: '中リスク', risk_high: '高リスク',
    approved: '承認済', pending: '審査中', rejected: '却下',
    credit: 'クレジット', members: 'メンバー', events: 'イベント数',
    searchPlaceholder: 'イベント、クラブを検索...', borrowEquipment: '借用申請',
    viewDetails: '詳細', submit: '送信', cancel: 'キャンセル',
    sendMsg: '送信', clearChat: 'クリア',
    aiPlaceholder: '質問を入力してください。例：講堂はどこにありますか？',
    regPlaceholder: '規則に関する質問を入力してください。',
    venuePlaceholder: '予約ニーズを説明してください。',
    queryBtn: '規則照会', venueQueryBtn: 'フロー照会',
    accessibility: 'バリアフリー', mapLegend: '凡例',
    mapFilter: 'フィルター', showAll: '全て表示', showAccessible: 'バリアフリーのみ',
  },
  'ko': {
    appName: 'FJU Smart Hub', appSubtitle: '캠퍼스 관리 시스템',
    login: '로그인', googleLogin: 'Google로 로그인',
    domainNotice: '@cloud.fju.edu.tw 계정만', selectRole: '데모 역할 선택',
    dashboard: '대시보드', reservation: '장소 예약', equipment: '장비 관리',
    clubs: '클럽 관리', activities: '활동 게시판', calendar: '일정',
    portfolio: 'E-포트폴리오', users: '사용자 관리', aiTools: 'AI 도구',
    campusMap: '캠퍼스 맵', aiNav: 'AI 내비게이션', regsRag: '규정 조회',
    venueRag: '예약 절차', settings: '설정', logout: '로그아웃',
    makeReservation: '새 예약', phase1: '신청', phase2: '조율', phase3: '승인',
    risk_low: '저위험', risk_medium: '중위험', risk_high: '고위험',
    approved: '승인됨', pending: '검토 중', rejected: '거부됨',
    credit: '신용 점수', members: '회원 수', events: '행사 수',
    searchPlaceholder: '활동, 클럽 검색...', borrowEquipment: '대여 신청',
    viewDetails: '자세히', submit: '제출', cancel: '취소',
    sendMsg: '전송', clearChat: '지우기',
    aiPlaceholder: '질문을 입력하세요. 예: 강당은 어디에 있나요?',
    regPlaceholder: '규정 관련 질문을 입력하세요.',
    venuePlaceholder: '예약 요구 사항을 설명하세요.',
    queryBtn: '규정 조회', venueQueryBtn: '절차 조회',
    accessibility: '접근성', mapLegend: '범례',
    mapFilter: '필터', showAll: '모두 표시', showAccessible: '접근 가능만',
  },
  'fr': {
    appName: 'FJU Smart Hub', appSubtitle: 'Système de Gestion du Campus',
    login: 'Se connecter', googleLogin: 'Se connecter avec Google',
    domainNotice: 'Comptes @cloud.fju.edu.tw uniquement', selectRole: 'Choisir un rôle',
    dashboard: 'Tableau de bord', reservation: 'Réservation', equipment: 'Équipement',
    clubs: 'Clubs', activities: 'Activités', calendar: 'Calendrier',
    portfolio: 'E-Portfolio', users: 'Utilisateurs', aiTools: 'Outils IA',
    campusMap: 'Plan du campus', aiNav: 'Navigation IA', regsRag: 'Règlements RAG',
    venueRag: 'Réservation RAG', settings: 'Paramètres', logout: 'Déconnexion',
    makeReservation: 'Nouvelle réservation', phase1: 'Demande', phase2: 'Conflit', phase3: 'Officiel',
    risk_low: 'Risque faible', risk_medium: 'Risque moyen', risk_high: 'Risque élevé',
    approved: 'Approuvé', pending: 'En attente', rejected: 'Rejeté',
    credit: 'Score de crédit', members: 'Membres', events: 'Événements',
    searchPlaceholder: 'Rechercher des activités, clubs...', borrowEquipment: 'Emprunter',
    viewDetails: 'Détails', submit: 'Soumettre', cancel: 'Annuler',
    sendMsg: 'Envoyer', clearChat: 'Effacer',
    aiPlaceholder: 'Posez une question, ex: Où se trouve l\'auditorium?',
    regPlaceholder: 'Question sur les règlements, ex: Combien de jours à l\'avance?',
    venuePlaceholder: 'Décrivez vos besoins de réservation.',
    queryBtn: 'Interroger', venueQueryBtn: 'Consulter',
    accessibility: 'Accessibilité', mapLegend: 'Légende',
    mapFilter: 'Filtrer', showAll: 'Tout afficher', showAccessible: 'Accessibilité seulement',
  }
}

// ── State ──
const state = {
  lang: 'zh-TW',
  user: null,
  currentPage: 'dashboard',
  charts: {},
  data: { venues: [], reservations: [], clubs: [], equipment: [], activities: [], dashboard: null, calendar: [] },
  loading: false,
  modal: null,
  reservationStep: 1,
  aiResult: null,
  toasts: [],
  aiNavHistory: [],
  mapFilter: 'all',
  selectedBuilding: null
}

const t = (key) => (LANGS[state.lang] || LANGS['zh-TW'])[key] || key

// ── Toast ──
function toast(msg, type = 'success') {
  const id = Date.now()
  const container = document.getElementById('toast-container')
  if (!container) return
  const el = document.createElement('div')
  el.className = `toast ${type}`
  el.id = `toast-${id}`
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }
  el.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span class="toast-msg">${msg}</span>`
  container.appendChild(el)
  requestAnimationFrame(() => el.classList.add('show'))
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300) }, 3500)
}

function showModal(content) {
  const overlay = document.getElementById('modal-overlay')
  document.getElementById('modal-body').innerHTML = content
  overlay.classList.add('active')
}
function closeModal() { document.getElementById('modal-overlay')?.classList.remove('active') }
function closeModalOnOverlay(e) { if (e.target === document.getElementById('modal-overlay')) closeModal() }

// ── API Calls ──
async function fetchData(url) {
  try { const r = await axios.get(url); return r.data } catch(e) { console.error(e); return null }
}
async function postData(url, data) {
  try { const r = await axios.post(url, data); return r.data } catch(e) { return e.response?.data || { error: '請求失敗' } }
}

// ── Chart Helpers ──
function destroyChart(id) {
  if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id] }
}
function createChart(id, type, labels, data, options = {}) {
  destroyChart(id)
  const ctx = document.getElementById(id)
  if (!ctx) return
  const colors = ['#003087','#C8A951','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4']
  state.charts[id] = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: (type === 'pie' || type === 'doughnut') ? colors : (options.bgColor || colors[0] + '33'),
        borderColor: type === 'line' ? colors[0] : (type === 'bar' ? colors[0] : colors),
        borderWidth: 2, fill: type === 'line', tension: 0.4,
        pointRadius: type === 'line' ? 4 : undefined,
        pointBackgroundColor: type === 'line' ? '#fff' : undefined,
        pointBorderColor: type === 'line' ? colors[0] : undefined,
        ...options.dataset
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: (type==='pie'||type==='doughnut') ? 'bottom' : 'top', labels: { font: { size: 11 }, boxWidth: 12 } } },
      scales: (type!=='pie' && type!=='doughnut' && type!=='radar') ? {
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
      datasets: [{ data, backgroundColor: 'rgba(0,48,135,0.15)', borderColor: '#003087', borderWidth: 2, pointBackgroundColor: '#003087', pointRadius: 4 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20, font: { size: 10 } } } }
    }
  })
}

// ── Layout ──
function renderLayout(pageContent) {
  const u = state.user
  const navItems = [
    { key: 'dashboard', icon: 'fa-tachometer-alt', label: t('dashboard') },
    { key: 'campusMap', icon: 'fa-map-marked-alt', label: t('campusMap') },
    { key: 'reservation', icon: 'fa-calendar-check', label: t('reservation') },
    { key: 'equipment', icon: 'fa-tools', label: t('equipment') },
    { key: 'clubs', icon: 'fa-users', label: t('clubs') },
    { key: 'activities', icon: 'fa-star', label: t('activities') },
    { key: 'calendar', icon: 'fa-calendar-alt', label: t('calendar') },
    { key: 'portfolio', icon: 'fa-id-badge', label: t('portfolio') },
    { key: 'aiTools', icon: 'fa-robot', label: t('aiTools'), hasSubmenu: true },
  ]
  if (u?.role === 'admin' || u?.role === 'it_admin') {
    navItems.push({ key: 'users', icon: 'fa-user-cog', label: t('users') })
  }

  const creditColor = (u?.credit || 88) >= 90 ? '#10b981' : (u?.credit || 88) >= 70 ? '#f59e0b' : '#ef4444'
  const creditPct = Math.min(100, Math.max(0, u?.credit || 88))

  return `
  <div class="app-shell" id="app-shell">
    <!-- Sidebar -->
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <i class="fas fa-university" style="font-size:22px;color:#C8A951;"></i>
          <div class="sidebar-brand">
            <span class="brand-main">FJU</span>
            <span class="brand-sub">Smart Hub</span>
          </div>
        </div>
        <button class="sidebar-toggle" onclick="toggleSidebar()" title="收起側欄">
          <i class="fas fa-chevron-left"></i>
        </button>
      </div>

      <!-- User Profile -->
      <div class="sidebar-user">
        <div class="user-avatar" style="background:linear-gradient(135deg,#003087,#1a5276);">
          ${u?.name?.charAt(0) || 'U'}
        </div>
        <div class="user-info">
          <div class="user-name">${u?.name || 'Demo User'}</div>
          <div class="user-role">${getRoleLabel(u?.role)}</div>
        </div>
      </div>

      <!-- Credit Bar -->
      <div class="credit-bar-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-size:11px;color:#94a3b8;">${t('credit')}</span>
          <span style="font-size:12px;font-weight:700;color:${creditColor};">${creditPct}</span>
        </div>
        <div class="credit-bar-bg">
          <div class="credit-bar-fill" style="width:${creditPct}%;background:${creditColor};"></div>
        </div>
      </div>

      <!-- Nav Items -->
      <ul class="nav-list">
        ${navItems.map(item => {
          if (item.hasSubmenu) {
            return `
            <li class="nav-item nav-group">
              <div class="nav-link nav-group-header ${['aiNav','regsRag','venueRag'].includes(state.currentPage) ? 'active' : ''}"
                   onclick="toggleAISubmenu()">
                <i class="fas ${item.icon}"></i>
                <span class="nav-label">${item.label}</span>
                <i class="fas fa-chevron-down nav-arrow" id="ai-arrow"></i>
              </div>
              <ul class="nav-submenu" id="ai-submenu" style="${['aiNav','regsRag','venueRag'].includes(state.currentPage) ? '' : 'display:none'}">
                <li><a class="nav-sub-link ${state.currentPage==='aiNav'?'active':''}" onclick="navigate('aiNav')">
                  <i class="fas fa-comments"></i> ${t('aiNav')}
                </a></li>
                <li><a class="nav-sub-link ${state.currentPage==='regsRag'?'active':''}" onclick="navigate('regsRag')">
                  <i class="fas fa-balance-scale"></i> ${t('regsRag')}
                </a></li>
                <li><a class="nav-sub-link ${state.currentPage==='venueRag'?'active':''}" onclick="navigate('venueRag')">
                  <i class="fas fa-route"></i> ${t('venueRag')}
                </a></li>
              </ul>
            </li>`
          }
          return `<li class="nav-item">
            <a class="nav-link ${state.currentPage===item.key?'active':''}" onclick="navigate('${item.key}')">
              <i class="fas ${item.icon}"></i>
              <span class="nav-label">${item.label}</span>
            </a>
          </li>`
        }).join('')}
      </ul>

      <!-- Lang Switcher -->
      <div class="lang-switcher">
        ${['zh-TW','en','ja','ko','fr'].map(l => `
          <button class="lang-btn ${state.lang===l?'active':''}" onclick="setLang('${l}')">${l==='zh-TW'?'繁':l==='fr'?'FR':l.toUpperCase()}</button>
        `).join('')}
      </div>

      <div class="sidebar-footer">
        <button class="nav-link" onclick="showNotifications()" style="width:100%;border:none;background:none;cursor:pointer;">
          <i class="fas fa-bell"></i><span class="nav-label">通知</span>
          <span class="badge-red">3</span>
        </button>
        <button class="nav-link danger" onclick="logout()" style="width:100%;border:none;background:none;cursor:pointer;margin-top:4px;">
          <i class="fas fa-sign-out-alt"></i><span class="nav-label">${t('logout')}</span>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content" id="main-content">
      <!-- Top Bar -->
      <header class="topbar">
        <button class="topbar-menu-btn" onclick="toggleSidebar()">
          <i class="fas fa-bars"></i>
        </button>
        <div class="topbar-title">
          <h2 class="page-title">${getPageTitle()}</h2>
        </div>
        <div class="topbar-actions">
          <button class="topbar-btn" onclick="showNotifications()" title="通知">
            <i class="fas fa-bell"></i>
            <span class="notification-dot"></span>
          </button>
          <div class="topbar-user" onclick="navigate('portfolio')">
            <div class="topbar-avatar">${u?.name?.charAt(0)||'U'}</div>
            <span class="topbar-username">${u?.name||'Demo'}</span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="page-content" id="page-content">
        ${pageContent}
      </div>
    </main>
  </div>`
}

function getPageTitle() {
  const titles = {
    dashboard: t('dashboard'), campusMap: t('campusMap'),
    reservation: t('reservation'), equipment: t('equipment'),
    clubs: t('clubs'), activities: t('activities'), calendar: t('calendar'),
    portfolio: t('portfolio'), users: t('users'),
    aiNav: t('aiNav'), regsRag: t('regsRag'), venueRag: t('venueRag'),
    aiTools: t('aiTools')
  }
  return titles[state.currentPage] || 'FJU Smart Hub'
}

function getRoleLabel(role) {
  const labels = { student: '學生', club_officer: '社團幹部', professor: '指導教授', admin: '課指組職員', it_admin: '資訊管理員' }
  return labels[role] || role || '使用者'
}

function toggleAISubmenu() {
  const sub = document.getElementById('ai-submenu')
  const arrow = document.getElementById('ai-arrow')
  if (sub) {
    const isHidden = sub.style.display === 'none'
    sub.style.display = isHidden ? 'block' : 'none'
    if (arrow) arrow.style.transform = isHidden ? 'rotate(180deg)' : ''
  }
}

function toggleSidebar() {
  const shell = document.getElementById('app-shell')
  if (shell) shell.classList.toggle('sidebar-collapsed')
}

// ═══════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════

// ── LOGIN PAGE ──
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
      <div style="margin-bottom:20px;">
        <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:10px;text-align:center;">選擇示範角色</div>
        <div class="role-select-grid">
          ${[
            {role:'student', icon:'fa-user-graduate', label:'學生'},
            {role:'club_officer', icon:'fa-users', label:'社團幹部'},
            {role:'professor', icon:'fa-chalkboard-teacher', label:'指導教授'},
            {role:'admin', icon:'fa-user-shield', label:'課指組職員'},
          ].map((r,i) => `
            <div class="role-option ${i===0?'selected':''}" onclick="selectRole('${r.role}',this)">
              <i class="fas ${r.icon}"></i><span>${r.label}</span>
            </div>`).join('')}
        </div>
        <div style="margin-top:8px;">
          <div class="role-option" onclick="selectRole('it_admin',this)" style="display:flex;align-items:center;gap:10px;text-align:left;padding:10px 14px;">
            <i class="fas fa-server" style="font-size:18px;"></i><span>資訊中心管理員</span>
          </div>
        </div>
      </div>
      <button class="google-btn" onclick="demoLogin()">
        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        以 Google 帳號示範登入
      </button>
      <div style="font-size:11px;color:#94a3b8;text-align:center;margin-top:12px;">
        <i class="fas fa-lock" style="margin-right:4px;"></i>僅限 @cloud.fju.edu.tw 帳號 | 2FA 驗證保護
      </div>
      <div style="margin-top:16px;display:flex;justify-content:center;gap:6px;">
        ${['zh-TW','en','ja','ko','fr'].map(l=>`<button class="lang-btn ${state.lang===l?'active':''}" onclick="setLang('${l}');renderLogin()">${l==='zh-TW'?'繁中':l==='fr'?'FR':l.toUpperCase()}</button>`).join('')}
      </div>
    </div>
  </div>`
  state._selectedRole = 'student'
}

let _selectedRole = 'student'
function selectRole(role, el) {
  _selectedRole = role
  document.querySelectorAll('.role-option').forEach(e => e.classList.remove('selected'))
  el?.classList.add('selected')
}

function demoLogin() {
  const names = { student:'王小明', club_officer:'李美華', professor:'陳志明 教授', admin:'張課指', it_admin:'林資訊' }
  state.user = { id: 1, name: names[_selectedRole]||'Demo', role: _selectedRole, email: 'demo@cloud.fju.edu.tw', credit: 88 }
  toast(`歡迎回來，${state.user.name}！`, 'success')
  navigate('dashboard')
}

// ── DASHBOARD ──
async function renderDashboard() {
  const d = await fetchData(`${API}/dashboard/${state.user?.role || 'student'}`)
  const role = state.user?.role || 'student'

  const statsHTML = d?.stats ? Object.entries(d.stats).map(([k, v]) => {
    const icons = { total_clubs:'fa-users', active_reservations:'fa-calendar-check', pending_review:'fa-clock', total_users:'fa-user-friends', members:'fa-user-plus', upcoming_events:'fa-star', credit_score:'fa-award', pending_items:'fa-tasks', guided_clubs:'fa-chalkboard-teacher', total_activities:'fa-calendar', students_guided:'fa-graduation-cap', activities_joined:'fa-running', volunteer_hours:'fa-hands-helping', skill_tags:'fa-tags', api_uptime:'fa-server', blocked_attacks:'fa-shield-alt', storage_used:'fa-hdd', active_sessions:'fa-network-wired' }
    const labels = { total_clubs:'總社團數', active_reservations:'進行中預約', pending_review:'待審核', total_users:'總用戶', members:'社員人數', upcoming_events:'即將活動', credit_score:'信用點數', pending_items:'待處理', guided_clubs:'指導社團', total_activities:'活動場次', students_guided:'輔導學生', activities_joined:'參與活動', volunteer_hours:'志工時數', skill_tags:'技能標籤', api_uptime:'API可用率', blocked_attacks:'攔截攻擊', storage_used:'已用空間', active_sessions:'活躍連線' }
    return `<div class="stat-card"><div class="stat-icon"><i class="fas ${icons[k]||'fa-chart-bar'}"></i></div><div class="stat-info"><div class="stat-val">${v}</div><div class="stat-label">${labels[k]||k}</div></div></div>`
  }).join('') : ''

  const chartsHTML = d?.charts ? d.charts.map((ch,i) => `
    <div class="chart-card">
      <div class="chart-title">${ch.title}</div>
      <div class="chart-body" style="height:180px;">
        <canvas id="chart-${i}"></canvas>
      </div>
    </div>`).join('') : ''

  const recoHTML = d?.recommendations ? `
    <div class="section-card" style="margin-top:16px;">
      <div class="section-title"><i class="fas fa-lightbulb"></i> AI 推薦活動</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
        ${d.recommendations.map(r => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#f8fafc;border-radius:8px;border-left:3px solid #003087;">
            <div>
              <div style="font-size:13px;font-weight:600;">${r.name}</div>
              <div style="font-size:11px;color:#64748b;">${r.type}</div>
            </div>
            <div style="font-size:12px;font-weight:700;color:#003087;">${r.match}% 匹配</div>
          </div>`).join('')}
      </div>
    </div>` : ''

  document.getElementById('app').innerHTML = renderLayout(`
    <div class="stats-grid">${statsHTML}</div>
    <div class="charts-grid">${chartsHTML}</div>
    ${recoHTML}
    <div class="quick-actions-bar" style="margin-top:16px;">
      <div class="section-title" style="margin-bottom:10px;"><i class="fas fa-bolt"></i> 快速操作</div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;">
        <button class="btn btn-primary" onclick="navigate('reservation')"><i class="fas fa-calendar-plus"></i> 新增場地預約</button>
        <button class="btn btn-secondary" onclick="navigate('campusMap')"><i class="fas fa-map-marked-alt"></i> 查看校園地圖</button>
        <button class="btn btn-ai" onclick="navigate('aiNav')"><i class="fas fa-robot"></i> AI 導覽助手</button>
        <button class="btn btn-info" onclick="navigate('activities')"><i class="fas fa-star"></i> 活動動態</button>
      </div>
    </div>`)

  // Render charts after DOM update
  setTimeout(() => {
    if (d?.charts) {
      d.charts.forEach((ch, i) => {
        if (ch.type === 'radar' || ch.type === 'spider') {
          createRadarChart(`chart-${i}`, ch.labels || [], ch.values || [])
        } else if (ch.type === 'gauge') {
          createChart(`chart-${i}`, 'doughnut', ['已用', '剩餘'], [ch.current_value, 100 - ch.current_value])
        } else {
          createChart(`chart-${i}`, ch.type === 'bar' ? 'bar' : ch.type === 'pie' ? 'pie' : 'line', ch.labels || [], ch.values || [])
        }
      })
    }
  }, 50)
}

// ── CAMPUS MAP ──
function renderCampusMap() {
  document.getElementById('app').innerHTML = renderLayout(`
    <div class="campus-map-page">
      <!-- Map Controls -->
      <div class="map-controls">
        <div class="map-filter-btns">
          <button class="btn btn-sm ${state.mapFilter==='all'?'btn-primary':'btn-ghost'}" onclick="setMapFilter('all')">
            <i class="fas fa-globe"></i> ${t('showAll')}
          </button>
          <button class="btn btn-sm ${state.mapFilter==='accessible'?'btn-primary':'btn-ghost'}" onclick="setMapFilter('accessible')">
            <i class="fas fa-wheelchair"></i> ${t('showAccessible')}
          </button>
          <button class="btn btn-sm ${state.mapFilter==='venues'?'btn-primary':'btn-ghost'}" onclick="setMapFilter('venues')">
            <i class="fas fa-building"></i> 可預約場地
          </button>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-sm btn-ghost" onclick="navigate('aiNav')" title="詢問 AI 導覽">
            <i class="fas fa-robot" style="color:#003087;"></i> 詢問 AI
          </button>
        </div>
      </div>

      <!-- Map Container -->
      <div class="map-container">
        <div class="map-embed" id="campus-map-embed">
          <img src="/static/campus-map.svg" alt="輔仁大學校園地圖" style="width:100%;height:100%;object-fit:contain;" onerror="this.onerror=null;renderSVGMap()"/>
        </div>

        <!-- Building Info Panel -->
        <div class="map-info-panel" id="map-info-panel">
          <div style="font-size:13px;font-weight:600;color:#003087;margin-bottom:8px;">
            <i class="fas fa-info-circle"></i> 點擊地圖建築查看詳情
          </div>
          <div style="font-size:12px;color:#64748b;">
            本地圖包含輔仁大學主要建築、場地及無障礙設施標示。<br>
            <span style="color:#2196f3;">♿ 藍色</span>：無障礙坡道 &nbsp;
            <span style="color:#4caf50;">🛗 綠色</span>：電梯 &nbsp;
            <span style="color:#9c27b0;">🚻 紫色</span>：無障礙廁所
          </div>
        </div>
      </div>

      <!-- Accessibility Legend -->
      <div class="accessibility-legend">
        <div class="legend-title"><i class="fas fa-universal-access"></i> ${t('accessibility')} 無障礙設施說明</div>
        <div class="legend-grid">
          ${[
            { icon:'♿', color:'#2196f3', label:'無障礙坡道', desc:'建築入口坡道，適合輪椅使用' },
            { icon:'🛗', color:'#4caf50', label:'無障礙電梯', desc:'配備電梯，可達各樓層' },
            { icon:'🚻', color:'#9c27b0', label:'無障礙廁所', desc:'寬敞廁間，附緊急求助按鈕' },
            { icon:'P♿', color:'#ff9800', label:'無障礙停車位', desc:'鄰近入口，寬度加大' },
          ].map(item => `
            <div class="legend-item">
              <div class="legend-icon" style="background:${item.color}20;border:2px solid ${item.color};">
                <span style="font-size:16px;">${item.icon}</span>
              </div>
              <div class="legend-text">
                <div style="font-size:12px;font-weight:600;color:#1e293b;">${item.label}</div>
                <div style="font-size:11px;color:#64748b;">${item.desc}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Buildings List -->
      <div class="buildings-list">
        <div class="section-title"><i class="fas fa-building"></i> 主要場地列表</div>
        <div class="buildings-grid">
          ${[
            { name:'焯炤館演講廳', cap:300, type:'演講廳', accessible:true, elevator:true, restroom:true, reservable:true },
            { name:'仁愛空間', cap:50, type:'會議室', accessible:true, elevator:false, restroom:true, reservable:true },
            { name:'進修部演講廳', cap:200, type:'演講廳', accessible:true, elevator:true, restroom:false, reservable:true },
            { name:'潛水艇的天空', cap:30, type:'創意空間', accessible:false, elevator:false, restroom:false, reservable:true },
            { name:'圖書館研討室', cap:20, type:'研討室', accessible:true, elevator:true, restroom:true, reservable:true },
            { name:'體育館', cap:500, type:'體育設施', accessible:true, elevator:false, restroom:true, reservable:false },
            { name:'學生活動中心', cap:100, type:'多功能廳', accessible:true, elevator:true, restroom:true, reservable:true },
            { name:'宗倫樓大禮堂', cap:400, type:'大禮堂', accessible:true, elevator:true, restroom:true, reservable:false },
          ].filter(b => state.mapFilter !== 'accessible' || b.accessible)
           .filter(b => state.mapFilter !== 'venues' || b.reservable)
           .map(b => `
            <div class="building-card" onclick="showBuildingInfo('${b.name}',${b.cap},'${b.type}',${b.accessible},${b.elevator},${b.restroom},${b.reservable})">
              <div class="building-header">
                <div style="font-size:13px;font-weight:600;">${b.name}</div>
                <span class="badge ${b.reservable ? 'badge-green' : 'badge-gray'}">${b.reservable ? '可預約' : '不開放'}</span>
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:4px;">${b.type} · 容量 ${b.cap} 人</div>
              <div style="display:flex;gap:6px;margin-top:6px;">
                ${b.accessible ? '<span title="無障礙坡道" style="font-size:14px;">♿</span>' : ''}
                ${b.elevator ? '<span title="電梯" style="font-size:14px;">🛗</span>' : ''}
                ${b.restroom ? '<span title="無障礙廁所" style="font-size:14px;">🚻</span>' : ''}
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>`)
}

function setMapFilter(filter) {
  state.mapFilter = filter
  renderCampusMap()
}

function showBuildingInfo(name, cap, type, accessible, elevator, restroom, reservable) {
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-building" style="color:#003087;"></i> ${name}</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="padding:16px;">
      <div class="info-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
        <div class="info-item"><span class="info-label">類型</span><span class="info-val">${type}</span></div>
        <div class="info-item"><span class="info-label">容量</span><span class="info-val">${cap} 人</span></div>
        <div class="info-item"><span class="info-label">狀態</span><span class="badge ${reservable?'badge-green':'badge-gray'}">${reservable?'可預約':'不開放預約'}</span></div>
      </div>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px;color:#003087;">無障礙設施</div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:16px;">${accessible?'✅':'❌'}</span>
          <span style="font-size:13px;">無障礙坡道 / 輪椅通道</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:16px;">${elevator?'✅':'❌'}</span>
          <span style="font-size:13px;">無障礙電梯</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:16px;">${restroom?'✅':'❌'}</span>
          <span style="font-size:13px;">無障礙廁所</span>
        </div>
      </div>
      ${reservable ? `
      <div style="margin-top:16px;padding-top:16px;border-top:1px solid #f1f5f9;">
        <button class="btn btn-primary" onclick="closeModal();navigate('reservation')">
          <i class="fas fa-calendar-plus"></i> 前往預約此場地
        </button>
        <button class="btn btn-ai" onclick="closeModal();navigate('aiNav')" style="margin-left:8px;">
          <i class="fas fa-robot"></i> 詢問 AI 導覽
        </button>
      </div>` : ''}
    </div>`)
}

// ── AI NAVIGATION CHAT ──
function renderAINav() {
  if (!state.aiNavHistory.length) {
    state.aiNavHistory = [{
      role: 'assistant',
      content: '你好！我是 FJU Smart Hub AI 導覽助手 🎓\n我可以幫您解答關於：\n• 📍 校園場地位置與導引\n• 📅 場地預約流程說明\n• 🏆 信用點數制度\n• 👥 社團相關資訊\n• ♿ 無障礙設施查詢\n\n請輸入您的問題！',
      time: new Date().toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'})
    }]
  }

  document.getElementById('app').innerHTML = renderLayout(`
    <div class="ai-chat-page">
      <!-- Status Bar -->
      <div class="ai-status-bar">
        <div style="display:flex;align-items:center;gap:8px;">
          <div class="ai-status-dot"></div>
          <span style="font-size:13px;font-weight:600;color:#003087;">AI 導覽助手</span>
          <span class="badge badge-green">24/7 線上</span>
        </div>
        <button class="btn btn-sm btn-ghost" onclick="clearAIChat()">
          <i class="fas fa-trash"></i> ${t('clearChat')}
        </button>
      </div>

      <!-- Chat Window -->
      <div class="chat-window" id="chat-window">
        ${state.aiNavHistory.map(msg => renderChatBubble(msg)).join('')}
        <div id="chat-typing" style="display:none;" class="chat-bubble assistant">
          <div class="bubble-avatar"><i class="fas fa-robot"></i></div>
          <div class="bubble-content">
            <div class="typing-dots"><span></span><span></span><span></span></div>
          </div>
        </div>
      </div>

      <!-- Quick FAQ -->
      <div class="faq-chips" id="faq-chips">
        <div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">常見問題快捷：</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${[
            '焯炤館在哪裡？','如何預約場地？','信用點數怎麼扣？',
            '哪些建築有電梯？','器材借用規定？','社團如何申請活動？'
          ].map(q => `<button class="faq-chip" onclick="sendAIMessage('${q}')">${q}</button>`).join('')}
        </div>
      </div>

      <!-- Input Area -->
      <div class="chat-input-area">
        <div class="chat-input-wrap">
          <textarea class="chat-input" id="ai-input" placeholder="${t('aiPlaceholder')}" rows="2"
            onkeydown="handleChatKey(event)"></textarea>
          <button class="chat-send-btn" onclick="sendAIMessage()">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <!-- Shortcut Cards -->
      <div class="ai-shortcut-cards">
        <div class="ai-shortcut" onclick="navigate('regsRag')" style="border-color:#003087;">
          <i class="fas fa-balance-scale" style="color:#003087;font-size:20px;"></i>
          <div style="font-size:12px;font-weight:600;">法規查詢 RAG</div>
          <div style="font-size:11px;color:#64748b;">精準法規條文搜尋</div>
        </div>
        <div class="ai-shortcut" onclick="navigate('venueRag')" style="border-color:#C8A951;">
          <i class="fas fa-route" style="color:#C8A951;font-size:20px;"></i>
          <div style="font-size:12px;font-weight:600;">預約流程 RAG</div>
          <div style="font-size:11px;color:#64748b;">場地器材預約指引</div>
        </div>
      </div>
    </div>`)

  scrollChatToBottom()
}

function renderChatBubble(msg) {
  const isUser = msg.role === 'user'
  return `
  <div class="chat-bubble ${isUser ? 'user' : 'assistant'}">
    ${!isUser ? '<div class="bubble-avatar"><i class="fas fa-robot"></i></div>' : ''}
    <div class="bubble-content">
      <div class="bubble-text">${msg.content.replace(/\n/g, '<br>')}</div>
      <div class="bubble-time">${msg.time}</div>
    </div>
    ${isUser ? '<div class="bubble-avatar user"><i class="fas fa-user"></i></div>' : ''}
  </div>`
}

function scrollChatToBottom() {
  setTimeout(() => {
    const w = document.getElementById('chat-window')
    if (w) w.scrollTop = w.scrollHeight
  }, 50)
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIMessage() }
}

async function sendAIMessage(preset) {
  const input = document.getElementById('ai-input')
  const msg = preset || (input ? input.value.trim() : '')
  if (!msg) return
  if (input) input.value = ''

  const time = new Date().toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'})
  state.aiNavHistory.push({ role: 'user', content: msg, time })

  const chatWin = document.getElementById('chat-window')
  const typingEl = document.getElementById('chat-typing')
  if (chatWin) chatWin.insertAdjacentHTML('beforeend', renderChatBubble({ role:'user', content:msg, time }))
  if (typingEl) typingEl.style.display = 'flex'
  scrollChatToBottom()

  // Simulate AI response with contextual answers
  await new Promise(r => setTimeout(r, 800 + Math.random() * 600))

  const reply = generateAINavResponse(msg)
  state.aiNavHistory.push({ role: 'assistant', content: reply, time: new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'}) })

  if (typingEl) typingEl.style.display = 'none'
  if (chatWin) chatWin.insertAdjacentHTML('beforeend', renderChatBubble({ role:'assistant', content:reply, time: new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'}) }))
  scrollChatToBottom()
}

function generateAINavResponse(msg) {
  const lower = msg.toLowerCase()
  if (lower.includes('焯炤館') || lower.includes('演講廳') || lower.includes('lecture')) {
    return '📍 **焯炤館演講廳**位於校園中央北側，可容納 300 人。\n\n🗺️ 從正門進入後沿主幹道直行約 200 公尺即可到達。\n\n♿ **無障礙設施**：\n• 入口設有無障礙坡道\n• 附近設有無障礙停車位\n• 一樓有無障礙廁所\n\n📅 如需預約，請點選「場地預約」進行申請，需至少提前 3 天。'
  }
  if (lower.includes('電梯') || lower.includes('elevator') || lower.includes('無障礙')) {
    return '♿ **輔仁大學無障礙設施總覽**：\n\n🛗 **設有電梯的建築**：\n• 圖書館（B1~6F）\n• 行政大樓（1~5F）\n• 宗倫樓（1~4F）\n• 學生活動中心（1~3F）\n\n♿ **無障礙坡道**：\n• 焯炤館正門、進修部講廳、仁愛空間\n\n🚻 **無障礙廁所**：\n• 每棟主要建築均設有無障礙廁廂\n• 詳見「校園地圖」頁面的設施標示'
  }
  if (lower.includes('預約') || lower.includes('booking') || lower.includes('場地')) {
    return '📅 **場地預約流程（三階段）**：\n\n**第一階段：志願序申請**\n• 填寫活動目的、參與人數\n• AI 系統進行初步風險評估\n• 可填寫最多 3 個場地志願序\n\n**第二階段：衝突協商**\n• 系統自動偵測時段衝突\n• LINE Notify 即時通知相關社團\n• 48 小時內完成協商\n\n**第三階段：官方核定**\n• 課指組人工審核\n• 核准後發送 PDF 確認單\n• 含 TOTP QR Code 驗證\n\n💡 建議提前 7 天以上申請大型活動！'
  }
  if (lower.includes('信用') || lower.includes('點數') || lower.includes('credit')) {
    return '🏆 **信用點數制度說明**：\n\n**初始點數**：100 分\n\n**扣分規則**：\n• 預約後未到場：-10 分\n• 器材逾期未還：-5 分/天\n• 臨時取消（24小時內）：-3 分\n\n**加分規則**：\n• 準時簽到出席：+2 分\n• 志工服務時數（每5小時）：+3 分\n• 參與幹部研習：+5 分\n\n**信用等級**：\n• 🟢 健康（80-100）：正常使用所有功能\n• 🟡 警告（60-79）：預約需額外審核\n• 🔴 凍結（<60）：暫停預約權限 30 天'
  }
  if (lower.includes('器材') || lower.includes('equipment') || lower.includes('借用')) {
    return '🔧 **器材借用規定**：\n\n**可借用器材**（課指組倉庫）：\n• 無線麥克風、音響主機\n• 投影機、螢幕\n• 折疊桌椅、帳篷\n\n**借用規則**：\n1. 透過系統提交借用申請\n2. 最長借用期：3 天\n3. 借用前需掃描 TOTP QR Code 確認\n4. 逾期未還扣 5 信用分/天\n5. 損壞需按原價賠償\n\n📍 取還地點：課指組辦公室（仁愛空間旁）\n⏰ 開放時間：週一至週五 08:30-17:00'
  }
  if (lower.includes('社團') || lower.includes('club') || lower.includes('活動')) {
    return '🎭 **社團活動申請**：\n\n**申請流程**：\n1. 登入系統填寫活動企劃書\n2. AI 自動生成活動企劃草稿\n3. 指導教授審核同意\n4. 提交課指組審核\n5. 取得活動許可字號\n\n**注意事項**：\n• 大型活動（>150人）需提前 2 週申請\n• 需檢附安全計畫書\n• 校外講師需提供資格證明\n• 商業性活動需額外審查\n\n💡 善用「AI 企劃生成器」快速產出符合規範的活動企劃！'
  }
  if (lower.includes('宿舍') || lower.includes('停車') || lower.includes('門禁')) {
    return '🏠 **校園生活資訊**：\n\n**宿舍**：\n• 男生宿舍：恩愛樓（含無障礙房型）\n• 女生宿舍：瑪利諾樓（含無障礙房型）\n• 門禁：23:00（可申請延長至 24:00）\n\n**停車場**：\n• P1 停車場：地下1層，500個車位\n• P2 停車場：戶外，機車專用\n• ♿ 無障礙停車位：P1 入口處 20 個\n\n**校門**：\n• 正門（新生路）：24小時開放\n• 東門（羅斯福路）：06:00-22:00'
  }
  return `感謝您的提問！關於「${msg}」，以下是相關資訊：\n\n我目前可以回答關於校園地圖導覽、場地預約流程、信用點數、器材借用及社團活動等問題。\n\n如需更精確的法規條文查詢，請使用「法規查詢 RAG」功能；場地預約詳細流程請使用「預約流程 RAG」。\n\n如有其他問題，請繼續詢問！🎓`
}

function clearAIChat() {
  state.aiNavHistory = []
  renderAINav()
  toast('對話已清除', 'info')
}

// ── REGULATIONS RAG ──
function renderRegsRag() {
  document.getElementById('app').innerHTML = renderLayout(`
    <div class="rag-page">
      <div class="rag-grid">
        <!-- Left: Query Panel -->
        <div class="rag-query-panel">
          <div class="rag-panel-header" style="background:linear-gradient(135deg,#003087,#1a3a8f);">
            <i class="fas fa-balance-scale" style="font-size:24px;color:#C8A951;"></i>
            <div>
              <div style="font-size:15px;font-weight:700;color:white;">法規查詢 RAG</div>
              <div style="font-size:11px;color:#90caf9;">Regulations Retrieval Augmented Generation</div>
            </div>
          </div>
          <div class="rag-query-body">
            <label class="rag-label">輸入法規問題</label>
            <textarea class="rag-textarea" id="reg-query-input" placeholder="${t('regPlaceholder')}" rows="4"></textarea>
            <button class="btn btn-primary rag-submit-btn" onclick="submitRegQuery()">
              <i class="fas fa-search"></i> ${t('queryBtn')}
            </button>
            <div id="reg-result" class="rag-result-area"></div>
          </div>
        </div>

        <!-- Right: Common Questions & Knowledge Base -->
        <div class="rag-kb-panel">
          <div class="rag-kb-card">
            <div class="rag-kb-title"><i class="fas fa-question-circle"></i> 常見法規問題</div>
            <div class="rag-kb-list">
              ${[
                { q:'場地需要提前幾天申請？', icon:'📅' },
                { q:'信用點數不足如何影響預約？', icon:'🏆' },
                { q:'器材逾期未還的處罰規定？', icon:'⚠️' },
                { q:'大型活動（200人以上）的特殊規定？', icon:'👥' },
                { q:'未經許可活動的相關罰則？', icon:'🚫' },
                { q:'社團指導教授的責任範圍？', icon:'👨‍🏫' },
                { q:'預約取消的規範與期限？', icon:'❌' },
                { q:'申訴流程與 AI 申訴摘要功能？', icon:'📋' },
              ].map(item => `
                <div class="rag-kb-item" onclick="submitRegQuery('${item.q}')">
                  <span style="font-size:16px;">${item.icon}</span>
                  <span style="font-size:13px;">${item.q}</span>
                  <i class="fas fa-chevron-right" style="color:#94a3b8;margin-left:auto;font-size:11px;"></i>
                </div>`).join('')}
            </div>
          </div>

          <div class="rag-kb-card" style="margin-top:12px;">
            <div class="rag-kb-title"><i class="fas fa-database"></i> 知識庫來源</div>
            <div style="display:flex;flex-direction:column;gap:6px;padding:10px 12px;">
              ${[
                { name:'輔仁大學學生社團活動管理辦法', url:'http://activity.fju.edu.tw' },
                { name:'場地管理辦法', url:'http://140.136.202.67/fjuspace/' },
                { name:'器材借用辦法', url:'http://140.136.202.67/fjuactivity/' },
                { name:'課外活動指導組最新公告', url:'https://www.facebook.com/submarinesky/' },
              ].map(s => `
                <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                  <i class="fas fa-file-alt" style="color:#003087;"></i>
                  <span style="color:#374151;">${s.name}</span>
                  <span class="badge badge-blue" style="margin-left:auto;font-size:9px;">已索引</span>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`)
}

async function submitRegQuery(preset) {
  const input = document.getElementById('reg-query-input')
  const query = preset || (input ? input.value.trim() : '')
  if (!query) { toast('請輸入查詢問題', 'warning'); return }
  if (input) input.value = query

  const resultArea = document.getElementById('reg-result')
  if (resultArea) resultArea.innerHTML = `
    <div style="text-align:center;padding:20px;color:#64748b;">
      <div style="font-size:24px;margin-bottom:8px;">🔍</div>
      <div style="font-size:13px;">正在搜尋知識庫...</div>
      <div class="loading-bar" style="margin-top:10px;"></div>
    </div>`

  await new Promise(r => setTimeout(r, 900 + Math.random() * 700))

  const result = generateRegRAGResponse(query)
  if (resultArea) resultArea.innerHTML = `
    <div class="rag-answer">
      <div class="rag-answer-header">
        <i class="fas fa-check-circle" style="color:#10b981;"></i>
        <span>查詢結果</span>
        <span class="badge badge-green" style="margin-left:auto;">信心度 ${result.confidence}%</span>
      </div>
      <div class="rag-answer-body">${result.answer.replace(/\n/g,'<br>')}</div>
      <div class="rag-sources">
        <div style="font-size:11px;font-weight:600;color:#64748b;margin-bottom:6px;">📚 引用來源：</div>
        ${result.sources.map(s => `
          <div style="font-size:11px;color:#3b82f6;padding:3px 0;">
            <i class="fas fa-file-text"></i> ${s}
          </div>`).join('')}
      </div>
    </div>`
}

function generateRegRAGResponse(query) {
  const lower = query.toLowerCase()
  if (lower.includes('提前') || lower.includes('幾天') || lower.includes('申請')) {
    return {
      confidence: 96,
      answer: '📅 **場地申請時限規定**\n\n依據《輔仁大學場地管理辦法》第三條：\n\n• **一般活動（50人以下）**：至少提前 **3 個工作天**申請\n• **中型活動（51-150人）**：至少提前 **7 個工作天**申請\n• **大型活動（151人以上）**：至少提前 **14 個工作天**申請\n• **校慶等重大活動**：至少提前 **1 個月**申請\n\n⚠️ **注意**：臨時申請（少於規定天數）需要有特殊理由，且需課指組主任核准。',
      sources: ['《輔仁大學場地管理辦法》第三條', '課外活動指導組公告 (2026/01)']
    }
  }
  if (lower.includes('信用') || lower.includes('點數') || lower.includes('扣')) {
    return {
      confidence: 94,
      answer: '🏆 **信用點數不足的影響**\n\n依據《信用點數管理辦法》第五條：\n\n| 點數區間 | 狀態 | 限制內容 |\n|---------|------|----------|\n| 80-100 | 🟢 健康 | 正常使用全部功能 |\n| 60-79 | 🟡 警告 | 預約需主管額外審核 |\n| 40-59 | 🔴 限制 | 停止新增預約 30 天 |\n| <40 | ⛔ 凍結 | 停權 1 學期 |\n\n**申訴管道**：可透過「AI 申訴摘要」功能，由系統生成申訴書草稿，再提交課指組審查。',
      sources: ['《信用點數管理辦法》第五條', '《學生社團活動管理辦法》附件三']
    }
  }
  if (lower.includes('逾期') || lower.includes('器材') || lower.includes('罰')) {
    return {
      confidence: 92,
      answer: '⚠️ **器材逾期相關規定**\n\n依據《器材借用辦法》第七條：\n\n**逾期罰則**：\n• 第 1 天：警告 + 扣 5 信用分\n• 第 2-3 天：每天扣 5 信用分 + 通知指導教授\n• 第 4 天以上：停止借用權限 + 通知家長\n• 損壞器材：按採購價賠償，視情況追究責任\n\n**歸還程序**：\n1. 掃描 TOTP QR Code 確認身份\n2. 課指組人員確認器材狀況\n3. 系統自動解除借用記錄\n\n💡 如因特殊情況無法準時歸還，請至少提前 24 小時透過系統申請延期。',
      sources: ['《器材借用辦法》第七條', '課指組器材管理規範 (2025版)']
    }
  }
  if (lower.includes('大型') || lower.includes('200人') || lower.includes('特殊')) {
    return {
      confidence: 90,
      answer: '👥 **大型活動特殊規定**\n\n依據《學生社團活動管理辦法》第八條，150 人以上活動需額外提交：\n\n1. **安全計畫書**（含疏散路線圖）\n2. **緊急聯絡人名冊**\n3. **保險證明**（場地意外險）\n4. **校外人員名單**（如邀請校外講師）\n5. **財務預算明細表**\n\n**審核流程**：\n課指組 → 總務處 → 教務處 → 副校長室\n\n⏱️ 大型活動審核時間約需 **5-7 個工作天**，請提早申請！',
      sources: ['《學生社團活動管理辦法》第八條', '大型活動申請SOP (2026版)']
    }
  }
  if (lower.includes('申訴') || lower.includes('appeal')) {
    return {
      confidence: 88,
      answer: '📋 **申訴流程說明**\n\n**AI 申訴摘要功能**：\n系統提供 AI 自動生成申訴書草稿，步驟如下：\n\n1. 進入「AI 工具 > AI 申訴摘要」\n2. 描述申訴事由（系統 AI 協助整理重點）\n3. 確認草稿內容後下載 PDF\n4. 提交至課指組申訴信箱或親自遞交\n\n**申訴期限**：\n• 信用點數申訴：事件發生後 **10 個工作天**內\n• 預約結果申訴：通知發出後 **5 個工作天**內\n\n**審理時間**：約 5-10 個工作天',
      sources: ['《學生申訴處理辦法》', '課外活動指導組申訴規範']
    }
  }
  return {
    confidence: 82,
    answer: `📚 **關於「${query}」的法規查詢結果**\n\n根據輔仁大學相關規章辦法，此議題涉及以下規定：\n\n• 學生應遵守《輔仁大學學生手冊》相關規範\n• 社團活動需符合《學生社團活動管理辦法》\n• 具體條文請參閱課外活動指導組官方公告\n\n建議您：\n1. 直接聯繫課指組辦公室（分機：1234）\n2. 查閱輔大課指組網站：activity.fju.edu.tw\n3. 使用「AI 導覽助手」進行即時諮詢`,
    sources: ['《輔仁大學學生手冊》', '課外活動指導組公告']
  }
}

// ── VENUE BOOKING RAG ──
function renderVenueRag() {
  document.getElementById('app').innerHTML = renderLayout(`
    <div class="rag-page">
      <div style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
          <i class="fas fa-route" style="color:#C8A951;font-size:20px;"></i>
          <span style="font-size:16px;font-weight:700;color:#1e293b;">場地與器材預約流程 RAG</span>
          <span class="badge badge-gold">智慧導引</span>
        </div>
        <div style="font-size:12px;color:#64748b;">輸入您的預約需求，AI 將為您提供完整的步驟指引與注意事項</div>
      </div>

      <!-- Workflow Steps Visual -->
      <div class="workflow-steps">
        <div class="workflow-step" style="border-color:#003087;">
          <div class="step-number" style="background:#003087;">1</div>
          <div class="step-content">
            <div class="step-title">志願序申請</div>
            <div class="step-desc">填寫活動資訊、場地志願序，AI 進行初步風險評估</div>
          </div>
        </div>
        <div class="workflow-arrow"><i class="fas fa-arrow-right"></i></div>
        <div class="workflow-step" style="border-color:#f59e0b;">
          <div class="step-number" style="background:#f59e0b;">2</div>
          <div class="step-content">
            <div class="step-title">衝突協商</div>
            <div class="step-desc">系統偵測衝突，LINE Notify 通知，48小時完成協商</div>
          </div>
        </div>
        <div class="workflow-arrow"><i class="fas fa-arrow-right"></i></div>
        <div class="workflow-step" style="border-color:#10b981;">
          <div class="step-number" style="background:#10b981;">3</div>
          <div class="step-content">
            <div class="step-title">官方核定</div>
            <div class="step-desc">課指組審核，發送 PDF 確認單與 TOTP QR Code</div>
          </div>
        </div>
      </div>

      <div class="rag-grid" style="margin-top:16px;">
        <!-- Query Panel -->
        <div class="rag-query-panel">
          <div class="rag-panel-header" style="background:linear-gradient(135deg,#b8860b,#C8A951);">
            <i class="fas fa-route" style="font-size:24px;color:white;"></i>
            <div>
              <div style="font-size:15px;font-weight:700;color:white;">預約流程諮詢</div>
              <div style="font-size:11px;color:#fffde7;">描述需求，AI 自動規劃步驟</div>
            </div>
          </div>
          <div class="rag-query-body">
            <label class="rag-label">描述您的預約需求</label>
            <textarea class="rag-textarea" id="venue-query-input" placeholder="${t('venuePlaceholder')}" rows="4"></textarea>
            <button class="btn btn-gold rag-submit-btn" onclick="submitVenueQuery()">
              <i class="fas fa-magic"></i> ${t('venueQueryBtn')}
            </button>
            <div id="venue-result" class="rag-result-area"></div>
          </div>
        </div>

        <!-- Right Panel: Scenarios & Equipment -->
        <div class="rag-kb-panel">
          <div class="rag-kb-card">
            <div class="rag-kb-title"><i class="fas fa-lightbulb"></i> 常見預約情境</div>
            <div class="rag-kb-list">
              ${[
                { q:'我要辦社團成果發表，需要什麼場地？', icon:'🎭' },
                { q:'器材借用流程是什麼？', icon:'🔧' },
                { q:'場地預約被拒絕怎麼辦？', icon:'❌' },
                { q:'多個社團同時申請同一場地如何處理？', icon:'👥' },
                { q:'如何查詢場地使用狀態？', icon:'📊' },
                { q:'緊急取消預約的程序？', icon:'🚨' },
              ].map(item => `
                <div class="rag-kb-item" onclick="submitVenueQuery('${item.q}')">
                  <span style="font-size:16px;">${item.icon}</span>
                  <span style="font-size:13px;">${item.q}</span>
                  <i class="fas fa-chevron-right" style="color:#94a3b8;margin-left:auto;font-size:11px;"></i>
                </div>`).join('')}
            </div>
          </div>

          <div class="rag-kb-card" style="margin-top:12px;">
            <div class="rag-kb-title"><i class="fas fa-tools"></i> 可借用器材清單</div>
            <div style="padding:10px 12px;">
              <table style="width:100%;font-size:11px;border-collapse:collapse;">
                <thead><tr style="background:#f1f5f9;">
                  <th style="padding:4px 6px;text-align:left;">器材</th>
                  <th style="padding:4px 6px;text-align:center;">數量</th>
                  <th style="padding:4px 6px;text-align:center;">狀態</th>
                </tr></thead>
                <tbody>
                  ${[
                    {name:'無線麥克風', total:10, avail:7},
                    {name:'投影機', total:5, avail:3},
                    {name:'音響主機', total:3, avail:2},
                    {name:'折疊桌', total:30, avail:22},
                    {name:'帳篷（戶外）', total:8, avail:5},
                  ].map(eq => `
                    <tr style="border-bottom:1px solid #f1f5f9;">
                      <td style="padding:4px 6px;">${eq.name}</td>
                      <td style="padding:4px 6px;text-align:center;">${eq.avail}/${eq.total}</td>
                      <td style="padding:4px 6px;text-align:center;">
                        <span class="badge ${eq.avail>0?'badge-green':'badge-red'}">${eq.avail>0?'可借':'已滿'}</span>
                      </td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>`)
}

async function submitVenueQuery(preset) {
  const input = document.getElementById('venue-query-input')
  const query = preset || (input ? input.value.trim() : '')
  if (!query) { toast('請描述您的預約需求', 'warning'); return }
  if (input) input.value = query

  const resultArea = document.getElementById('venue-result')
  if (resultArea) resultArea.innerHTML = `
    <div style="text-align:center;padding:20px;color:#64748b;">
      <div style="font-size:24px;margin-bottom:8px;">⚙️</div>
      <div style="font-size:13px;">AI 正在規劃最佳預約路徑...</div>
      <div class="loading-bar" style="margin-top:10px;"></div>
    </div>`

  await new Promise(r => setTimeout(r, 1000 + Math.random() * 600))

  const result = generateVenueRAGResponse(query)
  if (resultArea) resultArea.innerHTML = `
    <div class="rag-answer">
      <div class="rag-answer-header">
        <i class="fas fa-route" style="color:#C8A951;"></i>
        <span>AI 預約導引</span>
        <span class="badge badge-gold" style="margin-left:auto;">步驟 ${result.steps.length} 步</span>
      </div>
      <div style="font-size:13px;color:#374151;margin-bottom:12px;">${result.summary}</div>
      <div style="font-size:12px;font-weight:600;color:#003087;margin-bottom:8px;">📋 建議步驟：</div>
      ${result.steps.map((step,i) => `
        <div style="display:flex;gap:10px;margin-bottom:8px;align-items:flex-start;">
          <div style="min-width:24px;height:24px;background:#003087;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">${i+1}</div>
          <div style="font-size:12px;line-height:1.5;color:#374151;">${step}</div>
        </div>`).join('')}
      ${result.warning ? `<div style="background:#fff3cd;border-left:3px solid #f59e0b;padding:8px 10px;border-radius:0 4px 4px 0;font-size:12px;margin-top:8px;"><i class="fas fa-exclamation-triangle" style="color:#f59e0b;"></i> <strong>注意：</strong>${result.warning}</div>` : ''}
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" onclick="navigate('reservation')">
          <i class="fas fa-calendar-plus"></i> 立即前往預約
        </button>
        <button class="btn btn-ghost btn-sm" onclick="navigate('campusMap')">
          <i class="fas fa-map"></i> 查看地圖
        </button>
      </div>
    </div>`
}

function generateVenueRAGResponse(query) {
  const lower = query.toLowerCase()
  if (lower.includes('成果發表') || lower.includes('展覽') || lower.includes('展示')) {
    return {
      summary: '成果發表活動建議選擇焯炤館演講廳（300人）或學生活動中心（100人），以下是完整申請流程：',
      steps: [
        '確認活動日期與預估人數，填寫「活動企劃書」（可使用 AI 生成器快速產出）',
        '至系統「場地預約」填寫志願序（建議填 3 個備選場地）',
        'AI 系統自動審核（約 30 分鐘），收到審核通知',
        '如有衝突，透過 LINE Notify 接收協商邀請，48 小時內完成',
        '等待課指組最終核定（3-5 工作天），收到 PDF 確認單',
        '活動當天攜帶 PDF 確認單或掃描 TOTP QR Code 入場',
        '活動結束後完成場地清點與歸還程序'
      ],
      warning: '成果發表如需展板、投影機等器材，請同步提交器材借用申請，建議提前 7 天以上申請。'
    }
  }
  if (lower.includes('器材') || lower.includes('借用') || lower.includes('麥克風')) {
    return {
      summary: '器材借用流程說明（課指組倉庫）：',
      steps: [
        '登入系統，進入「器材借用」查詢可用數量',
        '填寫借用申請表：選擇器材、借用日期、活動場地、歸還日期',
        '提交申請後等待系統自動審核（約 1-2 小時）',
        '審核通過後至課指組辦公室（仁愛空間旁）取件',
        '取件時掃描 TOTP QR Code 完成身份確認',
        '活動結束後，歸還器材並再次掃描 QR Code 完成還件',
        '系統自動更新借用記錄，信用點數恢復正常'
      ],
      warning: '借用期限最長 3 天，逾期每天扣 5 信用分。如需延期，請至少提前 24 小時線上申請。'
    }
  }
  if (lower.includes('被拒') || lower.includes('駁回') || lower.includes('失敗')) {
    return {
      summary: '場地申請被拒絕時，以下是處理方式：',
      steps: [
        '查看系統通知，確認拒絕原因（AI 預審失敗 / 衝突未解決 / 文件不足）',
        '若為 AI 預審問題：修改申請理由，移除爭議關鍵字，重新提交',
        '若為時段衝突：透過 LINE Notify 聯繫衝突社團，協商替換時段',
        '若為文件不足：補充要求文件（安全計畫、預算表等）後重新申請',
        '若對審核結果有異議：使用「AI 申訴摘要」生成申訴書，在 5 個工作天內提交',
        '申訴受理後，等待課指組重新審查（約 5-10 個工作天）'
      ],
      warning: null
    }
  }
  if (lower.includes('衝突') || lower.includes('多個') || lower.includes('搶場')) {
    return {
      summary: '多社團申請同一場地時，系統採用「加權優先級算法」處理衝突：',
      steps: [
        '系統根據信用點數、申請時間、活動規模等因素計算優先權重',
        '優先級最高的申請自動獲批，其餘進入「衝突協商」狀態',
        '透過 LINE Notify 通知所有相關社團，發起時段協商',
        '社團代表在系統上選擇備選時段或備選場地',
        '48 小時內若無法達成共識，由課指組裁定',
        '裁定結果以簡訊、Email、LINE Notify 三方同步通知',
        '所有申請方收到最終確認後，流程結束'
      ],
      warning: '信用點數較低的社團，在優先級競爭中會處於劣勢。請維持良好的信用記錄！'
    }
  }
  return {
    summary: `針對「${query}」的預約建議：`,
    steps: [
      '登入 FJU Smart Hub 系統',
      '確認您的信用點數（至少 60 分才能申請預約）',
      '選擇適合的場地或器材類型',
      '填寫完整的申請資訊（活動目的、人數、時間）',
      '等待 AI 系統初步審核（通常 30 分鐘內完成）',
      '按系統指引完成後續協商與確認流程',
      '收到最終確認單後即完成預約'
    ],
    warning: '如有特殊需求，建議直接聯繫課指組辦公室（分機：1234）諮詢。'
  }
}

// ── RESERVATION ──
async function renderReservation() {
  const venues = await fetchData(`${API}/venues`) || []
  const reservations = await fetchData(`${API}/reservations`) || []

  document.getElementById('app').innerHTML = renderLayout(`
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div>
          <div style="font-size:13px;color:#64748b;">三階段智慧預約系統</div>
        </div>
        <button class="btn btn-primary" onclick="showReservationForm()">
          <i class="fas fa-plus"></i> ${t('makeReservation')}
        </button>
      </div>

      <!-- Phase Indicator -->
      <div class="phase-steps">
        ${[
          {phase:'phase1', icon:'fa-list-ol', desc:'AI 智能預審 + 志願序'},
          {phase:'phase2', icon:'fa-handshake', desc:'LINE Notify 衝突協商'},
          {phase:'phase3', icon:'fa-stamp', desc:'PDF + TOTP QR Code'},
        ].map((s,i) => `
          <div class="phase-step ${i===state.reservationStep-1?'active':''}">
            <div class="phase-icon"><i class="fas ${s.icon}"></i></div>
            <div class="phase-info">
              <div style="font-size:12px;font-weight:700;">${t(s.phase)}</div>
              <div style="font-size:10px;color:#94a3b8;">${s.desc}</div>
            </div>
          </div>
          ${i<2?'<div class="phase-divider"></div>':''}`).join('')}
      </div>

      <!-- Venues Grid -->
      <div class="section-card" style="margin-bottom:16px;">
        <div class="section-title"><i class="fas fa-building"></i> 可用場地</div>
        <div class="venues-grid">
          ${venues.map(v => `
            <div class="venue-card ${v.available ? '' : 'unavailable'}">
              <div class="venue-header">
                <span class="venue-name">${v.name}</span>
                <span class="badge ${v.available ? 'badge-green' : 'badge-red'}">${v.available ? '可用' : '佔用中'}</span>
              </div>
              <div style="font-size:12px;color:#64748b;margin:4px 0;">容量：${v.capacity} 人 | 類型：${v.type}</div>
              ${v.available ? `<button class="btn btn-primary btn-sm" onclick="reserveVenue(${v.id},'${v.name}')"><i class="fas fa-calendar-plus"></i> 預約</button>` : '<button class="btn btn-ghost btn-sm" disabled>不可用</button>'}
            </div>`).join('')}
        </div>
      </div>

      <!-- Recent Reservations -->
      <div class="section-card">
        <div class="section-title"><i class="fas fa-history"></i> 近期預約記錄</div>
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead><tr>
              <th>場地</th><th>申請社團</th><th>時段</th><th>狀態</th><th>操作</th>
            </tr></thead>
            <tbody>
              ${reservations.map(r => `
                <tr>
                  <td style="font-weight:500;">${r.venue||r.venue_id||'-'}</td>
                  <td>${r.user||'-'}</td>
                  <td style="font-size:11px;">${r.start||r.start_time||'-'}</td>
                  <td><span class="status-badge status-${r.status?.toLowerCase()}">${r.status||'-'}</span></td>
                  <td><button class="btn btn-ghost btn-sm" onclick="viewReservation(${r.id})"><i class="fas fa-eye"></i></button></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`)
}

function showReservationForm() {
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-calendar-plus" style="color:#003087;"></i> 新增場地預約</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="padding:16px;max-height:70vh;overflow-y:auto;">
      <div class="form-group">
        <label class="form-label">活動名稱 *</label>
        <input class="form-input" id="res-title" placeholder="例：資管系學會春季聯誼" required/>
      </div>
      <div class="form-group">
        <label class="form-label">申請場地（志願序）*</label>
        <select class="form-input" id="res-venue">
          <option value="1">焯炤館演講廳（容量300人）</option>
          <option value="2">仁愛空間（容量50人）</option>
          <option value="4">潛水艇的天空（容量30人）</option>
          <option value="5">圖書館研討室（容量20人）</option>
        </select>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group">
          <label class="form-label">開始時間 *</label>
          <input type="datetime-local" class="form-input" id="res-start" value="2026-04-15T09:00"/>
        </div>
        <div class="form-group">
          <label class="form-label">結束時間 *</label>
          <input type="datetime-local" class="form-input" id="res-end" value="2026-04-15T12:00"/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">預估人數 *</label>
        <input type="number" class="form-input" id="res-people" placeholder="例：50" min="1"/>
      </div>
      <div class="form-group">
        <label class="form-label">活動目的 *（AI 將進行風險預審）</label>
        <textarea class="form-input" id="res-purpose" rows="3" placeholder="請詳細描述活動目的與內容..."></textarea>
      </div>
      <div id="ai-screen-result" style="margin-bottom:12px;"></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-secondary" onclick="submitAIScreen()">
          <i class="fas fa-robot"></i> AI 預審
        </button>
        <button class="btn btn-primary" onclick="submitReservation()">
          <i class="fas fa-check"></i> ${t('submit')}
        </button>
        <button class="btn btn-ghost" onclick="closeModal()">${t('cancel')}</button>
      </div>
    </div>`)
}

function reserveVenue(venueId, venueName) {
  showReservationForm()
  setTimeout(() => {
    const sel = document.getElementById('res-venue')
    if (sel) { sel.value = venueId; toast(`已選擇場地：${venueName}`, 'info') }
  }, 100)
}

async function submitAIScreen() {
  const purpose = document.getElementById('res-purpose')?.value?.trim()
  const role = state.user?.role || 'student'
  if (!purpose) { toast('請先輸入活動目的', 'warning'); return }

  const resultDiv = document.getElementById('ai-screen-result')
  if (resultDiv) resultDiv.innerHTML = '<div style="color:#64748b;font-size:12px;">⏳ AI 預審中...</div>'

  await new Promise(r => setTimeout(r, 600))
  const result = await postData(`${API}/ai/screen`, { purpose, role })

  if (resultDiv) {
    const colors = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' }
    const icons = { Low: '✅', Medium: '⚠️', High: '❌' }
    const rl = result?.risk_level || 'Low'
    resultDiv.innerHTML = `
      <div style="background:${colors[rl]}15;border-left:3px solid ${colors[rl]};padding:10px 12px;border-radius:0 6px 6px 0;">
        <div style="font-size:13px;font-weight:700;color:${colors[rl]}">${icons[rl]} AI 預審結果：${t('risk_' + rl.toLowerCase())}</div>
        <div style="font-size:12px;color:#475569;margin-top:4px;">${result?.reasoning || '無說明'}</div>
        ${result?.law_reference ? `<div style="font-size:11px;color:#94a3b8;margin-top:4px;">${result.law_reference}</div>` : ''}
      </div>`
  }
  state.aiResult = result
}

async function submitReservation() {
  const venue_id = document.getElementById('res-venue')?.value
  const start_time = document.getElementById('res-start')?.value
  const purpose = document.getElementById('res-purpose')?.value?.trim()
  if (!venue_id || !purpose) { toast('請填寫必要欄位', 'error'); return }

  const result = await postData(`${API}/reservations`, { venue_id, start_time, purpose, role: state.user?.role })
  if (result?.status) {
    closeModal()
    const statusMap = { APPROVED: '預約成功！', PENDING_MANUAL_REVIEW: '已提交，待人工審核', REJECTED: '申請被拒絕' }
    const typeMap = { APPROVED: 'success', PENDING_MANUAL_REVIEW: 'warning', REJECTED: 'error' }
    toast(statusMap[result.status] || '已提交', typeMap[result.status] || 'info')
    renderReservation()
  }
}

function viewReservation(id) {
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-info-circle" style="color:#003087;"></i> 預約詳情 #${id}</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="padding:16px;">
      <div class="info-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="info-item"><span class="info-label">預約編號</span><span class="info-val">#${id}</span></div>
        <div class="info-item"><span class="info-label">狀態</span><span class="badge badge-green">APPROVED</span></div>
        <div class="info-item"><span class="info-label">場地</span><span class="info-val">焯炤館演講廳</span></div>
        <div class="info-item"><span class="info-label">申請人</span><span class="info-val">${state.user?.name}</span></div>
      </div>
      <div style="margin-top:12px;padding:10px;background:#f8fafc;border-radius:8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:4px;">📄 PDF 確認單</div>
        <div style="font-size:12px;color:#64748b;">已發送至您的 Outlook 信箱</div>
      </div>
    </div>`)
}

// ── EQUIPMENT ──
async function renderEquipment() {
  const equipment = await fetchData(`${API}/equipment`) || []
  document.getElementById('app').innerHTML = renderLayout(`
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <div style="font-size:13px;color:#64748b;">課指組倉庫器材列表</div>
        <button class="btn btn-ai" onclick="navigate('venueRag')">
          <i class="fas fa-robot"></i> 器材借用 AI 導引
        </button>
      </div>
      <div class="equipment-grid">
        ${equipment.map(eq => `
          <div class="equipment-card">
            <div class="equip-icon"><i class="fas ${getEquipIcon(eq.category)}"></i></div>
            <div class="equip-info">
              <div class="equip-name">${eq.name}</div>
              <div class="equip-meta">${eq.location}</div>
              <div class="equip-stock">
                <div class="stock-bar-bg">
                  <div class="stock-bar-fill" style="width:${(eq.qty_available/eq.qty_total*100)}%;background:${eq.qty_available/eq.qty_total>0.5?'#10b981':'#f59e0b'};"></div>
                </div>
                <span style="font-size:11px;color:#64748b;">${eq.qty_available}/${eq.qty_total} 可用</span>
              </div>
              ${eq.qty_available > 0
                ? `<button class="btn btn-primary btn-sm" onclick="showBorrowForm(${eq.id},'${eq.name}')"><i class="fas fa-hand-holding"></i> 申請借用</button>`
                : `<button class="btn btn-ghost btn-sm" disabled>已借完</button>`}
            </div>
          </div>`).join('')}
      </div>
    </div>`)
}

function getEquipIcon(cat) {
  const map = { '音響':'fa-volume-up', '視聽':'fa-projector', '傢俱':'fa-couch', '戶外':'fa-tent', '照明':'fa-lightbulb' }
  return map[cat] || 'fa-box'
}

function showBorrowForm(id, name) {
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-hand-holding" style="color:#003087;"></i> 申請借用：${name}</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="padding:16px;">
      <div class="form-group">
        <label class="form-label">借用數量</label>
        <input type="number" class="form-input" id="borrow-qty" value="1" min="1"/>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group">
          <label class="form-label">借用日期</label>
          <input type="date" class="form-input" id="borrow-start" value="2026-04-15"/>
        </div>
        <div class="form-group">
          <label class="form-label">歸還日期</label>
          <input type="date" class="form-input" id="borrow-end" value="2026-04-17"/>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">用途說明</label>
        <textarea class="form-input" id="borrow-purpose" rows="2" placeholder="例：社團活動音響設備需求"></textarea>
      </div>
      <div style="background:#fff3cd;border-left:3px solid #f59e0b;padding:8px 10px;border-radius:0 4px 4px 0;font-size:12px;margin-bottom:12px;">
        ⚠️ 借用期限最長 3 天。逾期未還每天扣 5 信用分。取件時需掃描 TOTP QR Code。
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-primary" onclick="submitBorrow(${id},'${name}')">
          <i class="fas fa-check"></i> 確認申請
        </button>
        <button class="btn btn-ghost" onclick="closeModal()">取消</button>
      </div>
    </div>`)
}

async function submitBorrow(id, name) {
  const qty = document.getElementById('borrow-qty')?.value
  const returnDate = document.getElementById('borrow-end')?.value
  const purpose = document.getElementById('borrow-purpose')?.value

  const result = await postData(`${API}/equipment/borrow`, { equipment_id: id, qty, return_date: returnDate, purpose })
  if (result?.status) {
    closeModal()
    toast(`${name} 借用申請成功！請至課指組取件。`, 'success')
    if (result.totp_qr) {
      setTimeout(() => showModal(`
        <div class="modal-header">
          <span class="modal-title">📱 取件 QR Code</span>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div style="padding:16px;text-align:center;">
          <div style="font-size:13px;margin-bottom:12px;">請於取件時出示此 QR Code</div>
          <div style="background:#f1f5f9;padding:20px;border-radius:8px;font-family:monospace;font-size:11px;word-break:break-all;">${result.totp_qr}</div>
          <div style="font-size:12px;color:#64748b;margin-top:12px;">歸還日期：${returnDate}</div>
        </div>`), 300)
    }
  }
}

// ── CLUBS ──
async function renderClubs() {
  const clubs = await fetchData(`${API}/clubs`) || []
  document.getElementById('app').innerHTML = renderLayout(`
    <div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
        ${['全部','系學會','學藝','體育','服務','學術'].map(c => `
          <button class="filter-btn ${c==='全部'?'active':''}" onclick="filterClubs('${c}',this)">${c}</button>`).join('')}
      </div>
      <div class="clubs-grid" id="clubs-list">
        ${clubs.map(club => renderClubCard(club)).join('')}
      </div>
    </div>`)
}

function renderClubCard(club) {
  const colorMap = { '系學會':'#003087', '學藝':'#7c3aed', '體育':'#059669', '服務':'#dc2626', '學術':'#d97706', '康樂':'#0891b2' }
  const color = colorMap[club.category] || '#374151'
  const creditColor = club.credit >= 90 ? '#10b981' : club.credit >= 70 ? '#f59e0b' : '#ef4444'
  return `
  <div class="club-card" onclick="viewClub(${club.id})">
    <div class="club-cat-badge" style="background:${color}20;color:${color};">${club.category}</div>
    <div class="club-name">${club.name}</div>
    <div class="club-meta"><i class="fas fa-users"></i> ${club.members} 人 &nbsp; <i class="fas fa-star" style="color:${creditColor};"></i> ${club.credit}</div>
    <div class="credit-bar-bg" style="margin-top:6px;">
      <div class="credit-bar-fill" style="width:${club.credit}%;background:${creditColor};height:4px;border-radius:2px;"></div>
    </div>
  </div>`
}

function filterClubs(cat, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
  el?.classList.add('active')
  fetchData(`${API}/clubs`).then(clubs => {
    const filtered = cat === '全部' ? clubs : clubs?.filter(c => c.category === cat)
    const list = document.getElementById('clubs-list')
    if (list) list.innerHTML = (filtered || []).map(c => renderClubCard(c)).join('')
  })
}

function viewClub(id) {
  fetchData(`${API}/clubs/${id}`).then(club => {
    if (!club) return
    showModal(`
      <div class="modal-header">
        <span class="modal-title"><i class="fas fa-users" style="color:#003087;"></i> ${club.name}</span>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div style="padding:16px;max-height:70vh;overflow-y:auto;">
        <div style="font-size:13px;color:#475569;margin-bottom:12px;">${club.description||''}</div>
        <div class="info-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
          <div class="info-item"><span class="info-label">指導教授</span><span class="info-val">${club.advisor||'-'}</span></div>
          <div class="info-item"><span class="info-label">聯絡信箱</span><span class="info-val" style="font-size:11px;">${club.contact||'-'}</span></div>
        </div>
        ${club.achievements?.length ? `
          <div style="font-size:13px;font-weight:600;margin-bottom:6px;">🏆 近期成就</div>
          <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:12px;">
            ${club.achievements.map(a => `<div style="font-size:12px;color:#475569;padding:4px 8px;background:#f8fafc;border-radius:4px;">• ${a}</div>`).join('')}
          </div>` : ''}
        ${club.activities?.length ? `
          <div style="font-size:13px;font-weight:600;margin-bottom:6px;">📅 最近活動</div>
          ${club.activities.map(a => `
            <div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 8px;background:#f8fafc;border-radius:4px;margin-bottom:4px;">
              <span>${a.name}</span>
              <span style="color:#64748b;">${a.date} | ${a.participants}人參與</span>
            </div>`).join('')}` : ''}
      </div>`)
  })
}

// ── ACTIVITIES ──
async function renderActivities() {
  const activities = await fetchData(`${API}/activities`) || []
  document.getElementById('app').innerHTML = renderLayout(`
    <div>
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
        <input class="form-input" id="act-search" placeholder="${t('searchPlaceholder')}" style="flex:1;min-width:200px;" oninput="filterActivities()"/>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${['全部','競賽','講座','展覽','服務','體育'].map(tag => `
            <button class="filter-btn ${tag==='全部'?'active':''}" onclick="filterActivities('${tag}',this)">${tag}</button>`).join('')}
        </div>
      </div>
      <div class="activities-wall" id="activities-list">
        ${activities.map(a => renderActivityCard(a)).join('')}
      </div>
    </div>`)
}

function renderActivityCard(a) {
  const statusColor = { upcoming: '#003087', ongoing: '#10b981', completed: '#94a3b8' }
  const statusLabel = { upcoming: '即將舉行', ongoing: '進行中', completed: '已結束' }
  return `
  <div class="activity-card" onclick="showActivityDetail(${a.id})">
    <div class="activity-tags">
      ${a.tags?.map(tag => `<span class="tag">#${tag}</span>`).join('')||''}
      <span class="badge" style="background:${statusColor[a.status]}20;color:${statusColor[a.status]};margin-left:auto;">${statusLabel[a.status]||a.status}</span>
    </div>
    <div class="activity-title">${a.title}</div>
    <div class="activity-meta">
      <span><i class="fas fa-users-cog"></i> ${a.club}</span>
      <span><i class="fas fa-calendar"></i> ${a.date}</span>
      <span><i class="fas fa-map-pin"></i> ${a.location}</span>
    </div>
    <div class="activity-footer">
      <span style="font-size:12px;color:#64748b;"><i class="fas fa-user-friends"></i> 預計 ${a.participants} 人</span>
      <button class="btn btn-sm btn-ghost">報名 <i class="fas fa-arrow-right"></i></button>
    </div>
  </div>`
}

function filterActivities(tag, el) {
  if (el) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
    el.classList.add('active')
  }
  const keyword = document.getElementById('act-search')?.value?.toLowerCase() || ''
  fetchData(`${API}/activities`).then(activities => {
    let filtered = activities || []
    if (keyword) filtered = filtered.filter(a => a.title.toLowerCase().includes(keyword) || a.club.toLowerCase().includes(keyword))
    if (tag && tag !== '全部') filtered = filtered.filter(a => a.tags?.includes(tag))
    const list = document.getElementById('activities-list')
    if (list) list.innerHTML = filtered.map(a => renderActivityCard(a)).join('')
  })
}

function showActivityDetail(id) {
  fetchData(`${API}/activities`).then(activities => {
    const a = activities?.find(x => x.id === id)
    if (!a) return
    showModal(`
      <div class="modal-header">
        <span class="modal-title"><i class="fas fa-star" style="color:#C8A951;"></i> ${a.title}</span>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div style="padding:16px;">
        <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;">
          ${a.tags?.map(t => `<span class="tag">#${t}</span>`).join('')||''}
        </div>
        <div class="info-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div class="info-item"><span class="info-label">主辦社團</span><span class="info-val">${a.club}</span></div>
          <div class="info-item"><span class="info-label">活動日期</span><span class="info-val">${a.date}</span></div>
          <div class="info-item"><span class="info-label">地點</span><span class="info-val">${a.location}</span></div>
          <div class="info-item"><span class="info-label">預計人數</span><span class="info-val">${a.participants} 人</span></div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;">
          <button class="btn btn-primary" onclick="closeModal();toast('報名成功！','success')">立即報名</button>
          <button class="btn btn-ghost" onclick="closeModal()">關閉</button>
        </div>
      </div>`)
  })
}

// ── CALENDAR ──
async function renderCalendar() {
  const cal = await fetchData(`${API}/calendar?month=2026-04`) || { events: [] }
  const events = cal.events || []

  const daysInMonth = 30
  const firstDay = new Date('2026-04-01').getDay()

  let calHTML = '<div class="cal-grid">'
  ;['日','一','二','三','四','五','六'].forEach(d => {
    calHTML += `<div class="cal-header-cell">${d}</div>`
  })
  for (let i = 0; i < firstDay; i++) calHTML += '<div class="cal-cell empty"></div>'
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `2026-04-${String(d).padStart(2,'0')}`
    const dayEvents = events.filter(e => e.date === date)
    calHTML += `
      <div class="cal-cell ${dayEvents.length?'has-event':''}">
        <div class="cal-date">${d}</div>
        ${dayEvents.map(e => `
          <div class="cal-event-dot" title="${e.title}" style="background:${getEventColor(e.type)};">${e.title.substring(0,4)}</div>`).join('')}
      </div>`
  }
  calHTML += '</div>'

  document.getElementById('app').innerHTML = renderLayout(`
    <div>
      <div class="section-card" style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div class="section-title">📅 2026 年 4 月</div>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-ghost btn-sm">◀</button>
            <button class="btn btn-ghost btn-sm">▶</button>
          </div>
        </div>
        ${calHTML}
      </div>
      <div class="section-card">
        <div class="section-title"><i class="fas fa-list"></i> 近期活動</div>
        ${events.map(e => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9;">
            <div style="width:8px;height:8px;border-radius:50%;background:${getEventColor(e.type)};flex-shrink:0;"></div>
            <div style="flex:1;">
              <div style="font-size:13px;font-weight:500;">${e.title}</div>
              <div style="font-size:11px;color:#64748b;">${e.club} | ${e.venue}</div>
            </div>
            <div style="font-size:12px;color:#94a3b8;">${e.date}</div>
          </div>`).join('')}
      </div>
    </div>`)
}

function getEventColor(type) {
  const map = { competition:'#003087', exhibition:'#7c3aed', service:'#059669', training:'#d97706', lecture:'#dc2626' }
  return map[type] || '#6b7280'
}

// ── PORTFOLIO ──
async function renderPortfolio() {
  const p = await fetchData(`${API}/portfolio/1`) || {}
  const credit = await fetchData(`${API}/credit/1`) || {}
  document.getElementById('app').innerHTML = renderLayout(`
    <div>
      <div class="portfolio-hero">
        <div class="portfolio-avatar">${(p.name||'U').charAt(0)}</div>
        <div class="portfolio-info">
          <div style="font-size:18px;font-weight:700;">${p.name||'使用者'}</div>
          <div style="font-size:13px;color:#64748b;">${p.student_id||'-'} | ${state.user?.email||'-'}</div>
          <div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;">
            ${(p.skills||[]).map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </div>
        <div style="text-align:right;">
          <div class="stat-val" style="color:${(p.credit_score||88)>=80?'#10b981':'#f59e0b'};">${p.credit_score||88}</div>
          <div style="font-size:11px;color:#94a3b8;">${t('credit')}</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
        <div class="section-card">
          <div class="section-title"><i class="fas fa-calendar"></i> 活動記錄</div>
          ${(p.activities||[]).map(a => `
            <div style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
              <div style="font-size:13px;font-weight:500;">${a.name}</div>
              <div style="font-size:11px;color:#64748b;">${a.role} | ${a.date}${a.achievement?' | 🏆'+a.achievement:''}</div>
            </div>`).join('')}
        </div>
        <div class="section-card">
          <div class="section-title"><i class="fas fa-certificate"></i> 證書</div>
          ${(p.certificates||[]).map(cert => `
            <div style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
              <div style="font-size:13px;font-weight:500;">${cert.name}</div>
              <div style="font-size:11px;color:#64748b;">${cert.issuer} | ${cert.date}</div>
            </div>`).join('')}
        </div>
      </div>

      <div class="section-card" style="margin-top:16px;">
        <div class="section-title"><i class="fas fa-history"></i> 信用點數記錄</div>
        ${(credit.history||[]).map(h => `
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;">
            <div>
              <div style="font-size:13px;">${h.action}</div>
              <div style="font-size:11px;color:#94a3b8;">${h.date}</div>
            </div>
            <div style="font-weight:700;color:${h.change>0?'#10b981':'#ef4444'};">${h.change>0?'+':''}${h.change}</div>
          </div>`).join('')}
      </div>
    </div>`)
}

// ── USERS (Admin) ──
async function renderUsers() {
  const users = await fetchData(`${API}/users`) || []
  document.getElementById('app').innerHTML = renderLayout(`
    <div>
      <div style="display:flex;justify-content:space-between;margin-bottom:16px;">
        <input class="form-input" placeholder="搜尋用戶..." style="max-width:280px;"/>
        <button class="btn btn-primary"><i class="fas fa-user-plus"></i> 新增用戶</button>
      </div>
      <div class="section-card">
        <table class="data-table">
          <thead><tr><th>姓名</th><th>學號</th><th>Email</th><th>角色</th><th>信用分</th><th>操作</th></tr></thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td style="font-weight:500;">${u.name}</td>
                <td style="font-size:12px;">${u.student_id}</td>
                <td style="font-size:11px;color:#64748b;">${u.email}</td>
                <td><span class="badge badge-blue">${getRoleLabel(u.role)}</span></td>
                <td style="font-weight:700;color:${(u.credit_score||88)>=80?'#10b981':'#f59e0b'};">${u.credit_score||88}</td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="toast('查看用戶 ${u.name}','info')"><i class="fas fa-eye"></i></button>
                  <button class="btn btn-ghost btn-sm" onclick="toast('編輯 ${u.name}','info')"><i class="fas fa-edit"></i></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`)
}

// ── AI TOOLS ──
function renderAITools() {
  document.getElementById('app').innerHTML = renderLayout(`
    <div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">
        ${[
          { icon:'fa-comments', color:'#003087', title:'AI 導覽查詢', desc:'即時解答校園場地、設施、預約流程等問題', page:'aiNav', badge:'24/7 線上' },
          { icon:'fa-balance-scale', color:'#7c3aed', title:'法規查詢 RAG', desc:'精準搜尋輔大各項規章辦法，附引用來源', page:'regsRag', badge:'知識庫整合' },
          { icon:'fa-route', color:'#C8A951', title:'預約流程 RAG', desc:'場地與器材預約智慧導引，三階段流程說明', page:'venueRag', badge:'步驟規劃' },
          { icon:'fa-file-alt', color:'#059669', title:'AI 企劃生成器', desc:'輸入活動概念，自動生成符合規範的企劃書', page:'aiTools', action:'generatePlanUI' },
          { icon:'fa-gavel', color:'#dc2626', title:'AI 申訴摘要', desc:'描述申訴事由，AI 協助整理申訴書草稿', page:'aiTools', action:'appealUI' },
          { icon:'fa-chart-heatmap', color:'#0891b2', title:'場地熱力圖', desc:'視覺化場地使用率，智慧推薦最佳預約時段', page:'aiTools', action:'heatmapUI' },
        ].map(tool => `
          <div class="ai-tool-card" onclick="${tool.action ? `show${tool.action.replace('UI','')}UI()` : `navigate('${tool.page}')`}">
            <div class="ai-tool-icon" style="background:${tool.color}15;border:2px solid ${tool.color}30;">
              <i class="fas ${tool.icon}" style="color:${tool.color};font-size:22px;"></i>
            </div>
            <div class="ai-tool-content">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
                <div style="font-size:14px;font-weight:700;">${tool.title}</div>
                <span class="badge" style="background:${tool.color}20;color:${tool.color};font-size:10px;">${tool.badge}</span>
              </div>
              <div style="font-size:12px;color:#64748b;line-height:1.5;">${tool.desc}</div>
            </div>
            <i class="fas fa-arrow-right" style="color:#94a3b8;align-self:center;"></i>
          </div>`).join('')}
      </div>
    </div>`)
}

function showgeneratePlanUI() {
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-file-alt" style="color:#059669;"></i> AI 企劃生成器</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="padding:16px;">
      <div class="form-group">
        <label class="form-label">活動名稱</label>
        <input class="form-input" id="plan-name" placeholder="例：2026 春季聯誼晚會"/>
      </div>
      <div class="form-group">
        <label class="form-label">社團名稱</label>
        <input class="form-input" id="plan-club" placeholder="例：資管系學會" value="${state.user?.name ? state.user.name + '的社團' : ''}"/>
      </div>
      <div class="form-group">
        <label class="form-label">預計參與人數</label>
        <input type="number" class="form-input" id="plan-pax" placeholder="100" value="50"/>
      </div>
      <div id="plan-result"></div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn btn-primary" onclick="generatePlan()"><i class="fas fa-magic"></i> 生成企劃書</button>
        <button class="btn btn-ghost" onclick="closeModal()">關閉</button>
      </div>
    </div>`)
}

function showappealUI() {
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-gavel" style="color:#dc2626;"></i> AI 申訴摘要</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="padding:16px;">
      <div class="form-group">
        <label class="form-label">申訴事由（請詳細描述）</label>
        <textarea class="form-input" id="appeal-reason" rows="4" placeholder="例：我的場地預約申請被誤判為高風險，但活動為一般社團聚餐..."></textarea>
      </div>
      <div id="appeal-result"></div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn btn-primary" onclick="generateAppeal()"><i class="fas fa-robot"></i> AI 生成申訴書</button>
        <button class="btn btn-ghost" onclick="closeModal()">關閉</button>
      </div>
    </div>`)
}

async function generateAppeal() {
  const reason = document.getElementById('appeal-reason')?.value?.trim()
  if (!reason) { toast('請輸入申訴事由', 'warning'); return }
  const resultDiv = document.getElementById('appeal-result')
  if (resultDiv) resultDiv.innerHTML = '<div style="color:#64748b;text-align:center;padding:10px;">⏳ AI 生成中...</div>'
  await new Promise(r => setTimeout(r, 1000))
  if (resultDiv) resultDiv.innerHTML = `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px;margin-top:12px;">
      <div style="font-size:12px;font-weight:700;color:#166534;margin-bottom:8px;">📄 AI 申訴書草稿</div>
      <div style="font-size:12px;line-height:1.7;color:#374151;">
        致 輔仁大學課外活動指導組：<br><br>
        本人（${state.user?.name}，${state.user?.email}）茲就申請編號 #${Math.floor(Math.random()*10000)} 提出申訴。<br><br>
        申訴事由：${reason}<br><br>
        本次申訴依據《學生申訴處理辦法》第三條，請求貴組重新審核相關申請。
        本人認為系統判定結果存在誤差，特提出申訴，敬請 鑒核。<br><br>
        此致 輔仁大學課外活動指導組<br>
        申請人：${state.user?.name || '申請人'}　日期：${new Date().toLocaleDateString('zh-TW')}
      </div>
      <button class="btn btn-primary btn-sm" style="margin-top:8px;" onclick="toast('申訴書已複製至剪貼簿','success')">
        <i class="fas fa-copy"></i> 複製申訴書
      </button>
    </div>`
}

function showheatmapUI() {
  toast('場地熱力圖功能開發中（需 Mapbox API）', 'info')
}

async function generatePlan() {
  const name = document.getElementById('plan-name')?.value?.trim()
  const club = document.getElementById('plan-club')?.value?.trim()
  const pax = document.getElementById('plan-pax')?.value
  if (!name) { toast('請輸入活動名稱', 'error'); return }
  const resultDiv = document.getElementById('plan-result')
  if (resultDiv) resultDiv.innerHTML = '<div style="color:#64748b;text-align:center;padding:10px;">⏳ AI 生成中...</div>'
  const result = await postData(`${API}/ai/generate-plan`, { event_name: name, club_name: club, expected_participants: parseInt(pax||50), event_type: '社團活動' })
  if (result?.data && resultDiv) {
    resultDiv.innerHTML = `
      <div style="background:#f8fafc;border-radius:8px;padding:14px;margin-top:10px;">
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

// ═══════════════════════════════════════════════════════
// NAVIGATION & MISC
// ═══════════════════════════════════════════════════════
async function navigate(page) {
  state.currentPage = page
  Object.values(state.charts).forEach(c => { try { c.destroy() } catch(e) {} })
  state.charts = {}

  const renders = {
    dashboard: renderDashboard,
    campusMap: renderCampusMap,
    reservation: renderReservation,
    equipment: renderEquipment,
    clubs: renderClubs,
    activities: renderActivities,
    calendar: renderCalendar,
    portfolio: renderPortfolio,
    users: renderUsers,
    aiNav: renderAINav,
    regsRag: renderRegsRag,
    venueRag: renderVenueRag,
    aiTools: renderAITools,
  }

  const fn = renders[page]
  if (fn) await fn()
  else renderDashboard()

  // Scroll to top
  const content = document.getElementById('page-content')
  if (content) content.scrollTop = 0
}

function setLang(lang) {
  state.lang = lang
  renderApp()
}

function changeLang() {
  const langs = ['zh-TW', 'en', 'ja', 'ko', 'fr']
  const idx = langs.indexOf(state.lang)
  setLang(langs[(idx + 1) % langs.length])
  toast(`語系已切換為：${state.lang}`, 'info')
}

function renderApp() {
  if (state.user) navigate(state.currentPage)
  else renderLogin()
}

function showNotifications() {
  showModal(`
    <div class="modal-header">
      <span class="modal-title"><i class="fas fa-bell" style="color:#003087;"></i> 系統通知</span>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div>
      ${[
        { icon: '📋', msg: '場地預約申請（焯炤館）已核准', time: '5分鐘前', type: 'success' },
        { icon: '⚠️', msg: 'AI 預審偵測到申請需人工審核', time: '1小時前', type: 'warning' },
        { icon: '📣', msg: '課指組：幹部知能研習報名截止提醒', time: '3小時前', type: 'info' },
        { icon: '🔴', msg: '器材借用（無線麥克風×2）明日到期', time: '昨天', type: 'error' },
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
      </div>
    </div>`)
}

function logout() {
  state.user = null
  state.currentPage = 'dashboard'
  state.aiNavHistory = []
  Object.values(state.charts).forEach(c => { try { c.destroy() } catch(e) {} })
  state.charts = {}
  toast('已登出系統', 'info')
  renderLogin()
}

// ── Expose Globals ──
const fns = [
  'navigate','demoLogin','selectRole','logout','closeModal','closeModalOnOverlay',
  'setLang','changeLang','showNotifications','toggleSidebar','toggleAISubmenu',
  'showReservationForm','reserveVenue','submitAIScreen','submitReservation','viewReservation',
  'showBorrowForm','submitBorrow','filterClubs','viewClub',
  'filterActivities','showActivityDetail',
  'sendAIMessage','handleChatKey','clearAIChat',
  'submitRegQuery','submitVenueQuery',
  'setMapFilter','showBuildingInfo',
  'generatePlan','generateAppeal',
  'showgeneratePlanUI','showappealUI','showheatmapUI',
  'toast'
]
fns.forEach(fn => { if (typeof eval(fn) !== 'undefined') window[fn] = eval(fn) })

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  renderLogin()
})
