import { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavContext } from "./navigation.jsx";
import { SCREENS } from "./screens.js";

const Stack = createNativeStackNavigator();

// Danh sách route hợp lệ — chặn go() trỏ tới màn đã bị xóa (11 màn thừa)
// Fixed: navigation.reset() tới route không tồn tại sẽ throw → bỏ qua thay vì crash
const ROUTE_IDS = new Set(SCREENS.map(s => s.id));

// Bọc mỗi màn hình: cung cấp NavContext (go/curent) để 11 màn dùng y hệt API cũ
// reset() → màn mới luôn bắt đầu sạch state (tương đương key={current} của bản web)
function makeScreen({ Comp, props }) {
  return function ScreenRoute({ navigation, route }) {
    const value = useMemo(
      () => ({
        current: route.name,
        go: id => {
          if (!ROUTE_IDS.has(id)) return; // no-op với nút/menu còn sót trỏ màn đã xóa
          navigation.reset({ index: 0, routes: [{ name: id }] });
        },
      }),
      [navigation, route.name],
    );
    return (
      <NavContext.Provider value={value}>
        <Comp {...props} />
      </NavContext.Provider>
    );
  };
}

// Tạo component 1 lần ở module (không tạo lại mỗi lần render → tránh remount)
const ROUTES = SCREENS.map(s => ({ name: s.id, Comp: makeScreen(s) }));

/**
 * Vỏ ứng dụng EventHub: stack điều hướng đúng 11 màn hình theo design Figma
 * (mở app → splash, mọi chuyển màn đều qua NavContext.go()).
 */
export default function EventHubApp() {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: { backgroundColor: "#EEF0FA" },
      }}
    >
      {ROUTES.map(r => (
        <Stack.Screen key={r.name} name={r.name} component={r.Comp} />
      ))}
    </Stack.Navigator>
  );
}
