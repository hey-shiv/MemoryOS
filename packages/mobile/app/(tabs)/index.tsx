import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Brain,
  Code,
  ForkKnife,
  MagnifyingGlass,
  Receipt,
  Rocket,
  ShieldWarning,
  Sparkle,
} from "phosphor-react-native";
import { COLORS, collections, mockMemories } from "../../lib/mockData";

const SERIF = "Georgia";
const BLACK = "#050503";
const CREAM = "#E8E4D6";
const INK = "#181811";
const HAIR = "rgba(232,228,214,0.16)";
const HAIR_DARK = "rgba(24,24,17,0.12)";
const ACID = "#C8FF2E";
const ROSE = "#F13A8B";
const CYAN = "#72D7D0";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Rocket,
  ForkKnife,
  Receipt,
  ShieldWarning,
};

const roman = ["I", "II", "III", "IV", "V", "VI"];
const navItems = ["Screenshots", "Ideas", "Code", "Receipts", "Places", "Private"];

function Geometry({ dark = false }: { dark?: boolean }) {
  const lineColor = dark ? HAIR_DARK : HAIR;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {[0, 1, 2, 3].map((i) => (
        <View key={`v-${i}`} style={[styles.vLine, { left: `${18 + i * 23}%`, backgroundColor: lineColor }]} />
      ))}
      {[0, 1].map((i) => (
        <View key={`h-${i}`} style={[styles.hLine, { top: `${28 + i * 34}%`, backgroundColor: lineColor }]} />
      ))}
      <View style={[styles.circleOne, { borderColor: lineColor }]} />
      <View style={[styles.circleTwo, { borderColor: lineColor }]} />
      <View style={[styles.diagonalA, { backgroundColor: lineColor }]} />
      <View style={[styles.diagonalB, { backgroundColor: lineColor }]} />
    </View>
  );
}

function EditionMark({ dark = false }: { dark?: boolean }) {
  return (
    <View style={[styles.editionMark, dark && styles.editionMarkDark]}>
      <Text style={[styles.editionText, dark && styles.darkText]}>The</Text>
      <Text style={[styles.editionText, dark && styles.darkText]}>Visual</Text>
      <Text style={[styles.editionScript, dark && styles.darkText]}>ai</Text>
      <Text style={[styles.editionText, dark && styles.darkText]}>Edition</Text>
    </View>
  );
}

function SideIndex({ dark = false }: { dark?: boolean }) {
  return (
    <View style={styles.sideIndex}>
      {navItems.map((item, i) => (
        <View key={item} style={styles.sideIndexRow}>
          <Text style={[styles.sideIndexText, dark && styles.sideIndexTextDark, i > 0 && styles.mutedIndex]}>
            {item}
          </Text>
          <View style={[styles.indexRule, dark && styles.indexRuleDark]} />
          <Text style={[styles.romanText, dark && styles.romanTextDark]}>{roman[i]}</Text>
        </View>
      ))}
    </View>
  );
}

function FloatingMemory({ item, index }: { item: (typeof mockMemories)[0]; index: number }) {
  const Icon = iconMap[item.icon] || Brain;
  const rotate = ["-10deg", "8deg", "-4deg", "12deg"][index % 4];
  const positions = [
    { left: 10, top: 28 },
    { right: 14, top: 18 },
    { left: 38, top: 186 },
    { right: 24, top: 182 },
  ];
  return (
    <View style={[styles.floatingMemory, positions[index], { backgroundColor: item.bgColor, transform: [{ rotate }] }]}>
      <Icon size={22} color={item.accentColor} weight="duotone" />
      <Text style={[styles.floatingMemoryTitle, { color: item.accentColor }]} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  );
}

