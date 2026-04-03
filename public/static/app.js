// ═══════════════════════════════════════════════════════
//  FJU Smart Hub v4.0 - Complete Frontend Application
//  Features: Animated Landing, Bento Grid, Leaflet Map,
//  Glass-morphism Calendar, 3/6-min Negotiation Logic,
//  AI Tools, Credit System, Read-receipt Tracking
// ═══════════════════════════════════════════════════════

const API = '/api'

// ── i18n Translations ──
const LANGS = {
  'zh-TW': {
    appName: 'FJU Smart Hub', appSubtitle: '輔仁大學校園管理系統',
    login: '登入系統', googleLogin: '以 Google 帳號示範登入',
    domainNotice: '僅限 @cloud.fju.edu.tw 帳號使用', selectRole: '選擇示範角色',
    dashboard: '儀表板', reservation: '場地預約', equipment: '器材借用',
    clubs: '社團管理', activities: '活動牆', calendar: '行事曆管理',
    portfolio: 'E-Portfolio', users: '用戶管理', aiTools: 'AI 工具',
    campusMap: '校園地圖', aiNav: 'AI 導覽查詢', regsRag: '法規查詢 RAG',
    venueRag: '預約流程 RAG', settings: '系統設定', logout: '登出',
    makeReservation: '新增預約', negotiation: '衝突協商',
    phase1: '志願序申請', phase2: '衝突協商', phase3: '官方核定',
    risk_low: '低風險', risk_medium: '中風險', risk_high: '高風險',
    approved: '已核准', pending: '待審核', rejected: '已駁回', conflict: '衝突中',
    credit: '信用點數', members: '社員人數', events: '活動場次',
    searchPlaceholder: '搜尋建築、場地、社團、活動...',
    borrowEquipment: '申請借用', viewDetails: '查看詳情', submit: '送出', cancel: '取消',
    sendMsg: '發送', clearChat: '清除',
    aiPlaceholder: '請輸入問題，例如：焯炤館在哪裡？如何預約場地？',
    regPlaceholder: '請輸入法規相關問題，例如：場地需要提前幾天申請？',
    venuePlaceholder: '請描述您的預約需求',
    queryBtn: '查詢法規', venueQueryBtn: '查詢流程',
    accessibility: '無障礙設施', mapLegend: '地圖圖例',
    openCalendar: '開啟行事曆', negotiateTitle: '衝突協商室',
    aiIntervene: 'AI 介入協商', penaltyAlert: '已扣除 10 信用點數',
    negotiateComplete: '協商完成，更新行事曆',
    readReceipt: '已讀回條', backToMap: '返回地圖',
    maintenanceStatus: '維護狀態', available: '可預約', maintenance: '維護中',
  },
  'en': {
    appName: 'FJU Smart Hub', appSubtitle: 'Campus Management System',
    login: 'Login', googleLogin: 'Sign in with Google (Demo)',
    domainNotice: 'Only @cloud.fju.edu.tw accounts', selectRole: 'Select Demo Role',
    dashboard: 'Dashboard', reservation: 'Venue Reservation', equipment: 'Equipment',
    clubs: 'Clubs', activities: 'Activity Wall', calendar: 'Calendar Management',
    portfolio: 'E-Portfolio', users: 'User Management', aiTools: 'AI Tools',
    campusMap: 'Campus Map', aiNav: 'AI Navigation', regsRag: 'Regulations RAG',
    venueRag: 'Venue Booking RAG', settings: 'Settings', logout: 'Logout',
    makeReservation: 'New Reservation', negotiation: 'Conflict Negotiation',
    phase1: 'Apply', phase2: 'Conflict', phase3: 'Official',
    risk_low: 'Low Risk', risk_medium: 'Med Risk', risk_high: 'High Risk',
    approved: 'Approved', pending: 'Pending', rejected: 'Rejected', conflict: 'Conflict',
    credit: 'Credit Score', members: 'Members', events: 'Events',
    searchPlaceholder: 'Search buildings, venues, clubs, activities...',
    borrowEquipment: 'Borrow', viewDetails: 'Details', submit: 'Submit', cancel: 'Cancel',
    sendMsg: 'Send', clearChat: 'Clear',
    aiPlaceholder: 'Ask anything, e.g.: Where is the auditorium?',
    regPlaceholder: 'Ask about regulations, e.g.: How many days advance for booking?',
    venuePlaceholder: 'Describe your booking needs',
    queryBtn: 'Query Regulations', venueQueryBtn: 'Query Process',
    accessibility: 'Accessibility', mapLegend: 'Map Legend',
    openCalendar: 'Open Calendar', negotiateTitle: 'Conflict Negotiation Room',
    aiIntervene: 'AI Intervened', penaltyAlert: '10 credit points deducted',
    negotiateComplete: 'Complete, Update Calendar',
    readReceipt: 'Read Receipt', backToMap: 'Back to Map',
    maintenanceStatus: 'Maintenance Status', available: 'Available', maintenance: 'Maintenance',
  },
  'ja': {
    appName: 'FJU Smart Hub', appSubtitle: 'キャンパス管理システム',
    login: 'ログイン', googleLogin: 'Googleでログイン（デモ）',
    domainNotice: '@cloud.fju.edu.tw アカウントのみ', selectRole: 'デモロール選択',
    dashboard: 'ダッシュボード', reservation: '場所予約', equipment: '機材管理',
    clubs: 'クラブ管理', activities: 'イベント', calendar: 'カレンダー管理',
    portfolio: 'Eポートフォリオ', users: 'ユーザー管理', aiTools: 'AI ツール',
    campusMap: 'キャンパスマップ', aiNav: 'AI ナビ', regsRag: '規則照会',
    venueRag: '予約フロー', settings: '設定', logout: 'ログアウト',
    makeReservation: '新規予約', negotiation: '衝突調整',
    phase1: '申請', phase2: '調整', phase3: '承認',
    risk_low: '低リスク', risk_medium: '中リスク', risk_high: '高リスク',
    approved: '承認済', pending: '審査中', rejected: '却下', conflict: '衝突中',
    credit: 'クレジット', members: 'メンバー', events: 'イベント数',
    searchPlaceholder: '建物、会場、クラブ、イベントを検索...',
    borrowEquipment: '借用申請', viewDetails: '詳細', submit: '送信', cancel: 'キャンセル',
    sendMsg: '送信', clearChat: 'クリア',
    aiPlaceholder: '質問を入力してください',
    regPlaceholder: '規則に関する質問を入力してください',
    venuePlaceholder: '予約ニーズを説明してください',
    queryBtn: '規則照会', venueQueryBtn: 'フロー照会',
    accessibility: 'バリアフリー', mapLegend: '凡例',
    openCalendar: 'カレンダーを開く', negotiateTitle: '衝突調整室',
    aiIntervene: 'AI 介入', penaltyAlert: '10クレジット減点',
    negotiateComplete: '調整完了、更新',
    readReceipt: '既読確認', backToMap: 'マップへ戻る',
    maintenanceStatus: 'メンテナンス', available: '予約可', maintenance: 'メンテナンス中',
  },
  'ko': {
    appName: 'FJU Smart Hub', appSubtitle: '캠퍼스 관리 시스템',
    login: '로그인', googleLogin: 'Google로 로그인（데모）',
    domainNotice: '@cloud.fju.edu.tw 계정만', selectRole: '데모 역할 선택',
    dashboard: '대시보드', reservation: '장소 예약', equipment: '장비 관리',
    clubs: '클럽 관리', activities: '활동 게시판', calendar: '일정 관리',
    portfolio: 'E-포트폴리오', users: '사용자 관리', aiTools: 'AI 도구',
    campusMap: '캠퍼스 맵', aiNav: 'AI 내비게이션', regsRag: '규정 조회',
    venueRag: '예약 절차', settings: '설정', logout: '로그아웃',
    makeReservation: '새 예약', negotiation: '갈등 협상',
    phase1: '신청', phase2: '조율', phase3: '승인',
    risk_low: '저위험', risk_medium: '중위험', risk_high: '고위험',
    approved: '승인됨', pending: '검토 중', rejected: '거부됨', conflict: '충돌',
    credit: '신용 점수', members: '회원 수', events: '행사 수',
    searchPlaceholder: '건물, 장소, 클럽, 활동 검색...',
    borrowEquipment: '대여 신청', viewDetails: '자세히', submit: '제출', cancel: '취소',
    sendMsg: '전송', clearChat: '지우기',
    aiPlaceholder: '질문을 입력하세요',
    regPlaceholder: '규정 관련 질문을 입력하세요',
    venuePlaceholder: '예약 요구 사항을 설명하세요',
    queryBtn: '규정 조회', venueQueryBtn: '절차 조회',
    accessibility: '접근성', mapLegend: '범례',
    openCalendar: '캘린더 열기', negotiateTitle: '갈등 협상실',
    aiIntervene: 'AI 개입', penaltyAlert: '10 점 차감',
    negotiateComplete: '협상 완료, 업데이트',
    readReceipt: '읽음 확인', backToMap: '지도로 돌아가기',
    maintenanceStatus: '유지보수 상태', available: '예약 가능', maintenance: '유지보수 중',
  },
  'fr': {
    appName: 'FJU Smart Hub', appSubtitle: 'Système de Gestion du Campus',
    login: 'Se connecter', googleLogin: 'Se connecter avec Google (Démo)',
    domainNotice: 'Comptes @cloud.fju.edu.tw uniquement', selectRole: 'Choisir un rôle',
    dashboard: 'Tableau de bord', reservation: 'Réservation', equipment: 'Équipement',
    clubs: 'Clubs', activities: 'Activités', calendar: 'Gestion du calendrier',
    portfolio: 'E-Portfolio', users: 'Utilisateurs', aiTools: 'Outils IA',
    campusMap: 'Plan du campus', aiNav: 'Navigation IA', regsRag: 'Règlements RAG',
    venueRag: 'Réservation RAG', settings: 'Paramètres', logout: 'Déconnexion',
    makeReservation: 'Nouvelle réservation', negotiation: 'Négociation',
    phase1: 'Demande', phase2: 'Conflit', phase3: 'Officiel',
    risk_low: 'Risque faible', risk_medium: 'Risque moyen', risk_high: 'Risque élevé',
    approved: 'Approuvé', pending: 'En attente', rejected: 'Rejeté', conflict: 'Conflit',
    credit: 'Score de crédit', members: 'Membres', events: 'Événements',
    searchPlaceholder: 'Rechercher bâtiments, salles, clubs...',
    borrowEquipment: 'Emprunter', viewDetails: 'Détails', submit: 'Soumettre', cancel: 'Annuler',
    sendMsg: 'Envoyer', clearChat: 'Effacer',
    aiPlaceholder: 'Posez une question',
    regPlaceholder: 'Question sur les règlements',
    venuePlaceholder: 'Décrivez vos besoins',
    queryBtn: 'Interroger', venueQueryBtn: 'Consulter',
    accessibility: 'Accessibilité', mapLegend: 'Légende',
    openCalendar: 'Ouvrir le calendrier', negotiateTitle: 'Salle de négociation',
    aiIntervene: 'IA intervenue', penaltyAlert: '10 points déduits',
    negotiateComplete: 'Terminé, mettre à jour',
    readReceipt: 'Accusé de lecture', backToMap: 'Retour à la carte',
    maintenanceStatus: 'Maintenance', available: 'Disponible', maintenance: 'En maintenance',
  }
}

// ── State ──
const state = {
  lang: 'zh-TW',
  user: null,
  currentPage: 'map',
  charts: {},
  data: {
    venues: [], reservations: [], clubs: [], equipment: [],
    activities: [], dashboard: null, calendar: [], buildings: []
  },
  loading: false,
  modal: null,
  reservationStep: 1,
  aiResult: null,
  toasts: [],
  aiNavHistory: [],
  mapFilter: 'all',
  selectedBuilding: null,
  calendarOpen: false,
  calCurrentMonth: new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0'),
  calSelectedDay: null,
  negoState: { active: false, timer3: null, timer6: null, elapsed: 0, interval: null },
  notifPanelOpen: false,
  avatarMenuOpen: false,
  readReceipts: {},
  creditLogs: [],
  notifLogs: [],
  leafletMap: null,
  mapMarkers: []
}

const t = (key) => (LANGS[state.lang] || LANGS['zh-TW'])[key] || key
const langList = ['zh-TW', 'en', 'ja', 'ko', 'fr']
const langLabels = { 'zh-TW': '繁中', 'en': 'EN', 'ja': '日本語', 'ko': '한국어', 'fr': 'FR' }

