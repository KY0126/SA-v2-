import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { jwt } from 'hono/jwt'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database
  KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

// Middleware
app.use('*', logger())
app.use('/api/*', cors({
  origin: ['https://fju-smart-hub.pages.dev', 'http://localhost:3000'],
  allowHeaders: ['Authorization', 'Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))

// Static files
app.use('/static/*', serveStatic({ root: './public' }))

// ─────────────────────────────────────────────
// AUTH ROUTES
// ─────────────────────────────────────────────
app.get('/api/auth/me', async (c) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  return c.json({ user: { id: 1, name: 'Demo User', role: 'student', email: 'demo@cloud.fju.edu.tw' } })
})

app.post('/api/auth/google', async (c) => {
  const { code } = await c.req.json()
  // Validate @cloud.fju.edu.tw domain
  return c.json({
    token: 'demo-jwt-token',
    user: { id: 1, name: 'Demo', role: 'student', email: 'demo@cloud.fju.edu.tw', credit: 100 }
  })
})

// ─────────────────────────────────────────────
// RESERVATION ROUTES (三階段預約)
// ─────────────────────────────────────────────
app.get('/api/venues', async (c) => {
  const { DB } = c.env
  try {
    const results = await DB.prepare('SELECT * FROM venues ORDER BY name').all()
    return c.json(results.results)
  } catch {
    return c.json([
      { id: 1, name: '焯炤館演講廳', capacity: 300, type: 'lecture', available: true },
      { id: 2, name: '仁愛空間', capacity: 50, type: 'meeting', available: true },
      { id: 3, name: '進修部演講廳', capacity: 200, type: 'lecture', available: false },
      { id: 4, name: '潛水艇的天空', capacity: 30, type: 'creative', available: true },
      { id: 5, name: '圖書館研討室', capacity: 20, type: 'study', available: true },
    ])
  }
})

app.post('/api/reservations', async (c) => {
  const body = await c.req.json()
  const { venue_id, start_time, end_time, purpose, priority_slots, role } = body

  // Validate request
  if (!venue_id || !start_time || !purpose) {
    return c.json({ error: '缺少必要欄位' }, 400)
  }

  // Simulate AI pre-screening
  const aiResult = await screenReservation(purpose, role)

  if (aiResult.risk_level === 'High') {
    return c.json({
      status: 'REJECTED',
      reason: aiResult.reasoning,
      tags: aiResult.suggested_tags
    }, 422)
  }

  const { DB } = c.env
  let reservationId = Math.floor(Math.random() * 10000)

  try {
    const stmt = await DB.prepare(`
      INSERT INTO reservations (user_id, venue_id, start_time, end_time, purpose, status, ai_risk_level, weight_level)
      VALUES (?, ?, ?, ?, ?, 'PENDING', ?, ?)
    `).bind(1, venue_id, start_time, end_time, purpose, aiResult.risk_level, role === 'admin' ? 1 : role === 'club_officer' ? 2 : 3)
    const result = await stmt.run()
    reservationId = result.meta.last_row_id as number
  } catch {}

  return c.json({
    id: reservationId,
    status: aiResult.risk_level === 'Medium' ? 'PENDING_MANUAL_REVIEW' : 'APPROVED',
    ai_screening: aiResult,
    message: aiResult.risk_level === 'Medium' ? '已提交，待人工審核' : '預約成功'
  })
})

app.get('/api/reservations', async (c) => {
  const { DB } = c.env
  try {
    const results = await DB.prepare('SELECT * FROM reservations ORDER BY created_at DESC LIMIT 20').all()
    return c.json(results.results)
  } catch {
    return c.json([
      { id: 1, venue: '焯炤館演講廳', user: '資工系學會', start: '2026-04-10 09:00', end: '2026-04-10 12:00', status: 'APPROVED', priority: 2 },
      { id: 2, venue: '仁愛空間', user: '攝影社', start: '2026-04-10 14:00', end: '2026-04-10 17:00', status: 'PENDING_MANUAL_REVIEW', priority: 3 },
      { id: 3, venue: '進修部演講廳', user: '學生會', start: '2026-04-11 10:00', end: '2026-04-11 16:00', status: 'APPROVED', priority: 1 },
    ])
  }
})

app.patch('/api/reservations/:id/status', async (c) => {
  const id = c.req.param('id')
  const { status } = await c.req.json()
  return c.json({ id, status, updated_at: new Date().toISOString() })
})

// ─────────────────────────────────────────────
// CLUBS ROUTES
// ─────────────────────────────────────────────
app.get('/api/clubs', async (c) => {
  const { DB } = c.env
  try {
    const results = await DB.prepare('SELECT * FROM clubs ORDER BY category, name').all()
    return c.json(results.results)
  } catch {
    return c.json([
      { id: 1, name: '資管系學會', category: '系學會', members: 120, credit: 95, status: 'active' },
      { id: 2, name: '攝影社', category: '學藝', members: 45, credit: 88, status: 'active' },
      { id: 3, name: '籃球社', category: '體育', members: 80, credit: 92, status: 'active' },
      { id: 4, name: '圍棋社', category: '學藝', members: 30, credit: 100, status: 'active' },
      { id: 5, name: '服務隊', category: '服務', members: 60, credit: 98, status: 'active' },
    ])
  }
})

app.get('/api/clubs/:id', async (c) => {
  const id = c.req.param('id')
  return c.json({
    id, name: '資管系學會', category: '系學會', members: 120, credit: 95,
    description: '輔仁大學資訊管理學系學生自治組織',
    advisor: '陳教授', contact: 'imsa@cloud.fju.edu.tw',
    social: { ig: 'fjuimsa', fb: 'fjuimsa' },
    achievements: ['113年最佳系學會', '112年優秀活動獎'],
    activities: [
      { name: '系友交流日', date: '2026-03-15', participants: 80 },
      { name: '程式設計工作坊', date: '2026-03-28', participants: 45 }
    ]
  })
})

// ─────────────────────────────────────────────
// EQUIPMENT ROUTES (器材借用)
// ─────────────────────────────────────────────
app.get('/api/equipment', async (c) => {
  return c.json([
    { id: 1, name: '無線麥克風', qty_total: 10, qty_available: 7, category: '音響', location: '課指組倉庫' },
    { id: 2, name: '投影機', qty_total: 5, qty_available: 3, category: '視聽', location: '總務處' },
    { id: 3, name: '折疊桌', qty_total: 30, qty_available: 22, category: '傢俱', location: 'B1倉庫' },
    { id: 4, name: '音響主機', qty_total: 3, qty_available: 2, category: '音響', location: '課指組倉庫' },
    { id: 5, name: '帳篷', qty_total: 8, qty_available: 5, category: '戶外', location: 'B1倉庫' },
  ])
})

app.post('/api/equipment/borrow', async (c) => {
  const body = await c.req.json()
  return c.json({
    id: Math.floor(Math.random() * 1000),
    status: 'APPROVED',
    return_date: body.return_date,
    totp_qr: `otpauth://totp/FJU:equipment-${Date.now()}?secret=BASE32SECRET&issuer=FJUSmartHub`,
    message: '借用申請成功，請掃描 QR Code 完成確認'
  })
})

// ─────────────────────────────────────────────
// USER MANAGEMENT ROUTES
// ─────────────────────────────────────────────
app.get('/api/users', async (c) => {
  const { DB } = c.env
  try {
    const results = await DB.prepare('SELECT id, name, student_id, email, role, credit_score, created_at FROM users LIMIT 50').all()
    return c.json(results.results)
  } catch {
    return c.json([
      { id: 1, name: '王小明', student_id: '112071001', email: 'a112071001@cloud.fju.edu.tw', role: 'student', credit_score: 95 },
      { id: 2, name: '李美華', student_id: '112071002', email: 'a112071002@cloud.fju.edu.tw', role: 'club_officer', credit_score: 88 },
      { id: 3, name: '陳大維', student_id: '112071003', email: 'a112071003@cloud.fju.edu.tw', role: 'student', credit_score: 72 },
    ])
  }
})

// ─────────────────────────────────────────────
// DASHBOARD ROUTES
// ─────────────────────────────────────────────
app.get('/api/dashboard/:role', async (c) => {
  const role = c.req.param('role')

  const dashboards: Record<string, object> = {
    admin: {
      role: 'admin',
      stats: { total_clubs: 87, active_reservations: 23, pending_review: 7, total_users: 1240 },
      charts: [
        { type: 'line', title: '社團參與率趨勢', labels: ['1月', '2月', '3月', '4月'], values: [820, 950, 1100, 1230] },
        { type: 'pie', title: '活動類型分佈', labels: ['學藝', '康樂', '服務', '體育', '學術'], values: [32, 25, 18, 15, 10] },
        { type: 'bar', title: '場地周轉率', labels: ['焯炤館', '仁愛空間', '進修部講廳', '圖書館'], values: [85, 72, 91, 68] },
        { type: 'radar', title: 'SDGs 貢獻度', labels: ['優質教育', '夥伴關係', '健康福祉', '性別平等', '減少不平等'], values: [90, 75, 82, 88, 70] },
      ]
    },
    club_officer: {
      role: 'club_officer',
      stats: { members: 45, upcoming_events: 3, credit_score: 88, pending_items: 2 },
      charts: [
        { type: 'line', title: '社員成長趨勢', labels: ['9月', '10月', '11月', '12月', '1月'], values: [30, 35, 40, 42, 45] },
        { type: 'pie', title: '活動滿意度', labels: ['5星', '4星', '3星', '2星', '1星'], values: [45, 35, 15, 3, 2] },
        { type: 'radar', title: '社團績效考核', labels: ['活動頻率', '行政配合', '預算控管', '法規遵守', '社員滿意'], values: [85, 92, 70, 95, 88] },
        { type: 'gauge', title: '信用點數', current_value: 88, status: 'Healthy' },
      ]
    },
    professor: {
      role: 'professor',
      stats: { guided_clubs: 2, total_activities: 12, students_guided: 65 },
      charts: [
        { type: 'radar', title: '社團績效考核', labels: ['活動頻率', '行政配合', '預算控管', '法規遵守'], values: [85, 92, 70, 95] },
        { type: 'heatmap', title: '活動分佈熱力圖', data: [[1,2,3],[2,3,1],[3,1,2]] },
        { type: 'spider', title: '學生職能成長', labels: ['溝通', '領導', '技術', '創意', '執行'], values: [80, 75, 90, 70, 85] },
      ]
    },
    student: {
      role: 'student',
      stats: { activities_joined: 8, volunteer_hours: 12, skill_tags: 5, credit_score: 95 },
      charts: [
        { type: 'bar', title: '個人活動履歷', labels: ['9月', '10月', '11月', '12月', '1月', '2月'], values: [1, 2, 1, 0, 2, 2] },
        { type: 'spider', title: '職能成長里程碑', labels: ['溝通', '領導', '技術', '創意', '執行'], values: [70, 65, 88, 75, 72] },
      ],
      recommendations: [
        { id: 1, name: '資訊安全讀書會', type: '讀書會', match: 92 },
        { id: 2, name: '創業之夜講座', type: '講座', match: 85 },
        { id: 3, name: '程式設計社', type: '社團', match: 90 },
      ]
    },
    it_admin: {
      role: 'it_admin',
      stats: { api_uptime: '99.8%', blocked_attacks: 127, storage_used: '45GB', active_sessions: 89 },
      charts: [
        { type: 'line', title: 'API 請求延遲 (ms)', labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'], values: [45, 32, 120, 250, 180, 95] },
        { type: 'pie', title: 'R2 存儲利用率', labels: ['活動照片', '申請文件', '系統備份', '其他'], values: [60, 25, 10, 5] },
      ]
    }
  }

  return c.json(dashboards[role] || dashboards['student'])
})

// ─────────────────────────────────────────────
// AI NAVIGATION QUERY (Mock Dify RAG)
// ─────────────────────────────────────────────
app.post('/api/ai/navigate', async (c) => {
  const { message } = await c.req.json()
  if (!message) return c.json({ error: '請輸入問題' }, 400)
  // In production, call Dify API: POST https://api.dify.ai/v1/chat-messages
  return c.json({
    task_id: `nav-${Date.now()}`,
    answer: `關於「${message}」，根據輔仁大學校園地圖及設施資料庫：焯炤館演講廳位於校園中央北側，容量300人。如需預約，請至少提前3天申請。`,
    source: 'FJU Campus AI Navigator',
    confidence: 0.92
  })
})

// ─────────────────────────────────────────────
// REGULATIONS RAG (Dify Knowledge Base)
// ─────────────────────────────────────────────
app.post('/api/ai/regulations', async (c) => {
  const { query } = await c.req.json()
  if (!query) return c.json({ error: '請輸入法規問題' }, 400)
  return c.json({
    task_id: `reg-${Date.now()}`,
    answer: `依據《輔仁大學學生社團活動管理辦法》相關條文，針對「${query}」的規定如下...`,
    sources: [
      { title: '學生社團活動管理辦法', article: '第三條', relevance: 0.95 },
      { title: '場地管理辦法', article: '第五條', relevance: 0.88 }
    ],
    confidence: 0.90
  })
})

// ─────────────────────────────────────────────
// VENUE BOOKING WORKFLOW RAG
// ─────────────────────────────────────────────
app.post('/api/ai/venue-workflow', async (c) => {
  const { requirement } = await c.req.json()
  if (!requirement) return c.json({ error: '請描述預約需求' }, 400)
  return c.json({
    task_id: `venue-${Date.now()}`,
    workflow_steps: [
      { step: 1, title: '志願序申請', desc: '填寫活動資訊與場地志願序', duration: '30分鐘審核' },
      { step: 2, title: '衝突協商', desc: 'LINE Notify 通知，48小時協商', duration: '1-2天' },
      { step: 3, title: '官方核定', desc: '課指組審核，發送PDF確認單', duration: '3-5天' }
    ],
    recommendation: `針對「${requirement}」，建議選擇焯炤館或學生活動中心，並提前7天申請。`,
    confidence: 0.94
  })
})

// ─────────────────────────────────────────────
// CAMPUS MAP API
// ─────────────────────────────────────────────
app.get('/api/campus/buildings', async (c) => {
  return c.json([
    { id: 1, name: '焯炤館', type: 'auditorium', capacity: 300, accessible: true, elevator: false, restroom: true, reservable: true, lat: 25.033, lng: 121.433, desc: '主要演講廳，適合大型活動' },
    { id: 2, name: '仁愛空間', type: 'meeting', capacity: 50, accessible: true, elevator: false, restroom: true, reservable: true, lat: 25.032, lng: 121.432, desc: '課指組辦公室旁，中型會議空間' },
    { id: 3, name: '進修部演講廳', type: 'auditorium', capacity: 200, accessible: true, elevator: true, restroom: false, reservable: true, lat: 25.034, lng: 121.434, desc: '進修部主要講堂' },
    { id: 4, name: '潛水艇的天空', type: 'creative', capacity: 30, accessible: false, elevator: false, restroom: false, reservable: true, lat: 25.031, lng: 121.431, desc: '創意工作坊空間' },
    { id: 5, name: '圖書館研討室', type: 'study', capacity: 20, accessible: true, elevator: true, restroom: true, reservable: true, lat: 25.033, lng: 121.430, desc: '圖書館B1-6F均有無障礙設施' },
    { id: 6, name: '體育館', type: 'sports', capacity: 500, accessible: true, elevator: false, restroom: true, reservable: false, lat: 25.030, lng: 121.432, desc: '籃球、羽球等體育活動' },
    { id: 7, name: '學生活動中心', type: 'multipurpose', capacity: 100, accessible: true, elevator: true, restroom: true, reservable: true, lat: 25.032, lng: 121.435, desc: '社辦及多功能室' },
    { id: 8, name: '宗倫樓', type: 'hall', capacity: 400, accessible: true, elevator: true, restroom: true, reservable: false, lat: 25.035, lng: 121.436, desc: '大禮堂及教室群' },
  ])
})

app.get('/api/campus/accessibility', async (c) => {
  return c.json({
    ramps: ['焯炤館正門', '進修部演講廳', '仁愛空間', '學生活動中心', '宗倫樓'],
    elevators: ['圖書館(B1-6F)', '行政大樓(1-5F)', '宗倫樓(1-4F)', '學生活動中心(1-3F)', '進修部(1-3F)'],
    restrooms: ['焯炤館一樓', '圖書館各樓層', '學生活動中心', '醫學院', '體育館'],
    parking: ['P1停車場入口（20個無障礙車位）', '圖書館旁停車區（5個）'],
    total_accessible_buildings: 7,
    last_updated: '2026-01-15'
  })
})

// ─────────────────────────────────────────────
// AI SCREENING (Dify Integration Mock)
// ─────────────────────────────────────────────
app.post('/api/ai/screen', async (c) => {
  const body = await c.req.json()
  const result = await screenReservation(body.reason || body.purpose, body.role)
  return c.json(result)
})

app.post('/api/ai/generate-plan', async (c) => {
  const { event_name, event_type, expected_participants, club_name } = await c.req.json()
  return c.json({
    task_id: `dify-plan-${Date.now()}`,
    status: 'success',
    data: {
      title: `${event_name} - 活動企劃書`,
      sections: [
        { title: '活動目的', content: `本次活動旨在促進${club_name}社員交流，提升${event_type}相關能力。` },
        { title: '活動內容', content: `預計舉辦為期一天的${event_name}，涵蓋工作坊、交流分享及成果展示三個環節。` },
        { title: '預算規劃', content: `場地費用：$2,000；餐點費用：$${expected_participants * 150}；器材租借：$1,500` },
        { title: '法規合規性', content: '本活動符合輔仁大學學生社團活動管理辦法第五條相關規定。' },
      ],
      compliance_check: 'PASSED',
      estimated_budget: expected_participants * 300
    }
  })
})

// ─────────────────────────────────────────────
// ACTIVITY WALL (動態活動牆)
// ─────────────────────────────────────────────
app.get('/api/activities', async (c) => {
  const keyword = c.req.query('keyword') || ''
  const tag = c.req.query('tag') || ''

  const activities = [
    { id: 1, title: '2026 資管盃程式競賽', club: '資管系學會', date: '2026-04-20', location: '焯炤館', tags: ['競賽', '程式設計', '資訊'], participants: 150, status: 'upcoming' },
    { id: 2, title: '春季攝影展覽', club: '攝影社', date: '2026-04-15', location: '圖書館大廳', tags: ['展覽', '藝術', '攝影'], participants: 300, status: 'upcoming' },
    { id: 3, title: '服務學習日', club: '服務隊', date: '2026-04-12', location: '校園各地', tags: ['服務', '志工', '社區'], participants: 60, status: 'ongoing' },
    { id: 4, title: '籃球聯誼賽', club: '籃球社', date: '2026-04-08', location: '體育館', tags: ['體育', '競賽', '聯誼'], participants: 80, status: 'completed' },
    { id: 5, title: 'AI 時代創業論壇', club: '創業研究社', date: '2026-04-25', location: '進修部演講廳', tags: ['創業', 'AI', '講座'], participants: 200, status: 'upcoming' },
  ]

  let filtered = activities
  if (keyword) filtered = filtered.filter(a => a.title.includes(keyword) || a.club.includes(keyword))
  if (tag) filtered = filtered.filter(a => a.tags.includes(tag))

  return c.json(filtered)
})

// ─────────────────────────────────────────────
// CREDIT SYSTEM
// ─────────────────────────────────────────────
app.get('/api/credit/:userId', async (c) => {
  const userId = c.req.param('userId')
  return c.json({
    user_id: userId,
    score: 88,
    status: 'Healthy',
    history: [
      { date: '2026-03-01', action: '準時簽到', change: +2, score_after: 90 },
      { date: '2026-03-15', action: '活動未簽到', change: -5, score_after: 85 },
      { date: '2026-03-28', action: '及時取消預約', change: +3, score_after: 88 },
    ]
  })
})

// ─────────────────────────────────────────────
// CALENDAR (全域行事曆)
// ─────────────────────────────────────────────
app.get('/api/calendar', async (c) => {
  const month = c.req.query('month') || '2026-04'
  return c.json({
    month,
    events: [
      { id: 1, title: '資管盃程式競賽', date: '2026-04-20', type: 'competition', club: '資管系學會', venue: '焯炤館' },
      { id: 2, title: '春季攝影展覽', date: '2026-04-15', type: 'exhibition', club: '攝影社', venue: '圖書館大廳' },
      { id: 3, title: '服務學習日', date: '2026-04-12', type: 'service', club: '服務隊', venue: '校園各地' },
      { id: 4, title: '幹部知能研習', date: '2026-04-05', type: 'training', club: '課指組', venue: '焯炤館' },
      { id: 5, title: 'AI 時代創業論壇', date: '2026-04-25', type: 'lecture', club: '創業研究社', venue: '進修部演講廳' },
    ]
  })
})

// ─────────────────────────────────────────────
// E-PORTFOLIO
// ─────────────────────────────────────────────
app.get('/api/portfolio/:userId', async (c) => {
  const userId = c.req.param('userId')
  return c.json({
    user_id: userId,
    name: '王小明',
    student_id: '112071001',
    skills: ['Vue.js', 'Python', '資料分析', '專案管理', '公眾演講'],
    activities: [
      { name: '資管盃競賽', role: '參賽者', date: '2025-11-20', achievement: '第二名' },
      { name: '服務學習', role: '志工', date: '2025-12-10', hours: 8 },
    ],
    certificates: [
      { name: '幹部知能研習結業', issuer: '輔仁大學課外活動指導組', date: '2025-10-15' }
    ],
    total_volunteer_hours: 24,
    credit_score: 95
  })
})

// ─────────────────────────────────────────────
// MAP ELEMENTS (Dynamic Maintenance Status)
// ─────────────────────────────────────────────
app.get('/api/map/building/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const buildings = [
    { id: 1, name: '焯炤館', status: 'available', maintenance_note: null },
    { id: 2, name: '仁愛空間', status: 'available', maintenance_note: null },
    { id: 3, name: '進修部演講廳', status: 'maintenance', maintenance_note: '空調維修，預計 2026-04-15 完工' },
    { id: 4, name: '潛水艇的天空', status: 'available', maintenance_note: null },
    { id: 5, name: '圖書館研討室', status: 'available', maintenance_note: null },
    { id: 6, name: '體育館', status: 'available', maintenance_note: null },
    { id: 7, name: '學生活動中心', status: 'available', maintenance_note: null },
    { id: 8, name: '宗倫樓', status: 'available', maintenance_note: null },
    { id: 9, name: '行政大樓', status: 'available', maintenance_note: null },
    { id: 10, name: '醫學院', status: 'available', maintenance_note: null },
  ]
  const bldg = buildings.find(b => b.id === id)
  if (!bldg) return c.json({ error: 'Building not found' }, 404)
  return c.json(bldg)
})

// ─────────────────────────────────────────────
// CREDIT LOG API
// ─────────────────────────────────────────────
app.post('/api/credit/log', async (c) => {
  const body = await c.req.json()
  const { user_id, action, change, score_after, reason } = body
  const { DB } = c.env
  try {
    await DB.prepare(`
      INSERT INTO credit_logs (user_id, action, change_amount, score_after, reason, created_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(user_id, action, change, score_after, reason).run()
  } catch {}
  return c.json({ success: true, logged_at: new Date().toISOString() })
})

app.get('/api/credit/logs/:userId', async (c) => {
  const userId = c.req.param('userId')
  const { DB } = c.env
  try {
    const results = await DB.prepare('SELECT * FROM credit_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 50').bind(userId).all()
    return c.json(results.results)
  } catch {
    return c.json([
      { id: 1, action: '準時簽到', change_amount: 2, score_after: 90, reason: '活動出席', created_at: '2026-03-01' },
      { id: 2, action: '活動未簽到', change_amount: -5, score_after: 85, reason: '無故缺席', created_at: '2026-03-15' },
      { id: 3, action: '及時取消預約', change_amount: 3, score_after: 88, reason: '負責任行為', created_at: '2026-03-28' },
    ])
  }
})

// ─────────────────────────────────────────────
// NOTIFICATION TRACKING (Read Receipt / track.php)
// ─────────────────────────────────────────────
app.post('/api/notifications/track', async (c) => {
  const body = await c.req.json()
  const { token, timestamp } = body
  const ip = c.req.header('CF-Connecting-IP') || c.req.header('X-Forwarded-For') || '127.0.0.1'
  const { DB } = c.env
  try {
    await DB.prepare(`
      INSERT INTO notification_logs (token, read_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?)
    `).bind(token, timestamp || new Date().toISOString(), ip, c.req.header('User-Agent') || '').run()
  } catch {}
  return c.json({ success: true, token, ip, tracked_at: new Date().toISOString() })
})

app.get('/api/notifications/logs', async (c) => {
  const { DB } = c.env
  try {
    const results = await DB.prepare('SELECT * FROM notification_logs ORDER BY read_at DESC LIMIT 100').all()
    return c.json(results.results)
  } catch {
    return c.json([
      { token: 'tk001', read_at: '2026-04-02T10:00:00Z', ip_address: '140.136.100.1' },
      { token: 'tk002', read_at: '2026-04-02T10:05:00Z', ip_address: '140.136.100.2' },
    ])
  }
})

// ─────────────────────────────────────────────
// CONFLICT / NEGOTIATION API
// ─────────────────────────────────────────────
app.get('/api/conflicts', async (c) => {
  return c.json([
    { id: 'N001', venue: '焯炤館演講廳', date: '2026-04-10', time: '09:00-12:00', party1: '資管系學會', party2: '攝影社', status: 'pending', created_at: '2026-04-01' },
    { id: 'N002', venue: '仁愛空間', date: '2026-04-12', time: '14:00-17:00', party1: '籃球社', party2: '服務隊', status: 'negotiating', created_at: '2026-04-02' },
  ])
})

app.patch('/api/conflicts/:id/resolve', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const { resolution, winner_party } = body
  const { DB } = c.env
  try {
    await DB.prepare(`UPDATE conflicts SET status='resolved', resolution=?, winner_party=?, resolved_at=CURRENT_TIMESTAMP WHERE id=?`).bind(resolution, winner_party, id).run()
  } catch {}
  return c.json({ id, status: 'resolved', resolution, resolved_at: new Date().toISOString() })
})

app.post('/api/conflicts/:id/penalty', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  const { user_id, reason } = body
  const { DB } = c.env
  // Deduct 10 credit points
  try {
    await DB.prepare('UPDATE users SET credit_score = MAX(0, credit_score - 10) WHERE id = ?').bind(user_id).run()
    await DB.prepare('INSERT INTO credit_logs (user_id, action, change_amount, score_after, reason) SELECT ?, ?, -10, credit_score, ? FROM users WHERE id = ?').bind(user_id, '協商逾期罰款', reason || '6分鐘無法達成協議', user_id).run()
  } catch {}
  return c.json({ conflict_id: id, penalty: -10, reason: reason || '協商超時6分鐘', applied_at: new Date().toISOString() })
})

// ─────────────────────────────────────────────
// MAIN FRONTEND ROUTE
// ─────────────────────────────────────────────
app.get('/', (c) => {
  return c.html(getMainHTML())
})

app.get('*', (c) => {
  return c.html(getMainHTML())
})

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────
async function screenReservation(purpose: string, role: string): Promise<{
  risk_level: string
  reasoning: string
  suggested_tags: string[]
  action: string
  law_reference: string
}> {
  // Simulate Dify AI screening logic
  const forbiddenKeywords = ['政治', '抗議', '違法', '酒精', '賭博']
  const warningKeywords = ['200人以上', '場外活動', '通宵', '商業活動']

  const hasForbidden = forbiddenKeywords.some(k => purpose.includes(k))
  const hasWarning = warningKeywords.some(k => purpose.includes(k))

  if (hasForbidden) {
    return {
      risk_level: 'High',
      reasoning: '申請理由包含不當關鍵字，違反校園活動管理辦法。',
      suggested_tags: ['內容違規', '需重新說明'],
      action: 'AUTO_REJECT',
      law_reference: '依據《輔仁大學學生社團活動管理辦法》第八條規定'
    }
  }

  if (hasWarning) {
    return {
      risk_level: 'Medium',
      reasoning: '活動規模或性質需要額外審查，建議補充安全計畫。',
      suggested_tags: ['大型活動', '需補充文件'],
      action: 'PENDING_MANUAL_REVIEW',
      law_reference: '依據《場地管理辦法》第三條規定，超過150人活動需事前審核'
    }
  }

  return {
    risk_level: 'Low',
    reasoning: '申請內容符合校園活動規範，建議核准。',
    suggested_tags: ['一般活動'],
    action: 'AUTO_APPROVE',
    law_reference: ''
  }
}

function getMainHTML(): string {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>FJU Smart Hub | 輔仁大學校園管理系統</title>
  <!-- FontAwesome Icons -->
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet"/>
  <!-- Leaflet.js (interactive map) -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <!-- GSAP (animations) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <!-- Axios -->
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  <!-- App Styles -->
  <link href="/static/styles.css" rel="stylesheet"/>
  <style>
    body { margin: 0; padding: 0; overflow: hidden; }
    #landing-page { transition: opacity 0.4s ease; }
    .leaflet-control-attribution { font-size: 10px; }
  </style>
</head>
<body>
  <!-- Landing Page -->
  <div id="landing-page" style="position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;"></div>
  <!-- Login Page -->
  <div id="login-page">
    <div class="login-card" id="login-card">
      <div id="login-body"></div>
    </div>
  </div>
  <!-- Main App Root -->
  <div id="app-root"></div>
  <!-- App Script -->
  <script src="/static/app.js"></script>
</body>
</html>`
}

export default app
