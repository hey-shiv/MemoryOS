import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  BookOpen,
  Code,
  FileText,
  ForkKnife,
  List,
  MapPin,
  Quotes,
  Receipt,
  Rocket,
  ShieldWarning,
  Smiley,
  SquaresFour,
  Student,
  Barbell,
} from "phosphor-react-native";
import { collections } from "../../lib/mockData";

const SERIF = "Georgia";
const BLACK = "#050503";
const CREAM = "#E8E4D6";
const INK = "#181811";
const HAIR = "rgba(24,24,17,0.12)";
const HAIR_LIGHT = "rgba(232,228,214,0.18)";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Rocket,
  BookOpen,
  Quotes,
  ForkKnife,
  Receipt,
  Student,
  Barbell,
  MapPin,
  Smiley,
  FileText,
  ShieldWarning,
};

const categories = ["All", "Tech", "Business", "Learning", "Lifestyle", "Finance", "Work", "Private"];
const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function Geometry({ light = false }: { light?: boolean }) {
  const color = light ? HAIR_LIGHT : HAIR;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {[0, 1, 2].map((i) => <View key={i} style={[styles.vLine, { left: `${22 + i * 27}%`, backgroundColor: color }]} />)}
      <View style={[styles.circle, { borderColor: color }]} />
      <View style={[styles.diagonal, { backgroundColor: color }]} />
    </View>
  );
}

function GridCard({ item, index, width, onPress }: any) {
  const Icon = iconMap[item.icon] || Code;
  return (
    <Pressable style={[styles.card, { width, borderColor: item.accentColor + "66" }]} onPress={() => onPress(item.id)}>
      <Text style={styles.cardRoman}>{romans[index]}</Text>
      <View style={[styles.artifact, { backgroundColor: item.bgColor }]}>
        <Icon size={24} color={item.accentColor} weight="duotone" />
      </View>
      <Text style={[styles.cardName, { color: item.accentColor }]} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.cardCount}>{item.count} items</Text>
      <Text style={styles.cardInsight} numberOfLines={2}>{item.insight}</Text>
    </Pressable>
  );
}

function ListCard({ item, index, onPress }: any) {
  return (
    <Pressable style={styles.listCard} onPress={() => onPress(item.id)}>
      <Text style={styles.listRoman}>{romans[index]}</Text>
      <Text style={styles.listName}>{item.name}</Text>
      <Text style={styles.listCount}>{item.count}</Text>
    </Pressable>
  );
}

export default function CollectionsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isGrid, setIsGrid] = useState(true);
  const gap = 12;
  const cardWidth = (width - 40 - gap) / 2;

  const filtered = activeCategory === "All" ? collections : collections.filter((c) => c.category === activeCategory);
  const rows = [];
  for (let i = 0; i < filtered.length; i += 2) rows.push(filtered.slice(i, i + 2));
  const go = (id: string) => router.push(`/collection/${id}`);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Geometry />
          <Text style={styles.edition}>The{"\n"}Archive{"\n"}Edition</Text>
          <Text style={styles.giant}>Index</Text>
          <Text style={styles.serifLine}>Every saved thing, classified like a catalogue.</Text>
        </View>

        <View style={styles.controls}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {categories.map((cat) => (
              <Pressable key={cat} style={[styles.chip, activeCategory === cat && styles.chipActive]} onPress={() => setActiveCategory(cat)}>
                <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>{cat}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable style={styles.toggle} onPress={() => setIsGrid(!isGrid)}>
            {isGrid ? <List size={18} color={CREAM} /> : <SquaresFour size={18} color={CREAM} />}
          </Pressable>
        </View>

        <View style={styles.blackSection}>
          <Geometry light />
          {isGrid ? rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, i) => (
                <GridCard key={item.id} item={item} index={rowIndex * 2 + i} width={cardWidth} onPress={go} />
              ))}
              {row.length === 1 && <View style={{ width: cardWidth }} />}
            </View>
          )) : filtered.map((item, i) => <ListCard key={item.id} item={item} index={i} onPress={go} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CREAM },
  content: { paddingBottom: 88 },
  hero: { backgroundColor: CREAM, overflow: "hidden", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28 },
  edition: { color: INK, fontSize: 18, lineHeight: 17, fontWeight: "900" },
  giant: { color: INK, fontSize: 76, lineHeight: 80, fontWeight: "900", letterSpacing: -4, marginTop: 28 },
  serifLine: { color: INK, fontFamily: SERIF, fontSize: 26, lineHeight: 29, maxWidth: 310, marginTop: 6 },
  controls: { backgroundColor: CREAM, paddingHorizontal: 20, paddingBottom: 18, flexDirection: "row", alignItems: "center", gap: 10 },
  chips: { gap: 8 },
  chip: { borderWidth: 1, borderColor: HAIR, paddingHorizontal: 12, paddingVertical: 7 },
  chipActive: { backgroundColor: BLACK },
  chipText: { color: INK, fontSize: 12, fontWeight: "900" },
  chipTextActive: { color: CREAM },
  toggle: { width: 38, height: 38, backgroundColor: BLACK, alignItems: "center", justifyContent: "center" },
  blackSection: { minHeight: 560, backgroundColor: BLACK, paddingHorizontal: 20, paddingTop: 20, overflow: "hidden" },
  row: { flexDirection: "row", gap: 12, marginBottom: 12 },
  card: { minHeight: 178, borderWidth: 1, backgroundColor: "rgba(232,228,214,0.055)", padding: 12 },
  cardRoman: { color: CREAM, fontFamily: SERIF, opacity: 0.58, fontSize: 12 },
  artifact: { width: 46, height: 58, alignItems: "center", justifyContent: "center", marginTop: 16, transform: [{ rotate: "-3deg" }] },
  cardName: { fontSize: 18, lineHeight: 20, fontWeight: "900", marginTop: 14 },
  cardCount: { color: CREAM, opacity: 0.55, fontSize: 12, marginTop: 5 },
  cardInsight: { color: CREAM, opacity: 0.62, fontSize: 11, lineHeight: 15, marginTop: 8 },
  listCard: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: HAIR_LIGHT, paddingVertical: 15 },
  listRoman: { width: 38, color: CREAM, fontFamily: SERIF, opacity: 0.58 },
  listName: { flex: 1, color: CREAM, fontSize: 19, fontWeight: "900" },
  listCount: { color: CREAM, opacity: 0.6, fontFamily: SERIF },
  vLine: { position: "absolute", top: 0, bottom: 0, width: 1 },
  circle: { position: "absolute", width: 430, height: 430, borderRadius: 215, borderWidth: 1, top: 18, left: -36 },
  diagonal: { position: "absolute", width: 520, height: 1, top: 180, left: -70, transform: [{ rotate: "-28deg" }] },
});
