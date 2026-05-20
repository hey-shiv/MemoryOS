import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  MagnifyingGlass,
  Brain,
  ArrowRight,
  Sparkle,
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
  LockKey,
  Scan,
} from "phosphor-react-native";
import { COLORS, mockMemories, collections } from "../../lib/mockData";

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

function SectionHeader({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <Pressable style={styles.sectionAction} onPress={onPress}>
          <Text style={styles.sectionActionText}>{action}</Text>
          <ArrowRight size={12} color={COLORS.lime} weight="bold" />
        </Pressable>
      )}
    </View>
  );
}

function MemoryTile({ item, onPress }: any) {
  const Icon = iconMap[item.icon] || Code;
  return (
    <Pressable style={[styles.memoryTile, { backgroundColor: item.bgColor }]} onPress={() => onPress(item.id)}>
      <View style={styles.memoryVisual}>
        <Icon size={24} color={item.accentColor} weight="duotone" />
        <View style={[styles.scanLine, { backgroundColor: item.accentColor }]} />
      </View>
      <View style={styles.memoryMeta}>
        <View style={[styles.microPill, { borderColor: item.accentColor + "55" }]}>
          <Text style={[styles.microPillText, { color: item.accentColor }]}>{item.category.toUpperCase()}</Text>
        </View>
        <Text style={[styles.memoryTitle, { color: item.textColor }]} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.memorySummary} numberOfLines={2}>{item.summary}</Text>
        <View style={styles.memoryFooter}>
          <Text style={styles.memoryDate}>{item.dateAdded}</Text>
          <Text style={[styles.memoryConfidence, { color: item.accentColor }]}>{item.confidence}%</Text>
        </View>
      </View>
    </Pressable>
  );
}

