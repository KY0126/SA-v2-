-- ═══════════════════════════════════════════════════════
--  FJU Smart Hub - Seed Data
-- ═══════════════════════════════════════════════════════

-- Users
INSERT OR IGNORE INTO users (student_id, name, email, outlook_email, phone, role, department, credit_score)
VALUES
  ('112071001', '王小明', 'a112071001@cloud.fju.edu.tw', 'wang@mail.fju.edu.tw', '0912345678', 'student', '資訊管理學系', 95),
  ('112071002', '李美華', 'a112071002@cloud.fju.edu.tw', 'lee@mail.fju.edu.tw', '0923456789', 'club_officer', '資訊管理學系', 88),
  ('112071003', '陳大維', 'a112071003@cloud.fju.edu.tw', 'chen1@mail.fju.edu.tw', '0934567890', 'student', '資訊管理學系', 72),
  (NULL, '陳大中', 'chen@mail.fju.edu.tw', NULL, NULL, 'professor', '資訊管理學系', 100),
  (NULL, '張組員', 'activity@mail.fju.edu.tw', NULL, NULL, 'admin', '課外活動指導組', 100),
  (NULL, '林工程師', 'it@mail.fju.edu.tw', NULL, NULL, 'it_admin', '資訊中心', 100);

-- Clubs
INSERT OR IGNORE INTO clubs (name, category, description, contact_email, credit_score, status, advisor_id)
VALUES
  ('資管系學會', '系學會', '輔仁大學資訊管理學系學生自治組織', 'imsa@cloud.fju.edu.tw', 95, 'active', 4),
  ('攝影社', '學藝', '記錄校園美好瞬間', 'photo@cloud.fju.edu.tw', 88, 'active', 4),
  ('籃球社', '體育', '強身健體，增進球技', 'basketball@cloud.fju.edu.tw', 92, 'active', NULL),
  ('圍棋社', '學藝', '修身養性，以棋會友', 'go@cloud.fju.edu.tw', 100, 'active', NULL),
  ('服務隊', '服務', '服務社區，回饋社會', 'service@cloud.fju.edu.tw', 98, 'active', 4),
  ('創業研究社', '學術', '培養創業思維與實踐能力', 'startup@cloud.fju.edu.tw', 85, 'active', 4);

-- Venues
INSERT OR IGNORE INTO venues (name, location, capacity, type, managing_dept, available)
VALUES
  ('焯炤館演講廳', '焯炤館B1', 300, 'lecture', '課外活動指導組', 1),
  ('仁愛空間', '仁愛樓3F', 50, 'meeting', '課外活動指導組', 1),
  ('進修部演講廳', '進修部大樓', 200, 'lecture', '進修部', 0),
  ('潛水艇的天空', '學生活動中心', 30, 'creative', '學生會', 1),
  ('圖書館研討室A', '圖書館2F', 20, 'study', '圖書館', 1),
  ('體育館', '體育館', 500, 'outdoor', '體育室', 1);

-- Equipment
INSERT OR IGNORE INTO equipment (name, category, qty_total, qty_available, location)
VALUES
  ('無線麥克風', '音響', 10, 7, '課指組倉庫'),
  ('投影機', '視聽', 5, 3, '總務處'),
  ('折疊桌', '傢俱', 30, 22, 'B1倉庫'),
  ('音響主機', '音響', 3, 2, '課指組倉庫'),
  ('帳篷', '戶外', 8, 5, 'B1倉庫');

-- Activities
INSERT OR IGNORE INTO activities (club_id, title, description, activity_date, expected_participants, status, tags)
VALUES
  (1, '2026 資管盃程式競賽', '全校程式設計競賽活動', '2026-04-20', 150, 'upcoming', '["競賽","程式設計","資訊"]'),
  (2, '春季攝影展覽', '社員優秀攝影作品展', '2026-04-15', 300, 'upcoming', '["展覽","藝術","攝影"]'),
  (5, '服務學習日', '校外社區服務活動', '2026-04-12', 60, 'upcoming', '["服務","志工","社區"]'),
  (3, '籃球聯誼賽', '友誼比賽', '2026-04-08', 80, 'completed', '["體育","競賽","聯誼"]'),
  (6, 'AI 時代創業論壇', '邀請業界專家分享創業經驗', '2026-04-25', 200, 'upcoming', '["創業","AI","講座"]');

-- Reservations
INSERT OR IGNORE INTO reservations (user_id, club_id, venue_id, start_time, end_time, purpose, status, weight_level, ai_risk_level)
VALUES
  (2, 1, 1, '2026-04-10 09:00', '2026-04-10 12:00', '資管系學會春季成果展', 'APPROVED', 2, 'Low'),
  (2, 2, 2, '2026-04-10 14:00', '2026-04-10 17:00', '攝影社社課', 'PENDING_MANUAL_REVIEW', 3, 'Medium'),
  (5, NULL, 3, '2026-04-11 10:00', '2026-04-11 16:00', '課指組幹部研習', 'APPROVED', 1, 'Low');

-- Portfolio entries
INSERT OR IGNORE INTO portfolio_entries (user_id, entry_type, title, description, role, date, achievement)
VALUES
  (1, 'competition', '資管盃競賽', '全校程式設計競賽', '參賽者', '2025-11-20', '第二名'),
  (1, 'activity', '服務學習', '社區志工服務', '志工', '2025-12-10', NULL);

-- Credit history
INSERT OR IGNORE INTO credit_history (user_id, action, change_amount, score_after, reason)
VALUES
  (1, '準時簽到', 2, 97, '活動如期出席加分'),
  (3, '活動未簽到', -5, 72, '已核准活動無故缺席'),
  (3, '器材未準時歸還', -8, 77, '逾期3天歸還');