// ── Toast ──
function toast(msg, type = 'success') {
  const container = document.getElementById('toast-container')
  if (!container) return
  const el = document.createElement('div')
  el.className = `toast ${type}`
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }
  el.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`
  container.appendChild(el)
  requestAnimationFrame(() => el.classList.add('show'))
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300) }, 3500)
}

function showModal(content) {
  document.getElementById('modal-body').innerHTML = content
  document.getElementById('modal-overlay').classList.add('active')
}
function closeModal() { document.getElementById('modal-overlay')?.classList.remove('active') }

// ── API Calls ──
async function fetchData(url) {
  try { const r = await axios.get(API + url); return r.data } catch(e) { console.error(e); return null }
}
async function postData(url, data) {
  try { const r = await axios.post(API + url, data); return r.data }
  catch(e) { return e.response?.data || { error: '請求失敗' } }
}

// ── Chart Helpers ──
function destroyChart(id) {
  if (state.charts[id]) { state.charts[id].destroy(); delete state.charts[id] }
}
function createChart(id, type, labels, data, extra = {}) {
  destroyChart(id)
  const canvas = document.getElementById(id)
  if (!canvas) return
  state.charts[id] = new Chart(canvas, {
    type, data: {
      labels,
      datasets: [{ data, backgroundColor: ['#003153','#DAA520','#008000','#FF0000','#004a7c','#f0c040','#006600','#ff4444'], borderColor: '#003153', borderWidth: 2, tension: 0.4, fill: false, ...extra }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { mode: 'index' } }, ...extra.options }
  })
}
function createRadarChart(id, labels, data) {
  destroyChart(id)
  const canvas = document.getElementById(id)
  if (!canvas) return
  state.charts[id] = new Chart(canvas, {
    type: 'radar',
    data: { labels, datasets: [{ data, backgroundColor: 'rgba(0,49,83,0.15)', borderColor: '#003153', borderWidth: 2, pointBackgroundColor: '#DAA520' }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { beginAtZero: true, max: 100, ticks: { display: false } } } }
  })
}

// ── Language ──
function changeLang() {
  const idx = langList.indexOf(state.lang)
  state.lang = langList[(idx + 1) % langList.length]
  document.getElementById('lang-btn').textContent = langLabels[state.lang]
  toast(`🌐 ${langLabels[state.lang]}`, 'info')
  if (state.user) refreshUILabels()
}

function refreshUILabels() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    el.textContent = t(key)
  })
}

// ════════════════════════════════════════════
// LANDING PAGE (Full Scroll-Driven with GSAP)
// ════════════════════════════════════════════
function renderLanding() {
  const page = document.getElementById('landing-page')
  if (!page) return

  page.style.overflow = 'auto'
  page.style.flexDirection = 'column'
  page.style.alignItems = 'stretch'
  page.style.justifyContent = 'flex-start'
  page.style.height = '100vh'

  page.innerHTML = `
    <!-- Section 0: Hero -->
    <section class="landing-hero">
      <div class="landing-bg-particles" id="particles-container"></div>
      <!-- Activity Announcement Carousel -->
      <div class="landing-carousel" id="landing-carousel">
        <div class="carousel-track" id="carousel-track">
          <div class="carousel-slide"><span class="carousel-badge">🔥 即將舉辦</span> 2026 資管盃程式競賽 - 4月20日 焯炤館</div>
          <div class="carousel-slide"><span class="carousel-badge">📢 報名開放</span> AI 時代創業論壇 - 4月25日 進修部演講廳</div>
          <div class="carousel-slide"><span class="carousel-badge">🎨 展覽開始</span> 春季攝影展 - 圖書館大廳 即日起至4月20日</div>
          <div class="carousel-slide"><span class="carousel-badge">⭐ 幹部招募</span> 攝影社、服務隊、創業研究社 歡迎加入</div>
          <div class="carousel-slide"><span class="carousel-badge">🏆 最新公告</span> 113學年度社團評鑑優良名單公佈</div>
        </div>
      </div>
      <!-- Hero Main Content -->
      <div class="hero-content">
        <div class="landing-logo-ring" id="landing-logo">
          <img src="https://www.fju.edu.tw/static/img/logo_fju_en.png" class="landing-logo-img"
            onerror="this.style.display='none'; this.parentNode.innerHTML='<span style=\\'font-size:2.5rem;\\'>🎓</span>'" />
        </div>
        <div class="landing-title" id="landing-title">FJU Smart Hub</div>
        <div class="landing-subtitle" id="landing-subtitle">輔仁大學校園智慧管理系統 v4.0</div>
        <div class="landing-gold-line" id="landing-gold-line"></div>
        <p class="hero-tagline" id="hero-tagline">整合 AI・場地預約・社團管理・信用積分，打造智慧校園生活</p>
        <div class="hero-cta-group">
          <button class="landing-enter-btn" onclick="showLogin()">🚀 立即體驗系統</button>
          <button class="hero-scroll-btn" onclick="scrollToFeatures()">了解更多 ↓</button>
        </div>
      </div>
      <!-- Shiba Inu Mascot -->
      <div class="hero-shiba">🐕</div>
      <!-- Scroll hint -->
      <div class="landing-scroll-hint" id="scroll-hint">向下滑動探索 ↓</div>
    </section>

    <!-- Section 1: Pain Points (3-column cards) -->
    <section class="landing-section pain-section" id="section-pain">
      <div class="section-inner">
        <div class="section-label">痛點解析</div>
        <h2 class="section-title">您是否也面臨這些困擾？</h2>
        <p class="section-subtitle">FJU Smart Hub 為輔仁大學課指組與學生設計，一次解決所有問題</p>
        <div class="pain-cards">
          <div class="pain-card" data-pain="1">
            <div class="pain-icon">😤</div>
            <h3>場地預約衝突不斷</h3>
            <p>多個社團搶同一場地，協商曠日廢時，行政效率低落</p>
            <div class="pain-arrow">→</div>
            <div class="pain-solution">AI 三階段預約・自動協商・6分鐘強制處理</div>
          </div>
          <div class="pain-card" data-pain="2">
            <div class="pain-icon">📝</div>
            <h3>活動申請流程繁瑣</h3>
            <p>手動填寫紙本表單、等待審核、法規不熟悉導致退件</p>
            <div class="pain-arrow">→</div>
            <div class="pain-solution">AI 智慧預審・RAG 法規查詢・PDF 自動產出</div>
          </div>
          <div class="pain-card" data-pain="3">
            <div class="pain-icon">📊</div>
            <h3>學生活動紀錄難以管理</h3>
            <p>參加活動無法留存紀錄，幹部訓練成效難以量化</p>
            <div class="pain-arrow">→</div>
            <div class="pain-solution">E-Portfolio 職能雷達・數位時光膠囊・幹部證書</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: 10 Feature Pillars (Bento Grid) -->
    <section class="landing-section features-section" id="section-features">
      <div class="section-inner">
        <div class="section-label">核心功能</div>
        <h2 class="section-title">十大智慧功能支柱</h2>
        <p class="section-subtitle">全方位整合，覆蓋校園管理的每個環節</p>
        <div class="features-bento">
          <div class="bento-card large" data-feature="1">
            <div class="bento-icon">🗺️</div>
            <div class="bento-content">
              <h3>互動式校園地圖</h3>
              <p>Leaflet.js 全螢幕地圖 + SVG Overlay，即時維修狀態，點擊建築 flyTo 動畫，無障礙設施標記</p>
            </div>
          </div>
          <div class="bento-card" data-feature="2">
            <div class="bento-icon">🤖</div>
            <div class="bento-content">
              <h3>AI 智慧預審</h3>
              <p>Dify RAG 比對法規，Medium/High 風險標記</p>
            </div>
          </div>
          <div class="bento-card" data-feature="3">
            <div class="bento-icon">🤝</div>
            <div class="bento-content">
              <h3>3/6 分鐘協商機制</h3>
              <p>GPT-4 介入 · 紅光扣分動畫</p>
            </div>
          </div>
          <div class="bento-card" data-feature="4">
            <div class="bento-icon">📋</div>
            <div class="bento-content">
              <h3>E-Portfolio 履歷</h3>
              <p>職能標籤 · PDF 匯出 · 雷達圖</p>
            </div>
          </div>
          <div class="bento-card" data-feature="5">
            <div class="bento-icon">📅</div>
            <div class="bento-content">
              <h3>玻璃行事曆</h3>
              <p>GSAP 右滑 · 場地衝突高亮</p>
            </div>
          </div>
          <div class="bento-card" data-feature="6">
            <div class="bento-icon">⭐</div>
            <div class="bento-content">
              <h3>信用積分系統</h3>
              <p>低於60分強制登出 · 完整日誌</p>
            </div>
          </div>
          <div class="bento-card" data-feature="7">
            <div class="bento-icon">📢</div>
            <div class="bento-content">
              <h3>動態活動牆</h3>
              <p>標籤搜尋 · 即時更新</p>
            </div>
          </div>
          <div class="bento-card" data-feature="8">
            <div class="bento-icon">🔔</div>
            <div class="bento-content">
              <h3>已讀回條追蹤</h3>
              <p>10秒強制彈窗 · IP+時間戳記錄</p>
            </div>
          </div>
          <div class="bento-card" data-feature="9">
            <div class="bento-icon">🌐</div>
            <div class="bento-content">
              <h3>五國語言 i18n</h3>
              <p>繁中 · 簡中 · EN · 日 · 韓</p>
            </div>
          </div>
          <div class="bento-card" data-feature="10">
            <div class="bento-icon">🔒</div>
            <div class="bento-content">
              <h3>全方位 2FA 安全</h3>
              <p>TOTP · SMS · JWT HttpOnly Cookie</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Role Testimonials (Circle Avatar Carousel) -->
    <section class="landing-section testimonials-section" id="section-testimonials">
      <div class="section-inner">
        <div class="section-label">使用者回饋</div>
        <h2 class="section-title">各角色用戶的真實體驗</h2>
        <div class="testimonials-carousel" id="testimonials-carousel">
          <div class="testimonial-card active">
            <div class="testimonial-avatar">👨‍🎓</div>
            <div class="testimonial-name">王小明・學生</div>
            <div class="testimonial-text">「以前申請場地要跑好幾個辦公室，現在線上三步驟搞定，AI 還會幫我檢查法規，再也不怕申請被退件了！」</div>
            <div class="testimonial-stars">★★★★★</div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-avatar">🎭</div>
            <div class="testimonial-name">李美華・社團幹部</div>
            <div class="testimonial-text">「衝突協商功能超強！以前跟其他社團搶場地要靠人脈，現在 AI 自動幫我們找到最佳解，還加了 2 分信用！」</div>
            <div class="testimonial-stars">★★★★★</div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-avatar">👨‍🏫</div>
            <div class="testimonial-name">陳志偉・指導教授</div>
            <div class="testimonial-text">「學生職能成長雷達圖讓我一目了然，期末評鑑不再耗費大量時間整理報告，效率提升了 60%。」</div>
            <div class="testimonial-stars">★★★★☆</div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-avatar">⚙️</div>
            <div class="testimonial-name">林行政・行政人員</div>
            <div class="testimonial-text">「AI 智慧預審幫我過濾了 80% 的問題申請，讓我專注在真正需要人工判斷的案件，工作效率大幅提升。」</div>
            <div class="testimonial-stars">★★★★★</div>
          </div>
        </div>
        <div class="testimonial-dots" id="testimonial-dots">
          <span class="t-dot active" onclick="goToTestimonial(0)"></span>
          <span class="t-dot" onclick="goToTestimonial(1)"></span>
          <span class="t-dot" onclick="goToTestimonial(2)"></span>
          <span class="t-dot" onclick="goToTestimonial(3)"></span>
        </div>
      </div>
    </section>

    <!-- Section 4: Live News Ticker -->
    <section class="landing-news-ticker">
      <div class="ticker-label">📡 即時快訊</div>
      <div class="ticker-track" id="ticker-track">
        <span class="ticker-item">🏆 113學年下學期社團評鑑優良名單已公佈</span>
        <span class="ticker-item">⚠️ 焯炤館演講廳 4/8-4/14 空調維修暫停使用</span>
        <span class="ticker-item">📝 AI 時代創業論壇 4/25 報名倒數 3 天</span>
        <span class="ticker-item">🎓 幹部知能研習 5/3 開放報名，信用點數 +5</span>
        <span class="ticker-item">📦 器材借用系統升級，新增 GPS 定位追蹤功能</span>
        <span class="ticker-item">🔐 系統安全更新：已攔截 127 次異常登入嘗試</span>
      </div>
    </section>

    <!-- Enter Button (fixed bottom) -->
    <div class="landing-enter-fixed" id="enter-fixed">
      <button class="landing-enter-btn pulse" onclick="showLogin()">🚀 進入 FJU Smart Hub</button>
    </div>
  `

  // Create floating particles
  const container = document.getElementById('particles-container')
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div')
    p.className = 'particle'
    const size = Math.random() * 30 + 10
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;opacity:${Math.random()*0.3+0.1};`
    container.appendChild(p)
  }

  // GSAP Hero Animations
  if (window.gsap) {
    gsap.registerPlugin(window.ScrollTrigger, window.TextPlugin)

    gsap.from('#landing-logo', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.7)', delay: 0.3 })
    gsap.from('#landing-title', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 })
    gsap.from('#landing-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 })
    gsap.from('#landing-gold-line', { scaleX: 0, duration: 0.6, ease: 'power2.out', delay: 1.0 })
    gsap.from('#hero-tagline', { y: 20, opacity: 0, duration: 0.8, delay: 1.1 })
    gsap.from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.8, delay: 1.3 })
    gsap.from('.hero-shiba', { x: 100, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 1.5 })
    gsap.from('#scroll-hint', { y: -10, opacity: 0, duration: 0.8, delay: 2, repeat: -1, yoyo: true })

    // ScrollTrigger animations for sections
    gsap.utils.toArray('.pain-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, scroller: page, start: 'top 85%' },
        x: i % 2 === 0 ? -60 : 60, opacity: 0, duration: 0.8, delay: i * 0.15
      })
    })

    gsap.utils.toArray('.bento-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, scroller: page, start: 'top 90%' },
        scale: 0.8, opacity: 0, duration: 0.6, delay: i * 0.08
      })
    })

    gsap.from('.section-title', {
      scrollTrigger: { trigger: '.features-section', scroller: page, start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.8
    })
  }

  // Carousel auto-play
  let carouselIdx = 0
  const carouselTrack = document.getElementById('carousel-track')
  if (carouselTrack) {
    setInterval(() => {
      carouselIdx = (carouselIdx + 1) % 5
      carouselTrack.style.transform = `translateX(-${carouselIdx * 100}%)`
    }, 3500)
  }

  // Testimonials auto-play
  let testimonialIdx = 0
  setInterval(() => {
    testimonialIdx = (testimonialIdx + 1) % 4
    goToTestimonial(testimonialIdx)
  }, 4000)
}

window.goToTestimonial = function(idx) {
  document.querySelectorAll('.testimonial-card').forEach((c, i) => c.classList.toggle('active', i === idx))
  document.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === idx))
}

window.scrollToFeatures = function() {
  const page = document.getElementById('landing-page')
  const section = document.getElementById('section-features')
  if (page && section) page.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
}