function ProductCard({ title, subtitle, metric, accent }: { title: string; subtitle: string; metric: string; accent: string }) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productTop}>
        <Text style={styles.productTitle}>{title}</Text>
        <View style={[styles.productBadge, { backgroundColor: accent }]}>
          <Text style={styles.productBadgeText}>New</Text>
        </View>
      </View>
      <View style={[styles.orb, { borderColor: accent }]}>
        <View style={[styles.orbInner, { backgroundColor: accent }]} />
      </View>
      <Text style={styles.productMetric}>{metric}</Text>
      <Text style={styles.productSubtitle}>{subtitle}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const featured = [mockMemories[3], mockMemories[5], mockMemories[6], mockMemories[8]];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.blackHero}>
          <Geometry />
          <View style={styles.topNav}>
            <Text style={styles.navBrand}>MemoryOS Editions</Text>
            <Pressable style={styles.navSearch} onPress={() => router.push("/(tabs)/search")}>
              <Text style={styles.navSearchText}>Search</Text>
              <MagnifyingGlass size={13} color={CREAM} />
            </Pressable>
          </View>

          <EditionMark />

          <View style={styles.objectStage}>
            <FloatingMemory item={featured[0]} index={0} />
            <FloatingMemory item={featured[1]} index={1} />
            <FloatingMemory item={featured[2]} index={2} />
            <FloatingMemory item={featured[3]} index={3} />
            <View style={styles.marbleGlobe}>
              <View style={styles.globeBandA} />
              <View style={styles.globeBandB} />
            </View>
          </View>

          <Text style={styles.giantWord}>Memory</Text>
          <View style={styles.heroCopy}>
            <Text style={styles.heroSerif}>
              Turn visual clutter into a living index of what you saved.
            </Text>
            <Pressable style={styles.blackCta} onPress={() => router.push("/demo")}>
              <Text style={styles.blackCtaText}>Run 30s demo</Text>
              <ArrowRight size={14} color={BLACK} weight="bold" />
            </Pressable>
          </View>
          <SideIndex />
        </View>

        <View style={styles.creamPanel}>
          <Geometry dark />
          <Text style={styles.panelKicker}>Insights, proactively delivered</Text>
          <Text style={styles.panelTitle}>
            Your screenshots finally have memory.
          </Text>
          <Text style={styles.panelBody}>
            MemoryOS reads saved images, extracts intent, and resurfaces the ideas,
            receipts, code, and notes that usually disappear into the camera roll.
          </Text>

          <View style={styles.showcaseWrap}>
            <View style={styles.skateObject}>
              <View style={styles.skateWheelLeft} />
              <View style={styles.skateWheelRight} />
              <Text style={styles.skateText}>AI</Text>
            </View>
            <ProductCard
              title="Pulse"
              subtitle="14 startup ideas found this week"
              metric="128 indexed"
              accent={ROSE}
            />
            <View style={styles.salesCard}>
              <Text style={styles.salesLabel}>Visual recall</Text>
              <Text style={styles.salesValue}>92% faster</Text>
              <Text style={styles.salesDelta}>+ semantic search</Text>
            </View>
          </View>
        </View>

        <View style={styles.operationsPanel}>
          <Geometry />
          <Text style={styles.operationWord}>Operations</Text>
          <Text style={styles.operationSerif}>
            Improve everyday workflows with automatic screenshot sorting and forgotten-gem recovery.
          </Text>
          <View style={styles.collectionPreview}>
            {collections.slice(0, 6).map((collection, i) => (
              <Pressable
                key={collection.id}
                style={[styles.indexCard, { borderColor: collection.accentColor + "55" }]}
                onPress={() => router.push(`/collection/${collection.id}`)}
              >
                <Text style={styles.indexNumeral}>{roman[i]}</Text>
                <Text style={[styles.indexName, { color: collection.accentColor }]}>{collection.name}</Text>
                <Text style={styles.indexMeta}>{collection.count} items</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLACK },
  content: { paddingBottom: 88 },
  blackHero: {
    backgroundColor: BLACK,
    overflow: "hidden",
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 40,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  navBrand: { color: CREAM, fontSize: 14, fontWeight: "800" },
  navSearch: { flexDirection: "row", alignItems: "center", gap: 6 },
  navSearchText: { color: CREAM, fontSize: 13, fontWeight: "700" },
  editionMark: { position: "absolute", top: 52, left: 18, zIndex: 3 },
  editionMarkDark: { top: 26 },
  editionText: { color: CREAM, fontSize: 18, lineHeight: 17, fontWeight: "900" },
  editionScript: {
    position: "absolute",
    left: 32,
    top: 16,
    color: CREAM,
    fontSize: 16,
    lineHeight: 16,
    fontFamily: SERIF,
    fontStyle: "italic",
  },
  darkText: { color: INK },
  objectStage: {
    position: "relative",
    height: 290,
    marginTop: 90,
  },
  floatingMemory: {
    position: "absolute",
    width: 104,
    minHeight: 108,
    borderWidth: 1,
    borderColor: "rgba(232,228,214,0.24)",
    padding: 10,
    justifyContent: "space-between",
  },
  floatingMemoryTitle: { fontSize: 11, lineHeight: 13, fontWeight: "900", marginTop: 6 },
  marbleGlobe: {
    position: "absolute",
    left: 115,
    top: 114,
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: "#EAE0CC",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    overflow: "hidden",
  },
  globeBandA: {
    position: "absolute",
    left: -20,
    top: 40,
    width: 180,
    height: 18,
    backgroundColor: "rgba(241,58,139,0.35)",
    transform: [{ rotate: "-18deg" }],
  },
  globeBandB: {
    position: "absolute",
    left: -10,
    top: 82,
    width: 180,
    height: 14,
    backgroundColor: "rgba(114,215,208,0.35)",
    transform: [{ rotate: "22deg" }],
  },
  giantWord: {
    color: CREAM,
    fontSize: 74,
    lineHeight: 78,
    fontWeight: "900",
    letterSpacing: -4,
    marginTop: 8,
  },
  heroCopy: { marginTop: 10, paddingLeft: 0 },
  heroSerif: {
    color: CREAM,
    fontFamily: SERIF,
    fontSize: 26,
    lineHeight: 29,
    maxWidth: 300,
  },
  blackCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "flex-start",
    marginTop: 18,
    backgroundColor: CREAM,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  blackCtaText: { color: BLACK, fontSize: 13, fontWeight: "900" },
  sideIndex: { marginTop: 24, marginLeft: 0, width: 165 },
  sideIndexRow: { flexDirection: "row", alignItems: "center" },
  sideIndexText: { width: 78, color: CREAM, fontSize: 14, lineHeight: 15, fontWeight: "900" },
  sideIndexTextDark: { color: INK },
  mutedIndex: { opacity: 0.54 },
  indexRule: { flex: 1, height: 1, backgroundColor: "rgba(232,228,214,0.30)" },
  indexRuleDark: { backgroundColor: "rgba(24,24,17,0.28)" },
  romanText: { width: 22, textAlign: "right", color: CREAM, fontFamily: SERIF, fontSize: 12, opacity: 0.72 },
  romanTextDark: { color: INK },
  creamPanel: {
    backgroundColor: CREAM,
    paddingHorizontal: 22,
    paddingTop: 48,
    paddingBottom: 48,
    overflow: "hidden",
  },
  panelKicker: { color: INK, fontSize: 16, fontWeight: "900", marginBottom: 10 },
  panelTitle: { color: INK, fontFamily: SERIF, fontSize: 42, lineHeight: 43, maxWidth: 330 },
  panelBody: { color: INK, fontSize: 15, lineHeight: 20, marginTop: 14, maxWidth: 320, opacity: 0.82 },
  showcaseWrap: { marginTop: 28, flexDirection: "row", gap: 12, flexWrap: "wrap" },
  skateObject: {
    width: 66,
    height: 190,
    borderRadius: 34,
    backgroundColor: "#C9C2A7",
    transform: [{ rotate: "22deg" }],
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  skateWheelLeft: {
    position: "absolute",
    top: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ROSE,
  },
  skateWheelRight: {
    position: "absolute",
    bottom: 12,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: CYAN,
  },
  skateText: { color: INK, fontSize: 30, fontWeight: "900" },
  productCard: {
    flex: 1,
    minWidth: 200,
    minHeight: 200,
    backgroundColor: "#FAF9F2",
    borderWidth: 1,
    borderColor: "rgba(24,24,17,0.12)",
    padding: 18,
  },
  productTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  productTitle: { color: INK, fontSize: 18, fontWeight: "900" },
  productBadge: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4 },
  productBadgeText: { color: "#fff", fontSize: 11, fontWeight: "900" },
  orb: {
    alignSelf: "center",
    marginVertical: 16,
    width: 128,
    height: 96,
    borderRadius: 48,
    borderWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  orbInner: { width: 34, height: 34, borderRadius: 17 },
  productMetric: { color: INK, fontSize: 24, fontWeight: "900" },
  productSubtitle: { color: INK, opacity: 0.58, fontSize: 13, lineHeight: 17, marginTop: 4 },
  salesCard: {
    backgroundColor: "#fff",
    padding: 12,
    minWidth: 136,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(24,24,17,0.08)",
  },
  salesLabel: { color: INK, fontSize: 11, fontWeight: "700" },
  salesValue: { color: INK, fontSize: 20, fontWeight: "900", marginTop: 6 },
  salesDelta: { color: "#008060", fontSize: 12, fontWeight: "900", marginTop: 3 },
  operationsPanel: { backgroundColor: BLACK, paddingHorizontal: 20, paddingTop: 48, paddingBottom: 48, overflow: "hidden" },
  operationWord: { color: CREAM, fontSize: 62, lineHeight: 66, fontWeight: "900", letterSpacing: -3 },
  operationSerif: { color: CREAM, fontFamily: SERIF, fontSize: 26, lineHeight: 29, marginTop: 18, maxWidth: 320 },
  collectionPreview: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 28 },
  indexCard: { width: "48%", minHeight: 124, borderWidth: 1, padding: 12, backgroundColor: "rgba(232,228,214,0.05)" },
  indexNumeral: { color: CREAM, fontFamily: SERIF, fontSize: 13, opacity: 0.56 },
  indexName: { fontSize: 18, lineHeight: 20, fontWeight: "900", marginTop: 18 },
  indexMeta: { color: CREAM, opacity: 0.56, fontSize: 12, marginTop: 8 },
  vLine: { position: "absolute", top: 0, bottom: 0, width: 1 },
  hLine: { position: "absolute", left: 0, right: 0, height: 1 },
  circleOne: { position: "absolute", width: 520, height: 520, borderRadius: 260, borderWidth: 1, top: 42, left: -78 },
  circleTwo: { position: "absolute", width: 520, height: 520, borderRadius: 260, borderWidth: 1, top: 360, left: -70 },
  diagonalA: { position: "absolute", top: 120, left: -40, width: 520, height: 1, transform: [{ rotate: "29deg" }] },
  diagonalB: { position: "absolute", top: 360, left: -80, width: 620, height: 1, transform: [{ rotate: "-31deg" }] },
});
