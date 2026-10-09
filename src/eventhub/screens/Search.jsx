import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Icon } from "../icons.jsx";
import { useGo } from "../navigation.jsx";
import { A, C, font, shadowCard } from "../tokens.js";
import { Frame, Status } from "../ui.jsx";

// 5 ảnh thumbnail cắt đúng từng thẻ trong design (Group 33625.png → image/search/)
const art = {
  jazz: require("../../../image/search/jazz.png"),
  mothers: require("../../../image/search/mothers.png"),
  women: require("../../../image/search/women.png"),
  kids: require("../../../image/search/kids.png"),
  gala: require("../../../image/search/gala.png"),
};

// Danh mục — cùng bộ với Home (giữ chip/màu nhất quán trong toàn app)
const CATS = [
  ["Sports", C.red],
  ["Music", C.orange],
  ["Food", C.green],
  ["Art", C.sky],
];

// [danh mục, ảnh, ngày, tiêu đề] — 5 thẻ khớp y hệt image_hoanchinh/Search- White Bar.png
const RESULTS = [
  { id: "s1", cat: "Music", img: art.jazz, title: "A virtual evening of smooth jazz" },
  { id: "s2", cat: "Art", img: art.mothers, title: "Jo malone london’s mother’s day" },
  { id: "s3", cat: "Art", img: art.women, title: "Women's leadership conference" },
  { id: "s4", cat: "Sports", img: art.kids, title: "International kids safe parents night out" },
  { id: "s5", cat: "Music", img: art.gala, title: "International gala music festival" },
];
const DATE = "1ST MAY- SAT -2:00 PM"; // cả 5 thẻ dùng chung ngày theo design

// Thẻ kết quả: ảnh 79x92 (cắt từ design) + ngày + tiêu đề 2 dòng
const Card = ({ top, img, title }) => (
  <>
    <View style={A(24, top, 327, 106, { backgroundColor: "#fff", borderRadius: 18, boxShadow: shadowCard })} />
    <Image source={img} style={A(31, top + 7, 79, 92, { borderRadius: 10 })} resizeMode="cover" />
    <Text numberOfLines={1} style={A(128, top + 16, 220, 18, { ...font(13, 700, 18), color: C.blue })}>
      {DATE}
    </Text>
    <Text numberOfLines={2} style={A(128, top + 35, 200, 52, { ...font(18, 700, 26), color: C.title })}>
      {title}
    </Text>
  </>
);

// Màn hình 11. Search - White Bar (design: image_hoanchinh/Search- White Bar.png)
export default function Search() {
  const go = useGo();
  const [q, setQ] = useState(""); // từ khóa tìm kiếm
  const [cat, setCat] = useState(""); // danh mục đang lọc
  const [sheet, setSheet] = useState(false); // bảng bộ lọc

  const kw = q.trim().toLowerCase();
  const list = RESULTS.filter(e => (!cat || e.cat === cat) && (!kw || e.title.toLowerCase().includes(kw)));
  const contentH = Math.max(812, 174 + list.length * 128); // cuộn được nếu danh sách dài

  return (
    <Frame>
      <ScrollView
        style={A(0, 0, 375, 812, { backgroundColor: "#fff" })}
        contentContainerStyle={{ width: 375, height: contentH }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Status />
        {/* Mũi back to hơn Back mặc định để khớp design (glyph 16x14 @ x28,y57) */}
        <Pressable
          onPress={() => go("home")}
          style={A(14, 42, 44, 44, { alignItems: "center", justifyContent: "center", zIndex: 5 })}
        >
          <Icon n="back" s={28} c={C.title} w={1.9} />
        </Pressable>
        <Text style={A(58, 46, 200, 34, { ...font(26, 700, 34), color: C.title })}>Search</Text>

        {/* Thanh tìm kiếm: kính lúp | gạch dọc | ô nhập | nút Filters */}
        <Icon n="search" s={24} c={C.blue} w={2} style={{ position: "absolute", left: 23, top: 113 }} />
        <View style={A(58, 115, 1.5, 22, { backgroundColor: "#7974E7" })} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search..."
          placeholderTextColor="#B3B3B3"
          autoCapitalize="none"
          style={A(68, 111, 196, 28, { padding: 0, ...font(20, 400, 28), color: C.title, letterSpacing: -0.5 })}
        />
        <Pressable
          onPress={() => setSheet(true)}
          style={A(276, 110, 75, 31, {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingLeft: 7,
            borderRadius: 50,
            backgroundColor: C.blue,
          })}
        >
          <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
            <Icon n="filter" s={12} c={C.blue} w={2} />
          </View>
          <Text style={{ ...font(13, 500), color: "#fff" }}>Filters</Text>
        </Pressable>

        {/* Danh sách kết quả — thẻ đầu ở y=174, cách nhau 128 (đo từ design) */}
        {list.length > 0 ? (
          list.map((e, i) => <Card key={e.id} top={174 + i * 128} img={e.img} title={e.title} />)
        ) : (
          <Text style={A(24, 200, 327, 60, { textAlign: "center", ...font(15, 400, 24), color: C.sub })}>
            {"Không tìm thấy sự kiện phù hợp.\nThử đổi từ khóa hoặc bộ lọc."}
          </Text>
        )}
      </ScrollView>

      {/* Bảng bộ lọc (cùng kiểu với Home) */}
      {sheet && (
        <Pressable onPress={() => setSheet(false)} style={A(0, 0, 375, 812, { backgroundColor: "rgba(18,13,38,.35)", zIndex: 20 })}>
          {/* onPress rỗng = chặn nổi bọt: bấm trong sheet không đóng bảng */}
          <Pressable
            onPress={() => {}}
            style={A(0, 520, 375, 292, {
              backgroundColor: "#fff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingVertical: 22,
              paddingHorizontal: 24,
              zIndex: 21,
            })}
          >
            <Text style={{ ...font(17, 500, 24), color: C.title, marginBottom: 4 }}>Bộ lọc sự kiện</Text>
            <Text style={{ ...font(13, 400, 20), color: C.sub, marginBottom: 14 }}>Chọn danh mục bạn quan tâm</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {CATS.map(([t, c]) => (
                <Pressable
                  key={t}
                  onPress={() => setCat(cat === t ? "" : t)}
                  style={{
                    paddingVertical: 9,
                    paddingHorizontal: 18,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: cat === t ? "transparent" : C.line,
                    backgroundColor: cat === t ? c : "#fff",
                  }}
                >
                  <Text style={{ ...font(13, 500), color: cat === t ? "#fff" : C.sub }}>{t}</Text>
                </Pressable>
              ))}
            </View>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 22 }}>
              <Pressable
                onPress={() => {
                  setCat("");
                  setQ("");
                }}
                style={{ flex: 1, height: 48, borderRadius: 12, borderWidth: 1, borderColor: C.line, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ ...font(14, 500), color: C.title }}>Xóa lọc</Text>
              </Pressable>
              <Pressable
                onPress={() => setSheet(false)}
                style={{ flex: 1, height: 48, borderRadius: 12, backgroundColor: C.blue, alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ ...font(14, 500), color: "#fff" }}>Áp dụng</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      )}
    </Frame>
  );
}
