-- ═══════════════════════════════════════════════════════
--  FJU Smart Hub v4.0 - Credit Logs & Notification Logs
--  Added tables: credit_logs, notification_logs, conflicts, map_elements
-- ═══════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- CREDIT LOGS (信用扣分紀錄) - credit_logs table
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS credit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  action TEXT NOT NULL,                          -- 行為描述
  change_amount INTEGER NOT NULL,                -- 變更量 (正/負)
  score_after INTEGER NOT NULL,                  -- 變更後分數
  reason TEXT,                                   -- 原因說明
  related_type TEXT,                             -- reservation/activity/negotiation/manual
  related_id INTEGER,                            -- 關聯ID
  created_by TEXT DEFAULT 'SYSTEM',              -- SYSTEM or admin user_id
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_credit_logs_user ON credit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_logs_date ON credit_logs(created_at);

-- ─────────────────────────────────────────────
-- NOTIFICATION LOGS (通知已讀回條) - track.php equivalent
-- Logs timestamp + IP when user reads a notification
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notification_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT NOT NULL UNIQUE,                    -- Unique token per notification
  notification_id TEXT,                          -- Reference to notification
  user_id INTEGER,                               -- User who read it
  read_at DATETIME DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of read action
  ip_address TEXT,                               -- Client IP address
  user_agent TEXT,                               -- Browser user agent
  is_mandatory INTEGER DEFAULT 0,               -- Was this a mandatory 10s overlay?
  confirmed INTEGER DEFAULT 0                   -- User clicked confirm button
);
CREATE INDEX IF NOT EXISTS idx_notif_logs_token ON notification_logs(token);
CREATE INDEX IF NOT EXISTS idx_notif_logs_user ON notification_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_notif_logs_date ON notification_logs(read_at);

-- ─────────────────────────────────────────────
-- CONFLICTS TABLE (場地衝突協商)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conflicts (
  id TEXT PRIMARY KEY,                           -- e.g., N001, N002
  reservation_id_1 INTEGER,                     -- First reservation
  reservation_id_2 INTEGER,                     -- Conflicting reservation
  venue_id INTEGER,
  conflict_date DATE NOT NULL,
  conflict_time_start TIME,
  conflict_time_end TIME,
  party1_user_id INTEGER,                        -- First party user
  party2_user_id INTEGER,                        -- Second party user
  party1_name TEXT,
  party2_name TEXT,
  status TEXT DEFAULT 'pending'
    CHECK(status IN ('pending','negotiating','ai_intervened','resolved','penalty_applied')),
  -- Timer tracking
  opened_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ai_intervened_at DATETIME,                    -- When 3-min timer triggered AI
  penalty_applied_at DATETIME,                  -- When 6-min timer enforced penalty
  resolved_at DATETIME,
  resolution TEXT,                              -- How it was resolved
  winner_party TEXT,                            -- Who won the slot (user_id or NULL for compromise)
  -- AI suggestion used
  ai_suggestion_used INTEGER DEFAULT 0,
  ai_suggestion_text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_conflicts_venue ON conflicts(venue_id);
CREATE INDEX IF NOT EXISTS idx_conflicts_status ON conflicts(status);
CREATE INDEX IF NOT EXISTS idx_conflicts_date ON conflicts(conflict_date);

-- ─────────────────────────────────────────────
-- MAP ELEMENTS (地圖建築狀態 - 動態維護資訊)
-- sidebar click -> AJAX fetch maintenance status
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS map_elements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  building_id TEXT NOT NULL,                     -- e.g., 'bldg-alumni', 'building-1'
  building_name TEXT NOT NULL,
  element_type TEXT DEFAULT 'building'
    CHECK(element_type IN ('building','entrance','elevator','parking','restroom','ramp')),
  status TEXT DEFAULT 'available'
    CHECK(status IN ('available','maintenance','closed','restricted')),
  maintenance_note TEXT,                         -- 維護說明
  maintenance_start DATETIME,
  maintenance_end DATETIME,                      -- 預計完工
  lat REAL,                                      -- GPS latitude
  lng REAL,                                      -- GPS longitude
  accessible INTEGER DEFAULT 0,
  has_elevator INTEGER DEFAULT 0,
  has_restroom INTEGER DEFAULT 0,
  is_reservable INTEGER DEFAULT 0,
  capacity INTEGER DEFAULT 0,
  last_updated_by INTEGER,                       -- admin user_id
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_map_building ON map_elements(building_id);
CREATE INDEX IF NOT EXISTS idx_map_status ON map_elements(status);

-- Seed initial map data
INSERT OR IGNORE INTO map_elements (building_id, building_name, status, lat, lng, accessible, has_elevator, has_restroom, is_reservable, capacity) VALUES
  ('building-1', '焯炤館', 'available', 25.0332, 121.4330, 1, 0, 1, 1, 300),
  ('building-2', '仁愛空間', 'available', 25.0323, 121.4320, 1, 0, 1, 1, 50),
  ('building-3', '進修部演講廳', 'maintenance', 25.0340, 121.4340, 1, 1, 0, 1, 200),
  ('building-4', '潛水艇的天空', 'available', 25.0313, 121.4315, 0, 0, 0, 1, 30),
  ('building-5', '圖書館研討室', 'available', 25.0330, 121.4300, 1, 1, 1, 1, 20),
  ('building-6', '體育館', 'available', 25.0305, 121.4320, 1, 0, 1, 0, 500),
  ('building-7', '學生活動中心', 'available', 25.0325, 121.4350, 1, 1, 1, 1, 100),
  ('building-8', '宗倫樓', 'available', 25.0350, 121.4360, 1, 1, 1, 0, 400),
  ('building-9', '行政大樓', 'available', 25.0342, 121.4325, 1, 1, 1, 0, 0),
  ('building-10', '醫學院', 'available', 25.0318, 121.4355, 1, 1, 1, 0, 150);

-- Seed initial conflicts
INSERT OR IGNORE INTO conflicts (id, venue_id, conflict_date, conflict_time_start, conflict_time_end, party1_name, party2_name, status) VALUES
  ('N001', 1, '2026-04-10', '09:00', '12:00', '資管系學會', '攝影社', 'negotiating'),
  ('N002', 2, '2026-04-12', '14:00', '17:00', '籃球社', '服務隊', 'pending');