function CollectionCard({ item, onPress }: any) {
  const Icon = iconMap[item.icon] || Code;
  return (
    <Pressable style={[styles.collectionCard, { backgroundColor: item.bgColor }]} onPress={() => onPress(item.id)}>
      <View style={styles.collectionTop}>
        <View style={[styles.collectionIcon, { borderColor: item.accentColor + "55" }]}>
          <Icon size={20} color={item.accentColor} weight="duotone" />
        </View>
        <Text style={[styles.collectionCount, { color: item.accentColor }]}>{item.count}</Text>
      </View>
      <Text style={[styles.collectionName, { color: item.accentColor }]} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.collectionInsight} numberOfLines={2}>{item.insight}</Text>
      <View style={styles.thumbRail}>
        {[0, 1, 2].map((n) => (
          <View key={n} style={[styles.thumbDot, { backgroundColor: item.accentColor, opacity: 0.9 - n * 0.22 }]} />
        ))}
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const recentMemories = mockMemories.slice(0, 6);
  const topCollections = collections.slice(0, 8);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 108 }}
      >
        <View style={styles.backdropA} />
        <View style={styles.backdropB} />

        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>PRIVATE MEMORY LAYER</Text>
            <Text style={styles.appName}>MemoryOS</Text>
          </View>
          <Pressable style={styles.headerIconBtn} onPress={() => router.push("/(tabs)/settings")}>
            <Brain size={22} color={COLORS.lime} weight="duotone" />
          </Pressable>
        </View>

        <Pressable style={styles.commandBar} onPress={() => router.push("/(tabs)/search")}>
          <MagnifyingGlass size={17} color={COLORS.textSecondary} />
          <Text style={styles.commandText}>Search your visual memory...</Text>
          <View style={styles.commandKey}>
            <Text style={styles.commandKeyText}>AI</Text>
          </View>
        </Pressable>

        <View style={styles.heroCard}>
          <View style={styles.heroGrid} pointerEvents="none">
            {Array.from({ length: 24 }).map((_, i) => <View key={i} style={styles.heroGridDot} />)}
          </View>
          <View style={styles.heroTop}>
            <View style={styles.badge}>
              <Sparkle size={11} color={COLORS.lime} weight="fill" />
              <Text style={styles.badgeText}>THIS WEEK</Text>
            </View>
            <Text style={styles.heroMetric}>14 ideas found</Text>
          </View>
          <Text style={styles.heroTitle}>Your screenshots finally make sense.</Text>
          <Text style={styles.heroSub}>
            MemoryOS reads saved screenshots, detects intent, and turns camera roll chaos into searchable knowledge.
          </Text>
          <View style={styles.heroStats}>
            <View>
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>indexed</Text>
            </View>
            <View style={styles.statDivider} />
            <View>
              <Text style={[styles.statNumber, { color: COLORS.cyan }]}>42%</Text>
              <Text style={styles.statLabel}>screenshots</Text>
            </View>
            <View style={styles.statDivider} />
            <View>
              <Text style={[styles.statNumber, { color: COLORS.amber }]}>12</Text>
              <Text style={styles.statLabel}>resurfaced</Text>
            </View>
          </View>
          <Pressable style={styles.primaryButton} onPress={() => router.push("/demo")}>
            <Scan size={16} color="#050604" weight="bold" />
            <Text style={styles.primaryButtonText}>Run the 30s Demo</Text>
          </Pressable>
        </View>

        <Pressable style={styles.privacyStrip} onPress={() => router.push("/(tabs)/settings")}>
          <LockKey size={15} color={COLORS.lime} weight="duotone" />
          <Text style={styles.privacyText}>Local-first demo. No real gallery access. No cloud upload.</Text>
        </Pressable>

        <SectionHeader title="RECENT IMPORTS" action="See all" onPress={() => router.push("/(tabs)/collections")} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {recentMemories.map((item) => (
            <MemoryTile key={item.id} item={item} onPress={(id: string) => router.push(`/memory/${id}`)} />
          ))}
        </ScrollView>

        <SectionHeader title="SMART COLLECTIONS" action="Open" onPress={() => router.push("/(tabs)/collections")} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {topCollections.map((item) => (
            <CollectionCard key={item.id} item={item} onPress={(id: string) => router.push(`/collection/${id}`)} />
          ))}
        </ScrollView>

        <SectionHeader title="FORGOTTEN GEMS" />
        <View style={styles.gemsCard}>
          <View style={styles.gemsHeader}>
            <Text style={styles.gemsTitle}>Ideas you saved, then abandoned.</Text>
            <View style={styles.gemsBadge}>
              <Text style={styles.gemsBadgeText}>12 RESURFACED</Text>
            </View>
          </View>
          {[
            ["B2B data marketplace idea", "Saved 92 days ago"],
            ["Feynman quote on learning", "Starred, never revisited"],
            ["Tonkotsu ramen recipe", "Still waiting for the weekend"],
          ].map(([title, meta], index) => (
            <View key={title} style={styles.gemRow}>
              <View style={[styles.gemSpark, { backgroundColor: [COLORS.amber, COLORS.cyan, COLORS.lime][index] }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.gemTitle}>{title}</Text>
                <Text style={styles.gemMeta}>{meta}</Text>
              </View>
            </View>
          ))}
          <Pressable style={styles.gemsButton} onPress={() => router.push("/(tabs)/insights")}>
            <Text style={styles.gemsButtonText}>Explore Forgotten Gems</Text>
            <ArrowRight size={13} color={COLORS.amber} weight="bold" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#070806" },
  scroll: { flex: 1 },
  backdropA: {
    position: "absolute",
    top: -80,
    right: -70,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(200,255,46,0.08)",
  },
  backdropB: {
    position: "absolute",
    top: 250,
    left: -80,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(53,213,213,0.06)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },
  kicker: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.8,
    color: COLORS.lime,
    marginBottom: 3,
  },
  appName: {
    fontSize: 34,
    fontWeight: "900",
    color: "#F8F1E7",
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(245,240,232,0.06)",
    borderWidth: 1,
    borderColor: "rgba(245,240,232,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  commandBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: "rgba(17,18,15,0.92)",
    borderWidth: 1,
    borderColor: "rgba(245,240,232,0.12)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  commandText: { flex: 1, color: COLORS.textSecondary, fontSize: 14 },
  commandKey: {
    borderWidth: 1,
    borderColor: COLORS.lime + "44",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  commandKeyText: { color: COLORS.lime, fontSize: 10, fontWeight: "800" },
  heroCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#10120D",
    borderWidth: 1,
    borderColor: "rgba(245,240,232,0.12)",
    padding: 18,
  },
  heroGrid: {
    position: "absolute",
    right: -8,
    top: 8,
    width: 120,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    opacity: 0.23,
  },
  heroGridDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: COLORS.lime,
  },
  heroTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(200,255,46,0.10)",
    borderWidth: 1,
    borderColor: "rgba(200,255,46,0.28)",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  badgeText: { color: COLORS.lime, fontSize: 10, fontWeight: "900", letterSpacing: 1.3 },
  heroMetric: { color: COLORS.textTertiary, fontSize: 12, fontWeight: "700" },
  heroTitle: {
    maxWidth: 260,
    color: "#F8F1E7",
    fontSize: 29,
    lineHeight: 32,
    fontWeight: "900",
    marginBottom: 9,
  },
  heroSub: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 20, marginBottom: 18 },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(245,240,232,0.08)",
    paddingVertical: 12,
    marginBottom: 16,
  },
  statNumber: { color: "#F8F1E7", fontSize: 22, fontWeight: "900" },
  statLabel: { color: COLORS.textTertiary, fontSize: 10, fontWeight: "700", textTransform: "uppercase" },
  statDivider: { width: 1, height: 34, backgroundColor: "rgba(245,240,232,0.10)" },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.lime,
    borderRadius: 9,
    paddingVertical: 13,
    shadowColor: COLORS.lime,
    shadowOpacity: 0.38,
    shadowRadius: 14,
  },
  primaryButtonText: { color: "#050604", fontSize: 14, fontWeight: "900" },
  privacyStrip: {
    marginHorizontal: 20,
    marginBottom: 24,
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(200,255,46,0.16)",
    backgroundColor: "rgba(200,255,46,0.05)",
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  privacyText: { flex: 1, color: COLORS.textSecondary, fontSize: 12, lineHeight: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.textTertiary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2.2,
  },
  sectionAction: { flexDirection: "row", alignItems: "center", gap: 4 },
  sectionActionText: { color: COLORS.lime, fontSize: 12, fontWeight: "800" },
  horizontalScroll: { paddingHorizontal: 20, paddingBottom: 24, gap: 12 },
  memoryTile: {
    width: 222,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(245,240,232,0.10)",
    overflow: "hidden",
  },
  memoryVisual: {
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.035)",
    position: "relative",
  },
  scanLine: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    height: 2,
    opacity: 0.35,
  },
  memoryMeta: { padding: 12 },
  microPill: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 8,
  },
  microPillText: { fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  memoryTitle: { fontSize: 15, fontWeight: "900", marginBottom: 5 },
  memorySummary: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 17, minHeight: 34 },
  memoryFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  memoryDate: { color: COLORS.textTertiary, fontSize: 10, fontWeight: "700" },
  memoryConfidence: { fontSize: 11, fontWeight: "900" },
  collectionCard: {
    width: 128,
    minHeight: 148,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(245,240,232,0.10)",
    padding: 13,
  },
  collectionTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  collectionIcon: {
    width: 38,
    height: 38,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  collectionCount: { fontSize: 18, fontWeight: "900" },
  collectionName: { fontSize: 14, fontWeight: "900", lineHeight: 17, minHeight: 34 },
  collectionInsight: { color: COLORS.textSecondary, fontSize: 11, lineHeight: 15, marginTop: 6 },
  thumbRail: { flexDirection: "row", gap: 4, marginTop: "auto", paddingTop: 12 },
  thumbDot: { width: 17, height: 5, borderRadius: 3 },
  gemsCard: {
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.24)",
    backgroundColor: "rgba(245,166,35,0.06)",
    padding: 16,
  },
  gemsHeader: { marginBottom: 14 },
  gemsTitle: { color: "#F8F1E7", fontSize: 18, fontWeight: "900", marginBottom: 8 },
  gemsBadge: {
    alignSelf: "flex-start",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.amber + "55",
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  gemsBadgeText: { color: COLORS.amber, fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  gemRow: { flexDirection: "row", alignItems: "center", gap: 11, paddingVertical: 9 },
  gemSpark: { width: 8, height: 8, borderRadius: 2, transform: [{ rotate: "45deg" }] },
  gemTitle: { color: COLORS.textPrimary, fontSize: 13, fontWeight: "800" },
  gemMeta: { color: COLORS.textTertiary, fontSize: 12, marginTop: 2 },
  gemsButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: COLORS.amber + "55",
    borderRadius: 9,
    paddingVertical: 11,
    marginTop: 10,
  },
  gemsButtonText: { color: COLORS.amber, fontSize: 13, fontWeight: "900" },
});
