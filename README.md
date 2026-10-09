# laptrinhdidong2 — EventHub

Ứng dụng **EventHub** chạy thật trên **React Native + Expo** (chạy được cả trên **web** và **điện thoại**): Splash → Onboarding → Đăng nhập/Đăng ký (quên mật khẩu, xác minh mã) → **Home** → **Search**, kèm menu trượt. Chức năng bấm/chọn được: tìm kiếm sự kiện (ngay trên thanh Home và màn Search riêng), lọc danh mục + bảng **Filters**, lưu/bỏ lưu sự kiện, tab dưới cùng, back về màn trước. Giao diện khung 375×812 tự co cho vừa màn hình.

- **Stack:** Expo SDK 57 + React Native 0.86 + React 19.2, React Navigation (native-stack), react-native-svg, Oxlint (không TypeScript, không backend, không DB, không secret/.env).

## Yêu cầu môi trường

- Node.js 20 trở lên kèm npm — kiểm tra: `node -v`, `npm -v`
- **Lưu ý trên Windows/PowerShell:** `npm.ps1` có thể bị chặn bởi Execution Policy.
  Không cần quyền admin, chỉ cần một trong hai cách:
  - Dùng `npm.cmd` thay cho `npm` (ví dụ `npm.cmd run web`), hoặc
  - Chạy trong **Command Prompt (cmd)**, hoặc
  - Mở PowerShell với: `powershell -ExecutionPolicy Bypass`
- Muốn chạy trên điện thoại: cài app **Expo Go** (iOS/Android), rồi quét QR từ `npm start`.

## Cài đặt

```bash
npm install
```

## Chạy dự án

```bash
# 1) chạy bản WEB → mở http://localhost:8081
npm run web

# 2) dev server + QR code → quét bằng Expo Go trên điện thoại
npm start

# 3) mở trên Android emulator / iOS simulator (nếu đã cài)
npm run android
npm run ios

# 4) kiểm tra lint (Oxlint)
npm run lint

# 5) build bản web tĩnh vào thư mục dist/
npm run build:web
```

| Lệnh | Chức năng | Kết quả |
|---|---|---|
| `npm run web` | Chạy app trên web (Metro) | `http://localhost:8081` |
| `npm start` | Dev server + QR cho Expo Go | quét QR bằng điện thoại |
| `npm run android` / `npm run ios` | Chạy trên máy ảo / thiết bị | app khởi động |
| `npm run lint` | Kiểm tra code bằng Oxlint | exit 0 = sạch |
| `npm run build:web` | Build bản web tĩnh | thư mục `dist/` |

## 11 màn hình & điều hướng

Mọi điều hướng đi qua `src/eventhub/screens.js` (`SCREENS`) → `NavContext.go(id)`; id không tồn tại là no-op (không crash).

| Route | Màn hình | File | Ảnh design trong `image_hoanchinh/` |
|---|---|---|---|
| `splash` | Splash | `Splash.jsx` | Splash Screen.png |
| `onboarding-1/2/3` | Onboarding (1 component, 3 trang) | `Onboarding.jsx` | Onboarding 1/2/3.png |
| `signin` | Đăng nhập | `SignIn.jsx` | Sign in.png |
| `signup` | Đăng ký | `SignUp.jsx` | Sign up.png |
| `verify` | Nhập mã xác minh | `Verification.jsx` | Verification.png |
| `reset` | Đặt lại mật khẩu | `Reset.jsx` | Resset Password.png |
| `home` | Trang chủ | `Home.jsx` | Home.png |
| `search` | Tìm kiếm sự kiện | `Search.jsx` | Search- White Bar.png |
| `menu` | Menu trượt (đè lên Home) | `Menu.jsx` | Menu White.png |

- **Vào màn Search:** ở Home bấm **icon kính lúp** trên thanh tìm kiếm; mũi back → về `home`. Gõ để lọc theo tên sự kiện, bấm **Filters** để lọc danh mục.
- 5 thẻ của màn Search dùng thumbnail đã cắt sẵn trong `image/search/` (cắt từ `image/Group 33625.png` cho khớp design).
- Các route cũ (`events`, `map`, `profile`, `messages`, `calendar`, `bookmark`, `contact`, `settings`, `help`, `create`) **đã bị xóa**: tab/nút nào trỏ tới chúng vẫn vẽ theo design nhưng bấm no-op.

## Cấu trúc thư mục (tóm tắt)

```
index.js            — entry Expo (registerRootComponent)
app.json            — cấu hình Expo (icon, web bundler = metro)
package.json        — scripts + dependency (expo, react-native, react-navigation...)
src/
  App.jsx           — NavigationContainer + ẩn status bar hệ thống
  eventhub/
    EventHubApp.jsx — stack 11 màn (React Navigation), NavContext.go() → reset
    screens.js      — bảng route → component (mọi điều hướng qua đây)
    ui.jsx, tokens.js, icons.jsx, navigation.jsx — UI chung / design token / icon / điều hướng
    screens/        — Splash, Onboarding, SignIn/SignUp/Verification/Reset, Home, Search, Menu
  App.css, assets/  — tàn dư template Vite (không import, muốn xóa phải xác nhận)
assets/             — icon app Expo (từ template)
image/              — ảnh thiết kế Figma (Group 33331.png dùng ở Onboarding)
```