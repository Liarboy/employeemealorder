# MealFlow 網路訂餐系統

MealFlow 是一個靜態版的公司訂餐網站，提供員工從瀏覽餐點、加入購物車、結帳，到查看訂單紀錄與後台管理商品的完整流程。

線上展示：
https://liarboy.github.io/employeemealorder/

## 主要功能

- 訂餐首頁可依 `訂餐廠區`、`取餐日期`、`餐次`、`飲食選項` 篩選餐點
- 餐點可依 `人氣`、`熱量`、`價格` 與 `由高到低 / 由低到高` 排序
- 中英文雙語切換，商品名稱與商品描述會依語系即時顯示
- 購物車頁可調整數量、刪除品項，並即時顯示總數與金額
- 主導覽列的購物車會顯示紅底白字數量 badge
- 結帳頁可送出訂單，送出後會顯示成功訊息動畫並清空購物車
- 我的訂單頁可查看近期訂單，並對已完成訂單留下評價
- 聯絡我們頁提供問題回報表單
- 後台可新增、編輯、上下架商品，並維護中英文名稱與中英文描述
- 後台支援商品圖片裁切與預覽
- DB 後台可匯出 / 匯入 JSON，作為商品資料備份

## 使用流程

1. 進入首頁，先選擇訂餐廠區、取餐日期、餐次與飲食選項。
2. 依條件與排序方式瀏覽餐點，加入購物車。
3. 前往購物車調整數量或刪除商品。
4. 到結帳頁送出訂單，系統會顯示成功狀態並清空購物車。
5. 需要回顧訂單或留下評價時，可到「我的訂單」頁操作。

## 畫面預覽

建議在這裡放上首頁、購物車、結帳頁、後台的截圖，方便 GitHub 上快速理解專案。

- 首頁
- 購物車
- 結帳與取餐確認
- 我的訂單
- 商品後台

## 後台商品資料

後台上架時需要維護以下欄位：

- 商品名稱（中文）
- 商品名稱（英文）
- 商品描述（中文）
- 商品描述（英文）

如果只填其中一個語系，系統會嘗試使用瀏覽器可用的 AI 翻譯能力自動補齊另一個語系。若瀏覽器沒有支援，則會以已填語系同步缺少欄位，避免無法上架。

## 頁面說明

- `index.html` 訂餐首頁
- `cart.html` 購物車
- `checkout.html` 結帳與取餐確認
- `orders.html` 我的訂單
- `contact.html` 聯絡我們
- `admin.html` 商品後台
- `db-admin.html` DB 後台

## 資料儲存

- 商品資料：IndexedDB 儲存，並保留 localStorage 相容資料
- 購物車資料：localStorage
- 訂單評價：localStorage

## 技術

- HTML / CSS / Vanilla JavaScript
- IndexedDB
- Cropper.js
- Google Fonts

## 專案架構

- `index.html` / `menu.js` / `styles.css`：訂餐首頁與餐點列表
- `cart.html` / `cart.js`：購物車頁
- `checkout.html` / `checkout.js`：結帳與送出訂單流程
- `orders.html`：訂單紀錄與評價
- `contact.html`：聯絡我們表單
- `admin.html` / `admin.js`：商品後台
- `db-admin.html` / `db-admin.js`：資料庫管理
- `i18n.js`：語系切換
- `nav-cart.js`：導覽列購物車數量 badge
- `images/`：網站圖片與 logo

## 本機執行

這是一個純前端靜態網站，直接用瀏覽器打開 `index.html` 即可。

若要啟動本機伺服器，可用任一靜態伺服器工具，例如：

```bash
python3 -m http.server 8000
```

然後瀏覽 `http://localhost:8000`

## 部署

目前專案可直接部署到 GitHub Pages。
如果使用 GitHub Pages，建議將站點根目錄指向 `main` 分支的專案根目錄。

## 備註

- `images/logo1.svg` 是目前頁首 logo
- 站內導覽、按鈕與語系切換都已做成可直接使用的完整流程
