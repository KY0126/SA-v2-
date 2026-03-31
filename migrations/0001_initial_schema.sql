-- ═══════════════════════════════════════════════════════
--  FJU Smart Hub - MySQL 8.0 Compatible D1 Schema
--  Database: fju-smart-hub-production
-- ═══════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- USERS TABLE (學生/職員/教授)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT UNIQUE,                        -- 學號 (e.g. 112071001)
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,                    -- @cloud.fju.edu.tw
  outlook_email TEXT,                            -- Outlook 帳號
  phone TEXT,                                    -- 手機 (LINE 通知用)
  role TEXT NOT NULL DEFAULT 'student'
    CHECK(role IN ('student','club_officer','professor','admin','it_admin')),
  department TEXT,                               -- 系所
  position TEXT,                                 -- 社團職位
  credit_score INTEGER NOT NULL DEFAULT 100
    CHECK(credit_score >= 0 AND credit_score <= 100),
  is_active INTEGER NOT NULL DEFAULT 1,          -- 是否停權
  google_id TEXT UNIQUE,                         -- Google OAuth ID
  two_fa_secret TEXT,                            -- 2FA (PHPGangsta) secret
  jwt_version INTEGER NOT NULL DEFAULT 1,        -- JWT 失效版本號 (Observer Pattern)
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_student_id ON users(student_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_credit ON users(credit_score);

-- ─────────────────────────────────────────────
-- CLUBS TABLE (社團)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clubs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,                        -- 學藝/康樂/服務/體育/學術/系學會
  description TEXT,
  advisor_id INTEGER REFERENCES users(id),       -- 指導教授
  contact_email TEXT,
  contact_phone TEXT,
  social_ig TEXT,
  social_fb TEXT,
  credit_score INTEGER NOT NULL DEFAULT 100,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK(status IN ('active','suspended','inactive')),
  established_date DATE,
  annual_budget REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_clubs_category ON clubs(category);
CREATE INDEX IF NOT EXISTS idx_clubs_status ON clubs(status);

-- Club members junction
CREATE TABLE IF NOT EXISTS club_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  club_id INTEGER NOT NULL REFERENCES clubs(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  position TEXT DEFAULT 'member',                -- 社長/副社長/幹部/一般
  joined_at DATE,
  left_at DATE,
  is_active INTEGER DEFAULT 1,
  UNIQUE(club_id, user_id)
);

-- ─────────────────────────────────────────────
-- VENUES TABLE (場地)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS venues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  location TEXT,
  capacity INTEGER NOT NULL,
  type TEXT CHECK(type IN ('lecture','meeting','creative','outdoor','classroom','study')),
  managing_dept TEXT,                            -- 管理單位 (課指組/總務處)
  available INTEGER DEFAULT 1,
  hourly_rate REAL DEFAULT 0,
  equipment_included TEXT,                       -- 內含設備 (JSON)
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- RESERVATIONS TABLE (預約 - 三階段)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  club_id INTEGER REFERENCES clubs(id),
  venue_id INTEGER NOT NULL REFERENCES venues(id),
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  purpose TEXT NOT NULL,
  expected_participants INTEGER,
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK(status IN (
      'PENDING','AI_SCREENING','PENDING_MANUAL_REVIEW',
      'APPROVED','CONFLICT_DETECTED','CONFLICT_RESOLVING',
      'REJECTED','CANCELLED','COMPLETED'
    )),
  -- Phase 1: 志願序
  priority_order INTEGER DEFAULT 1,             -- 志願序 (1=第一志願)
  weight_level INTEGER DEFAULT 3                -- 權重等級 1/2/3
    CHECK(weight_level IN (1,2,3)),
  -- Phase 2: AI 預審結果
  ai_task_id TEXT,
  ai_risk_level TEXT CHECK(ai_risk_level IN ('Low','Medium','High','NULL')),
  ai_reasoning TEXT,
  ai_suggested_tags TEXT,                       -- JSON array
  -- Phase 3: 官方核定
  reviewed_by INTEGER REFERENCES users(id),
  reviewed_at DATETIME,
  review_notes TEXT,
  pdf_url TEXT,                                 -- 申請單 PDF
  totp_secret TEXT,                             -- TOTP QR Code
  -- 衝突協商
  conflict_reservation_id INTEGER REFERENCES reservations(id),
  conflict_resolved_at DATETIME,
  -- 信用扣分追蹤
  checkin_required INTEGER DEFAULT 0,
  checkin_at DATETIME,
  credit_deducted INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_res_user ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_res_venue_time ON reservations(venue_id, start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_res_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_res_weight ON reservations(weight_level, priority_order);

-- ─────────────────────────────────────────────
-- EQUIPMENT TABLE (器材)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS equipment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,                        -- 音響/視聽/傢俱/戶外
  qty_total INTEGER NOT NULL DEFAULT 1,
  qty_available INTEGER NOT NULL DEFAULT 1,
  location TEXT,
  condition_status TEXT DEFAULT 'good'
    CHECK(condition_status IN ('good','fair','needs_repair','retired')),
  last_inspection_at DATE,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Equipment Loans
CREATE TABLE IF NOT EXISTS equipment_loans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  equipment_id INTEGER NOT NULL REFERENCES equipment(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  reservation_id INTEGER REFERENCES reservations(id),
  qty INTEGER NOT NULL DEFAULT 1,
  borrow_date DATE NOT NULL,
  return_due_date DATE NOT NULL,
  returned_at DATETIME,
  status TEXT DEFAULT 'active'
    CHECK(status IN ('active','returned','overdue','lost')),
  totp_secret TEXT,                              -- 動態憑證
  notify_sent INTEGER DEFAULT 0,                 -- LINE/SMS 到期提醒
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_loans_due ON equipment_loans(return_due_date, status);

-- ─────────────────────────────────────────────
-- ACTIVITIES TABLE (活動)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  club_id INTEGER REFERENCES clubs(id),
  title TEXT NOT NULL,
  description TEXT,
  activity_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  venue_id INTEGER REFERENCES venues(id),
  location_custom TEXT,
  expected_participants INTEGER,
  actual_participants INTEGER,
  status TEXT DEFAULT 'upcoming'
    CHECK(status IN ('upcoming','ongoing','completed','cancelled')),
  tags TEXT,                                     -- JSON array
  banner_url TEXT,
  registration_url TEXT,
  sdg_categories TEXT,                           -- SDGs JSON
  satisfaction_avg REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(activity_date);
CREATE INDEX IF NOT EXISTS idx_activities_club ON activities(club_id);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);

-- Activity participation
CREATE TABLE IF NOT EXISTS activity_participants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  activity_id INTEGER NOT NULL REFERENCES activities(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  checked_in INTEGER DEFAULT 0,
  checkin_at DATETIME,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5),
  review TEXT,
  UNIQUE(activity_id, user_id)
);

-- ─────────────────────────────────────────────
-- CREDIT SCORE HISTORY (信用點數紀錄)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS credit_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  change_amount INTEGER NOT NULL,
  score_after INTEGER NOT NULL,
  related_id INTEGER,                            -- reservation_id / activity_id
  related_type TEXT,
  reason TEXT,
  created_by INTEGER REFERENCES users(id),       -- 系統 or 人工
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_credit_user ON credit_history(user_id);

-- ─────────────────────────────────────────────
-- AI OUTBOX TABLE (異步 AI 任務)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_outbox (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_type TEXT NOT NULL,                       -- screen/generate_plan/summarize
  payload TEXT NOT NULL,                         -- JSON
  status TEXT DEFAULT 'pending'
    CHECK(status IN ('pending','processing','completed','failed')),
  dify_task_id TEXT,
  result TEXT,                                   -- JSON response
  retry_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME
);

-- ─────────────────────────────────────────────
-- E-PORTFOLIO (職能檔案)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS portfolios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
  bio TEXT,
  skills TEXT,                                   -- JSON array of skill tags
  volunteer_total_hours REAL DEFAULT 0,
  pdf_url TEXT,
  pdf_generated_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  entry_type TEXT CHECK(entry_type IN ('activity','certificate','achievement','competition')),
  title TEXT NOT NULL,
  description TEXT,
  role TEXT,
  date DATE,
  hours REAL,
  achievement TEXT,
  issuer TEXT,
  r2_url TEXT,                                   -- R2 document URL
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- DIGITAL TIME CAPSULE (數位時光膠囊)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS time_capsules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  club_id INTEGER NOT NULL REFERENCES clubs(id),
  from_user_id INTEGER REFERENCES users(id),
  to_user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  message TEXT,
  r2_files TEXT,                                 -- JSON array of R2 keys
  unlock_date DATE NOT NULL,
  status TEXT DEFAULT 'sealed'
    CHECK(status IN ('sealed','unlocked','transferred')),
  digital_signature TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- NOTIFICATIONS (通知記錄)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  channel TEXT NOT NULL CHECK(channel IN ('LINE','SMS','SMTP','IN_APP')),
  type TEXT NOT NULL,                            -- reservation_approved/credit_warning/etc
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_id INTEGER,
  is_read INTEGER DEFAULT 0,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- MATERIALIZED VIEW CACHE (效能快取)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mv_dashboard_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stat_key TEXT UNIQUE NOT NULL,
  stat_value TEXT NOT NULL,                      -- JSON
  refreshed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
