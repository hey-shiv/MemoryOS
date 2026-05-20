import React, { useState } from "react";
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
} from "phosphor-react-native";
import { COLORS, mockMemories, collections } from "../../lib/mockData";

const iconMap: Record<string, React.ComponentType<any>> = {
  Code, Rocket, BookOpen, Quotes, ForkKnife, Receipt,
  Student, Barbell, MapPin, Smiley, FileText, ShieldWarning,
};

// ─── Memory Card ─────────────────────────────────────────────────────────────
function MemoryCard({ item, onPress }: any) {
  const IconComp = iconMap[item.icon] || Code;
  return (
    <Pressable
      style={[styles.memoryCard, { backgroundColor: item.bgColor }]}
      onPress={() => onPress(item.id)}
      android_ripple={{ color: "rgba(255,255,255,0.05)" }}
    >
      <View style={styles.memoryCardHeader}>
        <View style={[styles.categoryChip, { borderColor: item.accentColor + "40" }]}>
          <IconComp size={10} color={item.accentColor} weight="bold" />
          <Text style={[styles.categoryChipText, { color: item.accentColor }]}>
            {item.category.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.memoryCardDate}>{item.dateAdded}</Text>
      </View>
      <Text style={[styles.memoryCardTitle, { color: item.textColor }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.memoryCardSummary} numberOfLines={2}>
        {item.summary}
      </Text>
      <View style={styles.memoryCardFooter}>
        <View style={styles.tagRow}>
          {item.tags.slice(0, 2).map((tag: string) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.confidenceBadge, { borderColor: item.accentColor + "50" }]}>
          <Text style={[styles.confidenceText, { color: item.accentColor }]}>
            {item.confidence}%
          </Text>
        </View>
      </View>
      {item.isSensitive && (
        <View style={styles.sensitiveWarning}>
          <ShieldWarning size={10} color={COLORS.red} weight="fill" />
          <Text style={styles.sensitiveText}>SENSITIVE</Text>
        </View>
      )}
    </Pressable>
  );
}

// ─── Collection Mini Card ─────────────────────────────────────────────────────
function CollectionMiniCard({ item, onPress }: any) {
  const IconComp = iconMap[item.icon] || Code;
  return (
    <Pressable
      style={[styles.collectionMini, { backgroundColor: item.bgColor }]}
      onPress={() => onPress(item.id)}
    >
      <View style={[styles.collectionMiniIcon, { borderColor: item.accentColor + "40" }]}>
        <IconComp size={18} color={item.accentColor} weight="duotone" />
      </View>
      <Text style={[styles.collectionMiniName, { color: item.accentColor }]} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.collectionMiniCount}>{item.count} items</Text>
    </Pressable>
  );
}

