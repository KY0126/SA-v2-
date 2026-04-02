# FJU Smart Hub v4.0
## 輔仁大學校園智慧管理系統

---

## 🌐 URLs
- **沙箱 Demo**: https://3000-i12ven33yzeuey60x9hlh-2b54fc91.sandbox.novita.ai
- **GitHub**: https://github.com/KY0126/SA-v2-

---

## ✅ 已完成功能

### 🎬 動畫引導頁（Landing Page）
- 深藍漸層背景 + 金色粒子浮動動效（20顆）
- 大學 Logo 光環脈衝動畫（CSS @keyframes）
- 5張功能展示卡：地圖、AI協商、行事曆、信用制、已讀回條
- 進入按鈕 fade out → 顯示登入頁

### 🔐 登入系統（非 Landing 即為登入）
- 5種角色選擇：學生、社團幹部、指導教授、行政人員、IT管理員
- 僅限 @cloud.fju.edu.tw 帳號（Google OAuth 示範）
- 2FA：TOTP/SMS 設計（JWT + HttpOnly Cookie）

### 📐 Bento Grid 佈局（60-30-10 配色）
- **Header**：大學 Logo ＋ 浮動 Google Maps 風格搜尋列（含高亮）＋ 通知鈴鐺（紅點）＋ 頭像選單
- **左側欄（30%）**：信用積分儀表板、各學院消息卡、待協商清單（計時器）、功能快捷格
- **右主區（70%）**：Leaflet 地圖 Base Layer + 玻璃態行事曆 Floating Layer

### 🗺️ Leaflet.js 互動校園地圖
- OpenStreetMap 底圖，10 棟建築標記（藍=正常 / 紅=維護中）
- 無障礙標記：金點（坡道）、綠方（電梯）、紫圓（廁所）、橙菱（停車）
- 篩選：全部 / 無障礙 / 可預約 / 維護中
- **側欄 click → flyTo** 平滑飛行至目標建築
- **building_id AJAX** (`GET /api/map/building/:id`) → 即時查詢 `map_elements` 維護狀態
- 點擊 Popup 可直接開啟預約表單

### 📅 玻璃態行事曆面板（Glassmorphism）
- `backdrop-filter: blur(20px)` 玻璃效果，40% 寬，右側對齊
- GSAP 動畫：translateX 105% → 0，0.4s cubic-bezier
- 月份導航，彩色事件點（綠=已核准 / 金=待審核 / 紅=衝突）
- 點擊衝突日期 → 自動彈出協商對話框
- 「開啟行事曆管理頁面」跳轉全月格狀視圖

### 🤝 AI 衝突協商機制（3/6 分鐘規則）
- **3分鐘規則**：GPT-4 介入，提供 3 項具體建議
- **6分鐘規則**：強制處置 → 扣 10 信用分 + 紅燈閃爍 + 關閉
- 語意過濾器：沉默 30秒 → 警告訊息
- 「協商完成」→ 更新 `conflicts` 表 + 加 2 分 + 跳轉行事曆管理
- 完整計時器 UI（MM:SS 顯示，逾期後閃爍）

### 🔔 已讀回條追蹤（Read Receipt）
- 每則通知含唯一 token
- POST /api/notifications/track → 記錄 timestamp + IP
- **重要通知**：10秒強制 Modal Overlay，倒數後啟用確認鈕
- `notification_logs` 表完整記錄

### ⭐ 信用積分系統
- 協商完成 +2 / 逾期罰款 -10 / 其他行為積分
- `credit_logs` 表完整紀錄（action, change_amount, score_after, reason）
- 側欄即時顯示信用條（Vatican Gold 進度條）
- 管理員頁面可查看完整信用扣分記錄

---

## 📋 功能模組列表

| 模組 | 頁面路由 | 狀態 |
|------|---------|------|
| 動畫引導頁 | Landing | ✅ |
| 登入（角色選擇） | Login | ✅ |
| 儀表板 | /dashboard | ✅ |
| 校園地圖 + 行事曆 | /map | ✅ |
| 三階段場地預約 | /reservation | ✅ |
| 器材借用 | /equipment | ✅ |
| 社團管理 | /clubs | ✅ |
| 活動牆 | /activities | ✅ |
| AI 工具（導覽/法規/流程/企劃） | /aitools | ✅ |
| E-Portfolio | /portfolio | ✅ |
| 用戶管理（管理員） | /users | ✅ |
| 行事曆管理頁面 | /cal-management | ✅ |
| 系統設定 | /settings | ✅ |

---

## 🔌 API 端點彙整

### 新增端點（v4.0）
| Method | Path | 說明 |
|--------|------|------|
| GET | /api/map/building/:id | 動態建築維護狀態（map_elements） |
| POST | /api/credit/log | 記錄信用變動 → credit_logs |
| GET | /api/credit/logs/:userId | 取得信用記錄 |
| POST | /api/notifications/track | 已讀回條（記錄IP+時間） |
| GET | /api/notifications/logs | 取得已讀紀錄 |
| GET | /api/conflicts | 衝突清單 |
| PATCH | /api/conflicts/:id/resolve | 解決衝突 |
| POST | /api/conflicts/:id/penalty | 施加罰款（-10分） |

---

## 🗄️ 資料庫架構（D1 + KV + R2）

**主要資料表**：users, clubs, venues, reservations, conflicts, credit_logs, notification_logs, map_elements, equipment, equipment_loans, activities, portfolios, portfolio_entries

**Migration 檔案**：
- `migrations/0001_initial_schema.sql` - 初始架構
- `migrations/0002_credit_and_notif_logs.sql` - 信用日誌、通知追蹤、衝突、地圖元素

---

## 🚀 部署資訊

- **平台**: Cloudflare Pages + Workers
- **Framework**: Hono v4 + TypeScript
- **版本**: v4.0
- **最後更新**: 2026-04-02
- **規格書**: FJU_Smart_Hub_SA文件_v4.0.docx（含自動目錄、系統架構圖、Mermaid流程圖、完整ER圖、API規格）
