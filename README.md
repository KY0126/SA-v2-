# FJU Smart Hub
## 輔仁大學全方位校園管理與資源調度系統

[![Deployed on Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-orange)](https://fju-smart-hub.pages.dev)
[![Version](https://img.shields.io/badge/Version-3.0-blue)](https://github.com/KY0126/SA-v2-)

---

## 專案概覽

FJU Smart Hub 是整合 Hono/TypeScript、Cloudflare Pages、MySQL 8.0/D1 SQLite、Vue 3 與 Dify AI 中台的全端校園管理系統。

### 核心目標
- 解決輔仁大學校園場地/器材資源調度的行政痛點
- 以 AI 智慧預審大幅降低課指組人工審核負擔
- 建立完整的社團生命週期管理平台

---

## 已完成功能

| 功能模組 | 狀態 |
|---------|------|
| 🏠 多角色儀表板（5種角色） | ✅ |
| 📅 三階段場地預約流 | ✅ |
| 🔧 器材借用 + TOTP 憑證 | ✅ |
| 👥 社團管理 | ✅ |
| 📢 動態活動牆 | ✅ |
| 📆 全域行事曆 | ✅ |
| 📋 E-Portfolio + PDF 匯出 | ✅ |
| 🤖 Dify AI 智慧預審 | ✅ (Mock) |
| 🤖 AI 企劃書生成器 | ✅ (Mock) |
| 🌐 多語系（中/英/日/韓） | ✅ |
| 👮 信用點數系統 | ✅ |
| 🔒 Google OAuth + 2FA | ✅ (Demo) |
| 👤 用戶管理頁 | ✅ |
| 📊 系統規格書 (Word) | ✅ |

---

## API 端點說明

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/api/auth/me` | 取得目前用戶資訊 |
| POST | `/api/auth/google` | Google OAuth 登入 |
| GET | `/api/venues` | 取得場地列表 |
| POST | `/api/reservations` | 新增場地預約（含 AI 預審）|
| GET | `/api/reservations` | 取得預約列表 |
| PATCH | `/api/reservations/:id/status` | 更新預約狀態 |
| GET | `/api/clubs` | 取得社團列表 |
| GET | `/api/clubs/:id` | 取得社團詳情 |
| GET | `/api/equipment` | 取得器材列表 |
| POST | `/api/equipment/borrow` | 申請器材借用 |
| GET | `/api/activities?keyword=&tag=` | 搜尋活動 |
| GET | `/api/calendar?month=2026-04` | 取得月份行事曆 |
| GET | `/api/dashboard/:role` | 取得角色儀表板資料 |
| GET | `/api/portfolio/:userId` | 取得 E-Portfolio |
| GET | `/api/credit/:userId` | 取得信用點數紀錄 |
| GET | `/api/users` | 取得用戶列表 (admin only) |
| POST | `/api/ai/screen` | AI 智慧預審 |
| POST | `/api/ai/generate-plan` | AI 企劃書生成 |

---

## 技術架構

```
FJU Smart Hub
├── 前端 (Frontend)
│   ├── Vue 3 (CDN) + Tailwind CSS
│   ├── Chart.js (統計圖表)
│   ├── GSAP (動畫)
│   └── vue-i18n (四國語系)
│
├── 後端 (Backend)
│   ├── Hono Framework (Cloudflare Workers)
│   ├── TypeScript (嚴格模式)
│   └── REST API
│
├── 資料庫 (Database)
│   ├── Cloudflare D1 SQLite (生產)
│   ├── KV Namespace (快取/Session)
│   └── R2 Object Storage (文件/圖片)
│
├── AI 中台 (AI Platform)
│   ├── Dify Cloud (RAG + Workflow)
│   └── Cloudflare Workers AI (Llama-3)
│
└── 安全防護 (Security)
    ├── Cloudflare WAF
    ├── Turnstile CAPTCHA
    ├── Google OAuth (hd=cloud.fju.edu.tw)
    └── 2FA TOTP (PHPGangsta)
```

---

## 資料架構

### 主要資料表 (16張)
- **users** - 使用者（含信用點數、JWT版本號）
- **clubs** - 社團
- **venues** - 場地
- **reservations** - 預約申請（三階段狀態機）
- **equipment** - 器材
- **equipment_loans** - 器材借用記錄
- **activities** - 活動
- **credit_history** - 信用點數歷史
- **ai_outbox** - AI 異步任務佇列
- **portfolios** - E-Portfolio
- 其他 6 張關聯表

---

## 快速開始

```bash
# 安裝依賴
npm install

# 建置
npm run build

# 本地開發 (需 wrangler 登入)
npm run dev:sandbox

# 資料庫初始化
npm run db:migrate:local
npm run db:seed

# 部署至 Cloudflare Pages
npm run deploy
```

---

## 部署資訊

- **平台**: Cloudflare Pages
- **技術棧**: Hono + TypeScript + Vue 3 + TailwindCSS + Dify AI
- **狀態**: ✅ 開發完成，待正式部署
- **最後更新**: 2026/03/31
- **版本**: v3.0

---

## 文件

| 文件 | 路徑 |
|------|------|
| 系統規格書 (Word) | `FJU_Smart_Hub_SA文件_v3.0.docx` |
| 資料庫 Schema | `migrations/0001_initial_schema.sql` |
| 測試資料 | `seed.sql` |
| 系統架構 | 見 SA 文件第三章 |

---

## 開發團隊

輔仁大學 資訊管理學系 第三十四屆專題  
指導教授：陳大中 教授  
GitHub: [KY0126/SA-v2-](https://github.com/KY0126/SA-v2-)