// ─── Hero Insight Node Motif ──────────────────────────────────────────────────
function NodeMotif() {
  return (
    <View style={styles.nodeMotif} pointerEvents="none">
      {[
        { x: 8,  y: 8,  r: 3,  op: 0.5 },
        { x: 24, y: 5,  r: 2,  op: 0.3 },
        { x: 40, y: 10, r: 3,  op: 0.5 },
        { x: 56, y: 4,  r: 2,  op: 0.25 },
        { x: 72, y: 9,  r: 3,  op: 0.4 },
      ].map((n, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            left: n.x,
            top: n.y,
            width: n.r * 2,
            height: n.r * 2,
            borderRadius: n.r,
            backgroundColor: COLORS.lime,
            opacity: n.op,
          }}
        />
      ))}
      {/* Connecting lines via thin views */}
      <View style={{ position: "absolute", left: 10, top: 10, width: 14, height: 1, backgroundColor: COLORS.lime, opacity: 0.18 }} />
      <View style={{ position: "absolute", left: 26, top: 7,  width: 14, height: 1, backgroundColor: COLORS.lime, opacity: 0.15 }} />
      <View style={{ position: "absolute", left: 42, top: 12, width: 14, height: 1, backgroundColor: COLORS.lime, opacity: 0.18 }} />
      <View style={{ position: "absolute", left: 58, top: 6,  width: 14, height: 1, backgroundColor: COLORS.lime, opacity: 0.15 }} />
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const recentMemories = mockMemories.slice(0, 6);
  const topCollections = collections.slice(0, 8);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>MemoryOS</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Private visual memory</Text>
            </View>
          </View>
          <Pressable
            style={styles.headerIconBtn}
            onPress={() => router.push("/(tabs)/insights")}
          >
            <Brain size={22} color={COLORS.lime} weight="duotone" />
          </Pressable>
        </View>

        {/* ── Search Bar ──────────────────────────────────────────────────── */}
        <Pressable
          style={styles.searchBar}
          onPress={() => router.push("/(tabs)/search")}
        >
          <MagnifyingGlass size={16} color={COLORS.textTertiary} />
          <Text style={styles.searchPlaceholder}>Search your visual memory…</Text>
          <View style={styles.searchKbdHint}>
            <Text style={styles.searchKbdHintText}>AI</Text>
          </View>
        </Pressable>

        {/* ── Hero Insight Card ────────────────────────────────────────────── */}
        <View style={styles.insightCard}>
          {/* Node motif decoration */}
          <NodeMotif />

          <View style={styles.insightCardTop}>
            <View style={styles.insightBadge}>
              <Sparkle size={11} color={COLORS.lime} weight="fill" />
              <Text style={styles.insightBadgeText}>THIS WEEK</Text>
            </View>
            <Text style={styles.insightWeekCount}>14 ideas found</Text>
          </View>
          <Text style={styles.insightHeadline}>
            You saved 14 startup ideas this week
          </Text>
          <Text style={styles.insightSubtext}>
            3 were hidden inside screenshots you forgot.
          </Text>

          {/* Scan line motif */}
          <View style={styles.scanLineRow}>
            {Array.from({ length: 24 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.scanLineTick,
                  { opacity: i % 3 === 0 ? 0.4 : 0.12 },
                ]}
              />
            ))}
          </View>

          <View style={styles.insightDivider} />
          <Pressable
            style={styles.scanBtn}
            onPress={() => router.push("/(tabs)/import")}
          >
            <Brain size={15} color="#0A0A09" weight="bold" />
            <Text style={styles.scanBtnText}>Scan Memory</Text>
          </Pressable>
        </View>

        {/* ── Demo CTA ────────────────────────────────────────────────────── */}
        <Pressable
          style={styles.demoCta}
          onPress={() => router.push("/demo")}
          android_ripple={{ color: "rgba(245,166,35,0.1)" }}
        >
          <Sparkle size={14} color={COLORS.amber} weight="fill" />
          <Text style={styles.demoCtaText}>See MemoryOS in 30 seconds</Text>
          <ArrowRight size={13} color={COLORS.amber} />
        </Pressable>

        {/* ── Recent Imports ───────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT IMPORTS</Text>
          <Pressable
            style={styles.seeAllBtn}
            onPress={() => router.push("/(tabs)/collections")}
          >
            <Text style={styles.seeAllText}>See all</Text>
            <ArrowRight size={12} color={COLORS.lime} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {recentMemories.map((item) => (
            <MemoryCard
              key={item.id}
              item={item}
              onPress={(id: string) => router.push(`/memory/${id}`)}
            />
          ))}
        </ScrollView>

        {/* ── Smart Collections ────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SMART COLLECTIONS</Text>
          <Pressable
            style={styles.seeAllBtn}
            onPress={() => router.push("/(tabs)/collections")}
          >
            <Text style={styles.seeAllText}>See all</Text>
            <ArrowRight size={12} color={COLORS.lime} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {topCollections.map((item) => (
            <CollectionMiniCard
              key={item.id}
              item={item}
              onPress={(id: string) => router.push(`/collection/${id}`)}
            />
          ))}
        </ScrollView>

        {/* ── Forgotten Gems ───────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FORGOTTEN GEMS</Text>
          <View style={styles.gemBadge}>
            <Text style={styles.gemBadgeText}>12 resurfaced</Text>
          </View>
        </View>

        <View style={styles.forgottenCard}>
          {/* Amber accent bar */}
          <View style={styles.forgottenAccentBar} />

          <View style={styles.forgottenRow}>
            <Sparkle size={13} color={COLORS.amber} weight="fill" />
            <Text style={styles.forgottenText}>
              You saved a B2B data marketplace idea 3 months ago.
            </Text>
          </View>
          <View style={[styles.forgottenRow, { marginTop: 10 }]}>
            <Sparkle size={13} color={COLORS.cyan} weight="fill" />
            <Text style={styles.forgottenText}>
              A Feynman quote on learning you starred but never revisited.
            </Text>
          </View>
          <View style={[styles.forgottenRow, { marginTop: 10 }]}>
            <Sparkle size={13} color={COLORS.lime} weight="fill" />
            <Text style={styles.forgottenText}>
              Tonkotsu ramen recipe saved 5 weeks ago. You haven't cooked it yet.
            </Text>
          </View>

          <Pressable
            style={styles.exploreBtn}
            onPress={() => router.push("/(tabs)/insights")}
          >
            <Text style={styles.exploreBtnText}>Explore Forgotten Gems</Text>
            <ArrowRight size={13} color={COLORS.amber} />
          </Pressable>
        </View>

        {/* ── Footer tagline ───────────────────────────────────────────────── */}
        <Text style={styles.footerTagline}>
          Forgotten ideas, found again.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.lime,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    letterSpacing: 0.3,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  // Search
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textTertiary,
  },
  searchKbdHint: {
    backgroundColor: "rgba(200,241,53,0.1)",
    borderWidth: 1,
    borderColor: "rgba(200,241,53,0.2)",
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  searchKbdHintText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.lime,
    letterSpacing: 0.5,
  },

  // Insight Hero Card
  insightCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 18,
    overflow: "hidden",
  },
  nodeMotif: {
    position: "absolute",
    top: 14,
    right: 18,
    width: 88,
    height: 20,
  },
  insightCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  insightBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(200, 241, 53, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(200, 241, 53, 0.2)",
  },
  insightBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.lime,
    letterSpacing: 1,
  },
  insightWeekCount: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  insightHeadline: {
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
    lineHeight: 27,
    marginBottom: 6,
  },
  insightSubtext: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },
  scanLineRow: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 14,
    alignItems: "center",
  },
  scanLineTick: {
    width: 2,
    height: 10,
    backgroundColor: COLORS.lime,
    borderRadius: 1,
  },
  insightDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 14,
  },
  scanBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.lime,
    borderRadius: 8,
    paddingVertical: 13,
    shadowColor: COLORS.lime,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scanBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0A0A09",
    letterSpacing: 0.2,
  },

  // Demo CTA
  demoCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.amber + "40",
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: "rgba(245,166,35,0.06)",
  },
  demoCtaText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.amber,
  },

  // Section headers
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 12,
    color: COLORS.lime,
    fontWeight: "600",
  },

  // Horizontal scroll
  horizontalScroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },

  // Memory cards
  memoryCard: {
    width: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  memoryCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  categoryChipText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  memoryCardDate: { fontSize: 10, color: COLORS.textTertiary },
  memoryCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
    letterSpacing: -0.2,
  },
  memoryCardSummary: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 17,
    marginBottom: 10,
  },
  memoryCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagRow: { flexDirection: "row", gap: 4 },
  tag: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: { fontSize: 10, color: COLORS.textSecondary },
  confidenceBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  confidenceText: { fontSize: 10, fontWeight: "700" },
  sensitiveWarning: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    backgroundColor: "rgba(232, 93, 74, 0.12)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  sensitiveText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.red,
    letterSpacing: 0.8,
  },

  // Collection mini
  collectionMini: {
    width: 105,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    alignItems: "center",
    gap: 6,
  },
  collectionMiniIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  collectionMiniName: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 16,
  },
  collectionMiniCount: { fontSize: 10, color: COLORS.textTertiary },

  // Forgotten gems
  gemBadge: {
    backgroundColor: "rgba(245, 166, 35, 0.12)",
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(245, 166, 35, 0.25)",
  },
  gemBadgeText: {
    fontSize: 10,
    color: COLORS.amber,
    fontWeight: "600",
  },
  forgottenCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(245, 166, 35, 0.15)",
    borderRadius: 10,
    padding: 16,
    overflow: "hidden",
  },
  forgottenAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.amber,
    opacity: 0.5,
  },
  forgottenRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  forgottenText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.amber + "40",
    borderRadius: 8,
    paddingVertical: 10,
  },
  exploreBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.amber,
  },

  // Footer
  footerTagline: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textAlign: "center",
    letterSpacing: 0.5,
    paddingBottom: 8,
  },
});
