# FJU Smart Hub v3.1
## 輔仁大學全方位校園管理系統

---

## 🌐 系統預覽
**前端 Demo URL**: https://3000-i12ven33yzeuey60x9hlh-2b54fc91.sandbox.novita.ai

**GitHub**: https://github.com/KY0126/SA-v2-

---

## ✅ 已完成功能

### 🗺️ 校園地圖模組（v3.1 新增）
- SVG 互動式校園地圖，標示所有主要建築
- 無障礙設施完整標示：♿ 坡道 / 🛗 電梯 / 🚻 廁所 / P♿ 停車位
- 三種篩選模式：全部 / 僅無障礙 / 可預約場地
- 點擊建築查看詳情（含無障礙設施確認、預約入口）
- 8棟主要建築詳細資訊列表

### 🤖 三個 AI 介面（v3.1 新增）

#### AI 導覽查詢（Chat Interface）
- 對話式介面，24/7 即時問答
- 支援查詢：場地位置、預約流程、信用點數、無障礙設施、器材借用
- FAQ 快捷問題（6個一鍵提問）
- 對話歷史保存（Session內）
- 快捷卡片跳轉至法規/預約RAG

#### 法規查詢 RAG
- Dify RAG 知識庫搜尋
- 自由文字查詢 + 8個常見問題
- 回覆包含：信心度評分、引用來源
- 知識庫：活動辦法、場地辦法、器材借用辦法

#### 場地與器材預約流程 RAG
- 三階段流程可視化（志願序→衝突協商→官方核定）
- AI 根據需求規劃最佳預約路徑
- 器材即時庫存表
- 6種常見情境快捷

### 📋 核心功能（v3.0）
- **五角色儀表板**：學生/社團幹部/指導教授/課指組/資訊中心
- **三階段場地預約**：AI預審 + 衝突協商(LINE Notify) + 官方核定(PDF+TOTP)
- **器材借用管理**：即時庫存、TOTP QR Code 確認
- **社團管理**：分類篩選、詳細資訊
- **動態活動牆**：標籤篩選、即時搜尋
- **全域行事曆**：月曆視圖 + 活動列表
- **E-Portfolio**：技能標籤、活動記錄、信用點數歷史
- **用戶管理**：管理員後台（admin/it_admin 角色）
- **多語言**：繁中/英/日/韓/法 五語言支援

### 🤖 AI 工具集
- AI 企劃生成器（一鍵生成活動企劃書）
- AI 申訴摘要（自動生成申訴書草稿）
- 場地熱力圖（開發中）

---

## 🛣️ API 端點

| Method | Endpoint | 說明 |
|--------|----------|------|
| GET | /api/venues | 場地列表 |
| POST | /api/reservations | 建立預約 |
| GET | /api/equipment | 器材庫存 |
| POST | /api/equipment/borrow | 器材借用申請 |
| GET | /api/clubs | 社團列表 |
| GET | /api/dashboard/:role | 角色儀表板 |
| **POST** | **/api/ai/navigate** | **AI 導覽查詢（v3.1）** |
| **POST** | **/api/ai/regulations** | **法規 RAG 查詢（v3.1）** |
| **POST** | **/api/ai/venue-workflow** | **預約流程 RAG（v3.1）** |
| POST | /api/ai/screen | AI 風險預審 |
| POST | /api/ai/generate-plan | AI 企劃生成 |
| **GET** | **/api/campus/buildings** | **校園建築資訊（v3.1）** |
| **GET** | **/api/campus/accessibility** | **無障礙設施清單（v3.1）** |
| GET | /api/credit/:userId | 信用點數記錄 |
| GET | /api/portfolio/:userId | E-Portfolio |
| GET | /api/calendar | 行事曆 |

---

## 🏗️ 技術架構

| 層級 | 技術 |
|------|------|
| **前端** | Vanilla JS (Vue3 CDN Style) + Chart.js + GSAP |
| **後端** | Hono.js v4 (TypeScript) on Cloudflare Workers |
| **資料庫** | Cloudflare D1 (SQLite) |
| **快取** | Cloudflare KV |
| **AI** | Dify AI 中間層（Mock 實作） |
| **安全** | Cloudflare WAF + Turnstile + JWT + TOTP 2FA |
| **通知** | LINE Notify + SMTP + SMS |
| **地圖** | SVG 互動式地圖（可擴展 Mapbox） |
| **語言** | 繁中 / English / 日本語 / 한국어 / Français |

---

## 📄 文件

- **系統規格書 v3.1**：`FJU_Smart_Hub_SA文件_v3.1.docx`（含自動目錄、5張系統圖）
- **資料庫 Schema**：`migrations/0001_initial_schema.sql`
- **測試資料**：`seed.sql`

---

## 📦 備份下載
- 完整專案備份：https://www.genspark.ai/api/files/s/y3xq6vYK

---

## 🗓️ 版本記錄

| 版本 | 日期 | 主要更新 |
|------|------|----------|
| v3.1 | 2026/04/01 | 校園地圖+無障礙設施+3個AI介面+SA文件v3.1 |
| v3.0 | 2026/03/31 | 儀表板、E-Portfolio、多語言 |
| v2.0 | 2026/02/20 | AI預審、信用點數系統 |
| v1.0 | 2026/01/15 | 基礎場地預約 |

---

**部署平台**: Cloudflare Pages | **狀態**: ✅ 開發中