function _oldRenderLanding_UNUSED() {
  // kept for reference only
  const page = document.getElementById('landing-page')
  if (!page) return
  page.innerHTML = `
    <div class="landing-bg-particles" id="particles-container"></div>
    <div class="landing-features">
      <div class="landing-feature-card">
        <div class="landing-feature-icon">🔔</div>
        <div class="landing-feature-title">已讀回條</div>
        <div class="landing-feature-desc">10秒強制彈窗・IP紀錄</div>
      </div>
    </div>
    <button class="landing-enter-btn" onclick="showLogin()">
      🚀 進入系統
    </button>
    <div class="landing-scroll-hint">↓ 點擊進入</div>
  `
  // Create floating particles
  const container = document.getElementById('particles-container')
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div')
    p.className = 'particle'
    const size = Math.random() * 30 + 10
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;opacity:${Math.random()*0.4+0.1};`
    container.appendChild(p)
  }
}

function showLogin() {
  document.getElementById('landing-page').style.opacity = '0'
  setTimeout(() => {
    document.getElementById('landing-page').style.display = 'none'
    const loginPage = document.getElementById('login-page')
    loginPage.classList.add('active')
    renderLogin()
  }, 400)
}

// ════════════════════════════════════════════
// LOGIN PAGE
// ════════════════════════════════════════════
let selectedRole = 'student'
function renderLogin() {
  const roles = [
    { id: 'student', icon: '👨‍🎓', label: '學生' },
    { id: 'club_officer', icon: '🎭', label: '社團幹部' },
    { id: 'professor', icon: '👨‍🏫', label: '指導教授' },
    { id: 'admin', icon: '⚙️', label: '行政人員' },
    { id: 'it_admin', icon: '💻', label: 'IT 管理員' },
  ]
  const body = document.getElementById('login-body')
  if (!body) return
  body.innerHTML = `
    <div class="login-logo-wrap">
      <img src="https://www.fju.edu.tw/static/img/logo_fju_en.png" class="login-logo"
        onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=\\'width:80px;height:80px;background:#003153;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;font-size:2rem;\\'>🎓</div>'" />
      <div class="login-app-name">FJU Smart Hub</div>
      <div class="login-app-sub">輔仁大學校園智慧管理系統</div>
    </div>
    <hr class="login-divider">
    <div class="login-section-title">選擇示範角色</div>
    <div class="role-grid">
      ${roles.map(r => `<div class="role-card ${r.id === selectedRole ? 'selected' : ''}" onclick="selectRole('${r.id}')">
        <div class="role-card-icon">${r.icon}</div>
        <div class="role-card-label">${r.label}</div>
      </div>`).join('')}
    </div>
    <button class="login-google-btn" onclick="demoLogin()">
      <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.703-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
      以 Google 帳號示範登入
    </button>
    <div class="login-domain-notice">🔒 僅限 @cloud.fju.edu.tw 帳號使用 | 2FA 雙重驗證</div>
    <div class="login-back-btn" onclick="backToLanding()">← 返回介紹頁面</div>
  `
}

function selectRole(role) {
  selectedRole = role
  document.querySelectorAll('.role-card').forEach(el => el.classList.remove('selected'))
  document.querySelectorAll('.role-card').forEach(el => {
    if (el.onclick.toString().includes(`'${role}'`)) el.classList.add('selected')
  })
}

function backToLanding() {
  document.getElementById('login-page').classList.remove('active')
  const landing = document.getElementById('landing-page')
  landing.style.display = 'flex'
  landing.style.opacity = '0'
  setTimeout(() => { landing.style.opacity = '1' }, 10)
}

const roleData = {
  student: { name: '王小明', id: '112071001', email: 'a112071001@cloud.fju.edu.tw', credit: 88 },
  club_officer: { name: '李美華', id: '112071002', email: 'a112071002@cloud.fju.edu.tw', credit: 92 },
  professor: { name: '陳志偉教授', id: 'P001', email: 'chenwei@fju.edu.tw', credit: 100 },
  admin: { name: '林行政', id: 'A001', email: 'lin.admin@fju.edu.tw', credit: 100 },
  it_admin: { name: '吳系統', id: 'IT001', email: 'wu.it@fju.edu.tw', credit: 100 },
}

function demoLogin() {
  const info = roleData[selectedRole]
  state.user = { ...info, role: selectedRole }
  document.getElementById('login-page').classList.remove('active')
  initApp()
}

// ════════════════════════════════════════════
// MAIN APP INIT
// ════════════════════════════════════════════
function initApp() {
  const appRoot = document.getElementById('app-root')
  appRoot.innerHTML = buildAppHTML()
  appRoot.classList.add('active')

  // Bind events
  document.getElementById('notif-btn').addEventListener('click', toggleNotifPanel)
  document.getElementById('avatar-btn').addEventListener('click', toggleAvatarMenu)
  document.getElementById('search-input').addEventListener('input', handleSearch)
  document.getElementById('search-input').addEventListener('focus', handleSearch)
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) closeModal()
  })

  // Update header user info
  document.getElementById('avatar-btn').textContent = state.user.name.charAt(0)
  updateAvatarMenu()

  // Init map
  setTimeout(() => {
    initLeafletMap()
    renderSidebar()
    renderCalendarPanel()
    renderNotifPanel()
    showMandatoryNotif()
  }, 300)

  // Navigate to default page (map)
  navigateTo('map')
  toast(`🎓 歡迎，${state.user.name}！`, 'success')
}

function buildAppHTML() {
  return `
    <!-- Header -->
    <header class="app-header">
      <div class="header-logo-area">
        <img src="https://www.fju.edu.tw/static/img/logo_fju_en.png" class="header-logo-img"
          onerror="this.src=''; this.style.display='none';" />
        <div>
          <div class="header-logo-text">FJU Smart Hub</div>
          <div class="header-logo-sub">輔仁大學校園管理系統</div>
        </div>
      </div>

      <!-- Floating Search Bar (Google Maps style) -->
      <div class="header-search-wrap">
        <i class="fas fa-search header-search-icon"></i>
        <input type="text" id="search-input" class="header-search-bar"
          placeholder="${t('searchPlaceholder')}" autocomplete="off" />
        <div class="search-dropdown" id="search-dropdown"></div>
      </div>

      <div class="header-right">
        <button class="header-lang-btn" id="lang-btn" onclick="changeLang()">
          ${langLabels[state.lang]}
        </button>
        <button class="notif-btn" id="notif-btn" title="通知">
          <i class="fas fa-bell"></i>
          <span class="notif-dot"></span>
        </button>
        <div class="avatar-btn" id="avatar-btn" title="${state.user?.name}">
          ${state.user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>

    <!-- Avatar Menu -->
    <div id="avatar-menu">
      <div class="avatar-menu-header">
        <div class="avatar-menu-name">${state.user?.name}</div>
        <div class="avatar-menu-email">${state.user?.email}</div>
      </div>
      <div class="avatar-menu-item" onclick="navigateTo('portfolio'); toggleAvatarMenu()">
        <i class="fas fa-user"></i> E-Portfolio
      </div>
      <div class="avatar-menu-item" onclick="navigateTo('settings'); toggleAvatarMenu()">
        <i class="fas fa-cog"></i> 系統設定
      </div>
      <div class="avatar-menu-item danger" onclick="logout()">
        <i class="fas fa-sign-out-alt"></i> 登出
      </div>
    </div>

    <!-- Notification Panel -->
    <div id="notif-panel"></div>

    <!-- Main Body -->
    <div class="app-body">
      <!-- Left Sidebar (30%) -->
      <aside class="app-sidebar" id="app-sidebar"></aside>

      <!-- Right Main Area (70%) -->
      <main class="app-main" id="app-main">
        <!-- Map Container (Base Layer) -->
        <div id="map-container">
          <div id="leaflet-map"></div>
          <!-- Map filter chips -->
          <div class="map-search-overlay">
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <button class="map-filter-chip active" id="filter-all" onclick="setMapFilter('all')">🏛️ 全部</button>
              <button class="map-filter-chip" id="filter-accessible" onclick="setMapFilter('accessible')">♿ 無障礙</button>
              <button class="map-filter-chip" id="filter-reservable" onclick="setMapFilter('reservable')">📅 可預約</button>
              <button class="map-filter-chip" id="filter-maintenance" onclick="setMapFilter('maintenance')">🔧 維護中</button>
            </div>
          </div>
          <!-- Accessibility Legend -->
          <div class="map-accessibility-panel">
            <div class="access-legend-title">♿ 無障礙設施圖例</div>
            <div class="access-legend-item"><div class="access-dot ramp"></div><span>坡道入口</span></div>
            <div class="access-legend-item"><div class="access-dot elevator"></div><span>無障礙電梯</span></div>
            <div class="access-legend-item"><div class="access-dot restroom"></div><span>無障礙廁所</span></div>
            <div class="access-legend-item"><div class="access-dot parking"></div><span>無障礙停車位</span></div>
          </div>
          <!-- Open Calendar Button -->
          <button class="cal-open-btn" id="cal-open-btn" onclick="toggleCalendarPanel()">
            <i class="fas fa-calendar-alt"></i>
            <span id="cal-btn-label">${t('openCalendar')}</span>
          </button>
        </div>

        <!-- Glass-morphism Calendar Panel (Floating Layer) -->
        <div id="calendar-panel"></div>

        <!-- Calendar Management Page -->
        <div id="cal-management-page"></div>

        <!-- Content Pages -->
        <div class="content-page" id="page-dashboard"></div>
        <div class="content-page" id="page-reservation"></div>
        <div class="content-page" id="page-equipment"></div>
        <div class="content-page" id="page-clubs"></div>
        <div class="content-page" id="page-activities"></div>
        <div class="content-page" id="page-portfolio"></div>
        <div class="content-page" id="page-users"></div>
        <div class="content-page" id="page-aitools"></div>
        <div class="content-page" id="page-settings"></div>
      </main>
    </div>

    <!-- Negotiation Dialog -->
    <div id="nego-dialog"></div>

    <!-- Penalty Overlay (Red Light Animation) -->
    <div class="penalty-overlay" id="penalty-overlay"></div>

    <!-- Mandatory Notification Overlay -->
    <div id="mandatory-notif-overlay"></div>

    <!-- Modal Overlay -->
    <div id="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title" id="modal-title">詳細資訊</div>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body" id="modal-body"></div>
      </div>
    </div>

    <!-- Toast Container -->
    <div id="toast-container"></div>
  `
}

function updateAvatarMenu() {
  const menu = document.getElementById('avatar-menu')
  if (!menu || !state.user) return
  const header = menu.querySelector('.avatar-menu-header')
  if (header) {
    header.innerHTML = `<div class="avatar-menu-name">${state.user.name}</div><div class="avatar-menu-email">${state.user.email}</div>`
  }
}

function toggleAvatarMenu() {
  state.avatarMenuOpen = !state.avatarMenuOpen
  document.getElementById('avatar-menu')?.classList.toggle('open', state.avatarMenuOpen)
  if (state.notifPanelOpen) { state.notifPanelOpen = false; document.getElementById('notif-panel')?.classList.remove('open') }
}

function toggleNotifPanel() {
  state.notifPanelOpen = !state.notifPanelOpen
  document.getElementById('notif-panel')?.classList.toggle('open', state.notifPanelOpen)
  if (state.avatarMenuOpen) { state.avatarMenuOpen = false; document.getElementById('avatar-menu')?.classList.remove('open') }
}

// ════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════
const navPages = ['dashboard','reservation','equipment','clubs','activities','portfolio','users','aitools','settings']

function navigateTo(page) {
  state.currentPage = page

  // Show/hide map container
  const mapContainer = document.getElementById('map-container')
  const calPanel = document.getElementById('calendar-panel')
  const calMgmt = document.getElementById('cal-management-page')

  // Hide all content pages
  navPages.forEach(p => {
    const el = document.getElementById(`page-${p}`)
    if (el) el.classList.remove('active')
  })
  if (calMgmt) calMgmt.classList.remove('active')

  if (page === 'map' || page === 'calendar') {
    if (mapContainer) mapContainer.style.display = 'block'
    if (calPanel && page === 'calendar') {
      calPanel.classList.add('open')
      state.calendarOpen = true
    }
  } else if (page === 'cal-management') {
    if (mapContainer) mapContainer.style.display = 'block'
    if (calMgmt) {
      renderCalManagementPage()
      calMgmt.classList.add('active')
    }
  } else {
    if (mapContainer) mapContainer.style.display = 'block' // keep map as base
    const el = document.getElementById(`page-${page}`)
    if (el) {
      el.classList.add('active')
      renderPage(page, el)
    }
  }

  // Update sidebar active states
  document.querySelectorAll('.shortcut-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page)
  })
}

async function renderPage(page, container) {
  const loaders = { dashboard: renderDashboard, reservation: renderReservation, equipment: renderEquipment, clubs: renderClubs, activities: renderActivities, portfolio: renderPortfolio, users: renderUsers, aitools: renderAITools, settings: renderSettings }
  if (loaders[page]) await loaders[page](container)
}

// ════════════════════════════════════════════
// SEARCH
// ════════════════════════════════════════════
const searchIndex = [
  { text: '焯炤館演講廳', sub: '容量300人・可預約', icon: '🏛️', action: () => flyToBuilding(1) },
  { text: '仁愛空間', sub: '容量50人・會議室', icon: '🏢', action: () => flyToBuilding(2) },
  { text: '進修部演講廳', sub: '容量200人・有電梯', icon: '🏛️', action: () => flyToBuilding(3) },
  { text: '圖書館研討室', sub: '容量20人・有電梯廁所', icon: '📚', action: () => flyToBuilding(5) },
  { text: '體育館', sub: '容量500人', icon: '🏀', action: () => flyToBuilding(6) },
  { text: '學生活動中心', sub: '社辦及多功能室', icon: '🎭', action: () => flyToBuilding(7) },
  { text: '場地預約', sub: '三階段預約流程', icon: '📅', action: () => navigateTo('reservation') },
  { text: '器材借用', sub: '麥克風、投影機等', icon: '📦', action: () => navigateTo('equipment') },
  { text: '社團管理', sub: '87個社團', icon: '🎪', action: () => navigateTo('clubs') },
  { text: 'AI 導覽查詢', sub: '智能問答', icon: '🤖', action: () => navigateTo('aitools') },
  { text: '信用積分', sub: '查看個人信用紀錄', icon: '⭐', action: () => navigateTo('dashboard') },
]

function handleSearch(e) {
  const val = e.target.value.toLowerCase().trim()
  const dd = document.getElementById('search-dropdown')
  if (!dd) return
  if (!val) { dd.classList.remove('active'); dd.innerHTML = ''; return }
  const results = searchIndex.filter(item => item.text.toLowerCase().includes(val) || item.sub.toLowerCase().includes(val))
  if (!results.length) { dd.classList.remove('active'); return }
  dd.innerHTML = results.slice(0, 8).map((item, i) => `
    <div class="search-result-item" onclick="searchResultClick(${i}, '${val}')">
      <div class="search-result-icon">${item.icon}</div>
      <div>
        <div class="search-result-text">${highlightText(item.text, val)}</div>
        <div class="search-result-sub">${item.sub}</div>
      </div>
    </div>
  `).join('')
  dd.classList.add('active')
  // Store results for click handler
  window._searchResults = results
}

function highlightText(text, query) {
  const re = new RegExp(`(${query})`, 'gi')
  return text.replace(re, '<span class="search-highlight">$1</span>')
}

function searchResultClick(idx, query) {
  const item = window._searchResults[idx]
  if (item) {
    item.action()
    document.getElementById('search-input').value = item.text
    document.getElementById('search-dropdown').classList.remove('active')
    navigateTo('map')
  }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-search-wrap')) {
    document.getElementById('search-dropdown')?.classList.remove('active')
  }
  if (!e.target.closest('#notif-btn') && !e.target.closest('#notif-panel')) {
    if (state.notifPanelOpen) { state.notifPanelOpen = false; document.getElementById('notif-panel')?.classList.remove('open') }
  }
  if (!e.target.closest('#avatar-btn') && !e.target.closest('#avatar-menu')) {
    if (state.avatarMenuOpen) { state.avatarMenuOpen = false; document.getElementById('avatar-menu')?.classList.remove('open') }
  }
})

// ════════════════════════════════════════════
// SIDEBAR
// ════════════════════════════════════════════
const collegeNews = [
  { college: '資訊學院', title: 'AI 研討會報名開始', time: '2小時前', urgent: false },
  { college: '商學院', title: '企業參訪活動通知', time: '昨天', urgent: false },
  { college: '醫學院', title: '健康檢查時程公告', time: '2天前', urgent: true },
  { college: '法律學院', title: '模擬法庭徵選', time: '3天前', urgent: false },
  { college: '外語學院', title: '語言交換計畫招募', time: '本週', urgent: false },
]

const negoItems = [
  { id: 'N001', venue: '焯炤館演講廳', time: '2026-04-10 09:00-12:00', opponent: '資工系學會', elapsed: 180, status: 'urgent' },
  { id: 'N002', venue: '仁愛空間', time: '2026-04-12 14:00-17:00', opponent: '攝影社', elapsed: 95, status: 'warning' },
]

const shortcuts = [
  { icon: '🗺️', label: '校園地圖', page: 'map' },
  { icon: '📅', label: '行事曆', page: 'calendar' },
  { icon: '📝', label: '場地預約', page: 'reservation' },
  { icon: '📦', label: '器材借用', page: 'equipment' },
  { icon: '🎭', label: '社團管理', page: 'clubs' },
  { icon: '📢', label: '活動牆', page: 'activities' },
  { icon: '🤖', label: 'AI 工具', page: 'aitools' },
  { icon: '📊', label: '儀表板', page: 'dashboard' },
  { icon: '🎓', label: 'E-Portfolio', page: 'portfolio' },
]

function renderSidebar() {
  const sidebar = document.getElementById('app-sidebar')
  if (!sidebar) return
  sidebar.innerHTML = `
    <!-- Credit Dashboard -->
    <div class="sidebar-section">
      <div class="sidebar-section-title">⭐ 信用積分儀表板</div>
      <div class="credit-card">
        <div class="credit-label">CREDIT SCORE</div>
        <div class="credit-score">${state.user?.credit || 88} <span>/ 100</span></div>
        <div class="credit-bar-wrap">
          <div class="credit-bar-label"><span>健康狀態</span><span>${state.user?.credit || 88}%</span></div>
          <div class="credit-bar-bg"><div class="credit-bar-fill" style="width:${state.user?.credit || 88}%"></div></div>
        </div>
        <div class="credit-status-badge">✓ 健康</div>
        <div class="credit-history">
          <div class="credit-history-item"><span>準時簽到</span><span class="credit-change-pos">+2</span></div>
          <div class="credit-history-item"><span>活動未簽到</span><span class="credit-change-neg">-5</span></div>
          <div class="credit-history-item"><span>及時取消預約</span><span class="credit-change-pos">+3</span></div>
        </div>
      </div>
    </div>

    <!-- College News Cards -->
    <div class="sidebar-section">
      <div class="sidebar-section-title">📢 各學院最新消息</div>
      <div class="college-news-list">
        ${collegeNews.map(n => `
          <div class="news-card" onclick="toast('${n.title}', 'info')">
            <div class="news-card-college">${n.college}</div>
            <div class="news-card-title">${n.urgent ? '🔴 ' : ''}${n.title}</div>
            <div class="news-card-meta"><span>📅 ${n.time}</span></div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Pending Negotiations -->
    <div class="sidebar-section">
      <div class="sidebar-section-title">🤝 待處理協商</div>
      <div class="nego-list">
        ${negoItems.map(item => `
          <div class="nego-item ${item.status}" onclick="openNegotiationDialog('${item.id}')">
            <div class="nego-venue">📍 ${item.venue}</div>
            <div class="nego-time">${item.time}</div>
            <div class="nego-time" style="color:#64748b">對方：${item.opponent}</div>
            <span class="nego-timer ${item.status === 'urgent' ? 'red' : 'gold'}">
              ${item.status === 'urgent' ? '⚠️ 逾期 ' + item.elapsed + '秒' : '⏱️ ' + item.elapsed + '秒'}
            </span>
          </div>
        `).join('')}
        ${negoItems.length === 0 ? '<div style="color:#94a3b8;font-size:0.8rem;text-align:center;padding:12px;">暫無待處理協商</div>' : ''}
      </div>
    </div>

    <!-- Function Shortcuts -->
    <div class="sidebar-section">
      <div class="sidebar-section-title">🔗 功能快捷鍵</div>
      <div class="shortcut-grid">
        ${shortcuts.map(s => `
          <div class="shortcut-btn ${state.currentPage === s.page ? 'active' : ''}" data-page="${s.page}" onclick="navigateTo('${s.page}')">
            <div class="shortcut-icon">${s.icon}</div>
            <div class="shortcut-label">${s.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

// ════════════════════════════════════════════
// LEAFLET MAP
// ════════════════════════════════════════════
const buildings = [
  { id: 1, name: '焯炤館', type: 'auditorium', capacity: 300, accessible: true, elevator: false, restroom: true, reservable: true, lat: 25.0332, lng: 121.4330, status: 'available', desc: '主要演講廳，適合大型活動', icon: '🏛️' },
  { id: 2, name: '仁愛空間', type: 'meeting', capacity: 50, accessible: true, elevator: false, restroom: true, reservable: true, lat: 25.0323, lng: 121.4320, status: 'available', desc: '課指組辦公室旁，中型會議空間', icon: '🏢' },
  { id: 3, name: '進修部演講廳', type: 'auditorium', capacity: 200, accessible: true, elevator: true, restroom: false, reservable: true, lat: 25.0340, lng: 121.4340, status: 'maintenance', desc: '進修部主要講堂，維護中至4/15', icon: '🏛️' },
  { id: 4, name: '潛水艇的天空', type: 'creative', capacity: 30, accessible: false, elevator: false, restroom: false, reservable: true, lat: 25.0313, lng: 121.4315, status: 'available', desc: '創意工作坊空間', icon: '🎨' },
  { id: 5, name: '圖書館研討室', type: 'study', capacity: 20, accessible: true, elevator: true, restroom: true, reservable: true, lat: 25.0330, lng: 121.4300, status: 'available', desc: '圖書館B1-6F均有無障礙設施', icon: '📚' },
  { id: 6, name: '體育館', type: 'sports', capacity: 500, accessible: true, elevator: false, restroom: true, reservable: false, lat: 25.0305, lng: 121.4320, status: 'available', desc: '籃球、羽球等體育活動', icon: '🏀' },
  { id: 7, name: '學生活動中心', type: 'multipurpose', capacity: 100, accessible: true, elevator: true, restroom: true, reservable: true, lat: 25.0325, lng: 121.4350, status: 'available', desc: '社辦及多功能室', icon: '🎭' },
  { id: 8, name: '宗倫樓', type: 'hall', capacity: 400, accessible: true, elevator: true, restroom: true, reservable: false, lat: 25.0350, lng: 121.4360, status: 'available', desc: '大禮堂及教室群', icon: '⛪' },
  { id: 9, name: '行政大樓', type: 'admin', capacity: 0, accessible: true, elevator: true, restroom: true, reservable: false, lat: 25.0342, lng: 121.4325, status: 'available', desc: '教務處、學務處等行政單位', icon: '🏢' },
  { id: 10, name: '醫學院', type: 'academic', capacity: 150, accessible: true, elevator: true, restroom: true, reservable: false, lat: 25.0318, lng: 121.4355, status: 'available', desc: '醫學、護理相關科系', icon: '🏥' },
]

function initLeafletMap() {
  if (!window.L) { setTimeout(initLeafletMap, 500); return }
  if (state.leafletMap) { state.leafletMap.remove(); state.leafletMap = null }

  const map = L.map('leaflet-map', {
    center: [25.0330, 121.4330],
    zoom: 17,
    zoomControl: true
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors | FJU Smart Hub v4.0',
    maxZoom: 19
  }).addTo(map)

  state.leafletMap = map
  state.buildings = buildings
  renderMapMarkers()
}

function getMarkerColor(building) {
  if (building.status === 'maintenance') return '#FF0000'
  if (!building.accessible) return '#94a3b8'
  return '#003153'
}

function renderMapMarkers(filter = 'all') {
  if (!state.leafletMap) return
  // Remove old markers
  state.mapMarkers.forEach(m => m.remove())
  state.mapMarkers = []

  buildings.forEach(bldg => {
    if (filter === 'accessible' && !bldg.accessible) return
    if (filter === 'reservable' && !bldg.reservable) return
    if (filter === 'maintenance' && bldg.status !== 'maintenance') return

    const color = getMarkerColor(bldg)
    const icon = L.divIcon({
      className: '',
      html: `<div style="
        width:36px;height:36px;border-radius:50%;background:${color};
        border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;
        font-size:14px;cursor:pointer;transition:transform 0.2s;
        ${bldg.status==='maintenance'?'animation:blink 1.5s infinite;':''}
      ">${bldg.icon}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    })

    const marker = L.marker([bldg.lat, bldg.lng], { icon })
      .addTo(state.leafletMap)
      .bindPopup(buildingPopupHTML(bldg), { maxWidth: 280 })
      .on('click', () => {
        state.selectedBuilding = bldg
        fetchBuildingStatus(bldg.id)
      })

    // Add accessibility markers
    if (bldg.accessible) {
      const accIcon = L.divIcon({
        className: '',
        html: `<div style="width:12px;height:12px;border-radius:50%;background:#DAA520;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12], iconAnchor: [6, 6]
      })
      L.marker([bldg.lat + 0.0002, bldg.lng + 0.0002], { icon: accIcon }).addTo(state.leafletMap)
    }
    if (bldg.elevator) {
      const elvIcon = L.divIcon({
        className: '',
        html: `<div style="width:10px;height:10px;background:#008000;border:2px solid white;border-radius:2px;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [10, 10], iconAnchor: [5, 5]
      })
      L.marker([bldg.lat - 0.0002, bldg.lng + 0.0001], { icon: elvIcon }).addTo(state.leafletMap)
    }

    state.mapMarkers.push(marker)
  })
}

function buildingPopupHTML(bldg) {
  return `
    <div class="map-popup">
      <h4>${bldg.icon} ${bldg.name}</h4>
      <p style="font-size:0.8rem;color:#64748b;margin-bottom:6px;">${bldg.desc}</p>
      <div class="facilities">
        ${bldg.capacity ? `<span class="facility-badge">👥 ${bldg.capacity}人</span>` : ''}
        ${bldg.accessible ? '<span class="facility-badge accessibility-badge">♿ 無障礙</span>' : ''}
        ${bldg.elevator ? '<span class="facility-badge accessibility-badge">🛗 電梯</span>' : ''}
        ${bldg.restroom ? '<span class="facility-badge accessibility-badge">🚻 無障礙廁所</span>' : ''}
        <span class="facility-badge" style="${bldg.status==='maintenance'?'background:rgba(255,0,0,0.1);color:#ff0000;':'background:rgba(0,128,0,0.1);color:#008000;'}">
          ${bldg.status==='maintenance'?'🔧 維護中':'✅ 可預約'}
        </span>
      </div>
      ${bldg.reservable && bldg.status !== 'maintenance' ? `<button class="reserve-btn" onclick="openReservationFromMap(${bldg.id})">📅 立即預約</button>` : ''}
    </div>
  `
}

function flyToBuilding(id) {
  const bldg = buildings.find(b => b.id === id)
  if (!bldg || !state.leafletMap) return
  state.leafletMap.flyTo([bldg.lat, bldg.lng], 18, { duration: 1.5 })
  setTimeout(() => {
    const marker = state.mapMarkers.find((_, i) => buildings[i]?.id === id)
    if (marker) marker.openPopup()
  }, 1600)
  navigateTo('map')
}

function setMapFilter(filter) {
  state.mapFilter = filter
  document.querySelectorAll('.map-filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.id === `filter-${filter}`)
  })
  renderMapMarkers(filter)
}

async function fetchBuildingStatus(buildingId) {
  // AJAX request to get dynamic maintenance status from map_elements
  try {
    const data = await fetchData(`/map/building/${buildingId}`)
    if (data && data.status) {
      toast(`${data.name} 狀態：${data.status === 'maintenance' ? '🔧 維護中' : '✅ 正常'}`, data.status === 'maintenance' ? 'warning' : 'success')
    }
  } catch(e) {}
}

function openReservationFromMap(buildingId) {
  const bldg = buildings.find(b => b.id === buildingId)
  navigateTo('reservation')
  setTimeout(() => {
    const venueSelect = document.getElementById('res-venue')
    if (venueSelect) venueSelect.value = buildingId
  }, 200)
}

// ════════════════════════════════════════════
// GLASS-MORPHISM CALENDAR PANEL
// ════════════════════════════════════════════
const calEvents = {
  '2026-04-05': [{ title: '幹部知能研習', club: '課指組', venue: '焯炤館', status: 'approved' }],
  '2026-04-10': [
    { title: '資管系學會活動', club: '資管系學會', venue: '焯炤館演講廳', status: 'approved' },
    { title: '攝影社年會', club: '攝影社', venue: '焯炤館演講廳', status: 'conflict' }
  ],
  '2026-04-12': [{ title: '服務學習日', club: '服務隊', venue: '校園各地', status: 'approved' }],
  '2026-04-15': [{ title: '春季攝影展覽', club: '攝影社', venue: '圖書館大廳', status: 'pending' }],
  '2026-04-20': [{ title: '資管盃程式競賽', club: '資管系學會', venue: '焯炤館', status: 'approved' }],
  '2026-04-25': [{ title: 'AI 時代創業論壇', club: '創業研究社', venue: '進修部演講廳', status: 'approved' }],
  '2026-04-28': [{ title: '新生說明會', club: '學生會', venue: '宗倫樓大禮堂', status: 'pending' }],
}

function toggleCalendarPanel() {
  state.calendarOpen = !state.calendarOpen
  const panel = document.getElementById('calendar-panel')
  const btn = document.getElementById('cal-open-btn')
  if (panel) {
    panel.classList.toggle('open', state.calendarOpen)
    if (btn) btn.style.display = state.calendarOpen ? 'none' : 'flex'
  }
}

function renderCalendarPanel() {
  const panel = document.getElementById('calendar-panel')
  if (!panel) return
  const [year, month] = state.calCurrentMonth.split('-').map(Number)
  const monthNames = { 'zh-TW': ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'] }
  const days = ['日','一','二','三','四','五','六']

  panel.innerHTML = `
    <div class="cal-panel-header">
      <div class="cal-panel-title"><i class="fas fa-calendar-alt"></i> 場地行事曆</div>
      <button class="cal-close-btn" onclick="toggleCalendarPanel()">×</button>
    </div>
    <div class="cal-month-nav">
      <button onclick="calPrevMonth()">‹</button>
      <div class="cal-month-title">${year}年${(monthNames['zh-TW'] || [])[month-1] || month}月</div>
      <button onclick="calNextMonth()">›</button>
    </div>
    <div class="cal-grid">
      <div class="cal-day-headers">
        ${days.map(d => `<div class="cal-day-header">${d}</div>`).join('')}
      </div>
      <div class="cal-days">${buildCalDays(year, month)}</div>
    </div>
    <div class="cal-events-wrap">
      <div class="cal-events-title">📋 本月活動</div>
      ${renderCalEventsList(year, month)}
    </div>
    <div style="padding:12px 16px;border-top:1px solid #e2e8f0;">
      <button class="btn btn-primary w-full" onclick="navigateTo('cal-management')">
        <i class="fas fa-edit"></i> 開啟行事曆管理頁面
      </button>
    </div>
  `
}

function buildCalDays(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const today = new Date()
  let html = ''

  // Pad start
  for (let i = 0; i < firstDay; i++) {
    const prevDate = new Date(year, month - 1, -firstDay + i + 1)
    html += `<div class="cal-day other-month"><div class="cal-day-num">${prevDate.getDate()}</div></div>`
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    const isToday = today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === d
    const isSelected = state.calSelectedDay === dateStr
    const events = calEvents[dateStr] || []
    const dots = events.map(e => `<div class="cal-dot ${e.status}"></div>`).join('')
    html += `
      <div class="cal-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${events.length ? 'has-event' : ''}" onclick="calSelectDay('${dateStr}')">
        <div class="cal-day-num">${d}</div>
        ${events.length ? `<div class="cal-day-dots">${dots}</div>` : ''}
      </div>
    `
  }
  return html
}

function renderCalEventsList(year, month) {
  const monthStr = `${year}-${String(month).padStart(2,'0')}`
  const eventsInMonth = Object.entries(calEvents)
    .filter(([date]) => date.startsWith(monthStr))
    .flatMap(([date, evts]) => evts.map(e => ({ ...e, date })))
    .sort((a, b) => a.date.localeCompare(b.date))

  if (!eventsInMonth.length) return '<div style="color:#94a3b8;font-size:0.82rem;text-align:center;padding:20px;">本月無活動</div>'

  return eventsInMonth.map(evt => `
    <div class="cal-event-item ${evt.status}" onclick="calClickEvent(${JSON.stringify(evt).replace(/"/g,"'")})">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div class="cal-event-title">${evt.title}</div>
        <span class="cal-event-status ${evt.status}">${getStatusLabel(evt.status)}</span>
      </div>
      <div class="cal-event-meta">
        <span>📅 ${evt.date}</span>
        <span>📍 ${evt.venue}</span>
        <span>🎭 ${evt.club}</span>
      </div>
    </div>
  `).join('')
}

function getStatusLabel(status) {
  const labels = { approved: '已核准', pending: '待審核', conflict: '衝突中', rejected: '已駁回' }
  return labels[status] || status
}

function calSelectDay(dateStr) {
  state.calSelectedDay = dateStr
  renderCalendarPanel()
  // Show events for this day
  const events = calEvents[dateStr] || []
  if (events.some(e => e.status === 'conflict')) {
    const conflictEvent = events.find(e => e.status === 'conflict')
    setTimeout(() => {
      if (confirm(`⚠️ 發現場地衝突：${conflictEvent.title}\n是否立即開啟協商室？`)) {
        openNegotiationDialog('N001')
      }
    }, 300)
  }
}

function calClickEvent(evt) {
  if (evt.status === 'conflict') {
    openNegotiationDialog('N001')
  } else {
    showModal(`
      <div style="padding:10px;">
        <h3 style="color:#003153;margin-bottom:12px;">${evt.title}</h3>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:0.85rem;">
          <div>📅 日期：${evt.date}</div>
          <div>📍 場地：${evt.venue}</div>
          <div>🎭 主辦：${evt.club}</div>
          <div>狀態：<span class="badge ${evt.status}">${getStatusLabel(evt.status)}</span></div>
        </div>
      </div>
    `)
  }
}

function calPrevMonth() {
  const [y, m] = state.calCurrentMonth.split('-').map(Number)
  const prev = new Date(y, m - 2, 1)
  state.calCurrentMonth = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`
  renderCalendarPanel()
}

function calNextMonth() {
  const [y, m] = state.calCurrentMonth.split('-').map(Number)
  const next = new Date(y, m, 1)
  state.calCurrentMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`
  renderCalendarPanel()
}

// ════════════════════════════════════════════
// CALENDAR MANAGEMENT PAGE
// ════════════════════════════════════════════
function renderCalManagementPage() {
  const page = document.getElementById('cal-management-page')
  if (!page) return
  const [year, month] = state.calCurrentMonth.split('-').map(Number)

  page.innerHTML = `
    <div class="cal-mgmt-header">
      <button class="cal-mgmt-back" onclick="closeCalManagement()">
        <i class="fas fa-arrow-left"></i> ${t('backToMap')}
      </button>
      <div class="cal-mgmt-title">📅 行事曆管理 – ${year}年${month}月</div>
      <div style="margin-left:auto;display:flex;gap:8px;">
        <button class="btn btn-gold btn-sm" onclick="calPrevMonth();renderCalManagementPage()">‹ 上月</button>
        <button class="btn btn-gold btn-sm" onclick="calNextMonth();renderCalManagementPage()">下月 ›</button>
      </div>
    </div>
    <div class="cal-mgmt-body">
      <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
        <span class="badge green">■ 已核准</span>
        <span class="badge gold">■ 待審核</span>
        <span class="badge red">■ 衝突中</span>
        <span class="badge blue">■ 您的活動</span>
      </div>
      <div class="cal-mgmt-fullgrid" id="cal-mgmt-grid">
        ${buildCalMgmtGrid(year, month)}
      </div>
    </div>
  `
}

function buildCalMgmtGrid(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const dayLabels = ['日','一','二','三','四','五','六']
  let html = dayLabels.map(d => `<div style="text-align:center;font-size:0.75rem;font-weight:700;color:#94a3b8;padding:4px;">${d}</div>`).join('')

  for (let i = 0; i < firstDay; i++) html += '<div class="cal-mgmt-day" style="background:#f8fafc;"></div>'
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    const events = calEvents[dateStr] || []
    html += `
      <div class="cal-mgmt-day" onclick="calMgmtDayClick('${dateStr}')">
        <div class="cal-mgmt-day-num">${d}</div>
        ${events.map(e => `<div class="cal-mgmt-event ${e.status}" title="${e.title}">${e.title.substring(0,8)}…</div>`).join('')}
      </div>
    `
  }
  return html
}

function calMgmtDayClick(dateStr) {
  const events = calEvents[dateStr] || []
  if (!events.length) {
    showModal(`<div style="padding:10px;"><h3 style="color:#003153;">📅 ${dateStr}</h3><p style="color:#94a3b8;margin-top:12px;">此日期暫無活動</p><button class="btn btn-primary mt-16" onclick="closeModal()">關閉</button></div>`)
    return
  }
  const html = events.map(e => `
    <div class="cal-event-item ${e.status}" style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;">
        <strong>${e.title}</strong>
        <span class="badge ${e.status}">${getStatusLabel(e.status)}</span>
      </div>
      <div style="font-size:0.78rem;color:#64748b;margin-top:4px;">📍 ${e.venue} | 🎭 ${e.club}</div>
      ${e.status === 'conflict' ? `<button class="btn btn-danger btn-sm mt-8" onclick="closeModal();openNegotiationDialog('N001')">⚡ 立即協商</button>` : ''}
    </div>
  `).join('')
  showModal(`<div style="padding:10px;"><h3 style="color:#003153;margin-bottom:12px;">📅 ${dateStr} 的活動</h3>${html}</div>`)
}

function closeCalManagement() {
  document.getElementById('cal-management-page').classList.remove('active')
  navigateTo('map')
}

// ════════════════════════════════════════════
// NEGOTIATION DIALOG (3/6 min rule)
// ════════════════════════════════════════════
const negoData = {
  'N001': { id: 'N001', venue: '焯炤館演講廳', date: '2026-04-10', time: '09:00-12:00', party1: '資管系學會', party2: '攝影社', issue: '同時段申請焯炤館演講廳' },
  'N002': { id: 'N002', venue: '仁愛空間', date: '2026-04-12', time: '14:00-17:00', party1: state.user?.name || '我方', party2: '攝影社', issue: '時段重疊申請' },
}

function openNegotiationDialog(negoId) {
  const nego = negoData[negoId]
  if (!nego) return

  const dialog = document.getElementById('nego-dialog')
  dialog.innerHTML = `
    <div class="nego-dialog-card">
      <div class="nego-dialog-header">
        <div class="nego-dialog-title">🤝 ${t('negotiateTitle')}</div>
        <div class="nego-timer-display" id="nego-timer-display">00:00</div>
      </div>
      <div class="nego-dialog-body">
        <div style="background:#f1f5f9;border-radius:8px;padding:12px;margin-bottom:12px;font-size:0.82rem;">
          <div style="font-weight:700;color:#003153;margin-bottom:4px;">⚠️ 衝突資訊</div>
          <div>📍 場地：${nego.venue}</div>
          <div>📅 時段：${nego.date} ${nego.time}</div>
          <div>🔴 衝突方：${nego.party1} ↔ ${nego.party2}</div>
          <div style="margin-top:4px;color:#64748b;">問題：${nego.issue}</div>
        </div>
        <div class="nego-chat" id="nego-chat">
          <div class="chat-bubble system">🔔 協商室已開啟，請雙方在 3 分鐘內達成共識</div>
          <div class="chat-bubble received"><div class="chat-sender">${nego.party2}</div>我方活動需要全場設備，請問貴方是否可以調整時間？</div>
        </div>
        <div class="nego-input-row">
          <input type="text" class="nego-input" id="nego-msg-input" placeholder="輸入協商訊息..." onkeypress="if(event.key==='Enter')sendNegoMsg()" />
          <button class="nego-send-btn" onclick="sendNegoMsg()">發送</button>
        </div>
        <div class="nego-ai-suggestions" id="nego-ai-suggestions" style="display:none;">
          <div class="nego-ai-title">🤖 GPT-4 建議（3分鐘已到，AI 介入）</div>
        </div>
      </div>
      <div class="nego-dialog-footer">
        <button class="nego-complete-btn" onclick="completeNegotiation('${negoId}')">
          ✅ ${t('negotiateComplete')}
        </button>
        <button class="nego-cancel-btn" onclick="closeNegotiationDialog()">取消</button>
      </div>
    </div>
  `
  dialog.classList.add('active')
  startNegoTimer(negoId)

  // Log notification
  logNotification(negoId, '衝突協商', `場地衝突：${nego.venue}`, '重要')
}

function closeNegotiationDialog() {
  clearNegoTimer()
  document.getElementById('nego-dialog').classList.remove('active')
}

function sendNegoMsg() {
  const input = document.getElementById('nego-msg-input')
  const chat = document.getElementById('nego-chat')
  if (!input || !chat || !input.value.trim()) return
  const msg = input.value.trim()
  input.value = ''

  const bubble = document.createElement('div')
  bubble.className = 'chat-bubble sent'
  bubble.innerHTML = `<div class="chat-sender">${state.user?.name}</div>${msg}`
  chat.appendChild(bubble)
  chat.scrollTop = chat.scrollHeight

  // Simulate opponent response
  setTimeout(() => {
    const resp = document.createElement('div')
    resp.className = 'chat-bubble received'
    resp.innerHTML = `<div class="chat-sender">對方</div>瞭解，我們可以考慮調整至下午 13:00-16:00，是否可行？`
    chat.appendChild(resp)
    chat.scrollTop = chat.scrollHeight
  }, 1500)

  // Reset silence timer
  if (state.negoState.silenceTimer) clearTimeout(state.negoState.silenceTimer)
  state.negoState.silenceTimer = setTimeout(() => checkSilence(), 30000)
}

function startNegoTimer(negoId) {
  clearNegoTimer()
  state.negoState.active = true
  state.negoState.elapsed = 0
  state.negoState.startTime = Date.now()

  state.negoState.interval = setInterval(() => {
    state.negoState.elapsed = Math.floor((Date.now() - state.negoState.startTime) / 1000)
    const mins = Math.floor(state.negoState.elapsed / 60)
    const secs = state.negoState.elapsed % 60
    const display = document.getElementById('nego-timer-display')
    if (display) {
      display.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
      if (state.negoState.elapsed >= 300) {
        display.classList.add('urgent')
      }
    }

    // 3-minute rule: AI intervenes
    if (state.negoState.elapsed === 180) {
      aiInterveneNegotiation()
    }
    // 6-minute rule: enforce penalty
    if (state.negoState.elapsed === 360) {
      enforcePenalty()
    }
  }, 1000)
}

function clearNegoTimer() {
  if (state.negoState.interval) { clearInterval(state.negoState.interval); state.negoState.interval = null }
  if (state.negoState.silenceTimer) { clearTimeout(state.negoState.silenceTimer); state.negoState.silenceTimer = null }
  state.negoState.active = false
}

function checkSilence() {
  // Semantic filter: if silence > 30s, consider "irrelevant/silent"
  if (state.negoState.elapsed < 180) {
    const chat = document.getElementById('nego-chat')
    if (chat) {
      const bubble = document.createElement('div')
      bubble.className = 'chat-bubble system'
      bubble.textContent = '⏱️ 系統偵測：雙方沉默超過 30 秒，將計入協商計時...'
      chat.appendChild(bubble)
      chat.scrollTop = chat.scrollHeight
    }
  }
}

function aiInterveneNegotiation() {
  const suggestions = document.getElementById('nego-ai-suggestions')
  const chat = document.getElementById('nego-chat')

  if (chat) {
    const bubble = document.createElement('div')
    bubble.className = 'chat-bubble ai'
    bubble.innerHTML = `🤖 <strong>GPT-4 AI 已介入協商</strong><br>已達 3 分鐘無共識，系統提供以下 3 項建議：`
    chat.appendChild(bubble)
    chat.scrollTop = chat.scrollHeight
  }

  if (suggestions) {
    suggestions.style.display = 'block'
    suggestions.innerHTML = `
      <div class="nego-ai-title">🤖 GPT-4 建議（3分鐘介入）</div>
      <button class="nego-suggestion-btn" onclick="acceptSuggestion('分割時段：上午申請方使用 09:00-10:30，下午申請方使用 10:30-12:00')">
        💡 建議 1：分割時段使用（09:00-10:30 / 10:30-12:00）
      </button>
      <button class="nego-suggestion-btn" onclick="acceptSuggestion('改期協議：申請方 B 改至隔日同時段，系統自動保留')">
        💡 建議 2：申請方 B 改至隔日同時段
      </button>
      <button class="nego-suggestion-btn" onclick="acceptSuggestion('場地替換：建議改訂仁愛空間（容量50人），費用相同')">
        💡 建議 3：改訂替代場地（仁愛空間）
      </button>
    `
  }

  toast('🤖 AI 已介入協商，提供 3 項建議', 'warning')
  logCreditAction('AI介入通知', 0, state.user?.credit || 88, '協商超時3分鐘，AI介入')
}

function acceptSuggestion(suggestion) {
  const chat = document.getElementById('nego-chat')
  if (chat) {
    const bubble = document.createElement('div')
    bubble.className = 'chat-bubble sent'
    bubble.innerHTML = `<div class="chat-sender">${state.user?.name}</div>同意採用：${suggestion}`
    chat.appendChild(bubble)
    chat.scrollTop = chat.scrollHeight
  }
  toast('✅ 已選擇 AI 建議方案', 'success')
}

function enforcePenalty() {
  clearNegoTimer()
  // Red-light animation
  const overlay = document.getElementById('penalty-overlay')
  overlay.classList.add('active')
  setTimeout(() => overlay.classList.remove('active'), 2000)

  // Deduct 10 credit points
  const newCredit = Math.max(0, (state.user?.credit || 88) - 10)
  state.user.credit = newCredit
  logCreditAction('協商逾期罰款', -10, newCredit, '6分鐘無法達成協議，自動扣款')

  const chat = document.getElementById('nego-chat')
  if (chat) {
    const bubble = document.createElement('div')
    bubble.className = 'chat-bubble system'
    bubble.innerHTML = `🚨 <strong>協商超時！</strong> 已強制關閉。已扣除 <strong style="color:#ff0000">-10 信用點數</strong>（餘 ${newCredit} 點）`
    chat.appendChild(bubble)
    chat.scrollTop = chat.scrollHeight
  }

  toast(`🚨 ${t('penaltyAlert')}（餘 ${newCredit} 點）`, 'error')
  document.getElementById('nego-timer-display')?.classList.add('urgent')

  // Auto-close dialog after 3 seconds
  setTimeout(() => {
    closeNegotiationDialog()
    renderSidebar() // Refresh credit display
  }, 3000)
}

function completeNegotiation(negoId) {
  clearNegoTimer()
  const nego = negoData[negoId]

  // Update conflicts table (mock)
  toast('✅ 協商完成！更新行事曆中...', 'success')
  logCreditAction('協商成功完成', +2, (state.user?.credit || 88) + 2, '協商成功，獎勵加分')
  state.user.credit = Math.min(100, (state.user?.credit || 88) + 2)

  // Remove from nego list
  const idx = negoItems.findIndex(n => n.id === negoId)
  if (idx !== -1) negoItems.splice(idx, 1)

  closeNegotiationDialog()
  // Redirect to calendar management
  navigateTo('cal-management')
  renderSidebar()
  toast('📅 已跳轉至行事曆管理頁面', 'info')
}

// ════════════════════════════════════════════
// CREDIT LOG
// ════════════════════════════════════════════
function logCreditAction(action, change, scoreAfter, reason) {
  state.creditLogs.push({
    timestamp: new Date().toISOString(),
    userId: state.user?.id,
    action, change, scoreAfter, reason
  })
  // Also POST to API
  postData('/credit/log', { user_id: state.user?.id, action, change, score_after: scoreAfter, reason }).catch(() => {})
}

// ════════════════════════════════════════════
// NOTIFICATION SYSTEM + READ RECEIPT
// ════════════════════════════════════════════
const notifications = [
  { id: 'n1', icon: '✅', type: 'green', title: '場地申請已核准', desc: '焯炤館演講廳 2026-04-20 09:00-12:00 申請已核准', time: '10分鐘前', important: false, token: 'tk001', read: false },
  { id: 'n2', icon: '⚠️', type: 'gold', title: 'AI 預審警告', desc: '您的申請含有需要人工審核的內容，請靜候通知', time: '30分鐘前', important: true, token: 'tk002', read: false },
  { id: 'n3', icon: '📝', type: 'blue', title: '活動登記截止提醒', desc: '2026資管盃程式競賽報名將於明日截止', time: '1小時前', important: false, token: 'tk003', read: true },
  { id: 'n4', icon: '📦', type: 'red', title: '器材歸還提醒', desc: '無線麥克風租借 已到期，請儘速歸還', time: '昨天', important: false, token: 'tk004', read: true },
  { id: 'n5', icon: '🤝', type: 'red', title: '場地衝突協商', desc: '焯炤館演講廳 2026-04-10 時段衝突，請進入協商室', time: '2小時前', important: true, token: 'tk005', read: false },
]

function renderNotifPanel() {
  const panel = document.getElementById('notif-panel')
  if (!panel) return
  panel.innerHTML = `
    <div class="notif-panel-header">
      <div class="notif-panel-title">🔔 系統通知</div>
      <span class="notif-read-all" onclick="markAllRead()">全部已讀</span>
    </div>
    <div class="notif-list">
      ${notifications.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}" id="notif-${n.id}" onclick="readNotification('${n.id}')">
          <div class="notif-icon-wrap ${n.type}">${n.icon}</div>
          <div class="notif-content">
            <div class="notif-title">${n.title} ${n.important ? '<span style="color:#DAA520;font-size:0.7rem;">重要</span>' : ''}</div>
            <div class="notif-desc">${n.desc}</div>
            <div class="notif-time">${n.time} ${n.read ? '・已讀' : '・<span style="color:#003153;font-weight:600;">未讀</span>'}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `
}

function readNotification(id) {
  const notif = notifications.find(n => n.id === id)
  if (!notif) return

  // Track read receipt
  trackReadReceipt(notif.token)
  notif.read = true
  const el = document.getElementById(`notif-${id}`)
  if (el) el.classList.remove('unread')

  // Update notif log
  logNotification(id, notif.title, notif.desc, notif.important ? '重要' : '一般')

  renderNotifPanel()
}

function trackReadReceipt(token) {
  // POST to track.php equivalent endpoint
  state.readReceipts[token] = { timestamp: new Date().toISOString(), ip: '127.0.0.1' }
  postData('/notifications/track', { token, timestamp: new Date().toISOString() }).catch(() => {})
}

function logNotification(notifId, title, desc, priority) {
  state.notifLogs.push({
    notif_id: notifId, title, desc, priority,
    userId: state.user?.id,
    timestamp: new Date().toISOString()
  })
}

function markAllRead() {
  notifications.forEach(n => { n.read = true; trackReadReceipt(n.token) })
  renderNotifPanel()
  toast('✅ 所有通知已標記為已讀', 'success')
}

// Mandatory 10s overlay for important unread notifications
function showMandatoryNotif() {
  const importantUnread = notifications.find(n => n.important && !n.read)
  if (!importantUnread) return

  const overlay = document.getElementById('mandatory-notif-overlay')
  overlay.innerHTML = `
    <div class="mandatory-card">
      <div class="mandatory-header">
        <h3>🔴 重要通知 – 必讀</h3>
      </div>
      <div class="mandatory-body">
        <div style="font-weight:700;font-size:1rem;color:#003153;margin-bottom:8px;">${importantUnread.title}</div>
        <div style="color:#64748b;font-size:0.85rem;line-height:1.5;">${importantUnread.desc}</div>
        <div class="mandatory-countdown" id="mandatory-countdown">10</div>
        <div style="font-size:0.75rem;color:#94a3b8;text-align:center;">請閱讀後確認，系統將記錄您的已讀時間</div>
      </div>
      <div class="mandatory-footer">
        <button class="mandatory-confirm-btn" id="mandatory-confirm-btn" disabled onclick="confirmMandatoryNotif('${importantUnread.id}')">
          請等待 10 秒後確認...
        </button>
      </div>
    </div>
  `
  overlay.classList.add('active')

  let countdown = 10
  const timer = setInterval(() => {
    countdown--
    const el = document.getElementById('mandatory-countdown')
    if (el) el.textContent = countdown
    if (countdown <= 0) {
      clearInterval(timer)
      const btn = document.getElementById('mandatory-confirm-btn')
      if (btn) { btn.disabled = false; btn.textContent = '✅ 我已閱讀，確認關閉' }
    }
  }, 1000)
}

function confirmMandatoryNotif(id) {
  trackReadReceipt(notifications.find(n => n.id === id)?.token)
  readNotification(id)
  document.getElementById('mandatory-notif-overlay').classList.remove('active')
  toast('✅ 已確認重要通知', 'success')
}

// ════════════════════════════════════════════
// DASHBOARD PAGE
// ════════════════════════════════════════════
async function renderDashboard(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">📊</div>
      <div><div class="page-title">儀表板</div><div class="page-subtitle">歡迎，${state.user?.name} (${getRoleLabel(state.user?.role)})</div></div>
    </div>
    <div class="page-body">
      <div class="stats-grid" id="dash-stats"></div>
      <div class="grid-2">
        <div class="card"><div class="card-header"><div class="card-title">📈 活動趨勢</div></div><div class="card-body"><div class="chart-wrap"><canvas id="dash-chart-1"></canvas></div></div></div>
        <div class="card"><div class="card-header"><div class="card-title">🎯 績效雷達</div></div><div class="card-body"><div class="chart-wrap"><canvas id="dash-chart-2"></canvas></div></div></div>
      </div>
      <div class="mt-16">
        <div class="card">
          <div class="card-header"><div class="card-title">📝 最近活動</div></div>
          <div class="card-body" id="dash-recent"></div>
        </div>
      </div>
    </div>
  `

  const data = await fetchData(`/dashboard/${state.user?.role || 'student'}`)
  if (!data) return

  // Render stats
  const statsEl = container.querySelector('#dash-stats')
  if (statsEl && data.stats) {
    const stats = Object.entries(data.stats).map(([key, val]) => ({
      label: statKeyLabel(key), value: val, color: 'blue'
    }))
    statsEl.innerHTML = stats.map(s => `
      <div class="stat-card ${s.color}">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value">${s.value}</div>
      </div>
    `).join('')
  }

  // Charts
  if (data.charts && data.charts[0]) {
    const c = data.charts[0]
    createChart('dash-chart-1', c.type || 'bar', c.labels, c.values, { options: { plugins: { legend: { display: false } } } })
  }
  if (data.charts && data.charts[1]) {
    createRadarChart('dash-chart-2', data.charts[1].labels, data.charts[1].values)
  }

  // Recent activities
  const recentEl = container.querySelector('#dash-recent')
  if (recentEl) {
    recentEl.innerHTML = `
      <table class="data-table">
        <thead><tr><th>活動</th><th>社團</th><th>日期</th><th>狀態</th></tr></thead>
        <tbody>
          <tr><td>資管盃程式競賽</td><td>資管系學會</td><td>2026-04-20</td><td><span class="badge green">已核准</span></td></tr>
          <tr><td>春季攝影展覽</td><td>攝影社</td><td>2026-04-15</td><td><span class="badge gold">待審核</span></td></tr>
          <tr><td>服務學習日</td><td>服務隊</td><td>2026-04-12</td><td><span class="badge green">已核准</span></td></tr>
        </tbody>
      </table>
    `
  }
}

function getRoleLabel(role) {
  const labels = { student: '學生', club_officer: '社團幹部', professor: '指導教授', admin: '行政人員', it_admin: 'IT管理員' }
  return labels[role] || role
}
function statKeyLabel(key) {
  const m = { total_clubs: '總社團數', active_reservations: '進行中預約', pending_review: '待審件數', total_users: '總用戶', members: '社員人數', upcoming_events: '即將舉辦', credit_score: '信用積分', pending_items: '待處理事項', activities_joined: '參加活動', volunteer_hours: '志工時數', skill_tags: '技能標籤', api_uptime: 'API 可用率', blocked_attacks: '已阻攻擊', storage_used: '儲存使用', active_sessions: '活躍工作階段' }
  return m[key] || key
}

// ════════════════════════════════════════════
// RESERVATION PAGE
// ════════════════════════════════════════════
async function renderReservation(container) {
  const venues = await fetchData('/venues') || []
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">📅</div>
      <div><div class="page-title">場地預約</div><div class="page-subtitle">三階段預約流程</div></div>
    </div>
    <div class="page-body">
      <div class="phase-indicator">
        <div class="phase-step ${state.reservationStep >= 1 ? 'active' : ''}">
          <div class="phase-circle ${state.reservationStep > 1 ? 'done' : state.reservationStep === 1 ? 'active' : ''}">1</div>
          <div class="phase-label">志願序申請</div>
        </div>
        <div class="phase-step ${state.reservationStep >= 2 ? 'active' : ''}">
          <div class="phase-circle ${state.reservationStep > 2 ? 'done' : state.reservationStep === 2 ? 'active' : ''}">2</div>
          <div class="phase-label">衝突協商</div>
        </div>
        <div class="phase-step ${state.reservationStep >= 3 ? 'active' : ''}">
          <div class="phase-circle ${state.reservationStep === 3 ? 'active' : ''}">3</div>
          <div class="phase-label">官方核定</div>
        </div>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title">📝 新增預約申請</div></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">選擇場地</label>
              <select class="form-control" id="res-venue">
                ${venues.map(v => `<option value="${v.id}">${v.name} (容量: ${v.capacity})</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">活動日期</label>
              <input type="date" class="form-control" id="res-date" value="2026-04-20" />
            </div>
            <div class="form-group">
              <label class="form-label">時間</label>
              <div class="d-flex gap-8">
                <input type="time" class="form-control" id="res-start" value="09:00" />
                <input type="time" class="form-control" id="res-end" value="12:00" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">活動說明（AI 預審）</label>
              <textarea class="form-control" id="res-purpose" rows="3" placeholder="請詳細說明活動目的與內容..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">志願序優先級</label>
              <select class="form-control" id="res-priority">
                <option value="1">第一志願</option>
                <option value="2">第二志願</option>
                <option value="3">第三志願</option>
              </select>
            </div>
            <button class="btn btn-primary w-full" onclick="submitReservation()">
              🚀 提交預約申請（AI 預審）
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">📋 我的預約記錄</div></div>
          <div class="card-body" id="res-list">
            <div class="loader"><div class="loader-spinner"></div></div>
          </div>
        </div>
      </div>
      <div id="ai-screen-result" class="mt-16"></div>
    </div>
  `
  loadReservations()
}

async function loadReservations() {
  const el = document.getElementById('res-list')
  if (!el) return
  const data = await fetchData('/reservations') || []
  el.innerHTML = `
    <table class="data-table">
      <thead><tr><th>場地</th><th>時間</th><th>狀態</th><th>操作</th></tr></thead>
      <tbody>
        ${data.map(r => `
          <tr>
            <td>${r.venue || r.venue_id}</td>
            <td style="font-size:0.75rem;">${r.start || r.start_time || '-'}</td>
            <td><span class="badge ${r.status === 'APPROVED' ? 'green' : r.status === 'PENDING_MANUAL_REVIEW' ? 'gold' : 'gray'}">${r.status}</span></td>
            <td><button class="btn btn-outline btn-sm" onclick="viewReservation('${r.id}')">詳情</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
}

async function submitReservation() {
  const venue = document.getElementById('res-venue')?.value
  const date = document.getElementById('res-date')?.value
  const start = document.getElementById('res-start')?.value
  const end = document.getElementById('res-end')?.value
  const purpose = document.getElementById('res-purpose')?.value
  if (!purpose) { toast('請填寫活動說明', 'error'); return }

  const resultEl = document.getElementById('ai-screen-result')
  if (resultEl) resultEl.innerHTML = '<div class="loader"><div class="loader-spinner"></div></div>'

  const res = await postData('/reservations', {
    venue_id: venue, start_time: `${date} ${start}`, end_time: `${date} ${end}`,
    purpose, role: state.user?.role
  })

  if (!res) { toast('提交失敗', 'error'); return }

  if (resultEl) {
    const riskColor = { Low: 'green', Medium: 'gold', High: 'red' }
    resultEl.innerHTML = `
      <div class="card">
        <div class="card-header"><div class="card-title">🤖 AI 預審結果</div></div>
        <div class="card-body">
          ${res.ai_screening ? `
            <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
              <span class="badge ${riskColor[res.ai_screening.risk_level] || 'gray'}">${res.ai_screening.risk_level} 風險</span>
              <span class="badge ${res.status === 'APPROVED' ? 'green' : res.status === 'REJECTED' ? 'red' : 'gold'}">${res.status === 'APPROVED' ? '✅ 已核准' : res.status === 'REJECTED' ? '❌ 已拒絕' : '⏳ 待人工審核'}</span>
            </div>
            <p style="font-size:0.85rem;">${res.ai_screening.reasoning || res.reason || ''}</p>
            ${res.ai_screening.law_reference ? `<div style="margin-top:8px;padding:8px;background:#f1f5f9;border-radius:6px;font-size:0.78rem;color:#64748b;">📖 ${res.ai_screening.law_reference}</div>` : ''}
          ` : `<p>${res.message || '處理完成'}</p>`}
        </div>
      </div>
    `
  }

  toast(res.status === 'APPROVED' ? '✅ 預約已核准！' : res.status === 'REJECTED' ? '❌ 預約已拒絕' : '⏳ 已提交待審核', res.status === 'APPROVED' ? 'success' : res.status === 'REJECTED' ? 'error' : 'warning')
  logCreditAction('場地申請', 0, state.user?.credit || 88, '提交場地預約申請')
}

function viewReservation(id) {
  showModal(`<div style="padding:10px;"><h3 style="color:#003153;">預約 #${id} 詳情</h3><p style="margin-top:12px;color:#64748b;">詳細資訊載入中...</p></div>`)
}

// ════════════════════════════════════════════
// EQUIPMENT PAGE
// ════════════════════════════════════════════
async function renderEquipment(container) {
  const items = await fetchData('/equipment') || []
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">📦</div>
      <div><div class="page-title">器材借用</div><div class="page-subtitle">線上申請・QR Code 取件</div></div>
    </div>
    <div class="page-body">
      <div class="stats-grid">
        <div class="stat-card blue"><div class="stat-label">總器材種類</div><div class="stat-value">${items.length}</div></div>
        <div class="stat-card green"><div class="stat-label">可借用件數</div><div class="stat-value">${items.reduce((a,b)=>a+(b.qty_available||0),0)}</div></div>
        <div class="stat-card gold"><div class="stat-label">借用中</div><div class="stat-value">${items.reduce((a,b)=>a+((b.qty_total||0)-(b.qty_available||0)),0)}</div></div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">🔧 器材庫存</div></div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>器材名稱</th><th>分類</th><th>庫存</th><th>可用</th><th>位置</th><th>操作</th></tr></thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td><span class="badge blue">${item.category}</span></td>
                  <td>${item.qty_total}</td>
                  <td><span style="color:${item.qty_available > 0 ? '#008000' : '#ff0000'};font-weight:700;">${item.qty_available}</span></td>
                  <td style="font-size:0.78rem;color:#64748b;">${item.location}</td>
                  <td>
                    <button class="btn btn-primary btn-sm" ${item.qty_available <= 0 ? 'disabled' : ''} onclick="borrowEquipment(${item.id}, '${item.name}')">
                      借用
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
}

async function borrowEquipment(id, name) {
  const returnDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  const result = await postData('/equipment/borrow', { equipment_id: id, return_date: returnDate, user_id: state.user?.id })
  if (result && result.status === 'APPROVED') {
    showModal(`
      <div style="padding:10px;">
        <h3 style="color:#003153;margin-bottom:12px;">✅ 借用申請成功</h3>
        <p style="margin-bottom:8px;">器材：<strong>${name}</strong></p>
        <p style="margin-bottom:8px;">歸還日期：<strong>${returnDate}</strong></p>
        <p style="margin-bottom:12px;">借用編號：<strong>#${result.id}</strong></p>
        <div style="background:#f1f5f9;border-radius:8px;padding:12px;text-align:center;">
          <div style="font-size:2rem;margin-bottom:8px;">📱</div>
          <div style="font-size:0.8rem;color:#64748b;">掃描 QR Code 完成取件確認</div>
          <div style="font-size:0.75rem;color:#003153;margin-top:4px;font-weight:600;">TOTP-${Date.now().toString(36).toUpperCase()}</div>
        </div>
      </div>
    `)
    toast('✅ 器材借用申請成功！', 'success')
    logCreditAction('器材借用', 0, state.user?.credit || 88, `借用${name}`)
  }
}

// ════════════════════════════════════════════
// CLUBS PAGE
// ════════════════════════════════════════════
async function renderClubs(container) {
  const clubs = await fetchData('/clubs') || []
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">🎭</div>
      <div><div class="page-title">社團管理</div><div class="page-subtitle">共 ${clubs.length} 個社團</div></div>
    </div>
    <div class="page-body">
      <div class="stats-grid">
        <div class="stat-card blue"><div class="stat-label">總社團數</div><div class="stat-value">87</div></div>
        <div class="stat-card green"><div class="stat-label">活躍社團</div><div class="stat-value">72</div></div>
        <div class="stat-card gold"><div class="stat-label">本月活動</div><div class="stat-value">34</div></div>
        <div class="stat-card red"><div class="stat-label">待審申請</div><div class="stat-value">7</div></div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">📋 社團列表</div>
          <input type="text" class="form-control" style="width:200px;" placeholder="搜尋社團..." oninput="filterClubs(this.value)" />
        </div>
        <div class="card-body">
          <table class="data-table" id="clubs-table">
            <thead><tr><th>社團名稱</th><th>類別</th><th>社員</th><th>信用分</th><th>狀態</th><th>操作</th></tr></thead>
            <tbody>
              ${clubs.map(c => `
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td><span class="badge blue">${c.category}</span></td>
                  <td>${c.members}</td>
                  <td><span style="color:${c.credit>=90?'#008000':c.credit>=70?'#b8860b':'#ff0000'};font-weight:700;">${c.credit}</span></td>
                  <td><span class="badge ${c.status==='active'?'green':'gray'}">${c.status==='active'?'活躍':'停止'}</span></td>
                  <td><button class="btn btn-outline btn-sm" onclick="viewClub(${c.id})">詳情</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
}

function filterClubs(val) {
  const rows = document.querySelectorAll('#clubs-table tbody tr')
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(val.toLowerCase()) ? '' : 'none'
  })
}

async function viewClub(id) {
  const data = await fetchData(`/clubs/${id}`)
  if (!data) return
  showModal(`
    <div style="padding:10px;">
      <h3 style="color:#003153;margin-bottom:12px;">🎭 ${data.name}</h3>
      <div style="font-size:0.85rem;line-height:1.8;color:#64748b;">
        <p>📋 類別：${data.category}</p>
        <p>👥 社員：${data.members} 人</p>
        <p>⭐ 信用：${data.credit}</p>
        <p>👨‍🏫 指導老師：${data.advisor}</p>
        <p style="margin-top:8px;">${data.description}</p>
      </div>
    </div>
  `)
}

// ════════════════════════════════════════════
// ACTIVITIES PAGE
// ════════════════════════════════════════════
async function renderActivities(container) {
  const acts = await fetchData('/activities') || []
  const tags = ['全部', '競賽', '展覽', '服務', '體育', 'AI', '創業', '講座']
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">📢</div>
      <div><div class="page-title">活動牆</div><div class="page-subtitle">探索校園精彩活動</div></div>
    </div>
    <div class="page-body">
      <div class="faq-chips" style="margin-bottom:16px;">
        ${tags.map(tag => `<span class="faq-chip" onclick="filterActivities('${tag === '全部' ? '' : tag}')">${tag}</span>`).join('')}
      </div>
      <div id="activities-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
        ${acts.map(a => renderActivityCard(a)).join('')}
      </div>
    </div>
  `
}

function renderActivityCard(a) {
  const statusColors = { upcoming: 'blue', ongoing: 'green', completed: 'gray' }
  const statusLabels = { upcoming: '即將舉辦', ongoing: '進行中', completed: '已結束' }
  return `
    <div class="card" style="cursor:pointer;" onclick="viewActivity(${a.id})">
      <div style="background:${a.status==='upcoming'?'#003153':a.status==='ongoing'?'#008000':'#94a3b8'};height:6px;"></div>
      <div class="card-body">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
          <span class="badge ${statusColors[a.status]}">${statusLabels[a.status]}</span>
          <span style="font-size:0.75rem;color:#94a3b8;">${a.date}</span>
        </div>
        <h4 style="font-size:0.95rem;font-weight:700;color:#003153;margin-bottom:4px;">${a.title}</h4>
        <div style="font-size:0.78rem;color:#64748b;margin-bottom:8px;">🎭 ${a.club} ・ 📍 ${a.location}</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;">
          ${(a.tags||[]).map(tag => `<span class="badge gray">${tag}</span>`).join('')}
        </div>
        <div style="margin-top:8px;font-size:0.78rem;color:#64748b;">👥 ${a.participants} 人參加</div>
      </div>
    </div>
  `
}

async function filterActivities(tag) {
  const acts = await fetchData(`/activities${tag ? `?tag=${tag}` : ''}`) || []
  const grid = document.getElementById('activities-grid')
  if (grid) grid.innerHTML = acts.map(a => renderActivityCard(a)).join('')
}

function viewActivity(id) {
  toast(`查看活動 #${id} 詳情`, 'info')
}

// ════════════════════════════════════════════
// PORTFOLIO PAGE
// ════════════════════════════════════════════
async function renderPortfolio(container) {
  const data = await fetchData(`/portfolio/${state.user?.id || 1}`)
  const p = data || {
    name: state.user?.name, student_id: state.user?.id,
    skills: ['JavaScript', '專案管理', '公眾演講'],
    activities: [{ name: '資管盃競賽', role: '參賽者', date: '2025-11-20', achievement: '第二名' }],
    certificates: [{ name: '幹部知能研習結業', issuer: '輔仁大學', date: '2025-10-15' }],
    total_volunteer_hours: 24, credit_score: state.user?.credit || 88
  }
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">🎓</div>
      <div><div class="page-title">E-Portfolio</div><div class="page-subtitle">個人學習履歷</div></div>
    </div>
    <div class="page-body">
      <div class="portfolio-header-card">
        <div class="portfolio-avatar">${(p.name||'U').charAt(0)}</div>
        <div>
          <div class="portfolio-name">${p.name}</div>
          <div class="portfolio-id">學號：${p.student_id}</div>
          <div style="margin-top:8px;">${(p.skills||[]).map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
        </div>
        <div style="margin-left:auto;text-align:right;">
          <div style="font-size:0.8rem;opacity:0.8;">信用積分</div>
          <div style="font-size:2rem;font-weight:800;">${p.credit_score}</div>
          <div style="font-size:0.8rem;opacity:0.8;">志工時數 ${p.total_volunteer_hours}h</div>
        </div>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title">🏆 活動紀錄</div></div>
          <div class="card-body">
            ${(p.activities||[]).map(a=>`
              <div style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                <div style="font-weight:600;">${a.name}</div>
                <div style="font-size:0.78rem;color:#64748b;">${a.role} ・ ${a.date} ${a.achievement?'・'+a.achievement:''} ${a.hours?'・'+a.hours+'h':''}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">🎖️ 證書</div></div>
          <div class="card-body">
            ${(p.certificates||[]).map(c=>`
              <div style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                <div style="font-weight:600;">${c.name}</div>
                <div style="font-size:0.78rem;color:#64748b;">${c.issuer} ・ ${c.date}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="card mt-16">
        <div class="card-header"><div class="card-title">🎯 職能成長雷達</div></div>
        <div class="card-body"><div class="chart-wrap tall"><canvas id="portfolio-radar"></canvas></div></div>
      </div>
    </div>
  `
  createRadarChart('portfolio-radar', ['溝通', '領導', '技術', '創意', '執行', '合作'], [75, 70, 88, 72, 80, 85])
}

// ════════════════════════════════════════════
// USERS PAGE
// ════════════════════════════════════════════
async function renderUsers(container) {
  if (!['admin', 'it_admin'].includes(state.user?.role)) {
    container.innerHTML = `
      <div class="page-header"><div class="page-icon">🔒</div><div><div class="page-title">用戶管理</div></div></div>
      <div class="page-body"><div class="card"><div class="card-body"><p style="color:#94a3b8;text-align:center;padding:40px;">⚠️ 無權限，僅限管理員存取</p></div></div></div>
    `
    return
  }
  const users = await fetchData('/users') || []
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">👥</div>
      <div><div class="page-title">用戶管理</div><div class="page-subtitle">${users.length} 位用戶</div></div>
    </div>
    <div class="page-body">
      <div class="card">
        <div class="card-header">
          <div class="card-title">用戶列表</div>
          <button class="btn btn-primary btn-sm" onclick="toast('新增用戶功能開發中', 'info')">+ 新增</button>
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>姓名</th><th>學號</th><th>Email</th><th>角色</th><th>信用</th><th>操作</th></tr></thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>${u.name}</td>
                  <td>${u.student_id}</td>
                  <td style="font-size:0.78rem;">${u.email}</td>
                  <td><span class="badge blue">${getRoleLabel(u.role)}</span></td>
                  <td><span style="color:${u.credit_score>=90?'#008000':u.credit_score>=70?'#b8860b':'#ff0000'};font-weight:700;">${u.credit_score}</span></td>
                  <td>
                    <button class="btn btn-outline btn-sm" onclick="viewUserDetail(${u.id})">詳情</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card mt-16">
        <div class="card-header"><div class="card-title">📋 信用扣分紀錄 (credit_logs)</div></div>
        <div class="card-body">
          ${state.creditLogs.length ? `
            <table class="data-table">
              <thead><tr><th>時間</th><th>動作</th><th>變更</th><th>原因</th></tr></thead>
              <tbody>
                ${state.creditLogs.slice(-10).reverse().map(log => `
                  <tr>
                    <td style="font-size:0.75rem;">${new Date(log.timestamp).toLocaleString()}</td>
                    <td>${log.action}</td>
                    <td><span style="color:${log.change>=0?'#008000':'#ff0000'};font-weight:700;">${log.change >= 0 ? '+' : ''}${log.change}</span></td>
                    <td style="font-size:0.78rem;color:#64748b;">${log.reason}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : '<p style="color:#94a3b8;text-align:center;padding:20px;">暫無信用扣分紀錄</p>'}
        </div>
      </div>
    </div>
  `
}

function viewUserDetail(id) {
  showModal(`<div style="padding:10px;"><h3 style="color:#003153;">用戶 #${id} 詳情</h3><p style="color:#94a3b8;margin-top:12px;">載入中...</p></div>`)
}

// ════════════════════════════════════════════
// AI TOOLS PAGE
// ════════════════════════════════════════════
function renderAITools(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">🤖</div>
      <div><div class="page-title">AI 工具</div><div class="page-subtitle">智能問答・法規查詢・預約流程</div></div>
    </div>
    <div class="page-body">
      <!-- Tab Navigation -->
      <div style="display:flex;gap:0;margin-bottom:16px;background:#f1f5f9;border-radius:8px;padding:4px;">
        <button class="ai-tab-btn active" id="tab-nav" onclick="switchAITab('nav')" style="flex:1;padding:8px;border:none;background:#003153;color:#fff;border-radius:6px;font-size:0.82rem;font-weight:600;cursor:pointer;">🗺️ AI 導覽</button>
        <button class="ai-tab-btn" id="tab-regs" onclick="switchAITab('regs')" style="flex:1;padding:8px;border:none;background:transparent;color:#64748b;border-radius:6px;font-size:0.82rem;font-weight:600;cursor:pointer;">📜 法規查詢</button>
        <button class="ai-tab-btn" id="tab-venue" onclick="switchAITab('venue')" style="flex:1;padding:8px;border:none;background:transparent;color:#64748b;border-radius:6px;font-size:0.82rem;font-weight:600;cursor:pointer;">📅 預約流程</button>
        <button class="ai-tab-btn" id="tab-plan" onclick="switchAITab('plan')" style="flex:1;padding:8px;border:none;background:transparent;color:#64748b;border-radius:6px;font-size:0.82rem;font-weight:600;cursor:pointer;">📝 企劃生成</button>
      </div>

      <!-- AI Nav Tab -->
      <div id="ai-tab-nav">
        <div class="card">
          <div class="card-header"><div class="card-title">🗺️ AI 校園導覽查詢</div></div>
          <div class="card-body">
            <div class="faq-chips">
              ${['焯炤館在哪裡？','如何預約場地？','圖書館電梯在哪？','信用點數如何扣款？','活動申請需要多久？'].map(q=>`<span class="faq-chip" onclick="askNavAI('${q}')">${q}</span>`).join('')}
            </div>
            <div class="ai-chat-box" id="ai-nav-chat">
              <div class="chat-bubble received">👋 您好！我是 FJU Smart Hub AI 助理，我可以幫您查詢校園設施位置、預約流程及相關規定。請問有什麼可以協助您？</div>
            </div>
            <div class="d-flex gap-8">
              <input type="text" class="form-control" id="ai-nav-input" placeholder="輸入問題，例如：焯炤館在哪裡？" onkeypress="if(event.key==='Enter')sendNavAI()" />
              <button class="btn btn-primary" onclick="sendNavAI()">發送</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Regulations RAG Tab -->
      <div id="ai-tab-regs" style="display:none;">
        <div class="card">
          <div class="card-header"><div class="card-title">📜 法規查詢 RAG</div></div>
          <div class="card-body">
            <div class="faq-chips">
              ${['場地提前幾天申請？','信用點數如何扣款？','社團評鑑標準？','未歸還器材罰則？','活動申辦流程？'].map(q=>`<span class="faq-chip" onclick="askRegsAI('${q}')">${q}</span>`).join('')}
            </div>
            <div id="regs-result" style="display:none;" class="card" style="background:#f8fafc;"></div>
            <div class="d-flex gap-8 mt-16">
              <input type="text" class="form-control" id="regs-input" placeholder="請輸入法規相關問題..." onkeypress="if(event.key==='Enter')sendRegsAI()" />
              <button class="btn btn-primary" onclick="sendRegsAI()">查詢</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Venue RAG Tab -->
      <div id="ai-tab-venue" style="display:none;">
        <div class="card">
          <div class="card-header"><div class="card-title">📅 場地預約流程 RAG</div></div>
          <div class="card-body">
            <div class="phase-indicator" style="margin-bottom:16px;">
              <div class="phase-step active"><div class="phase-circle active">1</div><div class="phase-label">志願序申請</div></div>
              <div class="phase-step"><div class="phase-circle">2</div><div class="phase-label">衝突協商</div></div>
              <div class="phase-step"><div class="phase-circle">3</div><div class="phase-label">官方核定</div></div>
            </div>
            <div class="faq-chips">
              ${['社長如何提交申請？','場地衝突如何協商？','如何上訴拒絕決定？','查詢申請進度？'].map(q=>`<span class="faq-chip" onclick="askVenueAI('${q}')">${q}</span>`).join('')}
            </div>
            <div id="venue-rag-result" style="display:none;"></div>
            <div class="d-flex gap-8 mt-16">
              <input type="text" class="form-control" id="venue-rag-input" placeholder="請描述您的預約需求..." onkeypress="if(event.key==='Enter')sendVenueAI()" />
              <button class="btn btn-primary" onclick="sendVenueAI()">查詢流程</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Plan Generator Tab -->
      <div id="ai-tab-plan" style="display:none;">
        <div class="card">
          <div class="card-header"><div class="card-title">📝 AI 活動企劃生成器</div></div>
          <div class="card-body">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">活動名稱</label>
                <input type="text" class="form-control" id="plan-name" placeholder="例：程式競賽" />
              </div>
              <div class="form-group">
                <label class="form-label">社團名稱</label>
                <input type="text" class="form-control" id="plan-club" placeholder="例：資管系學會" />
              </div>
              <div class="form-group">
                <label class="form-label">預計人數</label>
                <input type="number" class="form-control" id="plan-participants" value="100" />
              </div>
              <div class="form-group">
                <label class="form-label">活動類型</label>
                <select class="form-control" id="plan-type">
                  <option>學術競賽</option><option>文藝展演</option><option>志工服務</option><option>講座論壇</option>
                </select>
              </div>
            </div>
            <button class="btn btn-primary w-full" onclick="generatePlan()">🤖 AI 生成企劃書</button>
            <div id="plan-result" class="mt-16"></div>
          </div>
        </div>
      </div>
    </div>
  `
}

function switchAITab(tab) {
  ['nav','regs','venue','plan'].forEach(t => {
    const el = document.getElementById(`ai-tab-${t}`)
    const btn = document.getElementById(`tab-${t}`)
    if (el) el.style.display = t === tab ? 'block' : 'none'
    if (btn) {
      btn.style.background = t === tab ? '#003153' : 'transparent'
      btn.style.color = t === tab ? '#fff' : '#64748b'
    }
  })
}

async function sendNavAI() {
  const input = document.getElementById('ai-nav-input')
  const chat = document.getElementById('ai-nav-chat')
  if (!input || !chat || !input.value.trim()) return
  const msg = input.value.trim(); input.value = ''
  chat.innerHTML += `<div class="chat-bubble sent">${msg}</div>`
  chat.innerHTML += `<div class="ai-typing"><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div><div class="ai-typing-dot"></div></div>`
  chat.scrollTop = chat.scrollHeight
  const res = await postData('/ai/navigate', { message: msg })
  chat.querySelector('.ai-typing')?.remove()
  if (res) {
    chat.innerHTML += `
      <div class="chat-bubble received">
        ${res.answer}
        ${res.confidence ? `<div style="font-size:0.7rem;opacity:0.7;margin-top:4px;">信心度：${Math.round(res.confidence * 100)}% | ${res.source}</div>` : ''}
      </div>`
    chat.scrollTop = chat.scrollHeight
  }
}

async function askNavAI(question) {
  const input = document.getElementById('ai-nav-input')
  if (input) { input.value = question; await sendNavAI() }
}

async function sendRegsAI() {
  const input = document.getElementById('regs-input')
  const result = document.getElementById('regs-result')
  if (!input || !input.value.trim()) return
  const query = input.value.trim()
  if (result) { result.style.display = 'block'; result.innerHTML = '<div class="loader"><div class="loader-spinner"></div></div>' }
  const res = await postData('/ai/regulations', { query })
  if (result && res) {
    result.innerHTML = `
      <div style="padding:12px;">
        <div style="font-weight:700;color:#003153;margin-bottom:8px;">📜 ${query}</div>
        <p style="font-size:0.85rem;line-height:1.6;">${res.answer}</p>
        ${res.sources ? `<div class="rag-sources">${res.sources.map(s=>`<span class="rag-source">📖 ${s.title} ${s.article}</span>`).join('')}</div>` : ''}
        ${res.confidence ? `<div style="font-size:0.75rem;color:#94a3b8;margin-top:6px;">信心度：${Math.round(res.confidence*100)}%</div>` : ''}
      </div>
    `
  }
}

function askRegsAI(q) { const i = document.getElementById('regs-input'); if(i){i.value=q;sendRegsAI()} }

async function sendVenueAI() {
  const input = document.getElementById('venue-rag-input')
  const result = document.getElementById('venue-rag-result')
  if (!input || !input.value.trim()) return
  const req = input.value.trim()
  if (result) { result.style.display = 'block'; result.innerHTML = '<div class="loader"><div class="loader-spinner"></div></div>' }
  const res = await postData('/ai/venue-workflow', { requirement: req })
  if (result && res) {
    result.innerHTML = `
      <div style="padding:12px;">
        <div style="font-weight:700;color:#003153;margin-bottom:12px;">📅 預約流程建議</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${(res.workflow_steps||[]).map(step=>`
            <div style="display:flex;gap:10px;align-items:flex-start;">
              <div style="width:24px;height:24px;border-radius:50%;background:#003153;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">${step.step}</div>
              <div>
                <div style="font-weight:600;">${step.title}</div>
                <div style="font-size:0.78rem;color:#64748b;">${step.desc} (${step.duration})</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:12px;padding:10px;background:#f1f5f9;border-radius:8px;font-size:0.82rem;">${res.recommendation}</div>
      </div>
    `
  }
}

function askVenueAI(q) { const i = document.getElementById('venue-rag-input'); if(i){i.value=q;sendVenueAI()} }

async function generatePlan() {
  const name = document.getElementById('plan-name')?.value
  const club = document.getElementById('plan-club')?.value
  const participants = document.getElementById('plan-participants')?.value
  const type = document.getElementById('plan-type')?.value
  if (!name || !club) { toast('請填寫活動名稱和社團名稱', 'error'); return }
  const result = document.getElementById('plan-result')
  if (result) result.innerHTML = '<div class="loader"><div class="loader-spinner"></div></div>'
  const res = await postData('/ai/generate-plan', { event_name: name, club_name: club, expected_participants: parseInt(participants), event_type: type })
  if (result && res?.data) {
    result.innerHTML = `
      <div class="card">
        <div class="card-header"><div class="card-title">📄 ${res.data.title}</div><span class="badge ${res.data.compliance_check==='PASSED'?'green':'red'}">${res.data.compliance_check==='PASSED'?'✅ 合規':'⚠️ 需審核'}</span></div>
        <div class="card-body">
          ${res.data.sections.map(s=>`
            <div style="margin-bottom:12px;">
              <div style="font-weight:700;color:#003153;margin-bottom:4px;">📌 ${s.title}</div>
              <div style="font-size:0.85rem;color:#64748b;">${s.content}</div>
            </div>
          `).join('')}
          <div style="padding:10px;background:#f1f5f9;border-radius:8px;font-weight:700;color:#003153;">
            💰 預估總預算：NT$ ${res.data.estimated_budget?.toLocaleString()}
          </div>
        </div>
      </div>
    `
  }
}

// ════════════════════════════════════════════
// SETTINGS PAGE
// ════════════════════════════════════════════
function renderSettings(container) {
  container.innerHTML = `
    <div class="page-header">
      <div class="page-icon">⚙️</div>
      <div><div class="page-title">系統設定</div><div class="page-subtitle">帳號及系統偏好設定</div></div>
    </div>
    <div class="page-body">
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><div class="card-title">👤 帳號設定</div></div>
          <div class="card-body">
            <div class="form-group"><label class="form-label">姓名</label><input type="text" class="form-control" value="${state.user?.name}" /></div>
            <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-control" value="${state.user?.email}" /></div>
            <div class="form-group">
              <label class="form-label">介面語言</label>
              <select class="form-control" onchange="state.lang=this.value;refreshUILabels()">
                ${langList.map(l=>`<option value="${l}" ${state.lang===l?'selected':''}>${langLabels[l]}</option>`).join('')}
              </select>
            </div>
            <button class="btn btn-primary" onclick="toast('設定已儲存','success')">儲存設定</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">🔒 安全設定 (2FA)</div></div>
          <div class="card-body">
            <div style="font-size:0.85rem;line-height:1.6;">
              <p>✅ Google 登入已連結</p>
              <p style="margin-top:8px;">🔐 2FA 狀態：<span class="badge green">已啟用</span></p>
              <p style="margin-top:8px;">📱 TOTP 設定：已完成</p>
              <p style="margin-top:8px;">💬 SMS 備援：已設定</p>
            </div>
            <button class="btn btn-outline mt-16" onclick="toast('2FA 重設功能開發中','info')">重設 2FA</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">🔔 通知設定</div></div>
          <div class="card-body">
            ${[{key:'場地申請結果',on:true},{key:'器材歸還提醒',on:true},{key:'衝突協商通知',on:true},{key:'Line Notify',on:false},{key:'Outlook 同步',on:false}].map(s=>`
              <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #f1f5f9;">
                <span style="font-size:0.85rem;">${s.key}</span>
                <span class="badge ${s.on?'green':'gray'}">${s.on?'開啟':'關閉'}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">📊 已讀回條紀錄</div></div>
          <div class="card-body" style="max-height:200px;overflow-y:auto;">
            ${Object.entries(state.readReceipts).length ? 
              Object.entries(state.readReceipts).map(([token, data]) => `
                <div style="font-size:0.75rem;padding:4px 0;border-bottom:1px solid #f1f5f9;">
                  <strong>${token}</strong>: ${new Date(data.timestamp).toLocaleTimeString()} (IP: ${data.ip})
                </div>
              `).join('') : 
              '<p style="color:#94a3b8;font-size:0.8rem;text-align:center;padding:10px;">暫無已讀紀錄</p>'
            }
          </div>
        </div>
      </div>
    </div>
  `
}

// ════════════════════════════════════════════
// LOGOUT
// ════════════════════════════════════════════
function logout() {
  clearNegoTimer()
  Object.keys(state.charts).forEach(id => destroyChart(id))
  state.user = null
  state.currentPage = 'map'
  const appRoot = document.getElementById('app-root')
  appRoot.classList.remove('active')
  appRoot.innerHTML = ''
  document.getElementById('avatar-menu')?.classList.remove('open')

  // Show landing
  const landing = document.getElementById('landing-page')
  landing.style.display = 'flex'
  landing.style.opacity = '0'
  renderLanding()
  requestAnimationFrame(() => { landing.style.opacity = '1' })
  toast('👋 已成功登出', 'info')
}

// ════════════════════════════════════════════
// GLOBAL WINDOW BINDINGS
// ════════════════════════════════════════════
Object.assign(window, {
  showLogin, backToLanding, demoLogin, selectRole, changeLang, logout,
  navigateTo, toggleCalendarPanel, toggleNotifPanel, toggleAvatarMenu,
  calPrevMonth, calNextMonth, calSelectDay, calClickEvent,
  closeCalManagement, calMgmtDayClick, renderCalManagementPage,
  openNegotiationDialog, closeNegotiationDialog, sendNegoMsg,
  completeNegotiation, acceptSuggestion,
  setMapFilter, flyToBuilding, fetchBuildingStatus, openReservationFromMap,
  closeModal, showModal, toast,
  submitReservation, viewReservation, loadReservations,
  borrowEquipment, viewClub, filterClubs, filterActivities, viewActivity,
  readNotification, markAllRead, confirmMandatoryNotif,
  switchAITab, sendNavAI, askNavAI, sendRegsAI, askRegsAI, sendVenueAI, askVenueAI, generatePlan,
  viewUserDetail
})

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  renderLanding()
})
